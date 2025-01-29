import { LessonPresence } from "@prisma/client";
import { z } from "zod";

export const createBookingSchema = z.object({
  date: z.string().datetime(),
  presence: z.nativeEnum(LessonPresence),
});
export type CreateBooking = z.infer<typeof createBookingSchema>;
