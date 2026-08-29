import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { InternalSale } from '../types';
import {
  ArrowLeft,
  Printer,
  Trash2,
  Edit2,
  ExternalLink,
  ShieldCheck,
  Gem,
  DollarSign,
  Truck,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const InvoiceCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
`;

const InvoiceTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 2px solid #0d1319;
  margin-bottom: 24px;

  .brand {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #0d1319;
  }
  .sub {
    font-size: 0.75rem;
    color: #64748b;
    letter-spacing: 0.05em;
  }

  .inv-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    text-align: right;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const Box = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;

  .box-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #475569;
    letter-spacing: 0.06em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  padding: 4px 0;

  .label {
    color: #64748b;
  }
  .val {
    color: #0f172a;
    font-weight: 600;
  }
`;

const FinancialTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
  margin-top: 10px;

  th {
    background: #0d1319;
    color: #ffffff;
    padding: 10px 14px;
    text-align: left;
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid #e2e8f0;
  }

  .total-row {
    background: #f1f5f9;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .profit-row {
    background: #ebfbee;
    color: #2b8a3e;
    font-weight: 800;
    font-size: 0.95rem;
  }
`;

export const BusinessSaleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sale, setSale] = useState<InternalSale | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSale = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await businessApi.getSaleById(id);
      setSale(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSale();
  }, [id]);

  const handleDelete = async () => {
    if (!sale || !window.confirm(`Delete invoice ${sale.invoiceNo}?`)) return;
    try {
      await businessApi.deleteSale(sale.id);
      alert('Sale deleted');
      navigate(`${PRIVATE_BUSINESS_PATH}/sales`);
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  const handleApproveCommission = async () => {
    if (!sale?.commission?.id) return;
    try {
      await businessApi.approveCommission(sale.commission.id);
      alert('✅ Commission approved!');
      fetchSale();
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Approval failed');
    }
  };

  const handlePayCommission = async () => {
    if (!sale?.commission?.id) return;
    const ref = prompt('Enter payment reference (e.g. Wire Ref # / Check #):', 'Bank Transfer');
    if (!ref) return;
    try {
      await businessApi.payCommission(sale.commission.id, ref);
      alert('✅ Commission marked as paid!');
      fetchSale();
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Payout update failed');
    }
  };

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading Invoice Record...</div>;
  }

  if (!sale) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Invoice not found.</div>;
  }

  return (
    <div>
      <PageHeader>
        <Link
          to={`${PRIVATE_BUSINESS_PATH}/sales`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b', textDecoration: 'none' }}
        >
          <ArrowLeft size={14} /> Back to Sales Tracker
        </Link>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              borderRadius: 6,
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Printer size={14} /> Print Invoice
          </button>
          <button
            onClick={handleDelete}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              border: '1px solid #fee2e2',
              background: '#fff5f5',
              color: '#dc2626',
              borderRadius: 6,
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </PageHeader>

      <InvoiceCard>
        <InvoiceTopBar>
          <div>
            <div className="brand">FLOKSY JEWEL</div>
            <div className="sub">FINE JEWELLERY & HIGH ATELIER OPERATIONS</div>
          </div>
          <div>
            <div className="inv-title">{sale.invoiceNo}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'right' }}>
              Date: {new Date(sale.saleDate).toLocaleDateString()}
            </div>
            <div style={{ marginTop: 6, textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', padding: '3px 8px', background: '#0d1319', color: '#fff', borderRadius: 4, fontWeight: 700 }}>
                {sale.orderStatus}
              </span>
            </div>
          </div>
        </InvoiceTopBar>

        <DetailGrid>
          {/* Customer & Delivery */}
          <Box>
            <div className="box-title">
              <ShieldCheck size={14} color="#0d1319" /> Customer & Shipping
            </div>
            <InfoRow>
              <span className="label">Customer:</span>
              <span className="val">{sale.customerName}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Country:</span>
              <span className="val">{sale.customerCountry || '-'}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Sales Person:</span>
              <span className="val">{sale.salesPersonName || '-'}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Payment Status:</span>
              <span className="val" style={{ color: sale.paymentStatus === 'Paid' ? '#16a34a' : '#d97706' }}>
                {sale.paymentStatus}
              </span>
            </InfoRow>
            <InfoRow>
              <span className="label">Payment Method:</span>
              <span className="val">{sale.paymentMethod || 'Bank Wire'}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Tracking:</span>
              <span className="val">
                {sale.trackingNumber ? (
                  sale.trackingLink ? (
                    <a href={sale.trackingLink} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>
                      {sale.trackingNumber} <ExternalLink size={10} />
                    </a>
                  ) : (
                    sale.trackingNumber
                  )
                ) : (
                  '-'
                )}
              </span>
            </InfoRow>
          </Box>

          {/* Product Specifications */}
          <Box>
            <div className="box-title">
              <Gem size={14} color="#e2b96f" /> Item Specifications ({sale.productType})
            </div>
            {sale.productType === 'Diamond' ? (
              <>
                <InfoRow>
                  <span className="label">Type / Shape:</span>
                  <span className="val">
                    {sale.stoneType || 'Natural'} {sale.shape}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Carat Weight:</span>
                  <span className="val">{sale.caratWeight ? `${sale.caratWeight} ct` : '-'}</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Color / Clarity:</span>
                  <span className="val">
                    {sale.diamondColor} / {sale.clarity}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Cut / Polish / Symm:</span>
                  <span className="val">
                    {sale.cut} / {sale.polish} / {sale.symmetry}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Fluorescence:</span>
                  <span className="val">{sale.fluorescence || 'None'}</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Certificate:</span>
                  <span className="val">
                    {sale.certificate} {sale.certificateNo ? `#${sale.certificateNo}` : ''}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Measurements:</span>
                  <span className="val">{sale.measurement || '-'}</span>
                </InfoRow>
              </>
            ) : (
              <>
                <InfoRow>
                  <span className="label">Description:</span>
                  <span className="val">{sale.productDescription || '-'}</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Quantity:</span>
                  <span className="val">{sale.quantity || 1}</span>
                </InfoRow>
              </>
            )}
            <InfoRow>
              <span className="label">Supplier:</span>
              <span className="val">{sale.supplierName || 'None'}</span>
            </InfoRow>
          </Box>
        </DetailGrid>

        {/* Financial Breakdown Table */}
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '24px 0 10px 0' }}>Authoritative Financial Ledger</h3>
        <FinancialTable>
          <thead>
            <tr>
              <th>Financial Component</th>
              <th>Calculation Rule</th>
              <th style={{ textAlign: 'right' }}>Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross Selling Price</td>
              <td style={{ color: '#64748b' }}>Original quoted catalog price</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>${sale.sellingPrice?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Discount Applied</td>
              <td style={{ color: '#64748b' }}>Customer negotiated reduction</td>
              <td style={{ textAlign: 'right', color: '#dc2626' }}>-${sale.discount?.toLocaleString()}</td>
            </tr>
            <tr className="total-row">
              <td>Final Sale Amount (Net Billed)</td>
              <td>Selling Price - Discount</td>
              <td style={{ textAlign: 'right' }}>${sale.finalSaleAmount?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Base Purchase Cost</td>
              <td style={{ color: '#64748b' }}>Atelier / Supplier procurement cost</td>
              <td style={{ textAlign: 'right' }}>${sale.purchasePrice?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>GST ({(sale.gstPercent * 100).toFixed(2)}%)</td>
              <td style={{ color: '#64748b' }}>Purchase Price × GST %</td>
              <td style={{ textAlign: 'right' }}>+${sale.gstAmount?.toLocaleString()}</td>
            </tr>
            <tr className="total-row">
              <td>Final Purchase Cost (COGS)</td>
              <td>Purchase Price + GST Amount</td>
              <td style={{ textAlign: 'right' }}>${sale.finalPurchasePrice?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Shipping / Logistics Cost</td>
              <td style={{ color: '#64748b' }}>Courier, Armored Freight & Insurance</td>
              <td style={{ textAlign: 'right', color: '#dc2626' }}>-${sale.shippingCost?.toLocaleString()}</td>
            </tr>
            <tr className="profit-row">
              <td>Net Profit Generated</td>
              <td>Final Sale - Final Purchase - Shipping</td>
              <td style={{ textAlign: 'right' }}>${sale.netProfit?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Sales Commission ({(sale.commissionPercent * 100).toFixed(1)}%)</td>
              <td style={{ color: '#64748b' }}>Net Profit × Commission %</td>
              <td style={{ textAlign: 'right', color: '#d97706', fontWeight: 700 }}>
                -${sale.commissionAmount?.toLocaleString()}
              </td>
            </tr>
            <tr style={{ background: '#f8fafc', fontWeight: 800 }}>
              <td>Profit Retained by Floksy Jewel</td>
              <td>Net Profit - Commission Amount</td>
              <td style={{ textAlign: 'right', color: '#0d1319', fontSize: '1rem' }}>
                ${sale.profitAfterCommission?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </FinancialTable>

        {/* Commission Action Card */}
        {sale.commission && (
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: 16,
              marginTop: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Commission Workflow Status
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <Award size={16} color="#d97706" />
                ${sale.commission.commissionAmount.toLocaleString()} ({sale.commission.status})
              </div>
              {sale.commission.approvedBy && (
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>
                  Approved by {sale.commission.approvedBy} on {new Date(sale.commission.approvedAt!).toLocaleDateString()}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {sale.commission.status === 'PENDING' && (
                <button
                  onClick={handleApproveCommission}
                  style={{
                    padding: '8px 16px',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Approve Commission
                </button>
              )}
              {sale.commission.status === 'APPROVED' && (
                <button
                  onClick={handlePayCommission}
                  style={{
                    padding: '8px 16px',
                    background: '#16a34a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        )}
      </InvoiceCard>
    </div>
  );
};
