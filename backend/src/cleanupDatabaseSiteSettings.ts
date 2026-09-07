import prisma from './prisma';

export async function cleanupDatabaseSiteSettings() {
  try {
    console.log('🔄 Cleaning up database SiteSetting, ProductPageContent, and Page tables...');

    // 1. UPDATE OR UPSERT INSTAGRAM URL IN DATABASE
    await prisma.siteSetting.upsert({
      where: { key: 'instagramUrl' },
      update: { value: 'https://www.instagram.com/auradiamondatelier' },
      create: { key: 'instagramUrl', value: 'https://www.instagram.com/auradiamondatelier' },
    });

    // 2. UPDATE OR UPSERT STORE ADDRESS IN DATABASE
    await prisma.siteSetting.upsert({
      where: { key: 'storeAddress' },
      update: { value: '740 Fifth Avenue, Suite 1800, New York, NY 10019' },
      create: { key: 'storeAddress', value: '740 Fifth Avenue, Suite 1800, New York, NY 10019' },
    });

    // 3. UPDATE OR UPSERT STORE NAME IN DATABASE
    await prisma.siteSetting.upsert({
      where: { key: 'storeName' },
      update: { value: 'AURA DIAMOND ATELIER' },
      create: { key: 'storeName', value: 'AURA DIAMOND ATELIER' },
    });

    // 4. CLEANUP FOOTER SETTINGS ROW IN DATABASE
    const footerRow = await prisma.siteSetting.findUnique({ where: { key: 'footer_settings' } });
    let footerObj: any = {
      brandName: 'AURA DIAMOND ATELIER',
      tagline: 'Fine Jewelry & Certified Solitaire Diamonds',
      logoImage: '/assets/gem_logo_light.svg',
      copyrightText: '© 2026 Aura Diamond Atelier. All Rights Reserved.',
      email: 'concierge@auroradiamonds.com',
      phone: '+1 (800) 555-2872',
      address: '740 Fifth Avenue, Suite 1800, New York, NY 10019',
      instagram: 'https://www.instagram.com/auradiamondatelier',
      facebook: 'https://facebook.com/auradiamondatelier',
      pinterest: 'https://pinterest.com/auradiamondatelier',
      trustBadgeImage: '/assets/trust_badges.png',
    };

    if (footerRow?.value) {
      try {
        const parsed = JSON.parse(footerRow.value);
        footerObj = { ...footerObj, ...parsed };
      } catch (e) {}
    }

    footerObj.brandName = 'AURA DIAMOND ATELIER';
    footerObj.address = '740 Fifth Avenue, Suite 1800, New York, NY 10019';
    footerObj.copyrightText = '© 2026 Aura Diamond Atelier. All Rights Reserved.';
    footerObj.instagram = 'https://www.instagram.com/auradiamondatelier';

    await prisma.siteSetting.upsert({
      where: { key: 'footer_settings' },
      update: { value: JSON.stringify(footerObj) },
      create: { key: 'footer_settings', value: JSON.stringify(footerObj) },
    });

    // 5. CLEANUP FOOTER CONFIG ROW IN DATABASE
    const footerConfigRow = await prisma.siteSetting.findUnique({ where: { key: 'footer_config' } });
    if (footerConfigRow?.value) {
      try {
        const parsedConfig = JSON.parse(footerConfigRow.value);
        parsedConfig.address = '740 Fifth Avenue, Suite 1800, New York, NY 10019';
        parsedConfig.brandDescription = parsedConfig.brandDescription ? parsedConfig.brandDescription.replace(/Mayfair/g, 'Fifth Avenue') : undefined;
        parsedConfig.copyrightText = '© 2026 AURA DIAMOND ATELIER. ALL RIGHTS RESERVED.';
        if (Array.isArray(parsedConfig.socialLinks)) {
          parsedConfig.socialLinks = parsedConfig.socialLinks.map((link: any) => {
            if (link && link.platform && link.platform.toLowerCase() === 'instagram') {
              return { ...link, url: 'https://www.instagram.com/auradiamondatelier' };
            }
            return link;
          });
        }
        await prisma.siteSetting.update({
          where: { key: 'footer_config' },
          data: { value: JSON.stringify(parsedConfig) },
        });
      } catch (e) {}
    }

    // 6. CLEANUP SITE SETTINGS ROW IN DATABASE
    const siteSettingsRow = await prisma.siteSetting.findUnique({ where: { key: 'site_settings' } });
    if (siteSettingsRow?.value) {
      try {
        const parsedSiteSettings = JSON.parse(siteSettingsRow.value);
        parsedSiteSettings.storeName = 'AURA DIAMOND ATELIER';
        parsedSiteSettings.storeAddress = '740 Fifth Avenue, Suite 1800, New York, NY 10019';
        parsedSiteSettings.instagramUrl = 'https://www.instagram.com/auradiamondatelier';
        await prisma.siteSetting.update({
          where: { key: 'site_settings' },
          data: { value: JSON.stringify(parsedSiteSettings) },
        });
      } catch (e) {}
    }

    // 6B. CLEANUP CONSULT EXPERT CONFIG & DESCRIPTION ROWS
    await prisma.siteSetting.upsert({
      where: { key: 'consultDescription' },
      update: { value: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.' },
      create: { key: 'consultDescription', value: 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.' },
    });

    const consultConfigRow = await prisma.siteSetting.findUnique({ where: { key: 'consult_expert_config' } });
    if (consultConfigRow?.value) {
      try {
        const parsedConsult = JSON.parse(consultConfigRow.value);
        parsedConsult.consultDescription = 'Speak directly with our jewelry specialists regarding custom design, diamond selection, or sizing guidance.';
        await prisma.siteSetting.update({
          where: { key: 'consult_expert_config' },
          data: { value: JSON.stringify(parsedConsult) },
        });
      } catch (e) {}
    }

    // 7. CLEANUP PRODUCT PAGE CONTENT ROWS IN DATABASE
    const allProductContents = await prisma.productPageContent.findMany();
    for (const pc of allProductContents) {
      let needsUpdate = false;
      let heroTitle = pc.heroTitle;
      let heroShortDescription = pc.heroShortDescription;
      let craftsmanshipDescription = pc.craftsmanshipDescription;
      let shippingInfoJson = pc.shippingInfoJson;

      if (heroTitle && heroTitle.includes('Mayfair')) {
        heroTitle = heroTitle.replace(/Mayfair/g, 'Fine');
        needsUpdate = true;
      }
      if (heroShortDescription && heroShortDescription.includes('Mayfair')) {
        heroShortDescription = heroShortDescription.replace(/Mayfair/g, 'Surat');
        needsUpdate = true;
      }
      if (craftsmanshipDescription && craftsmanshipDescription.includes('Mayfair')) {
        craftsmanshipDescription = craftsmanshipDescription.replace(/Mayfair/g, 'Surat');
        needsUpdate = true;
      }
      if (shippingInfoJson && shippingInfoJson.includes('Mayfair')) {
        shippingInfoJson = shippingInfoJson.replace(/Mayfair/g, 'Surat');
        needsUpdate = true;
      }

      if (needsUpdate) {
        await prisma.productPageContent.update({
          where: { id: pc.id },
          data: {
            heroTitle,
            heroShortDescription,
            craftsmanshipDescription,
            shippingInfoJson,
          },
        });
      }
    }

    console.log('✅ DATABASE CLEANUP COMPLETE: All SiteSettings and ProductPageContent rows updated directly in MySQL!');
  } catch (err) {
    console.error('❌ Error during database cleanup:', err);
  }
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].includes('cleanupDatabaseSiteSettings')) {
  cleanupDatabaseSiteSettings().then(() => process.exit(0));
}
