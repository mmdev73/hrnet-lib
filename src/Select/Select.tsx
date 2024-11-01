import React, { useState, useRef, useEffect } from 'react';
import './Select.scss';
import chevron from '../assets/horizontal-chevron.png';

interface SelectProps {
  id: string;
  label: string;
  options: string[];
  onChange: (value: string) => void;
  defaultValue?: string | null;
  labelPosition?: 'left' | 'right' | 'center';
}

/**
 * A custom select component that allows users to choose from a list of options.
 * 
 * Props:
 * - id (string): The unique identifier for the component.
 * - label (string): The label text displayed for the select component.
 * - options (string[]): An array of options available for selection.
 * - defaultValue (string | null, optional): The default selected option, if any.
 * - onChange (function): Callback function triggered when the selected option changes.
 * - labelPosition ('left' | 'right' | 'center', optional): Position of the label relative to the select component. Defaults to 'left'.
 * 
 * The component maintains state for the open/closed status of the dropdown,
 * the currently selected option, and the index of the focused option.
 * It supports keyboard navigation with arrow keys, enter to select, and escape to close the dropdown.
 * Clicking outside the dropdown will also close it.
 */
const Select: React.FC<SelectProps> = ({ 
  id, 
  label, 
  options, 
  onChange,
  defaultValue = null, 
  labelPosition = 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultValue);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  /**
   * Handles an option click event by setting the selected option,
   * calling the provided onChange callback with the selected option,
   * and closing the dropdown.
   * @param {string} option The selected option.
   */
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

/**
 * Toggles the dropdown's open/closed state.
 * If opening the dropdown, resets the focused index.
 */
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setFocusedIndex(-1);
  };

  /**
   * Handles a change event for the hidden select element
   * by setting the selected option to the value of the selected option.
   * @param {React.ChangeEvent<HTMLSelectElement>} event The change event.
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
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
        setTimeout(() => setIsOpen(false), 100);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    /**
     * Handles a keydown event for the dropdown by performing the following operations:
     * - If the dropdown is not open, does nothing.
     * - If the down arrow key is pressed, sets the focused index to the next index
     *   in the list of options, or to 0 if the focused index is the last option.
     * - If the up arrow key is pressed, sets the focused index to the previous index
     *   in the list of options, or to the last option if the focused index is 0.
     * - If the Enter key is pressed, calls the handleOptionClick function with the
     *   selected option if the focused index is valid.
     * - If the Escape key is pressed, sets the isOpen state to false.
     * @param {KeyboardEvent} event The keydown event.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          setFocusedIndex((prevIndex) =>
            prevIndex < options.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case 'ArrowUp':
          setFocusedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : options.length - 1
          );
          break;
        case 'Enter':
          if (focusedIndex >= 0) {
            handleOptionClick(options[focusedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, focusedIndex, options]);

  /**
   * Sets the isOpen state to true when the user focuses the select element.
   * This is used to open the dropdown when the user clicks on the select element.
   */
  const handleFocus = () => {
    setIsOpen(true);
  };

  /**
   * Sets the isOpen state to false when the user blurs the select element.
   * This is used to close the dropdown when the user clicks outside of it.
   */
  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className="hrn-select__container">
      <label htmlFor={id} className={`hrn-select__label hrn-select__label--${labelPosition}`}>{label}</label>
      <select
        name={id}
        id={id}
        className="hrn-select__input"
        tabIndex={-1}
        value={selectedOption || ''} 
        onChange={handleChange}
        ref={selectRef}
      >
        <option value="" disabled>{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <div
        className="hrn-select"
        id={id}
        ref={dropdownRef}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="hrn-select__selected" onClick={handleDropdownClick}>
          {selectedOption || label}
          <img
            width="16px"
            height="16px"
            src={chevron}
            alt=""
            className={isOpen ? "hrn-select__selected__img hrn-select__selected__img--open" : "hrn-select__selected__img"}
          />
        </div>
        {isOpen && (
          <div className="hrn-select__options">
            {options.map((option, index) => (
              <div
                key={index}
                className={`hrn-select__options__option${index === focusedIndex ? ' hrn-select__options__option--focused' : ''}${option === selectedOption ? ' hrn-select__options__option--selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
