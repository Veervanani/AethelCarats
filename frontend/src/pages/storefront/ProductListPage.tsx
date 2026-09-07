import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ChevronDown, RotateCcw, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { api } from '../../services/api';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/ui/ProductCard';
import { SafeImage } from '../../components/ui/SafeImage';
import { AuraFilterBar } from '../../components/ui/AuraFilterBar';
import { normalizeShape } from '../../config/diamondShapes';
import { RevealContainer } from '../../components/ui/RevealContainer';

const PageOuterWrapper = styled.div`
  background-color: #0B0B0B;
  min-height: 100vh;
  width: 100%;
`;

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 80px;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #0B0B0B;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`;

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;
  margin-bottom: 24px;
  letter-spacing: 0.05em;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  span.separator {
    color: #C9A96E;
    font-size: 0.7rem;
  }

  span.current {
    color: #F5F1E8;
    font-weight: 600;
  }
`;

const CategoryHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
    h1 {
      font-size: 2.1rem;
    }
  }
`;

const DescriptionWrapper = styled.div`
  max-width: 920px;
  line-height: 1.65;
  color: #D8D2C5;
  font-size: 0.95rem;

  p {
    margin-bottom: 8px;
  }
`;

const ExpandToggleBtn = styled.button`
  background: none;
  border: none;
  color: #C9A96E;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 0;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryNavSection = styled.div`
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  position: relative;
  width: 100%;

  .swiper {
    padding: 4px 4px 12px;
    overflow: visible;
  }
`;

const NavArrow = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 36%;
  ${({ $direction }) => ($direction === 'prev' ? 'left: -18px;' : 'right: -18px;')}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  z-index: 20;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    top: 36%;
    ${({ $direction }) => ($direction === 'prev' ? 'left: -4px;' : 'right: -4px;')}
  }
`;

const CategoryNavCard = styled(Link)<{ $active?: boolean }>`
  flex: 0 0 190px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  background-color: transparent;
  padding: 0;
  transition: all 0.25s ease;
  position: relative;

  @media (max-width: 768px) {
    flex: 0 0 150px;
  }
`;

const CardImageWrapper = styled.div<{ $active?: boolean }>`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: #0B0B0B;
  border: ${({ $active }) => ($active ? '2px solid #C9A96E' : '1px solid rgba(140, 116, 75, 0.25)')};
  box-shadow: ${({ $active }) => ($active ? '0 6px 20px rgba(201, 169, 110, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.4)')};
  transform: ${({ $active }) => ($active ? 'scale(1.03)' : 'none')};
  transition: all 0.25s ease;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${CategoryNavCard}:hover & {
    border-color: #C9A96E;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201, 169, 110, 0.35);

    img {
      transform: scale(1.06);
    }
  }
`;

const CardTitle = styled.span<{ $active?: boolean }>`
  font-size: 0.88rem;
  font-weight: ${({ $active }) => ($active ? '700' : '600')};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#C9A96E' : '#D8D2C5')};
  text-align: left;
  margin-left: 2px;
  transition: color 0.2s ease;

  ${CategoryNavCard}:hover & {
    color: #C9A96E;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonCard = styled.div`
  aspect-ratio: 3 / 4;
  background: linear-gradient(90deg, #151515 0%, #1f1f1f 50%, #151515 100%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s infinite;
  border-radius: 4px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 20px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  margin: 40px 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    margin-bottom: 24px;
  }
`;

const ClearFiltersBtn = styled.button`
  padding: 12px 24px;
  background-color: #C9A96E;
  color: #0B0B0B;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  transition: all 0.25s ease;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
    transform: translateY(-1px);
  }
`;

const DEFAULT_CATEGORIES: any[] = [
  { id: 'rings', name: 'Rings', slug: 'rings', description: 'Discover AETHELCARATS engagement rings, diamond wedding bands, and bespoke solitaires.', image: '/assets/gem_rings_cat.png' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings', description: 'Discover AETHELCARATS solitaire studs, drop earrings, and diamond huggies.', image: '/assets/gem_earrings_cat.png' },
  { id: 'necklaces', name: 'Necklaces', slug: 'necklaces', description: 'Discover AETHELCARATS diamond rivière necklaces, solitaire pendants, and statement colliers.', image: '/assets/gem_necklaces_cat.png' },
  { id: 'bracelets', name: 'Bracelets', slug: 'bracelets', description: 'Explore AETHELCARATS diamond tennis bracelets, line cuffs, and high-jewellery bangles.', image: '/assets/gem_bracelets_cat.png' },
  { id: 'pendants', name: 'Pendants', slug: 'pendants', description: 'Explore AETHELCARATS solitaire diamond pendants and custom halo medallion drops.', image: '/assets/aura_pendants_cat.png' },
  { id: 'diamonds', name: 'Diamonds', slug: 'diamonds', description: 'Browse GIA & IGI authenticated loose diamonds across Round, Oval, Emerald, and Cushion cuts.', image: '/assets/gem_diamonds_cat.png' },
  { id: 'collections', name: 'Collections', slug: 'collections', description: 'Explore the complete AETHELCARATS portfolio of handcrafted fine jewellery.', image: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp' },
];

export const MEGA_MENU_TITLES: Record<string, { title: string; subtitle?: string }> = {
  // Rings
  'womens-wedding': {
    title: "Women's Wedding Rings",
    subtitle: "Explore our handcrafted collection of women's wedding rings, diamond bands, and eternity rings in 18K gold and platinum."
  },
  'mens-wedding': {
    title: "Men's Wedding Bands",
    subtitle: "Discover refined men's wedding bands engineered in 18K solid gold, platinum, and comfort-fit silhouettes."
  },
  'eternity': {
    title: "Eternity Rings",
    subtitle: "Endless brilliance. Explore full and half eternity rings set with conflict-free diamonds."
  },
  'anniversary': {
    title: "Anniversary Rings",
    subtitle: "Commemorate unforgettable milestones with handcrafted diamond anniversary rings."
  },
  'ready-to-ship': {
    title: "Ready To Ship Engagement Rings",
    subtitle: "In stock and ready to dispatch within 24 hours in luxury presentation packaging."
  },
  'diamond': {
    title: "Diamond Rings",
    subtitle: "Curated collection of brilliant natural and lab-grown diamond rings."
  },
  'gemstone': {
    title: "Gemstone Rings",
    subtitle: "Exquisite sapphire, emerald, ruby, and precious gemstone rings."
  },
  'emerald': {
    title: "Emerald Rings",
    subtitle: "Vibrant Colombian and Zambian emerald rings in bespoke settings."
  },
  'sapphire': {
    title: "Sapphire Rings",
    subtitle: "Royal blue and fancy sapphire rings set in 18K gold and platinum."
  },
  'pearl': {
    title: "Pearl Rings",
    subtitle: "Luminous South Sea and Akoya cultured pearl fine jewelry rings."
  },
  'stackable': {
    title: "Stackable Rings",
    subtitle: "Delicate and striking bands designed to mix, match, and stack seamlessly."
  },
  'fashion': {
    title: "Fashion & Cocktail Rings",
    subtitle: "Bold contemporary statement rings crafted for modern elegance."
  },
  'signet': {
    title: "Signet Rings",
    subtitle: "Classic and modern monogram-ready signet rings in solid gold."
  },
  'mens': {
    title: "Men's Rings",
    subtitle: "Sophisticated men's signet, diamond, and precious metal rings."
  },
  'infinity': {
    title: "Infinity Rings",
    subtitle: "Timeless infinity motif diamond and fine gold rings."
  },
  'solitaire': {
    title: "Solitaire Rings",
    subtitle: "Classic solitaire settings highlighting the center diamond with pure sophistication."
  },
  'wedding-bands': {
    title: "Wedding Bands",
    subtitle: "Handcrafted wedding bands in 18K yellow gold, white gold, rose gold, and platinum."
  },
  'aura-collection': {
    title: "NEW Aura Collection",
    subtitle: "Exclusive modern silhouettes designed in our master jewellery atelier."
  },

  // Earrings
  'all-earrings': {
    title: "All Earrings",
    subtitle: "Explore our full suite of diamond stud, drop, hoop, and huggie earrings."
  },
  'studs': {
    title: "Stud Earrings",
    subtitle: "Timeless solitaire and halo diamond stud earrings for everyday luxury."
  },
  'drop': {
    title: "Drop & Dangle Earrings",
    subtitle: "Graceful diamond drop and chandelier earrings designed for maximum movement and light."
  },
  'hoops': {
    title: "Hoop Earrings",
    subtitle: "Diamond pavé and fine gold hoops in micro, midi, and statement diameters."
  },
  'huggies': {
    title: "Diamond Huggies",
    subtitle: "Effortless snug-fit diamond huggie earrings for curated ear styling."
  },
  'solitaire-studs': {
    title: "Solitaire Studs",
    subtitle: "Four-prong and bezel-set diamond solitaire studs in 18K gold and platinum."
  },
  'pear-drops': {
    title: "Pear Cut Drops",
    subtitle: "Elongated pear cut diamond drop earrings with mesmerizing brilliance."
  },
  'halo-studs': {
    title: "Halo Studs",
    subtitle: "Center diamonds enveloped in a halo of microscopic pavé diamonds."
  },
  'cluster': {
    title: "Cluster Earrings",
    subtitle: "Artistic diamond clusters designed for magnificent scintillation."
  },
  'diamond-drop-earrings': {
    title: "Diamond Drop Earrings",
    subtitle: "Handcrafted pear cuts and fancy diamond drops."
  },

  // Necklaces
  'all-necklaces': {
    title: "All Necklaces",
    subtitle: "Discover Rivière colliers, solitaire pendants, and layering diamond chains."
  },
  'diamond-necklaces': {
    title: "Diamond Necklaces",
    subtitle: "Handcrafted diamond necklaces in fine 18K solid gold."
  },
  'tennis': {
    title: "Tennis Necklaces",
    subtitle: "Continuous lines of matched brilliant diamonds crafted with fluid flexibility."
  },
  'statement': {
    title: "Statement Necklaces",
    subtitle: "High-jewellery colliers and dramatic diamond statement necklaces."
  },
  'chokers': {
    title: "Choker Necklaces",
    subtitle: "Close-fitting modern choker necklaces set with fiery diamonds."
  },
  'graduated': {
    title: "Graduated Tennis Necklaces",
    subtitle: "Gracefully graduating diamonds culminating in an extraordinary centerpiece."
  },
  'marquise-pear': {
    title: "Marquise & Pear Clusters",
    subtitle: "Intricate floral and geometric clusters of fancy marquise and pear diamonds."
  },
  'chains': {
    title: "Layering Chains",
    subtitle: "Fine 18K solid gold chains crafted for effortless layered style."
  },
  'diamond-tennis-necklace': {
    title: "Diamond Tennis Necklace",
    subtitle: "18K fine gold setting with seamless diamond articulation."
  },

  // Bracelets
  'all-bracelets': {
    title: "All Bracelets",
    subtitle: "Explore our collection of tennis bracelets, solid gold bangles, and chain cuffs."
  },
  'tennis-bracelets': {
    title: "Tennis Bracelets",
    subtitle: "The definitive diamond tennis bracelet, handcrafted with microscopic precision."
  },
  'bangles': {
    title: "Bangles",
    subtitle: "Structured diamond bangles and stacking bracelets in solid 18K gold."
  },
  'chain': {
    title: "Chain Bracelets",
    subtitle: "Fluid link and charm chain bracelets set with sparkling diamond accents."
  },
  'cuff': {
    title: "Cuff Bracelets",
    subtitle: "Open cuff bracelets with bold architectural lines and pavé detailing."
  },
  'emerald-cut': {
    title: "Emerald Cut Tennis Bracelets",
    subtitle: "Clean geometric emerald cut diamonds in seamless four-prong settings."
  },
  'round-brilliant': {
    title: "Round Brilliant Tennis",
    subtitle: "Timeless Round brilliant diamonds mounted in flexible gold links."
  },
  'stacking': {
    title: "Stacking Bangles",
    subtitle: "Slender diamond and polished gold bangles made for stacking."
  },
  'emerald-tennis-bracelet': {
    title: "Emerald Tennis Bracelet",
    subtitle: "Bezel and prong settings handcrafted in solid 18K gold."
  },

  // Pendants
  'all-pendants': {
    title: "All Pendants",
    subtitle: "Hand-set solitaire and halo pendants suspended on delicate gold chains."
  },
  'solitaire-pendants': {
    title: "Solitaire Pendants",
    subtitle: "Exquisite four-prong diamond solitaires on 18K gold chains."
  },
  'halo-pendants': {
    title: "Halo Pendants",
    subtitle: "Radiant center gemstones framed by luminous diamond halos."
  },
  'pear-cut-pendants': {
    title: "Pear Cut Pendants",
    subtitle: "Graceful tear-drop silhouette diamond and gemstone pendants."
  },
  'gemstone-pendants': {
    title: "Gemstone Pendants",
    subtitle: "Natural sapphire, emerald, and ruby pendants in bespoke mountings."
  },
  'round': {
    title: "Round Brilliant Pendants",
    subtitle: "Classic round brilliant diamonds suspended on delicate gold chains."
  },
  'oval': {
    title: "Oval Cut Pendants",
    subtitle: "Elongated oval cut diamonds offering unmatched elegance."
  },
  'marquise': {
    title: "Marquise Pendants",
    subtitle: "Dramatic eye-shaped marquise diamond pendants."
  },
};

export const ProductListPage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPath = location.pathname.replace('/', '') || 'rings';
  const categorySlug = rawPath === 'vault-mgmt-k8m3x9q2v7' ? 'rings' : rawPath;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const catPrevRef = useRef<HTMLButtonElement>(null);
  const catNextRef = useRef<HTMLButtonElement>(null);

  // Initialize filter state from URL search params
  const [gender, setGender] = useState(searchParams.get('gender') || 'All');
  const [ringStyle, setRingStyle] = useState(searchParams.get('style') || 'All');
  const [ringSize, setRingSize] = useState(searchParams.get('ringSize') || 'All');
  const [stoneShape, setStoneShape] = useState(searchParams.get('shape') || 'All');
  const [totalCarat, setTotalCarat] = useState(searchParams.get('carat') || 'All');
  const [diamondType, setDiamondType] = useState(searchParams.get('diamond') || 'All');
  const [metal, setMetal] = useState(searchParams.get('metal') || 'All');
  const [clarity, setClarity] = useState(searchParams.get('clarity') || 'Any');
  const [color, setColor] = useState(searchParams.get('color') || 'Any');
  const [cut, setCut] = useState(searchParams.get('cut') || 'Any');
  const [certification, setCertification] = useState(searchParams.get('certification') || 'Any');
  const [minPriceVal, setMinPriceVal] = useState<number>(
    searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 500
  );
  const [maxPriceVal, setMaxPriceVal] = useState<number>(
    searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 50000
  );
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'bestsellers');

  // Load categories
  useEffect(() => {
    api
      .getCategories()
      .then((data) => {
        if (data && Array.isArray(data)) {
          const fixedOrder = ['rings', 'earrings', 'necklaces', 'bracelets', 'pendants', 'collections', 'diamonds'];
          const sorted = [...data].sort((a, b) => {
            const indexA = fixedOrder.indexOf(a.slug?.toLowerCase());
            const indexB = fixedOrder.indexOf(b.slug?.toLowerCase());
            const posA = indexA !== -1 ? indexA : 999;
            const posB = indexB !== -1 ? indexB : 999;
            return posA - posB;
          });
          setCategories(sorted);
        } else {
          setCategories([]);
        }
      })
      .catch((err) => console.error('Failed to load category cards', err));
  }, []);

  // Update URL search parameters when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    const existingCat = searchParams.get('category');
    const existingCol = searchParams.get('collection');

    if (existingCat && existingCat !== categorySlug) params.category = existingCat;
    if (existingCol) params.collection = existingCol;

    if (gender !== 'All') params.gender = gender;
    if (ringStyle !== 'All') params.style = ringStyle;
    if (ringSize !== 'All') params.ringSize = ringSize;
    if (metal !== 'All') params.metal = metal;
    if (stoneShape !== 'All') params.shape = normalizeShape(stoneShape);
    if (diamondType !== 'All') params.diamond = diamondType;
    if (totalCarat !== 'All') params.carat = totalCarat;
    if (clarity !== 'Any' && clarity !== 'All') params.clarity = clarity;
    if (color !== 'Any' && color !== 'All') params.color = color;
    if (cut !== 'Any' && cut !== 'All') params.cut = cut;
    if (certification !== 'Any' && certification !== 'All') params.certification = certification;
    if (minPriceVal > 500) params.minPrice = minPriceVal.toString();
    if (maxPriceVal < 50000) params.maxPrice = maxPriceVal.toString();
    if (sortOption !== 'bestsellers') params.sort = sortOption;

    setSearchParams(params, { replace: true });
  }, [
    gender,
    ringStyle,
    ringSize,
    metal,
    stoneShape,
    diamondType,
    totalCarat,
    clarity,
    color,
    cut,
    certification,
    minPriceVal,
    maxPriceVal,
    sortOption,
    setSearchParams,
  ]);

  // Sync state if URL search parameters change externally (Category switching, Back/Forward buttons)
  useEffect(() => {
    setGender(searchParams.get('gender') || 'All');
    setRingStyle(searchParams.get('style') || 'All');
    setRingSize(searchParams.get('ringSize') || 'All');
    setMetal(searchParams.get('metal') || 'All');
    setStoneShape(searchParams.get('shape') ? normalizeShape(searchParams.get('shape')!) : 'All');
    setDiamondType(searchParams.get('diamond') || 'All');
    setTotalCarat(searchParams.get('carat') || 'All');
    setClarity(searchParams.get('clarity') || 'Any');
    setColor(searchParams.get('color') || 'Any');
    setCut(searchParams.get('cut') || 'Any');
    setCertification(searchParams.get('certification') || 'Any');
    setSortOption(searchParams.get('sort') || 'bestsellers');
  }, [location.pathname, location.search]);

  // Fetch products matching all active filters (AND logic)
  const fetchProducts = () => {
    setLoading(true);
    let targetCat = categorySlug === 'collections' ? 'All' : categorySlug;
    const subCatParam = searchParams.get('category');
    const colParam = searchParams.get('collection');

    if (subCatParam && subCatParam !== categorySlug) {
      targetCat = subCatParam;
    }

    const normalizedShapeVal = normalizeShape(stoneShape);

    const params: Record<string, any> = {
      ...(targetCat !== 'All' && { category: targetCat }),
      ...(colParam && { collection: colParam }),
      sort: sortOption,
    };

    const searchQuery = searchParams.get('search') || searchParams.get('q') || searchParams.get('query');
    if (searchQuery) params.search = searchQuery;

    if (gender !== 'All') params.gender = gender;
    if (ringStyle !== 'All') params.style = ringStyle;
    if (ringSize !== 'All') params.ringSize = ringSize;
    if (metal !== 'All') params.metal = metal;
    if (normalizedShapeVal !== 'All') params.shape = normalizedShapeVal;
    if (diamondType !== 'All') params.diamondType = diamondType;
    if (totalCarat !== 'All') params.minCarat = totalCarat;
    if (clarity !== 'Any' && clarity !== 'All') params.clarity = clarity;
    if (color !== 'Any' && color !== 'All') params.color = color;
    if (cut !== 'Any' && cut !== 'All') params.cut = cut;
    if (certification !== 'Any' && certification !== 'All') params.certification = certification;

    api
      .getProducts(params)
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [
    categorySlug,
    location.search,
    gender,
    ringStyle,
    ringSize,
    metal,
    stoneShape,
    diamondType,
    totalCarat,
    clarity,
    color,
    cut,
    certification,
    minPriceVal,
    maxPriceVal,
    sortOption,
  ]);

  const subCatParam = searchParams.get('category');
  const collectionParam = searchParams.get('collection');
  const styleParam = searchParams.get('style');

  const activeMegaMenuKey = (subCatParam && subCatParam !== categorySlug ? subCatParam : null) || collectionParam;
  const activeMegaMenuMeta = activeMegaMenuKey ? MEGA_MENU_TITLES[activeMegaMenuKey] : null;

  const baseCategoryRecord = categories.find((c) => c.slug === categorySlug);
  const baseCategoryTitle =
    categorySlug === 'collections'
      ? 'Fine Jewellery Collections'
      : baseCategoryRecord?.name || (categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase());

  let categoryTitle = baseCategoryTitle;
  let categoryDesc =
    baseCategoryRecord?.description ||
    'Discover AETHELCARATS solitaire studs, drop earrings, and fine handcrafted diamond jewellery.';

  if (activeMegaMenuMeta) {
    categoryTitle = activeMegaMenuMeta.title;
    if (activeMegaMenuMeta.subtitle) categoryDesc = activeMegaMenuMeta.subtitle;
  } else if (subCatParam && subCatParam !== categorySlug && subCatParam !== 'All') {
    categoryTitle = subCatParam.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  } else if (collectionParam && collectionParam !== 'All') {
    categoryTitle = collectionParam.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  } else if (styleParam && styleParam !== 'All' && styleParam !== 'Any') {
    categoryTitle = `${styleParam} ${baseCategoryTitle}`;
  }

  const isSubCategoryActive = categoryTitle !== baseCategoryTitle;

  const resetFilters = () => {
    setGender('All');
    setRingStyle('All');
    setRingSize('All');
    setStoneShape('All');
    setTotalCarat('All');
    setDiamondType('All');
    setMetal('All');
    setClarity('Any');
    setColor('Any');
    setCut('Any');
    setCertification('Any');
    setMinPriceVal(500);
    setMaxPriceVal(50000);
    setSortOption('bestsellers');
    setSearchParams({});
  };

  return (
    <PageOuterWrapper>
      <PageContainer>
        {/* Breadcrumb */}
        <BreadcrumbNav aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/rings">Jewelry</Link>
          <span className="separator">/</span>
          {isSubCategoryActive ? (
            <>
              <Link to={`/${categorySlug}`}>{baseCategoryTitle}</Link>
              <span className="separator">/</span>
              <span className="current">{categoryTitle}</span>
            </>
          ) : (
            <span className="current">{baseCategoryTitle}</span>
          )}
        </BreadcrumbNav>

        {/* Category Header */}
        <RevealContainer yOffset={35}>
          <CategoryHeader>
            <h1>{categoryTitle}</h1>
            <DescriptionWrapper>
              <p>
                {isDescExpanded || categoryDesc.length <= 180
                  ? categoryDesc
                  : `${categoryDesc.slice(0, 180)}...`}
              </p>
              {categoryDesc.length > 180 && (
                <ExpandToggleBtn onClick={() => setIsDescExpanded(!isDescExpanded)}>
                  {isDescExpanded ? (
                    <>Show Less <ChevronUp size={14} /></>
                  ) : (
                    <>Show More <ChevronDown size={14} /></>
                  )}
                </ExpandToggleBtn>
              )}
            </DescriptionWrapper>
          </CategoryHeader>
        </RevealContainer>

        {/* Category Navigation Cards with Swiper Carousel & Navigation Arrows */}
        <RevealContainer yOffset={25}>
          <CategoryNavSection>
            <NavArrow ref={catPrevRef} $direction="prev" aria-label="Previous categories">
              <ChevronLeft size={18} />
            </NavArrow>
            <NavArrow ref={catNextRef} $direction="next" aria-label="Next categories">
              <ChevronRight size={18} />
            </NavArrow>

            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={2.2}
              grabCursor={true}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = catPrevRef.current;
                  swiper.params.navigation.nextEl = catNextRef.current;
                }
              }}
              breakpoints={{
                576: { slidesPerView: 3.2, spaceBetween: 16 },
                768: { slidesPerView: 4.2, spaceBetween: 18 },
                1024: { slidesPerView: 5.2, spaceBetween: 20 },
                1280: { slidesPerView: 6, spaceBetween: 20 },
              }}
            >
              {(() => {
                const defaultCategories = [
                  { name: 'Rings', slug: 'rings', image: '/assets/gem_rings_cat.png' },
                  { name: 'Earrings', slug: 'earrings', image: '/assets/gem_earrings_cat.png' },
                  { name: 'Bracelets', slug: 'bracelets', image: '/assets/gem_bracelets_cat.png' },
                  { name: 'Necklaces', slug: 'necklaces', image: '/assets/gem_necklaces_cat.png' },
                  { name: 'Pendants', slug: 'pendants', image: '/assets/aura_pendants_cat.png' },
                  { name: 'Diamonds', slug: 'diamonds', image: '/assets/gem_diamonds_cat.png' },
                  { name: 'Collections', slug: 'collections', image: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp' },
                ];

                const list = categories.length > 0 ? categories : defaultCategories;

                return list.map((cat: any) => {
                  const slugName = cat.slug || cat.name?.toLowerCase();
                  const isActive = slugName === categorySlug || (categorySlug === 'rings' && slugName === 'rings');
                  const defaultImage = defaultCategories.find((d) => d.slug === slugName)?.image || '/assets/gem_rings_cat.png';

                  return (
                    <SwiperSlide key={cat.id || slugName}>
                      <CategoryNavCard to={cat.link || `/${slugName}`} $active={isActive}>
                        <CardImageWrapper $active={isActive}>
                          <SafeImage
                            src={cat.image || defaultImage}
                            alt={cat.name}
                            fallbackSrc={defaultImage}
                          />
                        </CardImageWrapper>
                        <CardTitle $active={isActive}>{cat.name}</CardTitle>
                      </CategoryNavCard>
                    </SwiperSlide>
                  );
                });
              })()}
            </Swiper>
          </CategoryNavSection>
        </RevealContainer>

        {/* Aura Custom Luxury Filter Bar */}
        <div style={{ position: 'relative', zIndex: 100, overflow: 'visible' }}>
          <AuraFilterBar
            selectedFilters={{
              gender: gender !== 'All' ? [gender] : [],
              style: ringStyle !== 'All' ? [ringStyle] : [],
              shape: stoneShape !== 'All' ? [stoneShape] : [],
              metal: metal !== 'All' ? [metal] : [],
              diamond: diamondType !== 'All' ? [diamondType] : [],
              ringSize: ringSize !== 'All' ? [ringSize] : [],
              carat: totalCarat !== 'All' ? [totalCarat] : [],
              clarity: clarity !== 'Any' ? [clarity] : [],
              color: color !== 'Any' ? [color] : [],
              cut: cut !== 'Any' ? [cut] : [],
              certification: certification !== 'Any' ? [certification] : [],
            }}
            onFilterChange={(key: string, values: string[]) => {
              const val = values[0] || 'All';
              if (key === 'gender') setGender(val);
              if (key === 'style') setRingStyle(val);
              if (key === 'shape') setStoneShape(normalizeShape(val));
              if (key === 'metal') setMetal(val);
              if (key === 'diamond') setDiamondType(val);
              if (key === 'ringSize') setRingSize(val);
              if (key === 'carat') setTotalCarat(val);
              if (key === 'clarity') setClarity(val);
              if (key === 'color') setColor(val);
              if (key === 'cut') setCut(val);
              if (key === 'certification') setCertification(val);
            }}
            onClearAll={resetFilters}
            sortValue={sortOption}
            onSortChange={(val: string) => setSortOption(val)}
            totalResults={products.length}
            minPrice={minPriceVal}
            maxPrice={maxPriceVal}
            onPriceChange={(min: number, max: number) => {
              setMinPriceVal(min);
              setMaxPriceVal(max);
            }}
            categorySlug={categorySlug}
          />
        </div>

        {/* Product Grid */}
        {loading ? (
          <ProductGrid>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </ProductGrid>
        ) : products.length === 0 ? (
          <EmptyState>
            <h3>NO JEWELLERY FOUND</h3>
            <p>We couldn't find pieces matching your selected filters.</p>
            <ClearFiltersBtn onClick={resetFilters}>
              <RotateCcw size={14} /> CLEAR FILTERS
            </ClearFiltersBtn>
          </EmptyState>
        ) : (
          <ProductGrid>
            {products.map((product, idx) => (
              <RevealContainer key={product.id} staggerIndex={idx} yOffset={25}>
                <ProductCard product={product} />
              </RevealContainer>
            ))}
          </ProductGrid>
        )}
      </PageContainer>
    </PageOuterWrapper>
  );
};
