import React, { useContext } from 'react';
import { DatePickerContext } from './DPContext';
import DatePickerSelect from './DatePickerSelect';

/**
 * DatePickerHeadYear is a sub-component of DatePicker, this component
 * render a select element that contains the year from current year to
 * 81 years ago. The user can select one year from the dropdown list, and
 * the selected year would be passed to DatePickerContext.
 * @returns {React.ReactElement} A select element containing the year from
 * current year to 81 years ago.
 */
const DatePickerHeadYear: React.FC = () => {
  const { year, setYear } = useContext(DatePickerContext)!;
  const currentYear = new Date().getFullYear();
  const yearArr = Array.from({ length: 81 }, (_:number, i:number) => currentYear - i);

  /**
   * Handles a change event for the year select element
   * by setting the selected year to the value of the selected year.
   * @param {string} value The value of the selected year.
   */
  const handleSelectChange = (value: string) => {
    setYear(Number(value));
  };

  return (
    <DatePickerSelect 
      options={yearArr.map((year : number) => year.toString())}
      onChange={handleSelectChange} 
      defaultValue={year.toString()} 
    />
  );
};

export default DatePickerHeadYear;
