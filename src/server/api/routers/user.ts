import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({ page: z.number().default(0), limit: z.number().default(5) }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input;

      return await ctx.db.user.findMany({ take: limit, skip: page * 10 });
    }),
});
