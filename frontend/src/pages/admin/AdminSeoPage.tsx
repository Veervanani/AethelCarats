import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Save, Plus, Globe, Check, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { MediaUploader } from '../../components/admin/MediaUploader';
import {
  AdminCard,
  AdminCardHeader,
  AdminFormGroup,
  AdminInput,
  AdminTextarea,
  AdminButton,
  AdminTableContainer,
  AdminTable,
  AdminBadge,
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

export const AdminSeoPage: React.FC = () => {
  const [seo, setSeo] = useState<any>({
    seoTitle: 'FLOKSY JEWEL | High Jewellery & Natural Diamond Vault',
    metaDescription: 'Discover Floksy Jewel bespoke fine jewellery collections and certified loose diamonds in The Diamond Vault.',
    canonicalUrl: 'https://floksyjewel.com',
    ogTitle: 'FLOKSY JEWEL | Fine Jewellery Atelier',
    ogDescription: 'Certified natural & lab-grown diamonds, engagement rings.',
    ogImage: '/assets/floksy_hero_luxury.png',
    twitterTitle: 'FLOKSY JEWEL | Luxury Fine Jewelry',
    twitterDescription: 'Certified natural & lab-grown diamonds, engagement rings.',
    twitterImage: '/assets/floksy_hero_luxury.png',
  });

  const [tracking, setTracking] = useState<any>({
    enable_google_analytics: 'true',
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

  const [redirects, setRedirects] = useState<any[]>([
    { id: '1', oldUrl: '/old-ring-collection', newUrl: '/rings', statusCode: 301 },
    { id: '2', oldUrl: '/solitaire-guide', newUrl: '/education/rings/find-your-ring-size', statusCode: 301 },
  ]);
  const [oldUrl, setOldUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [savingSeo, setSavingSeo] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadSeo();
  }, []);

  const loadSeo = async () => {
    try {
      const data = await api.getSeoMetadata({ pageSlug: 'home' });
      if (data) setSeo((prev: any) => ({ ...prev, ...data }));

      const siteSettings = await api.getSiteSettings().catch(() => ({}));
      if (siteSettings && typeof siteSettings === 'object') {
        setTracking((prev: any) => ({
          ...prev,
          enable_google_analytics: siteSettings.enable_google_analytics ?? 'true',
          enable_ecommerce_tracking: siteSettings.enable_ecommerce_tracking ?? 'true',
          google_analytics_id: siteSettings.google_analytics_id || 'G-4819ZT1SH9',
          google_tag_ids: siteSettings.google_tag_ids || 'G-4819ZT1SH9, G-XXY9NETZMZ, GT-NFXXGC34, GT-WPL2TXJW, GT-NSVC87ZS',
          google_merchant_center_id: siteSettings.google_merchant_center_id || 'MC-FZJ1P4XPW8, MC-V2Y54WKJL7',
          google_tag_manager_id: siteSettings.google_tag_manager_id || 'GT-NFXXGC34',
          google_ads_conversion_id: siteSettings.google_ads_conversion_id || '',
          facebook_pixel_id: siteSettings.facebook_pixel_id || '',
          custom_head_scripts: siteSettings.custom_head_scripts || '',
          custom_body_scripts: siteSettings.custom_body_scripts || '',
        }));
      }
    } catch (err) {
      console.error('Failed to load SEO metadata:', err);
    }
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingSeo(true);
      setSuccessMsg('');
      setErrorMsg('');
      await api.updateSeoMetadata(seo);
      await api.updateSiteSettings(tracking);
      setSuccessMsg('Global SEO, Google Analytics & Tracking settings saved successfully to database!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update SEO and tracking settings.');
    } finally {
      setSavingSeo(false);
    }
  };

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldUrl || !newUrl) return;
    const newRed = { id: `red_${Date.now()}`, oldUrl, newUrl, statusCode: 301 };
    setRedirects([...redirects, newRed]);
    setOldUrl('');
    setNewUrl('');
  };

  return (
    <div>
      <StickyTopHeader>
        <div>
          <h1>SEO & Redirects Full-Page Manager</h1>
          <div style={{ fontSize: '0.82rem', color: '#77736c' }}>Search Engine Optimization, Open Graph social share cards, and 301 URL redirects</div>
        </div>
        <AdminButton $variant="gold" onClick={handleSaveSeo} $loading={savingSeo} icon={<Check size={14} />}>
          Save SEO Settings
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
        {/* GLOBAL SEARCH ENGINE OPTIMIZATION CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>1. GLOBAL SEARCH ENGINE OPTIMIZATION (SEO)</h3>
          </AdminCardHeader>
          <AdminFormGroup>
            <label>Global Default Page Title</label>
            <AdminInput
              type="text"
              value={seo.seoTitle || ''}
              onChange={(e) => setSeo({ ...seo, seoTitle: e.target.value })}
              placeholder="FLOKSY JEWEL | High Jewellery & Natural Diamond Vault"
            />
          </AdminFormGroup>
          <AdminFormGroup style={{ marginTop: 16 }}>
            <label>Global Meta Description</label>
            <AdminTextarea
              rows={3}
              value={seo.metaDescription || ''}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              placeholder="Detailed description shown in Google search snippets..."
            />
          </AdminFormGroup>
          <AdminFormGroup style={{ marginTop: 16 }}>
            <label>Canonical Base URL</label>
            <AdminInput
              type="text"
              value={seo.canonicalUrl || ''}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              placeholder="https://floksyjewel.com"
            />
          </AdminFormGroup>
        </AdminCard>

        {/* OPEN GRAPH SOCIAL CARDS CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>2. OPEN GRAPH & SOCIAL PREVIEW CARDS (NO MANUAL URL INPUTS)</h3>
          </AdminCardHeader>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <AdminFormGroup>
                <label>Open Graph (Facebook / LinkedIn) Title</label>
                <AdminInput
                  type="text"
                  value={seo.ogTitle || ''}
                  onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
                />
              </AdminFormGroup>
              <AdminFormGroup style={{ marginTop: 14 }}>
                <label>Open Graph Description</label>
                <AdminTextarea
                  rows={3}
                  value={seo.ogDescription || ''}
                  onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
                />
              </AdminFormGroup>
            </div>
            <div>
              <MediaUploader
                label="Open Graph (OG) Share Image"
                value={seo.ogImage || ''}
                onChange={(url) => setSeo({ ...seo, ogImage: url })}
                helpText="Recommended: 1200x630 pixels WEBP or JPG"
              />
            </div>
          </div>
        </AdminCard>

        {/* GOOGLE ANALYTICS & GOOGLE TAG INTEGRATION CARD */}
        <AdminCard style={{ border: '1px solid #c9a45c' }}>
          <AdminCardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>3. GOOGLE TAG & GOOGLE ANALYTICS (GA4) INTEGRATION</h3>
            <span style={{ fontSize: '0.78rem', background: '#e6f4ea', color: '#137333', padding: '4px 10px', borderRadius: 20, fontWeight: 600, border: '1px solid #ceead6' }}>
              ✓ Active GA4 & Google Tag
            </span>
          </AdminCardHeader>

          <div style={{ background: '#f8f9fa', border: '1px solid #e9ecef', padding: '12px 16px', borderRadius: 6, marginBottom: 18, fontSize: '0.84rem' }}>
            <strong>Active Destinations: </strong>
            <code style={{ background: '#e8f0fe', color: '#1a73e8', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>{tracking.google_analytics_id || 'G-4819ZT1SH9'}</code>
            {tracking.google_tag_ids && <span style={{ marginLeft: 8, color: '#6c757d' }}>({tracking.google_tag_ids})</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <AdminFormGroup>
              <label>Primary GA4 Measurement ID</label>
              <AdminInput
                type="text"
                value={tracking.google_analytics_id || ''}
                onChange={(e) => setTracking({ ...tracking, google_analytics_id: e.target.value })}
                placeholder="G-4819ZT1SH9"
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <label>Google Tag Manager ID (GTM / GT)</label>
              <AdminInput
                type="text"
                value={tracking.google_tag_manager_id || ''}
                onChange={(e) => setTracking({ ...tracking, google_tag_manager_id: e.target.value })}
                placeholder="GT-NFXXGC34"
              />
            </AdminFormGroup>

            <AdminFormGroup style={{ gridColumn: 'span 2' }}>
              <label>All Google Tag IDs (gtag.js Destinations)</label>
              <AdminInput
                type="text"
                value={tracking.google_tag_ids || ''}
                onChange={(e) => setTracking({ ...tracking, google_tag_ids: e.target.value })}
                placeholder="G-4819ZT1SH9, G-XXY9NETZMZ, GT-NFXXGC34, GT-WPL2TXJW, GT-NSVC87ZS"
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <label>Google Merchant Center IDs</label>
              <AdminInput
                type="text"
                value={tracking.google_merchant_center_id || ''}
                onChange={(e) => setTracking({ ...tracking, google_merchant_center_id: e.target.value })}
                placeholder="MC-FZJ1P4XPW8, MC-V2Y54WKJL7"
              />
            </AdminFormGroup>

            <AdminFormGroup>
              <label>Facebook / Meta Pixel ID</label>
              <AdminInput
                type="text"
                value={tracking.facebook_pixel_id || ''}
                onChange={(e) => setTracking({ ...tracking, facebook_pixel_id: e.target.value })}
                placeholder="e.g. 123456789012345"
              />
            </AdminFormGroup>

            <AdminFormGroup style={{ gridColumn: 'span 2' }}>
              <label>Custom Header Verification & Tracking Scripts (&lt;head&gt;)</label>
              <AdminTextarea
                rows={3}
                value={tracking.custom_head_scripts || ''}
                onChange={(e) => setTracking({ ...tracking, custom_head_scripts: e.target.value })}
                placeholder="<!-- Paste Google Site Verification or tracking script tags here -->"
              />
            </AdminFormGroup>
          </div>
        </AdminCard>

        {/* URL REDIRECTS TABLE CARD */}
        <AdminCard>
          <AdminCardHeader>
            <h3>4. 301 PERMANENT URL REDIRECTS</h3>
          </AdminCardHeader>

          <form onSubmit={handleAddRedirect} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <AdminInput
              type="text"
              placeholder="Old URL Path (e.g. /old-ring-collection)"
              value={oldUrl}
              onChange={(e) => setOldUrl(e.target.value)}
              style={{ flex: 1 }}
            />
            <AdminInput
              type="text"
              placeholder="New Target URL (e.g. /rings)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              style={{ flex: 1 }}
            />
            <AdminButton type="submit" $variant="gold" icon={<Plus size={14} />}>
              + Add Redirect
            </AdminButton>
          </form>

          <AdminTableContainer>
            <AdminTable>
              <thead>
                <tr>
                  <th>Old URL Path</th>
                  <th>New Target Path</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {redirects.map((r, idx) => (
                  <tr key={r.id || idx}>
                    <td><code>{r.oldUrl}</code></td>
                    <td><code>{r.newUrl}</code></td>
                    <td><AdminBadge $variant="published">301 Permanent</AdminBadge></td>
                    <td style={{ textAlign: 'right' }}>
                      <AdminButton
                        $size="sm"
                        $variant="danger"
                        onClick={() => setRedirects(redirects.filter((_: any, i: number) => i !== idx))}
                        icon={<Trash2 size={13} />}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </AdminTable>
          </AdminTableContainer>
        </AdminCard>
      </ContentCanvas>
    </div>
  );
};
