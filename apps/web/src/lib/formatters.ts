import { ORDER_STATUS_LABEL } from "@yucachain/shared";

export function formatNaira(value: number) {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

export function plural(count: number, unit: string) {
  if (count === 1) return unit;
  if (unit === "tonne") return "tonnes";
  if (unit === "bunch") return "bunches";
  return unit.endsWith("s") ? unit : `${unit}s`;
}

export function formatQuantity(count: number, unit: string) {
  return `${count.toLocaleString("en-NG")} ${plural(count, unit)}`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(new Date(value));
}

export function orderLabel(status: string) {
  return ORDER_STATUS_LABEL[status] ?? status.replaceAll("_", " ").toLowerCase();
}
