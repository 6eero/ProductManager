"use client";

import { useStocksActions } from "@/api/Stocks/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { DataTable } from "@/components/layout/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StocksContext, useStocksContext } from "@/context/Stocks";
import { useModalState } from "@/hooks/useModalState";
import { Stock } from "@/models/stocks";
import { useAssetColumns } from "@/models/stocks/table";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as R from "ramda";

const Stocks = () => {
  const t = useTranslations("");
  const { onLoad, onRemove } = useStocksActions();
  const context = useStocksContext();

  const {
    setIsManageStockModalOpen,
    clickedStock,
    setClickedStock,
    openManageModal,
    openDangerModal,
  } = useModalState();

  const handleEditStock = (stock: Stock) => {
    openManageModal({
      id: stock.id,
      name: stock.name,
      quantity: stock.quantity,
      category: stock.category,
      price: stock.price,
    });
  };

  const handleDeleteAsset = (stock: Stock) => {
    openDangerModal({
      id: stock.id,
      name: stock.name,
      quantity: stock.quantity,
      category: stock.category,
      price: stock.price,
    });
  };

  const handleConfirmDelete = () => {
    onRemove(clickedStock.id);
  };

  const columns = useAssetColumns(handleEditStock, handleDeleteAsset);

  const stocks = R.pathOr([], ["data", "stocks"])(context);

  return (
    <ResourceLoader onLoad={onLoad} context={StocksContext}>
      <h1 className="text-2xl font-medium mb-10">{t("stocks.title")}</h1>
      <DataTable columns={columns} data={stocks} />
    </ResourceLoader>
  );
};

export default Stocks;
