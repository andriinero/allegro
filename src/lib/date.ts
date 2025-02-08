import { format, sub } from "date-fns";

export const getYearMonthDay = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 2}`;

export const getNDayMonth = (date: Date) => format(date, "do MMM");

export const getNDayNMonth = (date: Date) => format(date, "d.MM");

export const getNDayNMonthNYearAtShortTime = (date: Date) =>
  format(date, "P 'at' p");

export const getCurrentDateNoTime = () => getYearMonthDay(new Date());

export const getCurrentMonthRange = () => {
  const dateEnd = new Date();

  const dateStart = new Date(dateEnd);
  dateStart.setDate(1);

  return {
    dateStart: new Date(dateStart.toDateString()),
    dateEnd: new Date(dateEnd.toDateString()),
  };
};

export const getPreviousMonthRange = () => {
  const dateEnd = new Date();
  dateEnd.setDate(0);

  const dateStart = new Date(dateEnd);
  dateStart.setDate(1);

  return {
    dateStart: new Date(dateStart.toDateString()),
    dateEnd: new Date(dateEnd.toDateString()),
  };
};
