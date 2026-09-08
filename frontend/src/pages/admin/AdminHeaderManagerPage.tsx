import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Save, Plus, Trash2, Check, ArrowLeft, Upload, Sliders, Eye, RefreshCw, Image as ImageIcon, RotateCcw } from 'lucide-react';
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

const SizeControlBox = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 16px;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  input[type='range'] {
    flex: 1;
    accent-color: #c9a45c;
    height: 6px;
    cursor: pointer;
  }

  .px-input {
    width: 90px;
    text-align: center;
    font-weight: 700;
    font-family: monospace;
    font-size: 0.95rem;
  }
`;

const PresetPills = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;

  span.label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #77736c;
    margin-right: 4px;
  }

  button {
    background: #ffffff;
    border: 1px solid #d9d3c7;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #4a4741;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #c9a45c;
      color: #c9a45c;
    }

    &.active {
      background: #19202a;
      color: #fffdfa;
      border-color: #19202a;
    }
  }
`;

const LivePreviewCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .preview-topbar {
    background: #12161a;
    color: #fffdf9;
    padding: 8px 16px;
    text-align: center;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    font-weight: 600;
  }

  .preview-navbar {
    background: #0f141a;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 70px;
  }

  .preview-links {
    display: flex;
    gap: 20px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #c9a45c;
    text-transform: uppercase;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .preview-actions {
    display: flex;
    gap: 14px;
    color: #fffdf9;
    font-size: 0.8rem;
    opacity: 0.8;
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
    logoImage: '',
    logoUrl: '',
    logoWidth: 180,
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

        const logo = merged.logoImage || merged.logoUrl || data.storeLogo || '';
        let width = merged.logoWidth;
        if (typeof width === 'string') {
          width = parseInt(width.replace(/[^0-9]/g, ''), 10) || 180;
        } else if (typeof width !== 'number') {
          width = 180;
        }

        setHeaderSettings((prev: any) => ({
          ...prev,
          ...merged,
          logoImage: logo,
          logoUrl: logo,
          logoWidth: width,
        }));
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

      const logo = headerSettings.logoImage || headerSettings.logoUrl || '';
      const widthVal = `${headerSettings.logoWidth || 180}px`;

      const payload = {
        ...headerSettings,
        logoImage: logo,
        logoUrl: logo,
        logoWidth: widthVal,
      };

      await api.updateSiteSetting('header_settings', payload);
      await api.updateSiteSetting('header_config', payload);
      if (logo) {
        await api.updateSiteSetting('storeLogo', logo);
      }

      setHeaderSettings((prev: any) => ({
        ...prev,
        logoImage: logo,
        logoUrl: logo,
        logoWidth: parseInt(widthVal, 10),
      }));

      setSuccessMsg('✓ Header settings, logo image, and dimensions successfully saved to database!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || err?.message || 'Failed to save header settings.');
    } finally {
      setSaving(false);
    }
  };

  const activeLogo = headerSettings.logoImage || headerSettings.logoUrl || '';
  const currentWidth = Number(headerSettings.logoWidth) || 180;

  return (
    <div>
      <StickyTopHeader>
        <div>
          <h1>Storefront Header & Logo Customizer</h1>
          <div style={{ fontSize: '0.82rem', color: '#77736c' }}>
            Upload brand logo from PC, customize dimensions, announcement bar, and navigation menu
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <AdminButton $variant="secondary" onClick={loadSettings} icon={<RefreshCw size={14} />}>
            Reload Saved
          </AdminButton>
          <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Check size={14} />}>
            Save Header Settings
          </AdminButton>
        </div>
      </StickyTopHeader>

      {successMsg && (
        <div style={{ maxWidth: 1200, margin: '0 auto 20px', background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, fontWeight: 600 }}>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ maxWidth: 1200, margin: '0 auto 20px', background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <ContentCanvas>
        {/* CARD 1: LOGO & BRAND ASSETS (FROM PC & SIZING) */}
        <AdminCard>
          <AdminCardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ImageIcon size={18} color="#c9a45c" />
              <h3>1. HEADER BRAND LOGO & SIZING</h3>
            </div>
            {activeLogo && (
              <AdminButton
                $variant="secondary"
                $size="sm"
                onClick={() => setHeaderSettings({ ...headerSettings, logoImage: '', logoUrl: '' })}
                icon={<RotateCcw size={12} />}
              >
                Use Text Brand Default
              </AdminButton>
            )}
          </AdminCardHeader>

          <div style={{ fontSize: '0.84rem', color: '#55524d', marginBottom: 14 }}>
            Upload your logo directly from your computer (PNG, JPG, SVG, or WEBP). Adjust the width slider to achieve the perfect balance in the storefront header.
          </div>

          <MediaUploader
            label="Header Logo File (Upload from PC or select from Library)"
            value={activeLogo}
            onChange={(url) => setHeaderSettings({ ...headerSettings, logoImage: url, logoUrl: url })}
            helpText="Recommended: Transparent PNG or SVG with horizontal layout. Max file size: 15MB"
          />

          <SizeControlBox>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sliders size={16} color="#c9a45c" />
                Logo Display Width in Header: <span style={{ color: '#c9a45c' }}>{currentWidth}px</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: '#77736c' }}>Height scales automatically (max 52px)</span>
            </div>

            <SliderRow>
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>60px</span>
              <input
                type="range"
                min="60"
                max="400"
                step="2"
                value={currentWidth}
                onChange={(e) => setHeaderSettings({ ...headerSettings, logoWidth: Number(e.target.value) })}
              />
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>400px</span>
              <AdminInput
                type="number"
                min="60"
                max="500"
                className="px-input"
                value={currentWidth}
                onChange={(e) => setHeaderSettings({ ...headerSettings, logoWidth: Number(e.target.value) || 180 })}
              />
            </SliderRow>

            <PresetPills>
              <span className="label">Quick Presets:</span>
              <button
                type="button"
                className={currentWidth === 120 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 120 })}
              >
                Compact (120px)
              </button>
              <button
                type="button"
                className={currentWidth === 160 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 160 })}
              >
                Standard (160px)
              </button>
              <button
                type="button"
                className={currentWidth === 180 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 180 })}
              >
                Default (180px)
              </button>
              <button
                type="button"
                className={currentWidth === 220 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 220 })}
              >
                Prominent (220px)
              </button>
              <button
                type="button"
                className={currentWidth === 280 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 280 })}
              >
                Large Atelier (280px)
              </button>
            </PresetPills>
          </SizeControlBox>
        </AdminCard>

        {/* CARD 2: LIVE STOREFRONT HEADER PREVIEW */}
        <AdminCard>
          <AdminCardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Eye size={18} color="#c9a45c" />
              <h3>2. LIVE STOREFRONT HEADER PREVIEW</h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#77736c' }}>Real-time simulation of public navbar</span>
          </AdminCardHeader>

          <LivePreviewCard>
            {headerSettings.announcementEnabled && (
              <div className="preview-topbar" style={{ background: headerSettings.announcementBg || '#12161a', color: headerSettings.announcementTextColor || '#fffdf9' }}>
                {headerSettings.announcementText || 'FREE WORLDWIDE SHIPPING ✦'}
              </div>
            )}
            <div className="preview-navbar">
              <div style={{ display: 'flex', alignItems: 'center', minHeight: 48 }}>
                {activeLogo ? (
                  <img
                    src={activeLogo}
                    alt="AethelCarats Logo Preview"
                    style={{
                      width: `${currentWidth}px`,
                      maxHeight: '52px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.18em', color: '#F5F1E8', lineHeight: 1 }}>
                      AETHEL<span style={{ color: '#C9A96E' }}>CARATS</span>
                    </div>
                    <div style={{ fontSize: '0.52rem', letterSpacing: '0.28em', color: '#A8A8A8', marginTop: 2 }}>
                      FINE JEWELLERY ATELIER
                    </div>
                  </div>
                )}
              </div>

              <div className="preview-links">
                {(headerSettings.navItems || []).filter((n: any) => n.isVisible !== false).slice(0, 5).map((item: any, idx: number) => (
                  <span key={idx}>{item.label}</span>
                ))}
              </div>

              <div className="preview-actions">
                <span>🔍 Search</span>
                <span>♡ Wishlist</span>
                <span>🛍️ Bag (0)</span>
              </div>
            </div>
          </LivePreviewCard>
        </AdminCard>

        {/* CARD 3: ANNOUNCEMENT BAR SETTINGS */}
        <AdminCard>
          <AdminCardHeader>
            <h3>3. TOP ANNOUNCEMENT BAR</h3>
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

        {/* CARD 4: NAVIGATION ITEMS */}
        <AdminCard>
          <AdminCardHeader>
            <h3>4. STOREFRONT NAVIGATION MENU</h3>
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
