import { z } from "zod";

//NOTE: testing
export const cursorPaginationSchema = z
  .object({
    take: z.number().optional().default(10),
    page: z.number().optional().default(0),
    cursor: z.object({ id: z.string() }).optional(),
  })
  .default({ take: 10, cursor: undefined });
export type CursorPagination = z.infer<typeof cursorPaginationSchema>;

export const paginationSchema = z
  .object({
    take: z.number().default(10),
    page: z.number().default(0),
  })
  .default({ take: 10, page: 0 });
export type Pagination = z.infer<typeof paginationSchema>;
