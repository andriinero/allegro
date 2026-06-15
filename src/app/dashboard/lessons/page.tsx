import PanelHeading from "../(overview)/panel-heading";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeading title="Lessons" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4"></div>

      <div className="grid grid-cols-7 gap-4"></div>
    </div>
  );
}
