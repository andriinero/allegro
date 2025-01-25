import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ date: z.string().datetime(), lessonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.booking.create({
        data: {
          date: input.date,
          lessonId: input.lessonId,
          bookedById: ctx.session.user.id,
        },
      });
    }),

  cancelBookingById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.booking.delete({ where: { id: input.id } });
    }),
});
