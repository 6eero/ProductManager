export interface BaseProvider {
  children: React.ReactNode;
}

export type AppState = {
  loading: boolean;
  error: boolean;
  data: any;
};

export type AppAction = {
  type: string;
  payload?: any;
};

export type ProductsState = {
  loading: boolean;
  updating: boolean;
  error: boolean;
  data: any;
};

export type ProductsAction = {
  type: string;
  payload?: any;
};
