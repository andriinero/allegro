"use client";

import { DataTable } from "@/app/_components/table/data-table";
import { useTimeSlotsDialogContext } from "@/hooks/use-time-slots-dialog-context";
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
import { useState } from "react";
import { toast } from "sonner";
import { timeSlotColumns, type TimeSlotRow } from "./time-slot-columns";

export default function TimeSlotsDataTable() {
  const { setCurrentRow, setOpen } = useTimeSlotsDialogContext();
  const { data, isLoading, isFetching, refetch } =
    api.timeSlot.admin.getAll.useQuery();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "startTime", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns: timeSlotColumns,
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
      toast.success("Time slots refreshed");
    } else {
      toast.error("Failed to refresh time slots");
    }
  }

  function handleRowClick(timeSlot: TimeSlotRow) {
    setCurrentRow(timeSlot);
    setOpen("edit");
  }

  return (
    <DataTable
      table={table}
      isLoading={isLoading}
      isRefreshing={isFetching}
      onRefresh={handleRefresh}
      onRowClick={handleRowClick}
      getRowLabel={(timeSlot) => `Edit time slot ${timeSlot.id}`}
    />
  );
}
