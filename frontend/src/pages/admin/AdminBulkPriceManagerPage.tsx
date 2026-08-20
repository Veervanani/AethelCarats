import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  CheckCircle,
  Sliders,
  Sparkles,
  Save,
  Tag,
  Percent,
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useToast } from '../../context/ToastContext';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
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

export const AdminBulkPriceManagerPage: React.FC = () => {
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Selection & Bulk Action State
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('INCREASE_PERCENT');
  const [percentValue, setPercentValue] = useState<number>(10);
  const [flatAmount, setFlatAmount] = useState<number>(100);
  const [fixedPrice, setFixedPrice] = useState<number>(2499);
  const [executingBulk, setExecutingBulk] = useState<boolean>(false);

  // Inline Editing State per Product
  const [draftPrices, setDraftPrices] = useState<{ [id: string]: { price: string; salePrice: string; comparePrice: string } }>({});
  const [savingRowId, setSavingRowId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts({ status: 'ALL', limit: 500 });
      const list = data.products || [];
      setProducts(list);

      // Populate draft pricing state
      const initialDrafts: any = {};
      list.forEach((p: any) => {
        initialDrafts[p.id] = {
          price: p.price !== undefined && p.price !== null ? String(p.price) : '',
          salePrice: p.salePrice !== undefined && p.salePrice !== null ? String(p.salePrice) : '',
          comparePrice: p.comparePrice !== undefined && p.comparePrice !== null ? String(p.comparePrice) : String(p.price || ''),
        };
      });
      setDraftPrices(initialDrafts);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products for Bulk Price Editor.');
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

    const priceVal = p.price || 0;
    const minVal = minPrice !== '' ? parseFloat(minPrice) : 0;
    const maxVal = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = priceVal >= minVal && priceVal <= maxVal;

    return matchesSearch && matchesCategory && matchesPrice;
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

  // Execute Bulk Price Operation
  const handleExecuteBulkPriceAction = async () => {
    const targetIds = selectedProductIds.length > 0 ? selectedProductIds : filteredProducts.map((p) => p.id);

    if (targetIds.length === 0) {
      toast.error('No products selected for bulk price update.');
      return;
    }

    try {
      setExecutingBulk(true);
      await api.post('/api/v1/admin/products/bulk-price-update', {
        productIds: targetIds,
        action: bulkAction,
        percentValue,
        flatAmount,
        fixedPrice,
      });

      toast.success(`Bulk price update successfully applied to ${targetIds.length} products!`);
      setSelectedProductIds([]);
      fetchProducts();
    } catch (err: any) {
      console.error('Bulk price error:', err);
      toast.error(err.response?.data?.message || 'Failed to execute bulk price update');
    } finally {
      setExecutingBulk(false);
    }
  };

  // Inline Row Save (Update base price, sale price, compare price)
  const handleSaveInlineRow = async (product: any) => {
    const draft = draftPrices[product.id];
    if (!draft) return;

    try {
      setSavingRowId(product.id);

      // Save updated base price & sale info
      await api.put(`/api/v1/admin/products/${product.id}/sale-price`, {
        onSale: Boolean(draft.salePrice !== ''),
        salePrice: draft.salePrice !== '' ? parseFloat(draft.salePrice) : null,
        comparePrice: draft.comparePrice !== '' ? parseFloat(draft.comparePrice) : null,
      });

      // Update full product base price if changed
      if (draft.price !== String(product.price)) {
        await api.post('/api/v1/products', {
          ...product,
          price: parseFloat(draft.price) || product.price,
        });
      }

      toast.success(`Updated prices for ${product.name}`);
      fetchProducts();
    } catch (err: any) {
      console.error('Inline price save error:', err);
      toast.error('Failed to update product pricing');
    } finally {
      setSavingRowId(null);
    }
  };

  const updateDraft = (id: string, field: string, value: string) => {
    setDraftPrices((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Stats calculation
  const totalPricesSum = products.reduce((acc, p: any) => acc + (p.price || 0), 0);
  const avgPrice = products.length > 0 ? (totalPricesSum / products.length).toFixed(0) : '0';
  const highestPrice = products.length > 0 ? Math.max(...products.map((p: any) => p.price || 0)) : 0;
  const lowestPrice = products.length > 0 ? Math.min(...products.map((p: any) => p.price || 0)) : 0;

  return (
    <div>
      <AdminPageHeader
        title={`Bulk Price Editor & Manager (${products.length} Products)`}
        description="Mass update regular product prices, apply percentage price increases/markdowns, or set fixed catalog prices."
        actions={
          <AdminButton
            $variant="gold"
            onClick={handleExecuteBulkPriceAction}
            $loading={executingBulk}
            icon={<DollarSign size={14} />}
          >
            Apply Bulk Price Change ({selectedProductIds.length > 0 ? selectedProductIds.length : filteredProducts.length} Items)
          </AdminButton>
        }
      />

      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #c9a45c' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>{products.length}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Total Products in Catalog</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #137333' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#137333' }}>${Number(avgPrice).toLocaleString()}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Average Catalog Price</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #19202a' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#19202a' }}>${highestPrice.toLocaleString()}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Highest Price Item</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #b06000' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#b06000' }}>${lowestPrice.toLocaleString()}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Lowest Price Item</div>
        </AdminCard>
      </div>

      {/* MASS BULK PRICE OPERATIONS TOOLBAR */}
      <BulkToolBarCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sliders size={18} color="#c9a45c" /> Mass Price Calculation & Batch Updates
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
              Price Update Action
            </label>
            <AdminSelect
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
            >
              <option value="INCREASE_PERCENT">📈 Increase Base Price by % (+)</option>
              <option value="DECREASE_PERCENT">📉 Decrease Base Price by % (-)</option>
              <option value="INCREASE_FLAT">💵 Increase Base Price by Flat $ (+)</option>
              <option value="DECREASE_FLAT">🏷️ Decrease Base Price by Flat $ (-)</option>
              <option value="SET_UNIFORM_PRICE">💲 Set Uniform Fixed Base Price ($)</option>
            </AdminSelect>
          </div>

          {(bulkAction === 'INCREASE_PERCENT' || bulkAction === 'DECREASE_PERCENT') && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
                Percentage Change (%)
              </label>
              <AdminInput
                type="number"
                min="1"
                max="99"
                value={percentValue}
                onChange={(e) => setPercentValue(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 10 for 10%"
              />
            </div>
          )}

          {(bulkAction === 'INCREASE_FLAT' || bulkAction === 'DECREASE_FLAT') && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
                Flat Dollar Amount ($)
              </label>
              <AdminInput
                type="number"
                value={flatAmount}
                onChange={(e) => setFlatAmount(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 100"
              />
            </div>
          )}

          {bulkAction === 'SET_UNIFORM_PRICE' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 6 }}>
                Fixed Price ($)
              </label>
              <AdminInput
                type="number"
                value={fixedPrice}
                onChange={(e) => setFixedPrice(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 2499"
              />
            </div>
          )}

          <div>
            <AdminButton
              $variant="gold"
              style={{ width: '100%', height: 42 }}
              onClick={handleExecuteBulkPriceAction}
              $loading={executingBulk}
              icon={<CheckCircle size={14} />}
            >
              Execute Price Update
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

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <AdminInput
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: 100 }}
          />
          <span style={{ color: '#888' }}>-</span>
          <AdminInput
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: 100 }}
          />
        </div>
      </AdminCard>

      {/* INLINE PRICE EDIT TABLE */}
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
              <th style={{ width: 160 }}>Base Price ($)</th>
              <th style={{ width: 160 }}>Sale Price ($)</th>
              <th style={{ width: 160 }}>Compare Price ($)</th>
              <th style={{ textAlign: 'right', width: 110 }}>Quick Save</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading catalog prices...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No products found matching filters.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p: any) => {
                const img = p.primaryImage || p.mainImage;
                const isSelected = selectedProductIds.includes(p.id);
                const draft = draftPrices[p.id] || {
                  price: String(p.price || ''),
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
                      <AdminInput
                        type="number"
                        placeholder="Base Price $"
                        value={draft.price}
                        onChange={(e) => updateDraft(p.id, 'price', e.target.value)}
                        style={{ height: 36, fontSize: '0.88rem', fontWeight: 700 }}
                      />
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
    </div>
  );
};
