"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Cart } from "@yucachain/shared";
import { useAuth } from "./AuthContext";
import { orderService } from "@/services/order.service";

interface CartState {
  cart: Cart | null;
  count: number;
  subtotal: number;
  refresh: () => Promise<void>;
  add: (productId: string, quantity: number) => Promise<void>;
  update: (itemId: string, quantity: number) => Promise<void>;
  remove: (itemId: string) => Promise<void>;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);

  async function refresh() {
    if (user?.role !== "BUYER") {
      setCart(null);
      return;
    }
    setCart(await orderService.cart());
  }

  useEffect(() => {
    refresh().catch(() => setCart(null));
  }, [user?.id, user?.role]);

  async function add(productId: string, quantity: number) {
    setCart(await orderService.addToCart(productId, quantity));
  }
  async function update(itemId: string, quantity: number) {
    setCart(await orderService.updateCart(itemId, quantity));
  }
  async function remove(itemId: string) {
    setCart(await orderService.removeCart(itemId));
  }

  const count = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const subtotal = cart?.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0) ?? 0;
  const value = useMemo(() => ({ cart, count, subtotal, refresh, add, update, remove }), [cart, count, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
