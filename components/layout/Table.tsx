"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const t = useTranslations("");

  // Funzione personalizzata per il filtro globale
  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    const id = row.getValue("id")?.toString().toLowerCase() || "";
    const name = row.getValue("name")?.toString().toLowerCase() || "";
    const searchValue = filterValue.toLowerCase();

    return id.includes(searchValue) || name.includes(searchValue);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          aria-label={t("stocks.actions.search")}
          placeholder={`${t("stocks.actions.search")}`}
          className="bg-white w-[500px]"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
        <Button className="shadow-xs">
          <Plus /> {t("stocks.actions.add")}
        </Button>
      </div>
      <div className="rounded-md border bg-white p-4 shadow-xs flex flex-col gap-6">
        <div>
          <Table className=" w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
            <span className="sr-only">Previous page</span>
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
          >
            <ChevronRight />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
