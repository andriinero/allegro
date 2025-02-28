import { DataTable } from "@/app/_components/table/data-table";
import { api } from "@/trpc/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { lessonColumns } from "./lesson-columns";

export default function LessonsDataTable() {
  const { data, isLoading } = api.lesson.admin.getAll.useQuery();
  const table = useReactTable({
    data: data ?? [],
    columns: lessonColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <DataTable table={table} isLoading={isLoading} />;
}
