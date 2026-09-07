import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from '../ui/SafeImage';

const MenuInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 36px 40px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 48px;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 1200px) {
    padding: 28px 24px;
    gap: 32px;
  }

  @media (max-width: 1024px) {
    padding: 24px 16px;
    gap: 20px;
  }
`;

const LinkColumnsArea = styled.div<{ $colCount: number }>`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(${({ $colCount }) => ($colCount > 0 ? $colCount : 2)}, minmax(200px, 1fr));
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

const SectionBox = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #C9A96E;
    padding-bottom: 8px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  li a {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.8;
    color: #D8D2C5;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: color 0.22s ease, transform 0.22s ease;

    &:hover {
      color: #C9A96E;
      transform: translateX(4px);
    }
  }
`;

const NewTagBadge = styled.span`
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: #C9A96E;
  color: #0B0B0B;
  padding: 2px 6px;
  border-radius: 2px;
  margin-left: 8px;
  display: inline-block;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(201, 169, 110, 0.3);
`;

const PromosArea = styled.div`
  display: flex;
  gap: 24px;
  flex-shrink: 0;
  border-left: 1px solid rgba(140, 116, 75, 0.25);
  padding-left: 44px;

  @media (max-width: 1200px) {
    padding-left: 28px;
    gap: 16px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const PromoBox = styled(Link)`
  width: 215px;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  .img-area {
    width: 100%;
    height: 170px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
    background-color: #151515;
    position: relative;
    border: 1px solid rgba(140, 116, 75, 0.25);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  &:hover .img-area {
    border-color: #C9A96E;
    box-shadow: 0 12px 24px rgba(201, 169, 110, 0.2);

    img {
      transform: scale(1.05);
    }
  }

  .promo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 4px;
    transition: color 0.25s ease;
  }

  .promo-subtitle {
    font-size: 12px;
    color: #A8A8A8;
    line-height: 1.4;
  }

  &:hover .promo-title {
    color: #c9a45c;
  }
`;

interface SectionItem {
  heading: string;
  links: Array<{ label: string; url: string }>;
}

interface PromoItem {
  title: string;
  subtitle: string;
  image?: string;
  desktopImage?: string;
  mobileImage?: string;
  url: string;
  objectPosition?: string;
  objectFit?: string;
  enabled?: boolean;
  altText?: string;
}

interface MegaMenuProps {
  isOpen: boolean;
  data: {
    columns: Array<{
      sections?: SectionItem[];
      promos?: PromoItem[];
    }>;
  };
  onClose?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, data, onClose }) => {
  if (!data || !data.columns) return null;

  const sectionCols = data.columns.filter((c) => c.sections && c.sections.length > 0);
  const promoCols = data.columns.filter((c) => c.promos && c.promos.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.995 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: '#111111',
            borderTop: '1px solid rgba(140, 116, 75, 0.35)',
            borderBottom: '1px solid rgba(140, 116, 75, 0.25)',
            boxShadow: '0 24px 50px rgba(0, 0, 0, 0.85)',
            zIndex: 1050,
            maxHeight: 'calc(85vh - 84px)',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
          data-testid="mega-menu-overlay"
          id="mega-menu-overlay"
        >
          <MenuInner>
            <LinkColumnsArea $colCount={sectionCols.length}>
              {sectionCols.map((col, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                >
                  {col.sections?.map((sec, sIdx) => (
                    <SectionBox key={sIdx}>
                      <h4>{sec.heading}</h4>
                      <ul>
                        {sec.links.map((link, lIdx) => {
                          const hasNewTag = link.label.includes('NEW');
                          const cleanLabel = link.label.replace(/\bNEW\b/g, '').trim();

                          return (
                            <li key={lIdx}>
                              <Link to={link.url} onClick={onClose}>
                                <span>{cleanLabel}</span>
                                {hasNewTag && <NewTagBadge>NEW</NewTagBadge>}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </SectionBox>
                  ))}
                </motion.div>
              ))}
            </LinkColumnsArea>

            {promoCols.length > 0 && (
              <PromosArea>
                {promoCols.map((col, idx) =>
                  col.promos
                    ?.filter((p) => p.enabled !== false)
                    .map((promo, pIdx) => {
                      const imgSrc = promo.desktopImage || promo.image || '/assets/gem_rings_cat.png';
                      return (
                        <motion.div
                          key={`${idx}-${pIdx}`}
                          initial={{ opacity: 0, y: 15, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.45, delay: 0.15 + pIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <PromoBox to={promo.url || '/'} onClick={onClose}>
                            <div className="img-area">
                              <SafeImage
                                src={imgSrc}
                                alt={promo.altText || promo.title}
                                style={{
                                  objectPosition: promo.objectPosition || 'center',
                                  objectFit: (promo.objectFit as any) || 'cover',
                                }}
                              />
                            </div>
                            <div className="promo-title">{promo.title}</div>
                            {promo.subtitle && <div className="promo-subtitle">{promo.subtitle}</div>}
                          </PromoBox>
                        </motion.div>
                      );
                    })
                )}
              </PromosArea>
            )}
          </MenuInner>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
