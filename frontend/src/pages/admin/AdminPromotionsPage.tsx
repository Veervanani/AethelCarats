import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, Edit3, Eye, EyeOff, Check, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { AdminImageUploadField } from '../../components/admin/AdminImageUploadField';

const PageWrapper = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin: 0;
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #1f1f1f;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }
`;

const PromoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
`;

const PromoCard = styled.div<{ $active: boolean }>`
  background: #ffffff;
  border: 1px solid ${({ $active }) => ($active ? '#e8e3d9' : '#e5e5e5')};
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};
  padding: 20px;
  position: relative;

  .banner-preview {
    height: 140px;
    background-size: cover;
    background-position: center;
    background-color: #f7f5f0;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 0.8rem;
  }

  .title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1f1f1f;
    margin-bottom: 4px;
  }

  .type-badge {
    display: inline-block;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    background: #faf5eb;
    color: #c9a45c;
    border: 1px solid #d9d3c7;
    margin-bottom: 10px;
  }

  .card-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    border-top: 1px solid #f4eae0;
    padding-top: 12px;
    margin-top: 12px;
  }
`;

const SmallBtn = styled.button`
  padding: 6px 12px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #fff;
  border: 1px solid #d9d3c7;
  color: #1f1f1f;
  cursor: pointer;

  &:hover {
    border-color: #c9a45c;
    color: #c9a45c;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(24, 23, 21, 0.75);
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
  width: 100%;
  max-width: 560px;
  padding: 32px;
  max-height: 90vh;
  overflow-y: auto;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    margin: 0 0 16px 0;
  }

  .field {
    margin-bottom: 14px;
    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    input, select, textarea {
      width: 100%;
      padding: 10px 12px;
      font-size: 0.88rem;
      border: 1px solid #d9d3c7;
      background: #faf5eb;
      outline: none;
    }
  }

  .btn-row {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }
`;

export const AdminPromotionsPage: React.FC = () => {
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'HERO_SLIDE',
    heading: '',
    subheading: '',
    description: '',
    imageUrl: '',
    mobileImageUrl: '',
    buttonText: 'DISCOVER MORE',
    buttonUrl: '/collections',
    isActive: true,
  });

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const data = await api.getPromotions({ includeInactive: true });
      setPromos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleOpenAdd = () => {
    setEditingPromo(null);
    setFormData({
      title: '',
      type: 'HERO_SLIDE',
      heading: '',
      subheading: '',
      description: '',
      imageUrl: '',
      mobileImageUrl: '',
      buttonText: 'DISCOVER MORE',
      buttonUrl: '/collections',
      isActive: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditingPromo(p);
    setFormData({
      title: p.title || '',
      type: p.type || 'HERO_SLIDE',
      heading: p.heading || '',
      subheading: p.subheading || '',
      description: p.description || '',
      imageUrl: p.imageUrl || '',
      mobileImageUrl: p.mobileImageUrl || '',
      buttonText: p.buttonText || 'DISCOVER MORE',
      buttonUrl: p.buttonUrl || '/collections',
      isActive: p.isActive !== false,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title) return;
    try {
      if (editingPromo) {
        await api.updatePromotion(editingPromo.id, formData);
      } else {
        await api.createPromotion(formData);
      }
      setShowModal(false);
      fetchPromos();
    } catch (err: any) {
      alert('Failed to save promotion.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this promotion banner?')) return;
    try {
      await api.deletePromotion(id);
      fetchPromos();
    } catch (err) {
      alert('Failed to delete promotion.');
    }
  };

  return (
    <PageWrapper>
      <Header>
        <div>
          <h1>PROMOTIONS & BANNERS</h1>
          <div style={{ fontSize: '0.85rem', color: '#777', marginTop: '4px' }}>
            Manage homepage hero slides, promo banners, announcement topbars, and popups
          </div>
        </div>
        <PrimaryButton onClick={handleOpenAdd}>
          <Plus size={16} /> ADD BLESSED PROMO
        </PrimaryButton>
      </Header>

      <PromoGrid>
        {loading ? (
          <div style={{ color: '#777' }}>Loading promotions...</div>
        ) : (
          promos.map((p) => (
            <PromoCard key={p.id} $active={p.isActive}>
              <div
                className="banner-preview"
                style={{ backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : undefined }}
              >
                {!p.imageUrl && 'No Image Banner'}
              </div>
              <div className="type-badge">{p.type}</div>
              <div className="title">{p.title}</div>
              <div style={{ fontSize: '0.82rem', color: '#666', marginBottom: '8px' }}>
                {p.heading || 'No Heading'}
              </div>

              <div className="card-actions">
                <SmallBtn onClick={() => handleOpenEdit(p)}>
                  <Edit3 size={12} /> Edit
                </SmallBtn>
                <SmallBtn onClick={() => handleDelete(p.id)}>
                  <Trash2 size={12} color="#c53030" /> Delete
                </SmallBtn>
              </div>
            </PromoCard>
          ))
        )}
      </PromoGrid>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>{editingPromo ? 'EDIT PROMOTION' : 'CREATE PROMOTION'}</h3>

            <div className="field">
              <label>Promotion Internal Name</label>
              <input
                type="text"
                placeholder="e.g. Summer Solitaire Campaign Hero"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Banner Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="HERO_SLIDE">HOMEPAGE HERO SLIDE</option>
                <option value="PROMO_BANNER">PROMOTIONAL BANNER</option>
                <option value="ANNOUNCEMENT">ANNOUNCEMENT TOPBAR</option>
                <option value="POPUP">PROMOTIONAL POPUP</option>
              </select>
            </div>

            <div className="field">
              <label>Display Heading</label>
              <input
                type="text"
                placeholder="e.g. THE SOLITAIRE COLLECTION"
                value={formData.heading}
                onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              />
            </div>

            <div className="field full-width">
              <AdminImageUploadField
                label="Desktop Image"
                value={formData.imageUrl}
                onChange={(val) => setFormData({ ...formData, imageUrl: val })}
              />
            </div>

            <div className="field full-width">
              <AdminImageUploadField
                label="Mobile Image"
                value={formData.mobileImageUrl}
                onChange={(val) => setFormData({ ...formData, mobileImageUrl: val })}
              />
            </div>

            <div className="field">
              <label>Button Text</label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Target URL / Link</label>
              <input
                type="text"
                value={formData.buttonUrl}
                onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
              />
            </div>

            <div className="btn-row">
              <SmallBtn onClick={() => setShowModal(false)}>CANCEL</SmallBtn>
              <PrimaryButton onClick={handleSave}>SAVE PROMOTION</PrimaryButton>
            </div>
          </ModalCard>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};
