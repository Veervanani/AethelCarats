import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Save,
  CheckCircle,
  Shield,
  Building,
  DollarSign,
  FileText,
  CreditCard,
  Landmark,
  QrCode,
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  Database,
  HelpCircle,
} from 'lucide-react';
import { financialApi } from '../../services/financialApi';

const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
    margin-bottom: 6px;
  }

  p {
    color: #77736c;
    font-size: 0.85rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 960px;
`;

const SectionCard = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8e3d9;

    .title-group {
      display: flex;
      align-items: center;
      gap: 10px;

      h2 {
        font-family: ${({ theme }) => theme.fonts.heading};
        font-size: 1.25rem;
        color: #1f1f1f;
        margin: 0;
      }
    }

    .badge {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      background: #f4efe6;
      color: #8c744b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #55514b;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding: 11px 14px;
      padding-right: 42px;
      border: 1px solid #d9d3c7;
      border-radius: 4px;
      font-size: 0.88rem;
      background: #fffdf9;
      color: #1f1f1f;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #c9a45c;
        box-shadow: 0 0 0 2px rgba(201, 164, 92, 0.15);
      }
    }

    .toggle-visibility-btn {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: #888;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0;

      &:hover {
        color: #1f1f1f;
      }
    }
  }

  textarea,
  select {
    padding: 11px 14px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.88rem;
    background: #fffdf9;
    color: #1f1f1f;
    line-height: 1.5;

    &:focus {
      outline: none;
      border-color: #c9a45c;
      box-shadow: 0 0 0 2px rgba(201, 164, 92, 0.15);
    }
  }

  .hint {
    font-size: 0.72rem;
    color: #88847e;
    margin-top: 4px;
  }
`;

const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, 1fr);
  gap: 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #faf8f5;
  border: 1px solid #ece7de;
  border-radius: 4px;
  margin-bottom: 18px;

  .text {
    .label {
      font-size: 0.82rem;
      font-weight: 700;
      color: #1f1f1f;
    }
    .desc {
      font-size: 0.75rem;
      color: #77736c;
    }
  }

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    accent-color: #c9a45c;
    cursor: pointer;
  }
`;

const StatusBanner = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 20px;

  background: ${({ $type }) =>
    $type === 'success' ? '#e6f4ea' : $type === 'error' ? '#fff5f5' : '#f0f4f9'};
  color: ${({ $type }) =>
    $type === 'success' ? '#137333' : $type === 'error' ? '#c53030' : '#1a73e8'};
  border: 1px solid
    ${({ $type }) =>
      $type === 'success' ? '#ceead6' : $type === 'error' ? '#feb2b2' : '#d2e3fc'};
`;

const SaveBtn = styled.button`
  padding: 14px 32px;
  background: #1f1f1f;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #c9a45c;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AdminPaymentSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    paypal_client_id: '',
    paypal_client_secret: '',
    paypal_mode: 'live',
    paypal_enabled: 'true',

    bank_transfer_enabled: 'true',
    bank_name: 'HDFC Bank Ltd / Global Wire',
    bank_account_name: 'AETHELCARATS FINE JEWELLERY ATELIER',
    bank_account_number: '50200084920192',
    bank_routing_code: 'HDFC0001234',
    bank_swift_bic: 'HDFCINBBXXX',
    bank_branch_address: 'Surat Diamond Bourse, Gujarat, India',
    bank_payment_instructions:
      'Please wire the total order balance referencing your Order ID. Orders are confirmed upon bank verification.',

    upi_enabled: 'false',
    upi_id: 'aethelcarats@okhdfcbank',

    company_name: 'AETHELCARATS FINE JEWELLERY ATELIER',
    company_address: 'Surat Diamond Bourse, Gujarat, India / 740 Fifth Avenue, New York, NY 10019',
    company_email: 'contact@aethelcarats.com',
    company_phone: '+919737853206',
    company_tax_id: 'US-TAX-88492019',
    default_currency: 'USD',
    default_tax_rate: '0',

    invoice_notes:
      'Thank you for choosing AethelCarats Fine Jewellery Atelier. Certified authenticity documentation accompanies all delivered creations.',
    receipt_notes: 'Official payment receipt issued by AethelCarats Fine Jewellery Atelier.',
    statement_footer_text:
      'For any payment verification or bespoke wire inquiries, please contact contact@aethelcarats.com or call +919737853206.',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showPaypalSecret, setShowPaypalSecret] = useState(false);
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await financialApi.getPaymentSettings();
      if (data && typeof data === 'object') {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (err: any) {
      console.error('Failed to load payment settings:', err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to retrieve settings from database. Please check your connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await financialApi.updatePaymentSettings(settings);
      if (res?.settings) {
        setSettings((prev) => ({ ...prev, ...res.settings }));
      }
      const timeStr = new Date().toLocaleTimeString();
      setLastSavedTime(timeStr);
      setStatusMessage({
        type: 'success',
        text: `✓ Payment details saved directly to MySQL database! Old records replaced at ${timeStr}.`,
      });
    } catch (err: any) {
      console.error('Error saving payment settings:', err);
      setStatusMessage({
        type: 'error',
        text: err?.response?.data?.message || err?.message || 'Error updating payment settings in database.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader>
        <h1>Payment Details & Gateway Settings</h1>
        <p>
          Configure and update payment credentials, bank wire transfer information, and atelier billing details. Changes
          are written immediately to the MySQL database and take effect storewide.
        </p>
      </PageHeader>

      {statusMessage && (
        <StatusBanner $type={statusMessage.type}>
          {statusMessage.type === 'success' ? (
            <CheckCircle size={20} />
          ) : statusMessage.type === 'error' ? (
            <AlertCircle size={20} />
          ) : (
            <Database size={20} />
          )}
          <span>{statusMessage.text}</span>
        </StatusBanner>
      )}

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
          <RefreshCw size={24} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 12 }}>Loading payment details from database...</p>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <Container>
            {/* 1. PAYPAL GATEWAY SETTINGS */}
            <SectionCard>
              <div className="section-header">
                <div className="title-group">
                  <CreditCard size={20} color="#c9a45c" />
                  <h2>1. PayPal Express Gateway Credentials</h2>
                </div>
                <span className="badge">Database Key: paypal_*</span>
              </div>

              <ToggleRow>
                <div className="text">
                  <div className="label">Enable PayPal Express Checkout</div>
                  <div className="desc">Accept PayPal balance, debit, and credit cards worldwide on checkout</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.paypal_enabled === 'true'}
                  onChange={(e) => handleChange('paypal_enabled', e.target.checked ? 'true' : 'false')}
                />
              </ToggleRow>

              <FormGrid>
                <FormGroup>
                  <label>PayPal Client ID</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. BAAqaKN73TPUvj2BG5Fh..."
                      value={settings.paypal_client_id || ''}
                      onChange={(e) => handleChange('paypal_client_id', e.target.value.trim())}
                    />
                  </div>
                  <span className="hint">From PayPal Developer Dashboard &gt; Apps &amp; Credentials</span>
                </FormGroup>

                <FormGroup>
                  <label>PayPal Client Secret</label>
                  <div className="input-wrapper">
                    <input
                      type={showPaypalSecret ? 'text' : 'password'}
                      placeholder="e.g. ECq63bOo-D4k6XlcuEua..."
                      value={settings.paypal_client_secret || ''}
                      onChange={(e) => handleChange('paypal_client_secret', e.target.value.trim())}
                    />
                    <button
                      type="button"
                      className="toggle-visibility-btn"
                      onClick={() => setShowPaypalSecret(!showPaypalSecret)}
                      title={showPaypalSecret ? 'Hide secret' : 'Show secret'}
                    >
                      {showPaypalSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <span className="hint">Encrypted server-side for automated payment capture</span>
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <label>PayPal Environment Mode</label>
                <select
                  value={settings.paypal_mode || 'live'}
                  onChange={(e) => handleChange('paypal_mode', e.target.value)}
                >
                  <option value="live">Live Production (Real money from actual customers)</option>
                  <option value="sandbox">Sandbox (Testing / Fake test accounts only)</option>
                </select>
                <span className="hint">Set to Live Production for your real store domain aethelcarats.com</span>
              </FormGroup>
            </SectionCard>

            {/* 2. DIRECT BANK WIRE / TRANSFER SETTINGS */}
            <SectionCard>
              <div className="section-header">
                <div className="title-group">
                  <Landmark size={20} color="#c9a45c" />
                  <h2>2. Direct Bank Wire / Transfer Details</h2>
                </div>
                <span className="badge">Database Key: bank_*</span>
              </div>

              <ToggleRow>
                <div className="text">
                  <div className="label">Enable Bank Wire / Direct Transfer Option</div>
                  <div className="desc">Allow clients placing high-value bespoke orders to pay via direct wire transfer</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.bank_transfer_enabled === 'true'}
                  onChange={(e) => handleChange('bank_transfer_enabled', e.target.checked ? 'true' : 'false')}
                />
              </ToggleRow>

              <FormGrid>
                <FormGroup>
                  <label>Bank Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. JPMorgan Chase / HDFC Bank / Barclays"
                      value={settings.bank_name || ''}
                      onChange={(e) => handleChange('bank_name', e.target.value)}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <label>Account Holder / Beneficiary Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. AETHELCARATS FINE JEWELLERY ATELIER"
                      value={settings.bank_account_name || ''}
                      onChange={(e) => handleChange('bank_account_name', e.target.value)}
                    />
                  </div>
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <label>Account Number / IBAN</label>
                  <div className="input-wrapper">
                    <input
                      type={showBankAccount ? 'text' : 'password'}
                      placeholder="e.g. 50200084920192 or GB29NWBK..."
                      value={settings.bank_account_number || ''}
                      onChange={(e) => handleChange('bank_account_number', e.target.value.trim())}
                    />
                    <button
                      type="button"
                      className="toggle-visibility-btn"
                      onClick={() => setShowBankAccount(!showBankAccount)}
                      title={showBankAccount ? 'Hide account' : 'Show account'}
                    >
                      {showBankAccount ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormGroup>

                <FormGroup>
                  <label>SWIFT / BIC Code (For International Transfers)</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. HDFCINBBXXX or CHASUS33"
                      value={settings.bank_swift_bic || ''}
                      onChange={(e) => handleChange('bank_swift_bic', e.target.value.trim().toUpperCase())}
                    />
                  </div>
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <label>Routing Number / IFSC / Sort Code</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. 021000021 or HDFC0001234"
                      value={settings.bank_routing_code || ''}
                      onChange={(e) => handleChange('bank_routing_code', e.target.value.trim().toUpperCase())}
                    />
                  </div>
                </FormGroup>

                <FormGroup>
                  <label>Bank Branch / Full Bank Address</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. Surat Diamond Bourse, Gujarat, India"
                      value={settings.bank_branch_address || ''}
                      onChange={(e) => handleChange('bank_branch_address', e.target.value)}
                    />
                  </div>
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <label>Wire Memo &amp; Payment Instructions for Client</label>
                <textarea
                  rows={3}
                  placeholder="Instructions displayed to client during checkout and in invoice..."
                  value={settings.bank_payment_instructions || ''}
                  onChange={(e) => handleChange('bank_payment_instructions', e.target.value)}
                />
              </FormGroup>
            </SectionCard>

            {/* 3. UPI & INSTANT DIGITAL PAYMENTS */}
            <SectionCard>
              <div className="section-header">
                <div className="title-group">
                  <QrCode size={20} color="#c9a45c" />
                  <h2>3. UPI / Instant Payment Handle (Optional)</h2>
                </div>
                <span className="badge">Database Key: upi_*</span>
              </div>

              <ToggleRow>
                <div className="text">
                  <div className="label">Enable UPI / QR Payment Option</div>
                  <div className="desc">Accept payments via Indian UPI apps (Google Pay, PhonePe, Paytm)</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.upi_enabled === 'true'}
                  onChange={(e) => handleChange('upi_enabled', e.target.checked ? 'true' : 'false')}
                />
              </ToggleRow>

              <FormGroup>
                <label>Atelier UPI ID (VPA)</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="e.g. aethelcarats@okhdfcbank"
                    value={settings.upi_id || ''}
                    onChange={(e) => handleChange('upi_id', e.target.value.trim().toLowerCase())}
                  />
                </div>
              </FormGroup>
            </SectionCard>

            {/* 4. ATELIER LEGAL ENTITY & INVOICING */}
            <SectionCard>
              <div className="section-header">
                <div className="title-group">
                  <Building size={20} color="#c9a45c" />
                  <h2>4. Atelier Entity &amp; Invoicing Info</h2>
                </div>
                <span className="badge">Database Key: company_*</span>
              </div>

              <FormGrid>
                <FormGroup>
                  <label>Company Legal Name</label>
                  <input
                    type="text"
                    value={settings.company_name || ''}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Concierge / Billing Email</label>
                  <input
                    type="email"
                    value={settings.company_email || ''}
                    onChange={(e) => handleChange('company_email', e.target.value)}
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <label>Full Atelier Address (Appears on Invoices &amp; Receipts)</label>
                <input
                  type="text"
                  value={settings.company_address || ''}
                  onChange={(e) => handleChange('company_address', e.target.value)}
                />
              </FormGroup>

              <FormGrid $cols={3}>
                <FormGroup>
                  <label>Phone / WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.company_phone || ''}
                    onChange={(e) => handleChange('company_phone', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Tax ID / VAT / GST Registration</label>
                  <input
                    type="text"
                    value={settings.company_tax_id || ''}
                    onChange={(e) => handleChange('company_tax_id', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Default Currency</label>
                  <select
                    value={settings.default_currency || 'USD'}
                    onChange={(e) => handleChange('default_currency', e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="AED">AED (د.إ)</option>
                  </select>
                </FormGroup>
              </FormGrid>
            </SectionCard>

            {/* 5. DOCUMENT FOOTERS & TERMS */}
            <SectionCard>
              <div className="section-header">
                <div className="title-group">
                  <FileText size={20} color="#c9a45c" />
                  <h2>5. Invoices, Receipts &amp; Statement Notes</h2>
                </div>
                <span className="badge">Database Key: *_notes</span>
              </div>

              <FormGroup>
                <label>Tax Invoice Terms &amp; Notes</label>
                <textarea
                  rows={2}
                  value={settings.invoice_notes || ''}
                  onChange={(e) => handleChange('invoice_notes', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>Payment Receipt Remarks</label>
                <textarea
                  rows={2}
                  value={settings.receipt_notes || ''}
                  onChange={(e) => handleChange('receipt_notes', e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label>Statement Footer Disclaimer</label>
                <textarea
                  rows={2}
                  value={settings.statement_footer_text || ''}
                  onChange={(e) => handleChange('statement_footer_text', e.target.value)}
                />
              </FormGroup>
            </SectionCard>

            {/* SAVE ACTION BAR */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                background: '#fffdf9',
                border: '1px solid #e8e3d9',
                borderRadius: 6,
                marginTop: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#666' }}>
                <Database size={16} color="#c9a45c" />
                <span>
                  {lastSavedTime
                    ? `Last updated in database: ${lastSavedTime}`
                    : 'Changes overwrite old records directly in MySQL database.'}
                </span>
              </div>

              <SaveBtn type="submit" disabled={saving}>
                <Save size={18} />
                {saving ? 'Saving to Database...' : 'Save Payment Details'}
              </SaveBtn>
            </div>
          </Container>
        </form>
      )}
    </div>
  );
};

