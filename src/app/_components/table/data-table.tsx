"use client";

import Spinner from "@/app/_components/general/spinner";
import EmptyState from "@/app/_components/placeholders/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { RefreshCwIcon, SearchIcon, SearchXIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTablePagination } from "./table-pagination";

type DataTableProps<TData> = {
  table: ReactTable<TData>;
  isLoading: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
};

export function DataTable<TData>({
  table,
  isLoading,
  isRefreshing = false,
  onRefresh,
}: DataTableProps<TData>) {
  const idFilter = (table.getColumn("id")?.getFilterValue() as string) ?? "";

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b bg-muted/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={idFilter}
            onChange={(event) => {
              table.getColumn("id")?.setFilterValue(event.target.value);
            }}
            placeholder="Search by ID…"
            className="bg-background pl-9 pr-9"
          />
          {idFilter && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 size-9 -translate-y-1/2 text-muted-foreground"
              aria-label="Clear search"
              onClick={() => table.getColumn("id")?.setFilterValue("")}
            >
              <XIcon />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            {table.getFilteredRowModel().rows.length === 1
              ? "result"
              : "results"}
          </p>
          {onRefresh && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Refresh table data"
              title="Refresh table data"
              disabled={isRefreshing}
              onClick={onRefresh}
            >
              <RefreshCwIcon className={isRefreshing ? "animate-spin" : ""} />
            </Button>
          )}
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleFlatColumns().length}
                  className="h-24 text-center"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-16"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleFlatColumns().length}
                  className="h-48"
                >
                  <EmptyState
                    icon={SearchXIcon}
                    title="No results"
                    description="Try adjusting your filters to find what you're looking for."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
