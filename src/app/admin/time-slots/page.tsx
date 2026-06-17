import { Separator } from "@/app/_components/ui/separator";
import PanelHeaderWrapper from "@/app/dashboard/(overview)/panel-header-wrapper";
import { api } from "@/trpc/react";
import PanelHeading from "../(overview)/panel-heading";

export default async function Page() {
  const { data: timeSlots, isLoading } = api.timeSlot.admin.getByDate.useQuery({
    date: new Date(),
  });

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <PanelHeaderWrapper>
        <PanelHeading
          title="Time Slots"
          description="Manage and view all time slots"
        />
      </PanelHeaderWrapper>

      <Separator />
    </div>
  );
}
