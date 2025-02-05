import { z } from "zod";

export const dateRangeSchema = z
  .object({
    dateStart: z.date().optional(),
    dateEnd: z.date().optional(),
  })
  .optional();

export type DateRage = z.infer<typeof dateRangeSchema>;
