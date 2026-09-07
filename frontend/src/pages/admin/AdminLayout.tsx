import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { PRIVATE_ADMIN_PATH } from '../../App';
import { ToastProvider } from '../../context/ToastContext';
import { financialApi } from '../../services/financialApi';
import {
  LayoutDashboard,
  Package,
  Plus,
  Layers,
  Gem,
  FileSpreadsheet,
  Palette,
  Globe,
  FolderTree,
  Search as SeoIcon,
  Shield,
  Star,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X as CloseIcon,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronRight,
  Eye,
  FileText,
  Upload,
  Users,
  ShoppingCart,
  Sliders,
  Image as ImageIcon,
  Clock,
  FileEdit,
  CreditCard,
  DollarSign,
  Tag,
  Home,
} from 'lucide-react';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AdminWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #faf8f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
  color: #19202a;
`;

const TopHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #11161b;
  border-bottom: 1px solid rgba(201, 164, 92, 0.28);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.22);
`;

const HeaderMainRow = styled.div`
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 900px) {
    padding: 0 16px;
    height: 58px;
  }
`;

const BrandSection = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;

  .brand-logo-badge {
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #c9a45c 0%, #8e6c27 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #101418;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    font-size: 1.15rem;
    box-shadow: 0 2px 8px rgba(201, 164, 92, 0.35);
  }

  .brand-texts {
    display: flex;
    flex-direction: column;
  }

  .brand-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: #f7eedb;
    line-height: 1.1;
  }

  .brand-sub {
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #c9a45c;
    font-weight: 600;
    margin-top: 2px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const NavDropdownContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavButton = styled.button<{ $isActive?: boolean; $isOpen?: boolean }>`
  background: ${({ $isOpen, $isActive }) =>
    $isOpen ? 'rgba(201, 164, 92, 0.22)' : $isActive ? 'rgba(201, 164, 92, 0.12)' : 'transparent'};
  border: 1px solid ${({ $isOpen, $isActive }) =>
    $isOpen ? 'rgba(201, 164, 92, 0.45)' : $isActive ? 'rgba(201, 164, 92, 0.28)' : 'transparent'};
  color: ${({ $isOpen, $isActive }) => ($isOpen || $isActive ? '#fdf9f0' : '#c5beaf')};
  font-size: 0.83rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.18s ease;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(201, 164, 92, 0.35);
  }

  .icon {
    color: ${({ $isOpen, $isActive }) => ($isOpen || $isActive ? '#c9a45c' : '#9c9586')};
  }

  .chevron {
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    color: #c9a45c;
  }

  .badge {
    background: #c9a45c;
    color: #101418;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 10px;
    margin-left: 2px;
  }
`;

const DirectNavLink = styled(Link)<{ $isActive?: boolean }>`
  background: ${({ $isActive }) => ($isActive ? 'rgba(201, 164, 92, 0.15)' : 'transparent')};
  border: 1px solid ${({ $isActive }) => ($isActive ? 'rgba(201, 164, 92, 0.3)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#fdf9f0' : '#c5beaf')};
  font-size: 0.83rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: all 0.18s ease;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
  }

  .icon {
    color: ${({ $isActive }) => ($isActive ? '#c9a45c' : '#9c9586')};
  }
`;

const DropdownMenu = styled.div<{ $alignRight?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  ${({ $alignRight }) => ($alignRight ? 'right: 0;' : 'left: 0;')}
  min-width: 250px;
  background: #171d23;
  border: 1px solid rgba(201, 164, 92, 0.35);
  border-radius: 8px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 1050;
  animation: ${fadeInDown} 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    ${({ $alignRight }) => ($alignRight ? 'right: 20px;' : 'left: 20px;')}
    width: 10px;
    height: 10px;
    background: #171d23;
    border-left: 1px solid rgba(201, 164, 92, 0.35);
    border-top: 1px solid rgba(201, 164, 92, 0.35);
    transform: rotate(45deg);
  }
`;

const DropdownCategoryTitle = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c9a45c;
  padding: 6px 12px 4px;
`;

const DropdownItem = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 0.83rem;
  font-weight: 500;
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#d2ccc0')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(201, 164, 92, 0.2)' : 'transparent')};
  border-left: 3px solid ${({ $isActive }) => ($isActive ? '#c9a45c' : 'transparent')};
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(2px);
  }

  .item-icon {
    color: ${({ $isActive }) => ($isActive ? '#c9a45c' : '#8e8778')};
    flex-shrink: 0;
  }

  .item-badge {
    margin-left: auto;
    background: #c9a45c;
    color: #101418;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 10px;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 4px 6px;
`;

const HeaderRightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const UserProfileBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 20px;

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
  }

  .user-email {
    font-size: 0.78rem;
    font-weight: 600;
    color: #e2ddd3;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 600px) {
      display: none;
    }
  }

  .role-pill {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    padding: 2px 6px;
    background: rgba(201, 164, 92, 0.2);
    border: 1px solid rgba(201, 164, 92, 0.5);
    color: #e5be73;
    border-radius: 10px;
  }
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: rgba(201, 164, 92, 0.15);
  border: 1px solid rgba(201, 164, 92, 0.4);
  border-radius: 6px;
  color: #f5eedf;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #c9a45c;
    color: #101418;
    border-color: #c9a45c;
  }

  @media (max-width: 600px) {
    span {
      display: none;
    }
    padding: 7px 8px;
  }
`;

const SignOutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: 6px;
  color: #fca5a5;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: #ef4444;
    color: #ffffff;
    border-color: #ef4444;
  }

  @media (max-width: 600px) {
    span {
      display: none;
    }
    padding: 7px 8px;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f7eedb;
  cursor: pointer;
  padding: 7px 9px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;

  @media (max-width: 1100px) {
    display: flex;
  }
`;

const SubBar = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #e8e3d9;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: #6d685e;

    a {
      color: #6d685e;
      text-decoration: none;
      &:hover {
        color: #101418;
      }
    }

    .sep {
      color: #b5afa4;
      font-size: 0.75rem;
    }

    .current-page {
      color: #101418;
      font-weight: 700;
    }
  }

  .quick-stats {
    font-size: 0.75rem;
    color: #8c8577;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const PageCanvas = styled.main`
  flex: 1;
  width: 100%;
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const MobileDrawerOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  inset: 0;
  background: rgba(16, 20, 24, 0.75);
  backdrop-filter: blur(4px);
  z-index: 2000;
`;

const MobileDrawer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: #14191f;
  border-right: 1px solid rgba(201, 164, 92, 0.3);
  z-index: 2001;
  display: flex;
  flex-direction: column;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  box-shadow: 6px 0 30px rgba(0, 0, 0, 0.5);
`;

const MobileDrawerHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileNavList = styled.div`
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MobileGroupAccordion = styled.div`
  margin-bottom: 6px;
`;

const MobileGroupBtn = styled.button<{ $isOpen?: boolean; $hasActiveChild?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  background: ${({ $isOpen, $hasActiveChild }) =>
    $isOpen ? 'rgba(201, 164, 92, 0.18)' : $hasActiveChild ? 'rgba(201, 164, 92, 0.1)' : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid ${({ $isOpen, $hasActiveChild }) =>
    $isOpen ? 'rgba(201, 164, 92, 0.4)' : $hasActiveChild ? 'rgba(201, 164, 92, 0.25)' : 'transparent'};
  border-radius: 6px;
  color: ${({ $isOpen, $hasActiveChild }) => ($isOpen || $hasActiveChild ? '#ffffff' : '#ccc6b8')};
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .left-content {
    display: flex;
    align-items: center;
    gap: 9px;
    color: ${({ $isOpen, $hasActiveChild }) => ($isOpen || $hasActiveChild ? '#c9a45c' : '#9c9586')};
  }

  .label-text {
    color: ${({ $isOpen, $hasActiveChild }) => ($isOpen || $hasActiveChild ? '#ffffff' : '#d2ccc0')};
  }
`;

const MobileSubItems = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 2px;
  padding: 6px 0 6px 14px;
  margin-left: 8px;
  border-left: 1px solid rgba(201, 164, 92, 0.25);
`;

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('admin_profile');
    const token = localStorage.getItem('admin_session_token');
    if (!userStr || !token) {
      navigate(`${PRIVATE_ADMIN_PATH}/login`);
    } else {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {}
    }

    // Fetch live order count
    financialApi.getOrders()
      .then((data: any) => {
        if (Array.isArray(data)) setOrderCount(data.length);
        else if (data && data.orders) setOrderCount(data.orders.length);
      })
      .catch(() => {});
  }, [navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session_token');
    localStorage.removeItem('admin_profile');
    navigate(`${PRIVATE_ADMIN_PATH}/login`);
  };

  const isCurrent = (path: string) => location.pathname === path;
  const isGroupActive = (paths: string[]) => paths.some((p) => location.pathname.startsWith(p));

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileGroup = (key: string) => {
    setMobileOpenGroup((prev) => (prev === key ? null : key));
  };

  // Compute readable page title for header
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard Overview';
    if (path.includes('/products/new')) return 'Add New Product';
    if (path.includes('/products/bulk-upload')) return 'Bulk Product Upload';
    if (path.includes('/products/bulk-sale')) return 'Bulk Sale Manager';
    if (path.includes('/products/bulk-price')) return 'Bulk Price Editor';
    if (path.includes('/products/details')) return 'Product Details & Specs';
    if (path.includes('/products/') && path.includes('/edit')) return 'Edit Product';
    if (path.includes('/product-page-content')) return 'Product Page Content';
    if (path.includes('/products')) return 'All Products Catalog';
    if (path.includes('/categories')) return 'Product Categories';
    if (path.includes('/filters')) return 'Product Filter Manager';
    if (path.includes('/diamonds')) return 'Diamond Vault';
    if (path.includes('/diamond-filters')) return 'Diamond Filters';
    if (path.includes('/excel-import')) return 'Excel Diamond Import';
    if (path.includes('/orders')) return 'Order Management';
    if (path.includes('/customers')) return 'Customer Management';
    if (path.includes('/customer-pricing')) return 'Customer & Metal Pricing';
    if (path.includes('/custom-requests')) return 'Custom Requests & CAD';
    if (path.includes('/promotions')) return 'Promotions & Coupons';
    if (path.includes('/reviews')) return 'Customer Reviews';
    if (path.includes('/cms/page-builder')) return 'Visual Page Builder & CMS';
    if (path.includes('/homepage-manager')) return 'Homepage CMS';
    if (path.includes('/pages')) return 'All Pages Dashboard';
    if (path.includes('/ring-size-guide')) return 'Ring Size Guide';
    if (path.includes('/header-manager')) return 'Header Manager';
    if (path.includes('/megamenu-manager')) return 'Mega Menu & Category Navigation';
    if (path.includes('/footer-manager')) return 'Footer Manager';
    if (path.includes('/media')) return 'Media Library';
    if (path.includes('/seo')) return 'SEO & Redirects';
    if (path.includes('/holiday-mode')) return 'Holiday Mode';
    if (path.includes('/payment-settings')) return 'PayPal & Payment Settings';
    if (path.includes('/payment-methods')) return 'Payment Methods';
    if (path.includes('/payments')) return 'Payments Ledger';
    if (path.includes('/statements')) return 'Financial Statements';
    if (path.includes('/settings')) return 'Store & WhatsApp Settings';
    if (path.includes('/theme')) return 'Theme Settings';
    if (path.includes('/text-labels')) return 'Text Labels';
    if (path.includes('/users')) return 'Users & Roles';
    if (path.includes('/activity-logs')) return 'Activity Audit Logs';
    return 'Admin Panel';
  };

  const productPaths = [
    `${PRIVATE_ADMIN_PATH}/products`,
    `${PRIVATE_ADMIN_PATH}/categories`,
    `${PRIVATE_ADMIN_PATH}/product-page-content`,
    `${PRIVATE_ADMIN_PATH}/filters`,
  ];

  const diamondPaths = [
    `${PRIVATE_ADMIN_PATH}/diamonds`,
    `${PRIVATE_ADMIN_PATH}/excel-import`,
    `${PRIVATE_ADMIN_PATH}/diamond-filters`,
  ];

  const salesPaths = [
    `${PRIVATE_ADMIN_PATH}/orders`,
    `${PRIVATE_ADMIN_PATH}/customers`,
    `${PRIVATE_ADMIN_PATH}/customer-pricing`,
    `${PRIVATE_ADMIN_PATH}/custom-requests`,
    `${PRIVATE_ADMIN_PATH}/promotions`,
    `${PRIVATE_ADMIN_PATH}/reviews`,
  ];

  const cmsPaths = [
    `${PRIVATE_ADMIN_PATH}/cms/page-builder`,
    `${PRIVATE_ADMIN_PATH}/homepage-manager`,
    `${PRIVATE_ADMIN_PATH}/pages`,
    `${PRIVATE_ADMIN_PATH}/ring-size-guide`,
    `${PRIVATE_ADMIN_PATH}/media`,
    `${PRIVATE_ADMIN_PATH}/header-manager`,
    `${PRIVATE_ADMIN_PATH}/megamenu-manager`,
    `${PRIVATE_ADMIN_PATH}/footer-manager`,
    `${PRIVATE_ADMIN_PATH}/seo`,
  ];

  const financePaths = [
    `${PRIVATE_ADMIN_PATH}/payment-settings`,
    `${PRIVATE_ADMIN_PATH}/payment-methods`,
    `${PRIVATE_ADMIN_PATH}/payments`,
    `${PRIVATE_ADMIN_PATH}/statements`,
    `${PRIVATE_ADMIN_PATH}/settings`,
    `${PRIVATE_ADMIN_PATH}/holiday-mode`,
    `${PRIVATE_ADMIN_PATH}/theme`,
    `${PRIVATE_ADMIN_PATH}/text-labels`,
  ];

  const securityPaths = [
    `${PRIVATE_ADMIN_PATH}/users`,
    `${PRIVATE_ADMIN_PATH}/activity-logs`,
  ];

  return (
    <ToastProvider>
      <AdminWrapper>
        {/* TOP LUXURY ADMIN HEADER */}
        <TopHeader>
          <HeaderMainRow>
            {/* BRAND / LOGO */}
            <BrandSection to={`${PRIVATE_ADMIN_PATH}/dashboard`}>
              <div className="brand-logo-badge">AC</div>
              <div className="brand-texts">
                <span className="brand-title">AETHELCARATS</span>
                <span className="brand-sub">ATELIER CMS & ADMIN</span>
              </div>
            </BrandSection>

            {/* DESKTOP DROPDOWN NAVIGATION */}
            <DesktopNav ref={navRef}>
              {/* 1. DASHBOARD */}
              <DirectNavLink
                to={`${PRIVATE_ADMIN_PATH}/dashboard`}
                $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/dashboard`)}
              >
                <LayoutDashboard size={16} className="icon" />
                <span>Dashboard</span>
              </DirectNavLink>

              {/* 2. CATALOG & PRODUCTS DROPDOWN */}
              <NavDropdownContainer>
                <NavButton
                  type="button"
                  $isOpen={openDropdown === 'products'}
                  $isActive={isGroupActive(productPaths)}
                  onClick={() => toggleDropdown('products')}
                >
                  <Package size={16} className="icon" />
                  <span>Products</span>
                  <ChevronDown size={14} className="chevron" />
                </NavButton>

                {openDropdown === 'products' && (
                  <DropdownMenu>
                    <DropdownCategoryTitle>Product Management</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/products`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products`)}
                    >
                      <Package size={15} className="item-icon" />
                      <span>All Products Catalog</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/products/new`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/new`)}
                    >
                      <Plus size={15} className="item-icon" />
                      <span>Add New Product</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/products/details`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/details`)}
                    >
                      <Sliders size={15} className="item-icon" />
                      <span>Product Details & Specs</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/products/bulk-sale`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-sale`)}
                    >
                      <Tag size={15} className="item-icon" />
                      <span>Bulk Sale Options</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/products/bulk-price`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-price`)}
                    >
                      <DollarSign size={15} className="item-icon" />
                      <span>Bulk Price Editor</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/products/bulk-upload`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-upload`)}
                    >
                      <FileSpreadsheet size={15} className="item-icon" />
                      <span>Bulk Product Upload</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/product-page-content`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/product-page-content`)}
                    >
                      <FileEdit size={15} className="item-icon" />
                      <span>Product Page Content</span>
                    </DropdownItem>

                    <DropdownDivider />
                    <DropdownCategoryTitle>Organization & Filters</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/categories`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/categories`)}
                    >
                      <FolderTree size={15} className="item-icon" />
                      <span>Product Categories</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/filters`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/filters`)}
                    >
                      <Sliders size={15} className="item-icon" />
                      <span>Filter Attributes</span>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </NavDropdownContainer>

              {/* 3. DIAMONDS DROPDOWN */}
              <NavDropdownContainer>
                <NavButton
                  type="button"
                  $isOpen={openDropdown === 'diamonds'}
                  $isActive={isGroupActive(diamondPaths)}
                  onClick={() => toggleDropdown('diamonds')}
                >
                  <Gem size={16} className="icon" />
                  <span>Diamonds</span>
                  <ChevronDown size={14} className="chevron" />
                </NavButton>

                {openDropdown === 'diamonds' && (
                  <DropdownMenu>
                    <DropdownCategoryTitle>Loose Diamond Vault</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/diamonds`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/diamonds`)}
                    >
                      <Gem size={15} className="item-icon" />
                      <span>All Diamonds Vault</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/excel-import`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/excel-import`)}
                    >
                      <Upload size={15} className="item-icon" />
                      <span>Excel Diamond Import</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/diamond-filters`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/diamond-filters`)}
                    >
                      <Sliders size={15} className="item-icon" />
                      <span>Diamond Filters Config</span>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </NavDropdownContainer>

              {/* 4. ORDERS & SALES DROPDOWN */}
              <NavDropdownContainer>
                <NavButton
                  type="button"
                  $isOpen={openDropdown === 'sales'}
                  $isActive={isGroupActive(salesPaths)}
                  onClick={() => toggleDropdown('sales')}
                >
                  <ShoppingCart size={16} className="icon" />
                  <span>Orders & CRM</span>
                  {orderCount > 0 && <span className="badge">{orderCount}</span>}
                  <ChevronDown size={14} className="chevron" />
                </NavButton>

                {openDropdown === 'sales' && (
                  <DropdownMenu>
                    <DropdownCategoryTitle>Orders & Clients</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/orders`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/orders`) || location.pathname.startsWith(`${PRIVATE_ADMIN_PATH}/orders/`)}
                    >
                      <ShoppingCart size={15} className="item-icon" />
                      <span>Orders Management</span>
                      {orderCount > 0 && <span className="item-badge">{orderCount}</span>}
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/customers`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/customers`)}
                    >
                      <Users size={15} className="item-icon" />
                      <span>Customer Directory</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/customer-pricing`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/customer-pricing`)}
                    >
                      <Globe size={15} className="item-icon" />
                      <span>Customer & Metal Pricing</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/custom-requests`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/custom-requests`)}
                    >
                      <Palette size={15} className="item-icon" />
                      <span>Custom Requests & CAD</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/promotions`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/promotions`)}
                    >
                      <Tag size={15} className="item-icon" />
                      <span>Promotions & Coupons</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/reviews`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/reviews`)}
                    >
                      <Star size={15} className="item-icon" />
                      <span>Customer Reviews</span>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </NavDropdownContainer>

              {/* 5. WEBSITE & CMS DROPDOWN */}
              <NavDropdownContainer>
                <NavButton
                  type="button"
                  $isOpen={openDropdown === 'cms'}
                  $isActive={isGroupActive(cmsPaths)}
                  onClick={() => toggleDropdown('cms')}
                >
                  <Globe size={16} className="icon" />
                  <span>Website CMS</span>
                  <ChevronDown size={14} className="chevron" />
                </NavButton>

                {openDropdown === 'cms' && (
                  <DropdownMenu>
                    <DropdownCategoryTitle>Page Builder & Content</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/cms/page-builder`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/cms/page-builder`)}
                    >
                      <Sliders size={15} className="item-icon" />
                      <span>Website Builder & CMS</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/homepage-manager`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/homepage-manager`)}
                    >
                      <Home size={15} className="item-icon" />
                      <span>Homepage Manager</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/pages`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/pages`)}
                    >
                      <Layers size={15} className="item-icon" />
                      <span>All Pages Manager</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/ring-size-guide`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/ring-size-guide`)}
                    >
                      <FileText size={15} className="item-icon" />
                      <span>Ring Size Guide CMS</span>
                    </DropdownItem>

                    <DropdownDivider />
                    <DropdownCategoryTitle>Navigation & Media</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/header-manager`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/header-manager`)}
                    >
                      <Sliders size={15} className="item-icon" />
                      <span>Header Manager</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/megamenu-manager`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/megamenu-manager`)}
                    >
                      <Layers size={15} className="item-icon" />
                      <span>Mega Menu Manager</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/footer-manager`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/footer-manager`)}
                    >
                      <FileText size={15} className="item-icon" />
                      <span>Footer Manager</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/media`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/media`)}
                    >
                      <ImageIcon size={15} className="item-icon" />
                      <span>Media Library</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/seo`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/seo`)}
                    >
                      <SeoIcon size={15} className="item-icon" />
                      <span>SEO & Redirects</span>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </NavDropdownContainer>

              {/* 6. FINANCE & SETTINGS DROPDOWN */}
              <NavDropdownContainer>
                <NavButton
                  type="button"
                  $isOpen={openDropdown === 'finance'}
                  $isActive={isGroupActive(financePaths)}
                  onClick={() => toggleDropdown('finance')}
                >
                  <SettingsIcon size={16} className="icon" />
                  <span>Settings & Finance</span>
                  <ChevronDown size={14} className="chevron" />
                </NavButton>

                {openDropdown === 'finance' && (
                  <DropdownMenu $alignRight>
                    <DropdownCategoryTitle>Payment Gateways</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/payment-settings`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/payment-settings`)}
                    >
                      <CreditCard size={15} className="item-icon" />
                      <span>PayPal & Gateway Settings</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/payment-methods`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/payment-methods`)}
                    >
                      <DollarSign size={15} className="item-icon" />
                      <span>Payment Methods</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/payments`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/payments`)}
                    >
                      <FileText size={15} className="item-icon" />
                      <span>Payments Ledger</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/statements`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/statements`)}
                    >
                      <FileSpreadsheet size={15} className="item-icon" />
                      <span>Financial Statements</span>
                    </DropdownItem>

                    <DropdownDivider />
                    <DropdownCategoryTitle>Configuration</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/settings`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/settings`)}
                    >
                      <SettingsIcon size={15} className="item-icon" />
                      <span>WhatsApp & Store Settings</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/holiday-mode`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/holiday-mode`)}
                    >
                      <Clock size={15} className="item-icon" />
                      <span>Holiday Mode</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/theme`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/theme`)}
                    >
                      <Palette size={15} className="item-icon" />
                      <span>Theme Customization</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/text-labels`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/text-labels`)}
                    >
                      <FileText size={15} className="item-icon" />
                      <span>Text & Labels</span>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </NavDropdownContainer>

              {/* 7. SECURITY DROPDOWN */}
              <NavDropdownContainer>
                <NavButton
                  type="button"
                  $isOpen={openDropdown === 'security'}
                  $isActive={isGroupActive(securityPaths)}
                  onClick={() => toggleDropdown('security')}
                >
                  <Shield size={16} className="icon" />
                  <span>Security</span>
                  <ChevronDown size={14} className="chevron" />
                </NavButton>

                {openDropdown === 'security' && (
                  <DropdownMenu $alignRight>
                    <DropdownCategoryTitle>Access & Audits</DropdownCategoryTitle>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/users`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/users`)}
                    >
                      <Shield size={15} className="item-icon" />
                      <span>Users & Roles Management</span>
                    </DropdownItem>
                    <DropdownItem
                      to={`${PRIVATE_ADMIN_PATH}/activity-logs`}
                      $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/activity-logs`)}
                    >
                      <Clock size={15} className="item-icon" />
                      <span>Activity Audit Logs</span>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </NavDropdownContainer>
            </DesktopNav>

            {/* HEADER RIGHT ACTIONS */}
            <HeaderRightActions>
              <UserProfileBadge>
                <span className="status-dot" />
                <span className="user-email">{user?.email || 'Admin'}</span>
                <span className="role-pill">{user?.role || 'SUPER_ADMIN'}</span>
              </UserProfileBadge>

              <ActionButton href="/" target="_blank" rel="noreferrer" title="Open Storefront in new tab">
                <Eye size={14} />
                <span>Storefront</span>
              </ActionButton>

              <SignOutBtn type="button" onClick={handleLogout} title="Sign Out">
                <LogOut size={14} />
                <span>Logout</span>
              </SignOutBtn>

              <MobileMenuToggle
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open Navigation Drawer"
              >
                <MenuIcon size={20} />
              </MobileMenuToggle>
            </HeaderRightActions>
          </HeaderMainRow>
        </TopHeader>

        {/* SUB HEADER BREADCRUMBS BAR */}
        <SubBar>
          <div className="breadcrumbs">
            <Link to={`${PRIVATE_ADMIN_PATH}/dashboard`}>AethelCarats</Link>
            <span className="sep">/</span>
            <span>Admin</span>
            <span className="sep">/</span>
            <span className="current-page">{getPageTitle()}</span>
          </div>

          <div className="quick-stats">
            <span>✨ Luxury Diamond & Fine Jewelry Atelier Admin</span>
          </div>
        </SubBar>

        {/* FULL WIDTH MAIN CONTENT CANVAS */}
        <PageCanvas>
          <Outlet />
        </PageCanvas>

        {/* MOBILE SLIDE-OVER DRAWER */}
        <MobileDrawerOverlay
          $isOpen={mobileDrawerOpen}
          onClick={() => setMobileDrawerOpen(false)}
        />
        <MobileDrawer $isOpen={mobileDrawerOpen}>
          <MobileDrawerHeader>
            <BrandSection to={`${PRIVATE_ADMIN_PATH}/dashboard`}>
              <div className="brand-logo-badge">AC</div>
              <div className="brand-texts">
                <span className="brand-title">AETHELCARATS</span>
                <span className="brand-sub">ADMIN PORTAL</span>
              </div>
            </BrandSection>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <CloseIcon size={22} />
            </button>
          </MobileDrawerHeader>

          <MobileNavList>
            {/* Dashboard */}
            <DirectNavLink
              to={`${PRIVATE_ADMIN_PATH}/dashboard`}
              $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/dashboard`)}
              onClick={() => setMobileDrawerOpen(false)}
            >
              <LayoutDashboard size={16} className="icon" />
              <span>Dashboard Overview</span>
            </DirectNavLink>

            {/* Products Accordion */}
            <MobileGroupAccordion>
              <MobileGroupBtn
                type="button"
                $isOpen={mobileOpenGroup === 'products'}
                $hasActiveChild={isGroupActive(productPaths)}
                onClick={() => toggleMobileGroup('products')}
              >
                <div className="left-content">
                  <Package size={16} />
                  <span className="label-text">Products & Catalog</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileOpenGroup === 'products' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </MobileGroupBtn>
              <MobileSubItems $isOpen={mobileOpenGroup === 'products'}>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/products`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products`)}>
                  <Package size={14} className="item-icon" />
                  <span>All Products</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/products/new`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/new`)}>
                  <Plus size={14} className="item-icon" />
                  <span>Add Product</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/products/details`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/details`)}>
                  <Sliders size={14} className="item-icon" />
                  <span>Product Details</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/products/bulk-sale`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-sale`)}>
                  <Tag size={14} className="item-icon" />
                  <span>Bulk Sale Options</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/products/bulk-price`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-price`)}>
                  <DollarSign size={14} className="item-icon" />
                  <span>Bulk Price Editor</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/products/bulk-upload`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-upload`)}>
                  <FileSpreadsheet size={14} className="item-icon" />
                  <span>Bulk Upload</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/product-page-content`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/product-page-content`)}>
                  <FileEdit size={14} className="item-icon" />
                  <span>Product Page Content</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/categories`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/categories`)}>
                  <FolderTree size={14} className="item-icon" />
                  <span>Categories</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/filters`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/filters`)}>
                  <Sliders size={14} className="item-icon" />
                  <span>Filters</span>
                </DropdownItem>
              </MobileSubItems>
            </MobileGroupAccordion>

            {/* Diamonds Accordion */}
            <MobileGroupAccordion>
              <MobileGroupBtn
                type="button"
                $isOpen={mobileOpenGroup === 'diamonds'}
                $hasActiveChild={isGroupActive(diamondPaths)}
                onClick={() => toggleMobileGroup('diamonds')}
              >
                <div className="left-content">
                  <Gem size={16} />
                  <span className="label-text">Diamond Vault</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileOpenGroup === 'diamonds' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </MobileGroupBtn>
              <MobileSubItems $isOpen={mobileOpenGroup === 'diamonds'}>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/diamonds`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/diamonds`)}>
                  <Gem size={14} className="item-icon" />
                  <span>All Diamonds</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/excel-import`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/excel-import`)}>
                  <Upload size={14} className="item-icon" />
                  <span>Excel Diamond Import</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/diamond-filters`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/diamond-filters`)}>
                  <Sliders size={14} className="item-icon" />
                  <span>Diamond Filters</span>
                </DropdownItem>
              </MobileSubItems>
            </MobileGroupAccordion>

            {/* Sales & Orders Accordion */}
            <MobileGroupAccordion>
              <MobileGroupBtn
                type="button"
                $isOpen={mobileOpenGroup === 'sales'}
                $hasActiveChild={isGroupActive(salesPaths)}
                onClick={() => toggleMobileGroup('sales')}
              >
                <div className="left-content">
                  <ShoppingCart size={16} />
                  <span className="label-text">Orders & CRM</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileOpenGroup === 'sales' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </MobileGroupBtn>
              <MobileSubItems $isOpen={mobileOpenGroup === 'sales'}>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/orders`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/orders`)}>
                  <ShoppingCart size={14} className="item-icon" />
                  <span>Orders {orderCount > 0 && `(${orderCount})`}</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/customers`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/customers`)}>
                  <Users size={14} className="item-icon" />
                  <span>Customers</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/customer-pricing`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/customer-pricing`)}>
                  <Globe size={14} className="item-icon" />
                  <span>Customer & Metal Pricing</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/custom-requests`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/custom-requests`)}>
                  <Palette size={14} className="item-icon" />
                  <span>Custom Requests & CAD</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/promotions`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/promotions`)}>
                  <Tag size={14} className="item-icon" />
                  <span>Promotions</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/reviews`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/reviews`)}>
                  <Star size={14} className="item-icon" />
                  <span>Customer Reviews</span>
                </DropdownItem>
              </MobileSubItems>
            </MobileGroupAccordion>

            {/* Website CMS Accordion */}
            <MobileGroupAccordion>
              <MobileGroupBtn
                type="button"
                $isOpen={mobileOpenGroup === 'cms'}
                $hasActiveChild={isGroupActive(cmsPaths)}
                onClick={() => toggleMobileGroup('cms')}
              >
                <div className="left-content">
                  <Globe size={16} />
                  <span className="label-text">Website CMS</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileOpenGroup === 'cms' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </MobileGroupBtn>
              <MobileSubItems $isOpen={mobileOpenGroup === 'cms'}>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/cms/page-builder`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/cms/page-builder`)}>
                  <Sliders size={14} className="item-icon" />
                  <span>Website Builder & CMS</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/homepage-manager`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/homepage-manager`)}>
                  <Home size={14} className="item-icon" />
                  <span>Homepage Manager</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/pages`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/pages`)}>
                  <Layers size={14} className="item-icon" />
                  <span>All Pages Manager</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/ring-size-guide`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/ring-size-guide`)}>
                  <FileText size={14} className="item-icon" />
                  <span>Ring Size Guide</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/header-manager`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/header-manager`)}>
                  <Sliders size={14} className="item-icon" />
                  <span>Header Manager</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/megamenu-manager`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/megamenu-manager`)}>
                  <Layers size={14} className="item-icon" />
                  <span>Mega Menu Manager</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/footer-manager`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/footer-manager`)}>
                  <FileText size={14} className="item-icon" />
                  <span>Footer Manager</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/media`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/media`)}>
                  <ImageIcon size={14} className="item-icon" />
                  <span>Media Library</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/seo`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/seo`)}>
                  <SeoIcon size={14} className="item-icon" />
                  <span>SEO & Redirects</span>
                </DropdownItem>
              </MobileSubItems>
            </MobileGroupAccordion>

            {/* Finance & Settings Accordion */}
            <MobileGroupAccordion>
              <MobileGroupBtn
                type="button"
                $isOpen={mobileOpenGroup === 'finance'}
                $hasActiveChild={isGroupActive(financePaths)}
                onClick={() => toggleMobileGroup('finance')}
              >
                <div className="left-content">
                  <SettingsIcon size={16} />
                  <span className="label-text">Finance & Settings</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileOpenGroup === 'finance' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </MobileGroupBtn>
              <MobileSubItems $isOpen={mobileOpenGroup === 'finance'}>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/payment-settings`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/payment-settings`)}>
                  <CreditCard size={14} className="item-icon" />
                  <span>PayPal Settings</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/payment-methods`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/payment-methods`)}>
                  <DollarSign size={14} className="item-icon" />
                  <span>Payment Methods</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/payments`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/payments`)}>
                  <FileText size={14} className="item-icon" />
                  <span>Payments Ledger</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/statements`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/statements`)}>
                  <FileSpreadsheet size={14} className="item-icon" />
                  <span>Statements</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/settings`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/settings`)}>
                  <SettingsIcon size={14} className="item-icon" />
                  <span>WhatsApp & Store</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/holiday-mode`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/holiday-mode`)}>
                  <Clock size={14} className="item-icon" />
                  <span>Holiday Mode</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/theme`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/theme`)}>
                  <Palette size={14} className="item-icon" />
                  <span>Theme Settings</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/text-labels`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/text-labels`)}>
                  <FileText size={14} className="item-icon" />
                  <span>Text Labels</span>
                </DropdownItem>
              </MobileSubItems>
            </MobileGroupAccordion>

            {/* Security Accordion */}
            <MobileGroupAccordion>
              <MobileGroupBtn
                type="button"
                $isOpen={mobileOpenGroup === 'security'}
                $hasActiveChild={isGroupActive(securityPaths)}
                onClick={() => toggleMobileGroup('security')}
              >
                <div className="left-content">
                  <Shield size={16} />
                  <span className="label-text">Security & Roles</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileOpenGroup === 'security' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                />
              </MobileGroupBtn>
              <MobileSubItems $isOpen={mobileOpenGroup === 'security'}>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/users`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/users`)}>
                  <Shield size={14} className="item-icon" />
                  <span>Users & Roles</span>
                </DropdownItem>
                <DropdownItem to={`${PRIVATE_ADMIN_PATH}/activity-logs`} $isActive={isCurrent(`${PRIVATE_ADMIN_PATH}/activity-logs`)}>
                  <Clock size={14} className="item-icon" />
                  <span>Activity Audit Logs</span>
                </DropdownItem>
              </MobileSubItems>
            </MobileGroupAccordion>
          </MobileNavList>
        </MobileDrawer>
      </AdminWrapper>
    </ToastProvider>
  );
};
