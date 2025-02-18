import { calculateMetrics } from "@/lib/prisma-utils";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const metricRouter = createTRPCRouter({
  users: adminProcedure.query(async ({ ctx }) =>
    calculateMetrics("user", ctx.db),
  ),

  bookings: adminProcedure.query(async ({ ctx }) =>
    calculateMetrics("booking", ctx.db),
  ),

  completedLessons: adminProcedure.query(async ({ ctx }) =>
    calculateMetrics("lesson", ctx.db, {
      booking: { status: "COMPLETED" },
    }),
  ),

  reviews: adminProcedure.query(async ({ ctx }) =>
    calculateMetrics("review", ctx.db),
  ),
});
