import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

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
    brandDescription: 'Floksy Jewel crafts exquisite lab-grown and natural diamond jewelry with unmatched artistry, ethical sourcing, and timeless elegance.',
    copyrightText: '© 2026 FLOKSY JEWEL. ALL RIGHTS RESERVED.',
    contactEmail: 'contact@floksyjewel.com',
    contactPhone: '+91973785306',
    whatsappNumber: '+91973785306',
    address: 'Surat, India',
    socialLinks: [
      { platform: 'Instagram', url: 'https://www.instagram.com/bhumi_floksyjewel?igsh=MTAxdHVtcTdqcXRldg==' },
      { platform: 'Facebook', url: 'https://facebook.com/floksyjewel' },
      { platform: 'WhatsApp', url: 'https://wa.me/91973785306' },
    ],
    columns: [
      {
        title: 'FLOKSY JEWEL',
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
    defaultMessage: 'Hello Floksy Jewel, I am interested in your fine jewellery collection.',
  }),

  consult_expert_config: JSON.stringify({
    enableConsultAtelierExpert: 'true',
    consultTitle: 'Consult a Floksy Jewel Expert',
    consultDescription: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.',
    consultPhone: '+91973785306',
    consultPhoneLabel: 'Call Floksy Jewel',
    consultEmail: 'contact@floksyjewel.com',
    consultEmailLabel: 'Email Concierge',
    consultCloseLabel: 'Close',
  }),
};

export const getSiteSettings = async (req: Request, res: Response) => {
  const keys = req.query.keys as string; // comma separated or single key

  const result: Record<string, any> = {
    storeName: 'FLOKSY JEWEL',
    contactEmail: 'contact@floksyjewel.com',
    contactPhone: '+91973785306',
    whatsappNumber: '+91973785306',
    whatsappDisplayNumber: '+91973785306',
    whatsappDefaultMessage: 'Hello Floksy Jewel, I am interested in your fine jewellery collection.',
    freeShippingThreshold: '1000',
    publicSiteUrl: 'https://floksyjewel.com',
    instagramUrl: 'https://www.instagram.com/bhumi_floksyjewel?igsh=MTAxdHVtcTdqcXRldg==',
    facebookUrl: 'https://facebook.com/floksyjewel',
    pinterestUrl: 'https://pinterest.com/floksyjewel',
    storeAddress: 'Surat, India',
    enableConsultAtelierExpert: 'true',
    consultTitle: 'Consult a Floksy Jewel Expert',
    consultDescription: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.',
    consultPhone: '+91973785306',
    consultPhoneLabel: 'Call Floksy Jewel',
    consultEmail: 'contact@floksyjewel.com',
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
    const settings = await prisma.siteSetting.findMany();
    const siteSettingsExplicitKeys = new Set<string>();

    // Pass 1: Unpack composite JSON config objects
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
        Object.keys(parsed).forEach((k) => siteSettingsExplicitKeys.add(k));
      }
      if (s.key === 'footer_settings' && typeof parsed === 'object' && parsed !== null) {
        if (parsed.address && (parsed.address.includes('London') || parsed.address.includes('Mayfair'))) parsed.address = 'Surat, India';
        if (parsed.copyrightText && parsed.copyrightText.includes('Mayfair')) parsed.copyrightText = '© 2026 Floksy Jewel. All Rights Reserved.';
        if (parsed.brandName && parsed.brandName.includes('Mayfair')) parsed.brandName = 'FLOKSY JEWEL';
        if (!parsed.instagram || parsed.instagram === 'https://instagram.com/floksyjewel') parsed.instagram = 'https://www.instagram.com/bhumi_floksyjewel?igsh=MTAxdHVtcTdqcXRldg==';

        if (parsed.brandName !== undefined && !siteSettingsExplicitKeys.has('storeName')) result.storeName = parsed.brandName;
        if (parsed.email !== undefined && !siteSettingsExplicitKeys.has('contactEmail')) result.contactEmail = parsed.email;
        if (parsed.phone !== undefined && !siteSettingsExplicitKeys.has('contactPhone')) result.contactPhone = parsed.phone;
        if (parsed.address !== undefined && !siteSettingsExplicitKeys.has('storeAddress')) result.storeAddress = parsed.address;
        if (parsed.instagram !== undefined && !siteSettingsExplicitKeys.has('instagramUrl')) result.instagramUrl = parsed.instagram;
        if (parsed.facebook !== undefined && !siteSettingsExplicitKeys.has('facebookUrl')) result.facebookUrl = parsed.facebook;
        if (parsed.pinterest !== undefined && !siteSettingsExplicitKeys.has('pinterestUrl')) result.pinterestUrl = parsed.pinterest;
        result.footer_settings = parsed;
      }
      if (s.key === 'footer_config' && typeof parsed === 'object' && parsed !== null) {
        if (parsed.address && (parsed.address.includes('London') || parsed.address.includes('Mayfair'))) parsed.address = 'Surat, India';
        if (parsed.contactEmail !== undefined && !siteSettingsExplicitKeys.has('contactEmail')) result.contactEmail = parsed.contactEmail;
        if (parsed.contactPhone !== undefined && !siteSettingsExplicitKeys.has('contactPhone')) result.contactPhone = parsed.contactPhone;
        if (parsed.address !== undefined && !siteSettingsExplicitKeys.has('storeAddress')) result.storeAddress = parsed.address;
        result.footer_config = parsed;
      }
      if (s.key === 'whatsapp_config' && typeof parsed === 'object' && parsed !== null) {
        if (parsed.inquiryNumber !== undefined && !siteSettingsExplicitKeys.has('whatsappNumber')) result.whatsappNumber = parsed.inquiryNumber;
        if (parsed.displayNumber !== undefined && !siteSettingsExplicitKeys.has('whatsappDisplayNumber')) result.whatsappDisplayNumber = parsed.displayNumber;
        if (parsed.defaultMessage !== undefined && !siteSettingsExplicitKeys.has('whatsappDefaultMessage')) result.whatsappDefaultMessage = parsed.defaultMessage;
      }
      if (s.key === 'consult_expert_config' && typeof parsed === 'object' && parsed !== null) {
        if (parsed.enableConsultAtelierExpert !== undefined && !siteSettingsExplicitKeys.has('enableConsultAtelierExpert')) result.enableConsultAtelierExpert = String(parsed.enableConsultAtelierExpert);
        if (parsed.consultTitle !== undefined && !siteSettingsExplicitKeys.has('consultTitle')) result.consultTitle = parsed.consultTitle;
        if (parsed.consultDescription !== undefined && !siteSettingsExplicitKeys.has('consultDescription')) result.consultDescription = parsed.consultDescription;
        if (parsed.consultPhone !== undefined && !siteSettingsExplicitKeys.has('consultPhone')) result.consultPhone = parsed.consultPhone;
        if (parsed.consultPhoneLabel !== undefined && !siteSettingsExplicitKeys.has('consultPhoneLabel')) result.consultPhoneLabel = parsed.consultPhoneLabel;
        if (parsed.consultEmail !== undefined && !siteSettingsExplicitKeys.has('consultEmail')) result.consultEmail = parsed.consultEmail;
        if (parsed.consultEmailLabel !== undefined && !siteSettingsExplicitKeys.has('consultEmailLabel')) result.consultEmailLabel = parsed.consultEmailLabel;
        if (parsed.consultCloseLabel !== undefined && !siteSettingsExplicitKeys.has('consultCloseLabel')) result.consultCloseLabel = parsed.consultCloseLabel;
      }
    });

    // Pass 2: Direct scalar keys stored in siteSetting table take highest precedence
    settings.forEach((s) => {
      let parsed: any;
      try {
        parsed = JSON.parse(s.value);
      } catch (e) {
        parsed = s.value;
      }
      if (typeof parsed !== 'object' || parsed === null) {
        result[s.key] = parsed;
      }
    });

    // Auto-sanitize old pre-existing database default values if present
    if (!result.instagramUrl || result.instagramUrl === 'https://instagram.com/floksyjewel' || result.instagramUrl === 'https://instagram.com/floksyjewel/') {
      result.instagramUrl = 'https://www.instagram.com/bhumi_floksyjewel?igsh=MTAxdHVtcTdqcXRldg==';
    }
    if (!result.storeAddress || result.storeAddress.includes('London') || result.storeAddress.includes('Mayfair')) {
      result.storeAddress = 'Surat, India';
    }
    if (result.footer_settings && typeof result.footer_settings === 'object') {
      if (result.footer_settings.instagram === 'https://instagram.com/floksyjewel' || !result.footer_settings.instagram) {
        result.footer_settings.instagram = 'https://www.instagram.com/bhumi_floksyjewel?igsh=MTAxdHVtcTdqcXRldg==';
      }
      if (result.footer_settings.address && (result.footer_settings.address.includes('London') || result.footer_settings.address.includes('Mayfair'))) {
        result.footer_settings.address = 'Surat, India';
      }
      if (result.footer_settings.copyrightText && result.footer_settings.copyrightText.includes('Mayfair')) {
        result.footer_settings.copyrightText = '© 2026 Floksy Jewel. All Rights Reserved.';
      }
    }
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

    // Unpack composite objects or site_settings into individual scalar database rows
    if (typeof value === 'object' && value !== null) {
      for (const k of Object.keys(value)) {
        if (value[k] !== undefined && value[k] !== null) {
          const valStr = typeof value[k] === 'object' ? JSON.stringify(value[k]) : String(value[k]);
          await prisma.siteSetting.upsert({
            where: { key: k },
            update: { value: valStr },
            create: { key: k, value: valStr },
          });
        }
      }
    }

    // Sync scalar social keys with footer_settings dictionary
    if (key === 'instagramUrl' || key === 'facebookUrl' || key === 'pinterestUrl') {
      const fieldMap: Record<string, string> = {
        instagramUrl: 'instagram',
        facebookUrl: 'facebook',
        pinterestUrl: 'pinterest',
      };
      const footerField = fieldMap[key];
      const existingFooterRow = await prisma.siteSetting.findUnique({ where: { key: 'footer_settings' } }).catch(() => null);
      let existingFooter: any = {};
      if (existingFooterRow?.value) {
        try {
          existingFooter = JSON.parse(existingFooterRow.value);
        } catch (e) {}
      }
      existingFooter[footerField] = String(value);
      await prisma.siteSetting.upsert({
        where: { key: 'footer_settings' },
        update: { value: JSON.stringify(existingFooter) },
        create: { key: 'footer_settings', value: JSON.stringify(existingFooter) },
      });
    }

    // Sync whatsapp_config
    if (key === 'whatsappNumber' || (typeof value === 'object' && value !== null && (value.whatsappNumber || value.inquiryNumber))) {
      const waNumber = (typeof value === 'object' ? (value.whatsappNumber || value.inquiryNumber) : value || '').replace(/[^\d+]/g, '');
      const waConfig = {
        inquiryNumber: waNumber,
        displayNumber: typeof value === 'object' ? (value.whatsappDisplayNumber || value.displayNumber || waNumber) : waNumber,
        defaultMessage: typeof value === 'object' ? (value.whatsappDefaultMessage || value.defaultMessage || 'Hello Floksy Jewel, I am interested in your fine jewellery collection.') : 'Hello Floksy Jewel, I am interested in your fine jewellery collection.',
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

    // Sync footer_settings safely by preserving existing DB settings
    if (typeof value === 'object' && value !== null) {
      const existingFooterRow = await prisma.siteSetting.findUnique({ where: { key: 'footer_settings' } }).catch(() => null);
      let existingFooter: any = {};
      if (existingFooterRow?.value) {
        try {
          existingFooter = JSON.parse(existingFooterRow.value);
        } catch (e) {}
      }

      const email = value.contactEmail || value.email || existingFooter.email || '';
      const phone = value.contactPhone || value.phone || existingFooter.phone || '';
      const instagram = value.instagramUrl || value.instagram || existingFooter.instagram || '';
      const facebook = value.facebookUrl || value.facebook || existingFooter.facebook || '';
      const pinterest = value.pinterestUrl || value.pinterest || existingFooter.pinterest || '';

      const fSettings = {
        ...existingFooter,
        brandName: value.storeName || existingFooter.brandName || 'FLOKSY JEWEL',
        tagline: existingFooter.tagline || 'Fine Jewelry & Certified Solitaire Diamonds',
        copyrightText: existingFooter.copyrightText || '© 2026 FLOKSY JEWEL. ALL RIGHTS RESERVED.',
        email,
        phone,
        address: value.storeAddress || value.address || existingFooter.address || 'Surat, India',
        instagram,
        facebook,
        pinterest,
      };

      await prisma.siteSetting.upsert({
        where: { key: 'footer_settings' },
        update: { value: JSON.stringify(fSettings) },
        create: { key: 'footer_settings', value: JSON.stringify(fSettings) },
      });

      if (email) {
        await prisma.siteSetting.upsert({
          where: { key: 'contactEmail' },
          update: { value: email },
          create: { key: 'contactEmail', value: email },
        });
      }
      if (phone) {
        await prisma.siteSetting.upsert({
          where: { key: 'contactPhone' },
          update: { value: phone },
          create: { key: 'contactPhone', value: phone },
        });
      }
      if (instagram) {
        await prisma.siteSetting.upsert({
          where: { key: 'instagramUrl' },
          update: { value: instagram },
          create: { key: 'instagramUrl', value: instagram },
        });
      }
      if (facebook) {
        await prisma.siteSetting.upsert({
          where: { key: 'facebookUrl' },
          update: { value: facebook },
          create: { key: 'facebookUrl', value: facebook },
        });
      }
      if (pinterest) {
        await prisma.siteSetting.upsert({
          where: { key: 'pinterestUrl' },
          update: { value: pinterest },
          create: { key: 'pinterestUrl', value: pinterest },
        });
      }
    }

    // Audit log
    if (req.user && req.user.id) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'UPDATE_SITE_SETTING',
          object: `SiteSetting [${key}]`,
          newValue: `Updated ${key} configuration`,
        },
      });
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
