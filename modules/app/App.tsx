"use client";

import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { AppContext, useAppContext } from "@/context/App";
import { useTranslations } from "next-intl";

const App = () => {
  const t = useTranslations("HomePage");
  const { onLoad } = useAppActions();
  const context = useAppContext();
  return (
    <ResourceLoader onLoad={onLoad} context={AppContext}>
      <h1>{t("title")}</h1>
    </ResourceLoader>
  );
};

export default App;
