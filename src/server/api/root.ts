import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { bookingRouter } from "./routers/booking";
import { lessonRouter } from "./routers/lesson";
import { metricRouter } from "./routers/metric";
import { profileRouter } from "./routers/profile";
import { timeSlotRouter } from "./routers/timeSlot";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  booking: bookingRouter,
  lesson: lessonRouter,
  profile: profileRouter,
  admin: adminRouter,
  metric: metricRouter,
  timeSlot: timeSlotRouter,
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
