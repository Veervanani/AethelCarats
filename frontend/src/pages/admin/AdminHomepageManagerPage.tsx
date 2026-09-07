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
  X,
  Check,
  Diamond,
  Truck,
  ShieldCheck,
  Layers,
  Upload,
  AlertTriangle,
} from 'lucide-react';
import { api } from '../../services/api';
import { HeroBanner } from '../../types';
import { AdminPageHeader, AdminButton, AdminColorPicker } from '../../components/admin/AdminUI';
import { AdminImageUploadField } from '../../components/admin/AdminImageUploadField';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const TabsNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  background: #ffffff;
  padding: 12px 16px;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 6px;
  border: 1px solid ${({ $active }) => ($active ? '#c9a45c' : 'transparent')};
  background: ${({ $active }) => ($active ? '#19202a' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#6b665c')};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: #19202a;
    background: ${({ $active }) => ($active ? '#19202a' : '#faf5eb')};
  }
`;

const SectionCard = styled.div<{ $disabled?: boolean }>`
  background: #ffffff;
  border: 1px solid ${({ $disabled }) => ($disabled ? '#e0e0e0' : '#e8e3d9')};
  opacity: ${({ $disabled }) => ($disabled ? 0.75 : 1)};
  padding: 28px;
  margin-bottom: 28px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 14px;
    margin-bottom: 20px;

    .title-box {
      display: flex;
      align-items: center;
      gap: 12px;

      h3 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 1.6rem;
        font-weight: 700;
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
        border-radius: 4px;
      }
    }

    .header-actions {
      display: flex;
      gap: 8px;
    }
  }
`;

const SubCard = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 18px 20px;
  margin-bottom: 16px;
  position: relative;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .full-width {
    grid-column: span 2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .full-width {
      grid-column: span 1;
    }
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #4a463e;
    margin-bottom: 6px;
  }

  input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    font-size: 0.88rem;
    border: 1px solid #d9d3c7;
    background: #ffffff;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    font-family: inherit;

    &:focus {
      border-color: #c9a45c;
      box-shadow: 0 0 0 2px rgba(201, 164, 92, 0.15);
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
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
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c9a45c;
    color: #c9a45c;
    background: #faf8f5;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const DangerSmallBtn = styled(SmallBtn)`
  color: #c53030;
  border-color: #feb2b2;
  background: #fff5f5;

  &:hover {
    background: #c53030;
    color: #ffffff;
    border-color: #c53030;
  }
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #19202a;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid #19202a;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #101418;
  }
`;

const BannerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;

  th {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
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
  }
`;

const ThumbnailImg = styled.img`
  width: 110px;
  height: 62px;
  object-fit: cover;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  background: #f3efe6;
  display: block;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 2000;
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
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
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
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.8rem;
    margin: 0;
    color: #1f1f1f;
  }
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
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // 1. HERO BANNERS (DB)
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<HeroBanner> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string>('');
  const [mobilePreview, setMobilePreview] = useState<string>('');

  // 2. VALUE PROPOSITIONS (4 CARDS)
  const [valuePropsConfig, setValuePropsConfig] = useState([
    { icon: 'Diamond', title: 'Certified Loose Diamonds', description: 'GIA & IGI authenticated natural and lab-grown stones.' },
    { icon: 'Sparkles', title: 'Bespoke Atelier CAD', description: 'Custom 3D modeling and hand-setting by master jewelers.' },
    { icon: 'Truck', title: 'Worldwide Insured Transit', description: 'Complimentary white-glove courier shipping.' },
    { icon: 'ShieldCheck', title: 'Lifetime Warranty', description: 'Guaranteed metal purity and complimentary maintenance.' },
  ]);

  // 3. CATEGORY MAISON CAROUSEL
  const [categoriesConfig, setCategoriesConfig] = useState({
    eyebrow: 'THE COLLECTION MAISON',
    title: 'Shop By Category',
    items: [
      { title: 'RINGS', url: '/rings', image: '/assets/gem_rings_cat.png' },
      { title: 'EARRINGS', url: '/earrings', image: '/assets/gem_earrings_cat.png' },
      { title: 'NECKLACES', url: '/necklaces', image: '/assets/gem_necklaces_cat.png' },
      { title: 'BRACELETS', url: '/bracelets', image: '/assets/gem_bracelets_cat.png' },
      { title: 'PENDANTS', url: '/pendants', image: '/assets/aura_pendants_cat.png' },
      { title: 'DIAMONDS', url: '/diamonds', image: '/assets/gem_diamonds_cat.png' },
    ],
  });

  // 4. EDITORIAL CAMPAIGN BANNER
  const [campaignBannerConfig, setCampaignBannerConfig] = useState({
    enableBanner: true,
    heading: 'A NEW EXPRESSION OF FINE JEWELLERY',
    description: 'Designed with intention. Crafted with precision. Made to be treasured for generations.',
    buttonText: 'EXPLORE THE COLLECTION',
    buttonLink: '/collections/signature-collection',
    desktopImage: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp',
    mobileImage: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp',
    showOverlay: true,
    overlayOpacity: 0.45,
    textColor: '#1F1F1F',
    buttonBg: '#1F1F1F',
    buttonColor: '#FFFDF9',
  });

  // 5. TWO-PANEL STATIC EDITORIAL (FEATURED)
  const [featuredCards, setFeaturedCards] = useState([
    {
      title: 'RIVIÈRE NECKLACES',
      subtitle: 'Solitaire & Tennis Necklaces',
      imageUrl: '/assets/gem_necklaces_cat.png',
      targetUrl: '/necklaces',
      buttonText: 'SHOP NOW →',
    },
    {
      title: 'HIGH JEWELLERY BRACELETS',
      subtitle: 'Emerald Cut Tennis Bracelets',
      imageUrl: '/assets/gem_bracelets_cat.png',
      targetUrl: '/bracelets',
      buttonText: 'SHOP NOW →',
    },
  ]);

  // 6. EDITORIAL COLLECTION (LOOKBOOK SLIDES)
  const [collectionSlides, setCollectionSlides] = useState([
    {
      id: 'slide-1',
      leftImage: '/assets/aura_rings_cat_v2.png',
      rightImage: '/assets/gem_solitaire_ring_perfect_v2.png',
      eyebrow: 'THE 2026 ANNIVERSARY COLLECTION',
      title: 'The Signature Solitaire Collection',
      link: '/collections/signature-collection',
    },
    {
      id: 'slide-2',
      leftImage: '/assets/aura_necklaces_cat_v2.png',
      rightImage: '/assets/aura_high_jewellery_v2.png',
      eyebrow: 'RIVIERE & TENNIS DESIGNS',
      title: 'The Haute Joaillerie Necklaces',
      link: '/necklaces',
    },
    {
      id: 'slide-3',
      leftImage: '/assets/aura_earrings_cat_v2.png',
      rightImage: '/assets/aura_editorial_banner_v2.png',
      eyebrow: 'FINE EARRINGS & CHANDELIERS',
      title: 'The Diamond Chandelier Collection',
      link: '/earrings',
    },
    {
      id: 'slide-4',
      leftImage: '/assets/aura_bracelets_editorial_left_v2026.png',
      rightImage: '/assets/gem_bracelets_editorial_right_new.png',
      eyebrow: 'EMERALD CUT TENNIS LINE',
      title: 'Bespoke Diamond Line Bracelets',
      link: '/bracelets',
    },
  ]);

  // 7. DUAL-PANEL PROMOTIONAL SECTION
  const [essentialsConfig, setEssentialsConfig] = useState({
    leftTitle: 'DIAMOND ESSENTIALS',
    leftImageUrl: '/assets/gem_diamonds_cat.png',
    leftTargetUrl: '/diamonds',
    leftButtonText: 'DIAMOND ESSENTIALS',
    rightTitle: 'GOLDEN HOUR IS HERE',
    rightImageUrl: '/assets/gem_earrings_cat.png',
    rightTargetUrl: '/collections/signature-collection',
    rightButtonText: 'SHOP THE EVENT',
  });

  // 8. DIAMOND SHAPES SECTION
  const [diamondShapesConfig, setDiamondShapesConfig] = useState({
    eyebrow: 'AUTHENTICATED LOOSE DIAMONDS',
    heading: 'Discover Exceptional Diamond Shapes',
    description: 'Select your ideal cut from certified GIA & IGI diamonds, ethically sourced and precision-cut for maximum fire and brilliance.',
    leftImage: '/assets/gem_diamonds_cat.png',
    buttonText: 'FIND YOUR DIAMOND',
    buttonLink: '/diamonds',
    shapes: [
      { name: 'ROUND', shape: 'round', url: '/diamonds?shape=round', enabled: true },
      { name: 'OVAL', shape: 'oval', url: '/diamonds?shape=oval', enabled: true },
      { name: 'EMERALD', shape: 'emerald', url: '/diamonds?shape=emerald', enabled: true },
      { name: 'PRINCESS', shape: 'princess', url: '/diamonds?shape=princess', enabled: true },
      { name: 'CUSHION', shape: 'cushion', url: '/diamonds?shape=cushion', enabled: true },
      { name: 'PEAR', shape: 'pear', url: '/diamonds?shape=pear', enabled: true },
      { name: 'RADIANT', shape: 'radiant', url: '/diamonds?shape=radiant', enabled: true },
      { name: 'MARQUISE', shape: 'marquise', url: '/diamonds?shape=marquise', enabled: true },
    ],
  });

  // 9. ONLY AT AURA ATELIER CARDS
  const [auraCards, setAuraCards] = useState([
    {
      id: 'only-1',
      eyebrow: 'MASTER ATELIER CRAFTSMANSHIP',
      title: 'Hand-finished custom CAD & precision diamond setting',
      image: '/assets/aura_only_at_1.png',
      url: '/custom-jewellery',
    },
    {
      id: 'only-2',
      eyebrow: 'PRIVATE CONCIERGE CONSULTATION',
      title: 'Bespoke 1-on-1 atelier guidance & CAD preview',
      image: '/assets/aura_only_at_2.png',
      url: '/custom-jewellery',
    },
    {
      id: 'only-3',
      eyebrow: 'AUTHENTICATED CERTIFIED VAULT',
      title: '100% GIA & IGI verified natural & lab-grown stones',
      image: '/assets/aura_only_at_3.png',
      url: '/diamonds',
    },
    {
      id: 'only-4',
      eyebrow: 'SIGNATURE HERITAGE COLLECTIONS',
      title: 'Timeless solitaire & riviere high jewellery pieces',
      image: '/assets/aura_only_at_4.png',
      url: '/collections/signature-collection',
    },
  ]);

  // 10. REVIEWS & TESTIMONIALS CONFIG
  const [reviewsConfig, setReviewsConfig] = useState({
    eyebrow: 'AUTHENTICATED CLIENT TESTIMONIALS',
    title: 'VOICES OF ELEGANCE',
    useDbReviews: true,
    customReviews: [
      { id: 'rev-1', text: 'Amazing selection at incredible prices!', author: 'Ryan K.', rating: 5 },
      { id: 'rev-2', text: 'Our wedding bands are perfect. Simple. High quality. Easy. Comfortable.', author: 'Melissa S.', rating: 5 },
      { id: 'rev-3', text: 'Beautiful and great price', author: 'Carolyn M.', rating: 5 },
      { id: 'rev-4', text: 'Exactly as depicted. Beautiful ring, Excellent service.', author: 'Scott C.', rating: 5 },
    ],
  });

  // 11. SECTION VISIBILITY MASTER TOGGLE
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    hero: true,
    valueProps: true,
    categories: true,
    campaignBanner: true,
    featured: true,
    signature: true,
    essentials: true,
    shapes: true,
    onlyAura: true,
    reviews: true,
  });

  // 12. HERO SECTION TEXT COLORS
  const [heroColors, setHeroColors] = useState({
    subtitleColor: '',
    titleColor: '',
    descriptionColor: '',
    primaryCtaTextColor: '',
    secondaryCtaTextColor: '',
  });

  const loadHeroBannersFromDb = async () => {
    try {
      const data = await api.getAdminHeroBanners();
      if (Array.isArray(data)) setHeroBanners(data);
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
            const parsed = typeof data.homepage_config === 'string' ? JSON.parse(data.homepage_config) : data.homepage_config;
            if (parsed.valuePropsConfig) setValuePropsConfig(parsed.valuePropsConfig);
            if (parsed.categoriesConfig) setCategoriesConfig(parsed.categoriesConfig);
            if (parsed.campaignBannerConfig) setCampaignBannerConfig(parsed.campaignBannerConfig);
            if (parsed.featuredCards) setFeaturedCards(parsed.featuredCards);
            if (parsed.collectionSlides) setCollectionSlides(parsed.collectionSlides);
            if (parsed.essentialsConfig) setEssentialsConfig(parsed.essentialsConfig);
            if (parsed.diamondShapesConfig) setDiamondShapesConfig(parsed.diamondShapesConfig);
            if (parsed.auraCards) setAuraCards(parsed.auraCards);
            if (parsed.reviewsConfig) setReviewsConfig(parsed.reviewsConfig);
            if (parsed.sectionVisibility) setSectionVisibility((prev) => ({ ...prev, ...parsed.sectionVisibility }));
            if (parsed.heroColors) setHeroColors(parsed.heroColors);
          } catch (e) {
            console.error('Error parsing homepage_config:', e);
          }
        }
      }),
    ]).finally(() => setLoading(false));
  }, []);

  const handleSaveAllCMS = async () => {
    setSaveStatus('Saving Homepage CMS settings to database...');
    try {
      const payload = {
        valuePropsConfig,
        categoriesConfig,
        campaignBannerConfig,
        featuredCards,
        collectionSlides,
        essentialsConfig,
        diamondShapesConfig,
        auraCards,
        reviewsConfig,
        sectionVisibility,
        heroColors,
      };

      await api.updateSiteSetting('homepage_config', JSON.stringify(payload));
      setSaveStatus('✨ Homepage configuration saved to database and live on storefront!');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to save Homepage CMS settings.');
      setSaveStatus(null);
    }
  };

  const handleToggleSection = (key: string) => {
    setSectionVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenAddHero = () => {
    setEditingBanner({
      title: 'Handcrafted Elegance & Exceptional Diamonds',
      subtitle: 'THE SIGNATURE COLLECTION 2026',
      description: 'Immerse yourself in world-class atelier craftsmanship, ethically sourced diamonds, and timeless bespoke creations.',
      primaryCtaText: 'EXPLORE RINGS',
      primaryCtaLink: '/rings',
      secondaryCtaText: 'THE DIAMOND VAULT →',
      secondaryCtaLink: '/diamonds',
      productType: 'Engagement Ring',
      isActive: true,
      displayOrder: heroBanners.length + 1,
    });
    setDesktopFile(null);
    setMobileFile(null);
    setDesktopPreview('');
    setMobilePreview('');
    setModalOpen(true);
  };

  const handleOpenEditHero = (b: HeroBanner) => {
    setEditingBanner(b);
    setDesktopFile(null);
    setMobileFile(null);
    setDesktopPreview(b.imagePath || '');
    setMobilePreview(b.mobileImagePath || '');
    setModalOpen(true);
  };

  const handleSaveHeroModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;
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
      formData.append('isActive', String(editingBanner.isActive !== false));

      if (desktopFile) formData.append('desktopImage', desktopFile);
      else if (editingBanner.imagePath) formData.append('imagePath', editingBanner.imagePath);

      if (mobileFile) formData.append('mobileImage', mobileFile);
      else if (editingBanner.mobileImagePath) formData.append('mobileImagePath', editingBanner.mobileImagePath);

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

  const handleDeleteHero = async (id: string, title?: string) => {
    if (!window.confirm(`Delete hero banner "${title || id}"?`)) return;
    try {
      await api.deleteHeroBanner(id);
      await loadHeroBannersFromDb();
    } catch (e) {
      alert('Failed to delete hero banner.');
    }
  };

  return (
    <Container>
      <AdminPageHeader
        title="Homepage Content & Sections CMS"
        description="Comprehensive editor for all 10 sections of the live storefront homepage. All edits save to the database and reflect immediately on the storefront."
        actions={
          <AdminButton $variant="gold" onClick={handleSaveAllCMS} icon={<Save size={16} />}>
            Save & Publish Homepage CMS
          </AdminButton>
        }
      />

      {saveStatus && (
        <div style={{ background: '#eaf7ed', color: '#1b6e2d', padding: '14px 20px', border: '1px solid #a3cfbb', borderRadius: 6, marginBottom: 24, fontSize: '0.9rem', fontWeight: 600 }}>
          {saveStatus}
        </div>
      )}

      <TabsNav>
        <TabButton $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          <Layers size={14} /> All Sections
        </TabButton>
        <TabButton $active={activeTab === 'hero'} onClick={() => setActiveTab('hero')}>
          1. Hero Slider
        </TabButton>
        <TabButton $active={activeTab === 'valueProps'} onClick={() => setActiveTab('valueProps')}>
          2. Value Props
        </TabButton>
        <TabButton $active={activeTab === 'categories'} onClick={() => setActiveTab('categories')}>
          3. Categories
        </TabButton>
        <TabButton $active={activeTab === 'campaign'} onClick={() => setActiveTab('campaign')}>
          4. Campaign Banner
        </TabButton>
        <TabButton $active={activeTab === 'featured'} onClick={() => setActiveTab('featured')}>
          5. Editorial Panels
        </TabButton>
        <TabButton $active={activeTab === 'collection'} onClick={() => setActiveTab('collection')}>
          6. Lookbook Deck
        </TabButton>
        <TabButton $active={activeTab === 'essentials'} onClick={() => setActiveTab('essentials')}>
          7. Dual Promos
        </TabButton>
        <TabButton $active={activeTab === 'shapes'} onClick={() => setActiveTab('shapes')}>
          8. Diamond Shapes
        </TabButton>
        <TabButton $active={activeTab === 'onlyAura'} onClick={() => setActiveTab('onlyAura')}>
          9. Atelier Cards
        </TabButton>
        <TabButton $active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
          10. Voices / Reviews
        </TabButton>
      </TabsNav>

      {(activeTab === 'all' || activeTab === 'hero') && (
        <SectionCard $disabled={!sectionVisibility.hero}>
          <div className="section-header">
            <div className="title-box">
              <h3>1. Hero Slider & Banners</h3>
              <span className="badge">{heroBanners.length} Live Slides</span>
            </div>
            <div className="header-actions">
              <PrimaryBtn onClick={handleOpenAddHero}>
                <Plus size={14} /> Add Hero Slide
              </PrimaryBtn>
              <SmallBtn onClick={() => handleToggleSection('hero')}>
                {sectionVisibility.hero ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.hero ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <SubCard style={{ marginBottom: 18, background: '#faf9f5', borderColor: '#e6decb' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#19202a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} color="#c9a45c" /> Hero Global Typography Text Colors
            </div>
            <FormGrid>
              <div>
                <label>
                  <span>Eyebrow / Subtitle Color</span>
                  <AdminColorPicker
                    value={heroColors.subtitleColor}
                    defaultValue="#c9a45c"
                    onChange={(col) => setHeroColors((prev) => ({ ...prev, subtitleColor: col }))}
                  />
                </label>
                <input
                  type="text"
                  placeholder="#c9a45c (Gold default)"
                  value={heroColors.subtitleColor}
                  onChange={(e) => setHeroColors((prev) => ({ ...prev, subtitleColor: e.target.value }))}
                />
              </div>
              <div>
                <label>
                  <span>Main Headline Title Color</span>
                  <AdminColorPicker
                    value={heroColors.titleColor}
                    defaultValue="#ffffff"
                    onChange={(col) => setHeroColors((prev) => ({ ...prev, titleColor: col }))}
                  />
                </label>
                <input
                  type="text"
                  placeholder="#ffffff (White default)"
                  value={heroColors.titleColor}
                  onChange={(e) => setHeroColors((prev) => ({ ...prev, titleColor: e.target.value }))}
                />
              </div>
              <div>
                <label>
                  <span>Description Text Color</span>
                  <AdminColorPicker
                    value={heroColors.descriptionColor}
                    defaultValue="#f5f1e8"
                    onChange={(col) => setHeroColors((prev) => ({ ...prev, descriptionColor: col }))}
                  />
                </label>
                <input
                  type="text"
                  placeholder="#f5f1e8 (Soft cream default)"
                  value={heroColors.descriptionColor}
                  onChange={(e) => setHeroColors((prev) => ({ ...prev, descriptionColor: e.target.value }))}
                />
              </div>
              <div>
                <label>
                  <span>Primary CTA Button Text</span>
                  <AdminColorPicker
                    value={heroColors.primaryCtaTextColor}
                    defaultValue="#101418"
                    onChange={(col) => setHeroColors((prev) => ({ ...prev, primaryCtaTextColor: col }))}
                  />
                </label>
                <input
                  type="text"
                  placeholder="#101418 (Charcoal default)"
                  value={heroColors.primaryCtaTextColor}
                  onChange={(e) => setHeroColors((prev) => ({ ...prev, primaryCtaTextColor: e.target.value }))}
                />
              </div>
              <div>
                <label>
                  <span>Secondary CTA Button Text</span>
                  <AdminColorPicker
                    value={heroColors.secondaryCtaTextColor}
                    defaultValue="#ffffff"
                    onChange={(col) => setHeroColors((prev) => ({ ...prev, secondaryCtaTextColor: col }))}
                  />
                </label>
                <input
                  type="text"
                  placeholder="#ffffff (White default)"
                  value={heroColors.secondaryCtaTextColor}
                  onChange={(e) => setHeroColors((prev) => ({ ...prev, secondaryCtaTextColor: e.target.value }))}
                />
              </div>
            </FormGrid>
          </SubCard>

          {heroBanners.length === 0 ? (
            <div style={{ padding: 30, textAlign: 'center', background: '#faf5eb', border: '1px dashed #d9d3c7', borderRadius: 6 }}>
              <p style={{ margin: '0 0 12px 0', color: '#666' }}>No hero banners found in database. Add your first hero slide below:</p>
              <PrimaryBtn onClick={handleOpenAddHero}>
                <Plus size={14} /> Create First Hero Banner
              </PrimaryBtn>
            </div>
          ) : (
            <BannerTable>
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Product Type</th>
                  <th>Title & Subtitle</th>
                  <th>CTA Buttons</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {heroBanners.map((banner) => (
                  <tr key={banner.id}>
                    <td>
                      <ThumbnailImg src={banner.imagePath} alt={banner.title} />
                    </td>
                    <td>
                      <strong>{banner.productType || 'Engagement Ring'}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{banner.title}</div>
                      <div style={{ fontSize: '0.76rem', color: '#c9a45c' }}>{banner.subtitle}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem' }}>1: {banner.primaryCtaText || '-'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#777' }}>2: {banner.secondaryCtaText || '-'}</div>
                    </td>
                    <td>
                      <span style={{ color: banner.isActive !== false ? '#2e7d32' : '#c62828', fontWeight: 600 }}>
                        {banner.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <SmallBtn onClick={() => handleOpenEditHero(banner)}>
                          <Edit2 size={13} /> Edit
                        </SmallBtn>
                        <DangerSmallBtn onClick={() => handleDeleteHero(banner.id, banner.title)}>
                          <Trash2 size={13} />
                        </DangerSmallBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </BannerTable>
          )}
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'valueProps') && (
        <SectionCard $disabled={!sectionVisibility.valueProps}>
          <div className="section-header">
            <div className="title-box">
              <h3>2. Four Value Propositions (Trust Bar)</h3>
              <span className="badge">4 Cards</span>
            </div>
            <div className="header-actions">
              <SmallBtn onClick={() => handleToggleSection('valueProps')}>
                {sectionVisibility.valueProps ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.valueProps ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {valuePropsConfig.map((prop, idx) => (
              <SubCard key={idx}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#c9a45c', marginBottom: 12 }}>
                  CARD {idx + 1}
                </div>
                <FormGrid>
                  <div className="full-width">
                    <label>
                      <span>Card Title</span>
                      <AdminColorPicker
                        value={(prop as any).titleColor}
                        defaultValue="#1f1f1f"
                        onChange={(col) => {
                          setValuePropsConfig((prev) => prev.map((p, i) => (i === idx ? { ...p, titleColor: col } : p)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={prop.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValuePropsConfig((prev) => prev.map((p, i) => (i === idx ? { ...p, title: val } : p)));
                      }}
                    />
                  </div>
                  <div className="full-width">
                    <label>
                      <span>Description / Subtitle</span>
                      <AdminColorPicker
                        value={(prop as any).descriptionColor}
                        defaultValue="#666666"
                        onChange={(col) => {
                          setValuePropsConfig((prev) => prev.map((p, i) => (i === idx ? { ...p, descriptionColor: col } : p)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={prop.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValuePropsConfig((prev) => prev.map((p, i) => (i === idx ? { ...p, description: val } : p)));
                      }}
                    />
                  </div>
                </FormGrid>
              </SubCard>
            ))}
          </div>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'categories') && (
        <SectionCard $disabled={!sectionVisibility.categories}>
          <div className="section-header">
            <div className="title-box">
              <h3>3. Category Maison Carousel ("Shop By Category")</h3>
              <span className="badge">{categoriesConfig.items.length} Categories</span>
            </div>
            <div className="header-actions">
              <SmallBtn
                onClick={() => {
                  setCategoriesConfig((prev) => ({
                    ...prev,
                    items: [...prev.items, { title: 'NEW CATEGORY', url: '/rings', image: '/assets/gem_rings_cat.png' }],
                  }));
                }}
              >
                <Plus size={13} /> Add Category
              </SmallBtn>
              <SmallBtn onClick={() => handleToggleSection('categories')}>
                {sectionVisibility.categories ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.categories ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <FormGrid style={{ marginBottom: 20 }}>
            <div>
              <label>
                <span>Section Eyebrow Text</span>
                <AdminColorPicker
                  value={(categoriesConfig as any).eyebrowColor}
                  defaultValue="#C9A96E"
                  onChange={(col) => setCategoriesConfig((prev) => ({ ...prev, eyebrowColor: col }))}
                />
              </label>
              <input
                type="text"
                value={categoriesConfig.eyebrow}
                onChange={(e) => setCategoriesConfig((prev) => ({ ...prev, eyebrow: e.target.value }))}
              />
            </div>
            <div>
              <label>
                <span>Section Heading Title</span>
                <AdminColorPicker
                  value={(categoriesConfig as any).titleColor}
                  defaultValue="#F5F1E8"
                  onChange={(col) => setCategoriesConfig((prev) => ({ ...prev, titleColor: col }))}
                />
              </label>
              <input
                type="text"
                value={categoriesConfig.title}
                onChange={(e) => setCategoriesConfig((prev) => ({ ...prev, titleColor: e.target.value }))}
              />
            </div>
          </FormGrid>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {categoriesConfig.items.map((cat, idx) => (
              <SubCard key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1f1f1f' }}>Category #{idx + 1}</span>
                  <DangerSmallBtn
                    onClick={() => {
                      setCategoriesConfig((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
                    }}
                  >
                    <Trash2 size={12} /> Remove
                  </DangerSmallBtn>
                </div>
                <FormGrid>
                  <div>
                    <label>
                      <span>Category Title</span>
                      <AdminColorPicker
                        value={(cat as any).titleColor}
                        defaultValue="#F5F1E8"
                        onChange={(col) => {
                          setCategoriesConfig((prev) => ({
                            ...prev,
                            items: prev.items.map((c, i) => (i === idx ? { ...c, titleColor: col } : c)),
                          }));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCategoriesConfig((prev) => ({
                          ...prev,
                          items: prev.items.map((c, i) => (i === idx ? { ...c, title: val } : c)),
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <label>Target URL / Route</label>
                    <input
                      type="text"
                      value={cat.url}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCategoriesConfig((prev) => ({
                          ...prev,
                          items: prev.items.map((c, i) => (i === idx ? { ...c, url: val } : c)),
                        }));
                      }}
                    />
                  </div>
                  <div className="full-width">
                    <AdminImageUploadField
                      label="Category Image"
                      value={cat.image}
                      onChange={(val) => {
                        setCategoriesConfig((prev) => ({
                          ...prev,
                          items: prev.items.map((c, i) => (i === idx ? { ...c, image: val } : c)),
                        }));
                      }}
                    />
                  </div>
                </FormGrid>
              </SubCard>
            ))}
          </div>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'campaign') && (
        <SectionCard $disabled={!sectionVisibility.campaignBanner}>
          <div className="section-header">
            <div className="title-box">
              <h3>4. Editorial Campaign Banner ("A New Expression of Fine Jewellery")</h3>
              <span className="badge">Full Width</span>
            </div>
            <div className="header-actions">
              <SmallBtn onClick={() => handleToggleSection('campaignBanner')}>
                {sectionVisibility.campaignBanner ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.campaignBanner ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <FormGrid>
            <div className="full-width">
              <label>
                <span>Heading Title</span>
                <AdminColorPicker
                  value={(campaignBannerConfig as any).headingTextColor || campaignBannerConfig.textColor}
                  defaultValue="#1F1F1F"
                  onChange={(col) => setCampaignBannerConfig((prev: any) => ({ ...prev, headingTextColor: col }))}
                />
              </label>
              <input
                type="text"
                value={campaignBannerConfig.heading}
                onChange={(e) => setCampaignBannerConfig((prev) => ({ ...prev, heading: e.target.value }))}
              />
            </div>
            <div className="full-width">
              <label>
                <span>Description Subtitle</span>
                <AdminColorPicker
                  value={(campaignBannerConfig as any).descTextColor || campaignBannerConfig.textColor}
                  defaultValue="#444444"
                  onChange={(col) => setCampaignBannerConfig((prev: any) => ({ ...prev, descTextColor: col }))}
                />
              </label>
              <textarea
                value={campaignBannerConfig.description}
                onChange={(e) => setCampaignBannerConfig((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <label>
                <span>Button Label Text</span>
                <AdminColorPicker
                  value={campaignBannerConfig.buttonColor}
                  defaultValue="#FFFDF9"
                  onChange={(col) => setCampaignBannerConfig((prev) => ({ ...prev, buttonColor: col }))}
                />
              </label>
              <input
                type="text"
                value={campaignBannerConfig.buttonText}
                onChange={(e) => setCampaignBannerConfig((prev) => ({ ...prev, buttonText: e.target.value }))}
              />
            </div>
            <div>
              <label>Button Target Link</label>
              <input
                type="text"
                value={campaignBannerConfig.buttonLink}
                onChange={(e) => setCampaignBannerConfig((prev) => ({ ...prev, buttonLink: e.target.value }))}
              />
            </div>
            <div>
              <AdminImageUploadField
                label="Desktop Background Image"
                value={campaignBannerConfig.desktopImage}
                onChange={(val) => setCampaignBannerConfig((prev) => ({ ...prev, desktopImage: val }))}
              />
            </div>
            <div>
              <AdminImageUploadField
                label="Mobile Background Image"
                value={campaignBannerConfig.mobileImage}
                onChange={(val) => setCampaignBannerConfig((prev) => ({ ...prev, mobileImage: val }))}
              />
            </div>
            <div>
              <label>Overlay Opacity (0.0 to 1.0)</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                value={campaignBannerConfig.overlayOpacity}
                onChange={(e) => setCampaignBannerConfig((prev) => ({ ...prev, overlayOpacity: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label>
                <span>Section Base Text Color</span>
                <AdminColorPicker
                  value={campaignBannerConfig.textColor}
                  defaultValue="#1F1F1F"
                  onChange={(col) => setCampaignBannerConfig((prev) => ({ ...prev, textColor: col }))}
                />
              </label>
              <input
                type="text"
                value={campaignBannerConfig.textColor}
                onChange={(e) => setCampaignBannerConfig((prev) => ({ ...prev, textColor: e.target.value }))}
              />
            </div>
          </FormGrid>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'featured') && (
        <SectionCard $disabled={!sectionVisibility.featured}>
          <div className="section-header">
            <div className="title-box">
              <h3>5. Two-Panel Editorial Section (Riviere Necklaces & High Jewellery Bracelets)</h3>
              <span className="badge">Dual Showcase</span>
            </div>
            <div className="header-actions">
              <SmallBtn onClick={() => handleToggleSection('featured')}>
                {sectionVisibility.featured ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.featured ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {featuredCards.map((card, idx) => (
              <SubCard key={idx}>
                <h4 style={{ margin: '0 0 14px 0', color: '#19202a' }}>
                  PANEL {idx === 0 ? 'A (LEFT)' : 'B (RIGHT)'}: {card.title}
                </h4>
                <FormGrid>
                  <div className="full-width">
                    <label>
                      <span>Eyebrow Label</span>
                      <AdminColorPicker
                        value={(card as any).titleColor}
                        defaultValue="#C9A96E"
                        onChange={(col) => {
                          setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, titleColor: col } : c)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, title: val } : c)));
                      }}
                    />
                  </div>
                  <div className="full-width">
                    <label>
                      <span>Heading Title</span>
                      <AdminColorPicker
                        value={(card as any).subtitleColor}
                        defaultValue="#FFFDF9"
                        onChange={(col) => {
                          setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, subtitleColor: col } : c)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={card.subtitle}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, subtitle: val } : c)));
                      }}
                    />
                  </div>
                  <div>
                    <label>
                      <span>Button Text</span>
                      <AdminColorPicker
                        value={(card as any).buttonColor}
                        defaultValue="#FFFDF9"
                        onChange={(col) => {
                          setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, buttonColor: col } : c)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={card.buttonText || 'SHOP NOW →'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, buttonText: val } : c)));
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
                      label="Panel Image"
                      value={card.imageUrl}
                      onChange={(val) => setFeaturedCards((prev) => prev.map((c, i) => (i === idx ? { ...c, imageUrl: val } : c)))}
                    />
                  </div>
                </FormGrid>
              </SubCard>
            ))}
          </div>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'collection') && (
        <SectionCard $disabled={!sectionVisibility.signature}>
          <div className="section-header">
            <div className="title-box">
              <h3>6. Interactive Lookbook Collection Slides</h3>
              <span className="badge">{collectionSlides.length} Lookbook Slides</span>
            </div>
            <div className="header-actions">
              <SmallBtn
                onClick={() => {
                  setCollectionSlides((prev) => [
                    ...prev,
                    {
                      id: `slide-${Date.now()}`,
                      eyebrow: 'NEW COLLECTION 2026',
                      title: 'The Solitaire Series',
                      link: '/rings',
                      leftImage: '/assets/gem_rings_cat.png',
                      rightImage: '/assets/gem_solitaire_ring_perfect_v2.png',
                    },
                  ]);
                }}
              >
                <Plus size={13} /> Add Slide
              </SmallBtn>
              <SmallBtn onClick={() => handleToggleSection('signature')}>
                {sectionVisibility.signature ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.signature ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {collectionSlides.map((slide, idx) => (
              <SubCard key={slide.id || idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#19202a' }}>
                    Lookbook Slide #{idx + 1}: {slide.title}
                  </span>
                  <DangerSmallBtn
                    onClick={() => setCollectionSlides((prev) => prev.filter((_, i) => i !== idx))}
                  >
                    <Trash2 size={12} /> Remove
                  </DangerSmallBtn>
                </div>
                <FormGrid>
                  <div>
                    <label>
                      <span>Eyebrow Label</span>
                      <AdminColorPicker
                        value={(slide as any).eyebrowColor}
                        defaultValue="#C9A96E"
                        onChange={(col) => {
                          setCollectionSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, eyebrowColor: col } : s)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={slide.eyebrow}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCollectionSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, eyebrowColor: val } : s)));
                      }}
                    />
                  </div>
                  <div>
                    <label>
                      <span>Slide Title</span>
                      <AdminColorPicker
                        value={(slide as any).titleColor}
                        defaultValue="#19202a"
                        onChange={(col) => {
                          setCollectionSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, titleColor: col } : s)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCollectionSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, title: val } : s)));
                      }}
                    />
                  </div>
                  <div className="full-width">
                    <label>Shop Now URL / Link</label>
                    <input
                      type="text"
                      value={slide.link}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCollectionSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, link: val } : s)));
                      }}
                    />
                  </div>
                  <div>
                    <AdminImageUploadField
                      label="Left Focus Image"
                      value={slide.leftImage}
                      onChange={(val) => setCollectionSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, leftImage: val } : s)))}
                    />
                  </div>
                  <div>
                    <AdminImageUploadField
                      label="Right Editorial Image"
                      value={slide.rightImage}
                      onChange={(val) => setCollectionSlides((prev) => prev.map((s, i) => (i === idx ? { ...s, rightImage: val } : s)))}
                    />
                  </div>
                </FormGrid>
              </SubCard>
            ))}
          </div>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'essentials') && (
        <SectionCard $disabled={!sectionVisibility.essentials}>
          <div className="section-header">
            <div className="title-box">
              <h3>7. Dual Promotional Panels (Diamond Essentials & Golden Hour)</h3>
              <span className="badge">Dual Grid</span>
            </div>
            <div className="header-actions">
              <SmallBtn onClick={() => handleToggleSection('essentials')}>
                {sectionVisibility.essentials ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.essentials ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <SubCard>
              <h4 style={{ margin: '0 0 12px 0', color: '#19202a' }}>LEFT PROMO PANEL</h4>
              <FormGrid>
                <div className="full-width">
                  <label>
                    <span>Title</span>
                    <AdminColorPicker
                      value={(essentialsConfig as any).leftTitleColor}
                      defaultValue="#19202a"
                      onChange={(col) => setEssentialsConfig((prev: any) => ({ ...prev, leftTitleColor: col }))}
                    />
                  </label>
                  <input
                    type="text"
                    value={essentialsConfig.leftTitle}
                    onChange={(e) => setEssentialsConfig((prev) => ({ ...prev, leftTitle: e.target.value }))}
                  />
                </div>
                <div>
                  <label>
                    <span>Button Text</span>
                    <AdminColorPicker
                      value={(essentialsConfig as any).leftButtonColor}
                      defaultValue="#19202a"
                      onChange={(col) => setEssentialsConfig((prev: any) => ({ ...prev, leftButtonColor: col }))}
                    />
                  </label>
                  <input
                    type="text"
                    value={essentialsConfig.leftButtonText || 'DIAMOND ESSENTIALS'}
                    onChange={(e) => setEssentialsConfig((prev) => ({ ...prev, leftButtonText: e.target.value }))}
                  />
                </div>
                <div>
                  <label>Target URL</label>
                  <input
                    type="text"
                    value={essentialsConfig.leftTargetUrl}
                    onChange={(e) => setEssentialsConfig((prev) => ({ ...prev, leftTargetUrl: e.target.value }))}
                  />
                </div>
                <div className="full-width">
                  <AdminImageUploadField
                    label="Left Image"
                    value={essentialsConfig.leftImageUrl}
                    onChange={(val) => setEssentialsConfig((prev) => ({ ...prev, leftImageUrl: val }))}
                  />
                </div>
              </FormGrid>
            </SubCard>

            <SubCard>
              <h4 style={{ margin: '0 0 12px 0', color: '#19202a' }}>RIGHT PROMO PANEL</h4>
              <FormGrid>
                <div className="full-width">
                  <label>
                    <span>Title</span>
                    <AdminColorPicker
                      value={(essentialsConfig as any).rightTitleColor}
                      defaultValue="#19202a"
                      onChange={(col) => setEssentialsConfig((prev: any) => ({ ...prev, rightTitleColor: col }))}
                    />
                  </label>
                  <input
                    type="text"
                    value={essentialsConfig.rightTitle}
                    onChange={(e) => setEssentialsConfig((prev) => ({ ...prev, rightTitle: e.target.value }))}
                  />
                </div>
                <div>
                  <label>
                    <span>Button Text</span>
                    <AdminColorPicker
                      value={(essentialsConfig as any).rightButtonColor}
                      defaultValue="#19202a"
                      onChange={(col) => setEssentialsConfig((prev: any) => ({ ...prev, rightButtonColor: col }))}
                    />
                  </label>
                  <input
                    type="text"
                    value={essentialsConfig.rightButtonText || 'SHOP THE EVENT'}
                    onChange={(e) => setEssentialsConfig((prev) => ({ ...prev, rightButtonText: e.target.value }))}
                  />
                </div>
                <div>
                  <label>Target URL</label>
                  <input
                    type="text"
                    value={essentialsConfig.rightTargetUrl}
                    onChange={(e) => setEssentialsConfig((prev) => ({ ...prev, rightTargetUrl: e.target.value }))}
                  />
                </div>
                <div className="full-width">
                  <AdminImageUploadField
                    label="Right Image"
                    value={essentialsConfig.rightImageUrl}
                    onChange={(val) => setEssentialsConfig((prev) => ({ ...prev, rightImageUrl: val }))}
                  />
                </div>
              </FormGrid>
            </SubCard>
          </div>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'shapes') && (
        <SectionCard $disabled={!sectionVisibility.shapes}>
          <div className="section-header">
            <div className="title-box">
              <h3>8. Diamond Shapes Cut Grid & Vault</h3>
              <span className="badge">8 Cuts</span>
            </div>
            <div className="header-actions">
              <SmallBtn onClick={() => handleToggleSection('shapes')}>
                {sectionVisibility.shapes ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.shapes ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <FormGrid style={{ marginBottom: 20 }}>
            <div>
              <label>
                <span>Eyebrow Text</span>
                <AdminColorPicker
                  value={(diamondShapesConfig as any).eyebrowColor}
                  defaultValue="#C9A96E"
                  onChange={(col) => setDiamondShapesConfig((prev: any) => ({ ...prev, eyebrowColor: col }))}
                />
              </label>
              <input
                type="text"
                value={diamondShapesConfig.eyebrow}
                onChange={(e) => setDiamondShapesConfig((prev) => ({ ...prev, eyebrow: e.target.value }))}
              />
            </div>
            <div>
              <label>
                <span>Heading Title</span>
                <AdminColorPicker
                  value={(diamondShapesConfig as any).headingColor}
                  defaultValue="#19202a"
                  onChange={(col) => setDiamondShapesConfig((prev: any) => ({ ...prev, headingColor: col }))}
                />
              </label>
              <input
                type="text"
                value={diamondShapesConfig.heading}
                onChange={(e) => setDiamondShapesConfig((prev) => ({ ...prev, heading: e.target.value }))}
              />
            </div>
            <div className="full-width">
              <label>
                <span>Description</span>
                <AdminColorPicker
                  value={(diamondShapesConfig as any).descriptionColor}
                  defaultValue="#666666"
                  onChange={(col) => setDiamondShapesConfig((prev: any) => ({ ...prev, descriptionColor: col }))}
                />
              </label>
              <textarea
                value={diamondShapesConfig.description}
                onChange={(e) => setDiamondShapesConfig((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <label>
                <span>CTA Button Text</span>
                <AdminColorPicker
                  value={(diamondShapesConfig as any).buttonColor}
                  defaultValue="#ffffff"
                  onChange={(col) => setDiamondShapesConfig((prev: any) => ({ ...prev, buttonColor: col }))}
                />
              </label>
              <input
                type="text"
                value={diamondShapesConfig.buttonText}
                onChange={(e) => setDiamondShapesConfig((prev) => ({ ...prev, buttonText: e.target.value }))}
              />
            </div>
            <div>
              <label>CTA Button Link</label>
              <input
                type="text"
                value={diamondShapesConfig.buttonLink}
                onChange={(e) => setDiamondShapesConfig((prev) => ({ ...prev, buttonLink: e.target.value }))}
              />
            </div>
            <div className="full-width">
              <AdminImageUploadField
                label="Left Diamond Vault Showcase Image"
                value={diamondShapesConfig.leftImage}
                onChange={(val) => setDiamondShapesConfig((prev) => ({ ...prev, leftImage: val }))}
              />
            </div>
          </FormGrid>

          <h4 style={{ margin: '20px 0 12px 0', fontSize: '1rem', color: '#19202a' }}>Active Diamond Shapes</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {diamondShapesConfig.shapes.map((s, idx) => (
              <SubCard key={idx} style={{ padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#c9a45c' }}>{s.name}</span>
                  <label style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', margin: 0 }}>
                    <input
                      type="checkbox"
                      checked={s.enabled !== false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setDiamondShapesConfig((prev) => ({
                          ...prev,
                          shapes: prev.shapes.map((shapeItem, i) => (i === idx ? { ...shapeItem, enabled: checked } : shapeItem)),
                        }));
                      }}
                      style={{ width: 'auto' }}
                    />
                    Enabled
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Target URL"
                  value={s.url}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDiamondShapesConfig((prev) => ({
                      ...prev,
                      shapes: prev.shapes.map((shapeItem, i) => (i === idx ? { ...shapeItem, url: val } : shapeItem)),
                    }));
                  }}
                  style={{ fontSize: '0.8rem', padding: '6px 8px', marginBottom: 6 }}
                />
              </SubCard>
            ))}
          </div>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'onlyAura') && (
        <SectionCard $disabled={!sectionVisibility.onlyAura}>
          <div className="section-header">
            <div className="title-box">
              <h3>9. "Only At Aura Atelier" Showcase Cards</h3>
              <span className="badge">{auraCards.length} Cards</span>
            </div>
            <div className="header-actions">
              <SmallBtn
                onClick={() => {
                  setAuraCards((prev) => [
                    ...prev,
                    {
                      id: `only-${Date.now()}`,
                      eyebrow: 'NEW ATELIER BENEFIT',
                      title: 'Exclusive bespoke concierge consultation',
                      image: '/assets/aura_only_at_1.png',
                      url: '/custom-jewellery',
                    },
                  ]);
                }}
              >
                <Plus size={13} /> Add Card
              </SmallBtn>
              <SmallBtn onClick={() => handleToggleSection('onlyAura')}>
                {sectionVisibility.onlyAura ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.onlyAura ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {auraCards.map((card, idx) => (
              <SubCard key={card.id || idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#19202a' }}>Card #{idx + 1}</span>
                  <DangerSmallBtn onClick={() => setAuraCards((prev) => prev.filter((_, i) => i !== idx))}>
                    <Trash2 size={12} /> Remove
                  </DangerSmallBtn>
                </div>
                <FormGrid>
                  <div className="full-width">
                    <label>
                      <span>Eyebrow Label</span>
                      <AdminColorPicker
                        value={(card as any).eyebrowColor}
                        defaultValue="#C9A96E"
                        onChange={(col) => {
                          setAuraCards((prev) => prev.map((c, i) => (i === idx ? { ...c, eyebrowColor: col } : c)));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={card.eyebrow}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAuraCards((prev) => prev.map((c, i) => (i === idx ? { ...c, eyebrow: val } : c)));
                      }}
                    />
                  </div>
                  <div className="full-width">
                    <label>
                      <span>Card Title</span>
                      <AdminColorPicker
                        value={(card as any).titleColor}
                        defaultValue="#19202a"
                        onChange={(col) => {
                          setAuraCards((prev) => prev.map((c, i) => (i === idx ? { ...c, titleColor: col } : c)));
                        }}
                      />
                    </label>
                    <textarea
                      value={card.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAuraCards((prev) => prev.map((c, i) => (i === idx ? { ...c, title: val } : c)));
                      }}
                      style={{ minHeight: '60px' }}
                    />
                  </div>
                  <div className="full-width">
                    <label>Target URL</label>
                    <input
                      type="text"
                      value={card.url}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAuraCards((prev) => prev.map((c, i) => (i === idx ? { ...c, url: val } : c)));
                      }}
                    />
                  </div>
                  <div className="full-width">
                    <AdminImageUploadField
                      label="Card Image"
                      value={card.image}
                      onChange={(val) => setAuraCards((prev) => prev.map((c, i) => (i === idx ? { ...c, image: val } : c)))}
                    />
                  </div>
                </FormGrid>
              </SubCard>
            ))}
          </div>
        </SectionCard>
      )}

      {(activeTab === 'all' || activeTab === 'reviews') && (
        <SectionCard $disabled={!sectionVisibility.reviews}>
          <div className="section-header">
            <div className="title-box">
              <h3>10. Voices of Elegance (Customer Testimonials & Reviews)</h3>
              <span className="badge">Reviews</span>
            </div>
            <div className="header-actions">
              <SmallBtn
                onClick={() => {
                  setReviewsConfig((prev) => ({
                    ...prev,
                    customReviews: [
                      ...prev.customReviews,
                      { id: `rev-${Date.now()}`, author: 'Verified Client', rating: 5, text: 'Exceptional craftsmanship!' },
                    ],
                  }));
                }}
              >
                <Plus size={13} /> Add Review
              </SmallBtn>
              <SmallBtn onClick={() => handleToggleSection('reviews')}>
                {sectionVisibility.reviews ? <EyeOff size={13} /> : <Eye size={13} />}{' '}
                {sectionVisibility.reviews ? 'Hide Section' : 'Show Section'}
              </SmallBtn>
            </div>
          </div>

          <FormGrid style={{ marginBottom: 20 }}>
            <div>
              <label>
                <span>Section Eyebrow</span>
                <AdminColorPicker
                  value={(reviewsConfig as any).eyebrowColor}
                  defaultValue="#C9A96E"
                  onChange={(col) => setReviewsConfig((prev: any) => ({ ...prev, eyebrowColor: col }))}
                />
              </label>
              <input
                type="text"
                value={reviewsConfig.eyebrow}
                onChange={(e) => setReviewsConfig((prev) => ({ ...prev, eyebrow: e.target.value }))}
              />
            </div>
            <div>
              <label>
                <span>Section Title</span>
                <AdminColorPicker
                  value={(reviewsConfig as any).titleColor}
                  defaultValue="#19202a"
                  onChange={(col) => setReviewsConfig((prev: any) => ({ ...prev, titleColor: col }))}
                />
              </label>
              <input
                type="text"
                value={reviewsConfig.title}
                onChange={(e) => setReviewsConfig((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
          </FormGrid>

          <h4 style={{ margin: '14px 0 10px 0', fontSize: '0.95rem', color: '#19202a' }}>Custom Testimonial Quotes</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {reviewsConfig.customReviews.map((rev, idx) => (
              <SubCard key={rev.id || idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#19202a' }}>Review #{idx + 1}</span>
                  <DangerSmallBtn
                    onClick={() => {
                      setReviewsConfig((prev) => ({
                        ...prev,
                        customReviews: prev.customReviews.filter((_, i) => i !== idx),
                      }));
                    }}
                  >
                    <Trash2 size={12} /> Remove
                  </DangerSmallBtn>
                </div>
                <FormGrid>
                  <div>
                    <label>
                      <span>Client Name</span>
                      <AdminColorPicker
                        value={(rev as any).authorColor}
                        defaultValue="#19202a"
                        onChange={(col) => {
                          setReviewsConfig((prev: any) => ({
                            ...prev,
                            customReviews: prev.customReviews.map((r: any, i: number) => (i === idx ? { ...r, authorColor: col } : r)),
                          }));
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      value={rev.author}
                      onChange={(e) => {
                        const val = e.target.value;
                        setReviewsConfig((prev) => ({
                          ...prev,
                          customReviews: prev.customReviews.map((r, i) => (i === idx ? { ...r, author: val } : r)),
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <label>Rating (1 to 5 Stars)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rev.rating || 5}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setReviewsConfig((prev) => ({
                          ...prev,
                          customReviews: prev.customReviews.map((r, i) => (i === idx ? { ...r, rating: val } : r)),
                        }));
                      }}
                    />
                  </div>
                  <div className="full-width">
                    <label>
                      <span>Review Quote</span>
                      <AdminColorPicker
                        value={(rev as any).textColor}
                        defaultValue="#555555"
                        onChange={(col) => {
                          setReviewsConfig((prev: any) => ({
                            ...prev,
                            customReviews: prev.customReviews.map((r: any, i: number) => (i === idx ? { ...r, textColor: col } : r)),
                          }));
                        }}
                      />
                    </label>
                    <textarea
                      value={rev.text}
                      onChange={(e) => {
                        const val = e.target.value;
                        setReviewsConfig((prev) => ({
                          ...prev,
                          customReviews: prev.customReviews.map((r, i) => (i === idx ? { ...r, text: val } : r)),
                        }));
                      }}
                    />
                  </div>
                </FormGrid>
              </SubCard>
            ))}
          </div>
        </SectionCard>
      )}

      {modalOpen && editingBanner && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>{editingBanner.id ? 'Edit Hero Banner' : 'Create New Hero Banner'}</h3>
              <SmallBtn onClick={() => setModalOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                <X size={20} />
              </SmallBtn>
            </ModalHeader>

            <form onSubmit={handleSaveHeroModal}>
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
                  <label>
                    <span>Eyebrow / Subtitle</span>
                    <AdminColorPicker
                      value={editingBanner.subtitleColor}
                      defaultValue="#c9a45c"
                      onChange={(col) => setEditingBanner({ ...editingBanner, subtitleColor: col })}
                    />
                  </label>
                  <input
                    type="text"
                    value={editingBanner.subtitle || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                    placeholder="e.g. THE SIGNATURE COLLECTION 2026"
                  />
                </div>

                <div className="full-width">
                  <label>
                    <span>Main Headline Title</span>
                    <AdminColorPicker
                      value={editingBanner.titleColor}
                      defaultValue="#ffffff"
                      onChange={(col) => setEditingBanner({ ...editingBanner, titleColor: col })}
                    />
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBanner.title || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    placeholder="e.g. Handcrafted Elegance & Exceptional Diamonds"
                  />
                </div>

                <div className="full-width">
                  <label>
                    <span>Description Paragraph</span>
                    <AdminColorPicker
                      value={editingBanner.descriptionColor}
                      defaultValue="#f5f1e8"
                      onChange={(col) => setEditingBanner({ ...editingBanner, descriptionColor: col })}
                    />
                  </label>
                  <textarea
                    rows={3}
                    value={editingBanner.description || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })}
                    placeholder="Immerse yourself in world-class atelier craftsmanship..."
                  />
                </div>

                <div>
                  <label>
                    <span>Primary CTA Text</span>
                    <AdminColorPicker
                      value={editingBanner.primaryCtaTextColor}
                      defaultValue="#101418"
                      onChange={(col) => setEditingBanner({ ...editingBanner, primaryCtaTextColor: col })}
                    />
                  </label>
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
                  <label>
                    <span>Secondary CTA Text (Optional)</span>
                    <AdminColorPicker
                      value={editingBanner.secondaryCtaTextColor}
                      defaultValue="#ffffff"
                      onChange={(col) => setEditingBanner({ ...editingBanner, secondaryCtaTextColor: col })}
                    />
                  </label>
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
                    placeholder="e.g. Ultra-luxury solitaire diamond engagement ring by AethelCarats"
                  />
                </div>

                {/* UPLOAD DESKTOP HERO IMAGE FILE */}
                <div className="full-width">
                  <AdminImageUploadField
                    label="Desktop Hero Image (16:9 Format Required)"
                    value={editingBanner.imagePath || ''}
                    onChange={(val) => setEditingBanner({ ...editingBanner, imagePath: val })}
                  />
                </div>

                {/* UPLOAD MOBILE HERO IMAGE FILE (OPTIONAL) */}
                <div className="full-width">
                  <AdminImageUploadField
                    label="Mobile Hero Image (Optional Portrait Version)"
                    value={editingBanner.mobileImagePath || ''}
                    onChange={(val) => setEditingBanner({ ...editingBanner, mobileImagePath: val })}
                  />
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
    </Container>
  );
};
