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
            dbMap[s.key] = parsed;
            result[s.key] = parsed;
        });
        // 1. Merge site_settings if present, stripping any nested site_settings object
        if (dbMap.site_settings && typeof dbMap.site_settings === 'object') {
            const { site_settings: _nested, ...restSiteSettings } = dbMap.site_settings;
            Object.assign(result, restSiteSettings);
        }
        // 2. WhatsApp Settings Synchronization
        if (dbMap.whatsapp_config && typeof dbMap.whatsapp_config === 'object') {
            result.whatsapp_config = dbMap.whatsapp_config;
            if (dbMap.whatsapp_config.inquiryNumber) {
                result.whatsappNumber = dbMap.whatsapp_config.inquiryNumber;
            }
            if (dbMap.whatsapp_config.displayNumber) {
                result.whatsappDisplayNumber = dbMap.whatsapp_config.displayNumber;
            }
            if (dbMap.whatsapp_config.defaultMessage) {
                result.whatsappDefaultMessage = dbMap.whatsapp_config.defaultMessage;
            }
        }
        if (dbMap.whatsappDisplayNumber && typeof dbMap.whatsappDisplayNumber === 'string') {
            result.whatsappDisplayNumber = dbMap.whatsappDisplayNumber;
        }
        if (dbMap.whatsappNumber && typeof dbMap.whatsappNumber === 'string') {
            result.whatsappNumber = dbMap.whatsappNumber;
        }
        // 3. Consult Atelier Expert Settings Synchronization
        if (dbMap.consult_expert_config && typeof dbMap.consult_expert_config === 'object') {
            result.consult_expert_config = dbMap.consult_expert_config;
            if (dbMap.consult_expert_config.consultPhone) {
                result.consultPhone = dbMap.consult_expert_config.consultPhone;
            }
            if (dbMap.consult_expert_config.consultTitle) {
                result.consultTitle = dbMap.consult_expert_config.consultTitle;
            }
            if (dbMap.consult_expert_config.consultDescription) {
                result.consultDescription = dbMap.consult_expert_config.consultDescription;
            }
            if (dbMap.consult_expert_config.consultPhoneLabel) {
                result.consultPhoneLabel = dbMap.consult_expert_config.consultPhoneLabel;
            }
            if (dbMap.consult_expert_config.consultEmail) {
                result.consultEmail = dbMap.consult_expert_config.consultEmail;
            }
            if (dbMap.consult_expert_config.consultEmailLabel) {
                result.consultEmailLabel = dbMap.consult_expert_config.consultEmailLabel;
            }
            if (dbMap.consult_expert_config.consultCloseLabel) {
                result.consultCloseLabel = dbMap.consult_expert_config.consultCloseLabel;
            }
            if (dbMap.consult_expert_config.enableConsultAtelierExpert !== undefined) {
                result.enableConsultAtelierExpert = String(dbMap.consult_expert_config.enableConsultAtelierExpert);
            }
        }
        if (dbMap.consultPhone && typeof dbMap.consultPhone === 'string') {
            result.consultPhone = dbMap.consultPhone;
        }
        if (dbMap.consultTitle && typeof dbMap.consultTitle === 'string') {
            result.consultTitle = dbMap.consultTitle;
        }
        // 4. Sanitize any legacy "Floksy" mentions to "AethelCarats"
        if (typeof result.consultTitle === 'string' && result.consultTitle.includes('Floksy')) {
            result.consultTitle = result.consultTitle.replace(/Floksy/g, 'AethelCarats');
        }
        if (typeof result.consultDescription === 'string' && result.consultDescription.includes('Floksy')) {
            result.consultDescription = result.consultDescription.replace(/Floksy/g, 'AethelCarats');
        }
        // 5. Header / Footer syncing
        if (dbMap.header_settings && typeof dbMap.header_settings === 'object') {
            result.header_settings = dbMap.header_settings;
            result.header_config = { ...(result.header_config || {}), ...dbMap.header_settings };
        }
        if (dbMap.header_config && typeof dbMap.header_config === 'object') {
            result.header_config = dbMap.header_config;
            result.header_settings = { ...(result.header_settings || {}), ...dbMap.header_config };
        }
        if (dbMap.footer_settings && typeof dbMap.footer_settings === 'object') {
            if (dbMap.footer_settings.brandName)
                result.storeName = dbMap.footer_settings.brandName;
            if (dbMap.footer_settings.email)
                result.contactEmail = dbMap.footer_settings.email;
            if (dbMap.footer_settings.phone)
                result.contactPhone = dbMap.footer_settings.phone;
            if (dbMap.footer_settings.address)
                result.storeAddress = dbMap.footer_settings.address;
            if (dbMap.footer_settings.instagram)
                result.instagramUrl = dbMap.footer_settings.instagram;
            if (dbMap.footer_settings.facebook)
                result.facebookUrl = dbMap.footer_settings.facebook;
            if (dbMap.footer_settings.pinterest)
                result.pinterestUrl = dbMap.footer_settings.pinterest;
            result.footer_settings = dbMap.footer_settings;
        }
        if (dbMap.footer_config && typeof dbMap.footer_config === 'object') {
            if (dbMap.footer_config.contactEmail)
                result.contactEmail = dbMap.footer_config.contactEmail;
            if (dbMap.footer_config.contactPhone)
                result.contactPhone = dbMap.footer_config.contactPhone;
            if (dbMap.footer_config.address)
                result.storeAddress = dbMap.footer_config.address;
            result.footer_config = dbMap.footer_config;
        }
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
        // 1. When updating site_settings (the entire settings blob from AdminSettingsPage)
        if (key === 'site_settings' && typeof value === 'object' && value !== null) {
            const cleanPayload = { ...value };
            delete cleanPayload.site_settings;
            const waNumber = (cleanPayload.whatsappNumber || cleanPayload.inquiryNumber || '+917990278892').toString().replace(/[^\d+]/g, '');
            const waDisplay = (cleanPayload.whatsappDisplayNumber || cleanPayload.displayNumber || waNumber || '+91 79902 78892').toString().trim();
            const waMessage = (cleanPayload.whatsappDefaultMessage || cleanPayload.defaultMessage || 'Hello AethelCarats Atelier, I am interested in your fine jewellery collection.').toString().trim();
            const waConfig = {
                inquiryNumber: waNumber,
                displayNumber: waDisplay,
                defaultMessage: waMessage,
            };
            const consultPhone = (cleanPayload.consultPhone || waDisplay || '+91 79902 78892').toString().trim();
            let consultTitle = (cleanPayload.consultTitle || 'Consult an AethelCarats Atelier Expert').toString().trim();
            if (consultTitle.includes('Floksy')) {
                consultTitle = consultTitle.replace(/Floksy/g, 'AethelCarats');
            }
            const consultDesc = (cleanPayload.consultDescription || 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.').toString().trim();
            const consultPhoneLbl = (cleanPayload.consultPhoneLabel || 'Call Atelier').toString().trim();
            const consultEmail = (cleanPayload.consultEmail || cleanPayload.contactEmail || 'contact@aethelcarats.com').toString().trim();
            const consultEmailLbl = (cleanPayload.consultEmailLabel || 'Email Concierge').toString().trim();
            const consultCloseLbl = (cleanPayload.consultCloseLabel || 'Close').toString().trim();
            const enableConsult = cleanPayload.enableConsultAtelierExpert !== undefined ? String(cleanPayload.enableConsultAtelierExpert) : 'true';
            const consultConfig = {
                enableConsultAtelierExpert: enableConsult,
                consultTitle,
                consultDescription: consultDesc,
                consultPhone,
                consultPhoneLabel: consultPhoneLbl,
                consultEmail,
                consultEmailLabel: consultEmailLbl,
                consultCloseLabel: consultCloseLbl,
            };
            cleanPayload.whatsappNumber = waNumber;
            cleanPayload.whatsappDisplayNumber = waDisplay;
            cleanPayload.whatsappDefaultMessage = waMessage;
            cleanPayload.whatsapp_config = waConfig;
            cleanPayload.consultPhone = consultPhone;
            cleanPayload.consultTitle = consultTitle;
            cleanPayload.consultDescription = consultDesc;
            cleanPayload.consultPhoneLabel = consultPhoneLbl;
            cleanPayload.consultEmail = consultEmail;
            cleanPayload.consultEmailLabel = consultEmailLbl;
            cleanPayload.consultCloseLabel = consultCloseLbl;
            cleanPayload.enableConsultAtelierExpert = enableConsult;
            cleanPayload.consult_expert_config = consultConfig;
            const stringifiedValue = JSON.stringify(cleanPayload);
            await prisma_1.default.siteSetting.upsert({
                where: { key: 'site_settings' },
                update: { value: stringifiedValue },
                create: { key: 'site_settings', value: stringifiedValue },
            });
            await Promise.all([
                prisma_1.default.siteSetting.upsert({ where: { key: 'whatsappNumber' }, update: { value: waNumber }, create: { key: 'whatsappNumber', value: waNumber } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'whatsappDisplayNumber' }, update: { value: waDisplay }, create: { key: 'whatsappDisplayNumber', value: waDisplay } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'whatsappDefaultMessage' }, update: { value: waMessage }, create: { key: 'whatsappDefaultMessage', value: waMessage } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'whatsapp_config' }, update: { value: JSON.stringify(waConfig) }, create: { key: 'whatsapp_config', value: JSON.stringify(waConfig) } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consultPhone' }, update: { value: consultPhone }, create: { key: 'consultPhone', value: consultPhone } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consultTitle' }, update: { value: consultTitle }, create: { key: 'consultTitle', value: consultTitle } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consultDescription' }, update: { value: consultDesc }, create: { key: 'consultDescription', value: consultDesc } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consultPhoneLabel' }, update: { value: consultPhoneLbl }, create: { key: 'consultPhoneLabel', value: consultPhoneLbl } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consultEmail' }, update: { value: consultEmail }, create: { key: 'consultEmail', value: consultEmail } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consultEmailLabel' }, update: { value: consultEmailLbl }, create: { key: 'consultEmailLabel', value: consultEmailLbl } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consultCloseLabel' }, update: { value: consultCloseLbl }, create: { key: 'consultCloseLabel', value: consultCloseLbl } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'enableConsultAtelierExpert' }, update: { value: enableConsult }, create: { key: 'enableConsultAtelierExpert', value: enableConsult } }),
                prisma_1.default.siteSetting.upsert({ where: { key: 'consult_expert_config' }, update: { value: JSON.stringify(consultConfig) }, create: { key: 'consult_expert_config', value: JSON.stringify(consultConfig) } }),
            ]);
            if (cleanPayload.contactPhone) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'contactPhone' }, update: { value: String(cleanPayload.contactPhone) }, create: { key: 'contactPhone', value: String(cleanPayload.contactPhone) } });
                await prisma_1.default.siteSetting.upsert({ where: { key: 'company_phone' }, update: { value: String(cleanPayload.contactPhone) }, create: { key: 'company_phone', value: String(cleanPayload.contactPhone) } });
            }
            if (cleanPayload.contactEmail) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'contactEmail' }, update: { value: String(cleanPayload.contactEmail) }, create: { key: 'contactEmail', value: String(cleanPayload.contactEmail) } });
            }
            if (cleanPayload.storeName) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'storeName' }, update: { value: String(cleanPayload.storeName) }, create: { key: 'storeName', value: String(cleanPayload.storeName) } });
            }
            if (cleanPayload.storeAddress) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'storeAddress' }, update: { value: String(cleanPayload.storeAddress) }, create: { key: 'storeAddress', value: String(cleanPayload.storeAddress) } });
            }
            if (cleanPayload.publicSiteUrl) {
                await prisma_1.default.siteSetting.upsert({ where: { key: 'publicSiteUrl' }, update: { value: String(cleanPayload.publicSiteUrl) }, create: { key: 'publicSiteUrl', value: String(cleanPayload.publicSiteUrl) } });
            }
            return res.json({ key: 'site_settings', value: cleanPayload });
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
                await prisma_1.default.siteSetting.upsert({ where: { key: 'company_phone' }, update: { value: String(value.phone) }, create: { key: 'company_phone', value: String(value.phone) } });
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
        // Sync whatsapp settings
        if (key === 'whatsapp_config' || key === 'whatsappNumber' || key === 'whatsappDisplayNumber') {
            let inquiryNumber = '';
            let displayNumber = '';
            let defaultMessage = 'Hello AethelCarats Atelier, I am interested in your fine jewellery collection.';
            if (key === 'whatsapp_config' && typeof value === 'object' && value !== null) {
                inquiryNumber = (value.inquiryNumber || value.whatsappNumber || '').replace(/[^\d+]/g, '');
                displayNumber = value.displayNumber || value.whatsappDisplayNumber || inquiryNumber;
                defaultMessage = value.defaultMessage || defaultMessage;
            }
            else if (key === 'whatsappNumber') {
                inquiryNumber = String(value).replace(/[^\d+]/g, '');
                displayNumber = String(value);
            }
            else if (key === 'whatsappDisplayNumber') {
                displayNumber = String(value);
                inquiryNumber = String(value).replace(/[^\d+]/g, '');
            }
            if (inquiryNumber) {
                const waConfig = { inquiryNumber, displayNumber: displayNumber || inquiryNumber, defaultMessage };
                await prisma_1.default.siteSetting.upsert({
                    where: { key: 'whatsapp_config' },
                    update: { value: JSON.stringify(waConfig) },
                    create: { key: 'whatsapp_config', value: JSON.stringify(waConfig) },
                });
                await prisma_1.default.siteSetting.upsert({
                    where: { key: 'whatsappNumber' },
                    update: { value: inquiryNumber },
                    create: { key: 'whatsappNumber', value: inquiryNumber },
                });
                if (displayNumber) {
                    await prisma_1.default.siteSetting.upsert({
                        where: { key: 'whatsappDisplayNumber' },
                        update: { value: displayNumber },
                        create: { key: 'whatsappDisplayNumber', value: displayNumber },
                    });
                }
            }
        }
        // Sync Consult Atelier settings
        if (key === 'consult_expert_config' || key === 'consultPhone' || key === 'consultTitle') {
            if (key === 'consult_expert_config' && typeof value === 'object' && value !== null) {
                let title = (value.consultTitle || 'Consult an AethelCarats Atelier Expert').replace(/Floksy/g, 'AethelCarats');
                const phone = value.consultPhone || '+91 79902 78892';
                await Promise.all([
                    prisma_1.default.siteSetting.upsert({ where: { key: 'consultPhone' }, update: { value: phone }, create: { key: 'consultPhone', value: phone } }),
                    prisma_1.default.siteSetting.upsert({ where: { key: 'consultTitle' }, update: { value: title }, create: { key: 'consultTitle', value: title } }),
                ]);
                if (value.consultDescription) {
                    await prisma_1.default.siteSetting.upsert({ where: { key: 'consultDescription' }, update: { value: String(value.consultDescription) }, create: { key: 'consultDescription', value: String(value.consultDescription) } });
                }
                if (value.consultPhoneLabel) {
                    await prisma_1.default.siteSetting.upsert({ where: { key: 'consultPhoneLabel' }, update: { value: String(value.consultPhoneLabel) }, create: { key: 'consultPhoneLabel', value: String(value.consultPhoneLabel) } });
                }
                if (value.enableConsultAtelierExpert !== undefined) {
                    await prisma_1.default.siteSetting.upsert({ where: { key: 'enableConsultAtelierExpert' }, update: { value: String(value.enableConsultAtelierExpert) }, create: { key: 'enableConsultAtelierExpert', value: String(value.enableConsultAtelierExpert) } });
                }
            }
            else if (key === 'consultPhone') {
                const phoneStr = String(value);
                try {
                    const existing = await prisma_1.default.siteSetting.findUnique({ where: { key: 'consult_expert_config' } });
                    if (existing && existing.value) {
                        const parsed = JSON.parse(existing.value);
                        parsed.consultPhone = phoneStr;
                        await prisma_1.default.siteSetting.update({ where: { key: 'consult_expert_config' }, data: { value: JSON.stringify(parsed) } });
                    }
                }
                catch (e) { }
            }
            else if (key === 'consultTitle') {
                let titleStr = String(value).replace(/Floksy/g, 'AethelCarats');
                try {
                    const existing = await prisma_1.default.siteSetting.findUnique({ where: { key: 'consult_expert_config' } });
                    if (existing && existing.value) {
                        const parsed = JSON.parse(existing.value);
                        parsed.consultTitle = titleStr;
                        await prisma_1.default.siteSetting.update({ where: { key: 'consult_expert_config' }, data: { value: JSON.stringify(parsed) } });
                    }
                }
                catch (e) { }
            }
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
