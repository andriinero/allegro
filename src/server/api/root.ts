import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { bookingRouter } from "./routers/booking";
import { lessonRouter } from "./routers/lesson";
import { metricRouter } from "./routers/metric";
import { profileRouter } from "./routers/profile";
import { reviewRouter } from "./routers/review";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  booking: bookingRouter,
  lesson: lessonRouter,
  profile: profileRouter,
  admin: adminRouter,
  review: reviewRouter,
  metric: metricRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
