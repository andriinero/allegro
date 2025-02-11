import { createLessonSchema } from "@/schemas/lesson";
import { TRPCError } from "@trpc/server";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.lesson.findMany({
      where: { booking: { bookedById: ctx.session.user.id } },
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
