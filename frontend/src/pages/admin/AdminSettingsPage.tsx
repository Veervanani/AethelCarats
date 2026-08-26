import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Save,
  CheckCircle,
  AlertCircle,
  Store,
  Mail,
  Phone,
  MessageSquare,
  Truck,
  Share2,
  Headphones,
  Clock,
  BarChart2,
  Code,
  Activity,
  Globe,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../../services/api';
import { AdminPageHeader, AdminButton } from '../../components/admin/AdminUI';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.8rem;
    color: #1a1918;
  }
`;

const FormSection = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionHeader = styled.h2`
  font-size: 1.1rem;
  color: #c9a45c;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #e8e3d9;
  padding-bottom: 12px;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 767px) {
    grid-column: span 1 !important;
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #4a4741;
  }

  input, select, textarea {
    padding: 10px 14px;
    border: 1px solid #e8e3d9;
    border-radius: 4px;
    font-size: 0.9rem;
    outline: none;
    font-family: inherit;

    &:focus {
      border-color: #c9a45c;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
    font-family: monospace;
    font-size: 0.82rem;
  }
`;

const SaveBtn = styled.button`
  background: #1a1918;
  color: #fffdf9;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Notification = styled.div`
  background: #e6f4ea;
  color: #137333;
  padding: 12px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    storeName: 'FLOKSY JEWEL',
    contactEmail: 'contact@floksyjewel.com',
    contactPhone: '+91973785306',
    whatsappNumber: '+91973785306',
    freeShippingThreshold: '1000',
    publicSiteUrl: 'https://floksyjewel.com',
    instagramUrl: 'https://www.instagram.com/bhumi_floksyjewel?igsh=MTAxdHVtcTdqcXRldg==',
    facebookUrl: 'https://facebook.com/floksyjewel',
    pinterestUrl: 'https://pinterest.com/floksyjewel',
    storeAddress: 'Surat, India',
    enableConsultAtelierExpert: 'true',
    consultTitle: 'Consult a Floksy Jewel Expert',
    consultDescription: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.',
    consultPhone: '+91973785306',
    consultPhoneLabel: 'Call Floksy Jewel',
    consultEmail: 'contact@floksyjewel.com',
    consultEmailLabel: 'Email Concierge',
    consultCloseLabel: 'Close',
    // Google Analytics, Google Tag & Tracking
    enable_google_analytics: 'true',
    enable_google_tag: 'true',
    enable_ecommerce_tracking: 'true',
    google_analytics_id: 'G-4819ZT1SH9',
    google_tag_ids: 'G-4819ZT1SH9, G-XXY9NETZMZ, GT-NFXXGC34, GT-WPL2TXJW, GT-NSVC87ZS',
    google_merchant_center_id: 'MC-FZJ1P4XPW8, MC-V2Y54WKJL7',
    google_tag_manager_id: 'GT-NFXXGC34',
    google_ads_conversion_id: '',
    facebook_pixel_id: '',
    custom_head_scripts: '',
    custom_body_scripts: '',
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [holidayStatus, setHolidayStatus] = useState<any>({
    active: false,
    message: 'Orders are temporarily unavailable while we are away. Please check back soon.',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    api.getHolidayModeStatus().then(setHolidayStatus).catch(console.error);
  }, []);

  useEffect(() => {
    api.getSiteSettings().then((data) => {
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        const merged = { ...data };
        if (data.site_settings && typeof data.site_settings === 'object') {
          Object.assign(merged, data.site_settings);
        }
        setSettings((prev) => ({ ...prev, ...merged }));
      }
    }).catch(console.error);
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setErrorMsg(null);
    try {
      const cleanWaNumber = (settings.whatsappNumber || '').replace(/[^\d+]/g, '');
      
      const settingsPayload = {
        ...settings,
        whatsappNumber: cleanWaNumber,
        whatsapp_config: {
          inquiryNumber: cleanWaNumber,
          displayNumber: settings.whatsappDisplayNumber || cleanWaNumber,
          defaultMessage: settings.whatsappDefaultMessage || 'Hello Floksy Jewel, I am interested in your fine jewellery collection.',
        }
      };

      await api.updateSiteSettings(settingsPayload);

      const currentSettings = await api.getSiteSettings().catch(() => ({}));
      let currentFooterSettings: any = {};
      if (currentSettings?.footer_settings) {
        try {
          currentFooterSettings = typeof currentSettings.footer_settings === 'string'
            ? JSON.parse(currentSettings.footer_settings)
            : currentSettings.footer_settings;
        } catch (e) {}
      }

      await api.updateSiteSetting('footer_settings', {
        ...currentFooterSettings,
        brandName: settings.storeName !== undefined ? settings.storeName : (currentFooterSettings.brandName ?? 'FLOKSY JEWEL'),
        email: settings.contactEmail !== undefined ? settings.contactEmail : currentFooterSettings.email,
        phone: settings.contactPhone !== undefined ? settings.contactPhone : currentFooterSettings.phone,
        address: settings.storeAddress !== undefined ? settings.storeAddress : (currentFooterSettings.address ?? 'Surat, India'),
        instagram: settings.instagramUrl !== undefined ? settings.instagramUrl : currentFooterSettings.instagram,
        facebook: settings.facebookUrl !== undefined ? settings.facebookUrl : currentFooterSettings.facebook,
        pinterest: settings.pinterestUrl !== undefined ? settings.pinterestUrl : currentFooterSettings.pinterest,
      });
      await api.updateSiteSetting('whatsapp_config', {
        inquiryNumber: cleanWaNumber,
        displayNumber: settings.whatsappDisplayNumber || cleanWaNumber,
        defaultMessage: settings.whatsappDefaultMessage || 'Hello Floksy Jewel, I am interested in your fine jewellery collection.',
      });
      await api.updateSiteSetting('whatsappNumber', cleanWaNumber);

      const hRes = await api.updateHolidayModeSettings({
        active: holidayStatus.active,
        message: holidayStatus.message,
        startDate: holidayStatus.startDate,
        endDate: holidayStatus.endDate,
      });
      if (hRes) {
        setHolidayStatus(hRes);
      }
      const updatedData = await api.getSiteSettings();
      if (updatedData && typeof updatedData === 'object' && Object.keys(updatedData).length > 0) {
        const merged = { ...updatedData };
        if (updatedData.site_settings && typeof updatedData.site_settings === 'object') {
          Object.assign(merged, updatedData.site_settings);
        }
        setSettings((prev) => ({ ...prev, ...merged }));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      console.error('Error saving site settings:', err);
      const status = err?.response?.status;
      if (status === 401) {
        setErrorMsg('Authentication session expired. Please log out and sign in again.');
      } else if (status === 403) {
        setErrorMsg('Access denied: Your admin account does not have permission to save settings.');
      } else {
        setErrorMsg(err?.response?.data?.message || 'Failed to save settings. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <AdminPageHeader
        title="WhatsApp & Store Settings"
        description="Manage WhatsApp concierge routing numbers, brand identity, shipping announcements, and contact information."
        actions={
          <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Save size={14} />}>
            Save All Settings
          </AdminButton>
        }
      />

      {saved && (
        <Notification>
          <CheckCircle size={18} /> Store settings updated successfully! Storefront components will reflect these values immediately.
        </Notification>
      )}

      {errorMsg && (
        <Notification style={{ backgroundColor: '#fdeded', borderColor: '#f5c2c2', color: '#b91c1c' }}>
          <AlertCircle size={18} /> {errorMsg}
        </Notification>
      )}

      {/* HOLIDAY MODE & STORE VACATION CONTROLS CARD */}
      <FormSection style={{ border: holidayStatus?.active ? '2px solid #feb2b2' : '1px solid #e8e3d9', background: holidayStatus?.active ? '#fff9f9' : '#fffdf9' }}>
        <SectionHeader style={{ color: holidayStatus?.active ? '#9b2c2c' : '#c9a45c', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} /> Store Holiday Mode & Vacation Controls
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, padding: '4px 10px', borderRadius: 4, background: holidayStatus?.active ? '#fed7d7' : '#c6f6d5', color: holidayStatus?.active ? '#9b2c2c' : '#22543d' }}>
            {holidayStatus?.active ? '● HOLIDAY MODE ACTIVE' : '● STORE OPEN'}
          </div>
        </SectionHeader>

        <Grid>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                type="button"
                onClick={async () => {
                  const nextState = !holidayStatus?.active;
                  if (window.confirm(nextState ? 'ENABLE Holiday Mode?\nCustomer orders will be blocked.' : 'DISABLE Holiday Mode?\nCustomer orders will resume.')) {
                    const res = await api.updateHolidayModeSettings({
                      active: nextState,
                      message: holidayStatus?.message,
                      startDate: holidayStatus?.startDate,
                      endDate: holidayStatus?.endDate,
                    });
                    setHolidayStatus(res);
                  }
                }}
                style={{
                  padding: '12px 24px',
                  background: holidayStatus?.active ? '#c53030' : '#1f1f1f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {holidayStatus?.active ? 'RE-OPEN STORE NOW' : 'ENABLE HOLIDAY MODE'}
              </button>
              <span style={{ fontSize: '0.82rem', color: '#666' }}>
                {holidayStatus?.active
                  ? 'Server-side order guard is ACTIVE. Orders & checkout are blocked.'
                  : 'Store is OPEN. Customers can browse and order normally.'}
              </span>
            </div>
          </FormGroup>

          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <label>Customer Holiday Message</label>
            <textarea
              value={holidayStatus?.message || ''}
              onChange={(e) => setHolidayStatus({ ...holidayStatus, message: e.target.value })}
              placeholder="Orders are temporarily unavailable while we are away. Please check back soon."
              rows={3}
              style={{ padding: 12, border: '1px solid #d9d3c7', borderRadius: 4, fontFamily: 'inherit', fontSize: '0.9rem' }}
            />
          </FormGroup>

          <FormGroup>
            <label>Optional Start Date</label>
            <input
              type="datetime-local"
              value={holidayStatus?.startDate ? holidayStatus.startDate.slice(0, 16) : ''}
              onChange={(e) => setHolidayStatus({ ...holidayStatus, startDate: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <label>Optional End Date</label>
            <input
              type="datetime-local"
              value={holidayStatus?.endDate ? holidayStatus.endDate.slice(0, 16) : ''}
              onChange={(e) => setHolidayStatus({ ...holidayStatus, endDate: e.target.value })}
            />
          </FormGroup>
        </Grid>
      </FormSection>

      <FormSection>
        <SectionHeader><Store size={18} /> General Brand & Store Identity</SectionHeader>
        <Grid>
          <FormGroup>
            <label>Store Name</label>
            <input value={settings.storeName || ''} onChange={(e) => handleChange('storeName', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Public Website URL (Canonical Domain)</label>
            <input value={settings.publicSiteUrl || ''} onChange={(e) => handleChange('publicSiteUrl', e.target.value)} placeholder="https://floksyjewel.com" />
          </FormGroup>
          <FormGroup>
            <label>Physical Address / Showroom Location</label>
            <input value={settings.storeAddress || ''} onChange={(e) => handleChange('storeAddress', e.target.value)} />
          </FormGroup>
        </Grid>
      </FormSection>

      <FormSection>
        <SectionHeader><MessageSquare size={18} /> WhatsApp Concierge & Inquiry Settings</SectionHeader>
        <Grid>
          <FormGroup>
            <label>WhatsApp Inquiry Number (International Format, e.g. +919876543210)</label>
            <input
              value={settings.whatsappNumber || ''}
              onChange={(e) => {
                const clean = e.target.value.replace(/[^\d+]/g, '');
                handleChange('whatsappNumber', clean);
              }}
              placeholder="+919876543210"
            />
            <span style={{ fontSize: '0.75rem', color: '#777' }}>
              Used by all "INQUIRE ON WHATSAPP" & floating concierge buttons. Spaces & hyphens will be automatically stripped.
            </span>
          </FormGroup>
          <FormGroup>
            <label>WhatsApp Display Number (e.g. +91 98765 43210)</label>
            <input
              value={settings.whatsappDisplayNumber || ''}
              onChange={(e) => handleChange('whatsappDisplayNumber', e.target.value)}
              placeholder="+91 98765 43210"
            />
          </FormGroup>
          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>Default Inquiry Message Template</label>
            <input
              value={settings.whatsappDefaultMessage || ''}
              onChange={(e) => handleChange('whatsappDefaultMessage', e.target.value)}
              placeholder="Hello Floksy Jewel Atelier, I am interested in..."
            />
          </FormGroup>
        </Grid>
      </FormSection>

      <FormSection>
        <SectionHeader><Headphones size={18} /> Consult an Atelier Expert</SectionHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', fontWeight: 600, color: '#19202a', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.enableConsultAtelierExpert !== 'false'}
              onChange={(e) => handleChange('enableConsultAtelierExpert', e.target.checked ? 'true' : 'false')}
              style={{ width: 16, height: 16, accentColor: '#c9a45c', cursor: 'pointer' }}
            />
            ENABLE CONSULT AN ATELIER EXPERT
          </label>
        </div>
        <Grid>
          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>POPUP TITLE</label>
            <input
              value={settings.consultTitle || ''}
              onChange={(e) => handleChange('consultTitle', e.target.value)}
              placeholder="Consult a Floksy Atelier Expert"
            />
          </FormGroup>
          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>POPUP DESCRIPTION</label>
            <textarea
              rows={3}
              value={settings.consultDescription || ''}
              onChange={(e) => handleChange('consultDescription', e.target.value)}
              placeholder="Speak directly with our Floksy Jewel specialists..."
              style={{ padding: '10px 14px', border: '1px solid #e8e3d9', borderRadius: 4, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
            />
          </FormGroup>
          <FormGroup>
            <label>ATELIER PHONE NUMBER</label>
            <input
              value={settings.consultPhone || ''}
              onChange={(e) => handleChange('consultPhone', e.target.value)}
              placeholder="+44 (0) 20 7946 0912"
            />
          </FormGroup>
          <FormGroup>
            <label>PHONE BUTTON LABEL</label>
            <input
              value={settings.consultPhoneLabel || ''}
              onChange={(e) => handleChange('consultPhoneLabel', e.target.value)}
              placeholder="Call Atelier"
            />
          </FormGroup>
          <FormGroup>
            <label>ATELIER EMAIL</label>
            <input
              type="email"
              value={settings.consultEmail || ''}
              onChange={(e) => handleChange('consultEmail', e.target.value)}
              placeholder="contact@floksyjewel.com"
            />
          </FormGroup>
          <FormGroup>
            <label>EMAIL BUTTON LABEL</label>
            <input
              value={settings.consultEmailLabel || ''}
              onChange={(e) => handleChange('consultEmailLabel', e.target.value)}
              placeholder="Email Concierge"
            />
          </FormGroup>
          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>CLOSE BUTTON LABEL</label>
            <input
              value={settings.consultCloseLabel || ''}
              onChange={(e) => handleChange('consultCloseLabel', e.target.value)}
              placeholder="Close"
            />
          </FormGroup>
        </Grid>
      </FormSection>

      <FormSection>
        <SectionHeader><Mail size={18} /> Contact & Customer Service</SectionHeader>
        <Grid>
          <FormGroup>
            <label>Customer Support Email</label>
            <input type="email" value={settings.contactEmail || ''} onChange={(e) => handleChange('contactEmail', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Phone Number</label>
            <input value={settings.contactPhone || ''} onChange={(e) => handleChange('contactPhone', e.target.value)} />
          </FormGroup>
        </Grid>
      </FormSection>

      <FormSection>
        <SectionHeader><Truck size={18} /> Shipping & Order Thresholds</SectionHeader>
        <Grid>
          <FormGroup>
            <label>Complimentary Worldwide Insured Shipping Threshold ($)</label>
            <input type="number" value={settings.freeShippingThreshold || ''} onChange={(e) => handleChange('freeShippingThreshold', e.target.value)} />
          </FormGroup>
        </Grid>
      </FormSection>

      <FormSection>
        <SectionHeader><Share2 size={18} /> Social Media Links</SectionHeader>
        <Grid>
          <FormGroup>
            <label>Instagram Profile URL</label>
            <input value={settings.instagramUrl || ''} onChange={(e) => handleChange('instagramUrl', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Facebook Page URL</label>
            <input value={settings.facebookUrl || ''} onChange={(e) => handleChange('facebookUrl', e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>Pinterest Board URL</label>
            <input value={settings.pinterestUrl || ''} onChange={(e) => handleChange('pinterestUrl', e.target.value)} />
          </FormGroup>
        </Grid>
      </FormSection>

      {/* GOOGLE ANALYTICS, GOOGLE TAG & MARKETING TRACKING */}
      <FormSection style={{ border: '1px solid #c9a45c', background: '#fffefb' }}>
        <SectionHeader style={{ color: '#1a1918', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c9a45c' }}>
            <BarChart2 size={18} /> Google Analytics, Google Tag & Marketing Tracking
          </span>
          <span style={{ fontSize: '0.78rem', background: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: 20, fontWeight: 600, border: '1px solid #ceead6' }}>
            ✓ Real-Time Database Connected
          </span>
        </SectionHeader>

        <div style={{ background: '#f8f9fa', border: '1px solid #e9ecef', padding: '14px 18px', borderRadius: 6, fontSize: '0.84rem', color: '#495057' }}>
          <div style={{ fontWeight: 700, color: '#1a1918', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={16} color="#137333" /> Active Google Tag Destinations
          </div>
          <div>
            Configured Tag IDs: <code style={{ background: '#e8f0fe', color: '#1a73e8', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>{settings.google_analytics_id || 'G-4819ZT1SH9'}</code>
            {settings.google_tag_ids && <span style={{ marginLeft: 8, color: '#6c757d' }}>+ destinations ({settings.google_tag_ids})</span>}
          </div>
          <div style={{ marginTop: 4, fontSize: '0.78rem', color: '#6c757d' }}>
            Changes made here are saved directly to the database and take effect immediately across all storefront pages without code changes.
          </div>
        </div>

        <Grid>
          <FormGroup>
            <label>Enable Google Tag & Analytics</label>
            <select
              value={settings.enable_google_analytics || 'true'}
              onChange={(e) => handleChange('enable_google_analytics', e.target.value)}
            >
              <option value="true">Enabled (Active Tracking)</option>
              <option value="false">Disabled</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Enable E-commerce Tracking</label>
            <select
              value={settings.enable_ecommerce_tracking || 'true'}
              onChange={(e) => handleChange('enable_ecommerce_tracking', e.target.value)}
            >
              <option value="true">Enabled (Pageviews, View Item, Add to Cart, Purchases)</option>
              <option value="false">Disabled</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Primary GA4 Measurement ID</label>
            <input
              value={settings.google_analytics_id || ''}
              onChange={(e) => handleChange('google_analytics_id', e.target.value)}
              placeholder="G-4819ZT1SH9"
            />
            <span style={{ fontSize: '0.74rem', color: '#77736c' }}>Primary Google Analytics 4 stream measurement ID</span>
          </FormGroup>

          <FormGroup>
            <label>Google Tag Manager ID (GTM / GT)</label>
            <input
              value={settings.google_tag_manager_id || ''}
              onChange={(e) => handleChange('google_tag_manager_id', e.target.value)}
              placeholder="GT-NFXXGC34"
            />
            <span style={{ fontSize: '0.74rem', color: '#77736c' }}>e.g. GT-NFXXGC34 or GTM-XXXXXX</span>
          </FormGroup>

          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>All Google Tag IDs (gtag.js Destinations)</label>
            <input
              value={settings.google_tag_ids || ''}
              onChange={(e) => handleChange('google_tag_ids', e.target.value)}
              placeholder="G-4819ZT1SH9, G-XXY9NETZMZ, GT-NFXXGC34, GT-WPL2TXJW, GT-NSVC87ZS"
            />
            <span style={{ fontSize: '0.74rem', color: '#77736c' }}>Comma-separated list of all Google Tag IDs associated with your domain</span>
          </FormGroup>

          <FormGroup>
            <label>Google Merchant Center IDs</label>
            <input
              value={settings.google_merchant_center_id || ''}
              onChange={(e) => handleChange('google_merchant_center_id', e.target.value)}
              placeholder="MC-FZJ1P4XPW8, MC-V2Y54WKJL7"
            />
            <span style={{ fontSize: '0.74rem', color: '#77736c' }}>Merchant Center tracking destinations</span>
          </FormGroup>

          <FormGroup>
            <label>Google Ads Conversion ID</label>
            <input
              value={settings.google_ads_conversion_id || ''}
              onChange={(e) => handleChange('google_ads_conversion_id', e.target.value)}
              placeholder="AW-XXXXXXXXX"
            />
            <span style={{ fontSize: '0.74rem', color: '#77736c' }}>Google Ads Remarketing / Conversion ID</span>
          </FormGroup>

          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>Facebook / Meta Pixel ID</label>
            <input
              value={settings.facebook_pixel_id || ''}
              onChange={(e) => handleChange('facebook_pixel_id', e.target.value)}
              placeholder="e.g. 123456789012345"
            />
          </FormGroup>

          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>Custom Header Tracking Scripts (&lt;head&gt;)</label>
            <textarea
              value={settings.custom_head_scripts || ''}
              onChange={(e) => handleChange('custom_head_scripts', e.target.value)}
              placeholder="<!-- Paste any custom verification meta tags or <script> tags to inject into <head> -->"
              rows={4}
            />
            <span style={{ fontSize: '0.74rem', color: '#77736c' }}>Injected safely into website &lt;head&gt; across all pages</span>
          </FormGroup>

          <FormGroup style={{ gridColumn: 'span 2' }}>
            <label>Custom Body Tracking Scripts (&lt;body&gt;)</label>
            <textarea
              value={settings.custom_body_scripts || ''}
              onChange={(e) => handleChange('custom_body_scripts', e.target.value)}
              placeholder="<!-- Paste any custom <body> scripts or noscript fallback tags -->"
              rows={3}
            />
          </FormGroup>
        </Grid>
      </FormSection>
    </Container>
  );
};
