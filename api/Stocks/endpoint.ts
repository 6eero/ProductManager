import { stocksMock } from "@/mocks/stocks";

export const get = async () => {
  return {
    data: {
      stocks: stocksMock,
    },
    headers: {},
  };
};

export const add = async () => {
  return { data: {}, headers: {} };
};

export const remove = async () => {
  return { data: {}, headers: {} };
};

export const update = async () => {
  return { data: {}, headers: {} };
};
