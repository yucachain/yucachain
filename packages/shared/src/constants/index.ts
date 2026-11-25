export const DEFAULT_COMMISSION_RATE = 0.05;

export const PRODUCE_UNITS = [
  "bundle",
  "bag",
  "basket",
  "bunch",
  "tonne",
  "tuber",
] as const;

export const MARKET_LOCATIONS = [
  "Abeokuta",
  "Mowe",
  "Mowe Ibafo",
  "Ilorin",
  "Lagos",
  "Central Market",
] as const;

export const NIGERIAN_BANKS = [
  "Access Bank",
  "Fidelity Bank",
  "First Bank",
  "GTBank",
  "OPAY",
  "PalmPay",
  "Sterling Bank",
  "UBA",
  "Union Bank",
  "Wema Bank",
  "Zenith Bank",
] as const;

export const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Awaiting payment",
  CONFIRMED: "Confirmed",
  IN_TRANSIT: "In transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};
