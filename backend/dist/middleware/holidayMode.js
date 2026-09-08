"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireStoreOpenForOrders = exports.checkIsHolidayModeActive = void 0;
const settingController_1 = require("../controllers/settingController");
const checkIsHolidayModeActive = async () => {
    try {
        const status = await (0, settingController_1.getNormalizedHolidayStatus)();
        return { active: status.active, config: status };
    }
    catch (error) {
        console.error('Error checking holiday mode status:', error);
        return { active: false, config: null };
    }
};
exports.checkIsHolidayModeActive = checkIsHolidayModeActive;
const requireStoreOpenForOrders = async (req, res, next) => {
    const { active, config } = await (0, exports.checkIsHolidayModeActive)();
    if (active) {
        const closureMsg = config?.holiday_mode_message ||
            config?.message ||
            'Our online store is temporarily closed for a scheduled holiday break. We appreciate your understanding.';
        return res.status(503).json({
            success: false,
            code: 'STORE_CLOSED',
            message: closureMsg,
            reopeningMessage: config?.holiday_mode_reopening_message || config?.reopeningMessage || null,
        });
    }
    next();
};
exports.requireStoreOpenForOrders = requireStoreOpenForOrders;
