import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Upload,
  X,
  Check,
  Tag,
  Link as LinkIcon
} from 'lucide-react';
import { api } from '../../services/api';
import { HeroBanner } from '../../types';
import { AdminPageHeader, AdminButton } from '../../components/admin/AdminUI';
import { AdminImageUploadField } from '../../components/admin/AdminImageUploadField';

const SectionCard = styled.div<{ $disabled?: boolean }>`
  background: #ffffff;
  border: 1px solid ${({ $disabled }) => ($disabled ? '#e0e0e0' : '#e8e3d9')};
  opacity: ${({ $disabled }) => ($disabled ? 0.75 : 1)};
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 2px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 12px;
    margin-bottom: 18px;

    .title-box {
      display: flex;
      align-items: center;
      gap: 12px;

      h3 {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.5rem;
        color: #1f1f1f;
        margin: 0;
      }

      .badge {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 3px 8px;
        background: #faf5eb;
        border: 1px solid #d9d3c7;
        color: #c9a45c;
      }
    }

    .header-actions {
      display: flex;
      gap: 8px;
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .full-width {
    grid-column: span 2;
  }

  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 6px;
  }

  input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    font-size: 0.88rem;
    border: 1px solid #d9d3c7;
    background: #faf5eb;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: #c9a45c;
      background: #ffffff;
    }
  }
`;

const SmallBtn = styled.button`
  padding: 6px 12px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #ffffff;
  border: 1px solid #d9d3c7;
  color: #1f1f1f;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9a45c;
    color: #c9a45c;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #1f1f1f;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BannerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  th {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #666;
    background: #f9f7f2;
    padding: 12px 14px;
    text-align: left;
    border-bottom: 1px solid #e8e3d9;
  }

  td {
    padding: 14px;
    font-size: 0.88rem;
    border-bottom: 1px solid #f2ede4;
    vertical-align: middle;
  }

  tr:hover td {
    background-color: #faf9f6;
  }
`;

const ThumbnailImg = styled.img`
  width: 110px;
  height: 62px;
  object-fit: cover;
  border: 1px solid #d9d3c7;
  background: #f3efe6;
  display: block;
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: #faf5eb;
  color: #c9a45c;
  border: 1px solid #e5dccb;
  border-radius: 2px;
`;

const StatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: ${({ $active }) => ($active ? '#eaf7ed' : '#fdeded')};
  color: ${({ $active }) => ($active ? '#278838' : '#d32f2f')};
  border: 1px solid ${({ $active }) => ($active ? '#c3e6cb' : '#f5c6cb')};
  border-radius: 2px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalCard = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 820px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #d9d3c7;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  padding: 28px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2ede4;
  padding-bottom: 16px;
  margin-bottom: 20px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    margin: 0;
    color: #1f1f1f;
  }
`;

const DropZone = styled.div<{ $hasPreview?: boolean }>`
  border: 2px dashed ${({ $hasPreview }) => ($hasPreview ? '#c9a45c' : '#d9d3c7')};
  background: #faf5eb;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: #c9a45c;
    background: #ffffff;
  }

  p {
    margin: 8px 0 4px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #333;
  }

  span {
    font-size: 0.75rem;
    color: #777;
  }
`;

const WarningBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff8e6;
  border: 1px solid #ffe0b2;
  color: #b7791f;
  padding: 10px 14px;
  font-size: 0.78rem;
  margin-top: 10px;
  line-height: 1.4;
`;

const PRODUCT_TYPE_OPTIONS = [
  'Engagement Ring',
  'Ring',
  'Necklace',
  'Earrings',
  'Bracelet',
  'Pendant',
  'Diamond',
  'Custom',
];

export const AdminHomepageManagerPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // 1. DYNAMIC HERO BANNERS DATA FROM DB
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<HeroBanner> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Upload state
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string>('');
  const [mobilePreview, setMobilePreview] = useState<string>('');
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number; fileSizeKB: number } | null>(null);
  const [aspectWarning, setAspectWarning] = useState<string | null>(null);

  const desktopFileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);

  // 2. FEATURED CARDS CONFIG
  const [featuredCards, setFeaturedCards] = useState([
    {
      title: 'RIVIÈRE NECKLACES',
      subtitle: 'Solitaire & Tennis Necklaces',
      imageUrl: '/assets/floksy_necklaces_cat.png',
      mobileImageUrl: '/assets/floksy_necklaces_cat.png',
      targetUrl: '/necklaces?category=tennis',
      isEnabled: true,
    },
    {
      title: 'HIGH JEWELLERY BRACELETS',
      subtitle: 'Emerald Cut Tennis Bracelets',
      imageUrl: '/assets/floksy_bracelets_cat.png',
      mobileImageUrl: '/assets/floksy_bracelets_cat.png',
      targetUrl: '/bracelets?category=tennis',
      isEnabled: true,
    },
  ]);

  // 3. SIGNATURE SOLITAIRE COLLECTION
  const [signatureConfig, setSignatureConfig] = useState({
    isEnabled: true,
    title: 'THE 2026 ANNIVERSARY COLLECTION',
    subtitle: 'The Signature Solitaire Collection',
    description: 'Each piece features hand-selected certified diamonds handset by master goldsmiths.',
    buttonText: 'SHOP NOW',
    buttonUrl: '/rings?category=solitaire',
    mainImageUrl: '/assets/floksy_rings_cat.png',
    secondaryImageUrl: '/assets/floksy_rings_cat_2.png',
  });

  // 4. DIAMOND ESSENTIALS
  const [essentialsConfig, setEssentialsConfig] = useState({
    isEnabled: true,
    leftTitle: 'DIAMOND ESSENTIALS',
    leftSubtitle: 'Signature Solitaire & Halo Settings',
    leftImageUrl: '/assets/floksy_rings_cat.png',
    leftTargetUrl: '/rings',
    rightTitle: 'GOLDEN HOUR IS HERE',
    rightSubtitle: 'Crafted in Warm 18K Gold',
    rightImageUrl: '/assets/floksy_bracelets_cat.png',
    rightTargetUrl: '/bracelets',
  });

  // 5. ONLY AT FLOKSY JEWEL CARDS
  const [floksyCards, setFloksyCards] = useState([
    {
      title: 'MASTER ATELIER CRAFTSMANSHIP',
      description: 'Hand-finished custom CAD & precision diamond setting',
      imageUrl: '/assets/floksy_craftsmanship.png',
      targetUrl: '/custom-jewellery',
      isEnabled: true,
    },
    {
      title: 'PRIVATE CONCIERGE CONSULTATION',
      description: 'Bespoke 1-on-1 atelier guidance & CAD preview',
      imageUrl: '/assets/floksy_concierge.png',
      targetUrl: '/contact-us',
      isEnabled: true,
    },
    {
      title: 'AUTHENTICATED CERTIFIED VAULT',
      description: '100% GIA & IGI verified natural & lab-grown stones',
      imageUrl: '/assets/floksy_vault.png',
      targetUrl: '/diamonds',
      isEnabled: true,
    },
  ]);

  // 6. SECTION VISIBILITY
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    hero: true,
    featured: true,
    signature: true,
    essentials: true,
    shapes: true,
    onlyFloksy: true,
    reviews: true,
  });

  const loadHeroBannersFromDb = async () => {
    try {
      const data = await api.getAdminHeroBanners();
      if (Array.isArray(data)) {
        setHeroBanners(data);
      }
    } catch (e) {
      console.error('Error fetching admin hero banners:', e);
    }
  };

  useEffect(() => {
    Promise.all([
      loadHeroBannersFromDb(),
      api.getSiteSettings('homepage_config').then((data) => {
        if (data && data.homepage_config) {
          try {
            const parsed = JSON.parse(data.homepage_config);
            if (parsed.featuredCards) setFeaturedCards(parsed.featuredCards);
            if (parsed.signatureConfig) setSignatureConfig(parsed.signatureConfig);
            if (parsed.essentialsConfig) setEssentialsConfig(parsed.essentialsConfig);
            if (parsed.floksyCards) setFloksyCards(parsed.floksyCards);
            if (parsed.sectionVisibility) setSectionVisibility(parsed.sectionVisibility);
          } catch (e) {}
        }
      }),
    ]).finally(() => setLoading(false));
  }, []);

  const handleOpenAddModal = () => {
    setEditingBanner({
      title: 'Handcrafted Elegance & Exceptional Diamonds',
      subtitle: 'THE SIGNATURE COLLECTION 2026',
      description: 'Immerse yourself in world-class atelier craftsmanship, ethically sourced GIA & IGI certified diamonds, and exquisite high jewellery.',
      primaryCtaText: 'EXPLORE RINGS',
      primaryCtaLink: '/rings',
      secondaryCtaText: 'THE DIAMOND VAULT',
      secondaryCtaLink: '/diamonds',
      productType: 'Engagement Ring',
      imageAlt: 'Single diamond engagement ring hero by Floksy Jewel',
      isActive: true,
      displayOrder: heroBanners.length + 1,
    });
    setDesktopFile(null);
    setMobileFile(null);
    setDesktopPreview('');
    setMobilePreview('');
    setImgDimensions(null);
    setAspectWarning(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (banner: HeroBanner) => {
    setEditingBanner(banner);
    setDesktopFile(null);
    setMobileFile(null);
    setDesktopPreview(banner.imagePath || '');
    setMobilePreview(banner.mobileImagePath || '');
    setImgDimensions(null);
    setAspectWarning(null);

    if (banner.imagePath) {
      const img = new Image();
      img.onload = () => {
        setImgDimensions({ width: img.width, height: img.height, fileSizeKB: 0 });
        const ratio = img.width / img.height;
        if (Math.abs(ratio - 16 / 9) > 0.15) {
          setAspectWarning(`⚠️ Aspect ratio is ${ratio.toFixed(2)}:1 (${img.width}×${img.height}). 16:9 horizontal composition (e.g. 3840×2160 or 1920×1080) is recommended.`);
        } else {
          setAspectWarning(null);
        }
      };
      img.src = banner.imagePath;
    }

    setModalOpen(true);
  };

  const handleDesktopFileSelect = (file: File) => {
    setDesktopFile(file);
    const objectUrl = URL.createObjectURL(file);
    setDesktopPreview(objectUrl);

    const img = new Image();
    img.onload = () => {
      const fileSizeKB = Math.round(file.size / 1024);
      setImgDimensions({ width: img.width, height: img.height, fileSizeKB });
      const ratio = img.width / img.height;
      if (Math.abs(ratio - 16 / 9) > 0.15) {
        setAspectWarning(`⚠️ Selected image aspect ratio is ${ratio.toFixed(2)}:1 (${img.width}×${img.height}). 16:9 wide horizontal composition (e.g. 3840×2160) is recommended.`);
      } else {
        setAspectWarning(null);
      }
    };
    img.src = objectUrl;
  };

  const handleSaveBannerModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    if (!editingBanner.id && !desktopFile && !desktopPreview) {
      alert('Please upload a desktop hero image file.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', editingBanner.title || '');
      formData.append('subtitle', editingBanner.subtitle || '');
      formData.append('description', editingBanner.description || '');
      formData.append('primaryCtaText', editingBanner.primaryCtaText || '');
      formData.append('primaryCtaLink', editingBanner.primaryCtaLink || '');
      formData.append('secondaryCtaText', editingBanner.secondaryCtaText || '');
      formData.append('secondaryCtaLink', editingBanner.secondaryCtaLink || '');
      formData.append('productType', editingBanner.productType || 'Engagement Ring');
      formData.append('imageAlt', editingBanner.imageAlt || editingBanner.title || '');
      formData.append('isActive', String(editingBanner.isActive !== false));
      if (editingBanner.displayOrder !== undefined) {
        formData.append('displayOrder', String(editingBanner.displayOrder));
      }

      if (desktopFile) {
        formData.append('desktopImage', desktopFile);
      } else if (editingBanner.imagePath) {
        formData.append('imagePath', editingBanner.imagePath);
      }

      if (mobileFile) {
        formData.append('mobileImage', mobileFile);
      } else if (editingBanner.mobileImagePath) {
        formData.append('mobileImagePath', editingBanner.mobileImagePath);
      }

      if (editingBanner.id) {
        await api.updateHeroBanner(editingBanner.id, formData);
      } else {
        await api.createHeroBanner(formData);
      }

      await loadHeroBannersFromDb();
      setModalOpen(false);
      setEditingBanner(null);
    } catch (err: any) {
      alert(err.message || 'Error saving hero banner.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBanner = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the hero banner "${title}"?`)) return;
    try {
      await api.deleteHeroBanner(id);
      await loadHeroBannersFromDb();
    } catch (err: any) {
      alert(err.message || 'Error deleting hero banner.');
    }
  };

  const handleToggleActiveBanner = async (banner: HeroBanner) => {
    try {
      const formData = new FormData();
      formData.append('isActive', String(!banner.isActive));
      await api.updateHeroBanner(banner.id, formData);
      await loadHeroBannersFromDb();
    } catch (err) {
      alert('Error updating banner status.');
    }
  };

  const handleMoveBanner = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= heroBanners.length) return;

    const newBanners = [...heroBanners];
    const temp = newBanners[index];
    newBanners[index] = newBanners[targetIndex];
    newBanners[targetIndex] = temp;

    setHeroBanners(newBanners);
    try {
      await api.reorderHeroBanners(newBanners.map((b) => b.id));
    } catch (e) {
      loadHeroBannersFromDb();
    }
  };

  const handleSaveAllCMS = async () => {
    setSaveStatus('Saving Homepage CMS settings...');
    try {
      const payload = {
        featuredCards,
        signatureConfig,
        essentialsConfig,
        floksyCards,
        sectionVisibility,
      };

      await api.updateSiteSetting('homepage_config', JSON.stringify(payload));
      setSaveStatus('Homepage CMS configuration published successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      alert('Failed to save Homepage CMS settings.');
      setSaveStatus(null);
    }
  };

  const handleToggleSection = (key: string) => {
    setSectionVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <AdminPageHeader
        title="Homepage Hero & CMS Manager"
        description="Database-driven hero banner management (1 jewelry product per hero image), featured cards, and section visibility."
        actions={
          <AdminButton $variant="gold" onClick={handleSaveAllCMS} icon={<Save size={14} />}>
            Save & Publish Homepage CMS
          </AdminButton>
        }
      />

      {saveStatus && (
        <div style={{ background: '#eaf7ed', color: '#278838', padding: '12px 18px', border: '1px solid #c3e6cb', marginBottom: 20, fontSize: '0.85rem', fontWeight: 600 }}>
          {saveStatus}
        </div>
      )}

      {/* SECTION 1: HERO BANNERS MANAGEMENT */}
      <SectionCard $disabled={!sectionVisibility.hero}>
        <div className="section-header">
          <div className="title-box">
            <h3>1. HERO BANNERS (DATABASE MANAGED)</h3>
            <span className="badge">{heroBanners.length} Active Banners</span>
          </div>
          <div className="header-actions">
            <PrimaryBtn onClick={handleOpenAddModal}>
              <Plus size={14} /> Add Hero Banner
            </PrimaryBtn>
            <SmallBtn onClick={() => handleToggleSection('hero')}>
              {sectionVisibility.hero ? <EyeOff size={13} /> : <Eye size={13} />} {sectionVisibility.hero ? 'HIDE SECTION' : 'SHOW SECTION'}
            </SmallBtn>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 16, lineHeight: 1.5 }}>
          Upload high-jewelry hero images (16:9 format). Each hero features <strong>ONE single luxury jewelry product</strong> on warm ivory (#FAF9F6) background with clean negative space on the left.
        </p>

        {heroBanners.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', background: '#faf5eb', border: '1px dashed #d9d3c7' }}>
            <ImageIcon size={36} color="#c9a45c" style={{ marginBottom: 10 }} />
            <h4 style={{ margin: '0 0 6px 0', color: '#1f1f1f' }}>No Hero Banners Found</h4>
            <p style={{ fontSize: '0.84rem', color: '#777', marginBottom: 16 }}>
              Click "Add Hero Banner" below to upload your first luxury single-product hero banner.
            </p>
            <PrimaryBtn onClick={handleOpenAddModal}>
              <Plus size={14} /> Create First Hero Banner
            </PrimaryBtn>
          </div>
        ) : (
          <BannerTable>
            <thead>
              <tr>
                <th style={{ width: '50px' }}>Order</th>
                <th style={{ width: '130px' }}>Preview</th>
                <th>Product Type</th>
                <th>Title & Subtitle</th>
                <th>CTA Buttons</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {heroBanners.map((banner, idx) => (
                <tr key={banner.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <SmallBtn
                        disabled={idx === 0}
                        onClick={() => handleMoveBanner(idx, 'up')}
                        style={{ padding: '2px 4px' }}
                      >
                        <ArrowUp size={12} />
                      </SmallBtn>
                      <span style={{ fontSize: '0.78rem', textAlign: 'center', fontWeight: 700, color: '#444' }}>{idx + 1}</span>
                      <SmallBtn
                        disabled={idx === heroBanners.length - 1}
                        onClick={() => handleMoveBanner(idx, 'down')}
                        style={{ padding: '2px 4px' }}
                      >
                        <ArrowDown size={12} />
                      </SmallBtn>
                    </div>
                  </td>
                  <td>
                    <ThumbnailImg src={banner.imagePath} alt={banner.imageAlt || banner.title} />
                  </td>
                  <td>
                    <TypeBadge>{banner.productType || 'Engagement Ring'}</TypeBadge>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1f1f1f', marginBottom: 3 }}>{banner.title}</div>
                    <div style={{ fontSize: '0.76rem', color: '#c9a45c', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{banner.subtitle}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.78rem', color: '#444' }}>
                      Primary: <strong>{banner.primaryCtaText || 'EXPLORE RINGS'}</strong> ({banner.primaryCtaLink || '/rings'})
                    </div>
                    {banner.secondaryCtaText && (
                      <div style={{ fontSize: '0.74rem', color: '#777', marginTop: 2 }}>
                        Secondary: {banner.secondaryCtaText} ({banner.secondaryCtaLink})
                      </div>
                    )}
                  </td>
                  <td>
                    <StatusBadge
                      $active={banner.isActive}
                      onClick={() => handleToggleActiveBanner(banner)}
                      style={{ cursor: 'pointer' }}
                      title="Click to toggle status"
                    >
                      {banner.isActive ? <Check size={11} /> : <X size={11} />}
                      {banner.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </StatusBadge>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <SmallBtn onClick={() => handleOpenEditModal(banner)}>
                        <Edit2 size={13} /> EDIT
                      </SmallBtn>
                      <SmallBtn onClick={() => handleDeleteBanner(banner.id, banner.title)}>
                        <Trash2 size={13} color="#d32f2f" />
                      </SmallBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </BannerTable>
        )}
      </SectionCard>

      {/* CREATE / EDIT HERO BANNER MODAL */}
      {modalOpen && editingBanner && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>{editingBanner.id ? 'Edit Hero Banner' : 'Create New Hero Banner'}</h3>
              <SmallBtn onClick={() => setModalOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                <X size={20} />
              </SmallBtn>
            </ModalHeader>

            <form onSubmit={handleSaveBannerModal}>
              <FormGrid>
                <div>
                  <label>Product Type (1 Jewelry Item per Hero)</label>
                  <select
                    value={editingBanner.productType || 'Engagement Ring'}
                    onChange={(e) => setEditingBanner({ ...editingBanner, productType: e.target.value })}
                  >
                    {PRODUCT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Eyebrow / Subtitle</label>
                  <input
                    type="text"
                    value={editingBanner.subtitle || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                    placeholder="e.g. THE SIGNATURE COLLECTION 2026"
                  />
                </div>

                <div className="full-width">
                  <label>Main Headline Title</label>
                  <input
                    type="text"
                    required
                    value={editingBanner.title || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    placeholder="e.g. Handcrafted Elegance & Exceptional Diamonds"
                  />
                </div>

                <div className="full-width">
                  <label>Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={editingBanner.description || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })}
                    placeholder="Immerse yourself in world-class atelier craftsmanship..."
                  />
                </div>

                <div>
                  <label>Primary CTA Text</label>
                  <input
                    type="text"
                    value={editingBanner.primaryCtaText || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, primaryCtaText: e.target.value })}
                    placeholder="e.g. EXPLORE RINGS"
                  />
                </div>

                <div>
                  <label>Primary CTA Link</label>
                  <input
                    type="text"
                    value={editingBanner.primaryCtaLink || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, primaryCtaLink: e.target.value })}
                    placeholder="e.g. /rings"
                  />
                </div>

                <div>
                  <label>Secondary CTA Text (Optional)</label>
                  <input
                    type="text"
                    value={editingBanner.secondaryCtaText || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, secondaryCtaText: e.target.value })}
                    placeholder="e.g. THE DIAMOND VAULT"
                  />
                </div>

                <div>
                  <label>Secondary CTA Link (Optional)</label>
                  <input
                    type="text"
                    value={editingBanner.secondaryCtaLink || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, secondaryCtaLink: e.target.value })}
                    placeholder="e.g. /diamonds"
                  />
                </div>

                <div className="full-width">
                  <label>Image Alt Text (SEO & Accessibility)</label>
                  <input
                    type="text"
                    value={editingBanner.imageAlt || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, imageAlt: e.target.value })}
                    placeholder="e.g. Ultra-luxury solitaire diamond engagement ring by Floksy Jewel"
                  />
                </div>

                {/* UPLOAD DESKTOP HERO IMAGE FILE */}
                <div className="full-width">
                  <label>Upload Desktop Hero Image (16:9 Format Required)</label>
                  <input
                    type="file"
                    ref={desktopFileInputRef}
                    style={{ display: 'none' }}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleDesktopFileSelect(e.target.files[0]);
                      }
                    }}
                  />

                  <DropZone
                    $hasPreview={!!desktopPreview}
                    onClick={() => desktopFileInputRef.current?.click()}
                  >
                    {desktopPreview ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                        <img
                          src={desktopPreview}
                          alt="Hero Preview"
                          style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'cover', border: '1px solid #d9d3c7' }}
                        />
                        <div style={{ fontSize: '0.8rem', color: '#555' }}>
                          {desktopFile ? (
                            <>
                              Selected File: <strong>{desktopFile.name}</strong> ({imgDimensions?.fileSizeKB || 0} KB)
                            </>
                          ) : (
                            <>Current Image: <strong>{editingBanner.imagePath}</strong></>
                          )}
                          {imgDimensions && (
                            <div style={{ fontSize: '0.76rem', color: '#666', marginTop: 2 }}>
                              Dimensions: {imgDimensions.width} × {imgDimensions.height} px
                            </div>
                          )}
                        </div>
                        <SmallBtn type="button" onClick={(e) => { e.stopPropagation(); desktopFileInputRef.current?.click(); }}>
                          <Upload size={12} /> Replace Image File
                        </SmallBtn>
                      </div>
                    ) : (
                      <div>
                        <Upload size={28} color="#c9a45c" />
                        <p>Click or drag image file here to upload</p>
                        <span>Supported formats: JPG, JPEG, PNG, WEBP (Recommended: 3840×2160 or 1920×1080)</span>
                      </div>
                    )}
                  </DropZone>

                  {aspectWarning && (
                    <WarningBox>
                      <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                      <div>{aspectWarning}</div>
                    </WarningBox>
                  )}
                </div>

                {/* UPLOAD MOBILE HERO IMAGE FILE (OPTIONAL) */}
                <div className="full-width">
                  <label>Upload Mobile Hero Image (Optional Portrait Version)</label>
                  <input
                    type="file"
                    ref={mobileFileInputRef}
                    style={{ display: 'none' }}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setMobileFile(file);
                        setMobilePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                    {mobilePreview ? (
                      <img src={mobilePreview} alt="Mobile preview" style={{ width: 60, height: 80, objectFit: 'cover', border: '1px solid #d9d3c7' }} />
                    ) : null}
                    <SmallBtn type="button" onClick={() => mobileFileInputRef.current?.click()}>
                      <Upload size={12} /> {mobilePreview ? 'Change Mobile Image' : 'Upload Mobile Image'}
                    </SmallBtn>
                    {mobilePreview && (
                      <SmallBtn type="button" onClick={() => { setMobileFile(null); setMobilePreview(''); setEditingBanner({ ...editingBanner, mobileImagePath: '' }); }}>
                        Remove
                      </SmallBtn>
                    )}
                  </div>
                </div>

                <div className="full-width" style={{ marginTop: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textTransform: 'none', fontSize: '0.88rem' }}>
                    <input
                      type="checkbox"
                      checked={editingBanner.isActive !== false}
                      onChange={(e) => setEditingBanner({ ...editingBanner, isActive: e.target.checked })}
                      style={{ width: 'auto' }}
                    />
                    Active (Visible on Storefront Homepage)
                  </label>
                </div>
              </FormGrid>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24, paddingTop: 16, borderTop: '1px solid #f2ede4' }}>
                <SmallBtn type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </SmallBtn>
                <PrimaryBtn type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : editingBanner.id ? 'Update Hero Banner' : 'Create Hero Banner'}
                </PrimaryBtn>
              </div>
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* SECTION 2: FEATURED CATEGORIES SPLIT CARDS */}
      <SectionCard $disabled={!sectionVisibility.featured}>
        <div className="section-header">
          <div className="title-box">
            <h3>2. FEATURED CATEGORIES SPLIT CARDS</h3>
            <span className="badge">Status: {sectionVisibility.featured ? 'VISIBLE' : 'HIDDEN'}</span>
          </div>
          <div className="header-actions">
            <SmallBtn onClick={() => handleToggleSection('featured')}>
              {sectionVisibility.featured ? <EyeOff size={13} /> : <Eye size={13} />} {sectionVisibility.featured ? 'HIDE' : 'SHOW'}
            </SmallBtn>
          </div>
        </div>

        {featuredCards.map((card, idx) => (
          <div key={idx} style={{ background: '#faf5eb', padding: 16, border: '1px solid #d9d3c7', marginBottom: 14, borderRadius: 4 }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#1f1f1f' }}>CARD {idx + 1}: {card.title}</h4>
            <FormGrid>
              <div>
                <label>Card Title</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, title: val } : c)));
                  }}
                />
              </div>
              <div>
                <label>Target URL</label>
                <input
                  type="text"
                  value={card.targetUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, targetUrl: val } : c)));
                  }}
                />
              </div>
              <div className="full-width">
                <AdminImageUploadField
                  label={`Card ${idx + 1} Image`}
                  value={card.imageUrl}
                  onChange={(val) => setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, imageUrl: val } : c)))}
                />
              </div>
            </FormGrid>
          </div>
        ))}
      </SectionCard>
    </div>
  );
};
