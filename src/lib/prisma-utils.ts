import type { Pagination } from "@/schemas/pagination";
import type { PrismaClient } from "@prisma/client";
import { addMonths, startOfMonth, subMonths } from "date-fns";

export const getDateRangeWhereClause = (
  fieldName: string,
  dateStart?: Date,
  dateEnd?: Date
) =>
  dateStart && dateEnd
    ? {
        [fieldName]: {
          lte: dateEnd,
          gte: dateStart,
        },
      }
    : {};

export const calculateMetrics = async <T extends keyof PrismaClient>(
  model: T,
  db: PrismaClient,
  where?: object
) => {
  const currentMonthStart = startOfMonth(new Date());
  const nextMonthStart = addMonths(currentMonthStart, 1);
  const previousMonthStart = subMonths(currentMonthStart, 1);
  const modelAccess = db[model] as {
    count: (args?: { where: unknown }) => Promise<number>;
  };

  const [total, currentMonth, previousMonth] = await Promise.all([
    modelAccess.count({ where }),
    modelAccess.count({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lt: nextMonthStart,
        },
        ...where,
      },
    }),
    modelAccess.count({
      where: {
        createdAt: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },
        ...where,
      },
    }),
  ]);

  return { total, currentMonth, previousMonth };
};

export const getPaginationArgs = (pagination: Pagination) => {
  const take = pagination.take;
  const skip = pagination.page * pagination.take;

  return { take, skip };
};
