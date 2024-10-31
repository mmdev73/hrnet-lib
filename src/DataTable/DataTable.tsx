import React, { useEffect, useState } from 'react';
import './DataTable.scss';
import DataTableBodyTd from './DataTableBodyTd';
import { Sort2 } from '../assets/Sort2';


interface DataTableProps {
  id?: string;
  headColumnList: string[];
  dataPropertiesList: string[];
  bodyDataList: Record<string, any>[];
  options?: [boolean, boolean, number];
  isDateData?: string[];
  dateOptions?: Intl.DateTimeFormatOptions;
  localDate?: string;
}

interface SortState {
  colId: number;
  sortType: "asc" | "desc" | "none";
}

/**
 * DataTable component is a customizable table component that supports features
 * like searching, sorting, and pagination. It takes various props to configure
 * its behavior and appearance.
 *
 * Props:
 * - id (string, optional): The unique identifier for the table component.
 * - headColumnList (string[]): List of column headers for the table.
 * - dataPropertiesList (string[]): List of property names to be displayed in each column.
 * - bodyDataList (Record<string, any>[]): Array of data records to be displayed in the table body.
 * - options ([boolean, boolean, number], optional): An array where the first element
 *   enables/disables search, the second enables/disables sorting, and the third sets
 *   the default number of items per page. Defaults to [true, true, 5].
 * - isDateData (string[], optional): List of properties that represent date data.
 *   Defaults to ['dob', 'start'].
 * - dateOptions (Intl.DateTimeFormatOptions, optional): Options for formatting date
 *   fields. Defaults to { year: 'numeric', month: 'long', day: '2-digit' }.
 * - localDate (string, optional): Locale string for date formatting. Defaults to 'en-US'.
 *
 * The component features search functionality when the search option is enabled, sorting
 * for each column when the sort option is enabled, and pagination to navigate through
 * the data. It displays a message when no data is found.
 */
const DataTable: React.FC<DataTableProps> = ({
  id,
  headColumnList,
  dataPropertiesList,
  bodyDataList,
  options = [true, true, 5],
  isDateData = ['dob', 'start'],
  dateOptions = {year: 'numeric',month: 'long',day: '2-digit'},
  localDate = 'en-US',
}) => {
  // Datas to display
  const [dataToDisplay, setDataToDisplay] = useState<Record<string, any>[]>(bodyDataList);
  const headList = headColumnList;
  const dataProperties = dataPropertiesList;

  if (!headList || !dataProperties) throw new Error('dataToDisplay or headList or dataProperties is not defined');

  // Options
  const searchOpt = options[0];
  const sortOpt = options[1];
  const [perPageOpt, setPerPageOpt] = useState<number>(parseInt(options[2].toString()));

  
/**
 * Handles the search input change event by filtering the data to display
 * based on the search text. If the search text is empty, it resets the data
 * to display to the original body data list. Filters the data by checking if
 * any value in the data record includes the search text (case-insensitive).
 * 
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the search input.
 */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    if (!searchText) {
      setDataToDisplay(bodyDataList);
      return;
    }
    const filteredData = bodyDataList.filter((item) => {
      const values = Object.values(item);
      return values.some((value: string) => value.toString().toLowerCase().includes(searchText.toLowerCase()));
    });
    setDataToDisplay(filteredData);
  };

  // Sort
  const [sort, setSort] = useState<SortState>({
    colId: 0,
    sortType: 'asc',
  });

  /**
   * Handles the sort click event by sorting the data to display based on the
   * current sort state. If the sort state is 'none', it resets the data to
   * display to the original body data list. Sorts the data by comparing the
   * values of the property specified by the current sort column ID in ascending
   * or descending order.
   */
  const handleSort = () => {
     if(!sort) return;
     const sortProperty = dataProperties[sort.colId];
     
     if(!sort.sortType){
      setDataToDisplay(bodyDataList);
      return;
     }

    let sortedData;
    if(sort.sortType === 'none'){
      sortedData = [...dataToDisplay];
    } else {
      sortedData = [...dataToDisplay].sort((a, b) => {
        if(sort.sortType === 'asc'){
          return a[sortProperty] > b[sortProperty] ? 1 : -1;
        } else {
          return a[sortProperty] < b[sortProperty] ? 1 : -1;
        }
      });
    }
    setDataToDisplay(sortedData);
  };

  React.useEffect(() => {
    handleSort();
  }, [sort]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(() => {
    return Math.ceil(dataToDisplay.length / perPageOpt);
  });

  /**
   * Handles the change event for the per-page select element by setting the
   * current number of items per page to the value of the selected option.
   * @param {React.ChangeEvent<HTMLSelectElement>} e The change event.
   */
  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = parseInt(e.target.value);
    setPerPageOpt(perPage);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(dataToDisplay.length / perPageOpt));
    setCurrentPage(1);
  }, [perPageOpt, dataToDisplay]);

  return (
    <div className="hrn-table-container">
      {searchOpt && (
        <div className="hrn-search">
          <label className="hrn-search__label" htmlFor="search">Search</label>
          <input className="hrn-search__input" id="search" type="text" placeholder="Search ..." onChange={handleSearch} />
        </div>
      )}
      <table className="hrn-table" id={id}>
        <thead className="hrn-table__thead">
          <tr className="hrn-table__thead__tr">
            {headList && headList.map((item: string, index: number) => {
              return (
                <th className="hrn-table__thead__tr__th" key={index}>
                  <span className="hrn-table__thead__tr__th__text">{item}</span>
                  {sortOpt && (
                    <span data-sort={index} onClick={handleSort} className="hrn-table__thead__tr__th__icon">
                      <Sort2
                        height={2}
                        width={2}
                        color="white"
                        colIndex={index}
                        sort={sort} 
                        onClick={(sortType: 'asc' | 'desc' | 'none') => setSort({colId: index, sortType: sortType})}
                      /> 
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="hrn-table__tbody">
        {
              (dataToDisplay && dataToDisplay.length <= perPageOpt) && dataToDisplay.map((item, index) => {
                return <tr className="hrn-table__tbody__tr" key={index}>
                  {
                    dataProperties && dataProperties.map((data, index) => {
                      if(isDateData.includes(data)){
                        return <DataTableBodyTd key={index} data={item[data]} dateOptions={dateOptions} localDate={localDate} isADate />
                      }
                      return <DataTableBodyTd key={index} data={item[data]} />
                    })
                  }
                </tr>
              })
            }
            {
              (dataToDisplay && dataToDisplay.length > perPageOpt) && dataToDisplay.slice((currentPage - 1) * perPageOpt, currentPage * perPageOpt).map((item, index) => {
                return <tr className="hrn-table__tbody__tr" key={index}>
                  {
                    dataProperties && dataProperties.map((data, index) => {
                      if(isDateData.includes(data)){
                        return <DataTableBodyTd key={index} data={item[data]} dateOptions={dateOptions} localDate={localDate} isADate />
                      }
                      return <DataTableBodyTd key={index} data={item[data]} />
                    })
                  }
                </tr>
              })
            }
            {
              dataToDisplay.length === 0 && <tr className="hrn-table__tbody__tr">
                <td className="hrn-table__tbody__tr__td table__tbody__tr__td--no-data" colSpan={headList.length}>No Data Found</td>
              </tr>
            }
        </tbody>
      </table>
      <div className="hrn-pagination">
        <label className="hrn-pagination__label" htmlFor="perPage">Show :</label>
        <select className="hrn-pagination__select" id="perPage" onChange={handlePerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <div className="hrn-pagination__pages">
          {Array.from({ length: totalPages }, (_: any, index: number) => index + 1).map((page: number) => (
            <button className={`pagination__pages__btn ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
