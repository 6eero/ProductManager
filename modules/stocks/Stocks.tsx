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
import CustomButton from "@/components/buttons/CustomButton";
import { useValidationSchemas } from "@/hooks/useValidationSchemas";
import { Stock } from "@/models/stocks";

const Stocks = () => {
  const t = useTranslations("");
  const { product } = useValidationSchemas();
  const { onLoad, onAdd, onRemove, onUpdate } = useStocksActions();
  const context = useStocksContext();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleOpenDeleteModal = (stock: Stock) => {
    setSelectedStock(stock);
    setIsDeleteModalOpen(true);
  };
  const handleOpenEditModal = (stock: Stock) => {
    setSelectedStock(stock);
    setIsEditModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedStock(null);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStock(null);
  };

  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    const id = row.getValue("id")?.toString().toLowerCase() || "";
    const name = row.getValue("name")?.toString().toLowerCase() || "";
    const searchValue = filterValue.toLowerCase();
    return id.includes(searchValue) || name.includes(searchValue);
  };

  const stocks = R.pathOr([], ["data", "stocks"])(context);
  const updating = R.pathOr(false, ["updating"])(context);
  const columns = useStockColumns(handleOpenEditModal, handleOpenDeleteModal);

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

  const handleDelete = () => {
    onRemove(selectedStock.id, stocks);
  };
  const handleAdd = (stock: Stock) => {
    onAdd(stock, stocks);
  };
  const handleEdit = (stock: Stock) => {
    onUpdate(stock, stocks);
  };

  return (
    <ResourceLoader onLoad={onLoad} context={StocksContext}>
      {/* Dialogs */}
      <DialogAdd
        open={isAddModalOpen}
        setOpen={setIsAddModalOpen}
        validationSchema={product}
        onSubmit={handleAdd}
      />
      <DialogEdit
        open={isEditModalOpen}
        setOpen={handleCloseEditModal}
        validationSchema={product}
        onSubmit={handleEdit}
        stock={selectedStock}
      />
      <DangerModal
        open={isDeleteModalOpen}
        setOpen={handleCloseDeleteModal}
        onSubmit={handleDelete}
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
          disabled={updating}
        />
        <CustomButton
          onClick={() => setIsAddModalOpen(true)}
          text={"stocks.actions.add"}
          icon={<Plus />}
          loading={updating}
        />
      </div>
      <DataTable columns={columns} table={table} loading={updating} />
    </ResourceLoader>
  );
};

export default Stocks;
