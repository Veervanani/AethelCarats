import XLSX from 'xlsx';
import { Response } from 'express';

export function exportOrdersToExcel(orders: any[], res: Response) {
  const data = orders.map((o) => {
    const successfulPayments = (o.payments || []).filter((p: any) => p.status === 'SUCCESS');
    const totalPaid = successfulPayments.reduce((acc: number, p: any) => acc + p.amount, 0);
    const totalRefunds = (o.refunds || []).reduce((acc: number, r: any) => acc + r.amount, 0);
    const netPaid = totalPaid - totalRefunds;
    const balanceDue = Math.max(0, o.totalAmount - netPaid);

    return {
      'Order ID': o.orderNumber,
      'Order Date': new Date(o.orderDate).toISOString().split('T')[0],
      'Customer Name': o.customerName || 'Guest',
      'Customer Email': o.customerEmail || '',
      'Customer Phone': o.customerPhone || '',
      'Items Count': o.items ? o.items.length : 0,
      Subtotal: o.subtotal,
      Discount: o.discount,
      Tax: o.tax,
      Shipping: o.shippingFee,
      'Total Amount': o.totalAmount,
      Currency: o.currency,
      'Amount Paid': totalPaid,
      'Refunds Total': totalRefunds,
      'Balance Due': balanceDue,
      'Payment Status': o.calculatedStatus || 'UNPAID',
      'Order Status': o.orderStatus,
      'Last Payment Date': successfulPayments.length > 0 ? new Date(successfulPayments[successfulPayments.length - 1].paymentDate).toISOString().split('T')[0] : 'N/A',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="Floksy_Jewel_Orders_${new Date().toISOString().split('T')[0]}.xlsx"`);
  res.send(buffer);
}

export function exportPaymentsToExcel(payments: any[], res: Response) {
  const data = payments.map((p) => ({
    'Payment ID': p.paymentNumber || p.id,
    'Payment Date': new Date(p.paymentDate).toISOString().split('T')[0],
    'Order ID': p.order ? p.order.orderNumber : p.orderId,
    Customer: p.order ? p.order.customerName : 'N/A',
    Amount: p.amount,
    Currency: p.currency,
    'Payment Method': p.paymentMethod,
    'Transaction / Reference ID': p.referenceId || 'N/A',
    Status: p.status,
    'Recorded By': p.recordedBy || 'Admin',
    Notes: p.notes || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="Floksy_Jewel_Payments_${new Date().toISOString().split('T')[0]}.xlsx"`);
  res.send(buffer);
}

export function exportOrdersToCsv(orders: any[], res: Response) {
  const data = orders.map((o) => {
    const successfulPayments = (o.payments || []).filter((p: any) => p.status === 'SUCCESS');
    const totalPaid = successfulPayments.reduce((acc: number, p: any) => acc + p.amount, 0);
    const totalRefunds = (o.refunds || []).reduce((acc: number, r: any) => acc + r.amount, 0);
    const netPaid = totalPaid - totalRefunds;
    const balanceDue = Math.max(0, o.totalAmount - netPaid);

    return {
      'Order ID': o.orderNumber,
      'Order Date': new Date(o.orderDate).toISOString().split('T')[0],
      'Customer Name': o.customerName || 'Guest',
      'Customer Email': o.customerEmail || '',
      'Total Amount': o.totalAmount,
      Currency: o.currency,
      'Amount Paid': totalPaid,
      'Balance Due': balanceDue,
      'Payment Status': o.calculatedStatus || 'UNPAID',
      'Order Status': o.orderStatus,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="Floksy_Jewel_Orders_${new Date().toISOString().split('T')[0]}.csv"`);
  res.send(csv);
}
