import { z } from "zod";

export const paginationSchema = z
  .object({ take: z.number(), page: z.number() })
  .default({ take: 10, page: 0 });
