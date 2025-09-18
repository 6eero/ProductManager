import { Category } from "./index";

export const getCategories = (t: (key: string) => string) => [
  { key: "electronics" as Category, value: t("stocks.categories.electronics") },
  { key: "clothing" as Category, value: t("stocks.categories.clothing") },
  { key: "food" as Category, value: t("stocks.categories.food") },
];
