"use client";

import { useStocksActions } from "@/api/Stocks/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { StocksContext, useStocksContext } from "@/context/Stocks";
import { useTranslations } from "next-intl";

const Stocks = () => {
  const t = useTranslations("HomePage");
  const { onLoad } = useStocksActions();
  const context = useStocksContext();

  console.log(context);
  return (
    <ResourceLoader onLoad={onLoad} context={StocksContext}>
      <h1>{t("title")}</h1>
    </ResourceLoader>
  );
};

export default Stocks;
