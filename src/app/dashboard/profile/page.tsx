"use client";

import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { toast } from "sonner";
import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";
import UpdateProfileForm from "./update-profile-form";

//TODO: remove toast test
export default function Page() {
  function onButtonClick() {
    toast.success("Test message", {});
  }

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

      <Button type="button" onClick={onButtonClick} className="self-start">
        Toast
      </Button>
    </>
  );
}
