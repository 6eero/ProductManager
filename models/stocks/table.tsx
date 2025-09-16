"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, SquarePen, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { Stock } from ".";
import DetailCopy from "@/components/details/DetailCopy";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function useAssetColumns(
  onEdit: (stock: Stock) => void,
  onDelete?: (stock: Stock) => void
): ColumnDef<Stock>[] {
  const t = useTranslations("");
  const [orderingCol, setOrderingCol] = useState("");

  const handleOrder = (column: any) => {
    setOrderingCol(column.id);
    column.toggleSorting(column.getIsSorted() === "asc");
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
          <Button variant="ghost" onClick={() => handleOrder(column)}>
            <span className="font-bold">
              {t("stocks.table.header.quantity")}
            </span>
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
        return <code>{quantity}</code>;
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
          <Badge variant="outline">{t(`stocks.categories.${category}`)}</Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => handleOrder(column)}>
            <span className="font-bold">{t("stocks.table.header.price")}</span>
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
        const asset = row.original;
        return (
          <div className="flex items-center gap-6 justify-end w-full">
            <SquarePen
              size={20}
              className="text-gray-400 cursor-pointer"
              onClick={() => onEdit(asset)}
            />
            <Trash
              size={20}
              className="text-destructive cursor-pointer"
              onClick={() => onDelete?.(asset)}
            />
          </div>
        );
      },
    },
  ];
}
