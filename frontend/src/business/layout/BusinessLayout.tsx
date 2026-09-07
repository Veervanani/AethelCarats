import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PRIVATE_BUSINESS_PATH } from '../../App';
import { businessApi } from '../services/businessApi';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarCheck,
  FileSpreadsheet,
  BadgeDollarSign,
  DollarSign,
  Layers,
  Building2,
  Contact,
  FileText,
  UploadCloud,
  History,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  TrendingUp,
} from 'lucide-react';

const BusinessWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f7f9fc;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
`;

const Sidebar = styled.aside<{ $mobileOpen?: boolean; $collapsed?: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '76px' : '264px')};
  height: 100vh;
  background-color: #0d1319;
  color: #f1f4f8;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  z-index: 100;
  transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 264px;
    z-index: 10000;
    transform: ${({ $mobileOpen }) => ($mobileOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 6px 0 28px rgba(0, 0, 0, 0.5);
  }
`;

const SidebarOverlay = styled.div<{ $mobileOpen?: boolean }>`
  display: none;
  @media (max-width: 767px) {
    display: ${({ $mobileOpen }) => ($mobileOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(10, 15, 20, 0.75);
    backdrop-filter: blur(4px);
    z-index: 9999;
  }
`;

const SidebarHeader = styled.div<{ $collapsed?: boolean }>`
  padding: ${({ $collapsed }) => ($collapsed ? '20px 12px' : '22px 20px')};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .brand-badge {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: #0d1319;
    background: #e2b96f;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 4px;
  }
  .brand-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .brand-sub {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #8c9ba5;
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
  scrollbar-color: #232e3b #0d1319;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #232e3b;
    border-radius: 2px;
  }
`;

const NavGroupLabel = styled.div<{ $collapsed?: boolean }>`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #e2b96f;
  padding: 16px 20px 6px;
  white-space: nowrap;
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'block')};
`;

const NavLinkItem = styled(Link)<{ $active: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${({ $collapsed }) => ($collapsed ? '11px 0' : '9px 20px')};
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  font-size: 0.84rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? '#ffffff' : '#9bb0bf')};
  background-color: ${({ $active }) => ($active ? 'rgba(226, 185, 111, 0.16)' : 'transparent')};
  border-left: 3px solid ${({ $active }) => ($active ? '#e2b96f' : 'transparent')};
  transition: all 0.15s ease;
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
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'space-between')};

  .signout-btn {
    background: none;
    border: none;
    color: #9bb0bf;
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    transition: all 0.15s ease;

    &:hover {
      color: #ff6b6b;
      background: rgba(255, 107, 107, 0.1);
    }
  }

  .collapse-toggle {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2b96f;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
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
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f7f9fc;
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 90;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    padding: 8px 12px;

    .hub-subtitle {
      display: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: 1px solid #e2e8f0;
  padding: 6px;
  border-radius: 6px;
  color: #0f172a;
  cursor: pointer;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .user-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 8px;
    background: #f1f5f9;
    border-radius: 6px;
    font-size: 0.78rem;

    @media (max-width: 520px) {
      padding: 3px 6px;
      gap: 3px;
      font-size: 0.7rem;

      .user-name-text {
        display: none;
      }
    }
  }
`;

const ContentContainer = styled.div`
  padding: 20px 24px;
  flex: 1;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px 8px;
  }
`;


const CheckInButton = styled.button<{ $isCheckedIn?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: ${({ $isCheckedIn }) => ($isCheckedIn ? '#ebfbee' : '#f0f7ff')};
  color: ${({ $isCheckedIn }) => ($isCheckedIn ? '#2b8a3e' : '#1971c2')};
  border: 1px solid ${({ $isCheckedIn }) => ($isCheckedIn ? '#b2f2bb' : '#a5d8ff')};
  border-radius: 6px;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.7rem;
  }

  &:hover {
    filter: brightness(0.96);
  }
`;


export const BusinessLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('biz_sidebar_state') === 'true';
  });
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [loadingClock, setLoadingClock] = useState<boolean>(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('biz_sidebar_state', String(next));
      return next;
    });
  };

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isCurrent = (path: string) => location.pathname === path;

  const handleClockToggle = async () => {
    setLoadingClock(true);
    try {
      if (!isCheckedIn) {
        await businessApi.checkIn({ notes: 'Self Clock-In' });
        setIsCheckedIn(true);
        alert('✅ Checked in successfully!');
      } else {
        await businessApi.checkOut({ notes: 'Self Clock-Out' });
        setIsCheckedIn(false);
        alert('✅ Checked out successfully!');
      }
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Attendance action failed');
    } finally {
      setLoadingClock(false);
    }
  };

  const getPageTitle = () => {
    const p = location.pathname;
    if (p.includes('/dashboard')) return 'Executive Dashboard';
    if (p.includes('/employees/new')) return 'Register New Employee';
    if (p.includes('/employees/') && p.includes('/edit')) return 'Edit Employee';
    if (p.includes('/employees/')) return 'Employee Profile & KPI';
    if (p.includes('/employees')) return 'Employee Directory';
    if (p.includes('/attendance/report')) return 'Monthly Attendance Matrix';
    if (p.includes('/attendance')) return 'Daily Attendance Roster';
    if (p.includes('/sales/new')) return 'Create Internal Sale';
    if (p.includes('/sales/') && p.includes('/edit')) return 'Edit Sale Invoice';
    if (p.includes('/sales/')) return 'Sale Invoice Details';
    if (p.includes('/sales')) return 'Sales Management Tracker';
    if (p.includes('/commissions')) return 'Commission Approvals & Ledger';
    if (p.includes('/commission-plans')) return 'Commission Plans & Rules';
    if (p.includes('/targets')) return 'Sales Quota & Target Tracking';
    if (p.includes('/customers')) return 'Private Customer CRM';
    if (p.includes('/suppliers')) return 'Supplier & Vendor Directory';
    if (p.includes('/import')) return 'Historical Excel Migration';
    if (p.includes('/reports')) return 'Business & Profit Reports';
    if (p.includes('/audit-logs')) return 'Activity Audit Trail';
    if (p.includes('/settings')) return 'Business & Currency Settings';
    return 'Enterprise Operations Hub';
  };

  return (
    <BusinessWrapper>
      <SidebarOverlay $mobileOpen={isMobileOpen} onClick={() => setIsMobileOpen(false)} />
      <Sidebar $mobileOpen={isMobileOpen} $collapsed={isCollapsed}>
        <SidebarHeader $collapsed={isCollapsed}>
          <div>
            <span className="brand-badge">INTERNAL ERP</span>
            <div className="brand-title">{isCollapsed ? 'AURA' : 'AURA DIAMOND'}</div>
            {!isCollapsed && <span className="brand-sub">OPERATIONS HUB</span>}
          </div>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            style={{ display: isMobileOpen ? 'block' : 'none', background: 'none', border: 'none', color: '#fff' }}
          >
            <CloseIcon size={18} />
          </button>
        </SidebarHeader>

        <NavList>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/dashboard`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/dashboard`)} $collapsed={isCollapsed} title="Executive Dashboard">
            <LayoutDashboard size={18} /> <span className="nav-text">Executive Dashboard</span>
          </NavLinkItem>

          <NavGroupLabel $collapsed={isCollapsed}>HUMAN RESOURCES</NavGroupLabel>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/employees`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/employees`)} $collapsed={isCollapsed} title="Employees Directory">
            <Users size={18} /> <span className="nav-text">Employees Directory</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/employees/new`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/employees/new`)} $collapsed={isCollapsed} title="Add Employee">
            <UserPlus size={18} /> <span className="nav-text">Add Employee</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/attendance`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/attendance`)} $collapsed={isCollapsed} title="Attendance Roster">
            <CalendarCheck size={18} /> <span className="nav-text">Attendance Roster</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/attendance/report`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/attendance/report`)} $collapsed={isCollapsed} title="Monthly Attendance Report">
            <Clock size={18} /> <span className="nav-text">Monthly Attendance</span>
          </NavLinkItem>

          <NavGroupLabel $collapsed={isCollapsed}>SALES & COMMISSIONS</NavGroupLabel>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/sales`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/sales`) || location.pathname.startsWith(`${PRIVATE_BUSINESS_PATH}/sales/`)} $collapsed={isCollapsed} title="Sales Tracker">
            <FileSpreadsheet size={18} /> <span className="nav-text">Sales Tracker</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/sales/new`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/sales/new`)} $collapsed={isCollapsed} title="New Sale Invoice">
            <BadgeDollarSign size={18} /> <span className="nav-text">New Sale Invoice</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/commissions`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/commissions`)} $collapsed={isCollapsed} title="Commission Approvals">
            <DollarSign size={18} /> <span className="nav-text">Commission Approvals</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/commission-plans`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/commission-plans`)} $collapsed={isCollapsed} title="Commission Plans">
            <Layers size={18} /> <span className="nav-text">Commission Plans</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/targets`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/targets`)} $collapsed={isCollapsed} title="Sales Targets & Quotas">
            <TrendingUp size={18} /> <span className="nav-text">Sales Targets</span>
          </NavLinkItem>

          <NavGroupLabel $collapsed={isCollapsed}>CRM & VENDORS</NavGroupLabel>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/customers`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/customers`)} $collapsed={isCollapsed} title="Customers">
            <Contact size={18} /> <span className="nav-text">Customers</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/suppliers`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/suppliers`)} $collapsed={isCollapsed} title="Suppliers">
            <Building2 size={18} /> <span className="nav-text">Suppliers</span>
          </NavLinkItem>

          <NavGroupLabel $collapsed={isCollapsed}>ANALYTICS & TOOLS</NavGroupLabel>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/reports`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/reports`)} $collapsed={isCollapsed} title="Business Reports">
            <FileText size={18} /> <span className="nav-text">Business Reports</span>
          </NavLinkItem>
          <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/import`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/import`)} $collapsed={isCollapsed} title="Excel Migration Tool">
            <UploadCloud size={18} /> <span className="nav-text">Excel Sales Migration</span>
          </NavLinkItem>
          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
            <>
              <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/audit-logs`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/audit-logs`)} $collapsed={isCollapsed} title="Activity Audit Logs">
                <History size={18} /> <span className="nav-text">Activity Audit Logs</span>
              </NavLinkItem>
              <NavLinkItem to={`${PRIVATE_BUSINESS_PATH}/settings`} $active={isCurrent(`${PRIVATE_BUSINESS_PATH}/settings`)} $collapsed={isCollapsed} title="Settings">
                <Settings size={18} /> <span className="nav-text">Business Settings</span>
              </NavLinkItem>
            </>
          )}
        </NavList>

        <SidebarFooter $collapsed={isCollapsed}>
          {!isCollapsed && (
            <button className="signout-btn" onClick={() => logout('Logged out from Business Operations')} title="Sign Out">
              <LogOut size={16} /> Sign Out
            </button>
          )}
          <button
            className="collapse-toggle"
            onClick={toggleCollapse}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <TopBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MobileMenuButton
              type="button"
              onClick={() => setIsMobileOpen(true)}
              title="Open Navigation Menu"
            >
              <MenuIcon size={20} />
            </MobileMenuButton>
            <div>
              <div className="hub-subtitle" style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.04em' }}>
                AURA DIAMOND ATELIER BUSINESS HUB
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{getPageTitle()}</div>
            </div>
          </div>

          <TopBarActions>
            <CheckInButton $isCheckedIn={isCheckedIn} onClick={handleClockToggle} disabled={loadingClock}>
              <Clock size={14} />
              <span>{loadingClock ? '...' : isCheckedIn ? 'Clock Out' : 'Clock In'}</span>
            </CheckInButton>

            <div className="user-badge">
              <Briefcase size={14} color="#0f172a" />
              <span className="user-name-text" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>{user?.name || user?.email || 'Authorized User'}</span>
              <span style={{ fontSize: '0.68rem', padding: '2px 6px', background: '#e2b96f', color: '#0d1319', fontWeight: 700, borderRadius: 4 }}>
                {user?.role || 'STAFF'}
              </span>
            </div>
          </TopBarActions>
        </TopBar>

        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </MainContent>
    </BusinessWrapper>
  );
};
