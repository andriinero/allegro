import { env } from "@/env";
import {
  createLessonSchema,
  getAllLessonsSchema,
  lessonStatusSchema,
} from "@/schemas/lesson";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(getAllLessonsSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.lesson.findMany({
        where: {
          studentId: ctx.session.user.id,
          booking: { status: { in: input.where.booking.status } },
        },
        include: { student: true, booking: true },
        take: input.pagination.take,
        skip: input.pagination.page * +env.RESPONSE_PAGE_SIZE,
      });
    }),

  cancelById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const lesson = await ctx.db.lesson.findUnique({
        where: {
          id: input.id,
          studentId: ctx.session.user.id,
        },
      });
      if (!lesson)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Lesson not found",
        });

      return await ctx.db.lesson.update({
        where: {
          id: input.id,
          studentId: ctx.session.user.id,
          booking: { status: "CONFIRMED" },
        },
        data: { booking: { update: { status: "CANCELLED" } } },
      });
    }),

  getAnyCount: adminProcedure
    .input(lessonStatusSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.lesson.count({
        where: {
          booking: { status: input.status },
        },
      });
    }),

  getAny: protectedProcedure
    .input(getAllLessonsSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.lesson.findMany({
        where: {
          booking: { status: { in: input.where.booking.status } },
        },
        include: { student: true, booking: true },
        take: input.pagination.take,
        skip: input.pagination.page * +env.RESPONSE_PAGE_SIZE,
      });
    }),

  create: adminProcedure
    .input(createLessonSchema)
    .mutation(async ({ ctx, input }) => {
      const { bookingId, ...data } = input;

      const bookedLesson = await ctx.db.lesson.findFirst({
        where: { booking: { id: bookingId } },
        select: { booking: { select: { id: true } } },
      });
      if (bookedLesson) {
        throw new TRPCError({
          message: "A lesson already exists for this booking",
          code: "BAD_REQUEST",
        });
      }

      const lesson = await ctx.db.lesson.create({
        data: { ...data, booking: { connect: { id: bookingId } } },
      });
      await ctx.db.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
      });

      return lesson;
    }),
});
