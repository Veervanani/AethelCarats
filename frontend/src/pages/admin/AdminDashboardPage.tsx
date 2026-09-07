import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Gem,
  Package,
  TrendingUp,
  ArrowRight,
  Plus,
  ShoppingCart,
  DollarSign,
  Eye,
  Globe,
  Users,
  Clock,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { api } from '../../services/api';
import { financialApi } from '../../services/financialApi';
import { PRIVATE_ADMIN_PATH } from '../../App';
import {
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminTableContainer,
  AdminTable,
  AdminBadge,
} from '../../components/admin/AdminUI';

const HeroWelcomeCard = styled.div`
  background: linear-gradient(135deg, #13181e 0%, #1a232c 100%);
  border: 1px solid rgba(201, 164, 92, 0.35);
  border-radius: 10px;
  padding: 32px 36px;
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 24px;
  }

  .welcome-texts {
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2.2rem;
      font-weight: 700;
      color: #fffdfa;
      letter-spacing: 0.03em;
      margin: 0 0 8px;
    }

    p {
      color: #b5afa4;
      font-size: 0.92rem;
      margin: 0;
      line-height: 1.5;
    }
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 28px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 24px 26px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.025);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #c9a45c;
    box-shadow: 0 12px 28px rgba(201, 164, 92, 0.12);
  }

  .icon-box {
    width: 54px;
    height: 54px;
    border-radius: 10px;
    background: #faf8f5;
    color: #c9a45c;
    border: 1px solid #e8e3d9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .title {
    font-size: 0.74rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
    color: #77736c;
    margin-bottom: 6px;
  }

  .val {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: #19202a;
    line-height: 1;
  }
`;

const QuickModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 28px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ModuleCard = styled(Link)`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 8px;
  padding: 24px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #19202a;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  .mod-header {
    display: flex;
    align-items: center;
    gap: 14px;

    .mod-icon {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      background: #faf8f5;
      color: #c9a45c;
      border: 1px solid #e8e3d9;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h4 {
      margin: 0 0 4px;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #19202a;
    }

    p {
      margin: 0;
      font-size: 0.82rem;
      color: #77736c;
    }
  }

  .mod-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid #f2ede4;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #8e6c27;
  }
`;

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    products: 0,
    diamonds: 0,
    categories: 0,
    totalRevenue: 0,
    totalOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [prods, cats, diaRes, logRes, ordersRes] = await Promise.all([
        api.getProducts({ limit: 1 }).catch(() => ({ pagination: { total: 0 } })),
        api.getCategories().catch(() => []),
        api.getDiamonds({ limit: 1 }).catch(() => ({ pagination: { total: 0 } })),
        api.getAdminLogs().catch(() => []),
        financialApi.getOrders().catch(() => []),
      ]);

      const ordersList = Array.isArray(ordersRes) ? ordersRes : (ordersRes?.orders || []);
      const totalRev = ordersList.reduce((acc: number, curr: any) => acc + (Number(curr.totalAmount || curr.finalOrderTotal) || 0), 0);

      const prodsAny = prods as any;
      const diaAny = diaRes as any;
      const logAny = logRes as any;

      setMetrics({
        products: prodsAny?.pagination?.total || prodsAny?.total || (Array.isArray(prodsAny?.products) ? prodsAny.products.length : 0),
        diamonds: diaAny?.pagination?.total || diaAny?.total || (Array.isArray(diaAny?.diamonds) ? diaAny.diamonds.length : 0),
        categories: Array.isArray(cats) ? cats.length : 0,
        totalRevenue: totalRev,
        totalOrders: ordersList.length,
      });

      setRecentOrders(ordersList.slice(0, 6));
      setLogs(Array.isArray(logAny) ? logAny.slice(0, 8) : (logAny?.logs || []).slice(0, 8));
    } catch (e) {
      console.error('Error fetching dashboard metrics:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto', paddingBottom: 60 }}>
      <HeroWelcomeCard>
        <div className="welcome-texts">
          <h1>Atelier Executive Management</h1>
          <p>Complete control center for fine jewelry catalog, diamond inventory, orders CRM, and storefront CMS.</p>
        </div>
        <div className="hero-actions">
          <AdminButton
            $variant="gold"
            onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products/new`)}
            icon={<Plus size={15} />}
          >
            + Add Product
          </AdminButton>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(201, 164, 92, 0.35)',
              borderRadius: 6,
              color: '#fdf9f0',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <Eye size={15} /> Storefront ↗
          </a>
        </div>
      </HeroWelcomeCard>

      <MetricsGrid>
        <MetricCard>
          <div className="icon-box"><Package size={24} /></div>
          <div>
            <div className="title">Jewelry Products</div>
            <div className="val">{metrics.products}</div>
          </div>
        </MetricCard>
        <MetricCard>
          <div className="icon-box"><Gem size={24} /></div>
          <div>
            <div className="title">Certified Diamonds</div>
            <div className="val">{metrics.diamonds}</div>
          </div>
        </MetricCard>
        <MetricCard>
          <div className="icon-box"><ShoppingCart size={24} /></div>
          <div>
            <div className="title">Total Orders</div>
            <div className="val">{metrics.totalOrders}</div>
          </div>
        </MetricCard>
        <MetricCard>
          <div className="icon-box"><DollarSign size={24} /></div>
          <div>
            <div className="title">Gross Sales Volume</div>
            <div className="val">${metrics.totalRevenue.toLocaleString()}</div>
          </div>
        </MetricCard>
      </MetricsGrid>

      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.45rem', fontWeight: 600, color: '#19202a', margin: '0 0 16px' }}>
          Atelier Control Modules
        </h3>
        <QuickModulesGrid>
          <ModuleCard to={`${PRIVATE_ADMIN_PATH}/products`}>
            <div className="mod-header">
              <div className="mod-icon"><Package size={20} /></div>
              <div>
                <h4>Jewelry Catalog</h4>
                <p>Manage all jewelry pieces, metal purity, and master pricing database.</p>
              </div>
            </div>
            <div className="mod-link"><span>Manage Catalog</span> <ArrowRight size={14} /></div>
          </ModuleCard>
          <ModuleCard to={`${PRIVATE_ADMIN_PATH}/diamonds`}>
            <div className="mod-header">
              <div className="mod-icon"><Gem size={20} /></div>
              <div>
                <h4>Diamond Vault</h4>
                <p>Natural & lab-grown inventory, 4Cs matrix, and bulk Excel import.</p>
              </div>
            </div>
            <div className="mod-link"><span>Access Vault</span> <ArrowRight size={14} /></div>
          </ModuleCard>
          <ModuleCard to={`${PRIVATE_ADMIN_PATH}/pages`}>
            <div className="mod-header">
              <div className="mod-icon"><Globe size={20} /></div>
              <div>
                <h4>Storefront CMS</h4>
                <p>Edit site content, hero banners, pages, and SEO metadata manager.</p>
              </div>
            </div>
            <div className="mod-link"><span>Edit Website</span> <ArrowRight size={14} /></div>
          </ModuleCard>
        </QuickModulesGrid>
      </div>

      <AdminCard>
        <AdminCardHeader>
          <h3>RECENT CLIENT CHECKOUT ORDERS</h3>
          <Link to={`${PRIVATE_ADMIN_PATH}/orders`} style={{ fontSize: '0.82rem', color: '#c9a45c', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Manage All Orders <ArrowRight size={14} />
          </Link>
        </AdminCardHeader>
        <AdminTableContainer>
          <AdminTable>
            <thead>
              <tr><th>Order #</th><th>Client</th><th>Date</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentOrders.map((ord: any) => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: 700 }}>{ord.orderNumber || `#${ord.id.slice(0, 8)}`}</td>
                  <td>{ord.customerName || 'Private Client'}</td>
                  <td>{new Date(ord.createdAt || ord.orderDate).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 700 }}>${(ord.totalAmount || ord.finalOrderTotal || 0).toLocaleString()}</td>
                  <td><AdminBadge $variant={ord.orderStatus === 'DELIVERED' ? 'published' : 'active'}>{ord.orderStatus || 'CONFIRMED'}</AdminBadge></td>
                </tr>
              ))}
            </tbody>
          </AdminTable>
        </AdminTableContainer>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader>
          <h3>RECENT AUDIT ACTIVITY LOGS</h3>
          <Link to={`${PRIVATE_ADMIN_PATH}/activity-logs`} style={{ fontSize: '0.82rem', color: '#c9a45c', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            View All Logs <ArrowRight size={14} />
          </Link>
        </AdminCardHeader>
        <AdminTableContainer>
          <AdminTable>
            <thead>
              <tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th></tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td style={{ color: '#777' }}>{new Date(log.createdAt).toLocaleString()}</td>
                  <td style={{ fontWeight: 600 }}>{log.user?.name || 'Admin'}</td>
                  <td><AdminBadge $variant="gold">{log.action}</AdminBadge></td>
                  <td>{log.object}</td>
                </tr>
              ))}
            </tbody>
          </AdminTable>
        </AdminTableContainer>
      </AdminCard>
    </div>
  );
};
