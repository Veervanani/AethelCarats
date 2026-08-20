import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { CustomRequest } from '../../types';
import {
  AdminPageHeader,
  AdminTableContainer,
  AdminTable,
  AdminSelect,
} from '../../components/admin/AdminUI';

export const AdminCustomRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    setLoading(true);
    api
      .getCustomRequests()
      .then(setRequests)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await api.updateCustomRequestStatus(id, { status: newStatus, note: `Status set to ${newStatus}` });
    fetchRequests();
  };

  return (
    <div>
      <AdminPageHeader
        title="Custom Requests & CAD"
        description="Bespoke jewelry commissions, 3D CAD workflow statuses, client budgets, and design specifications."
      />

      <AdminTableContainer>
        <AdminTable>
          <thead>
            <tr>
              <th>Request #</th>
              <th>Client Name & Email</th>
              <th>WhatsApp</th>
              <th>Type</th>
              <th>Metal</th>
              <th>Budget</th>
              <th>CAD Workflow Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  Loading custom requests...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: '#77736c' }}>
                  No custom commissions or CAD requests recorded.
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.requestNumber}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{r.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#77736c' }}>{r.email}</div>
                  </td>
                  <td>{r.whatsapp || '—'}</td>
                  <td>{r.jewelleryType}</td>
                  <td>{r.metal}</td>
                  <td style={{ fontWeight: 600 }}>{r.budget}</td>
                  <td style={{ width: 170 }}>
                    <AdminSelect
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                    >
                      <option value="NEW">New</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="CAD_PREPARATION">CAD Preparation</option>
                      <option value="CAD_SENT">CAD Sent</option>
                      <option value="CAD_APPROVED">CAD Approved</option>
                      <option value="MANUFACTURING">Manufacturing</option>
                      <option value="QUALITY_CHECK">Quality Check</option>
                      <option value="READY">Ready</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="COMPLETED">Completed</option>
                    </AdminSelect>
                  </td>
                  <td style={{ color: '#55524d', maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.description || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </AdminTable>
      </AdminTableContainer>
    </div>
  );
};
