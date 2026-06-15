import { Separator } from "@/app/_components/ui/separator";
import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";

export default function Chat() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading
          title="Chat"
          description="Direct contact with your instructor"
        />
        <PanelDescription>Direct contact with your instructor</PanelDescription>
      </PanelHeaderWrapper>

      <Separator />
    </>
  );
}
