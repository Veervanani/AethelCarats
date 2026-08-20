export interface DiamondShapeOption {
  name: string;
  value: string;
  image: string;
}

export const DIAMOND_SHAPES: DiamondShapeOption[] = [
  { name: 'Round', value: 'Round', image: '/assets/diamonds/Round.svg' },
  { name: 'Oval', value: 'Oval', image: '/assets/diamonds/Oval.svg' },
  { name: 'Cushion', value: 'Cushion', image: '/assets/diamonds/Cushion.svg' },
  { name: 'Emerald', value: 'Emerald', image: '/assets/diamonds/Emerald.svg' },
  { name: 'Pear', value: 'Pear', image: '/assets/diamonds/Pear.svg' },
  { name: 'Princess', value: 'Princess', image: '/assets/diamonds/Princess.svg' },
  { name: 'Radiant', value: 'Radiant', image: '/assets/diamonds/Radiant.svg' },
  { name: 'Heart', value: 'Heart', image: '/assets/diamonds/Heart.svg' },
  { name: 'Marquise', value: 'Marquise', image: '/assets/diamonds/Marquise.svg' },
  { name: 'Rose', value: 'Rose', image: '/assets/diamonds/Rose.svg' },
  { name: 'Ashoka', value: 'Ashoka', image: '/assets/diamonds/Ashoka.svg' },
  { name: 'Baguette', value: 'Baguette', image: '/assets/diamonds/Baguette.svg' },
  { name: 'Half Moon', value: 'Half Moon', image: '/assets/diamonds/Half Moon.svg' },
  { name: 'Kite', value: 'Kite', image: '/assets/diamonds/Kite.svg' },
  { name: 'Portuguese', value: 'Portuguese', image: '/assets/diamonds/Portuguese.svg' },
  { name: 'Asscher', value: 'Asscher', image: '/assets/diamonds/Asscher.svg' },
  { name: 'Trillion', value: 'Trillion', image: '/assets/diamonds/Trillion.svg' },
  { name: 'Trapezoid', value: 'Trapezoid', image: '/assets/diamonds/Trapezoid.svg' },
  { name: 'Cadillac', value: 'Cadillac', image: '/assets/diamonds/Cadillac.svg' },
  { name: 'Shield Cut', value: 'Shield Cut', image: '/assets/diamonds/Shield Cut.svg' },
  { name: 'Pentagonal', value: 'Pentagonal', image: '/assets/diamonds/Pentagonal.svg' },
];

export const normalizeShape = (shape: string): string => {
  if (!shape || shape.toLowerCase() === 'all' || shape.toLowerCase() === 'any') return 'All';
  const clean = shape.trim().toLowerCase();
  if (clean.includes('round')) return 'Round';
  if (clean.includes('oval')) return 'Oval';
  if (clean.includes('cushion')) return 'Cushion';
  if (clean.includes('emerald')) return 'Emerald';
  if (clean.includes('pear')) return 'Pear';
  if (clean.includes('princess')) return 'Princess';
  if (clean.includes('radiant')) return 'Radiant';
  if (clean.includes('asscher')) return 'Asscher';
  if (clean.includes('marquise')) return 'Marquise';
  if (clean.includes('heart')) return 'Heart';
  if (clean.includes('trillion') || clean.includes('triangular')) return 'Trillion';
  if (clean.includes('rose')) return 'Rose';
  if (clean.includes('ashoka')) return 'Ashoka';
  if (clean.includes('baguette')) return 'Baguette';
  if (clean.includes('half moon') || clean.includes('halfmoon')) return 'Half Moon';
  if (clean.includes('kite')) return 'Kite';
  if (clean.includes('portuguese') || clean.includes('potuguese') || clean.includes('portuguse')) return 'Portuguese';
  if (clean.includes('trapezoid')) return 'Trapezoid';
  if (clean.includes('cadillac')) return 'Cadillac';
  if (clean.includes('shield')) return 'Shield Cut';
  if (clean.includes('pentagon')) return 'Pentagonal';
  return shape.charAt(0).toUpperCase() + shape.slice(1);
};

export const ALL_DIAMOND_COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export const ALL_DIAMOND_CLARITIES = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];

export interface FancyColorOption {
  name: string;
  value: string;
  colorHex: string;
}

export const FANCY_DIAMOND_COLORS: FancyColorOption[] = [
  { name: 'Yellow', value: 'Yellow', colorHex: '#FCD34D' },
  { name: 'Orange', value: 'Orange', colorHex: '#F97316' },
  { name: 'Pink', value: 'Pink', colorHex: '#F472B6' },
  { name: 'Blue', value: 'Blue', colorHex: '#3B82F6' },
  { name: 'Green', value: 'Green', colorHex: '#10B981' },
  { name: 'Brown', value: 'Brown', colorHex: '#92400E' },
  { name: 'Red', value: 'Red', colorHex: '#EF4444' },
  { name: 'White', value: 'White', colorHex: '#F8FAFC' },
  { name: 'Violet', value: 'Violet', colorHex: '#8B5CF6' },
  { name: 'Purple', value: 'Purple', colorHex: '#A855F7' },
  { name: 'Gray', value: 'Gray', colorHex: '#9CA3AF' },
  { name: 'Olive', value: 'Olive', colorHex: '#65A30D' },
  { name: 'Black', value: 'Black', colorHex: '#1F2937' },
  { name: 'Other', value: 'Other', colorHex: '#D97706' },
];

export const FANCY_DIAMOND_OVERTONES = [
  'Yellow', 'Yellowish', 'Pink', 'Pinkish', 'Blue', 'Bluish', 'Red', 'Reddish',
  'Green', 'Greenish', 'Purple', 'Purplish', 'Orange', 'Orangy', 'Violet', 'Violetish',
  'Gray', 'Grayish', 'Black', 'Brown', 'Brownish', 'Champagne', 'Cognac', 'Chameleon', 'White', 'Other'
];

export const FANCY_DIAMOND_INTENSITIES = [
  'Fancy Deep', 'Fancy Dark', 'Fancy Vivid', 'Fancy Intense', 'Fancy', 'Very Light', 'Fancy Light', 'Light', 'Faint'
];
