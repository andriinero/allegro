import { paginationSchema } from "@/schemas/pagination";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  getUsers: adminProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findMany({
        take: input.take,
        skip: input.page * input.take,
      });
    }),

  // NOTE: for testing purposes
  // setAdminRole: protectedProcedure.mutation(async ({ ctx }) => {
  //   return ctx.db.user.update({
  //     where: { id: ctx.session.user.id },
  //     data: { role: "ADMIN" },
  //   });
  // }),
});
