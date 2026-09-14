/**
 * Metal sorting and formatting utilities for AethelCarats
 * Enforces the standardized sequence:
 * 1. 925 Sterling Silver
 * 2. 9K Gold (Yellow, White, Rose)
 * 3. 10K Gold (Yellow, White, Rose)
 * 4. 14K Gold (Yellow, White, Rose)
 * 5. 18K Gold (Yellow, White, Rose)
 * 6. Platinum
 */

export const getMetalSortRank = (label: string): number => {
  const s = (label || '').toLowerCase().trim();

  // 1. 925 Sterling Silver
  if (s.includes('silver') || s.includes('925') || s === 'ag') {
    return 10;
  }

  // 2. 9K Gold (Yellow, White, Rose)
  if (s.includes('9k') || s.includes('9 k') || s.includes('9ct')) {
    if (s.includes('yellow')) return 21;
    if (s.includes('white')) return 22;
    if (s.includes('rose')) return 23;
    return 24;
  }

  // 3. 10K Gold (Yellow, White, Rose)
  if (s.includes('10k') || s.includes('10 k') || s.includes('10ct')) {
    if (s.includes('yellow')) return 31;
    if (s.includes('white')) return 32;
    if (s.includes('rose')) return 33;
    return 34;
  }

  // 4. 14K Gold (Yellow, White, Rose)
  if (s.includes('14k') || s.includes('14 k') || s.includes('14ct')) {
    if (s.includes('yellow')) return 41;
    if (s.includes('white')) return 42;
    if (s.includes('rose')) return 43;
    return 44;
  }

  // 5. 18K Gold (Yellow, White, Rose)
  if (s.includes('18k') || s.includes('18 k') || s.includes('18ct')) {
    if (s.includes('yellow')) return 51;
    if (s.includes('white')) return 52;
    if (s.includes('rose')) return 53;
    return 54;
  }

  // 6. Platinum
  if (s.includes('platinum') || s.startsWith('plat') || s === 'pt') {
    return 60;
  }

  return 100;
};

export const getMetalFamily = (label: string): string => {
  const rank = getMetalSortRank(label);
  if (rank === 10) return 'silver';
  if (rank >= 20 && rank < 30) return '9k';
  if (rank >= 30 && rank < 40) return '10k';
  if (rank >= 40 && rank < 50) return '14k';
  if (rank >= 50 && rank < 60) return '18k';
  if (rank === 60) return 'platinum';
  return 'other';
};

export const sortMetalsList = <T extends { label?: string; name?: string } | string>(metals: T[]): T[] => {
  if (!Array.isArray(metals)) return [];
  return [...metals].sort((a, b) => {
    const labelA = typeof a === 'string' ? a : (a.label || a.name || '');
    const labelB = typeof b === 'string' ? b : (b.label || b.name || '');
    return getMetalSortRank(labelA) - getMetalSortRank(labelB);
  });
};
