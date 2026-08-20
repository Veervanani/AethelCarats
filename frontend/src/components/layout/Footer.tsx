import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Facebook, Instagram, Pin as Pinterest } from 'lucide-react';
import { api } from '../../services/api';
import { RevealContainer } from '../ui/RevealContainer';

const FooterWrapper = styled.footer`
  background-color: #faf9f6;
  color: #1f1f1f;
  border-top: 1px solid #e6e1d7;
  padding: 72px 32px 40px;
  width: 100%;
  box-sizing: border-box;
`;

const FooterInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const FooterColumn = styled.div`
  h4 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 22px;
    position: relative;
    display: inline-block;

    &:after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 24px;
      height: 1.5px;
      background-color: #c9a45c;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  li a {
    font-size: 13.5px;
    color: #6e6b65;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: #c9a45c;
      padding-left: 3px;
    }
  }
`;

const NewsletterColumn = styled.div`
  h4 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 10px;
  }

  p.subtitle {
    font-size: 13.5px;
    color: #6e6b65;
    margin-bottom: 22px;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid #1f1f1f;
  padding-bottom: 8px;
  margin-bottom: 16px;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #c9a45c;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13.5px;
  color: #1f1f1f;
  outline: none;
  padding-right: 12px;

  &::placeholder {
    color: #9b968d;
  }
`;

const NewsletterSubmit = styled.button`
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1f1f1f;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: #c9a45c;
  }
`;

const ConsentText = styled.p`
  font-size: 11.5px;
  line-height: 1.6;
  color: #8c877d;
  margin: 0;
`;

const SocialRow = styled.div`
  max-width: 1400px;
  margin: 44px auto 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 28px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #1f1f1f;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #c9a45c;
    transform: translateY(-2px);
  }
`;

const BottomDivider = styled.hr`
  border: none;
  border-top: 1px solid #e6e1d7;
  margin: 36px 0 28px;
`;

const BottomBar = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #77736c;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const FooterLogo = styled.img`
  width: 140px;
  height: auto;
  max-height: 48px;
  object-fit: contain;

  @media (max-width: 1024px) {
    width: 115px;
    max-height: 40px;
  }

  @media (max-width: 576px) {
    width: 105px;
    max-height: 36px;
  }
`;

const BrandCopyright = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .brand-logo {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    color: #242321;
    text-transform: uppercase;
  }

  .copy {
    font-size: 12px;
    color: #8c877d;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;

  a {
    font-size: 12px;
    color: #77736c;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #242321;
    }
  }

  @media (max-width: 576px) {
    justify-content: center;
    gap: 12px;
  }
`;

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [footerConfig, setFooterConfig] = useState<any>({
    copyrightText: '© 2026 FLOKSY JEWEL. ALL RIGHTS RESERVED.',
    contactEmail: 'contact@floksyjewel.com',
    contactPhone: '+91973785306',
    address: 'Surat, India',
  });

  React.useEffect(() => {
    api.getSiteSettings().then((res: any) => {
      if (res) {
        let contactEmail = res.contactEmail || 'contact@floksyjewel.com';
        let contactPhone = res.contactPhone || '+91973785306';

        let parsedFooterSettings: any = {};
        if (res.footer_settings) {
          try {
            parsedFooterSettings = typeof res.footer_settings === 'string' ? JSON.parse(res.footer_settings) : res.footer_settings;
            if (parsedFooterSettings?.email) contactEmail = parsedFooterSettings.email;
            if (parsedFooterSettings?.phone) contactPhone = parsedFooterSettings.phone;
          } catch (e) {
            // Silently ignore non-JSON string values
          }
        }

        let parsedFooterConfig: any = {};
        if (res.footer_config) {
          try {
            parsedFooterConfig = typeof res.footer_config === 'string' ? JSON.parse(res.footer_config) : res.footer_config;
            if (parsedFooterConfig?.contactEmail && (!res.footer_settings || !res.footer_settings.email)) contactEmail = parsedFooterConfig.contactEmail;
            if (parsedFooterConfig?.contactPhone && (!res.footer_settings || !res.footer_settings.phone)) contactPhone = parsedFooterConfig.contactPhone;
          } catch (e) {
            // Silently ignore non-JSON string values
          }
        }

        let siteSettingsData: any = {};
        if (res.site_settings) {
          try {
            siteSettingsData = typeof res.site_settings === 'string' ? JSON.parse(res.site_settings) : res.site_settings;
          } catch (e) {
            // Silently ignore non-JSON string values
          }
        }

        // Sanitize any remaining old placeholder strings
        if (!contactEmail || contactEmail.includes('concierge@floksyjewel.com') || contactEmail.includes('example.com') || contactEmail.includes('gmail.com')) {
          contactEmail = 'contact@floksyjewel.com';
        }
        if (!contactPhone || contactPhone.includes('555-3565') || contactPhone.includes('(800)')) {
          contactPhone = '+91973785306';
        }

        setFooterConfig((prev: any) => ({
          ...prev,
          ...(res || {}),
          ...siteSettingsData,
          ...parsedFooterConfig,
          ...parsedFooterSettings,
          contactEmail,
          contactPhone,
        }));
      }
    }).catch(console.error);
  }, []);

  const getFullSocialUrl = (rawUrl: string | undefined, defaultBase: string) => {
    if (!rawUrl) return defaultBase;
    let trimmed = rawUrl.trim();
    if (!trimmed) return defaultBase;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('@')) trimmed = trimmed.slice(1);
    return `${defaultBase.replace(/\/$/, '')}/${trimmed}`;
  };

  const resolveSocialUrl = (network: 'instagram' | 'facebook' | 'pinterest', defaultBase: string) => {
    const value = footerConfig[`${network}Url`] || footerConfig[network];
    if (typeof value === 'string' && value.trim()) return getFullSocialUrl(value, defaultBase);

    const socialLinks = footerConfig.socialLinks || footerConfig.social_links || [];
    if (Array.isArray(socialLinks)) {
      const item = socialLinks.find((link: any) => typeof link === 'object' && link.platform && link.url && link.platform.toLowerCase() === network);
      if (item?.url) return getFullSocialUrl(item.url, defaultBase);
    }

    return defaultBase;
  };

  const instagramHref = resolveSocialUrl('instagram', 'https://www.instagram.com/bhumi_floksyjewel?igsh=MTAxdHVtcTdqcXRldg==');
  const facebookHref = resolveSocialUrl('facebook', 'https://facebook.com/floksyjewel');
  const pinterestHref = resolveSocialUrl('pinterest', 'https://pinterest.com/floksyjewel');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <FooterWrapper>
      <FooterInner>
        {/* COLUMN 1: THE HOUSE */}
        <RevealContainer delay={0.0} yOffset={25}>
          <FooterColumn>
            <h4>THE HOUSE</h4>
            <ul>
              <li><Link to="/about-us">Quality & Craftsmanship</Link></li>
              <li><Link to="/sustainability">Diamond Sustainability</Link></li>
              <li><Link to="/blog">Floksy Journal</Link></li>
              <li><Link to="/sale-exclusions">Sale Exclusions</Link></li>
            </ul>
          </FooterColumn>
        </RevealContainer>

        {/* COLUMN 2: COLLECTIONS */}
        <RevealContainer delay={0.1} yOffset={25}>
          <FooterColumn>
            <h4>COLLECTIONS</h4>
            <ul>
              <li><Link to="/rings">Diamond Rings</Link></li>
              <li><Link to="/earrings">Fine Earrings</Link></li>
              <li><Link to="/necklaces">Riviere Necklaces</Link></li>
              <li><Link to="/bracelets">Tennis Bracelets</Link></li>
              <li><Link to="/pendants">Solitaire Pendants</Link></li>
              <li><Link to="/diamonds">The Diamond Vault</Link></li>
            </ul>
          </FooterColumn>
        </RevealContainer>

        {/* COLUMN 3: CLIENT SERVICES */}
        <RevealContainer delay={0.2} yOffset={25}>
          <FooterColumn>
            <h4>CLIENT SERVICES</h4>
            <ul>
              <li><a href={`tel:${footerConfig.contactPhone || '+91973785306'}`}>Phone: {footerConfig.contactPhone || '+91973785306'}</a></li>
              <li><a href={`mailto:${footerConfig.contactEmail || 'contact@floksyjewel.com'}`}>Email: {footerConfig.contactEmail || 'contact@floksyjewel.com'}</a></li>
              <li><Link to="/contact-us">Contact Concierge</Link></li>
              <li><Link to="/shipping-delivery">Complimentary Insured Shipping</Link></li>
              <li><Link to="/returns-refunds">Returns & Exchange</Link></li>
              <li><Link to="/lifetime-warranty">Lifetime Warranty</Link></li>
              <li><Link to="/faq">Frequently Asked Questions</Link></li>
            </ul>
          </FooterColumn>
        </RevealContainer>

        {/* COLUMN 4: NEWSLETTER */}
        <RevealContainer delay={0.3} yOffset={25}>
          <NewsletterColumn>
            <h4>JOIN FLOKSY JEWEL</h4>
            <p className="subtitle">Subscribe to receive bespoke invitations and private collection releases.</p>

            {subscribed ? (
              <p style={{ fontSize: 13, color: '#242321', fontWeight: 600 }}>
                Thank you for subscribing to Floksy Jewel.
              </p>
            ) : (
              <NewsletterForm onSubmit={handleSubmit}>
                <NewsletterInput
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <NewsletterSubmit type="submit">JOIN</NewsletterSubmit>
              </NewsletterForm>
            )}

            <ConsentText>
              I agree to receive promotional emails from Floksy Jewel. You can unsubscribe at any time. By clicking join, you accept our <Link to="/privacy-policy" style={{ color: '#8c877d', textDecoration: 'underline' }}>Privacy Policy</Link>.
            </ConsentText>
          </NewsletterColumn>
        </RevealContainer>
      </FooterInner>

      {/* SOCIAL MEDIA */}
      <SocialRow>
        <SocialLink href={facebookHref} target="_blank" rel="noopener noreferrer">
          <Facebook size={16} color="#242321" /> Facebook
        </SocialLink>
        <SocialLink href={instagramHref} target="_blank" rel="noopener noreferrer">
          <Instagram size={16} color="#242321" /> Instagram
        </SocialLink>
        <SocialLink href={pinterestHref} target="_blank" rel="noopener noreferrer">
          <Pinterest size={16} color="#242321" /> Pinterest
        </SocialLink>
      </SocialRow>

      <BottomDivider />

      {/* BOTTOM FOOTER */}
      <BottomBar>
        <BrandCopyright>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} aria-label="Floksy Jewel Homepage">
            <FooterLogo src="/assets/floksy-jewel-logo.png" alt="Floksy Jewel Fine Jewellery" />
          </Link>
          <span className="copy">&copy; {new Date().getFullYear()} Floksy Jewel</span>
        </BrandCopyright>

        <LegalLinks>
          <Link to="/terms-of-service">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/sitemap">Site Map</Link>
        </LegalLinks>
      </BottomBar>
    </FooterWrapper>
  );
};
