import React from "react";
interface DatePickerContextProps {
  day: number;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const DatePickerContext = React.createContext<DatePickerContextProps | null>(null);