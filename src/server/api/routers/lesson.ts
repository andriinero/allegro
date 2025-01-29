import { createTRPCRouter, protectedProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.lesson.findMany({
      where: { booking: { bookedById: ctx.session.user.id } },
    });
  }),
});
