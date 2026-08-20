import prisma from './prisma';

async function testGetDiamonds() {
  // Test query 1: classification = WHITE, status = AVAILABLE
  const where1: any = {
    status: 'AVAILABLE',
    AND: [
      {
        OR: [{ fancyColor: null }, { fancyColor: '' }, { fancyColor: 'None' }, { diamondType: 'WHITE' }, { diamondType: 'NATURAL' }, { diamondType: 'LAB_GROWN' }],
      }
    ]
  };

  const count1 = await prisma.diamond.count({ where: where1 });
  console.log(`Query 1 (White Diamonds with status=AVAILABLE): ${count1}`);

  // Test query 2: exact query from diamondController
  const classification = 'WHITE';
  const where2: any = {};
  where2.status = 'AVAILABLE';
  if (classification === 'WHITE') {
    where2.AND = where2.AND || [];
    where2.AND.push({
      OR: [{ fancyColor: null }, { fancyColor: '' }, { fancyColor: 'None' }, { diamondType: 'WHITE' }, { diamondType: 'NATURAL' }],
    });
  }

  const count2 = await prisma.diamond.count({ where: where2 });
  console.log(`Query 2 (Current diamondController query for classification=WHITE): ${count2}`);
}

testGetDiamonds().then(() => process.exit(0)).catch(console.error);
