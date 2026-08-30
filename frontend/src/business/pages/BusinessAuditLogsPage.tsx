import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { History, Search, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  scrollbar-width: thin;
`;

const Table = styled.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #0d1319;
    color: #ffffff;
    font-weight: 600;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    vertical-align: middle;
  }

  tr:hover td {
    background: #f8fafc;
  }
`;

export const BusinessAuditLogsPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    businessApi
      .getAuditLogs()
      .then((res) => setLogs(res.logs || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '540px', margin: '40px auto', padding: '36px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}>
        <ShieldAlert size={42} color="#dc2626" style={{ marginBottom: 12 }} />
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>403 — Restricted Area</h2>
        <p style={{ color: '#64748b', fontSize: '0.86rem', lineHeight: '1.5', margin: 0 }}>
          Activity Audit Trail inspection is reserved for Administrators. Your account ({user?.email}) with role <strong>{user?.role}</strong> is not authorized to view system logs.
        </p>
      </div>
    );
  }


  return (
    <div>
      <PageHeader>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Business Activity Audit Trail</h1>
        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
          Immutable logs tracking employee modifications, attendance adjustments, sales creations, and payouts
        </p>
      </PageHeader>

      <TableContainer>
        <Table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Authorized User</th>
            <th>Module</th>
            <th>Action</th>
            <th>Details / Payload</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td style={{ color: '#64748b', fontSize: '0.75rem' }}>{new Date(l.createdAt).toLocaleString()}</td>
              <td style={{ fontWeight: 600 }}>{l.user?.name || l.user?.email || 'SYSTEM'}</td>
              <td>{l.object || 'Business Hub'}</td>
              <td>
                <span style={{ fontSize: '0.72rem', padding: '2px 6px', background: '#f1f5f9', borderRadius: 4, fontWeight: 700 }}>
                  {l.action}
                </span>
              </td>
              <td style={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {l.newValue || l.oldValue || '-'}
              </td>
            </tr>
          ))}
          {logs.length === 0 && !loading && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No audit logs recorded yet.
              </td>
            </tr>
          )}
        </tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

