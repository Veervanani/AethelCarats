import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';
import { withTimeout } from '../utils/asyncTimeout';

const DEFAULT_SETTINGS: Record<string, any> = {
  header_config: JSON.stringify({
    logoUrl: '/assets/logo.svg',
    mobileLogoUrl: '/assets/logo-mobile.svg',
    logoLink: '/',
    logoWidth: '180px',
    topbarText: 'FREE WORLDWIDE SHIPPING ✦',
    topbarLink: '/bespoke-service',
    topbarVisible: true,
    showSearch: true,
    showAccount: true,
    showWishlist: true,
    showCart: true,
  }),

  footer_config: JSON.stringify({
    logoUrl: '/assets/logo.svg',
    brandDescription: 'Aura Diamond Atelier crafts exquisite lab-grown and natural diamond jewelry with unmatched artistry, ethical sourcing, and timeless elegance.',
    copyrightText: '© 2026 AURA DIAMOND ATELIER. ALL RIGHTS RESERVED.',
    contactEmail: 'contact@auroradiamonds.com',
    contactPhone: '+91973785306',
    whatsappNumber: '+91973785306',
    address: 'Surat, India',
    socialLinks: [
      { platform: 'Instagram', url: 'https://www.instagram.com/auradiamondatelier' },
      { platform: 'Facebook', url: 'https://facebook.com/aurajewel' },
      { platform: 'WhatsApp', url: 'https://wa.me/91973785306' },
    ],
    columns: [
      {
        title: 'AURA DIAMOND ATELIER',
        links: [
          { label: 'About Us', url: '/about-us' },
          { label: 'Bespoke Service', url: '/bespoke-service' },
          { label: 'Sustainability', url: '/sustainability' },
          { label: 'Contact Us', url: '/contact-us' },
        ],
      },
      {
        title: 'CLIENT CARE',
        links: [
          { label: 'Shipping & Delivery', url: '/shipping-delivery' },
          { label: 'Returns & Refunds', url: '/returns-refunds' },
          { label: 'Jewellery Care', url: '/jewellery-care' },
          { label: 'FAQ', url: '/pages/faq' },
        ],
      },
      {
        title: 'LEGAL & PRIVACY',
        links: [
          { label: 'Privacy Policy', url: '/privacy-policy' },
          { label: 'Terms of Service', url: '/terms-of-service' },
          { label: 'Billing Terms', url: '/billing-terms-conditions' },
        ],
      },
    ],
  }),

  global_theme_config: JSON.stringify({
    primaryColor: '#1f1f1f',
    secondaryColor: '#c9a45c',
    accentColor: '#b8944d',
    backgroundColor: '#ffffff',
    textColor: '#1f1f1f',
    borderColor: '#d9d3c7',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
    buttonRadius: '2px',
    containerWidth: '1280px',
  }),

  storefront_labels_config: JSON.stringify({
    addToCart: 'ADD TO SHOPPING BAG',
    requestQuote: 'REQUEST QUOTE',
    shopNow: 'DISCOVER COLLECTION',
    viewCollection: 'VIEW COLLECTION',
    signIn: 'SIGN IN',
    createAccount: 'CREATE ACCOUNT',
    contactUs: 'CONTACT US',
    learnMore: 'DISCOVER MORE',
    clearAll: 'CLEAR FILTERS',
    noResults: 'NO FINE JEWELLERY MATCHES YOUR SELECTION',
  }),

  whatsapp_config: JSON.stringify({
    inquiryNumber: '+91973785306',
    displayNumber: '+91973785306',
    defaultMessage: 'Hello Aura Diamond Atelier, I am interested in your fine jewellery collection.',
  }),

  consult_expert_config: JSON.stringify({
    enableConsultAtelierExpert: 'true',
    consultTitle: 'Consult a Aura Diamond Atelier Expert',
    consultDescription: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.',
    consultPhone: '+91973785306',
    consultPhoneLabel: 'Call Aura Diamond Atelier',
    consultEmail: 'contact@auroradiamonds.com',
    consultEmailLabel: 'Email Concierge',
    consultCloseLabel: 'Close',
  }),
};

export const getSiteSettings = async (req: Request, res: Response) => {
  const keys = (req.query.keys as string) || req.params.key; // comma separated or single key

  const result: Record<string, any> = {
    storeName: 'AURA DIAMOND ATELIER',
    contactEmail: 'contact@auroradiamonds.com',
    contactPhone: '+91973785306',
    whatsappNumber: '+91973785306',
    whatsappDisplayNumber: '+91973785306',
    whatsappDefaultMessage: 'Hello Aura Diamond Atelier, I am interested in your fine jewellery collection.',
    freeShippingThreshold: '1000',
    publicSiteUrl: 'https://auroradiamonds.com',
    instagramUrl: 'https://www.instagram.com/auradiamondatelier',
    facebookUrl: 'https://facebook.com/aurajewel',
    pinterestUrl: 'https://pinterest.com/aurajewel',
    storeAddress: 'Surat, India',
    enableConsultAtelierExpert: 'true',
    consultTitle: 'Consult a Aura Diamond Atelier Expert',
    consultDescription: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.',
    consultPhone: '+91973785306',
    consultPhoneLabel: 'Call Aura Diamond Atelier',
    consultEmail: 'contact@auroradiamonds.com',
    consultEmailLabel: 'Email Concierge',
    consultCloseLabel: 'Close',
  };

  // Populate defaults first
  Object.keys(DEFAULT_SETTINGS).forEach((k) => {
    try {
      result[k] = JSON.parse(DEFAULT_SETTINGS[k]);
    } catch (e) {
      result[k] = DEFAULT_SETTINGS[k];
    }
  });

  try {
    const settings = await withTimeout(prisma.siteSetting.findMany(), 2000, []);

    // Pass 1: Parse and store every setting as parsed JSON or string
    settings.forEach((s) => {
      let parsed: any;
      try {
        parsed = JSON.parse(s.value);
      } catch (e) {
        parsed = s.value;
      }
      result[s.key] = parsed;

      if (s.key === 'site_settings' && typeof parsed === 'object' && parsed !== null) {
        Object.assign(result, parsed);
      }
      if (s.key === 'footer_settings' && typeof parsed === 'object' && parsed !== null) {
        if (parsed.brandName) result.storeName = parsed.brandName;
        if (parsed.email) result.contactEmail = parsed.email;
        if (parsed.phone) result.contactPhone = parsed.phone;
        if (parsed.address) result.storeAddress = parsed.address;
        if (parsed.instagram) result.instagramUrl = parsed.instagram;
        if (parsed.facebook) result.facebookUrl = parsed.facebook;
        if (parsed.pinterest) result.pinterestUrl = parsed.pinterest;
        result.footer_settings = parsed;
      }
      if (s.key === 'footer_config' && typeof parsed === 'object' && parsed !== null) {
        if (parsed.contactEmail) result.contactEmail = parsed.contactEmail;
        if (parsed.contactPhone) result.contactPhone = parsed.contactPhone;
        if (parsed.address) result.storeAddress = parsed.address;
        result.footer_config = parsed;
      }
    });
  } catch (error) {
    console.warn('getSiteSettings database warning (returning default settings fallback):', error);
  }

  if (keys) {
    const keyList = keys.split(',').map((k) => k.trim());
    const filtered: Record<string, any> = {};
    keyList.forEach((k) => {
      if (result[k] !== undefined) filtered[k] = result[k];
    });
    return res.json(filtered);
  }

  res.json(result);
};

export const updateSiteSetting = async (req: AuthRequest, res: Response) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ message: 'Key and Value are required' });
    }

    const stringifiedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: stringifiedValue },
      create: { key, value: stringifiedValue },
    });

    // When updating footer_settings, keep footer_config in sync with the exact full payload
    if (key === 'footer_settings' && typeof value === 'object' && value !== null) {
      await prisma.siteSetting.upsert({
        where: { key: 'footer_config' },
        update: { value: stringifiedValue },
        create: { key: 'footer_config', value: stringifiedValue },
      });
      if (value.email) {
        await prisma.siteSetting.upsert({ where: { key: 'contactEmail' }, update: { value: String(value.email) }, create: { key: 'contactEmail', value: String(value.email) } });
      }
      if (value.phone) {
        await prisma.siteSetting.upsert({ where: { key: 'contactPhone' }, update: { value: String(value.phone) }, create: { key: 'contactPhone', value: String(value.phone) } });
      }
      if (value.address) {
        await prisma.siteSetting.upsert({ where: { key: 'storeAddress' }, update: { value: String(value.address) }, create: { key: 'storeAddress', value: String(value.address) } });
      }
      if (value.brandName) {
        await prisma.siteSetting.upsert({ where: { key: 'storeName' }, update: { value: String(value.brandName) }, create: { key: 'storeName', value: String(value.brandName) } });
      }
      if (value.instagram) {
        await prisma.siteSetting.upsert({ where: { key: 'instagramUrl' }, update: { value: String(value.instagram) }, create: { key: 'instagramUrl', value: String(value.instagram) } });
      }
      if (value.facebook) {
        await prisma.siteSetting.upsert({ where: { key: 'facebookUrl' }, update: { value: String(value.facebook) }, create: { key: 'facebookUrl', value: String(value.facebook) } });
      }
      if (value.pinterest) {
        await prisma.siteSetting.upsert({ where: { key: 'pinterestUrl' }, update: { value: String(value.pinterest) }, create: { key: 'pinterestUrl', value: String(value.pinterest) } });
      }
    }

    // When updating footer_config, keep footer_settings in sync with the exact full payload
    if (key === 'footer_config' && typeof value === 'object' && value !== null) {
      await prisma.siteSetting.upsert({
        where: { key: 'footer_settings' },
        update: { value: stringifiedValue },
        create: { key: 'footer_settings', value: stringifiedValue },
      });
    }

    // Sync whatsapp_config
    if (key === 'whatsappNumber' || (typeof value === 'object' && value !== null && (value.whatsappNumber || value.inquiryNumber))) {
      const waNumber = (typeof value === 'object' ? (value.whatsappNumber || value.inquiryNumber) : value || '').replace(/[^\d+]/g, '');
      const waConfig = {
        inquiryNumber: waNumber,
        displayNumber: typeof value === 'object' ? (value.whatsappDisplayNumber || value.displayNumber || waNumber) : waNumber,
        defaultMessage: typeof value === 'object' ? (value.whatsappDefaultMessage || value.defaultMessage || 'Hello Aura Diamond Atelier, I am interested in your fine jewellery collection.') : 'Hello Aura Diamond Atelier, I am interested in your fine jewellery collection.',
      };
      await prisma.siteSetting.upsert({
        where: { key: 'whatsapp_config' },
        update: { value: JSON.stringify(waConfig) },
        create: { key: 'whatsapp_config', value: JSON.stringify(waConfig) },
      });
      await prisma.siteSetting.upsert({
        where: { key: 'whatsappNumber' },
        update: { value: waNumber },
        create: { key: 'whatsappNumber', value: waNumber },
      });
    }

    // Audit log (safe try-catch so it never fails setting update)
    if (req.user && req.user.id) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: req.user.id,
            action: 'UPDATE_SITE_SETTING',
            object: `SiteSetting [${key}]`,
            newValue: `Updated ${key} configuration`,
          },
        });
      } catch (logErr) {
        // Ignored if user is an employee or table constraint
      }
    }

    let parsedVal = setting.value;
    try {
      parsedVal = JSON.parse(setting.value);
    } catch (e) {}

    res.json({ key: setting.key, value: parsedVal });
  } catch (error) {
    console.error('updateSiteSetting error:', error);
    res.status(500).json({ message: 'Error updating site setting' });
  }
};
