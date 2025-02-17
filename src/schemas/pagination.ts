import { z } from "zod";

export const paginationSchema = z
  .object({ take: z.number(), page: z.number(), cursor: z.string().optional() })
  .default({ take: 10, page: 0, cursor: undefined });
export type Pagination = z.infer<typeof paginationSchema>;
