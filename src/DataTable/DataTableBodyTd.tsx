import React, { ReactNode } from 'react'

interface DataTableBodyTdProps {
  data?: any;
  isADate?: boolean;
  localDate?: string;
  dateOptions?: Intl.DateTimeFormatOptions;
}

const DataTableBodyTd: React.FC<DataTableBodyTdProps> = ({
  data = '',
  isADate = false,
  localDate = 'en-US',
  dateOptions = { year: 'numeric', month: 'long', day: '2-digit' },
}) => {

  /**
   * Formats a date in the format specified by the dateOptions object, using
   * the locale specified by the localDate string.
   * @returns {string} A string representation of the date in the format
   *   specified by the dateOptions object, using the locale specified by the
   *   localDate string.
   */
  const dateDisplay = (): string => {
    //console.log('data', data)
    //console.log('typeof data', typeof data)
    //console.log('data formated', new Date(data).toLocaleDateString(localDate,dateOptions))
    return new Date(data).toLocaleDateString(localDate,dateOptions)
  }

  if (isADate) {
    return (
      <td className="hrn-table__tbody__tr__td">
        {dateDisplay()}
      </td>
    );
  }
  return (
    <td className="hrn-table__tbody__tr__td">
      {data}
    </td>
  );
}

export default DataTableBodyTd;
