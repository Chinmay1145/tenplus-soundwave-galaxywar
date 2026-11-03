export function inr(n: number): string {
  // Round away float noise: ₹75,505.333 -> ₹75,505
  const v = Math.abs(n) < 1000 && !Number.isInteger(n) ? Math.round(n * 100) / 100 : Math.round(n);
  return "₹" + v.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}
