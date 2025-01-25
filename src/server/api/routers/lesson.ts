import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { GuitarType, LessonPresence, ProficiencyLevel } from "@prisma/client";

export const lessonRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.lesson.findMany({
      where: { booking: { bookedById: ctx.session.user.id } },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        descripttion: z.string().optional(),
        duration: z.number().min(30).max(60),
        poficiency: z.nativeEnum(ProficiencyLevel),
        presence: z.nativeEnum(LessonPresence),
        guitarType: z.nativeEnum(GuitarType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.lesson.create({
        data: {
          description: input.descripttion,
          duration: input.duration,
          proficiency: input.poficiency,
          presence: input.presence,
          guitarType: input.guitarType,
        },
      });
    }),
});
