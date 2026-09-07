import nodemailer from 'nodemailer';

// Configure SMTP Transporter (Supports Hostinger, Gmail, SendGrid, Mailgun, Amazon SES, Custom SMTP)
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || 'concierge@auroradiamonds.com';
  const pass = process.env.SMTP_PASS || '';

  if (!pass) {
    console.warn('⚠️ SMTP_PASS is not configured in .env. Emails will be logged until SMTP_PASS is added.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

export const sendOrderConfirmationEmail = async (order: any) => {
  try {
    const transporter = createTransporter();
    const fromAddress = process.env.SMTP_FROM || `"Aura Diamond Atelier" <${process.env.SMTP_USER || 'concierge@auroradiamonds.com'}>`;
    const recipientEmail = order.customerEmail;

    if (!recipientEmail) {
      console.warn('Cannot send order confirmation: recipient email is missing.');
      return;
    }

    const itemsListHtml = (order.items || [])
      .map(
        (item: any) => `
        <tr style="border-bottom: 1px solid #f2ede4;">
          <td style="padding: 12px 0; color: #1f1f1f; font-weight: 600;">${item.productName || 'Handcrafted Fine Jewellery'}</td>
          <td style="padding: 12px 0; text-align: center; color: #555;">${item.quantity || 1}</td>
          <td style="padding: 12px 0; text-align: right; font-weight: 700; color: #1f1f1f;">$${((item.unitPrice || 0) * (item.quantity || 1)).toLocaleString()} USD</td>
        </tr>`
      )
      .join('');

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - Aura Diamond Atelier</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f7f2; margin: 0; padding: 40px 10px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d9d3c7; border-radius: 4px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr>
          <td style="background-color: #1f1f1f; padding: 28px 20px; text-align: center;">
            <h1 style="color: #c9a45c; font-family: Georgia, serif; font-size: 24px; letter-spacing: 0.15em; margin: 0; text-transform: uppercase;">AURA DIAMOND ATELIER</h1>
            <p style="color: #e8e3d9; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 6px 0 0 0;">Haute Joaillerie & Bespoke Atelier</p>
          </td>
        </tr>

        <!-- Main Banner -->
        <tr>
          <td style="padding: 32px 32px 16px; text-align: center;">
            <div style="background-color: #faf5eb; border: 1px solid #c9a45c; color: #c9a45c; padding: 6px 16px; display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 20px; margin-bottom: 12px;">ORDER CONFIRMED</div>
            <h2 style="font-size: 22px; font-family: Georgia, serif; color: #1f1f1f; margin: 0 0 8px 0;">Thank You for Your Order</h2>
            <p style="color: #55524d; font-size: 14px; margin: 0; line-height: 1.5;">Dear ${order.customerName || 'Valued Client'}, your order <strong>#${order.orderNumber}</strong> has been received and registered with our master goldsmiths.</p>
          </td>
        </tr>

        <!-- Order Summary -->
        <tr>
          <td style="padding: 16px 32px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 2px solid #1f1f1f; text-transform: uppercase; color: #6b6b6b; font-size: 11px; letter-spacing: 0.08em;">
                  <th align="left" style="padding-bottom: 8px;">Piece Description</th>
                  <th align="center" style="padding-bottom: 8px;">Qty</th>
                  <th align="right" style="padding-bottom: 8px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsListHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" align="right" style="padding-top: 16px; font-weight: 700; color: #1f1f1f; font-size: 15px;">TOTAL AMOUNT PAID:</td>
                  <td align="right" style="padding-top: 16px; font-weight: 700; color: #2e7d32; font-size: 17px;">$${(order.totalAmount || 0).toLocaleString()} USD</td>
                </tr>
              </tfoot>
            </table>
          </td>
        </tr>

        <!-- Shipping Address -->
        <tr>
          <td style="padding: 16px 32px 32px;">
            <div style="background-color: #faf8f5; border: 1px solid #e8e3d9; padding: 16px; border-radius: 4px;">
              <h4 style="margin: 0 0 6px 0; color: #1f1f1f; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Delivery Address</h4>
              <p style="margin: 0; color: #55524d; font-size: 13px; line-height: 1.4;">${order.shippingAddress || 'As specified on checkout'}</p>
            </div>
          </td>
        </tr>

        <!-- Action CTA Button -->
        <tr>
          <td style="padding: 0 32px 40px; text-align: center;">
            <a href="https://auroradiamonds.com/account#my-orders" style="background-color: #1f1f1f; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; display: inline-block; border-radius: 2px;">TRACK YOUR ORDER LIVE →</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #faf8f5; border-top: 1px solid #e8e3d9; padding: 20px; text-align: center; color: #77736c; font-size: 12px; line-height: 1.5;">
            Need assistance? Reply directly to this email or contact our Private Concierge at <a href="mailto:concierge@auroradiamonds.com" style="color: #c9a45c; text-decoration: none;">concierge@auroradiamonds.com</a>.<br>
            © ${new Date().getFullYear()} Aura Diamond Atelier. All rights reserved.
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // Send to Customer
    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      subject: `Order Confirmation #${order.orderNumber} - Aura Diamond Atelier`,
      html: htmlContent,
    });

    console.log(`✉️ Order Confirmation email sent to ${recipientEmail}: ${info.messageId}`);

    // Send copy notification to Store Owner
    const adminNotifyEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER;
    if (adminNotifyEmail) {
      await transporter.sendMail({
        from: fromAddress,
        to: adminNotifyEmail,
        subject: `NEW STORE ORDER RECEIVED: #${order.orderNumber} ($${order.totalAmount})`,
        html: htmlContent,
      }).catch(console.error);
    }

  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

export const sendOrderDispatchEmail = async (order: any, courierCompany: string, trackingNumber: string) => {
  try {
    const transporter = createTransporter();
    const fromAddress = process.env.SMTP_FROM || `"Aura Diamond Atelier" <${process.env.SMTP_USER || 'concierge@auroradiamonds.com'}>`;
    const recipientEmail = order.customerEmail;

    if (!recipientEmail) return;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Order Has Been Dispatched - Aura Diamond Atelier</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f7f2; margin: 0; padding: 40px 10px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d9d3c7; border-radius: 4px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.06);">
        <tr>
          <td style="background-color: #1f1f1f; padding: 28px 20px; text-align: center;">
            <h1 style="color: #c9a45c; font-family: Georgia, serif; font-size: 24px; letter-spacing: 0.15em; margin: 0; text-transform: uppercase;">AURA DIAMOND ATELIER</h1>
            <p style="color: #e8e3d9; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 6px 0 0 0;">Insured White-Glove Transit</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px; text-align: center;">
            <div style="background-color: #eefbe7; border: 1px solid #2e7d32; color: #2e7d32; padding: 6px 16px; display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 20px; margin-bottom: 12px;">DISPATCHED & IN TRANSIT</div>
            <h2 style="font-size: 22px; font-family: Georgia, serif; color: #1f1f1f; margin: 0 0 12px 0;">Your Order #${order.orderNumber} Is On Its Way</h2>
            <p style="color: #55524d; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">Your handcrafted piece has completed final quality authentication and is now in fully insured transit.</p>

            <div style="background-color: #faf5eb; border: 1.5px solid #c9a45c; padding: 20px; border-radius: 4px; text-align: left; margin-bottom: 28px;">
              <div style="font-size: 11px; font-weight: 700; color: #6b6b6b; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">COURIER CARRIER</div>
              <div style="font-size: 16px; font-weight: 700; color: #1f1f1f; margin-bottom: 12px;">${courierCompany || 'Insured Express Courier'}</div>

              <div style="font-size: 11px; font-weight: 700; color: #6b6b6b; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">WAYBILL / TRACKING NUMBER</div>
              <div style="font-size: 18px; font-weight: 700; color: #c9a45c; font-family: monospace;">${trackingNumber || 'N/A'}</div>
            </div>

            <a href="https://auroradiamonds.com/account#my-orders" style="background-color: #1f1f1f; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; display: inline-block; border-radius: 2px;">TRACK SHIPMENT LIVE →</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      subject: `Order #${order.orderNumber} Dispatched - Tracking ID: ${trackingNumber}`,
      html: htmlContent,
    });

    console.log(`✉️ Order Dispatch email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending order dispatch email:', error);
  }
};
