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
  if (isADate) {
    return (
      <td className="hrn-table__tbody__tr__td">
        {new Date(data).toLocaleDateString(localDate, dateOptions)}
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
