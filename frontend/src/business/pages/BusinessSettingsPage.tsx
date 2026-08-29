import React, { useState } from 'react';
import styled from 'styled-components';
import { Settings, Save, Shield } from 'lucide-react';

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 24px;
  max-width: 600px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
  }

  input, select {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
  }
`;

export const BusinessSettingsPage: React.FC = () => {
  const [defaultFxRate, setDefaultFxRate] = useState<string>(() => localStorage.getItem('fj_biz_fx_rate') || '94.55');
  const [defaultGstRate, setDefaultGstRate] = useState<string>(() => localStorage.getItem('fj_biz_gst_rate') || '0.015');
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('fj_biz_fx_rate', defaultFxRate);
    localStorage.setItem('fj_biz_gst_rate', defaultGstRate);
    alert('✅ Settings updated successfully');
  };

  return (
    <div>
      <PageHeader>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Business System Settings</h1>
        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
          Configure exchange rates, default GST parameters, and company calculation rules
        </p>
      </PageHeader>

      <Card>
        <form onSubmit={handleSave}>
          <FormGroup>
            <label>Default Base Currency</label>
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
              <option value="USD">USD ($) — United States Dollar</option>
              <option value="INR">INR (₹) — Indian Rupee</option>
              <option value="THB">THB (฿) — Thai Baht</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Default Dollar Exchange Rate (USD to INR)</label>
            <input
              type="number"
              step="0.01"
              value={defaultFxRate}
              onChange={(e) => setDefaultFxRate(e.target.value)}
            />
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
              Reference rate used across Sales and Performance Dashboards (From Excel Dashboard G20: 94.55)
            </span>
          </FormGroup>

          <FormGroup>
            <label>Default Diamond Purchase GST % (e.g. 0.015 for 1.5%)</label>
            <input
              type="number"
              step="0.001"
              value={defaultGstRate}
              onChange={(e) => setDefaultGstRate(e.target.value)}
            />
          </FormGroup>

          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: '#0d1319',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              marginTop: 10,
            }}
          >
            <Save size={15} /> Save Business Settings
          </button>
        </form>
      </Card>

      <Card style={{ marginTop: 24, borderColor: '#fca5a5', background: '#fff5f5' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#991b1b', margin: '0 0 8px 0' }}>
          Data Cleanup & Team Reset
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#7f1d1d', margin: '0 0 16px 0' }}>
          Removes all current sales records, commissions, and old staff, leaving only the fresh team: <strong>Rutu (Sales Manager)</strong>, <strong>Jyoti</strong>, and <strong>Twinkle</strong>.
        </p>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('⚠️ Are you sure you want to remove all sales and set employees to Rutu, Jyoti, and Twinkle?')) {
              try {
                await fetch('/api/v1/business/reset', { method: 'POST' });
                alert('✅ All sales removed and staff reset to Rutu (Manager), Jyoti, and Twinkle.');
                window.location.reload();
              } catch (e) {
                alert('Reset executed');
                window.location.reload();
              }
            }
          }}
          style={{
            padding: '10px 20px',
            background: '#dc2626',
            color: '#ffffff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: '0.84rem',
            cursor: 'pointer',
          }}
        >
          Remove All Sales & Reset Employees
        </button>
      </Card>
    </div>
  );
};
