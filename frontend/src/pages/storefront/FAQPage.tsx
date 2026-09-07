import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Plus, Minus, ChevronRight, HelpCircle, Phone, Mail } from 'lucide-react';
import { api } from '../../services/api';
import { RevealContainer } from '../../components/ui/RevealContainer';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  // DIAMONDS
  {
    id: 'd1',
    category: 'Diamonds',
    question: 'What types of diamonds does AethelCarats offer?',
    answer: 'AethelCarats offers both premium certified Natural Diamonds and ethically created Lab-Grown Diamonds. Every diamond in our vault is meticulously hand-selected by master gemmologists for exceptional brilliance, clarity, and cut precision.',
  },
  {
    id: 'd2',
    category: 'Diamonds',
    question: 'What is the difference between natural and lab-grown diamonds?',
    answer: 'Chemically, physically, and optically, natural and lab-grown diamonds are 100% identical. Both consist of pure carbon crystallised in a cubic lattice structure. Natural diamonds were formed deep within the earth over billions of years, whereas lab-grown diamonds are grown using advanced technology mimicking geothermal conditions.',
  },
  {
    id: 'd3',
    category: 'Diamonds',
    question: 'What diamond certifications are available?',
    answer: 'All major diamonds at AethelCarats are accompanied by independent gemmological certificates from world-renowned laboratories, including GIA (Gemological Institute of America) and IGI (International Gemological Institute), detailing exact carat, colour, clarity, and cut grades.',
  },
  {
    id: 'd4',
    category: 'Diamonds',
    question: 'Can I request a specific diamond shape or custom cut?',
    answer: 'Yes. Our Diamond Vault features Round Brilliant, Oval, Emerald, Radiant, Princess, Cushion, Pear, Marquise, Asscher, and Heart shapes. If you desire a specific proportion or rare cut, our concierge team can source it directly for you.',
  },

  // JEWELLERY
  {
    id: 'j1',
    category: 'Jewellery',
    question: 'Can I customise a jewellery design?',
    answer: 'Absolutely. Every piece in our collection can be customized with your choice of metal (18K Yellow Gold, 18K White Gold, 18K Rose Gold, or Platinum 950), center diamond shape, size, and accent stones.',
  },
  {
    id: 'j2',
    category: 'Jewellery',
    question: 'Can I request a different metal colour or purity?',
    answer: 'Yes. We work exclusively with solid 14K Gold, 18K Gold, and Platinum 950. We do not use gold plating or vermeil, ensuring your fine jewellery lasts for generations.',
  },
  {
    id: 'j3',
    category: 'Jewellery',
    question: 'Can I order a design based on my own reference photo?',
    answer: 'Yes. You can share your inspiration images, reference sketches, or family heirlooms with our concierge team. We will produce detailed CAD renders and craft a bespoke piece tailored to your vision.',
  },

  // CUSTOM JEWELLERY
  {
    id: 'c1',
    category: 'Custom Jewellery',
    question: 'Can AethelCarats create custom jewellery from scratch?',
    answer: 'Yes. Our Bespoke Atelier specialises in custom engagement rings, wedding bands, high-jewellery necklaces, and bespoke pendants. We partner with you from initial sketch through 3D CAD modeling to hand-finishing.',
  },
  {
    id: 'c2',
    category: 'Custom Jewellery',
    question: 'Do you provide 3D CAD renders before production?',
    answer: 'Yes. Before crafting your piece, we provide photo-realistic 3D CAD digital renders and exact dimensional specifications for your review and approval.',
  },
  {
    id: 'c3',
    category: 'Custom Jewellery',
    question: 'How long does custom jewellery production take?',
    answer: 'Custom bespoke pieces typically require 2 to 3 weeks from CAD approval to hand-crafting, setting, hallmarking, and final quality inspection before shipping.',
  },

  // ORDERS
  {
    id: 'o1',
    category: 'Orders',
    question: 'How do I place an order?',
    answer: 'You can order directly online through our secure checkout, or consult with our Jewellery Concierge to place your order via telephone, email, or WhatsApp.',
  },
  {
    id: 'o2',
    category: 'Orders',
    question: 'Can I enquire or speak with a specialist before ordering?',
    answer: 'We highly encourage it. Click "Inquire on WhatsApp" or "Contact Us" on any product page to connect directly with a diamond specialist who can guide your choice.',
  },
  {
    id: 'o3',
    category: 'Orders',
    question: 'Can I modify or cancel my order after it has been placed?',
    answer: 'Orders can be modified or cancelled within 24 hours of placement before crafting or dispatch commences. Please contact Customer Care immediately if changes are required.',
  },

  // SHIPPING
  {
    id: 's1',
    category: 'Shipping',
    question: 'Where do you ship?',
    answer: 'We provide complimentary fully-insured express shipping worldwide, including the United Kingdom, United States, Europe, Canada, Australia, and the Middle East.',
  },
  {
    id: 's2',
    category: 'Shipping',
    question: 'How is jewellery packaged?',
    answer: 'Every piece is delivered in an unbranded, secure outer box for privacy, containing our signature illuminated luxury leatherette box, protective polishing cloth, certificate holder, and authenticity card.',
  },
  {
    id: 's3',
    category: 'Shipping',
    question: 'Is shipping fully insured?',
    answer: 'Yes. All shipments are 100% transit-insured from our atelier until signed for at your delivery address. A signature is required upon receipt.',
  },

  // RETURNS & REFUNDS
  {
    id: 'r1',
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: 'We offer a complimentary 30-day return policy for standard, ready-to-ship jewellery items in their unworn, original condition with original diamond certificates and packaging intact.',
  },
  {
    id: 'r2',
    category: 'Returns & Refunds',
    question: 'Are custom or engraved items returnable?',
    answer: 'Custom bespoke creations and personalized engraved items are non-refundable due to their unique tailored nature. However, we offer complimentary resizing and adjustments.',
  },
  {
    id: 'r3',
    category: 'Returns & Refunds',
    question: 'When will I receive my refund?',
    answer: 'Once your returned item undergoes gemmological inspection at our atelier (usually 2–3 business days), your refund will be processed back to your original payment method within 5 to 7 business days.',
  },

  // PAYMENTS
  {
    id: 'p1',
    category: 'Payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept major credit/debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, Bank Wire Transfer, and flexible installment options.',
  },

  // CERTIFICATES
  {
    id: 'crt1',
    category: 'Certificates',
    question: 'Do jewellery products include diamond grading certificates?',
    answer: 'Yes. All center diamonds 0.30ct and above include an official grading report from GIA or IGI verifying color, clarity, carat weight, cut, and laser inscription.',
  },

  // CARE & MAINTENANCE
  {
    id: 'cm1',
    category: 'Care & Maintenance',
    question: 'How should I clean and care for my diamond jewellery?',
    answer: 'Clean your piece gently with warm water, mild dish soap, and a soft-bristled toothbrush. Avoid harsh chemicals, perfumes, or swimming pools while wearing fine jewellery.',
  },
];

const PageWrapper = styled.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`;

const BreadcrumbsBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #F5F1E8;
    font-weight: 500;
  }
`;

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 32px;
  text-align: center;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 500;
    color: #F5F1E8;
    margin-bottom: 16px;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p.subtitle {
    font-size: 1.1rem;
    color: #D8D2C5;
    max-width: 680px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }
`;

const SearchContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
  position: relative;

  input {
    width: 100%;
    padding: 16px 20px 16px 48px;
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 30px;
    background: #111111;
    font-size: 0.95rem;
    color: #F5F1E8;
    outline: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #C9A96E;
    }

    &::placeholder {
      color: #777777;
    }
  }

  .search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #C9A96E;
  }
`;

const CategoryPillsRow = styled.div`
  max-width: 1000px;
  margin: 32px auto 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0 24px;
`;

const CategoryPill = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  background: ${({ $active }) => ($active ? '#C9A96E' : '#151515')};
  color: ${({ $active }) => ($active ? '#0B0B0B' : '#D8D2C5')};
  transition: all 0.2s ease;

  &:hover {
    border-color: #C9A96E;
    color: ${({ $active }) => ($active ? '#0B0B0B' : '#C9A96E')};
  }
`;

const FAQList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FAQAccordionCard = styled.div<{ $open: boolean }>`
  background: #151515;
  border: 1px solid ${({ $open }) => ($open ? '#C9A96E' : 'rgba(140, 116, 75, 0.25)')};
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  gap: 16px;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #F5F1E8;
    line-height: 1.4;
  }

  .toggle-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #1F1F1F;
    border: 1px solid rgba(140, 116, 75, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C9A96E;
    flex-shrink: 0;
  }
`;

const AccordionBody = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  .body-inner {
    padding: 0 28px 24px;
    color: #D8D2C5;
    font-size: 0.95rem;
    line-height: 1.7;
    border-top: 1px solid rgba(140, 116, 75, 0.15);
    padding-top: 16px;
  }
`;

const StillHaveQuestions = styled.section`
  max-width: 900px;
  margin: 64px auto 0;
  padding: 0 24px;
`;

const QuestionsCard = styled.div`
  background: #151515;
  color: #F5F1E8;
  padding: 40px;
  border-radius: 6px;
  border: 1px solid rgba(140, 116, 75, 0.3);
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    color: #D8D2C5;
    font-size: 0.95rem;
    max-width: 540px;
    margin: 0 auto 24px;
    line-height: 1.6;
  }

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 4px;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    a.primary-btn {
      background: #C9A96E;
      color: #0B0B0B;
      &:hover {
        background: #DFBA73;
        transform: translateY(-2px);
      }
    }

    a.secondary-btn {
      border: 1px solid rgba(140, 116, 75, 0.4);
      color: #F5F1E8;
      background: #1F1F1F;
      &:hover {
        border-color: #C9A96E;
        color: #C9A96E;
        transform: translateY(-2px);
      }
    }
  }
`;

const CATEGORIES = [
  'All',
  'Diamonds',
  'Jewellery',
  'Custom Jewellery',
  'Orders',
  'Shipping',
  'Returns & Refunds',
  'Payments',
  'Certificates',
  'Care & Maintenance',
];

export const FAQPage: React.FC = () => {
  const [faqsList, setFaqsList] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIds, setOpenIds] = useState<string[]>(['d1', 'j1']);

  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'AethelCarats FAQ | Diamonds, Jewellery, Orders & Shipping';
    
    // Fetch FAQs from DB API
    api.getFaqs().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setFaqsList(data.map((f: any) => ({
          id: f.id,
          category: f.category,
          question: f.question,
          answer: f.answer,
        })));
      }
    }).catch(console.error);

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Find answers to common AethelCarats questions about diamonds, fine jewellery, custom designs, orders, shipping, returns and customer care.');
    }

    // JSON-LD FAQPage Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const faqEntities = faqsList.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    }));

    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://aethelcarats.com/faq#webpage',
          'url': 'https://aethelcarats.com/faq',
          'name': 'AethelCarats Frequently Asked Questions',
          'description': 'Find answers to common questions about diamonds, jewellery, custom orders, shipping and returns.',
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://aethelcarats.com/faq#faqpage',
          'mainEntity': faqEntities,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://aethelcarats.com/faq#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://aethelcarats.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Customer Care', 'item': 'https://aethelcarats.com/faq' },
            { '@type': 'ListItem', 'position': 3, 'name': 'FAQ', 'item': 'https://aethelcarats.com/faq' }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqsList.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Customer Care</span>
        <ChevronRight size={12} />
        <span className="current">FAQ</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <h1>Frequently Asked Questions</h1>
          <p className="subtitle">
            Everything you need to know before choosing your diamond or fine jewellery piece.
          </p>

          <SearchContainer>
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search questions (e.g. Lab-grown diamonds, shipping, custom CAD...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </HeroSection>
      </RevealContainer>

      <RevealContainer yOffset={25}>
        <CategoryPillsRow>
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              $active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </CategoryPill>
          ))}
        </CategoryPillsRow>
      </RevealContainer>

      <FAQList>
        {filteredFaqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#77736c' }}>
            <HelpCircle size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p style={{ fontSize: '1.1rem' }}>No questions match your search query.</p>
            <p style={{ fontSize: '0.85rem', marginTop: 4 }}>Try searching for alternate terms or click "All".</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <RevealContainer key={faq.id} staggerIndex={idx} yOffset={20}>
                <FAQAccordionCard $open={isOpen}>
                <AccordionHeader onClick={() => toggleAccordion(faq.id)}>
                  <h3>{faq.question}</h3>
                  <div className="toggle-icon">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </AccordionHeader>
                <AccordionBody $open={isOpen}>
                  <div className="body-inner">
                    <p>{faq.answer}</p>
                  </div>
                </AccordionBody>
              </FAQAccordionCard>
            </RevealContainer>
          );
        })
      )}
    </FAQList>

    <RevealContainer yOffset={35}>
      <StillHaveQuestions>
        <QuestionsCard>
          <h2>Still Have Questions?</h2>
          <p>
            Our diamond specialists and customer care concierge are available to assist you with any custom questions or guidance.
          </p>
          <div className="btn-group">
            <Link to="/contact-us" className="primary-btn">
              <Mail size={16} /> CONTACT CUSTOMER CARE
            </Link>
            <a href="tel:+91973785306" className="secondary-btn">
              <Phone size={16} /> CALL +91973785306
            </a>
          </div>
        </QuestionsCard>
      </StillHaveQuestions>
    </RevealContainer>
  </PageWrapper>
  );
};
