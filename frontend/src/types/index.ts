export interface ProductImageItem {
  id?: string;
  url: string;
  altText?: string;
  title?: string;
  imageType?: string;
  position?: number;
}

export interface Product {
  id: string;
  name: string;
  title?: string;
  sku: string;
  slug: string;
  masterPrice14k?: number;
  masterPrice18k?: number;
  masterPriceSilver?: number;
  diamondDetails?: {
    shape?: string;
    caratWeight?: number;
    color?: string;
    clarity?: string;
    cut?: string;
    polish?: string;
    symmetry?: string;
    fluorescence?: string;
    certification?: string;
    certificateNumber?: string;
    origin?: string;
    measurements?: string;
  };
  internalTags?: string[];
  seoSocial?: {
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    socialImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    canonicalUrl?: string;
  };
  detailSections?: any[];
  shortDescription?: string;
  fullDescription?: string;
  specifications?: string;
  careInstructions?: string;
  jewelleryType?: string;
  ringStyle?: string;
  ringSize?: string;
  isRingSizeRequired?: boolean;
  ringWidth?: string;
  gender?: string;
  metal?: string;
  metalColor?: string;
  goldPurity?: string;
  goldColor?: string;
  goldWeight?: number;
  diamondType?: string;
  shape?: string;
  carat?: number;
  color?: string;
  clarity?: string;
  cut?: string;
  certificateNo?: string;
  certification?: string;
  gemstone?: string;
  gemstoneColor?: string;
  pearlType?: string;
  birthstone?: string;
  plainMetal?: boolean;
  onSale?: boolean;
  engravable?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  price: number;
  comparePrice?: number;
  salePrice?: number;
  currency?: string;
  mainImage: string;
  primaryImage?: string;
  secondaryImage?: string;
  images?: ProductImageItem[];
  videos?: { id?: string; url: string; position?: number }[];
  variants?: ProductVariant[];
  variations?: any[];
  variationsJson?: any;
  customOptions?: any[];
  customOptionsJson?: any;
  shippingInfo?: any;
  category?: { id?: string; name: string; slug: string; description?: string; bannerImage?: string; image?: string; link?: string; sortOrder?: number; isActive?: boolean };
  collection?: { id?: string; name: string; slug: string };
  categoryId?: string;
  collectionId?: string;
  enableCustomOptions?: boolean;
  enableRingSize?: boolean;
  ringSizeMode?: string;
  fixedRingSize?: string;
  availableRingSizes?: string[];
  metalsConfig?: any[];
  diamondsConfig?: any[];
  benefitsConfig?: any[];
  accordionsConfig?: any[];
  pricingMatrix?: any;
  draftData?: any;
  ogImage?: string;
  schemaInformation?: any;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isSettingOnly?: boolean;
  processingTimeDays?: number;
  craftsmanshipHeading?: string;
  craftsmanshipStory?: string;
  editorialImage?: string;
  recommendedProductIds?: string;
  completeLookProductIds?: string;
  stockQuantity?: number;
  status?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  bannerImage?: string;
  image?: string;
  link?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  metal?: string;
  goldColor?: string;
  size?: string;
  price: number;
  stock: number;
}

export interface Diamond {
  id: string;
  diamondId: string; // e.g. D10001
  stockId?: string;
  sku?: string;
  diamondType: 'NATURAL' | 'LAB_GROWN' | 'FANCY' | string;
  growthType?: string; // e.g. HPHT, CVD
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut?: string;
  polish?: string;
  symmetry?: string;
  fluorescence?: string;
  fancyColor?: string;
  fancyOvertone?: string;
  fancyIntensity?: string;
  ratio?: number;
  pricePerCarat?: number;
  length?: number;
  width?: number;
  depth?: number;
  tablePercent?: number;
  depthPercent?: number;
  girdle?: string;
  culet?: string;
  lab?: string;
  certificateNumber?: string;
  certificateUrl?: string;
  price: number;
  currency: string;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'HIDDEN' | string;
  imageUrl?: string;
  videoUrl?: string;
  certificatePdfUrl?: string;
}

export interface PageSection {
  id: string;
  blockType: string;
  position: number;
  content: string; // JSON string
  isVisible: boolean;
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  position: number;
  megaMenu?: string; // JSON payload
}

export interface CustomRequest {
  id: string;
  requestNumber: string;
  name: string;
  email: string;
  whatsapp: string;
  jewelleryType: string;
  metal?: string;
  diamondPreference?: string;
  budget?: string;
  deadline?: string;
  description: string;
  status: string;
  cadFileUrl?: string;
  adminNotes?: string;
  createdAt: string;
  timelines?: { id: string; status: string; note?: string; createdAt: string }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatar?: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  productType: string;
  imagePath: string;
  mobileImagePath?: string;
  imageAlt?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}
