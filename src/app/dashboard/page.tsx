"use client";

import { Tabs } from "@radix-ui/react-tabs";
import { Suspense } from "react";
import UserRecentBookingsPlaceholder from "../_components/placeholders/user-recent-bookings-placeholder";
import UserUpcomingLessonsPlaceholder from "../_components/placeholders/user-upcoming-lessons-placeholder";
import { TabsContent, TabsList, TabsTrigger } from "../_components/ui/tabs";
import PanelDescription from "./(overview)/panel-description";
import PanelHeaderWrapper from "./(overview)/panel-header-wrapper";
import PanelHeading from "./(overview)/panel-heading";
import UserRecentBookings from "./(overview)/user-recent-bookings";
import UserUpcomingLessons from "./(overview)/user-upcoming-lessons";

export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Dashboard</PanelHeading>
        <PanelDescription>
          Here you can see all your upcoming lessons and recent bookings
        </PanelDescription>
      </PanelHeaderWrapper>

      <Tabs defaultValue="upcoming-lessons">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming-lessons">Upcoming Lessons</TabsTrigger>
          <TabsTrigger value="recent-bookings">Recent Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming-lessons">
          <Suspense fallback={<UserUpcomingLessonsPlaceholder />}>
            <UserUpcomingLessons />
          </Suspense>
        </TabsContent>

        <TabsContent value="recent-bookings">
          <Suspense fallback={<UserRecentBookingsPlaceholder />}>
            <UserRecentBookings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}
