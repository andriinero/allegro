import { z } from "zod";

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
