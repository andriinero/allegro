import { Separator } from "@/app/_components/ui/separator";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";

export default async function Page() {
  return (
    <div className="flex flex-col">
      <PanelHeaderWrapper>
        <PanelHeading title="Lessons" description="Manage your lessons" />
      </PanelHeaderWrapper>

      <Separator />
    </div>
  );
}
