import React, { useContext } from 'react';
import { DatePickerContext } from './DPContext';
import DatePickerSelect from './DatePickerSelect';
import { dateServices } from './dateServices';

/**
 * DatePickerHeadMonth is a sub-component of DatePicker, this component
 * render a select element that contains the name of all months.
 * The user can select one month from the dropdown list, and the
 * selected month would be passed to DatePickerContext.
 * @returns {React.ReactElement} A select element containing the name of all months.
 */
const DatePickerHeadMonth: React.FC = () => {
  const { month, setMonth } = useContext(DatePickerContext)!;
  const monthNameStr = dateServices.getMonthName(month);
  const monthNames = dateServices.getMonthArray();

  /**
   * Handles a change event for the month select element
   * by setting the selected month to the value of the selected month.
   * @param {string} value The value of the selected month.
   */
  const handleSelectChange = (value: string) => {
    setMonth(dateServices.getMonthIndex(value));
  };

  return (
    <DatePickerSelect 
      options={monthNames} 
      onChange={handleSelectChange} 
      defaultValue={monthNameStr} 
      type="month"
    />
  );
};

export default DatePickerHeadMonth;
