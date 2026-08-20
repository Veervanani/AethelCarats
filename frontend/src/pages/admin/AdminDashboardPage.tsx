import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Gem,
  Package,
  Palette,
  TrendingUp,
  ArrowRight,
  FileSpreadsheet,
  Plus,
  ShoppingCart,
  DollarSign,
  Eye,
} from 'lucide-react';
import { api } from '../../services/api';
import { financialApi } from '../../services/financialApi';
import { PRIVATE_ADMIN_PATH } from '../../App';
import {
  AdminPageHeader,
  AdminCard,
  AdminCardHeader,
  AdminButton,
  AdminTableContainer,
  AdminTable,
  AdminBadge,
} from '../../components/admin/AdminUI';

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
  border: 1px solid #e6e1d7;
  border-radius: 8px;
  padding: 24px 26px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #c9a45c;
    box-shadow: 0 12px 28px rgba(201, 164, 92, 0.12);
  }

  .icon-box {
    width: 52px;
    height: 52px;
    border-radius: 8px;
    background-color: #faf5eb;
    color: #c9a45c;
    border: 1px solid #e6e1d7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .title {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    color: #77736c;
    margin-bottom: 6px;
  }

  .val {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: #1f1f1f;
    line-height: 1;
  }
`;

const toBool = (val: any): boolean => {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val === 1;
  if (typeof val === 'string') {
    const s = val.trim().toLowerCase();
    return s === 'true' || s === '1' || s === 'on';
  }
  return false;
};

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    diamondsTotal: 0,
    productsTotal: 0,
    customTotal: 0,
    ordersTotal: 0,
    ordersRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [storeStatus, setStoreStatus] = useState<any>(null);

  useEffect(() => {
    api
      .getDiamonds({ limit: 1 })
      .then((d) => setMetrics((m) => ({ ...m, diamondsTotal: d?.pagination?.total || 0 })))
      .catch(console.error);

    api
      .getProducts({ limit: 1, includeDrafts: 'true', status: 'ALL' })
      .then((p) => setMetrics((m) => ({ ...m, productsTotal: p?.pagination?.total || 0 })))
      .catch(console.error);

    api
      .getCustomRequests()
      .then((c) => setMetrics((m) => ({ ...m, customTotal: c?.length || 0 })))
      .catch(console.error);

    financialApi
      .getOrders()
      .then((ordersList) => {
        if (Array.isArray(ordersList)) {
          setRecentOrders(ordersList.slice(0, 5));
          const rev = ordersList.reduce((acc: number, o: any) => acc + (o.totalAmount || o.finalOrderTotal || 0), 0);
          setMetrics((m) => ({ ...m, ordersTotal: ordersList.length, ordersRevenue: rev }));
        }
      })
      .catch(console.error);

    api.getAdminLogs().then(setLogs).catch(console.error);
    api.getHolidayModeStatus().then(setStoreStatus).catch(console.error);
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Real-time operations overview, inventory counts, bespoke requests, and security audit tracking."
        actions={
          <>
            <AdminButton
              $variant="gold"
              onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products/bulk-upload`)}
              icon={<FileSpreadsheet size={14} />}
            >
              Bulk Excel Upload
            </AdminButton>
            <AdminButton
              $variant="primary"
              onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/products/new`)}
              icon={<Plus size={14} />}
            >
              Add New Product
            </AdminButton>
          </>
        }
      />

      {toBool(storeStatus?.active ?? storeStatus?.isHolidayModeActive ?? storeStatus?.holiday_mode_enabled ?? storeStatus?.manualOn) && (
        <div
          style={{
            background: '#fff5f5',
            border: '1px solid #feb2b2',
            padding: '16px 20px',
            borderRadius: 8,
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: '#9b2c2c', fontSize: '0.95rem', fontWeight: 700 }}>
              HOLIDAY MODE ACTIVE — CHECKOUT DISABLED
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#666' }}>
              Customer online checkout is currently paused. Storefront browsing remains live.
            </p>
          </div>
          <AdminButton
            $variant="primary"
            $size="sm"
            onClick={() => navigate(`${PRIVATE_ADMIN_PATH}/holiday-mode`)}
          >
            Manage Status
          </AdminButton>
        </div>
      )}

      <MetricsGrid>
        <MetricCard>
          <div className="icon-box">
            <ShoppingCart size={22} />
          </div>
          <div>
            <div className="title">Client Orders</div>
            <div className="val">{metrics.ordersTotal}</div>
          </div>
        </MetricCard>

        <MetricCard>
          <div className="icon-box">
            <DollarSign size={22} />
          </div>
          <div>
            <div className="title">Gross Volume</div>
            <div className="val">${metrics.ordersRevenue.toLocaleString()}</div>
          </div>
        </MetricCard>

        <MetricCard>
          <div className="icon-box">
            <Gem size={22} />
          </div>
          <div>
            <div className="title">Loose Diamonds</div>
            <div className="val">{metrics.diamondsTotal.toLocaleString()}</div>
          </div>
        </MetricCard>

        <MetricCard>
          <div className="icon-box">
            <Package size={22} />
          </div>
          <div>
            <div className="title">Catalog Products</div>
            <div className="val">{metrics.productsTotal}</div>
          </div>
        </MetricCard>
      </MetricsGrid>

      {/* Recent Client Orders */}
      <AdminCard style={{ marginBottom: 28 }}>
        <AdminCardHeader>
          <h3>RECENT CLIENT ORDERS</h3>
          <Link
            to={`${PRIVATE_ADMIN_PATH}/orders`}
            style={{ fontSize: '0.82rem', color: '#c9a45c', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', flexShrink: 0, alignItems: 'center', gap: 4 }}
          >
            Manage All Orders <ArrowRight size={14} />
          </Link>
        </AdminCardHeader>

        <AdminTableContainer>
          <AdminTable>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Client Name</th>
                <th>Client Email</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#777' }}>
                    No checkout orders registered yet. New orders will appear here automatically.
                  </td>
                </tr>
              ) : (
                recentOrders.map((ord: any) => (
                  <tr key={ord.id}>
                    <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>{ord.orderNumber}</td>
                    <td>{ord.customerName}</td>
                    <td style={{ color: '#777' }}>{ord.customerEmail}</td>
                    <td>{new Date(ord.createdAt || ord.orderDate).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 700, color: '#c9a45c' }}>${(ord.totalAmount || ord.finalOrderTotal || 0).toLocaleString()}</td>
                    <td>
                      <AdminBadge $variant={ord.orderStatus === 'DELIVERED' ? 'published' : ord.orderStatus === 'CONFIRMED' ? 'active' : 'pending'}>
                        {ord.orderStatus || 'CONFIRMED'}
                      </AdminBadge>
                    </td>
                    <td>
                      <Link
                        to={`${PRIVATE_ADMIN_PATH}/orders/${ord.id}`}
                        style={{ color: '#1f1f1f', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}
                      >
                        <Eye size={14} /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </AdminTable>
        </AdminTableContainer>
      </AdminCard>

      <AdminCard>
        <AdminCardHeader>
          <h3>RECENT AUDIT ACTIVITY LOGS</h3>
          <Link
            to={`${PRIVATE_ADMIN_PATH}/activity-logs`}
            style={{ fontSize: '0.82rem', color: '#c9a45c', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            View All Logs <ArrowRight size={14} />
          </Link>
        </AdminCardHeader>

        <AdminTableContainer>
          <AdminTable>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Admin User</th>
                <th>Action</th>
                <th>Module</th>
                <th>Audit Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 10).map((log) => (
                <tr key={log.id}>
                  <td style={{ color: '#77736c', fontSize: '0.82rem' }}>{new Date(log.createdAt).toLocaleString()}</td>
                  <td style={{ fontWeight: 600, color: '#1f1f1f' }}>
                    {log.user?.name || log.user?.email || 'Admin'}
                  </td>
                  <td>
                    <AdminBadge $variant="gold">{log.action}</AdminBadge>
                  </td>
                  <td>{log.object}</td>
                  <td style={{ color: '#55524d' }}>{log.newValue || log.oldValue || '-'}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 32, color: '#77736c' }}>
                    No audit activity logs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </AdminTable>
        </AdminTableContainer>
      </AdminCard>
    </div>
  );
};
