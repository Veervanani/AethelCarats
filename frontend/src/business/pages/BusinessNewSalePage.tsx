import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { Employee, Supplier } from '../types';
import {
  ArrowLeft,
  Gem,
  Sparkles,
  DollarSign,
  Calculator,
  ShieldCheck,
  Truck,
  AlertCircle,
} from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  .section-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f1f5f9;
  }
`;

const GridTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GridThree = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
  }

  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;
    background: #ffffff;

    &:focus {
      border-color: #0d1319;
      box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.1);
    }
  }
`;

const TypeSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;

  button {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.15s ease;

    &.active {
      border-color: #0d1319;
      background: #0d1319;
      color: #ffffff;
    }
  }
`;

const SummaryLedger = styled.div`
  background: #0d1319;
  color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  position: sticky;
  top: 80px;

  .ledger-title {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #e2b96f;
    margin-bottom: 14px;
  }

  .ledger-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &.highlight {
      font-size: 0.95rem;
      font-weight: 700;
      color: #e2b96f;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 10px 0;
      margin: 8px 0;
    }

    &.net-profit {
      color: #51cf66;
      font-weight: 700;
    }
  }
`;

export const BusinessNewSalePage: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // Form state
  const [productType, setProductType] = useState<'Diamond' | 'Jewelry'>('Diamond');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerCountry, setCustomerCountry] = useState('');
  const [duplicateMatches, setDuplicateMatches] = useState<any[]>([]);

  // Diamond Specs
  const [stoneType, setStoneType] = useState('Natural');
  const [shape, setShape] = useState('Round');
  const [diamondColor, setDiamondColor] = useState('F');
  const [clarity, setClarity] = useState('VS1');
  const [cut, setCut] = useState('3EX');
  const [polish, setPolish] = useState('EX');
  const [symmetry, setSymmetry] = useState('EX');
  const [fluorescence, setFluorescence] = useState('None');
  const [measurement, setMeasurement] = useState('');
  const [pricePerCarat, setPricePerCarat] = useState<number | ''>('');
  const [caratWeight, setCaratWeight] = useState<number | ''>('');
  const [certificate, setCertificate] = useState('GIA');
  const [certificateNo, setCertificateNo] = useState('');

  // Jewelry Specs
  const [productDescription, setProductDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);

  // Supplier & Vendor
  const [supplierName, setSupplierName] = useState('');

  // Financials
  const [purchasePrice, setPurchasePrice] = useState<number | ''>('');
  const [sellingPrice, setSellingPrice] = useState<number | ''>('');
  const [discount, setDiscount] = useState<number | ''>(0);
  const [shippingCost, setShippingCost] = useState<number | ''>(0);
  const [gstPercent, setGstPercent] = useState<number | ''>(0.015); // Default 1.5% from Excel

  // Salesperson & Commission
  const [employeeId, setEmployeeId] = useState('');
  const [commissionPercent, setCommissionPercent] = useState<number | ''>(0.05); // Default 5%

  // Payment & Logistics
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [paymentMethod, setPaymentMethod] = useState('Bank Wire');
  const [amountReceived, setAmountReceived] = useState<number | ''>('');
  const [orderStatus, setOrderStatus] = useState('Delivered');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    businessApi.getEmployees({ status: 'ACTIVE' }).then((res) => {
      setEmployees(res.employees || []);
      if (res.employees && res.employees.length > 0 && !employeeId) {
        setEmployeeId(res.employees[0].id);
      }
    });
    businessApi.getSuppliers().then((res) => setSuppliers(res || []));
  }, []);

  // Duplicate Customer Check
  useEffect(() => {
    if (!customerName || customerName.trim().length < 2) {
      setDuplicateMatches([]);
      return;
    }
    const timeout = setTimeout(() => {
      businessApi.checkDuplicateCustomer({ name: customerName }).then((res) => {
        setDuplicateMatches(res.matches || []);
      });
    }, 400);
    return () => clearTimeout(timeout);
  }, [customerName]);

  // Live Authoritative Calculation Engine
  const financials = useMemo(() => {
    let effectivePurchase = Number(purchasePrice) || 0;
    if (productType === 'Diamond' && pricePerCarat && caratWeight && !purchasePrice) {
      effectivePurchase = Number((Number(pricePerCarat) * Number(caratWeight)).toFixed(2));
    }

    const sell = Number(sellingPrice) || 0;
    const disc = Number(discount) || 0;
    const finalSale = Math.max(0, sell - disc);

    const gstRate = Number(gstPercent) || 0;
    const gstAmt = Number((effectivePurchase * gstRate).toFixed(2));
    const finalPurchase = Number((effectivePurchase + gstAmt).toFixed(2));

    const ship = Number(shippingCost) || 0;
    const grossProfit = Number((finalSale - finalPurchase).toFixed(2));
    const netProfit = Number((grossProfit - ship).toFixed(2));

    const commRate = Number(commissionPercent) || 0;
    const commAmt = Number((Math.max(0, netProfit) * commRate).toFixed(2));
    const retainedProfit = Number((netProfit - commAmt).toFixed(2));

    const markup = finalPurchase > 0 ? Number(((netProfit / finalPurchase) * 100).toFixed(2)) : 0;
    const profitMargin = finalSale > 0 ? Number(((netProfit / finalSale) * 100).toFixed(2)) : 0;

    const recv = paymentStatus === 'Paid' ? finalSale : Number(amountReceived) || 0;
    const pending = paymentStatus === 'Paid' ? 0 : Math.max(0, Number((finalSale - recv).toFixed(2)));

    return {
      effectivePurchase,
      finalSale,
      gstAmt,
      finalPurchase,
      grossProfit,
      netProfit,
      commAmt,
      retainedProfit,
      markup,
      profitMargin,
      recv,
      pending,
    };
  }, [purchasePrice, pricePerCarat, caratWeight, sellingPrice, discount, gstPercent, shippingCost, commissionPercent, paymentStatus, amountReceived, productType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || sellingPrice === '') {
      alert('Please enter Customer Name and Selling Price.');
      return;
    }

    setSubmitting(true);
    try {
      const selectedEmp = employees.find((emp) => emp.id === employeeId);
      const res = await businessApi.createSale({
        invoiceNo: invoiceNo || undefined,
        saleDate,
        customerName,
        customerCountry,
        productType,
        productDescription: productDescription || (productType === 'Diamond' ? `${caratWeight || ''}ct ${shape} ${diamondColor}/${clarity}` : undefined),
        stoneType: productType === 'Diamond' ? stoneType : undefined,
        shape: productType === 'Diamond' ? shape : undefined,
        diamondColor: productType === 'Diamond' ? diamondColor : undefined,
        clarity: productType === 'Diamond' ? clarity : undefined,
        cut: productType === 'Diamond' ? cut : undefined,
        polish: productType === 'Diamond' ? polish : undefined,
        symmetry: productType === 'Diamond' ? symmetry : undefined,
        fluorescence: productType === 'Diamond' ? fluorescence : undefined,
        measurement: productType === 'Diamond' ? measurement : undefined,
        pricePerCarat: pricePerCarat ? Number(pricePerCarat) : undefined,
        caratWeight: caratWeight ? Number(caratWeight) : undefined,
        quantity: Number(quantity) || 1,
        certificate: productType === 'Diamond' ? certificate : undefined,
        certificateNo: productType === 'Diamond' ? certificateNo : undefined,
        supplierName: supplierName || undefined,
        purchasePrice: financials.effectivePurchase,
        sellingPrice: Number(sellingPrice),
        discount: Number(discount) || 0,
        shippingCost: Number(shippingCost) || 0,
        gstPercent: Number(gstPercent) || 0,
        employeeId: employeeId || undefined,
        salesPersonName: selectedEmp?.fullName || undefined,
        commissionPercent: Number(commissionPercent) || 0,
        paymentStatus,
        paymentMethod,
        amountReceived: Number(financials.recv),
        orderStatus,
        trackingNumber,
        trackingLink,
        notes,
      });

      alert(`✅ Invoice ${res.invoiceNo} created successfully!`);
      navigate(`${PRIVATE_BUSINESS_PATH}/sales/${res.id}`);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to create sale');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader>
        <div>
          <Link
            to={`${PRIVATE_BUSINESS_PATH}/sales`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b', textDecoration: 'none', marginBottom: 6 }}
          >
            <ArrowLeft size={14} /> Back to Sales Tracker
          </Link>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Create Internal Sale Invoice</h1>
        </div>
      </PageHeader>

      <TypeSelector>
        <button
          type="button"
          className={productType === 'Diamond' ? 'active' : ''}
          onClick={() => setProductType('Diamond')}
        >
          <Gem size={16} /> Loose Diamond Sale
        </button>
        <button
          type="button"
          className={productType === 'Jewelry' ? 'active' : ''}
          onClick={() => setProductType('Jewelry')}
        >
          <Sparkles size={16} /> Finished Jewelry Sale
        </button>
      </TypeSelector>

      <FormContainer onSubmit={handleSubmit}>
        <div>
          {/* General Information */}
          <SectionCard>
            <div className="section-title">
              <ShieldCheck size={16} color="#0d1319" /> Invoice & Customer Details
            </div>
            <GridTwo>
              <FormGroup>
                <label>Invoice Number (Leave blank to auto-generate)</label>
                <input
                  type="text"
                  placeholder="e.g. INV-1054"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>Sale Date *</label>
                <input
                  type="date"
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Customer Name *</label>
                <input
                  type="text"
                  placeholder="e.g. TG NZ or Mandy J."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                {duplicateMatches.length > 0 && (
                  <div style={{ fontSize: '0.72rem', color: '#d97706', marginTop: 4 }}>
                    ⚠️ {duplicateMatches.length} existing client match: {duplicateMatches[0].customer.name} ({duplicateMatches[0].reason})
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <label>Customer Country</label>
                <input
                  type="text"
                  placeholder="e.g. New Zealand, Thailand, USA"
                  value={customerCountry}
                  onChange={(e) => setCustomerCountry(e.target.value)}
                />
              </FormGroup>
            </GridTwo>
          </SectionCard>

          {/* Product Specifications */}
          {productType === 'Diamond' ? (
            <SectionCard>
              <div className="section-title">
                <Gem size={16} color="#e2b96f" /> Diamond Grading & Specifications
              </div>
              <GridThree>
                <FormGroup>
                  <label>Stone Type</label>
                  <select value={stoneType} onChange={(e) => setStoneType(e.target.value)}>
                    <option value="Natural">Natural</option>
                    <option value="CVD">CVD / Lab Grown</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Shape</label>
                  <select value={shape} onChange={(e) => setShape(e.target.value)}>
                    {['Round', 'Oval', 'Emerald', 'Pear', 'Radiant', 'Cushion', 'Princess', 'Marquise', 'Asscher', 'Heart'].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Carat Weight (ct)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 1.51"
                    value={caratWeight}
                    onChange={(e) => setCaratWeight(e.target.value ? Number(e.target.value) : '')}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Diamond Color</label>
                  <select value={diamondColor} onChange={(e) => setDiamondColor(e.target.value)}>
                    {['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Fancy Yellow', 'Fancy Pink', 'Fancy Blue'].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Clarity</label>
                  <select value={clarity} onChange={(e) => setClarity(e.target.value)}>
                    {['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1'].map((cl) => (
                      <option key={cl} value={cl}>
                        {cl}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Cut Grade</label>
                  <select value={cut} onChange={(e) => setCut(e.target.value)}>
                    <option value="3EX">3EX (Triple Excellent)</option>
                    <option value="EX">Excellent</option>
                    <option value="VG">Very Good</option>
                    <option value="GD">Good</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Polish</label>
                  <select value={polish} onChange={(e) => setPolish(e.target.value)}>
                    <option value="EX">Excellent</option>
                    <option value="VG">Very Good</option>
                    <option value="GD">Good</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Symmetry</label>
                  <select value={symmetry} onChange={(e) => setSymmetry(e.target.value)}>
                    <option value="EX">Excellent</option>
                    <option value="VG">Very Good</option>
                    <option value="GD">Good</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Fluorescence</label>
                  <select value={fluorescence} onChange={(e) => setFluorescence(e.target.value)}>
                    <option value="None">None</option>
                    <option value="Faint">Faint</option>
                    <option value="Medium">Medium</option>
                    <option value="Strong">Strong</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Certificate Lab</label>
                  <select value={certificate} onChange={(e) => setCertificate(e.target.value)}>
                    <option value="GIA">GIA</option>
                    <option value="IGI">IGI</option>
                    <option value="HRD">HRD</option>
                    <option value="None">None</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Certificate Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 2487612984"
                    value={certificateNo}
                    onChange={(e) => setCertificateNo(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Measurements (mm)</label>
                  <input
                    type="text"
                    placeholder="e.g. 7.42 x 7.45 x 4.58"
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}
                  />
                </FormGroup>
              </GridThree>
            </SectionCard>
          ) : (
            <SectionCard>
              <div className="section-title">
                <Sparkles size={16} color="#7950f2" /> Jewelry Specifications
              </div>
              <GridTwo>
                <FormGroup $fullWidth>
                  <label>Product Description / Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. 18K Yellow Gold Solitaire Engagement Ring with Pavé Band"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required={productType === 'Jewelry'}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </FormGroup>
              </GridTwo>
            </SectionCard>
          )}

          {/* Supplier, Pricing & Calculation Inputs */}
          <SectionCard>
            <div className="section-title">
              <Calculator size={16} color="#16a34a" /> Pricing & Financial Ledger Inputs
            </div>
            <GridThree>
              <FormGroup>
                <label>Supplier / Vendor</label>
                <input
                  type="text"
                  placeholder="e.g. UNIQUE DIAMAX PVT LTD"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  list="suppliers-list"
                />
                <datalist id="suppliers-list">
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.name} />
                  ))}
                </datalist>
              </FormGroup>

              {productType === 'Diamond' && (
                <FormGroup>
                  <label>Price per Carat ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3500"
                    value={pricePerCarat}
                    onChange={(e) => setPricePerCarat(e.target.value ? Number(e.target.value) : '')}
                  />
                </FormGroup>
              )}

              <FormGroup>
                <label>Purchase Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder={pricePerCarat && caratWeight ? `Auto: $${financials.effectivePurchase}` : 'e.g. 5000'}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value ? Number(e.target.value) : '')}
                />
              </FormGroup>

              <FormGroup>
                <label>Selling Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 7500"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value ? Number(e.target.value) : '')}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Discount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value ? Number(e.target.value) : '')}
                />
              </FormGroup>

              <FormGroup>
                <label>GST % (e.g. 0.015 for 1.5%)</label>
                <input
                  type="number"
                  step="0.001"
                  value={gstPercent}
                  onChange={(e) => setGstPercent(e.target.value ? Number(e.target.value) : '')}
                />
              </FormGroup>

              <FormGroup>
                <label>Shipping Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value ? Number(e.target.value) : '')}
                />
              </FormGroup>

              <FormGroup>
                <label>Sales Person *</label>
                <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.fullName} ({emp.employeeCode})
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup>
                <label>Commission Rate (e.g. 0.05 for 5%)</label>
                <input
                  type="number"
                  step="0.005"
                  value={commissionPercent}
                  onChange={(e) => setCommissionPercent(e.target.value ? Number(e.target.value) : '')}
                />
              </FormGroup>
            </GridThree>
          </SectionCard>

          {/* Payment & Logistics */}
          <SectionCard>
            <div className="section-title">
              <Truck size={16} color="#2563eb" /> Payment & Shipment Status
            </div>
            <GridThree>
              <FormGroup>
                <label>Payment Status</label>
                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                  <option value="Paid">Paid (Full)</option>
                  <option value="Partial">Partial Payment</option>
                  <option value="Pending">Pending / Unpaid</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="Bank Wire">Bank Wire</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Amount Received ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder={paymentStatus === 'Paid' ? `Full: $${financials.finalSale}` : 'Enter amount'}
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value ? Number(e.target.value) : '')}
                  disabled={paymentStatus === 'Paid'}
                />
              </FormGroup>

              <FormGroup>
                <label>Order / Delivery Status</label>
                <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                  <option value="Delivered">Delivered</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label>Tracking Number</label>
                <input
                  type="text"
                  placeholder="e.g. 781290384912"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>Tracking URL</label>
                <input
                  type="text"
                  placeholder="https://fedex.com/track/..."
                  value={trackingLink}
                  onChange={(e) => setTrackingLink(e.target.value)}
                />
              </FormGroup>
            </GridThree>
          </SectionCard>
        </div>

        {/* Sidebar Financial Calculations Ledger */}
        <div>
          <SummaryLedger>
            <div className="ledger-title">Financial Recalculation Engine</div>

            <div className="ledger-row">
              <span>Selling Price:</span>
              <span>${(Number(sellingPrice) || 0).toLocaleString()}</span>
            </div>
            <div className="ledger-row">
              <span>Discount:</span>
              <span>-${(Number(discount) || 0).toLocaleString()}</span>
            </div>
            <div className="ledger-row highlight">
              <span>Final Sale Amount:</span>
              <span>${financials.finalSale.toLocaleString()}</span>
            </div>

            <div className="ledger-row">
              <span>Purchase Base:</span>
              <span>${financials.effectivePurchase.toLocaleString()}</span>
            </div>
            <div className="ledger-row">
              <span>GST Amount:</span>
              <span>+${financials.gstAmt.toLocaleString()}</span>
            </div>
            <div className="ledger-row">
              <span>Final Purchase:</span>
              <span>${financials.finalPurchase.toLocaleString()}</span>
            </div>

            <div className="ledger-row">
              <span>Shipping Cost:</span>
              <span>-${(Number(shippingCost) || 0).toLocaleString()}</span>
            </div>

            <div className="ledger-row highlight net-profit">
              <span>Net Profit:</span>
              <span>${financials.netProfit.toLocaleString()}</span>
            </div>

            <div className="ledger-row">
              <span>Sales Commission ({(Number(commissionPercent) * 100).toFixed(1)}%):</span>
              <span style={{ color: '#ffd43b' }}>-${financials.commAmt.toLocaleString()}</span>
            </div>

            <div className="ledger-row" style={{ fontWeight: 700 }}>
              <span>Profit Retained:</span>
              <span>${financials.retainedProfit.toLocaleString()}</span>
            </div>

            <div className="ledger-row">
              <span>Markup %:</span>
              <span>{financials.markup}%</span>
            </div>

            <div className="ledger-row">
              <span>Pending Receivables:</span>
              <span style={{ color: financials.pending > 0 ? '#ff6b6b' : '#51cf66' }}>
                ${financials.pending.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '12px',
                background: '#e2b96f',
                color: '#0d1319',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginTop: 20,
              }}
            >
              {submitting ? 'Saving Invoice...' : 'Save & Issue Invoice'}
            </button>
          </SummaryLedger>
        </div>
      </FormContainer>
    </div>
  );
};
