import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, Plus, Trash2, Check } from 'lucide-react';
import { api } from '../../services/api';
import { MediaUploader } from '../../components/admin/MediaUploader';
import {
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminInput,
  AdminTextarea,
  AdminFormGrid,
  AdminFormGroup,
} from '../../components/admin/AdminUI';

const StickyTopHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 80;
  background: #ffffff;
  border-bottom: 1px solid #e8e3d9;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

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

export const AdminFooterManagerPage: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [footerSettings, setFooterSettings] = useState<any>({
    brandName: 'FLOKSY JEWEL',
    tagline: 'Fine Jewelry & Certified Solitaire Diamonds',
    logoImage: '/assets/floksy_logo_light.svg',
    copyrightText: '© 2026 Floksy Jewel. All Rights Reserved.',
    email: 'contact@floksyjewel.com',
    phone: '+91973785306',
    address: 'Surat, India',
    instagram: 'https://www.instagram.com/floksyjewel',
    facebook: 'https://facebook.com/floksyjewel',
    pinterest: 'https://pinterest.com/floksyjewel',
    trustBadgeImage: '/assets/trust_badges.png',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSiteSettings();
      if (data) {
        let merged: any = {};
        if (data.footer_settings) {
          merged = typeof data.footer_settings === 'string' ? JSON.parse(data.footer_settings) : data.footer_settings;
        }
        if (data.contactEmail !== undefined) merged.email = data.contactEmail;
        if (data.contactPhone !== undefined) merged.phone = data.contactPhone;
        if (data.instagramUrl !== undefined) merged.instagram = data.instagramUrl;
        if (data.facebookUrl !== undefined) merged.facebook = data.facebookUrl;
        if (data.pinterestUrl !== undefined) merged.pinterest = data.pinterestUrl;
        if (data.storeName !== undefined) merged.brandName = data.storeName;
        if (data.storeAddress !== undefined) merged.address = data.storeAddress;

        // Auto-sanitize old database pre-existing Mayfair/London placeholders
        if (!merged.address || merged.address.includes('London') || merged.address.includes('Mayfair')) {
          merged.address = 'Surat, India';
        }
        if (!merged.copyrightText || merged.copyrightText.includes('Mayfair')) {
          merged.copyrightText = '© 2026 Floksy Jewel. All Rights Reserved.';
        }
        if (!merged.brandName || merged.brandName.includes('Mayfair')) {
          merged.brandName = 'FLOKSY JEWEL';
        }

        setFooterSettings((prev: any) => ({ ...prev, ...merged }));
      }
    } catch (err) {
      console.error('Failed to load footer settings:', err);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');

      const cleanInstagram = (footerSettings.instagram || '').trim();
      const cleanFacebook = (footerSettings.facebook || '').trim();
      const cleanPinterest = (footerSettings.pinterest || '').trim();

      const payload = {
        ...footerSettings,
        instagram: cleanInstagram,
        facebook: cleanFacebook,
        pinterest: cleanPinterest,
      };

      await api.updateSiteSetting('footer_settings', payload);
      await api.updateSiteSetting('contactEmail', footerSettings.email ?? '');
      await api.updateSiteSetting('contactPhone', footerSettings.phone ?? '');
      await api.updateSiteSetting('instagramUrl', cleanInstagram);
      await api.updateSiteSetting('instagram', cleanInstagram);
      await api.updateSiteSetting('facebookUrl', cleanFacebook);
      await api.updateSiteSetting('facebook', cleanFacebook);
      await api.updateSiteSetting('pinterestUrl', cleanPinterest);
      await api.updateSiteSetting('pinterest', cleanPinterest);
      await api.updateSiteSetting('storeName', footerSettings.brandName ?? '');
      await api.updateSiteSetting('storeAddress', footerSettings.address ?? '');

      await api.updateSiteSettings({
        instagramUrl: cleanInstagram,
        facebookUrl: cleanFacebook,
        pinterestUrl: cleanPinterest,
        contactEmail: footerSettings.email ?? '',
        contactPhone: footerSettings.phone ?? '',
        storeName: footerSettings.brandName ?? '',
        storeAddress: footerSettings.address ?? '',
      });

      setFooterSettings(payload);
      setSuccessMsg('Footer content and social links updated successfully in database!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save footer settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <StickyTopHeader>
        <div>
          <h1>Full-Page Footer Editor</h1>
          <div style={{ fontSize: '0.82rem', color: '#77736c' }}>Customize footer brand narrative, contact information, social links, and images</div>
        </div>
        <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Check size={14} />}>
          Save Footer Settings
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
        {/* BRAND IDENTITY & LOGO CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>1. FOOTER BRAND NARRATIVE & LOGO (NO MANUAL URL INPUTS)</h3>
          </AdminCardHeader>
          <AdminFormGrid $columns={2}>
            <AdminFormGroup>
              <label>Brand Name</label>
              <AdminInput
                type="text"
                value={footerSettings.brandName || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, brandName: e.target.value })}
              />
            </AdminFormGroup>
            <AdminFormGroup>
              <label>Brand Tagline</label>
              <AdminInput
                type="text"
                value={footerSettings.tagline || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, tagline: e.target.value })}
              />
            </AdminFormGroup>
          </AdminFormGrid>

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <MediaUploader
              label="Footer Brand Logo Image"
              value={footerSettings.logoImage || ''}
              onChange={(url) => setFooterSettings({ ...footerSettings, logoImage: url })}
            />
            <MediaUploader
              label="Trust & Certification Badges Image"
              value={footerSettings.trustBadgeImage || ''}
              onChange={(url) => setFooterSettings({ ...footerSettings, trustBadgeImage: url })}
            />
          </div>
        </AdminCard>

        {/* CONTACT INFORMATION & LEGAL CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>2. CONTACT INFORMATION & COPYRIGHT</h3>
          </AdminCardHeader>
          <AdminFormGrid $columns={3}>
            <AdminFormGroup>
              <label>Concierge Email</label>
              <AdminInput
                type="text"
                value={footerSettings.email || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, email: e.target.value })}
              />
            </AdminFormGroup>
            <AdminFormGroup>
              <label>Contact Phone</label>
              <AdminInput
                type="text"
                value={footerSettings.phone || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, phone: e.target.value })}
              />
            </AdminFormGroup>
            <AdminFormGroup>
              <label>Atelier Address</label>
              <AdminInput
                type="text"
                value={footerSettings.address || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, address: e.target.value })}
              />
            </AdminFormGroup>
          </AdminFormGrid>

          <AdminFormGroup style={{ marginTop: 16 }}>
            <label>Copyright Statement</label>
            <AdminInput
              type="text"
              value={footerSettings.copyrightText || ''}
              onChange={(e) => setFooterSettings({ ...footerSettings, copyrightText: e.target.value })}
            />
          </AdminFormGroup>
        </AdminCard>

        {/* SOCIAL LINKS CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>3. SOCIAL MEDIA CHANNELS</h3>
          </AdminCardHeader>
          <AdminFormGrid $columns={3}>
            <AdminFormGroup>
              <label>Instagram URL</label>
              <AdminInput
                type="text"
                value={footerSettings.instagram || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, instagram: e.target.value })}
              />
            </AdminFormGroup>
            <AdminFormGroup>
              <label>Facebook URL</label>
              <AdminInput
                type="text"
                value={footerSettings.facebook || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, facebook: e.target.value })}
              />
            </AdminFormGroup>
            <AdminFormGroup>
              <label>Pinterest URL</label>
              <AdminInput
                type="text"
                value={footerSettings.pinterest || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, pinterest: e.target.value })}
              />
            </AdminFormGroup>
          </AdminFormGrid>
        </AdminCard>
      </ContentCanvas>
    </div>
  );
};
