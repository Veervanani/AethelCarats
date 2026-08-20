import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu as MenuIcon, X, ChevronDown } from 'lucide-react';
import { api } from '../../services/api';
import { MenuItem as IMenuItem } from '../../types';
import { MegaMenu } from './MegaMenu';
import { AuthModal } from '../modals/AuthModal';
import { SearchModal } from '../modals/SearchModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_MENU_ITEMS: IMenuItem[] = [
  {
    id: 'rings-menu',
    title: 'RINGS',
    url: '/rings',
    position: 1,
    megaMenu: JSON.stringify({
      columns: [
        {
          sections: [
            {
              heading: 'WEDDING RINGS',
              links: [
                { label: "Women's Wedding Rings", url: '/rings?category=womens-wedding' },
                { label: "Men's Wedding Bands", url: '/rings?category=mens-wedding' }
              ]
            },
            {
              heading: 'DIAMOND ESSENTIALS',
              links: [
                { label: 'Eternity Rings', url: '/rings?category=eternity' },
                { label: 'Anniversary Rings', url: '/rings?category=anniversary' }
              ]
            },
            {
              heading: 'ENGAGEMENT RINGS',
              links: [
                { label: 'Design Your Own Engagement Ring', url: '/customise' },
                { label: 'Ready To Ship Engagement Rings', url: '/rings?category=ready-to-ship', badge: 'NEW' }
              ]
            },
            {
              heading: 'EDUCATION',
              links: [
                { label: 'Rings Guide', url: '/ring-size-guide' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'SHOP ALL RINGS',
              links: [
                { label: 'Best Selling Rings', url: '/rings?sort=best-selling' },
                { label: 'Diamond Rings', url: '/rings?category=diamond' },
                { label: 'Gemstone Rings', url: '/rings?category=gemstone' },
                { label: 'Emerald Rings', url: '/rings?category=emerald' },
                { label: 'Sapphire Rings', url: '/rings?category=sapphire' },
                { label: 'Pearl Rings', url: '/rings?category=pearl' },
                { label: 'Stackable Rings', url: '/rings?category=stackable' },
                { label: 'Fashion Rings', url: '/rings?category=fashion' },
                { label: 'Signet Rings', url: '/rings?category=signet' },
                { label: "Men's Rings", url: '/rings?category=mens' },
                { label: 'Infinity Rings', url: '/rings?category=infinity' }
              ]
            },
            {
              heading: 'NEW ARRIVALS',
              links: [
                { label: 'Shop NEW Floksy Collection', url: '/rings?sort=newest' }
              ]
            }
          ]
        },
        {
          promos: [
            {
              title: 'SOLITAIRE RINGS',
              subtitle: '18K Basket & Peg Settings',
              desktopImage: '/assets/floksy_rings_cat.png',
              url: '/rings?style=solitaire',
              enabled: true
            },
            {
              title: 'WEDDING BANDS',
              subtitle: 'Handcrafted 18K Gold & Platinum',
              desktopImage: '/assets/floksy_solitaire_ring_perfect.png',
              url: '/rings?category=womens-wedding',
              enabled: true
            }
          ]
        }
      ]
    })
  },
  {
    id: 'earrings-menu',
    title: 'EARRINGS',
    url: '/earrings',
    position: 2,
    megaMenu: JSON.stringify({
      columns: [
        {
          sections: [
            {
              heading: 'CATEGORIES',
              links: [
                { label: 'All Earrings', url: '/earrings' },
                { label: 'Stud Earrings', url: '/earrings?category=studs' },
                { label: 'Drop & Dangle', url: '/earrings?category=drop' },
                { label: 'Hoop Earrings', url: '/earrings?category=hoops' },
                { label: 'Diamond Huggies', url: '/earrings?category=huggies' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'FEATURED STYLES',
              links: [
                { label: 'Solitaire Studs', url: '/earrings?style=solitaire-studs' },
                { label: 'Pear Cut Drops', url: '/earrings?style=pear-drops' },
                { label: 'Halo Studs', url: '/earrings?style=halo-studs' },
                { label: 'Cluster Earrings', url: '/earrings?style=cluster' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'SHOP BY METAL',
              links: [
                { label: '18K Yellow Gold', url: '/earrings?metal=18k-yellow-gold' },
                { label: '18K White Gold', url: '/earrings?metal=18k-white-gold' },
                { label: 'Silver', url: '/earrings?metal=silver' }
              ]
            }
          ]
        },
        {
          promos: [
            {
              title: 'DIAMOND DROP EARRINGS',
              subtitle: 'Handcrafted Pear Cuts',
              desktopImage: '/assets/floksy_earrings_cat.png',
              url: '/earrings?category=drop',
              enabled: true
            }
          ]
        }
      ]
    })
  },
  {
    id: 'necklaces-menu',
    title: 'NECKLACES',
    url: '/necklaces',
    position: 3,
    megaMenu: JSON.stringify({
      columns: [
        {
          sections: [
            {
              heading: 'CATEGORIES',
              links: [
                { label: 'All Necklaces', url: '/necklaces' },
                { label: 'Diamond Necklaces', url: '/necklaces?category=diamond' },
                { label: 'Tennis Necklaces', url: '/necklaces?category=tennis' },
                { label: 'Statement Pieces', url: '/necklaces?category=statement' },
                { label: 'Chokers', url: '/necklaces?category=chokers' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'FEATURED DESIGNS',
              links: [
                { label: 'Graduated Tennis Necklaces', url: '/necklaces?style=graduated' },
                { label: 'Marquise & Pear Clusters', url: '/necklaces?style=marquise-pear' },
                { label: 'Layering Chains', url: '/necklaces?style=chains' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'SHOP BY METAL',
              links: [
                { label: '18K Yellow Gold', url: '/necklaces?metal=18k-yellow-gold' },
                { label: '18K White Gold', url: '/necklaces?metal=18k-white-gold' },
                { label: 'Silver', url: '/necklaces?metal=silver' }
              ]
            }
          ]
        },
        {
          promos: [
            {
              title: 'DIAMOND TENNIS NECKLACE',
              subtitle: '18K Fine Gold Setting',
              desktopImage: '/assets/floksy_necklaces_cat.png',
              url: '/necklaces?category=tennis',
              enabled: true
            }
          ]
        }
      ]
    })
  },
  {
    id: 'bracelets-menu',
    title: 'BRACELETS',
    url: '/bracelets',
    position: 4,
    megaMenu: JSON.stringify({
      columns: [
        {
          sections: [
            {
              heading: 'CATEGORIES',
              links: [
                { label: 'All Bracelets', url: '/bracelets' },
                { label: 'Tennis Bracelets', url: '/bracelets?category=tennis' },
                { label: 'Bangles', url: '/bracelets?category=bangles' },
                { label: 'Chain Bracelets', url: '/bracelets?category=chain' },
                { label: 'Cuff Bracelets', url: '/bracelets?category=cuff' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'FEATURED STYLES',
              links: [
                { label: 'Emerald Cut Tennis Bracelets', url: '/bracelets?style=emerald-cut' },
                { label: 'Round Brilliant Tennis', url: '/bracelets?style=round-brilliant' },
                { label: 'Stacking Bangles', url: '/bracelets?style=stacking' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'SHOP BY METAL',
              links: [
                { label: '18K Yellow Gold', url: '/bracelets?metal=18k-yellow-gold' },
                { label: '18K White Gold', url: '/bracelets?metal=18k-white-gold' },
                { label: 'Silver', url: '/bracelets?metal=silver' }
              ]
            }
          ]
        },
        {
          promos: [
            {
              title: 'EMERALD TENNIS BRACELET',
              subtitle: 'Bezel & Prong Settings',
              desktopImage: '/assets/floksy_bracelets_cat.png',
              url: '/bracelets?category=tennis',
              enabled: true
            }
          ]
        }
      ]
    })
  },
  {
    id: 'pendants-menu',
    title: 'PENDANTS',
    url: '/pendants',
    position: 5,
    megaMenu: JSON.stringify({
      columns: [
        {
          sections: [
            {
              heading: 'CATEGORIES',
              links: [
                { label: 'All Pendants', url: '/pendants' },
                { label: 'Solitaire Pendants', url: '/pendants?category=solitaire' },
                { label: 'Halo Pendants', url: '/pendants?category=halo' },
                { label: 'Pear Cut Pendants', url: '/pendants?category=pear-cut' },
                { label: 'Gemstone Pendants', url: '/pendants?category=gemstone' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'FEATURED CUTS',
              links: [
                { label: 'Round Brilliant Pendants', url: '/pendants?cut=round' },
                { label: 'Oval Cut Pendants', url: '/pendants?cut=oval' },
                { label: 'Emerald Cut Pendants', url: '/pendants?cut=emerald' },
                { label: 'Marquise Pendants', url: '/pendants?cut=marquise' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'SHOP BY METAL',
              links: [
                { label: '18K Yellow Gold', url: '/pendants?metal=18k-yellow-gold' },
                { label: '18K White Gold', url: '/pendants?metal=18k-white-gold' },
                { label: 'Silver', url: '/pendants?metal=silver' }
              ]
            }
          ]
        },
        {
          promos: [
            {
              title: 'SOLITAIRE PENDANTS',
              subtitle: '18K Basket Settings',
              desktopImage: '/assets/floksy_pendants_cat.png',
              url: '/pendants?category=solitaire',
              enabled: true
            }
          ]
        }
      ]
    })
  },
  {
    id: 'diamonds-menu',
    title: 'DIAMONDS',
    url: '/diamonds',
    position: 6
  },
  {
    id: 'customise-menu',
    title: 'CUSTOMISE',
    url: '/customise',
    position: 7,
    megaMenu: JSON.stringify({
      columns: [
        {
          sections: [
            {
              heading: 'BESPOKE ATELIER',
              links: [
                { label: 'Custom Engagement Ring', url: '/customise' },
                { label: 'Bespoke Wedding Band', url: '/customise' },
                { label: 'Custom High Jewellery', url: '/customise' },
                { label: 'CAD 3D Modeling Request', url: '/customise' }
              ]
            }
          ]
        },
        {
          sections: [
            {
              heading: 'OUR PROCESS',
              links: [
                { label: '1. Initial Design Consultation', url: '/customise' },
                { label: '2. 3D Photorealistic Render', url: '/customise' },
                { label: '3. Master Goldsmith Crafting', url: '/customise' },
                { label: '4. Insured White-Glove Delivery', url: '/customise' }
              ]
            }
          ]
        },
        {
          promos: [
            {
              title: 'BESPOKE ATELIER CAD',
              subtitle: '3D Modeling & Master Craftsmanship',
              desktopImage: '/assets/floksy_bracelets_editorial_right_new.png',
              url: '/customise',
              enabled: true
            }
          ]
        }
      ]
    })
  }
];

const HeaderWrapper = styled.header<{ $isScrolled?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ $isScrolled }) => ($isScrolled ? 'rgba(250, 249, 246, 0.98)' : 'rgba(250, 249, 246, 0.94)')};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ $isScrolled }) => ($isScrolled ? '#dcd6c8' : '#e6e1d7')};
  width: 100%;
  box-shadow: ${({ $isScrolled }) => ($isScrolled ? '0 8px 24px rgba(31, 31, 31, 0.06)' : '0 4px 20px rgba(0, 0, 0, 0.02)')};
  transition: background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease;
`;

const HeaderInner = styled.div<{ $isScrolled?: boolean }>`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  height: ${({ $isScrolled }) => ($isScrolled ? '70px' : '84px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: height 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 1024px) {
    padding: 0 20px;
    height: ${({ $isScrolled }) => ($isScrolled ? '62px' : '72px')};
  }

  @media (max-width: 576px) {
    padding: 0 14px;
    height: ${({ $isScrolled }) => ($isScrolled ? '56px' : '64px')};
  }
`;

const MobileLeft = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 5;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  img {
    width: 150px;
    height: auto;
    max-height: 48px;
    object-fit: contain;

    @media (max-width: 1024px) {
      width: 130px;
      max-height: 40px;
    }

    @media (max-width: 576px) {
      width: 115px;
      max-height: 36px;
    }

    @media (max-width: 360px) {
      width: 100px;
      max-height: 32px;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    margin: 0;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 24px;
  height: 100%;
  padding: 0 16px;

  @media (max-width: 1280px) {
    gap: 16px;
    padding: 0 8px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavItemContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: static;
`;

const NavLinkStyled = styled(Link)<{ $active: boolean }>`
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#C9A45C' : '#1F1F1F')};
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 30px 0;
  transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    bottom: 22px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0%')};
    height: 1.5px;
    background: #C9A45C;
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 1px;
  }

  ${NavItemContainer}:hover & {
    color: #C9A45C;
    &:after {
      width: 100%;
    }
  }
`;

const RightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-shrink: 0;
  z-index: 5;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 576px) {
    gap: 10px;
  }

  @media (max-width: 360px) {
    gap: 6px;
  }
`;

const IconButton = styled.button`
  color: #1F1F1F;
  background: transparent;
  border: none;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  transition: color 0.25s ease, background-color 0.25s ease;

  &:hover {
    color: #C9A45C;
    background-color: rgba(201, 164, 92, 0.08);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 576px) {
    padding: 4px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const DesktopOnlyIconButton = styled(IconButton)`
  @media (max-width: 1024px) {
    display: none !important;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -2px;
  right: -3px;
  background: linear-gradient(135deg, #c9a45c 0%, #b8934b 100%);
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: 700;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(201, 164, 92, 0.4);
`;

const NavBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(36, 35, 33, 0.2);
  backdrop-filter: blur(2px);
  z-index: 900;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`;

const MobileBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(36, 35, 33, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1900;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.25s ease, visibility 0.25s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`;

const MobileDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 85%;
  max-width: 380px;
  height: 100vh;
  background-color: #fffdf9;
  z-index: 2000;
  padding: 24px 20px;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.15);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-y: auto;
  box-sizing: border-box;
`;

const MobileAccordion = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e8e3d9;
`;

const MobileAccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  padding: 4px 0;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #242321;

  a {
    color: inherit;
    text-decoration: none;
    flex: 1;
    display: flex;
    align-items: center;
    min-height: 48px;

    &:hover {
      color: #c9a45c;
    }
  }
`;

const AccordionToggleButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #77736c;

  &:hover {
    color: #c9a45c;
  }
`;

const MobileSubLinks = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  padding: 4px 0 16px 12px;

  a {
    font-size: 0.82rem;
    color: #55524d;
    text-decoration: none;
    line-height: 1.5;

    &:hover {
      color: #c9a45c;
    }
  }
`;

const AccountMenuDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 230px;
  width: max-content;
  max-width: 280px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  box-shadow: 0 12px 32px rgba(31, 31, 31, 0.14);
  padding: 12px 0;
  z-index: 1200;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  box-sizing: border-box;
  animation: dropdownFadeIn 0.2s ease-out;

  @keyframes dropdownFadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .user-info {
    padding: 8px 18px 12px;
    border-bottom: 1px solid #f2ede4;
    margin-bottom: 6px;
    box-sizing: border-box;

    .name {
      font-size: 0.85rem;
      font-weight: 700;
      color: #1f1f1f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .email {
      font-size: 0.74rem;
      color: #777;
      word-break: break-word;
      overflow-wrap: anywhere;
      line-height: 1.4;
    }
  }

  button, a {
    padding: 10px 18px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    text-decoration: none;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    display: block;
    width: 100%;
    box-sizing: border-box;

    &:hover {
      background-color: #faf5eb;
      color: #c9a45c;
    }
  }
`;

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout, openAuthModal } = useAuth();
  const [menuItems, setMenuItems] = useState<IMenuItem[]>(DEFAULT_MENU_ITEMS);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [openMobileAccordions, setOpenMobileAccordions] = useState<Record<string, boolean>>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [headerConfig, setHeaderConfig] = useState<any>({
    logoUrl: '/assets/floksy-jewel-logo.png',
    logoLink: '/',
    showSearch: true,
    showAccount: true,
    showWishlist: true,
    showCart: true,
  });

  const [holidayStatus, setHolidayStatus] = useState<any>(null);

  useEffect(() => {
    api.getHolidayModeStatus().then(setHolidayStatus).catch(console.error);
  }, []);

  useEffect(() => {
    api.getSiteSettings('header_config').then((res) => {
      if (res.header_config) {
        setHeaderConfig((prev: any) => ({ ...prev, ...res.header_config }));
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    api.getMenus().then((menus) => {
      if (!Array.isArray(menus)) return;
      const headerMenu = menus.find((m) => m && m.location === 'HEADER');
      if (headerMenu && Array.isArray(headerMenu.items) && headerMenu.items.length > 0) {
        setMenuItems(headerMenu.items);
      }
    }).catch(console.error);
  }, []);

  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    if (isAccountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenuId(null);
        setIsMobileOpen(false);
        setIsAccountMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsAccountMenuOpen(false);
    setActiveMenuId(id);
  };

  const handleNonNavMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenuId(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 150);
  };

  const toggleMobileAccordion = (id: string) => {
    setOpenMobileAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeAllMenus = () => {
    setActiveMenuId(null);
    setIsAccountMenuOpen(false);
    setIsMobileOpen(false);
  };

  const effectiveMenuItems = menuItems.length > 0 ? menuItems : DEFAULT_MENU_ITEMS;

  return (
    <>
      <NavBackdrop $isOpen={!!activeMenuId || isAccountMenuOpen} onClick={closeAllMenus} />
      <MobileBackdrop $isOpen={isMobileOpen} onClick={closeAllMenus} />

      <HeaderWrapper $isScrolled={isScrolled} onMouseLeave={handleMouseLeave}>
        <HeaderInner $isScrolled={isScrolled}>
          <MobileLeft>
            <MobileMenuButton onClick={() => setIsMobileOpen(true)} aria-label="Open mobile menu">
              <MenuIcon size={22} />
            </MobileMenuButton>
            <IconButton onClick={() => { closeAllMenus(); setIsSearchOpen(true); }} title="Search" aria-label="Search">
              <Search size={21} />
            </IconButton>
          </MobileLeft>

          <LogoLink to="/" aria-label="Floksy Jewel Home" onClick={closeAllMenus} onMouseEnter={handleNonNavMouseEnter}>
            <img src="/assets/floksy-jewel-logo.png" alt="Floksy Jewel Fine Jewellery" />
          </LogoLink>

          <DesktopNav aria-label="Main Navigation">
            {effectiveMenuItems.map((item) => {
              let parsedMega: any = null;
              if (item.megaMenu) {
                try {
                  parsedMega = typeof item.megaMenu === 'string' ? JSON.parse(item.megaMenu) : item.megaMenu;
                } catch (e) {}
              }
              if (!parsedMega) {
                const defaultItem = DEFAULT_MENU_ITEMS.find((d) => d.title.toUpperCase() === item.title.toUpperCase());
                if (defaultItem?.megaMenu) {
                  try {
                    parsedMega = typeof defaultItem.megaMenu === 'string' ? JSON.parse(defaultItem.megaMenu) : defaultItem.megaMenu;
                  } catch (e) {}
                }
              }

              const isHovered = activeMenuId === item.id;

              return (
                <NavItemContainer
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <NavLinkStyled to={item.url} $active={isHovered} onClick={closeAllMenus}>
                    {item.title}
                    {isHovered && (
                      <motion.div
                        layoutId="navGoldLine"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          position: 'absolute',
                          bottom: '20px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: '#C9A45C',
                          borderRadius: '1px',
                          transformOrigin: 'left center',
                        }}
                      />
                    )}
                  </NavLinkStyled>

                  {parsedMega && (
                    <MegaMenu
                      isOpen={isHovered}
                      data={parsedMega}
                      onClose={closeAllMenus}
                    />
                  )}
                </NavItemContainer>
              );
            })}
          </DesktopNav>

          <RightIcons onMouseEnter={handleNonNavMouseEnter}>
            <DesktopOnlyIconButton onClick={() => { closeAllMenus(); setIsSearchOpen(true); }} title="Search" aria-label="Search">
              <Search size={21} />
            </DesktopOnlyIconButton>
            <div style={{ position: 'relative' }} ref={accountMenuRef}>
              <IconButton
                onClick={() => {
                  setActiveMenuId(null);
                  if (isAuthenticated) {
                    setIsAccountMenuOpen(!isAccountMenuOpen);
                  } else {
                    openAuthModal('signin');
                  }
                }}
                onMouseEnter={() => {
                  setActiveMenuId(null);
                  if (isAuthenticated) {
                    setIsAccountMenuOpen(true);
                  }
                }}
                title={isAuthenticated ? 'Account Menu' : 'Sign In'}
                aria-label="Account"
                style={{ color: isAuthenticated ? '#C9A45C' : undefined }}
              >
                <User size={21} />
              </IconButton>

              <AccountMenuDropdown $isOpen={isAccountMenuOpen}>
                <div className="user-info">
                  <div className="name">{user?.name || 'Valued Client'}</div>
                  <div className="email">{user?.email || 'client@floksyjewel.com'}</div>
                </div>
                <Link to="/account" onClick={() => setIsAccountMenuOpen(false)}>MY ACCOUNT</Link>
                <Link to="/account#my-orders" onClick={() => setIsAccountMenuOpen(false)}>MY ORDERS</Link>
                <Link to="/wishlist" onClick={() => setIsAccountMenuOpen(false)}>WISHLIST</Link>
                {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                  <Link
                    to="/atelier-vault-7Kx9Qm4R2Lp8Nw6T"
                    onClick={() => setIsAccountMenuOpen(false)}
                    style={{ color: '#c9a45c', fontWeight: 700 }}
                  >
                    ADMIN PANEL
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsAccountMenuOpen(false);
                    logout();
                  }}
                >
                  LOGOUT
                </button>
              </AccountMenuDropdown>
            </div>

            <DesktopOnlyIconButton onClick={() => navigate('/wishlist')} title="Wishlist" aria-label="Wishlist">
              <Heart size={21} />
              {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
            </DesktopOnlyIconButton>
            <IconButton onClick={() => navigate('/cart')} title="Shopping Bag" aria-label="Shopping Bag">
              <ShoppingBag size={21} />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </IconButton>
          </RightIcons>
        </HeaderInner>
      </HeaderWrapper>

      {/* REUSABLE LUXURY SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenLogin={() => {
          setIsSearchOpen(false);
          openAuthModal('signin');
        }}
      />

      {/* UNIFIED LUXURY AUTH MODAL */}
      <AuthModal />

      {/* MOBILE / TABLET NAVIGATION DRAWER */}
      <MobileDrawer $isOpen={isMobileOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #E8E3D9' }}>
          <img src="/assets/floksy-jewel-logo.png" alt="Floksy Jewel Fine Jewellery" style={{ width: 125, height: 'auto', objectFit: 'contain' }} />
          <IconButton onClick={() => setIsMobileOpen(false)} aria-label="Close mobile menu">
            <X size={22} />
          </IconButton>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #F0ECE3' }}>
          <Link to="/wishlist" onClick={closeAllMenus} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 10px', background: '#FAF7F2', border: '1px solid #E8E3D9', borderRadius: 4, textDecoration: 'none', color: '#1F1F1F', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em' }}>
            <Heart size={15} color="#C9A45C" /> WISHLIST ({wishlistCount})
          </Link>
          <Link to={isAuthenticated ? "/account" : "#"} onClick={() => { closeAllMenus(); if (!isAuthenticated) openAuthModal('signin'); }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 10px', background: '#FAF7F2', border: '1px solid #E8E3D9', borderRadius: 4, textDecoration: 'none', color: '#1F1F1F', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em' }}>
            <User size={15} color="#C9A45C" /> {isAuthenticated ? 'ACCOUNT' : 'SIGN IN'}
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {effectiveMenuItems.map((item) => {
            let parsedMega: any = null;
            if (item.megaMenu) {
              try { parsedMega = typeof item.megaMenu === 'string' ? JSON.parse(item.megaMenu) : item.megaMenu; } catch (e) {}
            }
            const isAccordionOpen = !!openMobileAccordions[item.id];

            return (
              <MobileAccordion key={item.id}>
                <MobileAccordionHeader>
                  <Link to={item.url} onClick={closeAllMenus}>
                    {item.title}
                  </Link>
                  {parsedMega && (
                    <AccordionToggleButton
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMobileAccordion(item.id);
                      }}
                      aria-label="Toggle category menu"
                    >
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </AccordionToggleButton>
                  )}
                </MobileAccordionHeader>

                {parsedMega && parsedMega.columns && (
                  <MobileSubLinks $isOpen={isAccordionOpen}>
                    {parsedMega.columns.map((col: any, cIdx: number) => (
                      <React.Fragment key={cIdx}>
                        {col.sections && col.sections.map((sec: any, sIdx: number) => (
                          <React.Fragment key={sIdx}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A45C', marginTop: 10, marginBottom: 4 }}>
                              {sec.heading}
                            </div>
                            {sec.links && sec.links.map((link: any, lIdx: number) => (
                              <Link key={lIdx} to={link.url} onClick={closeAllMenus}>
                                {link.label}
                              </Link>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </MobileSubLinks>
                )}
              </MobileAccordion>
            );
          })}
        </div>
      </MobileDrawer>
    </>
  );
};
