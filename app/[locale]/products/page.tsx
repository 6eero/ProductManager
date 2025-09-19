import Products from "@/modules/products/Products";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({ params: { locale } }: any) => {
  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
};

export default function Page() {
  return <Products />;
}
