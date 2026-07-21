"use client";

import { DataTable } from "@/app/_components/table/data-table";
import { api } from "@/trpc/react";
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { lessonColumns } from "./lesson-columns";

export default function LessonsDataTable() {
  const { data, isLoading, isFetching, refetch } =
    api.lesson.admin.getAll.useQuery();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() =>
    lessonId ? [{ id: "id", value: lessonId }] : []
  );
  const table = useReactTable({
    data: data ?? [],
    columns: lessonColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  async function handleRefresh() {
    const result = await refetch();

    if (result.isSuccess) {
      toast.success("Lessons refreshed");
    } else {
      toast.error("Failed to refresh lessons");
    }
  }

  return (
    <DataTable
      table={table}
      isLoading={isLoading}
      isRefreshing={isFetching}
      onRefresh={() => void handleRefresh()}
    />
  );
}
