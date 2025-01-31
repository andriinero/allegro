import PanelDescription from "../(overview)/panel-description";
import PanelHeading from "../(overview)/panel-heading";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import CreateBookingForm from "./create-booking-form";
import { Separator } from "@/app/_components/ui/separator";

export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Book Lesson</PanelHeading>
        <PanelDescription>Book your next lesson</PanelDescription>
      </PanelHeaderWrapper>

      <Separator />

      <CreateBookingForm />
    </>
  );
}
