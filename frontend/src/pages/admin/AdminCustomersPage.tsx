import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Download, FileText, Plus, User, Eye, ArrowRight } from 'lucide-react';
import { financialApi } from '../../services/financialApi';
import { AdminPageHeader } from '../../components/admin/AdminUI';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
  }
`;

const SearchInputWrapper = styled.div`
  max-width: 400px;
  position: relative;
  margin-bottom: 24px;

  input {
    width: 100%;
    padding: 10px 14px 10px 38px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #8c877b;
  }
`;

const TableContainer = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  min-width: 750px;
  border-collapse: collapse;
  font-size: 0.85rem;

  th {
    background: #1a1918;
    color: #fffdf9;
    padding: 12px 16px;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #e8e3d9;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LedgerDrawer = styled.div`
  background: #fffdf9;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.5rem;
    color: #1f1f1f;
    margin-bottom: 8px;
  }
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 16px 0;
  background: #f7f5f0;
  padding: 14px;
  border-radius: 4px;

  .stat {
    div.lbl {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #777;
    }
    div.val {
      font-weight: 700;
      font-size: 1.1rem;
      color: #1f1f1f;
    }
  }
`;

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Selected customer for Ledger drawer
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerLedger, setCustomerLedger] = useState<any>(null);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await financialApi.getCustomers();
      setCustomers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const openCustomerLedger = async (cust: any) => {
    setSelectedCustomer(cust);
    try {
      const detail = await financialApi.getCustomerDetail(cust.id);
      setCustomerLedger(detail);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminPageHeader
        title="Customer Management"
        description="View client account profiles, financial ledgers, order history, and download statements."
      />

      <SearchInputWrapper>
        <Search size={16} />
        <input
          type="text"
          placeholder="Search by Customer Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchInputWrapper>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact Phone</th>
              <th>Orders</th>
              <th>Total Invoiced</th>
              <th>Total Paid</th>
              <th>Net Balance Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                  Loading customer financial data...
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                  No customer records found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1f1f1f' }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>{c.email}</div>
                  </td>
                  <td>{c.phone || 'N/A'}</td>
                  <td style={{ fontWeight: 600 }}>{c.totalOrdersCount} Orders</td>
                  <td style={{ fontWeight: 600 }}>
                    USD ${c.totalInvoiced?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ color: '#2e7d32', fontWeight: 600 }}>
                    USD ${c.netPaid?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ color: c.outstandingBalance > 0 ? '#c5221f' : '#777', fontWeight: 700 }}>
                    USD ${c.outstandingBalance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => openCustomerLedger(c)}
                        style={{
                          padding: '6px 12px',
                          background: '#1F1F1F',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Eye size={14} /> Ledger Statement
                      </button>

                      <button
                        onClick={() =>
                          financialApi.downloadPdfBlob(
                            financialApi.getCustomerStatementPdfUrl(c.id),
                            `Customer_Statement_${c.name.replace(/\s+/g, '_')}.pdf`
                          )
                        }
                        title="Download Statement PDF"
                        style={{
                          padding: '6px 10px',
                          background: '#FFFDF9',
                          border: '1px solid #D9D3C7',
                          borderRadius: 4,
                          cursor: 'pointer',
                        }}
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* CUSTOMER ACCOUNT STATEMENT DRAWER */}
      {selectedCustomer && (
        <ModalOverlay onClick={() => setSelectedCustomer(null)}>
          <LedgerDrawer onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2>{selectedCustomer.name} - Account Ledger</h2>
                <div style={{ color: '#666', fontSize: '0.85rem' }}>{selectedCustomer.email}</div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {customerLedger && (
              <>
                <SummaryRow>
                  <div className="stat">
                    <div className="lbl">Total Invoiced</div>
                    <div className="val">${customerLedger.financialSummary?.totalInvoiced?.toLocaleString()}</div>
                  </div>
                  <div className="stat">
                    <div className="lbl">Payments Received</div>
                    <div className="val" style={{ color: '#2e7d32' }}>
                      ${customerLedger.financialSummary?.totalPaid?.toLocaleString()}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="lbl">Total Refunded</div>
                    <div className="val" style={{ color: '#c5221f' }}>
                      ${customerLedger.financialSummary?.totalRefunds?.toLocaleString()}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="lbl">Outstanding Due</div>
                    <div className="val" style={{ color: '#c9a45c' }}>
                      ${customerLedger.financialSummary?.outstandingBalance?.toLocaleString()}
                    </div>
                  </div>
                </SummaryRow>

                <h3 style={{ fontSize: '1rem', marginTop: 20, marginBottom: 12 }}>Orders & Transactions</h3>
                <Table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description / Ref</th>
                      <th>Debit (Billed)</th>
                      <th>Credit (Paid)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerLedger.orders.map((ord: any) => (
                      <React.Fragment key={ord.id}>
                        <tr>
                          <td style={{ fontWeight: 600 }}>{new Date(ord.orderDate).toLocaleDateString()}</td>
                          <td>Order #{ord.orderNumber}</td>
                          <td style={{ fontWeight: 700 }}>${ord.totalAmount?.toLocaleString()}</td>
                          <td>-</td>
                          <td>
                            <span
                              style={{
                                fontSize: '0.7rem',
                                padding: '2px 6px',
                                borderRadius: 4,
                                background: ord.calculatedStatus === 'PAID' ? '#E6F4EA' : '#FEF7E0',
                                color: ord.calculatedStatus === 'PAID' ? '#137333' : '#B06000',
                              }}
                            >
                              {ord.calculatedStatus}
                            </span>
                          </td>
                        </tr>
                        {(ord.payments || []).map((pay: any) => (
                          <tr key={pay.id} style={{ background: '#fcfcfc' }}>
                            <td style={{ paddingLeft: 24, fontSize: '0.8rem', color: '#666' }}>
                              ↳ {new Date(pay.paymentDate).toLocaleDateString()}
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#666' }}>
                              Payment ({pay.paymentMethod}) - {pay.referenceId || 'N/A'}
                            </td>
                            <td>-</td>
                            <td style={{ color: '#2e7d32', fontWeight: 600 }}>${pay.amount?.toLocaleString()}</td>
                            <td style={{ fontSize: '0.75rem', color: '#2e7d32' }}>SUCCESS</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
              <button
                onClick={() =>
                  financialApi.downloadPdfBlob(
                    financialApi.getCustomerStatementPdfUrl(selectedCustomer.id),
                    `Customer_Statement_${selectedCustomer.name.replace(/\s+/g, '_')}.pdf`
                  )
                }
                style={{
                  padding: '10px 20px',
                  background: '#C9A45C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Download size={16} /> Download Full Statement PDF
              </button>
            </div>
          </LedgerDrawer>
        </ModalOverlay>
      )}
    </div>
  );
};
