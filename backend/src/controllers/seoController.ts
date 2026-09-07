import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../prisma';

export const getSeoMetadata = async (req: Request, res: Response) => {
  try {
    const { entityType, entityId, pageSlug } = req.query;

    let where: any = {};
    if (pageSlug) {
      const page = await prisma.page.findUnique({ where: { slug: pageSlug as string } });
      if (page) where.pageId = page.id;
    } else if (entityType && entityId) {
      where.entityType = entityType as string;
      where.entityId = entityId as string;
    }

    const seo = await prisma.seoMetadata.findFirst({ where });
    res.json(seo || {
      seoTitle: 'AURA DIAMOND ATELIER | High Jewellery & Natural Diamond Vault',
      metaDescription: 'Discover Aura Diamond Atelier bespoke fine jewellery collections and certified loose diamonds in The Diamond Vault.',
      canonicalUrl: 'https://auroradiamonds.com',
      robots: 'index, follow',
      ogTitle: 'AURA DIAMOND ATELIER | International Luxury Fine Jewellery',
      ogDescription: 'Certified natural & lab-grown diamonds, engagement rings, bespoke craftsmanship.',
      ogImage: '/assets/gem_hero_desktop.png',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SEO metadata' });
  }
};

export const updateSeoMetadata = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const existing = await prisma.seoMetadata.findFirst({
      where: {
        entityType: data.entityType || 'PAGE',
        entityId: data.entityId || null,
        pageId: data.pageId || null,
      },
    });

    let result;
    if (existing) {
      result = await prisma.seoMetadata.update({
        where: { id: existing.id },
        data,
      });
    } else {
      result = await prisma.seoMetadata.create({ data });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating SEO metadata' });
  }
};

export const getRedirects = async (req: Request, res: Response) => {
  try {
    const redirects = await prisma.redirect.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(redirects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching redirects' });
  }
};

export const createRedirect = async (req: AuthRequest, res: Response) => {
  try {
    const { oldUrl, newUrl, statusCode = 301 } = req.body;
    const redirect = await prisma.redirect.create({
      data: { oldUrl, newUrl, statusCode: parseInt(statusCode, 10) },
    });
    res.status(201).json(redirect);
  } catch (error) {
    res.status(500).json({ message: 'Error creating redirect rule' });
  }
};

export const generateSitemapXml = async (req: Request, res: Response) => {
  try {
    const baseUrl = process.env.PUBLIC_SITE_URL || 'https://auroradiamonds.com';

    const [products, diamonds, collections, pages] = await Promise.all([
      prisma.product.findMany({ where: { status: 'ACTIVE' }, select: { slug: true, updatedAt: true } }),
      prisma.diamond.findMany({ where: { status: 'AVAILABLE' }, select: { diamondId: true, updatedAt: true } }),
      prisma.collection.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.page.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
    ]);

    let urls = [
      { loc: `${baseUrl}/`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/rings`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/earrings`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/necklaces`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/bracelets`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/pendants`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/diamonds`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/custom-jewellery`, lastmod: new Date().toISOString() },
    ];

    for (const p of products) {
      urls.push({ loc: `${baseUrl}/rings/${p.slug}`, lastmod: p.updatedAt.toISOString() });
    }
    for (const d of diamonds) {
      urls.push({ loc: `${baseUrl}/diamonds/${d.diamondId}`, lastmod: d.updatedAt.toISOString() });
    }
    for (const c of collections) {
      urls.push({ loc: `${baseUrl}/collections/${c.slug}`, lastmod: c.updatedAt.toISOString() });
    }
    for (const pg of pages) {
      if (pg.slug !== 'home') {
        urls.push({ loc: `${baseUrl}/${pg.slug}`, lastmod: pg.updatedAt.toISOString() });
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (u) => `
    <url>
      <loc>${u.loc}</loc>
      <lastmod>${u.lastmod.split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap.xml');
  }
};

export const generateRobotsTxt = (req: Request, res: Response) => {
  const baseUrl = process.env.PUBLIC_SITE_URL || 'https://auroradiamonds.com';
  const txt = `User-agent: *
Disallow: /admin/
Disallow: /account/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

  res.header('Content-Type', 'text/plain');
  res.send(txt);
};
