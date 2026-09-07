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
  AdminColorPicker,
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
  const DEFAULT_SECTION_TEMPLATES: Record<string, { type: string; title: string; content: any }> = {
    hero: {
      type: 'HERO',
      title: 'Hero Banner Section',
      content: {
        eyebrow: 'Handcrafted Fine Jewelry',
        eyebrowColor: '#c9a45c',
        title: 'Handcrafted Elegance & Exceptional Diamonds',
        titleColor: '#ffffff',
        description: 'Discover certified solitaire rings and bespoke diamond creations crafted in Surat, India.',
        descriptionColor: '#f5f1e8',
        primaryBtnText: 'Explore Collection',
        primaryBtnTextColor: '#101418',
        primaryBtnLink: '/rings',
        secondaryBtnText: 'Discover Diamonds',
        secondaryBtnTextColor: '#ffffff',
        secondaryBtnLink: '/diamonds',
        desktopImage: '/assets/gem_hero_luxury.png',
        tabletImage: '/assets/gem_hero_luxury.png',
        useDesktopTablet: true,
        mobileImage: '/assets/gem_hero_luxury.png',
        useDesktopMobile: true,
        alignment: 'center',
        overlayOpacity: 0.2,
        textColor: '#ffffff',
      },
    },
    featured_collections: {
      type: 'FEATURED_COLLECTIONS',
      title: 'Featured Collections',
      content: {
        eyebrow: 'CURATED ATELIER EDIT',
        eyebrowColor: '#c9a45c',
        title: 'Featured Collections',
        titleColor: '#1f1f1f',
        subtitle: 'Handcrafted Luxury Jewelry',
        subtitleColor: '#77736c',
        description: 'Explore signature bridal, solitaire engagement, and fine diamond suites.',
        descriptionColor: '#55514b',
        primaryBtnText: 'View All Collections',
        primaryBtnTextColor: '#101418',
        primaryBtnLink: '/collections',
        image: '/assets/gem_rings_cat.png',
        textColor: '#1f1f1f',
      },
    },
    campaign_banner: {
      type: 'CAMPAIGN_BANNER',
      title: 'Signature Campaign Banner',
      content: {
        eyebrow: 'THE ATELIER VISION',
        eyebrowColor: '#c9a45c',
        title: 'A NEW EXPRESSION OF FINE JEWELLERY',
        titleColor: '#1f1f1f',
        description: 'Designed with intention. Crafted with precision. Made to be treasured for generations.',
        descriptionColor: '#444444',
        primaryBtnText: 'EXPLORE THE COLLECTION',
        primaryBtnTextColor: '#fffdf9',
        primaryBtnLink: '/collections/signature-collection',
        image: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp',
        textColor: '#1f1f1f',
      },
    },
    diamond_shapes: {
      type: 'DIAMOND_SHAPES',
      title: 'Explore Diamond Shapes',
      content: {
        eyebrow: 'AUTHENTICATED LOOSE DIAMONDS',
        eyebrowColor: '#c9a45c',
        title: 'Exceptional Cut & Clarity',
        titleColor: '#1f1f1f',
        description: 'Select your ideal cut from certified GIA & IGI diamonds, ethically sourced and precision-cut for maximum fire and brilliance.',
        descriptionColor: '#77736c',
        primaryBtnText: 'DISCOVER ALL SHAPES',
        primaryBtnTextColor: '#ffffff',
        primaryBtnLink: '/diamonds',
        textColor: '#1f1f1f',
      },
    },
    craftsmanship: {
      type: 'CRAFTSMANSHIP',
      title: 'Atelier Craftsmanship',
      content: {
        eyebrow: 'SURAT HERITAGE',
        eyebrowColor: '#c9a45c',
        title: 'The Art of Fine Jewelry',
        titleColor: '#1f1f1f',
        description: 'Every diamond is hand-selected and precisely set in our Gujarat atelier by fourth-generation artisans dedicated to perfection.',
        descriptionColor: '#55514b',
        primaryBtnText: 'OUR CRAFT STORY',
        primaryBtnTextColor: '#ffffff',
        primaryBtnLink: '/about-us',
        image: '/assets/gem_craftsmanship.jpg',
        textColor: '#1f1f1f',
      },
    },
    testimonials: {
      type: 'TESTIMONIALS',
      title: 'Client Experiences',
      content: {
        eyebrow: 'CLIENT PRAISE',
        eyebrowColor: '#c9a45c',
        title: 'Client Experiences',
        titleColor: '#1f1f1f',
        subtitle: 'Over 1,800 Verified 5-Star Reviews',
        subtitleColor: '#77736c',
        description: 'Read genuine reviews from clients who chose Aura Diamond Atelier for life’s most significant moments.',
        descriptionColor: '#55514b',
        quoteTextColor: '#444444',
        authorTextColor: '#1f1f1f',
        textColor: '#1f1f1f',
      },
    },
    custom: {
      type: 'CUSTOM',
      title: 'Custom Section',
      content: {
        eyebrow: 'SPECIAL HIGHLIGHT',
        eyebrowColor: '#c9a45c',
        title: 'Custom Atelier Section',
        titleColor: '#1f1f1f',
        subtitle: 'Section Subtitle',
        subtitleColor: '#77736c',
        description: 'Custom section narrative and details.',
        descriptionColor: '#55514b',
        primaryBtnText: 'Learn More',
        primaryBtnTextColor: '#ffffff',
        primaryBtnLink: '/about-us',
        bodyTextColor: '#1f1f1f',
        textColor: '#1f1f1f',
      },
    },
  };

  const getTemplateForSectionId = (secId?: string) => {
    const key = String(secId || '').toLowerCase();
    if (key.includes('collection')) return DEFAULT_SECTION_TEMPLATES.featured_collections;
    if (key.includes('campaign') || key.includes('banner')) return DEFAULT_SECTION_TEMPLATES.campaign_banner;
    if (key.includes('diamond') || key.includes('shape')) return DEFAULT_SECTION_TEMPLATES.diamond_shapes;
    if (key.includes('craft')) return DEFAULT_SECTION_TEMPLATES.craftsmanship;
    if (key.includes('testimonial')) return DEFAULT_SECTION_TEMPLATES.testimonials;
    if (key.includes('hero')) return DEFAULT_SECTION_TEMPLATES.hero;
    return DEFAULT_SECTION_TEMPLATES.custom;
  };

  const initialTpl = getTemplateForSectionId(sectionId);
  const [sectionData, setSectionData] = useState<any>({
    id: sectionId || 'sec_hero',
    type: initialTpl.type,
    title: initialTpl.title,
    isVisible: true,
    content: initialTpl.content,
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

      if (page && page.sections && page.sections.length > 0) {
        const found = page.sections.find(
          (s: any) =>
            String(s.id) === String(sectionId) ||
            String(s.blockType).toLowerCase() === String(sectionId).toLowerCase() ||
            (sectionId?.toLowerCase().includes('collection') && String(s.blockType).toLowerCase().includes('collection')) ||
            (sectionId?.toLowerCase().includes('campaign') && String(s.blockType).toLowerCase().includes('campaign')) ||
            (sectionId?.toLowerCase().includes('diamond') && String(s.blockType).toLowerCase().includes('diamond')) ||
            (sectionId?.toLowerCase().includes('craft') && String(s.blockType).toLowerCase().includes('craft')) ||
            (sectionId?.toLowerCase().includes('testimonial') && String(s.blockType).toLowerCase().includes('testimonial')) ||
            (sectionId?.toLowerCase().includes('hero') && String(s.blockType).toLowerCase().includes('hero'))
        );

        if (found) {
          const parsedContent = typeof found.content === 'string' ? JSON.parse(found.content) : found.content || {};
          const fallbackTpl = getTemplateForSectionId(found.blockType || sectionId);
          setSectionData({
            id: found.id,
            type: found.blockType || fallbackTpl.type,
            title: found.title || fallbackTpl.title,
            isVisible: found.isVisible ?? true,
            content: { ...fallbackTpl.content, ...parsedContent },
          });
          return;
        }
      }

      // If not yet in page.sections, deduce from sectionId
      const template = getTemplateForSectionId(sectionId);
      setSectionData({
        id: sectionId || `sec_${Date.now()}`,
        type: template.type,
        title: template.title,
        isVisible: true,
        content: template.content,
      });
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

      let updatedSections = [...(pageData?.sections || [])];
      const matchIndex = updatedSections.findIndex(
        (s: any) =>
          String(s.id) === String(sectionData.id) ||
          String(s.blockType).toLowerCase() === String(sectionData.type).toLowerCase()
      );

      const sectionRecord = {
        id: sectionData.id || `sec_${Date.now()}`,
        blockType: sectionData.type || 'SECTION',
        title: sectionData.title || sectionData.type,
        content: JSON.stringify(sectionData.content),
        isVisible: sectionData.isVisible,
        position: matchIndex >= 0 ? updatedSections[matchIndex].position : updatedSections.length + 1,
      };

      if (matchIndex >= 0) {
        updatedSections[matchIndex] = {
          ...updatedSections[matchIndex],
          ...sectionRecord,
        };
      } else {
        updatedSections.push(sectionRecord);
      }

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

      setPageData((prev: any) => ({ ...prev, sections: updatedSections }));
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
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Eyebrow Tagline</span>
                    <AdminColorPicker
                      label="Color"
                      value={c.eyebrowColor}
                      defaultValue="#c9a45c"
                      onChange={(val) => handleContentChange('eyebrowColor', val)}
                    />
                  </label>
                  <AdminInput
                    type="text"
                    value={c.eyebrow || ''}
                    onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                    placeholder="e.g. The Signature Collection 2026"
                    style={{ color: c.eyebrowColor || undefined }}
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Main Headline</span>
                    <AdminColorPicker
                      label="Color"
                      value={c.titleColor}
                      defaultValue="#ffffff"
                      onChange={(val) => handleContentChange('titleColor', val)}
                    />
                  </label>
                  <AdminInput
                    type="text"
                    value={c.title || ''}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    placeholder="e.g. Handcrafted Elegance & Exceptional Diamonds"
                    style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Description Paragraph</span>
                    <AdminColorPicker
                      label="Color"
                      value={c.descriptionColor}
                      defaultValue="#f5f1e8"
                      onChange={(val) => handleContentChange('descriptionColor', val)}
                    />
                  </label>
                  <AdminTextarea
                    rows={3}
                    value={c.description || ''}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    placeholder="Brief hero narrative introducing your atelier creations..."
                    style={{ color: c.descriptionColor || undefined }}
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
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Primary Button Label</span>
                    <AdminColorPicker
                      label="Text Color"
                      value={c.primaryBtnTextColor}
                      defaultValue="#101418"
                      onChange={(val) => handleContentChange('primaryBtnTextColor', val)}
                    />
                  </label>
                  <AdminInput
                    type="text"
                    value={c.primaryBtnText || ''}
                    onChange={(e) => handleContentChange('primaryBtnText', e.target.value)}
                    placeholder="e.g. Explore Collection"
                    style={{ color: c.primaryBtnTextColor || undefined }}
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
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Secondary Button Label</span>
                    <AdminColorPicker
                      label="Text Color"
                      value={c.secondaryBtnTextColor}
                      defaultValue="#ffffff"
                      onChange={(val) => handleContentChange('secondaryBtnTextColor', val)}
                    />
                  </label>
                  <AdminInput
                    type="text"
                    value={c.secondaryBtnText || ''}
                    onChange={(e) => handleContentChange('secondaryBtnText', e.target.value)}
                    placeholder="e.g. Discover Diamonds"
                    style={{ color: c.secondaryBtnTextColor || undefined }}
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
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Eyebrow Tag</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.eyebrowColor}
                    defaultValue="#c9a45c"
                    onChange={(val) => handleContentChange('eyebrowColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.eyebrow || 'CURATED ATELIER EDIT'}
                  onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                  style={{ color: c.eyebrowColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Section Title</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.titleColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('titleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.title || 'Featured Collections'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={2} style={{ marginTop: 12 }}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Section Subtitle</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.subtitleColor}
                    defaultValue="#77736c"
                    onChange={(val) => handleContentChange('subtitleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.subtitle || 'Handcrafted Luxury Jewelry'}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  style={{ color: c.subtitleColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Button Text</span>
                  <AdminColorPicker
                    label="Text Color"
                    value={c.primaryBtnTextColor}
                    defaultValue="#101418"
                    onChange={(val) => handleContentChange('primaryBtnTextColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnText || 'View All Collections'}
                  onChange={(e) => handleContentChange('primaryBtnText', e.target.value)}
                  style={{ color: c.primaryBtnTextColor || undefined }}
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGroup style={{ marginTop: 12 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Section Description Narrative</span>
                <AdminColorPicker
                  label="Color"
                  value={c.descriptionColor}
                  defaultValue="#55514b"
                  onChange={(val) => handleContentChange('descriptionColor', val)}
                />
              </label>
              <AdminTextarea
                rows={2}
                value={c.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                placeholder="Explore signature bridal, solitaire engagement, and fine diamond suites."
                style={{ color: c.descriptionColor || undefined }}
              />
            </AdminFormGroup>

            <AdminFormGroup style={{ marginTop: 12 }}>
              <label>Button Target URL</label>
              <AdminInput
                type="text"
                value={c.primaryBtnLink || '/collections'}
                onChange={(e) => handleContentChange('primaryBtnLink', e.target.value)}
                placeholder="/collections"
              />
            </AdminFormGroup>

            <div style={{ marginTop: 20 }}>
              <MediaUploader
                label="Collection Highlight Image"
                value={c.image || ''}
                onChange={(url) => handleContentChange('image', url)}
              />
            </div>
          </AdminCard>
        )}

        {/* CAMPAIGN BANNER EDITOR */}
        {(sType.includes('CAMPAIGN') || sType.includes('BANNER')) && !sType.includes('HERO') && (
          <AdminCard>
            <AdminCardHeader>
              <h3>SIGNATURE CAMPAIGN BANNER</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Eyebrow Tag</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.eyebrowColor}
                    defaultValue="#c9a45c"
                    onChange={(val) => handleContentChange('eyebrowColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.eyebrow || 'THE ATELIER VISION'}
                  onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                  style={{ color: c.eyebrowColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Campaign Headline</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.titleColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('titleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.title || 'A NEW EXPRESSION OF FINE JEWELLERY'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGroup style={{ marginTop: 12 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Description / Narrative</span>
                <AdminColorPicker
                  label="Color"
                  value={c.descriptionColor}
                  defaultValue="#444444"
                  onChange={(val) => handleContentChange('descriptionColor', val)}
                />
              </label>
              <AdminTextarea
                rows={3}
                value={c.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                style={{ color: c.descriptionColor || undefined }}
              />
            </AdminFormGroup>
            <AdminFormGrid $columns={2} style={{ marginTop: 12 }}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Button Text</span>
                  <AdminColorPicker
                    label="Button Text Color"
                    value={c.primaryBtnTextColor}
                    defaultValue="#fffdf9"
                    onChange={(val) => handleContentChange('primaryBtnTextColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnText || 'EXPLORE THE COLLECTION'}
                  onChange={(e) => handleContentChange('primaryBtnText', e.target.value)}
                  style={{ color: c.primaryBtnTextColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Button Target URL</label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnLink || '/collections/signature-collection'}
                  onChange={(e) => handleContentChange('primaryBtnLink', e.target.value)}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <div style={{ marginTop: 16 }}>
              <MediaUploader
                label="Campaign Banner Image"
                value={c.image || ''}
                onChange={(url) => handleContentChange('image', url)}
              />
            </div>
          </AdminCard>
        )}

        {/* DIAMOND SHAPES SECTION */}
        {(sType.includes('DIAMOND') || sType.includes('SHAPE')) && (
          <AdminCard>
            <AdminCardHeader>
              <h3>DIAMOND SHAPES SHOWCASE</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Eyebrow Tag</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.eyebrowColor}
                    defaultValue="#c9a45c"
                    onChange={(val) => handleContentChange('eyebrowColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.eyebrow || 'AUTHENTICATED LOOSE DIAMONDS'}
                  onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                  style={{ color: c.eyebrowColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Main Title</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.titleColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('titleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.title || 'Exceptional Cut & Clarity'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGroup style={{ marginTop: 12 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Description Text</span>
                <AdminColorPicker
                  label="Color"
                  value={c.descriptionColor}
                  defaultValue="#77736c"
                  onChange={(val) => handleContentChange('descriptionColor', val)}
                />
              </label>
              <AdminTextarea
                rows={2}
                value={c.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                style={{ color: c.descriptionColor || undefined }}
              />
            </AdminFormGroup>
            <AdminFormGrid $columns={2} style={{ marginTop: 12 }}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Button Text</span>
                  <AdminColorPicker
                    label="Button Text Color"
                    value={c.primaryBtnTextColor}
                    defaultValue="#ffffff"
                    onChange={(val) => handleContentChange('primaryBtnTextColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnText || 'DISCOVER ALL SHAPES'}
                  onChange={(e) => handleContentChange('primaryBtnText', e.target.value)}
                  style={{ color: c.primaryBtnTextColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Button Target URL</label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnLink || '/diamonds'}
                  onChange={(e) => handleContentChange('primaryBtnLink', e.target.value)}
                />
              </AdminFormGroup>
            </AdminFormGrid>
          </AdminCard>
        )}

        {/* CRAFTSMANSHIP EDITOR */}
        {sType.includes('CRAFT') && (
          <AdminCard>
            <AdminCardHeader>
              <h3>CRAFTSMANSHIP & ATELIER STORY</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Eyebrow Tag</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.eyebrowColor}
                    defaultValue="#c9a45c"
                    onChange={(val) => handleContentChange('eyebrowColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.eyebrow || 'SURAT HERITAGE'}
                  onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                  style={{ color: c.eyebrowColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Heading</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.titleColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('titleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.title || 'The Art of Fine Jewelry'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGroup style={{ marginTop: 12 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Craftsmanship Story Narrative</span>
                <AdminColorPicker
                  label="Color"
                  value={c.descriptionColor}
                  defaultValue="#55514b"
                  onChange={(val) => handleContentChange('descriptionColor', val)}
                />
              </label>
              <AdminTextarea
                rows={4}
                value={c.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                style={{ color: c.descriptionColor || undefined }}
              />
            </AdminFormGroup>
            <AdminFormGrid $columns={2} style={{ marginTop: 12 }}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Button Text</span>
                  <AdminColorPicker
                    label="Button Text Color"
                    value={c.primaryBtnTextColor}
                    defaultValue="#ffffff"
                    onChange={(val) => handleContentChange('primaryBtnTextColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnText || 'OUR CRAFT STORY'}
                  onChange={(e) => handleContentChange('primaryBtnText', e.target.value)}
                  style={{ color: c.primaryBtnTextColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Button Target URL</label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnLink || '/about-us'}
                  onChange={(e) => handleContentChange('primaryBtnLink', e.target.value)}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <div style={{ marginTop: 16 }}>
              <MediaUploader
                label="Atelier Craftsmanship Image"
                value={c.image || '/assets/gem_craftsmanship.jpg'}
                onChange={(url) => handleContentChange('image', url)}
              />
            </div>
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
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Eyebrow Tag</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.eyebrowColor}
                    defaultValue="#c9a45c"
                    onChange={(val) => handleContentChange('eyebrowColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.eyebrow || 'CLIENT PRAISE'}
                  onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                  style={{ color: c.eyebrowColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Section Heading</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.titleColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('titleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.title || 'Client Experiences'}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGrid $columns={2} style={{ marginTop: 12 }}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Subtitle</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.subtitleColor}
                    defaultValue="#77736c"
                    onChange={(val) => handleContentChange('subtitleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.subtitle || 'Over 1,800 Verified 5-Star Reviews'}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  style={{ color: c.subtitleColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Client Name Color</span>
                  <AdminColorPicker
                    label="Author Color"
                    value={c.authorTextColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('authorTextColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.authorName || 'Verified Client'}
                  onChange={(e) => handleContentChange('authorName', e.target.value)}
                  style={{ color: c.authorTextColor || undefined }}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGroup style={{ marginTop: 12 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Quote Text Narrative Color</span>
                <AdminColorPicker
                  label="Quote Color"
                  value={c.quoteTextColor}
                  defaultValue="#444444"
                  onChange={(val) => handleContentChange('quoteTextColor', val)}
                />
              </label>
              <AdminTextarea
                rows={3}
                value={c.description || 'The bespoke ring exceeded all expectations. Exceptional craftsmanship and brilliant diamonds.'}
                onChange={(e) => handleContentChange('description', e.target.value)}
                style={{ color: c.quoteTextColor || undefined }}
              />
            </AdminFormGroup>
          </AdminCard>
        )}

        {/* CUSTOM / GENERIC SECTION EDITOR */}
        {!sType.includes('HERO') && !sType.includes('COLLECTION') && !sType.includes('FEATURED') && !sType.includes('CAMPAIGN') && !sType.includes('BANNER') && !sType.includes('DIAMOND') && !sType.includes('SHAPE') && !sType.includes('CRAFT') && !sType.includes('TESTIMONIAL') && (
          <AdminCard>
            <AdminCardHeader>
              <h3>CUSTOM SECTION CONTENT</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Section Eyebrow</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.eyebrowColor}
                    defaultValue="#c9a45c"
                    onChange={(val) => handleContentChange('eyebrowColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.eyebrow || ''}
                  onChange={(e) => handleContentChange('eyebrow', e.target.value)}
                  placeholder="e.g. SPECIAL HIGHLIGHT"
                  style={{ color: c.eyebrowColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Section Title</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.titleColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('titleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  placeholder="Section title"
                  style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGrid $columns={2} style={{ marginTop: 12 }}>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Section Subtitle</span>
                  <AdminColorPicker
                    label="Color"
                    value={c.subtitleColor}
                    defaultValue="#77736c"
                    onChange={(val) => handleContentChange('subtitleColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  placeholder="Subtitle text"
                  style={{ color: c.subtitleColor || undefined }}
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Button Text</span>
                  <AdminColorPicker
                    label="Button Text Color"
                    value={c.primaryBtnTextColor}
                    defaultValue="#ffffff"
                    onChange={(val) => handleContentChange('primaryBtnTextColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnText || ''}
                  onChange={(e) => handleContentChange('primaryBtnText', e.target.value)}
                  placeholder="Button label"
                  style={{ color: c.primaryBtnTextColor || undefined }}
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGroup style={{ marginTop: 12 }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Section Description</span>
                <AdminColorPicker
                  label="Color"
                  value={c.descriptionColor}
                  defaultValue="#55514b"
                  onChange={(val) => handleContentChange('descriptionColor', val)}
                />
              </label>
              <AdminTextarea
                rows={3}
                value={c.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                placeholder="Section narrative or description"
                style={{ color: c.descriptionColor || undefined }}
              />
            </AdminFormGroup>
            <AdminFormGrid $columns={2} style={{ marginTop: 12 }}>
              <AdminFormGroup>
                <label>Button Target Link</label>
                <AdminInput
                  type="text"
                  value={c.primaryBtnLink || ''}
                  onChange={(e) => handleContentChange('primaryBtnLink', e.target.value)}
                  placeholder="/collections"
                />
              </AdminFormGroup>
              <AdminFormGroup>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Rich Text Body Content Color</span>
                  <AdminColorPicker
                    label="Text Color"
                    value={c.bodyTextColor}
                    defaultValue="#1f1f1f"
                    onChange={(val) => handleContentChange('bodyTextColor', val)}
                  />
                </label>
                <AdminInput
                  type="text"
                  value={c.bodyTextColor || '#1f1f1f'}
                  onChange={(e) => handleContentChange('bodyTextColor', e.target.value)}
                  placeholder="#1f1f1f"
                />
              </AdminFormGroup>
            </AdminFormGrid>
            <AdminFormGroup style={{ marginTop: 12 }}>
              <label>Rich Text / HTML Content</label>
              <AdminTextarea
                rows={4}
                value={c.bodyHtml || ''}
                onChange={(e) => handleContentChange('bodyHtml', e.target.value)}
                placeholder="<p>Custom HTML or paragraph content...</p>"
                style={{ color: c.bodyTextColor || undefined, fontFamily: 'monospace' }}
              />
            </AdminFormGroup>
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
              <label>Default Section Text Color (Fallback)</label>
              <AdminColorPicker
                value={c.textColor}
                defaultValue="#ffffff"
                onChange={(val) => handleContentChange('textColor', val)}
                inline={false}
              />
            </AdminFormGroup>
          </AdminFormGrid>
        </AdminCard>
      </CanvasWrapper>
    </div>
  );
};
