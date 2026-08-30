import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { AttendanceRecord, Employee } from '../types';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Filter,
  Plus,
} from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  h1 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }

  p {
    font-size: 0.78rem;
    color: #64748b;
    margin: 3px 0 0 0;

    @media (max-width: 640px) {
      font-size: 0.72rem;
    }
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`;

const SummaryCard = styled.div<{ $color?: string }>`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({ $color }) => $color || '#0d1319'};
  border-radius: 8px;
  padding: 12px 14px;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 10px 12px;
  }

  .card-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .card-val {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 3px;
  }
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

  @media (max-width: 640px) {
    padding: 10px 12px;
    flex-direction: column;
    align-items: stretch;
  }
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
  min-width: 780px;
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
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


const StatusPill = styled.span<{ $status: string }>`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${({ $status }) => {
    switch ($status) {
      case 'PRESENT':
        return 'background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;';
      case 'ABSENT':
        return 'background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;';
      case 'HALF_DAY':
        return 'background: #fff9db; color: #f59f00; border: 1px solid #ffe066;';
      case 'LEAVE':
        return 'background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;';
      default:
        return 'background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;';
    }
  }}
`;

export const BusinessAttendancePage: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual modal fields
  const [manualEmpId, setManualEmpId] = useState('');
  const [manualStatus, setManualStatus] = useState('PRESENT');
  const [manualInTime, setManualInTime] = useState('09:00');
  const [manualOutTime, setManualOutTime] = useState('18:00');
  const [manualHours, setManualHours] = useState('9');
  const [manualLate, setManualLate] = useState(false);
  const [manualNotes, setManualNotes] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [sumRes, attRes, empRes] = await Promise.all([
        businessApi.getTodayAttendanceSummary(),
        businessApi.getAttendance({ date: selectedDate }),
        businessApi.getEmployees({ status: 'ACTIVE' }),
      ]);
      setSummary(sumRes);
      setRecords(attRes.records || (attRes as any).attendance || []);
      setEmployees(empRes.employees || []);
      if (empRes.employees && empRes.employees.length > 0 && !manualEmpId) {
        setManualEmpId(empRes.employees[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const handleManualSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const checkInDateTime = new Date(`${selectedDate}T${manualInTime}:00Z`);
      const checkOutDateTime = new Date(`${selectedDate}T${manualOutTime}:00Z`);
      await businessApi.manualAttendanceEntry({
        employeeId: manualEmpId,
        date: selectedDate,
        checkInTime: checkInDateTime,
        checkOutTime: checkOutDateTime,
        workingHours: Number(manualHours),
        status: manualStatus,
        lateStatus: manualLate,
        notes: manualNotes,
      });
      setShowManualModal(false);
      loadData();
      alert('✅ Manual entry saved');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to save');
    }
  };

  const quickMark = async (empId: string, status: string, isLate: boolean = false) => {
    try {
      await businessApi.manualAttendanceEntry({
        employeeId: empId,
        date: selectedDate,
        workingHours: status === 'PRESENT' ? 8 : status === 'HALF_DAY' ? 4 : 0,
        status,
        lateStatus: isLate,
        notes: `Quick-Marked as ${status}`,
      });
      await loadData();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to mark attendance');
    }
  };

  // Combine employees with attendance records for this date
  const employeeRows = employees.map((emp) => {
    const rec = records.find((r) => r.employeeId === emp.id || (r as any).employee?.id === emp.id);
    return {
      employee: emp,
      record: rec,
    };
  });

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Attendance Roster</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Daily check-in logs, punctuality tracking, and 1-click attendance marking
          </p>
        </div>

        <button
          onClick={() => setShowManualModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 18px',
            background: '#0d1319',
            color: '#ffffff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: '0.82rem',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> Record Custom Time
        </button>
      </PageHeader>

      <SummaryGrid>
        <SummaryCard $color="#2563eb">
          <div className="card-label">Active Staff</div>
          <div className="card-val">{summary?.totalEmployees || employees.length || 3}</div>
        </SummaryCard>

        <SummaryCard $color="#16a34a">
          <div className="card-label">Present Today</div>
          <div className="card-val" style={{ color: '#16a34a' }}>
            {summary?.present || 0}
          </div>
        </SummaryCard>

        <SummaryCard $color="#d97706">
          <div className="card-label">Late Arrivals</div>
          <div className="card-val" style={{ color: '#d97706' }}>
            {summary?.late || 0}
          </div>
        </SummaryCard>

        <SummaryCard $color="#dc2626">
          <div className="card-label">Absent</div>
          <div className="card-val" style={{ color: '#dc2626' }}>
            {summary?.absent || 0}
          </div>
        </SummaryCard>

        <SummaryCard $color="#7c3aed">
          <div className="card-label">On Leave</div>
          <div className="card-val" style={{ color: '#7c3aed' }}>
            {summary?.onLeave || summary?.leave || 0}
          </div>
        </SummaryCard>
      </SummaryGrid>

      <ControlBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>Select Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
          />
        </div>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          Viewing roster for <strong>{new Date(selectedDate).toDateString()}</strong>
        </div>
      </ControlBar>

      <TableContainer>
        <Table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role / Designation</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Hours</th>
            <th>Current Status</th>
            <th>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeRows.map(({ employee, record }) => (
            <tr key={employee.id}>
              <td style={{ fontWeight: 600 }}>
                <div>{(employee as any).name || employee.fullName || 'Staff Member'}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{employee.employeeCode} • {employee.email}</div>
              </td>
              <td>
                <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>{employee.designation || 'Sales Executive'}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{employee.role || 'SALES_EMPLOYEE'}</div>
              </td>
              <td>{record?.checkInTime ? new Date(record.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ((record as any)?.checkIn ? new Date((record as any).checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-')}</td>
              <td>{record?.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ((record as any)?.checkOut ? new Date((record as any).checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-')}</td>
              <td style={{ fontWeight: 600 }}>{record?.workingHours || (record as any)?.hoursWorked || 0} hrs</td>
              <td>
                {record ? (
                  <StatusPill $status={record.status}>{record.status}</StatusPill>
                ) : (
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                    Not Marked
                  </span>
                )}
              </td>
              <td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => quickMark(employee.id, 'PRESENT', false)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: '#ebfbee',
                      color: '#2b8a3e',
                      border: '1px solid #b2f2bb',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                    title="Mark Present (On Time)"
                  >
                    ✓ Present
                  </button>

                  <button
                    onClick={() => quickMark(employee.id, 'PRESENT', true)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: '#fff9db',
                      color: '#f59f00',
                      border: '1px solid #ffe066',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                    title="Mark Late"
                  >
                    Late
                  </button>

                  <button
                    onClick={() => quickMark(employee.id, 'ABSENT', false)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: '#fff5f5',
                      color: '#e03131',
                      border: '1px solid #ffc9c9',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                    title="Mark Absent"
                  >
                    Absent
                  </button>

                  <button
                    onClick={() => quickMark(employee.id, 'LEAVE', false)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: '#f3f0ff',
                      color: '#7950f2',
                      border: '1px solid #d0bfff',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                    title="Mark Leave"
                  >
                    Leave
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {employeeRows.length === 0 && !loading && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                No active staff found. Add employees in the Employee Directory.
              </td>
            </tr>
          )}
        </tbody>
        </Table>
      </TableContainer>

      {/* Manual Entry Modal */}
      {showManualModal && (
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
            padding: 10,
            boxSizing: 'border-box',
          }}
          onClick={() => setShowManualModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              width: '100%',
              maxWidth: 500,
              maxHeight: '92vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: 20,
              boxSizing: 'border-box',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'nowrap', gap: 10, width: '100%', boxSizing: 'border-box' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Manual Attendance Adjustment</h2>
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: 6,
                  width: 32,
                  height: 32,
                  minWidth: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: '#64748b',
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleManualSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Select Employee</label>
                  <select
                    value={manualEmpId}
                    onChange={(e) => setManualEmpId(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    required
                  >
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.fullName || (e as any).name} ({e.employeeCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Status</label>
                    <select
                      value={manualStatus}
                      onChange={(e) => setManualStatus(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    >
                      <option value="PRESENT">PRESENT</option>
                      <option value="ABSENT">ABSENT</option>
                      <option value="HALF_DAY">HALF DAY</option>
                      <option value="LEAVE">ON LEAVE</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Working Hours</label>
                    <input
                      type="number"
                      step="0.5"
                      value={manualHours}
                      onChange={(e) => setManualHours(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Check In</label>
                    <input
                      type="time"
                      value={manualInTime}
                      onChange={(e) => setManualInTime(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Check Out</label>
                    <input
                      type="time"
                      value={manualOutTime}
                      onChange={(e) => setManualOutTime(e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    id="manualLateCheck"
                    checked={manualLate}
                    onChange={(e) => setManualLate(e.target.checked)}
                  />
                  <label htmlFor="manualLateCheck" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>
                    Mark as Late Arrival
                  </label>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600 }}>Reason / Audit Notes</label>
                  <input
                    type="text"
                    value={manualNotes}
                    onChange={(e) => setManualNotes(e.target.value)}
                    placeholder="e.g. Approved leave / Fingerprint sensor offline"
                    style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  style={{ padding: '8px 16px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: 6 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 20px', background: '#0d1319', color: '#fff', border: 'none', borderRadius: 6 }}
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
