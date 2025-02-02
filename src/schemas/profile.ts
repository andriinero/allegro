import { GuitarType, ProficiencyLevel } from "@prisma/client";
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  guitarType: z.nativeEnum(GuitarType).optional(),
  proficiency: z.nativeEnum(ProficiencyLevel).optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
