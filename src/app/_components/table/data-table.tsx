"use client";

import Spinner from "@/app/_components/general/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DataTablePagination } from "./table-pagination";

type DataTableProps<TData> = {
  table: ReactTable<TData>;
  isLoading: boolean;
};

export function DataTable<TData>({ table, isLoading }: DataTableProps<TData>) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
        onChange={(event) => {
          table.getColumn("id")?.setFilterValue(event.target.value);
        }}
        placeholder="Filter bookings by id..."
        className="max-w-xs"
      />
      <div className="rounded-md border border-border">
        <Table className="">
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
                            header.getContext(),
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleFlatColumns().length}
                  className="h-24 text-center"
                >
                  No results.
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
