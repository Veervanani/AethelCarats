import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

// Get all product detail sections & items for a product (Admin or Storefront)
export const getProductDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, title: true, slug: true, mainImage: true, category: true }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let sections = await prisma.productDetailSection.findMany({
      where: { productId },
      include: {
        items: {
          orderBy: { displayOrder: 'asc' }
        }
      },
      orderBy: { displayOrder: 'asc' }
    });

    if (sections.length === 0) {
      // Auto-seed default detail sections for this specific product ID
      for (let i = 0; i < DEFAULT_PRODUCT_SECTIONS.length; i++) {
        const sec = DEFAULT_PRODUCT_SECTIONS[i];
        const createdSec = await prisma.productDetailSection.create({
          data: {
            productId,
            title: sec.title,
            type: sec.type,
            description: sec.description,
            displayOrder: sec.displayOrder,
            isActive: true,
          }
        });

        if (sec.items && sec.items.length > 0) {
          const itemData = sec.items.map((item: any) => ({
            sectionId: createdSec.id,
            title: item.title || null,
            description: item.description || null,
            value: item.value || null,
            imageUrl: item.imageUrl || null,
            icon: item.icon || null,
            displayOrder: item.displayOrder,
            isActive: true,
          }));
          await prisma.productDetailItem.createMany({ data: itemData });
        }
      }

      sections = await prisma.productDetailSection.findMany({
        where: { productId },
        include: {
          items: {
            orderBy: { displayOrder: 'asc' }
          }
        },
        orderBy: { displayOrder: 'asc' }
      });
    }

    return res.json({ product, sections });
  } catch (error: any) {
    console.error('getProductDetails error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch product details' });
  }
};

const DEFAULT_PRODUCT_SECTIONS = [
  {
    type: 'OVERVIEW',
    title: 'Product Overview & Highlights',
    description: 'General narrative overview, craftsmanship highlights, and diamond description.',
    displayOrder: 0,
    items: [
      { title: 'Product Description', description: 'A luxury Floksy Jewel creation handcrafted in Surat, India.', displayOrder: 0 },
      { title: 'Craftsmanship Description', description: 'Hand-set under 40x microscopic precision by master artisans.', displayOrder: 1 },
      { title: 'Diamond & Gemstone Description', description: 'Certified conflict-free diamonds with Kimberley Process compliance.', displayOrder: 2 },
      { title: 'Customization Options', description: 'Customizable with 7 precious metal selections and bespoke engraving.', displayOrder: 3 }
    ]
  },
  {
    type: 'EXPERIENCE',
    title: 'YOUR FLOKSY JEWEL EXPERIENCE',
    description: 'Luxury atelier benefits and white-glove experience assurances.',
    displayOrder: 1,
    items: [
      { title: 'Expert Guidance', description: 'Consult directly with Floksy Jewel specialists for sizing and diamond guidance.', icon: 'UserCheck', displayOrder: 0 },
      { title: 'Bespoke Craftsmanship', description: 'Custom CAD 3D photorealistic rendering and master goldsmithing.', icon: 'Sparkles', displayOrder: 1 },
      { title: 'Quality Assurance', description: 'Independently certified by GIA / IGI with 40x microscopic quality control.', icon: 'ShieldCheck', displayOrder: 2 },
      { title: 'Lifetime Service', description: 'Includes complimentary annual prong checking, sizing, and professional cleaning.', icon: 'Award', displayOrder: 3 }
    ]
  },
  {
    type: 'SPECIFICATIONS',
    title: 'PRODUCT & DIAMOND SPECIFICATIONS',
    description: 'Technical diamond and metal specification breakdown.',
    displayOrder: 2,
    items: [
      { title: 'Product Type', value: 'Solitaire Ring', displayOrder: 0 },
      { title: 'Metal & Purity', value: '18K Yellow Gold', displayOrder: 1 },
      { title: 'Diamond Shape', value: 'Round Brilliant', displayOrder: 2 },
      { title: 'Diamond Type', value: 'Lab-Grown / Natural', displayOrder: 3 },
      { title: 'Diamond Carat Weight', value: '1.00 ct', displayOrder: 4 },
      { title: 'Diamond Color / Clarity', value: 'D / VS1', displayOrder: 5 },
      { title: 'Certification', value: 'IGI Certified', displayOrder: 6 },
      { title: 'Country of Origin', value: 'India (Surat Atelier)', displayOrder: 7 }
    ]
  },
  {
    type: 'CRAFTSMANSHIP',
    title: 'CRAFTSMANSHIP & SUSTAINABILITY',
    description: 'Recycled precious metals and ethical artisan heritage.',
    displayOrder: 3,
    items: [
      { title: '100% Recycled Precious Metals', description: 'Sustainably refined 18K gold and fine silver certified by RJC.', icon: 'Award', displayOrder: 0 },
      { title: 'Surat Goldsmith Heritage', description: 'Crafted individually by master jewelers with lifetime guarantee.', icon: 'Sparkles', displayOrder: 1 }
    ]
  },
  {
    type: 'SHIPPING',
    title: 'SHIPPING & DELIVERY',
    description: 'Complimentary insured courier shipping and returns timeline.',
    displayOrder: 4,
    items: [
      { title: 'Free Insured Delivery', description: 'Dispatched via fully insured FedEx Priority Air in unbranded security packaging.', icon: 'Truck', displayOrder: 0 },
      { title: '30-Day Money Back Guarantee', description: 'Complimentary returns and size adjustments within 30 days of receipt.', icon: 'ShieldCheck', displayOrder: 1 }
    ]
  }
];

// Save/Bulk update all product detail sections & items for a product
export const saveProductDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { sections } = req.body;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!Array.isArray(sections)) {
      return res.status(400).json({ message: 'Sections array is required' });
    }

    // Replace old sections and cascade-delete old items
    await prisma.productDetailSection.deleteMany({ where: { productId } });

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const createdSec = await prisma.productDetailSection.create({
        data: {
          productId,
          title: sec.title || 'Untitled Section',
          type: sec.type || 'CUSTOM',
          description: sec.description || null,
          displayOrder: sec.displayOrder !== undefined ? sec.displayOrder : i,
          isActive: sec.isActive !== undefined ? Boolean(sec.isActive) : true,
        }
      });

      if (sec.items && Array.isArray(sec.items) && sec.items.length > 0) {
        const itemData = sec.items.map((item: any, itemIdx: number) => ({
          sectionId: createdSec.id,
          title: item.title || null,
          description: item.description || null,
          value: item.value || null,
          imageUrl: item.imageUrl || null,
          icon: item.icon || null,
          displayOrder: item.displayOrder !== undefined ? item.displayOrder : itemIdx,
          isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
        }));
        await prisma.productDetailItem.createMany({ data: itemData });
      }
    }

    const updatedSections = await prisma.productDetailSection.findMany({
      where: { productId },
      include: {
        items: {
          orderBy: { displayOrder: 'asc' }
        }
      },
      orderBy: { displayOrder: 'asc' }
    });

    return res.json({
      message: 'Product details saved successfully!',
      sections: updatedSections
    });
  } catch (error: any) {
    console.error('saveProductDetails error:', error);
    return res.status(500).json({ message: error.message || 'Failed to save product details' });
  }
};
