import { Separator } from "@/app/_components/ui/separator";
import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";

export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Lesson History</PanelHeading>
        <PanelDescription>History of completed lessons</PanelDescription>
      </PanelHeaderWrapper>

      <Separator />
    </>
  );
}
