import { LessonPresence } from "@prisma/client";
import { updateTimeSlotSchema } from "@/schemas/time-slot";
import { TRPCError } from "@trpc/server";
import { addDays, startOfDay } from "date-fns";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const timeSlotRouter = createTRPCRouter({
  getAvailableByDate: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(async ({ ctx, input }) => {
      const dayStart = startOfDay(input.date);
      const nextDayStart = addDays(dayStart, 1);

      return await ctx.db.lessonTimeSlot.findMany({
        where: {
          startTime: {
            gte: dayStart,
            lt: nextDayStart,
          },
          bookings: { is: null },
        },
        orderBy: { startTime: "asc" },
      });
    }),

  admin: {
    getAll: adminProcedure.query(async ({ ctx }) => {
      return await ctx.db.lessonTimeSlot.findMany({
        orderBy: { startTime: "asc" },
        include: {
          bookings: {
            include: {
              bookedBy: { select: { name: true, image: true } },
            },
          },
        },
      });
    }),

    getAllUpcoming: adminProcedure.query(async ({ ctx }) => {
      return await ctx.db.lessonTimeSlot.findMany({
        where: {
          startTime: { gte: new Date() },
        },
        include: {
          bookings: {
            include: {
              bookedBy: { select: { name: true, image: true } },
            },
          },
        },
        orderBy: { startTime: "asc" },
      });
    }),

    getAvailableForBooking: adminProcedure
      .input(z.object({ bookingId: z.string() }))
      .query(async ({ ctx, input }) => {
        return await ctx.db.lessonTimeSlot.findMany({
          where: {
            OR: [
              {
                startTime: { gte: new Date() },
                bookings: { is: null },
              },
              { bookings: { is: { id: input.bookingId } } },
            ],
          },
          orderBy: { startTime: "asc" },
        });
      }),

    getByDate: adminProcedure
      .input(z.object({ date: z.date() }))
      .query(async ({ ctx, input }) => {
        const dayStart = startOfDay(input.date);
        const nextDayStart = addDays(dayStart, 1);

        return await ctx.db.lessonTimeSlot.findMany({
          where: {
            startTime: {
              gte: dayStart,
              lt: nextDayStart,
            },
          },
          include: {
            bookings: {
              include: {
                bookedBy: { select: { name: true } },
              },
            },
          },
          orderBy: { startTime: "asc" },
        });
      }),

    createForDate: adminProcedure
      .input(
        z.object({
          startTime: z.date(),
          endTime: z.date(),
          presence: z.nativeEnum(LessonPresence),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const overlapping = await ctx.db.lessonTimeSlot.findFirst({
          where: {
            startTime: { lt: input.endTime },
            endTime: { gt: input.startTime },
          },
        });
        if (overlapping)
          throw new TRPCError({
            code: "CONFLICT",
            message: "This time slot overlaps with an existing one",
          });

        return await ctx.db.lessonTimeSlot.create({
          data: {
            startTime: input.startTime,
            endTime: input.endTime,
            presence: input.presence,
          },
        });
      }),

    updateById: adminProcedure
      .input(updateTimeSlotSchema)
      .mutation(async ({ ctx, input }) => {
        const timeSlot = await ctx.db.lessonTimeSlot.findUnique({
          where: { id: input.id },
          select: { id: true },
        });
        if (!timeSlot) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Time slot not found",
          });
        }

        const overlapping = await ctx.db.lessonTimeSlot.findFirst({
          where: {
            id: { not: input.id },
            startTime: { lt: input.endTime },
            endTime: { gt: input.startTime },
          },
          select: { id: true },
        });
        if (overlapping) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "This time slot overlaps with an existing one",
          });
        }

        return await ctx.db.lessonTimeSlot.update({
          where: { id: input.id },
          data: {
            startTime: input.startTime,
            endTime: input.endTime,
            presence: input.presence,
          },
        });
      }),
  },
});
