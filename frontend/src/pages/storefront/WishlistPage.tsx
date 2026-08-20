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
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #f9f7f2;
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
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: #6b6b6b;
  }
`;

const EmptyStateContainer = styled.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 32px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.04);

  .icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-color: #faf5eb;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c9a45c;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
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
  background-color: #ffffff;
  color: #1f1f1f;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #b8944d;
    color: #ffffff;
    border-color: #b8944d;
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
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(31, 31, 31, 0.08);
    transform: translateY(-2px);
  }

  .img-box-link {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background-color: #f9f7f2;
    margin-bottom: 14px;
    border-radius: 4px;
    display: block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  .name-link {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #1f1f1f;
    margin-bottom: 6px;
    line-height: 1.35;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  .price {
    font-size: 1.0rem;
    font-weight: 700;
    color: #c9a45c;
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
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: #1f1f1f;
  color: #ffffff;
  border: 1px solid #1f1f1f;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #b8944d;
    border-color: #b8944d;
  }
`;

const RemoveBtn = styled.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  background: #faf7f2;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  color: #6b6b6b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #d32f2f;
    background: #fff5f5;
    border-color: #d32f2f;
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
        <p>Your curated collection of Floksy Jewel fine jewellery & loose diamonds.</p>
      </TitleHeader>

      {items.length === 0 ? (
        <EmptyStateContainer>
          <div className="icon-wrapper">
            <Heart size={36} color="#C9A45C" />
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
                      src={item.primaryImage || item.mainImage || (item.images && item.images[0] ? item.images[0].url : '/assets/floksy_rings_cat.png')}
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
