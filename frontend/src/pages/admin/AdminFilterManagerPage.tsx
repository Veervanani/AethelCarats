import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Upload,
  Layers,
  Settings,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminBadge,
} from '../../components/admin/AdminUI';

const FILTER_TYPES = [
  'Select',
  'Multi Select',
  'Dropdown',
  'Checkbox',
  'Swatch/List',
  'Shape Grid',
  'Icon + Select',
  'Price Range',
  'Numeric Range',
];

const JEWELLERY_TYPES_LIST = ['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Pendants', 'Diamonds/Jewelry'];

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 22, 26, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalCard = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 8px;
  width: 100%;
  max-width: 680px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 32px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #1f1f1f;
    margin: 0 0 20px 0;
  }

  .field-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 16px;
  }

  .field {
    margin-bottom: 16px;

    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #1f1f1f;
      margin-bottom: 6px;
    }
  }

  .btn-row {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e8e3d9;
  }
`;

const SectionHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 32px 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8e3d9;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #1f1f1f;
    margin: 0;
  }

  span.badge {
    background: #faf5eb;
    color: #c9a45c;
    border: 1px solid #e8dcc4;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

const FilterCardWrapper = styled.div<{ $disabled?: boolean }>`
  background: #ffffff;
  border: 1px solid ${({ $disabled }) => ($disabled ? '#e5e0d8' : '#d9d3c7')};
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  opacity: ${({ $disabled }) => ($disabled ? 0.65 : 1)};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    border-color: #c9a45c;
  }
`;

const FilterCardHeader = styled.div`
  background: #faf8f5;
  border-bottom: 1px solid #e8e3d9;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  .left-meta {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-box {
      width: 38px;
      height: 38px;
      background: #ffffff;
      border: 1px solid #e8e3d9;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;

      h3 {
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: #1f1f1f;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .sub-info {
        font-size: 0.78rem;
        color: #77736c;
        display: flex;
        align-items: center;
        gap: 10px;

        span.key-tag {
          font-family: monospace;
          background: #eae5db;
          color: #4a4a4a;
          padding: 1px 6px;
          border-radius: 3px;
          font-size: 0.72rem;
        }
      }
    }
  }

  .right-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const OptionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #ffffff;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #77736c;
    padding: 10px 16px;
    border-bottom: 1px solid #f0ecf6;
    text-align: left;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f5f2eb;
    font-size: 0.83rem;
    color: #1f1f1f;
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const GroupSubHeader = styled.div`
  background: #f7f4ee;
  border-top: 1px solid #e8e3d9;
  border-bottom: 1px solid #e8e3d9;
  padding: 8px 16px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c9a45c;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AdminFilterManagerPage: React.FC = () => {
  const toast = useToast();

  const [filters, setFilters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Filter Config
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [editingFilterId, setEditingFilterId] = useState<string | null>(null);
  const [filterName, setFilterName] = useState('');
  const [filterKey, setFilterKey] = useState('');
  const [customerLabel, setCustomerLabel] = useState('');
  const [filterType, setFilterType] = useState('Multi Select');
  const [applicableJewelleryTypes, setApplicableJewelleryTypes] = useState('All');
  const [isEnabled, setIsEnabled] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  // Modal State for Filter Options Manager
  const [optionsModalFilter, setOptionsModalFilter] = useState<any | null>(null);
  const [editingOption, setEditingOption] = useState<any | null>(null);
  const [optLabel, setOptLabel] = useState('');
  const [optValue, setOptValue] = useState('');
  const [optIconUrl, setOptIconUrl] = useState('');
  const [optColorHex, setOptColorHex] = useState('');
  const [optApplicableTypes, setOptApplicableTypes] = useState('All');
  const [optSortOrder, setOptSortOrder] = useState(0);

  // Delete Confirm State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const fetchFilters = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminFilters();
      setFilters(data.filters || []);
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to load filter configurations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleOpenAddFilter = () => {
    setEditingFilterId(null);
    setFilterName('');
    setFilterKey('');
    setCustomerLabel('');
    setFilterType('Multi Select');
    setApplicableJewelleryTypes('All');
    setIsEnabled(true);
    setSortOrder(filters.length + 1);
    setIsFilterModalOpen(true);
  };

  const handleOpenEditFilter = (filter: any) => {
    setEditingFilterId(filter.id);
    setFilterName(filter.name);
    setFilterKey(filter.key);
    setCustomerLabel(filter.customerLabel || filter.name);
    setFilterType(filter.filterType || 'Multi Select');
    setApplicableJewelleryTypes(filter.applicableJewelleryTypes || 'All');
    setIsEnabled(filter.isEnabled !== undefined ? filter.isEnabled : true);
    setSortOrder(filter.sortOrder || 0);
    setIsFilterModalOpen(true);
  };

  const handleSaveFilter = async () => {
    if (!filterName) {
      toast.error('Filter name is required.');
      return;
    }

    try {
      const payload = {
        name: filterName,
        key: filterKey || filterName.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
        customerLabel: customerLabel || filterName,
        filterType,
        applicableJewelleryTypes,
        isEnabled,
        sortOrder: Number(sortOrder) || 0,
      };

      if (editingFilterId) {
        await api.updateFilterConfig(editingFilterId, payload);
        toast.success('Filter updated successfully!');
      } else {
        await api.createFilterConfig(payload);
        toast.success('Filter created successfully!');
      }

      setIsFilterModalOpen(false);
      fetchFilters();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save filter.');
    }
  };

  const handleToggleFilter = async (filter: any) => {
    try {
      await api.updateFilterConfig(filter.id, { isEnabled: !filter.isEnabled });
      toast.success(`Filter ${!filter.isEnabled ? 'enabled' : 'disabled'}.`);
      fetchFilters();
    } catch (err) {
      toast.error('Failed to toggle filter status.');
    }
  };

  const handleDeleteFilter = async () => {
    if (!deleteTargetId) return;
    try {
      await api.deleteFilterConfig(deleteTargetId);
      toast.success('Filter deleted successfully.');
      setDeleteTargetId(null);
      fetchFilters();
    } catch (err) {
      toast.error('Failed to delete filter.');
    }
  };

  const handleMoveFilter = async (filter: any, direction: 'UP' | 'DOWN') => {
    const currentIndex = filters.findIndex((f) => f.id === filter.id);
    if (currentIndex === -1) return;
    const targetIndex = direction === 'UP' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= filters.length) return;

    const targetFilter = filters[targetIndex];
    try {
      await api.updateFilterConfig(filter.id, { sortOrder: targetFilter.sortOrder });
      await api.updateFilterConfig(targetFilter.id, { sortOrder: filter.sortOrder });
      fetchFilters();
    } catch (err) {
      toast.error('Failed to reorder filter.');
    }
  };

  // Option Handlers
  const handleOpenAddOption = (filter: any) => {
    setOptionsModalFilter(filter);
    setEditingOption(null);
    setOptLabel('');
    setOptValue('');
    setOptIconUrl('');
    setOptColorHex('');
    setOptApplicableTypes(filter.applicableJewelleryTypes || 'All');
    setOptSortOrder((filter.options?.length || 0) + 1);
  };

  const handleOpenEditOption = (filter: any, option: any) => {
    setOptionsModalFilter(filter);
    setEditingOption(option);
    setOptLabel(option.label);
    setOptValue(option.value);
    setOptIconUrl(option.iconUrl || '');
    setOptColorHex(option.colorHex || '');
    setOptApplicableTypes(option.applicableJewelleryTypes || 'All');
    setOptSortOrder(option.sortOrder || 0);
  };

  const handleSaveOption = async () => {
    if (!optionsModalFilter || !optLabel) return;
    try {
      const payload = {
        label: optLabel,
        value: optValue || optLabel,
        iconUrl: optIconUrl || null,
        colorHex: optColorHex || null,
        applicableJewelleryTypes: optApplicableTypes || 'All',
        sortOrder: Number(optSortOrder) || 0,
      };

      if (editingOption) {
        await api.updateFilterOption(editingOption.id, payload);
        toast.success('Option updated!');
      } else {
        await api.createFilterOption(optionsModalFilter.id, payload);
        toast.success('Option added!');
      }

      setEditingOption(null);
      setOptLabel('');
      setOptValue('');
      setOptIconUrl('');
      setOptColorHex('');

      fetchFilters();
      if (optionsModalFilter) {
        const data = await api.getAdminFilters();
        const updatedFilter = (data.filters || []).find((f: any) => f.id === optionsModalFilter.id);
        if (updatedFilter) setOptionsModalFilter(updatedFilter);
      }
    } catch (err) {
      toast.error('Failed to save filter option.');
    }
  };

  const handleToggleOption = async (option: any) => {
    try {
      await api.updateFilterOption(option.id, { isEnabled: !option.isEnabled });
      fetchFilters();
      if (optionsModalFilter) {
        const data = await api.getAdminFilters();
        const updatedFilter = (data.filters || []).find((f: any) => f.id === optionsModalFilter.id);
        if (updatedFilter) setOptionsModalFilter(updatedFilter);
      }
    } catch (err) {
      toast.error('Failed to toggle option.');
    }
  };

  const handleDeleteOption = async (optionId: string) => {
    try {
      await api.deleteFilterOption(optionId);
      toast.success('Option deleted!');
      fetchFilters();
      if (optionsModalFilter) {
        const data = await api.getAdminFilters();
        const updatedFilter = (data.filters || []).find((f: any) => f.id === optionsModalFilter.id);
        if (updatedFilter) setOptionsModalFilter(updatedFilter);
      }
    } catch (err) {
      toast.error('Failed to delete option.');
    }
  };

  const handlePcAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('admin_session_token') || localStorage.getItem('app_auth_token');
      const res = await fetch('/api/v1/admin/media/upload', {
        method: 'POST',
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setOptIconUrl(data.url || data.path);
      toast.success('Icon uploaded successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Icon upload failed.');
    }
  };

  const primaryFilterKeys = ['gender', 'style', 'metal', 'stone_shape', 'diamond', 'price'];
  const primaryFilters = filters.filter((f) => primaryFilterKeys.includes(f.key));
  const secondaryFilters = filters.filter((f) => !primaryFilterKeys.includes(f.key));

  const getFilterIcon = (key: string) => {
    switch (key) {
      case 'diamond':
        return '💎';
      case 'stone_shape':
        return '◯';
      case 'metal':
        return '💍';
      case 'style':
        return '✨';
      case 'gender':
        return '👤';
      case 'price':
        return '$';
      case 'ring_size':
        return '◯';
      case 'carat_weight':
        return '✦';
      case 'clarity':
        return '◇';
      case 'color':
        return '🎨';
      case 'cut':
        return '✦';
      case 'certification':
        return '📜';
      default:
        return '⚙️';
    }
  };

  const renderFilterCard = (filter: any, index: number) => {
    const isColorFilter = filter.key === 'color';
    const isShapeFilter = filter.key === 'stone_shape';

    const stdOptions = isColorFilter
      ? (filter.options || []).filter((o: any) => !o.label.toLowerCase().includes('fancy'))
      : filter.options || [];

    const fancyOptions = isColorFilter
      ? (filter.options || []).filter((o: any) => o.label.toLowerCase().includes('fancy'))
      : [];

    return (
      <FilterCardWrapper key={filter.id} $disabled={!filter.isEnabled}>
        {/* CARD HEADER */}
        <FilterCardHeader>
          <div className="left-meta">
            <div className="icon-box">{getFilterIcon(filter.key)}</div>
            <div className="title-group">
              <h3>
                {filter.name}
                <AdminBadge $variant={filter.isEnabled ? 'published' : 'draft'}>
                  {filter.isEnabled ? 'ACTIVE' : 'DISABLED'}
                </AdminBadge>
              </h3>
              <div className="sub-info">
                <span>Customer Label: <strong>{filter.customerLabel || filter.name}</strong></span>
                <span>•</span>
                <span>Key: <span className="key-tag">{filter.key}</span></span>
                <span>•</span>
                <span>Type: <strong>{filter.filterType}</strong></span>
                <span>•</span>
                <span>Applies To: <strong>{filter.applicableJewelleryTypes || 'All'}</strong></span>
              </div>
            </div>
          </div>

          <div className="right-actions">
            <AdminButton $size="sm" $variant="ghost" onClick={() => handleMoveFilter(filter, 'UP')} disabled={index === 0} title="Move Up">
              <ArrowUp size={13} />
            </AdminButton>
            <AdminButton $size="sm" $variant="ghost" onClick={() => handleMoveFilter(filter, 'DOWN')} disabled={index === filters.length - 1} title="Move Down">
              <ArrowDown size={13} />
            </AdminButton>
            <AdminButton $size="sm" $variant="ghost" onClick={() => handleToggleFilter(filter)} title="Toggle Active Status">
              {filter.isEnabled ? <EyeOff size={13} /> : <Eye size={13} />}
            </AdminButton>
            <AdminButton $size="sm" $variant="ghost" onClick={() => handleOpenEditFilter(filter)} title="Edit Filter Config">
              <Edit2 size={13} />
            </AdminButton>
            <AdminButton $size="sm" $variant="gold" onClick={() => handleOpenAddOption(filter)} icon={<Plus size={13} />}>
              + Add Option
            </AdminButton>
            <AdminButton $size="sm" $variant="danger" onClick={() => setDeleteTargetId(filter.id)} title="Delete Filter">
              <Trash2 size={13} />
            </AdminButton>
          </div>
        </FilterCardHeader>

        {/* CARD BODY — OPTIONS TABLE */}
        {isColorFilter ? (
          <>
            {/* STANDARD COLORS SUBHEADER */}
            <GroupSubHeader>
              <span>Standard Diamond Colors ({stdOptions.length})</span>
              <AdminButton $size="sm" $variant="gold" onClick={() => handleOpenAddOption(filter)}>
                + Add Standard Color
              </AdminButton>
            </GroupSubHeader>
            <OptionsTable>
              <thead>
                <tr>
                  <th style={{ width: 40 }}>Sort</th>
                  <th style={{ width: 80 }}>Preview</th>
                  <th>Option Name / Value</th>
                  <th>Customer Label</th>
                  <th style={{ width: 100 }}>Status</th>
                  <th style={{ textAlign: 'right', width: 120 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stdOptions.map((opt: any) => (
                  <tr key={opt.id} style={{ opacity: opt.isEnabled ? 1 : 0.5 }}>
                    <td style={{ fontWeight: 600, color: '#777' }}>#{opt.sortOrder}</td>
                    <td>
                      {opt.colorHex ? (
                        <span style={{ width: 18, height: 18, borderRadius: '50%', background: opt.colorHex, border: '1px solid #ccc', display: 'inline-block' }} />
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#999' }}>--</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>{opt.label} <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#666' }}>({opt.value})</span></td>
                    <td>{opt.label}</td>
                    <td>
                      <AdminBadge $variant={opt.isEnabled ? 'published' : 'draft'}>
                        {opt.isEnabled ? 'ACTIVE' : 'OFF'}
                      </AdminBadge>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <AdminButton $size="sm" $variant="ghost" onClick={() => handleOpenEditOption(filter, opt)}>
                          <Edit2 size={12} />
                        </AdminButton>
                        <AdminButton $size="sm" $variant="ghost" onClick={() => handleToggleOption(opt)}>
                          {opt.isEnabled ? <EyeOff size={12} /> : <Eye size={12} />}
                        </AdminButton>
                        <AdminButton $size="sm" $variant="danger" onClick={() => handleDeleteOption(opt.id)}>
                          <Trash2 size={12} />
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </OptionsTable>

            {/* FANCY COLORS SUBHEADER */}
            <GroupSubHeader style={{ marginTop: 12 }}>
              <span>Fancy Colors ({fancyOptions.length})</span>
              <AdminButton $size="sm" $variant="gold" onClick={() => handleOpenAddOption(filter)}>
                + Add Fancy Color
              </AdminButton>
            </GroupSubHeader>
            <OptionsTable>
              <thead>
                <tr>
                  <th style={{ width: 40 }}>Sort</th>
                  <th style={{ width: 80 }}>Swatch</th>
                  <th>Fancy Color Name</th>
                  <th>Internal Value</th>
                  <th style={{ width: 100 }}>Status</th>
                  <th style={{ textAlign: 'right', width: 120 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fancyOptions.map((opt: any) => (
                  <tr key={opt.id} style={{ opacity: opt.isEnabled ? 1 : 0.5 }}>
                    <td style={{ fontWeight: 600, color: '#777' }}>#{opt.sortOrder}</td>
                    <td>
                      {opt.colorHex ? (
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: opt.colorHex, border: '1px solid #ccc', display: 'inline-block' }} />
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#999' }}>--</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: '#1f1f1f' }}>{opt.label}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#555' }}>{opt.value}</td>
                    <td>
                      <AdminBadge $variant={opt.isEnabled ? 'published' : 'draft'}>
                        {opt.isEnabled ? 'ACTIVE' : 'OFF'}
                      </AdminBadge>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <AdminButton $size="sm" $variant="ghost" onClick={() => handleOpenEditOption(filter, opt)}>
                          <Edit2 size={12} />
                        </AdminButton>
                        <AdminButton $size="sm" $variant="ghost" onClick={() => handleToggleOption(opt)}>
                          {opt.isEnabled ? <EyeOff size={12} /> : <Eye size={12} />}
                        </AdminButton>
                        <AdminButton $size="sm" $variant="danger" onClick={() => handleDeleteOption(opt.id)}>
                          <Trash2 size={12} />
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </OptionsTable>
          </>
        ) : (
          <OptionsTable>
            <thead>
              <tr>
                <th style={{ width: 40 }}>Sort</th>
                {isShapeFilter && <th style={{ width: 70 }}>SVG Icon</th>}
                {filter.key === 'metal' && <th style={{ width: 70 }}>Swatch</th>}
                <th>Option Label / Value</th>
                <th>Customer Display Text</th>
                <th style={{ width: 100 }}>Status</th>
                <th style={{ textAlign: 'right', width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filter.options || []).length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 20, color: '#77736c' }}>
                    No options created yet. Click "+ Add Option" above.
                  </td>
                </tr>
              ) : (
                (filter.options || []).map((opt: any) => (
                  <tr key={opt.id} style={{ opacity: opt.isEnabled ? 1 : 0.5 }}>
                    <td style={{ fontWeight: 600, color: '#777' }}>#{opt.sortOrder}</td>
                    {isShapeFilter && (
                      <td>
                        {opt.iconUrl ? (
                          <img src={opt.iconUrl} alt={opt.label} style={{ width: 22, height: 22, objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#999' }}>--</span>
                        )}
                      </td>
                    )}
                    {filter.key === 'metal' && (
                      <td>
                        {opt.colorHex ? (
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: opt.colorHex, border: '1px solid #ccc', display: 'inline-block' }} />
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#999' }}>--</span>
                        )}
                      </td>
                    )}
                    <td style={{ fontWeight: 600 }}>
                      {opt.label} <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#666' }}>({opt.value})</span>
                    </td>
                    <td>{opt.label}</td>
                    <td>
                      <AdminBadge $variant={opt.isEnabled ? 'published' : 'draft'}>
                        {opt.isEnabled ? 'ACTIVE' : 'OFF'}
                      </AdminBadge>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <AdminButton $size="sm" $variant="ghost" onClick={() => handleOpenEditOption(filter, opt)} title="Edit Option">
                          <Edit2 size={12} />
                        </AdminButton>
                        <AdminButton $size="sm" $variant="ghost" onClick={() => handleToggleOption(opt)} title="Toggle Active">
                          {opt.isEnabled ? <EyeOff size={12} /> : <Eye size={12} />}
                        </AdminButton>
                        <AdminButton $size="sm" $variant="danger" onClick={() => handleDeleteOption(opt.id)} title="Delete Option">
                          <Trash2 size={12} />
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </OptionsTable>
        )}
      </FilterCardWrapper>
    );
  };

  return (
    <div>
      <AdminPageHeader
        title="Filter Management"
        description="Central Control Panel for all storefront product filters, shape icons, metal swatches, color grades, and category scopes."
        actions={
          <AdminButton $variant="gold" onClick={handleOpenAddFilter} icon={<Plus size={14} />}>
            + Add New Filter
          </AdminButton>
        }
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#77736c' }}>
          Loading filter control cards...
        </div>
      ) : (
        <>
          {/* SECTION 1: PRIMARY FILTERS */}
          <SectionHeaderTitle>
            <h2>PRIMARY FILTERS</h2>
            <span className="badge">Storefront Top Bar</span>
          </SectionHeaderTitle>
          {primaryFilters.map((filter, index) => renderFilterCard(filter, index))}

          {/* SECTION 2: SECONDARY FILTERS */}
          <SectionHeaderTitle>
            <h2>SECONDARY DROPDOWN FILTERS</h2>
            <span className="badge">Expandable Luxury Row</span>
          </SectionHeaderTitle>
          {secondaryFilters.map((filter, index) => renderFilterCard(filter, primaryFilters.length + index))}
        </>
      )}

      {/* FILTER EDIT / ADD MODAL */}
      {isFilterModalOpen && (
        <ModalOverlay onClick={() => setIsFilterModalOpen(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>{editingFilterId ? 'Edit Filter Configuration' : 'Add New Filter'}</h3>

            <div className="field-group">
              <div className="field">
                <label>Filter Name</label>
                <AdminInput
                  type="text"
                  placeholder="e.g. Precious Metal"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Internal Key (Admin Only)</label>
                <AdminInput
                  type="text"
                  placeholder="e.g. metal"
                  value={filterKey}
                  onChange={(e) => setFilterKey(e.target.value)}
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label>Customer Label</label>
                <AdminInput
                  type="text"
                  placeholder="e.g. Metal"
                  value={customerLabel}
                  onChange={(e) => setCustomerLabel(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Filter Type</label>
                <AdminSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  {FILTER_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </AdminSelect>
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label>Applicable Jewelry Types</label>
                <AdminSelect value={applicableJewelleryTypes} onChange={(e) => setApplicableJewelleryTypes(e.target.value)}>
                  {JEWELLERY_TYPES_LIST.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </AdminSelect>
              </div>

              <div className="field">
                <label>Sort Order</label>
                <AdminInput
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
                />
              </div>
            </div>

            <div className="field" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <input
                type="checkbox"
                id="filterEnabledToggle"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label htmlFor="filterEnabledToggle" style={{ margin: 0, cursor: 'pointer' }}>
                Enable filter on storefront
              </label>
            </div>

            <div className="btn-row">
              <AdminButton $variant="secondary" onClick={() => setIsFilterModalOpen(false)}>
                Cancel
              </AdminButton>
              <AdminButton $variant="gold" onClick={handleSaveFilter}>
                Save Filter
              </AdminButton>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* OPTION EDIT / ADD MODAL */}
      {optionsModalFilter && (
        <ModalOverlay onClick={() => setOptionsModalFilter(null)}>
          <ModalCard onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <h3>
              {editingOption ? 'Edit Option' : 'Add Option'} for "{optionsModalFilter.name}"
            </h3>

            <div className="field-group">
              <div className="field">
                <label>Option Display Label</label>
                <AdminInput
                  type="text"
                  placeholder="e.g. 14K Yellow Gold / Round"
                  value={optLabel}
                  onChange={(e) => setOptLabel(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Option Internal Value</label>
                <AdminInput
                  type="text"
                  placeholder="e.g. 14k-yellow-gold / round"
                  value={optValue}
                  onChange={(e) => setOptValue(e.target.value)}
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label>Color Swatch Hex (Optional)</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <AdminInput
                    type="text"
                    placeholder="#E8C872"
                    value={optColorHex}
                    onChange={(e) => setOptColorHex(e.target.value)}
                  />
                  {optColorHex && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: optColorHex,
                        border: '1px solid #ccc',
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="field">
                <label>PC Upload Icon / SVG Asset</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <AdminInput
                    type="text"
                    placeholder="/assets/shapes/round.svg"
                    value={optIconUrl}
                    onChange={(e) => setOptIconUrl(e.target.value)}
                  />
                  <label style={{ margin: 0 }}>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      style={{ display: 'none' }}
                      onChange={handlePcAssetUpload}
                    />
                    <AdminButton type="button" $size="sm" $variant="secondary" icon={<Upload size={12} />}>
                      PC Upload
                    </AdminButton>
                  </label>
                </div>
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label>Assigned Categories / Applies To</label>
                <AdminSelect value={optApplicableTypes} onChange={(e) => setOptApplicableTypes(e.target.value)}>
                  {JEWELLERY_TYPES_LIST.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </AdminSelect>
              </div>

              <div className="field">
                <label>Sort Order</label>
                <AdminInput
                  type="number"
                  value={optSortOrder}
                  onChange={(e) => setOptSortOrder(parseInt(e.target.value, 10) || 0)}
                />
              </div>
            </div>

            <div className="btn-row">
              <AdminButton $variant="secondary" onClick={() => setOptionsModalFilter(null)}>
                Cancel
              </AdminButton>
              <AdminButton $variant="gold" onClick={handleSaveOption}>
                {editingOption ? 'Update Option' : '+ Add Option'}
              </AdminButton>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Filter Configuration"
        message="Are you sure you want to delete this filter and all its options? Storefront filter options will update automatically."
        confirmLabel="Delete Filter"
        cancelLabel="Cancel"
        onConfirm={handleDeleteFilter}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
