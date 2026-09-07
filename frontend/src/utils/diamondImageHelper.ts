/**
 * Aura Diamond Atelier — Diamond Image & Video Helper
 * Resolves diamond image URLs and maps missing image paths to diamond cut SVGs.
 */

export const getDiamondImageUrl = (diamond: { imageUrl?: string | null; shape?: string }): string => {
  if (diamond.imageUrl && diamond.imageUrl.trim() !== '') {
    return diamond.imageUrl;
  }

  const rawShape = diamond.shape ? diamond.shape.trim() : 'Round';
  const formatted = rawShape.charAt(0).toUpperCase() + rawShape.slice(1).toLowerCase();

  const shapeMap: Record<string, string> = {
    Round: '/assets/diamonds/Round.svg',
    Marquise: '/assets/diamonds/Marquise.svg',
    Cushion: '/assets/diamonds/Cushion.svg',
    Oval: '/assets/diamonds/Oval.svg',
    Pear: '/assets/diamonds/Pear.svg',
    Princess: '/assets/diamonds/Princess.svg',
    Radiant: '/assets/diamonds/Radiant.svg',
    Asscher: '/assets/diamonds/Asscher.svg',
    Emerald: '/assets/diamonds/Emerald.svg',
    Heart: '/assets/diamonds/Heart.svg',
    Baguette: '/assets/diamonds/Baguette.svg',
    Trillion: '/assets/diamonds/Trillion.svg',
    Ashoka: '/assets/diamonds/Ashoka.svg',
  };

  return shapeMap[formatted] || '/assets/diamonds/Round.svg';
};
