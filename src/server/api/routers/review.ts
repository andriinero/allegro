import { createTRPCRouter, publicProcedure } from "../trpc";

export const reviewRouter = createTRPCRouter({
  getReviewCount: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.review.count();
  }),
});
