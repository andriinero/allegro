import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createBookingSchema } from "../schemas/booking";
import { paginationSchema } from "../schemas/pagination";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "@/env";

export const bookingRouter = createTRPCRouter({
  getAll: adminProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.booking.findMany({
        take: input.take,
        skip: input.page * +env.RESPONSE_PAGE_SIZE,
        include: { bookedBy: true },
      });
    }),

  getByUser: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.booking.findMany({
        where: { bookedById: ctx.session.user.id },
        take: input.take,
        skip: input.page * +env.RESPONSE_PAGE_SIZE,
      });
    }),

  create: protectedProcedure
    .input(createBookingSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.booking.create({
        data: {
          date: input.date,
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
