import { z } from "zod";

export const createLessonSchema = z.object({
  bookingId: z.string(),
  studentId: z.string(),
  title: z.string(),
  lessonLink: z.string().optional(),
  assignment: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().min(30).max(90),
});
export type CreateLesson = z.infer<typeof createLessonSchema>;
