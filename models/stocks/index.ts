export type Category = "electronics" | "clothing" | "food";

export interface Stock {
  id: string;
  nome: string;
  quantita: number;
  categoria: Category;
  prezzo: number;
}
