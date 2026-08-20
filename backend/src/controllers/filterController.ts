import { Request, Response } from 'express';
import { seedFilterConfigs } from '../seedFilterConfigs';
import prisma from '../prisma';

// GET /api/v1/filters (Public API)
export const getPublicFilters = async (req: Request, res: Response) => {
  try {
    const { category, jewelleryType } = req.query;
    const activeCategory = (jewelleryType || category || 'All') as string;

    let filterConfigs = await prisma.productFilterConfig.findMany({
      where: { isEnabled: true },
      include: {
        options: {
          where: { isEnabled: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    if (filterConfigs.length < 12) {
      await seedFilterConfigs();
      filterConfigs = await prisma.productFilterConfig.findMany({
        where: { isEnabled: true },
        include: {
          options: {
            where: { isEnabled: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { sortOrder: 'asc' },
      });
    }

    const targetLower = activeCategory.toLowerCase();

    const relevantFilters = filterConfigs
      .filter((f) => {
        if (!f.applicableJewelleryTypes || f.applicableJewelleryTypes === 'All') return true;
        if (targetLower === 'all' || !targetLower) return true;
        const appTypes = f.applicableJewelleryTypes.toLowerCase();
        return appTypes.includes(targetLower) || (targetLower.includes('ring') && appTypes.includes('ring'));
      })
      .map((f) => {
        const relevantOptions = f.options.filter((opt: any) => {
          if (!opt.applicableJewelleryTypes || opt.applicableJewelleryTypes === 'All') return true;
          if (targetLower === 'all' || !targetLower) return true;
          const optTypes = opt.applicableJewelleryTypes.toLowerCase();
          return optTypes.includes(targetLower) || (targetLower.includes('ring') && optTypes.includes('ring'));
        });
        return {
          ...f,
          options: relevantOptions,
        };
      })
      .filter((f) => f.options.length > 0 || f.filterType === 'Price Range' || f.key === 'price');

    res.json({ filters: relevantFilters });
  } catch (error: any) {
    console.warn('getPublicFilters database warning (returning fallback empty filters):', error);
    res.json({ filters: [] });
  }
};

// GET /api/v1/admin/filters (Admin API)
export const getAdminFilters = async (req: Request, res: Response) => {
  try {
    let filterConfigs = await prisma.productFilterConfig.findMany({
      include: {
        options: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    if (filterConfigs.length < 12) {
      await seedFilterConfigs();
      filterConfigs = await prisma.productFilterConfig.findMany({
        include: {
          options: {
            orderBy: { sortOrder: 'asc' },
          },
        },
        orderBy: { sortOrder: 'asc' },
      });
    }

    res.json({ filters: filterConfigs });
  } catch (error: any) {
    console.error('getAdminFilters error:', error);
    res.status(500).json({ message: 'Error retrieving admin filter configurations.' });
  }
};

// POST /api/v1/admin/filters
export const createFilterConfig = async (req: Request, res: Response) => {
  try {
    const { key, name, customerLabel, filterType, sortOrder, isEnabled, applicableJewelleryTypes, configJson, options } = req.body;

    const filterKey = key || name.toLowerCase().replace(/[^a-z0-9]+/g, '_');

    const createdFilter = await prisma.productFilterConfig.create({
      data: {
        key: filterKey,
        name,
        customerLabel: customerLabel || name,
        filterType: filterType || 'Multi Select',
        sortOrder: sortOrder || 0,
        isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
        applicableJewelleryTypes: applicableJewelleryTypes || 'All',
        configJson: typeof configJson === 'object' ? JSON.stringify(configJson) : configJson,
        options: {
          create: (options || []).map((opt: any, idx: number) => ({
            label: opt.label,
            value: opt.value || opt.label,
            iconUrl: opt.iconUrl || null,
            colorHex: opt.colorHex || null,
            applicableJewelleryTypes: opt.applicableJewelleryTypes || 'All',
            sortOrder: opt.sortOrder !== undefined ? opt.sortOrder : idx,
            isEnabled: opt.isEnabled !== undefined ? Boolean(opt.isEnabled) : true,
          })),
        },
      },
      include: { options: true },
    });

    res.status(201).json(createdFilter);
  } catch (error: any) {
    console.error('createFilterConfig error:', error);
    res.status(400).json({ message: error.message || 'Error creating filter configuration.' });
  }
};

// PUT /api/v1/admin/filters/:id
export const updateFilterConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, customerLabel, filterType, sortOrder, isEnabled, applicableJewelleryTypes, configJson } = req.body;

    const updatedFilter = await prisma.productFilterConfig.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(customerLabel !== undefined && { customerLabel }),
        ...(filterType !== undefined && { filterType }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder, 10) }),
        ...(isEnabled !== undefined && { isEnabled: Boolean(isEnabled) }),
        ...(applicableJewelleryTypes !== undefined && { applicableJewelleryTypes }),
        ...(configJson !== undefined && { configJson: typeof configJson === 'object' ? JSON.stringify(configJson) : configJson }),
      },
      include: { options: true },
    });

    res.json(updatedFilter);
  } catch (error: any) {
    console.error('updateFilterConfig error:', error);
    res.status(400).json({ message: error.message || 'Error updating filter configuration.' });
  }
};

// DELETE /api/v1/admin/filters/:id
export const deleteFilterConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.productFilterConfig.delete({ where: { id } });
    res.json({ message: 'Filter deleted successfully.' });
  } catch (error: any) {
    console.error('deleteFilterConfig error:', error);
    res.status(400).json({ message: error.message || 'Error deleting filter configuration.' });
  }
};

// POST /api/v1/admin/filters/:id/options
export const createFilterOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { label, value, iconUrl, colorHex, sortOrder, isEnabled, applicableJewelleryTypes } = req.body;

    const createdOption = await prisma.productFilterOption.create({
      data: {
        filterId: id,
        label,
        value: value || label,
        iconUrl: iconUrl || null,
        colorHex: colorHex || null,
        applicableJewelleryTypes: applicableJewelleryTypes || 'All',
        sortOrder: sortOrder || 0,
        isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
      },
    });

    res.status(201).json(createdOption);
  } catch (error: any) {
    console.error('createFilterOption error:', error);
    res.status(400).json({ message: error.message || 'Error creating filter option.' });
  }
};

// PUT /api/v1/admin/filters/options/:optionId
export const updateFilterOption = async (req: Request, res: Response) => {
  try {
    const { optionId } = req.params;
    const { label, value, iconUrl, colorHex, sortOrder, isEnabled, applicableJewelleryTypes } = req.body;

    const updatedOption = await prisma.productFilterOption.update({
      where: { id: optionId },
      data: {
        ...(label !== undefined && { label }),
        ...(value !== undefined && { value }),
        ...(iconUrl !== undefined && { iconUrl }),
        ...(colorHex !== undefined && { colorHex }),
        ...(applicableJewelleryTypes !== undefined && { applicableJewelleryTypes }),
        ...(sortOrder !== undefined && { sortOrder: parseInt(sortOrder, 10) }),
        ...(isEnabled !== undefined && { isEnabled: Boolean(isEnabled) }),
      },
    });

    res.json(updatedOption);
  } catch (error: any) {
    console.error('updateFilterOption error:', error);
    res.status(400).json({ message: error.message || 'Error updating filter option.' });
  }
};

// DELETE /api/v1/admin/filters/options/:optionId
export const deleteFilterOption = async (req: Request, res: Response) => {
  try {
    const { optionId } = req.params;
    await prisma.productFilterOption.delete({ where: { id: optionId } });
    res.json({ message: 'Option deleted successfully.' });
  } catch (error: any) {
    console.error('deleteFilterOption error:', error);
    res.status(400).json({ message: error.message || 'Error deleting filter option.' });
  }
};
