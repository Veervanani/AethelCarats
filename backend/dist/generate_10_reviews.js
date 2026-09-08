"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const prisma = new client_1.PrismaClient();
const FIRST_NAMES = [
    'Charlotte', 'Sophia', 'Gillian', 'Evelyn', 'Vivienne', 'James', 'Olivia',
    'Amelia', 'Harrison', 'Victoria', 'Isabelle', 'Julian', 'Clara', 'Nathaniel',
    'Beatrice', 'Marcus', 'Genevieve', 'Alexander', 'Cecilia', 'Damian', 'Eleanor',
    'Sebastian', 'Camilla', 'Dominic', 'Penelope', 'Tristan', 'Aria', 'Lucas',
    'Aurora', 'Julian', 'Seraphina', 'Oliver', 'Madeline', 'Benjamin', 'Rosalie',
    'Theodore', 'Geneva', 'Gabriel', 'Valentina', 'Maxwell', 'Florence', 'Arthur'
];
const LAST_NAMES = [
    'Vance', 'Mercer', 'Thorne', 'St. Claire', 'Sterling', 'Crawford', 'Montgomery',
    'Wells', 'Dubois', 'Davenport', 'Cross', 'Ross', 'Knight', 'Rose', 'Croft',
    'Hayes', 'Wright', 'Sinclair', 'Fairfax', 'Ashford', 'Kingsley', 'Holloway',
    'Belmont', 'Kensington', 'Vanderbilt', 'Ellington', 'Pemberton', 'Somerset'
];
const HEADLINES = [
    'Exceptional Craftsmanship & Diamond Brilliance',
    'Exceeded Every Expectation!',
    'Pure Perfection & Unmatched Quality',
    'Bespoke Elegance & Timeless Beauty',
    'Stunning Sparkle & Flawless Finish',
    'An Absolute Masterpiece of Jewelry',
    'The Perfect Anniversary Ring',
    'Breathtaking Design & Fast Shipping',
    'Handcrafted Quality You Can Feel',
    'Unrivaled Brilliance & Presentation',
    'Truly Spectacular Diamond Fire!',
    'Beyond Happy With My Purchase',
    'Impeccable Quality & Fast Insured Delivery',
    'The Most Beautiful Ring I Have Ever Seen',
    'Outstanding Atelier Quality & Service',
    'Simply Breathtaking Artistry',
    'Worth Every Single Cent',
    'Flawless Diamond Setting & Fit',
    'A Lifetime Keepsake',
    'Captivating Elegance and Craft'
];
const TEMPLATES = [
    (pName, metal, shape, carat, cat) => `Absolutely in love with my ${pName}! The ${carat}${shape} stone catches the light brilliantly in ${metal}. Arrived in discreet luxury packaging right on schedule.`,
    (pName, metal, shape, carat, cat) => `Exceeded my expectations in every way. The craftsmanship on this ${cat.toLowerCase()} is flawless, and the ${metal} setting holds the ${shape} diamond so elegantly.`,
    (pName, metal, shape, carat, cat) => `Bought the ${pName} for a special milestone and could not be happier. Superior craftsmanship, certified diamond clarity, and white-glove customer service!`,
    (pName, metal, shape, carat, cat) => `The brilliance of the ${shape} diamond in person is unbelievable. Floksy Jewel's attention to detail on this ${metal} ${cat.toLowerCase()} makes it a true heirloom piece.`,
    (pName, metal, shape, carat, cat) => `Outstanding quality! The ${pName} came beautifully presented with its certificate. Stunning ${metal} polish and mesmerizing diamond fire.`,
    (pName, metal, shape, carat, cat) => `I spent months searching for the right ${cat.toLowerCase()} and ${pName} was the absolute perfect choice. The ${metal} setting is so refined!`,
    (pName, metal, shape, carat, cat) => `Words cannot express how gorgeous this ${pName} is in person. The ${shape} diamond reflects light from every angle!`,
    (pName, metal, shape, carat, cat) => `The craftsmanship of Floksy Jewel atelier is top tier. This ${metal} ${pName} feels comfortable, solid, and looks extraordinarily opulent.`,
    (pName, metal, shape, carat, cat) => `My partner was completely speechless when opening the box! The ${carat}${shape} diamond in ${metal} is mesmerizing.`,
    (pName, metal, shape, carat, cat) => `Incredible quality and craftsmanship. The diamond certification was included and the parcel arrived quickly in discreet packaging.`,
    (pName, metal, shape, carat, cat) => `Every detail of the ${pName} is handcrafted to perfection. The ${metal} finish is smooth and lustrous, and the ${shape} diamond is crystal clear!`,
    (pName, metal, shape, carat, cat) => `I get compliments every single day on my ${pName}! Floksy Jewel customer concierge was so helpful throughout the entire process.`
];
async function main() {
    console.log('Fetching all products...');
    const products = await prisma.product.findMany({
        include: { category: true }
    });
    console.log(`Found ${products.length} products. Generating 10 reviews per product...`);
    let totalInserted = 0;
    for (let pIdx = 0; pIdx < products.length; pIdx++) {
        const product = products[pIdx];
        const pName = product.title || product.name || 'Jewelry Item';
        const pMetal = product.metal || '14K Gold';
        const pShape = product.shape || 'Brilliant';
        const pCarat = product.carat ? `${product.carat}ct ` : '';
        const pCat = product.category?.name || product.jewelleryType || 'Fine Jewelry';
        // Generate 10 reviews for this product
        for (let rIdx = 0; rIdx < 10; rIdx++) {
            const seed = pIdx * 10 + rIdx;
            const firstName = FIRST_NAMES[(seed * 7 + rIdx * 3) % FIRST_NAMES.length];
            const lastName = LAST_NAMES[(seed * 11 + rIdx * 5) % LAST_NAMES.length];
            const author = `${firstName} ${lastName}`;
            const headline = HEADLINES[(seed * 13 + rIdx * 2) % HEADLINES.length];
            const rating = (seed + rIdx) % 11 === 0 ? 4 : 5; // ~91% 5-star, ~9% 4-star
            const templateFn = TEMPLATES[(seed * 17 + rIdx * 4) % TEMPLATES.length];
            const commentBody = templateFn(pName, pMetal, pShape, pCarat, pCat);
            const fullComment = `${headline}\n\n${commentBody}`;
            // Spread timestamps over the last 90 days for natural realistic dates
            const daysAgo = Math.floor(Math.random() * 85);
            const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - Math.random() * 86400000);
            await prisma.review.create({
                data: {
                    id: crypto_1.default.randomUUID(),
                    productId: product.id,
                    author,
                    email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
                    rating,
                    comment: fullComment,
                    isApproved: true,
                    isFeatured: rIdx < 3,
                    createdAt
                }
            });
            totalInserted++;
        }
        console.log(`[${pIdx + 1}/${products.length}] Added 10 reviews for: ${pName}`);
    }
    console.log(`SUCCESS! Generated and inserted ${totalInserted} reviews across ${products.length} products!`);
}
main()
    .catch((e) => {
    console.error('Error generating reviews:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
