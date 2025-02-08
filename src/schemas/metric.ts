import { z } from "zod";

export const dateRangeSchema = z
  .object({
    dateStart: z.string().optional(),
    dateEnd: z.string().optional(),
  })
  .optional();

export type DateRage = z.infer<typeof dateRangeSchema>;
