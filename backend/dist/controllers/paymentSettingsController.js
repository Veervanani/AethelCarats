"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicPaymentConfig = exports.updatePaymentSettings = exports.getPaymentSettings = void 0;
const node_crypto_1 = require("node:crypto");
const prisma_1 = __importDefault(require("../prisma"));
const ALL_PAYMENT_KEYS = [
    // PayPal Settings
    'paypal_client_id',
    'paypal_client_secret',
    'paypal_mode',
    'paypal_enabled',
    // Direct Bank Wire / Transfer Settings
    'bank_transfer_enabled',
    'bank_name',
    'bank_account_name',
    'bank_account_number',
    'bank_routing_code',
    'bank_swift_bic',
    'bank_branch_address',
    'bank_payment_instructions',
    // UPI & Digital Settings
    'upi_enabled',
    'upi_id',
    // Company Entity & Billing Info
    'company_name',
    'company_address',
    'company_email',
    'company_phone',
    'company_tax_id',
    'default_currency',
    'default_tax_rate',
    // Invoicing & Receipt Terms
    'invoice_notes',
    'receipt_notes',
    'statement_footer_text',
];
const DEFAULT_PAYMENT_SETTINGS = {
    paypal_client_id: '',
    paypal_client_secret: '',
    paypal_mode: 'live',
    paypal_enabled: 'true',
    bank_transfer_enabled: 'true',
    bank_name: 'HDFC Bank Ltd / Global Wire',
    bank_account_name: 'AETHELCARATS FINE JEWELLERY ATELIER',
    bank_account_number: '50200084920192',
    bank_routing_code: 'HDFC0001234',
    bank_swift_bic: 'HDFCINBBXXX',
    bank_branch_address: 'Surat Diamond Bourse, Gujarat, India',
    bank_payment_instructions: 'Please include your Order Number as the wire transfer reference note. Orders will be processed immediately upon receipt of wire confirmation.',
    upi_enabled: 'false',
    upi_id: 'aethelcarats@okhdfcbank',
    company_name: 'AETHELCARATS FINE JEWELLERY ATELIER',
    company_address: 'Surat Diamond Bourse, Gujarat, India / 740 Fifth Avenue, New York, NY 10019',
    company_email: 'contact@aethelcarats.com',
    company_phone: '+919737853206',
    company_tax_id: 'US-TAX-88492019',
    default_currency: 'USD',
    default_tax_rate: '0',
    invoice_notes: 'Thank you for choosing AethelCarats Fine Jewellery Atelier. Certified authenticity documents accompany all delivered creations.',
    receipt_notes: 'Official payment receipt issued by AethelCarats Fine Jewellery Atelier.',
    statement_footer_text: 'For any payment verification or bespoke wire inquiries, please contact contact@aethelcarats.com or call +919737853206.',
};
const getPaymentSettings = async (req, res) => {
    try {
        const settings = await prisma_1.default.siteSetting.findMany({
            where: { key: { in: ALL_PAYMENT_KEYS } },
        });
        const settingsMap = { ...DEFAULT_PAYMENT_SETTINGS };
        settings.forEach((s) => {
            if (s.value !== undefined && s.value !== null) {
                settingsMap[s.key] = s.value;
            }
        });
        return res.status(200).json(settingsMap);
    }
    catch (error) {
        console.error('getPaymentSettings error:', error);
        return res.status(500).json({ message: 'Error retrieving payment settings from database', error: error?.message });
    }
};
exports.getPaymentSettings = getPaymentSettings;
const updatePaymentSettings = async (req, res) => {
    try {
        const payload = req.body; // Key-value object
        if (!payload || typeof payload !== 'object') {
            return res.status(400).json({ message: 'Invalid payload provided' });
        }
        const updatePromises = Object.entries(payload).map(async ([key, value]) => {
            const valStr = value !== null && value !== undefined ? String(value) : '';
            return prisma_1.default.siteSetting.upsert({
                where: { key },
                update: { value: valStr, updatedAt: new Date() },
                create: { id: (0, node_crypto_1.randomUUID)(), key, value: valStr, updatedAt: new Date() },
            });
        });
        await Promise.all(updatePromises);
        // Non-blocking financial audit log
        try {
            await prisma_1.default.financialAuditLog.create({
                data: {
                    id: (0, node_crypto_1.randomUUID)(),
                    adminUser: req.user?.email || 'Admin',
                    action: 'UPDATED_PAYMENT_SETTINGS',
                    entityType: 'PAYMENT_SETTING',
                    entityId: 'SYSTEM',
                    newValue: 'Payment details and banking configuration saved to database',
                    reason: 'Settings updated via Admin panel',
                },
            });
        }
        catch (auditErr) {
            console.warn('Non-fatal: FinancialAuditLog creation skipped:', auditErr?.message);
        }
        // Return fresh state straight from the database
        const freshSettings = await prisma_1.default.siteSetting.findMany({
            where: { key: { in: ALL_PAYMENT_KEYS } },
        });
        const result = { ...DEFAULT_PAYMENT_SETTINGS };
        freshSettings.forEach((s) => {
            result[s.key] = s.value;
        });
        return res.status(200).json({
            message: 'Payment details saved and updated in database successfully!',
            settings: result,
        });
    }
    catch (error) {
        console.error('updatePaymentSettings error:', error);
        return res.status(500).json({ message: 'Error saving payment settings to database', error: error?.message });
    }
};
exports.updatePaymentSettings = updatePaymentSettings;
const getPublicPaymentConfig = async (req, res) => {
    try {
        const publicKeys = [
            'paypal_client_id',
            'paypal_mode',
            'paypal_enabled',
            'bank_transfer_enabled',
            'bank_name',
            'bank_account_name',
            'bank_account_number',
            'bank_routing_code',
            'bank_swift_bic',
            'bank_branch_address',
            'bank_payment_instructions',
            'upi_enabled',
            'upi_id',
            'default_currency',
            'company_name',
            'company_email',
            'company_phone',
        ];
        const settings = await prisma_1.default.siteSetting.findMany({
            where: { key: { in: publicKeys } },
        });
        const publicMap = {};
        publicKeys.forEach((k) => {
            publicMap[k] = DEFAULT_PAYMENT_SETTINGS[k] || '';
        });
        settings.forEach((s) => {
            if (s.value !== undefined && s.value !== null) {
                publicMap[s.key] = s.value;
            }
        });
        return res.status(200).json(publicMap);
    }
    catch (error) {
        console.error('getPublicPaymentConfig error:', error);
        return res.status(500).json({ message: 'Error loading public payment config', error: error?.message });
    }
};
exports.getPublicPaymentConfig = getPublicPaymentConfig;
