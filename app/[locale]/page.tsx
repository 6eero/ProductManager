"use client";
import { useAppContext } from "@/context/App";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("HomePage");
  const context = useAppContext();
  console.log(context);
  return (
    <>
      <h1>{t("title")}</h1>
    </>
  );
};

export default Home;
