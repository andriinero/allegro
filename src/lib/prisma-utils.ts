import type { CursorPagination } from "@/schemas/pagination";
import type { PrismaClient } from "@prisma/client";
import {
  formatCurrentMonthDateRange,
  formatPreviousMonthDateRange,
} from "./date";

export const getDateRangeWhereClause = (
  fieldName: string,
  dateStart?: Date,
  dateEnd?: Date,
) =>
  dateStart && dateEnd
    ? {
        [fieldName]: {
          lte: dateEnd,
          gte: dateStart,
        },
      }
    : {};

export async function calculateMetrics<T extends keyof PrismaClient>(
  model: T,
  db: PrismaClient,
  where?: object,
) {
  const { dateStart: currStart, dateEnd: currEnd } =
    formatCurrentMonthDateRange();
  const { dateStart: prevStart, dateEnd: prevEnd } =
    formatPreviousMonthDateRange();
  const modelAccess = db[model] as {
    count: (args?: { where: unknown }) => Promise<number>;
  };

  const [total, currentMonth, previousMonth] = await Promise.all([
    modelAccess.count({ where }),
    modelAccess.count({
      where: {
        ...getDateRangeWhereClause("createdAt", currStart, currEnd),
        ...where,
      },
    }),
    modelAccess.count({
      where: {
        ...getDateRangeWhereClause("createdAt", prevStart, prevEnd),
        ...where,
      },
    }),
  ]);

  return { total, currentMonth, previousMonth };
}

export const getPaginationArgs = (pagination: CursorPagination) => {
  const take = pagination.take;
  const cursor = pagination.cursor ? pagination.cursor : undefined;
  const skip = cursor ? pagination.take * pagination.page + 1 : 0;

  return { take, skip, cursor };
};
