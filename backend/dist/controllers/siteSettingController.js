"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSiteSetting = exports.getSiteSettings = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const asyncTimeout_1 = require("../utils/asyncTimeout");
const DEFAULT_SETTINGS = {
    header_config: JSON.stringify({
        logoUrl: '/assets/logo.svg',
        logoImage: '/assets/logo.svg',
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
    header_settings: JSON.stringify({
        logoUrl: '/assets/logo.svg',
        logoImage: '/assets/logo.svg',
        logoWidth: '180px',
        announcementText: 'FREE WORLDWIDE SHIPPING ✦',
        announcementEnabled: true,
        announcementBg: '#12161a',
        announcementTextColor: '#fffdf9',
        headerBg: '#ffffff',
        stickyHeader: true,
        showSearch: true,
        showWishlist: true,
        showAccount: true,
        showCart: true,
    }),
    footer_config: JSON.stringify({
        logoUrl: '/assets/logo.svg',
        logoImage: '/assets/logo.svg',
        logoWidth: '160px',
        brandDescription: 'AethelCarats crafts exquisite lab-grown and natural diamond jewelry with unmatched artistry, ethical sourcing, and timeless elegance.',
        copyrightText: '© 2026 AETHELCARATS FINE JEWELLERY ATELIER. ALL RIGHTS RESERVED.',
        contactEmail: 'contact@aethelcarats.com',
        contactPhone: '+91 79902 78892',
        whatsappNumber: '917990278892',
        address: 'Surat, India',
        socialLinks: [
            { platform: 'Instagram', url: 'https://www.instagram.com/aethelcarats' },
            { platform: 'Facebook', url: 'https://facebook.com/aethelcarats' },
            { platform: 'WhatsApp', url: 'https://wa.me/917990278892' },
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
        inquiryNumber: '917990278892',
        displayNumber: '+91 79902 78892',
        defaultMessage: 'Hello AethelCarats Atelier, I am interested in your fine jewellery collection.',
    }),
    consult_expert_config: JSON.stringify({
        enableConsultAtelierExpert: 'true',
        consultTitle: 'Consult an AethelCarats Atelier Expert',
        consultDescription: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.',
        consultPhone: '+91 79902 78892',
        consultPhoneLabel: 'Call AethelCarats Atelier',
        consultEmail: 'contact@aethelcarats.com',
        consultEmailLabel: 'Email Concierge',
        consultCloseLabel: 'Close',
    }),
};
const getSiteSettings = async (req, res) => {
    const keys = req.query.keys || req.params.key; // comma separated or single key
    const result = {
        storeName: 'AETHELCARATS FINE JEWELLERY ATELIER',
        contactEmail: 'contact@aethelcarats.com',
        contactPhone: '+91 79902 78892',
        whatsappNumber: '917990278892',
        whatsappDisplayNumber: '+91 79902 78892',
        whatsappDefaultMessage: 'Hello AethelCarats Atelier, I am interested in your fine jewellery collection.',
        freeShippingThreshold: '1000',
        publicSiteUrl: 'https://aethelcarats.com',
        instagramUrl: 'https://www.instagram.com/aethelcarats',
        facebookUrl: 'https://facebook.com/aethelcarats',
        pinterestUrl: 'https://pinterest.com/aethelcarats',
        storeAddress: 'Surat, India',
        enableConsultAtelierExpert: 'true',
        consultTitle: 'Consult an AethelCarats Atelier Expert',
        consultDescription: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.',
        consultPhone: '+91 79902 78892',
        consultPhoneLabel: 'Call AethelCarats Atelier',
        consultEmail: 'contact@aethelcarats.com',
        consultEmailLabel: 'Email Concierge',
        consultCloseLabel: 'Close',
    };
    // Populate defaults first
    Object.keys(DEFAULT_SETTINGS).forEach((k) => {
        try {
            result[k] = JSON.parse(DEFAULT_SETTINGS[k]);
        }
        catch (e) {
            result[k] = DEFAULT_SETTINGS[k];
        }
    });
    try {
        const settings = await (0, asyncTimeout_1.withTimeout)(prisma_1.default.siteSetting.findMany(), 2000, []);
        // Pass 1: Parse and store every setting as parsed JSON or string
        settings.forEach((s) => {
            let parsed;
            try {
                parsed = JSON.parse(s.value);
            }
            catch (e) {
                parsed = s.value;
            }
            result[s.key] = parsed;
            if (s.key === 'site_settings' && typeof parsed === 'object' && parsed !== null) {
                Object.assign(result, parsed);
            }
            if (s.key === 'header_settings' && typeof parsed === 'object' && parsed !== null) {
                result.header_settings = parsed;
                result.header_config = { ...(result.header_config || {}), ...parsed };
            }
            if (s.key === 'header_config' && typeof parsed === 'object' && parsed !== null) {
                result.header_config = parsed;
                result.header_settings = { ...(result.header_settings || {}), ...parsed };
            }
            if (s.key === 'footer_settings' && typeof parsed === 'object' && parsed !== null) {
                if (parsed.brandName)
                    result.storeName = parsed.brandName;
                if (parsed.email)
                    result.contactEmail = parsed.email;
                if (parsed.phone)
                    result.contactPhone = parsed.phone;
                if (parsed.address)
                    result.storeAddress = parsed.address;
                if (parsed.instagram)
                    result.instagramUrl = parsed.instagram;
                if (parsed.facebook)
                    result.facebookUrl = parsed.facebook;
                if (parsed.pinterest)
                    result.pinterestUrl = parsed.pinterest;
                result.footer_settings = parsed;
            }
            if (s.key === 'footer_config' && typeof parsed === 'object' && parsed !== null) {
                if (parsed.contactEmail)
                    result.contactEmail = parsed.contactEmail;
                if (parsed.contactPhone)
                    result.contactPhone = parsed.contactPhone;
                if (parsed.address)
                    result.storeAddress = parsed.address;
                result.footer_config = parsed;
            }
        });
    }
    catch (error) {
        console.warn('getSiteSettings database warning (returning default settings fallback):', error);
    }
    if (keys) {
        const keyList = keys.split(',').map((k) => k.trim());
        const filtered = {};
        keyList.forEach((k) => {
            if (result[k] !== undefined)
                filtered[k] = result[k];
        });
        return res.json(filtered);
    }
    res.json(result);
};
exports.getSiteSettings = getSiteSettings;
const updateSiteSetting = async (req, res) => {
    try {
        const { key, value } = req.body;
        if (!key || value === undefined) {
            return res.status(400).json({ message: 'Key and Value are required' });
        }
        const stringifiedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        const setting = await prisma_1.default.siteSetting.upsert({
            where: { key },
            update: { value: stringifiedValue },
            create: { key, value: stringifiedValue },
        });
        // When updating header_settings or header_config, keep both in sync
        if ((key === 'header_settings' || key === 'header_config') && typeof value === 'object' && value !== null) {
            const otherKey = key === 'header_settings' ? 'header_config' : 'header_settings';
            await prisma_1.default.siteSetting.upsert({
                where: { key: otherKey },
                update: { value: stringifiedValue },
                create: { key: otherKey, value: stringifiedValue },
            });
            const logo = value.logoUrl || value.logoImage;
            if (logo) {
                await prisma_1.default.siteSetting.upsert({
                    where: { key: 'storeLogo' },
                    update: { value: String(logo) },
                    create: { key: 'storeLogo', value: String(logo) },
                });
            }
        }
        // When updating footer_settings, keep footer_config in sync with the exact full payload
        if (key === 'footer_settings' && typeof value === 'object' && value !== null) {
            await prisma_1.default.siteSetting.upsert({
                where: { key: 'footer_config' },
                update: { value: stringifiedValue },
                create: { key: 'footer_config', value: stringifiedValue },
            });
            if (value.email) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'contactEmail' }, update: { value: String(value.email) }, create: { key: 'contactEmail', value: String(value.email) } });
            }
            if (value.phone) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'contactPhone' }, update: { value: String(value.phone) }, create: { key: 'contactPhone', value: String(value.phone) } });
            }
            if (value.address) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'storeAddress' }, update: { value: String(value.address) }, create: { key: 'storeAddress', value: String(value.address) } });
            }
            if (value.brandName) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'storeName' }, update: { value: String(value.brandName) }, create: { key: 'storeName', value: String(value.brandName) } });
            }
            if (value.instagram) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'instagramUrl' }, update: { value: String(value.instagram) }, create: { key: 'instagramUrl', value: String(value.instagram) } });
            }
            if (value.facebook) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'facebookUrl' }, update: { value: String(value.facebook) }, create: { key: 'facebookUrl', value: String(value.facebook) } });
            }
            if (value.pinterest) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'pinterestUrl' }, update: { value: String(value.pinterest) }, create: { key: 'pinterestUrl', value: String(value.pinterest) } });
            }
        }
        // When updating footer_config, keep footer_settings in sync with the exact full payload
        if (key === 'footer_config' && typeof value === 'object' && value !== null) {
            await prisma_1.default.siteSetting.upsert({
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
            await prisma_1.default.siteSetting.upsert({
                where: { key: 'whatsapp_config' },
                update: { value: JSON.stringify(waConfig) },
                create: { key: 'whatsapp_config', value: JSON.stringify(waConfig) },
            });
            await prisma_1.default.siteSetting.upsert({
                where: { key: 'whatsappNumber' },
                update: { value: waNumber },
                create: { key: 'whatsappNumber', value: waNumber },
            });
        }
        // Audit log (safe try-catch so it never fails setting update)
        if (req.user && req.user.id) {
            try {
                await prisma_1.default.activityLog.create({
                    data: {
                        userId: req.user.id,
                        action: 'UPDATE_SITE_SETTING',
                        object: `SiteSetting [${key}]`,
                        newValue: `Updated ${key} configuration`,
                    },
                });
            }
            catch (logErr) {
                // Ignored if user is an employee or table constraint
            }
        }
        let parsedVal = setting.value;
        try {
            parsedVal = JSON.parse(setting.value);
        }
        catch (e) { }
        res.json({ key: setting.key, value: parsedVal });
    }
    catch (error) {
        console.error('updateSiteSetting error:', error);
        res.status(500).json({ message: 'Error updating site setting' });
    }
};
exports.updateSiteSetting = updateSiteSetting;
