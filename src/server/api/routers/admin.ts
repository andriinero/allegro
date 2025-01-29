import { paginationSchema } from "../schemas/pagination";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  getUsers: adminProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findMany({
        take: input.take,
        skip: input.page * 25,
      });
    }),
});
