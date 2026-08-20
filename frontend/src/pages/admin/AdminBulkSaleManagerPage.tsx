import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Tag,
  Percent,
  DollarSign,
  Search,
  CheckCircle,
  X,
  Filter,
  Sparkles,
  Save,
  RotateCcw,
  Sliders,
  Flame,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminBadge,
  AdminTableContainer,
  AdminTable,
} from '../../components/admin/AdminUI';

const ThumbnailFallback = styled.div`
  width: 44px;
  height: 44px;
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

const BulkToolBarCard = styled(AdminCard)`
  padding: 20px;
  margin-bottom: 20px;
  background: #ffffff;
  border: 1px solid #e8e3d9;
`;

const FormRowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  align-items: flex-end;
  margin-top: 16px;
`;

const ToggleSwitchLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: #c9a45c;
  }
`;

export const AdminBulkSaleManagerPage: React.FC = () => {
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [saleStatusFilter, setSaleStatusFilter] = useState<string>('All');

  // Bulk Selection State
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('APPLY_DISCOUNT_PERCENT');
  const [bulkDiscountPercent, setBulkDiscountPercent] = useState<number>(20);
  const [bulkFixedSalePrice, setBulkFixedSalePrice] = useState<number>(1499);
  const [saleDurationHours, setSaleDurationHours] = useState<number>(0);
  const [customSaleEndsAt, setCustomSaleEndsAt] = useState<string>('');
  const [executingBulk, setExecutingBulk] = useState<boolean>(false);

  // Inline Editing State per Product (Id -> Draft object)
  const [draftSales, setDraftSales] = useState<{ [id: string]: { onSale: boolean; salePrice: string; comparePrice: string } }>({});
  const [savingRowId, setSavingRowId] = useState<string | null>(null);

  // Clear Confirmation Modal
  const [clearConfirmOpen, setClearConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts({ status: 'ALL', limit: 500 });
      const list = data.products || [];
      setProducts(list);

      // Populate draft sales state
      const initialDrafts: any = {};
      list.forEach((p: any) => {
        initialDrafts[p.id] = {
          onSale: Boolean(p.onSale || p.salePrice),
          salePrice: p.salePrice !== undefined && p.salePrice !== null ? String(p.salePrice) : '',
          comparePrice: p.comparePrice !== undefined && p.comparePrice !== null ? String(p.comparePrice) : String(p.price || ''),
        };
      });
      setDraftSales(initialDrafts);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products for Bulk Sale Manager.');
    } finally {
      setLoading(false);
    }
  };

  // Filter products logic
  const filteredProducts = products.filter((p: any) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const catName = p.category?.name || p.jewelleryType || 'Rings';
    const matchesCategory = categoryFilter === 'All' || catName.toLowerCase() === categoryFilter.toLowerCase();

    const isOnSale = Boolean(p.onSale || p.salePrice);
    const matchesSaleStatus =
      saleStatusFilter === 'All' ||
      (saleStatusFilter === 'ON_SALE' && isOnSale) ||
      (saleStatusFilter === 'REGULAR' && !isOnSale);

    return matchesSearch && matchesCategory && matchesSaleStatus;
  });

  // Checkbox Selection
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

  // Execute Bulk Sale Action
  const handleExecuteBulkAction = async () => {
    const targetIds = selectedProductIds.length > 0 ? selectedProductIds : filteredProducts.map((p) => p.id);

    if (targetIds.length === 0) {
      toast.error('No products selected for bulk sale update.');
      return;
    }

    try {
      setExecutingBulk(true);
      await api.post('/api/v1/admin/products/bulk-sale-update', {
        productIds: targetIds,
        action: bulkAction,
        discountPercent: bulkDiscountPercent,
        fixedSalePrice: bulkFixedSalePrice,
        saleDurationHours: saleDurationHours,
        saleEndsAt: saleDurationHours === -1 ? customSaleEndsAt : null,
      });

      toast.success(`Bulk sale update successfully applied to ${targetIds.length} products!`);
      setSelectedProductIds([]);
      fetchProducts();
    } catch (err: any) {
      console.error('Bulk sale error:', err);
      toast.error(err.response?.data?.message || 'Failed to execute bulk sale update');
    } finally {
      setExecutingBulk(false);
    }
  };

  // Inline Single Row Quick Save
  const handleSaveInlineRow = async (product: any) => {
    const draft = draftSales[product.id];
    if (!draft) return;

    try {
      setSavingRowId(product.id);
      await api.put(`/api/v1/admin/products/${product.id}/sale-price`, {
        onSale: draft.onSale,
        salePrice: draft.salePrice !== '' ? parseFloat(draft.salePrice) : null,
        comparePrice: draft.comparePrice !== '' ? parseFloat(draft.comparePrice) : null,
      });

      toast.success(`Updated sale pricing for ${product.name}`);
      fetchProducts();
    } catch (err: any) {
      console.error('Inline save error:', err);
      toast.error('Failed to update product sale price');
    } finally {
      setSavingRowId(null);
    }
  };

  // Draft state change helpers
  const updateDraft = (id: string, field: string, value: any) => {
    setDraftSales((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Stats calculation
  const onSaleProductsCount = products.filter((p: any) => p.onSale || p.salePrice).length;

  return (
    <div>
      <AdminPageHeader
        title={`Bulk Sale Options Manager (${products.length} Products)`}
        description="Mass edit sale prices, apply percentage discounts across categories, and toggle ON SALE badges in bulk."
        actions={
          <>
            <AdminButton
              $variant="danger"
              onClick={() => setClearConfirmOpen(true)}
              disabled={onSaleProductsCount === 0}
              icon={<RotateCcw size={14} />}
            >
              Clear All Sale Discounts
            </AdminButton>
            <AdminButton
              $variant="gold"
              onClick={handleExecuteBulkAction}
              $loading={executingBulk}
              icon={<Flame size={14} />}
            >
              Apply Bulk Sale ({selectedProductIds.length > 0 ? selectedProductIds.length : filteredProducts.length} Products)
            </AdminButton>
          </>
        }
      />

      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #c9a45c' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>{products.length}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Total Products in Catalog</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #d93838' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#d93838' }}>{onSaleProductsCount}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Currently ON SALE 🏷️</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #137333' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#137333' }}>
            {selectedProductIds.length}
          </div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Selected for Bulk Edit</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #19202a' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#19202a' }}>{filteredProducts.length}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Filtered Products</div>
        </AdminCard>
      </div>

      {/* MASS BULK OPERATIONS TOOLBAR */}
      <BulkToolBarCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sliders size={18} color="#c9a45c" /> Mass Bulk Sale Operations
          </div>
          {selectedProductIds.length > 0 ? (
            <span style={{ fontSize: '0.82rem', background: '#c9a45c', color: '#fff', padding: '4px 12px', borderRadius: 12, fontWeight: 600 }}>
              Applying to {selectedProductIds.length} Selected Products
            </span>
          ) : (
            <span style={{ fontSize: '0.82rem', color: '#777' }}>
              (No checkboxes selected: Action will apply to all {filteredProducts.length} filtered products)
            </span>
          )}
        </div>

        <FormRowGrid>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
              Bulk Action Type
            </label>
            <AdminSelect
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
            >
              <option value="APPLY_DISCOUNT_PERCENT">📉 Apply Percentage Discount (% Off)</option>
              <option value="SET_ON_SALE">🏷️ Mark Selected Products "ON SALE"</option>
              <option value="SET_FIXED_SALE_PRICE">💲 Set Fixed Sale Price ($)</option>
              <option value="SET_OFF_SALE">❌ Remove ON SALE Status</option>
              <option value="CLEAR_SALE">🧹 Clear All Sale Prices & Discounts</option>
            </AdminSelect>
          </div>

          {bulkAction === 'APPLY_DISCOUNT_PERCENT' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
                Discount Percentage (% Off)
              </label>
              <AdminInput
                type="number"
                min="1"
                max="99"
                value={bulkDiscountPercent}
                onChange={(e) => setBulkDiscountPercent(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 20 for 20% OFF"
              />
            </div>
          )}

          {bulkAction === 'SET_FIXED_SALE_PRICE' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
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

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
              ⏱️ Sale Timer / Expiration
            </label>
            <AdminSelect
              value={saleDurationHours}
              onChange={(e) => setSaleDurationHours(parseInt(e.target.value))}
            >
              <option value={0}>♾️ No Time Limit (Permanent Sale)</option>
              <option value={24}>⏳ 24 Hours (1 Day Flash Sale)</option>
              <option value={48}>⏳ 48 Hours (2 Days)</option>
              <option value={72}>⏳ 72 Hours (3 Days)</option>
              <option value={168}>⏳ 7 Days (1 Week Sale)</option>
              <option value={336}>⏳ 14 Days (2 Weeks)</option>
              <option value={-1}>📅 Custom Expiration Date & Time</option>
            </AdminSelect>
          </div>

          {saleDurationHours === -1 && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
                Custom End Date & Time
              </label>
              <AdminInput
                type="datetime-local"
                value={customSaleEndsAt}
                onChange={(e) => setCustomSaleEndsAt(e.target.value)}
              />
            </div>
          )}

          <div>
            <AdminButton
              $variant="gold"
              style={{ width: '100%', height: 42 }}
              onClick={handleExecuteBulkAction}
              $loading={executingBulk}
              icon={<CheckCircle size={14} />}
            >
              Execute Bulk Sale Update
            </AdminButton>
          </div>
        </FormRowGrid>
      </BulkToolBarCard>

      {/* FILTER & SEARCH BAR */}
      <AdminCard style={{ marginBottom: 20, padding: 18, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8c877d' }} />
          <AdminInput
            type="text"
            placeholder="Search by product title or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>

        <AdminSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ minWidth: 180 }}
        >
          <option value="All">All Categories</option>
          <option value="Rings">Rings</option>
          <option value="Earrings">Earrings</option>
          <option value="Necklaces">Necklaces</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Pendants">Pendants</option>
        </AdminSelect>

        <AdminSelect
          value={saleStatusFilter}
          onChange={(e) => setSaleStatusFilter(e.target.value)}
          style={{ minWidth: 180 }}
        >
          <option value="All">All Sale Statuses</option>
          <option value="ON_SALE">🏷️ ON SALE Only</option>
          <option value="REGULAR">Regular Price Only</option>
        </AdminSelect>
      </AdminCard>

      {/* INLINE EDIT PRODUCTS TABLE */}
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
              <th style={{ width: 56 }}>Preview</th>
              <th>Product Title & SKU</th>
              <th>Regular Price ($)</th>
              <th style={{ width: 150 }}>Discount Sale Price ($)</th>
              <th style={{ width: 150 }}>Compare Price ($)</th>
              <th style={{ width: 120 }}>ON SALE Status</th>
              <th style={{ textAlign: 'right', width: 110 }}>Quick Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading catalog products for bulk sale editor...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No products found matching filters.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p: any) => {
                const img = p.primaryImage || p.mainImage;
                const isSelected = selectedProductIds.includes(p.id);
                const draft = draftSales[p.id] || {
                  onSale: Boolean(p.onSale || p.salePrice),
                  salePrice: p.salePrice !== undefined && p.salePrice !== null ? String(p.salePrice) : '',
                  comparePrice: p.comparePrice !== undefined && p.comparePrice !== null ? String(p.comparePrice) : String(p.price || ''),
                };

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
                          alt={p.name}
                          style={{
                            width: 44,
                            height: 44,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #e8e3d9',
                          }}
                        />
                      ) : (
                        <ThumbnailFallback>
                          <Sparkles size={18} />
                        </ThumbnailFallback>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{p.name}</div>
                      <SkuChip>{p.sku}</SkuChip>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>${(p.price || 0).toLocaleString()}</span>
                    </td>
                    <td>
                      <AdminInput
                        type="number"
                        placeholder="Sale Price $"
                        value={draft.salePrice}
                        onChange={(e) => updateDraft(p.id, 'salePrice', e.target.value)}
                        style={{ height: 36, fontSize: '0.85rem' }}
                      />
                    </td>
                    <td>
                      <AdminInput
                        type="number"
                        placeholder="Compare Price $"
                        value={draft.comparePrice}
                        onChange={(e) => updateDraft(p.id, 'comparePrice', e.target.value)}
                        style={{ height: 36, fontSize: '0.85rem' }}
                      />
                    </td>
                    <td>
                      <ToggleSwitchLabel>
                        <input
                          type="checkbox"
                          checked={draft.onSale}
                          onChange={(e) => updateDraft(p.id, 'onSale', e.target.checked)}
                        />
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: draft.onSale ? '#d93838' : '#777' }}>
                          {draft.onSale ? '🏷️ ON SALE' : 'Off'}
                        </span>
                      </ToggleSwitchLabel>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <AdminButton
                        $size="sm"
                        $variant="secondary"
                        onClick={() => handleSaveInlineRow(p)}
                        $loading={savingRowId === p.id}
                        icon={<Save size={13} />}
                      >
                        Save
                      </AdminButton>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </AdminTable>
      </AdminTableContainer>

      {/* CONFIRM CLEAR ALL SALES */}
      <ConfirmModal
        isOpen={clearConfirmOpen}
        title="Clear All Sale Discounts across Catalog?"
        message="Are you sure you want to remove all sale prices, discounts, and ON SALE badges from ALL products in your catalog?"
        confirmLabel="Clear All Sales"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={async () => {
          try {
            const allIds = products.map((p) => p.id);
            await api.post('/api/v1/admin/products/bulk-sale-update', {
              productIds: allIds,
              action: 'CLEAR_SALE',
            });
            toast.success('All sale pricing cleared!');
            setClearConfirmOpen(false);
            fetchProducts();
          } catch (err) {
            toast.error('Failed to clear sales');
          }
        }}
        onCancel={() => setClearConfirmOpen(false)}
      />
    </div>
  );
};
