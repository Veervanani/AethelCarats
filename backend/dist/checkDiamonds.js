"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
async function checkDiamonds() {
    const totalCount = await prisma_1.default.diamond.count();
    console.log(`Total diamonds in database: ${totalCount}`);
    const sample = await prisma_1.default.diamond.findMany({ take: 5 });
    console.log('Sample diamonds in DB:');
    console.log(JSON.stringify(sample, null, 2));
    const whiteCount = await prisma_1.default.diamond.count({
        where: {
            OR: [
                { fancyColor: null },
                { fancyColor: '' },
                { fancyColor: 'None' },
                { fancyColor: 'N/A' },
                { diamondType: 'WHITE' },
                { diamondType: 'NATURAL' },
                { diamondType: 'LAB_GROWN' },
                { diamondType: 'LAB_GROWN_WHITE' }
            ]
        }
    });
    console.log(`White diamonds matching query: ${whiteCount}`);
}
checkDiamonds().then(() => process.exit(0)).catch(console.error);
