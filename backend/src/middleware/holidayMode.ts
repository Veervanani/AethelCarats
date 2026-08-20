import { Request, Response, NextFunction } from 'express';
import { getNormalizedHolidayStatus } from '../controllers/settingController';

export const checkIsHolidayModeActive = async () => {
  try {
    const status = await getNormalizedHolidayStatus();
    return { active: status.active, config: status };
  } catch (error) {
    console.error('Error checking holiday mode status:', error);
    return { active: false, config: null };
  }
};

export const requireStoreOpenForOrders = async (req: Request, res: Response, next: NextFunction) => {
  const { active, config } = await checkIsHolidayModeActive();

  if (active) {
    const closureMsg =
      config?.holiday_mode_message ||
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
