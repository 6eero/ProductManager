"use client";
import reducer from "@/modules/stocks/reducer";
import { Dispatch, createContext, useContext } from "react";
import { useReducer } from "react";
import { StocksState, StocksAction, BaseProvider } from "@/context/Contexts";

const initState: StocksState = {
  data: {},
  loading: true,
  updating: false,
  error: false,
};

export const StocksContext = createContext<StocksState | null>(null);
export const StocksDispatchContext =
  createContext<Dispatch<StocksAction> | null>(null);

export const useStocksContext = () => {
  const context = useContext(StocksContext);
  if (!context) {
    throw new Error(
      "useStocksContext must be used within StocksContextProvider"
    );
  }
  return context;
};

export const useStocksDispatchContext = () => {
  const context = useContext(StocksDispatchContext);
  if (!context) {
    throw new Error(
      "useStocksDispatchContext must be used within StocksContextProvider"
    );
  }
  return context;
};

export const StocksContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <StocksContext.Provider
      value={{
        ...state,
      }}
    >
      <StocksDispatchContext.Provider value={dispatch}>
        {children}
      </StocksDispatchContext.Provider>
    </StocksContext.Provider>
  );
};
