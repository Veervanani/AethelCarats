import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { Clock, Calendar, Download, Printer } from 'lucide-react';
import { MonthlyAttendanceCalendar } from '../components/MonthlyAttendanceCalendar';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`;

const MatrixContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const MatrixTable = styled.table`
  border-collapse: collapse;
  font-size: 0.72rem;
  width: 100%;

  th, td {
    border: 1px solid #e2e8f0;
    padding: 6px 4px;
    text-align: center;
    min-width: 24px;
  }

  th {
    background: #f8fafc;
    color: #475569;
    font-weight: 700;
  }

  .emp-col {
    text-align: left;
    padding: 8px 12px;
    min-width: 180px;
    font-weight: 600;
    background: #f8fafc;
    position: sticky;
    left: 0;
    z-index: 10;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.04);
  }

  .status-p {
    background: #ebfbee;
    color: #2b8a3e;
    font-weight: 700;
  }

  .status-a {
    background: #fff5f5;
    color: #e03131;
    font-weight: 700;
  }

  .status-l {
    background: #f3f0ff;
    color: #7950f2;
    font-weight: 700;
  }

  .status-hd {
    background: #fff9db;
    color: #f59f00;
    font-weight: 700;
  }
`;

export const BusinessAttendanceReportPage: React.FC = () => {
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [report, setReport] = useState<any[]>([]);
  const [daysInMonth, setDaysInMonth] = useState<number>(31);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await businessApi.getMonthlyAttendanceReport(month);
      setReport(res.report || []);
      setDaysInMonth(res.daysInMonth || 31);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [month]);

  const handleMarkAllPresent = async () => {
    if (!window.confirm(`Mark all employees as PRESENT for the entire month (${month})?`)) return;
    setMarking(true);
    try {
      await businessApi.markAllEmployeesPresentForMonth(month);
      await fetchReport();
      alert(`✅ All employees successfully marked PRESENT for ${month}`);
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setMarking(false);
    }
  };

  const handleToggleCellStatus = async (employeeId: string, dayNumber: number, currentStatus?: string) => {
    const nextStatusMap: Record<string, string> = {
      PRESENT: 'ABSENT',
      ABSENT: 'HALF_DAY',
      HALF_DAY: 'LEAVE',
      LEAVE: 'PRESENT',
      '-': 'PRESENT',
    };
    const nextStatus = nextStatusMap[currentStatus || '-'] || 'PRESENT';
    const [y, m] = month.split('-');
    const dateStr = `${y}-${m.padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;

    try {
      await businessApi.manualAttendanceEntry({
        employeeId,
        date: dateStr,
        status: nextStatus,
        workingHours: nextStatus === 'PRESENT' ? 8 : nextStatus === 'HALF_DAY' ? 4 : 0,
        lateStatus: false,
      });
      fetchReport();
    } catch (e) {
      console.error(e);
    }
  };

  const getDayInfo = (d: number) => {
    const [y, m] = month.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const dayOfWeek = dateObj.getDay();
    return {
      dayName: dayNames[dayOfWeek],
      isSunday: dayOfWeek === 0,
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    };
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div>
      <PageHeader>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Monthly Attendance Matrix</h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
            Comprehensive month-view attendance ledger with day-of-week calendar mapping
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={handleMarkAllPresent}
            disabled={marking}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              background: '#0d1319',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ⚡ {marking ? 'Marking...' : `Mark All Present (${month})`}
          </button>

          <MonthlyAttendanceCalendar
            selectedMonth={month}
            onMonthChange={(newMonth) => setMonth(newMonth)}
          />
          <button
            onClick={() => window.print()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Printer size={14} /> Print
          </button>
        </div>
      </PageHeader>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: '0.75rem', fontWeight: 600, flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: '#ebfbee', border: '1px solid #b2f2bb', display: 'inline-block' }}></span> P = Present
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: '#fff5f5', border: '1px solid #ffc9c9', display: 'inline-block' }}></span> A = Absent
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: '#fff9db', border: '1px solid #ffe066', display: 'inline-block' }}></span> HD = Half Day
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 12, height: 12, background: '#f3f0ff', border: '1px solid #d0bfff', display: 'inline-block' }}></span> L = Leave
        </span>
        <span style={{ color: '#64748b', fontSize: '0.72rem', marginLeft: 'auto' }}>
          💡 Click any day cell to quickly toggle attendance status
        </span>
      </div>

      <MatrixContainer>
        <MatrixTable>
          <thead>
            <tr>
              <th className="emp-col">Staff Member</th>
              {daysArray.map((d) => {
                const { dayName, isSunday, isWeekend } = getDayInfo(d);
                return (
                  <th
                    key={d}
                    style={{
                      background: isSunday ? '#fee2e2' : isWeekend ? '#f1f5f9' : '#f8fafc',
                      color: isSunday ? '#dc2626' : '#475569',
                      padding: '4px 2px',
                    }}
                  >
                    <div style={{ fontSize: '0.62rem', fontWeight: 600, opacity: 0.9 }}>{dayName}</div>
                    <div style={{ fontSize: '0.76rem', fontWeight: 800 }}>{d}</div>
                  </th>
                );
              })}
              <th style={{ background: '#f1f5f9' }}>Pres</th>
              <th style={{ background: '#f1f5f9' }}>Abs</th>
              <th style={{ background: '#f1f5f9' }}>Late</th>
              <th style={{ background: '#f1f5f9' }}>Total Hrs</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item) => (
              <tr key={item.employee.id}>
                <td className="emp-col">
                  <div>{item.employee.fullName || item.employee.name}</div>
                  <div style={{ fontSize: '0.64rem', color: '#64748b' }}>{item.employee.employeeCode}</div>
                </td>
                {daysArray.map((d) => {
                  const rec = item.days[d];
                  const { isSunday } = getDayInfo(d);
                  let cellClass = '';
                  let label = '-';
                  if (rec) {
                    if (rec.status === 'PRESENT') {
                      cellClass = 'status-p';
                      label = rec.lateStatus ? 'P*' : 'P';
                    } else if (rec.status === 'ABSENT') {
                      cellClass = 'status-a';
                      label = 'A';
                    } else if (rec.status === 'LEAVE') {
                      cellClass = 'status-l';
                      label = 'L';
                    } else if (rec.status === 'HALF_DAY') {
                      cellClass = 'status-hd';
                      label = 'HD';
                    }
                  }
                  return (
                    <td
                      key={d}
                      className={cellClass}
                      onClick={() => handleToggleCellStatus(item.employee.id, d, rec?.status)}
                      style={{
                        cursor: 'pointer',
                        background: !cellClass && isSunday ? '#fff1f2' : undefined,
                        color: !cellClass && isSunday ? '#f43f5e' : undefined,
                      }}
                      title={`Click to change: ${rec?.status || 'UNMARKED'} (${rec?.workingHours || 0} hrs)`}
                    >
                      {label}
                    </td>
                  );
                })}
                <td style={{ fontWeight: 700, color: '#16a34a' }}>{item.summary?.present || 0}</td>
                <td style={{ fontWeight: 700, color: '#dc2626' }}>{item.summary?.absent || 0}</td>
                <td style={{ fontWeight: 700, color: '#d97706' }}>{item.summary?.late || 0}</td>
                <td style={{ fontWeight: 800 }}>{item.summary?.totalHours || 0}</td>
              </tr>
            ))}
            {report.length === 0 && !loading && (
              <tr>
                <td colSpan={daysInMonth + 5} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                  No records found for {month}.
                </td>
              </tr>
            )}
          </tbody>
        </MatrixTable>
      </MatrixContainer>
    </div>
  );
};
