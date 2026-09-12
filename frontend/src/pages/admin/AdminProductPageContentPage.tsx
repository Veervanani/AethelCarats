import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  Image as ImageIcon,
  ShieldCheck,
  Award,
  Sparkles,
  Truck,
  Package,
  Clock,
  Sliders,
  FileEdit,
  Layers,
  Star,
  RefreshCw,
  Check,
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

// Styled Components
const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 80px;
`;

const TopHeaderCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 24px 28px;
  margin-bottom: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  .title-area {
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2rem;
      font-weight: 600;
      color: #12161a;
      margin: 0 0 4px 0;
      letter-spacing: 0.04em;
    }
    p {
      color: #77736c;
      font-size: 0.88rem;
      margin: 0;
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const ProductSelectorCard = styled.div`
  background: #12161a;
  color: #ffffff;
  border-radius: 6px;
  padding: 20px 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(18, 22, 26, 0.12);

  .selector-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    .label {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #c9a45c;
    }
  }

  .select-wrapper {
    position: relative;
    min-width: 280px;

    select {
      width: 100%;
      padding: 10px 14px;
      background: #1c2228;
      border: 1px solid #343f4c;
      border-radius: 4px;
      color: #fffdf9;
      font-size: 0.9rem;
      font-weight: 500;
      outline: none;
      cursor: pointer;

      &:focus {
        border-color: #c9a45c;
      }
    }
  }

  .product-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(201, 164, 92, 0.15);
    border: 1px solid rgba(201, 164, 92, 0.3);
    padding: 6px 14px;
    border-radius: 4px;
    font-size: 0.82rem;
    color: #e5cf9b;

    .p-status {
      font-weight: 700;
      color: #34a853;
    }
  }
`;

const AdminButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline' | 'danger'; $size?: 'sm' | 'md' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ $size }) => ($size === 'sm' ? '8px 14px' : '12px 22px')};
  font-size: ${({ $size }) => ($size === 'sm' ? '0.82rem' : '0.88rem')};
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ $variant }) =>
    $variant === 'secondary'
      ? `
    background: #12161a;
    color: #ffffff;
    border: 1px solid #12161a;
    &:hover { background: #2c3645; }
  `
      : $variant === 'outline'
      ? `
    background: transparent;
    color: #12161a;
    border: 1px solid #d9d3c7;
    &:hover { background: #faf8f5; border-color: #12161a; }
  `
      : $variant === 'danger'
      ? `
    background: #fff0f0;
    color: #c5221f;
    border: 1px solid #f8c4c4;
    &:hover { background: #c5221f; color: #fff; }
  `
      : `
    background: #c9a45c;
    color: #ffffff;
    border: 1px solid #c9a45c;
    &:hover { background: #b38f46; border-color: #b38f46; }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SectionAccordionCard = styled.div<{ $isOpen: boolean }>`
  background: #ffffff;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? '#c9a45c' : '#e8e3d9')};
  border-radius: 6px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
  transition: border-color 0.2s ease;
`;

const AccordionHeader = styled.div<{ $isOpen: boolean }>`
  padding: 18px 24px;
  background: ${({ $isOpen }) => ($isOpen ? '#fcfaf6' : '#ffffff')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border-bottom: ${({ $isOpen }) => ($isOpen ? '1px solid #e8e3d9' : 'none')};

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-box {
      width: 34px;
      height: 34px;
      border-radius: 4px;
      background: rgba(201, 164, 92, 0.12);
      color: #c9a45c;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #12161a;
      margin: 0;
      letter-spacing: 0.02em;
    }

    .desc-sub {
      font-size: 0.78rem;
      color: #8c877b;
      margin-left: 8px;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .toggle-arrow {
      color: #8c877b;
      transition: transform 0.2s ease;
    }
  }
`;

const AccordionBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #ffffff;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  label {
    font-size: 0.88rem;
    font-weight: 600;
    color: #12161a;
    letter-spacing: 0.02em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
    width: 100%;

    .help-text {
      font-weight: 400;
      color: #77736c;
      font-size: 0.78rem;
    }
  }

  input[type='text'],
  textarea,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    border: 1px solid #d9d3c7;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #12161a;
    background: #ffffff;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #c9a45c;
      box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.15);
    }
  }

  textarea {
    min-height: 110px;
    resize: vertical;
    line-height: 1.5;
    font-family: inherit;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ItemCard = styled.div`
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 20px;
  background: #faf8f5;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;

  .item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e3d9;
    padding-bottom: 12px;

    .item-title-box {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      font-size: 0.9rem;
      color: #12161a;
      flex: 1;
    }

    .item-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #c9a45c;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
`;

const ImageUploadArea = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  border: 2px dashed #c9a45c;
  border-radius: 8px;
  padding: 24px;
  background: #fcfaf6;
  width: 100%;
  box-sizing: border-box;

  .preview-box {
    width: 140px;
    height: 140px;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e8e3d9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .upload-controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const ICON_OPTIONS = [
  'Truck',
  'ShieldCheck',
  'Award',
  'Sparkles',
  'Gem',
  'Package',
  'Clock',
  'CheckCircle',
  'Heart',
  'Sliders',
  'Star',
];

export const AdminProductPageContentPage: React.FC = () => {
  const { showToast } = useToast();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('global');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // Accordion section open/close state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    hero: true,
    benefits: true,
    experience: false,
    shipping: false,
    craftsmanship: false,
    packaging: false,
    packagingImage: false,
    reviews: false,
    similar: false,
    recentlyViewed: false,
    visibility: false,
  });

  // State for all editable content
  const [content, setContent] = useState<any>({
    heroTitle: '',
    heroSubtitle: '',
    heroShortDescription: '',
    heroAnnouncement: '',
    heroBreadcrumbLabel: '',

    benefits: [],
    accordions: [],
    shippingInfo: {
      processingTime: '',
      manufacturingTime: '',
      shippingTime: '',
      deliveryTime: '',
      shippingMethod: '',
      insuranceInfo: '',
      returnInfo: '',
      internationalShippingInfo: '',
    },

    craftsmanshipTitle: '',
    craftsmanshipDescription: '',
    sustainabilityInfo: '',
    manufacturingInfo: '',
    materialsInfo: '',
    certificationInfo: '',
    craftsmanshipImage: '',

    packagingHeading: '',
    packagingDescription: '',
    packagingItems: [],
    packagingImageUrl: '',

    reviewsTitle: '',
    reviewsEnabled: true,
    reviewsVerifiedBadge: true,
    reviewsSubmissionEnabled: true,
    reviewsDefaultSort: 'newest',

    similarItemsTitle: '',
    similarProducts: [],
    similarItemsEnabled: true,

    recentlyViewedTitle: '',
    recentlyViewedEnabled: true,

    showBenefits: true,
    showExperienceAccordion: true,
    showSpecifications: true,
    showCraftsmanshipSection: true,
    showPackagingSection: true,
    showReviews: true,
    showSimilarItems: true,
    showRecentlyViewed: true,
    showBuyNowButton: true,
    showStickyBar: true,
    showQuantitySelector: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products?limit=200');
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error('Failed to load products list:', err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch content when selectedProductId changes
  useEffect(() => {
    const loadPageContent = async () => {
      setLoading(true);
      try {
        const queryParam = selectedProductId === 'global' ? 'global' : selectedProductId;
        const res = await api.get('/admin/product-page-content?productId=' + queryParam);
        const data = res.data.content;

        if (selectedProductId !== 'global') {
          const found = products.find((p) => p.id === selectedProductId);
          setSelectedProduct(found || null);
        } else {
          setSelectedProduct(null);
        }

        // Parse JSON strings safely
        let parsedBenefits = [];
        let parsedAccordions = [];
        let parsedShipping = {};
        let parsedPkgItems = [];
        let parsedSimilar = [];

        try {
          parsedBenefits = typeof data.benefitsJson === 'string' ? JSON.parse(data.benefitsJson) : data.benefitsJson || [];
        } catch (e) {}
        try {
          parsedAccordions = typeof data.accordionsJson === 'string' ? JSON.parse(data.accordionsJson) : data.accordionsJson || [];
        } catch (e) {}
        try {
          parsedShipping = typeof data.shippingInfoJson === 'string' ? JSON.parse(data.shippingInfoJson) : data.shippingInfoJson || {};
        } catch (e) {}
        try {
          parsedPkgItems = typeof data.packagingItemsJson === 'string' ? JSON.parse(data.packagingItemsJson) : data.packagingItemsJson || [];
        } catch (e) {}
        try {
          parsedSimilar = typeof data.similarProductsJson === 'string' ? JSON.parse(data.similarProductsJson) : data.similarProductsJson || [];
        } catch (e) {}

        setContent({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          heroShortDescription: data.heroShortDescription || '',
          heroAnnouncement: data.heroAnnouncement || '',
          heroBreadcrumbLabel: data.heroBreadcrumbLabel || '',

          benefits: Array.isArray(parsedBenefits) ? parsedBenefits : [],
          accordions: Array.isArray(parsedAccordions) ? parsedAccordions : [],
          shippingInfo: {
            processingTime: (parsedShipping as any).processingTime || '1–2 working days',
            manufacturingTime: (parsedShipping as any).manufacturingTime || '7–10 working days',
            shippingTime: (parsedShipping as any).shippingTime || '2–4 working days',
            deliveryTime: (parsedShipping as any).deliveryTime || '7–10 working days after production',
            shippingMethod: (parsedShipping as any).shippingMethod || 'FedEx Priority Express (Fully Insured)',
            insuranceInfo: (parsedShipping as any).insuranceInfo || '100% covered from our Surat atelier until hand-delivered to recipient.',
            returnInfo: (parsedShipping as any).returnInfo || '30-Day Money Back Guarantee with complimentary return shipping.',
            internationalShippingInfo: (parsedShipping as any).internationalShippingInfo || 'Available worldwide with customs duties & taxes handled seamlessly.',
          },

          craftsmanshipTitle: data.craftsmanshipTitle || '',
          craftsmanshipDescription: data.craftsmanshipDescription || '',
          sustainabilityInfo: data.sustainabilityInfo || '',
          manufacturingInfo: data.manufacturingInfo || '',
          materialsInfo: data.materialsInfo || '',
          certificationInfo: data.certificationInfo || '',
          craftsmanshipImage: data.craftsmanshipImage || '',

          packagingHeading: data.packagingHeading || '',
          packagingDescription: data.packagingDescription || '',
          packagingItems: Array.isArray(parsedPkgItems) ? parsedPkgItems : [],
          packagingImageUrl: data.packagingImageUrl || '',

          reviewsTitle: data.reviewsTitle || 'Customer Reviews & Feedback',
          reviewsEnabled: data.reviewsEnabled ?? true,
          reviewsVerifiedBadge: data.reviewsVerifiedBadge ?? true,
          reviewsSubmissionEnabled: data.reviewsSubmissionEnabled ?? true,
          reviewsDefaultSort: data.reviewsDefaultSort || 'newest',

          similarItemsTitle: data.similarItemsTitle || 'You May Also Like',
          similarProducts: Array.isArray(parsedSimilar) ? parsedSimilar : [],
          similarItemsEnabled: data.similarItemsEnabled ?? true,

          recentlyViewedTitle: data.recentlyViewedTitle || 'Recently Viewed',
          recentlyViewedEnabled: data.recentlyViewedEnabled ?? true,

          showBenefits: data.showBenefits ?? true,
          showExperienceAccordion: data.showExperienceAccordion ?? true,
          showSpecifications: data.showSpecifications ?? true,
          showCraftsmanshipSection: data.showCraftsmanshipSection ?? true,
          showPackagingSection: data.showPackagingSection ?? true,
          showReviews: data.showReviews ?? true,
          showSimilarItems: data.showSimilarItems ?? true,
          showRecentlyViewed: data.showRecentlyViewed ?? true,
          showBuyNowButton: data.showBuyNowButton ?? true,
          showStickyBar: data.showStickyBar ?? true,
          showQuantitySelector: data.showQuantitySelector ?? true,
        });
      } catch (err: any) {
        console.error('Error loading product page content:', err);
        showToast('Failed to load product page content', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadPageContent();
  }, [selectedProductId, products]);

  // Handle Save
  const handleSave = async (redirectPreview: boolean = false) => {
    setSaving(true);
    try {
      const payload = {
        productId: selectedProductId === 'global' ? null : selectedProductId,
        heroTitle: content.heroTitle,
        heroSubtitle: content.heroSubtitle,
        heroShortDescription: content.heroShortDescription,
        heroAnnouncement: content.heroAnnouncement,
        heroBreadcrumbLabel: content.heroBreadcrumbLabel,

        benefitsJson: JSON.stringify(content.benefits),
        accordionsJson: JSON.stringify(content.accordions),
        shippingInfoJson: JSON.stringify(content.shippingInfo),

        craftsmanshipTitle: content.craftsmanshipTitle,
        craftsmanshipDescription: content.craftsmanshipDescription,
        sustainabilityInfo: content.sustainabilityInfo,
        manufacturingInfo: content.manufacturingInfo,
        materialsInfo: content.materialsInfo,
        certificationInfo: content.certificationInfo,
        craftsmanshipImage: content.craftsmanshipImage,

        packagingHeading: content.packagingHeading,
        packagingDescription: content.packagingDescription,
        packagingItemsJson: JSON.stringify(content.packagingItems),
        packagingImageUrl: content.packagingImageUrl,

        reviewsTitle: content.reviewsTitle,
        reviewsEnabled: content.reviewsEnabled,
        reviewsVerifiedBadge: content.reviewsVerifiedBadge,
        reviewsSubmissionEnabled: content.reviewsSubmissionEnabled,
        reviewsDefaultSort: content.reviewsDefaultSort,

        similarItemsTitle: content.similarItemsTitle,
        similarProductsJson: JSON.stringify(content.similarProducts),
        similarItemsEnabled: content.similarItemsEnabled,

        recentlyViewedTitle: content.recentlyViewedTitle,
        recentlyViewedEnabled: content.recentlyViewedEnabled,

        showBenefits: content.showBenefits,
        showExperienceAccordion: content.showExperienceAccordion,
        showSpecifications: content.showSpecifications,
        showCraftsmanshipSection: content.showCraftsmanshipSection,
        showPackagingSection: content.showPackagingSection,
        showReviews: content.showReviews,
        showSimilarItems: content.showSimilarItems,
        showRecentlyViewed: content.showRecentlyViewed,
        showBuyNowButton: content.showBuyNowButton,
        showStickyBar: content.showStickyBar,
        showQuantitySelector: content.showQuantitySelector,
      };

      await api.put('/admin/product-page-content', payload);
      showToast('Product page content saved successfully to cloud database!', 'success');

      if (redirectPreview) {
        handlePreview();
      }
    } catch (err: any) {
      console.error('Failed to save product page content:', err);
      showToast(err.response?.data?.message || 'Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Preview Product Page
  const handlePreview = () => {
    let previewUrl = '/rings/solitaire-engagement-ring';
    if (selectedProduct && selectedProduct.slug) {
      previewUrl = '/rings/' + selectedProduct.slug;
    } else if (products.length > 0 && products[0].slug) {
      previewUrl = '/rings/' + products[0].slug;
    }
    window.open(previewUrl, '_blank');
  };

  // Image Upload helper
  const handleImageUpload = async (file: File, targetField: 'craftsmanshipImage' | 'packagingImageUrl') => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      showToast('Uploading image to persistent storage...', 'info');
      const res = await api.post('/admin/media/upload', formData);

      if (res.data && res.data.urls && res.data.urls.length > 0) {
        const uploadedUrl = res.data.urls[0];
        setContent((prev: any) => ({ ...prev, [targetField]: uploadedUrl }));
        showToast('Image uploaded successfully!', 'success');
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      showToast('Image upload failed. Please try again.', 'error');
    }
  };

  // Benefit List Helpers
  const addBenefit = () => {
    const newB = {
      id: 'b-' + Date.now(),
      title: 'New Benefit Item',
      description: 'Benefit description text goes here.',
      icon: 'CheckCircle',
      sortOrder: content.benefits.length,
      isActive: true,
    };
    setContent((prev: any) => ({ ...prev, benefits: [...prev.benefits, newB] }));
  };

  const updateBenefit = (index: number, field: string, value: any) => {
    const updated = [...content.benefits];
    updated[index] = { ...updated[index], [field]: value };
    setContent((prev: any) => ({ ...prev, benefits: updated }));
  };

  const removeBenefit = (index: number) => {
    const updated = content.benefits.filter((_: any, i: number) => i !== index);
    setContent((prev: any) => ({ ...prev, benefits: updated }));
  };

  const moveBenefit = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= content.benefits.length) return;
    const updated = [...content.benefits];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setContent((prev: any) => ({ ...prev, benefits: updated }));
  };

  // Accordion Item Helpers
  const addAccordionItem = () => {
    const newAcc = {
      id: 'acc-' + Date.now(),
      title: 'NEW ACCORDION SECTION',
      content: 'Detailed description and guidelines for this custom section.',
      icon: 'Sparkles',
      sortOrder: content.accordions.length,
      isActive: true,
    };
    setContent((prev: any) => ({ ...prev, accordions: [...prev.accordions, newAcc] }));
  };

  const updateAccordionItem = (index: number, field: string, value: any) => {
    const updated = [...content.accordions];
    updated[index] = { ...updated[index], [field]: value };
    setContent((prev: any) => ({ ...prev, accordions: updated }));
  };

  const removeAccordionItem = (index: number) => {
    const updated = content.accordions.filter((_: any, i: number) => i !== index);
    setContent((prev: any) => ({ ...prev, accordions: updated }));
  };

  const moveAccordionItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= content.accordions.length) return;
    const updated = [...content.accordions];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setContent((prev: any) => ({ ...prev, accordions: updated }));
  };

  // Packaging Item Helpers
  const addPkgItem = () => {
    const newPkg = {
      id: 'pkg-' + Date.now(),
      title: 'New Packaging Feature',
      description: 'Feature explanation details.',
      icon: 'Package',
      sortOrder: content.packagingItems.length,
      isActive: true,
    };
    setContent((prev: any) => ({ ...prev, packagingItems: [...prev.packagingItems, newPkg] }));
  };

  const updatePkgItem = (index: number, field: string, value: any) => {
    const updated = [...content.packagingItems];
    updated[index] = { ...updated[index], [field]: value };
    setContent((prev: any) => ({ ...prev, packagingItems: updated }));
  };

  const removePkgItem = (index: number) => {
    const updated = content.packagingItems.filter((_: any, i: number) => i !== index);
    setContent((prev: any) => ({ ...prev, packagingItems: updated }));
  };

  const movePkgItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= content.packagingItems.length) return;
    const updated = [...content.packagingItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setContent((prev: any) => ({ ...prev, packagingItems: updated }));
  };

  // Similar Products Helper
  const toggleSimilarProduct = (prodId: string) => {
    const exists = content.similarProducts.includes(prodId);
    let updated = [];
    if (exists) {
      updated = content.similarProducts.filter((id: string) => id !== prodId);
    } else {
      updated = [...content.similarProducts, prodId];
    }
    setContent((prev: any) => ({ ...prev, similarProducts: updated }));
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ padding: '60px', textAlign: 'center', color: '#c9a45c', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem'  }}>
          LOADING PRODUCT PAGE CONTENT CONFIGURATION...
        </div>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      {/* Top Header */}
      <TopHeaderCard>
        <div className="title-area">
          <h1>PRODUCT PAGE CONTENT</h1>
          <p>Manage all text, accordion sections, benefits, shipping info, and image content on customer product detail pages.</p>
        </div>

        <div className="action-buttons">
          <AdminButton type="button" $variant="outline" onClick={handlePreview}>
            <Eye size={16} /> PREVIEW PRODUCT PAGE
          </AdminButton>

          <AdminButton type="button" $variant="secondary" onClick={() => handleSave(true)} disabled={saving}>
            <Save size={16} /> Save & Preview
          </AdminButton>

          <AdminButton type="button" $variant="primary" onClick={() => handleSave(false)} disabled={saving}>
            {saving ? <RefreshCw size={16} className="spin" /> : <Save size={16} />} SAVE CHANGES
          </AdminButton>
        </div>
      </TopHeaderCard>

      {/* Product Selector Bar */}
      <ProductSelectorCard>
        <div className="selector-left">
          <span className="label">SELECT SCOPE:</span>
          <div className="select-wrapper">
            <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
              <option value="global">★ GLOBAL DEFAULT CONTENT (All Products)</option>
              <optgroup label="Product Specific Overrides">
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {`${p.name} (${p.sku || p.id.slice(0, 8)})`}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {selectedProduct ? (
          <div className="product-badge">
            <span>Product: <strong>{selectedProduct.name}</strong></span>
            <span>SKU: <strong>{selectedProduct.sku || 'N/A'}</strong></span>
            <span className="p-status">● {selectedProduct.status || 'ACTIVE'}</span>
          </div>
        ) : (
          <div className="product-badge">
            <span>Editing <strong>GLOBAL DEFAULT CONTENT</strong> applied to all products without custom overrides.</span>
          </div>
        )}
      </ProductSelectorCard>

      {/* SECTION 1: PRODUCT PAGE INTRO / HERO CONTENT */}
      <SectionAccordionCard $isOpen={openSections.hero}>
        <AccordionHeader $isOpen={openSections.hero} onClick={() => toggleSection('hero')}>
          <div className="header-left">
            <div className="icon-box"><FileEdit size={18} /></div>
            <div>
              <h3>1. PRODUCT PAGE INTRO / HERO CONTENT</h3>
              <span className="desc-sub">Main page title, subtitle, announcement banner, and category label</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.hero ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.hero && (
          <AccordionBody>
            <FormRow>
              <FormGroup>
                <label>Product Page Header Title <span className="help-text">(Override header title)</span></label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  placeholder="e.g. Exquisite Fine Jewellery"
                />
              </FormGroup>
              <FormGroup>
                <label>Breadcrumb / Category Tagline</label>
                <input
                  type="text"
                  value={content.heroBreadcrumbLabel}
                  onChange={(e) => setContent({ ...content, heroBreadcrumbLabel: e.target.value })}
                  placeholder="e.g. Fine Jewellery / Solitaire Collection"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label>Page Subtitle</label>
              <input
                type="text"
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                placeholder="e.g. Handcrafted luxury pieces designed for life's timeless moments."
              />
            </FormGroup>

            <FormGroup>
              <label>Short Narrative Description</label>
              <textarea
                value={content.heroShortDescription}
                onChange={(e) => setContent({ ...content, heroShortDescription: e.target.value })}
                placeholder="Provide a brief story or product narrative..."
              />
            </FormGroup>

            <FormGroup>
              <label>Announcement Bar Text <span className="help-text">(Top banner message)</span></label>
              <input
                type="text"
                value={content.heroAnnouncement}
                onChange={(e) => setContent({ ...content, heroAnnouncement: e.target.value })}
                placeholder="e.g. Complimentary Express Insured Worldwide Shipping & 30-Day Returns"
              />
            </FormGroup>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 2: PRODUCT BENEFITS */}
      <SectionAccordionCard $isOpen={openSections.benefits}>
        <AccordionHeader $isOpen={openSections.benefits} onClick={() => toggleSection('benefits')}>
          <div className="header-left">
            <div className="icon-box"><ShieldCheck size={18} /></div>
            <div>
              <h3>2. PRODUCT BENEFITS</h3>
              <span className="desc-sub">Manage trust badges shown below purchase buttons {`(${content.benefits.length} items)`}</span>
            </div>
          </div>
          <div className="header-right">
            <AdminButton type="button" $size="sm" $variant="outline" onClick={(e) => { e.stopPropagation(); addBenefit(); }}>
              <Plus size={14} /> Add Benefit
            </AdminButton>
            {openSections.benefits ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.benefits && (
          <AccordionBody>
            {content.benefits.map((b: any, index: number) => (
              <ItemCard key={b.id || index}>
                <div className="item-top">
                  <div className="item-title-box">
                    <span>#{index + 1}</span>
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                      style={{ fontWeight: 600, border: '1px solid #d9d3c7', padding: '4px 8px', borderRadius: 4  }}
                    />
                  </div>
                  <div className="item-actions">
                    <ToggleSwitch title="Active / Inactive">
                      <input
                        type="checkbox"
                        checked={b.isActive !== false}
                        onChange={(e) => updateBenefit(index, 'isActive', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </ToggleSwitch>

                    <button type="button" onClick={() => moveBenefit(index, 'up')} disabled={index === 0} style={{ background: 'none', border: 'none', cursor: 'pointer'  }}>
                      <ChevronUp size={16} />
                    </button>
                    <button type="button" onClick={() => moveBenefit(index, 'down')} disabled={index === content.benefits.length - 1} style={{ background: 'none', border: 'none', cursor: 'pointer'  }}>
                      <ChevronDown size={16} />
                    </button>
                    <button type="button" onClick={() => removeBenefit(index)} style={{ background: 'none', border: 'none', color: '#c5221f', cursor: 'pointer'  }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <FormRow>
                  <FormGroup>
                    <label>Description</label>
                    <input
                      type="text"
                      value={b.description || ''}
                      onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                      placeholder="Benefit short description"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Icon</label>
                    <select value={b.icon || 'Truck'} onChange={(e) => updateBenefit(index, 'icon', e.target.value)}>
                      {ICON_OPTIONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </FormGroup>
                </FormRow>
              </ItemCard>
            ))}

            <AdminButton type="button" $size="sm" $variant="outline" onClick={addBenefit}>
              <Plus size={14} /> Add New Benefit Item
            </AdminButton>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 3: PRODUCT EXPERIENCE ACCORDION */}
      <SectionAccordionCard $isOpen={openSections.experience}>
        <AccordionHeader $isOpen={openSections.experience} onClick={() => toggleSection('experience')}>
          <div className="header-left">
            <div className="icon-box"><Layers size={18} /></div>
            <div>
              <h3>3. PRODUCT EXPERIENCE ACCORDION</h3>
              <span className="desc-sub">Manage collapsible experience tabs {`(${content.accordions.length} sections)`}</span>
            </div>
          </div>
          <div className="header-right">
            <AdminButton type="button" $size="sm" $variant="outline" onClick={(e) => { e.stopPropagation(); addAccordionItem(); }}>
              <Plus size={14} /> Add Accordion Section
            </AdminButton>
            {openSections.experience ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.experience && (
          <AccordionBody>
            {content.accordions.map((acc: any, index: number) => (
              <ItemCard key={acc.id || index}>
                <div className="item-top">
                  <div className="item-title-box">
                    <span>Section #{index + 1}</span>
                    <input
                      type="text"
                      value={acc.title}
                      onChange={(e) => updateAccordionItem(index, 'title', e.target.value)}
                      style={{ fontWeight: 600, border: '1px solid #d9d3c7', padding: '4px 8px', borderRadius: 4, width: '320px'  }}
                    />
                  </div>
                  <div className="item-actions">
                    <ToggleSwitch title="Active / Inactive">
                      <input
                        type="checkbox"
                        checked={acc.isActive !== false}
                        onChange={(e) => updateAccordionItem(index, 'isActive', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </ToggleSwitch>

                    <button type="button" onClick={() => moveAccordionItem(index, 'up')} disabled={index === 0} style={{ background: 'none', border: 'none', cursor: 'pointer'  }}>
                      <ChevronUp size={16} />
                    </button>
                    <button type="button" onClick={() => moveAccordionItem(index, 'down')} disabled={index === content.accordions.length - 1} style={{ background: 'none', border: 'none', cursor: 'pointer'  }}>
                      <ChevronDown size={16} />
                    </button>
                    <button type="button" onClick={() => removeAccordionItem(index)} style={{ background: 'none', border: 'none', color: '#c5221f', cursor: 'pointer'  }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <FormRow>
                  <FormGroup>
                    <label>Content / Body Text</label>
                    <textarea
                      value={acc.content || ''}
                      onChange={(e) => updateAccordionItem(index, 'content', e.target.value)}
                      placeholder="Accordion tab detail text..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Icon</label>
                    <select value={acc.icon || 'Sparkles'} onChange={(e) => updateAccordionItem(index, 'icon', e.target.value)}>
                      {ICON_OPTIONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </FormGroup>
                </FormRow>
              </ItemCard>
            ))}

            <AdminButton type="button" $size="sm" $variant="outline" onClick={addAccordionItem}>
              <Plus size={14} /> Add Custom Accordion Section
            </AdminButton>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 4: SHIPPING & DELIVERY CONTENT */}
      <SectionAccordionCard $isOpen={openSections.shipping}>
        <AccordionHeader $isOpen={openSections.shipping} onClick={() => toggleSection('shipping')}>
          <div className="header-left">
            <div className="icon-box"><Truck size={18} /></div>
            <div>
              <h3>4. SHIPPING & DELIVERY CONTENT</h3>
              <span className="desc-sub">Manufacturing, shipping estimates, insurance, and returns info</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.shipping ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.shipping && (
          <AccordionBody>
            <FormRow>
              <FormGroup>
                <label>Production / Manufacturing Time</label>
                <input
                  type="text"
                  value={content.shippingInfo.manufacturingTime}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, manufacturingTime: e.target.value },
                    })
                  }
                  placeholder="e.g. 7–10 working days"
                />
              </FormGroup>
              <FormGroup>
                <label>Order Processing Time</label>
                <input
                  type="text"
                  value={content.shippingInfo.processingTime}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, processingTime: e.target.value },
                    })
                  }
                  placeholder="e.g. 1–2 working days"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label>Transit / Shipping Time</label>
                <input
                  type="text"
                  value={content.shippingInfo.shippingTime}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, shippingTime: e.target.value },
                    })
                  }
                  placeholder="e.g. 2–4 working days"
                />
              </FormGroup>
              <FormGroup>
                <label>Total Estimated Delivery Time</label>
                <input
                  type="text"
                  value={content.shippingInfo.deliveryTime}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, deliveryTime: e.target.value },
                    })
                  }
                  placeholder="e.g. 7–10 working days after production"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label>Carrier & Shipping Method</label>
                <input
                  type="text"
                  value={content.shippingInfo.shippingMethod}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, shippingMethod: e.target.value },
                    })
                  }
                  placeholder="e.g. FedEx Priority Express (Fully Insured)"
                />
              </FormGroup>
              <FormGroup>
                <label>Transit Insurance Information</label>
                <input
                  type="text"
                  value={content.shippingInfo.insuranceInfo}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, insuranceInfo: e.target.value },
                    })
                  }
                  placeholder="e.g. 100% covered from our Surat atelier until hand-delivered."
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label>Returns & Exchange Policy</label>
                <input
                  type="text"
                  value={content.shippingInfo.returnInfo}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, returnInfo: e.target.value },
                    })
                  }
                  placeholder="e.g. 30-Day Money Back Guarantee with complimentary return shipping."
                />
              </FormGroup>
              <FormGroup>
                <label>International Shipping Details</label>
                <input
                  type="text"
                  value={content.shippingInfo.internationalShippingInfo}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      shippingInfo: { ...content.shippingInfo, internationalShippingInfo: e.target.value },
                    })
                  }
                  placeholder="e.g. Available worldwide with customs duties handled."
                />
              </FormGroup>
            </FormRow>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 5: CRAFTSMANSHIP & SUSTAINABILITY */}
      <SectionAccordionCard $isOpen={openSections.craftsmanship}>
        <AccordionHeader $isOpen={openSections.craftsmanship} onClick={() => toggleSection('craftsmanship')}>
          <div className="header-left">
            <div className="icon-box"><Award size={18} /></div>
            <div>
              <h3>5. CRAFTSMANSHIP & SUSTAINABILITY</h3>
              <span className="desc-sub">Craftsmanship narrative, recycled materials, and certification details</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.craftsmanship ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.craftsmanship && (
          <AccordionBody>
            <FormRow>
              <FormGroup>
                <label>Section Title</label>
                <input
                  type="text"
                  value={content.craftsmanshipTitle}
                  onChange={(e) => setContent({ ...content, craftsmanshipTitle: e.target.value })}
                  placeholder="e.g. Craftsmanship & Sustainability"
                />
              </FormGroup>
              <FormGroup>
                <label>Materials Information</label>
                <input
                  type="text"
                  value={content.materialsInfo}
                  onChange={(e) => setContent({ ...content, materialsInfo: e.target.value })}
                  placeholder="e.g. Solid 18K Gold or 950 Platinum, hypoallergenic"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label>Main Craftsmanship Description</label>
              <textarea
                value={content.craftsmanshipDescription}
                onChange={(e) => setContent({ ...content, craftsmanshipDescription: e.target.value })}
                placeholder="Detailed story of goldsmithing heritage..."
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <label>Sustainability Details</label>
                <input
                  type="text"
                  value={content.sustainabilityInfo}
                  onChange={(e) => setContent({ ...content, sustainabilityInfo: e.target.value })}
                  placeholder="e.g. 100% Recycled Precious Metals certified by RJC"
                />
              </FormGroup>
              <FormGroup>
                <label>Manufacturing / Hand-Setting Details</label>
                <input
                  type="text"
                  value={content.manufacturingInfo}
                  onChange={(e) => setContent({ ...content, manufacturingInfo: e.target.value })}
                  placeholder="e.g. Hand-set under 40x microscopic precision"
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label>Certification & Grading Standards</label>
              <input
                type="text"
                value={content.certificationInfo}
                onChange={(e) => setContent({ ...content, certificationInfo: e.target.value })}
                placeholder="e.g. Independently certified by GIA / IGI"
              />
            </FormGroup>

            <FormGroup>
              <label>Craftsmanship Editorial Image</label>
              <ImageUploadArea>
                <div className="preview-box">
                  {content.craftsmanshipImage ? (
                    <img src={content.craftsmanshipImage} alt="Craftsmanship preview" />
                  ) : (
                    <ImageIcon size={32} color="#ccc" />
                  )}
                </div>

                <div className="upload-controls">
                  
                  <div style={{ display: 'flex', gap: 10  }}>
                    <label style={{ cursor: 'pointer'  }}>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none'  }}
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'craftsmanshipImage')}
                      />
                      <AdminButton type="button" $size="sm" $variant="outline" as="span">
                        <Upload size={14} /> Upload / Replace Image
                      </AdminButton>
                    </label>
                    {content.craftsmanshipImage && (
                      <AdminButton
                        type="button"
                        $size="sm"
                        $variant="danger"
                        onClick={() => setContent({ ...content, craftsmanshipImage: '' })}
                      >
                        <Trash2 size={14} /> Remove Image
                      </AdminButton>
                    )}
                  </div>
                </div>
              </ImageUploadArea>
            </FormGroup>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 6: PACKAGING / CUSTOMER EXPERIENCE SECTION */}
      <SectionAccordionCard $isOpen={openSections.packaging}>
        <AccordionHeader $isOpen={openSections.packaging} onClick={() => toggleSection('packaging')}>
          <div className="header-left">
            <div className="icon-box"><Package size={18} /></div>
            <div>
              <h3>6. PACKAGING / CUSTOMER EXPERIENCE SECTION</h3>
              <span className="desc-sub">Main heading, description, and expandable packaging items {`(${content.packagingItems.length} items)`}</span>
            </div>
          </div>
          <div className="header-right">
            <AdminButton type="button" $size="sm" $variant="outline" onClick={(e) => { e.stopPropagation(); addPkgItem(); }}>
              <Plus size={14} /> Add Item
            </AdminButton>
            {openSections.packaging ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.packaging && (
          <AccordionBody>
            <FormGroup>
              <label>Section Main Heading</label>
              <input
                type="text"
                value={content.packagingHeading}
                onChange={(e) => setContent({ ...content, packagingHeading: e.target.value })}
                placeholder="e.g. We're committed to making your entire experience a pleasant one..."
              />
            </FormGroup>

            <FormGroup>
              <label>Main Experience Description</label>
              <textarea
                value={content.packagingDescription}
                onChange={(e) => setContent({ ...content, packagingDescription: e.target.value })}
                placeholder="Packaging box and presentation narrative..."
              />
            </FormGroup>

            <h4 style={{ fontSize: '0.9rem', color: '#12161a', marginTop: 12  }}>Expandable Packaging Features:</h4>

            {content.packagingItems.map((pkg: any, index: number) => (
              <ItemCard key={pkg.id || index}>
                <div className="item-top">
                  <div className="item-title-box">
                    <span>Feature #{index + 1}</span>
                    <input
                      type="text"
                      value={pkg.title}
                      onChange={(e) => updatePkgItem(index, 'title', e.target.value)}
                      style={{ fontWeight: 600, border: '1px solid #d9d3c7', padding: '4px 8px', borderRadius: 4, width: '320px'  }}
                    />
                  </div>
                  <div className="item-actions">
                    <ToggleSwitch title="Active / Inactive">
                      <input
                        type="checkbox"
                        checked={pkg.isActive !== false}
                        onChange={(e) => updatePkgItem(index, 'isActive', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </ToggleSwitch>

                    <button type="button" onClick={() => movePkgItem(index, 'up')} disabled={index === 0} style={{ background: 'none', border: 'none', cursor: 'pointer'  }}>
                      <ChevronUp size={16} />
                    </button>
                    <button type="button" onClick={() => movePkgItem(index, 'down')} disabled={index === content.packagingItems.length - 1} style={{ background: 'none', border: 'none', cursor: 'pointer'  }}>
                      <ChevronDown size={16} />
                    </button>
                    <button type="button" onClick={() => removePkgItem(index)} style={{ background: 'none', border: 'none', color: '#c5221f', cursor: 'pointer'  }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <FormRow>
                  <FormGroup>
                    <label>Description</label>
                    <textarea
                      value={pkg.description || ''}
                      onChange={(e) => updatePkgItem(index, 'description', e.target.value)}
                      placeholder="Feature detail text..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Icon</label>
                    <select value={pkg.icon || 'Package'} onChange={(e) => updatePkgItem(index, 'icon', e.target.value)}>
                      {ICON_OPTIONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </FormGroup>
                </FormRow>
              </ItemCard>
            ))}

            <AdminButton type="button" $size="sm" $variant="outline" onClick={addPkgItem}>
              <Plus size={14} /> Add Packaging Feature Item
            </AdminButton>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 7: PACKAGING IMAGE */}
      <SectionAccordionCard $isOpen={openSections.packagingImage}>
        <AccordionHeader $isOpen={openSections.packagingImage} onClick={() => toggleSection('packagingImage')}>
          <div className="header-left">
            <div className="icon-box"><ImageIcon size={18} /></div>
            <div>
              <h3>7. PACKAGING IMAGE</h3>
              <span className="desc-sub">Upload large presentation box image for customer experience section</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.packagingImage ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.packagingImage && (
          <AccordionBody>
            <FormGroup>
              <label>Large Signature Packaging Box Image</label>
              <ImageUploadArea>
                <div className="preview-box" style={{ width: '160px', height: '160px'  }}>
                  {content.packagingImageUrl ? (
                    <img src={content.packagingImageUrl} alt="Packaging image preview" />
                  ) : (
                    <ImageIcon size={40} color="#ccc" />
                  )}
                </div>

                <div className="upload-controls">
                  
                  <div style={{ display: 'flex', gap: 10  }}>
                    <label style={{ cursor: 'pointer'  }}>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none'  }}
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'packagingImageUrl')}
                      />
                      <AdminButton type="button" $size="sm" $variant="outline" as="span">
                        <Upload size={14} /> Upload / Replace Image
                      </AdminButton>
                    </label>
                    {content.packagingImageUrl && (
                      <AdminButton
                        type="button"
                        $size="sm"
                        $variant="danger"
                        onClick={() => setContent({ ...content, packagingImageUrl: '' })}
                      >
                        <Trash2 size={14} /> Remove Image
                      </AdminButton>
                    )}
                  </div>
                </div>
              </ImageUploadArea>
            </FormGroup>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 8: REVIEWS SECTION SETTINGS */}
      <SectionAccordionCard $isOpen={openSections.reviews}>
        <AccordionHeader $isOpen={openSections.reviews} onClick={() => toggleSection('reviews')}>
          <div className="header-left">
            <div className="icon-box"><Star size={18} /></div>
            <div>
              <h3>8. REVIEWS SECTION SETTINGS</h3>
              <span className="desc-sub">Section title, enable/disable reviews, verified badge, and sorting</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.reviews ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.reviews && (
          <AccordionBody>
            <FormRow>
              <FormGroup>
                <label>Reviews Section Title</label>
                <input
                  type="text"
                  value={content.reviewsTitle}
                  onChange={(e) => setContent({ ...content, reviewsTitle: e.target.value })}
                  placeholder="e.g. Customer Reviews & Feedback"
                />
              </FormGroup>

              <FormGroup>
                <label>Default Sorting Option</label>
                <select
                  value={content.reviewsDefaultSort}
                  onChange={(e) => setContent({ ...content, reviewsDefaultSort: e.target.value })}
                >
                  <option value="newest">Newest First</option>
                  <option value="highest_rating">Highest Rating First</option>
                  <option value="lowest_rating">Lowest Rating First</option>
                  <option value="with_photos">With Photos First</option>
                </select>
              </FormGroup>
            </FormRow>

            <FormRow>
              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Enable Product Reviews Section</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.reviewsEnabled}
                      onChange={(e) => setContent({ ...content, reviewsEnabled: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Enable "Verified Buyer" Badge</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.reviewsVerifiedBadge}
                      onChange={(e) => setContent({ ...content, reviewsVerifiedBadge: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Allow Review Submission</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.reviewsSubmissionEnabled}
                      onChange={(e) => setContent({ ...content, reviewsSubmissionEnabled: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>
            </FormRow>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 9: SIMILAR ITEMS */}
      <SectionAccordionCard $isOpen={openSections.similar}>
        <AccordionHeader $isOpen={openSections.similar} onClick={() => toggleSection('similar')}>
          <div className="header-left">
            <div className="icon-box"><Sparkles size={18} /></div>
            <div>
              <h3>9. SIMILAR ITEMS</h3>
              <span className="desc-sub">Select products from existing catalog to show as similar items</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.similar ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.similar && (
          <AccordionBody>
            <FormRow>
              <FormGroup>
                <label>Section Title</label>
                <input
                  type="text"
                  value={content.similarItemsTitle}
                  onChange={(e) => setContent({ ...content, similarItemsTitle: e.target.value })}
                  placeholder="e.g. You May Also Like"
                />
              </FormGroup>

              <ItemCard style={{ alignSelf: 'center'  }}>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Enable Similar Items Section</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.similarItemsEnabled}
                      onChange={(e) => setContent({ ...content, similarItemsEnabled: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>
            </FormRow>

            <FormGroup>
              <label>Select Similar Products from Existing Catalog {`(${content.similarProducts.length} selected)`}</label>
              <div style={{ maxHeight: '240px', overflowY: 'auto', border: '1px solid #d9d3c7', borderRadius: 4, padding: 12, background: '#faf8f5', display: 'flex', flexDirection: 'column', gap: 8  }}>
                {products.map((p) => {
                  const isSel = content.similarProducts.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleSimilarProduct(p.id)}
                      style={{ display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: isSel ? '#ffffff' : 'transparent',
                        border: isSel ? '1px solid #c9a45c' : '1px solid #e8e3d9',
                        borderRadius: 4,
                        cursor: 'pointer',
                       }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10  }}>
                        {p.mainImage && (
                          <img src={p.mainImage} alt={p.name} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4  }} />
                        )}
                        <span style={{ fontSize: '0.88rem', fontWeight: isSel ? 600 : 400, color: '#12161a'  }}>
                          {`${p.name} (${p.sku || p.id.slice(0, 8)})`}
                        </span>
                      </div>
                      {isSel && <Check size={16} color="#c9a45c" />}
                    </div>
                  );
                })}
              </div>
            </FormGroup>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 10: RECENTLY VIEWED */}
      <SectionAccordionCard $isOpen={openSections.recentlyViewed}>
        <AccordionHeader $isOpen={openSections.recentlyViewed} onClick={() => toggleSection('recentlyViewed')}>
          <div className="header-left">
            <div className="icon-box"><Clock size={18} /></div>
            <div>
              <h3>10. RECENTLY VIEWED</h3>
              <span className="desc-sub">Section title and enable/disable toggle</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.recentlyViewed ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.recentlyViewed && (
          <AccordionBody>
            <FormRow>
              <FormGroup>
                <label>Section Title</label>
                <input
                  type="text"
                  value={content.recentlyViewedTitle}
                  onChange={(e) => setContent({ ...content, recentlyViewedTitle: e.target.value })}
                  placeholder="e.g. Recently Viewed"
                />
              </FormGroup>

              <ItemCard style={{ alignSelf: 'center'  }}>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Enable Recently Viewed Section</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.recentlyViewedEnabled}
                      onChange={(e) => setContent({ ...content, recentlyViewedEnabled: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>
            </FormRow>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* SECTION 11: PRODUCT PAGE VISIBILITY */}
      <SectionAccordionCard $isOpen={openSections.visibility}>
        <AccordionHeader $isOpen={openSections.visibility} onClick={() => toggleSection('visibility')}>
          <div className="header-left">
            <div className="icon-box"><Sliders size={18} /></div>
            <div>
              <h3>11. PRODUCT PAGE VISIBILITY TOGGLES</h3>
              <span className="desc-sub">Show or hide specific sections on the product detail page</span>
            </div>
          </div>
          <div className="header-right">
            {openSections.visibility ? <ChevronUp className="toggle-arrow" /> : <ChevronDown className="toggle-arrow" />}
          </div>
        </AccordionHeader>

        {openSections.visibility && (
          <AccordionBody>
            <FormRow>
              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Product Benefits</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showBenefits}
                      onChange={(e) => setContent({ ...content, showBenefits: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Experience Accordion</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showExperienceAccordion}
                      onChange={(e) => setContent({ ...content, showExperienceAccordion: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Specifications Section</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showSpecifications}
                      onChange={(e) => setContent({ ...content, showSpecifications: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Craftsmanship Section</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showCraftsmanshipSection}
                      onChange={(e) => setContent({ ...content, showCraftsmanshipSection: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Packaging Section</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showPackagingSection}
                      onChange={(e) => setContent({ ...content, showPackagingSection: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Reviews Section</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showReviews}
                      onChange={(e) => setContent({ ...content, showReviews: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Similar Items</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showSimilarItems}
                      onChange={(e) => setContent({ ...content, showSimilarItems: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Recently Viewed</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showRecentlyViewed}
                      onChange={(e) => setContent({ ...content, showRecentlyViewed: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show "Buy It Now" Direct Checkout Button</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showBuyNowButton !== false}
                      onChange={(e) => setContent({ ...content, showBuyNowButton: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Sticky Action Bar on Scroll</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showStickyBar !== false}
                      onChange={(e) => setContent({ ...content, showStickyBar: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>

              <ItemCard>
                <div className="item-top" style={{ borderBottom: 'none', paddingBottom: 0  }}>
                  <span>Show Quantity Selector (- 1 +)</span>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      checked={content.showQuantitySelector !== false}
                      onChange={(e) => setContent({ ...content, showQuantitySelector: e.target.checked })}
                    />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </div>
              </ItemCard>
            </FormRow>
          </AccordionBody>
        )}
      </SectionAccordionCard>

      {/* Bottom Sticky Save Bar */}
      <div
        style={{ position: 'sticky',
          bottom: 24,
          background: '#12161a',
          color: '#fff',
          padding: '16px 28px',
          borderRadius: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
          zIndex: 80,
         }}
      >
        <div>
          <strong style={{ color: '#c9a45c'  }}>
            {selectedProductId === 'global' ? 'Global Default Content' : 'Product Content: ' + (selectedProduct?.name || selectedProductId)}
          </strong>
          <span style={{ fontSize: '0.82rem', color: '#b0ab9e', marginLeft: 12  }}>
            Changes will be saved persistently to cloud database.
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12  }}>
          <AdminButton type="button" $variant="outline" style={{ borderColor: '#343f4c', color: '#fff'  }} onClick={handlePreview}>
            <Eye size={16} /> Preview
          </AdminButton>

          <AdminButton type="button" $variant="secondary" onClick={() => handleSave(true)} disabled={saving}>
            <Save size={16} /> Save & Preview
          </AdminButton>

          <AdminButton type="button" $variant="primary" onClick={() => handleSave(false)} disabled={saving}>
            {saving ? <RefreshCw size={16} className="spin" /> : <Save size={16} />} SAVE CHANGES
          </AdminButton>
        </div>
      </div>
    </PageContainer>
  );
};
