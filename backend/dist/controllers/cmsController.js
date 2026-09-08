"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMegaMenuCard = exports.updateMegaMenuCard = exports.createMegaMenuCard = exports.getMegaMenuCards = exports.updateMenu = exports.getMenus = exports.updatePageSections = exports.deletePage = exports.createPage = exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPostBySlug = exports.getBlogPosts = exports.deleteFaq = exports.updateFaq = exports.createFaq = exports.getFaqs = exports.restorePageRevision = exports.getPageRevisions = exports.publishPage = exports.savePageDraft = exports.getAllPages = exports.getPageBySlug = void 0;
const cmsSeedService_1 = require("../services/cmsSeedService");
const prisma_1 = __importDefault(require("../prisma"));
// Get single CMS Page by Slug
const getPageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        let page = await prisma_1.default.page.findUnique({
            where: { slug },
            include: {
                sections: { orderBy: { position: 'asc' } },
                seoMetadata: true,
                revisions: { orderBy: { createdAt: 'desc' }, take: 20 },
                faqs: { orderBy: { sortOrder: 'asc' } },
            },
        });
        if (!page) {
            const defaultData = cmsSeedService_1.INITIAL_22_PAGES_DATA[slug] || { heading: slug };
            const jsonStr = JSON.stringify(defaultData);
            const formattedTitle = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
            page = await prisma_1.default.page.create({
                data: {
                    title: formattedTitle,
                    slug,
                    content: jsonStr,
                    draftContent: jsonStr,
                    status: 'PUBLISHED',
                    lastPublishedAt: new Date(),
                    publishedBy: 'System',
                },
                include: {
                    sections: { orderBy: { position: 'asc' } },
                    seoMetadata: true,
                    revisions: { orderBy: { createdAt: 'desc' }, take: 20 },
                    faqs: { orderBy: { sortOrder: 'asc' } },
                },
            });
        }
        if (slug === 'home' && page && page.sections.length === 0) {
            for (const s of cmsSeedService_1.DEFAULT_HOMEPAGE_SECTIONS) {
                await prisma_1.default.pageSection.create({
                    data: {
                        pageId: page.id,
                        blockType: s.blockType,
                        position: s.position,
                        isVisible: s.isVisible,
                        content: s.content,
                    },
                });
            }
            page = await prisma_1.default.page.findUnique({
                where: { slug },
                include: {
                    sections: { orderBy: { position: 'asc' } },
                    seoMetadata: true,
                    revisions: { orderBy: { createdAt: 'desc' }, take: 20 },
                    faqs: { orderBy: { sortOrder: 'asc' } },
                },
            });
        }
        return res.json(page);
    }
    catch (error) {
        console.error('getPageBySlug error:', error);
        return res.status(500).json({ message: 'Error fetching CMS page' });
    }
};
exports.getPageBySlug = getPageBySlug;
// Get List of All 22+ Pages
const getAllPages = async (req, res) => {
    try {
        await (0, cmsSeedService_1.ensure22PagesContentSeeded)();
        const pages = await prisma_1.default.page.findMany({
            include: {
                _count: { select: { sections: true, revisions: true } },
                seoMetadata: true,
            },
            orderBy: { title: 'asc' },
        });
        return res.json(pages);
    }
    catch (error) {
        console.error('getAllPages error:', error);
        return res.status(500).json({ message: 'Error fetching pages list' });
    }
};
exports.getAllPages = getAllPages;
// Save Page Draft (does NOT alter published live content)
const savePageDraft = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, draftContent, sections, seoMetadata } = req.body;
        const adminUser = req.user?.email || 'Admin';
        let page = await prisma_1.default.page.findUnique({ where: { slug } });
        if (!page) {
            page = await prisma_1.default.page.create({
                data: { title: title || slug, slug, status: 'DRAFT' },
            });
        }
        const draftStr = typeof draftContent === 'string' ? draftContent : JSON.stringify(draftContent || {});
        // Record revision
        const revCount = await prisma_1.default.pageRevision.count({ where: { pageId: page.id } });
        await prisma_1.default.pageRevision.create({
            data: {
                pageId: page.id,
                version: revCount + 1,
                action: 'SAVE_DRAFT',
                adminUser,
                content: draftStr,
            },
        });
        // Update live content, draft content & modified timestamp
        await prisma_1.default.page.update({
            where: { id: page.id },
            data: {
                ...(title ? { title } : {}),
                content: draftStr,
                draftContent: draftStr,
                lastModifiedBy: adminUser,
            },
        });
        // Update SEO Metadata if provided
        if (seoMetadata) {
            await prisma_1.default.seoMetadata.upsert({
                where: { pageId: page.id },
                update: {
                    seoTitle: seoMetadata.seoTitle || page.title,
                    metaDescription: seoMetadata.metaDescription || '',
                    canonicalUrl: seoMetadata.canonicalUrl || '',
                    robots: seoMetadata.robots || 'index, follow',
                    ogTitle: seoMetadata.ogTitle || '',
                    ogDescription: seoMetadata.ogDescription || '',
                    ogImage: seoMetadata.ogImage || '',
                    twitterTitle: seoMetadata.twitterTitle || '',
                    twitterDescription: seoMetadata.twitterDescription || '',
                    twitterImage: seoMetadata.twitterImage || '',
                },
                create: {
                    pageId: page.id,
                    seoTitle: seoMetadata.seoTitle || page.title,
                    metaDescription: seoMetadata.metaDescription || '',
                    canonicalUrl: seoMetadata.canonicalUrl || '',
                    robots: seoMetadata.robots || 'index, follow',
                },
            });
        }
        // Update Sections if provided
        if (Array.isArray(sections)) {
            await prisma_1.default.pageSection.deleteMany({ where: { pageId: page.id } });
            for (let i = 0; i < sections.length; i++) {
                const s = sections[i];
                await prisma_1.default.pageSection.create({
                    data: {
                        pageId: page.id,
                        blockType: s.blockType || 'SECTION',
                        position: i + 1,
                        content: typeof s.content === 'string' ? s.content : JSON.stringify(s.content || {}),
                        isVisible: s.isVisible ?? true,
                    },
                });
            }
        }
        const updated = await prisma_1.default.page.findUnique({
            where: { id: page.id },
            include: {
                sections: { orderBy: { position: 'asc' } },
                seoMetadata: true,
                revisions: { orderBy: { createdAt: 'desc' }, take: 20 },
            },
        });
        return res.json(updated);
    }
    catch (error) {
        console.error('savePageDraft error:', error);
        return res.status(500).json({ message: 'Error saving page draft' });
    }
};
exports.savePageDraft = savePageDraft;
// Publish Page (copies draftContent to live content)
const publishPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const { draftContent, sections, seoMetadata, title } = req.body;
        const adminUser = req.user?.email || 'Admin';
        let page = await prisma_1.default.page.findUnique({ where: { slug } });
        if (!page) {
            page = await prisma_1.default.page.create({
                data: {
                    title: title || (slug === 'home' ? 'Homepage' : slug.replace(/-/g, ' ')),
                    slug,
                    status: 'PUBLISHED',
                    content: typeof draftContent === 'string' ? draftContent : JSON.stringify(draftContent || {}),
                    draftContent: typeof draftContent === 'string' ? draftContent : JSON.stringify(draftContent || {}),
                    lastPublishedAt: new Date(),
                    publishedBy: adminUser,
                },
            });
        }
        const finalContentStr = draftContent
            ? typeof draftContent === 'string'
                ? draftContent
                : JSON.stringify(draftContent)
            : page.draftContent || page.content || '{}';
        const revCount = await prisma_1.default.pageRevision.count({ where: { pageId: page.id } });
        await prisma_1.default.pageRevision.create({
            data: {
                pageId: page.id,
                version: revCount + 1,
                action: 'PUBLISH',
                adminUser,
                content: finalContentStr,
            },
        });
        await prisma_1.default.page.update({
            where: { id: page.id },
            data: {
                ...(title ? { title } : {}),
                content: finalContentStr,
                draftContent: finalContentStr,
                status: 'PUBLISHED',
                lastPublishedAt: new Date(),
                publishedBy: adminUser,
                lastModifiedBy: adminUser,
            },
        });
        if (seoMetadata) {
            await prisma_1.default.seoMetadata.upsert({
                where: { pageId: page.id },
                update: {
                    seoTitle: seoMetadata.seoTitle || page.title,
                    metaDescription: seoMetadata.metaDescription || '',
                    canonicalUrl: seoMetadata.canonicalUrl || '',
                    robots: seoMetadata.robots || 'index, follow',
                    ogTitle: seoMetadata.ogTitle || '',
                    ogDescription: seoMetadata.ogDescription || '',
                    ogImage: seoMetadata.ogImage || '',
                },
                create: {
                    pageId: page.id,
                    seoTitle: seoMetadata.seoTitle || page.title,
                    metaDescription: seoMetadata.metaDescription || '',
                },
            });
        }
        if (Array.isArray(sections)) {
            await prisma_1.default.pageSection.deleteMany({ where: { pageId: page.id } });
            for (let i = 0; i < sections.length; i++) {
                const s = sections[i];
                await prisma_1.default.pageSection.create({
                    data: {
                        pageId: page.id,
                        blockType: s.blockType || 'SECTION',
                        position: i + 1,
                        content: typeof s.content === 'string' ? s.content : JSON.stringify(s.content || {}),
                        isVisible: s.isVisible ?? true,
                    },
                });
            }
            // Synchronize HeroBanner table if home hero section was edited & published
            if (slug === 'home') {
                const heroSec = sections.find((s) => s.blockType === 'HERO' || String(s.id).includes('hero'));
                if (heroSec && heroSec.content) {
                    try {
                        const hContent = typeof heroSec.content === 'string' ? JSON.parse(heroSec.content) : (heroSec.content || {});
                        const formatImg = (img) => {
                            if (!img || typeof img !== 'string')
                                return '';
                            const str = img.trim();
                            if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/uploads/') || str.startsWith('/assets/'))
                                return str;
                            if (str.startsWith('img_'))
                                return `/uploads/media/${str}`;
                            if (!str.startsWith('/'))
                                return `/assets/${str}`;
                            return str;
                        };
                        const desktopImg = formatImg(hContent.desktopImage || hContent.image);
                        const mobileImg = formatImg(hContent.mobileImage || hContent.tabletImage || hContent.desktopImage || hContent.image);
                        const existingHero = await prisma_1.default.heroBanner.findFirst({ orderBy: { displayOrder: 'asc' } });
                        if (existingHero) {
                            await prisma_1.default.heroBanner.update({
                                where: { id: existingHero.id },
                                data: {
                                    title: hContent.title || existingHero.title,
                                    subtitle: hContent.eyebrow || hContent.subtitle || existingHero.subtitle,
                                    description: hContent.description !== undefined ? hContent.description : existingHero.description,
                                    primaryCtaText: hContent.primaryBtnText || hContent.primaryCtaText || existingHero.primaryCtaText,
                                    primaryCtaLink: hContent.primaryBtnLink || hContent.primaryCtaLink || existingHero.primaryCtaLink,
                                    secondaryCtaText: hContent.secondaryBtnText !== undefined ? hContent.secondaryBtnText : existingHero.secondaryCtaText,
                                    secondaryCtaLink: hContent.secondaryBtnLink !== undefined ? hContent.secondaryBtnLink : existingHero.secondaryCtaLink,
                                    ...(desktopImg ? { imagePath: desktopImg } : {}),
                                    ...(mobileImg ? { mobileImagePath: mobileImg } : {}),
                                    isActive: heroSec.isVisible !== false,
                                },
                            });
                        }
                        else {
                            await prisma_1.default.heroBanner.create({
                                data: {
                                    title: hContent.title || 'Handcrafted Fine Jewelry',
                                    subtitle: hContent.eyebrow || hContent.subtitle || 'AURA DIAMOND ATELIER',
                                    description: hContent.description || '',
                                    primaryCtaText: hContent.primaryBtnText || 'Explore Collection',
                                    primaryCtaLink: hContent.primaryBtnLink || '/rings',
                                    secondaryCtaText: hContent.secondaryBtnText || '',
                                    secondaryCtaLink: hContent.secondaryBtnLink || '',
                                    imagePath: desktopImg || '/assets/gem_hero_luxury.png',
                                    mobileImagePath: mobileImg || desktopImg || '/assets/gem_hero_luxury.png',
                                    isActive: heroSec.isVisible !== false,
                                    displayOrder: 1,
                                },
                            });
                        }
                    }
                    catch (syncErr) {
                        console.warn('Hero section sync to HeroBanner notice:', syncErr);
                    }
                }
            }
        }
        const updated = await prisma_1.default.page.findUnique({
            where: { id: page.id },
            include: {
                sections: { orderBy: { position: 'asc' } },
                seoMetadata: true,
                revisions: { orderBy: { createdAt: 'desc' }, take: 20 },
            },
        });
        return res.json(updated);
    }
    catch (error) {
        console.error('publishPage error:', error);
        return res.status(500).json({ message: 'Error publishing page' });
    }
};
exports.publishPage = publishPage;
// Revisions History & Restore
const getPageRevisions = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await prisma_1.default.page.findUnique({ where: { slug } });
        if (!page)
            return res.status(404).json({ message: 'Page not found' });
        const revisions = await prisma_1.default.pageRevision.findMany({
            where: { pageId: page.id },
            orderBy: { createdAt: 'desc' },
        });
        return res.json(revisions);
    }
    catch (error) {
        console.error('getPageRevisions error:', error);
        return res.status(500).json({ message: 'Error fetching revisions' });
    }
};
exports.getPageRevisions = getPageRevisions;
const restorePageRevision = async (req, res) => {
    try {
        const { slug, revisionId } = req.params;
        const revision = await prisma_1.default.pageRevision.findUnique({ where: { id: revisionId } });
        if (!revision)
            return res.status(404).json({ message: 'Revision not found' });
        const page = await prisma_1.default.page.findUnique({ where: { slug } });
        if (!page)
            return res.status(404).json({ message: 'Page not found' });
        await prisma_1.default.page.update({
            where: { id: page.id },
            data: {
                draftContent: revision.content,
                lastModifiedBy: req.user?.email || 'Admin',
            },
        });
        const updated = await prisma_1.default.page.findUnique({
            where: { id: page.id },
            include: {
                sections: { orderBy: { position: 'asc' } },
                seoMetadata: true,
                revisions: { orderBy: { createdAt: 'desc' }, take: 20 },
            },
        });
        return res.json(updated);
    }
    catch (error) {
        console.error('restorePageRevision error:', error);
        return res.status(500).json({ message: 'Error restoring revision' });
    }
};
exports.restorePageRevision = restorePageRevision;
// FAQ MANAGER
const getFaqs = async (req, res) => {
    try {
        const { category } = req.query;
        const where = {};
        if (category && category !== 'ALL')
            where.category = String(category);
        let faqs = await prisma_1.default.faqItem.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });
        if (faqs.length === 0 && !category) {
            // Seed initial FAQ data if empty
            const initialFaqs = [
                { question: 'What diamond certifications do you provide?', answer: 'We exclusively offer GIA and IGI certified natural and lab-grown diamonds.', category: 'Diamonds', sortOrder: 1 },
                { question: 'How long does a custom CAD engagement ring take?', answer: 'Custom 3D CAD design renderings are delivered in 24 hours. Complete crafting takes 2-3 weeks.', category: 'Custom Jewellery', sortOrder: 2 },
                { question: 'What is your return and exchange policy?', answer: 'We offer a complimentary 30-day return policy on all unworn, non-customized jewellery.', category: 'Returns', sortOrder: 3 },
                { question: 'Are your shipments fully insured?', answer: 'Yes, 100% of shipments are fully insured by Lloyds of London with adult signature required.', category: 'Shipping', sortOrder: 4 },
                { question: 'Do you offer a Diamond Price Match Guarantee?', answer: 'Yes, we match or beat any certified GIA or IGI diamond price from authorized retailers.', category: 'Diamonds', sortOrder: 5 },
            ];
            await prisma_1.default.faqItem.createMany({ data: initialFaqs });
            faqs = await prisma_1.default.faqItem.findMany({ orderBy: { sortOrder: 'asc' } });
        }
        return res.json(faqs);
    }
    catch (error) {
        console.error('getFaqs error:', error);
        return res.status(500).json({ message: 'Error fetching FAQs' });
    }
};
exports.getFaqs = getFaqs;
const createFaq = async (req, res) => {
    try {
        const { question, answer, category = 'General', sortOrder = 0, isPublished = true } = req.body;
        if (!question || !answer)
            return res.status(400).json({ message: 'Question and answer are required' });
        const faq = await prisma_1.default.faqItem.create({
            data: { question, answer, category, sortOrder: Number(sortOrder), isPublished: Boolean(isPublished) },
        });
        return res.status(201).json(faq);
    }
    catch (error) {
        console.error('createFaq error:', error);
        return res.status(500).json({ message: 'Error creating FAQ' });
    }
};
exports.createFaq = createFaq;
const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, category, sortOrder, isPublished } = req.body;
        const faq = await prisma_1.default.faqItem.update({
            where: { id },
            data: {
                ...(question !== undefined && { question }),
                ...(answer !== undefined && { answer }),
                ...(category !== undefined && { category }),
                ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
                ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
            },
        });
        return res.json(faq);
    }
    catch (error) {
        console.error('updateFaq error:', error);
        return res.status(500).json({ message: 'Error updating FAQ' });
    }
};
exports.updateFaq = updateFaq;
const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.faqItem.delete({ where: { id } });
        return res.json({ message: 'FAQ deleted successfully' });
    }
    catch (error) {
        console.error('deleteFaq error:', error);
        return res.status(500).json({ message: 'Error deleting FAQ' });
    }
};
exports.deleteFaq = deleteFaq;
// BLOG MANAGER
const getBlogPosts = async (req, res) => {
    try {
        let posts = await prisma_1.default.blogPost.findMany({
            orderBy: { publishDate: 'desc' },
        });
        if (posts.length === 0) {
            // Seed initial blog posts
            const initialPosts = [
                {
                    title: 'The Ultimate Guide to GIA vs IGI Diamond Certification',
                    slug: 'gia-vs-igi-diamond-certification-guide',
                    author: 'Master Gemologist',
                    excerpt: 'Understanding key differences in diamond grading standards, cut proportions, and value retention.',
                    content: '<h2>Demystifying Laboratory Diamond Certification</h2><p>When purchasing a diamond over 0.50 carats, independent laboratory certification ensures you receive exact gemological specifications.</p>',
                    featuredImage: '/assets/gem_diamonds_cat.png',
                    isPublished: true,
                },
                {
                    title: 'Solitaire vs Halo Engagement Rings: Which Silhouette Suits You?',
                    slug: 'solitaire-vs-halo-engagement-ring-guide',
                    author: 'Atelier Designer',
                    excerpt: 'Comparing classic solitaire elegance with light-enhancing halo settings in 18K yellow gold and platinum.',
                    content: '<h2>Choosing Your Perfect Engagement Ring Setting</h2><p>Solitaire settings accentuate pure diamond geometry, while halo designs amplify visual presence.</p>',
                    featuredImage: '/assets/gem_rings_cat.png',
                    isPublished: true,
                },
            ];
            await prisma_1.default.blogPost.createMany({ data: initialPosts });
            posts = await prisma_1.default.blogPost.findMany({ orderBy: { publishDate: 'desc' } });
        }
        return res.json(posts);
    }
    catch (error) {
        console.error('getBlogPosts error:', error);
        return res.status(500).json({ message: 'Error fetching blog posts' });
    }
};
exports.getBlogPosts = getBlogPosts;
const getBlogPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma_1.default.blogPost.findUnique({ where: { slug } });
        if (!post)
            return res.status(404).json({ message: 'Blog post not found' });
        return res.json(post);
    }
    catch (error) {
        console.error('getBlogPostBySlug error:', error);
        return res.status(500).json({ message: 'Error fetching blog post' });
    }
};
exports.getBlogPostBySlug = getBlogPostBySlug;
const createBlogPost = async (req, res) => {
    try {
        const { title, slug, author, featuredImage, excerpt, content, seoTitle, metaDescription, keywords, isPublished } = req.body;
        if (!title || !content)
            return res.status(400).json({ message: 'Title and content are required' });
        const cleanSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const post = await prisma_1.default.blogPost.create({
            data: {
                title,
                slug: cleanSlug,
                author: author || 'Atelier Concierge',
                featuredImage,
                excerpt,
                content,
                seoTitle,
                metaDescription,
                keywords,
                isPublished: isPublished ?? true,
            },
        });
        return res.status(201).json(post);
    }
    catch (error) {
        console.error('createBlogPost error:', error);
        return res.status(500).json({ message: 'Error creating blog post' });
    }
};
exports.createBlogPost = createBlogPost;
const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const post = await prisma_1.default.blogPost.update({
            where: { id },
            data,
        });
        return res.json(post);
    }
    catch (error) {
        console.error('updateBlogPost error:', error);
        return res.status(500).json({ message: 'Error updating blog post' });
    }
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.blogPost.delete({ where: { id } });
        return res.json({ message: 'Blog post deleted successfully' });
    }
    catch (error) {
        console.error('deleteBlogPost error:', error);
        return res.status(500).json({ message: 'Error deleting blog post' });
    }
};
exports.deleteBlogPost = deleteBlogPost;
// Existing Menu and Page operations
const createPage = async (req, res) => {
    try {
        const { title, slug, content, status } = req.body;
        if (!title || !slug)
            return res.status(400).json({ message: 'Title and slug required' });
        const page = await prisma_1.default.page.create({
            data: { title, slug, content, draftContent: content, status: status || 'PUBLISHED' },
        });
        return res.json(page);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating page' });
    }
};
exports.createPage = createPage;
const deletePage = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await prisma_1.default.page.findUnique({ where: { slug } });
        if (!page)
            return res.status(404).json({ message: 'Page not found' });
        if (slug === 'home')
            return res.status(400).json({ message: 'Cannot delete primary homepage' });
        await prisma_1.default.page.delete({ where: { id: page.id } });
        return res.json({ message: 'Page deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting page' });
    }
};
exports.deletePage = deletePage;
const updatePageSections = async (req, res) => {
    return (0, exports.savePageDraft)(req, res);
};
exports.updatePageSections = updatePageSections;
const getMenus = async (req, res) => {
    try {
        const menus = await prisma_1.default.menu.findMany({ include: { items: { orderBy: { position: 'asc' } } } });
        return res.json(menus);
    }
    catch (error) {
        console.warn('getMenus database warning (returning fallback []):', error);
        return res.json([]);
    }
};
exports.getMenus = getMenus;
const updateMenu = async (req, res) => {
    try {
        const { location } = req.params;
        const { items } = req.body;
        let menu = await prisma_1.default.menu.findUnique({ where: { location } });
        if (!menu)
            menu = await prisma_1.default.menu.create({ data: { name: `${location} Menu`, location } });
        await prisma_1.default.menuItem.deleteMany({ where: { menuId: menu.id } });
        if (Array.isArray(items)) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                await prisma_1.default.menuItem.create({
                    data: {
                        menuId: menu.id,
                        title: item.title,
                        url: item.url,
                        position: i + 1,
                        megaMenu: item.megaMenu ? (typeof item.megaMenu === 'string' ? item.megaMenu : JSON.stringify(item.megaMenu)) : null,
                        isVisible: item.isVisible ?? true,
                    },
                });
            }
        }
        const updated = await prisma_1.default.menu.findUnique({ where: { id: menu.id }, include: { items: { orderBy: { position: 'asc' } } } });
        return res.json(updated);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating menu' });
    }
};
exports.updateMenu = updateMenu;
const getMegaMenuCards = async (req, res) => {
    try {
        const cards = await prisma_1.default.megaMenuCard.findMany({ orderBy: { sortOrder: 'asc' } });
        return res.json(cards);
    }
    catch (error) {
        console.warn('getMegaMenuCards database warning (returning fallback []):', error);
        return res.json([]);
    }
};
exports.getMegaMenuCards = getMegaMenuCards;
const createMegaMenuCard = async (req, res) => {
    try {
        const card = await prisma_1.default.megaMenuCard.create({ data: req.body });
        return res.json(card);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating mega menu card' });
    }
};
exports.createMegaMenuCard = createMegaMenuCard;
const updateMegaMenuCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await prisma_1.default.megaMenuCard.update({ where: { id }, data: req.body });
        return res.json(card);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating mega menu card' });
    }
};
exports.updateMegaMenuCard = updateMegaMenuCard;
const deleteMegaMenuCard = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.megaMenuCard.delete({ where: { id } });
        return res.json({ message: 'Card deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting mega menu card' });
    }
};
exports.deleteMegaMenuCard = deleteMegaMenuCard;
