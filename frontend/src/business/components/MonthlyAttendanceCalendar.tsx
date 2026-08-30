import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Play, Calendar as CalendarIcon } from 'lucide-react';

const CalendarCard = styled.div`
  flex: 1;
  min-width: 320px;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 14px 10px;
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .top-date {
    font-size: 1.05rem;
    font-weight: 700;
    color: #f4f4f5;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .today-pill {
    font-size: 0.68rem;
    font-weight: 700;
    background: rgba(216, 180, 226, 0.18);
    color: #d8b4e2;
    border: 1px solid rgba(216, 180, 226, 0.35);
    padding: 2px 8px;
    border-radius: 12px;
  }
`;

const MonthNavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  .month-title {
    font-size: 1.12rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .nav-arrows {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .arrow-btn {
    background: #2b2b2f;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #d4d4d8;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    transition: all 0.15s ease;

    &:hover {
      color: #ffffff;
      background: #38383e;
      border-color: rgba(255, 255, 255, 0.18);
    }
  }
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  span {
    font-size: 0.78rem;
    font-weight: 700;
    color: #a1a1aa;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    &.sun {
      color: #f87171;
    }
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 6px;
  column-gap: 4px;
  margin-bottom: 16px;
`;

const DayCellWrapper = styled.div<{ $isCurrentMonth?: boolean; $isSelected?: boolean; $isToday?: boolean; $isSunday?: boolean }>`
  min-height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.12s ease;
  position: relative;
  padding: 3px 1px;
  background: ${({ $isSelected }) => ($isSelected ? 'transparent' : 'rgba(255, 255, 255, 0.02)')};
  border: 1px solid ${({ $isSelected, $isToday }) =>
    $isSelected ? 'transparent' : $isToday ? 'rgba(216, 180, 226, 0.4)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .day-number {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.88rem;
    font-weight: ${({ $isSelected, $isToday }) => ($isSelected || $isToday ? '800' : '600')};
    color: ${({ $isCurrentMonth, $isSelected, $isSunday }) =>
      $isSelected
        ? '#09090b'
        : !$isCurrentMonth
        ? '#52525b'
        : $isSunday
        ? '#fca5a5'
        : '#f4f4f5'};

    ${({ $isSelected }) =>
      $isSelected &&
      `
      background: #d8b4e2;
      box-shadow: 0 0 14px rgba(216, 180, 226, 0.5);
    `}

    ${({ $isToday, $isSelected }) =>
      $isToday &&
      !$isSelected &&
      `
      border: 1.5px solid #d8b4e2;
      color: #ffffff;
    `}
  }

  .attendance-pills {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    margin-top: 2px;
    min-height: 12px;
    flex-wrap: wrap;
  }

  .att-dot {
    font-size: 0.64rem;
    line-height: 1;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 1px;

    &.present {
      color: #4ade80;
    }
    &.absent {
      color: #f87171;
    }
    &.half {
      color: #facc15;
    }
    &.leave {
      color: #c084fc;
    }
    &.empty {
      color: #52525b;
      font-size: 0.58rem;
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 8px;

  .stepper {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #2b2b2f;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    color: #e4e4e7;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .step-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 800;
    padding: 0 4px;
    line-height: 1;

    &:hover {
      color: #ffffff;
    }
  }

  .focus-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #2b2b2f;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #f4f4f5;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: #38383e;
      color: #d8b4e2;
      border-color: rgba(216, 180, 226, 0.3);
    }
  }
`;

interface DayAttendanceStats {
  present: number;
  absent: number;
  halfDay: number;
  leave: number;
  total: number;
}

interface Props {
  selectedMonth: string; // "YYYY-MM"
  selectedDay: number; // 1 - 31
  onMonthChange: (newMonth: string) => void;
  onDaySelect: (day: number) => void;
  report?: any[]; // Full attendance records from API
}

export const MonthlyAttendanceCalendar: React.FC<Props> = ({
  selectedMonth,
  selectedDay,
  onMonthChange,
  onDaySelect,
  report = [],
}) => {
  const [yStr, mStr] = (selectedMonth || new Date().toISOString().slice(0, 7)).split('-');
  const [viewYear, setViewYear] = useState<number>(Number(yStr) || new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(Number(mStr) || new Date().getMonth() + 1);

  // Sync internal state when prop changes
  useEffect(() => {
    if (selectedMonth) {
      const [y, m] = selectedMonth.split('-').map(Number);
      if (y && m) {
        setViewYear(y);
        setViewMonth(m);
      }
    }
  }, [selectedMonth]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = [
    { key: 'Su', label: 'Sun', isSun: true },
    { key: 'Mo', label: 'Mon', isSun: false },
    { key: 'Tu', label: 'Tue', isSun: false },
    { key: 'We', label: 'Wed', isSun: false },
    { key: 'Th', label: 'Thu', isSun: false },
    { key: 'Fr', label: 'Fri', isSun: false },
    { key: 'Sa', label: 'Sat', isSun: false },
  ];

  // Navigate months
  const handlePrevMonth = () => {
    let nextM = viewMonth - 1;
    let nextY = viewYear;
    if (nextM < 1) {
      nextM = 12;
      nextY--;
    }
    setViewMonth(nextM);
    setViewYear(nextY);
    const monthStr = `${nextY}-${String(nextM).padStart(2, '0')}`;
    onMonthChange(monthStr);
  };

  const handleNextMonth = () => {
    let nextM = viewMonth + 1;
    let nextY = viewYear;
    if (nextM > 12) {
      nextM = 1;
      nextY++;
    }
    setViewMonth(nextM);
    setViewYear(nextY);
    const monthStr = `${nextY}-${String(nextM).padStart(2, '0')}`;
    onMonthChange(monthStr);
  };

  const handleJumpToToday = () => {
    const today = new Date();
    const curY = today.getFullYear();
    const curM = today.getMonth() + 1;
    const curD = today.getDate();
    setViewYear(curY);
    setViewMonth(curM);
    const monthStr = `${curY}-${String(curM).padStart(2, '0')}`;
    onMonthChange(monthStr);
    onDaySelect(curD);
  };

  const handleCellClick = (day: number, isCurrentMonth: boolean, offsetMonth: number) => {
    if (!isCurrentMonth) {
      let targetY = viewYear;
      let targetM = viewMonth + offsetMonth;
      if (targetM < 1) {
        targetM = 12;
        targetY--;
      } else if (targetM > 12) {
        targetM = 1;
        targetY++;
      }
      setViewYear(targetY);
      setViewMonth(targetM);
      const monthStr = `${targetY}-${String(targetM).padStart(2, '0')}`;
      onMonthChange(monthStr);
      onDaySelect(day);
    } else {
      onDaySelect(day);
    }
  };

  // Compute daily attendance stats for current month
  const getAttendanceForDay = (d: number): DayAttendanceStats | null => {
    if (!report || report.length === 0) return null;
    let present = 0;
    let absent = 0;
    let halfDay = 0;
    let leave = 0;

    report.forEach((emp) => {
      const rec = emp.days?.[d];
      if (rec) {
        if (rec.status === 'PRESENT') present++;
        else if (rec.status === 'ABSENT') absent++;
        else if (rec.status === 'HALF_DAY') halfDay++;
        else if (rec.status === 'LEAVE') leave++;
      }
    });

    const total = present + absent + halfDay + leave;
    if (total === 0) return null;
    return { present, absent, halfDay, leave, total };
  };

  // Calendar Grid Calculation
  const daysInCurrentMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0 - 6 (Sunday = 0)
  const prevMonthDaysCount = new Date(viewYear, viewMonth - 1, 0).getDate();

  const calendarDays: Array<{ day: number; isCurrentMonth: boolean; offsetMonth: number; dayOfWeek: number }> = [];

  // Trailing previous month days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevMonthDaysCount - i;
    const dObj = new Date(viewYear, viewMonth - 2, d);
    calendarDays.push({
      day: d,
      isCurrentMonth: false,
      offsetMonth: -1,
      dayOfWeek: dObj.getDay(),
    });
  }

  // Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dObj = new Date(viewYear, viewMonth - 1, d);
    calendarDays.push({
      day: d,
      isCurrentMonth: true,
      offsetMonth: 0,
      dayOfWeek: dObj.getDay(),
    });
  }

  // Leading next month days (fill out grid to 35 or 42 cells)
  const totalCells = calendarDays.length > 35 ? 42 : 35;
  const remaining = totalCells - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    const dObj = new Date(viewYear, viewMonth, d);
    calendarDays.push({
      day: d,
      isCurrentMonth: false,
      offsetMonth: 1,
      dayOfWeek: dObj.getDay(),
    });
  }

  // Check if today matches view month and year
  const today = new Date();
  const isTodayInView = today.getFullYear() === viewYear && today.getMonth() + 1 === viewMonth;
  const todayDateNumber = today.getDate();

  // Top header date string
  const getTopHeaderDateString = () => {
    try {
      const dObj = new Date(viewYear, viewMonth - 1, selectedDay || 1);
      const dayName = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ][dObj.getDay()];
      return `${dayName}, ${selectedDay || 1} ${monthNames[viewMonth - 1]} ${viewYear}`;
    } catch {
      return `${monthNames[viewMonth - 1]} ${viewYear}`;
    }
  };

  return (
    <CalendarCard>
      {/* Top Header */}
      <TopHeader>
        <div className="top-date">
          <CalendarIcon size={16} color="#d8b4e2" />
          {getTopHeaderDateString()}
        </div>
        {isTodayInView && selectedDay === todayDateNumber && (
          <span className="today-pill">Today</span>
        )}
      </TopHeader>

      {/* Month Title & Nav Arrows */}
      <MonthNavRow>
        <div className="month-title">
          {monthNames[viewMonth - 1]} {viewYear}
        </div>
        <div className="nav-arrows">
          <button type="button" className="arrow-btn" onClick={handlePrevMonth} title="Previous Month">
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="arrow-btn" onClick={handleNextMonth} title="Next Month">
            <ChevronRight size={18} />
          </button>
        </div>
      </MonthNavRow>

      {/* Weekdays Row */}
      <WeekdaysRow>
        {daysOfWeek.map((d) => (
          <span key={d.key} className={d.isSun ? 'sun' : ''}>
            {d.label}
          </span>
        ))}
      </WeekdaysRow>

      {/* Days Grid */}
      <DaysGrid>
        {calendarDays.map((c, idx) => {
          const isSelected = c.isCurrentMonth && c.day === selectedDay;
          const isToday = isTodayInView && c.isCurrentMonth && c.day === todayDateNumber;
          const stats = c.isCurrentMonth ? getAttendanceForDay(c.day) : null;
          const isSun = c.dayOfWeek === 0;

          return (
            <DayCellWrapper
              key={idx}
              $isCurrentMonth={c.isCurrentMonth}
              $isSelected={isSelected}
              $isToday={isToday}
              $isSunday={isSun}
              onClick={() => handleCellClick(c.day, c.isCurrentMonth, c.offsetMonth)}
              title={
                c.isCurrentMonth
                  ? stats
                    ? `Day ${c.day}: ${stats.present} Present, ${stats.absent} Absent, ${stats.halfDay} Half Day, ${stats.leave} Leave`
                    : `Day ${c.day}: No attendance recorded`
                  : undefined
              }
            >
              <div className="day-number">{c.day}</div>
              <div className="attendance-pills">
                {c.isCurrentMonth && stats ? (
                  <>
                    {stats.present > 0 && <span className="att-dot present">●{stats.present}</span>}
                    {stats.absent > 0 && <span className="att-dot absent">●{stats.absent}</span>}
                    {stats.halfDay > 0 && <span className="att-dot half">●{stats.halfDay}</span>}
                    {stats.leave > 0 && <span className="att-dot leave">●{stats.leave}</span>}
                  </>
                ) : c.isCurrentMonth ? (
                  <span className="att-dot empty">●0</span>
                ) : null}
              </div>
            </DayCellWrapper>
          );
        })}
      </DaysGrid>

      {/* Bottom Bar matching reference */}
      <BottomBar>
        <div className="stepper">
          <button type="button" className="step-btn" onClick={handlePrevMonth} title="Previous Month">
            -
          </button>
          <span>{monthNames[viewMonth - 1].slice(0, 3)}</span>
          <button type="button" className="step-btn" onClick={handleNextMonth} title="Next Month">
            +
          </button>
        </div>

        <button type="button" className="focus-btn" onClick={handleJumpToToday}>
          <Play size={11} fill="#ffffff" /> Today
        </button>
      </BottomBar>
    </CalendarCard>
  );
};

