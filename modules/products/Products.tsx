"use client";

import { useProductsActions } from "@/api/Products/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { DataTable } from "@/components/layout/Table";
import { Input } from "@/components/ui/input";
import { ProductsContext, useProductsContext } from "@/context/Products";
import { useProductColumns } from "@/models/products/table";
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
import CustomButton from "@/components/buttons/CustomButton";
import { useValidationSchemas } from "@/hooks/useValidationSchemas";
import { Product } from "@/models/products";
import DialogManage from "./components/DialogManage";
import DangerModal from "@/components/modals/DangerModal";

const Products = () => {
  const t = useTranslations("");
  const { product } = useValidationSchemas();
  const { onLoad, onAdd, onRemove, onUpdate } = useProductsActions();
  const context = useProductsContext();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleOpenDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    const id = row.getValue("id")?.toString().toLowerCase() || "";
    const name = row.getValue("name")?.toString().toLowerCase() || "";
    const searchValue = filterValue.toLowerCase();
    return id.includes(searchValue) || name.includes(searchValue);
  };

  const products = R.pathOr([], ["data", "products"])(context);
  const updating = R.pathOr(false, ["updating"])(context);
  const columns = useProductColumns(handleOpenEditModal, handleOpenDeleteModal);

  const table = useReactTable({
    data: products,
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
    onRemove(selectedProduct.id, products);
  };
  const handleAdd = (product: Product) => {
    onAdd(product, products);
  };
  const handleEdit = (product: Product) => {
    onUpdate(product, products);
  };

  return (
    <ResourceLoader onLoad={onLoad} context={ProductsContext}>
      {/* Dialogs */}
      <DialogManage
        open={isAddModalOpen}
        setOpen={setIsAddModalOpen}
        mode="add"
        onSubmit={handleAdd}
        validationSchema={product}
      />
      <DialogManage
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        mode="edit"
        onSubmit={handleEdit}
        validationSchema={product}
        product={selectedProduct}
      />
      <DangerModal
        open={isDeleteModalOpen}
        setOpen={handleCloseDeleteModal}
        onSubmit={handleDelete}
        title={"products.modals.delete.title"}
        dscription={"products.modals.delete.description"}
        okButtonText={"products.modals.delete.ok"}
        cancelButtonText={"products.modals.delete.cancel"}
      />

      {/* Page content */}
      <h1 className="text-2xl font-medium mb-10">{t("products.title")}</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder={t("products.actions.search")}
          className="bg-white w-[500px]"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          disabled={updating}
        />
        <CustomButton
          data-testid="add-product-btn"
          onClick={() => setIsAddModalOpen(true)}
          text={"products.actions.add"}
          icon={<Plus />}
          loading={updating}
        />
      </div>
      <DataTable columns={columns} table={table} loading={updating} />
    </ResourceLoader>
  );
};

export default Products;
