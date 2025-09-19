import { Category } from "./index";

export const getCategories = (t: (key: string) => string) => [
  {
    key: "electronics" as Category,
    value: t("products.categories.electronics"),
  },
  { key: "clothing" as Category, value: t("products.categories.clothing") },
  { key: "food" as Category, value: t("products.categories.food") },
];
