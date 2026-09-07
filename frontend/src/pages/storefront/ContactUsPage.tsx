import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Phone, Mail, MessageCircle, MapPin, CheckCircle, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { RevealContainer } from '../../components/ui/RevealContainer';

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
    color: #C9A96E;
    font-weight: 600;
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
    color: #F5F1E8;
    margin-bottom: 16px;
    letter-spacing: 0.04em;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p.subtitle {
    font-size: 1.05rem;
    color: #D8D2C5;
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
  gap: 48px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfoCard = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #F5F1E8;
    margin-bottom: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    letter-spacing: 0.08em;
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
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.3);
    color: #C9A96E;
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
      color: #A8A8A8;
      font-weight: 700;
    }

    a, span {
      font-size: 1.05rem;
      color: #F5F1E8;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #C9A96E;
    }

    p.note {
      font-size: 0.85rem;
      color: #A8A8A8;
      margin-top: 2px;
    }
  }
`;

const WhatsAppCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 14px 24px;
  border-radius: 2px;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  margin-top: 8px;

  &:hover {
    background: #C9A96E;
    border-color: #C9A96E;
    color: #0B0B0B;
  }
`;

const FormContainer = styled.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: #F5F1E8;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    letter-spacing: 0.08em;
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
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #F5F1E8;
  }

  input, select, textarea {
    padding: 12px 16px;
    border: 1px solid rgba(140, 116, 75, 0.25);
    background: #111111;
    font-size: 0.95rem;
    color: #F5F1E8;
    border-radius: 2px;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &::placeholder {
      color: #666666;
    }

    &:focus {
      border-color: #C9A96E;
      background: #0B0B0B;
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
    }
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  background: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  padding: 16px;
  font-size: 0.85rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.25s ease;

  &:hover {
    background: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrivacyNote = styled.p`
  font-size: 0.8rem;
  color: #A8A8A8;
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
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 32px 24px;
  }

  .text-content {
    h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      color: #F5F1E8;
      margin-bottom: 12px;
      letter-spacing: 0.08em;
    }

    p {
      font-size: 1rem;
      color: #D8D2C5;
      max-width: 580px;
      line-height: 1.6;
    }
  }

  a.banner-btn {
    background: #C9A96E;
    color: #0B0B0B;
    padding: 14px 28px;
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 2px;
    transition: all 0.25s ease;

    &:hover {
      background: #DFBA73;
      box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
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
    email: 'contact@auroradiamonds.com',
    address: 'Surat, India',
    whatsappNumber: '91973785306',
  });

  useEffect(() => {
    document.title = 'Contact AethelCarats | Diamond & Fine Jewellery Concierge';
    
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
      }
    }).catch(console.error);

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
      setSubmitted(true);
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
          <h1 style={{ color: cms.headingColor || undefined }}>{cms.heading || 'Contact AethelCarats Atelier'}</h1>
          <p className="subtitle" style={{ color: cms.subheadingColor || undefined }}>
            {cms.subheading || 'Personalised assistance for certified diamonds, fine jewellery, and bespoke creations. Our dedicated atelier team is at your service.'}
          </p>
        </HeroSection>
      </RevealContainer>

      <ContentGrid>
        <RevealContainer delay={0.0} yOffset={25}>
          <ContactInfoCard>
            <div>
              <h2 style={{ color: cms.customerCareColor || undefined }}>{cms.customerCareHeading || 'ATELIER CONCIERGE'}</h2>
              <p style={{ color: cms.customerCareColor || '#D8D2C5', fontSize: '0.95rem', lineHeight: '1.6', marginTop: 8 }}>
                {cms.customerCareDescription || 'Our diamond specialists and master goldsmiths are available to guide you through diamond selection, sizing, or custom CAD requests.'}
              </p>
            </div>

            <ContactMethod>
              <div className="icon-wrapper">
                <Phone size={20} />
              </div>
              <div className="details">
                <label style={{ color: cms.phoneColor || undefined }}>{cms.phoneLabel || 'Telephone Assistance'}</label>
                <a href={`tel:${(cms.phone || contactInfo.phone).replace(/[^\d+]/g, '')}`}>{cms.phone || contactInfo.displayPhone}</a>
                <p className="note">{cms.businessHours || 'Mon – Sat: 9:00 AM – 7:00 PM GMT'}</p>
              </div>
            </ContactMethod>

            <ContactMethod>
              <div className="icon-wrapper">
                <Mail size={20} />
              </div>
              <div className="details">
                <label style={{ color: cms.emailColor || undefined }}>{cms.emailLabel || 'Email Concierge'}</label>
                <a href={`mailto:${cms.email || contactInfo.email}`}>{cms.email || contactInfo.email}</a>
                <p className="note">{cms.responseTime || 'Responses within 24 business hours'}</p>
              </div>
            </ContactMethod>

            <ContactMethod>
              <div className="icon-wrapper">
                <MapPin size={20} />
              </div>
              <div className="details">
                <label style={{ color: cms.appointmentColor || undefined }}>{cms.locationLabel || 'Private Atelier Appointments'}</label>
                <span>{cms.address || contactInfo.address || 'Surat, India'}</span>
                <p className="note">{cms.appointmentDescription || 'By private appointment only'}</p>
              </div>
            </ContactMethod>

            <div>
              <WhatsAppCTA
                href={`https://wa.me/${(cms.whatsappNumber || contactInfo.whatsappNumber || '91973785306').replace(/[^\d]/g, '') || '91973785306'}?text=${encodeURIComponent('Hello AethelCarats, I would like to inquire about fine jewellery and diamond assistance.')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} /> WhatsApp Concierge
              </WhatsAppCTA>
            </div>
          </ContactInfoCard>
        </RevealContainer>

        <RevealContainer delay={0.1} yOffset={25}>
          <FormContainer>
            <h2 style={{ color: cms.formHeadingColor || undefined }}>{cms.formHeading || 'Send an Enquiry'}</h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle size={48} color="#C9A96E" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#F5F1E8', marginBottom: 12 }}>
                  Thank You for Contacting Us
                </h3>
                <p style={{ color: '#D8D2C5', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Your enquiry has been submitted successfully. An AethelCarats concierge specialist will respond to your request within 24 hours.
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
                  Your information is used strictly to respond to your enquiry and provide requested concierge assistance.
                </PrivacyNote>
              </form>
            )}
          </FormContainer>
        </RevealContainer>
      </ContentGrid>

      <RevealContainer yOffset={35}>
        <ConciergeBanner>
          <ConciergeInner>
            <div className="text-content">
              <h2>Private Jewellery Concierge</h2>
              <p>
                Looking for a bespoke diamond ring, advice on certified diamonds, or custom 3D CAD design? Our master jewellers are here to assist you at every step.
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
      </RevealContainer>
    </PageWrapper>
  );
};
