import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Globe,
  Search,
  Edit,
  Eye,
  ExternalLink,
  Plus,
  Filter,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  Layers,
  ShoppingBag,
  ShieldCheck,
  BookOpen,
  Trash2,
  X,
} from 'lucide-react';
import { PRIVATE_ADMIN_PATH } from '../../App';
import { api } from '../../services/api';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 64px;
  width: 100%;
`;

const HeaderBanner = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .title-area {
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2.2rem;
      font-weight: 600;
      color: #1a1918;
      margin: 0 0 6px;
    }

    p {
      color: #77736c;
      font-size: 0.92rem;
      margin: 0;
    }
  }

  .create-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #1a1918;
    color: #fffdf9;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #c9a45c;
      color: #1a1918;
      transform: translateY(-1px);
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;

  .stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background: #faf8f5;
    color: #c9a45c;
    border: 1px solid #e8e3d9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-num {
    font-size: 1.5rem;
    font-weight: 700;
    color: #19202a;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #77736c;
    margin-top: 4px;
  }
`;

const ToolbarRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  .search-box {
    position: relative;
    flex: 1;
    min-width: 280px;

    svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #8c877b;
    }

    input {
      width: 100%;
      padding: 12px 14px 12px 42px;
      background: #ffffff;
      border: 1px solid #e8e3d9;
      border-radius: 6px;
      font-size: 0.9rem;
      color: #1a1918;
      outline: none;

      &:focus {
        border-color: #c9a45c;
      }
    }
  }

  .category-filters {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
`;

const FilterPill = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? '#1a1918' : '#e8e3d9')};
  background-color: ${({ $active }) => ($active ? '#1a1918' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#fffdf9' : '#55524d')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1918;
  }
`;

const PagesTableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #faf8f5;
    padding: 14px 20px;
    text-align: left;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #77736c;
    font-weight: 700;
    border-bottom: 1px solid #e8e3d9;
  }

  td {
    padding: 16px 20px;
    border-bottom: 1px solid #e8e3d9;
    font-size: 0.9rem;
    color: #1a1918;
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #fdfbf7;
  }
`;

const PageTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .icon-wrapper {
    width: 38px;
    height: 38px;
    border-radius: 6px;
    background: #faf8f5;
    color: #c9a45c;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e8e3d9;
    flex-shrink: 0;
  }

  .details {
    .name {
      font-weight: 600;
      color: #1a1918;
      margin-bottom: 2px;
    }
    .slug {
      font-size: 0.78rem;
      color: #8c877b;
      font-family: monospace;
    }
  }
`;

const StatusBadge = styled.span<{ $status: 'PUBLISHED' | 'DRAFT' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${({ $status }) => ($status === 'PUBLISHED' ? '#e8f5e9' : '#fff8e1')};
  color: ${({ $status }) => ($status === 'PUBLISHED' ? '#2e7d32' : '#f57f17')};
  border: 1px solid ${({ $status }) => ($status === 'PUBLISHED' ? '#a5d6a7' : '#ffe082')};
`;

const ActionButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid #e8e3d9;
  background: #ffffff;
  color: #1a1918;
  transition: all 0.2s ease;

  &:hover {
    background: #1a1918;
    color: #fffdf9;
    border-color: #1a1918;
  }

  &.edit-btn {
    background: #1a1918;
    color: #fffdf9;
    border-color: #1a1918;

    &:hover {
      background: #c9a45c;
      color: #1a1918;
      border-color: #c9a45c;
    }
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 8px;
  max-width: 520px;
  width: 100%;
  padding: 28px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
`;

const CORE_SLUGS = ['home', 'about-us', 'contact-us', 'custom-jewellery', 'customise', 'blog', 'diamonds', 'ring-size-guide'];
const COLLECTION_SLUGS = ['rings', 'earrings', 'necklaces', 'bracelets', 'pendants'];
const POLICY_SLUGS = [
  'shipping-delivery',
  'returns-refunds',
  'lifetime-warranty',
  'sustainability',
  'price-match',
  'insurance',
  'faq',
  'sale-exclusions',
  'terms-of-service',
  'privacy-policy',
  'billing-terms-conditions',
];

export const AdminPagesDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'CORE' | 'COLLECTIONS' | 'POLICIES' | 'CUSTOM'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const data = await api.getAllPages();
      setPages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching pages list:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) return;

    setCreating(true);
    try {
      await api.createPage({
        title: newTitle.trim(),
        slug: newSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        status: 'PUBLISHED',
      });
      setCreateModalOpen(false);
      setNewTitle('');
      setNewSlug('');
      await fetchPages();
      navigate(`${PRIVATE_ADMIN_PATH}/pages/${newSlug}/edit`);
    } catch (err: any) {
      alert(`Error creating page: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCustomPage = async (slug: string, title: string) => {
    if (CORE_SLUGS.includes(slug) || COLLECTION_SLUGS.includes(slug) || POLICY_SLUGS.includes(slug)) {
      alert('Default system pages cannot be deleted.');
      return;
    }
    if (window.confirm(`Are you sure you want to permanently delete "${title}" (/pages/${slug})?`)) {
      try {
        await api.deletePage(slug);
        await fetchPages();
      } catch (err: any) {
        alert(`Failed to delete page: ${err.message}`);
      }
    }
  };

  const getPageCategory = (slug: string) => {
    if (CORE_SLUGS.includes(slug)) return 'CORE';
    if (COLLECTION_SLUGS.includes(slug)) return 'COLLECTIONS';
    if (POLICY_SLUGS.includes(slug)) return 'POLICIES';
    return 'CUSTOM';
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const pageCat = getPageCategory(page.slug);
    const matchesCategory = categoryFilter === 'ALL' || pageCat === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || page.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const publishedCount = pages.filter((p) => p.status === 'PUBLISHED').length;
  const draftCount = pages.filter((p) => p.status === 'DRAFT').length;
  const customCount = pages.filter((p) => getPageCategory(p.slug) === 'CUSTOM').length;

  return (
    <DashboardContainer>
      <HeaderBanner>
        <div className="title-area">
          <h1>Website Pages & CMS Editor</h1>
          <p>Manage content, visual layouts, hero banners, and SEO meta tags for all 22+ storefront pages.</p>
        </div>
        <button className="create-btn" onClick={() => setCreateModalOpen(true)}>
          <Plus size={16} /> + ADD NEW PAGE
        </button>
      </HeaderBanner>

      {/* QUICK STATS */}
      <StatsGrid>
        <StatCard>
          <div className="stat-icon"><Globe size={20} /></div>
          <div>
            <div className="stat-num">{pages.length}</div>
            <div className="stat-label">Total Pages</div>
          </div>
        </StatCard>
        <StatCard>
          <div className="stat-icon" style={{ color: '#2e7d32', borderColor: '#a5d6a7' }}><CheckCircle size={20} /></div>
          <div>
            <div className="stat-num">{publishedCount}</div>
            <div className="stat-label">Published Live</div>
          </div>
        </StatCard>
        <StatCard>
          <div className="stat-icon" style={{ color: '#f57f17', borderColor: '#ffe082' }}><Clock size={20} /></div>
          <div>
            <div className="stat-num">{draftCount}</div>
            <div className="stat-label">Draft / In Review</div>
          </div>
        </StatCard>
        <StatCard>
          <div className="stat-icon" style={{ color: '#8c7647', borderColor: '#e8e3d9' }}><Sparkles size={20} /></div>
          <div>
            <div className="stat-num">{customCount}</div>
            <div className="stat-label">Custom CMS Pages</div>
          </div>
        </StatCard>
      </StatsGrid>

      {/* TOOLBAR */}
      <ToolbarRow>
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search pages by title or URL slug (e.g. about, contact, rings, warranty)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          <FilterPill $active={categoryFilter === 'ALL'} onClick={() => setCategoryFilter('ALL')}>
            🌟 ALL ({pages.length})
          </FilterPill>
          <FilterPill $active={categoryFilter === 'CORE'} onClick={() => setCategoryFilter('CORE')}>
            🏛️ Core Pages ({pages.filter((p) => getPageCategory(p.slug) === 'CORE').length})
          </FilterPill>
          <FilterPill $active={categoryFilter === 'COLLECTIONS'} onClick={() => setCategoryFilter('COLLECTIONS')}>
            💍 Collections ({pages.filter((p) => getPageCategory(p.slug) === 'COLLECTIONS').length})
          </FilterPill>
          <FilterPill $active={categoryFilter === 'POLICIES'} onClick={() => setCategoryFilter('POLICIES')}>
            📜 Customer Care ({pages.filter((p) => getPageCategory(p.slug) === 'POLICIES').length})
          </FilterPill>
          {customCount > 0 && (
            <FilterPill $active={categoryFilter === 'CUSTOM'} onClick={() => setCategoryFilter('CUSTOM')}>
              ✨ Custom ({customCount})
            </FilterPill>
          )}
        </div>
      </ToolbarRow>

      {/* PAGES TABLE */}
      <PagesTableContainer>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#77736c' }}>
            Loading storefront pages...
          </div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Page Name & URL Route</th>
                <th>Category</th>
                <th>Status</th>
                <th>Sections</th>
                <th>Last Updated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => {
                const publicUrl = page.slug === 'home' ? '/' : `/${page.slug}`;
                const cat = getPageCategory(page.slug);
                const isCustom = cat === 'CUSTOM';

                return (
                  <tr key={page.id || page.slug}>
                    <td>
                      <PageTitleGroup>
                        <div className="icon-wrapper">
                          {cat === 'CORE' && <Globe size={18} />}
                          {cat === 'COLLECTIONS' && <ShoppingBag size={18} />}
                          {cat === 'POLICIES' && <ShieldCheck size={18} />}
                          {cat === 'CUSTOM' && <Sparkles size={18} />}
                        </div>
                        <div className="details">
                          <div className="name">{page.title}</div>
                          <div className="slug">{publicUrl}</div>
                        </div>
                      </PageTitleGroup>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em', color: '#8c7647', textTransform: 'uppercase' }}>
                        {cat === 'CORE' ? 'Core Atelier' : cat === 'COLLECTIONS' ? 'Collection' : cat === 'POLICIES' ? 'Policy / Care' : 'Custom'}
                      </span>
                    </td>
                    <td>
                      <StatusBadge $status={page.status || 'PUBLISHED'}>
                        <CheckCircle size={12} /> {page.status || 'PUBLISHED'}
                      </StatusBadge>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: '#55524d' }}>
                        {page._count?.sections ?? (page.sections?.length || 0)} Sections
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: '#8c877b' }}>
                        {page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : 'Today'}
                      </span>
                    </td>
                    <td>
                      <ActionButtonGroup style={{ justifyContent: 'flex-end' }}>
                        <ActionBtn
                          to={`${PRIVATE_ADMIN_PATH}/pages/${page.slug}/edit`}
                          className="edit-btn"
                        >
                          <Edit size={13} /> EDIT CONTENT
                        </ActionBtn>
                        <ActionBtn
                          to={`${PRIVATE_ADMIN_PATH}/pages/${page.slug}/edit?tab=seo`}
                        >
                          <FileText size={13} /> SEO
                        </ActionBtn>
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: '0.78rem',
                            color: '#8c877b',
                            textDecoration: 'none',
                            padding: '6px 10px',
                            border: '1px solid #e8e3d9',
                            borderRadius: 4,
                            background: '#fff',
                          }}
                        >
                          <ExternalLink size={13} /> LIVE
                        </a>
                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCustomPage(page.slug, page.title)}
                            style={{
                              border: '1px solid #fca5a5',
                              background: '#fff5f5',
                              color: '#c53030',
                              borderRadius: 4,
                              padding: '6px 8px',
                              cursor: 'pointer',
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </ActionButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </PagesTableContainer>

      {/* CREATE NEW PAGE MODAL */}
      {createModalOpen && (
        <ModalOverlay onClick={() => setCreateModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>
                Create New Storefront Page
              </h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#19202a' }}>
                  Page Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Black Friday Special Event"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                  }}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e8e3d9', borderRadius: 6, fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: '#19202a' }}>
                  URL Route Slug
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#faf8f5', border: '1px solid #e8e3d9', borderRadius: 6, padding: '0 10px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#888' }}>/</span>
                  <input
                    type="text"
                    required
                    placeholder="black-friday-special-event"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                    style={{ flex: 1, padding: '10px 6px', border: 'none', background: 'transparent', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  style={{ padding: '10px 18px', background: '#f5f3ef', border: '1px solid #e8e3d9', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  style={{ padding: '10px 20px', background: '#19202a', color: '#fff', border: 'none', borderRadius: 6, fontSize: '0.85rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  {creating ? 'Creating...' : 'Create & Open Editor'}
                </button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};
