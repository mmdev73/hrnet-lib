
interface DateServices {
  getDaysInMonth: (year: number, month: number) => number;
  getDaysInPrevMonth: (year: number, month: number) => number;
  getMonthName: (monthNbr: number) => string;
  getMonthIndex: (monthName: string) => number;
  getMonthArray: () => string[];
  getFirstDayOfPreviousMonth: (year: number, month: number) => number;
  getLastDayOfPreviousMonth: (year: number, month: number) => number; // added 29-10-24
  getFirstDayOfMonth: (year: number, month: number) => number;
  getLastDayOfMonth: (year: number, month: number) => number;
  getIntervalDays: (dayIndex: number, reverse?: boolean) => number;
  getMonthNbrArr: (year: number, month: number) => {
    prevMonth: number[],
    currentMonth: number[],
    nextMonth: number[]
  };
  isValidDate: (input: string) => boolean;
}

export const dateServices: DateServices = {
  /**
   * Get number of days in a month
   * @param year (number)
   * @param month (number) 
   * @returns (number)
   */
  getDaysInMonth: (year: number, month: number): number => new Date(year, month + 1, 0).getDate(),
  
  /**
   * Get number of days in previous month
   * @param year (number)
   * @param month (number) 
   * @returns (number)
   */
  getDaysInPrevMonth: (year: number, month: number): number => new Date(year, month, 0).getDate(),
  
  /**
   * Get the name of a month given its number
   * @param monthNbr (number) The number of the month, between 1 and 12
   * @returns (string) The name of the month
   * @throws {Error} Invalid month number. It should be between 1 and 12.
   */
  getMonthName: (monthNbr: number): string => {
    if (monthNbr < 0 || monthNbr > 11) {
      throw new Error("Invalid month number. It should be between 1 and 12.");
    }
    return monthNames[monthNbr];
  },

  /**
   * Get the index of a month given its name
   * @param monthName (string) The name of the month
   * @returns (number) The index of the month
   */
  getMonthIndex: (monthName: string): number => monthNames.indexOf(monthName),
  
  /**
   * Get an array of all month names
   * @returns (string[]) An array of all month names
   */
  getMonthArray: (): string[] => monthNames,
  
/**
 * Get the index of the first day of the month.
 * @param year (number) The year for which to get the first day.
 * @param month (number) The month for which to get the first day, 0-indexed (0 for January, 11 for December).
 * @param log (boolean) Optional. If true, logs the year, month, and name of the first day.
 * @returns (number) The index of the first day of the month (0 for Sunday, 6 for Saturday).
 */
  getFirstDayOfMonth: (year: number, month: number, log: boolean = false): number => {
    if (log) {
      console.log(`Year : ${year}, Month : ${month} => ${dayNames[new Date(year, month, 1).getDay()]}`);
    }
    return new Date(year, month, 1).getDay();
  },
  
  /**
   * Get the index of the last day of the month.
   * @param year (number) The year for which to get the last day.
   * @param month (number) The month for which to get the last day, 0-indexed (0 for January, 11 for December).
   * @param log (boolean) Optional. If true, logs the year, month, and name of the last day.
   * @returns (number) The index of the last day of the month (0 for Sunday, 6 for Saturday).
   */
  getLastDayOfMonth: (year: number, month: number, log: boolean = false): number => {
    if (log) {
      console.log(`Year : ${year}, Month : ${month} => ${dayNames[new Date(year, month + 1, 0).getDay()]}`);
    }
    return new Date(year, month + 1, 0).getDay();
  },
  
  /**
   * Get the index of the first day of the previous month.
   * @param year (number) The year for which to get the first day.
   * @param month (number) The month for which to get the first day, 0-indexed (0 for January, 11 for December).
   * @returns (number) The index of the first day of the previous month (0 for Sunday, 6 for Saturday).
   */
  getFirstDayOfPreviousMonth: (year: number, month: number): number => new Date(year, month - 1, 1).getDay(),

  /**
   * Get the index of the last day of the previous month.
   * @param year (number) The year for which to get the last day.
   * @param month (number) The month for which to get the last day, 0-indexed (0 for January, 11 for December).
   * @returns (number) The index of the last day of the previous month (0 for Sunday, 6 for Saturday).
   */
  getLastDayOfPreviousMonth: (year: number, month: number): number => new Date(year, month, 0).getDate(), // added 29-10-24
  
/**
 * Generates an object containing arrays of day numbers for the previous, current, and next months.
 * 
 * For the given year and month, this function calculates the day numbers for the current month,
 * as well as the necessary day numbers from the previous and next months to fill out a complete
 * calendar grid (typically starting on Monday and ending on Sunday).
 * 
 * @param {number} year - The year for which to generate the month numbers.
 * @param {number} month - The month for which to generate the month numbers, 0-indexed (0 for January, 11 for December).
 * @returns {{ prevMonth: number[], currentMonth: number[], nextMonth: number[] }}
 * An object containing three arrays: 
 * - `prevMonth`: The day numbers from the previous month that appear in the current month's calendar grid.
 * - `currentMonth`: The day numbers of the current month.
 * - `nextMonth`: The day numbers from the next month that appear in the current month's calendar grid.
 */
  getMonthNbrArr: (year: number, month: number): { prevMonth: number[], currentMonth: number[], nextMonth: number[] } => {
    const firstDayOfThisMonth = (dateServices.getFirstDayOfMonth(year, month) === 0) ? 7 : dateServices.getFirstDayOfMonth(year, month);
    const lastDayOfThisMonth = (dateServices.getLastDayOfMonth(year, month) === 0) ? 7 : dateServices.getLastDayOfMonth(year, month);
    const daysInMonth = dateServices.getDaysInMonth(year, month);
    const lastDayOfPreviousMonth = dateServices.getLastDayOfPreviousMonth(year, month);
    const prevMonth: number[] = [];
    const currentMonth: number[] = [];
    const nextMonth: number[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      currentMonth.push(i);
    }
    
    const negativeDays = dateServices.getIntervalDays(firstDayOfThisMonth);
    const positiveDays = dateServices.getIntervalDays(lastDayOfThisMonth, true);
    
    if (negativeDays > 0) {
      // updated 29-10-24
      for (let i = (lastDayOfPreviousMonth - Math.abs(negativeDays)); i <= lastDayOfPreviousMonth; i++) {
        prevMonth.push(i);
      }
    }
    
    if (positiveDays > 0) {
      for (let i = 1; i <= positiveDays; i++) {
        nextMonth.push(i);
      }
    }
    
    return {
      prevMonth,
      currentMonth,
      nextMonth
    };
  },
  
  /**
   * Calculates the number of days between a given day index and the beginning
   * or end of the week, depending on the value of the reverse parameter.
   *
   * @param {number} dayIndex The index of the day of the week (0 for Sunday, 6 for Saturday)
   * @param {boolean} reverse If true, calculates the number of days between the day index and the end of the week.
   * @returns {number} The number of days between the day index and the beginning or end of the week.
   */
  getIntervalDays: (dayIndex: number, reverse: boolean = false): number => {
    if (reverse) {
      return (7 - dayIndex);
    }
    return (dayIndex - 1);
  },

  /**
   * Validates if the given string input is a valid date.
   *
   * @param {string} input The date string to validate.
   * @returns {boolean} True if the input is a valid date, false otherwise.
   */
  isValidDate: (input: string): boolean => {
    const date = new Date(input).getTime();
    return !isNaN(date);
  },
};

const monthNames: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames: string[] = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
