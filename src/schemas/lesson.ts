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

export const lessonCountSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
});
export type LessonCount = z.infer<typeof lessonCountSchema>;

export const getAllLessonsSchema = z.object({
  pagination: paginationSchema,
  lesson: lessonCountSchema,
});
export type LessonPagination = z.infer<typeof getAllLessonsSchema>;
