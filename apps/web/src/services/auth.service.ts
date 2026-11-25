import type { AuthResponse, PublicUser } from "@yucachain/shared";
import { api } from "./api-client";

const WEEK = 60 * 60 * 24 * 7;

export function persistSession(token: string, role: string) {
  localStorage.setItem("yc_token", token);
  localStorage.setItem("yc_role", role);
  document.cookie = `yc_token=${token}; path=/; max-age=${WEEK}`;
  document.cookie = `yc_role=${role}; path=/; max-age=${WEEK}`;
}

export function clearSession() {
  localStorage.removeItem("yc_token");
  localStorage.removeItem("yc_role");
  document.cookie = "yc_token=; path=/; max-age=0";
  document.cookie = "yc_role=; path=/; max-age=0";
}

export const authService = {
  register(input: {
    fullName: string;
    businessName?: string;
    phone: string;
    password: string;
    role: "BUYER" | "SELLER";
    location?: string;
  }) {
    return api<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(input) });
  },
  login(phone: string, password: string) {
    return api<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ phone, password }) });
  },
  me() {
    return api<PublicUser>("/auth/me");
  },
  updateProfile(input: { fullName?: string; businessName?: string; location?: string; bio?: string }) {
    return api<PublicUser>("/users/me", { method: "PATCH", body: JSON.stringify(input) });
  },
  stats() {
    return api<{
      users: number;
      farmers: number;
      buyers: number;
      products: number;
      orders: number;
      gmv: number;
      pendingPayouts: number;
      commissionAccrued: number;
    }>("/admin/stats");
  },
  users() {
    return api<Array<PublicUser & { _count?: { products: number; ordersSold: number; ordersBought: number; buyerRequests: number } }>>("/admin/users");
  },
  farmers() {
    return api<Array<PublicUser & { _count?: { products: number; ordersSold: number } }>>("/farmers");
  },
  buyers() {
    return api<Array<PublicUser & { _count?: { ordersBought: number; buyerRequests: number } }>>("/buyers");
  },
  setStatus(id: string, status: "ACTIVE" | "SUSPENDED") {
    return api<PublicUser>(`/admin/users/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  },
  toggleFarmer(id: string) {
    return api<PublicUser>(`/farmers/${id}/verification`, { method: "PATCH" });
  },
  settings() {
    return api<{ commissionRate: number; platformName: string; supportEmail: string }>("/admin/settings");
  },
  updateSettings(input: { commissionRate?: number; platformName?: string; supportEmail?: string }) {
    return api<{ commissionRate: number; platformName: string; supportEmail: string }>("/admin/settings", {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  },
};

export function homeFor(role: string) {
  if (role === "SELLER") return "/seller/dashboard";
  if (role === "ADMIN") return "/admin/dashboard";
  return "/buyer/dashboard";
}
