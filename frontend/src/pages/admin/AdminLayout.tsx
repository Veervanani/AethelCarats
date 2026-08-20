import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_ADMIN_PATH } from '../../App';
import { ToastProvider } from '../../context/ToastContext';
import { api } from '../../services/api';
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
  ChevronLeft,
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
} from 'lucide-react';

const AdminWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #faf8f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
`;

const Sidebar = styled.aside<{ $mobileOpen?: boolean; $collapsed?: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '74px' : '260px')};
  height: 100vh;
  background-color: #12161a;
  color: #fffdf9;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  z-index: 100;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px;
    z-index: 10000;
    transform: ${({ $mobileOpen }) => ($mobileOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
  }
`;

const SidebarOverlay = styled.div<{ $mobileOpen?: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: ${({ $mobileOpen }) => ($mobileOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(18, 22, 26, 0.7);
    backdrop-filter: blur(3px);
    z-index: 9999;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: #1f1f1f;
  cursor: pointer;
  padding: 6px;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const MobileCloseBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fffdf9;
  cursor: pointer;
  padding: 4px;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const SidebarHeader = styled.div<{ $collapsed?: boolean }>`
  padding: ${({ $collapsed }) => ($collapsed ? '20px 12px' : '24px 20px')};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .brand-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #c9a45c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .brand-sub {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8c877b;
    display: block;
    margin-top: 2px;
  }
`;

const NavList = styled.nav`
  flex: 1;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #2c3645 #12161a;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #12161a;
  }
  &::-webkit-scrollbar-thumb {
    background: #2c3645;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #c9a45c;
  }
`;

const NavGroupLabel = styled.div<{ $collapsed?: boolean }>`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c9a45c;
  padding: 14px 20px 6px;
  white-space: nowrap;
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'block')};
`;

const NavLinkItem = styled(Link)<{ $active: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${({ $collapsed }) => ($collapsed ? '12px 0' : '10px 20px')};
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? '#FFFDF9' : '#B0AB9E')};
  background-color: ${({ $active }) => ($active ? 'rgba(201, 164, 92, 0.15)' : 'transparent')};
  border-left: 3px solid ${({ $active }) => ($active ? '#C9A45C' : 'transparent')};
  transition: all 0.18s ease;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
  }

  .nav-text {
    display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  }
`;

const SidebarFooter = styled.div<{ $collapsed?: boolean }>`
  padding: 14px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};

  .signout-btn {
    background: none;
    border: none;
    color: #b0ab9e;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    transition: all 0.15s ease;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .collapse-toggle {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #c9a45c;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(201, 164, 92, 0.2);
      color: #ffffff;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  scrollbar-width: thin;
  scrollbar-color: #d9d3c7 #faf8f5;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #faf8f5;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d3c7;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #c9a45c;
  }
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 90;
  background-color: #ffffff;
  border-bottom: 1px solid #e8e3d9;
  padding: 14px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    padding: 12px 16px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
  }

  .breadcrumb {
    font-size: 0.8rem;
    color: #77736c;
    display: flex;
    align-items: center;
    gap: 6px;

    .sep {
      color: #ccc;
    }
    .active-page {
      color: #19202a;
      font-weight: 600;
    }

    @media (max-width: 576px) {
      .brand-crumbs {
        display: none;
      }
    }
  }
`;

const TopBarRight = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 576px) {
    gap: 8px;
    .user-email-text {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .user-role-badge {
      display: none;
    }
    .view-storefront-btn span {
      display: none;
    }
  }
`;

const PageContainer = styled.div`
  padding: 28px 32px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('fj_admin_sidebar_collapsed') === 'true';
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('fj_admin_sidebar_collapsed', String(next));
      return next;
    });
  };

  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    const userStr = localStorage.getItem('fj_admin_user');
    const token = localStorage.getItem('fj_admin_token');
    if (!userStr || !token) {
      navigate(`${PRIVATE_ADMIN_PATH}/login`);
    } else {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {}
    }

    // Fetch live order count for admin sidebar badge
    financialApi.getOrders()
      .then((data: any) => {
        if (Array.isArray(data)) setOrderCount(data.length);
        else if (data && data.orders) setOrderCount(data.orders.length);
      })
      .catch(() => {});
  }, [navigate]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('fj_admin_token');
    localStorage.removeItem('fj_admin_user');
    navigate(`${PRIVATE_ADMIN_PATH}/login`);
  };

  const isCurrent = (path: string) => location.pathname === path;

  // Compute readable page title for header
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/products/new')) return 'Add New Product';
    if (path.includes('/products/bulk-upload')) return 'Bulk Product Upload';
    if (path.includes('/products/') && path.includes('/edit')) return 'Edit Product';
    if (path.includes('/product-page-content')) return 'Product Page Content';
    if (path.includes('/products')) return 'All Products Catalog';
    if (path.includes('/categories')) return 'Product Categories';
    if (path.includes('/diamonds')) return 'Diamond Vault';
    if (path.includes('/excel-import')) return 'Excel Diamond Import';
    if (path.includes('/customers')) return 'Customer Management';
    if (path.includes('/customer-pricing')) return 'Customer & Metal Pricing';
    if (path.includes('/orders')) return 'Order Management';
    if (path.includes('/custom-requests')) return 'Custom Requests & CAD';
    if (path.includes('/reviews')) return 'Reviews Manager';
    if (path.includes('/ring-size-guide')) return 'Ring Size Guide';
    if (path.includes('/homepage-manager')) return 'Homepage CMS';
    if (path.includes('/footer-manager')) return 'Footer Manager';
    if (path.includes('/header-manager')) return 'Header Manager';
    if (path.includes('/seo')) return 'SEO & Redirects';
    if (path.includes('/settings')) return 'WhatsApp & Store Settings';
    return 'Admin Panel';
  };

  return (
    <ToastProvider>
      <AdminWrapper>
        <SidebarOverlay $mobileOpen={isMobileSidebarOpen} onClick={() => setIsMobileSidebarOpen(false)} />
        <Sidebar $mobileOpen={isMobileSidebarOpen} $collapsed={isCollapsed}>
          <SidebarHeader $collapsed={isCollapsed}>
            <div>
              <div className="brand-title">{isCollapsed ? 'FJ' : 'FLOKSY JEWEL'}</div>
              {!isCollapsed && <span className="brand-sub">ATELIER PLATFORM</span>}
            </div>
            <MobileCloseBtn
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              aria-label="Close admin menu"
            >
              <CloseIcon size={20} />
            </MobileCloseBtn>
          </SidebarHeader>

          <NavList>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/dashboard`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/dashboard`)} $collapsed={isCollapsed} title="Dashboard">
              <LayoutDashboard size={18} /> <span className="nav-text">Dashboard</span>
            </NavLinkItem>

            <NavGroupLabel $collapsed={isCollapsed}>WEBSITE</NavGroupLabel>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/homepage-manager`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/homepage-manager`)} $collapsed={isCollapsed} title="Home">
              <Globe size={18} /> <span className="nav-text">Home</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/ring-size-guide`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/ring-size-guide`)} $collapsed={isCollapsed} title="Ring Size Guide">
              <FileText size={18} /> <span className="nav-text">Ring Size Guide</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/pages`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/pages`)} $collapsed={isCollapsed} title="All Pages Manager">
              <Layers size={18} /> <span className="nav-text">All Pages Manager</span>
            </NavLinkItem>

            <NavGroupLabel $collapsed={isCollapsed}>PRODUCTS</NavGroupLabel>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/products`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/products`)} $collapsed={isCollapsed} title="All Products">
              <Package size={18} /> <span className="nav-text">All Products</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/products/new`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/products/new`)} $collapsed={isCollapsed} title="Add Product">
              <Plus size={18} /> <span className="nav-text">Add Product</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/products/details`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/products/details`)} $collapsed={isCollapsed} title="Product Details">
              <Sliders size={18} /> <span className="nav-text">Product Details</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/products/bulk-sale`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-sale`)} $collapsed={isCollapsed} title="Bulk Sale Options">
              <Tag size={18} /> <span className="nav-text">Bulk Sale Options</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/products/bulk-price`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-price`)} $collapsed={isCollapsed} title="Bulk Price Editor">
              <DollarSign size={18} /> <span className="nav-text">Bulk Price Editor</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/products/bulk-upload`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/products/bulk-upload`)} $collapsed={isCollapsed} title="Bulk Product Upload">
              <FileSpreadsheet size={18} /> <span className="nav-text">Bulk Product Upload</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/product-page-content`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/product-page-content`)} $collapsed={isCollapsed} title="Product Page Content">
              <FileEdit size={18} /> <span className="nav-text">Product Page Content</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/categories`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/categories`)} $collapsed={isCollapsed} title="Product Categories">
              <FolderTree size={18} /> <span className="nav-text">Product Categories</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/reviews`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/reviews`)} $collapsed={isCollapsed} title="Customer Reviews">
              <Star size={18} /> <span className="nav-text">Customer Reviews</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/filters`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/filters`)} $collapsed={isCollapsed} title="Filter Management">
              <Sliders size={18} /> <span className="nav-text">Filter Management</span>
            </NavLinkItem>

            <NavGroupLabel $collapsed={isCollapsed}>DIAMONDS</NavGroupLabel>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/diamonds`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/diamonds`)} $collapsed={isCollapsed} title="All Diamonds">
              <Gem size={18} /> <span className="nav-text">All Diamonds</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/excel-import`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/excel-import`)} $collapsed={isCollapsed} title="Excel Diamond Import">
              <Upload size={18} /> <span className="nav-text">Excel Diamond Import</span>
            </NavLinkItem>

            <NavGroupLabel $collapsed={isCollapsed}>ORDERS & PRICING</NavGroupLabel>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/orders`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/orders`) || location.pathname.startsWith(`${PRIVATE_ADMIN_PATH}/orders/`)} $collapsed={isCollapsed} title="Orders">
              <ShoppingCart size={18} /> <span className="nav-text">Orders</span>
              {orderCount > 0 && !isCollapsed && (
                <span
                  style={{
                    marginLeft: 'auto',
                    background: '#c9a45c',
                    color: '#12161a',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    borderRadius: '10px',
                  }}
                >
                  {orderCount}
                </span>
              )}
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/customer-pricing`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/customer-pricing`)} $collapsed={isCollapsed} title="Customer & Metal Pricing">
              <Globe size={18} /> <span className="nav-text">Customer & Metal Pricing</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/customers`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/customers`) || location.pathname.startsWith(`${PRIVATE_ADMIN_PATH}/customers/`)} $collapsed={isCollapsed} title="Customers">
              <Users size={18} /> <span className="nav-text">Customers</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/custom-requests`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/custom-requests`)} $collapsed={isCollapsed} title="Custom Requests & CAD">
              <Palette size={18} /> <span className="nav-text">Custom Requests & CAD</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/reviews`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/reviews`)} $collapsed={isCollapsed} title="Reviews Manager">
              <Star size={18} /> <span className="nav-text">Reviews Manager</span>
            </NavLinkItem>

            <NavGroupLabel $collapsed={isCollapsed}>FINANCIAL & PAYPAL</NavGroupLabel>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/payment-settings`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/payment-settings`)} $collapsed={isCollapsed} title="PayPal & Settings">
              <CreditCard size={18} /> <span className="nav-text">PayPal & Settings</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/payment-methods`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/payment-methods`)} $collapsed={isCollapsed} title="Payment Methods">
              <DollarSign size={18} /> <span className="nav-text">Payment Methods</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/payments`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/payments`)} $collapsed={isCollapsed} title="Payments Ledger">
              <FileText size={18} /> <span className="nav-text">Payments Ledger</span>
            </NavLinkItem>

            <NavGroupLabel $collapsed={isCollapsed}>SYSTEM & CMS</NavGroupLabel>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/cms/page-builder`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/cms/page-builder`)} $collapsed={isCollapsed} title="Website Builder & CMS">
              <Sliders size={18} /> <span className="nav-text">Website Builder & CMS</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/media`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/media`)} $collapsed={isCollapsed} title="Central Media Library">
              <ImageIcon size={18} /> <span className="nav-text">Central Media Library</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/seo`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/seo`)} $collapsed={isCollapsed} title="SEO & Redirects">
              <SeoIcon size={18} /> <span className="nav-text">SEO & Redirects</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/holiday-mode`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/holiday-mode`)} $collapsed={isCollapsed} title="Holiday Mode">
              <Clock size={18} /> <span className="nav-text">Holiday Mode</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/footer-manager`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/footer-manager`)} $collapsed={isCollapsed} title="Footer Manager">
              <FileText size={18} /> <span className="nav-text">Footer Manager</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/settings`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/settings`)} $collapsed={isCollapsed} title="Settings">
              <SettingsIcon size={18} /> <span className="nav-text">WhatsApp & Settings</span>
            </NavLinkItem>

            <NavGroupLabel $collapsed={isCollapsed}>SECURITY</NavGroupLabel>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/users`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/users`)} $collapsed={isCollapsed} title="Users & Roles">
              <Shield size={18} /> <span className="nav-text">Users & Roles</span>
            </NavLinkItem>
            <NavLinkItem to={`${PRIVATE_ADMIN_PATH}/activity-logs`} $active={isCurrent(`${PRIVATE_ADMIN_PATH}/activity-logs`)} $collapsed={isCollapsed} title="Activity Audit Logs">
              <Clock size={18} /> <span className="nav-text">Activity Audit Logs</span>
            </NavLinkItem>
          </NavList>

          <SidebarFooter $collapsed={isCollapsed}>
            {!isCollapsed && (
              <button className="signout-btn" onClick={handleLogout} title="Sign Out">
                <LogOut size={16} /> Sign Out
              </button>
            )}
            <button
              className="collapse-toggle"
              onClick={toggleCollapse}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle sidebar collapse"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </SidebarFooter>
        </Sidebar>

        <MainContent>
          <TopBar>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <MobileMenuToggle
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                aria-label="Open admin menu"
              >
                <MenuIcon size={22} color="#1f1f1f" />
              </MobileMenuToggle>
              <div className="breadcrumb">
                <span className="brand-crumbs">
                  <span>Floksy Jewel</span>
                  <span className="sep"> / </span>
                  <span>Admin</span>
                  <span className="sep"> / </span>
                </span>
                <span className="active-page">{getPageTitle()}</span>
              </div>
            </div>

            <TopBarRight>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#19202a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34a853', flexShrink: 0 }} />
                <span className="user-email-text">{user?.email || 'Admin'}</span>
                <span className="user-role-badge" style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#faf5eb', border: '1px solid #c9a45c', color: '#c9a45c', borderRadius: 4, fontWeight: 700 }}>
                  {user?.role || 'SUPER_ADMIN'}
                </span>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="view-storefront-btn"
                style={{
                  fontSize: '0.8rem',
                  color: '#19202a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  textDecoration: 'none',
                  fontWeight: 600,
                  padding: '6px 14px',
                  background: '#ffffff',
                  border: '1px solid #d9d3c7',
                  borderRadius: 4,
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Eye size={14} color="#c9a45c" /> <span>View Storefront</span>
              </a>
            </TopBarRight>
          </TopBar>

          <PageContainer>
            <Outlet />
          </PageContainer>
        </MainContent>
      </AdminWrapper>
    </ToastProvider>
  );
};
