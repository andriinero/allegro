import { format, add } from "date-fns";

export const formatYearMonthDay = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 2}`;

export const formatWeekdayDayMonth = (date: Date) => format(date, "ccc, d MMM");

export const formatWeekdayDayMonthTime = (date: Date) =>
  format(date, "ccc, d MMM 'at' p");

export const formatTime = (date: Date) => format(date, "p");

export const formatNDayNMonth = (date: Date) => format(date, "d.MM");

export const formatDayMonthYearTime = (date: Date) => format(date, "P 'at' p");

export const formatCurrentDateNoTime = () => formatYearMonthDay(new Date());

export const formatCurrentMonthDateRange = () => {
  const dateEnd = add(new Date(), { days: 1 });

  const dateStart = new Date(dateEnd);
  dateStart.setDate(1);

  return {
    dateStart: new Date(dateStart.toDateString()),
    dateEnd: new Date(dateEnd.toDateString()),
  };
};

export const formatPreviousMonthDateRange = () => {
  const dateEnd = new Date();
  dateEnd.setDate(0);

  const dateStart = new Date(dateEnd);
  dateStart.setDate(1);

  return {
    dateStart: new Date(dateStart.toDateString()),
    dateEnd: new Date(dateEnd.toDateString()),
  };
};
