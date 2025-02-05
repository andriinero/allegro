import { dateRangeSchema } from "@/schemas/metric";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const metricRouter = createTRPCRouter({
  getUserCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      const whereClause =
        input?.dateStart && input?.dateEnd
          ? { createdAt: { lte: input.dateEnd, gte: input.dateStart } }
          : {};

      return await ctx.db.user.count({ where: whereClause });
    }),

  getBookingCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.booking.count();
    }),

  getLessonCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.lesson.count();
    }),

  getReviewCount: adminProcedure
    .input(dateRangeSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.review.count();
    }),
});
