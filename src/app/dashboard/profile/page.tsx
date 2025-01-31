import PanelDescription from "../(overview)/panel-description";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";

export default function Page() {
  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Profile</PanelHeading>
        <PanelDescription>
          Manage your personal information and preferences
        </PanelDescription>
      </PanelHeaderWrapper>
    </>
  );
}
