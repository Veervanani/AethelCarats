import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Upload,
  RefreshCw,
  Sliders,
  Eye,
  MoveUp,
  MoveDown,
  Tag,
  Share2,
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
  AdminTableContainer,
  AdminTable,
  AdminFormGrid,
  AdminFormGroup,
} from '../../components/admin/AdminUI';

const StickyTopHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 80;
  background: #ffffff;
  border-bottom: 1px solid #e8e3d9;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

  .title-area {
    display: flex;
    align-items: center;
    gap: 16px;

    a.back-btn {
      color: #666;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 600;

      &:hover {
        color: #19202a;
      }
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.8rem;
      color: #1f1f1f;
      margin: 0;
    }
  }

  .action-area {
    display: flex;
    gap: 12px;
  }
`;

const EditorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 28px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainEditorCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StickySidebarCol = styled.div`
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;

  span.label {
    font-weight: 600;
    font-size: 0.88rem;
    color: #1f1f1f;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #c9a45c;
  }
`;

const CustomOptItemCard = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
`;

const AccordionCardItem = styled.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TagPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #19202a;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;

  button {
    background: none;
    border: none;
    color: #c9a45c;
    cursor: pointer;
    padding: 0;
    display: flex;
  }
`;

const TagsSelectBox = styled.div`
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;
  color: #19202a;
`;

const TagsDropdownPanel = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 6px;
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
  max-height: 360px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TagsFilterGroupHeader = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #c9a45c;
  margin-bottom: 6px;
  padding-bottom: 2px;
  border-bottom: 1px solid #f2ede4;
`;

const TagsOptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const APPROVED_METALS = [
  { label: '14K Yellow Gold', code: '14k', circleColor: '#E8C872', priceAdjustment: 0 },
  { label: '14K White Gold', code: '14k', circleColor: '#CBD5E1', priceAdjustment: 0 },
  { label: '14K Rose Gold', code: '14k', circleColor: '#E4A8A5', priceAdjustment: 0 },
  { label: '18K Yellow Gold', code: '18k', circleColor: '#E8C872', priceAdjustment: 250 },
  { label: '18K White Gold', code: '18k', circleColor: '#CBD5E1', priceAdjustment: 350 },
  { label: '18K Rose Gold', code: '18k', circleColor: '#E4A8A5', priceAdjustment: 350 },
  { label: 'Silver', code: 'Ag', circleColor: '#E2E8F0', priceAdjustment: 0 },
];

const ALL_RING_SIZES = [
  'US 4', 'US 4.5', 'US 5', 'US 5.5', 'US 6', 'US 6.5',
  'US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5',
  'US 10', 'US 10.5', 'US 11', 'US 11.5', 'US 12',
];

const DEFAULT_ACCORDIONS = [
  {
    id: 'exp',
    title: 'YOUR FLOKSY JEWEL EXPERIENCE',
    content: 'Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals.',
    enabled: true,
    defaultOpen: true,
  },
  {
    id: 'specs',
    title: 'PRODUCT & DIAMOND SPECIFICATIONS',
    content: 'Hand-set by master artisans under 40x microscopic precision.',
    enabled: true,
    defaultOpen: false,
  },
  {
    id: 'craftsmanship',
    title: 'CRAFTSMANSHIP & SUSTAINABILITY',
    content: 'Sustainably crafted with 100% recycled 18K gold and fine silver.',
    enabled: true,
    defaultOpen: false,
  },
  {
    id: 'shipping',
    title: 'SHIPPING & DELIVERY',
    content: 'Dispatched via fully insured Priority Air in discreet unbranded security packaging.',
    enabled: true,
    defaultOpen: false,
  },
];

export const AdminFullProductEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id && id !== 'new');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [focusCbId, setFocusCbId] = useState<string | null>(null);

  // Canonical Shared Product Model State
  const [productData, setProductData] = useState<any>({
    title: '',
    name: '',
    sku: '',
    slug: '',
    categoryId: '',
    jewelleryType: 'Rings',
    collectionId: '',
    status: 'ACTIVE',
    isFeatured: false,
    isNewArrival: true,
    isBestseller: false,
    price: 2500,
    comparePrice: 3000,
    shortDescription: '',
    fullDescription: '',
    mainImage: '/assets/floksy_rings_cat.png',
    secondaryImage: '',
    images: [],
    enableMetalSelection: true,
    enableCustomOptions: false,
    diamondDetails: {
      shape: 'Round',
      caratWeight: 1.0,
      color: 'D',
      clarity: 'VS1',
      cut: 'Excellent',
      polish: 'Excellent',
      symmetry: 'Excellent',
      fluorescence: 'None',
      certification: 'IGI',
      certificateNumber: '',
      origin: 'Lab-Grown',
      measurements: '',
    },
    customOptions: [],
    masterPrice14k: 2500,
    masterPrice18k: 2750,
    masterPriceSilver: 2000,
    metalsConfig: [...APPROVED_METALS],
    availableRingSizes: [...ALL_RING_SIZES],
    variations: [],
    accordionsConfig: [...DEFAULT_ACCORDIONS],
    internalTags: [],
    seoSocial: {
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      socialImage: '',
      twitterTitle: '',
      twitterDescription: '',
      canonicalUrl: '',
    },
  });

  const mediaFileInputRef = useRef<HTMLInputElement>(null);
  const socialImageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  // Filter Management Integration State
  const [filterConfigs, setFilterConfigs] = useState<any[]>([]);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [tagsSearchQuery, setTagsSearchQuery] = useState('');
  const tagsDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch Category-Aware Filters from Central Filter Management
  const currentCategory = productData.jewelleryType || productData.category?.name || 'Rings';

  useEffect(() => {
    const fetchCategoryFilters = async () => {
      try {
        const data = await api.getPublicFilters({ jewelleryType: currentCategory });
        setFilterConfigs(data.filters || []);
      } catch (err) {
        console.error('Error loading filter configs for internal tags:', err);
      }
    };
    fetchCategoryFilters();
  }, [currentCategory]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(e.target as Node)) {
        setIsTagsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleInternalFilterOption = (filterKey: string, optVal: string, optLabel: string) => {
    const currentTags = productData.internalTags || [];
    const isSelected = currentTags.includes(optLabel) || currentTags.includes(optVal);

    let updatedTags: string[];
    if (isSelected) {
      updatedTags = currentTags.filter((t: string) => t !== optLabel && t !== optVal);
    } else {
      updatedTags = [...currentTags, optLabel];
    }

    setProductData((prev: any) => {
      const updated = { ...prev, internalTags: updatedTags };

      // Synchronize product attributes with selected filter values for storefront filter matching
      const keyLower = filterKey.toLowerCase();
      if (keyLower === 'style') {
        updated.ringStyle = isSelected ? '' : optLabel;
      } else if (keyLower === 'metal') {
        updated.metal = isSelected ? '' : optLabel;
      } else if (keyLower.includes('shape')) {
        updated.shape = isSelected ? '' : optLabel;
      } else if (keyLower.includes('diamond')) {
        updated.diamondType = isSelected ? '' : optLabel;
      } else if (keyLower === 'color') {
        updated.color = isSelected ? '' : optLabel;
      } else if (keyLower === 'clarity') {
        updated.clarity = isSelected ? '' : optLabel;
      } else if (keyLower === 'cut') {
        updated.cut = isSelected ? '' : optLabel;
      } else if (keyLower === 'certification') {
        updated.certification = isSelected ? '' : optLabel;
      }

      return updated;
    });
  };

  // Strict IsRingProduct Logic: Rings Only!
  const isRingProduct = Boolean(
    ((productData.jewelleryType || '').toLowerCase() === 'rings' ||
      (productData.jewelleryType || '').toLowerCase() === 'engagement rings' ||
      (productData.jewelleryType || '').toLowerCase() === 'wedding bands' ||
      (productData.title || productData.name || '').toLowerCase().includes('ring') ||
      (productData.title || productData.name || '').toLowerCase().includes('band')) &&
      !(productData.jewelleryType || '').toLowerCase().includes('earring') &&
      !(productData.jewelleryType || '').toLowerCase().includes('necklace') &&
      !(productData.jewelleryType || '').toLowerCase().includes('bracelet') &&
      !(productData.jewelleryType || '').toLowerCase().includes('pendant')
  );

  useEffect(() => {
    loadCategories();
    if (isEditMode && id) {
      loadProduct(id);
    } else {
      generateVariationsFromMasterPrices(
        2500,
        2750,
        2000,
        [...APPROVED_METALS],
        [...ALL_RING_SIZES],
        productData.sku || 'FJ-RNG-001',
        true
      );
    }
  }, [id, isEditMode]);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      const catList = Array.isArray(data) ? data : (data as any)?.categories || [];
      setCategories(catList.length > 0 ? catList : [
        { id: 'cat_rings', name: 'Rings', slug: 'rings' },
        { id: 'cat_earrings', name: 'Earrings', slug: 'earrings' },
        { id: 'cat_necklaces', name: 'Necklaces', slug: 'necklaces' },
        { id: 'cat_bracelets', name: 'Bracelets', slug: 'bracelets' },
        { id: 'cat_pendants', name: 'Pendants', slug: 'pendants' },
      ]);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true);
      setNotFound(false);
      let fetched: any = null;
      try {
        const token = localStorage.getItem('floksy_token') || localStorage.getItem('fj_admin_token');
        const res = await fetch(`/api/v1/products?id=${productId}&includeDrafts=true&status=ALL`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        fetched = data.products?.[0] || data.product || data;
      } catch {
        const data = await api.getProducts({ id: productId, includeDrafts: 'true', status: 'ALL' });
        fetched = data.products?.[0] || (data as any).product;
      }

      if (fetched && (fetched.id || fetched.title || fetched.name || fetched.sku)) {
        let loadedCustomOpts = prevCustomOpts(fetched);
        let loadedAccordions = prevAccordions(fetched);
        let vars = (fetched.variations && fetched.variations.length > 0 ? fetched.variations : []).filter((v: any) => {
          const metalStr = String(v.metal || '').toLowerCase();
          return !metalStr.includes('platinum') && !metalStr.includes('9k') && !metalStr.includes('10k');
        });

        let p14k = fetched.masterPrice14k || vars.find((v: any) => v.metal?.startsWith('14K'))?.price || fetched.price || 2500;
        let p18k = fetched.masterPrice18k || vars.find((v: any) => v.metal?.startsWith('18K'))?.price || (p14k + 250);
        let pSilver = fetched.masterPriceSilver || vars.find((v: any) => v.metal === 'Silver')?.price || 2000;

        let dDetails = fetched.diamondDetails || {
          shape: fetched.shape || 'Round',
          caratWeight: fetched.carat || 1.0,
          color: fetched.color || 'D',
          clarity: fetched.clarity || 'VS1',
          cut: fetched.cut || 'Excellent',
          polish: 'Excellent',
          symmetry: 'Excellent',
          fluorescence: 'None',
          certification: fetched.certification || 'IGI',
          certificateNumber: fetched.certificateNo || '',
          origin: fetched.diamondType === 'LAB_GROWN' ? 'Lab-Grown' : 'Natural',
          measurements: '',
        };

        let iTags = fetched.internalTags || [];
        let sSocial = fetched.seoSocial || {
          keywords: fetched.metaKeywords || '',
          ogTitle: fetched.metaTitle || fetched.title || fetched.name || '',
          ogDescription: fetched.metaDescription || fetched.shortDescription || '',
          socialImage: fetched.ogImage || fetched.mainImage || '',
          twitterTitle: fetched.metaTitle || fetched.title || fetched.name || '',
          twitterDescription: fetched.metaDescription || fetched.shortDescription || '',
          canonicalUrl: fetched.slug ? `https://floksyjewel.com/product/${fetched.slug}` : '',
        };

        const canonicalTitle = fetched.title || fetched.name || '';

        setProductData((prev: any) => ({
          ...prev,
          ...fetched,
          id: fetched.id || productId,
          title: canonicalTitle,
          name: canonicalTitle,
          sku: fetched.sku || '',
          slug: fetched.slug || '',
          price: fetched.price !== undefined ? fetched.price : prev.price,
          comparePrice: fetched.comparePrice !== undefined ? fetched.comparePrice : prev.comparePrice,
          masterPrice14k: p14k,
          masterPrice18k: p18k,
          masterPriceSilver: pSilver,
          categoryId: fetched.categoryId || fetched.category?.id || '',
          jewelleryType: fetched.jewelleryType || fetched.category?.name || 'Rings',
          status: fetched.status || 'DRAFT',
          enableMetalSelection: fetched.enableMetalSelection ?? true,
          enableCustomOptions: fetched.enableCustomOptions ?? false,
          diamondDetails: dDetails,
          customOptions: (fetched.customOptionsJson !== undefined || fetched.customOptions !== undefined) ? loadedCustomOpts : prev.customOptions,
          accordionsConfig: loadedAccordions.length > 0 ? loadedAccordions : prev.accordionsConfig,
          internalTags: iTags,
          seoSocial: sSocial,
          metalsConfig: (fetched.metalsConfig && fetched.metalsConfig.length > 0 ? fetched.metalsConfig : prev.metalsConfig).filter((m: any) => {
            const lbl = String(m.label || '').toLowerCase();
            return !lbl.includes('platinum') && !lbl.includes('9k') && !lbl.includes('10k');
          }),
          variations: vars,
        }));
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error('Failed to load product:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const prevCustomOpts = (fetched: any) => {
    try {
      let raw: any[] = [];
      if (fetched.customOptionsJson) {
        raw = typeof fetched.customOptionsJson === 'string' ? JSON.parse(fetched.customOptionsJson) : fetched.customOptionsJson;
      } else if (fetched.customOptions) {
        raw = typeof fetched.customOptions === 'string' ? JSON.parse(fetched.customOptions) : fetched.customOptions;
      }
      if (Array.isArray(raw)) {
        return raw.map((opt: any) => {
          if (opt.inputType === 'Checkbox' || opt.inputType === 'checkbox') {
            const cleanOpt = { ...opt, inputType: 'Checkbox' };
            if (!cleanOpt.checkboxOptions || !Array.isArray(cleanOpt.checkboxOptions)) {
              if (cleanOpt.choices && Array.isArray(cleanOpt.choices) && cleanOpt.choices.length > 0) {
                cleanOpt.checkboxOptions = cleanOpt.choices;
              } else if (cleanOpt.checkboxLabel !== undefined && cleanOpt.checkboxLabel !== '') {
                cleanOpt.checkboxOptions = [
                  { id: `cb_${Date.now()}_1`, label: cleanOpt.checkboxLabel, priceAdjustment: cleanOpt.priceAdjustment || 0 }
                ];
              } else {
                cleanOpt.checkboxOptions = [];
              }
            }
            delete cleanOpt.checkboxLabel;
            delete cleanOpt.choices;
            return cleanOpt;
          }
          return opt;
        });
      }
    } catch (e) {}
    return [];
  };

  const prevAccordions = (fetched: any) => {
    try {
      if (fetched.accordionsConfig) {
        return typeof fetched.accordionsConfig === 'string' ? JSON.parse(fetched.accordionsConfig) : fetched.accordionsConfig;
      }
    } catch (e) {}
    return [];
  };

  const handleFieldChange = (field: string, val: any) => {
    setProductData((prev: any) => {
      const updated = { ...prev, [field]: val };
      if (field === 'title') {
        updated.name = val; // Synchronize title <-> name
        if (!isEditMode) {
          updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          updated.sku = `FJ-${val.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
          if (updated.seoSocial) {
            updated.seoSocial.canonicalUrl = `https://floksyjewel.com/product/${updated.slug}`;
          }
        }
      }

      if (field === 'jewelleryType') {
        const isNowRing = Boolean(
          (val || '').toLowerCase().includes('ring') || (val || '').toLowerCase().includes('band')
        ) && !val.toLowerCase().includes('earring');

        if (!isNowRing) {
          updated.availableRingSizes = [];
          updated.variations = (prev.variations || []).map((v: any) => ({ ...v, ringSize: null }));
        } else {
          updated.availableRingSizes = [...ALL_RING_SIZES];
        }
      }

      return updated;
    });
  };

  const handleNestedFieldChange = (parentField: string, childKey: string, val: any) => {
    setProductData((prev: any) => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] || {}),
        [childKey]: val,
      },
    }));
  };

  const compressImageFile = (file: File, maxWidth = 1600, quality = 0.82): Promise<File> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/') || file.size < 300 * 1024) {
        return resolve(file);
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } else {
                  resolve(file);
                }
              },
              'image/jpeg',
              quality
            );
          } else {
            resolve(file);
          }
        };
        img.onerror = () => resolve(file);
        img.src = event.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const handleDirectMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'gallery' | 'socialImage' = 'gallery') => {
    const inputEl = e.target;
    if (!inputEl.files || inputEl.files.length === 0) return;
    const selectedFiles = Array.from(inputEl.files);

    try {
      setUploadingMedia(true);
      const token = localStorage.getItem('fj_admin_token') || localStorage.getItem('floksy_token');
      const BATCH_SIZE = 10;
      const totalFiles = selectedFiles.length;
      let uploadedCount = 0;
      const allNewUrls: string[] = [];

      for (let i = 0; i < totalFiles; i += BATCH_SIZE) {
        const chunk = selectedFiles.slice(i, i + BATCH_SIZE);
        const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(totalFiles / BATCH_SIZE);

        setUploadProgress(`Uploading ${uploadedCount}/${totalFiles} images (Batch ${batchNumber} of ${totalBatches})...`);

        const formData = new FormData();
        for (const file of chunk) {
          const compressed = await compressImageFile(file);
          formData.append('files', compressed);
        }

        const res = await fetch('/api/v1/admin/media/upload', {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        });

        const text = await res.text();
        let data: any = {};
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = { message: text || 'Server returned invalid response' };
        }
        if (!res.ok) throw new Error(data.message || `Media upload failed on batch ${batchNumber}.`);

        const batchUrls = (data.media || [{ url: data.url }])
          .map((m: any) => (typeof m === 'string' ? m : (m.url || m.path)))
          .filter(Boolean);

        allNewUrls.push(...batchUrls);
        uploadedCount += chunk.length;

        if (targetField === 'gallery') {
          setProductData((prev: any) => {
            const rawExisting = (prev.images || [])
              .map((img: any) => (typeof img === 'string' ? img : img.url))
              .filter((u: string) => u && u !== '/assets/floksy_rings_cat.png');
            const prevMain = prev.mainImage && prev.mainImage !== '/assets/floksy_rings_cat.png' ? [prev.mainImage] : [];
            const combinedUrls = Array.from(new Set([...prevMain, ...rawExisting, ...allNewUrls]));
            const newImgObjs = combinedUrls.map((url: string, position: number) => ({
              url,
              position,
              imageType: position === 0 ? 'hero' : 'gallery',
            }));
            return {
              ...prev,
              mainImage: combinedUrls[0] || allNewUrls[0],
              secondaryImage: combinedUrls[1] || combinedUrls[0],
              images: newImgObjs,
            };
          });
        }
      }

      if (targetField === 'socialImage' && allNewUrls.length > 0) {
        handleNestedFieldChange('seoSocial', 'socialImage', allNewUrls[0]);
      }
    } catch (err: any) {
      alert(`Media upload failed: ${err.message}`);
    } finally {
      setUploadingMedia(false);
      setUploadProgress('');
      if (inputEl) inputEl.value = '';
    }
  };

  // 3 MASTER PRICES REAL-TIME UPDATES LOGIC
  const handleMasterPriceChange = (group: '14k' | '18k' | 'silver', newPrice: number) => {
    setProductData((prev: any) => {
      let master14k = group === '14k' ? newPrice : (prev.masterPrice14k ?? 2500);
      let master18k = group === '18k' ? newPrice : (prev.masterPrice18k ?? 2750);
      let masterAg = group === 'silver' ? newPrice : (prev.masterPriceSilver ?? 2000);

      const updatedVars = (prev.variations || []).map((v: any) => {
        const metalStr = String(v.metal || '');
        if (metalStr.startsWith('14K')) {
          return { ...v, price: master14k };
        } else if (metalStr.startsWith('18K')) {
          return { ...v, price: master18k };
        } else if (metalStr === 'Silver') {
          return { ...v, price: masterAg };
        }
        return v;
      });

      return {
        ...prev,
        masterPrice14k: master14k,
        masterPrice18k: master18k,
        masterPriceSilver: masterAg,
        price: master14k,
        variations: updatedVars,
      };
    });
  };

  const generateVariationsFromMasterPrices = (
    p14k: number,
    p18k: number,
    pSilver: number,
    metalsList: any[],
    sizesList: string[],
    baseSku: string,
    isRing: boolean
  ) => {
    const activeMetals = (metalsList || []).map((m: any) => typeof m === 'string' ? m : m.label);
    const sizes = isRing ? (sizesList && sizesList.length > 0 ? sizesList : ALL_RING_SIZES) : [null];
    const generated: any[] = [];

    for (const metal of activeMetals) {
      let groupPrice = p14k;
      if (metal.startsWith('18K')) groupPrice = p18k;
      else if (metal === 'Silver') groupPrice = pSilver;

      const metalCode = metal.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase();

      for (const size of sizes) {
        const sizeCode = size ? size.replace(/[^a-zA-Z0-9]/g, '') : '';
        generated.push({
          metal,
          ringSize: size,
          price: groupPrice,
          sku: `${baseSku || 'FJ-JW-001'}-${metalCode}${sizeCode ? `-${sizeCode}` : ''}`,
          status: 'ACTIVE',
        });
      }
    }

    setProductData((prev: any) => ({
      ...prev,
      variations: generated,
    }));
  };

  const handleGenerateBulkVariations = () => {
    const p14k = productData.masterPrice14k ?? 2500;
    const p18k = productData.masterPrice18k ?? 2750;
    const pSilver = productData.masterPriceSilver ?? 2000;
    const activeMetals = productData.metalsConfig || APPROVED_METALS;
    const sizes = productData.availableRingSizes || ALL_RING_SIZES;
    const baseSku = productData.sku || 'FJ-JW-001';

    generateVariationsFromMasterPrices(p14k, p18k, pSilver, activeMetals, sizes, baseSku, isRingProduct);
  };

  const handleAddSingleVariation = () => {
    const metals = productData.metalsConfig || [];
    const firstMetal = metals[0]?.label || '14K Yellow Gold';
    const defaultSize = isRingProduct ? ((productData.availableRingSizes || [])[0] || 'US 7') : null;
    const baseSku = productData.sku || 'FJ-JW-001';
    const varCount = (productData.variations || []).length + 1;

    let groupPrice = productData.masterPrice14k || 2500;
    if (firstMetal.startsWith('18K')) groupPrice = productData.masterPrice18k || 2750;
    else if (firstMetal === 'Silver') groupPrice = productData.masterPriceSilver || 2000;

    const newVar = {
      metal: firstMetal,
      ringSize: defaultSize,
      price: groupPrice,
      sku: `${baseSku}-VAR-${varCount}`,
      status: 'ACTIVE',
    };

    handleFieldChange('variations', [...(productData.variations || []), newVar]);
  };

  const handleDeleteVariation = (idx: number) => {
    const updated = (productData.variations || []).filter((_: any, i: number) => i !== idx);
    handleFieldChange('variations', updated);
  };

  // Custom Options Builder Handlers
  const handleAddCustomOption = () => {
    const newOpt = {
      id: `opt_${Date.now()}`,
      title: '',
      inputType: 'Text',
      placeholder: '',
      maxLength: 25,
      required: false,
      priceAdjustment: 0,
    };
    handleFieldChange('customOptions', [...(productData.customOptions || []), newOpt]);
  };

  const handleUpdateCustomOption = (idx: number, key: string, val: any) => {
    const updated = [...(productData.customOptions || [])];
    const curr = { ...updated[idx], [key]: val };
    if (key === 'inputType') {
      if (val === 'Checkbox') {
        delete curr.choices;
        delete curr.placeholder;
        delete curr.maxLength;
        if (!curr.checkboxOptions || curr.checkboxOptions.length === 0) {
          if (curr.checkboxLabel !== undefined && curr.checkboxLabel !== '') {
            curr.checkboxOptions = [{ id: `cb_${Date.now()}`, label: curr.checkboxLabel, priceAdjustment: curr.priceAdjustment || 0 }];
          } else {
            curr.checkboxOptions = [{ id: `cb_${Date.now()}`, label: 'Option #1', priceAdjustment: 0 }];
          }
        }
      } else if (val === 'Text' || val === 'Textarea') {
        delete curr.choices;
        delete curr.checkboxLabel;
        delete curr.checkboxOptions;
      } else if (val === 'Dropdown' || val === 'Radio') {
        delete curr.checkboxLabel;
        delete curr.checkboxOptions;
        delete curr.placeholder;
        delete curr.maxLength;
        if (!curr.choices || curr.choices.length === 0) {
          curr.choices = [{ label: 'Option 1', value: 'Option 1', priceAdjustment: 0 }];
        }
      }
    }
    updated[idx] = curr;
    handleFieldChange('customOptions', updated);
  };

  const handleDeleteCustomOption = (idx: number) => {
    const updated = (productData.customOptions || []).filter((_: any, i: number) => i !== idx);
    handleFieldChange('customOptions', updated);
  };

  const handleMoveCustomOption = (idx: number, dir: 'up' | 'down') => {
    const updated = [...(productData.customOptions || [])];
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleFieldChange('customOptions', updated);
  };

  // Product Accordions Builder Handlers
  const handleUpdateAccordion = (idx: number, key: string, val: any) => {
    const updated = [...(productData.accordionsConfig || DEFAULT_ACCORDIONS)];
    updated[idx] = { ...updated[idx], [key]: val };
    handleFieldChange('accordionsConfig', updated);
  };

  const handleMoveAccordion = (idx: number, dir: 'up' | 'down') => {
    const updated = [...(productData.accordionsConfig || DEFAULT_ACCORDIONS)];
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleFieldChange('accordionsConfig', updated);
  };

  // Internal Admin Tags Handler
  const handleAddInternalTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const currentTags = productData.internalTags || [];
      if (!currentTags.includes(tagInput.trim())) {
        handleFieldChange('internalTags', [...currentTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveInternalTag = (tToRemove: string) => {
    const currentTags = productData.internalTags || [];
    handleFieldChange('internalTags', currentTags.filter((t: string) => t !== tToRemove));
  };

  const handleSave = async (publishStatus?: string) => {
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');

      const payload = {
        ...productData,
        title: productData.title || productData.name,
        name: productData.title || productData.name,
        status: publishStatus || productData.status || 'ACTIVE',
        enableCustomOptions: Boolean(productData.enableCustomOptions),
      };

      if (isEditMode && id) {
        await api.put(`/api/v1/admin/products/${id}`, payload);
      } else {
        const createRes = await api.post('/api/v1/admin/products', payload);
        if (createRes.data?.id) {
          navigate(`${PRIVATE_ADMIN_PATH}/products/${createRes.data.id}/edit`, { replace: true });
        }
      }

      setSuccessMsg('Product saved successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Product could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  if (isEditMode && loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#77736c' }}>
        <RefreshCw size={24} className="spin" /> Loading product details...
      </div>
    );
  }

  if (isEditMode && notFound) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h3 style={{ color: '#c53030', marginBottom: 12 }}>Product Not Found</h3>
        <p style={{ color: '#77736c', marginBottom: 24 }}>The requested product ID could not be retrieved.</p>
        <AdminButton $variant="primary" onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products`)}>
          Back to Catalog
        </AdminButton>
      </div>
    );
  }

  return (
    <div>
      {/* STICKY TOP HEADER */}
      <StickyTopHeader>
        <div className="title-area">
          <Link to={`${PRIVATE_ADMIN_PATH}/products`} className="back-btn">
            <ArrowLeft size={16} /> Back to Products
          </Link>
          <h1>{isEditMode ? `Edit Product: ${productData.title || productData.name || 'Product Details'}` : 'Add New Product'}</h1>
        </div>
        <div className="action-area">
          <AdminButton $variant="secondary" onClick={() => handleSave('DRAFT')} $loading={saving}>
            Save Draft
          </AdminButton>
          <AdminButton $variant="secondary" onClick={() => window.open(`/product/${productData.slug}`, '_blank')} icon={<Eye size={14} />}>
            Live Preview
          </AdminButton>
          <AdminButton $variant="gold" onClick={() => handleSave('ACTIVE')} $loading={saving} icon={<Check size={14} />}>
            Save & Publish
          </AdminButton>
        </div>
      </StickyTopHeader>

      {successMsg && (
        <div style={{ background: '#e6f4ea', border: '1px solid #ceead6', color: '#137333', padding: '14px 18px', borderRadius: 6, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
            <Check size={18} /> {successMsg}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <AdminButton $size="sm" $variant="secondary" onClick={() => window.open(`/product/${productData.slug}`, '_blank')}>
              View Product
            </AdminButton>
            <AdminButton $size="sm" $variant="primary" onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products`)}>
              All Products
            </AdminButton>
          </div>
        </div>
      )}

      {errorMsg && (
        <div style={{ background: '#fff5f5', color: '#c53030', padding: '14px 18px', borderRadius: 6, marginBottom: 20, border: '1px solid #feb2b2', fontWeight: 600 }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <EditorGrid>
        {/* MAIN EDITOR COLUMN */}
        <MainEditorCol>
          {/* SECTION 1: PRODUCT INFORMATION */}
          <AdminCard>
            <AdminCardHeader>
              <h3>1. PRODUCT INFORMATION</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Title</label>
                <AdminInput type="text" value={productData.title || productData.name || ''} onChange={(e) => handleFieldChange('title', e.target.value)} placeholder="e.g. Petite Micropavé Hidden Halo Engagement Ring in 14k White Gold" />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>SKU (Stock Keeping Unit)</label>
                <AdminInput type="text" value={productData.sku || ''} onChange={(e) => handleFieldChange('sku', e.target.value)} placeholder="e.g. FJ-RNG-001" />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>URL Slug</label>
                <AdminInput type="text" value={productData.slug || ''} onChange={(e) => handleFieldChange('slug', e.target.value)} placeholder="petite-micropave-hidden-halo-engagement-ring" />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Category</label>
                <AdminSelect value={productData.categoryId || ''} onChange={(e) => handleFieldChange('categoryId', e.target.value)}>
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </AdminSelect>
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Jewelry Type</label>
                <AdminSelect value={productData.jewelleryType || 'Rings'} onChange={(e) => handleFieldChange('jewelleryType', e.target.value)}>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Pendants">Pendants</option>
                  <option value="Other">Other</option>
                </AdminSelect>
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Catalog Status</label>
                <AdminSelect value={productData.status || 'ACTIVE'} onChange={(e) => handleFieldChange('status', e.target.value)}>
                  <option value="ACTIVE">Active / Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </AdminSelect>
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={3}>
              <AdminFormGroup>
                <label>Base / Regular Price ($)</label>
                <AdminInput type="number" value={productData.price || 0} onChange={(e) => handleFieldChange('price', parseFloat(e.target.value) || 0)} />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Discounted / Sale Price ($)</label>
                <AdminInput type="number" value={productData.salePrice || ''} onChange={(e) => handleFieldChange('salePrice', parseFloat(e.target.value) || undefined)} placeholder="Optional sale price" />
              </AdminFormGroup>
              <AdminFormGroup>
                <label>Compare / Strikethrough Price ($)</label>
                <AdminInput type="number" value={productData.comparePrice || ''} onChange={(e) => handleFieldChange('comparePrice', parseFloat(e.target.value) || undefined)} placeholder="Optional compare price" />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGroup style={{ background: '#faf6ee', padding: '12px 16px', borderRadius: 6, border: '1px solid #e8e3d9', marginTop: 8, marginBottom: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
                <input
                  type="checkbox"
                  checked={Boolean((productData as any).onSale)}
                  onChange={(e) => handleFieldChange('onSale', e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: '#c9a45c' }}
                />
                🏷️ Mark Product "ON SALE" (Displays ON SALE luxury badge & discount pricing on storefront)
              </label>
            </AdminFormGroup>

            <AdminFormGroup>
              <label>Short Description</label>
              <AdminTextarea rows={2} value={productData.shortDescription || ''} onChange={(e) => handleFieldChange('shortDescription', e.target.value)} placeholder="Summary overview shown on product cards" />
            </AdminFormGroup>

            <AdminFormGroup>
              <label>Full Description & Craftsmanship Story</label>
              <AdminTextarea rows={4} value={productData.fullDescription || ''} onChange={(e) => handleFieldChange('fullDescription', e.target.value)} placeholder="Detailed narrative, craftsmanship details, and materials specification" />
            </AdminFormGroup>
          </AdminCard>

          {/* SECTION 2: PRODUCT MEDIA */}
          <AdminCard>
            <AdminCardHeader>
              <h3>2. PRODUCT MEDIA</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {uploadProgress && (
                  <span style={{ fontSize: '0.78rem', color: '#c9a45c', fontWeight: 600, background: '#faf6ee', padding: '4px 10px', borderRadius: 4, border: '1px solid #e8e3d9' }}>
                    {uploadProgress}
                  </span>
                )}
                <input ref={mediaFileInputRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={(e) => handleDirectMediaUpload(e, 'gallery')} />
                <AdminButton $variant="gold" $size="sm" onClick={() => mediaFileInputRef.current?.click()} $loading={uploadingMedia} icon={<Upload size={13} />}>
                  {uploadingMedia ? 'Uploading Images...' : '+ Add Product Images (PC Upload)'}
                </AdminButton>
              </div>
            </AdminCardHeader>

            <div style={{ background: '#faf8f5', border: '1px solid #e8e3d9', padding: 16, borderRadius: 6 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#77736c', marginBottom: 12 }}>
                Product Gallery (Click any image to set it as PRIMARY image)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                {(() => {
                  const rawImgs = (productData.images || []).map((img: any) => (typeof img === 'string' ? img : img.url)).filter(Boolean);
                  const allUrls = Array.from(new Set([
                    productData.mainImage,
                    productData.secondaryImage,
                    ...rawImgs
                  ].filter((u: string) => u && u !== '/assets/floksy_rings_cat.png')));

                  const displayList = allUrls.length > 0 ? allUrls : ['/assets/floksy_rings_cat.png'];

                  return displayList.map((url: any, idx: number) => (
                    <div
                      key={idx}
                      title={idx === 0 ? 'Primary Product Image' : 'Click to set as Primary Image'}
                      onClick={() => {
                        if (url === '/assets/floksy_rings_cat.png') return;
                        const reordered = [url, ...displayList.filter((u: string) => u !== url && u !== '/assets/floksy_rings_cat.png')];
                        const newImgObjs = reordered.map((u, pos) => ({ url: u, position: pos, imageType: pos === 0 ? 'hero' : 'gallery' }));
                        setProductData((prev: any) => ({
                          ...prev,
                          mainImage: reordered[0],
                          secondaryImage: reordered[1] || reordered[0],
                          images: newImgObjs,
                        }));
                      }}
                      style={{ position: 'relative', aspectRatio: '1/1', background: '#fff', border: idx === 0 ? '2px solid #c9a45c' : idx === 1 ? '2px solid #19202a' : '1px solid #d9d3c7', borderRadius: 6, overflow: 'hidden', cursor: 'pointer' }}
                    >
                      <img src={url} alt={`Media ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: 4, left: 4, background: idx === 0 ? '#c9a45c' : idx === 1 ? '#19202a' : 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: '0.65rem', fontWeight: 700 }}>
                        {idx === 0 ? 'PRIMARY' : idx === 1 ? 'HOVER' : `#${idx + 1}`}
                      </span>
                      {url !== '/assets/floksy_rings_cat.png' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const remaining = displayList.filter((u: any) => u !== url && u !== '/assets/floksy_rings_cat.png');
                            const newImgObjs = remaining.map((u, pos) => ({ url: u, position: pos, imageType: pos === 0 ? 'hero' : 'gallery' }));
                            setProductData((prev: any) => ({
                              ...prev,
                              mainImage: remaining[0] || '/assets/floksy_rings_cat.png',
                              secondaryImage: remaining[1] || remaining[0] || null,
                              images: newImgObjs,
                            }));
                          }}
                          style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: '0.7rem' }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </AdminCard>

          {/* SECTION 3: PRODUCT FEATURES */}
          <AdminCard>
            <AdminCardHeader>
              <h3>3. PRODUCT FEATURES</h3>
            </AdminCardHeader>
            <AdminFormGrid $columns={2}>
              <ToggleRow>
                <span className="label">Enable Metal Selection</span>
                <input type="checkbox" checked={productData.enableMetalSelection ?? true} onChange={(e) => handleFieldChange('enableMetalSelection', e.target.checked)} />
              </ToggleRow>
              <ToggleRow>
                <span className="label">Enable Custom Options</span>
                <input type="checkbox" checked={productData.enableCustomOptions ?? false} onChange={(e) => handleFieldChange('enableCustomOptions', e.target.checked)} />
              </ToggleRow>
            </AdminFormGrid>
          </AdminCard>

          {/* SECTION 4: DIAMOND DETAILS (DESCRIPTIVE SPECIFICATIONS ONLY) */}
          <AdminCard>
            <AdminCardHeader>
              <h3>4. DIAMOND DETAILS</h3>
            </AdminCardHeader>
            <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 14 }}>
              Enter descriptive specifications of the diamond included with this creation. Customers cannot change the diamond.
            </div>

            <AdminFormGrid $columns={3}>
              <AdminFormGroup>
                <label>Shape</label>
                <AdminSelect value={productData.diamondDetails?.shape || 'Round'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'shape', e.target.value)}>
                  <option value="Round">Round</option>
                  <option value="Oval">Oval</option>
                  <option value="Cushion">Cushion</option>
                  <option value="Princess">Princess</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Pear">Pear</option>
                  <option value="Marquise">Marquise</option>
                  <option value="Radiant">Radiant</option>
                  <option value="Asscher">Asscher</option>
                  <option value="Heart">Heart</option>
                  <option value="Other">Other</option>
                </AdminSelect>
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Carat Weight (ct)</label>
                <AdminInput type="number" step="0.01" value={productData.diamondDetails?.caratWeight ?? 1.0} onChange={(e) => handleNestedFieldChange('diamondDetails', 'caratWeight', parseFloat(e.target.value) || 0)} placeholder="1.00" />
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Color</label>
                <AdminSelect value={productData.diamondDetails?.color || 'D'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'color', e.target.value)}>
                  <option value="D">D (Colorless)</option>
                  <option value="E">E (Colorless)</option>
                  <option value="F">F (Colorless)</option>
                  <option value="G">G (Near Colorless)</option>
                  <option value="H">H (Near Colorless)</option>
                  <option value="I">I (Near Colorless)</option>
                  <option value="J">J (Near Colorless)</option>
                  <option value="K">K (Faint Yellow)</option>
                  <option value="Other">Other</option>
                </AdminSelect>
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={3}>
              <AdminFormGroup>
                <label>Clarity</label>
                <AdminSelect value={productData.diamondDetails?.clarity || 'VS1'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'clarity', e.target.value)}>
                  <option value="FL">FL (Flawless)</option>
                  <option value="IF">IF (Internally Flawless)</option>
                  <option value="VVS1">VVS1 (Very Very Slightly Included 1)</option>
                  <option value="VVS2">VVS2 (Very Very Slightly Included 2)</option>
                  <option value="VS1">VS1 (Very Slightly Included 1)</option>
                  <option value="VS2">VS2 (Very Slightly Included 2)</option>
                  <option value="SI1">SI1 (Slightly Included 1)</option>
                  <option value="SI2">SI2 (Slightly Included 2)</option>
                  <option value="I1">I1 (Included 1)</option>
                  <option value="I2">I2 (Included 2)</option>
                  <option value="I3">I3 (Included 3)</option>
                  <option value="Other">Other</option>
                </AdminSelect>
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Cut Grade</label>
                <AdminSelect value={productData.diamondDetails?.cut || 'Excellent'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'cut', e.target.value)}>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Not Applicable">Not Applicable</option>
                </AdminSelect>
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Polish</label>
                <AdminSelect value={productData.diamondDetails?.polish || 'Excellent'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'polish', e.target.value)}>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </AdminSelect>
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={3}>
              <AdminFormGroup>
                <label>Symmetry</label>
                <AdminSelect value={productData.diamondDetails?.symmetry || 'Excellent'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'symmetry', e.target.value)}>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </AdminSelect>
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Fluorescence</label>
                <AdminSelect value={productData.diamondDetails?.fluorescence || 'None'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'fluorescence', e.target.value)}>
                  <option value="None">None</option>
                  <option value="Faint">Faint</option>
                  <option value="Medium">Medium</option>
                  <option value="Strong">Strong</option>
                  <option value="Very Strong">Very Strong</option>
                </AdminSelect>
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Certification</label>
                <AdminSelect value={productData.diamondDetails?.certification || 'IGI'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'certification', e.target.value)}>
                  <option value="GIA">GIA</option>
                  <option value="IGI">IGI</option>
                  <option value="GCAL">GCAL</option>
                  <option value="Other">Other</option>
                  <option value="None">None</option>
                </AdminSelect>
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={3}>
              <AdminFormGroup>
                <label>Certificate Number</label>
                <AdminInput type="text" value={productData.diamondDetails?.certificateNumber || ''} onChange={(e) => handleNestedFieldChange('diamondDetails', 'certificateNumber', e.target.value)} placeholder="e.g. LG620491823" />
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Diamond Origin</label>
                <AdminSelect value={productData.diamondDetails?.origin || 'Lab-Grown'} onChange={(e) => handleNestedFieldChange('diamondDetails', 'origin', e.target.value)}>
                  <option value="Natural">Natural</option>
                  <option value="Lab-Grown">Lab-Grown</option>
                </AdminSelect>
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Measurements</label>
                <AdminInput type="text" value={productData.diamondDetails?.measurements || ''} onChange={(e) => handleNestedFieldChange('diamondDetails', 'measurements', e.target.value)} placeholder="e.g. 6.50 × 6.50 × 3.95 mm" />
              </AdminFormGroup>
            </AdminFormGrid>
          </AdminCard>

          {/* SECTION 5: CUSTOM OPTIONS BUILDER */}
          {productData.enableCustomOptions && (
            <AdminCard>
              <AdminCardHeader>
                <h3>5. CUSTOM OPTIONS</h3>
                <AdminButton $variant="gold" $size="sm" onClick={handleAddCustomOption} icon={<Plus size={13} />}>
                  + Add Custom Option
                </AdminButton>
              </AdminCardHeader>
              <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 16 }}>
                Create customer-selectable custom fields (Initials, Engraving, Gift Box, Chain Length, etc.).
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {(productData.customOptions || []).map((opt: any, optIdx: number) => (
                  <CustomOptItemCard key={opt.id || optIdx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#19202a' }}>
                        OPTION #{optIdx + 1}: {opt.title || 'Untitled Option'}
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <AdminButton
                          $size="sm"
                          $variant="secondary"
                          disabled={optIdx === 0}
                          onClick={() => handleMoveCustomOption(optIdx, 'up')}
                          icon={<MoveUp size={12} />}
                        />
                        <AdminButton
                          $size="sm"
                          $variant="secondary"
                          disabled={optIdx === (productData.customOptions || []).length - 1}
                          onClick={() => handleMoveCustomOption(optIdx, 'down')}
                          icon={<MoveDown size={12} />}
                        />
                        <AdminButton
                          $size="sm"
                          $variant="danger"
                          onClick={() => handleDeleteCustomOption(optIdx)}
                          icon={<Trash2 size={13} />}
                        />
                      </div>
                    </div>

                    <AdminFormGrid $columns={3}>
                      <AdminFormGroup>
                        <label>Option Title</label>
                        <AdminInput
                          type="text"
                          value={opt.title || ''}
                          onChange={(e) => handleUpdateCustomOption(optIdx, 'title', e.target.value)}
                          placeholder="e.g. Initials, Engraving, Gift Box"
                        />
                      </AdminFormGroup>

                      <AdminFormGroup>
                        <label>Input Type</label>
                        <AdminSelect
                          value={opt.inputType || 'Text'}
                          onChange={(e) => handleUpdateCustomOption(optIdx, 'inputType', e.target.value)}
                        >
                          <option value="Text">Text</option>
                          <option value="Textarea">Textarea</option>
                          <option value="Checkbox">Checkbox</option>
                          <option value="Select">Select</option>
                          <option value="Radio">Radio</option>
                          <option value="Number">Number</option>
                        </AdminSelect>
                      </AdminFormGroup>

                      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 20 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                          <input
                            type="checkbox"
                            checked={opt.required ?? false}
                            onChange={(e) => handleUpdateCustomOption(optIdx, 'required', e.target.checked)}
                            style={{ width: 18, height: 18, accentColor: '#c9a45c' }}
                          />
                          Required
                        </label>
                      </div>
                    </AdminFormGrid>

                    {(opt.inputType === 'Text' || opt.inputType === 'Textarea') && (
                      <AdminFormGrid $columns={2}>
                        <AdminFormGroup>
                          <label>Placeholder</label>
                          <AdminInput
                            type="text"
                            value={opt.placeholder || ''}
                            onChange={(e) => handleUpdateCustomOption(optIdx, 'placeholder', e.target.value)}
                            placeholder="e.g. Enter custom text..."
                          />
                        </AdminFormGroup>
                        <AdminFormGroup>
                          <label>Max Character Length</label>
                          <AdminInput
                            type="number"
                            value={opt.maxLength || 25}
                            onChange={(e) => handleUpdateCustomOption(optIdx, 'maxLength', parseInt(e.target.value, 10) || 25)}
                          />
                        </AdminFormGroup>
                      </AdminFormGrid>
                    )}

                    {(opt.inputType === 'Select' || opt.inputType === 'Radio' || opt.inputType === 'Dropdown') && (
                      <div style={{ background: '#fff', border: '1px solid #e8e3d9', padding: 14, borderRadius: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#19202a', textTransform: 'uppercase' }}>Option Values</span>
                          <AdminButton
                            $variant="gold"
                            $size="sm"
                            onClick={() => {
                              const choices = opt.choices || [];
                              const updatedChoices = [...choices, { label: `Value ${choices.length + 1}`, value: `Value ${choices.length + 1}`, priceAdjustment: 0 }];
                              handleUpdateCustomOption(optIdx, 'choices', updatedChoices);
                            }}
                            icon={<Plus size={12} />}
                          >
                            + ADD OPTION VALUE
                          </AdminButton>
                        </div>
                        {(opt.choices || []).map((ch: any, chIdx: number) => (
                          <div key={chIdx} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                            <AdminInput
                              type="text"
                              value={ch.label || ''}
                              onChange={(e) => {
                                const choices = [...(opt.choices || [])];
                                choices[chIdx].label = e.target.value;
                                choices[chIdx].value = e.target.value;
                                handleUpdateCustomOption(optIdx, 'choices', choices);
                              }}
                              placeholder="Value Label (e.g. Premium Gift Box)"
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 140 }}>
                              <span style={{ fontSize: '0.75rem', color: '#666' }}>+$</span>
                              <AdminInput
                                type="number"
                                value={ch.priceAdjustment || 0}
                                onChange={(e) => {
                                  const choices = [...(opt.choices || [])];
                                  choices[chIdx].priceAdjustment = parseFloat(e.target.value) || 0;
                                  handleUpdateCustomOption(optIdx, 'choices', choices);
                                }}
                              />
                            </div>
                            <AdminButton
                              $variant="danger"
                              $size="sm"
                              onClick={() => {
                                const choices = (opt.choices || []).filter((_: any, i: number) => i !== chIdx);
                                handleUpdateCustomOption(optIdx, 'choices', choices);
                              }}
                              icon={<Trash2 size={12} />}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {opt.inputType === 'Checkbox' && (
                      <div style={{ background: '#ffffff', border: '1px solid #e8e3d9', padding: 14, borderRadius: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#19202a' }}>
                            CHECKBOX OPTIONS
                          </span>
                          <AdminButton
                            $variant="gold"
                            $size="sm"
                            onClick={() => {
                              const currentOpts = Array.isArray(opt.checkboxOptions) ? opt.checkboxOptions : [];
                              const newId = `cb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
                              const newOpt = {
                                id: newId,
                                label: '',
                                priceAdjustment: 0,
                              };
                              const updated = [...currentOpts, newOpt];
                              setFocusCbId(newId);
                              handleUpdateCustomOption(optIdx, 'checkboxOptions', updated);
                            }}
                            icon={<Plus size={12} />}
                          >
                            + ADD CHECKBOX OPTION
                          </AdminButton>
                        </div>

                        {(() => {
                          const list = Array.isArray(opt.checkboxOptions) ? opt.checkboxOptions : [];

                          if (list.length === 0) {
                            return (
                              <div style={{ fontSize: '0.82rem', color: '#77736c', fontStyle: 'italic', padding: '8px 0' }}>
                                No checkbox options added. Click "+ ADD CHECKBOX OPTION" above.
                              </div>
                            );
                          }

                          return list.map((cbOpt: any, cbIdx: number) => (
                            <div key={cbOpt.id || cbIdx} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                              <AdminInput
                                type="text"
                                ref={(el: HTMLInputElement | null) => {
                                  if (el && focusCbId === cbOpt.id) {
                                    el.focus();
                                    setFocusCbId(null);
                                  }
                                }}
                                value={cbOpt.label !== undefined ? cbOpt.label : ''}
                                onChange={(e) => {
                                  const updatedList = [...list];
                                  updatedList[cbIdx] = { ...updatedList[cbIdx], label: e.target.value };
                                  handleUpdateCustomOption(optIdx, 'checkboxOptions', updatedList);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    const labelText = (cbOpt.label || '').trim();
                                    if (!labelText) {
                                      return; // Do NOT create duplicate empty rows if current input is empty
                                    }

                                    const newId = `cb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
                                    const newOpt = {
                                      id: newId,
                                      label: '',
                                      priceAdjustment: 0,
                                    };

                                    const updatedList = [...list];
                                    updatedList.splice(cbIdx + 1, 0, newOpt);
                                    setFocusCbId(newId);
                                    handleUpdateCustomOption(optIdx, 'checkboxOptions', updatedList);
                                  }
                                }}
                                placeholder="Option Label (e.g. Add Gift Wrapping)"
                              />
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 140 }}>
                                <span style={{ fontSize: '0.75rem', color: '#666' }}>+$</span>
                                <AdminInput
                                  type="number"
                                  value={cbOpt.priceAdjustment || 0}
                                  onChange={(e) => {
                                    const updatedList = [...list];
                                    updatedList[cbIdx] = { ...updatedList[cbIdx], priceAdjustment: parseFloat(e.target.value) || 0 };
                                    handleUpdateCustomOption(optIdx, 'checkboxOptions', updatedList);
                                  }}
                                />
                              </div>
                              <AdminButton
                                $variant="danger"
                                $size="sm"
                                onClick={() => {
                                  const updatedList = list.filter((_: any, i: number) => i !== cbIdx);
                                  handleUpdateCustomOption(optIdx, 'checkboxOptions', updatedList);
                                }}
                                icon={<Trash2 size={12} />}
                              />
                            </div>
                          ));
                        })()}
                      </div>
                    )}
                  </CustomOptItemCard>
                ))}

                {(productData.customOptions || []).length === 0 && (
                  <div style={{ textAlign: 'center', padding: 24, background: '#faf8f5', border: '1px solid #e8e3d9', borderRadius: 6, color: '#77736c' }}>
                    No custom options added. Click "+ Add Custom Option" above.
                  </div>
                )}
              </div>
            </AdminCard>
          )}

          {/* SECTION 6: PRODUCT VARIATIONS & PRICING */}
          <AdminCard>
            <AdminCardHeader>
              <h3>6. PRODUCT VARIATIONS & PRICING</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <AdminButton $variant="secondary" $size="sm" onClick={handleGenerateBulkVariations} icon={<Sliders size={13} />}>
                  Auto-Generate Variations
                </AdminButton>
                <AdminButton $variant="gold" $size="sm" onClick={handleAddSingleVariation} icon={<Plus size={13} />}>
                  + Add Row
                </AdminButton>
              </div>
            </AdminCardHeader>

            <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 16 }}>
              Select available precious metal options and enter the 3 Master Prices (14K, 18K, Silver) to control all variations.
            </div>

            {/* METALS SELECTION CHECKBOXES */}
            <div style={{ background: '#faf8f5', border: '1px solid #e8e3d9', padding: 16, borderRadius: 6, marginBottom: 16 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#19202a', marginBottom: 12 }}>
                Active Metal Options
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {APPROVED_METALS.map((mObj) => {
                  const currentMetals = productData.metalsConfig || [];
                  const isChecked = currentMetals.some((m: any) => (typeof m === 'string' ? m : m.label)?.toLowerCase() === mObj.label.toLowerCase());

                  return (
                    <label key={mObj.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', cursor: 'pointer', background: '#fff', padding: '8px 12px', border: isChecked ? '1px solid #c9a45c' : '1px solid #e8e3d9', borderRadius: 6, fontWeight: isChecked ? 600 : 400 }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          let updated = [...currentMetals];
                          if (e.target.checked) {
                            if (!isChecked) {
                              updated.push({ ...mObj });
                            }
                          } else {
                            updated = updated.filter((m: any) => (typeof m === 'string' ? m : m.label)?.toLowerCase() !== mObj.label.toLowerCase());
                          }
                          handleFieldChange('metalsConfig', updated);
                        }}
                        style={{ accentColor: '#c9a45c' }}
                      />
                      {mObj.label}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3 MASTER PRICES INPUTS */}
            <div style={{ background: '#faf8f5', border: '1px solid #e8e3d9', padding: 18, borderRadius: 6, marginBottom: 20 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#19202a', marginBottom: 12 }}>
                MASTER PRICES (Source of Truth for Metal Groups)
              </div>
              <AdminFormGrid $columns={3}>
                <AdminFormGroup>
                  <label style={{ fontWeight: 700, color: '#c9a45c' }}>14K PRICE ($)</label>
                  <AdminInput
                    type="number"
                    value={productData.masterPrice14k ?? 2500}
                    onChange={(e) => handleMasterPriceChange('14k', parseFloat(e.target.value) || 0)}
                    placeholder="2500"
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label style={{ fontWeight: 700, color: '#c9a45c' }}>18K PRICE ($)</label>
                  <AdminInput
                    type="number"
                    value={productData.masterPrice18k ?? 2750}
                    onChange={(e) => handleMasterPriceChange('18k', parseFloat(e.target.value) || 0)}
                    placeholder="2750"
                  />
                </AdminFormGroup>
                <AdminFormGroup>
                  <label style={{ fontWeight: 700, color: '#c9a45c' }}>SILVER PRICE ($)</label>
                  <AdminInput
                    type="number"
                    value={productData.masterPriceSilver ?? 2000}
                    onChange={(e) => handleMasterPriceChange('silver', parseFloat(e.target.value) || 0)}
                    placeholder="2000"
                  />
                </AdminFormGroup>
              </AdminFormGrid>
              <div style={{ fontSize: '0.78rem', color: '#77736c', marginTop: 8 }}>
                Editing a master price automatically updates all corresponding metal colors {isRingProduct ? 'and ring sizes' : ''} in the variation table below.
              </div>
            </div>

            {/* SINGLE CONSOLIDATED PRODUCT VARIATIONS & PRICING TABLE */}
            <AdminTableContainer>
              <AdminTable>
                <thead>
                  <tr>
                    <th>Metal</th>
                    {isRingProduct && <th>Ring Size</th>}
                    <th>Price ($)</th>
                    <th>SKU</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(productData.variations || []).map((vObj: any, vIdx: number) => (
                    <tr key={vIdx}>
                      <td>
                        <AdminSelect
                          value={vObj.metal || ''}
                          onChange={(e) => {
                            const updated = [...(productData.variations || [])];
                            const newMetal = e.target.value;
                            updated[vIdx].metal = newMetal;
                            if (newMetal.startsWith('14K')) updated[vIdx].price = productData.masterPrice14k || 2500;
                            else if (newMetal.startsWith('18K')) updated[vIdx].price = productData.masterPrice18k || 2750;
                            else if (newMetal === 'Silver') updated[vIdx].price = productData.masterPriceSilver || 2000;
                            handleFieldChange('variations', updated);
                          }}
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        >
                          {(productData.metalsConfig || APPROVED_METALS).map((m: any) => {
                            const lbl = typeof m === 'string' ? m : m.label;
                            return <option key={lbl} value={lbl}>{lbl}</option>;
                          })}
                        </AdminSelect>
                      </td>
                      {isRingProduct && (
                        <td>
                          <AdminSelect
                            value={vObj.ringSize || ''}
                            onChange={(e) => {
                              const updated = [...(productData.variations || [])];
                              updated[vIdx].ringSize = e.target.value;
                              handleFieldChange('variations', updated);
                            }}
                            style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                          >
                            {(productData.availableRingSizes || ALL_RING_SIZES).map((sz: string) => (
                              <option key={sz} value={sz}>{sz}</option>
                            ))}
                          </AdminSelect>
                        </td>
                      )}
                      <td>
                        <AdminInput
                          type="number"
                          value={vObj.price || 0}
                          onChange={(e) => {
                            const updated = [...(productData.variations || [])];
                            updated[vIdx].price = parseFloat(e.target.value) || 0;
                            handleFieldChange('variations', updated);
                          }}
                          style={{ padding: '6px 10px', fontSize: '0.82rem', width: 120 }}
                        />
                      </td>
                      <td>
                        <AdminInput
                          type="text"
                          value={vObj.sku || ''}
                          onChange={(e) => {
                            const updated = [...(productData.variations || [])];
                            updated[vIdx].sku = e.target.value;
                            handleFieldChange('variations', updated);
                          }}
                          style={{ padding: '6px 10px', fontSize: '0.82rem', width: 180 }}
                        />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <AdminButton $size="sm" $variant="danger" onClick={() => handleDeleteVariation(vIdx)} icon={<Trash2 size={13} />} />
                      </td>
                    </tr>
                  ))}
                  {(productData.variations || []).length === 0 && (
                    <tr>
                      <td colSpan={isRingProduct ? 5 : 4} style={{ textAlign: 'center', padding: 32, color: '#77736c' }}>
                        No variation rows added. Click "Auto-Generate Variations" or "+ Add Row".
                      </td>
                    </tr>
                  )}
                </tbody>
              </AdminTable>
            </AdminTableContainer>
          </AdminCard>

          {/* SECTION 7: RING SIZE CONFIGURATION (RINGS ONLY!) */}
          {isRingProduct && (
            <AdminCard>
              <AdminCardHeader>
                <h3>7. RING SIZE CONFIGURATION</h3>
              </AdminCardHeader>
              <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 14 }}>
                Select available US ring sizes for storefront customer selection.
              </div>

              <div style={{ marginBottom: 16, padding: '12px 16px', background: '#faf8f5', border: '1px solid #e8e3d9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#19202a' }}>Ring Size Selection Requirement</div>
                  <div style={{ fontSize: '0.78rem', color: '#77736c' }}>
                    When checked, customers must pick a ring size before adding to bag. If unchecked, size selection is optional.
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={productData.isRingSizeRequired !== false}
                    onChange={(e) => handleFieldChange('isRingSizeRequired', e.target.checked)}
                    style={{ accentColor: '#c9a45c', width: 18, height: 18 }}
                  />
                  Required
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
                {ALL_RING_SIZES.map((sz) => {
                  const isChecked = (productData.availableRingSizes || []).includes(sz);
                  return (
                    <label
                      key={sz}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 12px',
                        background: isChecked ? '#faf8f5' : '#fff',
                        border: isChecked ? '1px solid #19202a' : '1px solid #e8e3d9',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: isChecked ? 600 : 400,
                        fontSize: '0.82rem',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const currentSizes = productData.availableRingSizes || [];
                          const updated = e.target.checked ? [...currentSizes, sz] : currentSizes.filter((s: string) => s !== sz);
                          handleFieldChange('availableRingSizes', updated);
                        }}
                        style={{ accentColor: '#c9a45c' }}
                      />
                      {sz}
                    </label>
                  );
                })}
              </div>
            </AdminCard>
          )}

          {/* SECTION 8: PRODUCT INFORMATION ACCORDIONS */}
          <AdminCard>
            <AdminCardHeader>
              <h3>8. PRODUCT INFORMATION ACCORDIONS</h3>
            </AdminCardHeader>
            <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 16 }}>
              Edit and reorder the four storefront product information sections.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(productData.accordionsConfig || DEFAULT_ACCORDIONS).map((acc: any, accIdx: number) => (
                <AccordionCardItem key={acc.id || accIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c9a45c', letterSpacing: '0.08em', textTransform: 'uppercase' }}>BLOCK #{accIdx + 1}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#19202a' }}>{acc.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, marginRight: 10 }}>
                        <input
                          type="checkbox"
                          checked={acc.enabled ?? true}
                          onChange={(e) => handleUpdateAccordion(accIdx, 'enabled', e.target.checked)}
                          style={{ accentColor: '#c9a45c' }}
                        />
                        Enabled
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600, marginRight: 10 }}>
                        <input
                          type="checkbox"
                          checked={acc.defaultOpen ?? false}
                          onChange={(e) => handleUpdateAccordion(accIdx, 'defaultOpen', e.target.checked)}
                          style={{ accentColor: '#c9a45c' }}
                        />
                        Default Open
                      </label>
                      <AdminButton
                        $size="sm"
                        $variant="secondary"
                        disabled={accIdx === 0}
                        onClick={() => handleMoveAccordion(accIdx, 'up')}
                        icon={<MoveUp size={12} />}
                      />
                      <AdminButton
                        $size="sm"
                        $variant="secondary"
                        disabled={accIdx === (productData.accordionsConfig || DEFAULT_ACCORDIONS).length - 1}
                        onClick={() => handleMoveAccordion(accIdx, 'down')}
                        icon={<MoveDown size={12} />}
                      />
                    </div>
                  </div>

                  <AdminFormGroup>
                    <label>Title</label>
                    <AdminInput
                      type="text"
                      value={acc.title || ''}
                      onChange={(e) => handleUpdateAccordion(accIdx, 'title', e.target.value)}
                    />
                  </AdminFormGroup>

                  <AdminFormGroup>
                    <label>Content</label>
                    <AdminTextarea
                      rows={3}
                      value={acc.content || ''}
                      onChange={(e) => handleUpdateAccordion(accIdx, 'content', e.target.value)}
                    />
                  </AdminFormGroup>
                </AccordionCardItem>
              ))}
            </div>
          </AdminCard>

          {/* SECTION 9: INTERNAL TAGS (CONNECTED TO FILTER MANAGEMENT) */}
          <AdminCard>
            <AdminCardHeader>
              <h3>9. INTERNAL TAGS</h3>
            </AdminCardHeader>
            <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 14 }}>
              Select internal filter values used for product organization and storefront filtering. These values are never displayed directly to customers.
            </div>

            <div style={{ position: 'relative' }} ref={tagsDropdownRef}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#19202a', display: 'block', marginBottom: 6 }}>
                Select Filter Values
              </label>

              <TagsSelectBox onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}>
                <span style={{ color: (productData.internalTags || []).length > 0 ? '#19202a' : '#999' }}>
                  {(productData.internalTags || []).length > 0
                    ? `${(productData.internalTags || []).length} filter value(s) selected`
                    : 'Select filter values...'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#77736c' }}>▼</span>
              </TagsSelectBox>

              {/* DROPDOWN PANEL */}
              {isTagsDropdownOpen && (
                <TagsDropdownPanel>
                  {/* SEARCH INPUT */}
                  <div style={{ padding: 10, borderBottom: '1px solid #f2ede4', background: '#faf8f5' }}>
                    <AdminInput
                      type="text"
                      placeholder="🔍 Search filter values..."
                      value={tagsSearchQuery}
                      onChange={(e) => setTagsSearchQuery(e.target.value)}
                      style={{ width: '100%', fontSize: '0.85rem' }}
                    />
                  </div>

                  {/* FILTER GROUPS & OPTIONS */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
                    {filterConfigs.map((filterGroup: any) => {
                      const groupName = filterGroup.customerLabel || filterGroup.name || filterGroup.key;
                      const searchLower = tagsSearchQuery.toLowerCase();

                      const matchingOptions = (filterGroup.options || []).filter((opt: any) => {
                        if (opt.isEnabled === false) return false;
                        if (!tagsSearchQuery) return true;
                        const optLabel = String(opt.label || '').toLowerCase();
                        const optVal = String(opt.value || '').toLowerCase();
                        return groupName.toLowerCase().includes(searchLower) || optLabel.includes(searchLower) || optVal.includes(searchLower);
                      });

                      if (matchingOptions.length === 0) return null;

                      return (
                        <div key={filterGroup.id || filterGroup.key} style={{ marginBottom: 14 }}>
                          <TagsFilterGroupHeader>
                            {groupName}
                          </TagsFilterGroupHeader>

                          <TagsOptionGrid>
                            {matchingOptions.map((opt: any) => {
                              const optLabel = opt.label || opt.value;
                              const optVal = opt.value || opt.label;
                              const isChecked = (productData.internalTags || []).some(
                                (t: string) => t === optLabel || t === optVal
                              );

                              return (
                                <label
                                  key={opt.id || optVal}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    fontSize: '0.82rem',
                                    color: '#19202a',
                                    cursor: 'pointer',
                                    padding: '4px 6px',
                                    borderRadius: 4,
                                    background: isChecked ? '#faf5eb' : 'transparent',
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleToggleInternalFilterOption(filterGroup.key, optVal, optLabel)}
                                    style={{ accentColor: '#c9a45c' }}
                                  />
                                  <span>{optLabel}</span>
                                </label>
                              );
                            })}
                          </TagsOptionGrid>
                        </div>
                      );
                    })}

                    {filterConfigs.every((fg: any) => {
                      const groupName = fg.customerLabel || fg.name || fg.key;
                      const searchLower = tagsSearchQuery.toLowerCase();
                      return !(fg.options || []).some(
                        (o: any) =>
                          groupName.toLowerCase().includes(searchLower) ||
                          String(o.label || '').toLowerCase().includes(searchLower) ||
                          String(o.value || '').toLowerCase().includes(searchLower)
                      );
                    }) && (
                      <div style={{ padding: 20, textAlign: 'center', color: '#77736c', fontSize: '0.85rem' }}>
                        No matching filter options found.
                      </div>
                    )}
                  </div>
                </TagsDropdownPanel>
              )}
            </div>

            {/* SELECTED CHIPS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              {(productData.internalTags || []).map((t: string) => (
                <TagPill key={t}>
                  <Tag size={12} /> {t}
                  <button type="button" onClick={() => handleRemoveInternalTag(t)}>×</button>
                </TagPill>
              ))}
              {(productData.internalTags || []).length === 0 && (
                <span style={{ fontSize: '0.8rem', color: '#a39e93' }}>No internal filter tags selected.</span>
              )}
            </div>
          </AdminCard>

          {/* SECTION 10: SEO & SOCIAL SETTINGS (ADMIN ONLY) */}
          <AdminCard>
            <AdminCardHeader>
              <h3>10. SEO & SOCIAL SETTINGS</h3>
            </AdminCardHeader>
            <div style={{ fontSize: '0.82rem', color: '#77736c', marginBottom: 14 }}>
              Technical metadata for search engines and social media sharing cards.
            </div>

            <AdminFormGroup>
              <label>SEO Keywords / Tags</label>
              <AdminInput
                type="text"
                value={productData.seoSocial?.keywords || ''}
                onChange={(e) => handleNestedFieldChange('seoSocial', 'keywords', e.target.value)}
                placeholder="e.g. engagement ring, lab grown diamond, 14k white gold ring"
              />
            </AdminFormGroup>

            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Open Graph Title</label>
                <AdminInput
                  type="text"
                  value={productData.seoSocial?.ogTitle || ''}
                  onChange={(e) => handleNestedFieldChange('seoSocial', 'ogTitle', e.target.value)}
                  placeholder="Title for Facebook/LinkedIn preview"
                />
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Twitter Title</label>
                <AdminInput
                  type="text"
                  value={productData.seoSocial?.twitterTitle || ''}
                  onChange={(e) => handleNestedFieldChange('seoSocial', 'twitterTitle', e.target.value)}
                  placeholder="Title for Twitter card preview"
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Open Graph Description</label>
                <AdminTextarea
                  rows={3}
                  value={productData.seoSocial?.ogDescription || ''}
                  onChange={(e) => handleNestedFieldChange('seoSocial', 'ogDescription', e.target.value)}
                  placeholder="Description for social shares"
                />
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Twitter Description</label>
                <AdminTextarea
                  rows={3}
                  value={productData.seoSocial?.twitterDescription || ''}
                  onChange={(e) => handleNestedFieldChange('seoSocial', 'twitterDescription', e.target.value)}
                  placeholder="Description for Twitter card"
                />
              </AdminFormGroup>
            </AdminFormGrid>

            <AdminFormGrid $columns={2}>
              <AdminFormGroup>
                <label>Social Image URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <AdminInput
                    type="text"
                    value={productData.seoSocial?.socialImage || ''}
                    onChange={(e) => handleNestedFieldChange('seoSocial', 'socialImage', e.target.value)}
                    placeholder="URL for social share thumbnail"
                  />
                  <input ref={socialImageInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleDirectMediaUpload(e, 'socialImage')} />
                  <AdminButton $variant="secondary" $size="sm" onClick={() => socialImageInputRef.current?.click()} icon={<Upload size={13} />}>
                    Upload
                  </AdminButton>
                </div>
              </AdminFormGroup>

              <AdminFormGroup>
                <label>Canonical URL</label>
                <AdminInput
                  type="text"
                  value={productData.seoSocial?.canonicalUrl || `https://floksyjewel.com/product/${productData.slug}`}
                  onChange={(e) => handleNestedFieldChange('seoSocial', 'canonicalUrl', e.target.value)}
                  placeholder="https://floksyjewel.com/product/..."
                />
              </AdminFormGroup>
            </AdminFormGrid>
          </AdminCard>
        </MainEditorCol>

        {/* STICKY SIDEBAR COLUMN */}
        <StickySidebarCol>
          {/* SECTION 11: PUBLISHING & BADGES */}
          <AdminCard>
            <AdminCardHeader>
              <h3>11. PUBLISHING & BADGES</h3>
            </AdminCardHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ToggleRow>
                <span className="label">Featured Product</span>
                <input type="checkbox" checked={productData.isFeatured || false} onChange={(e) => handleFieldChange('isFeatured', e.target.checked)} />
              </ToggleRow>
              <ToggleRow>
                <span className="label">New Arrival</span>
                <input type="checkbox" checked={productData.isNewArrival || false} onChange={(e) => handleFieldChange('isNewArrival', e.target.checked)} />
              </ToggleRow>
              <ToggleRow>
                <span className="label">Bestseller Badge</span>
                <input type="checkbox" checked={productData.isBestseller || false} onChange={(e) => handleFieldChange('isBestseller', e.target.checked)} />
              </ToggleRow>

              <AdminFormGroup style={{ marginTop: 12 }}>
                <label>Status</label>
                <AdminSelect value={productData.status || 'ACTIVE'} onChange={(e) => handleFieldChange('status', e.target.value)}>
                  <option value="ACTIVE">Active / Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </AdminSelect>
              </AdminFormGroup>
            </div>
          </AdminCard>
        </StickySidebarCol>
      </EditorGrid>
    </div>
  );
};
