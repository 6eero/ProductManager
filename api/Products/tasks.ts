import { useProductsDispatchContext } from "@/context/Products";
import actions from "@/modules/products/actions";
import * as APIProducts from "./endpoint";
import { Product } from "@/models/products";

export const useProductsActions = () => {
  const dispatch = useProductsDispatchContext();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return {
    onLoad: async () => {
      try {
        dispatch(actions.get({}));
        const { data } = await APIProducts.get();
        dispatch(actions.getSuccess({ data }));
      } catch (error) {
        dispatch(actions.getFail({ error }));
      }
    },

    onAdd: async (product: Product, products: Product[]) => {
      try {
        dispatch(actions.add({}));
        const { data } = await APIProducts.add(product, products);
        await delay(500);
        dispatch(actions.addSuccess({ data }));
      } catch (error) {
        dispatch(actions.addFail({ error }));
      }
    },

    onRemove: async (id: string, products: Product[]) => {
      try {
        dispatch(actions.remove({}));
        const { data } = await APIProducts.remove(id, products);
        await delay(500);
        dispatch(actions.removeSuccess({ data }));
      } catch (error) {
        dispatch(actions.removeFail({ error }));
      }
    },

    onUpdate: async (product: Product, products: Product[]) => {
      try {
        dispatch(actions.update({}));
        const { data } = await APIProducts.update(product, products);
        await delay(500);
        dispatch(actions.updateSuccess({ data }));
      } catch (error) {
        dispatch(actions.updateFail({ error }));
      }
    },
  };
};
