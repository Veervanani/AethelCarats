import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

export const getDiamonds = async (req: Request, res: Response) => {
  try {
    const {
      type,
      classification,
      shapes,
      minCarat,
      maxCarat,
      colors,
      color,
      fancyColor,
      fancyColors,
      overtone,
      fancyOvertone,
      fancyOvertones,
      intensity,
      fancyIntensity,
      fancyIntensities,
      clarities,
      cuts,
      labs,
      minPrice,
      maxPrice,
      noBgm,
      search,
      status = 'AVAILABLE',
      sort = 'price-asc',
      page = '1',
      limit = '100',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(5000, Math.max(1, parseInt(limit as string, 10) || 100));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    const labQuery = (labs || req.query.certificate || req.query.lab) as string | undefined;

    if (status && status !== 'ALL') {
      where.OR = [
        { status: status as string },
        { status: (status as string).toLowerCase() },
        { status: null },
      ];
    }

    // CLASSIFICATION (WHITE vs FANCY)
    if (classification === 'WHITE') {
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { fancyColor: null },
          { fancyColor: '' },
          { fancyColor: 'None' },
          { fancyColor: 'N/A' },
          { diamondType: 'WHITE' },
          { diamondType: 'NATURAL' },
          { diamondType: 'LAB_GROWN' },
          { diamondType: 'LAB_GROWN_WHITE' },
        ],
      });
      where.AND.push({
        NOT: {
          color: 'FANCY',
        },
      });
    } else if (classification === 'FANCY') {
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { fancyColor: { notIn: [null, '', 'None', 'N/A'] } },
          { diamondType: 'FANCY' },
          { diamondType: 'LAB_GROWN_FANCY' },
          { color: 'FANCY' },
        ],
      });
    }

    if (type && type !== 'ALL') {
      if (type === 'LAB_GROWN') {
        where.AND = where.AND || [];
        where.AND.push({
          OR: [
            { diamondType: 'LAB_GROWN' },
            { diamondType: 'LAB_GROWN_WHITE' },
            { diamondType: 'LAB_GROWN_FANCY' },
          ],
        });
      } else if (type === 'NATURAL') {
        where.AND = where.AND || [];
        where.AND.push({
          OR: [
            { diamondType: 'NATURAL' },
            { diamondType: 'WHITE' },
            { diamondType: 'FANCY' },
          ],
        });
      }
    }

    if (shapes) {
      const shapeList = (shapes as string).split(',').map((s) => s.trim());
      if (shapeList.length > 0) {
        const OR_shapes: any[] = [];
        shapeList.forEach((s) => {
          const cap = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
          OR_shapes.push({ shape: s }, { shape: cap }, { shape: s.toLowerCase() }, { shape: s.toUpperCase() });
        });
        where.AND = where.AND || [];
        where.AND.push({ OR: OR_shapes });
      }
    }

    if (minCarat || maxCarat) {
      where.carat = {};
      if (minCarat) where.carat.gte = parseFloat(minCarat as string);
      if (maxCarat) where.carat.lte = parseFloat(maxCarat as string);
    }

    const colorParam = (colors || color) as string | undefined;
    if (colorParam) {
      const colorList = colorParam.split(',').map((c) => c.trim().toUpperCase());
      if (colorList.length > 0) {
        where.color = { in: colorList };
      }
    }

    const fancyColorParam = (fancyColors || fancyColor) as string | undefined;
    if (fancyColorParam) {
      const fList = fancyColorParam.split(',').map((c) => c.trim());
      if (fList.length > 0) {
        where.fancyColor = { in: fList };
      }
    }

    const overtoneParam = (fancyOvertones || overtone || req.query.fancyOvertone) as string | undefined;
    if (overtoneParam) {
      const oList = overtoneParam.split(',').map((o) => o.trim());
      if (oList.length > 0) {
        where.fancyOvertone = { in: oList };
      }
    }

    const intensityParam = (fancyIntensities || intensity || req.query.fancyIntensity) as string | undefined;
    if (intensityParam) {
      const iList = intensityParam.split(',').map((i) => i.trim());
      if (iList.length > 0) {
        where.fancyIntensity = { in: iList };
      }
    }

    if (clarities) {
      const clarityList = (clarities as string).split(',').map((c) => c.trim().toUpperCase());
      if (clarityList.length > 0) {
        where.clarity = { in: clarityList };
      }
    }

    if (cuts) {
      const cutList = (cuts as string).split(',').map((c) => c.trim());
      if (cutList.length > 0) {
        where.cut = { in: cutList };
      }
    }

    if (labQuery) {
      const labList = (labQuery as string).split(',').map((l) => l.trim());
      if (labList.length > 0) {
        const OR_labs: any[] = [];
        labList.forEach((l) => {
          OR_labs.push({ lab: l }, { lab: l.toLowerCase() }, { lab: l.toUpperCase() });
        });
        where.AND = where.AND || [];
        where.AND.push({ OR: OR_labs });
      }
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    const growthTypeParam = (req.query.growthType || req.query.growthTypes || req.query.cvdHpht) as string | undefined;
    if (growthTypeParam) {
      const gList = growthTypeParam.split(',').map((g) => g.trim().toUpperCase());
      if (gList.length > 0) {
        where.growthType = { in: gList };
      }
    }

    const fluorParam = (req.query.fluorescence || req.query.fluorescences) as string | undefined;
    if (fluorParam) {
      const flList = fluorParam.split(',').map((fl) => fl.trim());
      if (flList.length > 0) {
        const OR_fl: any[] = [];
        flList.forEach((fl) => {
          OR_fl.push({ fluorescence: fl }, { fluorescence: fl.toLowerCase() }, { fluorescence: fl.toUpperCase() });
        });
        where.AND = where.AND || [];
        where.AND.push({ OR: OR_fl });
      }
    }

    const minRatio = req.query.minRatio as string | undefined;
    const maxRatio = req.query.maxRatio as string | undefined;
    if (minRatio || maxRatio) {
      where.ratio = {};
      if (minRatio) where.ratio.gte = parseFloat(minRatio);
      if (maxRatio) where.ratio.lte = parseFloat(maxRatio);
    }

    const minPcarat = req.query.minPricePerCarat as string | undefined;
    const maxPcarat = req.query.maxPricePerCarat as string | undefined;
    if (minPcarat || maxPcarat) {
      where.pricePerCarat = {};
      if (minPcarat) where.pricePerCarat.gte = parseFloat(minPcarat);
      if (maxPcarat) where.pricePerCarat.lte = parseFloat(maxPcarat);
    }

    if (search) {
      const searchStr = (search as string).trim();
      where.AND = where.AND || [];
      where.AND.push({
        OR: [
          { diamondId: { contains: searchStr } },
          { stockId: { contains: searchStr } },
          { sku: { contains: searchStr } },
          { certificateNumber: { contains: searchStr } },
          { shape: { contains: searchStr } },
          { lab: { contains: searchStr } },
          { color: { contains: searchStr } },
          { clarity: { contains: searchStr } },
          { diamondType: { contains: searchStr } },
        ],
      });
    }

    let orderBy: any = { price: 'asc' };
    if (sort === 'price-desc') orderBy = { price: 'desc' };
    if (sort === 'carat-asc') orderBy = { carat: 'asc' };
    if (sort === 'carat-desc') orderBy = { carat: 'desc' };
    if (sort === 'newest') orderBy = { createdAt: 'desc' };

    const [diamonds, total] = await Promise.all([
      prisma.diamond.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
      }),
      prisma.diamond.count({ where }),
    ]);

    res.json({
      diamonds,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.warn('getDiamonds database warning (returning fallback empty array):', error);
    const pageNum = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limitNum = Math.min(5000, Math.max(1, parseInt(req.query.limit as string, 10) || 100));
    res.json({
      diamonds: [],
      pagination: {
        total: 0,
        page: pageNum,
        limit: limitNum,
        totalPages: 0,
      },
    });
  }
};

export const getDiamondById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const diamond = await prisma.diamond.findFirst({
      where: {
        OR: [{ id }, { diamondId: id }],
      },
    });

    if (!diamond) {
      return res.status(404).json({ message: 'Diamond not found' });
    }

    res.json(diamond);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diamond details' });
  }
};

export const getWhatsAppInquiryMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const diamond = await prisma.diamond.findFirst({
      where: { OR: [{ id }, { diamondId: id }] },
    });

    if (!diamond) {
      return res.status(404).json({ message: 'Diamond not found' });
    }

    const host = req.get('host') || 'auroradiamonds.com';
    const protocol = req.protocol || 'https';
    const diamondUrl = `${protocol}://${host}/diamonds/${diamond.diamondId}`;

    const text = `Hello Aura Diamond Atelier,\n\nI am interested in this diamond:\n\nDiamond ID: ${diamond.diamondId}\nShape: ${diamond.shape}\nCarat: ${diamond.carat}ct\nColor: ${diamond.color}\nClarity: ${diamond.clarity}\nCut: ${diamond.cut || 'N/A'}\nCertificate: ${diamond.lab || 'N/A'}\nCertificate No: ${diamond.certificateNumber || 'N/A'}\nPrice: $${diamond.price.toLocaleString()}\n\nDiamond Link:\n${diamondUrl}`;

    let waNumber = '447900123456';
    const waSetting = await prisma.siteSetting.findUnique({ where: { key: 'whatsapp_config' } });
    if (waSetting) {
      try {
        const parsed = JSON.parse(waSetting.value);
        if (parsed.inquiryNumber) waNumber = parsed.inquiryNumber.replace(/[^\d]/g, '');
      } catch (e) {
        if (waSetting.value) waNumber = waSetting.value.replace(/[^\d]/g, '');
      }
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

    res.json({ messageText: text, whatsappUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error generating WhatsApp inquiry' });
  }
};

export const updateDiamondStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, price } = req.body;

    const existing = await prisma.diamond.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Diamond not found' });

    const updated = await prisma.diamond.update({
      where: { id },
      data: {
        status: status || existing.status,
        price: price ? parseFloat(price) : existing.price,
      },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'UPDATE_DIAMOND',
          object: `Diamond ${existing.diamondId}`,
          oldValue: `Price: $${existing.price}, Status: ${existing.status}`,
          newValue: `Price: $${updated.price}, Status: ${updated.status}`,
        },
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating diamond' });
  }
};

export const createDiamond = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const count = await prisma.diamond.count();
    const diamondId = data.diamondId || `D${10000 + count + 1}`;

    const diamond = await prisma.diamond.create({
      data: {
        diamondId,
        stockId: data.stockId || diamondId,
        sku: data.sku || diamondId,
        diamondType: data.diamondType || 'NATURAL',
        shape: data.shape || 'Round',
        carat: parseFloat(data.carat),
        color: data.color || 'D',
        clarity: data.clarity || 'VVS1',
        cut: data.cut || 'EX',
        polish: data.polish || 'EX',
        symmetry: data.symmetry || 'EX',
        fluorescence: data.fluorescence || 'NONE',
        length: data.length ? parseFloat(data.length) : null,
        width: data.width ? parseFloat(data.width) : null,
        depth: data.depth ? parseFloat(data.depth) : null,
        lab: data.lab || 'GIA',
        certificateNumber: data.certificateNumber || null,
        certificateUrl: data.certificateUrl || null,
        price: parseFloat(data.price),
        status: data.status || 'AVAILABLE',
        fancyColor: data.fancyColor || null,
        fancyOvertone: data.fancyOvertone || null,
        fancyIntensity: data.fancyIntensity || null,
        imageUrl: data.imageUrl || '/assets/gem_diamonds_cat.png',
      },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'CREATE_DIAMOND',
          object: `Diamond ${diamond.diamondId}`,
        },
      });
    }

    res.status(201).json(diamond);
  } catch (error) {
    console.error('createDiamond error:', error);
    res.status(500).json({ message: 'Error creating diamond' });
  }
};

export const updateDiamond = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await prisma.diamond.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Diamond not found' });

    const updated = await prisma.diamond.update({
      where: { id },
      data: {
        ...(data.diamondId && { diamondId: data.diamondId }),
        ...(data.stockId !== undefined && { stockId: data.stockId }),
        ...(data.sku !== undefined && { sku: data.sku }),
        ...(data.diamondType && { diamondType: data.diamondType }),
        ...(data.shape && { shape: data.shape }),
        ...(data.carat !== undefined && { carat: parseFloat(data.carat) }),
        ...(data.color && { color: data.color }),
        ...(data.clarity && { clarity: data.clarity }),
        ...(data.cut !== undefined && { cut: data.cut }),
        ...(data.polish !== undefined && { polish: data.polish }),
        ...(data.symmetry !== undefined && { symmetry: data.symmetry }),
        ...(data.fluorescence !== undefined && { fluorescence: data.fluorescence }),
        ...(data.lab !== undefined && { lab: data.lab }),
        ...(data.certificateNumber !== undefined && { certificateNumber: data.certificateNumber }),
        ...(data.certificateUrl !== undefined && { certificateUrl: data.certificateUrl }),
        ...(data.price !== undefined && { price: parseFloat(data.price) }),
        ...(data.status && { status: data.status }),
        ...(data.fancyColor !== undefined && { fancyColor: data.fancyColor }),
        ...(data.fancyOvertone !== undefined && { fancyOvertone: data.fancyOvertone }),
        ...(data.fancyIntensity !== undefined && { fancyIntensity: data.fancyIntensity }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
      },
    });

    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.id,
          action: 'UPDATE_DIAMOND',
          object: `Diamond ${existing.diamondId}`,
        },
      });
    }

    res.json(updated);
  } catch (error) {
    console.error('updateDiamond error:', error);
    res.status(500).json({ message: 'Error updating diamond' });
  }
};

export const deleteDiamond = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.diamond.deleteMany({
      where: {
        OR: [{ id }, { diamondId: id }],
      },
    });
    res.json({ message: 'Diamond deleted successfully' });
  } catch (error) {
    console.error('deleteDiamond error:', error);
    res.status(500).json({ message: 'Error deleting diamond' });
  }
};

export const deleteAllDiamonds = async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await prisma.diamond.deleteMany();
    try {
      await prisma.$executeRawUnsafe('TRUNCATE TABLE `Diamond`;');
    } catch (e) {
      // Ignored if deleteMany already wiped the table
    }
    res.json({ message: `Successfully wiped all diamonds from database`, count: deleted.count });
  } catch (error) {
    console.error('deleteAllDiamonds error:', error);
    res.status(500).json({ message: 'Error clearing diamond database' });
  }
};

const DEFAULT_FILTER_CONFIG = {
  shapes: [
    { id: 'shape-1', name: 'Round', value: 'Round', displayLabel: 'ROUND', image: '/assets/diamonds/Round.svg', sortOrder: 1, status: 'ACTIVE' },
    { id: 'shape-2', name: 'Oval', value: 'Oval', displayLabel: 'OVAL', image: '/assets/diamonds/Oval.svg', sortOrder: 2, status: 'ACTIVE' },
    { id: 'shape-3', name: 'Cushion', value: 'Cushion', displayLabel: 'CUSHION', image: '/assets/diamonds/Cushion.svg', sortOrder: 3, status: 'ACTIVE' },
    { id: 'shape-4', name: 'Emerald', value: 'Emerald', displayLabel: 'EMERALD', image: '/assets/diamonds/Emerald.svg', sortOrder: 4, status: 'ACTIVE' },
    { id: 'shape-5', name: 'Pear', value: 'Pear', displayLabel: 'PEAR', image: '/assets/diamonds/Pear.svg', sortOrder: 5, status: 'ACTIVE' },
    { id: 'shape-6', name: 'Princess', value: 'Princess', displayLabel: 'PRINCESS', image: '/assets/diamonds/Princess.svg', sortOrder: 6, status: 'ACTIVE' },
    { id: 'shape-7', name: 'Radiant', value: 'Radiant', displayLabel: 'RADIANT', image: '/assets/diamonds/Radiant.svg', sortOrder: 7, status: 'ACTIVE' },
    { id: 'shape-8', name: 'Heart', value: 'Heart', displayLabel: 'HEART', image: '/assets/diamonds/Heart.svg', sortOrder: 8, status: 'ACTIVE' },
    { id: 'shape-9', name: 'Marquise', value: 'Marquise', displayLabel: 'MARQUISE', image: '/assets/diamonds/Marquise.svg', sortOrder: 9, status: 'ACTIVE' },
    { id: 'shape-10', name: 'Rose', value: 'Rose', displayLabel: 'ROSE', image: '/assets/diamonds/Rose.svg', sortOrder: 10, status: 'ACTIVE' },
    { id: 'shape-11', name: 'Ashoka', value: 'Ashoka', displayLabel: 'ASHOKA', image: '/assets/diamonds/Ashoka.svg', sortOrder: 11, status: 'ACTIVE' },
    { id: 'shape-12', name: 'Baguette', value: 'Baguette', displayLabel: 'BAGUETTE', image: '/assets/diamonds/Baguette.svg', sortOrder: 12, status: 'ACTIVE' },
    { id: 'shape-13', name: 'Half Moon', value: 'Half Moon', displayLabel: 'HALF MOON', image: '/assets/diamonds/Half Moon.svg', sortOrder: 13, status: 'ACTIVE' },
    { id: 'shape-14', name: 'Kite', value: 'Kite', displayLabel: 'KITE', image: '/assets/diamonds/Kite.svg', sortOrder: 14, status: 'ACTIVE' },
    { id: 'shape-15', name: 'Portuguese', value: 'Portuguese', displayLabel: 'PORTUGUESE', image: '/assets/diamonds/Portuguese.svg', sortOrder: 15, status: 'ACTIVE' },
    { id: 'shape-16', name: 'Asscher', value: 'Asscher', displayLabel: 'ASSCHER', image: '/assets/diamonds/Asscher.svg', sortOrder: 16, status: 'ACTIVE' },
    { id: 'shape-17', name: 'Trillion', value: 'Trillion', displayLabel: 'TRILLION', image: '/assets/diamonds/Trillion.svg', sortOrder: 17, status: 'ACTIVE' },
    { id: 'shape-18', name: 'Trapezoid', value: 'Trapezoid', displayLabel: 'TRAPEZOID', image: '/assets/diamonds/Trapezoid.svg', sortOrder: 18, status: 'ACTIVE' },
    { id: 'shape-19', name: 'Cadillac', value: 'Cadillac', displayLabel: 'CADILLAC', image: '/assets/diamonds/Cadillac.svg', sortOrder: 19, status: 'ACTIVE' },
    { id: 'shape-20', name: 'Shield Cut', value: 'Shield Cut', displayLabel: 'SHIELD CUT', image: '/assets/diamonds/Shield Cut.svg', sortOrder: 20, status: 'ACTIVE' },
    { id: 'shape-21', name: 'Pentagonal', value: 'Pentagonal', displayLabel: 'PENTAGONAL', image: '/assets/diamonds/Pentagonal.svg', sortOrder: 21, status: 'ACTIVE' },
  ],
  colors: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
  fancyColors: [
    { name: 'Yellow', value: 'Yellow', colorHex: '#F3E5AB', status: 'ACTIVE' },
    { name: 'Pink', value: 'Pink', colorHex: '#FFC0CB', status: 'ACTIVE' },
    { name: 'Blue', value: 'Blue', colorHex: '#AEC6CF', status: 'ACTIVE' },
    { name: 'Green', value: 'Green', colorHex: '#C1E1C1', status: 'ACTIVE' },
    { name: 'Orange', value: 'Orange', colorHex: '#FFD1DC', status: 'ACTIVE' },
    { name: 'Brown', value: 'Brown', colorHex: '#D2B48C', status: 'ACTIVE' },
    { name: 'Black', value: 'Black', colorHex: '#2A2A2A', status: 'ACTIVE' },
  ],
  overtones: ['Yellow', 'Pink', 'Blue', 'Green', 'Purple', 'Orange', 'Brown', 'Champagne', 'Other'],
  intensities: ['Fancy Deep', 'Fancy Dark', 'Fancy Vivid', 'Fancy Intense', 'Fancy', 'Very Light', 'Fancy Light', 'Light', 'Faint'],
  clarities: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2'],
  certifications: ['GIA', 'IGI', 'GCAL', 'HRD', 'AGS', 'OTHER'],
};

export const getDiamondFilterConfig = async (req: Request, res: Response) => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'diamond_vault_filter_config' } });
    if (setting && setting.value) {
      try {
        const parsed = JSON.parse(setting.value);
        if (parsed && Array.isArray(parsed.shapes)) {
          const existingNames = new Set(parsed.shapes.map((s: any) => (s.name || s.value || '').toLowerCase()));
          DEFAULT_FILTER_CONFIG.shapes.forEach((defShape) => {
            if (!existingNames.has(defShape.name.toLowerCase())) {
              parsed.shapes.push(defShape);
            }
          });
        }
        return res.json(parsed);
      } catch (e) {}
    }
    return res.json(DEFAULT_FILTER_CONFIG);
  } catch (error) {
    console.error('getDiamondFilterConfig error:', error);
    return res.json(DEFAULT_FILTER_CONFIG);
  }
};

export const updateDiamondFilterConfig = async (req: AuthRequest, res: Response) => {
  try {
    const configData = req.body;
    const jsonString = JSON.stringify(configData);
    const setting = await prisma.siteSetting.upsert({
      where: { key: 'diamond_vault_filter_config' },
      update: { value: jsonString },
      create: { key: 'diamond_vault_filter_config', value: jsonString },
    });
    res.json(JSON.parse(setting.value));
  } catch (error) {
    console.error('updateDiamondFilterConfig error:', error);
    res.status(500).json({ message: 'Error updating diamond filter configuration' });
  }
};

export const duplicateDiamond = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await prisma.diamond.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Diamond not found' });

    const newId = `D${Math.floor(10000 + Math.random() * 90000)}`;
    const duplicate = await prisma.diamond.create({
      data: {
        ...existing,
        id: undefined,
        diamondId: newId,
        stockId: existing.stockId ? `${existing.stockId}-COPY` : newId,
        sku: existing.sku ? `${existing.sku}-COPY` : newId,
        createdAt: undefined,
        updatedAt: undefined,
      },
    });

    res.status(201).json(duplicate);
  } catch (error) {
    console.error('duplicateDiamond error:', error);
    res.status(500).json({ message: 'Error duplicating diamond' });
  }
};
