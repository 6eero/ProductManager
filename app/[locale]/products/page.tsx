import Products from "@/modules/products/Products";
import { getTranslations } from "next-intl/server";

interface PageParams {
  locale: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<PageParams>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
};

export default async function Page() {
  return <Products />;
}
