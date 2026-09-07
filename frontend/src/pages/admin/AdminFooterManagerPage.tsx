import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Save,
  Plus,
  Trash2,
  Check,
  MoveUp,
  MoveDown,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Pin as Pinterest,
  Youtube,
  Send,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Layers,
  ShieldCheck,
  CreditCard,
  Eye,
} from 'lucide-react';
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
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.8rem;
    color: #1f1f1f;
    margin: 0;
  }
`;

const ContentCanvas = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TabsNav = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e8e3d9;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 2px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#19202a' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fffdfa' : '#55524d')};
  border: 1px solid ${({ $active }) => ($active ? '#19202a' : '#e8e3d9')};
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: #19202a;
    color: ${({ $active }) => ($active ? '#fffdfa' : '#19202a')};
  }
`;

const ColumnCard = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const LinkItemRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 130px 40px 40px 40px;
  gap: 10px;
  align-items: center;
  background: #ffffff;
  padding: 8px 12px;
  border: 1px solid #e8e3d9;
  border-radius: 6px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const LivePreviewCard = styled.div`
  background: #faf9f6;
  color: #1f1f1f;
  border: 1px solid #e6e1d7;
  border-radius: 8px;
  padding: 40px 32px;
  margin-top: 10px;
`;

const DEFAULT_FOOTER_STATE = {
  brandName: 'AURA DIAMOND ATELIER',
  tagline: 'Fine Jewelry & Certified Solitaire Diamonds',
  brandDescription:
    'Aura Diamond Atelier crafts exquisite lab-grown and natural diamond jewelry with unmatched artistry, ethical sourcing, and timeless elegance.',
  logoImage: '/assets/gem-brand-logo.png',
  trustBadgeImage: '/assets/trust_badges.png',

  // Newsletter Section
  newsletterHeading: 'JOIN AURA DIAMOND ATELIER',
  newsletterSubtitle: 'Subscribe to receive bespoke invitations and private collection releases.',
  newsletterPlaceholder: 'Email Address',
  newsletterButtonText: 'JOIN',
  newsletterConsentText:
    'I agree to receive promotional emails from Aura Diamond Atelier. You can unsubscribe at any time.',
  newsletterPrivacyUrl: '/privacy-policy',

  // Columns
  columns: [
    {
      title: 'THE HOUSE',
      links: [
        { label: 'Quality & Craftsmanship', url: '/about-us', isExternal: false },
        { label: 'Diamond Sustainability', url: '/sustainability', isExternal: false },
        { label: 'Aura Journal', url: '/blog', isExternal: false },
        { label: 'Sale Exclusions', url: '/sale-exclusions', isExternal: false },
      ],
    },
    {
      title: 'COLLECTIONS',
      links: [
        { label: 'Diamond Rings', url: '/rings', isExternal: false },
        { label: 'Fine Earrings', url: '/earrings', isExternal: false },
        { label: 'Riviere Necklaces', url: '/necklaces', isExternal: false },
        { label: 'Tennis Bracelets', url: '/bracelets', isExternal: false },
        { label: 'Solitaire Pendants', url: '/pendants', isExternal: false },
        { label: 'The Diamond Vault', url: '/diamonds', isExternal: false },
      ],
    },
    {
      title: 'CLIENT SERVICES',
      links: [
        { label: 'Contact Concierge', url: '/contact-us', isExternal: false },
        { label: 'Complimentary Insured Shipping', url: '/shipping-delivery', isExternal: false },
        { label: 'Returns & Exchange', url: '/returns-refunds', isExternal: false },
        { label: 'Lifetime Warranty', url: '/lifetime-warranty', isExternal: false },
        { label: 'Frequently Asked Questions', url: '/faq', isExternal: false },
      ],
    },
  ],

  // Contact Info
  email: 'contact@auroradiamonds.com',
  phone: '+91973785306',
  whatsapp: '+91973785306',
  address: 'Surat, India',
  workingHours: 'Mon – Sat: 10:00 AM – 7:00 PM IST',
  appointmentUrl: '/contact-us',

  // Social Links
  instagram: 'https://www.instagram.com/auradiamondatelier',
  facebook: 'https://facebook.com/auradiamondatelier',
  pinterest: 'https://pinterest.com/auradiamondatelier',
  youtube: 'https://youtube.com',
  tiktok: '',
  twitter: '',
  linkedin: '',

  // Bottom Legal & Copyright
  copyrightText: '© 2026 Aura Diamond Atelier. All Rights Reserved.',
  legalLinks: [
    { label: 'Terms & Conditions', url: '/terms-of-service', isExternal: false },
    { label: 'Privacy Policy', url: '/privacy-policy', isExternal: false },
    { label: 'Site Map', url: '/sitemap', isExternal: false },
  ],
  paymentBadgesText: 'Visa, Mastercard, American Express, Apple Pay, Google Pay, Wire Transfer',
};

export const AdminFooterManagerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brand' | 'newsletter' | 'columns' | 'contact' | 'social' | 'legal' | 'preview'>('brand');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [footerSettings, setFooterSettings] = useState<any>(DEFAULT_FOOTER_STATE);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSiteSettings();
      if (data) {
        let merged: any = { ...DEFAULT_FOOTER_STATE };

        if (data.footer_settings) {
          try {
            const parsed = typeof data.footer_settings === 'string' ? JSON.parse(data.footer_settings) : data.footer_settings;
            merged = { ...merged, ...parsed };
          } catch (e) {}
        }

        if (data.footer_config) {
          try {
            const parsedCfg = typeof data.footer_config === 'string' ? JSON.parse(data.footer_config) : data.footer_config;
            merged = { ...merged, ...parsedCfg };
          } catch (e) {}
        }

        // Direct key fallbacks
        if (data.contactEmail) merged.email = data.contactEmail;
        if (data.contactPhone) merged.phone = data.contactPhone;
        if (data.instagramUrl) merged.instagram = data.instagramUrl;
        if (data.facebookUrl) merged.facebook = data.facebookUrl;
        if (data.pinterestUrl) merged.pinterest = data.pinterestUrl;
        if (data.storeName) merged.brandName = data.storeName;
        if (data.storeAddress) merged.address = data.storeAddress;

        // Auto-sanitize old placeholders
        if (!merged.address || merged.address.includes('London') || merged.address.includes('Mayfair')) {
          merged.address = 'Surat, India';
        }
        if (!merged.copyrightText || merged.copyrightText.includes('Mayfair')) {
          merged.copyrightText = '© 2026 Aura Diamond Atelier. All Rights Reserved.';
        }
        if (!merged.brandName || merged.brandName.includes('Mayfair')) {
          merged.brandName = 'AURA DIAMOND ATELIER';
        }

        // Ensure columns is valid array
        if (!Array.isArray(merged.columns) || merged.columns.length === 0) {
          merged.columns = DEFAULT_FOOTER_STATE.columns;
        }

        if (!Array.isArray(merged.legalLinks) || merged.legalLinks.length === 0) {
          merged.legalLinks = DEFAULT_FOOTER_STATE.legalLinks;
        }

        setFooterSettings(merged);
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
      const cleanYoutube = (footerSettings.youtube || '').trim();
      const cleanWhatsapp = (footerSettings.whatsapp || '').trim();

      // Auto-sync contact details to matching column items
      const updatedColumns = (footerSettings.columns || []).map((col: any) => ({
        ...col,
        links: (col.links || []).map((link: any) => {
          if (footerSettings.phone && (link.url?.startsWith('tel:') || link.label?.toLowerCase().startsWith('phone:'))) {
            return { ...link, label: `Phone: ${footerSettings.phone}`, url: `tel:${footerSettings.phone}` };
          }
          if (footerSettings.email && (link.url?.startsWith('mailto:') || link.label?.toLowerCase().startsWith('email:'))) {
            return { ...link, label: `Email: ${footerSettings.email}`, url: `mailto:${footerSettings.email}` };
          }
          return link;
        })
      }));

      const payload = {
        ...footerSettings,
        columns: updatedColumns,
        instagram: cleanInstagram,
        facebook: cleanFacebook,
        pinterest: cleanPinterest,
        youtube: cleanYoutube,
        whatsapp: cleanWhatsapp,
        socialLinks: [
          ...(cleanInstagram ? [{ platform: 'Instagram', url: cleanInstagram }] : []),
          ...(cleanFacebook ? [{ platform: 'Facebook', url: cleanFacebook }] : []),
          ...(cleanPinterest ? [{ platform: 'Pinterest', url: cleanPinterest }] : []),
          ...(cleanYoutube ? [{ platform: 'YouTube', url: cleanYoutube }] : []),
          ...(cleanWhatsapp ? [{ platform: 'WhatsApp', url: cleanWhatsapp.startsWith('http') ? cleanWhatsapp : `https://wa.me/${cleanWhatsapp.replace(/[^0-9]/g, '')}` }] : []),
        ],
      };

      // Save both unified config and legacy keys for 100% storefront compatibility
      await api.updateSiteSetting('footer_settings', payload);
      await api.updateSiteSetting('footer_config', payload);
      await api.updateSiteSetting('contactEmail', footerSettings.email ?? '');
      await api.updateSiteSetting('contactPhone', footerSettings.phone ?? '');
      await api.updateSiteSetting('instagramUrl', cleanInstagram);
      await api.updateSiteSetting('facebookUrl', cleanFacebook);
      await api.updateSiteSetting('pinterestUrl', cleanPinterest);
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
      setSuccessMsg('✓ Full footer configuration saved to database successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save footer settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all footer columns, links, and text to standard atelier defaults?')) {
      setFooterSettings({ ...DEFAULT_FOOTER_STATE });
    }
  };

  // Column Manipulation Handlers
  const handleAddColumn = () => {
    const newCol = {
      title: 'NEW SECTION',
      links: [{ label: 'New Link', url: '/', isExternal: false }],
    };
    setFooterSettings((prev: any) => ({
      ...prev,
      columns: [...(prev.columns || []), newCol],
    }));
  };

  const handleDeleteColumn = (colIdx: number) => {
    setFooterSettings((prev: any) => ({
      ...prev,
      columns: (prev.columns || []).filter((_: any, i: number) => i !== colIdx),
    }));
  };

  const handleUpdateColumnTitle = (colIdx: number, newTitle: string) => {
    const updated = [...(footerSettings.columns || [])];
    updated[colIdx] = { ...updated[colIdx], title: newTitle };
    setFooterSettings({ ...footerSettings, columns: updated });
  };

  const handleAddLinkToColumn = (colIdx: number) => {
    const updated = [...(footerSettings.columns || [])];
    const currentLinks = updated[colIdx].links || [];
    updated[colIdx].links = [...currentLinks, { label: 'New Navigation Link', url: '/shop', isExternal: false }];
    setFooterSettings({ ...footerSettings, columns: updated });
  };

  const handleUpdateColumnLink = (colIdx: number, linkIdx: number, field: string, val: any) => {
    const updated = [...(footerSettings.columns || [])];
    const links = [...(updated[colIdx].links || [])];
    links[linkIdx] = { ...links[linkIdx], [field]: val };
    updated[colIdx].links = links;
    setFooterSettings({ ...footerSettings, columns: updated });
  };

  const handleDeleteColumnLink = (colIdx: number, linkIdx: number) => {
    const updated = [...(footerSettings.columns || [])];
    updated[colIdx].links = (updated[colIdx].links || []).filter((_: any, i: number) => i !== linkIdx);
    setFooterSettings({ ...footerSettings, columns: updated });
  };

  const handleMoveColumnLink = (colIdx: number, linkIdx: number, dir: 'up' | 'down') => {
    const updated = [...(footerSettings.columns || [])];
    const links = [...(updated[colIdx].links || [])];
    const targetIdx = dir === 'up' ? linkIdx - 1 : linkIdx + 1;
    if (targetIdx < 0 || targetIdx >= links.length) return;
    const temp = links[linkIdx];
    links[linkIdx] = links[targetIdx];
    links[targetIdx] = temp;
    updated[colIdx].links = links;
    setFooterSettings({ ...footerSettings, columns: updated });
  };

  // Legal Links Handlers
  const handleAddLegalLink = () => {
    setFooterSettings((prev: any) => ({
      ...prev,
      legalLinks: [...(prev.legalLinks || []), { label: 'Legal Notice', url: '/legal', isExternal: false }],
    }));
  };

  const handleUpdateLegalLink = (idx: number, field: string, val: any) => {
    const links = [...(footerSettings.legalLinks || [])];
    links[idx] = { ...links[idx], [field]: val };
    setFooterSettings({ ...footerSettings, legalLinks: links });
  };

  const handleDeleteLegalLink = (idx: number) => {
    setFooterSettings((prev: any) => ({
      ...prev,
      legalLinks: (prev.legalLinks || []).filter((_: any, i: number) => i !== idx),
    }));
  };

  return (
    <div>
      <StickyTopHeader>
        <div>
          <h1>Full-Page Footer Editor</h1>
          <div style={{ fontSize: '0.82rem', color: '#77736c' }}>
            Customize all footer columns, brand narrative, newsletter box, concierge info, social links, and legal notices.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <AdminButton $variant="secondary" onClick={handleResetDefaults} icon={<RotateCcw size={13} />}>
            Reset Defaults
          </AdminButton>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              padding: '9px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#55524d',
              background: '#fff',
              border: '1px solid #e8e3d9',
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Eye size={14} /> View Live Storefront
          </a>
          <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Check size={14} />}>
            Save Footer Settings
          </AdminButton>
        </div>
      </StickyTopHeader>

      {successMsg && (
        <div style={{ maxWidth: 1300, margin: '0 auto 20px', background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, fontWeight: 600 }}>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ maxWidth: 1300, margin: '0 auto 20px', background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <ContentCanvas>
        {/* TABS NAVIGATION */}
        <TabsNav>
          <TabButton $active={activeTab === 'brand'} onClick={() => setActiveTab('brand')}>
            🏛️ Brand & Identity
          </TabButton>
          <TabButton $active={activeTab === 'newsletter'} onClick={() => setActiveTab('newsletter')}>
            💌 Newsletter Section
          </TabButton>
          <TabButton $active={activeTab === 'columns'} onClick={() => setActiveTab('columns')}>
            📂 Navigation Columns ({footerSettings.columns?.length || 0})
          </TabButton>
          <TabButton $active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>
            📞 Concierge & Contact
          </TabButton>
          <TabButton $active={activeTab === 'social'} onClick={() => setActiveTab('social')}>
            🌐 Social Channels
          </TabButton>
          <TabButton $active={activeTab === 'legal'} onClick={() => setActiveTab('legal')}>
            📜 Bottom Bar & Legal
          </TabButton>
          <TabButton $active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>
            👁️ Visual Preview
          </TabButton>
        </TabsNav>

        {/* TAB 1: BRAND IDENTITY & LOGO */}
        {activeTab === 'brand' && (
          <AdminCard>
            <AdminCardHeader>
              <h3>1. BRAND NARRATIVE & LOGOS</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Brand Display Name</label>
                <AdminInput
                  type="text"
                  value={footerSettings.brandName || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, brandName: e.target.value })}
                  placeholder="AURA DIAMOND ATELIER"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Brand Tagline</label>
                <AdminInput
                  type="text"
                  value={footerSettings.tagline || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, tagline: e.target.value })}
                  placeholder="Fine Jewelry & Certified Solitaire Diamonds"
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGroup style={{ marginTop: 14 }}>
              <label>Brand Mission / Atelier Story Statement</label>
              <AdminTextarea
                rows={3}
                value={footerSettings.brandDescription || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, brandDescription: e.target.value })}
                placeholder="Aura Diamond Atelier crafts exquisite lab-grown and natural diamond jewelry..."
              />
            </AdminFormGroup>

            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <MediaUploader
                label="Footer Brand Logo Image"
                value={footerSettings.logoImage || ''}
                onChange={(url) => setFooterSettings({ ...footerSettings, logoImage: url })}
              />
              <MediaUploader
                label="Trust Badges & Certifications Image"
                value={footerSettings.trustBadgeImage || ''}
                onChange={(url) => setFooterSettings({ ...footerSettings, trustBadgeImage: url })}
              />
            </div>
          </AdminCard>
        )}

        {/* TAB 2: NEWSLETTER BOX */}
        {activeTab === 'newsletter' && (
          <AdminCard>
            <AdminCardHeader>
              <h3>2. NEWSLETTER SUBSCRIPTION BOX</h3>
            </AdminCardHeader>
            <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 16 }}>
              Configure the headline, subtitle, button text, and consent notice for the footer email newsletter form.
            </div>

            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Newsletter Heading</label>
                <AdminInput
                  type="text"
                  value={footerSettings.newsletterHeading || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, newsletterHeading: e.target.value })}
                  placeholder="JOIN AURA DIAMOND ATELIER"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Button Submit Label</label>
                <AdminInput
                  type="text"
                  value={footerSettings.newsletterButtonText || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, newsletterButtonText: e.target.value })}
                  placeholder="JOIN"
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGroup style={{ marginTop: 14 }}>
              <label>Newsletter Subtitle / Invitation Text</label>
              <AdminInput
                type="text"
                value={footerSettings.newsletterSubtitle || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, newsletterSubtitle: e.target.value })}
                placeholder="Subscribe to receive bespoke invitations and private collection releases."
              />
            </AdminFormGroup>

            <AdminFormGrid $columns={2} style={{ marginTop: 14 }}>
              <AdminFormGroup>
                <label>Email Input Placeholder</label>
                <AdminInput
                  type="text"
                  value={footerSettings.newsletterPlaceholder || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, newsletterPlaceholder: e.target.value })}
                  placeholder="Email Address"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Privacy Policy URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.newsletterPrivacyUrl || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, newsletterPrivacyUrl: e.target.value })}
                  placeholder="/privacy-policy"
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGroup style={{ marginTop: 14 }}>
              <label>Consent Notice & Legal Disclaimer</label>
              <AdminTextarea
                rows={2}
                value={footerSettings.newsletterConsentText || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, newsletterConsentText: e.target.value })}
                placeholder="I agree to receive promotional emails from Aura Diamond Atelier. You can unsubscribe at any time."
              />
            </AdminFormGroup>
          </AdminCard>
        )}

        {/* TAB 3: NAVIGATION COLUMNS */}
        {activeTab === 'columns' && (
          <AdminCard>
            <AdminCardHeader>
              <h3>3. FOOTER NAVIGATION COLUMNS</h3>
              <AdminButton $variant="gold" $size="sm" onClick={handleAddColumn} icon={<Plus size={13} />}>
                + Add Column
              </AdminButton>
            </AdminCardHeader>
            <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 18 }}>
              Manage column titles, link names, destinations, and display order. Changes reflect across all public pages.
            </div>

            {(footerSettings.columns || []).map((col: any, colIdx: number) => (
              <ColumnCard key={colIdx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#c9a45c', textTransform: 'uppercase' }}>
                      COLUMN #{colIdx + 1}:
                    </span>
                    <AdminInput
                      type="text"
                      value={col.title || ''}
                      onChange={(e) => handleUpdateColumnTitle(colIdx, e.target.value)}
                      placeholder="Column Title (e.g. THE HOUSE, COLLECTIONS)"
                      style={{ fontWeight: 700, maxWidth: 300 }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <AdminButton
                      $variant="secondary"
                      $size="sm"
                      onClick={() => handleAddLinkToColumn(colIdx)}
                      icon={<Plus size={12} />}
                    >
                      + Add Link
                    </AdminButton>
                    <AdminButton
                      $variant="danger"
                      $size="sm"
                      onClick={() => handleDeleteColumn(colIdx)}
                      icon={<Trash2 size={12} />}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(col.links || []).map((link: any, linkIdx: number) => (
                    <LinkItemRow key={linkIdx}>
                      <AdminInput
                        type="text"
                        value={link.label || ''}
                        onChange={(e) => handleUpdateColumnLink(colIdx, linkIdx, 'label', e.target.value)}
                        placeholder="Link Label (e.g. Diamond Rings)"
                      />
                      <AdminInput
                        type="text"
                        value={link.url || ''}
                        onChange={(e) => handleUpdateColumnLink(colIdx, linkIdx, 'url', e.target.value)}
                        placeholder="Destination URL (e.g. /rings)"
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', cursor: 'pointer', color: '#555' }}>
                        <input
                          type="checkbox"
                          checked={link.isExternal ?? false}
                          onChange={(e) => handleUpdateColumnLink(colIdx, linkIdx, 'isExternal', e.target.checked)}
                          style={{ accentColor: '#c9a45c' }}
                        />
                        New Tab
                      </label>
                      <button
                        type="button"
                        disabled={linkIdx === 0}
                        onClick={() => handleMoveColumnLink(colIdx, linkIdx, 'up')}
                        style={{ border: '1px solid #ddd', background: '#fff', borderRadius: 4, padding: 4, cursor: linkIdx === 0 ? 'not-allowed' : 'pointer' }}
                      >
                        <MoveUp size={12} />
                      </button>
                      <button
                        type="button"
                        disabled={linkIdx === (col.links || []).length - 1}
                        onClick={() => handleMoveColumnLink(colIdx, linkIdx, 'down')}
                        style={{ border: '1px solid #ddd', background: '#fff', borderRadius: 4, padding: 4, cursor: linkIdx === (col.links || []).length - 1 ? 'not-allowed' : 'pointer' }}
                      >
                        <MoveDown size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteColumnLink(colIdx, linkIdx)}
                        style={{ border: '1px solid #fca5a5', background: '#fff5f5', color: '#c53030', borderRadius: 4, padding: 4, cursor: 'pointer' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </LinkItemRow>
                  ))}
                  {(col.links || []).length === 0 && (
                    <div style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic', padding: 8 }}>
                      No links in this column. Click "+ Add Link" above.
                    </div>
                  )}
                </div>
              </ColumnCard>
            ))}
          </AdminCard>
        )}

        {/* TAB 4: CONTACT & CONCIERGE */}
        {activeTab === 'contact' && (
          <AdminCard>
            <AdminCardHeader>
              <h3>4. CONCIERGE & ATELIER CONTACT</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={3}>
              <AdminFormGroup>
                <label>Concierge Email</label>
                <AdminInput
                  type="email"
                  value={footerSettings.email || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, email: e.target.value })}
                  placeholder="contact@auroradiamonds.com"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Contact Phone</label>
                <AdminInput
                  type="text"
                  value={footerSettings.phone || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, phone: e.target.value })}
                  placeholder="+91973785306"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>WhatsApp Number</label>
                <AdminInput
                  type="text"
                  value={footerSettings.whatsapp || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, whatsapp: e.target.value })}
                  placeholder="+91973785306"
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={3} style={{ marginTop: 14 }}>
              <AdminFormGroup>
                <label>Atelier Physical Address</label>
                <AdminInput
                  type="text"
                  value={footerSettings.address || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, address: e.target.value })}
                  placeholder="Surat, India"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Atelier Working Hours</label>
                <AdminInput
                  type="text"
                  value={footerSettings.workingHours || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, workingHours: e.target.value })}
                  placeholder="Mon – Sat: 10:00 AM – 7:00 PM IST"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Book Appointment URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.appointmentUrl || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, appointmentUrl: e.target.value })}
                  placeholder="/contact-us"
                />
              </AdminFormGroup>
            </AdminFormGrid>
          </AdminCard>
        )}

        {/* TAB 5: SOCIAL MEDIA CHANNELS */}
        {activeTab === 'social' && (
          <AdminCard>
            <AdminCardHeader>
              <h3>5. SOCIAL MEDIA CHANNELS</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={3}>
              <AdminFormGroup>
                <label>Instagram URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.instagram || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, instagram: e.target.value })}
                  placeholder="https://www.instagram.com/auradiamondatelier"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Facebook URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.facebook || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, facebook: e.target.value })}
                  placeholder="https://facebook.com/auradiamondatelier"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Pinterest URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.pinterest || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, pinterest: e.target.value })}
                  placeholder="https://pinterest.com/auradiamondatelier"
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={3} style={{ marginTop: 14 }}>
              <AdminFormGroup>
                <label>YouTube URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.youtube || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, youtube: e.target.value })}
                  placeholder="https://youtube.com/@auradiamondatelier"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>TikTok URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.tiktok || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, tiktok: e.target.value })}
                  placeholder="https://tiktok.com/@auradiamondatelier"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>LinkedIn / Twitter URL</label>
                <AdminInput
                  type="text"
                  value={footerSettings.linkedin || ''}
                  onChange={(e) => setFooterSettings({ ...footerSettings, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/aura"
                />
              </AdminFormGroup>
            </AdminFormGrid>
          </AdminCard>
        )}

        {/* TAB 6: BOTTOM BAR & LEGAL */}
        {activeTab === 'legal' && (
          <AdminCard>
            <AdminCardHeader>
              <h3>6. BOTTOM BAR & LEGAL NOTICES</h3>
              <AdminButton $variant="gold" $size="sm" onClick={handleAddLegalLink} icon={<Plus size={13} />}>
                + Add Legal Link
              </AdminButton>
            </AdminCardHeader>

            <AdminFormGroup>
              <label>Copyright Statement</label>
              <AdminInput
                type="text"
                value={footerSettings.copyrightText || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, copyrightText: e.target.value })}
                placeholder="© 2026 Aura Diamond Atelier. All Rights Reserved."
              />
            </AdminFormGroup>

            <AdminFormGroup style={{ marginTop: 14 }}>
              <label>Accepted Payment Methods Label</label>
              <AdminInput
                type="text"
                value={footerSettings.paymentBadgesText || ''}
                onChange={(e) => setFooterSettings({ ...footerSettings, paymentBadgesText: e.target.value })}
                placeholder="Visa, Mastercard, American Express, Apple Pay, Google Pay, Wire Transfer"
              />
            </AdminFormGroup>

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: '#19202a', marginBottom: 10 }}>
                Bottom Bar Legal Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(footerSettings.legalLinks || []).map((link: any, lIdx: number) => (
                  <div key={lIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 120px 40px', gap: 10, alignItems: 'center' }}>
                    <AdminInput
                      type="text"
                      value={link.label || ''}
                      onChange={(e) => handleUpdateLegalLink(lIdx, 'label', e.target.value)}
                      placeholder="Label (e.g. Privacy Policy)"
                    />
                    <AdminInput
                      type="text"
                      value={link.url || ''}
                      onChange={(e) => handleUpdateLegalLink(lIdx, 'url', e.target.value)}
                      placeholder="URL (e.g. /privacy-policy)"
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', cursor: 'pointer', color: '#555' }}>
                      <input
                        type="checkbox"
                        checked={link.isExternal ?? false}
                        onChange={(e) => handleUpdateLegalLink(lIdx, 'isExternal', e.target.checked)}
                        style={{ accentColor: '#c9a45c' }}
                      />
                      New Tab
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDeleteLegalLink(lIdx)}
                      style={{ border: '1px solid #fca5a5', background: '#fff5f5', color: '#c53030', borderRadius: 4, padding: 6, cursor: 'pointer' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        )}

        {/* TAB 7: VISUAL PREVIEW */}
        {activeTab === 'preview' && (
          <AdminCard>
            <AdminCardHeader>
              <h3>7. STOREFRONT FOOTER PREVIEW</h3>
              <span style={{ fontSize: '0.78rem', color: '#8c7647' }}>Real-time preview of how customers see your footer</span>
            </AdminCardHeader>

            <LivePreviewCard>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 36 }}>
                {(footerSettings.columns || []).map((col: any, idx: number) => (
                  <div key={idx}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1f1f1f', marginBottom: 14 }}>
                      {col.title || `COLUMN ${idx + 1}`}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(col.links || []).map((lnk: any, lIdx: number) => (
                        <span key={lIdx} style={{ fontSize: 13, color: '#6e6b65' }}>
                          {lnk.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Newsletter preview */}
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1f1f1f', marginBottom: 10 }}>
                    {footerSettings.newsletterHeading || 'JOIN AURA DIAMOND ATELIER'}
                  </div>
                  <p style={{ fontSize: 13, color: '#6e6b65', marginBottom: 14 }}>
                    {footerSettings.newsletterSubtitle}
                  </p>
                  <div style={{ display: 'flex', borderBottom: '1.5px solid #1f1f1f', paddingBottom: 6, marginBottom: 10 }}>
                    <input
                      type="text"
                      placeholder={footerSettings.newsletterPlaceholder || 'Email Address'}
                      disabled
                      style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 13, outline: 'none' }}
                    />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1f1f1f' }}>{footerSettings.newsletterButtonText || 'JOIN'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom bar preview */}
              <div style={{ borderTop: '1px solid #e6e1d7', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#77736c', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: '1.1rem', color: '#1f1f1f' }}>
                    {footerSettings.brandName}
                  </span>
                  <span>{footerSettings.copyrightText}</span>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  {(footerSettings.legalLinks || []).map((l: any, i: number) => (
                    <span key={i}>{l.label}</span>
                  ))}
                </div>
              </div>
            </LivePreviewCard>
          </AdminCard>
        )}
      </ContentCanvas>
    </div>
  );
};
