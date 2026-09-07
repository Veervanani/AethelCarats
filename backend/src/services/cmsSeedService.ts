import prisma from '../prisma';

export const INITIAL_22_PAGES_DATA: Record<string, any> = {
  'contact-us': {
    heading: 'Contact Aura Diamond Atelier Concierge',
    subheading: 'Our dedicated high-jewellery advisors are available to assist you with bespoke commissions, diamond sourcing, and order inquiries.',
    customerCareHeading: 'Aura Atelier Customer Care',
    customerCareDescription: 'Experience our white-glove concierge service. Reach out via phone, WhatsApp, email, or schedule an in-person private appointment.',
    phone: '+1 (800) 555-2872',
    phoneLabel: 'Client Concierge Direct',
    businessHours: 'Monday – Saturday: 9:00 AM – 7:00 PM EST',
    email: 'concierge@auroradiamonds.com',
    emailLabel: 'Direct Email Assistance',
    responseTime: 'Guaranteed response within 2 business hours',
    address: '740 Fifth Avenue, Suite 1800, New York, NY 10019',
    locationLabel: 'Fifth Avenue Flagship Atelier',
    appointmentDescription: 'Private showroom consultations available by appointment only.',
    formHeading: 'Send a Private Inquiry',
    formDescription: 'Please complete the form below and an Atelier specialist will contact you promptly.',
    enquiryTypes: [
      { id: '1', name: 'Diamond Sourcing & Vault Inquiry', isEnabled: true },
      { id: '2', name: 'Bespoke Custom CAD Design', isEnabled: true },
      { id: '3', name: 'High Jewellery Orders', isEnabled: true },
      { id: '4', name: 'Private Showroom Appointment', isEnabled: true },
      { id: '5', name: 'Wholesale & B2B Inquiries', isEnabled: true },
      { id: '6', name: 'General Concierge Question', isEnabled: true },
    ],
    formFields: [
      { id: 'firstName', label: 'First Name', required: true, isEnabled: true },
      { id: 'lastName', label: 'Last Name', required: true, isEnabled: true },
      { id: 'email', label: 'Email Address', required: true, isEnabled: true },
      { id: 'phone', label: 'Phone / WhatsApp', required: false, isEnabled: true },
      { id: 'enquiryType', label: 'Enquiry Type', required: true, isEnabled: true },
      { id: 'message', label: 'Message / Design Details', required: true, isEnabled: true },
    ],
    buttons: [
      { id: 'b1', text: 'Send Inquiry', link: '#submit', style: 'primary', isVisible: true },
      { id: 'b2', text: 'WhatsApp Us', link: 'https://wa.me/18005553565', style: 'gold', isVisible: true },
      { id: 'b3', text: 'Call Concierge', link: 'tel:+18005553565', style: 'secondary', isVisible: true },
      { id: 'b4', text: 'Book Appointment', link: '/contact-us#appointment', style: 'secondary', isVisible: true },
    ],
  },

  'returns-refunds': {
    heading: 'Returns & Refund Policy',
    subheading: 'We offer a complimentary 30-day return policy on all non-customized fine jewellery and loose diamonds.',
    introduction: 'At Aura Diamond Atelier, your complete satisfaction is paramount. If for any reason you are not completely enchanted with your purchase, you may return it within 30 days of receipt.',
    returnEligibility: 'Items must be returned in original, unworn condition with all original certification documents, security tags intact, and luxury box packaging.',
    returnWindow: '30 Days from date of delivery',
    nonReturnableItems: 'Custom CAD bespoke jewellery, engraved items, altered ring sizes beyond standard range, and damaged items.',
    returnProcess: 'Contact concierge@auroradiamonds.com to receive a fully insured prepaid FedEx shipping label and Return Authorization (RA) number.',
    inspectionProcess: 'Every returned gemstone and diamond undergoes microscopic inspection by GIA-certified gemologists to verify certificate matching.',
    refundProcess: 'Refunds are credited back to the original payment method after gemological inspection approval.',
    refundTiming: 'Processed within 3-5 business days of inspection completion.',
    shippingResponsibility: 'Aura Diamond Atelier provides complimentary insured return shipping labels for all domestic returns.',
    customJewelleryRules: 'Bespoke custom items are final sale. Ring resize adjustments are covered under our Lifetime Service Guarantee.',
    diamondRules: 'Loose diamonds must be returned with their original GIA / IGI paper certificates. Lost certificates incur a $250 laboratory replacement fee.',
    importantNotes: 'Returns received without an RA number or after 30 days will be returned to sender.',
  },

  'shipping-delivery': {
    heading: 'Complimentary Insured Worldwide Shipping',
    subheading: 'Every Aura Diamond Atelier creation is dispatched via fully insured priority express air transportation.',
    introduction: 'We understand the value of your purchase. That is why every shipment is fully insured by Lloyds of London from our atelier vault directly to your hands.',
    shippingInformation: 'All packages are shipped in discreet, unbranded outer packaging for security.',
    shippingCountries: 'United States, Canada, United Kingdom, European Union, Australia, UAE, Singapore, Japan, Switzerland, Hong Kong, and 50+ countries.',
    processingTime: 'In-stock items ship within 1-2 business days. Custom and resized orders require 5-10 crafting business days.',
    deliveryTime: 'Domestic Overnight Express (1 Business Day). International Priority Air (2-4 Business Days).',
    insuranceInformation: '100% full transit insurance coverage included on every order at no extra charge.',
    courierInformation: 'Dispatched via FedEx Priority Overnight or Malca-Amit Armored Express.',
    signatureRequirement: 'Adult Signature Required upon delivery. Packages cannot be left unattended or diverted to secondary addresses.',
    shippingCharges: 'Complimentary Priority Express Shipping on all orders over $500.',
    freeShippingRules: 'All domestic US & Canada orders include complimentary FedEx Priority Overnight.',
    internationalShipping: 'International orders ship DDP (Delivered Duty Paid) or DDU depending on country customs regulations.',
    customsInformation: 'Customs duties and taxes are calculated transparently at checkout.',
    importantNotes: 'You will receive an encrypted tracking code as soon as your shipment is dispatched.',
  },

  'sustainability': {
    heading: 'Ethical Sourcing & Conflict-Free Diamonds',
    subheading: 'Our unwavering commitment to ethical sourcing, Kimberley Process compliance, and environmental stewardship.',
    introduction: 'Aura Diamond Atelier strictly enforces a zero-tolerance policy against conflict diamonds. Every natural diamond is 100% Kimberley Process certified.',
    conflictFreePolicy: 'We only partner with vetted sightholders and diamond cutters who adhere strictly to international human rights and labor standards.',
    diamondSourcing: 'Our natural diamonds originate from certified mines in Canada, Botswana, Namibia, and Australia.',
    labGrownDiamonds: 'We offer climate-neutral lab-grown diamonds created using 100% renewable solar and hydro energy in state-of-the-art reactors.',
    naturalDiamonds: 'Our natural diamonds are ethically mined, supporting local community development, education, and healthcare initiatives.',
    responsibleManufacturing: 'Our Fifth Avenue atelier utilizes 100% recycled 18K gold and silver to minimize environmental mining impact.',
    environmentalInformation: 'Zero-waste luxury packaging crafted from FSC-certified sustainable timber and organic velvet.',
    certifications: 'Kimberley Process Compliant, Responsible Jewellery Council (RJC) Certified, GIA & IGI Verified.',
    additionalInformation: 'Transparency is our guarantee. Every stone over 0.50ct includes a laser-inscribed girdle number.',
  },

  'price-match': {
    heading: 'Diamond Price Match Guarantee',
    subheading: 'If you find an identical GIA or IGI certified diamond at a lower price, Aura Diamond Atelier will match or beat the price.',
    introduction: 'We are committed to delivering the highest value in fine jewellery. Our global direct diamond sourcing allows us to offer unbeatable prices.',
    eligibility: 'The diamond must be currently available for purchase on a US or international retailer website.',
    requirements: 'Must have exact matching 4Cs (Carat, Cut, Color, Clarity), fluorescence, polish, symmetry, and lab certification (GIA/IGI).',
    excludedProducts: 'Promotional auctions, clearance liquidations, secondary market pawn inventory, and uncertified stones.',
    howItWorks: 'Submit the competitor diamond URL or certificate number to concierge@auroradiamonds.com.',
    verificationProcess: 'Our gemologists verify the competitor diamond availability and grading match within 4 business hours.',
    terms: 'Price match applies to the final diamond cost before taxes and shipping.',
    buttonText: 'Submit Price Match Request',
    buttonUrl: '/contact-us?subject=Price+Match',
  },

  'lifetime-warranty': {
    heading: 'Aura Diamond Atelier Lifetime Warranty',
    subheading: 'Every fine jewellery piece is backed by our comprehensive lifetime craftsmanship guarantee.',
    introduction: 'We stand behind the quality and craftsmanship of every piece we create. Your jewellery is guaranteed against manufacturing defects for life.',
    coverage: 'Covers prong tightening, diamond inspection, ultrasonic cleaning, steam polishing, and manufacturing defect repairs.',
    eligibility: 'Applies to all authentic Aura Diamond Atelier rings, necklaces, bracelets, earrings, and custom CAD creations.',
    whatsIncluded: 'Free lifetime annual inspection, prong re-tipping, rhodium re-plating for white gold, and deep cleaning.',
    whatsExcluded: 'Normal wear and tear, trauma damage, accidental loss, theft, or repairs conducted by third-party jewelers.',
    claimProcess: 'Bring your item to our Fifth Avenue atelier or ship it using our insured concierge shipping program.',
    warrantyDuration: 'Lifetime coverage for the original purchaser.',
    importantInformation: 'Third-party alterations void the warranty. Annual inspection recommended to maintain stone security.',
    buttonText: 'Schedule Maintenance Inspection',
    buttonUrl: '/contact-us#inspection',
  },

  'insurance': {
    heading: 'Jewellery Insurance & Protection',
    subheading: 'Protect your valuable fine jewellery against accidental loss, theft, and damage with specialized coverage.',
    introduction: 'Your fine jewellery is an investment in beauty and memory. We partner with leading appraisal networks and insurers to safeguard your collection.',
    insuranceInformation: 'We provide complimentary certified gemological appraisal certificates for all purchases over $1,000.',
    coverage: 'Worldwide protection against mysterious disappearance, loss, theft, damage, and stone chipping.',
    eligibility: 'All natural diamonds, lab-grown diamonds, high jewellery, and custom engagement rings.',
    claims: 'Fast claims processing with direct replacement through Aura Diamond Atelier.',
    importantInformation: 'Most standard homeowners policies cap jewellery coverage. Dedicated jewellery insurance guarantees full replacement value.',
    buttonText: 'Download Complimentary Appraisal',
    buttonUrl: '/account#appraisals',
  },

  'about-us': {
    heading: 'Quality & Value — The Aura Atelier Legacy',
    subheading: 'Handcrafted luxury, uncompromised diamond excellence, and direct atelier pricing.',
    introduction: 'Founded on Fifth Avenue, Aura Diamond Atelier bridges master European goldsmithing traditions with modern precision diamond cutting.',
    brandStory: 'Aura Diamond Atelier was born out of a desire to eliminate bloated traditional luxury markups. By sourcing rough diamonds directly and hand-forging settings in-house, we deliver high jewellery at unprecedented value.',
    ourValues: 'Integrity, unyielding quality, complete diamond certification transparency, and personalized client relationships.',
    quality: 'Only the top 1% of gem-grade diamonds are selected for Aura Diamond Atelier settings.',
    craftsmanship: 'Every ring is individually hand-cast in heavy solid 18K gold or 950 Platinum, never hollowed or micro-plated.',
    manufacturing: 'Our master goldsmiths average 20+ years of bench experience in New York and Geneva.',
    diamonds: 'Exclusively certified by GIA (Gemological Institute of America) and IGI.',
    jewellery: 'Elegantly proportioned silhouettes designed to maximize light performance and fire.',
    whyAuraDiamond: 'Direct diamond sourcing, bespoke CAD customization, conflict-free guarantee, and lifetime warranty.',
  },

  'faq': {
    heading: 'Frequently Asked Questions',
    subheading: 'Find answers to common questions about diamond certification, custom CAD designs, shipping, returns, and ordering.',
    introduction: 'Browse our comprehensive help categories below or contact our concierge team directly.',
  },

  'blog': {
    heading: 'The Aura Atelier Journal',
    subheading: 'Insights, diamond buying guides, high jewellery trends, and style inspiration from our gemologists.',
    introduction: 'Explore our latest articles on diamond grading, ring sizing, metal selection, and bespoke jewellery trends.',
  },

  'sale-exclusions': {
    heading: 'Promotional Terms & Sale Exclusions',
    subheading: 'Important information regarding promotional codes, discounts, and site-wide sales.',
    introduction: 'Unless explicitly stated otherwise, promotional codes and site-wide discount offers are subject to standard atelier terms.',
    exclusionRules: 'Promotional codes cannot be combined with price matches, finance plans, or other discount codes.',
    excludedProducts: 'Loose certified diamonds, custom CAD commissions, special order high jewellery, and gift cards.',
    excludedCategories: 'Loose Diamond Vault, Bespoke Custom Services.',
    importantNotes: 'Discounts apply strictly to setting prices and ready-to-wear fine jewellery unless specified.',
    buttonText: 'Contact Concierge',
    buttonUrl: '/contact-us',
  },

  'custom-jewellery': {
    heading: 'Bespoke Custom Jewellery & 3D CAD Design',
    subheading: 'Transform your vision into a one-of-a-kind heirloom piece created specifically for you.',
    introduction: 'Our custom design service allows you to bring your dream ring, necklace, or earring design to life with 3D digital renderings and master goldsmith craftsmanship.',
    step1Heading: '1. Vision & Diamond Selection',
    step1Description: 'Share your ideas, sketches, or inspiration photos with our lead CAD designers and select your ideal loose diamond.',
    step2Heading: '2. 3D Digital CAD Rendering',
    step2Description: 'Receive detailed 360-degree photorealistic 3D CAD renders showing exact proportions, dimensions, and prong placement.',
    step3Heading: '3. Wax Model & Casting',
    step3Description: 'Upon your approval, a high-resolution 3D wax model is printed and cast in solid 18K gold or platinum.',
    step4Heading: '4. Setting & Hand Finishing',
    step4Description: 'Our master setters set your diamonds under microscopes and polish the piece to high-jewellery perfection.',
    customInfo: 'Total custom lead time is typically 2-3 weeks from initial CAD approval.',
    fileUploadInstructions: 'Upload JPEG, PNG, CAD (.3dm, .stp), or PDF files up to 25MB.',
    supportedFileTypes: 'PNG, JPG, PDF, STEP, 3DM, DWG',
    expectedResponseTime: 'CAD quotes and preliminary sketches provided within 24 hours.',
    buttonText: 'Start Custom CAD Inquiry',
    buttonUrl: '/custom-jewellery#form',
  },

  'diamonds': {
    heading: 'The Diamond Vault',
    subheading: 'Search over 10,000 ethically sourced GIA & IGI certified natural and lab-grown diamonds.',
    introduction: 'Use our advanced diamond filter to select by carat, shape, color, clarity, cut grade, and certification laboratory.',
    filterDescription: 'Filter by exact millimeter dimensions, table/depth ratios, polish, symmetry, and fluorescence.',
    diamondInfo: 'Every diamond is individually inspected by our in-house gemologists to ensure ideal light performance.',
    certificationInformation: '100% GIA or IGI certified. Digital laboratory reports viewable online.',
    buttonText: 'Explore Loose Diamonds',
    buttonUrl: '/diamonds',
  },

  'rings': {
    heading: 'Diamond Engagement & Fashion Rings',
    headingDescription: 'Handcrafted solitaire, halo, three-stone, and eternity rings in 18K gold and platinum.',
    seoContent: 'Explore our exquisite collection of diamond engagement rings, eternity bands, and stacking rings.',
  },

  'earrings': {
    heading: 'Diamond Earrings Collection',
    headingDescription: 'Timeless solitaire diamond studs, drop earrings, and huggies crafted to perfection.',
    seoContent: 'Discover classic 4-prong solitaire studs, halo drops, and diamond hoops.',
  },

  'necklaces': {
    heading: 'Diamond Necklaces & Pendants',
    headingDescription: 'Graduated tennis necklaces, riviere layouts, and delicate solitaire pendants.',
    seoContent: 'Luxury diamond necklaces and pendants handcrafted in solid 18K gold and platinum.',
  },

  'bracelets': {
    heading: 'Diamond Tennis Bracelets',
    headingDescription: 'Continuous diamond line bracelets in four-prong, bezel, and channel settings.',
    seoContent: 'Exceptional diamond tennis bracelets offering maximum brilliance and fluid comfort.',
  },

  'pendants': {
    heading: 'Solitaire Diamond Pendants',
    headingDescription: 'Elegantly suspended solitaire diamond pendants with delicate 18K gold chains.',
    seoContent: 'Hand-selected diamond pendants certified by GIA and IGI.',
  },

  'collections': {
    heading: 'All Fine Jewellery Collections',
    headingDescription: 'Explore our complete atelier catalog of high jewellery, rings, earrings, and tennis lines.',
    seoContent: 'Browse Aura Diamond Atelier fine jewellery collections.',
  },

  'account': {
    title: 'Customer Account Portal',
    heading: 'Welcome to Your Aura Diamond Atelier Account',
    introduction: 'View your order history, active CAD custom commissions, appraisals, and saved wishlist items.',
    loginText: 'Sign in to access your personal concierge portal and track your shipments.',
    registerText: 'Create an account to enjoy personalized diamond recommendations and expedited checkout.',
    accountHelpText: 'Need assistance with your account? Contact our client service team 24/7.',
    supportInformation: 'Concierge Direct: +1 (800) 555-2872 | concierge@auroradiamonds.com',
  },

  'privacy-policy': {
    heading: 'Privacy Policy',
    lastUpdated: 'August 09, 2026',
    content: `
      <h2>1. Information We Collect</h2>
      <p>Aura Diamond Atelier collects personal information necessary to fulfill orders, process payments, and provide personalized client service. This includes contact details, billing/shipping addresses, and payment information.</p>
      <h2>2. How We Use Your Information</h2>
      <p>Your information is strictly used for order processing, logistics insurance, diamond certificate issuance, and direct concierge communication. We never sell or share client data with unauthorized third parties.</p>
      <h2>3. Data Protection & Security</h2>
      <p>We implement bank-grade 256-bit SSL encryption and strict access controls to safeguard your financial and personal data.</p>
      <h2>4. Cookies & Analytics</h2>
      <p>Our website utilizes necessary cookies to enhance user experience, preserve shopping bag items, and measure anonymous web traffic.</p>
      <h2>5. Your Rights</h2>
      <p>You have the right to request access to, update, or permanently delete your personal account data by contacting concierge@auroradiamonds.com.</p>
    `,
  },

  'terms-of-service': {
    heading: 'Terms of Service',
    lastUpdated: 'August 09, 2026',
    content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing Aura Diamond Atelier ("the Website") or placing an order, you agree to be bound by these Terms of Service and all applicable luxury retail laws.</p>
      <h2>2. Diamond Pricing & Availability</h2>
      <p>All loose diamond and fine jewellery prices are subject to real-time market market availability. We reserve the right to correct typographical pricing errors.</p>
      <h2>3. Intellectual Property</h2>
      <p>All 3D CAD renders, product designs, website photography, logos, and copywriting are the exclusive property of Aura Diamond Atelier.</p>
      <h2>4. Order Acceptance & Cancellations</h2>
      <p>Order receipt confirmation does not constitute final order acceptance. We reserve the right to decline orders subject to fraud verification.</p>
    `,
  },

  'billing-terms-conditions': {
    heading: 'Billing Terms & Conditions',
    lastUpdated: 'August 09, 2026',
    content: `
      <h2>1. Payment Methods Accepted</h2>
      <p>We accept major credit cards (Visa, MasterCard, American Express), Bank Wire Transfer, PayPal, and approved financing options.</p>
      <h2>2. Wire Transfer Discount</h2>
      <p>Orders paid via Bank Wire Transfer receive a 1.5% discount automatically applied at checkout.</p>
      <h2>3. Security & Fraud Verification</h2>
      <p>High-value diamond orders over $5,000 may require additional identity verification or bank wire confirmation prior to dispatch.</p>
    `,
  },

  'jewellery-care': {
    heading: 'Jewellery Care & Cleaning Guide',
    lastUpdated: 'August 09, 2026',
    content: `
      <h2>1. Platinum & Gold Care</h2>
      <p>Clean your solid gold and platinum jewellery in warm water mixed with mild dish soap. Gently scrub with a soft-bristled toothbrush to remove oils and lotion residue.</p>
      <h2>2. Diamond Cleaning</h2>
      <p>Diamonds attract natural body oils. Soak your diamond rings weekly in warm soapy water and rinse under warm water.</p>
      <h2>3. Storage Advice</h2>
      <p>Store individual pieces in your Aura Diamond Atelier velvet pouch or soft-lined box to prevent stones from scratching each other.</p>
      <h2>4. Professional Inspection</h2>
      <p>We recommend bringing or sending your diamond jewellery for complimentary annual professional inspection and ultrasonic cleaning.</p>
    `,
  },

  'sitemap': {
    heading: 'Site Map & Atelier Directory',
    subheading: 'Navigate all pages, collections, loose diamond categories, and client resources across Aura Diamond Atelier.',
  },

  'wishlist': {
    heading: 'Your Saved Wishlist',
    subheading: 'Keep track of your favorite diamond rings, loose diamonds, and fine jewellery designs.',
  },

  'cart': {
    heading: 'Your Shopping Bag',
    subheading: 'Review your selected diamonds and fine jewellery items before proceeding to secure checkout.',
  },
};

export const DEFAULT_HOMEPAGE_SECTIONS = [
  {
    blockType: 'HERO',
    position: 1,
    isVisible: true,
    content: JSON.stringify({
      eyebrow: 'Handcrafted Fine Jewelry',
      eyebrowColor: '#c9a45c',
      title: 'Handcrafted Elegance & Exceptional Diamonds',
      titleColor: '#ffffff',
      description: 'Discover certified solitaire rings and bespoke diamond creations crafted in Surat, India.',
      descriptionColor: '#f5f1e8',
      primaryBtnText: 'Explore Collection',
      primaryBtnTextColor: '#101418',
      primaryBtnLink: '/rings',
      secondaryBtnText: 'Discover Diamonds',
      secondaryBtnTextColor: '#ffffff',
      secondaryBtnLink: '/diamonds',
      desktopImage: '/assets/gem_hero_luxury.png',
      tabletImage: '/assets/gem_hero_luxury.png',
      mobileImage: '/assets/gem_hero_luxury.png',
      alignment: 'center',
      overlayOpacity: 0.2,
      textColor: '#ffffff',
    }),
  },
  {
    blockType: 'FEATURED_COLLECTIONS',
    position: 2,
    isVisible: true,
    content: JSON.stringify({
      eyebrow: 'CURATED ATELIER EDIT',
      eyebrowColor: '#c9a45c',
      title: 'Featured Collections',
      titleColor: '#1f1f1f',
      subtitle: 'Handcrafted Luxury Jewelry',
      subtitleColor: '#77736c',
      description: 'Explore signature bridal, solitaire engagement, and fine diamond suites.',
      descriptionColor: '#55514b',
      primaryBtnText: 'View All Collections',
      primaryBtnTextColor: '#101418',
      primaryBtnLink: '/collections',
      image: '/assets/gem_rings_cat.png',
      textColor: '#1f1f1f',
    }),
  },
  {
    blockType: 'CAMPAIGN_BANNER',
    position: 3,
    isVisible: true,
    content: JSON.stringify({
      eyebrow: 'THE ATELIER VISION',
      eyebrowColor: '#c9a45c',
      title: 'A NEW EXPRESSION OF FINE JEWELLERY',
      titleColor: '#1f1f1f',
      description: 'Designed with intention. Crafted with precision. Made to be treasured for generations.',
      descriptionColor: '#444444',
      primaryBtnText: 'EXPLORE THE COLLECTION',
      primaryBtnTextColor: '#fffdf9',
      primaryBtnLink: '/collections/signature-collection',
      image: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp',
      textColor: '#1f1f1f',
    }),
  },
  {
    blockType: 'DIAMOND_SHAPES',
    position: 4,
    isVisible: true,
    content: JSON.stringify({
      eyebrow: 'AUTHENTICATED LOOSE DIAMONDS',
      eyebrowColor: '#c9a45c',
      title: 'Exceptional Cut & Clarity',
      titleColor: '#1f1f1f',
      description: 'Select your ideal cut from certified GIA & IGI diamonds, ethically sourced and precision-cut for maximum fire and brilliance.',
      descriptionColor: '#77736c',
      primaryBtnText: 'DISCOVER ALL SHAPES',
      primaryBtnTextColor: '#ffffff',
      primaryBtnLink: '/diamonds',
      textColor: '#1f1f1f',
    }),
  },
  {
    blockType: 'CRAFTSMANSHIP',
    position: 5,
    isVisible: true,
    content: JSON.stringify({
      eyebrow: 'SURAT HERITAGE',
      eyebrowColor: '#c9a45c',
      title: 'The Art of Fine Jewelry',
      titleColor: '#1f1f1f',
      description: 'Every diamond is hand-selected and precisely set in our Gujarat atelier by fourth-generation artisans dedicated to perfection.',
      descriptionColor: '#55514b',
      primaryBtnText: 'OUR CRAFT STORY',
      primaryBtnTextColor: '#ffffff',
      primaryBtnLink: '/about-us',
      image: '/assets/gem_craftsmanship.jpg',
      textColor: '#1f1f1f',
    }),
  },
  {
    blockType: 'TESTIMONIALS',
    position: 6,
    isVisible: true,
    content: JSON.stringify({
      eyebrow: 'CLIENT PRAISE',
      eyebrowColor: '#c9a45c',
      title: 'Client Experiences',
      titleColor: '#1f1f1f',
      subtitle: 'Over 1,800 Verified 5-Star Reviews',
      subtitleColor: '#77736c',
      description: 'Read genuine reviews from clients who chose Aura Diamond Atelier for life’s most significant moments.',
      descriptionColor: '#55514b',
      textColor: '#1f1f1f',
    }),
  },
];

export const ensure22PagesContentSeeded = async () => {
  try {
    // Seed home page if missing
    let homePage = await prisma.page.findUnique({
      where: { slug: 'home' },
      include: { sections: true },
    });
    if (!homePage) {
      homePage = await prisma.page.create({
        data: {
          title: 'Homepage (Storefront Index)',
          slug: 'home',
          content: JSON.stringify({ title: 'Homepage' }),
          draftContent: JSON.stringify({ title: 'Homepage' }),
          status: 'PUBLISHED',
          lastPublishedAt: new Date(),
          publishedBy: 'System Seed',
        },
        include: { sections: true },
      });
    }

    if (homePage.sections.length === 0) {
      for (const s of DEFAULT_HOMEPAGE_SECTIONS) {
        await prisma.pageSection.create({
          data: {
            pageId: homePage.id,
            blockType: s.blockType,
            position: s.position,
            isVisible: s.isVisible,
            content: s.content,
          },
        });
      }
      console.log('Seeded 6 default homepage sections with individual text colors.');
    }

    for (const [slug, data] of Object.entries(INITIAL_22_PAGES_DATA)) {
      const page = await prisma.page.findUnique({ where: { slug } });
      const jsonStr = JSON.stringify(data);

      if (!page) {
        const title = data.heading || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
        await prisma.page.create({
          data: {
            title,
            slug,
            content: jsonStr,
            draftContent: jsonStr,
            status: 'PUBLISHED',
            lastPublishedAt: new Date(),
            publishedBy: 'System Seed',
          },
        });
      } else {
        let existing = {};
        try {
          existing = JSON.parse(page.content || page.draftContent || '{}');
        } catch (e) {}

        const merged = { ...data, ...existing };
        const mergedStr = JSON.stringify(merged);

        await prisma.page.update({
          where: { id: page.id },
          data: {
            content: page.content || mergedStr,
            draftContent: page.draftContent || mergedStr,
            status: page.status || 'PUBLISHED',
          },
        });
      }
    }
    console.log('Verified and seeded rich page-specific CMS data for all 22 pages.');
  } catch (error) {
    console.error('Error in ensure22PagesContentSeeded:', error);
  }
};
