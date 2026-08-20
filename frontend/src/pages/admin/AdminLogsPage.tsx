import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  AdminPageHeader,
  AdminTableContainer,
  AdminTable,
  AdminBadge,
} from '../../components/admin/AdminUI';

export const AdminLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getAdminLogs()
      .then(setLogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Activity Audit Logs"
        description="Complete system activity, admin login history, role changes, and catalog operation logs."
      />

      <AdminTableContainer>
        <AdminTable>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Admin User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading audit logs...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No activity audit logs recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td style={{ color: '#77736c', fontSize: '0.82rem' }}>{new Date(log.createdAt).toLocaleString()}</td>
                  <td style={{ fontWeight: 600, color: '#1f1f1f' }}>{log.user?.name || log.user?.email || 'Admin'}</td>
                  <td>
                    <AdminBadge $variant="gold">{log.action}</AdminBadge>
                  </td>
                  <td>{log.object}</td>
                  <td style={{ color: '#55524d' }}>{log.newValue || log.oldValue || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </AdminTable>
      </AdminTableContainer>
    </div>
  );
};
