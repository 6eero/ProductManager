"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Filter, SquarePen, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { Category, Stock } from ".";
import DetailCopy from "@/components/details/DetailCopy";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryColors: Record<string, string> = {
  electronics: "bg-secondary",
  clothing: "bg-primary",
  food: "bg-pink-500",
  default: "bg-red-500",
};

import * as R from "ramda";

export function useStockColumns(
  onEdit: (stock: Stock) => void,
  onDelete?: (stock: Stock) => void
): ColumnDef<Stock>[] {
  const t = useTranslations("");
  const [orderingCol, setOrderingCol] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const handleOrder = (column: any) => {
    setOrderingCol(column.id);
    column.toggleSorting(column.getIsSorted() === "asc");
  };

  const handleSetFilters = (column: any, filter: Category) => {
    if (R.isNotNil(filter)) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
    column.setFilterValue(filter);
  };

  return [
    {
      accessorKey: "id",
      header: () => (
        <span className="font-bold text-left">
          {t("stocks.table.header.id")}
        </span>
      ),
      cell: ({ row }) => {
        const id = row.getValue<string>("id");

        return <DetailCopy id={id} />;
      },
    },
    {
      accessorKey: "name",
      header: () => (
        <span className="font-bold text-left">
          {t("stocks.table.header.name")}
        </span>
      ),
      cell: ({ row }) => {
        const name = row.getValue<string>("name");
        return <span className="text-left">{name}</span>;
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <Button
            className="font-bold !p-0 !m-0"
            variant="ghost"
            onClick={() => handleOrder(column)}
          >
            {t("stocks.table.header.quantity")}

            <ArrowUpDown
              size={1}
              className={
                orderingCol === column.id ? "text-secondary" : "text-gray-400"
              }
            />
          </Button>
        );
      },

      cell: ({ row }) => {
        const quantity = row.getValue<number>("quantity");
        return <span>{quantity}</span>;
      },
    },
    {
      accessorKey: "category",
      header: () => (
        <span className="font-bold">{t("stocks.table.header.category")}</span>
      ),
      cell: ({ row }) => {
        const category = row.getValue<string>("category");
        return (
          <Badge variant="outline" className="bg-primary/5">
            <div
              className={`w-1.5 h-1.5 rounded-2xl mr-0.5 ${
                categoryColors[category] || categoryColors.default
              }`}
            />
            {t(`stocks.categories.${category}`)}
          </Badge>
        );
      },
      filterFn: "equals",
      meta: {
        Filter: ({ column }: any) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1.5">
                <Filter
                  className={
                    isFiltering
                      ? "!h-3.5 !w-3.5 text-secondary"
                      : "!h-3.5 !w-3.5 text-gray-400"
                  }
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {R.map(
                (option: Category) => (
                  <DropdownMenuItem
                    key={option ?? "all"}
                    onClick={() => handleSetFilters(column, option)}
                  >
                    {t(`stocks.categories.${option}`)}
                  </DropdownMenuItem>
                ),
                [undefined, "electronics", "clothing", "food"]
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            className="font-bold !p-0 !m-0"
            variant="ghost"
            onClick={() => handleOrder(column)}
          >
            {t("stocks.table.header.price")}
            <ArrowUpDown
              size={1}
              className={
                orderingCol === column.id ? "text-secondary" : "text-gray-400"
              }
            />
          </Button>
        );
      },

      cell: ({ row }) => {
        const price: number = row.getValue<number>("price");
        return <span>{price} €</span>;
      },
    },

    {
      accessorKey: "actions",
      header: () => (
        <span className="font-bold text-right block w-full">
          {t("stocks.table.header.actions")}
        </span>
      ),
      cell: ({ row }) => {
        const stock = row.original;
        return (
          <div className="flex items-center gap-3 justify-end w-full">
            {/* Edit button */}
            <button
              onClick={() => onEdit(stock)}
              className="p-2 rounded-full bg-primary/7 hover:bg-primary/10 transition-colors"
            >
              <SquarePen size={14} className="text-primary" />
              <span className="sr-only">Edit stock</span>
            </button>

            {/* Delete button */}
            <button
              onClick={() => onDelete?.(stock)}
              className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
            >
              <Trash size={14} className="text-red-600" />
              <span className="sr-only">Delete stock</span>
            </button>
          </div>
        );
      },
    },
  ];
}
