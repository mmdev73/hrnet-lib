import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import DatePickerBody from './DatePickerBody';
import DatePickerHeadMonth from './DatePickerHeadMonth';
import DatePickerHeadYear from './DatePickerHeadYear';
import { dateServices } from './dateServices';
import './DatePicker.scss';
import chevron from '../assets/horizontal-chevron.png';
import calendar from '../assets/calendar.png';
import { DatePickerContext } from './DPContext';
interface DatePickerProps {
  label: string;
  id: string;
  value: string;
  onChange: (date: string) => void;
  dateOptions?: Intl.DateTimeFormatOptions;
  localDate?: string;
  labelPosition?: 'left' | 'right' | 'center';
  initialDaysOffset?: number;
}


/**
 * A Date Picker component.
 * Props :
 * - label (string): The label of the date picker. It is required.
 * - id (string): The id of the date picker. It is required.
 * - value (string): The value of the date picker. It is required.
 * - onChange (function): The function to call when the date picker value changes. It is required.
 * - dateOptions (object): The options for the date format. By default, it is set to { year: 'numeric', month: 'long', day: 'numeric' }.
 * - localDate (string): The locale for the date format. By default, it is set to 'en-US'.
 * - labelPosition ('left' | 'right' | 'center'): Position of the label relative to the select component. Defaults to 'left'.
 * - initialDaysOffset (number): The number of days to offset the initial date. Defaults to 0.
* @returns {React.ReactElement} The rendered component.
 */
const DatePicker: React.FC<DatePickerProps> = ({ 
  label,
   id, 
   value, 
   onChange, 
   dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
   localDate = 'en-US',
   labelPosition = 'left',
   initialDaysOffset = 0
  }): React.ReactElement => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const calculateInitialDate = () => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + initialDaysOffset);
    return baseDate;
  };

  const [date, setDate] = useState<Date>(calculateInitialDate);
  const [open, setOpen] = useState<boolean>(false);
  const [day, setDay] = useState<number>(date.getUTCDate());
  const [month, setMonth] = useState<number>(date.getMonth());
  const [year, setYear] = useState<number>(date.getFullYear());
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  },[date])

  /**
   * Handles the click event on the date picker.
   * Toggles the open status of the date picker.
   */
  const handleClick = () => {
    setOpen(!open);
  };

  /**
   * Handles the click event on the next button.
   * If the current month is not december, it increments the month by one.
   * Otherwise, it sets the month to january and increments the year by one.
   */
  const handleClickNext = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  /**
   * Handles the click event on the previous button.
   * If the current month is not january, it decrements the month by one.
   * Otherwise, it sets the month to december and decrements the year by one.
   */
  const handleClickPrevious = () => {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  useEffect(() => {
    const dOptions = dateOptions || { year: 'numeric', month: 'long', day: '2-digit' };
    const dLocale = localDate || 'en-US';
    const selectedDate = date.toLocaleDateString(dLocale, dOptions);
    onChange(selectedDate);
    setOpen(false);
  }, [date, dateOptions, localDate, onChange]);

  useEffect(() => {
    /**
     * Handles a click outside the date picker by closing the date picker.
     * Checks if the event target is not a child of the date picker element
     * and if so, sets the open state to false.
     * @param {MouseEvent} event The click event.
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setTimeout(() => setOpen(false), 100);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  /**
   * Handles a change event for the input element.
   * If the input value is a valid date or an empty string, it updates the date state
   * and sets the error state to false. Otherwise, it sets the error state to true.
   * @param {ChangeEvent<HTMLInputElement>} e The change event.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (dateServices.isValidDate(newValue) || newValue === '') {
      setDate(new Date(newValue));
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <DatePickerContext.Provider value={{ day,setDay,month, setMonth, year, setYear, date, setDate }}>
      <div ref={datePickerRef} className={`hrn-dpi__group`}>
        <label htmlFor={id} className={`hrn-dpi__group__label hrn-dpi__group__label--${labelPosition}`}>{label}</label>
        <input
          type="text"
          className={`hrn-dpi__group__input${error ? ' hrn-dpi__group__input--error' : ''}`}
          id={id}
          name={id}
          value={value}
          onClick={handleClick}
          onChange={handleInputChange}
        />
        <span className="hrn-dpi__group__icon" onClick={handleClick}>
          <img src={calendar} alt="calendar" className="hrn-dpi__group__icon__img" />
        </span>
        {open && (
          <div className="hrn-dpi__group__picker">
            <div className="hrn-dpi__group__picker__header">
              <DatePickerHeadMonth />
              <DatePickerHeadYear />
              <img
                src={chevron}
                alt="previous"
                className="hrn-dpi__group__picker__header__nav hrn-dpi__group__picker__header__nav--reverse"
                onClick={handleClickPrevious}
              />
              <img
                src={chevron}
                alt="next"
                className="hrn-dpi__group__picker__header__nav"
                onClick={handleClickNext}
              />
            </div>
            <div className="hrn-dpi__group__picker__body">
              <DatePickerBody />
            </div>
          </div>
        )}
      </div>
    </DatePickerContext.Provider>
  );
};

export default DatePicker;