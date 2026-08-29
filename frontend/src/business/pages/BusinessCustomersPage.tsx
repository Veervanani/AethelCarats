import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { businessApi } from '../services/businessApi';
import { BusinessCustomer, Employee } from '../types';
import { Users, UserPlus, Search, Filter, Trash2, Check, Plus, Eye, ShoppingBag, DollarSign, TrendingUp, Calendar, ExternalLink, Package, X, ArrowUpRight } from 'lucide-react';

const PRIVATE_BUSINESS_PATH = '/flk-business-vault-8R2Lp9Kx7Qm4Nw6T';

const CustomCheckbox = styled.label<{ $checked?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({ $checked }) => ($checked ? '#0d1319' : '#cbd5e1')};
  background: ${({ $checked }) => ($checked ? '#0d1319' : '#ffffff')};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  vertical-align: middle;

  &:hover {
    border-color: #0d1319;
    box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.12);
  }

  input {
    display: none;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 18px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  th {
    background: #f8fafc;
    color: #475569;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.82rem;
    color: #1e293b;
    vertical-align: middle;
  }

  tr:hover td {
    background: #f8fafc;
  }
`;

export const BusinessCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<BusinessCustomer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Create Customer Modal State
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [assignedEmpId, setAssignedEmpId] = useState('');
  const [notes, setNotes] = useState('');

  // Customer Orders Modal State
  const [selectedCustomerForOrders, setSelectedCustomerForOrders] = useState<any | null>(null);
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const [cRes, empRes] = await Promise.all([
        businessApi.getCustomers({ search }),
        businessApi.getEmployees({ status: 'ACTIVE' }),
      ]);
      const rawCustomers = Array.isArray(cRes) ? cRes : ((cRes as any)?.customers || []);
      const rawEmployees = Array.isArray(empRes) ? empRes : ((empRes as any)?.employees || []);
      setCustomers(rawCustomers);
      setEmployees(rawEmployees);
      setSelectedIds(new Set());
    } catch (e) {
      console.error(e);
      setCustomers([]);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  const handleOpenCustomerOrders = async (cust: any) => {
    setSelectedCustomerForOrders(cust);
    setLoadingOrders(true);
    setOrderSearch('');
    try {
      const res = await businessApi.getCustomerOrders(cust.id || cust.name);
      setCustomerOrders(res.orders || []);
    } catch (err) {
      console.error('Failed to fetch customer orders', err);
      try {
        const sRes = await businessApi.getSales({ search: cust.name, limit: 100 });
        const list = Array.isArray(sRes) ? sRes : ((sRes as any)?.sales || []);
        setCustomerOrders(list.filter((s: any) => (s.customerName || '').toLowerCase().trim() === (cust.name || '').toLowerCase().trim()));
      } catch (e2) {
        setCustomerOrders([]);
      }
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSelectAll = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIds.size === customers.length && customers.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(customers.map((c) => c.id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleDeleteSingle = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete customer "${name}"?`)) return;
    try {
      await businessApi.deleteCustomer(id);
      fetchCustomers();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} selected clients?`)) return;
    try {
      await businessApi.deleteCustomersBatch(Array.from(selectedIds));
      fetchCustomers();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Batch delete failed');
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('⚠️ WARNING: Are you sure you want to permanently delete ALL client records? This action cannot be undone.')) return;
    try {
      await businessApi.deleteAllCustomers();
      fetchCustomers();
      alert('✅ All clients have been deleted successfully.');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete all clients');
    }
  };

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await businessApi.createCustomer({
        name,
        email,
        phone,
        country,
        company,
        assignedEmployeeId: assignedEmpId || undefined,
        notes,
      });
      setShowModal(false);
      setName('');
      setEmail('');
      setPhone('');
      fetchCustomers();
      alert('✅ Customer registered');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Creation failed');
    }
  };

  const filteredOrders = customerOrders.filter((o) => {
    if (!orderSearch) return true;
    const q = orderSearch.toLowerCase();
    return (
      (o.invoiceNo || '').toLowerCase().includes(q) ||
      (o.shape || '').toLowerCase().includes(q) ||
      (o.productDescription || '').toLowerCase().includes(q) ||
      (o.certificateNo || '').toLowerCase().includes(q) ||
      (o.trackingNumber || '').toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Client CRM & Accounts</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Private customer directory, transaction volumes, and sales representative assignments
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {selectedIds.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              style={{
                padding: '8px 14px',
                background: '#fff1f2',
                color: '#e11d48',
                border: '1px solid #fecdd3',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Delete Selected ({selectedIds.size})
            </button>
          )}

          <button
            onClick={handleDeleteAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: '#fff1f2',
              color: '#e11d48',
              border: '1px solid #fecdd3',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={15} /> Delete All Clients
          </button>

          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: '#0d1319',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            <Plus size={16} /> Add Client
          </button>
        </div>
      </PageHeader>

      <ControlBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, width: 320 }}>
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search by client name, country, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.82rem', width: '100%' }}
          />
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Showing {customers.length} clients</div>
      </ControlBar>

      <Table>
        <thead>
          <tr>
            <th style={{ width: 36, textAlign: 'center' }}>
              <CustomCheckbox
                $checked={customers.length > 0 && selectedIds.size === customers.length}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectAll();
                }}
                title="Select All Clients"
              >
                <input
                  type="checkbox"
                  checked={customers.length > 0 && selectedIds.size === customers.length}
                  readOnly
                />
                {customers.length > 0 && selectedIds.size === customers.length && <Check size={11} strokeWidth={3} />}
              </CustomCheckbox>
            </th>
            <th>Client Name</th>
            <th>Country</th>
            <th>Contact Details</th>
            <th>Assigned Staff</th>
            <th>Total Invoiced Deals</th>
            <th>Lifetime Volume</th>
            <th>Net Profit</th>
            <th>Last Sale Date</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => {
            const deals = c._count?.internalSales ?? (c as any).totalInvoicedDeals ?? (c as any).totalOrders ?? 0;
            const cName = c.name || (c as any).clientName || (c as any).customerName || 'Client';
            return (
              <tr key={c.id}>
                <td style={{ textAlign: 'center' }}>
                  <CustomCheckbox
                    $checked={selectedIds.has(c.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleSelect(c.id);
                    }}
                    title={`Select client ${cName}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.has(c.id)}
                      readOnly
                    />
                    {selectedIds.has(c.id) && <Check size={11} strokeWidth={3} />}
                  </CustomCheckbox>
                </td>
                <td style={{ fontWeight: 600 }}>
                  <span
                    onClick={() => handleOpenCustomerOrders(c)}
                    style={{ color: '#0f172a', cursor: 'pointer' }}
                    title={`Click to view profile and orders for ${cName}`}
                  >
                    {cName}
                  </span>
                </td>
                <td>{c.country || (c as any).customerCountry || '-'}</td>
                <td>
                  <div>{c.email && c.email !== '-' ? c.email : (c.phone || '-')}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.company || (c as any).companyName || ''}</div>
                </td>
                <td>{(c.assignedEmployee as any)?.fullName || (c.assignedEmployee as any)?.name || (c as any).assignedStaff || 'Sales Team'}</td>
                <td>
                  <button
                    onClick={() => handleOpenCustomerOrders(c)}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 16,
                      padding: '3px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#2563eb',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                    title="Click to view all orders"
                  >
                    <ShoppingBag size={12} /> {deals} {deals === 1 ? 'deal' : 'deals'}
                  </button>
                </td>
                <td style={{ fontWeight: 700 }}>${Number((c as any).lifetimeVolume ?? c.totalSales ?? 0).toLocaleString()}</td>
                <td style={{ color: '#16a34a', fontWeight: 600 }}>${Number((c as any).netProfit ?? c.totalNetProfit ?? 0).toLocaleString()}</td>
                <td>{c.lastSaleDate ? new Date(c.lastSaleDate).toLocaleDateString() : '-'}</td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
                    <button
                      onClick={() => handleOpenCustomerOrders(c)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        color: '#475569',
                        borderRadius: 6,
                        cursor: 'pointer',
                      }}
                      title={`View all orders of ${cName}`}
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteSingle(c.id, cName)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        background: '#fff1f2',
                        border: '1px solid #fecdd3',
                        color: '#e11d48',
                        borderRadius: 6,
                        cursor: 'pointer',
                      }}
                      title="Delete Client"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {customers.length === 0 && !loading && (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Customer Orders & Profile Modal */}
      {selectedCustomerForOrders && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
          onClick={() => setSelectedCustomerForOrders(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 14,
              width: '100%',
              maxWidth: 960,
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f8fafc',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: '#0d1319',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}
                >
                  {(selectedCustomerForOrders.name || 'C').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {selectedCustomerForOrders.name || selectedCustomerForOrders.clientName || 'Client Profile'}
                    </h2>
                    {selectedCustomerForOrders.country && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          background: '#eff6ff',
                          color: '#1d4ed8',
                          border: '1px solid #bfdbfe',
                          borderRadius: 6,
                        }}
                      >
                        {selectedCustomerForOrders.country}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 2, display: 'flex', gap: 12 }}>
                    <span>Rep: <strong>{selectedCustomerForOrders.assignedStaff || 'Sales Team'}</strong></span>
                    {selectedCustomerForOrders.email && selectedCustomerForOrders.email !== '-' && (
                      <span>Email: {selectedCustomerForOrders.email}</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomerForOrders(null)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: 6,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>
              {/* Summary KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Invoiced Orders</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
                    {customerOrders.length} Deals
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Lifetime Revenue</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
                    ${customerOrders.reduce((sum, o) => sum + (Number(o.finalSaleAmount) || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Net Profit</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#16a34a', marginTop: 4 }}>
                    ${customerOrders.reduce((sum, o) => sum + (Number(o.netProfit) || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Average Deal Size</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
                    ${customerOrders.length > 0 ? (customerOrders.reduce((sum, o) => sum + (Number(o.finalSaleAmount) || 0), 0) / customerOrders.length).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                  </div>
                </div>
              </div>

              {/* Order History Table */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Order Transaction History ({customerOrders.length})
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: 6, width: 240 }}>
                  <Search size={14} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search invoices or shapes..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.78rem', width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                      <th style={{ padding: '10px 12px' }}>Invoice No</th>
                      <th style={{ padding: '10px 12px' }}>Date</th>
                      <th style={{ padding: '10px 12px' }}>Product Specs</th>
                      <th style={{ padding: '10px 12px' }}>Carat</th>
                      <th style={{ padding: '10px 12px' }}>Cert No</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Final Amount</th>
                      <th style={{ padding: '10px 12px', textAlign: 'right' }}>Net Profit</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center' }}>Payment</th>
                      <th style={{ padding: '10px 12px', textAlign: 'center' }}>Status</th>
                      <th style={{ padding: '10px 12px' }}>Salesperson</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 700 }}>
                          <Link
                            to={`${PRIVATE_BUSINESS_PATH}/sales/${o.id}`}
                            target="_blank"
                            style={{ color: '#0d1319', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                          >
                            {o.invoiceNo} <ExternalLink size={11} color="#64748b" />
                          </Link>
                        </td>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>
                          {o.saleDate ? new Date(o.saleDate).toLocaleDateString() : '-'}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{o.shape || o.productType}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{o.diamondColor ? `${o.diamondColor} / ${o.clarity || ''} ${o.cut || ''}` : (o.productDescription || '-')}</div>
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 600 }}>{o.caratWeight ? `${o.caratWeight} ct` : '-'}</td>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{o.certificateNo || '-'}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                          ${Number(o.finalSaleAmount || o.sellingPrice || 0).toLocaleString()}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>
                          ${Number(o.netProfit || 0).toLocaleString()}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: o.paymentStatus === 'Paid' ? '#ebfbee' : '#fff7ed', color: o.paymentStatus === 'Paid' ? '#2b8a3e' : '#c2410c' }}>
                            {o.paymentStatus || 'Paid'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: '#eff6ff', color: '#1d4ed8' }}>
                            {o.orderStatus || 'Delivered'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: '#64748b' }}>{o.salesPersonName || '-'}</td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && !loadingOrders && (
                      <tr>
                        <td colSpan={10} style={{ padding: 24, textAlign: 'center', color: '#94a3b8' }}>
                          No orders found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '14px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedCustomerForOrders(null)}
                style={{ padding: '8px 20px', background: '#0d1319', color: '#ffffff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(3px)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              width: '100%',
              maxWidth: 480,
              padding: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 16 }}>Register Client</h2>

            <form onSubmit={handleCreateCustomer}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Client Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Assigned Sales Person</label>
                  <select
                    value={assignedEmpId}
                    onChange={(e) => setAssignedEmpId(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                  >
                    <option value="">Unassigned</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.fullName || (e as any).name} ({e.employeeCode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 16px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 20px', background: '#0d1319', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
