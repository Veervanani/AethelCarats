import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  Smartphone,
  Tablet as TabletIcon,
  Monitor,
  Edit3,
  Layers,
  Check,
  RefreshCw,
  Globe,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { api } from '../../services/api';
import { PRIVATE_ADMIN_PATH } from '../../App';
import {
  AdminPageHeader,
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminSelect,
  AdminBadge,
} from '../../components/admin/AdminUI';

const StickyTopBar = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 16px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }
`;

const PageSelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #1f1f1f;
    margin: 0;
    white-space: nowrap;
  }
`;

const ViewportSwitcher = styled.div`
  display: flex;
  align-items: center;
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 3px;
  gap: 2px;

  button {
    padding: 6px 14px;
    border: none;
    background: transparent;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #77736c;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      color: #1f1f1f;
      background: rgba(0, 0, 0, 0.03);
    }

    &.active {
      background: #19202a;
      color: #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
  }
`;

const BuilderGrid = styled.div`
  display: grid;
  grid-template-columns: 440px 1fr;
  gap: 28px;
  align-items: start;
  max-width: 1600px;
  margin: 0 auto;
  padding-bottom: 80px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StructureTreeCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

const SectionCardItem = styled.div<{ $isVisible: boolean }>`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.5)};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #c9a45c;
    background: #ffffff;
    box-shadow: 0 4px 14px rgba(201, 164, 92, 0.12);
  }

  .section-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    .num-tag {
      font-family: 'Inter', sans-serif;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #c9a45c;
      text-transform: uppercase;
    }

    .title {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      color: #1f1f1f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .action-btns {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
`;

const PreviewCanvas = styled.div<{ $mode: string }>`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  width: ${({ $mode }) => ($mode === 'mobile' ? '380px' : $mode === 'tablet' ? '768px' : '100%')};
  min-height: 820px;

  iframe {
    width: 100%;
    height: 820px;
    border: none;
  }
`;

export const AdminPageBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('home');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    loadPage(selectedPage);
  }, [selectedPage]);

  const loadPage = async (slug: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/v1/admin/cms/pages/${slug}`);
      setPageData(res.data);
    } catch (err) {
      console.error('Failed to load page content:', err);
    } finally {
      setLoading(false);
    }
  };

  const sectionsList = pageData?.sections || [
    { id: 'sec_hero', blockType: 'HERO', title: 'Hero Banner Section', isVisible: true, position: 1 },
    { id: 'sec_collections', blockType: 'FEATURED_COLLECTIONS', title: 'Featured Collections', isVisible: true, position: 2 },
    { id: 'sec_campaign', blockType: 'CAMPAIGN_BANNER', title: 'Signature Campaign Banner', isVisible: true, position: 3 },
    { id: 'sec_diamonds', blockType: 'DIAMOND_SHAPES', title: 'Explore Diamond Shapes', isVisible: true, position: 4 },
    { id: 'sec_craftsmanship', blockType: 'CRAFTSMANSHIP', title: 'Atelier Craftsmanship', isVisible: true, position: 5 },
    { id: 'sec_testimonials', blockType: 'TESTIMONIALS', title: 'Client Experiences', isVisible: true, position: 6 },
  ];

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const updated = [...sectionsList];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    setPageData((prev: any) => ({ ...prev, sections: updated }));
  };

  const handleToggleVisibility = (index: number) => {
    const updated = [...sectionsList];
    updated[index].isVisible = !updated[index].isVisible;
    setPageData((prev: any) => ({ ...prev, sections: updated }));
  };

  const handleDeleteSection = (index: number) => {
    if (window.confirm('Are you sure you want to delete this section from the page layout?')) {
      const updated = sectionsList.filter((_: any, i: number) => i !== index);
      setPageData((prev: any) => ({ ...prev, sections: updated }));
    }
  };

  const handleDuplicateSection = (index: number) => {
    const target = sectionsList[index];
    const newSection = {
      ...target,
      id: `sec_${Date.now()}`,
      title: `${target.title} (Copy)`,
      position: sectionsList.length + 1,
    };
    setPageData((prev: any) => ({ ...prev, sections: [...sectionsList, newSection] }));
  };

  const handleSavePage = async (publish: boolean = false) => {
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');

      const payload = {
        title: pageData?.title || 'Homepage',
        draftContent: pageData?.draftContent,
        sections: sectionsList,
      };

      if (publish) {
        await api.post(`/api/v1/admin/cms/pages/${selectedPage}/publish`, payload);
        setSuccessMsg('Page structure & content published to storefront live site!');
      } else {
        await api.post(`/api/v1/admin/cms/pages/${selectedPage}/draft`, payload);
        setSuccessMsg('Page structure draft saved successfully!');
      }

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to save page structure.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* STICKY TOP BAR */}
      <StickyTopBar>
        <PageSelectGroup>
          <Globe size={22} color="#c9a45c" />
          <h1>Website Builder & CMS</h1>
          <AdminSelect value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)} style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
            <option value="home">Homepage (Storefront Index)</option>
            <option value="rings">Rings Guide Page</option>
            <option value="education/rings/find-your-ring-size">Find Your Ring Size CMS</option>
            <option value="bespoke-service">Bespoke Atelier Service</option>
            <option value="sustainability">Sustainability Policy</option>
            <option value="about-us">About Us Story</option>
          </AdminSelect>
        </PageSelectGroup>

        <ViewportSwitcher>
          <button className={viewportMode === 'desktop' ? 'active' : ''} onClick={() => setViewportMode('desktop')}>
            <Monitor size={14} /> Desktop
          </button>
          <button className={viewportMode === 'tablet' ? 'active' : ''} onClick={() => setViewportMode('tablet')}>
            <TabletIcon size={14} /> Tablet
          </button>
          <button className={viewportMode === 'mobile' ? 'active' : ''} onClick={() => setViewportMode('mobile')}>
            <Smartphone size={14} /> Mobile
          </button>
        </ViewportSwitcher>

        <div style={{ display: 'flex', gap: 10 }}>
          <AdminButton $variant="secondary" onClick={() => window.open('/', '_blank')} icon={<ExternalLink size={14} />}>
            Storefront Live
          </AdminButton>
          <AdminButton $variant="secondary" onClick={() => handleSavePage(false)} $loading={saving} icon={<Save size={14} />}>
            Save Draft
          </AdminButton>
          <AdminButton $variant="gold" onClick={() => handleSavePage(true)} $loading={saving} icon={<Check size={14} />}>
            Save & Publish
          </AdminButton>
        </div>
      </StickyTopBar>

      {successMsg && (
        <div style={{ maxWidth: 1600, margin: '0 auto 20px', background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
            <Check size={18} /> {successMsg}
          </div>
        </div>
      )}

      {errorMsg && (
        <div style={{ maxWidth: 1600, margin: '0 auto 20px', background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <BuilderGrid>
        {/* LEFT COLUMN: PAGE SECTIONS STRUCTURE TREE */}
        <StructureTreeCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e8e3d9', paddingBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', fontWeight: 600, color: '#1f1f1f' }}>Page Sections</div>
              <div style={{ fontSize: '0.78rem', color: '#77736c' }}>Manage layout structure & click EDIT for full-page editor</div>
            </div>
            <AdminButton
              $variant="gold"
              $size="sm"
              onClick={() => {
                const newSec = { id: `sec_${Date.now()}`, blockType: 'CUSTOM', title: 'New Custom Section', isVisible: true, position: sectionsList.length + 1 };
                setPageData((prev: any) => ({ ...prev, sections: [...sectionsList, newSec] }));
              }}
              icon={<Plus size={13} />}
            >
              + Add
            </AdminButton>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sectionsList.map((sec: any, idx: number) => (
              <SectionCardItem key={sec.id || idx} $isVisible={sec.isVisible}>
                <div className="section-info">
                  <span className="num-tag">0{idx + 1} • {sec.blockType || 'SECTION'}</span>
                  <span className="title">{sec.title || sec.blockType}</span>
                </div>
                <div className="action-btns">
                  <AdminButton
                    $variant="secondary"
                    $size="sm"
                    disabled={idx === 0}
                    onClick={() => handleMoveSection(idx, 'up')}
                    title="Move Up"
                    icon={<MoveUp size={12} />}
                  />
                  <AdminButton
                    $variant="secondary"
                    $size="sm"
                    disabled={idx === sectionsList.length - 1}
                    onClick={() => handleMoveSection(idx, 'down')}
                    title="Move Down"
                    icon={<MoveDown size={12} />}
                  />
                  <AdminButton
                    $variant="secondary"
                    $size="sm"
                    onClick={() => handleDuplicateSection(idx)}
                    title="Duplicate Section"
                    icon={<Copy size={12} />}
                  />
                  <AdminButton
                    $variant="gold"
                    $size="sm"
                    onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/cms/pages/${selectedPage}/sections/${sec.id || sec.blockType.toLowerCase()}/edit`)}
                    title="Open Full-Page Section Content Editor"
                    icon={<Edit3 size={13} />}
                  >
                    Edit
                  </AdminButton>
                  <AdminButton
                    $variant="danger"
                    $size="sm"
                    onClick={() => handleDeleteSection(idx)}
                    title="Delete Section"
                    icon={<Trash2 size={12} />}
                  />
                </div>
              </SectionCardItem>
            ))}
          </div>
        </StructureTreeCard>

        {/* RIGHT COLUMN: REAL-TIME RESPONSIVE PREVIEW CANVAS */}
        <div>
          <PreviewCanvas $mode={viewportMode}>
            <iframe src="/" title="Storefront Realtime Visual Preview" />
          </PreviewCanvas>
        </div>
      </BuilderGrid>
    </div>
  );
};
