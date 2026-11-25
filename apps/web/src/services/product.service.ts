import type { BuyerRequest, Category, Product, SellerInterest } from "@yucachain/shared";
import { api } from "./api-client";

export interface ProductQuery {
  q?: string;
  category?: string;
  location?: string;
  sort?: string;
  limit?: number;
}

function queryString(query: ProductQuery) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const text = params.toString();
  return text ? `?${text}` : "";
}

export interface ListingInput {
  name: string;
  categorySlug: string;
  description?: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  harvestTime?: string;
}

export interface RequestInput {
  produce: string;
  quantity: number;
  unit: string;
  destination: string;
  budget: number;
  neededIn: string;
  notes?: string;
}

export const productService = {
  list(query: ProductQuery = {}) {
    return api<Product[]>(`/products${queryString(query)}`);
  },
  get(id: string) {
    return api<Product>(`/products/${id}`);
  },
  mine() {
    return api<Product[]>("/products/mine");
  },
  create(input: ListingInput) {
    return api<Product>("/products", { method: "POST", body: JSON.stringify(input) });
  },
  update(id: string, input: ListingInput) {
    return api<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(input) });
  },
  remove(id: string) {
    return api<{ ok: boolean }>(`/products/${id}`, { method: "DELETE" });
  },
  categories() {
    return api<Array<Category & { _count?: { products: number } }>>("/categories");
  },
  requests(limit?: number) {
    return api<BuyerRequest[]>(`/buyer-requests${limit ? `?limit=${limit}` : ""}`);
  },
  myRequests() {
    return api<BuyerRequest[]>("/buyer-requests/mine");
  },
  request(id: string) {
    return api<BuyerRequest>(`/buyer-requests/${id}`);
  },
  createRequest(input: RequestInput) {
    return api<BuyerRequest>("/buyer-requests", { method: "POST", body: JSON.stringify(input) });
  },
  expressInterest(id: string, input: { message?: string; price?: number }) {
    return api<SellerInterest>(`/buyer-requests/${id}/interest`, { method: "POST", body: JSON.stringify(input) });
  },
};
