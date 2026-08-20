import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeft,
  Check,
  Eye,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Layers,
  Sliders,
  Type,
  Layout,
  Palette,
  Image as ImageIcon,
} from 'lucide-react';
import { api } from '../../services/api';
import { PRIVATE_ADMIN_PATH } from '../../App';
import { MediaUploader } from '../../components/admin/MediaUploader';
import {
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
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

  .title-area {
    display: flex;
    align-items: center;
    gap: 16px;

    a.back-btn {
      color: #666;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;

      &:hover {
        color: #19202a;
      }
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.8rem;
      color: #1f1f1f;
      margin: 0;
    }
  }

  .action-area {
    display: flex;
    gap: 12px;
  }
`;

const CanvasWrapper = styled.div`
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

export const AdminSectionEditorPage: React.FC = () => {
  const { slug = 'home', sectionId } = useParams<{ slug?: string; sectionId?: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pageData, setPageData] = useState<any>(null);
  const [sectionData, setSectionData] = useState<any>({
    id: sectionId || 'sec_hero',
    type: 'HERO',
    title: 'Hero Section',
    isVisible: true,
    content: {
      eyebrow: 'Handcrafted Fine Jewelry',
      title: 'Handcrafted Elegance & Exceptional Diamonds',
      description: 'Discover certified solitaire rings and bespoke diamond creations crafted in Surat, India.',
      primaryBtnText: 'Explore Collection',
      primaryBtnLink: '/rings',
      secondaryBtnText: 'Discover Diamonds',
      secondaryBtnLink: '/diamonds',
      desktopImage: '/assets/floksy_hero_luxury.png',
      tabletImage: '/assets/floksy_hero_luxury.png',
      useDesktopTablet: true,
      mobileImage: '/assets/floksy_hero_luxury.png',
      useDesktopMobile: true,
      alignment: 'center',
      overlayOpacity: 0.2,
      textColor: '#ffffff',
    },
  });

  useEffect(() => {
    loadSection();
  }, [slug, sectionId]);

  const loadSection = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/v1/admin/cms/pages/${slug}`);
      const page = res.data;
      setPageData(page);

      if (page && page.sections) {
        const found = page.sections.find((s: any) => String(s.id) === String(sectionId) || String(s.blockType).toLowerCase() === String(sectionId).toLowerCase());
        if (found) {
          const parsedContent = typeof found.content === 'string' ? JSON.parse(found.content) : found.content || {};
          setSectionData({
            id: found.id,
            type: found.blockType || 'SECTION',
            title: found.title || found.blockType,
            isVisible: found.isVisible ?? true,
            content: parsedContent,
          });
        }
      }
    } catch (err) {
      console.error('Failed to load page section:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (field: string, value: any) => {
    setSectionData((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');

      const updatedSections = (pageData?.sections || []).map((s: any) => {
        if (String(s.id) === String(sectionData.id) || String(s.blockType).toLowerCase() === String(sectionData.type).toLowerCase()) {
          return {
            ...s,
            content: JSON.stringify(sectionData.content),
            isVisible: sectionData.isVisible,
          };
        }
        return s;
      });

      const payload = {
        title: pageData?.title || 'Homepage',
        draftContent: pageData?.draftContent,
        sections: updatedSections,
      };

      if (publish) {
        await api.post(`/api/v1/admin/cms/pages/${slug}/publish`, payload);
        setSuccessMsg('Section content saved & published to storefront live site!');
      } else {
        await api.post(`/api/v1/admin/cms/pages/${slug}/draft`, payload);
        setSuccessMsg('Section draft saved successfully!');
      }

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to save section.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#77736c' }}>
        <RefreshCw size={24} className="spin" /> Loading section editor...
      </div>
    );
  }

  const sType = String(sectionData.type || 'HERO').toUpperCase();
  const c = sectionData.content || {};

  return (
    <div>
      {/* STICKY TOP HEADER */}
      <StickyTopHeader>
        <div className="title-area">
          <Link to={`${PRIVATE_ADMIN_PATH}/cms/page-builder`} className="back-btn">
            <ArrowLeft size={16} /> Back to Page Builder
          </Link>
          <h1>Edit {sectionData.title || sType} Section — Homepage / {sType}</h1>
        </div>
        <div className="action-area">
          <AdminButton $variant="secondary" onClick={() => window.open('/', '_blank')} icon={<Eye size={14} />}>
            Live Preview
          </AdminButton>
          <AdminButton $variant="secondary" onClick={() => handleSave(false)} $loading={saving} icon={<Save size={14} />}>
            Save Draft
          </AdminButton>
          <AdminButton $variant="gold" onClick={() => handleSave(true)} $loading={saving} icon={<Check size={14} />}>
            Save & Publish
          </AdminButton>
        </div>
      </StickyTopHeader>

      {successMsg && (
        <div style={{ maxWidth: 1200, margin: '0 auto 20px', background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
            <Check size={18} /> {successMsg}
          </div>
          <AdminButton $size="sm" $variant="secondary" onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/cms/page-builder`)}>
            Return to Page Builder
          </AdminButton>
        </div>
      )}

      {errorMsg && (
        <div style={{ maxWidth: 1200, margin: '0 auto 20px', background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <CanvasWrapper>
        {/* HERO EDITOR */}
        {(sType === 'HERO' || sType.includes('HERO')) && (
          <>
            <AdminCard>
              <AdminCardHeader>
                <h3>1. HERO CONTENT & TEXT</h3>
              </AdminCardHeader>
              <ToggleRow style={{ marginBottom: 16 }}>
                <span className="label">Section Enabled / Visible on Storefront</span>
                <input
                  type="checkbox"
                  checked={sectionData.isVisible}
                  onChange={(e) => setSectionData((prev: any) => ({ ...prev, isVisible: e.target.checked }))}
                />
              </ToggleRow>

              <AdminFormGrid $columns={1}>
                <AdminFormGroup>
                  <label>Eyebrow Tagline</label>
                  <AdminInput
                    type="text"
                    value={c.eyebrow || ''}
                    onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                    placeholder="e.g. The Signature Collection 2026"
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label>Main Headline</label>
                  <AdminInput
                    type="text"
                    value={c.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    placeholder="e.g. Handcrafted Elegance & Exceptional Diamonds"
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label>Description Paragraph</label>
                  <AdminTextarea
                    rows={3}
                    value={c.description || ''}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    placeholder="Brief hero narrative introducing your atelier creations..."
                  />
                </AdminFormGroup>
              </AdminFormGrid>
            </AdminCard>

            <AdminCard>
              <AdminCardHeader>
                <h3>2. CALL TO ACTION (CTA) BUTTONS</h3>
              </AdminCardHeader>
              <AdminFormGrid $columns={2}>
                <AdminFormGroup>
                  <label>Primary Button Label</label>
                  <AdminInput
                    type="text"
                    value={c.primaryBtnText || ''}
                    onChange={(e) => handleContentChange('primaryBtnText', e.target.value)}
                    placeholder="e.g. Explore Collection"
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label>Primary Button Target Link</label>
                  <AdminInput
                    type="text"
                    value={c.primaryBtnLink || ''}
                    onChange={(e) => handleContentChange('primaryBtnLink', e.target.value)}
                    placeholder="e.g. /rings"
                  />
                </AdminFormGroup>
              </AdminFormGrid>

              <AdminFormGrid $columns={2}>
                <AdminFormGroup>
                  <label>Secondary Button Label</label>
                  <AdminInput
                    type="text"
                    value={c.secondaryBtnText || ''}
                    onChange={(e) => handleContentChange('secondaryBtnText', e.target.value)}
                    placeholder="e.g. Discover Diamonds"
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label>Secondary Button Target Link</label>
                  <AdminInput
                    type="text"
                    value={c.secondaryBtnLink || ''}
                    onChange={(e) => handleContentChange('secondaryBtnLink', e.target.value)}
                    placeholder="e.g. /diamonds"
                  />
                </AdminFormGroup>
              </AdminFormGrid>
            </AdminCard>

            <AdminCard>
              <AdminCardHeader>
                <h3>3. RESPONSIVE HERO IMAGES (NO RAW URL INPUTS)</h3>
              </AdminCardHeader>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <MediaUploader
                  label="Desktop Hero Image"
                  value={c.desktopImage || ''}
                  onChange={(url) => handleContentChange('desktopImage', url)}
                  helpText="Recommended: 2800x1200 high-res WEBP or JPG"
                />

                <MediaUploader
                  label="Tablet Hero Image"
                  value={c.tabletImage || ''}
                  onChange={(url) => handleContentChange('tabletImage', url)}
                  allowDesktopToggle
                  useDesktop={c.useDesktopTablet ?? true}
                  onToggleDesktop={(val) => handleContentChange('useDesktopTablet', val)}
                  desktopValue={c.desktopImage}
                  helpText="Recommended: 1536x1024 high-res WEBP"
                />

                <MediaUploader
                  label="Mobile Hero Image"
                  value={c.mobileImage || ''}
                  onChange={(url) => handleContentChange('mobileImage', url)}
                  allowDesktopToggle
                  useDesktop={c.useDesktopMobile ?? true}
                  onToggleDesktop={(val) => handleContentChange('useDesktopMobile', val)}
                  desktopValue={c.desktopImage}
                  helpText="Recommended: 800x1200 portrait WEBP"
                />
              </div>
            </AdminCard>
          </>
        )}

        {/* FEATURED COLLECTIONS EDITOR */}
        {(sType.includes('COLLECTION') || sType.includes('FEATURED')) && (
          <AdminCard>
            <AdminCardHeader>
              <h3>FEATURED COLLECTIONS CONFIGURATION</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Section Title</label>
                <AdminInput
                  type="text"
                  value={c.title || 'Featured Collections'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Section Subtitle</label>
                <AdminInput
                  type="text"
                  value={c.subtitle || 'Handcrafted Luxury Jewelry'}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <div style={{ marginTop: 20 }}>
              <MediaUploader
                label="Collection Highlight Image"
                value={c.image || ''}
                onChange={(url) => handleContentChange('image', url)}
              />
            </div>
          </AdminCard>
        )}

        {/* CRAFTSMANSHIP EDITOR */}
        {sType.includes('CRAFT') && (
          <AdminCard>
            <AdminCardHeader>
              <h3>CRAFTSMANSHIP & ATELIER STORY</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={1}>
              <AdminFormGroup>
                <label>Heading</label>
                <AdminInput
                  type="text"
                  value={c.title || 'The Art of Fine Jewelry'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Craftsmanship Story Narrative</label>
                <AdminTextarea
                  rows={4}
                  value={c.description || ''}
                  onChange={(e) => handleContentChange('description', e.target.value)}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <MediaUploader
              label="Atelier Craftsmanship Image"
              value={c.image || '/assets/floksy_craftsmanship.jpg'}
              onChange={(url) => handleContentChange('image', url)}
            />
          </AdminCard>
        )}

        {/* TESTIMONIALS EDITOR */}
        {sType.includes('TESTIMONIAL') && (
          <AdminCard>
            <AdminCardHeader>
              <h3>CLIENT EXPERIENCES & TESTIMONIALS</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Section Heading</label>
                <AdminInput
                  type="text"
                  value={c.title || 'Client Experiences'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Subtitle</label>
                <AdminInput
                  type="text"
                  value={c.subtitle || 'Over 1,800 Verified 5-Star Reviews'}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                />
              </AdminFormGroup>
            </AdminFormGrid>
          </AdminCard>
        )}

        {/* LAYOUT & STYLE CARD FOR ALL SECTIONS */}
        <AdminCard>
          <AdminCardHeader>
            <h3>SECTION LAYOUT & STYLING OVERRIDES</h3>
          </AdminCardHeader>
          <AdminFormGrid $columns={3}>
            <AdminFormGroup>
              <label>Content Alignment</label>
              <AdminSelect
                value={c.alignment || 'center'}
                onChange={(e) => handleContentChange('alignment', e.target.value)}
              >
                <option value="left">Left Aligned</option>
                <option value="center">Center Aligned</option>
                <option value="right">Right Aligned</option>
              </AdminSelect>
            </AdminFormGroup>
            <AdminFormGroup>
              <label>Dark Overlay Opacity</label>
              <AdminSelect
                value={c.overlayOpacity ?? 0.2}
                onChange={(e) => handleContentChange('overlayOpacity', parseFloat(e.target.value))}
              >
                <option value={0}>0% (No Overlay)</option>
                <option value={0.15}>15% Subtle Dark</option>
                <option value={0.3}>30% Medium Dark</option>
                <option value={0.5}>50% Strong Dark</option>
              </AdminSelect>
            </AdminFormGroup>
            <AdminFormGroup>
              <label>Text Contrast Color</label>
              <AdminSelect
                value={c.textColor || '#ffffff'}
                onChange={(e) => handleContentChange('textColor', e.target.value)}
              >
                <option value="#ffffff">White (#ffffff)</option>
                <option value="#1f1f1f">Dark Charcoal (#1f1f1f)</option>
                <option value="#c9a45c">Champagne Gold (#c9a45c)</option>
              </AdminSelect>
            </AdminFormGroup>
          </AdminFormGrid>
        </AdminCard>
      </CanvasWrapper>
    </div>
  );
};
