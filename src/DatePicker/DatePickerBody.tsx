import React, { useContext, useEffect, useState } from 'react';
import { DatePickerContext } from './DPContext';
import { dateServices } from './dateServices';

interface DayMonth {
  prevMonth: number[];
  currentMonth: number[];
  nextMonth: number[];
}

/**
 * DatePickerBody component
 *
 * This component renders the calendar body of the date picker.
 * It gets the day, month and year from the context and renders the corresponding
 * calendar days. It also handles the selection of a day and updates the context
 * with the selected date.
 *
 * @returns {ReactElement} The DatePickerBody component
 * @example
 * <DatePickerBody />
 */
const DatePickerBody: React.FC = () => {
  const { day, month, year, setDate } = useContext(DatePickerContext)!;
  const [dayMonth, setDayMonth] = useState<DayMonth>(() => dateServices.getMonthNbrArr(year, month));
  const [currentMonth, setCurrentMonth] = useState<number>(month);
  const [currentYear, setCurrentYear] = useState<number>(year);

  useEffect(() => {    
    setDayMonth(dateServices.getMonthNbrArr(year, month));
  }, [month, year]);


  /**
   * Handles the selection of a day in the calendar
   *
   * @param {number} day - The day number to select
   */
  const handleSelectDay = (day: number) => {
    const dateSelected = new Date(year, month, day);
    setCurrentMonth(month);
    setCurrentYear(year);
    setDate(dateSelected);
  };

  return (
    <>
      <div className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--header">
        Mon
      </div>
      <div className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--header">
        Tue
      </div>
      <div className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--header">
        Wed
      </div>
      <div className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--header">
        Thu
      </div>
      <div className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--header">
        Fri
      </div>
      <div className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--header">
        Sat
      </div>
      <div className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--header">
        Sun
      </div>
      {dayMonth.prevMonth && dayMonth.prevMonth.map((day, index) => (
        <div
          className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--disabled"
          key={index}
        >
          {day}
        </div>
      ))}
      {dayMonth.currentMonth && dayMonth.currentMonth.map((dayToDisplay, index) => {
        return (
        <div
          className={`hrn-dpi__group__picker__body__row__col${((currentYear === year) && (currentMonth === month) && (day === dayToDisplay)) ? ' hrn-dpi__group__picker__body__row__col--active' : ''}`}
          key={index}
          onClick={() => handleSelectDay(dayToDisplay)}
        >
          {dayToDisplay}
        </div>
      )})}
      {dayMonth.nextMonth && dayMonth.nextMonth.map((day, index) => {
        return (
        <div
          className="hrn-dpi__group__picker__body__row__col hrn-dpi__group__picker__body__row__col--disabled"
          key={index}
        >
          {day}
        </div>
      )})}
    </>
  );
};

export default DatePickerBody;
