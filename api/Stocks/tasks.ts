import { useStocksDispatchContext } from "@/context/Stocks";
import actions from "@/modules/stocks/actions";
import * as APIStocks from "./endpoint";
import { Stock } from "@/models/stocks";

export const useStocksActions = () => {
  const dispatch = useStocksDispatchContext();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return {
    onLoad: async () => {
      try {
        dispatch(actions.get({}));
        const { data } = await APIStocks.get();
        dispatch(actions.getSuccess({ data }));
      } catch (error) {
        dispatch(actions.getFail({ error }));
      }
    },

    onAdd: async (stock: Stock, stocks: Stock[]) => {
      try {
        dispatch(actions.add({}));
        const { data } = await APIStocks.add(stock, stocks);
        await delay(500);
        dispatch(actions.addSuccess({ data }));
      } catch (error) {
        dispatch(actions.addFail({ error }));
      }
    },

    onRemove: async (id: string, stocks: Stock[]) => {
      try {
        dispatch(actions.remove({}));
        const { data } = await APIStocks.remove(id, stocks);
        await delay(500);
        dispatch(actions.removeSuccess({ data }));
      } catch (error) {
        dispatch(actions.removeFail({ error }));
      }
    },

    onUpdate: async (stock: Stock, stocks: Stock[]) => {
      try {
        dispatch(actions.update({}));
        const { data } = await APIStocks.update(stock, stocks);
        await delay(500);
        dispatch(actions.updateSuccess({ data }));
      } catch (error) {
        dispatch(actions.updateFail({ error }));
      }
    },
  };
};
