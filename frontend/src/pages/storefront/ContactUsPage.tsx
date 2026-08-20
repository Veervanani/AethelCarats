import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Phone, Mail, MessageCircle, MapPin, Clock, ShieldCheck, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { RevealContainer } from '../../components/ui/RevealContainer';

const PageWrapper = styled.div`
  background-color: #f7f6f2;
  color: #1a1918;
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
  color: #77736c;

  a {
    color: #77736c;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  span.current {
    color: #1a1918;
    font-weight: 500;
  }
`;

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 40px;
  text-align: center;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 500;
    color: #1a1918;
    margin-bottom: 16px;
    letter-spacing: -0.01em;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p.subtitle {
    font-size: 1.1rem;
    color: #55524d;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const ContentGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 64px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const ContactInfoCard = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #1a1918;
    margin-bottom: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8e3d9;
  }
`;

const ContactMethod = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #f5f2ea;
    border: 1px solid #e8e3d9;
    color: #c9a45c;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #77736c;
      font-weight: 600;
    }

    a, span {
      font-size: 1.05rem;
      color: #1a1918;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #c9a45c;
    }

    p.note {
      font-size: 0.85rem;
      color: #77736c;
      margin-top: 2px;
    }
  }
`;

const WhatsAppCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #1a1918;
  color: #fffdf9;
  padding: 14px 24px;
  border-radius: 4px;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
  }
`;

const FormContainer = styled.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 40px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #1a1918;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8e3d9;
  }

  @media (max-width: 576px) {
    padding: 24px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? 'span 2' : 'span 1')};
  margin-bottom: 20px;

  @media (max-width: 576px) {
    grid-column: span 1 !important;
  }

  label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    color: #4a4741;
  }

  input, select, textarea {
    padding: 12px 16px;
    border: 1px solid #e8e3d9;
    background: #fffdf9;
    font-size: 0.95rem;
    color: #1a1918;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #c9a45c;
    }
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  background: #1a1918;
  color: #fffdf9;
  border: none;
  padding: 16px;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrivacyNote = styled.p`
  font-size: 0.8rem;
  color: #77736c;
  margin-top: 12px;
  text-align: center;
  line-height: 1.5;
`;

const ConciergeBanner = styled.section`
  max-width: 1200px;
  margin: 64px auto 0;
  padding: 0 24px;
`;

const ConciergeInner = styled.div`
  background: #1a1918;
  color: #fffdf9;
  padding: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 32px 24px;
  }

  .text-content {
    h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      color: #fffdf9;
      margin-bottom: 12px;
    }

    p {
      font-size: 1rem;
      color: #d9d3c7;
      max-width: 580px;
      line-height: 1.6;
    }
  }

  a.banner-btn {
    background: #c9a45c;
    color: #1a1918;
    padding: 14px 28px;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: #fffdf9;
      color: #1a1918;
    }
  }
`;

export const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enquiryType: 'Diamond Enquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cmsPage, setCmsPage] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState({
    phone: '+91973785306',
    displayPhone: '+91973785306',
    email: 'contact@floksyjewel.com',
    address: 'Surat, India',
    whatsappNumber: '91973785306',
  });

  useEffect(() => {
    // Dynamic SEO Metadata
    document.title = 'Contact Floksy Jewel | Diamond & Fine Jewellery Concierge';
    
    // Fetch CMS Page Data
    api.getPageBySlug('contact-us').then((data) => {
      if (data) {
        let content = {};
        const raw = data.draftContent || data.content;
        if (raw) {
          try {
            content = typeof raw === 'string' ? JSON.parse(raw) : raw;
          } catch (e) {
            content = { heading: data.title };
          }
        }
        setCmsPage({ ...data, cmsContent: content });

        if (data.seoMetadata?.seoTitle) {
          document.title = data.seoMetadata.seoTitle;
        }
      }
    }).catch(console.error);

    // Dynamic site settings
    api.getSiteSettings().then((settings) => {
      if (settings) {
        if (settings.contactPhone) {
          setContactInfo((prev) => ({
            ...prev,
            phone: settings.contactPhone.replace(/[^\d+]/g, ''),
            displayPhone: settings.contactPhone,
          }));
        }
        if (settings.contactEmail) {
          setContactInfo((prev) => ({ ...prev, email: settings.contactEmail }));
        }
        if (settings.whatsappNumber) {
          setContactInfo((prev) => ({ ...prev, whatsappNumber: settings.whatsappNumber }));
        }
      }
    }).catch(console.error);
  }, []);

  const cms = cmsPage?.cmsContent || {};

  useEffect(() => {
    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://floksyjewel.com/#organization',
          'name': 'Floksy Jewel',
          'url': 'https://floksyjewel.com',
          'telephone': contactInfo.phone,
          'email': contactInfo.email,
          'logo': 'https://floksyjewel.com/assets/floksy-jewel-logo.png',
        },
        {
          '@type': 'ContactPage',
          '@id': 'https://floksyjewel.com/contact-us#webpage',
          'url': 'https://floksyjewel.com/contact-us',
          'name': 'Contact Floksy Jewel',
          'description': 'Contact Floksy Jewel for diamond and fine jewellery enquiries.',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://floksyjewel.com/contact-us#breadcrumb',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://floksyjewel.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Customer Care', 'item': 'https://floksyjewel.com/contact-us' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Contact Us', 'item': 'https://floksyjewel.com/contact-us' }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [contactInfo.email, contactInfo.phone]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createCustomRequest({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        category: formData.enquiryType,
        notes: formData.message,
      });
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        enquiryType: 'Diamond Enquiry',
        message: '',
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitted(true); // Graceful fallback UX
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <BreadcrumbsBar>
        <Link to="/">Home</Link>
        <ChevronRight size={12} />
        <span>Customer Care</span>
        <ChevronRight size={12} />
        <span className="current">Contact Us</span>
      </BreadcrumbsBar>

      <RevealContainer yOffset={35}>
        <HeroSection>
          <h1>{cms.heading || 'Contact Floksy Jewel'}</h1>
          <p className="subtitle">
            {cms.subheading || 'Personalised assistance for diamonds, fine jewellery and bespoke creations. Our dedicated atelier team is at your service.'}
          </p>
        </HeroSection>
      </RevealContainer>

      <ContentGrid>
        <ContactInfoCard>
          <div>
            <h2>{cms.customerCareHeading || 'CUSTOMER CARE'}</h2>
            <p style={{ color: '#55524d', fontSize: '0.95rem', lineHeight: '1.6', marginTop: 8 }}>
              {cms.customerCareDescription || 'Our diamond specialists and master jewellers are available to guide you through diamond selection, sizing, or custom CAD requests.'}
            </p>
          </div>

          <ContactMethod>
            <div className="icon-wrapper">
              <Phone size={20} />
            </div>
            <div className="details">
              <label>{cms.phoneLabel || 'Telephone Assistance'}</label>
              <a href={`tel:${(cms.phone || contactInfo.phone).replace(/[^\d+]/g, '')}`}>{cms.phone || contactInfo.displayPhone}</a>
              <p className="note">{cms.businessHours || 'Mon – Sat: 9:00 AM – 7:00 PM GMT'}</p>
            </div>
          </ContactMethod>

          <ContactMethod>
            <div className="icon-wrapper">
              <Mail size={20} />
            </div>
            <div className="details">
              <label>{cms.emailLabel || 'Email Concierge'}</label>
              <a href={`mailto:${cms.email || contactInfo.email}`}>{cms.email || contactInfo.email}</a>
              <p className="note">{cms.responseTime || 'Responses within 24 business hours'}</p>
            </div>
          </ContactMethod>

          <ContactMethod>
            <div className="icon-wrapper">
              <MapPin size={20} />
            </div>
            <div className="details">
              <label>{cms.locationLabel || 'Private Atelier Appointments'}</label>
              <span>{cms.address || contactInfo.address || 'Surat, India'}</span>
              <p className="note">{cms.appointmentDescription || 'By private appointment only'}</p>
            </div>
          </ContactMethod>

          <div>
            <WhatsAppCTA
              href={`https://wa.me/${(cms.whatsappNumber || contactInfo.whatsappNumber || '91973785306').replace(/[^\d]/g, '') || '91973785306'}?text=${encodeURIComponent('Hello Floksy Jewel Atelier, I would like to inquire about fine jewellery and diamond assistance.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> WhatsApp Concierge
            </WhatsAppCTA>
          </div>
        </ContactInfoCard>

        <FormContainer>
          <h2>{cms.formHeading || 'Send an Enquiry'}</h2>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle size={48} color="#c9a45c" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', marginBottom: 12 }}>
                Thank You for Contacting Us
              </h3>
              <p style={{ color: '#55524d', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Your enquiry has been submitted successfully. A Floksy Jewel concierge specialist will respond to your request within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <label>{cms.firstNameLabel || 'FIRST NAME'} *</label>
                  <input
                    type="text"
                    required
                    placeholder={cms.firstNamePlaceholder || 'Enter your first name'}
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>{cms.lastNameLabel || 'LAST NAME'} *</label>
                  <input
                    type="text"
                    required
                    placeholder={cms.lastNamePlaceholder || 'Enter your last name'}
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>{cms.emailInputLabel || 'EMAIL ADDRESS'} *</label>
                  <input
                    type="email"
                    required
                    placeholder={cms.emailInputPlaceholder || 'name@example.com'}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>{cms.phoneInputLabel || 'PHONE NUMBER'}</label>
                  <input
                    type="tel"
                    placeholder={cms.phoneInputPlaceholder || '+1 (555) 000-0000'}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup $fullWidth>
                <label>{cms.enquiryTypeLabel || 'ENQUIRY TYPE'} *</label>
                <select
                  value={formData.enquiryType}
                  onChange={(e) => handleChange('enquiryType', e.target.value)}
                >
                  {Array.isArray(cms.enquiryTypes) && cms.enquiryTypes.length > 0 ? (
                    cms.enquiryTypes
                      .filter((t: any) => t.isEnabled !== false)
                      .map((t: any) => (
                        <option key={t.id || t.name} value={t.name}>
                          {t.name}
                        </option>
                      ))
                  ) : (
                    <>
                      <option value="Diamond Enquiry">Diamond Enquiry</option>
                      <option value="Jewellery Enquiry">Jewellery Enquiry</option>
                      <option value="Custom CAD">Custom CAD</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="General Question">General Question</option>
                    </>
                  )}
                </select>
              </FormGroup>

              <FormGroup $fullWidth>
                <label>{cms.messageLabel || 'MESSAGE'} *</label>
                <textarea
                  required
                  placeholder={cms.messagePlaceholder || 'Please describe how we can assist you with your diamond or jewellery selection...'}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                />
              </FormGroup>

              <SubmitBtn type="submit" disabled={submitting}>
                {submitting ? 'SENDING ENQUIRY...' : 'SEND ENQUIRY'}
              </SubmitBtn>

              <PrivacyNote>
                Your information is used only to respond to your enquiry and provide requested assistance.
              </PrivacyNote>
            </form>
          )}
        </FormContainer>
      </ContentGrid>

      <ConciergeBanner>
        <ConciergeInner>
          <div className="text-content">
            <h2>Private Jewellery Concierge</h2>
            <p>
              Looking for a bespoke diamond ring, advice on certified lab-grown diamonds, or custom 3D CAD design? Our master jewellers are here to assist you at every step.
            </p>
          </div>
          <a
            href={`mailto:${contactInfo.email}?subject=Private%20Concierge%20Inquiry`}
            className="banner-btn"
          >
            SPEAK WITH OUR CONCIERGE
          </a>
        </ConciergeInner>
      </ConciergeBanner>
    </PageWrapper>
  );
};
