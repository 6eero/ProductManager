import { stocksMock } from "@/mocks/stocks";
import { Stock } from "@/models/stocks";
import { v4 as uuidv4 } from "uuid";
import * as R from "ramda";

export const get = async () => {
  // Backend logic placeholder
  // ...

  return {
    data: { stocks: stocksMock },
    headers: {},
  };
};

export const add = async (stock: Stock, stocks: Stock[]) => {
  // Backend logic placeholder
  const uuid = uuidv4();
  const newStock = R.assoc("id", uuid, stock);
  const updatedStocks = R.append(newStock, stocks);

  return {
    data: { stocks: updatedStocks },
    headers: {},
  };
};

export const remove = async (id: string, stocks: Stock[]) => {
  // Backend logic placeholder
  const updatedStocks = R.reject((stock: Stock) => stock.id === id, stocks);

  return {
    data: { stocks: updatedStocks },
    headers: {},
  };
};

export const update = async (stock: Stock, stocks: Stock[]) => {
  // Backend logic placeholder
  const updatedStocks = R.map((s) => (s.id === stock.id ? stock : s), stocks);

  return { data: { stocks: updatedStocks }, headers: {} };
};
