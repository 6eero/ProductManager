"use client";
import reducer from "@/modules/app/reducer";
import { Dispatch, createContext, useContext } from "react";
import { useReducer } from "react";
import { AppState, AppAction, BaseProvider } from "@/context/Contexts";

const initState: AppState = {
  data: {},
  loading: false,
  error: false,
};

export const AppContext = createContext<AppState | null>(null);
export const AppDispatchContext = createContext<Dispatch<AppAction> | null>(
  null
);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};

export const useAppDispatchContext = () => {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error(
      "useAppDispatchContext must be used within AppContextProvider"
    );
  }
  return context;
};

export const AppContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
