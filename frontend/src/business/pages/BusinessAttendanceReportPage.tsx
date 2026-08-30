import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { businessApi } from '../services/businessApi';
import { Clock, Calendar, Download, Printer, CheckCircle2, XCircle, AlertCircle, Sparkles, Check, X, ShieldAlert } from 'lucide-react';
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

const TopDualSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: stretch;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const DailyDetailCard = styled.div`
  flex: 1;
  min-width: 320px;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .date-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #f4f4f5;
    }

    .date-badge {
      font-size: 0.72rem;
      font-weight: 700;
      background: #2b2b2f;
      color: #d8b4e2;
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid rgba(216, 180, 226, 0.25);
    }
  }

  .employee-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 14px 0;
    max-height: 220px;
    overflow-y: auto;
    scrollbar-width: thin;
    padding-right: 4px;
  }

  .employee-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #27272a;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .emp-info {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 0.84rem;
        font-weight: 600;
        color: #f4f4f5;
      }
      .code {
        font-size: 0.68rem;
        color: #a1a1aa;
      }
    }

    .status-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-badge {
      font-size: 0.74rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;

      &.present {
        background: #14532d;
        color: #86efac;
      }
      &.absent {
        background: #7f1d1d;
        color: #fca5a5;
      }
      &.half {
        background: #713f12;
        color: #fde047;
      }
      &.leave {
        background: #581c87;
        color: #d8b4e2;
      }
      &.unmarked {
        background: #3f3f46;
        color: #a1a1aa;
      }
    }

    .switcher-btn {
      background: #38383e;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #f4f4f5;
      width: 22px;
      height: 22px;
      border-radius: 4px;
      font-size: 0.68rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.12s ease;

      &:hover {
        background: #52525b;
        color: #ffffff;
      }
    }
  }

  .detail-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;
    gap: 8px;

    .stat-chip {
      font-size: 0.76rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: #e4e4e7;

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
`;

const MatrixCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;

  .matrix-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }

    .legend {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.74rem;
      font-weight: 600;
      flex-wrap: wrap;

      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 4px;

        span.box {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          display: inline-block;
        }
      }
    }
  }
`;

const MatrixContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  scrollbar-width: thin;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;


const MatrixTable = styled.table`
  border-collapse: collapse;
  font-size: 0.74rem;
  width: 100%;
  white-space: nowrap;

  th, td {
    border: 1px solid #e2e8f0;
    padding: 6px 5px;
    text-align: center;
    min-width: 26px;
    font-variant-numeric: tabular-nums;
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

    try {
      await businessApi.manualAttendanceEntry({
        employeeId,
        date: dateStr,
        status: targetStatus,
        workingHours: hours,
        lateStatus: false,
      });
      await fetchReport();
    } catch (e) {
      console.error(e);
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
    await handleSetEmployeeStatus(employeeId, dayNumber, nextStatus);
  };

  const getDayInfo = (d: number) => {
    const [y, m] = month.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayOfWeek = dateObj.getDay();
    return {
      dayName: dayNames[dayOfWeek],
      fullDayName: fullDayNames[dayOfWeek],
      monthName: monthNames[m - 1],
      year: y,
      isSunday: dayOfWeek === 0,
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    };
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
          <p>Interactive calendar navigation, daily roster inspection & 31-day ledger matrix</p>
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

      {/* Top Section: Custom Dark Attendance Calendar + Daily Breakdown Card */}
      <TopDualSection>
        {/* Dark Attendance Calendar (Matches Reference UI) */}
        <MonthlyAttendanceCalendar
          selectedMonth={month}
          selectedDay={selectedDay}
          onMonthChange={(newMonth) => setMonth(newMonth)}
          onDaySelect={(d) => setSelectedDay(d)}
          report={report}
        />

        {/* Daily Attendance Detail Panel */}
        <DailyDetailCard>
          <div className="detail-header">
            <div>
              <div className="date-title">
                {selectedDayInfo.fullDayName}, {selectedDay} {selectedDayInfo.monthName} {selectedDayInfo.year}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#a1a1aa', marginTop: 2 }}>
                Daily staff presence & status toggle
              </div>
            </div>
            <span className="date-badge">Day {selectedDay}</span>
          </div>

          <div className="employee-list">
            {report.map((emp) => {
              const rec = emp.days?.[selectedDay];
              const status = rec?.status || 'UNMARKED';

              return (
                <div key={emp.employee.id} className="employee-row">
                  <div className="emp-info">
                    <span className="name">{emp.employee.fullName || emp.employee.name}</span>
                    <span className="code">{emp.employee.employeeCode || emp.employee.department}</span>
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

                    {/* Quick Switch Buttons */}
                    <button
                      type="button"
                      className="switcher-btn"
                      onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'PRESENT')}
                      title="Set Present"
                    >
                      P
                    </button>
                    <button
                      type="button"
                      className="switcher-btn"
                      onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'ABSENT')}
                      title="Set Absent"
                    >
                      A
                    </button>
                    <button
                      type="button"
                      className="switcher-btn"
                      onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'HALF_DAY')}
                      title="Set Half Day"
                    >
                      HD
                    </button>
                    <button
                      type="button"
                      className="switcher-btn"
                      onClick={() => handleSetEmployeeStatus(emp.employee.id, selectedDay, 'LEAVE')}
                      title="Set Leave"
                    >
                      L
                    </button>
                  </div>
                </div>
              );
            })}

            {report.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '24px', color: '#71717a', fontSize: '0.84rem' }}>
                No employees found for this period.
              </div>
            )}
          </div>

          <div className="detail-footer">
            <span className="stat-chip"><span className="dot green" /> Present: <strong>{selectedDayPresent}</strong></span>
            <span className="stat-chip"><span className="dot red" /> Absent: <strong>{selectedDayAbsent}</strong></span>
            <span className="stat-chip"><span className="dot yellow" /> Half Day: <strong>{selectedDayHalf}</strong></span>
            <span className="stat-chip"><span className="dot purple" /> Leave: <strong>{selectedDayLeave}</strong></span>
          </div>
        </DailyDetailCard>
      </TopDualSection>

      {/* Main Attendance Matrix */}
      <MatrixCard>
        <div className="matrix-header">
          <h3>Full Monthly Attendance Matrix ({month})</h3>

          <div className="legend">
            <span className="legend-item">
              <span className="box" style={{ background: '#ebfbee', border: '1px solid #b2f2bb' }} /> P = Present
            </span>
            <span className="legend-item">
              <span className="box" style={{ background: '#fff5f5', border: '1px solid #ffc9c9' }} /> A = Absent
            </span>
            <span className="legend-item">
              <span className="box" style={{ background: '#fff9db', border: '1px solid #ffe066' }} /> HD = Half Day
            </span>
            <span className="legend-item">
              <span className="box" style={{ background: '#f3f0ff', border: '1px solid #d0bfff' }} /> L = Leave
            </span>
          </div>
        </div>

        <MatrixContainer>
          <MatrixTable>
            <thead>
              <tr>
                <th className="emp-col">Staff Member</th>
                {daysArray.map((d) => {
                  const { dayName, isSunday, isWeekend } = getDayInfo(d);
                  const isCurSelected = d === selectedDay;

                  return (
                    <th
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      style={{
                        background: isCurSelected
                          ? '#0d1319'
                          : isSunday
                          ? '#fee2e2'
                          : isWeekend
                          ? '#f1f5f9'
                          : '#f8fafc',
                        color: isCurSelected ? '#ffffff' : isSunday ? '#dc2626' : '#475569',
                        padding: '4px 2px',
                        cursor: 'pointer',
                      }}
                      title={`Click to view day ${d} breakdown`}
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
                        onClick={() => {
                          setSelectedDay(d);
                          handleToggleCellStatus(item.employee.id, d, rec?.status);
                        }}
                        style={{
                          cursor: 'pointer',
                          background: !cellClass && isSunday ? '#fff1f2' : undefined,
                          color: !cellClass && isSunday ? '#f43f5e' : undefined,
                        }}
                        title={`Day ${d}: Click to cycle status (${rec?.status || 'UNMARKED'})`}
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
      </MatrixCard>
    </PageContainer>
  );
};
