import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, CheckCircle, Shield, Building, DollarSign, FileText } from 'lucide-react';
import { financialApi } from '../../services/financialApi';

const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.8rem;
    color: #1f1f1f;
  }
`;

const Card = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 28px;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.3rem;
    color: #1f1f1f;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e3d9;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #55514b;
  }

  input,
  textarea,
  select {
    padding: 10px 14px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;

    &:focus {
      outline: none;
      border-color: #c9a45c;
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const SaveBtn = styled.button`
  padding: 12px 24px;
  background: #1f1f1f;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
  }
`;

export const AdminPaymentSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: 'FLOKSY JEWEL ATELIER',
    company_address: '740 Fifth Avenue, Suite 1800, New York, NY 10019',
    company_email: 'contact@floksyjewel.com',
    company_phone: '+91973785306',
    company_tax_id: 'US-TAX-88492019',
    default_currency: 'USD',
    default_tax_rate: '0',
    invoice_notes: 'Thank you for choosing Floksy Jewel Atelier.',
    receipt_notes: 'Official payment receipt.',
    statement_footer_text: 'For inquiries regarding this statement, contact contact@floksyjewel.com.',
    paypal_client_id: '',
    paypal_client_secret: '',
    paypal_mode: 'sandbox',
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    financialApi.getPaymentSettings().then((data) => {
      setSettings((prev) => ({ ...prev, ...data }));
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await financialApi.updatePaymentSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert('Error saving payment settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader>
        <h1>Payment & Statement Settings</h1>
        <p style={{ color: '#666', fontSize: '0.85rem' }}>
          Configure company information, default tax rates, and notes printed on PDFs and Receipts.
        </p>
      </PageHeader>

      <Card>
        <form onSubmit={handleSave}>
          <h2>Atelier Entity Information</h2>
          <FormGroup>
            <label>Company Legal Name</label>
            <input
              type="text"
              value={settings.company_name}
              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Full Address</label>
            <input
              type="text"
              value={settings.company_address}
              onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
            />
          </FormGroup>

          <FormGrid>
            <FormGroup>
              <label>Concierge Email</label>
              <input
                type="email"
                value={settings.company_email}
                onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <label>Phone Number</label>
              <input
                type="text"
                value={settings.company_phone}
                onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
              />
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <label>Tax Identification / Registration ID</label>
              <input
                type="text"
                value={settings.company_tax_id}
                onChange={(e) => setSettings({ ...settings, company_tax_id: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <label>Default Currency</label>
              <select
                value={settings.default_currency}
                onChange={(e) => setSettings({ ...settings, default_currency: e.target.value })}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </FormGroup>
          </FormGrid>

          <h2>PayPal Gateway Credentials</h2>
          <FormGrid>
            <FormGroup>
              <label>PayPal Client ID</label>
              <input
                type="text"
                placeholder="e.g. ARk123... (From PayPal Developer App)"
                value={settings.paypal_client_id || ''}
                onChange={(e) => setSettings({ ...settings, paypal_client_id: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <label>PayPal Client Secret</label>
              <input
                type="password"
                placeholder="e.g. ELm987... (Keep confidential)"
                value={settings.paypal_client_secret || ''}
                onChange={(e) => setSettings({ ...settings, paypal_client_secret: e.target.value })}
              />
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <label>PayPal Environment Mode</label>
            <select
              value={settings.paypal_mode || 'sandbox'}
              onChange={(e) => setSettings({ ...settings, paypal_mode: e.target.value })}
            >
              <option value="sandbox">Sandbox (Testing / Fake Money)</option>
              <option value="live">Live Production (Real Money & Real Customers)</option>
            </select>
          </FormGroup>

          <h2>Document Footers & Remittance Notes</h2>
          <FormGroup>
            <label>Tax Invoice Terms & Notes</label>
            <textarea
              rows={3}
              value={settings.invoice_notes}
              onChange={(e) => setSettings({ ...settings, invoice_notes: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Payment Receipt Remarks</label>
            <textarea
              rows={2}
              value={settings.receipt_notes}
              onChange={(e) => setSettings({ ...settings, receipt_notes: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Statement Footer Disclaimer</label>
            <textarea
              rows={2}
              value={settings.statement_footer_text}
              onChange={(e) => setSettings({ ...settings, statement_footer_text: e.target.value })}
            />
          </FormGroup>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
            <SaveBtn type="submit" disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Financial Settings'}
            </SaveBtn>
            {savedSuccess && (
              <span style={{ color: '#2e7d32', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={16} /> Saved successfully!
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};
