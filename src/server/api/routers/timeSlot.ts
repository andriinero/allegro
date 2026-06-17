import { addDays, getHours, getMinutes, set, startOfDay } from "date-fns";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { LessonPresence } from "@prisma/client";

export const timeSlotRouter = createTRPCRouter({
  getByDate: protectedProcedure
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
        });
      }),
    create: adminProcedure
      .input(
        z
          .object({
            startTime: z.date(),
            endTime: z.date(),
            presence: z.nativeEnum(LessonPresence),
          })
          .refine((data) => data.startTime < data.endTime, {
            message: "End time must be after start time",
            path: ["endTime"],
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
    createMany: adminProcedure
      .input(
        z
          .object({
            days: z.array(z.date()).min(1),
            startTime: z.date(),
            endTime: z.date(),
            presence: z.nativeEnum(LessonPresence),
          })
          .refine(
            (data) =>
              getHours(data.startTime) * 60 + getMinutes(data.startTime) <
              getHours(data.endTime) * 60 + getMinutes(data.endTime),
            {
              message: "End time must be after start time",
              path: ["endTime"],
            }
          )
      )
      .mutation(async ({ ctx, input }) => {
        const withTime = (day: Date, time: Date) =>
          set(startOfDay(day), {
            hours: getHours(time),
            minutes: getMinutes(time),
            seconds: 0,
            milliseconds: 0,
          });

        const uniqueDays = [
          ...new Map(
            input.days.map((day) => [startOfDay(day).getTime(), day])
          ).values(),
        ];

        const slots = uniqueDays.map((day) => ({
          startTime: withTime(day, input.startTime),
          endTime: withTime(day, input.endTime),
          presence: input.presence,
        }));

        const overlapping = await ctx.db.lessonTimeSlot.findFirst({
          where: {
            OR: slots.map((slot) => ({
              startTime: { lt: slot.endTime },
              endTime: { gt: slot.startTime },
            })),
          },
        });
        if (overlapping)
          throw new TRPCError({
            code: "CONFLICT",
            message: "One or more time slots overlap with an existing one",
          });

        return await ctx.db.lessonTimeSlot.createMany({ data: slots });
      }),
  },
});
