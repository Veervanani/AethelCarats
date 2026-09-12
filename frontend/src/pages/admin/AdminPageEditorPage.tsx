import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Save,
  Send,
  Eye,
  ArrowLeft,
  CheckCircle,
  Clock,
  History,
  Image as ImageIcon,
  Search,
  Settings,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Monitor,
  Tablet,
  Smartphone,
  X,
  ExternalLink,
} from 'lucide-react';
import { api } from '../../services/api';
import { MediaUploader } from '../../components/admin/MediaUploader';
import {
  ContactUsEditor,
  ReturnsEditor,
  ShippingEditor,
  SustainabilityEditor,
  PriceMatchEditor,
  WarrantyEditor,
  InsuranceEditor,
  AboutUsEditor,
  FaqManagerComponent,
  BlogManagerComponent,
  SaleExclusionsEditor,
  CustomCadEditor,
  DiamondVaultEditor,
  CollectionPageEditor,
  CustomerAccountEditor,
  GenericRichTextPolicyEditor,
  DefaultPageEditor,
} from '../../components/admin/cms/PageSpecificEditors';
import { AdminColorPicker } from '../../components/admin/AdminColorPicker';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 60px;
  min-width: 0;
`;

const StickyHeaderBar = styled.div`
  background: #11161b;
  color: #fffdf9;
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  border: 1px solid rgba(201, 164, 92, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  width: 100%;

  .left-side {
    display: flex;
    align-items: center;
    gap: 16px;

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      color: #fffdf9;
      margin: 0;
    }

    span.slug-badge {
      font-family: monospace;
      font-size: 0.75rem;
      background: #333;
      color: #c9a45c;
      padding: 4px 8px;
      border-radius: 4px;
    }

    span.status-badge {
      font-weight: 700;
      font-size: 0.7rem;
      padding: 4px 10px;
      border-radius: 12px;
      text-transform: uppercase;

      &.PUBLISHED {
        background: #e6f4ea;
        color: #137333;
      }
      &.DRAFT {
        background: #fef7e0;
        color: #b06000;
      }
    }
  }

  .right-side {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const HeaderBtn = styled.button<{ $variant?: 'primary' | 'gold' | 'secondary' }>`
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'primary' ? '#FFFDF9' : $variant === 'gold' ? '#C9A45C' : '#555'};
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? '#FFFDF9' : $variant === 'gold' ? '#C9A45C' : '#2A2927'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#1F1F1F' : '#FFFDF9')};

  &:hover {
    opacity: 0.9;
  }
`;

const ContentWrapper = styled.div`
  padding: 0;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

const TabsHeader = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e8e3d9;
  margin-bottom: 24px;
  overflow-x: auto;
  background: #fffdf9;
  padding: 8px 16px 0;
  border-radius: 6px 6px 0 0;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 12px 20px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#C9A45C' : 'transparent')};
  color: ${({ $active }) => ($active ? '#C9A45C' : '#666')};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: #c9a45c;
  }
`;

const Card = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 24px;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: #1f1f1f;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e3d9;
  }
`;

const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: ${({ $cols }) => ($cols && $cols > 2 ? 'repeat(2, minmax(0, 1fr))' : 'minmax(0, 1fr)')};
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const FormGroup = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  ${({ $full }) => $full && 'grid-column: 1 / -1;'}

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #55514b;
    display: flex;
    justify-content: space-between;
  }

  input,
  textarea,
  select {
    padding: 10px 14px;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-size: 0.85rem;
    background: #fffdf9;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #c9a45c;
    }
  }
`;

const ImagePreviewBox = styled.div`
  border: 1px dashed #d9d3c7;
  border-radius: 6px;
  padding: 16px;
  text-align: center;
  background: #faf8f5;
  margin-bottom: 16px;

  img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 4px;
    margin-bottom: 12px;
  }
`;

// Preview Modal
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PreviewModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 100%;
  max-width: 1300px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PreviewHeader = styled.div`
  background: #1f1f1f;
  color: #fff;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewportToggle = styled.div`
  display: flex;
  gap: 10px;
  background: #333;
  padding: 4px;
  border-radius: 6px;

  button {
    padding: 6px 12px;
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;

    &.active {
      background: #c9a45c;
      color: #fff;
      font-weight: 700;
    }
  }
`;

export const AdminPageEditorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'content' | 'sections' | 'forms' | 'images' | 'seo' | 'settings' | 'history'>('content');
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Page Content State
  const [contentData, setContentData] = useState<any>({});
  const [sections, setSections] = useState<any[]>([]);
  const [seoMetadata, setSeoMetadata] = useState<any>({
    seoTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    robots: 'index, follow',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
  });

  const [pageImages, setPageImages] = useState({
    desktopImage: '',
    tabletImage: '',
    mobileImage: '',
    altText: '',
    imageTitle: '',
    imageCaption: '',
  });

  // Revisions
  const [revisions, setRevisions] = useState<any[]>([]);

  // Preview Modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const loadPage = async () => {
    const targetSlug = slug || 'home';
    setLoading(true);
    try {
      const data = await api.getPageBySlug(targetSlug);
      if (data) {
        setPage(data);

        let parsedContent: any = {};
        const rawContent = data.draftContent || data.content;
        if (rawContent) {
          try {
            parsedContent = typeof rawContent === 'string' ? JSON.parse(rawContent) : rawContent;
          } catch (e) {
            parsedContent = { content: rawContent };
          }
        }
        setContentData(parsedContent);
        setSections(data.sections || []);

        // Load persisted hero image assets from MySQL database
        if (parsedContent.pageImages) {
          setPageImages({
            desktopImage: parsedContent.pageImages.desktopImage || '',
            tabletImage: parsedContent.pageImages.tabletImage || '',
            mobileImage: parsedContent.pageImages.mobileImage || '',
            altText: parsedContent.pageImages.altText || '',
            imageTitle: parsedContent.pageImages.imageTitle || '',
            imageCaption: parsedContent.pageImages.imageCaption || '',
          });
        } else {
          setPageImages({
            desktopImage: parsedContent.desktopImage || '',
            tabletImage: parsedContent.tabletImage || '',
            mobileImage: parsedContent.mobileImage || '',
            altText: parsedContent.altText || '',
            imageTitle: parsedContent.imageTitle || '',
            imageCaption: parsedContent.imageCaption || '',
          });
        }

        if (data.seoMetadata) {
          setSeoMetadata({
            seoTitle: data.seoMetadata.seoTitle || data.title,
            metaDescription: data.seoMetadata.metaDescription || '',
            canonicalUrl: data.seoMetadata.canonicalUrl || '',
            robots: data.seoMetadata.robots || 'index, follow',
            ogTitle: data.seoMetadata.ogTitle || '',
            ogDescription: data.seoMetadata.ogDescription || '',
            ogImage: data.seoMetadata.ogImage || '',
          });
        } else {
          setSeoMetadata((prev: any) => ({ ...prev, seoTitle: data.title || 'Page Editor' }));
        }

        setRevisions(data.revisions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, [slug]);

  const handleSaveDraft = async () => {
    const targetSlug = slug || 'home';
    setSaving(true);
    try {
      const draftPayload = {
        ...contentData,
        pageImages,
        desktopImage: pageImages.desktopImage,
        tabletImage: pageImages.tabletImage,
        mobileImage: pageImages.mobileImage,
        altText: pageImages.altText,
        imageTitle: pageImages.imageTitle,
        imageCaption: pageImages.imageCaption,
      };

      const updated = await api.savePageDraft(targetSlug, {
        title: page?.title || 'Untitled Page',
        content: draftPayload,
        draftContent: draftPayload,
        sections,
        seoMetadata,
      });
      setPage(updated);
      setSaveSuccessMsg('Page Saved & Updated Live on Storefront!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    } catch (e) {
      alert('Error saving page');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    const targetSlug = slug || 'home';
    setSaving(true);
    try {
      const publishPayload = {
        ...contentData,
        pageImages,
        desktopImage: pageImages.desktopImage,
        tabletImage: pageImages.tabletImage,
        mobileImage: pageImages.mobileImage,
        altText: pageImages.altText,
        imageTitle: pageImages.imageTitle,
        imageCaption: pageImages.imageCaption,
      };

      const updated = await api.publishPage(targetSlug, {
        title: page?.title || 'Untitled Page',
        content: publishPayload,
        draftContent: publishPayload,
        sections,
        seoMetadata,
      });
      setPage(updated);
      setSaveSuccessMsg('Published Live to Storefront & Database!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    } catch (e) {
      alert('Error publishing page');
    } finally {
      setSaving(false);
    }
  };

  const handleRestoreRevision = async (revId: string) => {
    const targetSlug = slug || 'home';
    if (!confirm('Restore this revision version into draft editor?')) return;
    try {
      const updated = await api.restorePageRevision(targetSlug, revId);
      setPage(updated);
      loadPage();
      alert('Revision restored into editor!');
    } catch (e) {
      alert('Error restoring revision');
    }
  };

  if (loading) {
    return <div style={{ padding: 60, textAlign: 'center', color: '#c9a45c', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>LOADING CMS EDITOR...</div>;
  }

  // Render Page-Specific Content Editor based on Slug
  const renderContentTab = () => {
    switch (slug) {
      case 'contact-us':
        return <ContactUsEditor content={contentData} onChange={setContentData} />;
      case 'returns-refunds':
        return <ReturnsEditor content={contentData} onChange={setContentData} />;
      case 'shipping-delivery':
        return <ShippingEditor content={contentData} onChange={setContentData} />;
      case 'sustainability':
        return <SustainabilityEditor content={contentData} onChange={setContentData} />;
      case 'price-match':
        return <PriceMatchEditor content={contentData} onChange={setContentData} />;
      case 'lifetime-warranty':
        return <WarrantyEditor content={contentData} onChange={setContentData} />;
      case 'insurance':
        return <InsuranceEditor content={contentData} onChange={setContentData} />;
      case 'about-us':
        return <AboutUsEditor content={contentData} onChange={setContentData} />;
      case 'faq':
        return <FaqManagerComponent />;
      case 'blog':
        return <BlogManagerComponent />;
      case 'sale-exclusions':
        return <SaleExclusionsEditor content={contentData} onChange={setContentData} />;
      case 'custom-jewellery':
        return <CustomCadEditor content={contentData} onChange={setContentData} />;
      case 'diamonds':
        return <DiamondVaultEditor content={contentData} onChange={setContentData} />;
      case 'rings':
      case 'earrings':
      case 'necklaces':
      case 'bracelets':
      case 'pendants':
      case 'collections':
        return <CollectionPageEditor content={contentData} onChange={setContentData} />;
      case 'account':
        return <CustomerAccountEditor content={contentData} onChange={setContentData} />;
      case 'privacy-policy':
      case 'terms-of-service':
      case 'billing-terms-conditions':
      case 'jewellery-care':
        return <GenericRichTextPolicyEditor content={contentData} onChange={setContentData} />;
      default:
        return <DefaultPageEditor content={contentData} onChange={setContentData} />;
    }
  };

  const publicUrl = slug === 'home' ? '/' : `/${slug}`;

  return (
    <PageContainer>
      {/* ALWAYS VISIBLE STICKY HEADER ACTION BAR */}
      <StickyHeaderBar>
        <div className="left-side">
          <button onClick={() => navigate('/vault-mgmt-k8m3x9q2v7/pages')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>{page.title}</h1>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
              <span className="slug-badge">/{page.slug}</span>
              <span className={`status-badge ${page.status}`}>{page.status}</span>
            </div>
          </div>
        </div>

        <div className="right-side">
          {saveSuccessMsg && (
            <span style={{ color: '#81c784', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle size={16} /> {saveSuccessMsg}
            </span>
          )}
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#c9a45c', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, marginRight: 8 }}
          >
            <ExternalLink size={14} /> VIEW LIVE
          </a>
          <HeaderBtn $variant="secondary" onClick={() => setShowPreviewModal(true)}>
            <Eye size={16} /> PREVIEW
          </HeaderBtn>
          <HeaderBtn $variant="gold" onClick={handleSaveDraft} disabled={saving}>
            <Save size={16} /> {saving ? 'SAVING...' : 'SAVE DRAFT'}
          </HeaderBtn>
          <HeaderBtn $variant="primary" onClick={handlePublish} disabled={saving}>
            <Send size={16} /> PUBLISH
          </HeaderBtn>
        </div>
      </StickyHeaderBar>

      <ContentWrapper>
        {/* SECTION 1: REAL CONTENT EDITOR */}
        {renderContentTab()}

        {/* SECTION 2: VISUAL MEDIA & HERO IMAGES WITH PC UPLOAD */}
        <Card>
          <h2>Visual Hero Images & PC File Upload</h2>
          <FormGrid $cols={3}>
            <FormGroup>
              <MediaUploader
                label="Desktop Hero Image (PC File Upload)"
                value={pageImages.desktopImage}
                onChange={(url) => setPageImages({ ...pageImages, desktopImage: url })}
                helpText="Drag & drop JPG, PNG or WEBP from your PC"
              />
            </FormGroup>

            <FormGroup>
              <MediaUploader
                label="Tablet Hero Image (PC File Upload)"
                value={pageImages.tabletImage}
                onChange={(url) => setPageImages({ ...pageImages, tabletImage: url })}
                helpText="Tablet responsive image format"
              />
            </FormGroup>

            <FormGroup>
              <MediaUploader
                label="Mobile Hero Image (PC File Upload)"
                value={pageImages.mobileImage}
                onChange={(url) => setPageImages({ ...pageImages, mobileImage: url })}
                helpText="Mobile responsive image format"
              />
            </FormGroup>
          </FormGrid>

          <FormGrid style={{ marginTop: 16 }}>
            <FormGroup $full>
              <label>Image ALT Text (Google Accessibility & SEO)</label>
              <input type="text" value={pageImages.altText} onChange={(e) => setPageImages({ ...pageImages, altText: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <label>Image Title Attribute</label>
              <input type="text" value={pageImages.imageTitle} onChange={(e) => setPageImages({ ...pageImages, imageTitle: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <label>Image Caption</label>
              <input type="text" value={pageImages.imageCaption} onChange={(e) => setPageImages({ ...pageImages, imageCaption: e.target.value })} />
            </FormGroup>
          </FormGrid>
        </Card>

        {/* SECTION 3: SECTIONS BUILDER */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0 }}>Custom Section Layout Blocks ({sections.length})</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#77736c' }}>
                Add individual page sections with dedicated text color controls for each text element.
              </p>
            </div>
            <button
              onClick={() => {
                setSections([
                  ...sections,
                  {
                    id: `sec_${Date.now()}`,
                    blockType: 'RICH_TEXT',
                    position: sections.length + 1,
                    isVisible: true,
                    content: {
                      eyebrow: 'EXCLUSIVE ATELIER EDIT',
                      eyebrowColor: '#c9a45c',
                      title: 'Handcrafted Atelier Section',
                      titleColor: '#1f1f1f',
                      subtitle: 'Fine Jewellery & Exceptional Diamonds',
                      subtitleColor: '#77736c',
                      description: 'Experience bespoke craftsmanship and precision-cut certified diamonds.',
                      descriptionColor: '#55514b',
                      primaryBtnText: 'DISCOVER MORE',
                      primaryBtnTextColor: '#ffffff',
                      primaryBtnLink: '/collections',
                      bodyHtml: '<p>Detailed bespoke storytelling and fine jewellery specifications.</p>',
                      textColor: '#1f1f1f',
                      backgroundColor: '#ffffff',
                    },
                  },
                ]);
              }}
              style={{
                padding: '9px 18px',
                background: '#19202a',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Plus size={14} /> + Add Custom Section Block
            </button>
          </div>

          {sections.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', background: '#faf8f5', border: '1px dashed #d9d3c7', borderRadius: 6, color: '#77736c', fontSize: '0.9rem' }}>
              No custom section blocks added yet. Click "+ Add Custom Section Block" above to create your first section.
            </div>
          )}

          {sections.map((s, idx) => {
            let c: any = {};
            try {
              c = typeof s.content === 'string' ? JSON.parse(s.content) : { ...(s.content || {}) };
            } catch (e) {
              c = { text: s.content };
            }

            const updateField = (field: string, val: any) => {
              const updated = [...sections];
              let currentContent: any = {};
              try {
                currentContent = typeof updated[idx].content === 'string' ? JSON.parse(updated[idx].content) : { ...(updated[idx].content || {}) };
              } catch (e) {
                currentContent = { text: updated[idx].content };
              }
              currentContent[field] = val;
              updated[idx] = {
                ...updated[idx],
                content: currentContent,
              };
              setSections(updated);
            };

            const handleMove = (direction: 'up' | 'down') => {
              const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
              if (targetIdx < 0 || targetIdx >= sections.length) return;
              const updated = [...sections];
              const temp = updated[idx];
              updated[idx] = updated[targetIdx];
              updated[targetIdx] = temp;
              setSections(updated);
            };

            return (
              <div
                key={s.id || idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e8e3d9',
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 16,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                }}
              >
                {/* SECTION HEADER ROW */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f0ebe1',
                    paddingBottom: 12,
                    marginBottom: 16,
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#c9a45c',
                        background: '#faf8f5',
                        padding: '4px 8px',
                        borderRadius: 4,
                        border: '1px solid #e8e3d9',
                      }}
                    >
                      Section #{idx + 1}
                    </span>
                    <select
                      value={s.blockType || 'RICH_TEXT'}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[idx] = { ...updated[idx], blockType: e.target.value };
                        setSections(updated);
                      }}
                      style={{
                        padding: '5px 10px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        borderRadius: 4,
                        border: '1px solid #d9d3c7',
                        background: '#ffffff',
                      }}
                    >
                      <option value="RICH_TEXT">Rich Text Section</option>
                      <option value="HERO_BANNER">Hero Banner</option>
                      <option value="CALLOUT_BANNER">Callout Banner</option>
                      <option value="FEATURE_GRID">Feature Grid</option>
                      <option value="IMAGE_BANNER">Image Banner</option>
                      <option value="CUSTOM">Custom Section</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', marginRight: 8 }}>
                      <input
                        type="checkbox"
                        checked={s.isVisible !== false}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[idx] = { ...updated[idx], isVisible: e.target.checked };
                          setSections(updated);
                        }}
                      />
                      Visible
                    </label>

                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove('up')}
                      style={{ padding: '4px 8px', border: '1px solid #d9d3c7', background: '#faf8f5', borderRadius: 4, cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.5 : 1 }}
                      title="Move Up"
                    >
                      <MoveUp size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => handleMove('down')}
                      style={{ padding: '4px 8px', border: '1px solid #d9d3c7', background: '#faf8f5', borderRadius: 4, cursor: idx === sections.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === sections.length - 1 ? 0.5 : 1 }}
                      title="Move Down"
                    >
                      <MoveDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Delete this section block?')) {
                          setSections(sections.filter((_, i) => i !== idx));
                        }
                      }}
                      style={{ padding: '4px 8px', border: '1px solid #feb2b2', background: '#fff5f5', color: '#c00', borderRadius: 4, cursor: 'pointer' }}
                      title="Delete Section"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* FORM FIELDS WITH INDIVIDUAL COLOR PICKERS */}
                <FormGrid $cols={2}>
                  <FormGroup>
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Section Eyebrow Tagline</span>
                      <AdminColorPicker
                        label="Color"
                        value={c.eyebrowColor}
                        defaultValue="#c9a45c"
                        onChange={(val) => updateField('eyebrowColor', val)}
                      />
                    </label>
                    <input
                      type="text"
                      value={c.eyebrow || ''}
                      onChange={(e) => updateField('eyebrow', e.target.value)}
                      placeholder="e.g. EXCLUSIVE ATELIER EDIT"
                      style={{ color: c.eyebrowColor || undefined }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Section Headline / Title</span>
                      <AdminColorPicker
                        label="Color"
                        value={c.titleColor}
                        defaultValue="#1f1f1f"
                        onChange={(val) => updateField('titleColor', val)}
                      />
                    </label>
                    <input
                      type="text"
                      value={c.title || ''}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="e.g. Handcrafted Atelier Section"
                      style={{ color: c.titleColor || undefined, fontWeight: 600 }}
                    />
                  </FormGroup>
                </FormGrid>

                <FormGrid $cols={2} style={{ marginTop: 12 }}>
                  <FormGroup>
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Section Subtitle</span>
                      <AdminColorPicker
                        label="Color"
                        value={c.subtitleColor}
                        defaultValue="#77736c"
                        onChange={(val) => updateField('subtitleColor', val)}
                      />
                    </label>
                    <input
                      type="text"
                      value={c.subtitle || ''}
                      onChange={(e) => updateField('subtitle', e.target.value)}
                      placeholder="e.g. Fine Jewellery & Exceptional Diamonds"
                      style={{ color: c.subtitleColor || undefined }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Button Text</span>
                      <AdminColorPicker
                        label="Text Color"
                        value={c.primaryBtnTextColor || c.buttonTextColor}
                        defaultValue="#ffffff"
                        onChange={(val) => {
                          updateField('primaryBtnTextColor', val);
                          updateField('buttonTextColor', val);
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={c.primaryBtnText || c.buttonText || ''}
                      onChange={(e) => {
                        updateField('primaryBtnText', e.target.value);
                        updateField('buttonText', e.target.value);
                      }}
                      placeholder="e.g. DISCOVER MORE"
                      style={{ color: c.primaryBtnTextColor || c.buttonTextColor || undefined }}
                    />
                  </FormGroup>
                </FormGrid>

                <FormGrid $cols={2} style={{ marginTop: 12 }}>
                  <FormGroup>
                    <label>Button Target URL</label>
                    <input
                      type="text"
                      value={c.primaryBtnLink || c.buttonLink || ''}
                      onChange={(e) => {
                        updateField('primaryBtnLink', e.target.value);
                        updateField('buttonLink', e.target.value);
                      }}
                      placeholder="/collections"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Section Background Color</span>
                      <AdminColorPicker
                        label="BG Color"
                        value={c.backgroundColor}
                        defaultValue="#ffffff"
                        onChange={(val) => updateField('backgroundColor', val)}
                      />
                    </label>
                    <input
                      type="text"
                      value={c.backgroundColor || '#ffffff'}
                      onChange={(e) => updateField('backgroundColor', e.target.value)}
                      placeholder="#ffffff"
                    />
                  </FormGroup>
                </FormGrid>

                <FormGroup $full style={{ marginTop: 12 }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Description Narrative</span>
                    <AdminColorPicker
                      label="Color"
                      value={c.descriptionColor}
                      defaultValue="#55514b"
                      onChange={(val) => updateField('descriptionColor', val)}
                    />
                  </label>
                  <textarea
                    rows={2}
                    value={c.description || ''}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Short section narrative introducing the collection or atelier features..."
                    style={{ color: c.descriptionColor || undefined }}
                  />
                </FormGroup>

                <FormGroup $full style={{ marginTop: 12 }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Rich Text / Body Paragraph Content</span>
                    <AdminColorPicker
                      label="Text Color"
                      value={c.textColor || c.bodyTextColor}
                      defaultValue="#1f1f1f"
                      onChange={(val) => {
                        updateField('textColor', val);
                        updateField('bodyTextColor', val);
                      }}
                    />
                  </label>
                  <textarea
                    rows={3}
                    value={c.bodyHtml || c.text || (typeof c.content === 'string' ? c.content : '')}
                    onChange={(e) => {
                      updateField('bodyHtml', e.target.value);
                      updateField('text', e.target.value);
                    }}
                    placeholder="Complete section body paragraph, features, or HTML..."
                    style={{ color: c.textColor || c.bodyTextColor || undefined }}
                  />
                </FormGroup>
              </div>
            );
          })}
        </Card>

        {/* SECTION 4: SEO METADATA */}
        <Card>
          <h2>Page Search Engine Optimization (SEO)</h2>
          <FormGrid>
            <FormGroup $full>
              <label>
                <span>SEO Title Tag</span>
                <span>{(seoMetadata.seoTitle || '').length} / 60 chars</span>
              </label>
              <input type="text" value={seoMetadata.seoTitle} onChange={(e) => setSeoMetadata({ ...seoMetadata, seoTitle: e.target.value })} />
            </FormGroup>

            <FormGroup $full>
              <label>
                <span>Meta Description</span>
                <span>{(seoMetadata.metaDescription || '').length} / 160 chars</span>
              </label>
              <textarea rows={3} value={seoMetadata.metaDescription} onChange={(e) => setSeoMetadata({ ...seoMetadata, metaDescription: e.target.value })} />
            </FormGroup>

            <FormGroup>
              <label>Canonical URL</label>
              <input type="text" value={seoMetadata.canonicalUrl} onChange={(e) => setSeoMetadata({ ...seoMetadata, canonicalUrl: e.target.value })} placeholder={`https://auroradiamonds.com/${page.slug}`} />
            </FormGroup>

            <FormGroup>
              <label>Robots Directive</label>
              <select value={seoMetadata.robots} onChange={(e) => setSeoMetadata({ ...seoMetadata, robots: e.target.value })}>
                <option value="index, follow">Index, Follow (Recommended)</option>
                <option value="noindex, follow">NoIndex, Follow</option>
                <option value="noindex, nofollow">NoIndex, NoFollow</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Open Graph (OG) Title</label>
              <input type="text" value={seoMetadata.ogTitle} onChange={(e) => setSeoMetadata({ ...seoMetadata, ogTitle: e.target.value })} />
            </FormGroup>

            <FormGroup>
              <label>Open Graph (OG) Image URL</label>
              <input type="text" value={seoMetadata.ogImage} onChange={(e) => setSeoMetadata({ ...seoMetadata, ogImage: e.target.value })} />
            </FormGroup>
          </FormGrid>
        </Card>

        {/* SECTION 5: TECHNICAL SETTINGS */}
        <Card>
          <h2>Page Technical Settings & Configurations</h2>
          <FormGrid>
            <FormGroup>
              <label>Page Internal Title</label>
              <input type="text" value={page.title} onChange={(e) => setPage({ ...page, title: e.target.value })} />
            </FormGroup>

            <FormGroup>
              <label>URL Slug</label>
              <input type="text" disabled value={page.slug} style={{ background: '#eee' }} />
            </FormGroup>

            <FormGroup>
              <label>Publication Status</label>
              <select value={page.status} onChange={(e) => setPage({ ...page, status: e.target.value })}>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="DRAFT">DRAFT</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Internal Page ID</label>
              <input type="text" disabled value={page.id} style={{ background: '#eee', fontFamily: 'monospace' }} />
            </FormGroup>
          </FormGrid>
        </Card>

        {/* SECTION 6: REVISION HISTORY */}
        <Card>
          <h2>Page Revision History ({revisions.length})</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#1f1f1f', color: '#fff' }}>
                <th style={{ padding: 10 }}>Version</th>
                <th style={{ padding: 10 }}>Action</th>
                <th style={{ padding: 10 }}>Admin User</th>
                <th style={{ padding: 10 }}>Date & Time</th>
                <th style={{ padding: 10 }}>Restore</th>
              </tr>
            </thead>
            <tbody>
              {revisions.map((rev) => (
                <tr key={rev.id} style={{ borderBottom: '1px solid #e8e3d9' }}>
                  <td style={{ padding: 10, fontWeight: 700 }}>v{rev.version}</td>
                  <td style={{ padding: 10 }}>{rev.action}</td>
                  <td style={{ padding: 10 }}>{rev.adminUser}</td>
                  <td style={{ padding: 10 }}>{new Date(rev.createdAt).toLocaleString()}</td>
                  <td style={{ padding: 10 }}>
                    <button
                      onClick={() => handleRestoreRevision(rev.id)}
                      style={{ padding: '4px 10px', background: '#c9a45c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                    >
                      Restore Version
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </ContentWrapper>

      {/* PREVIEW MODAL WITH DEVICE VIEWPORT TOGGLE */}
      {showPreviewModal && (
        <ModalOverlay onClick={() => setShowPreviewModal(false)}>
          <PreviewModalContainer onClick={(e) => e.stopPropagation()}>
            <PreviewHeader>
              <div>
                <strong>Live Storefront Preview:</strong> /{slug}
              </div>
              <ViewportToggle>
                <button className={viewportMode === 'desktop' ? 'active' : ''} onClick={() => setViewportMode('desktop')}>
                  <Monitor size={14} /> Desktop (1200px)
                </button>
                <button className={viewportMode === 'tablet' ? 'active' : ''} onClick={() => setViewportMode('tablet')}>
                  <Tablet size={14} /> Tablet (768px)
                </button>
                <button className={viewportMode === 'mobile' ? 'active' : ''} onClick={() => setViewportMode('mobile')}>
                  <Smartphone size={14} /> Mobile (375px)
                </button>
              </ViewportToggle>
              <button onClick={() => setShowPreviewModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </PreviewHeader>
            <div style={{ flex: 1, background: '#e5e5e5', display: 'flex', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
              <iframe
                src={`/${slug === 'home' ? '' : slug}?preview=true`}
                title="Page Preview"
                style={{
                  border: '1px solid #ccc',
                  background: '#fff',
                  width: viewportMode === 'desktop' ? '100%' : viewportMode === 'tablet' ? '768px' : '375px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  borderRadius: 4,
                }}
              />
            </div>
          </PreviewModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};
