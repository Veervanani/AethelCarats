import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

export interface NormalizedHolidayStatus {
  active: boolean;
  holiday_mode_enabled: boolean;
  manualOn: boolean;
  message: string;
  holiday_mode_message: string;
  reopeningMessage: string;
  holiday_mode_reopening_message: string;
  bannerText: string;
  holiday_mode_banner_text: string;
  showBanner: boolean;
  holiday_mode_show_banner: boolean;
  startDate: string;
  holiday_mode_start: string;
  endDate: string;
  holiday_mode_end: string;
  isHolidayModeActive: boolean;
}

export async function getNormalizedHolidayStatus(): Promise<NormalizedHolidayStatus> {
  const defaultMsg = "Orders are temporarily unavailable while we are away. Please check back soon.";
  const defaultBanner = "Online orders are temporarily paused for our holiday break. We look forward to serving you again soon.";

  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            'holiday_mode',
            'holiday_message',
            'holiday_mode_message',
            'holiday_reopening_message',
            'holiday_mode_reopening_message',
            'holiday_banner_text',
            'holiday_mode_banner_text',
            'holiday_show_banner',
            'holiday_mode_show_banner',
            'holiday_start_date',
            'holiday_mode_start',
            'holiday_end_date',
            'holiday_mode_end',
          ]
        }
      }
    });

    const kv: Record<string, string> = {};
    settings.forEach(s => { kv[s.key] = s.value; });

    let manualOn = false;
    let configObj: any = null;

    if (kv['holiday_mode']) {
      const val = kv['holiday_mode'];
      if (val === 'true') {
        manualOn = true;
      } else if (val === 'false') {
        manualOn = false;
      } else {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === 'object' && parsed !== null) {
            configObj = parsed;
            manualOn = Boolean(parsed.holiday_mode_enabled ?? parsed.active);
          } else if (typeof parsed === 'boolean') {
            manualOn = parsed;
          }
        } catch (e) {
          manualOn = val === 'true';
        }
      }
    }

    const message = kv['holiday_mode_message'] || kv['holiday_message'] || configObj?.holiday_mode_message || configObj?.message || defaultMsg;
    const reopeningMessage = kv['holiday_mode_reopening_message'] || kv['holiday_reopening_message'] || configObj?.holiday_mode_reopening_message || configObj?.reopeningMessage || 'We will reopen soon. Thank you for your patience!';
    const bannerText = kv['holiday_mode_banner_text'] || kv['holiday_banner_text'] || configObj?.holiday_mode_banner_text || configObj?.bannerText || defaultBanner;

    let showBanner = true;
    const rawShow = kv['holiday_mode_show_banner'] ?? kv['holiday_show_banner'] ?? configObj?.holiday_mode_show_banner ?? configObj?.showBanner;
    if (rawShow !== undefined) {
      if (typeof rawShow === 'boolean') showBanner = rawShow;
      else if (typeof rawShow === 'string') showBanner = rawShow.toLowerCase() !== 'false';
    }

    const startDateStr = kv['holiday_mode_start'] || kv['holiday_start_date'] || configObj?.holiday_mode_start || configObj?.startDate || '';
    const endDateStr = kv['holiday_mode_end'] || kv['holiday_end_date'] || configObj?.holiday_mode_end || configObj?.endDate || '';

    let isScheduledActive = false;
    if (startDateStr && endDateStr) {
      const now = Date.now();
      const start = new Date(startDateStr).getTime();
      const end = new Date(endDateStr).getTime();
      if (!isNaN(start) && !isNaN(end) && now >= start && now <= end) {
        isScheduledActive = true;
      }
    }

    const active = manualOn || isScheduledActive;

    return {
      active,
      holiday_mode_enabled: manualOn,
      manualOn,
      message,
      holiday_mode_message: message,
      reopeningMessage,
      holiday_mode_reopening_message: reopeningMessage,
      bannerText,
      holiday_mode_banner_text: bannerText,
      showBanner,
      holiday_mode_show_banner: showBanner,
      startDate: startDateStr,
      holiday_mode_start: startDateStr,
      endDate: endDateStr,
      holiday_mode_end: endDateStr,
      isHolidayModeActive: active,
    };
  } catch (err) {
    return {
      active: false,
      holiday_mode_enabled: false,
      manualOn: false,
      message: defaultMsg,
      holiday_mode_message: defaultMsg,
      reopeningMessage: '',
      holiday_mode_reopening_message: '',
      bannerText: defaultBanner,
      holiday_mode_banner_text: defaultBanner,
      showBanner: true,
      holiday_mode_show_banner: true,
      startDate: '',
      holiday_mode_start: '',
      endDate: '',
      holiday_mode_end: '',
      isHolidayModeActive: false,
    };
  }
}

export async function isHolidayModeActive() {
  return getNormalizedHolidayStatus();
}

// Public API: GET /api/v1/settings/holiday-mode
export const getHolidayModeStatus = async (req: AuthRequest, res: Response) => {
  try {
    const status = await getNormalizedHolidayStatus();
    return res.json(status);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to fetch holiday mode status' });
  }
};

// Admin API: PUT /api/v1/admin/settings/holiday-mode
export const updateHolidayModeStatus = async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body || {};
    const isEnabled = Boolean(
      body.active ?? body.holiday_mode_enabled ?? body.holiday_mode ?? false
    );
    const msg = body.message || body.holiday_mode_message || body.holiday_message || "Orders are temporarily unavailable while we are away. Please check back soon.";
    const reopenMsg = body.reopeningMessage || body.holiday_mode_reopening_message || body.holiday_reopening_message || '';
    const bText = body.bannerText || body.holiday_mode_banner_text || body.holiday_banner_text || '';
    const sBanner = Boolean(body.showBanner ?? body.holiday_mode_show_banner ?? body.holiday_show_banner ?? true);
    const start = body.startDate || body.holiday_mode_start || body.holiday_start_date || '';
    const end = body.endDate || body.holiday_mode_end || body.holiday_end_date || '';

    const configPayload = {
      holiday_mode_enabled: isEnabled,
      holiday_mode_message: msg,
      holiday_mode_reopening_message: reopenMsg,
      holiday_mode_banner_text: bText,
      holiday_mode_show_banner: sBanner,
      holiday_mode_start: start,
      holiday_mode_end: end,
    };

    await prisma.$transaction([
      prisma.siteSetting.upsert({
        where: { key: 'holiday_mode' },
        update: { value: JSON.stringify(configPayload) },
        create: { key: 'holiday_mode', value: JSON.stringify(configPayload) },
      }),
      prisma.siteSetting.upsert({
        where: { key: 'holiday_message' },
        update: { value: msg },
        create: { key: 'holiday_message', value: msg },
      }),
      prisma.siteSetting.upsert({
        where: { key: 'holiday_mode_message' },
        update: { value: msg },
        create: { key: 'holiday_mode_message', value: msg },
      }),
      prisma.siteSetting.upsert({
        where: { key: 'holiday_start_date' },
        update: { value: start },
        create: { key: 'holiday_start_date', value: start },
      }),
      prisma.siteSetting.upsert({
        where: { key: 'holiday_mode_start' },
        update: { value: start },
        create: { key: 'holiday_mode_start', value: start },
      }),
      prisma.siteSetting.upsert({
        where: { key: 'holiday_end_date' },
        update: { value: end },
        create: { key: 'holiday_end_date', value: end },
      }),
      prisma.siteSetting.upsert({
        where: { key: 'holiday_mode_end' },
        update: { value: end },
        create: { key: 'holiday_mode_end', value: end },
      }),
    ]);

    const updated = await getNormalizedHolidayStatus();
    return res.json({
      statusMessage: 'Holiday Mode settings updated successfully!',
      ...updated,
    });
  } catch (error: any) {
    console.error('updateHolidayModeStatus error:', error);
    return res.status(500).json({ message: error.message || 'Failed to update holiday mode settings' });
  }
};
