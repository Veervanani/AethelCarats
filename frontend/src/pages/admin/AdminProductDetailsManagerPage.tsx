import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Check,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
  FileText,
  Truck,
  ShieldCheck,
  Award,
  Upload,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { api } from '../../services/api';
import { PRIVATE_ADMIN_PATH } from '../../App';
import {
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  AdminBadge,
} from '../../components/admin/AdminUI';

const StickyTopBar = styled.div`
  position: sticky;
  top: 64px;
  z-index: 90;
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
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);

  @media (max-width: 900px) {
    top: 58px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }
`;

const ProductSelectGroup = styled.div`
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

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionCard = styled.div<{ $isActive?: boolean }>`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: ${({ $isActive }) => ($isActive === false ? 0.6 : 1)};
  transition: all 0.2s ease;
`;

const CardTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2ede4;
  padding-bottom: 14px;

  .title-group {
    display: flex;
    align-items: center;
    gap: 10px;

    h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.35rem;
      font-weight: 600;
      color: #1f1f1f;
      margin: 0;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const ItemRow = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e3d9;
    padding-bottom: 10px;

    .row-title {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #c9a45c;
    }

    .row-controls {
      display: flex;
      gap: 6px;
    }
  }
`;

const Grid2Col = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SpecRowItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  padding: 10px 14px;
  border-radius: 6px;
`;

const DEFAULT_SECTIONS = [
  {
    type: 'OVERVIEW',
    title: 'Product Overview & Highlights',
    description: 'General narrative overview, craftsmanship highlights, and diamond description.',
    isActive: true,
    displayOrder: 0,
    items: [
      { title: 'Product Description', description: 'A luxury Aura Diamond Atelier creation handcrafted in Surat, India.', isActive: true, displayOrder: 0 },
      { title: 'Craftsmanship Description', description: 'Hand-set under 40x microscopic precision by master artisans.', isActive: true, displayOrder: 1 },
      { title: 'Diamond & Gemstone Description', description: 'Certified conflict-free diamonds with Kimberley Process compliance.', isActive: true, displayOrder: 2 },
      { title: 'Customization Options', description: 'Customizable with 7 precious metal selections and bespoke engraving.', isActive: true, displayOrder: 3 }
    ]
  },
  {
    type: 'EXPERIENCE',
    title: 'YOUR AURA DIAMOND ATELIER EXPERIENCE',
    description: 'Luxury atelier benefits and white-glove experience assurances.',
    isActive: true,
    displayOrder: 1,
    items: [
      { title: 'Expert Guidance', description: 'Consult directly with Aura Diamond Atelier specialists for sizing and diamond guidance.', icon: 'UserCheck', isActive: true, displayOrder: 0 },
      { title: 'Bespoke Craftsmanship', description: 'Custom CAD 3D photorealistic rendering and master goldsmithing.', icon: 'Sparkles', isActive: true, displayOrder: 1 },
      { title: 'Quality Assurance', description: 'Independently certified by GIA / IGI with 40x microscopic quality control.', icon: 'ShieldCheck', isActive: true, displayOrder: 2 },
      { title: 'Lifetime Service', description: 'Includes complimentary annual prong checking, sizing, and professional cleaning.', icon: 'Award', isActive: true, displayOrder: 3 }
    ]
  },
  {
    type: 'SPECIFICATIONS',
    title: 'PRODUCT & DIAMOND SPECIFICATIONS',
    description: 'Technical diamond and metal specification breakdown.',
    isActive: true,
    displayOrder: 2,
    items: [
      { title: 'Primary Stone Type', value: 'Lab-Grown Solitaire Diamond (VVS / VS1)', isActive: true, displayOrder: 0 },
      { title: 'Metal Options', value: '14K Gold / 18K Gold', isActive: true, displayOrder: 1 },
      { title: 'Setting Style', value: 'Hand-set Prong Setting', isActive: true, displayOrder: 2 },
      { title: 'Diamond Certification', value: 'GIA / IGI Certified', isActive: true, displayOrder: 3 },
      { title: 'Ring Size Range', value: 'US 4 to US 12 (Complimentary Resizing)', isActive: true, displayOrder: 4 },
      { title: 'Conflict-Free Standard', value: '100% Ethical & Sustainable Sourcing', isActive: true, displayOrder: 5 },
      { title: 'Precious Metal Recycling', value: '100% Recycled Fine Gold', isActive: true, displayOrder: 6 },
      { title: 'Country of Origin', value: 'India (Surat Atelier)', isActive: true, displayOrder: 7 },
    ]
  },
  {
    type: 'CRAFTSMANSHIP',
    title: 'CRAFTSMANSHIP & SUSTAINABILITY',
    description: 'Recycled precious metals and ethical artisan heritage.',
    isActive: true,
    displayOrder: 3,
    items: [
      { title: 'Microscopic Precision Setting', description: 'Every diamond is set under 40x microscopic magnification by master gem-setters.', icon: 'Award', isActive: true, displayOrder: 0 },
      { title: 'Surat Goldsmith Heritage', description: 'Crafted individually by master jewelers with lifetime guarantee.', icon: 'Sparkles', isActive: true, displayOrder: 1 }
    ]
  },
  {
    type: 'SHIPPING',
    title: 'SHIPPING & DELIVERY',
    description: 'Complimentary insured courier shipping and returns timeline.',
    isActive: true,
    displayOrder: 4,
    items: [
      { title: 'Free Insured Delivery', description: 'Dispatched via fully insured Priority Air in unbranded security packaging.', icon: 'Truck', isActive: true, displayOrder: 0 },
      { title: '30-Day Money Back Guarantee', description: 'Complimentary returns and size adjustments within 30 days of receipt.', icon: 'ShieldCheck', isActive: true, displayOrder: 1 }
    ]
  }
];

export const AdminProductDetailsManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProductIdFromUrl = searchParams.get('productId') || '';

  const [productsList, setProductsList] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>(selectedProductIdFromUrl);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadingItemIdx, setUploadingItemIdx] = useState<{ secIdx: number; itemIdx: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUploadRef = useRef<{ secIdx: number; itemIdx: number } | null>(null);

  useEffect(() => {
    loadProductsCatalog();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      loadProductDetails(selectedProductId);
    }
  }, [selectedProductId]);

  const loadProductsCatalog = async () => {
    try {
      const res = await api.getProducts({ status: 'ALL', limit: 100 });
      const prods = res.products || [];
      setProductsList(prods);
      if (!selectedProductId && prods.length > 0) {
        setSelectedProductId(prods[0].id);
      }
    } catch (err) {
      console.error('Failed to load products list:', err);
    }
  };

  const loadProductDetails = async (productId: string) => {
    try {
      setLoading(true);
      setSuccessMsg('');
      setErrorMsg('');

      const res = await api.get(`/api/v1/admin/products/${productId}/details`);
      setSelectedProduct(res.data.product);

      if (res.data.sections && res.data.sections.length > 0) {
        setSections(res.data.sections);
      } else {
        setSections(DEFAULT_SECTIONS);
      }
    } catch (err: any) {
      console.error('Failed to load product details:', err);
      setSections(DEFAULT_SECTIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setSearchParams({ productId: id });
  };

  const handleSave = async (andPreview: boolean = false) => {
    if (!selectedProductId) return;
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');

      const payload = {
        sections: sections.map((sec, secIdx) => ({
          ...sec,
          displayOrder: secIdx,
          items: (sec.items || []).map((item: any, itemIdx: number) => ({
            ...item,
            displayOrder: itemIdx,
          }))
        }))
      };

      const res = await api.post(`/api/v1/admin/products/${selectedProductId}/details`, payload);
      setSections(res.data.sections || sections);
      setSuccessMsg('Product details & specifications saved successfully!');

      if (andPreview && selectedProduct) {
        const catSlug = selectedProduct.category?.slug || 'rings';
        const productUrl = `/${catSlug}/${selectedProduct.slug}`;
        window.open(productUrl, '_blank');
      }

      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to save product details.');
    } finally {
      setSaving(false);
    }
  };

  // Section manipulation
  const handleMoveSection = (index: number, dir: 'up' | 'down') => {
    const targetIdx = dir === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSections(updated);
  };

  const handleToggleSectionActive = (index: number) => {
    const updated = [...sections];
    updated[index].isActive = !updated[index].isActive;
    setSections(updated);
  };

  const handleDeleteSection = (index: number) => {
    if (window.confirm('Delete this product detail section?')) {
      const updated = sections.filter((_, i) => i !== index);
      setSections(updated);
    }
  };

  const handleAddSection = () => {
    const newSec = {
      type: 'CUSTOM',
      title: 'New Custom Section',
      description: 'Expandable custom content section',
      isActive: true,
      displayOrder: sections.length,
      items: [
        { title: 'Custom Detail Title', description: 'Enter details here...', isActive: true, displayOrder: 0 }
      ]
    };
    setSections([...sections, newSec]);
  };

  // Item manipulation inside a section
  const handleMoveItem = (secIdx: number, itemIdx: number, dir: 'up' | 'down') => {
    const items = [...(sections[secIdx].items || [])];
    const targetIdx = dir === 'up' ? itemIdx - 1 : itemIdx + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[itemIdx];
    items[itemIdx] = items[targetIdx];
    items[targetIdx] = temp;

    const updatedSecs = [...sections];
    updatedSecs[secIdx] = { ...updatedSecs[secIdx], items };
    setSections(updatedSecs);
  };

  const handleToggleItemActive = (secIdx: number, itemIdx: number) => {
    const updatedSecs = [...sections];
    const items = [...(updatedSecs[secIdx].items || [])];
    items[itemIdx].isActive = !items[itemIdx].isActive;
    updatedSecs[secIdx] = { ...updatedSecs[secIdx], items };
    setSections(updatedSecs);
  };

  const handleDeleteItem = (secIdx: number, itemIdx: number) => {
    const updatedSecs = [...sections];
    const items = (updatedSecs[secIdx].items || []).filter((_: any, i: number) => i !== itemIdx);
    updatedSecs[secIdx] = { ...updatedSecs[secIdx], items };
    setSections(updatedSecs);
  };

  const handleAddItem = (secIdx: number) => {
    const updatedSecs = [...sections];
    const items = [...(updatedSecs[secIdx].items || [])];
    const secType = updatedSecs[secIdx].type;

    if (secType === 'SPECIFICATIONS') {
      items.push({ title: 'New Specification', value: 'Enter Value', isActive: true, displayOrder: items.length });
    } else {
      items.push({ title: 'New Feature Title', description: 'Enter description text here...', isActive: true, displayOrder: items.length });
    }

    updatedSecs[secIdx] = { ...updatedSecs[secIdx], items };
    setSections(updatedSecs);
  };

  const handleItemFieldChange = (secIdx: number, itemIdx: number, field: string, value: any) => {
    const updatedSecs = [...sections];
    const items = [...(updatedSecs[secIdx].items || [])];
    items[itemIdx] = { ...items[itemIdx], [field]: value };
    updatedSecs[secIdx] = { ...updatedSecs[secIdx], items };
    setSections(updatedSecs);
  };

  const handleTriggerUpload = (secIdx: number, itemIdx: number) => {
    activeUploadRef.current = { secIdx, itemIdx };
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !activeUploadRef.current) return;
    const { secIdx, itemIdx } = activeUploadRef.current;
    try {
      setUploadingItemIdx({ secIdx, itemIdx });
      const formData = new FormData();
      formData.append('files', e.target.files[0]);

      const token = localStorage.getItem('admin_session_token') || localStorage.getItem('app_auth_token');
      const res = await fetch('/api/v1/admin/media/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      const uploadedUrl = data.media?.[0]?.url || data.url;

      if (uploadedUrl) {
        handleItemFieldChange(secIdx, itemIdx, 'imageUrl', uploadedUrl);
      }
    } catch (err: any) {
      alert(`Image upload failed: ${err.message}`);
    } finally {
      setUploadingItemIdx(null);
      activeUploadRef.current = null;
    }
  };

  return (
    <div>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />

      {/* STICKY TOP HEADER */}
      <StickyTopBar>
        <ProductSelectGroup>
          <Layers size={22} color="#c9a45c" />
          <h1>Product Details Manager</h1>
          <AdminSelect
            value={selectedProductId}
            onChange={(e) => handleSelectProduct(e.target.value)}
            style={{ minWidth: 320, padding: '8px 14px', fontSize: '0.88rem', fontWeight: 600 }}
          >
            {productsList.length === 0 ? (
              <option value="">-- No Products in Catalog (Upload CSV First) --</option>
            ) : (
              productsList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title || p.name} ({p.sku || p.jewelleryType || 'Product'})
                </option>
              ))
            )}
          </AdminSelect>
        </ProductSelectGroup>

        <div style={{ display: 'flex', gap: 10 }}>
          <AdminButton
            $variant="secondary"
            onClick={() => handleSave(true)}
            $loading={saving}
            disabled={productsList.length === 0}
            icon={<ExternalLink size={14} />}
          >
            Save & Preview
          </AdminButton>
          <AdminButton
            $variant="gold"
            onClick={() => handleSave(false)}
            $loading={saving}
            disabled={productsList.length === 0}
            icon={<Save size={14} />}
          >
            Save Changes
          </AdminButton>
        </div>
      </StickyTopBar>

      {productsList.length === 0 && !loading && (
        <div style={{ maxWidth: 1400, margin: '20px auto', background: '#faf8f5', border: '1px solid #e8e3d9', padding: '36px 24px', borderRadius: 8, textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: 8 }}>
            No Products Available in Catalog
          </h3>
          <p style={{ color: '#77736c', fontSize: '0.94rem', marginBottom: 24 }}>
            Your product catalog is currently empty. Upload your Etsy CSV or create a product to select and customize product details.
          </p>
          <AdminButton $variant="gold" onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products/bulk-upload`)}>
            Go to Bulk Product Upload
          </AdminButton>
        </div>
      )}

      {successMsg && (
        <div style={{ maxWidth: 1400, margin: '0 auto 20px', background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
          <Check size={18} /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ maxWidth: 1400, margin: '0 auto 20px', background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ padding: 80, textAlign: 'center', color: '#777', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem' }}>
          Loading product details for selected product...
        </div>
      ) : (
        <Container>
          {sections.map((sec, secIdx) => (
            <SectionCard key={sec.id || secIdx} $isActive={sec.isActive}>
              <CardTopRow>
                <div className="title-group">
                  <AdminInput
                    type="text"
                    value={sec.title || ''}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[secIdx].title = e.target.value;
                      setSections(updated);
                    }}
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 600, width: 340 }}
                    placeholder="Section Title"
                  />
                  <AdminBadge $variant={sec.isActive ? 'active' : 'draft'}>
                    {sec.type || 'CUSTOM'}
                  </AdminBadge>
                </div>

                <div className="actions">
                  <AdminButton
                    $variant="secondary"
                    $size="sm"
                    disabled={secIdx === 0}
                    onClick={() => handleMoveSection(secIdx, 'up')}
                    icon={<MoveUp size={12} />}
                  />
                  <AdminButton
                    $variant="secondary"
                    $size="sm"
                    disabled={secIdx === sections.length - 1}
                    onClick={() => handleMoveSection(secIdx, 'down')}
                    icon={<MoveDown size={12} />}
                  />
                  <AdminButton
                    $variant={sec.isActive ? 'secondary' : 'ghost'}
                    $size="sm"
                    onClick={() => handleToggleSectionActive(secIdx)}
                  >
                    {sec.isActive ? 'ACTIVE' : 'DISABLED'}
                  </AdminButton>
                  <AdminButton
                    $variant="gold"
                    $size="sm"
                    onClick={() => handleAddItem(secIdx)}
                    icon={<Plus size={12} />}
                  >
                    {sec.type === 'SPECIFICATIONS' ? '+ Add Specification' : '+ Add Item'}
                  </AdminButton>
                  <AdminButton
                    $variant="danger"
                    $size="sm"
                    onClick={() => handleDeleteSection(secIdx)}
                    icon={<Trash2 size={12} />}
                  />
                </div>
              </CardTopRow>

              {/* SPECIFICATIONS SECTION TYPE */}
              {sec.type === 'SPECIFICATIONS' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(sec.items || []).map((item: any, itemIdx: number) => (
                    <SpecRowItem key={item.id || itemIdx}>
                      <AdminInput
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'title', e.target.value)}
                        placeholder="Label (e.g. Diamond Cut)"
                        style={{ flex: 1 }}
                      />
                      <AdminInput
                        type="text"
                        value={item.value || ''}
                        onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'value', e.target.value)}
                        placeholder="Value (e.g. Excellent)"
                        style={{ flex: 1.5 }}
                      />
                      <AdminButton
                        $variant="secondary"
                        $size="sm"
                        disabled={itemIdx === 0}
                        onClick={() => handleMoveItem(secIdx, itemIdx, 'up')}
                        icon={<MoveUp size={12} />}
                      />
                      <AdminButton
                        $variant="secondary"
                        $size="sm"
                        disabled={itemIdx === (sec.items || []).length - 1}
                        onClick={() => handleMoveItem(secIdx, itemIdx, 'down')}
                        icon={<MoveDown size={12} />}
                      />
                      <AdminButton
                        $variant="danger"
                        $size="sm"
                        onClick={() => handleDeleteItem(secIdx, itemIdx)}
                        icon={<Trash2 size={12} />}
                      />
                    </SpecRowItem>
                  ))}
                </div>
              ) : (
                /* REGULAR ACCORDION CONTENT ITEMS */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {(sec.items || []).map((item: any, itemIdx: number) => (
                    <ItemRow key={item.id || itemIdx}>
                      <div className="row-header">
                        <span className="row-title">Item #{itemIdx + 1}: {item.title || 'Untitled'}</span>
                        <div className="row-controls">
                          <AdminButton
                            $variant="secondary"
                            $size="sm"
                            disabled={itemIdx === 0}
                            onClick={() => handleMoveItem(secIdx, itemIdx, 'up')}
                            icon={<MoveUp size={12} />}
                          />
                          <AdminButton
                            $variant="secondary"
                            $size="sm"
                            disabled={itemIdx === (sec.items || []).length - 1}
                            onClick={() => handleMoveItem(secIdx, itemIdx, 'down')}
                            icon={<MoveDown size={12} />}
                          />
                          <AdminButton
                            $variant={item.isActive ? 'secondary' : 'ghost'}
                            $size="sm"
                            onClick={() => handleToggleItemActive(secIdx, itemIdx)}
                          >
                            {item.isActive ? 'ENABLED' : 'DISABLED'}
                          </AdminButton>
                          <AdminButton
                            $variant="danger"
                            $size="sm"
                            onClick={() => handleDeleteItem(secIdx, itemIdx)}
                            icon={<Trash2 size={12} />}
                          />
                        </div>
                      </div>

                      <Grid2Col>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#444', marginBottom: 4, display: 'block' }}>Item Title</label>
                          <AdminInput
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'title', e.target.value)}
                            placeholder="e.g. Free Insured Delivery"
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#444', marginBottom: 4, display: 'block' }}>Icon / Badge (Optional)</label>
                          <AdminInput
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'icon', e.target.value)}
                            placeholder="e.g. ShieldCheck, Truck, Award"
                          />
                        </div>
                      </Grid2Col>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#444', marginBottom: 4, display: 'block' }}>Description Content</label>
                        <AdminTextarea
                          rows={2}
                          value={item.description || ''}
                          onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'description', e.target.value)}
                          placeholder="Detailed narrative text or features..."
                        />
                      </div>

                      {(sec.type === 'CRAFTSMANSHIP' || sec.type === 'CUSTOM') && (
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#444', marginBottom: 4, display: 'block' }}>Content Image (Optional)</label>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <AdminInput
                              type="text"
                              value={item.imageUrl || ''}
                              onChange={(e) => handleItemFieldChange(secIdx, itemIdx, 'imageUrl', e.target.value)}
                              placeholder="Image URL (e.g. /assets/gem_cad.png)"
                              style={{ flex: 1 }}
                            />
                            <AdminButton
                              $variant="secondary"
                              $size="sm"
                              onClick={() => handleTriggerUpload(secIdx, itemIdx)}
                              $loading={uploadingItemIdx?.secIdx === secIdx && uploadingItemIdx?.itemIdx === itemIdx}
                              icon={<Upload size={12} />}
                            >
                              Upload
                            </AdminButton>
                          </div>
                        </div>
                      )}
                    </ItemRow>
                  ))}
                </div>
              )}
            </SectionCard>
          ))}

          <AdminButton
            $variant="gold"
            onClick={handleAddSection}
            icon={<Plus size={14} />}
            style={{ width: '100%', padding: '14px', marginTop: 10 }}
          >
            + Add Custom Product Detail Section
          </AdminButton>
        </Container>
      )}
    </div>
  );
};
