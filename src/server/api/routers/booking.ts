import { TRPCError } from "@trpc/server";
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

  cancelById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input.id, bookedById: ctx.session.user.id },
      });
      if (!booking) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Booking found or not owned",
        });
      }

      await ctx.db.booking.delete({ where: { id: input.id } });
    }),
});
