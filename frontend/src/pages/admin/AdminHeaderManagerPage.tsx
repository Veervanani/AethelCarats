import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, Plus, Trash2, Check, ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';
import { MediaUploader } from '../../components/admin/MediaUploader';
import {
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminFormGrid,
  AdminFormGroup,
} from '../../components/admin/AdminUI';

const StickyTopHeader = styled.div`
  position: sticky;
  top: 64px;
  z-index: 80;
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  @media (max-width: 900px) {
    top: 58px;
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #1f1f1f;
    margin: 0;
  }
`;

const ContentCanvas = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;

  span.label {
    font-weight: 600;
    font-size: 0.88rem;
    color: #1f1f1f;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #c9a45c;
  }
`;

export const AdminHeaderManagerPage: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [headerSettings, setHeaderSettings] = useState<any>({
    announcementText: 'FREE WORLDWIDE SHIPPING ✦',
    announcementEnabled: true,
    announcementBg: '#12161a',
    announcementTextColor: '#fffdf9',
    logoImage: '/assets/gem_logo.svg',
    headerBg: '#ffffff',
    stickyHeader: true,
    showSearch: true,
    showWishlist: true,
    showAccount: true,
    showCart: true,
    navItems: [
      { label: 'Rings', link: '/rings', isVisible: true },
      { label: 'Earrings', link: '/earrings', isVisible: true },
      { label: 'Necklaces', link: '/necklaces', isVisible: true },
      { label: 'Bracelets', link: '/bracelets', isVisible: true },
      { label: 'Diamonds', link: '/diamonds', isVisible: true },
      { label: 'Custom Jewellery', link: '/custom-jewellery', isVisible: true },
    ],
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSiteSettings();
      if (data) {
        let merged: any = {};
        if (data.header_settings) {
          merged = typeof data.header_settings === 'string' ? JSON.parse(data.header_settings) : data.header_settings;
        } else if (data.header_config) {
          merged = typeof data.header_config === 'string' ? JSON.parse(data.header_config) : data.header_config;
        }
        setHeaderSettings((prev: any) => ({ ...prev, ...merged }));
      }
    } catch (err) {
      console.error('Failed to load header settings:', err);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');

      await api.updateSiteSetting('header_settings', headerSettings);
      await api.updateSiteSetting('header_config', headerSettings);
      setSuccessMsg('Header settings and announcement bar updated successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || err?.message || 'Failed to save header settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <StickyTopHeader>
        <div>
          <h1>Full-Page Header & Navigation Editor</h1>
          <div style={{ fontSize: '0.82rem', color: '#77736c' }}>Customize logo asset, announcement bar, navigation, and menu settings</div>
        </div>
        <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Check size={14} />}>
          Save Header Settings
        </AdminButton>
      </StickyTopHeader>

      {successMsg && (
        <div style={{ maxWidth: 1200, margin: '0 auto 20px', background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, fontWeight: 600 }}>
          ✓ {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ maxWidth: 1200, margin: '0 auto 20px', background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <ContentCanvas>
        {/* ANNOUNCEMENT BAR CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>1. ANNOUNCEMENT BAR SETTINGS</h3>
          </AdminCardHeader>
          <ToggleRow style={{ marginBottom: 16 }}>
            <span className="label">Enable Top Announcement Bar</span>
            <input
              type="checkbox"
              checked={headerSettings.announcementEnabled}
              onChange={(e) => setHeaderSettings({ ...headerSettings, announcementEnabled: e.target.checked })}
            />
          </ToggleRow>

          <AdminFormGrid $columns={1}>
            <AdminFormGroup>
              <label>Announcement Bar Text</label>
              <AdminInput
                type="text"
                value={headerSettings.announcementText || ''}
                onChange={(e) => setHeaderSettings({ ...headerSettings, announcementText: e.target.value })}
                placeholder="e.g. FREE WORLDWIDE SHIPPING ✦"
              />
            </AdminFormGroup>
          </AdminFormGrid>
        </AdminCard>

        {/* LOGO & BRAND ASSETS CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>2. HEADER BRAND LOGO (NO MANUAL URL INPUTS)</h3>
          </AdminCardHeader>
          <MediaUploader
            label="Main Brand Header Logo"
            value={headerSettings.logoImage || ''}
            onChange={(url) => setHeaderSettings({ ...headerSettings, logoImage: url })}
            helpText="SVG or PNG vector image recommended"
          />
        </AdminCard>

        {/* NAVIGATION ITEMS CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>3. MAIN STOREFRONT NAVIGATION MENU</h3>
            <AdminButton
              $variant="gold"
              $size="sm"
              onClick={() => {
                const updated = [...(headerSettings.navItems || []), { label: 'New Link', link: '/collections', isVisible: true }];
                setHeaderSettings({ ...headerSettings, navItems: updated });
              }}
              icon={<Plus size={13} />}
            >
              + Add Nav Item
            </AdminButton>
          </AdminCardHeader>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(headerSettings.navItems || []).map((item: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#faf8f5', padding: '10px 14px', border: '1px solid #e8e3d9', borderRadius: 6 }}>
                <AdminInput
                  type="text"
                  value={item.label || ''}
                  onChange={(e) => {
                    const updated = [...headerSettings.navItems];
                    updated[idx].label = e.target.value;
                    setHeaderSettings({ ...headerSettings, navItems: updated });
                  }}
                  placeholder="Nav Label (e.g. Rings)"
                  style={{ width: 200 }}
                />
                <AdminInput
                  type="text"
                  value={item.link || ''}
                  onChange={(e) => {
                    const updated = [...headerSettings.navItems];
                    updated[idx].link = e.target.value;
                    setHeaderSettings({ ...headerSettings, navItems: updated });
                  }}
                  placeholder="Target Link (e.g. /rings)"
                  style={{ flex: 1 }}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={item.isVisible ?? true}
                    onChange={(e) => {
                      const updated = [...headerSettings.navItems];
                      updated[idx].isVisible = e.target.checked;
                      setHeaderSettings({ ...headerSettings, navItems: updated });
                    }}
                    style={{ accentColor: '#c9a45c' }}
                  />
                  Visible
                </label>
                <AdminButton
                  $variant="danger"
                  $size="sm"
                  onClick={() => {
                    const updated = headerSettings.navItems.filter((_: any, i: number) => i !== idx);
                    setHeaderSettings({ ...headerSettings, navItems: updated });
                  }}
                  icon={<Trash2 size={13} />}
                />
              </div>
            ))}
          </div>
        </AdminCard>
      </ContentCanvas>
    </div>
  );
};
