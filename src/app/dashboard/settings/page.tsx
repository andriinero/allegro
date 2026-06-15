import { Separator } from "@/app/_components/ui/separator";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";

export default function Settings() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading title="Settings" description="Account settings" />
      </PanelHeaderWrapper>

      <Separator />
    </>
  );
}
