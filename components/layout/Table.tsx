"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Table as TableType } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "./Loading";
import { useTranslations } from "next-intl";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  table,
  loading,
}: DataTableProps<TData, TValue>) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const t = useTranslations("");

  return (
    <div className="relative rounded-md border bg-white p-4 shadow-xs flex flex-col gap-6">
      <div className={loading ? "pointer-events-none filter blur-[2px]" : ""}>
        <Table className=" w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* Render filter se presente */}
                        {(header.column.columnDef.meta as any)?.Filter &&
                          flexRender(
                            (header.column.columnDef.meta as any).Filter,
                            {
                              column: header.column,
                            }
                          )}
                      </>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <span>{t("generic.no_products")}</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <Loading />
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label={"generic.prev_page"}
        >
          <ChevronLeft />
        </Button>

        {Array.from({ length: pageCount }, (_, index) => (
          <Button
            key={index}
            variant={currentPage === index ? "default" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(index)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label={"generic.next_page"}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
