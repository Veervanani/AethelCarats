import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Upload,
  Copy,
  Sparkles,
  Tag,
  Percent,
  CheckCircle,
  X,
  Filter,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { PRIVATE_ADMIN_PATH } from '../../App';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTableContainer,
  AdminTable,
  AdminBadge,
} from '../../components/admin/AdminUI';

const ThumbnailFallback = styled.div`
  width: 48px;
  height: 48px;
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a45c;
`;

const SkuChip = styled.span`
  font-family: monospace;
  font-size: 0.78rem;
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  padding: 2px 8px;
  border-radius: 4px;
  color: #4a4a4a;
`;

const BulkActionBar = styled.div`
  position: sticky;
  top: 10px;
  z-index: 100;
  background: #19202a;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  .info {
    font-size: 0.88rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;

    span.badge-count {
      background: #c9a45c;
      color: #fff;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.78rem;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled(AdminCard)`
  width: 100%;
  max-width: 540px;
  padding: 24px;
`;

export const AdminProductManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  // Bulk Selection & Bulk Sale Editor State
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isBulkSaleModalOpen, setIsBulkSaleModalOpen] = useState<boolean>(false);
  const [bulkAction, setBulkAction] = useState<string>('SET_ON_SALE');
  const [bulkDiscountPercent, setBulkDiscountPercent] = useState<number>(15);
  const [bulkFixedSalePrice, setBulkFixedSalePrice] = useState<number>(999);
  const [updatingBulkSale, setUpdatingBulkSale] = useState<boolean>(false);

  // Confirm Modals
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts({ status: 'ALL', limit: 500 });
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate(`${PRIVATE_ADMIN_PATH}/products/new`);
  };

  const handleDuplicate = async (product: Product) => {
    try {
      setDuplicatingId(product.id);
      const res = await api.post(`/api/v1/products/${product.id}/duplicate`);
      const data = res.data?.product || (res.data as any);
      toast.success(`Duplicated "${product.name}" as "${data?.name || 'New Listing'}"!`);
      if (data?.id) navigate(`${PRIVATE_ADMIN_PATH}/products/${data.id}/edit`);
    } catch (err: any) {
      console.error('Duplicate error:', err);
      toast.error(`Failed to duplicate product: ${err.message}`);
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleEdit = (product: Product) => {
    navigate(`${PRIVATE_ADMIN_PATH}/products/${product.id}/edit`);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteTargetId) return;
    try {
      await api.deleteProduct(deleteTargetId);
      toast.success('Product deleted successfully.');
      fetchProducts();
    } catch (err: any) {
      toast.error('Failed to delete product.');
    } finally {
      setDeleteTargetId(null);
    }
  };

  const handleResetDatabase = async () => {
    try {
      setResetting(true);
      await api.post('/admin/products/reset-database-single-product');
      toast.success('Database purged successfully! All products permanently removed.');
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      toast.error(`Database reset failed: ${err.message || 'Error resetting database'}`);
    } finally {
      setResetting(false);
      setResetConfirmOpen(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bulk Selection Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleToggleSelectProduct = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((item) => item !== id));
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  // Bulk Sale Update Submission
  const handleExecuteBulkSaleUpdate = async () => {
    if (selectedProductIds.length === 0) {
      toast.error('No products selected.');
      return;
    }
    try {
      setUpdatingBulkSale(true);
      await api.post('/api/v1/admin/products/bulk-sale-update', {
        productIds: selectedProductIds,
        action: bulkAction,
        discountPercent: bulkDiscountPercent,
        fixedSalePrice: bulkFixedSalePrice,
      });

      toast.success(`Bulk sale update applied to ${selectedProductIds.length} products!`);
      setIsBulkSaleModalOpen(false);
      setSelectedProductIds([]);
      fetchProducts();
    } catch (err: any) {
      console.error('Bulk sale update error:', err);
      toast.error(err.response?.data?.message || 'Failed to update bulk sale options');
    } finally {
      setUpdatingBulkSale(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={`Products Catalog (${products.length} Items)`}
        description="Manage jewelry items, sale discounts, pricing matrix, and media assets."
        actions={
          <>
            <AdminButton
              $variant="danger"
              onClick={() => setResetConfirmOpen(true)}
              $loading={resetting}
              icon={<Trash2 size={14} />}
            >
              Purge DB
            </AdminButton>
            <AdminButton
              $variant="gold"
              onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products/bulk-upload`)}
              icon={<Upload size={14} />}
            >
              Bulk Excel Upload
            </AdminButton>
            <AdminButton
              $variant="primary"
              onClick={handleCreateNew}
              icon={<Plus size={14} />}
            >
              Add Product
            </AdminButton>
          </>
        }
      />

      {/* CATALOG STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #c9a45c' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>{products.length}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Total Products in Catalog</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #137333' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#137333' }}>
            {products.filter((p) => (p as any).onSale || (p as any).salePrice).length}
          </div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Products On Sale 🏷️</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #b06000' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#b06000' }}>
            {products.filter((p) => p.status === 'DRAFT').length}
          </div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Draft Products</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #19202a' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#19202a' }}>{filteredProducts.length}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Showing / Filtered Count</div>
        </AdminCard>
      </div>

      {/* BULK SELECTION ACTION BAR */}
      {selectedProductIds.length > 0 && (
        <BulkActionBar>
          <div className="info">
            <span className="badge-count">{selectedProductIds.length} Selected</span>
            <span>Bulk Product Actions</span>
          </div>
          <div className="actions">
            <AdminButton
              $variant="gold"
              $size="sm"
              onClick={() => setIsBulkSaleModalOpen(true)}
              icon={<Tag size={14} />}
            >
              🏷️ Bulk Edit Sale Options
            </AdminButton>
            <AdminButton
              $variant="ghost"
              $size="sm"
              style={{ color: '#fff' }}
              onClick={() => setSelectedProductIds([])}
            >
              Deselect All
            </AdminButton>
          </div>
        </BulkActionBar>
      )}

      {/* SEARCH BAR */}
      <AdminCard style={{ marginBottom: 20, padding: 18 }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8c877d' }} />
          <AdminInput
            type="text"
            placeholder="Search catalog by product title or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>
      </AdminCard>

      {/* PRODUCTS TABLE */}
      <AdminTableContainer>
        <AdminTable>
          <thead>
            <tr>
              <th style={{ width: 40, textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={filteredProducts.length > 0 && selectedProductIds.length === filteredProducts.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={{ width: 64 }}>Preview</th>
              <th>Product Title</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price / Sale Status</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading product catalog...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No products found matching "{searchTerm}".
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const img = p.primaryImage || p.mainImage;
                const statusVariant = p.status === 'PUBLISHED' || p.status === 'ACTIVE' ? 'published' : 'draft';
                const isOnSale = Boolean((p as any).onSale || (p as any).salePrice);
                const isSelected = selectedProductIds.includes(p.id);

                return (
                  <tr key={p.id} style={{ background: isSelected ? '#faf6ee' : undefined }}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectProduct(p.id)}
                      />
                    </td>
                    <td>
                      {img ? (
                        <img
                          src={img}
                          alt={p.title || p.name}
                          style={{
                            width: 48,
                            height: 48,
                            objectFit: 'cover',
                            borderRadius: 6,
                            border: '1px solid #e8e3d9',
                          }}
                        />
                      ) : (
                        <ThumbnailFallback>
                          <Sparkles size={20} />
                        </ThumbnailFallback>
                      )}
                    </td>
                    <td style={{ fontWeight: 600, color: '#1f1f1f' }}>
                      {p.title || p.name}
                      {isOnSale && (
                        <span
                          style={{
                            marginLeft: 8,
                            background: '#d93838',
                            color: '#fff',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 4,
                          }}
                        >
                          ON SALE
                        </span>
                      )}
                    </td>
                    <td>
                      <SkuChip>{p.sku}</SkuChip>
                    </td>
                    <td>{p.category?.name || p.jewelleryType || 'Rings'}</td>
                    <td>
                      {isOnSale ? (
                        <div>
                          <span style={{ fontWeight: 700, color: '#d93838', fontSize: '0.95rem' }}>
                            ${((p as any).salePrice || p.price).toLocaleString()}
                          </span>
                          <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.8rem', marginLeft: 6 }}>
                            ${(p.comparePrice || p.price).toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontWeight: 700, color: '#1f1f1f' }}>
                          ${p.price ? p.price.toLocaleString() : '5,000'}
                        </span>
                      )}
                    </td>
                    <td>
                      <AdminBadge $variant={statusVariant}>
                        {p.status || 'DRAFT'}
                      </AdminBadge>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 8, justifyContent: 'flex-end' }}>
                        <AdminButton
                          $size="sm"
                          $variant="secondary"
                          onClick={() => handleEdit(p)}
                          icon={<Edit2 size={13} />}
                        >
                          Edit
                        </AdminButton>

                        <AdminButton
                          $size="sm"
                          $variant="gold"
                          onClick={() => handleDuplicate(p)}
                          $loading={duplicatingId === p.id}
                          icon={<Copy size={13} />}
                        >
                          Duplicate
                        </AdminButton>

                        <AdminButton
                          $size="sm"
                          $variant="danger"
                          onClick={() => setDeleteTargetId(p.id)}
                          icon={<Trash2 size={13} />}
                        >
                          Delete
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </AdminTable>
      </AdminTableContainer>

      {/* BULK SALE OPTIONS MODAL */}
      {isBulkSaleModalOpen && (
        <ModalBackdrop onClick={() => setIsBulkSaleModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: 16, color: '#1a1a1a' }}>
              🏷️ Bulk Sale Options ({selectedProductIds.length} Products Selected)
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 20 }}>
              Apply sale pricing, percentage discounts, or toggle ON SALE status for all selected products simultaneously.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#444', marginBottom: 6 }}>
                Select Bulk Sale Action
              </label>
              <AdminSelect
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
              >
                <option value="SET_ON_SALE">🏷️ Mark Selected Products "ON SALE"</option>
                <option value="APPLY_DISCOUNT_PERCENT">📉 Apply Percentage Discount (% Off)</option>
                <option value="SET_FIXED_SALE_PRICE">💲 Set Fixed Sale Price ($)</option>
                <option value="SET_OFF_SALE">❌ Remove ON SALE Status</option>
                <option value="CLEAR_SALE">🧹 Clear All Sale Prices & Discounts</option>
              </AdminSelect>
            </div>

            {bulkAction === 'APPLY_DISCOUNT_PERCENT' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#444', marginBottom: 6 }}>
                  Percentage Discount (% Off)
                </label>
                <AdminInput
                  type="number"
                  min="1"
                  max="99"
                  value={bulkDiscountPercent}
                  onChange={(e) => setBulkDiscountPercent(parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 15 for 15% OFF"
                />
                <span style={{ fontSize: '0.75rem', color: '#777', marginTop: 4, display: 'block' }}>
                  Calculates sale price automatically from each product's base price and sets compare price to regular price.
                </span>
              </div>
            )}

            {bulkAction === 'SET_FIXED_SALE_PRICE' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#444', marginBottom: 6 }}>
                  Fixed Sale Price ($)
                </label>
                <AdminInput
                  type="number"
                  value={bulkFixedSalePrice}
                  onChange={(e) => setBulkFixedSalePrice(parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 1499"
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <AdminButton $variant="ghost" onClick={() => setIsBulkSaleModalOpen(false)}>
                Cancel
              </AdminButton>
              <AdminButton
                $variant="gold"
                onClick={handleExecuteBulkSaleUpdate}
                $loading={updatingBulkSale}
                icon={<CheckCircle size={14} />}
              >
                Apply Bulk Sale Update
              </AdminButton>
            </div>
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmLabel="Delete Product"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={confirmDeleteProduct}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* PURGE DB CONFIRM MODAL */}
      <ConfirmModal
        isOpen={resetConfirmOpen}
        title="PERMANENTLY PURGE ALL PRODUCTS?"
        message="WARNING: This will permanently delete ALL products and gallery images from your database. Catalog count will reset to 0."
        confirmLabel="Purge All Products (Reset to 0)"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleResetDatabase}
        onCancel={() => setResetConfirmOpen(false)}
      />
    </div>
  );
};
