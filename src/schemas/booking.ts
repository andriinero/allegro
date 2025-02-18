import { z } from "zod";
import { BookingStatus, LessonPresence } from "@prisma/client";
import { paginationSchema } from "./pagination";

export const getBookingsSchema = z.object({
  pagination: paginationSchema,
  where: z.object({
    status: z.nativeEnum(BookingStatus).optional(),
  }),
});
export type GetBookings = z.infer<typeof getBookingsSchema>;

export const createBookingSchema = z.object({
  date: z.date(),
  presence: z.nativeEnum(LessonPresence),
});
export type CreateBooking = z.infer<typeof createBookingSchema>;

export const updateBookingSchema = z.object({
  id: z.string(),
  date: z.date(),
  status: z.nativeEnum(BookingStatus),
  lessonPresence: z.nativeEnum(LessonPresence),
});
export type UpdateBooking = z.infer<typeof updateBookingSchema>;
