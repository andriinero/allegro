import { LessonPresence } from "@prisma/client";
import { z } from "zod";

export const updateTimeSlotSchema = z
  .object({
    id: z.string(),
    startTime: z.date({ required_error: "Choose a start date and time" }),
    endTime: z.date({ required_error: "Choose an end date and time" }),
    presence: z.nativeEnum(LessonPresence),
  })
  .refine(({ startTime, endTime }) => endTime > startTime, {
    message: "End time must be after the start time",
    path: ["endTime"],
  });

export type UpdateTimeSlot = z.infer<typeof updateTimeSlotSchema>;
