"use client";

import { useAppActions } from "@/api/App/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { AppContext } from "@/context/App";
import { useTranslations } from "next-intl";

const App = () => {
  const t = useTranslations("HomePage");
  const { onWhoAmI } = useAppActions();
  return (
    <ResourceLoader onLoad={onWhoAmI} context={AppContext}>
      <h1>{t("title")}</h1>
    </ResourceLoader>
  );
};

export default App;
