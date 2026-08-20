import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { getNormalizedHolidayStatus, updateHolidayModeStatus } from './settingController';
import prisma from '../prisma';

export const getStoreStatus = async (req: Request, res: Response) => {
  try {
    const status = await getNormalizedHolidayStatus();

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
  } catch (error) {
    console.error('getStoreStatus error:', error);
    res.status(500).json({ message: 'Error checking store status' });
  }
};

export const getHolidayModeSettings = async (req: AuthRequest, res: Response) => {
  try {
    const status = await getNormalizedHolidayStatus();
    res.json(status);
  } catch (error) {
    console.error('getHolidayModeSettings error:', error);
    res.status(500).json({ message: 'Error fetching holiday mode settings' });
  }
};

export const updateHolidayModeSettings = async (req: AuthRequest, res: Response) => {
  try {
    // Record Audit Log before/after updating
    const prevStatus = await getNormalizedHolidayStatus();

    // Perform update via settingController unified logic
    const updateRes = await updateHolidayModeStatus(req, res);

    const newStatus = await getNormalizedHolidayStatus();
    const prevEnabled = Boolean(prevStatus.active);
    const nextEnabled = Boolean(newStatus.active);
    let actionType = 'HOLIDAY_MODE_SETTINGS_UPDATED';

    if (!prevEnabled && nextEnabled) {
      actionType = 'HOLIDAY_MODE_ENABLED';
    } else if (prevEnabled && !nextEnabled) {
      actionType = 'HOLIDAY_MODE_DISABLED';
    }

    if (req.user?.id) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: actionType,
          object: 'Holiday Mode Control',
          newValue: `Holiday Mode set to ${nextEnabled ? 'ENABLED' : 'DISABLED'} by ${req.user.email}`,
        },
      }).catch(console.error);
    }

    return updateRes;
  } catch (error) {
    console.error('updateHolidayModeSettings error:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error updating holiday mode settings' });
    }
  }
};
