import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Star, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, X, Sparkles, Package, ShieldCheck, Truck } from 'lucide-react';
import { ProductCard } from '../ui/ProductCard';
import { api } from '../../services/api';
import { RevealContainer } from '../ui/RevealContainer';

const THEME = {
  bg: '#0B0B0B',
  white: '#151515',
  primaryText: '#F5F1E8',
  secondaryText: '#A8A8A8',
  gold: '#C9A96E',
  darkGold: '#8C744B',
  lightGold: '#DFCA9B',
  border: 'rgba(140, 116, 75, 0.25)',
};

// ----------------------------------------------------
// SECTION 1: SIGNATURE EXPERIENCE & PACKAGING BANNER
// ----------------------------------------------------
const BannerWrapper = styled.section`
  width: 100%;
  max-width: 100%;
  background-color: #0B0B0B;
  border-top: 1px solid ${THEME.border};
  border-bottom: 1px solid ${THEME.border};
  padding: 64px 48px;
  margin-top: 64px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 32px 16px;
    margin-top: 40px;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const PackagingImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(28, 28, 28, 0.08);
  border: 1px solid ${THEME.border};
  background-color: ${THEME.white};
  align-self: start;

  img {
    width: 100%;
    height: auto;
    max-height: 480px;
    object-fit: cover;
    display: block;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: ${THEME.primaryText};
    line-height: 1.25;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
  }

  p {
    font-size: 0.95rem;
    color: ${THEME.secondaryText};
    line-height: 1.7;
    margin-bottom: 32px;
  }
`;

const PackagingAccordionList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${THEME.border};
`;

const PackagingAccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid ${THEME.border};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${THEME.primaryText};
  transition: color 0.2s ease;

  &:hover {
    color: ${THEME.gold};
  }
`;

const PackagingAccordionBody = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: ${THEME.secondaryText};
  line-height: 1.6;
`;

export const AtelierExperienceBanner: React.FC<{ content?: any }> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (content && (content.showPackagingSection === false)) {
    return null;
  }

  const cleanText = (str: string) => {
    if (!str) return '';
    return str
      .replace(/FedEx\s+Priority\s+Air/gi, 'Priority Air')
      .replace(/FedEx\s+locations/gi, 'express courier locations')
      .replace(/FedEx/gi, 'Priority Air')
      .replace(/We\s+also\s+offer\s+a\s+30-day\s+return\s+policy,\s+subject\s+to\s+our\s+return\s+terms\s+and\s+conditions\./gi, '')
      .replace(/30-day\s+return\s+policy\./gi, '')
      .trim();
  };

  let accordions = [
    {
      title: 'Discreet Packaging',
      content: 'Every order is shipped in plain, unbranded outer security boxes. There is no mention of AethelCarats or diamond jewelry on the package exterior for 100% privacy and security.',
    },
    {
      title: 'Secure and Convenient Pickup Option',
      content: 'Hold your order for pick up at thousands of secure express courier locations or choose insured signature delivery directly to your doorstep.',
    },
    {
      title: 'SHIPPING & DELIVERY',
      content: 'After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery.',
    },
  ];

  if (content && content.packagingItemsJson) {
    try {
      const parsed = typeof content.packagingItemsJson === 'string' ? JSON.parse(content.packagingItemsJson) : content.packagingItemsJson;
      if (Array.isArray(parsed) && parsed.length > 0) {
        accordions = parsed
          .filter((item: any) => item.isActive !== false)
          .map((item: any) => ({
            title: item.title,
            content: cleanText(item.description || item.content),
          }));
      }
    } catch (e) {}
  }

  const heading = content?.packagingHeading || "We're committed to making your entire experience a pleasant one, from shopping to shipping.";
  const mainDesc = content?.packagingDescription || "Every item we send comes in our signature AethelCarats packaging. Engagement rings arrive in a deluxe velvet ring box within an elegant presentation box ready for your proposal. The presentation box also secures your appraisal certificate and GIA/IGI diamond grading report. Loose diamonds are presented in a velvet lined diamond case that securely holds the stone.";
  const bgImg = "/assets/gem_ring_box.png";

  return (
    <RevealContainer yOffset={35}>
      <BannerWrapper>
        <BannerContainer>
          <PackagingImageCard>
            <img src={bgImg} alt="AethelCarats Signature Packaging" />
          </PackagingImageCard>

          <BannerContent>
            <h2>{heading}</h2>
            <p>{mainDesc}</p>

            <PackagingAccordionList>
              {accordions.map((acc, idx) => (
                <React.Fragment key={idx}>
                  <PackagingAccordionHeader onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                    <span>{acc.title}</span>
                    <span style={{ fontSize: '1.2rem', color: THEME.gold }}>{openIndex === idx ? '−' : '+'}</span>
                  </PackagingAccordionHeader>
                  <PackagingAccordionBody $isOpen={openIndex === idx}>
                    {acc.content}
                  </PackagingAccordionBody>
                </React.Fragment>
              ))}
            </PackagingAccordionList>
          </BannerContent>
        </BannerContainer>
      </BannerWrapper>
    </RevealContainer>
  );
};


// ----------------------------------------------------
// SECTION 2: ITEM REVIEWS SECTION (Matching Screenshot 1)
// ----------------------------------------------------
const ReviewsWrapper = styled.section`
  max-width: 1280px;
  margin: 80px auto 0;
  padding: 0 24px;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`;

const ReviewsTitle = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: ${THEME.primaryText};
  margin-bottom: 40px;
`;

const ScoreSummaryBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 40px;
  background-color: ${THEME.white};
  border: 1px solid ${THEME.border};
  border-radius: 4px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 24px 20px;
  }
`;

const ScoreLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .score-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    font-weight: 700;
    color: ${THEME.primaryText};
    line-height: 1;
  }

  .stars-col {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .stars-row {
      display: flex;
      gap: 4px;
      color: ${THEME.gold};
    }

    .rev-count {
      font-size: 0.85rem;
      color: ${THEME.secondaryText};
    }
  }
`;

const WriteReviewBtn = styled.button`
  padding: 14px 28px;
  background-color: ${THEME.gold};
  color: #0B0B0B;
  border: 1px solid ${THEME.gold};
  border-radius: 24px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${THEME.lightGold};
    border-color: ${THEME.lightGold};
    color: #0B0B0B;
  }
`;

const FiltersBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid ${THEME.border};
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
`;

const FilterPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${THEME.white};
  border: 1px solid ${THEME.border};
  border-radius: 20px;
  font-size: 0.82rem;
  color: ${THEME.primaryText};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${THEME.gold};
  }

  select {
    border: none;
    background: transparent;
    font-size: 0.82rem;
    color: ${THEME.primaryText};
    outline: none;
    cursor: pointer;
  }
`;

const ReviewCard = styled.div`
  display: flex;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid ${THEME.border};

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const UserAvatarCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  width: 140px;
  flex-shrink: 0;

  .avatar-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #1F1F1F;
    color: ${THEME.gold};
    border: 1px solid ${THEME.border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .user-name {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${THEME.primaryText};
  }

  .verified-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    color: ${THEME.darkGold};
    font-weight: 600;
  }
`;

const ReviewContentCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .rating-and-title {
      display: flex;
      align-items: center;
      gap: 12px;

      .stars {
        display: flex;
        gap: 2px;
        color: ${THEME.gold};
      }

      .title {
        font-size: 1.05rem;
        font-weight: 700;
        color: ${THEME.primaryText};
      }
    }

    .date {
      font-size: 0.8rem;
      color: ${THEME.secondaryText};
    }
  }

  .body-text {
    font-size: 0.92rem;
    color: ${THEME.secondaryText};
    line-height: 1.6;
    margin-bottom: 14px;
  }

  .product-reviewed {
    font-size: 0.78rem;
    color: ${THEME.secondaryText};
    margin-bottom: 16px;
    font-style: italic;
  }

  .atelier-response {
    background-color: ${THEME.white};
    border-left: 3px solid ${THEME.gold};
    padding: 14px 18px;
    border-radius: 0 4px 4px 0;
    margin-top: 8px;

    .resp-title {
      font-size: 0.82rem;
      font-weight: 700;
      color: ${THEME.primaryText};
      margin-bottom: 4px;
    }

    .resp-body {
      font-size: 0.85rem;
      color: ${THEME.secondaryText};
      line-height: 1.5;
    }
  }
`;

const ReviewModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ReviewModalCard = styled.div`
  background: ${THEME.white};
  border: 1px solid ${THEME.border};
  border-radius: 6px;
  width: 100%;
  max-width: 520px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: ${THEME.primaryText};
    margin-bottom: 8px;
  }

  p {
    font-size: 0.85rem;
    color: ${THEME.secondaryText};
    margin-bottom: 24px;
  }
`;

export const ItemReviewsSection: React.FC<{ productName?: string; content?: any; productId?: string; reviews?: any[] }> = ({
  productName = 'AethelCarats Creation',
  content,
  productId,
  reviews: initialReviews,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');

  if (content && (content.reviewsEnabled === false || content.showReviews === false)) {
    return null;
  }

  const [reviewsList, setReviewsList] = useState<any[]>(() => {
    if (initialReviews && Array.isArray(initialReviews) && initialReviews.length > 0) {
      return initialReviews.map((r: any, idx: number) => ({
        id: r.id || `rev_${idx}`,
        name: r.author || r.name || r.authorName || 'Verified Buyer',
        verified: true,
        rating: Number(r.rating) || 5,
        title: r.title || (r.comment ? r.comment.split('\n')[0] : 'Exceeded Every Expectation!'),
        date: r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-US') : '18/08/2026'),
        text: r.text || r.comment || r.content || '',
        productReviewed: r.productReviewed || productName,
        response: r.response || null,
      }));
    }
    return [];
  });

  useEffect(() => {
    let isMounted = true;
    if (initialReviews && Array.isArray(initialReviews) && initialReviews.length > 0) {
      setReviewsList(
        initialReviews.map((r: any, idx: number) => ({
          id: r.id || `rev_${idx}`,
          name: r.author || r.name || r.authorName || 'Verified Buyer',
          verified: true,
          rating: Number(r.rating) || 5,
          title: r.title || (r.comment ? r.comment.split('\n')[0] : 'Exceeded Every Expectation!'),
          date: r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-US') : '18/08/2026'),
          text: r.text || r.comment || r.content || '',
          productReviewed: r.productReviewed || productName,
          response: r.response || null,
        }))
      );
    } else {
      api.get('/reviews' + (productId ? `?productId=${productId}` : ''))
        .then((res: any) => {
          if (!isMounted) return;
          const fetched = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
          if (fetched.length > 0) {
            setReviewsList(
              fetched.map((r: any, idx: number) => ({
                id: r.id || `rev_${idx}`,
                name: r.author || r.name || r.authorName || 'Verified Buyer',
                verified: true,
                rating: Number(r.rating) || 5,
                title: r.title || (r.comment ? r.comment.split('\n')[0] : 'Exceeded Every Expectation!'),
                date: r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-US') : '18/08/2026'),
                text: r.text || r.comment || r.content || '',
                productReviewed: r.productReviewed || productName,
                response: r.response || null,
              }))
            );
          }
        })
        .catch(console.error);
    }
    return () => { isMounted = false; };
  }, [productId, initialReviews, productName]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewTitle || !reviewBody) {
      alert('Please fill in all required fields.');
      return;
    }

    const newRev = {
      id: `rev_${Date.now()}`,
      name: reviewerName,
      verified: true,
      rating: newRating,
      title: reviewTitle,
      date: new Date().toLocaleDateString('en-US'),
      text: reviewBody,
      productReviewed: productName,
      response: 'Thank you for sharing your experience with AethelCarats!',
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowModal(false);
    setReviewerName('');
    setReviewTitle('');
    setReviewBody('');
    alert('Thank you! Your review has been submitted successfully.');
  };

  const sectionTitle = content?.reviewsTitle || 'Item Reviews';
  const showVerified = content?.reviewsVerifiedBadge ?? true;
  const allowSubmission = content?.reviewsSubmissionEnabled ?? true;

  const avgRatingNum = reviewsList.length > 0
    ? (reviewsList.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / reviewsList.length).toFixed(1)
    : '5.0';

  return (
    <ReviewsWrapper>
      <ReviewsTitle>{sectionTitle}</ReviewsTitle>

      <ScoreSummaryBox>
        <ScoreLeft>
          <div className="score-num">{avgRatingNum}</div>
          <div className="stars-col">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.round(Number(avgRatingNum)) ? THEME.gold : 'none'} color={THEME.gold} />
              ))}
            </div>
            <div className="rev-count">{reviewsList.length} Verified {reviewsList.length === 1 ? 'Review' : 'Reviews'}</div>
          </div>
        </ScoreLeft>

        {allowSubmission && (
          <WriteReviewBtn onClick={() => setShowModal(true)}>Write A Review</WriteReviewBtn>
        )}
      </ScoreSummaryBox>

      <FiltersBar>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <FilterPill>
            <input type="checkbox" id="withMedia" defaultChecked style={{ accentColor: THEME.gold }} />
            <label htmlFor="withMedia">With media</label>
          </FilterPill>
          <FilterPill>
            <select defaultValue="all">
              <option value="all">Recommendation (All)</option>
              <option value="yes">Recommends Product</option>
            </select>
          </FilterPill>
          <FilterPill>
            <select defaultValue="exceeds">
              <option value="exceeds">Expectations (Exceeds)</option>
              <option value="met">Met Expectations</option>
            </select>
          </FilterPill>
        </div>

        <FilterPill>
          <span>Sort by:</span>
          <select defaultValue="relevant">
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest first</option>
            <option value="highest">Highest rated</option>
          </select>
        </FilterPill>
      </FiltersBar>

      <div>
        {reviewsList.map((rev) => (
          <ReviewCard key={rev.id}>
            <UserAvatarCol>
              <div className="avatar-circle">{rev.name.charAt(0)}</div>
              <div className="user-name">{rev.name}</div>
              {rev.verified && (
                <div className="verified-badge">
                  <CheckCircle size={12} color={THEME.darkGold} /> Verified Buyer
                </div>
              )}
            </UserAvatarCol>

            <ReviewContentCol>
              <div className="review-header">
                <div className="rating-and-title">
                  <div className="stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill={THEME.gold} color={THEME.gold} />
                    ))}
                  </div>
                  <div className="title">{rev.title}</div>
                </div>
                <div className="date">{rev.date}</div>
              </div>

              <div className="body-text">{rev.text}</div>
              <div className="product-reviewed">Product reviewed: {rev.productReviewed}</div>

              {rev.response && (
                <div className="atelier-response">
                  <div className="resp-title">AethelCarats Atelier Team</div>
                  <div className="resp-body">{rev.response}</div>
                </div>
              )}
            </ReviewContentCol>
          </ReviewCard>
        ))}
      </div>

      {showModal && (
        <ReviewModalOverlay onClick={() => setShowModal(false)}>
          <ReviewModalCard onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3>Write a Review</h3>
              <X size={20} style={{ cursor: 'pointer', color: THEME.secondaryText }} onClick={() => setShowModal(false)} />
            </div>
            <p>Share your authentic experience with {productName}.</p>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: THEME.primaryText, display: 'block', marginBottom: 6 }}>Rating</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      style={{ cursor: 'pointer' }}
                      fill={star <= newRating ? THEME.gold : 'none'}
                      color={THEME.gold}
                      onClick={() => setNewRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: THEME.primaryText, display: 'block', marginBottom: 6 }}>Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Patty G."
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${THEME.border}`, borderRadius: 4, outline: 'none', fontSize: '0.88rem', background: '#0B0B0B', color: '#F5F1E8' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: THEME.primaryText, display: 'block', marginBottom: 6 }}>Headline / Title</label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Perfect description & exquisite craftsmanship"
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${THEME.border}`, borderRadius: 4, outline: 'none', fontSize: '0.88rem', background: '#0B0B0B', color: '#F5F1E8' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: THEME.primaryText, display: 'block', marginBottom: 6 }}>Review Details</label>
                <textarea
                  required
                  rows={4}
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  placeholder="Write your review here..."
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${THEME.border}`, borderRadius: 4, outline: 'none', fontSize: '0.88rem', fontFamily: 'inherit', background: '#0B0B0B', color: '#F5F1E8' }}
                />
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: 14, backgroundColor: THEME.gold, color: '#0B0B0B', border: 'none', borderRadius: 4, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Submit Verified Review
              </button>
            </form>
          </ReviewModalCard>
        </ReviewModalOverlay>
      )}
    </ReviewsWrapper>
  );
};

// ----------------------------------------------------
// SECTION 3: SIMILAR ITEMS SECTION (Matching Screenshot 2)
// ----------------------------------------------------
// ----------------------------------------------------
// CAROUSEL SLIDER STYLING (Matching Screenshot 4)
// ----------------------------------------------------
const CarouselTrackContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CarouselScrollRow = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  touch-action: pan-x pan-y;
  padding: 12px 4px 28px 4px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  > a, > div, > * {
    flex: 0 0 calc(25% - 18px);
    width: calc(25% - 18px);
    min-width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;

    @media (max-width: 1200px) {
      flex: 0 0 280px;
      min-width: 260px;
    }

    @media (max-width: 768px) {
      flex: 0 0 240px;
      min-width: 220px;
    }
  }
`;

const CarouselNavButton = styled.button<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 40%;
  ${({ $direction }) => ($direction === 'left' ? 'left: -18px;' : 'right: -18px;')}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #151515;
  border: 1px solid ${THEME.border};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  color: ${THEME.primaryText};

  &:hover {
    background: ${THEME.primaryText};
    color: #ffffff;
    border-color: ${THEME.primaryText};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    ${({ $direction }) => ($direction === 'left' ? 'left: -8px;' : 'right: -8px;')}
  }
`;

// ----------------------------------------------------
// SECTION 3: SIMILAR ITEMS SECTION
// ----------------------------------------------------
const SimilarWrapper = styled.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`;

const SimilarHeader = styled.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${THEME.primaryText};
  margin-bottom: 28px;
`;

const DEMO_FALLBACK_PRODUCTS = [
  {
    id: 'demo_sim_1',
    name: 'Classic Four Prong Solitaire Engagement Ring in 14K Yellow Gold',
    title: 'Classic Four Prong Solitaire Engagement Ring in 14K Yellow Gold',
    slug: 'aura-signature-solitaire-ring',
    mainImage: '/assets/gem_rings_cat.png',
    secondaryImage: '/assets/gem_rings_cat_2.png',
    price: 870,
    basePrice: 870,
    metal: '14K Yellow Gold',
    category: 'Rings',
  },
  {
    id: 'demo_sim_2',
    name: 'Petite Micropavé Hidden Halo Engagement Ring in 14K White Gold',
    title: 'Petite Micropavé Hidden Halo Engagement Ring in 14K White Gold',
    slug: 'aura-signature-solitaire-ring',
    mainImage: '/assets/gem_rings_cat_2.png',
    secondaryImage: '/assets/gem_rings_cat.png',
    price: 1645,
    basePrice: 1645,
    metal: '14K White Gold',
    category: 'Rings',
  },
  {
    id: 'demo_sim_3',
    name: 'Chain-Set Initial N Necklace With Lab-Grown Diamonds In 14K White Gold',
    title: 'Chain-Set Initial N Necklace With Lab-Grown Diamonds In 14K White Gold',
    slug: 'aura-signature-solitaire-ring',
    mainImage: '/assets/gem_rings_cat.png',
    secondaryImage: '/assets/gem_rings_cat_2.png',
    price: 1140,
    basePrice: 1140,
    metal: '14K White Gold',
    category: 'Necklaces',
  },
  {
    id: 'demo_sim_4',
    name: '7" Four Prong Diamond Tennis Bracelet In 14K White Gold',
    title: '7" Four Prong Diamond Tennis Bracelet In 14K White Gold',
    slug: 'aura-signature-solitaire-ring',
    mainImage: '/assets/gem_rings_cat_2.png',
    secondaryImage: '/assets/gem_rings_cat.png',
    price: 3730,
    basePrice: 3730,
    metal: '14K White Gold',
    category: 'Bracelets',
  },
];

export const SimilarItemsSection: React.FC<{ items?: any[]; currentProductId?: string; content?: any }> = ({ items = [], currentProductId, content }) => {
  const [displayItems, setDisplayItems] = useState<any[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (content && (content.similarItemsEnabled === false || content.showSimilarItems === false)) {
    return null;
  }

  const sectionTitle = content?.similarItemsTitle || 'Similar Items';

  useEffect(() => {
    let list = Array.isArray(items) ? items.filter((p: any) => p && p.id !== currentProductId) : [];

    api.getProducts({ limit: 16, status: 'ACTIVE' })
      .then((res: any) => {
        const prods = Array.isArray(res) ? res : res?.products || [];
        const filtered = prods.filter((p: any) => p && p.id !== currentProductId);
        const combined = Array.from(new Set([...list, ...filtered]));

        if (combined.length > 0) {
          setDisplayItems(combined);
        } else {
          setDisplayItems(DEMO_FALLBACK_PRODUCTS);
        }
      })
      .catch(() => {
        setDisplayItems(list.length > 0 ? list : DEMO_FALLBACK_PRODUCTS);
      });
  }, [items, currentProductId]);

  const cardsToRender = displayItems.length > 0 ? displayItems : DEMO_FALLBACK_PRODUCTS;

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = dir === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <SimilarWrapper>
      <SimilarHeader>{sectionTitle}</SimilarHeader>
      <CarouselTrackContainer>
        {cardsToRender.length > 3 && (
          <CarouselNavButton $direction="left" onClick={() => handleScroll('left')}>
            <ChevronLeft size={22} />
          </CarouselNavButton>
        )}
        <CarouselScrollRow ref={scrollRef}>
          {cardsToRender.map((product, idx) => (
            <ProductCard key={product.id || `sim_${idx}`} product={product} />
          ))}
        </CarouselScrollRow>
        {cardsToRender.length > 3 && (
          <CarouselNavButton $direction="right" onClick={() => handleScroll('right')}>
            <ChevronRight size={22} />
          </CarouselNavButton>
        )}
      </CarouselTrackContainer>
    </SimilarWrapper>
  );
};


// ----------------------------------------------------
// SECTION 4: RECENTLY VIEWED SECTION
// ----------------------------------------------------
const RecentlyWrapper = styled.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px 48px;
  }
`;

const RecentlyHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;

  h2 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 600;
    color: ${THEME.primaryText};
    margin: 0;
  }

  .see-all {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${THEME.primaryText};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    &:hover {
      color: ${THEME.gold};
    }
  }
`;

export const RecentlyViewedSection: React.FC<{ currentProductId?: string; content?: any }> = ({ currentProductId, content }) => {
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (content && (content.recentlyViewedEnabled === false || content.showRecentlyViewed === false)) {
    return null;
  }

  const sectionTitle = content?.recentlyViewedTitle || 'Recently Viewed';

  useEffect(() => {
    let stored: any[] = [];
    try {
      const raw = localStorage.getItem('app_recently_viewed');
      if (raw) stored = JSON.parse(raw);
    } catch (e) {}

    const seenKeys = new Set<string>();
    const getKeys = (p: any) => {
      const keys: string[] = [];
      if (p.id) keys.push(`id:${p.id}`);
      if (p.slug) keys.push(`slug:${p.slug}`);
      const titleName = (p.title || p.name || '').trim().toLowerCase();
      if (titleName) keys.push(`name:${titleName}`);
      return keys;
    };

    if (currentProductId) {
      seenKeys.add(`id:${currentProductId}`);
    }

    const uniqueStored: any[] = [];
    for (const item of stored) {
      if (!item) continue;
      const keys = getKeys(item);
      const isDup = keys.some((k) => seenKeys.has(k));
      if (!isDup) {
        uniqueStored.push(item);
        keys.forEach((k) => seenKeys.add(k));
      }
    }

    api.getProducts({ limit: 16, status: 'ACTIVE' })
      .then((res: any) => {
        const catalogProds = Array.isArray(res) ? res : res?.products || [];
        const combined: any[] = [...uniqueStored];

        for (const item of catalogProds) {
          if (!item) continue;
          const keys = getKeys(item);
          const isDup = keys.some((k) => seenKeys.has(k));
          if (!isDup) {
            combined.push(item);
            keys.forEach((k) => seenKeys.add(k));
          }
        }

        setRecentProducts(combined.length > 0 ? combined : DEMO_FALLBACK_PRODUCTS);
      })
      .catch(() => {
        setRecentProducts(uniqueStored.length > 0 ? uniqueStored : DEMO_FALLBACK_PRODUCTS);
      });
  }, [currentProductId]);

  const rawCards = recentProducts.length > 0 ? recentProducts : DEMO_FALLBACK_PRODUCTS;

  // Final rendering deduplication guard
  const renderSeen = new Set<string>();
  const cardsToRender = rawCards.filter((product) => {
    if (!product) return false;
    const idKey = product.id ? `id:${product.id}` : null;
    const slugKey = product.slug ? `slug:${product.slug}` : null;
    const nameStr = (product.title || product.name || '').trim().toLowerCase();
    const nameKey = nameStr ? `name:${nameStr}` : null;

    if (idKey && renderSeen.has(idKey)) return false;
    if (slugKey && renderSeen.has(slugKey)) return false;
    if (nameKey && renderSeen.has(nameKey)) return false;

    if (idKey) renderSeen.add(idKey);
    if (slugKey) renderSeen.add(slugKey);
    if (nameKey) renderSeen.add(nameKey);
    return true;
  });

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = dir === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <RevealContainer yOffset={35}>
      <RecentlyWrapper>
        <RecentlyHeaderRow>
          <h2>{sectionTitle}</h2>
          <a href="/rings" className="see-all">See All ›</a>
        </RecentlyHeaderRow>

        <CarouselTrackContainer>
          {cardsToRender.length > 3 && (
            <CarouselNavButton $direction="left" onClick={() => handleScroll('left')}>
              <ChevronLeft size={22} />
            </CarouselNavButton>
          )}
          <CarouselScrollRow ref={scrollRef}>
            {cardsToRender.map((product, idx) => (
              <RevealContainer key={product.id || `rec_${idx}`} staggerIndex={idx} yOffset={25} style={{ flexShrink: 0 }}>
                <ProductCard product={product} />
              </RevealContainer>
            ))}
          </CarouselScrollRow>
          {cardsToRender.length > 3 && (
            <CarouselNavButton $direction="right" onClick={() => handleScroll('right')}>
              <ChevronRight size={22} />
            </CarouselNavButton>
          )}
        </CarouselTrackContainer>
      </RecentlyWrapper>
    </RevealContainer>
  );
};
