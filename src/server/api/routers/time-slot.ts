import { LessonPresence } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
  },
});
