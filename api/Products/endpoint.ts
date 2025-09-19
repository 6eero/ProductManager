import { productsMock } from "@/mocks/products";
import { Product } from "@/models/products";
import { v4 as uuidv4 } from "uuid";
import * as R from "ramda";

export const get = async () => {
  // Backend logic placeholder
  // ...

  return {
    data: { products: productsMock },
    headers: {},
  };
};

export const add = async (product: Product, products: Product[]) => {
  // Backend logic placeholder
  const uuid = uuidv4();
  const newProduct = R.assoc("id", uuid, product);
  const updatedProducts = R.append(newProduct, products);

  return {
    data: { products: updatedProducts },
    headers: {},
  };
};

export const remove = async (id: string, products: Product[]) => {
  // Backend logic placeholder
  const updatedProducts = R.reject(
    (product: Product) => product.id === id,
    products
  );

  return {
    data: { products: updatedProducts },
    headers: {},
  };
};

export const update = async (product: Product, products: Product[]) => {
  // Backend logic placeholder
  const updatedProducts = R.map(
    (s) => (s.id === product.id ? product : s),
    products
  );

  return { data: { products: updatedProducts }, headers: {} };
};
