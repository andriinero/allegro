import { Separator } from "@/app/_components/ui/separator";
import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";

export default function Settings() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Settings</PanelHeading>
        <PanelDescription>Account settings</PanelDescription>
      </PanelHeaderWrapper>

      <Separator />
    </>
  );
}
