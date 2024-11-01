import React, { useState, useRef, useEffect, useContext } from 'react';
import { DatePickerContext } from './DPContext';
import { dateServices } from './dateServices';
//import './DatePickerSelect.scss';

interface DatePickerSelectProps {
  options: string[];
  onChange: (value: string) => void;
  defaultValue?: string;
  type?: 'month' | 'year';
  onFocus?: () => void;
  onBlur?: () => void;
}

/**
 * A dropdown select component that renders a list of options.
 * When an option is clicked, the selected option is set to the clicked option
 * and the dropdown is closed.
 * The selected option is also passed to the onChange function.
 * If the type is "month", the selected option is set to the month name
 * and the month is set to the selected option.
 * If the type is "year", the selected option is set to the year
 * and the year is set to the selected option.
 * Props: 
 * - options (string[]): An array of options available for selection.
 * - onChange (function): Callback function triggered when the selected option changes.
 * - defaultValue (string, optional): The default selected option, if any.
 * - type (string, optional): The type of the select component. Defaults to "year".
 * @returns {ReactElement} The rendered dropdown select component
 */
const DatePickerSelect: React.FC<DatePickerSelectProps> = ({ 
  options, 
  onChange, 
  defaultValue, 
  type = 'year',
  onFocus,
  onBlur 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { month, setMonth, year, setYear } = useContext(DatePickerContext)!;

  /**
   * Handles an option click event by setting the selected option,
   * closing the dropdown, and calling the provided onChange callback
   * with the selected option.
   * @param {string} option The selected option.
   */
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  /**
   * Toggles the dropdown's open/closed state.
   */
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
  /**
   * Handles a click outside the dropdown by closing the dropdown.
   * Checks if the event target is not a child of the dropdown element
   * and if so, sets the isOpen state to false.
   * @param {MouseEvent} event The click event.
   */
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (type === "month") {
      setSelectedOption(dateServices.getMonthName(month));
    }
    if (type === "year") {
      setSelectedOption(year.toString());
    }
  }, [month, year, type]);

  useEffect(() => {
    if (type === "month") {
      setMonth(dateServices.getMonthIndex(selectedOption));
    }
    if (type === "year") {
      setYear(Number(selectedOption));
    }
  }, [selectedOption, type]);

  return (
    <div className="hrn-dpi-select" ref={dropdownRef} onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
      <div className="hrn-dpi-select__selected" onClick={handleDropdownClick}>
        {selectedOption}
      </div>
      {isOpen && (
        <div className="hrn-dpi-select__options">
          {options.map((option, index) => (
            <div
              key={index}
              className={`hrn-dpi-select__options__option${option === selectedOption ? ' hrn-dpi-select__options__option--selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatePickerSelect;
