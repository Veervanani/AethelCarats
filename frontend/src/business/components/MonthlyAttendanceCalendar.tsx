import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Play } from 'lucide-react';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  &:hover {
    border-color: #0d1319;
    background: #f8fafc;
  }
`;

const PopoverContainer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 310px;
  background: #1f1f21;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0, 0, 0, 0.3);
  padding: 16px;
  z-index: 9999;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  @media (max-width: 480px) {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 295px;
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
    font-size: 0.95rem;
    font-weight: 600;
    color: #f4f4f5;
  }

  .chevron-box {
    width: 28px;
    height: 28px;
    background: #2b2b2f;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #a1a1aa;
    transition: background 0.15s ease;

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
  margin-bottom: 14px;

  .month-title {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }

  .nav-arrows {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .arrow-btn {
    background: transparent;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    border-radius: 4px;
    transition: color 0.15s ease;

    &:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }
  }
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;

  span {
    font-size: 0.78rem;
    font-weight: 600;
    color: #a1a1aa;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 4px;
  margin-bottom: 16px;
`;

const DayCell = styled.div<{ $isCurrentMonth?: boolean; $isSelected?: boolean }>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.84rem;
  font-weight: ${({ $isSelected }) => ($isSelected ? '800' : '500')};
  color: ${({ $isCurrentMonth, $isSelected }) =>
    $isSelected ? '#09090b' : $isCurrentMonth ? '#f4f4f5' : '#52525b'};
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.12s ease;
  position: relative;
  margin: 1px;

  ${({ $isSelected }) =>
    $isSelected
      ? `
    background: #d8b4e2;
    box-shadow: 0 0 12px rgba(216, 180, 226, 0.35);
  `
      : `
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  `}
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  .stepper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2b2b2f;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.76rem;
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
    gap: 6px;
    background: #2b2b2f;
    border: none;
    color: #f4f4f5;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #38383e;
    }
  }
`;

interface Props {
  selectedMonth: string; // e.g. "2026-08"
  onMonthChange: (newMonth: string) => void;
}

export const MonthlyAttendanceCalendar: React.FC<Props> = ({ selectedMonth, onMonthChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial year and month
  const [yStr, mStr] = (selectedMonth || new Date().toISOString().slice(0, 7)).split('-');
  const [viewYear, setViewYear] = useState<number>(Number(yStr) || new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(Number(mStr) || new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const today = new Date();
    if (today.getFullYear() === viewYear && today.getMonth() + 1 === viewMonth) {
      return today.getDate();
    }
    return 1;
  });

  // Sync internal state when selectedMonth prop changes
  useEffect(() => {
    if (selectedMonth) {
      const [y, m] = selectedMonth.split('-').map(Number);
      if (y && m) {
        setViewYear(y);
        setViewMonth(m);
      }
    }
  }, [selectedMonth]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
    setSelectedDay(curD);
    const monthStr = `${curY}-${String(curM).padStart(2, '0')}`;
    onMonthChange(monthStr);
  };

  const handleSelectDay = (day: number, isCurrentMonth: boolean, offsetMonth: number) => {
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
    setSelectedDay(day);

    const monthStr = `${targetY}-${String(targetM).padStart(2, '0')}`;
    onMonthChange(monthStr);
  };

  // Generate calendar grid
  const daysInCurrentMonth = new Date(viewYear, viewMonth, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const prevMonthDaysCount = new Date(viewYear, viewMonth - 1, 0).getDate();

  const calendarDays: Array<{ day: number; isCurrentMonth: boolean; offsetMonth: number }> = [];

  // Previous month trailing days
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

  // Next month leading days (fill up to 35 or 42 cells)
  const totalCells = calendarDays.length > 35 ? 42 : 35;
  const remaining = totalCells - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({
      day: d,
      isCurrentMonth: false,
      offsetMonth: 1,
    });
  }

  // Format header date: e.g. "Sunday, 30 August"
  const getTopHeaderDateString = () => {
    try {
      const dObj = new Date(viewYear, viewMonth - 1, selectedDay || 1);
      const dayName = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ][dObj.getDay()];
      return `${dayName}, ${selectedDay} ${monthNames[viewMonth - 1]}`;
    } catch {
      return `${monthNames[viewMonth - 1]} ${viewYear}`;
    }
  };

  const triggerLabel = `${monthNames[viewMonth - 1]}, ${viewYear}`;

  return (
    <Wrapper ref={containerRef}>
      <TriggerButton type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <CalendarIcon size={15} color="#0d1319" />
        <span>{triggerLabel}</span>
        <ChevronDown size={14} color="#64748b" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </TriggerButton>

      {isOpen && (
        <PopoverContainer>
          {/* Top Date & Collapse Box */}
          <TopHeader>
            <div className="top-date">{getTopHeaderDateString()}</div>
            <div className="chevron-box" onClick={() => setIsOpen(false)} title="Close Calendar">
              <ChevronDown size={16} />
            </div>
          </TopHeader>

          {/* Month Title & Nav Arrows */}
          <MonthNavRow>
            <div className="month-title">
              {monthNames[viewMonth - 1]}, {viewYear}
            </div>
            <div className="nav-arrows">
              <button type="button" className="arrow-btn" onClick={handlePrevMonth} title="Previous Month">
                <ChevronUp size={16} />
              </button>
              <button type="button" className="arrow-btn" onClick={handleNextMonth} title="Next Month">
                <ChevronDown size={16} />
              </button>
            </div>
          </MonthNavRow>

          {/* Weekday Row */}
          <WeekdaysRow>
            {daysOfWeek.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </WeekdaysRow>

          {/* Days Grid */}
          <DaysGrid>
            {calendarDays.map((c, idx) => {
              const isSelected = c.isCurrentMonth && c.day === selectedDay;
              return (
                <DayCell
                  key={idx}
                  $isCurrentMonth={c.isCurrentMonth}
                  $isSelected={isSelected}
                  onClick={() => handleSelectDay(c.day, c.isCurrentMonth, c.offsetMonth)}
                >
                  {c.day}
                </DayCell>
              );
            })}
          </DaysGrid>

          {/* Bottom Bar matching reference image */}
          <BottomBar>
            <div className="stepper">
              <button type="button" className="step-btn" onClick={handlePrevMonth} title="Step back 1 month">
                -
              </button>
              <span>{monthNames[viewMonth - 1].slice(0, 3)}</span>
              <button type="button" className="step-btn" onClick={handleNextMonth} title="Step forward 1 month">
                +
              </button>
            </div>

            <button type="button" className="focus-btn" onClick={handleJumpToToday}>
              <Play size={10} fill="#ffffff" /> Today
            </button>
          </BottomBar>
        </PopoverContainer>
      )}
    </Wrapper>
  );
};
