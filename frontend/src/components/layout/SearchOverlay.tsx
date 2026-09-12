import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, X, ArrowRight, RotateCcw } from 'lucide-react';
import { api } from '../../services/api';
import { Product, Diamond } from '../../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCH_ITEMS = [
  { label: 'Engagement Rings', query: 'engagement rings', url: '/rings?category=engagement' },
  { label: 'Diamond Rings', query: 'diamond rings', url: '/rings' },
  { label: 'Oval Diamonds', query: 'oval diamonds', url: '/diamonds?shapes=Oval' },
  { label: 'Lab-Grown Diamonds', query: 'lab grown diamonds', url: '/diamonds?type=LAB_GROWN' },
  { label: 'Natural Diamonds', query: 'natural diamonds', url: '/diamonds?type=NATURAL' },
  { label: 'Wedding Bands', query: 'wedding bands', url: '/rings?category=wedding' },
  { label: 'Earrings', query: 'earrings', url: '/earrings' },
  { label: 'Necklaces', query: 'necklaces', url: '/necklaces' },
  { label: 'GIA Diamonds', query: 'gia diamonds', url: '/diamonds?certificate=GIA' },
  { label: 'IGI Diamonds', query: 'igi diamonds', url: '/diamonds?certificate=IGI' },
];

const OverlayBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(26, 25, 24, 0.65);
  backdrop-filter: blur(6px);
  z-index: 2500;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.25s ease, visibility 0.25s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const OverlayContainer = styled.div`
  width: 92%;
  max-width: 1100px;
  max-height: 88vh;
  background-color: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    border: none;
  }
`;

const OverlayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px 16px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);

  .title {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  @media (max-width: 576px) {
    padding: 16px 20px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #F5F1E8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;

  &:hover {
    color: #C9A96E;
  }
`;

const SearchInputSection = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);
  background-color: #151515;

  @media (max-width: 576px) {
    padding: 16px 20px;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 18px;
    color: #A8A8A8;
  }

  .clear-icon {
    position: absolute;
    right: 18px;
    background: transparent;
    border: none;
    color: #A8A8A8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;

    &:hover {
      color: #F5F1E8;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 48px 16px 52px;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  color: #F5F1E8;
  background-color: #0B0B0B;
  border: 1.5px solid rgba(140, 116, 75, 0.3);
  border-radius: 2px;
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: #99948d;
  }

  &:focus {
    border-color: #C9A96E;
    background-color: #151515;
  }

  @media (max-width: 576px) {
    font-size: 0.95rem;
    padding: 12px 42px 12px 44px;
  }
`;

const ContentBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px 40px;

  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const PopularSearchesSection = styled.div`
  .section-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #C9A96E;
    margin-bottom: 16px;
  }
`;

const PopularGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PopularChip = styled.button`
  padding: 10px 18px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #F5F1E8;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #C9A96E;
    color: #C9A96E;
    background-color: #0B0B0B;
  }

  .arrow {
    opacity: 0.5;
    transition: transform 0.2s ease;
  }

  &:hover .arrow {
    opacity: 1;
    transform: translateX(3px);
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .count {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
  }
`;

const TabsRow = styled.div`
  display: flex;
  gap: 8px;
`;

const ResultTabBtn = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: ${({ $active }) => ($active ? '#C9A96E' : '#151515')};
  color: ${({ $active }) => ($active ? '#0B0B0B' : '#D8D2C5')};
  border: 1px solid ${({ $active }) => ($active ? '#C9A96E' : 'rgba(140, 116, 75, 0.3)')};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #C9A96E;
    color: ${({ $active }) => ($active ? '#0B0B0B' : '#C9A96E')};
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ItemCard = styled.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: #C9A96E;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }

  .img-wrapper {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    margin-bottom: 12px;
    background-color: #0B0B0B;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #F5F1E8;
    margin-bottom: 4px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    font-size: 0.72rem;
    color: #77736c;
    margin-bottom: 8px;
  }

  .price {
    font-size: 0.88rem;
    font-weight: 700;
    color: #C9A96E;
    margin-top: auto;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 48px 0;
  color: #77736c;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 20px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    color: #F5F1E8;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  p {
    font-size: 0.9rem;
    color: #77736c;
    margin-bottom: 24px;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid #C9A96E;
  background-color: transparent;
  color: #C9A96E;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
  }
`;

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PRODUCTS' | 'DIAMONDS'>('ALL');

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  // Focus management
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search logic
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setProducts([]);
      setDiamonds([]);
      setLoading(false);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    const timer = setTimeout(() => {
      // Parse query terms for diamond filters
      const lowerQuery = trimmed.toLowerCase();
      const diamondParams: Record<string, any> = { limit: 12, search: trimmed };

      if (lowerQuery.includes('lab grown') || lowerQuery.includes('lab-grown') || lowerQuery.includes('labgrown')) {
        diamondParams.type = 'LAB_GROWN';
      } else if (lowerQuery.includes('natural')) {
        diamondParams.type = 'NATURAL';
      }

      if (lowerQuery.includes('gia')) diamondParams.labs = 'GIA';
      if (lowerQuery.includes('igi')) diamondParams.labs = 'IGI';
      if (lowerQuery.includes('gcal')) diamondParams.labs = 'GCAL';

      // Shape parsing
      const shapes = ['oval', 'round', 'cushion', 'emerald', 'pear', 'marquise', 'radiant', 'princess', 'asscher', 'heart'];
      shapes.forEach((s) => {
        if (lowerQuery.includes(s)) {
          diamondParams.shapes = s.charAt(0).toUpperCase() + s.slice(1);
        }
      });

      Promise.all([
        api.getProducts({ search: trimmed, limit: 12 }).catch(() => ({ products: [] })),
        api.getDiamonds(diamondParams).catch(() => ({ diamonds: [] })),
      ])
        .then(([prodRes, diaRes]) => {
          setProducts(prodRes.products || []);
          setDiamonds(diaRes.diamonds || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Search error:', err);
          setError(true);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalResults = products.length + diamonds.length;

  const handlePopularClick = (item: typeof POPULAR_SEARCH_ITEMS[0]) => {
    if (item.url) {
      onClose();
      navigate(item.url);
    } else {
      setQuery(item.query);
    }
  };

  const handleProductClick = (product: Product) => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const handleDiamondClick = (diamond: Diamond) => {
    onClose();
    navigate(`/diamonds?shape=${diamond.shape}&type=${diamond.diamondType}`);
  };

  return (
    <OverlayBackdrop $isOpen={isOpen} onClick={onClose}>
      <OverlayContainer onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <OverlayHeader>
          <span className="title">SEARCH</span>
          <CloseButton onClick={onClose} aria-label="Close Search Overlay">
            <X size={24} />
          </CloseButton>
        </OverlayHeader>

        {/* INPUT */}
        <SearchInputSection>
          <SearchInputWrapper>
            <Search size={22} className="search-icon" />
            <SearchInput
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AETHELCARATS..."
            />
            {query && (
              <button className="clear-icon" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </SearchInputWrapper>
        </SearchInputSection>

        {/* BODY */}
        <ContentBody>
          {/* DEFAULT STATE: POPULAR SEARCHES */}
          {!query.trim() && (
            <PopularSearchesSection>
              <div className="section-title">POPULAR SEARCHES</div>
              <PopularGrid>
                {POPULAR_SEARCH_ITEMS.map((item, idx) => (
                  <PopularChip key={idx} onClick={() => handlePopularClick(item)}>
                    <span>{item.label}</span>
                    <ArrowRight size={14} className="arrow" />
                  </PopularChip>
                ))}
              </PopularGrid>
            </PopularSearchesSection>
          )}

          {/* LOADING STATE */}
          {query.trim() !== '' && loading && (
            <LoadingState>Finding matching products...</LoadingState>
          )}

          {/* ERROR STATE */}
          {query.trim() !== '' && !loading && error && (
            <EmptyState>
              <h3>SEARCH ERROR</h3>
              <p>Sorry, we couldn't complete that search right now. Please try again.</p>
              <div className="actions">
                <ActionButton onClick={() => setQuery('')}>
                  <RotateCcw size={14} /> RESET SEARCH
                </ActionButton>
              </div>
            </EmptyState>
          )}

          {/* EMPTY RESULTS STATE */}
          {query.trim() !== '' && !loading && !error && totalResults === 0 && (
            <EmptyState>
              <h3>WE COULDN'T FIND AN EXACT MATCH</h3>
              <p>Try another shape, wider price range, or different criteria.</p>
              <div className="actions">
                <ActionButton onClick={() => setQuery('')}>
                  <RotateCcw size={14} /> RESET SEARCH
                </ActionButton>
                <ActionButton onClick={() => navigate('/diamonds')}>
                  EXPLORE DIAMONDS
                </ActionButton>
              </div>
            </EmptyState>
          )}

          {/* RESULTS STATE */}
          {query.trim() !== '' && !loading && !error && totalResults > 0 && (
            <>
              <ResultsHeader>
                <span className="count">{totalResults} {totalResults === 1 ? 'RESULT FOUND' : 'RESULTS FOUND'}</span>
                {products.length > 0 && diamonds.length > 0 && (
                  <TabsRow>
                    <ResultTabBtn $active={activeTab === 'ALL'} onClick={() => setActiveTab('ALL')}>
                      ALL ({totalResults})
                    </ResultTabBtn>
                    <ResultTabBtn $active={activeTab === 'PRODUCTS'} onClick={() => setActiveTab('PRODUCTS')}>
                      JEWELRY ({products.length})
                    </ResultTabBtn>
                    <ResultTabBtn $active={activeTab === 'DIAMONDS'} onClick={() => setActiveTab('DIAMONDS')}>
                      DIAMONDS ({diamonds.length})
                    </ResultTabBtn>
                  </TabsRow>
                )}
              </ResultsHeader>

              <ResultsGrid>
                {/* JEWELRY PRODUCTS */}
                {(activeTab === 'ALL' || activeTab === 'PRODUCTS') &&
                  products.map((product) => (
                    <ItemCard key={`prod-${product.id}`} onClick={() => handleProductClick(product)}>
                      <div className="img-wrapper">
                        <img
                          src={product.primaryImage || (product.images && product.images[0] ? product.images[0].url : '')}
                          alt={product.name}
                        />
                      </div>
                      <div className="name">{product.name}</div>
                      <div className="meta">{product.jewelleryType || product.category?.name || 'Jewelry'}</div>
                      <div className="price">${(product.price || 0).toLocaleString()}</div>
                    </ItemCard>
                  ))}

                {/* LOOSE DIAMONDS */}
                {(activeTab === 'ALL' || activeTab === 'DIAMONDS') &&
                  diamonds.map((diamond) => (
                    <ItemCard key={`dia-${diamond.id}`} onClick={() => handleDiamondClick(diamond)}>
                      <div className="img-wrapper">
                        <img
                          src={diamond.imageUrl || `/assets/diamonds/${diamond.shape ? diamond.shape.charAt(0).toUpperCase() + diamond.shape.slice(1).toLowerCase() : 'Round'}.svg`}
                          alt={`${diamond.carat}ct ${diamond.shape} Diamond`}
                        />
                      </div>
                      <div className="name">{diamond.carat}ct {diamond.shape} Diamond</div>
                      <div className="meta">
                        {diamond.diamondType === 'LAB_GROWN' ? 'Lab-Grown' : 'Natural'} • {diamond.color}/{diamond.clarity} • {diamond.lab || 'Certified'}
                      </div>
                      <div className="price">${(diamond.price || 0).toLocaleString()}</div>
                    </ItemCard>
                  ))}
              </ResultsGrid>
            </>
          )}
        </ContentBody>
      </OverlayContainer>
    </OverlayBackdrop>
  );
};
