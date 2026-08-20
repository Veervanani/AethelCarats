import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Plus, Edit2, Copy, Trash2, X, Sliders, Shield, RefreshCw, FileSpreadsheet, TrendingUp, TrendingDown, DollarSign, Percent, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { Diamond } from '../../types';
import { AdminPageHeader, AdminButton } from '../../components/admin/AdminUI';
import { DiamondExcelImportModal } from '../../components/admin/diamonds/DiamondExcelImportModal';

// Modal styling for Bulk Price Adjustment
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const ModalCard = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 540px;
  border: 1px solid #d9d3c7;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  padding: 24px;
  position: relative;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.6rem;
    color: #1f1f1f;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.85rem;
    color: #6b6b6b;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;

const PriceRuleBanner = styled.div`
  background: #f9f7f2;
  border: 1px solid #c9a45c;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: #1f1f1f;

  strong {
    color: #b8944d;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.2rem;
    color: #1f1f1f;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid #d9d3c7;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: ${({ $active }) => ($active ? '#1f1f1f' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f1f1f')};
  border: 1px solid ${({ $active }) => ($active ? '#1f1f1f' : 'transparent')};
  border-bottom: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    color: ${({ $active }) => ($active ? '#ffffff' : '#b8944d')};
  }
`;

const CreateBtn = styled.button`
  background-color: #1f1f1f;
  color: #ffffff;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b8944d;
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  background-color: #ffffff;
  padding: 16px;
  border: 1px solid #d9d3c7;

  input, select {
    padding: 8px 12px;
    border: 1px solid #d9d3c7;
    outline: none;
    font-size: 0.85rem;
    color: #1f1f1f;
    max-width: 100%;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;

    input, select, button {
      width: 100%;
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #d9d3c7;
    font-size: 0.85rem;
    color: #1f1f1f;
  }

  th {
    background-color: #f9f7f2;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${({ $status }) =>
    $status === 'AVAILABLE' ? '#e8f5e9' : $status === 'SOLD' ? '#ffebee' : '#fff3e0'};
  color: ${({ $status }) =>
    $status === 'AVAILABLE' ? '#2e7d32' : $status === 'SOLD' ? '#c62828' : '#ef6c00'};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalBox = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 750px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  border: 1px solid #d9d3c7;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 1.4rem;
    font-family: ${({ theme }) => theme.fonts.heading};
    color: #1f1f1f;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #1f1f1f;
  }

  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #d9d3c7;
    font-size: 0.85rem;
    color: #1f1f1f;
    outline: none;

    &:focus {
      border-color: #c9a45c;
    }
  }
`;

const ConfigCard = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 24px;
  margin-bottom: 24px;

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.3rem;
    color: #1f1f1f;
    margin-bottom: 16px;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #f9f7f2;
  border: 1px solid #d9d3c7;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f1f1f;

  button {
    background: none;
    border: none;
    color: #6b6b6b;
    cursor: pointer;

    &:hover {
      color: #d32f2f;
    }
  }
`;

const AddInputRow = styled.div`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #d9d3c7;
    font-size: 0.85rem;
  }

  button {
    padding: 8px 16px;
    background-color: #1f1f1f;
    color: #ffffff;
    border: none;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      background-color: #b8944d;
    }
  }
`;

export const AdminDiamondManagerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'FILTERS'>('INVENTORY');
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [editingDiamond, setEditingDiamond] = useState<Partial<Diamond> | null>(null);

  // Bulk Price Adjustment States
  const [priceAction, setPriceAction] = useState<'INCREASE' | 'DECREASE'>('INCREASE');
  const [priceType, setPriceType] = useState<'PERCENTAGE' | 'FIXED_AMOUNT'>('PERCENTAGE');
  const [priceValue, setPriceValue] = useState<string>('5');
  const [priceScope, setPriceScope] = useState<'ALL' | 'WHITE' | 'FANCY' | 'LAB_GROWN' | 'NATURAL'>('ALL');
  const [priceLoading, setPriceLoading] = useState(false);
  const [activePriceRule, setActivePriceRule] = useState<any>(null);

  // Dynamic Filter Configuration State
  const [filterConfig, setFilterConfig] = useState<any>({
    shapes: [],
    colors: [],
    fancyColors: [],
    overtones: [],
    intensities: [],
    clarities: [],
    certifications: [],
  });

  const [totalCount, setTotalCount] = useState<number>(0);
  const [newShapeName, setNewShapeName] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newCertName, setNewCertName] = useState('');

  const fetchDiamonds = () => {
    api.getDiamonds({ search, type: type === 'ALL' ? undefined : type, status: status === 'ALL' ? undefined : status, limit: 3000 })
      .then((data) => {
        setDiamonds(data.diamonds || []);
        setTotalCount(data.pagination?.total || data.diamonds?.length || 0);
      })
      .catch(console.error);
  };

  const fetchConfig = () => {
    api.getDiamondFilterConfig().then((cfg) => {
      if (cfg) setFilterConfig(cfg);
    }).catch(console.error);
  };

  const fetchPriceRule = () => {
    api.getBulkPriceRule().then((rule) => {
      if (rule) setActivePriceRule(rule);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchDiamonds();
    fetchConfig();
    fetchPriceRule();
  }, [type, status]);

  const handleApplyBulkPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(priceValue);
    if (isNaN(val) || val <= 0) {
      alert('Please enter a valid price adjustment amount greater than 0.');
      return;
    }

    const actionText = priceAction === 'INCREASE' ? 'INCREASE' : 'DECREASE';
    const typeText = priceType === 'PERCENTAGE' ? `${val}%` : `$${val}`;
    const scopeText = priceScope === 'ALL' ? 'ALL diamonds' : `${priceScope} diamonds`;

    if (!window.confirm(`⚠️ Are you sure you want to ${actionText} prices by ${typeText} for ${scopeText}?\n\nThis operation will permanently update all matching diamond prices in the database.`)) {
      return;
    }

    setPriceLoading(true);
    try {
      const res = await api.bulkPriceAdjust({
        action: priceAction,
        type: priceType,
        value: val,
        scope: priceScope
      });
      alert(`✅ ${res.message}`);
      if (res.rule) setActivePriceRule(res.rule);
      setIsPriceModalOpen(false);
      fetchDiamonds();
    } catch (err: any) {
      alert(err.response?.data?.error || err.response?.data?.message || 'Failed to update diamond prices');
    } finally {
      setPriceLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await api.updateDiamondStatus(id, { status: newStatus });
    fetchDiamonds();
  };

  const handleOpenCreate = () => {
    setEditingDiamond({
      diamondId: `D${Math.floor(10000 + Math.random() * 90000)}`,
      diamondType: 'NATURAL',
      shape: filterConfig.shapes[0]?.name || 'Round',
      carat: 1.5,
      color: filterConfig.colors[0] || 'D',
      clarity: filterConfig.clarities[0] || 'VVS1',
      cut: 'EXCELLENT',
      polish: 'EXCELLENT',
      symmetry: 'EXCELLENT',
      fluorescence: 'NONE',
      lab: filterConfig.certifications[0] || 'GIA',
      price: 6500,
      status: 'AVAILABLE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: Diamond) => {
    setEditingDiamond({ ...d });
    setIsModalOpen(true);
  };

  const handleDuplicate = async (id: string) => {
    try {
      await api.duplicateDiamond(id);
      fetchDiamonds();
    } catch (e) {
      alert('Error duplicating diamond');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete or disable this diamond record?')) {
      await api.deleteDiamond(id);
      fetchDiamonds();
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('⚠️ Are you sure you want to REMOVE ALL DIAMONDS from the database?\n\nThis will permanently delete all current diamonds so you can add your new inventory.')) {
      return;
    }
    try {
      const res = await api.deleteAllDiamonds();
      alert(`Done! ${res.message}`);
      fetchDiamonds();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error clearing diamonds');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDiamond || !editingDiamond.carat || !editingDiamond.price) return;

    try {
      if (editingDiamond.id) {
        await api.updateDiamond(editingDiamond.id, editingDiamond);
      } else {
        await api.createDiamond(editingDiamond);
      }
      setIsModalOpen(false);
      fetchDiamonds();
    } catch (err) {
      console.error(err);
      alert('Failed to save diamond');
    }
  };

  // Filter Configuration Management Handlers
  const handleSaveConfig = async (newCfg: any) => {
    setFilterConfig(newCfg);
    await api.updateDiamondFilterConfig(newCfg);
  };

  const handleAddShape = () => {
    if (!newShapeName.trim()) return;
    const name = newShapeName.trim();
    const updatedShapes = [
      ...filterConfig.shapes,
      { id: `shape-${Date.now()}`, name, value: name, displayLabel: name.toUpperCase(), status: 'ACTIVE' },
    ];
    handleSaveConfig({ ...filterConfig, shapes: updatedShapes });
    setNewShapeName('');
  };

  const handleRemoveShape = (id: string) => {
    const updatedShapes = filterConfig.shapes.filter((s: any) => s.id !== id);
    handleSaveConfig({ ...filterConfig, shapes: updatedShapes });
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    const val = newColorName.trim().toUpperCase();
    if (!filterConfig.colors.includes(val)) {
      handleSaveConfig({ ...filterConfig, colors: [...filterConfig.colors, val] });
    }
    setNewColorName('');
  };

  const handleRemoveColor = (col: string) => {
    handleSaveConfig({ ...filterConfig, colors: filterConfig.colors.filter((c: string) => c !== col) });
  };

  const handleAddCert = () => {
    if (!newCertName.trim()) return;
    const val = newCertName.trim().toUpperCase();
    if (!filterConfig.certifications.includes(val)) {
      handleSaveConfig({ ...filterConfig, certifications: [...filterConfig.certifications, val] });
    }
    setNewCertName('');
  };

  const handleRemoveCert = (cert: string) => {
    handleSaveConfig({ ...filterConfig, certifications: filterConfig.certifications.filter((c: string) => c !== cert) });
  };

  return (
    <div>
      <AdminPageHeader
        title="Diamond Vault"
        description="Manage global diamond inventory, certificates, pricing, and dynamic diamond filter configurations."
        actions={
          activeTab === 'INVENTORY' ? (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <AdminButton $variant="secondary" onClick={() => setIsPriceModalOpen(true)} icon={<TrendingUp size={14} />}>
                Price Up / Down (Bulk)
              </AdminButton>
              <AdminButton $variant="secondary" onClick={() => setIsImportModalOpen(true)} icon={<FileSpreadsheet size={14} />}>
                Import Diamond Excel
              </AdminButton>
              {diamonds.length > 0 && (
                <AdminButton $variant="secondary" onClick={handleClearAll} icon={<Trash2 size={14} />}>
                  Clear All Diamonds ({totalCount || diamonds.length})
                </AdminButton>
              )}
              <AdminButton $variant="gold" onClick={handleOpenCreate} icon={<Plus size={14} />}>
                Add Diamond
              </AdminButton>
            </div>
          ) : undefined
        }
      />

      {activePriceRule && (
        <PriceRuleBanner>
          <CheckCircle2 size={18} color="#c9a45c" />
          <div>
            <strong>Active Global Price Rule Stored in Database:</strong>{' '}
            {activePriceRule.action === 'INCREASE' ? 'Increased (+)' : 'Decreased (-)'} by{' '}
            <strong>{activePriceRule.type === 'PERCENTAGE' ? `${activePriceRule.value}%` : `$${activePriceRule.value}`}</strong> on{' '}
            <strong>{activePriceRule.scope || 'ALL'}</strong> diamonds ({activePriceRule.affectedRows ?? totalCount} diamonds updated at{' '}
            {activePriceRule.updatedAt ? new Date(activePriceRule.updatedAt).toLocaleString() : 'recently'}).
          </div>
        </PriceRuleBanner>
      )}

      <TabBar>
        <TabBtn $active={activeTab === 'INVENTORY'} onClick={() => setActiveTab('INVENTORY')}>
          <Shield size={16} /> DIAMOND INVENTORY ({totalCount || diamonds.length})
        </TabBtn>
        <TabBtn $active={activeTab === 'FILTERS'} onClick={() => setActiveTab('FILTERS')}>
          <Sliders size={16} /> DYNAMIC FILTER & SHAPE MANAGER
        </TabBtn>
      </TabBar>

      {/* TAB 1: DIAMOND INVENTORY TABLE */}
      {activeTab === 'INVENTORY' && (
        <>
          <FilterBar>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              <Search size={16} color="#6b6b6b" />
              <input
                type="text"
                placeholder="Search SKU, Certificate #, Stock ID, Shape..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchDiamonds()}
                style={{ flex: 1 }}
              />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="ALL">ALL TYPES</option>
              <option value="NATURAL">NATURAL</option>
              <option value="LAB_GROWN">LAB-GROWN</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ALL">ALL STATUSES</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="RESERVED">RESERVED</option>
              <option value="SOLD">SOLD</option>
              <option value="HIDDEN">HIDDEN</option>
            </select>

            <button
              onClick={handleClearAll}
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                height: '38px'
              }}
              title="Delete all diamond records from database"
            >
              <Trash2 size={14} /> DELETE ALL DIAMONDS ({totalCount || diamonds.length})
            </button>
          </FilterBar>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>DIAMOND ID</th>
                  <th>TYPE</th>
                  <th>SHAPE</th>
                  <th>CARAT</th>
                  <th>COLOR/CLARITY</th>
                  <th>LAB</th>
                  <th>PRICE ($)</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {diamonds.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <strong>{d.diamondId}</strong>
                      <div style={{ fontSize: '0.72rem', color: '#6b6b6b' }}>SKU: {d.sku || d.stockId || 'N/A'}</div>
                    </td>
                    <td>{d.diamondType}</td>
                    <td>{d.shape}</td>
                    <td>{d.carat} ct</td>
                    <td>{d.color} / {d.clarity}</td>
                    <td>{d.lab || 'CERTIFIED'}</td>
                    <td><strong>${(d.price || 0).toLocaleString()}</strong></td>
                    <td>
                      <select
                        value={d.status}
                        onChange={(e) => handleStatusChange(d.id, e.target.value)}
                        style={{ padding: '2px 4px', fontSize: '0.75rem', border: '1px solid #d9d3c7' }}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="RESERVED">RESERVED</option>
                        <option value="SOLD">SOLD</option>
                        <option value="HIDDEN">HIDDEN</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => handleOpenEdit(d)} title="Edit Diamond" style={{ cursor: 'pointer' }}>
                          <Edit2 size={16} color="#1f1f1f" />
                        </button>
                        <button onClick={() => handleDuplicate(d.id)} title="Duplicate Diamond" style={{ cursor: 'pointer' }}>
                          <Copy size={16} color="#b8944d" />
                        </button>
                        <button onClick={() => handleDelete(d.id)} title="Delete/Disable Diamond" style={{ cursor: 'pointer' }}>
                          <Trash2 size={16} color="#d32f2f" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </>
      )}

      {/* TAB 2: DYNAMIC FILTER & SHAPE MANAGER */}
      {activeTab === 'FILTERS' && (
        <div>
          {/* SHAPES MANAGER */}
          <ConfigCard>
            <h3>DIAMOND SHAPES MANAGEMENT</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b6b6b', marginBottom: 16 }}>
              Add, edit, or disable diamond shapes. Shapes created here automatically appear on the storefront Diamond Vault.
            </p>
            <div className="tag-list">
              {filterConfig.shapes.map((s: any) => (
                <TagChip key={s.id}>
                  <span>{s.name}</span>
                  <button onClick={() => handleRemoveShape(s.id)} title="Remove Shape">
                    <X size={14} />
                  </button>
                </TagChip>
              ))}
            </div>
            <AddInputRow>
              <input
                type="text"
                placeholder="New shape name (e.g. Baguette, Hexagon)"
                value={newShapeName}
                onChange={(e) => setNewShapeName(e.target.value)}
              />
              <button onClick={handleAddShape}>+ ADD SHAPE</button>
            </AddInputRow>
          </ConfigCard>

          {/* WHITE COLOR GRADES MANAGER */}
          <ConfigCard>
            <h3>WHITE COLOR GRADES MANAGEMENT</h3>
            <div className="tag-list">
              {filterConfig.colors.map((c: string) => (
                <TagChip key={c}>
                  <span>Grade {c}</span>
                  <button onClick={() => handleRemoveColor(c)}>
                    <X size={14} />
                  </button>
                </TagChip>
              ))}
            </div>
            <AddInputRow>
              <input
                type="text"
                placeholder="New color grade (e.g. R, S)"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
              />
              <button onClick={handleAddColor}>+ ADD COLOR</button>
            </AddInputRow>
          </ConfigCard>

          {/* CERTIFICATIONS MANAGER */}
          <ConfigCard>
            <h3>CERTIFICATION LABORATORIES MANAGEMENT</h3>
            <div className="tag-list">
              {filterConfig.certifications.map((cert: string) => (
                <TagChip key={cert}>
                  <span>{cert}</span>
                  <button onClick={() => handleRemoveCert(cert)}>
                    <X size={14} />
                  </button>
                </TagChip>
              ))}
            </div>
            <AddInputRow>
              <input
                type="text"
                placeholder="New certification lab (e.g. EGL, CGL)"
                value={newCertName}
                onChange={(e) => setNewCertName(e.target.value)}
              />
              <button onClick={handleAddCert}>+ ADD CERTIFICATION</button>
            </AddInputRow>
          </ConfigCard>
        </div>
      )}

      {/* CREATE / EDIT DIAMOND MODAL */}
      {isModalOpen && editingDiamond && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{editingDiamond.id ? 'EDIT DIAMOND' : 'ADD NEW DIAMOND'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </ModalHeader>

            <form onSubmit={handleSave}>
              <FormGrid>
                <FormGroup>
                  <label>Diamond ID / Stock #</label>
                  <input
                    type="text"
                    value={editingDiamond.diamondId || ''}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, diamondId: e.target.value })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>SKU</label>
                  <input
                    type="text"
                    value={editingDiamond.sku || ''}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, sku: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Diamond Type</label>
                  <select
                    value={editingDiamond.diamondType || 'NATURAL'}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, diamondType: e.target.value })}
                  >
                    <option value="NATURAL">NATURAL</option>
                    <option value="LAB_GROWN">LAB-GROWN</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Shape</label>
                  <select
                    value={editingDiamond.shape || 'Round'}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, shape: e.target.value })}
                  >
                    {filterConfig.shapes.map((s: any) => (
                      <option key={s.id || s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Carat Weight</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingDiamond.carat || ''}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, carat: parseFloat(e.target.value) })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Color Grade</label>
                  <select
                    value={editingDiamond.color || 'D'}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, color: e.target.value })}
                  >
                    {filterConfig.colors.map((c: string) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Clarity</label>
                  <select
                    value={editingDiamond.clarity || 'VVS1'}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, clarity: e.target.value })}
                  >
                    {filterConfig.clarities.map((c: string) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Certification Lab</label>
                  <select
                    value={editingDiamond.lab || 'GIA'}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, lab: e.target.value })}
                  >
                    {filterConfig.certifications.map((cert: string) => (
                      <option key={cert} value={cert}>{cert}</option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Certificate Number</label>
                  <input
                    type="text"
                    value={editingDiamond.certificateNumber || ''}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, certificateNumber: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Price ($ USD)</label>
                  <input
                    type="number"
                    step="1"
                    value={editingDiamond.price || ''}
                    onChange={(e) => setEditingDiamond({ ...editingDiamond, price: parseFloat(e.target.value) })}
                    required
                  />
                </FormGroup>
              </FormGrid>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 20px', border: '1px solid #d9d3c7', background: 'none', cursor: 'pointer' }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', backgroundColor: '#1f1f1f', color: '#ffffff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  SAVE DIAMOND
                </button>
              </div>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}

      <DiamondExcelImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={fetchDiamonds}
      />

      {isPriceModalOpen && (
        <ModalBackdrop onClick={() => setIsPriceModalOpen(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsPriceModalOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} color="#1f1f1f" />
            </button>
            <h2>Bulk Price Adjustment (Price Up / Down)</h2>
            <p>
              Increase or decrease prices for all or selected diamond categories in your database. All price changes are persisted directly into the database.
            </p>

            <form onSubmit={handleApplyBulkPrice}>
              <FormGrid>
                <FormGroup>
                  <label>Adjustment Direction</label>
                  <select
                    value={priceAction}
                    onChange={(e: any) => setPriceAction(e.target.value)}
                  >
                    <option value="INCREASE">📈 INCREASE PRICE (+)</option>
                    <option value="DECREASE">📉 DECREASE PRICE (-)</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Adjustment Method</label>
                  <select
                    value={priceType}
                    onChange={(e: any) => setPriceType(e.target.value)}
                  >
                    <option value="PERCENTAGE">٪ PERCENTAGE (%)</option>
                    <option value="FIXED_AMOUNT">💲 FIXED AMOUNT ($)</option>
                  </select>
                </FormGroup>
              </FormGrid>

              <FormGrid style={{ marginTop: 16 }}>
                <FormGroup>
                  <label>Amount or Percentage Value</label>
                  <input
                    type="number"
                    step="any"
                    min="0.01"
                    placeholder={priceType === 'PERCENTAGE' ? 'e.g. 5 (for 5%)' : 'e.g. 100 (for $100)'}
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Target Diamond Scope</label>
                  <select
                    value={priceScope}
                    onChange={(e: any) => setPriceScope(e.target.value)}
                  >
                    <option value="ALL">ALL DIAMONDS ({totalCount})</option>
                    <option value="WHITE">WHITE DIAMONDS ONLY</option>
                    <option value="FANCY">FANCY COLOR DIAMONDS ONLY</option>
                    <option value="LAB_GROWN">LAB-GROWN DIAMONDS ONLY</option>
                    <option value="NATURAL">NATURAL DIAMONDS ONLY</option>
                  </select>
                </FormGroup>
              </FormGrid>

              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsPriceModalOpen(false)}
                  style={{ padding: '10px 20px', border: '1px solid #d9d3c7', background: 'none', cursor: 'pointer' }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={priceLoading}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: priceAction === 'INCREASE' ? '#1f1f1f' : '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: priceLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {priceLoading ? 'UPDATING DATABASE...' : `APPLY ${priceAction} (${priceType === 'PERCENTAGE' ? `${priceValue}%` : `$${priceValue}`})`}
                </button>
              </div>
            </form>
          </ModalCard>
        </ModalBackdrop>
      )}
    </div>
  );
};
