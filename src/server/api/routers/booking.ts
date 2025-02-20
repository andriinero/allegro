import { env } from "@/env";
import { getPaginationArgs } from "@/lib/prisma-utils";
import {
  createBookingSchema,
  getBookingsSchema,
  updateBookingSchema,
} from "@/schemas/booking";
import { paginationSchema } from "@/schemas/pagination";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({
  getByCurrentUser: protectedProcedure
    .input(getBookingsSchema)
    .query(async ({ ctx, input }) => {
      const { where, pagination } = input;
      const { take, skip, cursor } = getPaginationArgs(pagination);

      const [totalCount, items] = await Promise.all([
        ctx.db.booking.count({
          where: { bookedById: ctx.session.user.id, status: where?.status },
        }),
        ctx.db.booking.findMany({
          where: { bookedById: ctx.session.user.id, status: where?.status },
          take,
          skip,
          cursor,
        }),
      ]);

      return { items, totalCount };
    }),

  create: protectedProcedure
    .input(createBookingSchema)
    .mutation(async ({ ctx, input }) => {
      const userBookingCount = await ctx.db.booking.count({
        where: { bookedById: ctx.session.user.id },
      });
      if (userBookingCount >= 4)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have reached the maximum number of bookings",
        });

      return await ctx.db.booking.create({
        data: {
          date: input.date,
          lessonPresence: input.presence,
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
          message: "Booking found",
        });

      await ctx.db.booking.update({
        where: { id: input.id },
        data: { status: "CANCELLED" },
      });
    }),

  getAny: adminProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.booking.findMany({
        take: input.take,
        skip: input.page * +env.RESPONSE_PAGE_SIZE,
        include: { bookedBy: true },
      });
    }),

  cancelAnyById: adminProcedure
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

  updateAnyById: adminProcedure
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
          date: input.date,
          status: input.status,
          lessonPresence: input.lessonPresence,
        },
      });
    }),

  deleteAnyById: adminProcedure
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

      await ctx.db.lesson.deleteMany({
        where: { booking: { id: input.id } },
      });
      return await ctx.db.booking.delete({
        where: { id: input.id },
      });
    }),
});
