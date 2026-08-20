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
  Sparkles
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
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .title-area {
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      font-weight: 500;
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
    border-radius: 4px;
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #c9a45c;
      color: #1a1918;
    }
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
      background: #fffdf9;
      border: 1px solid #e8e3d9;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #1a1918;
      outline: none;

      &:focus {
        border-color: #c9a45c;
      }
    }
  }

  .status-filters {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const FilterPill = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? '#1a1918' : '#e8e3d9')};
  background-color: ${({ $active }) => ($active ? '#1a1918' : '#fffdf9')};
  color: ${({ $active }) => ($active ? '#fffdf9' : '#55524d')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a1918;
  }
`;

const PagesTableContainer = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  overflow-x: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #f7f6f2;
    padding: 14px 20px;
    text-align: left;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #77736c;
    font-weight: 600;
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
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #f7f6f2;
    color: #c9a45c;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e8e3d9;
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
  background: #fffdf9;
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

export const AdminPagesDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const data = await api.getAllPages();
      setPages(data);
    } catch (e) {
      console.error('Error fetching pages list:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewPage = async () => {
    const title = prompt('Enter New Page Title (e.g. Terms of Sale):');
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    try {
      await api.createPage({ title, slug, status: 'PUBLISHED' });
      await fetchPages();
      navigate(`${PRIVATE_ADMIN_PATH}/pages/${slug}/edit`);
    } catch (e) {
      alert('Error creating page');
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardContainer>
      <HeaderBanner>
        <div className="title-area">
          <h1>22 Pages Manager</h1>
          <p>Central content, layout section, and SEO manager for all public storefront pages.</p>
        </div>
        <button className="create-btn" onClick={handleCreateNewPage}>
          <Plus size={16} /> ADD NEW PAGE
        </button>
      </HeaderBanner>

      <ToolbarRow>
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search pages by title or URL slug (e.g., contact, rings, warranty)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filters">
          <FilterPill $active={statusFilter === 'ALL'} onClick={() => setStatusFilter('ALL')}>
            ALL ({pages.length})
          </FilterPill>
          <FilterPill
            $active={statusFilter === 'PUBLISHED'}
            onClick={() => setStatusFilter('PUBLISHED')}
          >
            PUBLISHED ({pages.filter((p) => p.status === 'PUBLISHED').length})
          </FilterPill>
          <FilterPill
            $active={statusFilter === 'DRAFT'}
            onClick={() => setStatusFilter('DRAFT')}
          >
            DRAFT ({pages.filter((p) => p.status === 'DRAFT').length})
          </FilterPill>
        </div>
      </ToolbarRow>

      <PagesTableContainer>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#77736c' }}>
            Loading public pages...
          </div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Page Name & Route Slug</th>
                <th>Status</th>
                <th>Sections</th>
                <th>Last Updated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => {
                const publicUrl = page.slug === 'home' ? '/' : `/${page.slug}`;
                return (
                  <tr key={page.id || page.slug}>
                    <td>
                      <PageTitleGroup>
                        <div className="icon-wrapper">
                          <Globe size={18} />
                        </div>
                        <div className="details">
                          <div className="name">{page.title}</div>
                          <div className="slug">{publicUrl}</div>
                        </div>
                      </PageTitleGroup>
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
                          <Edit size={13} /> EDIT PAGE
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
                          className="action-link"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: '0.78rem',
                            color: '#8c877b',
                            textDecoration: 'none',
                            marginLeft: 6,
                          }}
                        >
                          <ExternalLink size={13} /> VIEW LIVE
                        </a>
                      </ActionButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </PagesTableContainer>
    </DashboardContainer>
  );
};
