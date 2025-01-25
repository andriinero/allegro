import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  getUsers: adminProcedure
    .input(
      z
        .object({ take: z.number(), page: z.number() })
        .default({ take: 25, page: 0 }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findMany({
        take: input.take,
        skip: input.page * 25,
      });
    }),
});
