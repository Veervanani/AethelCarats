import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Edit2, Trash2, Save, X, RefreshCw, CheckCircle, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { AdminImageUploadField } from '../../components/admin/AdminImageUploadField';
import { Category } from '../../types';
import { SafeImage } from '../../components/ui/SafeImage';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminTextarea,
  AdminTableContainer,
  AdminTable,
  AdminBadge,
  AdminModalOverlay,
  AdminModalCard,
  AdminFormGrid,
  AdminFormGroup,
} from '../../components/admin/AdminUI';

const CardThumb = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e8e3d9;
  background-color: #faf8f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AdminCategoryManagerPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory({
      name: '',
      slug: '',
      link: '/rings',
      image: '/assets/floksy_rings_cat.png',
      description: '',
      sortOrder: (categories.length + 1),
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory({ ...cat });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingCategory || !editingCategory.name) return;
    setSaving(true);
    try {
      if (editingCategory.id) {
        await api.updateCategory(editingCategory.id, editingCategory);
        setSuccessMsg(`Category "${editingCategory.name}" updated successfully!`);
      } else {
        await api.createCategory(editingCategory);
        setSuccessMsg(`Category "${editingCategory.name}" created successfully!`);
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      await fetchCategories();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to save category', err);
      alert('Error saving category card.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      await api.deleteCategory(id);
      setSuccessMsg(`Category "${name}" deleted.`);
      await fetchCategories();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      alert('Error deleting category.');
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Product Categories"
        description="Manage storefront category navigation cards, banners, intro copy, and sort ordering."
        actions={
          <>
            <AdminButton $variant="secondary" onClick={fetchCategories} icon={<RefreshCw size={14} />}>
              Refresh
            </AdminButton>
            <AdminButton $variant="gold" onClick={handleOpenAdd} icon={<Plus size={14} />}>
              Add Category Card
            </AdminButton>
          </>
        }
      />

      {successMsg && (
        <div style={{ backgroundColor: '#eaf5ea', color: '#2e6b2e', padding: '12px 16px', borderRadius: 6, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      <AdminTableContainer>
        <AdminTable>
          <thead>
            <tr>
              <th style={{ width: 60 }}>Card Image</th>
              <th>Category Title</th>
              <th>Destination Link</th>
              <th>Description</th>
              <th>Order</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading category cards...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No categories configured yet.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <CardThumb>
                      <SafeImage src={cat.image || '/assets/floksy_rings_cat.png'} alt={cat.name} fallbackSrc="/assets/floksy_rings_cat.png" />
                    </CardThumb>
                  </td>
                  <td style={{ fontWeight: 600, color: '#1f1f1f' }}>{cat.name}</td>
                  <td>
                    <a href={cat.link || `/${cat.slug}`} target="_blank" rel="noreferrer" style={{ color: '#c9a45c', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', fontWeight: 500 }}>
                      {cat.link || `/${cat.slug}`} <ExternalLink size={12} />
                    </a>
                  </td>
                  <td style={{ maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#77736c' }}>
                    {cat.description || '—'}
                  </td>
                  <td style={{ fontWeight: 600 }}>{cat.sortOrder ?? 0}</td>
                  <td>
                    <AdminBadge $variant={cat.isActive !== false ? 'published' : 'draft'}>
                      {cat.isActive !== false ? 'Active' : 'Inactive'}
                    </AdminBadge>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <AdminButton $size="sm" $variant="secondary" onClick={() => handleOpenEdit(cat)} icon={<Edit2 size={13} />}>
                        Edit
                      </AdminButton>
                      <AdminButton $size="sm" $variant="danger" onClick={() => handleDelete(cat.id, cat.name)} icon={<Trash2 size={13} />}>
                        Delete
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </AdminTable>
      </AdminTableContainer>

      {isModalOpen && editingCategory && (
        <AdminModalOverlay onClick={() => setIsModalOpen(false)}>
          <AdminModalCard onClick={(e) => e.stopPropagation()} $maxWidth="640px">
            <div className="modal-header">
              <h3>{editingCategory.id ? 'Edit Category Card' : 'Add New Category Card'}</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <AdminFormGrid $columns={2}>
                <AdminFormGroup>
                  <label>Category Title</label>
                  <AdminInput
                    type="text"
                    value={editingCategory.name || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    placeholder="e.g. Rings"
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label>Destination Link / URL</label>
                  <AdminInput
                    type="text"
                    value={editingCategory.link || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, link: e.target.value })}
                    placeholder="e.g. /rings"
                  />
                </AdminFormGroup>
              </AdminFormGrid>

              <AdminImageUploadField
                label="Category Card Image"
                value={editingCategory.image || ''}
                onChange={(val) => setEditingCategory({ ...editingCategory, image: val })}
              />

              <AdminFormGroup>
                <label>Category Intro Description</label>
                <AdminTextarea
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Category description displayed on top of storefront category page..."
                />
              </AdminFormGroup>

              <AdminFormGrid $columns={2}>
                <AdminFormGroup>
                  <label>Sort Order Position</label>
                  <AdminInput
                    type="number"
                    value={editingCategory.sortOrder ?? 0}
                    onChange={(e) => setEditingCategory({ ...editingCategory, sortOrder: parseInt(e.target.value, 10) })}
                  />
                </AdminFormGroup>
                <AdminFormGroup style={{ justifyContent: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 24 }}>
                    <input
                      type="checkbox"
                      checked={editingCategory.isActive !== false}
                      onChange={(e) => setEditingCategory({ ...editingCategory, isActive: e.target.checked })}
                    />
                    Card Active & Visible on Storefront
                  </label>
                </AdminFormGroup>
              </AdminFormGrid>

              <div className="modal-footer">
                <AdminButton $variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </AdminButton>
                <AdminButton $variant="gold" onClick={handleSave} $loading={saving} icon={<Save size={14} />}>
                  Save Category
                </AdminButton>
              </div>
            </div>
          </AdminModalCard>
        </AdminModalOverlay>
      )}
    </div>
  );
};
