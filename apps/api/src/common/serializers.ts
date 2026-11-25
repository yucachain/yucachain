export const userSelect = {
  id: true,
  fullName: true,
  businessName: true,
  phone: true,
  role: true,
  location: true,
  bio: true,
  verified: true,
  rating: true,
  reviewCount: true,
  status: true,
  createdAt: true,
} as const;

export const productInclude = {
  category: true,
  seller: { select: userSelect },
} as const;

export const orderInclude = {
  buyer: { select: userSelect },
  seller: { select: userSelect },
  items: true,
  payment: true,
  delivery: true,
  commission: true,
} as const;

export function imageForProduce(name: string) {
  const value = name.toLowerCase();
  const pairs: Array<[string, string]> = [
    ["cassava", "cassava"],
    ["onion", "onion"],
    ["carrot", "carrot"],
    ["watermelon", "watermelon"],
    ["plantain", "plantain"],
    ["tomato", "tomato"],
    ["cashew", "cashew"],
    ["pepper", "pepper"],
    ["yam", "yam"],
    ["maize", "maize"],
    ["bean", "beans"],
  ];
  const match = pairs.find(([key]) => value.includes(key));
  return `/images/products/${match?.[1] ?? "produce"}.svg`;
}

export function orderCode() {
  const stamp = Date.now().toString(36).toUpperCase();
  const extra = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `YC-${stamp}${extra}`;
}
