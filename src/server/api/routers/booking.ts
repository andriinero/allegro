import {
  bookingCountSchema,
  createBookingSchema,
  getBookingsSchema,
  updateBookingSchema,
} from "@/schemas/booking";
import { paginationSchema } from "@/schemas/pagination";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
  getCountByCurrentUser: protectedProcedure
    .input(bookingCountSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.booking.count({
        where: { bookedById: ctx.session.user.id, status: input?.status },
      });
    }),

  getByCurrentUser: protectedProcedure
    .input(getBookingsSchema)
    .query(async ({ ctx, input }) => {
      const { where, pagination } = input;

      return await ctx.db.booking.findMany({
        where: { bookedById: ctx.session.user.id, status: where?.status },
        take: pagination.take,
        skip: pagination.page * pagination.take,
      });
    }),

  create: protectedProcedure
    .input(createBookingSchema)
    .mutation(async ({ ctx, input }) => {
      const userBookingCount = await ctx.db.booking.count({
        where: { bookedById: ctx.session.user.id, status: "PENDING" },
      });
      if (userBookingCount >= 4)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have reached the maximum number of bookings",
        });
      const timeSlot = await ctx.db.lessonTimeSlot.findUnique({
        where: { id: input.timeSlotId },
      });
      if (!timeSlot)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Time slot not found",
        });

      return await ctx.db.booking.create({
        data: {
          timeSlotId: input.timeSlotId,
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
      if (!booking)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });

      await ctx.db.booking.update({
        where: { id: input.id },
        data: { status: "CANCELLED" },
      });
    }),

  admin: {
    getAll: adminProcedure.query(async ({ ctx }) => {
      return await ctx.db.booking.findMany({
        include: { bookedBy: true, timeSlot: true },
      });
    }),

    getAny: adminProcedure
      .input(paginationSchema)
      .query(async ({ ctx, input }) => {
        return ctx.db.booking.findMany({
          take: input.take,
          skip: input.page * input.take,
          include: { bookedBy: true },
        });
      }),

    cancelById: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const booking = await ctx.db.booking.findUnique({
          where: { id: input.id },
        });
        if (!booking) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Booking not found",
          });
        }

        await ctx.db.booking.update({
          where: { id: input.id },
          data: { status: "CANCELLED" },
        });
      }),

    updateById: adminProcedure
      .input(updateBookingSchema)
      .mutation(async ({ ctx, input }) => {
        const booking = await ctx.db.booking.findUnique({
          where: { id: input.id },
        });
        if (!booking)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Booking not found",
          });

        return await ctx.db.booking.update({
          where: { id: input.id },
          data: {
            status: input.status,
          },
        });
      }),

    deleteById: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const booking = await ctx.db.booking.findUnique({
          where: { id: input.id },
        });
        if (!booking)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Booking not found",
          });

        return await ctx.db.$transaction(async (tx) => {
          await tx.lesson.deleteMany({
            where: { booking: { id: input.id } },
          });
          return await tx.booking.delete({
            where: { id: input.id },
          });
        });
      }),
  },
});
