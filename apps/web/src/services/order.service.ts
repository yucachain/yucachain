import type { Cart, Order } from "@yucachain/shared";
import { api } from "./api-client";

export const orderService = {
  cart() {
    return api<Cart>("/cart");
  },
  addToCart(productId: string, quantity: number) {
    return api<Cart>("/cart/items", { method: "POST", body: JSON.stringify({ productId, quantity }) });
  },
  updateCart(itemId: string, quantity: number) {
    return api<Cart>(`/cart/items/${itemId}`, { method: "PATCH", body: JSON.stringify({ quantity }) });
  },
  removeCart(itemId: string) {
    return api<Cart>(`/cart/items/${itemId}`, { method: "DELETE" });
  },
  list() {
    return api<Order[]>("/orders");
  },
  get(id: string) {
    return api<Order>(`/orders/${id}`);
  },
  checkout(destination: string) {
    return api<Order[]>("/orders/checkout", { method: "POST", body: JSON.stringify({ destination }) });
  },
  updateStatus(id: string, status: string) {
    return api<Order>(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  },
  sellerDashboard() {
    return api<{
      profile: import("@yucachain/shared").PublicUser;
      stats: { rating: number; reviewCount: number; activeListings: number; activeSales: number; totalSales: number };
      listings: import("@yucachain/shared").Product[];
      recentSales: Order[];
    }>("/farmers/dashboard");
  },
  buyerDashboard() {
    return api<{
      profile: import("@yucachain/shared").PublicUser;
      stats: { openRequests: number; recentPurchases: number; pendingDeliveries: number; totalPurchase: number };
      requests: import("@yucachain/shared").BuyerRequest[];
      orders: Order[];
      pending: Order[];
    }>("/buyers/dashboard");
  },
};
