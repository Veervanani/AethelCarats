import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { RevealContainer } from '../../components/ui/RevealContainer';

const PageWrapper = styled.div`
  max-width: 1400px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`;

const TitleHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    letter-spacing: 0.04em;
  }
`;

const EmptyStateContainer = styled.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 32px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  .icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-color: rgba(201, 169, 110, 0.1);
    border: 1px solid rgba(140, 116, 75, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C9A96E;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    margin-bottom: 32px;
    line-height: 1.6;
  }
`;

const CategoryButtonsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const CategoryBtn = styled(Link)`
  padding: 12px 22px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background-color: #111111;
  color: #F5F1E8;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
    transform: translateY(-2px);
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const WishlistCard = styled.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    border-color: rgba(201, 169, 110, 0.6);
    transform: translateY(-2px);
  }

  .img-box-link {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background-color: #0B0B0B;
    margin-bottom: 14px;
    border-radius: 2px;
    display: block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .name-link {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #F5F1E8;
    margin-bottom: 8px;
    line-height: 1.35;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  .price {
    font-size: 1.1rem;
    font-weight: 700;
    color: #C9A96E;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
  }

  .btn-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    width: 100%;
  }
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 12px 14px;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background-color: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 15px rgba(201, 169, 110, 0.35);
  }
`;

const RemoveBtn = styled.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  color: #A8A8A8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &:hover {
    color: #E53E3E;
    background: rgba(229, 62, 62, 0.1);
    border-color: rgba(229, 62, 62, 0.5);
  }
`;

export const WishlistPage: React.FC = () => {
  const { wishlistItems: items, toggleWishlist } = useWishlist();
  const cartCtx = useCart();
  const { showToast } = useToast();

  const handleRemove = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) toggleWishlist(item);
  };

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartCtx?.addToCart) {
      cartCtx.addToCart(item, 1, item.metal || '14K Yellow Gold', 'US 6.5');
    }
    showToast(`"${item.name}" added to your shopping bag!`);
  };

  return (
    <PageWrapper>
      <TitleHeader>
        <h1>MY WISHLIST</h1>
        <p>Your curated collection of AethelCarats fine jewellery & rare diamonds.</p>
      </TitleHeader>

      {items.length === 0 ? (
        <EmptyStateContainer>
          <div className="icon-wrapper">
            <Heart size={36} color="#C9A96E" />
          </div>
          <h2>YOUR WISHLIST IS EMPTY</h2>
          <p>Save your favorite pieces here so you can easily find them later.</p>

          <CategoryButtonsGrid>
            <CategoryBtn to="/rings?category=engagement">
              ENGAGEMENT RINGS <ArrowRight size={14} />
            </CategoryBtn>
            <CategoryBtn to="/rings?category=wedding">
              WEDDING RINGS <ArrowRight size={14} />
            </CategoryBtn>
            <CategoryBtn to="/rings">
              FINE JEWELRY <ArrowRight size={14} />
            </CategoryBtn>
            <CategoryBtn to="/diamonds?type=NATURAL">
              DIAMONDS <ArrowRight size={14} />
            </CategoryBtn>
            <CategoryBtn to="/diamonds?type=LAB_GROWN">
              LAB-GROWN DIAMONDS <ArrowRight size={14} />
            </CategoryBtn>
          </CategoryButtonsGrid>
        </EmptyStateContainer>
      ) : (
        <WishlistGrid>
          {items.map((item: any, idx: number) => {
            const productSlug = item.slug || item.id;
            return (
              <RevealContainer key={item.id} staggerIndex={idx} yOffset={25}>
                <WishlistCard>
                  <Link to={`/product/${productSlug}`} className="img-box-link" title={`View ${item.name} details`}>
                    <img
                      src={item.primaryImage || item.mainImage || (item.images && item.images[0] ? item.images[0].url : '/assets/gem_rings_cat.png')}
                      alt={item.name}
                    />
                  </Link>
                  <Link to={`/product/${productSlug}`} className="name-link">
                    {item.name}
                  </Link>
                  <div className="price">${(item.price || 0).toLocaleString()}</div>
                  <div className="btn-row">
                    <ActionBtn onClick={(e) => handleAddToCart(e, item)}>ADD TO BAG</ActionBtn>
                    <RemoveBtn onClick={() => handleRemove(item.id)} title="Remove from wishlist" aria-label="Remove item">
                      <Trash2 size={18} />
                    </RemoveBtn>
                  </div>
                </WishlistCard>
              </RevealContainer>
            );
          })}
        </WishlistGrid>
      )}
    </PageWrapper>
  );
};
