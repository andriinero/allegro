import type { PrismaClient } from "@prisma/client";
import { getCurrentMonthDateRange, getPreviousMonthDateRange } from "./date";

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
) {
  const { dateStart: currStart, dateEnd: currEnd } = getCurrentMonthDateRange();
  const { dateStart: prevStart, dateEnd: prevEnd } =
    getPreviousMonthDateRange();
  const modelAccess = db[model] as {
    count: (args?: { where: unknown }) => Promise<number>;
  };

  const [total, currentMonth, previousMonth] = await Promise.all([
    modelAccess.count(),
    modelAccess.count({
      where: getDateRangeWhereClause("createdAt", currStart, currEnd),
    }),
    modelAccess.count({
      where: getDateRangeWhereClause("createdAt", prevStart, prevEnd),
    }),
  ]);

  return { total, currentMonth, previousMonth };
}
