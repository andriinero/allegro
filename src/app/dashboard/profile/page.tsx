"use client";

import { Separator } from "@/app/_components/ui/separator";
import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";
import UpdateProfileForm from "./update-profile-form";

//TODO: remove toast test
export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Profile</PanelHeading>
        <PanelDescription>
          Manage your personal information and preferences
        </PanelDescription>
      </PanelHeaderWrapper>

      <Separator />

      <UpdateProfileForm />
    </>
  );
}
