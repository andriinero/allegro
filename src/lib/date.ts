import { format, add } from "date-fns";

export const getYearMonthDay = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 2}`;

export const getWeekdayDayMonthShortTime = (date: Date) =>
  format(date, "ccc, d MMM 'at' p");

export const getNDayNMonth = (date: Date) => format(date, "d.MM");

export const getDayMonthYearShortTime = (date: Date) =>
  format(date, "P 'at' p");

export const getCurrentDateNoTime = () => getYearMonthDay(new Date());

export const getCurrentMonthDateRange = () => {
  const dateEnd = add(new Date(), { days: 1 });

  const dateStart = new Date(dateEnd);
  dateStart.setDate(1);

  return {
    dateStart: new Date(dateStart.toDateString()),
    dateEnd: new Date(dateEnd.toDateString()),
  };
};

export const getPreviousMonthDateRange = () => {
  const dateEnd = new Date();
  dateEnd.setDate(0);

  const dateStart = new Date(dateEnd);
  dateStart.setDate(1);

  return {
    dateStart: new Date(dateStart.toDateString()),
    dateEnd: new Date(dateEnd.toDateString()),
  };
};
