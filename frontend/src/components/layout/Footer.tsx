import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Facebook, Instagram, Pin as Pinterest } from 'lucide-react';
import { api } from '../../services/api';
import { RevealContainer } from '../ui/RevealContainer';

const FooterWrapper = styled.footer`
  background-color: #0B0B0B;
  color: #F5F1E8;
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  padding: 72px 32px 40px;
  width: 100%;
  box-sizing: border-box;
`;

const FooterInner = styled.div<{ $colCount: number }>`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(${({ $colCount }) => Math.max(1, $colCount || 4)}, 1fr);
  gap: 48px;

  @media (max-width: 1100px) {
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
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #C9A96E;
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
      background-color: #C9A96E;
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
    color: #D8D2C5;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: #C9A96E;
      padding-left: 4px;
    }
  }
`;

const NewsletterColumn = styled.div`
  h4 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #C9A96E;
    margin-bottom: 10px;
  }

  p.subtitle {
    font-size: 13.5px;
    color: #A8A8A8;
    margin-bottom: 22px;
    line-height: 1.5;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid rgba(140, 116, 75, 0.45);
  padding-bottom: 8px;
  margin-bottom: 16px;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #C9A96E;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13.5px;
  color: #F5F1E8;
  outline: none;
  padding-right: 12px;

  &::placeholder {
    color: #777777;
  }
`;

const NewsletterSubmit = styled.button`
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C9A96E;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: #DFCA9B;
  }
`;

const ConsentText = styled.p`
  font-size: 11.5px;
  line-height: 1.6;
  color: #888888;
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
  color: #D8D2C5;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #C9A96E;
    transform: translateY(-2px);
  }

  svg {
    color: #C9A96E;
  }
`;

const BottomDivider = styled.hr`
  border: none;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  margin: 36px 0 28px;
`;

const BottomBar = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #A8A8A8;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const FooterBrandText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;

  .brand-name {
    font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: #F5F1E8;
    text-transform: uppercase;
    line-height: 1;

    span.gold-accent {
      color: #C9A96E;
    }
  }

  .brand-sub {
    font-size: 0.52rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #A8A8A8;
    margin-top: 3px;
    font-weight: 500;
  }
`;

const BrandCopyright = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .copy {
    font-size: 12px;
    color: #A8A8A8;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;

  a {
    font-size: 12px;
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
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
    brandName: 'AETHELCARATS FINE JEWELLERY ATELIER',
    logoImage: '/assets/gem-brand-logo.png',
    copyrightText: `© ${new Date().getFullYear()} AethelCarats Fine Jewellery Atelier. All Rights Reserved.`,
    contactEmail: 'concierge@aethelcarats.com',
    contactPhone: '+91973785306',
    address: 'Surat, India',
    newsletterHeading: 'JOIN AETHELCARATS ATELIER',
    newsletterSubtitle: 'Subscribe to receive bespoke invitations and private collection releases.',
    newsletterPlaceholder: 'Email Address',
    newsletterButtonText: 'JOIN',
    newsletterConsentText: 'I agree to receive promotional emails from AethelCarats Fine Jewellery Atelier. You can unsubscribe at any time.',
    newsletterPrivacyUrl: '/privacy-policy',
    columns: [
      {
        title: 'THE HOUSE',
        links: [
          { label: 'Quality & Craftsmanship', url: '/about-us' },
          { label: 'Diamond Sustainability', url: '/sustainability' },
          { label: 'Atelier Journal', url: '/blog' },
          { label: 'Sale Exclusions', url: '/sale-exclusions' },
        ],
      },
      {
        title: 'COLLECTIONS',
        links: [
          { label: 'Diamond Rings', url: '/rings' },
          { label: 'Fine Earrings', url: '/earrings' },
          { label: 'Riviere Necklaces', url: '/necklaces' },
          { label: 'Tennis Bracelets', url: '/bracelets' },
          { label: 'Solitaire Pendants', url: '/pendants' },
          { label: 'The Diamond Vault', url: '/diamonds' },
        ],
      },
      {
        title: 'CLIENT SERVICES',
        links: [
          { label: 'Phone: +91973785306', url: 'tel:+91973785306', isExternal: true },
          { label: 'Email: contact@auroradiamonds.com', url: 'mailto:contact@auroradiamonds.com', isExternal: true },
          { label: 'Contact Concierge', url: '/contact-us' },
          { label: 'Complimentary Insured Shipping', url: '/shipping-delivery' },
          { label: 'Returns & Exchange', url: '/returns-refunds' },
          { label: 'Lifetime Warranty', url: '/lifetime-warranty' },
          { label: 'Frequently Asked Questions', url: '/faq' },
        ],
      },
    ],
    legalLinks: [
      { label: 'Terms & Conditions', url: '/terms-of-service' },
      { label: 'Privacy Policy', url: '/privacy-policy' },
      { label: 'Site Map', url: '/sitemap' },
    ],
  });

  React.useEffect(() => {
    api.getSiteSettings().then((res: any) => {
      if (res) {
        let parsedFooterSettings: any = {};
        if (res.footer_settings) {
          try {
            parsedFooterSettings = typeof res.footer_settings === 'string' ? JSON.parse(res.footer_settings) : res.footer_settings;
          } catch (e) {}
        }

        let parsedFooterConfig: any = {};
        if (res.footer_config) {
          try {
            parsedFooterConfig = typeof res.footer_config === 'string' ? JSON.parse(res.footer_config) : res.footer_config;
          } catch (e) {}
        }

        const merged = {
          ...parsedFooterConfig,
          ...parsedFooterSettings,
        };

        if (!merged.columns || !Array.isArray(merged.columns) || merged.columns.length === 0) {
          if (parsedFooterConfig.columns && Array.isArray(parsedFooterConfig.columns) && parsedFooterConfig.columns.length > 0) {
            merged.columns = parsedFooterConfig.columns;
          }
        }

        setFooterConfig((prev: any) => ({
          ...prev,
          ...merged,
          brandName: merged.brandName || res.storeName || prev.brandName,
          copyrightText: merged.copyrightText || prev.copyrightText,
          contactEmail: merged.email || merged.contactEmail || res.contactEmail || prev.contactEmail,
          contactPhone: merged.phone || merged.contactPhone || res.contactPhone || prev.contactPhone,
          address: merged.address || res.storeAddress || prev.address,
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
    const value =
      footerConfig[`${network}Url`] ||
      footerConfig[network] ||
      (network === 'instagram' ? footerConfig.instagram : network === 'facebook' ? footerConfig.facebook : footerConfig.pinterest);

    if (typeof value === 'string' && value.trim()) return getFullSocialUrl(value, defaultBase);

    const socialLinks = footerConfig.socialLinks || footerConfig.social_links || [];
    if (Array.isArray(socialLinks)) {
      const item = socialLinks.find((link: any) => typeof link === 'object' && link.platform && link.url && link.platform.toLowerCase() === network);
      if (item?.url) return getFullSocialUrl(item.url, defaultBase);
    }

    return defaultBase;
  };

  const instagramHref = resolveSocialUrl('instagram', 'https://www.instagram.com/aethelcarats');
  const facebookHref = resolveSocialUrl('facebook', 'https://facebook.com/aethelcarats');
  const pinterestHref = resolveSocialUrl('pinterest', 'https://pinterest.com/aethelcarats');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const renderedColumns = Array.isArray(footerConfig.columns) && footerConfig.columns.length > 0
    ? footerConfig.columns
    : [
        {
          title: 'THE HOUSE',
          links: [
            { label: 'Quality & Craftsmanship', url: '/about-us' },
            { label: 'Diamond Sustainability', url: '/sustainability' },
            { label: 'Aura Journal', url: '/blog' },
            { label: 'Sale Exclusions', url: '/sale-exclusions' },
          ],
        },
        {
          title: 'COLLECTIONS',
          links: [
            { label: 'Diamond Rings', url: '/rings' },
            { label: 'Fine Earrings', url: '/earrings' },
            { label: 'Riviere Necklaces', url: '/necklaces' },
            { label: 'Tennis Bracelets', url: '/bracelets' },
            { label: 'Solitaire Pendants', url: '/pendants' },
            { label: 'The Diamond Vault', url: '/diamonds' },
          ],
        },
        {
          title: 'CLIENT SERVICES',
          links: [
            { label: `Phone: ${footerConfig.contactPhone || '+91973785306'}`, url: `tel:${footerConfig.contactPhone || '+91973785306'}`, isExternal: true },
            { label: `Email: ${footerConfig.contactEmail || 'contact@auroradiamonds.com'}`, url: `mailto:${footerConfig.contactEmail || 'contact@auroradiamonds.com'}`, isExternal: true },
            { label: 'Contact Concierge', url: '/contact-us' },
            { label: 'Complimentary Insured Shipping', url: '/shipping-delivery' },
            { label: 'Returns & Exchange', url: '/returns-refunds' },
            { label: 'Lifetime Warranty', url: '/lifetime-warranty' },
            { label: 'Frequently Asked Questions', url: '/faq' },
          ],
        },
      ];

  const renderedLegalLinks = Array.isArray(footerConfig.legalLinks) && footerConfig.legalLinks.length > 0
    ? footerConfig.legalLinks
    : [
        { label: 'Terms & Conditions', url: '/terms-of-service' },
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Site Map', url: '/sitemap' },
      ];

  return (
    <FooterWrapper>
      <FooterInner $colCount={renderedColumns.length + 1}>
        {/* DYNAMIC COLUMNS */}
        {renderedColumns.map((col: any, colIdx: number) => (
          <RevealContainer key={colIdx} delay={colIdx * 0.1} yOffset={25}>
            <FooterColumn>
              <h4>{col.title}</h4>
              <ul>
                {(col.links || []).map((link: any, linkIdx: number) => {
                  const isExt = link.isExternal || link.url?.startsWith('http') || link.url?.startsWith('tel:') || link.url?.startsWith('mailto:');
                  return (
                    <li key={linkIdx}>
                      {isExt ? (
                        <a
                          href={link.url}
                          target={link.url?.startsWith('http') ? '_blank' : undefined}
                          rel={link.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.url || '/'}>{link.label}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </FooterColumn>
          </RevealContainer>
        ))}

        {/* COLUMN 4: NEWSLETTER */}
        <RevealContainer delay={renderedColumns.length * 0.1} yOffset={25}>
          <NewsletterColumn>
            <h4>{footerConfig.newsletterHeading || 'JOIN AETHELCARATS ATELIER'}</h4>
            <p className="subtitle">
              {footerConfig.newsletterSubtitle || 'Subscribe to receive bespoke invitations and private collection releases.'}
            </p>

            {subscribed ? (
              <p style={{ fontSize: 13, color: '#C9A96E', fontWeight: 600 }}>
                Thank you for subscribing to {footerConfig.brandName || 'AethelCarats Fine Jewellery Atelier'}.
              </p>
            ) : (
              <NewsletterForm onSubmit={handleSubmit}>
                <NewsletterInput
                  type="email"
                  placeholder={footerConfig.newsletterPlaceholder || 'Email Address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <NewsletterSubmit type="submit">
                  {footerConfig.newsletterButtonText || 'JOIN'}
                </NewsletterSubmit>
              </NewsletterForm>
            )}

            <ConsentText>
              {footerConfig.newsletterConsentText || 'I agree to receive promotional emails from AethelCarats Fine Jewellery Atelier. You can unsubscribe at any time.'}{' '}
              By clicking join, you accept our{' '}
              <Link to={footerConfig.newsletterPrivacyUrl || '/privacy-policy'} style={{ color: '#C9A96E', textDecoration: 'underline' }}>
                Privacy Policy
              </Link>.
            </ConsentText>
          </NewsletterColumn>
        </RevealContainer>
      </FooterInner>

      {/* SOCIAL MEDIA */}
      <SocialRow>
        {facebookHref && (
          <SocialLink href={facebookHref} target="_blank" rel="noopener noreferrer">
            <Facebook size={16} color="#C9A96E" /> Facebook
          </SocialLink>
        )}
        {instagramHref && (
          <SocialLink href={instagramHref} target="_blank" rel="noopener noreferrer">
            <Instagram size={16} color="#C9A96E" /> Instagram
          </SocialLink>
        )}
        {pinterestHref && (
          <SocialLink href={pinterestHref} target="_blank" rel="noopener noreferrer">
            <Pinterest size={16} color="#C9A96E" /> Pinterest
          </SocialLink>
        )}
      </SocialRow>

      <BottomDivider />

      {/* BOTTOM FOOTER */}
      <BottomBar>
        <BrandCopyright>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} aria-label="AethelCarats Homepage" style={{ textDecoration: 'none' }}>
            <FooterBrandText>
              <div className="brand-name">
                AETHEL<span className="gold-accent">CARATS</span>
              </div>
              <div className="brand-sub">FINE JEWELLERY ATELIER</div>
            </FooterBrandText>
          </Link>
          <span className="copy">
            {footerConfig.copyrightText || `© ${new Date().getFullYear()} AethelCarats Fine Jewellery. All Rights Reserved.`}
          </span>
        </BrandCopyright>

        <LegalLinks>
          {renderedLegalLinks.map((ll: any, idx: number) => {
            const isExt = ll.isExternal || ll.url?.startsWith('http');
            return isExt ? (
              <a key={idx} href={ll.url} target="_blank" rel="noopener noreferrer">
                {ll.label}
              </a>
            ) : (
              <Link key={idx} to={ll.url || '/'}>
                {ll.label}
              </Link>
            );
          })}
        </LegalLinks>
      </BottomBar>
    </FooterWrapper>
  );
};
