"use client";

import AdminPanelHeading from "../(overview)/admin-panel-heading";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <AdminPanelHeading
        title="Lessons"
        description="Manage and view all lessons"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3"></div>
    </div>
  );
}
