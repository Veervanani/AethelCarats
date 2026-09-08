"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
async function cleanSettings() {
    console.log('Cleaning database site settings...');
    // 1. Update whatsappNumber scalar
    await prisma_1.default.siteSetting.upsert({
        where: { key: 'whatsappNumber' },
        update: { value: '+91 79902 78892' },
        create: { key: 'whatsappNumber', value: '+91 79902 78892' },
    });
    // 2. Update storeName scalar
    await prisma_1.default.siteSetting.upsert({
        where: { key: 'storeName' },
        update: { value: 'AETHELCARATS FINE JEWELLERY ATELIER' },
        create: { key: 'storeName', value: 'AETHELCARATS FINE JEWELLERY ATELIER' },
    });
    // 3. Update storeAddress scalar
    await prisma_1.default.siteSetting.upsert({
        where: { key: 'storeAddress' },
        update: { value: 'Surat, Gujarat, India' },
        create: { key: 'storeAddress', value: 'Surat, Gujarat, India' },
    });
    // 4. Update whatsapp_config
    const waConfig = {
        inquiryNumber: '917990278892',
        displayNumber: '+91 79902 78892',
        defaultMessage: 'Hello AethelCarats, I am interested in your fine jewellery and certified diamonds.',
    };
    await prisma_1.default.siteSetting.upsert({
        where: { key: 'whatsapp_config' },
        update: { value: JSON.stringify(waConfig) },
        create: { key: 'whatsapp_config', value: JSON.stringify(waConfig) },
    });
    // 5. Update footer_settings
    const existingFooterRow = await prisma_1.default.siteSetting.findUnique({ where: { key: 'footer_settings' } }).catch(() => null);
    let existingFooter = {};
    if (existingFooterRow?.value) {
        try {
            existingFooter = JSON.parse(existingFooterRow.value);
        }
        catch (e) { }
    }
    const fSettings = {
        ...existingFooter,
        brandName: 'AETHELCARATS FINE JEWELLERY ATELIER',
        copyrightText: '© 2026 AETHELCARATS. ALL RIGHTS RESERVED.',
        tagline: 'Bespoke Luxury & Certified Solitaire Diamonds',
        address: 'Surat, Gujarat, India',
        phone: '+91 79902 78892',
        email: 'contact@aethelcarats.com',
    };
    await prisma_1.default.siteSetting.upsert({
        where: { key: 'footer_settings' },
        update: { value: JSON.stringify(fSettings) },
        create: { key: 'footer_settings', value: JSON.stringify(fSettings) },
    });
    console.log('Site settings database cleanup complete!');
}
cleanSettings()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
