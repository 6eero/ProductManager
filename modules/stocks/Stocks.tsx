"use client";

import { useStocksActions } from "@/api/Stocks/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { DataTable } from "@/components/layout/Table";
import { StocksContext, useStocksContext } from "@/context/Stocks";
import { Stock } from "@/models/stocks";
import { useStockColumns } from "@/models/stocks/table";
import { useTranslations } from "next-intl";
import * as R from "ramda";

const Stocks = () => {
  const t = useTranslations("");
  const { onLoad } = useStocksActions();
  const context = useStocksContext();

  const openDeleteModal = (stock: Stock): void => {
    throw new Error("Function not implemented.");
  };
  const openAddModal = (stock: Stock): void => {
    throw new Error("Function not implemented.");
  };
  const openEditModal = (stock: Stock): void => {
    throw new Error("Function not implemented.");
  };

  const columns = useStockColumns(openEditModal, openDeleteModal);
  const stocks = R.pathOr([], ["data", "stocks"])(context);

  return (
    <ResourceLoader onLoad={onLoad} context={StocksContext}>
      <h1 className="text-2xl font-medium mb-10">{t("stocks.title")}</h1>
      <DataTable columns={columns} data={stocks} />
    </ResourceLoader>
  );
};

export default Stocks;
