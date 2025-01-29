import { z } from "zod";

export const paginationSchema = z
  .object({ take: z.number(), page: z.number() })
  .default({ take: 25, page: 0 });
