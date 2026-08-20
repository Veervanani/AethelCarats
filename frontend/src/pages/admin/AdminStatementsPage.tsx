import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FileText, Download, Calendar, Filter, Eye, DollarSign, Printer, Table as TableIcon } from 'lucide-react';
import { financialApi } from '../../services/financialApi';

const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
  }
`;

const TabsHeader = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e8e3d9;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 12px 20px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#C9A45C' : 'transparent')};
  color: ${({ $active }) => ($active ? '#C9A45C' : '#666')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #c9a45c;
  }
`;

const Card = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 24px;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.3rem;
    color: #1f1f1f;
    margin-bottom: 16px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #555;
  }

  input,
  select {
    padding: 10px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button<{ $variant?: 'primary' | 'gold' | 'secondary' }>`
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'primary' ? '#1F1F1F' : $variant === 'gold' ? '#C9A45C' : '#D9D3C7'};
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? '#1F1F1F' : $variant === 'gold' ? '#C9A45C' : '#FFFDF9'};
  color: ${({ $variant }) => ($variant === 'primary' || $variant === 'gold' ? '#FFFDF9' : '#1F1F1F')};

  &:hover {
    opacity: 0.9;
  }
`;

const PreviewFrame = styled.iframe`
  width: 100%;
  height: 600px;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  margin-top: 20px;
`;

export const AdminStatementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'custom' | 'monthly' | 'yearly' | 'customer' | 'order'>('custom');

  // Custom Form
  const [customFrom, setCustomFrom] = useState('2026-08-01');
  const [customTo, setCustomTo] = useState('2026-08-31');
  const [customOrderStatus, setCustomOrderStatus] = useState('ALL');
  const [customPaymentStatus, setCustomPaymentStatus] = useState('ALL');

  // Monthly Form
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedYear, setSelectedYear] = useState(2026);

  // Yearly Form
  const [yearlyYear, setYearlyYear] = useState(2026);

  // Customer Form
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  // Order Form
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  // PDF Preview URL
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    financialApi.getCustomers().then((data) => {
      setCustomers(data);
      if (data.length > 0) setSelectedCustomerId(data[0].id);
    });
    financialApi.getOrders().then((data) => {
      setOrders(data);
      if (data.length > 0) setSelectedOrderId(data[0].id);
    });
  }, []);

  const handleGenerateCustomPdf = () => {
    const url = financialApi.getCustomStatementPdfUrl(customFrom, customTo, customOrderStatus, customPaymentStatus);
    setPreviewPdfUrl(url);
    financialApi.downloadPdfBlob(url, `Custom_Statement_${customFrom}_to_${customTo}.pdf`);
  };

  const handlePreviewCustomPdf = () => {
    const url = financialApi.getCustomStatementPdfUrl(customFrom, customTo, customOrderStatus, customPaymentStatus);
    setPreviewPdfUrl(url);
  };

  const handleGenerateMonthlyPdf = () => {
    const url = financialApi.getMonthlyStatementPdfUrl(selectedMonth, selectedYear);
    setPreviewPdfUrl(url);
    financialApi.downloadPdfBlob(url, `Monthly_Statement_${selectedMonth}_${selectedYear}.pdf`);
  };

  const handleGenerateYearlyPdf = () => {
    const url = financialApi.getYearlyStatementPdfUrl(yearlyYear);
    setPreviewPdfUrl(url);
    financialApi.downloadPdfBlob(url, `Yearly_Statement_${yearlyYear}.pdf`);
  };

  const handleGenerateCustomerPdf = () => {
    if (!selectedCustomerId) return;
    const url = financialApi.getCustomerStatementPdfUrl(selectedCustomerId);
    setPreviewPdfUrl(url);
    financialApi.downloadPdfBlob(url, `Customer_Statement_${selectedCustomerId}.pdf`);
  };

  const handleGenerateOrderPdf = () => {
    if (!selectedOrderId) return;
    const url = financialApi.getOrderStatementPdfUrl(selectedOrderId);
    setPreviewPdfUrl(url);
    financialApi.downloadPdfBlob(url, `Order_Statement_${selectedOrderId}.pdf`);
  };

  return (
    <div>
      <PageHeader>
        <h1>Statements & Financial Reports Hub</h1>
        <p style={{ color: '#666', fontSize: '0.85rem' }}>
          Generate, preview, and download official Floksy Jewel PDFs and Excel reports.
        </p>
      </PageHeader>

      <TabsHeader>
        <TabButton $active={activeTab === 'custom'} onClick={() => setActiveTab('custom')}>
          Custom Date Statement
        </TabButton>
        <TabButton $active={activeTab === 'monthly'} onClick={() => setActiveTab('monthly')}>
          Monthly Statement
        </TabButton>
        <TabButton $active={activeTab === 'yearly'} onClick={() => setActiveTab('yearly')}>
          Yearly Statement
        </TabButton>
        <TabButton $active={activeTab === 'customer'} onClick={() => setActiveTab('customer')}>
          Customer Statement
        </TabButton>
        <TabButton $active={activeTab === 'order'} onClick={() => setActiveTab('order')}>
          Order Statement
        </TabButton>
      </TabsHeader>

      {/* TAB 1: CUSTOM DATE STATEMENT */}
      {activeTab === 'custom' && (
        <Card>
          <h2>Custom Date Range Financial Statement</h2>
          <FormGrid>
            <FormGroup>
              <label>From Date</label>
              <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>To Date</label>
              <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label>Payment Status</label>
              <select value={customPaymentStatus} onChange={(e) => setCustomPaymentStatus(e.target.value)}>
                <option value="ALL">All Payment Statuses</option>
                <option value="UNPAID">UNPAID</option>
                <option value="PARTIALLY PAID">PARTIALLY PAID</option>
                <option value="PAID">PAID</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Order Status</label>
              <select value={customOrderStatus} onChange={(e) => setCustomOrderStatus(e.target.value)}>
                <option value="ALL">All Order Statuses</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="IN_PRODUCTION">IN PRODUCTION</option>
                <option value="DELIVERED">DELIVERED</option>
              </select>
            </FormGroup>
          </FormGrid>

          <ButtonRow>
            <ActionBtn $variant="gold" onClick={handlePreviewCustomPdf}>
              <Eye size={16} /> Preview PDF
            </ActionBtn>
            <ActionBtn $variant="primary" onClick={handleGenerateCustomPdf}>
              <Download size={16} /> Download Statement PDF
            </ActionBtn>
            <ActionBtn $variant="secondary" onClick={() => financialApi.downloadExportFile('excel', 'orders', customFrom, customTo)}>
              <TableIcon size={16} /> Export Excel
            </ActionBtn>
            <ActionBtn $variant="secondary" onClick={() => financialApi.downloadExportFile('csv', 'orders', customFrom, customTo)}>
              <TableIcon size={16} /> Export CSV
            </ActionBtn>
          </ButtonRow>
        </Card>
      )}

      {/* TAB 2: MONTHLY STATEMENT */}
      {activeTab === 'monthly' && (
        <Card>
          <h2>Monthly Atelier Order & Payment Statement</h2>
          <FormGrid>
            <FormGroup>
              <label>Select Month</label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                {[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ].map((m, idx) => (
                  <option key={idx} value={idx + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label>Select Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </FormGroup>
          </FormGrid>

          <ButtonRow>
            <ActionBtn
              $variant="gold"
              onClick={() => {
                const url = financialApi.getMonthlyStatementPdfUrl(selectedMonth, selectedYear);
                setPreviewPdfUrl(url);
              }}
            >
              <Eye size={16} /> Preview Monthly PDF
            </ActionBtn>
            <ActionBtn $variant="primary" onClick={handleGenerateMonthlyPdf}>
              <Download size={16} /> Download Monthly Statement PDF
            </ActionBtn>
            <ActionBtn $variant="secondary" onClick={() => financialApi.downloadExportFile('excel', 'orders')}>
              <TableIcon size={16} /> Export Monthly Excel
            </ActionBtn>
          </ButtonRow>
        </Card>
      )}

      {/* TAB 3: YEARLY STATEMENT */}
      {activeTab === 'yearly' && (
        <Card>
          <h2>Annual Financial & Sales Statement</h2>
          <FormGrid>
            <FormGroup>
              <label>Select Year</label>
              <select value={yearlyYear} onChange={(e) => setYearlyYear(Number(e.target.value))}>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </FormGroup>
          </FormGrid>

          <ButtonRow>
            <ActionBtn
              $variant="gold"
              onClick={() => {
                const url = financialApi.getYearlyStatementPdfUrl(yearlyYear);
                setPreviewPdfUrl(url);
              }}
            >
              <Eye size={16} /> Preview Annual PDF
            </ActionBtn>
            <ActionBtn $variant="primary" onClick={handleGenerateYearlyPdf}>
              <Download size={16} /> Download Annual Statement PDF
            </ActionBtn>
            <ActionBtn $variant="secondary" onClick={() => financialApi.downloadExportFile('excel', 'orders')}>
              <TableIcon size={16} /> Export Annual Excel
            </ActionBtn>
          </ButtonRow>
        </Card>
      )}

      {/* TAB 4: CUSTOMER STATEMENT */}
      {activeTab === 'customer' && (
        <Card>
          <h2>Customer Account Statement</h2>
          <FormGrid>
            <FormGroup>
              <label>Select Client Account</label>
              <select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </FormGroup>
          </FormGrid>

          <ButtonRow>
            <ActionBtn
              $variant="gold"
              onClick={() => {
                const url = financialApi.getCustomerStatementPdfUrl(selectedCustomerId);
                setPreviewPdfUrl(url);
              }}
            >
              <Eye size={16} /> Preview Customer PDF
            </ActionBtn>
            <ActionBtn $variant="primary" onClick={handleGenerateCustomerPdf}>
              <Download size={16} /> Download Customer Statement PDF
            </ActionBtn>
          </ButtonRow>
        </Card>
      )}

      {/* TAB 5: ORDER STATEMENT */}
      {activeTab === 'order' && (
        <Card>
          <h2>Order Statement & Invoice Generator</h2>
          <FormGrid>
            <FormGroup>
              <label>Select Order</label>
              <select value={selectedOrderId} onChange={(e) => setSelectedOrderId(e.target.value)}>
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    #{o.orderNumber} - {o.customerName} (${o.totalAmount})
                  </option>
                ))}
              </select>
            </FormGroup>
          </FormGrid>

          <ButtonRow>
            <ActionBtn $variant="gold" onClick={handleGenerateOrderPdf}>
              <Download size={16} /> Download Order Statement PDF
            </ActionBtn>
            <ActionBtn
              $variant="primary"
              onClick={() => {
                const url = financialApi.getInvoicePdfUrl(selectedOrderId);
                financialApi.downloadPdfBlob(url, `Invoice_${selectedOrderId}.pdf`);
              }}
            >
              <Download size={16} /> Download Tax Invoice PDF
            </ActionBtn>
          </ButtonRow>
        </Card>
      )}

      {/* PDF PREVIEW FRAME */}
      {previewPdfUrl && (
        <Card>
          <h2>Document Live PDF Preview</h2>
          <PreviewFrame src={previewPdfUrl} title="Statement Preview" />
        </Card>
      )}
    </div>
  );
};
