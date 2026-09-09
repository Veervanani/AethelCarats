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
    logoWidth: 240,
    logoHeight: 75,
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

  const [footerSettings, setFooterSettings] = useState<any>({
    logoImage: '',
    logoUrl: '',
    logoWidth: 220,
    logoHeight: 75,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSiteSettings();
      if (data) {
        // 1. Header
        let headerMerged: any = {};
        if (data.header_settings) {
          headerMerged = typeof data.header_settings === 'string' ? JSON.parse(data.header_settings) : data.header_settings;
        } else if (data.header_config) {
          headerMerged = typeof data.header_config === 'string' ? JSON.parse(data.header_config) : data.header_config;
        }

        const hLogo = headerMerged.logoImage || headerMerged.logoUrl || data.storeLogo || '/assets/aethelcarats-logo.png';
        let hWidth = headerMerged.logoWidth;
        if (typeof hWidth === 'string') {
          hWidth = parseInt(hWidth.replace(/[^0-9]/g, ''), 10) || 240;
        } else if (typeof hWidth !== 'number') {
          hWidth = 240;
        }

        let hHeight = headerMerged.logoHeight;
        if (typeof hHeight === 'string') {
          hHeight = parseInt(hHeight.replace(/[^0-9]/g, ''), 10) || 75;
        } else if (typeof hHeight !== 'number') {
          hHeight = 75;
        }

        setHeaderSettings((prev: any) => ({
          ...prev,
          ...headerMerged,
          logoImage: hLogo,
          logoUrl: hLogo,
          logoWidth: hWidth,
          logoHeight: hHeight,
        }));

        // 2. Footer
        let footerMerged: any = {};
        if (data.footer_settings) {
          footerMerged = typeof data.footer_settings === 'string' ? JSON.parse(data.footer_settings) : data.footer_settings;
        } else if (data.footer_config) {
          footerMerged = typeof data.footer_config === 'string' ? JSON.parse(data.footer_config) : data.footer_config;
        }

        const fLogo = footerMerged.logoImage || footerMerged.logoUrl || data.storeLogo || '/assets/aethelcarats-logo.png';
        let fWidth = footerMerged.logoWidth;
        if (typeof fWidth === 'string') {
          fWidth = parseInt(fWidth.replace(/[^0-9]/g, ''), 10) || 220;
        } else if (typeof fWidth !== 'number') {
          fWidth = 220;
        }

        let fHeight = footerMerged.logoHeight;
        if (typeof fHeight === 'string') {
          fHeight = parseInt(fHeight.replace(/[^0-9]/g, ''), 10) || 75;
        } else if (typeof fHeight !== 'number') {
          fHeight = 75;
        }

        setFooterSettings((prev: any) => ({
          ...prev,
          ...footerMerged,
          logoImage: fLogo,
          logoUrl: fLogo,
          logoWidth: fWidth,
          logoHeight: fHeight,
        }));
      }
    } catch (err) {
      console.error('Failed to load header/footer settings:', err);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMsg('');
      setSuccessMsg('');

      // Header payload
      const hLogo = headerSettings.logoImage || headerSettings.logoUrl || '';
      const hWidthVal = `${headerSettings.logoWidth || 240}px`;
      const hHeightVal = `${headerSettings.logoHeight || 75}px`;

      const headerPayload = {
        ...headerSettings,
        logoImage: hLogo,
        logoUrl: hLogo,
        logoWidth: hWidthVal,
        logoHeight: hHeightVal,
      };

      await api.updateSiteSetting('header_settings', headerPayload);
      await api.updateSiteSetting('header_config', headerPayload);
      if (hLogo) {
        await api.updateSiteSetting('storeLogo', hLogo);
      }

      // Footer payload - preserve existing settings like columns and contacts
      let currentFooterData: any = {};
      try {
        const res = await api.getSiteSettings('footer_settings');
        if (res?.footer_settings) {
          currentFooterData = typeof res.footer_settings === 'string' ? JSON.parse(res.footer_settings) : res.footer_settings;
        }
      } catch (e) {}

      const fLogo = footerSettings.logoImage || footerSettings.logoUrl || '';
      const fWidthVal = `${footerSettings.logoWidth || 220}px`;
      const fHeightVal = `${footerSettings.logoHeight || 75}px`;

      const footerPayload = {
        ...currentFooterData,
        ...footerSettings,
        logoImage: fLogo,
        logoUrl: fLogo,
        logoWidth: fWidthVal,
        logoHeight: fHeightVal,
      };

      await api.updateSiteSetting('footer_settings', footerPayload);
      await api.updateSiteSetting('footer_config', footerPayload);

      setHeaderSettings((prev: any) => ({
        ...prev,
        logoImage: hLogo,
        logoUrl: hLogo,
        logoWidth: parseInt(hWidthVal, 10),
        logoHeight: parseInt(hHeightVal, 10),
      }));

      setFooterSettings((prev: any) => ({
        ...prev,
        logoImage: fLogo,
        logoUrl: fLogo,
        logoWidth: parseInt(fWidthVal, 10),
        logoHeight: parseInt(fHeightVal, 10),
      }));

      setSuccessMsg('✓ Both Header & Footer logos, dimensions, and configurations successfully saved to database!');
      setTimeout(() => setSuccessMsg(''), 6000);
    } catch (err: any) {
      console.error('Failed to save header settings:', err);
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const currentHeaderWidth = Number(headerSettings.logoWidth) || 240;
  const currentHeaderHeight = Number(headerSettings.logoHeight) || 75;
  const activeHeaderLogo = headerSettings.logoImage || headerSettings.logoUrl;

  const currentFooterWidth = Number(footerSettings.logoWidth) || 220;
  const currentFooterHeight = Number(footerSettings.logoHeight) || 75;
  const activeFooterLogo = footerSettings.logoImage || footerSettings.logoUrl;

  return (
    <div>
      <StickyTopHeader>
        <div>
          <h1>Storefront Brand Logos & Header Customizer</h1>
          <div style={{ fontSize: '0.82rem', color: '#77736c' }}>
            Upload Header & Footer Logos from PC, customize dimensions (width & height), announcement bar, and navigation.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <AdminButton $variant="secondary" onClick={loadSettings} icon={<RefreshCw size={14} />}>
            Reload Saved
          </AdminButton>
          <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Check size={14} />}>
            Save All Logos & Settings
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
        {/* CARD 1: HEADER LOGO & SIZING (FROM PC & SLIDERS) */}
        <AdminCard>
          <AdminCardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ImageIcon size={18} color="#c9a45c" />
              <h3>1. HEADER BRAND LOGO & SIZING</h3>
            </div>
            {activeHeaderLogo && (
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
            Upload header logo directly from your computer (PNG, JPG, SVG, or WEBP). Fine-tune width and height sliders to achieve the perfect balance in the storefront header.
          </div>

          <MediaUploader
            label="Header Logo File (Upload from PC or select from Library)"
            value={activeHeaderLogo}
            onChange={(url) => setHeaderSettings({ ...headerSettings, logoImage: url, logoUrl: url })}
            helpText="Recommended: Transparent PNG or SVG with horizontal layout. Max file size: 15MB"
          />

          <SizeControlBox>
            {/* Header Logo Width */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sliders size={16} color="#c9a45c" />
                Header Logo Display Width: <span style={{ color: '#c9a45c' }}>{currentHeaderWidth}px</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: '#77736c' }}>Range: 80px – 450px</span>
            </div>

            <SliderRow>
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>80px</span>
              <input
                type="range"
                min="80"
                max="450"
                step="2"
                value={currentHeaderWidth}
                onChange={(e) => {
                  const w = Number(e.target.value);
                  const h = Math.min(125, Math.max(35, Math.round(w / 2.6)));
                  setHeaderSettings({ ...headerSettings, logoWidth: w, logoHeight: h });
                }}
              />
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>450px</span>
              <AdminInput
                type="number"
                min="80"
                max="500"
                className="px-input"
                value={currentHeaderWidth}
                onChange={(e) => {
                  const w = Number(e.target.value) || 240;
                  const h = Math.min(125, Math.max(35, Math.round(w / 2.6)));
                  setHeaderSettings({ ...headerSettings, logoWidth: w, logoHeight: h });
                }}
              />
            </SliderRow>

            <PresetPills>
              <span className="label">Width Presets:</span>
              <button
                type="button"
                className={currentHeaderWidth === 160 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 160, logoHeight: 60 })}
              >
                Compact (160px)
              </button>
              <button
                type="button"
                className={currentHeaderWidth === 200 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 200, logoHeight: 70 })}
              >
                Standard (200px)
              </button>
              <button
                type="button"
                className={currentHeaderWidth === 240 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 240, logoHeight: 80 })}
              >
                Default (240px)
              </button>
              <button
                type="button"
                className={currentHeaderWidth === 280 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 280, logoHeight: 95 })}
              >
                Prominent (280px)
              </button>
              <button
                type="button"
                className={currentHeaderWidth === 340 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoWidth: 340, logoHeight: 115 })}
              >
                Large Atelier (340px)
              </button>
            </PresetPills>

            {/* Header Logo Height */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sliders size={16} color="#c9a45c" />
                Header Logo Max Height: <span style={{ color: '#c9a45c' }}>{currentHeaderHeight}px</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: '#77736c' }}>Range: 30px – 120px</span>
            </div>

            <SliderRow>
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>30px</span>
              <input
                type="range"
                min="30"
                max="120"
                step="2"
                value={currentHeaderHeight}
                onChange={(e) => setHeaderSettings({ ...headerSettings, logoHeight: Number(e.target.value) })}
              />
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>120px</span>
              <AdminInput
                type="number"
                min="30"
                max="140"
                className="px-input"
                value={currentHeaderHeight}
                onChange={(e) => setHeaderSettings({ ...headerSettings, logoHeight: Number(e.target.value) || 75 })}
              />
            </SliderRow>

            <PresetPills>
              <span className="label">Height Presets:</span>
              <button
                type="button"
                className={currentHeaderHeight === 48 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoHeight: 48 })}
              >
                Subtle (48px)
              </button>
              <button
                type="button"
                className={currentHeaderHeight === 60 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoHeight: 60 })}
              >
                Standard (60px)
              </button>
              <button
                type="button"
                className={currentHeaderHeight === 75 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoHeight: 75 })}
              >
                Default (75px)
              </button>
              <button
                type="button"
                className={currentHeaderHeight === 90 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoHeight: 90 })}
              >
                Prominent (90px)
              </button>
              <button
                type="button"
                className={currentHeaderHeight === 110 ? 'active' : ''}
                onClick={() => setHeaderSettings({ ...headerSettings, logoHeight: 110 })}
              >
                Grand Atelier (110px)
              </button>
            </PresetPills>
          </SizeControlBox>
        </AdminCard>

        {/* CARD 2: FOOTER LOGO & SIZING */}
        <AdminCard>
          <AdminCardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ImageIcon size={18} color="#c9a45c" />
              <h3>2. FOOTER BRAND LOGO & SIZING</h3>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {activeHeaderLogo && activeHeaderLogo !== activeFooterLogo && (
                <AdminButton
                  $variant="secondary"
                  $size="sm"
                  onClick={() => setFooterSettings({ ...footerSettings, logoImage: activeHeaderLogo, logoUrl: activeHeaderLogo })}
                >
                  ⚡ Sync with Header Logo
                </AdminButton>
              )}
              {activeFooterLogo && (
                <AdminButton
                  $variant="secondary"
                  $size="sm"
                  onClick={() => setFooterSettings({ ...footerSettings, logoImage: '', logoUrl: '' })}
                  icon={<RotateCcw size={12} />}
                >
                  Use Text Brand Default
                </AdminButton>
              )}
            </div>
          </AdminCardHeader>

          <div style={{ fontSize: '0.84rem', color: '#55524d', marginBottom: 14 }}>
            Upload footer logo directly from your computer or click "Sync with Header Logo". Customize footer display width and height to fit seamlessly in the bottom storefront bar.
          </div>

          <MediaUploader
            label="Footer Logo File (Upload from PC or select from Library)"
            value={activeFooterLogo}
            onChange={(url) => setFooterSettings({ ...footerSettings, logoImage: url, logoUrl: url })}
            helpText="Recommended: Transparent PNG or SVG. Light/Gold versions look best against dark footer background."
          />

          <SizeControlBox>
            {/* Footer Logo Width */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sliders size={16} color="#c9a45c" />
                Footer Logo Display Width: <span style={{ color: '#c9a45c' }}>{currentFooterWidth}px</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: '#77736c' }}>Range: 80px – 450px</span>
            </div>

            <SliderRow>
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>80px</span>
              <input
                type="range"
                min="80"
                max="450"
                step="2"
                value={currentFooterWidth}
                onChange={(e) => {
                  const w = Number(e.target.value);
                  const h = Math.min(125, Math.max(35, Math.round(w / 2.6)));
                  setFooterSettings({ ...footerSettings, logoWidth: w, logoHeight: h });
                }}
              />
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>450px</span>
              <AdminInput
                type="number"
                min="80"
                max="500"
                className="px-input"
                value={currentFooterWidth}
                onChange={(e) => {
                  const w = Number(e.target.value) || 220;
                  const h = Math.min(125, Math.max(35, Math.round(w / 2.6)));
                  setFooterSettings({ ...footerSettings, logoWidth: w, logoHeight: h });
                }}
              />
            </SliderRow>

            <PresetPills>
              <span className="label">Width Presets:</span>
              <button
                type="button"
                className={currentFooterWidth === 160 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoWidth: 160, logoHeight: 60 })}
              >
                Compact (160px)
              </button>
              <button
                type="button"
                className={currentFooterWidth === 200 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoWidth: 200, logoHeight: 70 })}
              >
                Standard (200px)
              </button>
              <button
                type="button"
                className={currentFooterWidth === 240 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoWidth: 240, logoHeight: 80 })}
              >
                Default (240px)
              </button>
              <button
                type="button"
                className={currentFooterWidth === 280 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoWidth: 280, logoHeight: 95 })}
              >
                Prominent (280px)
              </button>
              <button
                type="button"
                className={currentFooterWidth === 340 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoWidth: 340, logoHeight: 115 })}
              >
                Large Atelier (340px)
              </button>
            </PresetPills>

            {/* Footer Logo Height */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <label style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sliders size={16} color="#c9a45c" />
                Footer Logo Max Height: <span style={{ color: '#c9a45c' }}>{currentFooterHeight}px</span>
              </label>
              <span style={{ fontSize: '0.78rem', color: '#77736c' }}>Range: 30px – 120px</span>
            </div>

            <SliderRow>
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>30px</span>
              <input
                type="range"
                min="30"
                max="120"
                step="2"
                value={currentFooterHeight}
                onChange={(e) => setFooterSettings({ ...footerSettings, logoHeight: Number(e.target.value) })}
              />
              <span style={{ fontSize: '0.78rem', color: '#77736c', fontWeight: 600 }}>120px</span>
              <AdminInput
                type="number"
                min="30"
                max="140"
                className="px-input"
                value={currentFooterHeight}
                onChange={(e) => setFooterSettings({ ...footerSettings, logoHeight: Number(e.target.value) || 75 })}
              />
            </SliderRow>

            <PresetPills>
              <span className="label">Height Presets:</span>
              <button
                type="button"
                className={currentFooterHeight === 48 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoHeight: 48 })}
              >
                Subtle (48px)
              </button>
              <button
                type="button"
                className={currentFooterHeight === 60 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoHeight: 60 })}
              >
                Standard (60px)
              </button>
              <button
                type="button"
                className={currentFooterHeight === 75 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoHeight: 75 })}
              >
                Default (75px)
              </button>
              <button
                type="button"
                className={currentFooterHeight === 90 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoHeight: 90 })}
              >
                Prominent (90px)
              </button>
              <button
                type="button"
                className={currentFooterHeight === 110 ? 'active' : ''}
                onClick={() => setFooterSettings({ ...footerSettings, logoHeight: 110 })}
              >
                Grand Atelier (110px)
              </button>
            </PresetPills>
          </SizeControlBox>

          {/* Live Footer Bottom Bar Preview */}
          <div style={{ marginTop: 16, background: '#0b0f14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {activeFooterLogo ? (
                <img
                  src={activeFooterLogo}
                  alt="Footer Logo Preview"
                  style={{
                    width: `${currentFooterWidth}px`,
                    maxHeight: `${currentFooterHeight}px`,
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.18em', color: '#F5F1E8', lineHeight: 1 }}>
                    AETHEL<span style={{ color: '#C9A96E' }}>CARATS</span>
                  </div>
                  <div style={{ fontSize: '0.5rem', letterSpacing: '0.28em', color: '#A8A8A8', marginTop: 2 }}>
                    FINE JEWELLERY ATELIER
                  </div>
                </div>
              )}
              <span style={{ color: '#88847d', fontSize: '0.75rem' }}>
                © {new Date().getFullYear()} AethelCarats Fine Jewellery. All Rights Reserved.
              </span>
            </div>
            <div style={{ display: 'flex', gap: 14, color: '#A8A8A8', fontSize: '0.75rem' }}>
              <span>Terms & Conditions</span>
              <span>Privacy Policy</span>
              <span>Returns & Refunds</span>
            </div>
          </div>
        </AdminCard>

        {/* CARD 3: LIVE STOREFRONT HEADER PREVIEW */}
        <AdminCard>
          <AdminCardHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Eye size={18} color="#c9a45c" />
              <h3>3. LIVE STOREFRONT HEADER PREVIEW</h3>
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
                {activeHeaderLogo ? (
                  <img
                    src={activeHeaderLogo}
                    alt="AethelCarats Logo Preview"
                    style={{
                      width: `${currentHeaderWidth}px`,
                      maxHeight: `${currentHeaderHeight}px`,
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

        {/* CARD 4: ANNOUNCEMENT BAR SETTINGS */}
        <AdminCard>
          <AdminCardHeader>
            <h3>4. TOP ANNOUNCEMENT BAR</h3>
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

        {/* CARD 5: NAVIGATION ITEMS */}
        <AdminCard>
          <AdminCardHeader>
            <h3>5. STOREFRONT NAVIGATION MENU</h3>
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
