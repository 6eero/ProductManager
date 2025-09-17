"use client";

import { useStocksActions } from "@/api/Stocks/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { DataTable } from "@/components/layout/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StocksContext, useStocksContext } from "@/context/Stocks";
import { useStockColumns } from "@/models/stocks/table";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as R from "ramda";
import { useState } from "react";
import DialogAdd from "./components/DialogAdd";
import DangerModal from "@/components/modals/DangerModal";
import DialogEdit from "./components/DialogEdit";

const Stocks = () => {
  const t = useTranslations("");
  const { onLoad } = useStocksActions();
  const context = useStocksContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    const id = row.getValue("id")?.toString().toLowerCase() || "";
    const name = row.getValue("name")?.toString().toLowerCase() || "";
    const searchValue = filterValue.toLowerCase();
    return id.includes(searchValue) || name.includes(searchValue);
  };

  const stocks = R.pathOr([], ["data", "stocks"])(context);
  const columns = useStockColumns(openEditModal, openDeleteModal);

  const table = useReactTable({
    data: stocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <ResourceLoader onLoad={onLoad} context={StocksContext}>
      {/* Dialogs */}
      <DialogAdd
        open={isAddModalOpen}
        setOpen={setIsAddModalOpen}
        onSubmit={() => {
          // TODO
          console.log("submit");
        }}
      />
      <DialogEdit
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        onSubmit={() => {
          // TODO
          console.log("edit");
        }}
      />
      <DangerModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        onSubmit={() => {
          // TODO
          console.log("danger");
        }}
        title={"stocks.modals.delete.title"}
        dscription={"stocks.modals.delete.description"}
        okButtonText={"stocks.modals.delete.ok"}
        cancelButtonText={"stocks.modals.delete.cancel"}
      />

      {/* Page content */}
      <h1 className="text-2xl font-medium mb-10">{t("stocks.title")}</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder={t("stocks.actions.search")}
          className="bg-white w-[500px]"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
        <Button className="shadow-xs" onClick={() => setIsAddModalOpen(true)}>
          <Plus /> {t("stocks.actions.add")}
        </Button>
      </div>
      <DataTable columns={columns} table={table} />
    </ResourceLoader>
  );
};

export default Stocks;
