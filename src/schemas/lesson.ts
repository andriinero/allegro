import { BookingStatus } from "@prisma/client";
import { z } from "zod";
import { paginationSchema } from "./pagination";

export const createLessonSchema = z.object({
  title: z.string(),
  bookingId: z.string(),
  studentId: z.string(),
  lessonLink: z.string().optional(),
  assignment: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().min(30).max(90),
});
export type CreateLesson = z.infer<typeof createLessonSchema>;

export const lessonStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus).optional(),
});
export type LessonCount = z.infer<typeof lessonStatusSchema>;

export const getAllLessonsSchema = z.object({
  pagination: paginationSchema,
  status: z.array(z.nativeEnum(BookingStatus)).optional(),
  orderBy: z
    .object({
      booking: z.object({
        date: z.enum(["asc", "desc"]).optional(),
      }),
    })
    .optional(),
});
export type LessonPagination = z.infer<typeof getAllLessonsSchema>;

export const updateLessonSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  lessonLink: z.string().optional(),
  assignment: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().min(30).max(90).optional(),
});
export type UpdateLesson = z.infer<typeof updateLessonSchema>;
