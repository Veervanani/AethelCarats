import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChevronUp, ChevronDown, Calendar as CalendarIcon, Play, Check, X, Clock, AlertCircle } from 'lucide-react';

const CalendarCard = styled.div`
  width: 320px;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 16px 14px 12px 14px;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
  }
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .top-date {
    font-size: 0.95rem;
    font-weight: 600;
    color: #f4f4f5;
    letter-spacing: -0.01em;
  }

  .chevron-box {
    width: 26px;
    height: 26px;
    background: #2b2b2f;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #a1a1aa;
    transition: all 0.15s ease;

    &:hover {
      background: #38383e;
      color: #ffffff;
    }
  }
`;

const MonthNavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .month-title {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  .nav-arrows {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .arrow-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    border-radius: 4px;
    transition: all 0.15s ease;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 6px;

  span {
    font-size: 0.76rem;
    font-weight: 600;
    color: #a1a1aa;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 3px;
  column-gap: 2px;
  margin-bottom: 14px;
`;

const DayCellWrapper = styled.div<{ $isCurrentMonth?: boolean; $isSelected?: boolean }>`
  min-height: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.12s ease;
  position: relative;
  padding: 2px 0;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .day-number {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.82rem;
    font-weight: ${({ $isSelected }) => ($isSelected ? '800' : '500')};
    color: ${({ $isCurrentMonth, $isSelected }) =>
      $isSelected ? '#09090b' : $isCurrentMonth ? '#f4f4f5' : '#52525b'};

    ${({ $isSelected }) =>
      $isSelected &&
      `
      background: #d8b4e2;
      box-shadow: 0 0 12px rgba(216, 180, 226, 0.4);
    `}
  }

  .attendance-pills {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    margin-top: 1px;
    height: 9px;
  }

  .att-dot {
    font-size: 0.6rem;
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
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  .stepper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2b2b2f;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.74rem;
    font-weight: 600;
    color: #e4e4e7;
  }

  .step-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0 2px;

    &:hover {
      color: #ffffff;
    }
  }

  .focus-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #2b2b2f;
    border: none;
    color: #f4f4f5;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.76rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #38383e;
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

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
  const firstDayIndex = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0 - 6
  const prevMonthDaysCount = new Date(viewYear, viewMonth - 1, 0).getDate();

  const calendarDays: Array<{ day: number; isCurrentMonth: boolean; offsetMonth: number }> = [];

  // Trailing previous month days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDaysCount - i,
      isCurrentMonth: false,
      offsetMonth: -1,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    calendarDays.push({
      day: d,
      isCurrentMonth: true,
      offsetMonth: 0,
    });
  }

  // Leading next month days (up to 35 or 42 cells)
  const totalCells = calendarDays.length > 35 ? 42 : 35;
  const remaining = totalCells - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({
      day: d,
      isCurrentMonth: false,
      offsetMonth: 1,
    });
  }

  // Top header date string
  const getTopHeaderDateString = () => {
    try {
      const dObj = new Date(viewYear, viewMonth - 1, selectedDay || 1);
      const dayName = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ][dObj.getDay()];
      return `${dayName}, ${selectedDay || 1} ${monthNames[viewMonth - 1]}`;
    } catch {
      return `${monthNames[viewMonth - 1]} ${viewYear}`;
    }
  };

  return (
    <CalendarCard>
      {/* Top Header */}
      <TopHeader>
        <div className="top-date">{getTopHeaderDateString()}</div>
        <div className="chevron-box" onClick={handleNextMonth} title="Next month">
          <ChevronDown size={15} />
        </div>
      </TopHeader>

      {/* Month Title & Nav Arrows */}
      <MonthNavRow>
        <div className="month-title">
          {monthNames[viewMonth - 1]}, {viewYear}
        </div>
        <div className="nav-arrows">
          <button type="button" className="arrow-btn" onClick={handlePrevMonth} title="Previous month">
            <ChevronUp size={16} />
          </button>
          <button type="button" className="arrow-btn" onClick={handleNextMonth} title="Next month">
            <ChevronDown size={16} />
          </button>
        </div>
      </MonthNavRow>

      {/* Weekdays Row */}
      <WeekdaysRow>
        {daysOfWeek.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </WeekdaysRow>

      {/* Days Grid */}
      <DaysGrid>
        {calendarDays.map((c, idx) => {
          const isSelected = c.isCurrentMonth && c.day === selectedDay;
          const stats = c.isCurrentMonth ? getAttendanceForDay(c.day) : null;

          return (
            <DayCellWrapper
              key={idx}
              $isCurrentMonth={c.isCurrentMonth}
              $isSelected={isSelected}
              onClick={() => handleCellClick(c.day, c.isCurrentMonth, c.offsetMonth)}
              title={
                c.isCurrentMonth && stats
                  ? `Day ${c.day}: ${stats.present} Present, ${stats.absent} Absent, ${stats.halfDay} Half Day, ${stats.leave} Leave`
                  : undefined
              }
            >
              <div className="day-number">{c.day}</div>
              <div className="attendance-pills">
                {stats && (
                  <>
                    {stats.present > 0 && <span className="att-dot present">●{stats.present}</span>}
                    {stats.absent > 0 && <span className="att-dot absent">●{stats.absent}</span>}
                    {stats.halfDay > 0 && <span className="att-dot half">●{stats.halfDay}</span>}
                    {stats.leave > 0 && <span className="att-dot leave">●{stats.leave}</span>}
                  </>
                )}
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
          <Play size={10} fill="#ffffff" /> Today
        </button>
      </BottomBar>
    </CalendarCard>
  );
};
