import React, { FC } from 'react';

interface SortProps {
  height?: number;
  width?: number;
  color?: string;
  colIndex?: number;
  sort?: {
    colId: number;
    sortType: 'none' | 'asc' | 'desc';
  };
  onClick?: (sortType: 'asc' | 'desc' | 'none') => void;
}

/**
 * Sort2 is a component that renders a pair of triangle icons for sorting a
 * table. It takes in a height and width prop to control the size of the
 * component, a color prop to control the color of the icons, a colIndex prop
 * to control which column the component is attached to, and a sort prop to
 * control the current sort state of the table. It also takes in an onClick
 * callback function that is called when the component is clicked. If the
 * component is clicked and the current sort state is 'none', it calls the
 * onClick callback with the argument 'asc'. If the component is clicked and
 * the current sort state is 'asc', it calls the onClick callback with the
 * argument 'desc'. If the component is clicked and the current sort state is
 * 'desc', it calls the onClick callback with the argument 'none'. It renders
 * nothing if the component is not attached to the current column.
 * 
 * Props:
 * - height (number, optional): The height of the component. Defaults to 1.
 * - width (number, optional): The width of the component. Defaults to 1.
 * - color (string, optional): The color of the component. Defaults to 'currentColor'.
 * - colIndex (number, optional): The index of the column the component is attached to. Defaults to 0.
 * - sort (object, optional): The current sort state of the table. Defaults to { colId: 0, sortType: 'none' }.
 * - onClick (function, optional): The callback function that is called when the component is clicked. Defaults to (str) => {}.
 * @returns {JSX.Element}
 */
export const Sort2: FC<SortProps> = ({
  height = 1,
  width = 1,
  color = 'currentColor',
  colIndex = 0,
  sort = { colId: 0, sortType: 'none' },
  onClick = (str) => {},
}) => {
  if ((sort.sortType === 'none' && sort.colId === colIndex) || sort.colId !== colIndex) {
    return (
      <div className="svg-wrapper" onClick={() => onClick('asc')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={`${width / 2}em`} height={`${height / 2}em`} viewBox="0 0 24 24">
          <path fill={color} d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1ZM8 14h7.9L12 9.18Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width={`${width / 2}em`} height={`${height / 2}em`} viewBox="0 0 24 24">
          <path fill={color} d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17Zm-3.91-7L12 14.82L16 10Z"></path>
        </svg>
      </div>
    );
  }

  if (sort.sortType === 'asc' && sort.colId === colIndex) {
    return (
      <div className="svg-wrapper" onClick={() => onClick('desc')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={`${width / 2}em`} height={`${height / 2}em`} viewBox="0 0 24 24">
          <path fill={color} d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width={`${width / 2}em`} height={`${height / 2}em`} viewBox="0 0 24 24">
          <path fill={color} d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17Zm-3.91-7L12 14.82L16 10Z"></path>
        </svg>
      </div>
    );
  }

  if (sort.sortType === 'desc' && sort.colId === colIndex) {
    return (
      <div className="svg-wrapper" onClick={() => onClick('none')}>
        <svg xmlns="http://www.w3.org/2000/svg" width={`${width / 2}em`} height={`${height / 2}em`} viewBox="0 0 24 24">
          <path fill={color} d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1ZM8 14h7.9L12 9.18Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width={`${width / 2}em`} height={`${height / 2}em`} viewBox="0 0 24 24">
          <path fill={color} d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17Z"></path>
        </svg>
      </div>
    );
  }

  return null;
};
