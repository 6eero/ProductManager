import { Stock } from "@/models/stocks";
import { useState } from "react";

export const useModalState = () => {
  const [isManageStockModalOpen, setIsManageStockModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [clickedStock, setClickedStock] = useState<Stock>({
    id: "",
    name: "",
    quantity: 0,
    category: undefined,
    price: 0,
  });

  const openManageModal = (stock?: Partial<Stock>) => {
    if (stock) {
      setClickedStock({
        id: stock.id || "",
        name: stock.name || "",
        quantity: stock.quantity || 0,
        category: stock.category || undefined,
        price: stock.price || 0,
      });
    }
    setIsManageStockModalOpen(true);
  };

  const openDangerModal = (asset: Stock) => {
    setClickedStock(asset);
    setIsDangerModalOpen(true);
  };

  return {
    isManageStockModalOpen,
    setIsManageStockModalOpen,
    isDangerModalOpen,
    setIsDangerModalOpen,
    clickedStock,
    setClickedStock,
    openManageModal,
    openDangerModal,
  };
};
