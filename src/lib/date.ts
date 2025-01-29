import { format } from "date-fns";

export const getNDayMonth = (date: Date) => format(date, "do MMM");

export const getNDayNMonth = (date: Date) => format(date, "d.MM");

export const getNDayNMonthNYearAtShortTime = (date: Date) =>
  format(date, "P 'at' p");
