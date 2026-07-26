import { differenceInMinutes, format } from "date-fns";

export const formatYearMonthDay = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay() + 2}`;

export const formatWeekdayDayMonth = (date: Date) => format(date, "ccc, d MMM");

export const formatWeekdayDayMonthTime = (date: Date) =>
  format(date, "ccc, d MMM 'at' p");

export const formatTime = (date: Date) => format(date, "p");

export const formatNDayNMonth = (date: Date) => format(date, "d.MM");

export const formatDayMonthYearTime = (date: Date) => format(date, "P 'at' p");

export const formatCurrentDateNoTime = () => formatYearMonthDay(new Date());

export const formatDuration = (start: Date, end: Date) => {
  const totalMinutes = Math.max(differenceInMinutes(end, start), 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};
