import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, ShieldAlert, CheckCircle, AlertTriangle, Save, Power } from 'lucide-react';
import { api } from '../../services/api';
import { AdminPageHeader } from '../../components/admin/AdminUI';

const Container = styled.div`
  padding: 32px;
  max-width: 1000px;
  margin: 0 auto;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin: 0;
  }
`;

const StatusBanner = styled.div<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#fff5f5' : '#f4faf4')};
  border: 1px solid ${({ $active }) => ($active ? '#feb2b2' : '#9ae6b4')};
  padding: 20px 24px;
  border-radius: 4px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon-box {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: ${({ $active }) => ($active ? '#fed7d7' : '#c6f6d5')};
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 4px 0;
      color: ${({ $active }) => ($active ? '#9b2c2c' : '#22543d')};
    }

    p {
      font-size: 0.85rem;
      color: #666;
      margin: 0;
    }
  }
`;

const FormSection = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 28px;
  margin-bottom: 24px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: #1f1f1f;
    margin: 0 0 20px 0;
    border-bottom: 1px solid #f0eae1;
    padding-bottom: 10px;
  }

  .field {
    margin-bottom: 20px;

    label {
      display: block;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #1f1f1f;
      margin-bottom: 8px;
    }

    input[type='text'],
    input[type='datetime-local'],
    textarea {
      width: 100%;
      padding: 12px;
      font-size: 0.9rem;
      border: 1px solid #d9d3c7;
      background: #faf5eb;
      outline: none;

      &:focus {
        border-color: #c9a45c;
      }
    }

    textarea {
      min-height: 110px;
      resize: vertical;
    }

    .hint {
      font-size: 0.78rem;
      color: #777;
      margin-top: 6px;
    }
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #1f1f1f;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }
`;

const DangerBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #c53030;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #c53030;
  cursor: pointer;

  &:hover {
    background: #9b2c2c;
  }
`;

const toBool = (val: any): boolean => {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val === 1;
  if (typeof val === 'string') {
    const s = val.trim().toLowerCase();
    return s === 'true' || s === '1' || s === 'on';
  }
  return false;
};

export const AdminHolidayModePage: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    holiday_mode_enabled: false,
    holiday_mode_start: '',
    holiday_mode_end: '',
    holiday_mode_message: '',
    holiday_mode_reopening_message: '',
    holiday_mode_show_banner: true,
    holiday_mode_banner_text: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await api.getHolidayModeSettings();
      const isActive = toBool(data.active ?? data.isHolidayModeActive ?? data.holiday_mode_enabled ?? data.manualOn);
      setSettings({
        holiday_mode_enabled: isActive,
        holiday_mode_message: data.holiday_mode_message || data.message || "Orders are temporarily unavailable while we are away. Please check back soon.",
        holiday_mode_reopening_message: data.holiday_mode_reopening_message || data.reopeningMessage || '',
        holiday_mode_banner_text: data.holiday_mode_banner_text || data.bannerText || '',
        holiday_mode_show_banner: data.holiday_mode_show_banner ?? data.showBanner ?? true,
        holiday_mode_start: data.holiday_mode_start || data.startDate || '',
        holiday_mode_end: data.holiday_mode_end || data.endDate || '',
        holiday_mode_is_active: isActive,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (overriddenEnabled?: boolean) => {
    setSaving(true);
    try {
      const targetEnabled = overriddenEnabled !== undefined ? overriddenEnabled : settings.holiday_mode_enabled;
      const payload = {
        holiday_mode_enabled: targetEnabled,
        active: targetEnabled,
        holiday_mode_message: settings.holiday_mode_message,
        holiday_mode_reopening_message: settings.holiday_mode_reopening_message,
        holiday_mode_banner_text: settings.holiday_mode_banner_text,
        holiday_mode_show_banner: settings.holiday_mode_show_banner,
        holiday_mode_start: settings.holiday_mode_start,
        holiday_mode_end: settings.holiday_mode_end,
      };

      const res = await api.updateHolidayModeSettings(payload);
      const isActive = toBool(res.active ?? res.isHolidayModeActive ?? res.manualOn ?? res.holiday_mode_enabled);

      setSettings((prev: any) => ({
        ...prev,
        holiday_mode_enabled: isActive,
        holiday_mode_message: res.holiday_mode_message || res.message || prev.holiday_mode_message,
        holiday_mode_reopening_message: res.holiday_mode_reopening_message || res.reopeningMessage || prev.holiday_mode_reopening_message,
        holiday_mode_banner_text: res.holiday_mode_banner_text || res.bannerText || prev.holiday_mode_banner_text,
        holiday_mode_show_banner: res.holiday_mode_show_banner ?? res.showBanner ?? prev.holiday_mode_show_banner,
        holiday_mode_start: res.holiday_mode_start || res.startDate || prev.holiday_mode_start,
        holiday_mode_end: res.holiday_mode_end || res.endDate || prev.holiday_mode_end,
        holiday_mode_is_active: isActive,
      }));
      setMsg(`Holiday Mode settings updated successfully! Store status is now ${isActive ? 'HOLIDAY MODE ACTIVE' : 'STORE OPEN'}.`);
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error updating Holiday Mode settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleHolidayMode = () => {
    const nextState = !settings.holiday_mode_enabled;
    const confirmMsg = nextState
      ? 'Are you sure you want to ENABLE Holiday Mode?\nCustomers will not be able to place new orders while closed.'
      : 'Are you sure you want to DISABLE Holiday Mode?\nCustomer online ordering will be restored immediately.';

    if (window.confirm(confirmMsg)) {
      handleSave(nextState);
    }
  };

  if (loading) {
    return <Container style={{ textAlign: 'center', color: '#777' }}>Loading Holiday Mode configuration...</Container>;
  }

  const isClosed = toBool(settings.holiday_mode_is_active ?? settings.holiday_mode_enabled);

  return (
    <div>
      <AdminPageHeader
        title="Holiday Mode & Store Status"
        description="Pause customer checkout during vacations, holidays, or inventory maintenance while keeping catalog browsing live."
      />

      {msg && (
        <div style={{ background: '#eaf5ea', color: '#2e6b2e', padding: '12px 16px', borderRadius: 4, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={18} /> {msg}
        </div>
      )}

      <StatusBanner $active={isClosed}>
        <div className="info">
          <div className="icon-box">
            {isClosed ? <AlertTriangle size={24} color="#9b2c2c" /> : <CheckCircle size={24} color="#22543d" />}
          </div>
          <div>
            <h3>STORE STATUS: {isClosed ? 'TEMPORARILY CLOSED FOR ORDERS' : 'OPEN FOR CUSTOMER ORDERS'}</h3>
            <p>{isClosed ? 'Server-side order creation guard is ACTIVE. No customer orders will be accepted.' : 'Customers can browse and place online orders normally.'}</p>
          </div>
        </div>

        <div>
          {isClosed ? (
            <PrimaryBtn onClick={handleToggleHolidayMode} disabled={saving}>
              <Power size={16} /> RE-OPEN STORE
            </PrimaryBtn>
          ) : (
            <DangerBtn onClick={handleToggleHolidayMode} disabled={saving}>
              <Power size={16} /> ENABLE HOLIDAY MODE
            </DangerBtn>
          )}
        </div>
      </StatusBanner>

      <FormSection>
        <h2>Closure Messages & Customer Announcements</h2>
        <div className="field">
          <label>Storefront Closure Notice Message</label>
          <textarea
            value={settings.holiday_mode_message || ''}
            onChange={(e) => setSettings({ ...settings, holiday_mode_message: e.target.value })}
            placeholder="Main holiday closure message shown to customers on checkout attempt or modal"
          />
        </div>

        <div className="field">
          <label>Optional Reopening Message</label>
          <input
            type="text"
            value={settings.holiday_mode_reopening_message || ''}
            onChange={(e) => setSettings({ ...settings, holiday_mode_reopening_message: e.target.value })}
            placeholder="e.g. We look forward to serving you again on August 25th."
          />
        </div>

        <div className="field">
          <label>Header Announcement Bar Text</label>
          <input
            type="text"
            value={settings.holiday_mode_banner_text || ''}
            onChange={(e) => setSettings({ ...settings, holiday_mode_banner_text: e.target.value })}
            placeholder="Banner text displayed at top of storefront when Holiday Mode is enabled"
          />
        </div>

        <div className="field">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={Boolean(settings.holiday_mode_show_banner)}
              onChange={(e) => setSettings({ ...settings, holiday_mode_show_banner: e.target.checked })}
            />
            Show Top Announcement Bar Across Storefront During Closure
          </label>
        </div>
      </FormSection>

      <FormSection>
        <h2>Optional Scheduled Holiday Closure</h2>
        <div className="row-2">
          <div className="field">
            <label>Scheduled Start Date & Time (Server Time)</label>
            <input
              type="datetime-local"
              value={settings.holiday_mode_start || ''}
              onChange={(e) => setSettings({ ...settings, holiday_mode_start: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Scheduled End Date & Time (Server Time)</label>
            <input
              type="datetime-local"
              value={settings.holiday_mode_end || ''}
              onChange={(e) => setSettings({ ...settings, holiday_mode_end: e.target.value })}
            />
          </div>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#777', margin: 0 }}>
          Manual ON/OFF switch overrides scheduled dates. If manual switch is OFF, the store will close automatically during the scheduled period.
        </p>
      </FormSection>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PrimaryBtn onClick={() => handleSave()} disabled={saving}>
          <Save size={16} /> SAVE SETTINGS
        </PrimaryBtn>
      </div>
    </div>
  );
};
