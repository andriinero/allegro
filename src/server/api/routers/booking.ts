import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createBookingSchema } from "../schemas/booking";
import { paginationSchema } from "../schemas/pagination";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
  get: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.booking.findMany({
        take: input.take,
        skip: input.page * 25,
      });
    }),

  create: protectedProcedure
    .input(createBookingSchema)
    .mutation(async ({ ctx, input }) => {
      const lesson = await ctx.db.lesson.create({
        data: {
          description: input.description,
          duration: input.duration,
          proficiency: input.poficiency,
          presence: input.presence,
          guitarType: input.guitarType,
        },
      });

      return await ctx.db.booking.create({
        data: {
          date: input.date,
          lessonId: lesson.id,
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
