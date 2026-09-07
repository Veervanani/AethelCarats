import prisma from '../prisma';

async function cleanSettings() {
  console.log('Cleaning database site settings...');
  
  // 1. Update whatsappNumber scalar
  await prisma.siteSetting.upsert({
    where: { key: 'whatsappNumber' },
    update: { value: '+91973785306' },
    create: { key: 'whatsappNumber', value: '+91973785306' },
  });

  // 2. Update storeName scalar
  await prisma.siteSetting.upsert({
    where: { key: 'storeName' },
    update: { value: 'AURA DIAMOND ATELIER' },
    create: { key: 'storeName', value: 'AURA DIAMOND ATELIER' },
  });

  // 3. Update storeAddress scalar
  await prisma.siteSetting.upsert({
    where: { key: 'storeAddress' },
    update: { value: 'Surat, India' },
    create: { key: 'storeAddress', value: 'Surat, India' },
  });

  // 4. Update whatsapp_config
  const waConfig = {
    inquiryNumber: '+91973785306',
    displayNumber: '+91973785306',
    defaultMessage: 'Hello Aura Diamond Atelier, I am interested in your fine jewellery collection.',
  };
  await prisma.siteSetting.upsert({
    where: { key: 'whatsapp_config' },
    update: { value: JSON.stringify(waConfig) },
    create: { key: 'whatsapp_config', value: JSON.stringify(waConfig) },
  });

  // 5. Update footer_settings
  const existingFooterRow = await prisma.siteSetting.findUnique({ where: { key: 'footer_settings' } }).catch(() => null);
  let existingFooter: any = {};
  if (existingFooterRow?.value) {
    try {
      existingFooter = JSON.parse(existingFooterRow.value);
    } catch (e) {}
  }
  const fSettings = {
    ...existingFooter,
    brandName: 'AURA DIAMOND ATELIER',
    copyrightText: '© 2026 AURA DIAMOND ATELIER. ALL RIGHTS RESERVED.',
    tagline: 'Fine Jewelry & Certified Solitaire Diamonds',
    address: 'Surat, India',
    phone: '+91973785306',
    email: 'contact@auroradiamonds.com',
  };
  await prisma.siteSetting.upsert({
    where: { key: 'footer_settings' },
    update: { value: JSON.stringify(fSettings) },
    create: { key: 'footer_settings', value: JSON.stringify(fSettings) },
  });

  console.log('Site settings database cleanup complete!');
}

cleanSettings()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
