import { useStocksDispatchContext } from "@/context/Stocks";
import actions from "@/modules/stocks/actions";
import * as APIStocks from "./endpoint";

export const useStocksActions = () => {
  const dispatch = useStocksDispatchContext();

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

    onAdd: async () => {
      try {
        dispatch(actions.add({}));
        const { data } = await APIStocks.add();

        dispatch(actions.addSuccess({ data }));
      } catch (error) {
        dispatch(actions.addFail({ error }));
      }
    },

    onRemove: async () => {
      try {
        dispatch(actions.remove({}));
        const { data } = await APIStocks.remove();

        dispatch(actions.removeSuccess({ data }));
      } catch (error) {
        dispatch(actions.removeFail({ error }));
      }
    },

    onUpdate: async () => {
      try {
        dispatch(actions.update({}));
        const { data } = await APIStocks.update();

        dispatch(actions.updateSuccess({ data }));
      } catch (error) {
        dispatch(actions.updateFail({ error }));
      }
    },
  };
};
