"use client";

import { Separator } from "../_components/ui/separator";
import PanelDescription from "./(overview)/panel-description";
import PanelHeaderWrapper from "./(overview)/panel-header-wrapper";
import PanelHeading from "./(overview)/panel-heading";
import UserBookings from "./(overview)/user-bookings";
import UserLessons from "./(overview)/user-lessons";

export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Upcoming Lessons</PanelHeading>
        <PanelDescription>
          Here you can see all your upcoming lessons
        </PanelDescription>
      </PanelHeaderWrapper>

      <Separator />

      <UserLessons />

      <Separator />

      <UserBookings />
    </>
  );
}
