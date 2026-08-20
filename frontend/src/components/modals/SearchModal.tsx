import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, ArrowRight, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Product, Diamond } from '../../types';
import { useWishlist } from '../../context/WishlistContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin?: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(24, 23, 21, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 12px 10px;
  }
`;

const ModalCard = styled(motion.div)`
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  width: 100%;
  max-width: 1020px;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(31, 31, 31, 0.18), 0 0 0 1px rgba(201, 164, 92, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 0;
    max-height: 94vh;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 28px;
  border-bottom: 1px solid #f0eae1;

  .header-left {
    h3 {
      font-family: 'Cormorant Garamond', 'Playfair Display', serif;
      font-size: 1.8rem;
      color: #1f1f1f;
      margin: 0;
      font-weight: 600;
    }
  }

  .close-btn {
    background: none;
    border: none;
    color: #1f1f1f;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: #c9a45c;
      transform: scale(1.1);
    }
  }
`;

const InputSection = styled.div`
  padding: 16px 28px 20px;
  background-color: #ffffff;

  .input-bar {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #f7f4ee;
    border: 1px solid #e5dfd5;
    border-radius: 30px;
    padding: 0 18px;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);

    &:focus-within {
      border-color: #c9a45c;
      background-color: #ffffff;
      box-shadow: 0 0 0 4px rgba(201, 164, 92, 0.14);
    }

    .search-icn {
      color: #777;
      margin-right: 12px;
    }

    input {
      width: 100%;
      height: 48px;
      border: none;
      background: transparent;
      font-size: 0.95rem;
      color: #1f1f1f;
      outline: none;
      font-family: 'Inter', sans-serif;
    }

    .clear-btn {
      background: none;
      border: none;
      color: #888;
      cursor: pointer;
      padding: 4px;

      &:hover {
        color: #1f1f1f;
      }
    }
  }
`;

const ContentBody = styled.div<{ $hasQuery?: boolean }>`
  padding: 16px 28px 32px;
  display: grid;
  grid-template-columns: ${({ $hasQuery }) => ($hasQuery ? '1fr' : '220px 1fr')};
  gap: 32px;
  max-height: 72vh;
  overflow-y: auto;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px 20px 24px;
  }
`;

const LeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-right: 1px solid #f0eae1;
  padding-right: 24px;

  @media (max-width: 860px) {
    border-right: none;
    padding-right: 0;
    border-bottom: 1px solid #f0eae1;
    padding-bottom: 20px;
  }
`;

const PopularList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.88rem;
    color: #1f1f1f;
    cursor: pointer;
    padding: 6px 0;
    transition: color 0.2s ease;

    &.active {
      color: #c9a45c;
      font-weight: 600;
    }

    &:hover {
      color: #c9a45c;
    }

    svg {
      color: #aaa;
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: translateX(3px);
      color: #c9a45c;
    }
  }
`;

const SectionLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b6b6b;
  margin-bottom: 12px;
`;

const SuggestionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SuggestionChip = styled.button`
  background-color: #f7f4ee;
  border: 1px solid #e8e3d9;
  border-radius: 16px;
  padding: 6px 14px;
  font-size: 0.78rem;
  color: #1f1f1f;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffffff;
    border-color: #c9a45c;
    color: #c9a45c;
    transform: translateY(-1px);
  }
`;

const RightArea = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .area-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;

    .title {
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #1f1f1f;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .view-all {
      font-size: 0.82rem;
      color: #1f1f1f;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color 0.2s ease;

      &:hover {
        color: #c9a45c;
      }
    }
  }
`;

const CarouselNavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #d9d3c7;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #1f1f1f;
    transition: all 0.2s ease;

    &:hover {
      border-color: #c9a45c;
      color: #c9a45c;
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
`;

const ProductCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 8px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCardItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #f0eae1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  border-radius: 4px;

  &:hover {
    border-color: #c9a45c;
    box-shadow: 0 8px 20px rgba(201, 164, 92, 0.12);
    transform: translateY(-2px);
  }

  .wishlist-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 2;
    background: rgba(255, 255, 255, 0.85);
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b6b6b;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #c9a45c;
      background: #ffffff;
    }

    &.in-wishlist {
      color: #d32f2f;
      fill: #d32f2f;
    }
  }

  .img-box {
    width: 100%;
    aspect-ratio: 1;
    background-color: #faf8f5;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 2px;

    img {
      max-width: 92%;
      max-height: 92%;
      object-fit: contain;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover img {
      transform: scale(1.06);
    }
  }

  .name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #1f1f1f;
    margin-bottom: 6px;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price {
    font-size: 0.88rem;
    font-weight: 700;
    color: #1f1f1f;
    margin-top: auto;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #faf5eb;
  border: 1px dashed #d9d3c7;
  border-radius: 4px;

  h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    color: #1f1f1f;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.88rem;
    color: #6b6b6b;
    margin-bottom: 20px;
  }

  .btn-row {
    display: flex;
    gap: 12px;
    justify-content: center;

    button {
      padding: 10px 20px;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border: 1px solid #1f1f1f;
      background: #1f1f1f;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #b8944d;
        border-color: #b8944d;
      }

      &.secondary {
        background: transparent;
        color: #1f1f1f;

        &:hover {
          background: #faf5eb;
          border-color: #c9a45c;
        }
      }
    }
  }
`;

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onOpenLogin }) => {
  const [query, setQuery] = useState('');
  const [activePopularTerm, setActivePopularTerm] = useState('Tennis bracelet');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [popularSearches, setPopularSearches] = useState<string[]>([
    'Tennis bracelet',
    'Engagement ring',
    'Sapphire ring',
    'Wedding band',
    'Ruby jewelry',
    'Earrings',
  ]);

  const [suggestions, setSuggestions] = useState<string[]>([
    'Personalized Jewelry',
    'Cross Necklace',
    'Eternity Ring',
    'Pearl Jewelry',
    'Ready To Ship Engagement',
  ]);

  const navigate = useNavigate();
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Load Admin CMS Site Settings for Popular Searches
  useEffect(() => {
    api.getSiteSettings().then((settings) => {
      if (settings?.popular_searches) {
        try {
          const parsed = JSON.parse(settings.popular_searches);
          if (Array.isArray(parsed) && parsed.length > 0) setPopularSearches(parsed);
        } catch (e) {}
      }
    }).catch(console.error);
  }, []);

  // Fetch Featured Carousel Products for Initial State OR Search Results for Typed Query
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    if (!query.trim()) {
      // STATE 1: Initial Featured Carousel state (Load top products for activePopularTerm e.g. Tennis bracelet)
      const targetTerm = activePopularTerm.toLowerCase();
      api.getProducts({ category: targetTerm, limit: '8' }).then((res) => {
        if (res.products && res.products.length > 0) {
          setProducts(res.products);
        } else {
          // Fallback to top products if category empty
          api.getProducts({ limit: '8', sort: 'bestsellers' }).then((fallbackRes) => {
            setProducts(fallbackRes.products || []);
          });
        }
        setDiamonds([]);
      }).finally(() => setIsLoading(false));
    } else {
      // STATE 2 & 3: User typing real search query
      Promise.all([
        api.getProducts({ search: query, limit: '8' }),
        api.getDiamonds({ search: query, limit: '8' }),
      ]).then(([prodRes, diaRes]) => {
        setProducts(prodRes.products || []);
        setDiamonds(diaRes.diamonds || []);
      }).finally(() => setIsLoading(false));
    }
    setCarouselIndex(0);
  }, [query, activePopularTerm, isOpen]);

  const handlePopularClick = (term: string) => {
    setActivePopularTerm(term);
    setQuery('');
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
  };

  const handleProductClick = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const token = localStorage.getItem('floksy_token') || localStorage.getItem('fj_admin_token');
    if (!token) {
      onClose();
      if (onOpenLogin) onOpenLogin();
      return;
    }
    toggleWishlist(product);
  };

  const visibleProducts = products.slice(carouselIndex, carouselIndex + 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onClose}
        >
          <ModalCard
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <div className="header-left">
                <h3>Search</h3>
              </div>

              <button className="close-btn" onClick={onClose} aria-label="Close search">
                <X size={20} />
              </button>
            </ModalHeader>

            <InputSection>
              <div className="input-bar">
                <SearchIcon size={20} className="search-icn" />
                <input
                  type="text"
                  placeholder="Search FLOKSY JEWEL..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                {query && (
                  <button className="clear-btn" onClick={() => setQuery('')}>
                    <X size={16} />
                  </button>
                )}
              </div>
            </InputSection>

            <ContentBody $hasQuery={!!query.trim()}>
              {/* LEFT SIDEBAR: POPULAR SEARCHES & SUGGESTIONS */}
              {!query.trim() && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LeftSidebar>
                    <div>
                      <PopularList>
                        {popularSearches.map((term) => (
                          <div
                            key={term}
                            className={`item ${activePopularTerm === term ? 'active' : ''}`}
                            onClick={() => handlePopularClick(term)}
                          >
                            <span>{term}</span>
                            <ArrowRight size={14} />
                          </div>
                        ))}
                      </PopularList>
                    </div>

                    <div>
                      <SectionLabel>SUGGESTIONS</SectionLabel>
                      <SuggestionsGrid>
                        {suggestions.map((sug) => (
                          <SuggestionChip key={sug} onClick={() => handleSuggestionClick(sug)}>
                            {sug}
                          </SuggestionChip>
                        ))}
                      </SuggestionsGrid>
                    </div>
                  </LeftSidebar>
                </motion.div>
              )}

              {/* RIGHT AREA: FEATURED PRODUCT CAROUSEL OR STAGGERED SEARCH RESULTS */}
              <RightArea>
                <div className="area-header">
                  <div className="title">
                    {query
                      ? `SEARCH RESULTS FOR "${query.toUpperCase()}"`
                      : `TOP PICKS IN ${activePopularTerm.toUpperCase()}`}
                  </div>

                  <div className="header-actions">
                    {!query && products.length > 4 && (
                      <CarouselNavRow>
                        <button
                          onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
                          disabled={carouselIndex === 0}
                          aria-label="Previous products"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setCarouselIndex((prev) => Math.min(products.length - 4, prev + 1))}
                          disabled={carouselIndex >= products.length - 4}
                          aria-label="Next products"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </CarouselNavRow>
                    )}

                    <span
                      className="view-all"
                      onClick={() => {
                        onClose();
                        navigate(query ? `/rings?search=${encodeURIComponent(query)}` : `/rings`);
                      }}
                    >
                      View All <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                {isLoading ? (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#777', fontSize: '0.9rem' }}>
                    Searching FLOKSY JEWEL inventory...
                  </div>
                ) : (!query && products.length > 0) ? (
                  /* STATE 1: INITIAL FEATURED PRODUCT CAROUSEL */
                  <ProductCardsGrid>
                    {visibleProducts.map((p, idx) => {
                      const inWish = isInWishlist(p.id);
                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 15, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ProductCardItem onClick={() => handleProductClick(p.slug)}>
                            <button
                              className={`wishlist-btn ${inWish ? 'in-wishlist' : ''}`}
                              onClick={(e) => handleWishlistToggle(e, p)}
                              aria-label="Add to wishlist"
                            >
                              <Heart size={15} fill={inWish ? '#d32f2f' : 'none'} />
                            </button>

                            <div className="img-box">
                              <img
                                src={p.primaryImage || '/assets/floksy_rings_cat.png'}
                                alt={p.name}
                                onError={(e: any) => { e.target.src = '/assets/floksy_rings_cat.png'; }}
                              />
                            </div>
                            <div className="name">{p.name}</div>
                            <div className="price">${p.price?.toLocaleString()}</div>
                          </ProductCardItem>
                        </motion.div>
                      );
                    })}
                  </ProductCardsGrid>
                ) : (query && (products.length > 0 || diamonds.length > 0)) ? (
                  /* STATE 3: SEARCH RESULTS FOUND WITH STAGGERED REVEAL */
                  <ProductCardsGrid>
                    {products.map((p, idx) => {
                      const inWish = isInWishlist(p.id);
                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 18, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ProductCardItem onClick={() => handleProductClick(p.slug)}>
                            <button
                              className={`wishlist-btn ${inWish ? 'in-wishlist' : ''}`}
                              onClick={(e) => handleWishlistToggle(e, p)}
                              aria-label="Add to wishlist"
                            >
                              <Heart size={15} fill={inWish ? '#d32f2f' : 'none'} />
                            </button>

                            <div className="img-box">
                              <img
                                src={p.primaryImage || '/assets/floksy_rings_cat.png'}
                                alt={p.name}
                                onError={(e: any) => { e.target.src = '/assets/floksy_rings_cat.png'; }}
                              />
                            </div>
                            <div className="name">{p.name}</div>
                            <div className="price">${p.price?.toLocaleString()}</div>
                          </ProductCardItem>
                        </motion.div>
                      );
                    })}
                    {diamonds.map((d, idx) => (
                      <motion.div
                        key={d.id}
                        initial={{ opacity: 0, y: 18, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, delay: (products.length + idx) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ProductCardItem onClick={() => { onClose(); navigate('/diamonds'); }}>
                          <div className="img-box">
                            <img
                              src={d.imageUrl || `/assets/diamonds/${d.shape || 'Round'}.svg`}
                              alt={d.diamondId}
                              onError={(e: any) => { e.target.src = `/assets/diamonds/Round.svg`; }}
                            />
                          </div>
                          <div className="name">{d.carat}ct {d.shape} Diamond ({d.color}/{d.clarity})</div>
                          <div className="price">${d.price?.toLocaleString()}</div>
                        </ProductCardItem>
                      </motion.div>
                    ))}
                  </ProductCardsGrid>
                ) : (query && products.length === 0 && diamonds.length === 0) ? (
                  /* STATE 4: ZERO RESULTS */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EmptyState>
                      <h4>WE COULDN'T FIND AN EXACT MATCH</h4>
                      <p>Try searching for specific diamond shapes, ring styles, or explore our curated collections.</p>
                      <div className="btn-row">
                        <button onClick={() => setQuery('')}>RESET SEARCH</button>
                        <button className="secondary" onClick={() => { onClose(); navigate('/diamonds'); }}>
                          EXPLORE DIAMONDS
                        </button>
                      </div>
                    </EmptyState>
                  </motion.div>
                ) : null}
              </RightArea>
            </ContentBody>
          </ModalCard>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
