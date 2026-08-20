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
import { FloksyFilterBar } from '../../components/ui/FloksyFilterBar';
import { normalizeShape } from '../../config/diamondShapes';
import { RevealContainer } from '../../components/ui/RevealContainer';

const PageOuterWrapper = styled.div`
  background-color: #F9F7F2;
  min-height: 100vh;
  width: 100%;
`;

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 80px;
  box-sizing: border-box;
  overflow-x: hidden;
  background-color: #F9F7F2;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`;

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #77736c;
  margin-bottom: 24px;
  letter-spacing: 0.05em;

  a {
    color: #77736c;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  span.separator {
    color: #c9a45c;
    font-size: 0.7rem;
  }

  span.current {
    color: #242321;
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
    color: #242321;
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
  color: #55524d;
  font-size: 0.95rem;

  p {
    margin-bottom: 8px;
  }
`;

const ExpandToggleBtn = styled.button`
  background: none;
  border: none;
  color: #c9a45c;
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
  border-bottom: 1px solid #e8e3d9;
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
  background-color: #fffdf9;
  border: 1px solid #e8e3d9;
  color: #242321;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 20;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #242321;
    color: #fffdf9;
    border-color: #242321;
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
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: #faf5eb;
  border: ${({ $active }) => ($active ? '2.5px solid #C9A45C' : '1px solid #e8e3d9')};
  box-shadow: ${({ $active }) => ($active ? '0 6px 20px rgba(201, 164, 92, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.04)')};
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
    border-color: #C9A45C;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201, 164, 92, 0.3);

    img {
      transform: scale(1.06);
    }
  }
`;

const CardTitle = styled.span<{ $active?: boolean }>`
  font-size: 0.88rem;
  font-weight: ${({ $active }) => ($active ? '700' : '600')};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#C9A45C' : '#242321')};
  text-align: left;
  margin-left: 2px;
  transition: color 0.2s ease;
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
  background: linear-gradient(90deg, #f3efe6 0%, #e8e3d9 50%, #f3efe6 100%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s infinite;
  border-radius: 4px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 20px;
  background-color: #fdfbf7;
  border: 1px dashed #e8e3d9;
  margin: 40px 0;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #242321;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #77736c;
    margin-bottom: 20px;
  }
`;

const DEFAULT_CATEGORIES: any[] = [
  { id: 'rings', name: 'Rings', slug: 'rings', description: 'Discover FLOKSY JEWEL solitaire studs, drop earrings, and diamond huggies.', image: '/assets/floksy_rings_cat.png' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings', description: 'Discover FLOKSY JEWEL solitaire studs, drop earrings, and diamond huggies.', image: '/assets/floksy_earrings_cat.png' },
  { id: 'necklaces', name: 'Necklaces', slug: 'necklaces', description: 'Discover FLOKSY JEWEL diamond rivière necklaces, solitaire pendants, and statement colliers.', image: '/assets/floksy_necklaces_cat.png' },
  { id: 'bracelets', name: 'Bracelets', slug: 'bracelets', description: 'Explore FLOKSY JEWEL diamond tennis bracelets, line cuffs, and high-jewellery bangles.', image: '/assets/floksy_bracelets_cat.png' },
  { id: 'pendants', name: 'Pendants', slug: 'pendants', description: 'Explore FLOKSY JEWEL solitaire diamond pendants and custom halo medallion drops.', image: '/assets/floksy_pendants_cat.png' },
  { id: 'diamonds', name: 'Diamonds', slug: 'diamonds', description: 'Browse GIA & IGI authenticated loose diamonds across Round, Oval, Emerald, and Cushion cuts.', image: '/assets/floksy_diamonds_cat.png' },
  { id: 'collections', name: 'Collections', slug: 'collections', description: 'Explore the complete FLOKSY JEWEL portfolio of handcrafted fine jewellery.', image: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp' },
];

export const ProductListPage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPath = location.pathname.replace('/', '') || 'rings';
  const categorySlug = rawPath === 'atelier-vault-7Kx9Qm4R2Lp8Nw6T' ? 'rings' : rawPath;

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
    const targetCat = categorySlug === 'collections' ? 'All' : categorySlug;
    const normalizedShapeVal = normalizeShape(stoneShape);

    const params: Record<string, any> = {
      ...(targetCat !== 'All' && { category: targetCat }),
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

  const activeCategoryRecord = categories.find((c) => c.slug === categorySlug);
  const categoryTitle =
    categorySlug === 'collections'
      ? 'Fine Jewellery Collections'
      : activeCategoryRecord?.name || (categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase());

  const categoryDesc =
    activeCategoryRecord?.description ||
    'Discover FLOKSY JEWEL solitaire studs, drop earrings, and fine handcrafted diamond jewellery.';

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
          <span className="current">{categoryTitle}</span>
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
                  { name: 'Rings', slug: 'rings', image: '/assets/floksy_rings_cat.png' },
                  { name: 'Earrings', slug: 'earrings', image: '/assets/floksy_earrings_cat.png' },
                  { name: 'Bracelets', slug: 'bracelets', image: '/assets/floksy_bracelets_cat.png' },
                  { name: 'Necklaces', slug: 'necklaces', image: '/assets/floksy_necklaces_cat.png' },
                  { name: 'Pendants', slug: 'pendants', image: '/assets/floksy_pendants_cat.png' },
                  { name: 'Diamonds', slug: 'diamonds', image: '/assets/floksy_diamonds_cat.png' },
                  { name: 'Collections', slug: 'collections', image: '/assets/GOLD-MARQUISE-DIAMOND-JEWELRY-SET.webp' },
                ];

                const list = categories.length > 0 ? categories : defaultCategories;

                return list.map((cat: any) => {
                  const slugName = cat.slug || cat.name?.toLowerCase();
                  const isActive = slugName === categorySlug || (categorySlug === 'rings' && slugName === 'rings');
                  const defaultImage = defaultCategories.find((d) => d.slug === slugName)?.image || '/assets/floksy_rings_cat.png';

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

        {/* Floksy Custom Luxury Filter Bar */}
        <RevealContainer yOffset={25}>
          <FloksyFilterBar
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
          onFilterChange={(key, values) => {
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
          onSortChange={(val) => setSortOption(val)}
          totalResults={products.length}
          minPrice={minPriceVal}
          maxPrice={maxPriceVal}
          onPriceChange={(min, max) => {
            setMinPriceVal(min);
            setMaxPriceVal(max);
          }}
          categorySlug={categorySlug}
        />
      </RevealContainer>

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
            <ExpandToggleBtn onClick={resetFilters} style={{ margin: '0 auto', fontSize: '0.85rem' }}>
              <RotateCcw size={14} /> CLEAR FILTERS
            </ExpandToggleBtn>
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
