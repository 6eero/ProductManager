"use client";
import reducer from "@/modules/products/reducer";
import { Dispatch, createContext, useContext } from "react";
import { useReducer } from "react";
import {
  ProductsState,
  ProductsAction,
  BaseProvider,
} from "@/context/Contexts";

const initState: ProductsState = {
  data: {},
  loading: true,
  updating: false,
  error: false,
};

export const ProductsContext = createContext<ProductsState | null>(null);
export const ProductsDispatchContext =
  createContext<Dispatch<ProductsAction> | null>(null);

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext must be used within ProductsContextProvider"
    );
  }
  return context;
};

export const useProductsDispatchContext = () => {
  const context = useContext(ProductsDispatchContext);
  if (!context) {
    throw new Error(
      "useProductsDispatchContext must be used within ProductsContextProvider"
    );
  }
  return context;
};

export const ProductsContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
      }}
    >
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};
