import { dateRangeSchema } from "@/schemas/metric";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { getDateRangeWhereClause } from "@/lib/prisma-utils";

export const metricRouter = createTRPCRouter({
  getUserCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const whereClause = getDateRangeWhereClause(
        "createdAt",
        input?.dateStart,
        input?.dateEnd,
      );

      return await ctx.db.user.count({ where: whereClause });
    }),

  getBookingCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const whereClause = getDateRangeWhereClause(
        "createdAt",
        input?.dateStart,
        input?.dateEnd,
      );

      return await ctx.db.booking.count({ where: whereClause });
    }),

  getCompletedLessonCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const whereClause = getDateRangeWhereClause(
        "createdAt",
        input?.dateStart,
        input?.dateEnd,
      );

      return await ctx.db.lesson.count({
        where: { ...whereClause, booking: { status: "COMPLETED" } },
      });
    }),

  getReviewCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const whereClause = getDateRangeWhereClause(
        "createdAt",
        input?.dateStart,
        input?.dateEnd,
      );

      return await ctx.db.review.count({ where: whereClause });
    }),
});
