"use client";

import { Separator } from "../_components/ui/separator";
import PanelDescription from "./(overview)/panel-description";
import PanelHeaderWrapper from "./(overview)/panel-header-wrapper";
import PanelHeading from "./(overview)/panel-heading";
import UserLessons from "./(overview)/user-lessons";

export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Dashboard</PanelHeading>
        <PanelDescription>Your personalized dashboard</PanelDescription>
      </PanelHeaderWrapper>

      <Separator />

      <UserLessons />
    </>
  );
}
