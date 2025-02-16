import { env } from "@/env";
import {
  createLessonSchema,
  getAllLessonsSchema,
  lessonCountSchema,
} from "@/schemas/lesson";
import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(getAllLessonsSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.lesson.findMany({
        where: {
          studentId: ctx.session.user.id,
          booking: { status: input.lesson.status },
        },
        include: { student: true, booking: true },
        take: input.pagination.take,
        skip: input.pagination.page * +env.RESPONSE_PAGE_SIZE,
      });
    }),

  getAnyCount: adminProcedure
    .input(lessonCountSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.lesson.count({
        where: {
          studentId: ctx.session.user.id,
          booking: input?.status ? { status: input.status } : undefined,
        },
      });
    }),

  getAny: protectedProcedure
    .input(getAllLessonsSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.lesson.findMany({
        where: {
          studentId: ctx.session.user.id,
          booking: { status: input.lesson.status },
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
