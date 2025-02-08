import { format, sub } from "date-fns";

export const getYearMonthDay = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 2}`;

export const getNDayMonth = (date: Date) => format(date, "do MMM");

export const getNDayNMonth = (date: Date) => format(date, "d.MM");

export const getNDayNMonthNYearAtShortTime = (date: Date) =>
  format(date, "P 'at' p");

export const getCurrentDateNoTime = () => getYearMonthDay(new Date());

export const getPreviousMonthDateNoTime = () => {
  const previousMonth = sub(new Date(), { months: 1 });

  return getYearMonthDay(previousMonth);
};
