import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { Printer, CheckCircle2, XCircle, Clock, Check, X, ShieldAlert, Users, Calendar as CalendarIcon, UserCheck, AlertCircle } from 'lucide-react';
import { MonthlyAttendanceCalendar } from '../components/MonthlyAttendanceCalendar';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  .title-group {
    h1 {
      font-size: 1.45rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
    }
    p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 4px 0 0 0;
    }
  }

  .action-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const HeaderButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'accent' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: #0d1319;
          color: #ffffff;
          border: 1px solid #0d1319;
          &:hover {
            background: #1e293b;
          }
        `;
      case 'accent':
        return `
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
          &:hover {
            background: #dcfce7;
          }
        `;
      default:
        return `
          background: #ffffff;
          color: #334155;
          border: 1px solid #cbd5e1;
          &:hover {
            background: #f8fafc;
            border-color: #94a3b8;
          }
        `;
    }
  }}
`;

const AttendanceWorkspace = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 24px;
  align-items: stretch;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const DailyDetailCard = styled.div`
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 14px 12px;
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .date-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #f4f4f5;
    }

    .date-badge {
      font-size: 0.74rem;
      font-weight: 700;
      background: #2b2b2f;
      color: #d8b4e2;
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid rgba(216, 180, 226, 0.25);
    }
  }

  .summary-chips {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;

    .stat-chip {
      font-size: 0.78rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 6px;
      background: #27272a;
      color: #e4e4e7;
      border: 1px solid rgba(255, 255, 255, 0.05);

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .dot.green { background: #4ade80; }
      .dot.red { background: #f87171; }
      .dot.yellow { background: #facc15; }
      .dot.purple { background: #c084fc; }
    }
  }

  .employee-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 16px 0 0 0;
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    max-height: 480px;
  }

  .employee-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    background: #27272a;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.15s ease;
    flex-wrap: wrap;
    gap: 10px;

    &:hover {
      background: #2e2e32;
      border-color: rgba(255, 255, 255, 0.12);
    }

    .emp-info {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .name {
        font-size: 0.9rem;
        font-weight: 700;
        color: #f4f4f5;
      }
      .code {
        font-size: 0.72rem;
        color: #a1a1aa;
      }
    }

    .status-group {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 4px;

      &.present {
        background: #14532d;
        color: #86efac;
        border: 1px solid #166534;
      }
      &.absent {
        background: #7f1d1d;
        color: #fca5a5;
        border: 1px solid #991b1b;
      }
      &.half {
        background: #713f12;
        color: #fde047;
        border: 1px solid #854d0e;
      }
      &.leave {
        background: #581c87;
        color: #d8b4e2;
        border: 1px solid #6b21a8;
      }
      &.unmarked {
        background: #3f3f46;
        color: #d4d4d8;
        border: 1px solid #52525b;
      }
    }

    .action-controls {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .switcher-btn {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
      min-width: 28px;

      &.btn-p {
        background: #2a2a30;
        color: #86efac;
        &.active {
          background: #15803d;
          color: #ffffff;
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.35);
        }
      }

      &.btn-a {
        background: #2a2a30;
        color: #fca5a5;
        &.active {
          background: #b91c1c;
          color: #ffffff;
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.35);
        }
      }

      &.btn-hd {
        background: #2a2a30;
        color: #fde047;
        &.active {
          background: #b45309;
          color: #ffffff;
          border-color: #f59f00;
          box-shadow: 0 0 10px rgba(245, 159, 0, 0.35);
        }
      }

      &.btn-l {
        background: #2a2a30;
        color: #d8b4e2;
        &.active {
          background: #6d28d9;
          color: #ffffff;
          border-color: #a855f7;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.35);
        }
      }

      &:hover:not(.active) {
        background: #3f3f46;
        color: #ffffff;
      }
    }
  }
`;

export const BusinessAttendanceReportPage: React.FC = () => {
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
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

  const handleSetEmployeeStatus = async (employeeId: string, dayNumber: number, targetStatus: string) => {
    const [y, m] = month.split('-');
    const dateStr = `${y}-${m.padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    const hours = targetStatus === 'PRESENT' ? 8 : targetStatus === 'HALF_DAY' ? 4 : 0;

    // 1. Optimistically update local React state for instantaneous UI responsiveness
    setReport((prevReport) =>
      prevReport.map((emp) => {
        if (emp.employee.id === employeeId) {
          const oldRec = emp.days?.[dayNumber];
          const newDays = {
            ...emp.days,
            [dayNumber]: {
              ...(oldRec || {}),
              status: targetStatus,
              workingHours: hours,
              lateStatus: false,
            },
          };
          return {
            ...emp,
            days: newDays,
          };
        }
        return emp;
      })
    );

    // 2. Persist to API database
    try {
      await businessApi.manualAttendanceEntry({
        employeeId,
        date: dateStr,
        status: targetStatus,
        workingHours: hours,
        lateStatus: false,
      });
    } catch (e) {
      console.error('Failed to update attendance:', e);
      fetchReport();
    }
  };

  const getDayInfo = (d: number) => {
    const [y, m] = month.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayOfWeek = dateObj.getDay();
    return {
      fullDayName: fullDayNames[dayOfWeek],
      monthName: monthNames[m - 1],
      year: y,
      isSunday: dayOfWeek === 0,
    };
  };

  // Stats for the currently selected day in DailyDetailCard
  const selectedDayInfo = getDayInfo(selectedDay);
  let selectedDayPresent = 0;
  let selectedDayAbsent = 0;
  let selectedDayHalf = 0;
  let selectedDayLeave = 0;

  report.forEach((emp) => {
    const rec = emp.days?.[selectedDay];
    if (rec?.status === 'PRESENT') selectedDayPresent++;
    else if (rec?.status === 'ABSENT') selectedDayAbsent++;
    else if (rec?.status === 'HALF_DAY') selectedDayHalf++;
    else if (rec?.status === 'LEAVE') selectedDayLeave++;
  });

  return (
    <PageContainer>
      {/* Top Header */}
      <PageHeader>
        <div className="title-group">
          <h1>Monthly Attendance & Workforce Calendar</h1>
          <p>Interactive calendar navigation, daily staff presence & real-time attendance management</p>
        </div>

        <div className="action-toolbar">
          <HeaderButton
            type="button"
            $variant="accent"
            onClick={handleMarkAllPresent}
            disabled={marking}
            title="Bulk mark present for all staff members"
          >
            ⚡ {marking ? 'Marking...' : `Mark All Present (${month})`}
          </HeaderButton>

          <HeaderButton type="button" onClick={() => window.print()} title="Print attendance report">
            <Printer size={14} /> Print Report
          </HeaderButton>
        </div>
      </PageHeader>

      {/* Main 2-Column Responsive Workspace: Calendar + Selected Date Employee Roster */}
      <AttendanceWorkspace>
        {/* Monthly Attendance Calendar */}
        <MonthlyAttendanceCalendar
          selectedMonth={month}
          selectedDay={selectedDay}
          onMonthChange={(newMonth) => setMonth(newMonth)}
          onDaySelect={(d) => setSelectedDay(d)}
          report={report}
        />

        {/* Selected Date Employee Attendance Panel */}
        <DailyDetailCard>
          <div className="detail-header">
            <div>
              <div className="date-title">
                {selectedDayInfo.fullDayName}, {selectedDay} {selectedDayInfo.monthName} {selectedDayInfo.year}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#a1a1aa', marginTop: 3 }}>
                Daily staff presence & status controls
              </div>
            </div>
            <span className="date-badge">Day {selectedDay}</span>
          </div>

          {/* Compact Summary KPI Counters for Selected Date */}
          <div className="summary-chips">
            <span className="stat-chip">
              <span className="dot green" /> Present: <strong>{selectedDayPresent}</strong>
            </span>
            <span className="stat-chip">
              <span className="dot red" /> Absent: <strong>{selectedDayAbsent}</strong>
            </span>
            <span className="stat-chip">
              <span className="dot yellow" /> Half Day: <strong>{selectedDayHalf}</strong>
            </span>
            <span className="stat-chip">
              <span className="dot purple" /> Leave: <strong>{selectedDayLeave}</strong>
            </span>
          </div>

          {/* Employee Attendance Rows */}
          <div className="employee-list">
            {report.map((emp) => {
              const rec = emp.days?.[selectedDay];
              const status = rec?.status || 'UNMARKED';

              return (
                <div key={emp.employee.id} className="employee-row">
                  <div className="emp-info">
                    <span className="name">{emp.employee.fullName || emp.employee.name}</span>
                    <span className="code">{emp.employee.employeeCode || emp.employee.department || 'Staff'}</span>
                  </div>

                  <div className="status-group">
                    <span
                      className={`status-badge ${
                        status === 'PRESENT'
                          ? 'present'
                          : status === 'ABSENT'
                          ? 'absent'
                          : status === 'HALF_DAY'
                          ? 'half'
                          : status === 'LEAVE'
                          ? 'leave'
                          : 'unmarked'
                      }`}
                    >
                      {status === 'PRESENT'
                        ? '✓ Present'
                        : status === 'ABSENT'
                        ? '✕ Absent'
                        : status === 'HALF_DAY'
                        ? '½ Half Day'
                        : status === 'LEAVE'
                        ? '🟣 Leave'
                        : 'Unmarked'}
                    </span>

                    {/* Individual P / A / HD / L Controls with Active Highlighting */}
                    <div className="action-controls">
                      <button
                        type="button"
                        className={`switcher-btn btn-p ${status === 'PRESENT' ? 'active' : ''}`}
                        onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'PRESENT')}
                        title="Mark Present"
                      >
                        P
                      </button>
                      <button
                        type="button"
                        className={`switcher-btn btn-a ${status === 'ABSENT' ? 'active' : ''}`}
                        onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'ABSENT')}
                        title="Mark Absent"
                      >
                        A
                      </button>
                      <button
                        type="button"
                        className={`switcher-btn btn-hd ${status === 'HALF_DAY' ? 'active' : ''}`}
                        onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'HALF_DAY')}
                        title="Mark Half Day"
                      >
                        HD
                      </button>
                      <button
                        type="button"
                        className={`switcher-btn btn-l ${status === 'LEAVE' ? 'active' : ''}`}
                        onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'LEAVE')}
                        title="Mark Leave"
                      >
                        L
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {report.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '32px', color: '#71717a', fontSize: '0.84rem' }}>
                No active staff members found for this month.
              </div>
            )}
          </div>
        </DailyDetailCard>
      </AttendanceWorkspace>
    </PageContainer>
  );
};

