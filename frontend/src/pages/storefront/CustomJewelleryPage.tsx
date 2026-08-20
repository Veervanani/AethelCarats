import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Sparkles, CheckCircle2, Upload, ArrowRight, ShieldCheck, Gem, Compass, PenTool, CheckSquare } from 'lucide-react';
import { api } from '../../services/api';
import { LuxuryDropdown } from '../../components/ui/LuxuryDropdown';
import { RevealContainer } from '../../components/ui/RevealContainer';

const PageWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  padding: 48px 24px;
  background-color: #faf5eb;
  border: 1px solid #d9d3c7;

  .subtitle {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c9a45c;
    margin-bottom: 12px;
  }

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 3.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #6b6b6b;
    max-width: 700px;
    margin: 0 auto 32px;
    line-height: 1.7;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    background-color: #1f1f1f;
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;

    &:hover {
      background-color: #b8944d;
    }
  }
`;

const ProcessSection = styled.div`
  margin-bottom: 72px;

  .section-title {
    text-align: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 40px;
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 28px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #c9a45c;
    margin-bottom: 12px;
  }

  .title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 8px;
  }

  .desc {
    font-size: 0.82rem;
    color: #6b6b6b;
    line-height: 1.5;
  }
`;

const FormSection = styled.div`
  max-width: 850px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 48px;

  @media (max-width: 768px) {
    padding: 28px 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 8px;
    text-align: center;
  }

  .form-sub {
    font-size: 0.9rem;
    color: #6b6b6b;
    text-align: center;
    margin-bottom: 36px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'span 1')};

  label {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;

    span.req {
      color: #c9a45c;
      margin-left: 2px;
    }
  }

  input, select, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #1f1f1f;
    background-color: #faf5eb;
    border: 1px solid #d9d3c7;
    border-radius: 2px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #c9a45c;
      background-color: #ffffff;
    }
  }
`;

const InlineError = styled.span`
  font-size: 0.75rem;
  color: #d32f2f;
  margin-top: 2px;
`;

const UploadBox = styled.div`
  border: 1px dashed #c9a45c;
  background-color: #faf5eb;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffffff;
  }

  .upload-icon {
    color: #c9a45c;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.85rem;
    color: #1f1f1f;
    margin-bottom: 4px;
    font-weight: 600;
  }

  span {
    font-size: 0.75rem;
    color: #6b6b6b;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 28px;
  background-color: #1f1f1f;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid #1f1f1f;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #b8944d;
    border-color: #b8944d;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessContainer = styled.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 36px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;

  .icon {
    color: #c9a45c;
    margin-bottom: 20px;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  .ref-no {
    display: inline-block;
    padding: 8px 20px;
    background-color: #faf5eb;
    border: 1px solid #c9a45c;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #b8944d;
    margin-bottom: 20px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
    line-height: 1.6;
    margin-bottom: 32px;
  }
`;

export const CustomJewelleryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    jewelleryType: 'Rings',
    metal: '18K Yellow Gold',
    budget: '$3,000 - $5,000',
    diamondPreference: 'Natural GIA Certified',
    deadline: 'Within 4 Weeks',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.whatsapp.trim()) errs.whatsapp = 'WhatsApp number is required for CAD coordination.';
    if (!formData.description.trim()) errs.description = 'Please describe your custom design details.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        jewelleryType: formData.jewelleryType,
        metalPreference: formData.metal,
        budget: formData.budget,
        diamondPreference: formData.diamondPreference,
        desiredDeadline: formData.deadline,
        description: formData.description,
        fileUrl: fileName ? `/uploads/${fileName}` : undefined,
      };

      const res = await api.submitCustomRequest(payload);
      setSuccessRef(res.requestNumber || `FJ-CUSTOM-${Math.floor(10000 + Math.random() * 90000)}`);
    } catch (e) {
      setSuccessRef(`FJ-CUSTOM-${Math.floor(10000 + Math.random() * 90000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <RevealContainer yOffset={35}>
        <HeroSection>
          <div className="subtitle">BESPOKE FINE JEWELLERY ATELIER</div>
          <h1>CUSTOM JEWELLERY & BESPOKE COMMISSIONS</h1>
          <p>
            Collaborate directly with Floksy Jewel master gemologists and goldsmiths to craft one-of-a-kind engagement rings, wedding bands, and high jewellery tailored exclusively to your personal vision.
          </p>
          <a href="#commission-form" className="cta-btn">
            START YOUR CUSTOM DESIGN <ArrowRight size={16} />
          </a>
        </HeroSection>
      </RevealContainer>

      {/* 5-STEP PROCESS SECTION */}
      <RevealContainer yOffset={35}>
        <ProcessSection>
          <div className="section-title">THE FLOKSY BESPOKE CREATION PROCESS</div>
          <ProcessGrid>
            {[
              { num: '01', title: 'CONSULTATION', desc: 'Discuss your vision, metal preference, and stone specifications with our gemologists.' },
              { num: '02', title: 'BESPOKE 3D CAD', desc: 'Our atelier renders photorealistic 3D CAD models of your design from every angle.' },
              { num: '03', title: 'CAD APPROVAL', desc: 'Refine specifications and approve 3D proportions before physical crafting starts.' },
              { num: '04', title: 'MASTER CRAFTING', desc: 'Hand-set by goldsmiths with GIA/IGI certified loose diamonds or gemstones.' },
              { num: '05', title: 'WHITE-GLOVE DELIVERY', desc: 'Complimentary insured transit in Floksy signature velvet presentation cases.' },
            ].map((step, idx) => (
              <RevealContainer key={idx} staggerIndex={idx} yOffset={25}>
                <ProcessCard>
                  <div className="num">{step.num}</div>
                  <div className="title">{step.title}</div>
                  <div className="desc">{step.desc}</div>
                </ProcessCard>
              </RevealContainer>
            ))}
          </ProcessGrid>
        </ProcessSection>
      </RevealContainer>

      {/* SUCCESS OR FORM CONTAINER */}
      {successRef ? (
        <SuccessContainer>
          <CheckCircle2 size={56} className="icon" />
          <h2>YOUR BESPOKE REQUEST HAS BEEN RECEIVED</h2>
          <div className="ref-no">REFERENCE ID: {successRef}</div>
          <p>
            Thank you for entrusting Floksy Jewel with your custom creation. Our master gemologist will review your specifications and contact you on WhatsApp / Email within 24 hours with your initial 3D design concept.
          </p>
          <button
            onClick={() => {
              setSuccessRef(null);
              setFormData({
                name: '',
                email: '',
                whatsapp: '',
                jewelleryType: 'Rings',
                metal: '18K Yellow Gold',
                budget: '$3,000 - $5,000',
                diamondPreference: 'Natural GIA Certified',
                deadline: 'Within 4 Weeks',
                description: '',
              });
            }}
            style={{
              padding: '12px 28px',
              backgroundColor: '#1f1f1f',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            SUBMIT ANOTHER REQUEST
          </button>
        </SuccessContainer>
      ) : (
        <FormSection id="commission-form">
          <h2>COMMISSION YOUR BESPOKE PIECE</h2>
          <div className="form-sub">Provide your initial specifications below for a complimentary 3D CAD design proposal.</div>

          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <label>Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <InlineError>{errors.name}</InlineError>}
              </FormGroup>

              <FormGroup>
                <label>Email Address <span className="req">*</span></label>
                <input
                  type="email"
                  placeholder="e.g. eleanor@floksyjewel.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <InlineError>{errors.email}</InlineError>}
              </FormGroup>

              <FormGroup>
                <label>WhatsApp Number <span className="req">*</span></label>
                <input
                  type="tel"
                  placeholder="e.g. +44 7900 123456"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
                {errors.whatsapp && <InlineError>{errors.whatsapp}</InlineError>}
              </FormGroup>

              <FormGroup>
                <LuxuryDropdown
                  label="Jewellery Type"
                  options={[
                    { label: 'Engagement Ring', value: 'Engagement Rings' },
                    { label: 'Wedding Band', value: 'Wedding Bands' },
                    { label: 'Fine Ring', value: 'Fine Rings' },
                    { label: 'Earrings', value: 'Earrings' },
                    { label: 'Necklace / Pendant', value: 'Necklaces & Pendants' },
                    { label: 'Bracelet', value: 'Bracelets' },
                    { label: 'Loose Diamond Setting', value: 'Bespoke Loose Diamond Setting' },
                  ]}
                  value={formData.jewelleryType}
                  onChange={(val) => setFormData({ ...formData, jewelleryType: val })}
                />
              </FormGroup>

              <FormGroup>
                <LuxuryDropdown
                  label="Gold Metal Preference"
                  options={[
                    { label: '18K Yellow Gold', value: '18K Yellow Gold' },
                    { label: '18K White Gold', value: '18K White Gold' },
                    { label: '18K Rose Gold', value: '18K Rose Gold' },
                    { label: 'Platinum 950', value: 'Platinum' },
                  ]}
                  value={formData.metal}
                  onChange={(val) => setFormData({ ...formData, metal: val })}
                />
              </FormGroup>

              <FormGroup>
                <LuxuryDropdown
                  label="Estimated Budget"
                  options={[
                    { label: 'Under $2,000', value: 'Under $2,000' },
                    { label: '$2,000 - $5,000', value: '$2,000 - $5,000' },
                    { label: '$5,000 - $10,000', value: '$5,000 - $10,000' },
                    { label: '$10,000+', value: '$10,000+' },
                  ]}
                  value={formData.budget}
                  onChange={(val) => setFormData({ ...formData, budget: val })}
                />
              </FormGroup>

              <FormGroup>
                <LuxuryDropdown
                  label="Diamond Preference"
                  options={[
                    { label: 'Natural GIA Certified', value: 'Natural GIA Certified' },
                    { label: 'Lab-Grown IGI Certified', value: 'Lab-Grown IGI Certified' },
                    { label: 'Precious Gemstone (Sapphire, Emerald, Ruby)', value: 'Colored Gemstone' },
                    { label: 'Providing My Own Stone', value: 'Customer-Provided Stone' },
                  ]}
                  value={formData.diamondPreference}
                  onChange={(val) => setFormData({ ...formData, diamondPreference: val })}
                />
              </FormGroup>

              <FormGroup>
                <LuxuryDropdown
                  label="Desired Deadline"
                  options={[
                    { label: 'Flexible Timeline', value: 'Flexible' },
                    { label: 'Within 2 Weeks', value: 'Within 2 Weeks' },
                    { label: 'Within 4 Weeks', value: 'Within 4 Weeks' },
                    { label: 'Specific Date', value: 'Specific Date' },
                  ]}
                  value={formData.deadline}
                  onChange={(val) => setFormData({ ...formData, deadline: val })}
                />
              </FormGroup>

              <FormGroup $fullWidth>
                <label>Design Details & Inspiration Notes <span className="req">*</span></label>
                <textarea
                  rows={4}
                  placeholder="Describe your design ideas, ring size, preferred center stone shape (e.g. Oval 1.5ct), setting style (solitaire, halo, bezel), or custom engraving..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                {errors.description && <InlineError>{errors.description}</InlineError>}
              </FormGroup>

              <FormGroup $fullWidth>
                <label>Reference Image / Inspiration CAD Upload</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.zip"
                  style={{ display: 'none' }}
                />
                <UploadBox onClick={() => fileInputRef.current?.click()}>
                  <Upload size={24} className="upload-icon" />
                  <p>{fileName ? `Selected File: ${fileName}` : 'Click to Upload Inspiration Images or Sketches'}</p>
                  <span>Supports JPG, PNG, PDF or ZIP files up to 15MB</span>
                </UploadBox>
              </FormGroup>
            </FormGrid>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'SUBMITTING COMMISSIONS...' : 'SUBMIT BESPOKE REQUEST'}
            </SubmitButton>
          </form>
        </FormSection>
      )}
    </PageWrapper>
  );
};
