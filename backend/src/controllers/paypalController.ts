import { Request, Response } from 'express';
import axios from 'axios';
import prisma from '../prisma';

const getPayPalCredentials = async () => {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: ['paypal_client_id', 'paypal_client_secret', 'paypal_mode'] } },
  });
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    if (s.value) settingsMap[s.key] = s.value;
  });

  const clientId = settingsMap['paypal_client_id'] || process.env.PAYPAL_CLIENT_ID;
  const clientSecret = settingsMap['paypal_client_secret'] || process.env.PAYPAL_CLIENT_SECRET;
  const mode = settingsMap['paypal_mode'] || process.env.PAYPAL_MODE || 'sandbox';

  return { clientId, clientSecret, mode };
};

export const getPublicPayPalClientId = async (req: Request, res: Response) => {
  try {
    const { clientId, mode } = await getPayPalCredentials();
    return res.json({ clientId: clientId || '', mode: mode || 'sandbox' });
  } catch (error) {
    return res.json({ clientId: '', mode: 'sandbox' });
  }
};

const getPayPalAccessToken = async (): Promise<string> => {
  const { clientId, clientSecret, mode } = await getPayPalCredentials();

  if (!clientId || !clientSecret) {
    throw new Error('PayPal Client ID or Secret is not configured in environment variables or Admin Settings.');
  }

  const baseUrl = mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await axios.post(
    `${baseUrl}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data.access_token;
};

const getPayPalBaseUrl = async (): Promise<string> => {
  const { mode } = await getPayPalCredentials();
  return mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
};

/**
 * Creates a PayPal Order (POST /api/v1/payments/paypal/create-order)
 */
export const createPayPalOrder = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'USD', description = 'Floksy Jewel Order' } = req.body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Valid payment amount is required' });
    }

    const accessToken = await getPayPalAccessToken();
    const baseUrl = await getPayPalBaseUrl();

    const response = await axios.post(
      `${baseUrl}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: Number(amount).toFixed(2),
            },
            description,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({
      id: response.data.id,
      status: response.data.status,
    });
  } catch (error: any) {
    console.error('PayPal create order error:', error?.response?.data || error?.message || error);
    return res.status(500).json({
      message: 'Failed to create PayPal order',
      error: error?.response?.data || error?.message,
    });
  }
};

/**
 * Captures PayPal Payment & Finalizes DB Order (POST /api/v1/payments/paypal/capture-order)
 */
export const capturePayPalOrder = async (req: Request, res: Response) => {
  try {
    const { paypalOrderId, dbOrderId } = req.body;

    if (!paypalOrderId) {
      return res.status(400).json({ message: 'PayPal Order ID is required' });
    }

    const accessToken = await getPayPalAccessToken();
    const baseUrl = await getPayPalBaseUrl();

    // Capture payment from PayPal REST API
    const response = await axios.post(
      `${baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captureData = response.data;

    if (captureData.status === 'COMPLETED') {
      const captureDetails = captureData.purchase_units?.[0]?.payments?.captures?.[0];
      const paidAmount = captureDetails?.amount?.value ? parseFloat(captureDetails.amount.value) : 0;
      const paypalCaptureId = captureDetails?.id || paypalOrderId;

      let order = null;

      if (dbOrderId) {
        order = await prisma.order.findUnique({
          where: { id: String(dbOrderId) },
          include: { payments: true },
        });
      }

      if (order) {
        // Record payment in Prisma
        const count = await prisma.payment.count();
        const year = new Date().getFullYear();
        const numPadded = String(count + 1).padStart(4, '0');
        const paymentNumber = `FJ-PAY-${year}-${numPadded}`;

        await prisma.payment.create({
          data: {
            orderId: order.id,
            paymentNumber,
            amount: paidAmount || order.totalAmount,
            currency: order.currency || 'USD',
            paymentMethod: 'PayPal',
            referenceId: paypalCaptureId,
            status: 'SUCCESS',
            notes: `PayPal capture successful. PayPal Order ID: ${paypalOrderId}, Capture ID: ${paypalCaptureId}`,
          },
        });

        // Update Order Status
        await prisma.order.update({
          where: { id: order.id },
          data: {
            orderStatus: 'CONFIRMED',
          },
        });

        // Add Financial Audit Log
        await prisma.financialAuditLog.create({
          data: {
            adminUser: 'SYSTEM (PayPal Webhook/Capture)',
            action: 'PAYMENT_RECEIVED',
            entityType: 'PAYMENT',
            entityId: paypalCaptureId,
            newValue: `Paid $${paidAmount || order.totalAmount} via PayPal`,
            reason: `Order ${order.orderNumber} successfully paid via PayPal`,
          },
        });
      }

      return res.status(200).json({
        success: true,
        message: 'PayPal payment captured successfully',
        captureData,
        orderId: order?.id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `PayPal payment failed with status: ${captureData.status}`,
        captureData,
      });
    }
  } catch (error: any) {
    console.error('PayPal capture error:', error?.response?.data || error?.message || error);
    return res.status(500).json({
      message: 'Failed to capture PayPal payment',
      error: error?.response?.data || error?.message,
    });
  }
};
