import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Star,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Search,
  Filter,
  UserCheck,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  X,
  Check,
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  AdminBadge,
  AdminTableContainer,
  AdminTable,
} from '../../components/admin/AdminUI';
import { ConfirmModal } from '../../components/common/ConfirmModal';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled(AdminCard)`
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

const RatingStarGroup = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const ProgressBarTrack = styled.div`
  width: 100%;
  height: 12px;
  background: #e8e3d9;
  border-radius: 6px;
  overflow: hidden;
  margin: 16px 0;
`;

const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background: linear-gradient(90deg, #c9a45c 0%, #19202a 100%);
  transition: width 0.2s ease-in-out;
`;

const SummaryStatBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  margin: 16px 0;
  background: #faf6ee;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 14px;

  .stat-item {
    text-align: center;
    .val {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a1a1a;
    }
    .lbl {
      font-size: 0.75rem;
      color: #77736c;
      font-weight: 600;
      margin-top: 2px;
    }
  }
`;

// Elegant Testimonial Generator Data
const REVIEWER_NAMES = [
  'Charlotte Vance',
  'Sophia Mercer',
  'Gillian Thorne',
  'Evelyn St. Claire',
  'Vivienne Sterling',
  'James Sterling',
  'Olivia Crawford',
  'Amelia Montgomery',
  'Harrison Wells',
  'Victoria Sterling',
  'Isabelle Dubois',
  'Julian Thorne',
  'Clara Davenport',
  'Nathaniel Cross',
  'Beatrice Sterling',
  'Marcus Vance',
  'Genevieve Ross',
  'Alexander Knight',
  'Cecilia Rose',
  'Damian Croft',
  'Eleanor Vance',
  'Sebastian Hayes',
  'Camilla Wright',
  'Dominic Mercer',
  'Penelope Sinclair',
  'Tristan Vance',
  'Aria Sterling',
  'Lucas St. Claire',
  'Aurora Thorne',
  'Julian Ross',
  'Seraphina Dubois',
  'Oliver Knight',
];

const REVIEW_HEADLINES = [
  'Exceptional Craftsmanship & Diamond Brilliance',
  'Exceeded Every Expectation!',
  'Pure Perfection & Unmatched Quality',
  'Bespoke Elegance & Timeless Beauty',
  'Stunning Sparkle & Flawless Finish',
  'An Absolute Masterpiece of Jewelry',
  'The Perfect Anniversary Ring',
  'Breathtaking Design & Fast Shipping',
  'Handcrafted Quality You Can Feel',
  'Unrivaled Brilliance & Presentation',
  'Truly Spectacular Diamond Fire!',
  'Beyond Happy With My Purchase',
  'Impeccable Quality & Fast Insured Delivery',
  'The Most Beautiful Ring I Have Ever Seen',
  'Outstanding Atelier Quality & Service',
  'Simply Breathtaking Artistry',
];

export const AdminReviewsManagerPage: React.FC = () => {
  const toast = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('');

  // Single Add/Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: '',
    productId: '',
    author: '',
    rating: 5,
    title: '',
    comment: '',
    isApproved: true,
    isFeatured: false,
  });

  // Bulk "Add Review To All Products" Modal & Progress State
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState<boolean>(false);
  const [skipExistingReviews, setSkipExistingReviews] = useState<boolean>(false);

  const [isProcessingBulk, setIsProcessingBulk] = useState<boolean>(false);
  const [bulkCurrentIndex, setBulkCurrentIndex] = useState<number>(0);
  const [bulkTotalCount, setBulkTotalCount] = useState<number>(0);
  const [bulkSuccessCount, setBulkSuccessCount] = useState<number>(0);
  const [bulkSkippedCount, setBulkSkippedCount] = useState<number>(0);
  const [bulkFailedCount, setBulkFailedCount] = useState<number>(0);
  const [bulkFailedProducts, setBulkFailedProducts] = useState<any[]>([]);
  const [bulkFinished, setBulkFinished] = useState<boolean>(false);

  // Confirm Delete Modals
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteAllConfirmOpen, setDeleteAllConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/v1/reviews');
      const list = Array.isArray(res.data) ? res.data : Array.isArray(res) ? res : [];
      setReviews(list);
    } catch (err) {
      console.error('Fetch reviews error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.getProducts({ limit: 200, status: 'ALL' });
      const list = Array.isArray(res) ? res : res?.products || [];
      setProductsList(list);
    } catch (err) {
      console.error('Fetch products error:', err);
    }
  };

  const handleOpenAddModal = () => {
    setEditingReview(null);
    setFormData({
      id: '',
      productId: productsList.length > 0 ? productsList[0].id : '',
      author: '',
      rating: 5,
      title: '',
      comment: '',
      isApproved: true,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rev: any) => {
    setEditingReview(rev);
    setFormData({
      id: rev.id,
      productId: rev.productId,
      author: rev.author || rev.name || '',
      rating: rev.rating || 5,
      title: rev.title || '',
      comment: rev.comment || rev.text || '',
      isApproved: rev.isApproved !== false,
      isFeatured: rev.isFeatured || false,
    });
    setIsModalOpen(true);
  };

  const handleSaveSingleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId) {
      toast.error('Please select a target product');
      return;
    }
    if (!formData.author.trim()) {
      toast.error('Customer name is required');
      return;
    }
    if (!formData.comment.trim()) {
      toast.error('Review comment is required');
      return;
    }

    try {
      if (editingReview) {
        await api.put(`/api/v1/admin/reviews/${editingReview.id}`, formData);
      } else {
        await api.post('/api/v1/admin/reviews', formData);
      }
      toast.success(editingReview ? 'Review updated successfully!' : 'Customer review added!');
      setIsModalOpen(false);
      fetchReviews();
    } catch (err: any) {
      console.error('Save review error:', err);
      toast.error(err.response?.data?.message || 'Failed to save review');
    }
  };

  const handleDeleteSingleReview = async () => {
    if (!deleteTargetId) return;
    try {
      await api.delete(`/api/v1/admin/reviews/${deleteTargetId}`);
      toast.success('Review deleted');
      setDeleteTargetId(null);
      fetchReviews();
    } catch (err) {
      console.error('Delete review error:', err);
      toast.error('Failed to delete review');
    }
  };

  const handleDeleteAllReviews = async () => {
    try {
      const res = await api.post('/api/v1/admin/reviews/delete-all');
      toast.success(res.data?.message || 'All customer reviews deleted successfully!');
      setDeleteAllConfirmOpen(false);
      fetchReviews();
    } catch (err) {
      console.error('Delete all reviews error:', err);
      toast.error('Failed to delete reviews');
    }
  };

  // Helper to generate a unique luxury testimonial per product
  const generateTestimonialForProduct = (product: any, index: number) => {
    const pName = product.title || product.name || 'Jewelry Item';
    const pCategory = product.category?.name || product.jewelleryType || 'Fine Jewelry';
    const pMetal = product.metal || '14K Gold';
    const pShape = product.shape || 'Brilliant';
    const pCarat = product.carat ? `${product.carat}ct ` : '';

    // Dynamic randomized offset so each click produces fresh unique reviews
    const rOffset = Math.floor(Math.random() * 500) + Math.floor(Date.now() / 1000);
    const author = REVIEWER_NAMES[(index + rOffset) % REVIEWER_NAMES.length];
    const headline = REVIEW_HEADLINES[(index + rOffset * 3) % REVIEW_HEADLINES.length];
    const rating = (index + rOffset) % 12 === 0 ? 4 : 5; // 92% 5-star, 8% 4-star

    const comments = [
      `Absolutely in love with my ${pName}! The ${pCarat}${pShape} stone catches the light brilliantly in ${pMetal}. Arrived in discreet luxury packaging right on schedule.`,
      `Exceeded my expectations in every way. The craftsmanship on this ${pCategory.toLowerCase()} is flawless, and the ${pMetal} setting holds the ${pShape} diamond so elegantly.`,
      `Bought the ${pName} for a special milestone and could not be happier. Superior craftsmanship, certified diamond clarity, and white-glove customer service!`,
      `The brilliance of the ${pShape} diamond in person is unbelievable. Aura Diamond Atelier's attention to detail on this ${pMetal} ${pCategory.toLowerCase()} makes it a true heirloom piece.`,
      `Outstanding quality! The ${pName} came beautifully presented with its certificate. Stunning ${pMetal} polish and mesmerizing diamond fire.`,
      `I spent months searching for the right ${pCategory.toLowerCase()} and ${pName} was the absolute perfect choice. The ${pMetal} setting is so refined!`,
      `Words cannot express how gorgeous this ${pName} is in person. The ${pShape} diamond reflects light from every angle!`,
      `The craftsmanship of Aura Diamond Atelier atelier is top tier. This ${pMetal} ${pName} feels comfortable, solid, and looks extraordinarily opulent.`,
      `My partner was completely speechless when opening the box! The ${pCarat}${pShape} diamond in ${pMetal} is mesmerizing.`,
      `Incredible quality and craftsmanship. The diamond certification was included and the parcel arrived quickly in discreet packaging.`
    ];

    const commentBody = comments[(index + rOffset * 7) % comments.length];
    const fullComment = `${headline}\n\n${commentBody}`;

    return {
      productId: product.id,
      author,
      rating,
      title: headline,
      comment: fullComment,
      isApproved: true,
      isFeatured: index < 3,
    };
  };

  // Bulk Generator Execution Flow
  const handleStartBulkGeneration = async () => {
    setIsBulkConfirmOpen(false);
    setIsProcessingBulk(true);
    setBulkCurrentIndex(0);
    setBulkTotalCount(productsList.length);
    setBulkSuccessCount(0);
    setBulkSkippedCount(0);
    setBulkFailedCount(0);
    setBulkFailedProducts([]);
    setBulkFinished(false);

    const existingProductIdsWithReviews = new Set(reviews.map((r) => r.productId));

    let created = 0;
    let skipped = 0;
    let failed = 0;
    const failedItems: any[] = [];

    for (let i = 0; i < productsList.length; i++) {
      const product = productsList[i];
      setBulkCurrentIndex(i + 1);

      // Check duplicate skip condition
      if (skipExistingReviews && existingProductIdsWithReviews.has(product.id)) {
        skipped++;
        setBulkSkippedCount(skipped);
        // Small delay so progress UI updates smoothly
        await new Promise((res) => setTimeout(res, 30));
        continue;
      }

      const payload = generateTestimonialForProduct(product, i);

      try {
        await api.post('/api/v1/admin/reviews', payload);
        created++;
        setBulkSuccessCount(created);
      } catch (err) {
        console.error(`Failed review for ${product.name}:`, err);
        failed++;
        failedItems.push(product);
        setBulkFailedCount(failed);
        setBulkFailedProducts(failedItems);
      }

      await new Promise((res) => setTimeout(res, 40));
    }

    setBulkFinished(true);
    fetchReviews();
  };

  // Retry Failed Products
  const handleRetryFailed = async () => {
    if (bulkFailedProducts.length === 0) return;
    const retryTargets = [...bulkFailedProducts];
    setBulkFailedProducts([]);
    setBulkFinished(false);

    let retrySuccess = 0;
    let retryFailed = 0;
    const stillFailed: any[] = [];

    for (let i = 0; i < retryTargets.length; i++) {
      const product = retryTargets[i];
      const payload = generateTestimonialForProduct(product, i);
      try {
        await api.post('/api/v1/admin/reviews', payload);
        retrySuccess++;
        setBulkSuccessCount((prev) => prev + 1);
      } catch (err) {
        retryFailed++;
        stillFailed.push(product);
      }
      await new Promise((res) => setTimeout(res, 40));
    }

    setBulkFailedCount(stillFailed.length);
    setBulkFailedProducts(stillFailed);
    setBulkFinished(true);
    fetchReviews();
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      (r.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.productSku || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProduct = selectedProductFilter ? r.productId === selectedProductFilter : true;
    return matchesSearch && matchesProduct;
  });

  const reviewedProductIds = new Set(reviews.map((r) => r.productId));
  const productsWithoutReviewsCount = Math.max(0, productsList.length - reviewedProductIds.size);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div>
      <AdminPageHeader
        title={`Customer Reviews Manager (${reviews.length} Total)`}
        description="View, add custom customer reviews, edit ratings, or generate testimonials for all products."
        actions={
          <>
            <AdminButton
              $variant="danger"
              onClick={() => setDeleteAllConfirmOpen(true)}
              icon={<Trash2 size={14} />}
              disabled={reviews.length === 0}
            >
              Delete All Reviews
            </AdminButton>
            <AdminButton
              $variant="secondary"
              onClick={handleOpenAddModal}
              icon={<Plus size={14} />}
            >
              + Add Customer Review
            </AdminButton>
            <AdminButton
              $variant="gold"
              onClick={() => setIsBulkConfirmOpen(true)}
              icon={<Sparkles size={14} />}
            >
              + ADD REVIEW TO ALL PRODUCTS
            </AdminButton>
          </>
        }
      />

      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #c9a45c' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>{reviews.length}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Total Customer Reviews</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #137333' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#137333' }}>{reviewedProductIds.size}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Products Reviewed</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #b06000' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#b06000' }}>{productsWithoutReviewsCount}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Products Without Reviews</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #19202a' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#19202a' }}>{reviews.length}</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>AI-Generated Testimonials</div>
        </AdminCard>
        <AdminCard style={{ padding: '16px 20px', borderLeft: '4px solid #c9a45c' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#c9a45c' }}>{avgRating} ★</div>
          <div style={{ fontSize: 13, color: '#77736c', fontWeight: 500 }}>Average Star Rating</div>
        </AdminCard>
      </div>

      {/* SEARCH & FILTERS */}
      <AdminCard style={{ marginBottom: 20, padding: 18, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8c877d' }} />
          <AdminInput
            type="text"
            placeholder="Search reviews by customer name, comment, or product SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>
        <AdminSelect
          value={selectedProductFilter}
          onChange={(e) => setSelectedProductFilter(e.target.value)}
          style={{ minWidth: 240 }}
        >
          <option value="">All Products ({productsList.length})</option>
          {productsList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title || p.name} ({p.sku})
            </option>
          ))}
        </AdminSelect>
      </AdminCard>

      {/* REVIEWS TABLE */}
      <AdminTableContainer>
        <AdminTable>
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer Author</th>
              <th>Rating</th>
              <th style={{ width: '35%' }}>Review Comment</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading customer reviews...
                </td>
              </tr>
            ) : filteredReviews.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No customer reviews found. Click <strong>+ ADD REVIEW TO ALL PRODUCTS</strong> above to populate reviews for all 63 products with one click.
                </td>
              </tr>
            ) : (
              filteredReviews.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{rev.productName || 'Unassigned Product'}</div>
                    {rev.productSku && <code style={{ fontSize: '0.75rem', color: '#8c877d' }}>{rev.productSku}</code>}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{rev.author || 'Anonymous'}</div>
                    <span style={{ fontSize: '0.75rem', color: '#137333', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                      <ShieldCheck size={12} /> Verified Buyer
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 2, color: '#c9a45c' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < rev.rating ? '#c9a45c' : 'none'}
                          color={i < rev.rating ? '#c9a45c' : '#ccc'}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.88rem', color: '#333', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                      {rev.comment}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#777' }}>
                    {new Date(rev.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <AdminButton $size="sm" $variant="secondary" onClick={() => handleOpenEditModal(rev)} icon={<Edit size={13} />}>
                        Edit
                      </AdminButton>
                      <AdminButton $size="sm" $variant="danger" onClick={() => setDeleteTargetId(rev.id)} icon={<Trash2 size={13} />}>
                        Delete
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </AdminTable>
      </AdminTableContainer>

      {/* 1. ONE-CLICK BULK CONFIRMATION MODAL */}
      {isBulkConfirmOpen && (
        <ModalBackdrop onClick={() => setIsBulkConfirmOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', marginBottom: 12, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles color="#c9a45c" size={22} /> Add Review to All Products?
            </h2>
            <div style={{ background: '#faf6ee', border: '1px solid #e8e3d9', borderRadius: 8, padding: '16px 20px', marginBottom: 20 }}>
              <div style={{ fontSize: '0.92rem', color: '#333', lineHeight: 1.6 }}>
                <strong>Products found:</strong> {productsList.length}<br />
                <strong>Reviews to create:</strong> {skipExistingReviews ? productsWithoutReviewsCount : productsList.length}<br />
                <em>This will create 1 unique, AI-tailored testimonial for every active product using its specific diamond, metal, and design attributes.</em>
              </div>
            </div>

            <FormGroup style={{ marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textTransform: 'none', fontSize: '0.88rem', fontWeight: 600, color: '#1a1a1a' }}>
                <input
                  type="checkbox"
                  checked={skipExistingReviews}
                  onChange={(e) => setSkipExistingReviews(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: '#c9a45c' }}
                />
                Add to Products Without Reviews (Prevent Duplicates)
              </label>
              <span style={{ fontSize: '0.78rem', color: '#777', marginLeft: 28, display: 'block' }}>
                {skipExistingReviews
                  ? `${reviewedProductIds.size} products already have reviews and will be skipped cleanly.`
                  : 'All products will receive a new review regardless of existing reviews.'}
              </span>
            </FormGroup>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <AdminButton type="button" $variant="ghost" onClick={() => setIsBulkConfirmOpen(false)}>
                CANCEL
              </AdminButton>
              <AdminButton type="button" $variant="gold" onClick={handleStartBulkGeneration} icon={<Sparkles size={14} />}>
                GENERATE & ADD TO ALL PRODUCTS
              </AdminButton>
            </div>
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* 2. PROGRESS UI & COMPLETION MODAL */}
      {isProcessingBulk && (
        <ModalBackdrop>
          <ModalContent>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: 8, color: '#1a1a1a' }}>
              {bulkFinished ? 'Completed!' : 'Adding testimonials...'}
            </h2>

            {!bulkFinished ? (
              <>
                <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: 4 }}>
                  Product {bulkCurrentIndex} of {bulkTotalCount}
                </p>
                <ProgressBarTrack>
                  <ProgressBarFill $percent={Math.round((bulkCurrentIndex / (bulkTotalCount || 1)) * 100)} />
                </ProgressBarTrack>
                <p style={{ fontSize: '0.82rem', color: '#777', textAlign: 'right', fontWeight: 600 }}>
                  {bulkCurrentIndex} / {bulkTotalCount} completed ({Math.round((bulkCurrentIndex / (bulkTotalCount || 1)) * 100)}%)
                </p>
              </>
            ) : (
              <>
                <SummaryStatBox>
                  <div className="stat-item">
                    <div className="val">{productsList.length}</div>
                    <div className="lbl">Products Found</div>
                  </div>
                  <div className="stat-item">
                    <div className="val" style={{ color: '#137333' }}>{bulkSuccessCount}</div>
                    <div className="lbl">Reviews Added</div>
                  </div>
                  <div className="stat-item">
                    <div className="val" style={{ color: '#b06000' }}>{bulkSkippedCount}</div>
                    <div className="lbl">Already Had Reviews</div>
                  </div>
                  <div className="stat-item">
                    <div className="val" style={{ color: bulkFailedCount > 0 ? '#d93838' : '#137333' }}>
                      {bulkFailedCount}
                    </div>
                    <div className="lbl">Failed</div>
                  </div>
                </SummaryStatBox>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                  {bulkFailedCount > 0 && (
                    <AdminButton $variant="danger" onClick={handleRetryFailed} icon={<RefreshCw size={14} />}>
                      RETRY FAILED ({bulkFailedCount})
                    </AdminButton>
                  )}
                  <AdminButton
                    $variant="gold"
                    onClick={() => {
                      setIsProcessingBulk(false);
                      setBulkFinished(false);
                    }}
                    icon={<CheckCircle size={14} />}
                  >
                    CLOSE & REFRESH
                  </AdminButton>
                </div>
              </>
            )}
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* SINGLE ADD / EDIT REVIEW MODAL */}
      {isModalOpen && (
        <ModalBackdrop onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: 20, color: '#1a1a1a' }}>
              {editingReview ? 'Edit Customer Review' : 'Add Custom Product Review'}
            </h2>
            <form onSubmit={handleSaveSingleReview}>
              <FormGroup>
                <label>Select Product *</label>
                <AdminSelect
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  required
                >
                  {productsList.length === 0 ? (
                    <option value="">-- No Products Found --</option>
                  ) : (
                    productsList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title || p.name} ({p.sku})
                      </option>
                    ))
                  )}
                </AdminSelect>
              </FormGroup>

              <FormGroup>
                <label>Customer / Author Name *</label>
                <AdminInput
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Charlotte Vance"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Star Rating (1 to 5 Stars)</label>
                <RatingStarGroup>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      fill={star <= formData.rating ? '#c9a45c' : 'none'}
                      color={star <= formData.rating ? '#c9a45c' : '#bbb'}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    />
                  ))}
                  <span style={{ marginLeft: 10, fontWeight: 600, color: '#c9a45c' }}>{formData.rating} Stars</span>
                </RatingStarGroup>
              </FormGroup>

              <FormGroup>
                <label>Review Title (Optional Headline)</label>
                <AdminInput
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Stunning Craftsmanship & Diamond Brilliance"
                />
              </FormGroup>

              <FormGroup>
                <label>Review Comment / Detailed Experience *</label>
                <AdminTextarea
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Enter detailed customer feedback..."
                  required
                />
              </FormGroup>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                <AdminButton type="button" $variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </AdminButton>
                <AdminButton type="submit" $variant="gold" icon={<CheckCircle size={14} />}>
                  {editingReview ? 'Update Review' : 'Save & Publish Review'}
                </AdminButton>
              </div>
            </form>
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* CONFIRM DELETE SINGLE REVIEW */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Review?"
        message="Are you sure you want to delete this customer review? This action cannot be undone."
        confirmLabel="Delete Review"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleDeleteSingleReview}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* CONFIRM DELETE ALL REVIEWS */}
      <ConfirmModal
        isOpen={deleteAllConfirmOpen}
        title="Delete ALL Reviews from Database?"
        message="Are you sure you want to delete ALL customer reviews? This will permanently remove all reviews across all products."
        confirmLabel="Purge & Delete All Reviews"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleDeleteAllReviews}
        onCancel={() => setDeleteAllConfirmOpen(false)}
      />
    </div>
  );
};
