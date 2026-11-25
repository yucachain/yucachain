export function commissionAmount(subtotal: number, rate: number) {
  return Math.round(subtotal * rate);
}
