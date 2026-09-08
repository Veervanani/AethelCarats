"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHolidayModeSettings = exports.getHolidayModeSettings = exports.getStoreStatus = void 0;
const settingController_1 = require("./settingController");
const prisma_1 = __importDefault(require("../prisma"));
const getStoreStatus = async (req, res) => {
    try {
        const status = await (0, settingController_1.getNormalizedHolidayStatus)();
        res.json({
            storeOpen: !status.active,
            holidayMode: status.active,
            allowBrowsing: true,
            allowOrders: !status.active,
            message: status.message,
            reopeningMessage: status.reopeningMessage,
            showBanner: status.active && status.showBanner,
            bannerText: status.bannerText,
            startDate: status.startDate,
            endDate: status.endDate,
        });
    }
    catch (error) {
        console.error('getStoreStatus error:', error);
        res.status(500).json({ message: 'Error checking store status' });
    }
};
exports.getStoreStatus = getStoreStatus;
const getHolidayModeSettings = async (req, res) => {
    try {
        const status = await (0, settingController_1.getNormalizedHolidayStatus)();
        res.json(status);
    }
    catch (error) {
        console.error('getHolidayModeSettings error:', error);
        res.status(500).json({ message: 'Error fetching holiday mode settings' });
    }
};
exports.getHolidayModeSettings = getHolidayModeSettings;
const updateHolidayModeSettings = async (req, res) => {
    try {
        // Record Audit Log before/after updating
        const prevStatus = await (0, settingController_1.getNormalizedHolidayStatus)();
        // Perform update via settingController unified logic
        const updateRes = await (0, settingController_1.updateHolidayModeStatus)(req, res);
        const newStatus = await (0, settingController_1.getNormalizedHolidayStatus)();
        const prevEnabled = Boolean(prevStatus.active);
        const nextEnabled = Boolean(newStatus.active);
        let actionType = 'HOLIDAY_MODE_SETTINGS_UPDATED';
        if (!prevEnabled && nextEnabled) {
            actionType = 'HOLIDAY_MODE_ENABLED';
        }
        else if (prevEnabled && !nextEnabled) {
            actionType = 'HOLIDAY_MODE_DISABLED';
        }
        if (req.user?.id) {
            await prisma_1.default.activityLog.create({
                data: {
                    userId: req.user.id,
                    action: actionType,
                    object: 'Holiday Mode Control',
                    newValue: `Holiday Mode set to ${nextEnabled ? 'ENABLED' : 'DISABLED'} by ${req.user.email}`,
                },
            }).catch(console.error);
        }
        return updateRes;
    }
    catch (error) {
        console.error('updateHolidayModeSettings error:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error updating holiday mode settings' });
        }
    }
};
exports.updateHolidayModeSettings = updateHolidayModeSettings;
