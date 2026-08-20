import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ensureStorefrontCmsSeeded } from '../services/seedService';
import prisma from '../prisma';

export const getDiamondFilters = async (req: Request, res: Response) => {
  try {
    await ensureStorefrontCmsSeeded();

    const includeDisabled = req.query.includeDisabled === 'true';

    const configs = await prisma.diamondFilterConfig.findMany({
      where: includeDisabled ? {} : { isEnabled: true },
      include: {
        options: {
          where: includeDisabled ? {} : { isEnabled: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json(configs);
  } catch (error) {
    console.error('getDiamondFilters error:', error);
    res.status(500).json({ message: 'Error fetching diamond filter configurations' });
  }
};

export const updateDiamondFilterGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, sortOrder, isEnabled, configJson } = req.body;

    const group = await prisma.diamondFilterConfig.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
        ...(isEnabled !== undefined ? { isEnabled: Boolean(isEnabled) } : {}),
        ...(configJson !== undefined ? { configJson: typeof configJson === 'object' ? JSON.stringify(configJson) : String(configJson) } : {}),
      },
      include: { options: { orderBy: { sortOrder: 'asc' } } },
    });

    res.json(group);
  } catch (error) {
    console.error('updateDiamondFilterGroup error:', error);
    res.status(500).json({ message: 'Error updating diamond filter group' });
  }
};

export const createDiamondFilterOption = async (req: AuthRequest, res: Response) => {
  try {
    const { configId, label, value, iconUrl, colorHex, sortOrder, isEnabled } = req.body;

    if (!configId || !label || !value) {
      return res.status(400).json({ message: 'Config ID, Label, and Value are required' });
    }

    const option = await prisma.diamondFilterOption.create({
      data: {
        configId,
        label,
        value,
        iconUrl: iconUrl || null,
        colorHex: colorHex || null,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
        isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
      },
    });

    res.json(option);
  } catch (error) {
    console.error('createDiamondFilterOption error:', error);
    res.status(500).json({ message: 'Error creating diamond filter option' });
  }
};

export const updateDiamondFilterOption = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { label, value, iconUrl, colorHex, sortOrder, isEnabled } = req.body;

    const option = await prisma.diamondFilterOption.update({
      where: { id },
      data: {
        ...(label !== undefined ? { label } : {}),
        ...(value !== undefined ? { value } : {}),
        ...(iconUrl !== undefined ? { iconUrl } : {}),
        ...(colorHex !== undefined ? { colorHex } : {}),
        ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
        ...(isEnabled !== undefined ? { isEnabled: Boolean(isEnabled) } : {}),
      },
    });

    res.json(option);
  } catch (error) {
    console.error('updateDiamondFilterOption error:', error);
    res.status(500).json({ message: 'Error updating diamond filter option' });
  }
};

export const deleteDiamondFilterOption = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.diamondFilterOption.delete({ where: { id } });
    res.json({ message: 'Diamond filter option deleted successfully' });
  } catch (error) {
    console.error('deleteDiamondFilterOption error:', error);
    res.status(500).json({ message: 'Error deleting diamond filter option' });
  }
};
