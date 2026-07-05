import { jsPDF } from "jspdf";

export type InvoiceItem = { name: string; qty: number; price?: number };
export type InvoiceData = {
  id: string;
  createdAt: string | Date;
  total: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  status?: string;
  paymentMethod?: string;
  items: InvoiceItem[];
  customer?: { name?: string; email?: string };
  shippingAddress?: Record<string, unknown> | null;
};

const inr = (n: number) =>
  "Rs. " + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Convert a number to Indian-English words (rupees + paise). Handles up to 99 crore.
function numberToWords(n: number): string {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (x: number): string => (x < 20 ? a[x] : `${b[Math.floor(x / 10)]}${x % 10 ? " " + a[x % 10] : ""}`);
  const three = (x: number): string => {
    const h = Math.floor(x / 100), r = x % 100;
    return `${h ? a[h] + " Hundred" + (r ? " " : "") : ""}${r ? two(r) : ""}`.trim();
  };
  const rupees = Math.floor(n);
  const paise = Math.round((n - rupees) * 100);
  if (rupees === 0 && paise === 0) return "Zero Rupees Only";
  const crore = Math.floor(rupees / 10000000);
  const lakh = Math.floor((rupees % 10000000) / 100000);
  const thousand = Math.floor((rupees % 100000) / 1000);
  const rest = rupees % 1000;
  let words = "";
  if (crore) words += two(crore) + " Crore ";
  if (lakh) words += two(lakh) + " Lakh ";
  if (thousand) words += two(thousand) + " Thousand ";
  if (rest) words += three(rest);
  words = words.trim() + " Rupees";
  if (paise) words += ` and ${two(paise)} Paise`;
  return words + " Only";
}

const ink: [number, number, number] = [17, 17, 19];
const sub: [number, number, number] = [60, 60, 68];
const muted: [number, number, number] = [120, 120, 128];
const hair: [number, number, number] = [225, 225, 230];
const accent: [number, number, number] = [225, 29, 47];
const tint: [number, number, number] = [250, 250, 252];
const paidGreen: [number, number, number] = [16, 122, 66];


export function downloadInvoice(data: InvoiceData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48; // page margin

  const shortId = data.id.slice(0, 8).toUpperCase();
  const created = new Date(data.createdAt);
  const due = new Date(created.getTime() + 7 * 86400000);
  const dateFmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // ── HEADER BAND ──────────────────────────────────────────
  doc.setFillColor(...ink);
  doc.rect(0, 0, W, 36, "F");
  doc.setFillColor(...accent);
  doc.rect(0, 36, W, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("PULSE · AUDIO LABS", M, 23);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(220, 220, 224);
  doc.text("Experience Sound Beyond Reality", W - M, 23, { align: "right" });

  // Logo mark (circle + dot)
  doc.setDrawColor(...accent);
  doc.setLineWidth(1.4);
  doc.circle(M + 12, 72, 12, "S");
  doc.setFillColor(...accent);
  doc.circle(M + 12, 72, 4, "F");

  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PULSE", M + 32, 77);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text("TAX INVOICE / BILL OF SUPPLY", M + 32, 90);

  // Right side: invoice meta
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...ink);
  doc.text("INVOICE", W - M, 74, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...sub);
  doc.text(`No.     INV-${shortId}`, W - M, 90, { align: "right" });
  doc.text(`Issued  ${dateFmt(created)}`, W - M, 104, { align: "right" });
  doc.text(`Due     ${dateFmt(due)}`, W - M, 118, { align: "right" });

  // Hairline rule
  doc.setDrawColor(...hair);
  doc.setLineWidth(0.6);
  doc.line(M, 134, W - M, 134);

  // ── PARTIES ──────────────────────────────────────────────
  let y = 158;
  const colW = (W - 2 * M) / 3;

  const labelStyle = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
  };
  const bodyStyle = () => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...ink);
  };

  labelStyle();
  doc.text("FROM", M, y);
  doc.text("BILLED TO", M + colW, y);
  doc.text("SHIPPED TO", M + colW * 2, y);

  bodyStyle();
  const fromLines = [
    "PULSE Audio Pvt. Ltd.",
    "12, Innovation Park",
    "Bengaluru, KA 560001",
    "GSTIN: 29ABCDE1234F1Z5",
    "support@pulse.audio",
  ];
  fromLines.forEach((l, i) => doc.text(l, M, y + 16 + i * 13));

  const addr = (data.shippingAddress || {}) as Record<string, string>;
  const customerName = data.customer?.name || (addr.name as string) || "Valued Customer";
  const customerEmail = data.customer?.email || "";
  const billLines = [customerName, customerEmail].filter(Boolean) as string[];
  billLines.forEach((l, i) => doc.text(l, M + colW, y + 16 + i * 13));

  const shipLines = [
    addr.name as string,
    addr.line1 as string,
    [addr.city, addr.state, addr.pincode].filter(Boolean).join(", "),
    addr.phone ? `Tel: ${addr.phone}` : "",
  ].filter(Boolean) as string[];
  if (shipLines.length === 0) shipLines.push("Same as billing");
  shipLines.forEach((l, i) => doc.text(l, M + colW * 2, y + 16 + i * 13));

  // ── ITEMS TABLE ──────────────────────────────────────────
  y = 260;
  const tableX = M;
  const tableW = W - 2 * M;
  const colHsn = M + 280;
  const colQty = M + 340;
  const colUnit = M + 410;
  const colAmt = W - M;

  // Header band
  doc.setFillColor(...ink);
  doc.rect(tableX, y, tableW, 26, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("DESCRIPTION", tableX + 12, y + 17);
  doc.text("HSN", colHsn, y + 17);
  doc.text("QTY", colQty, y + 17, { align: "right" });
  doc.text("UNIT PRICE", colUnit, y + 17, { align: "right" });
  doc.text("AMOUNT", colAmt - 12, y + 17, { align: "right" });

  y += 36;

  // Compute totals
  const explicitSubtotal = data.subtotal && data.subtotal > 0 ? data.subtotal : 0;
  const itemsTotal = data.items.reduce((sum, it) => sum + (it.price ?? 0) * it.qty, 0);
  const subtotal = explicitSubtotal || itemsTotal || data.total / 1.18;
  const tax = data.tax ?? Math.max(0, data.total - subtotal - (data.shipping ?? 0));
  const cgst = tax / 2;
  const sgst = tax / 2;
  const shipFee = data.shipping ?? 0;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  data.items.forEach((it, idx) => {
    const unit =
      it.price ??
      subtotal /
        Math.max(
          1,
          data.items.reduce((a, b) => a + b.qty, 0),
        );
    const amt = unit * it.qty;

    if (idx % 2 === 1) {
      doc.setFillColor(...tint);
      doc.rect(tableX, y - 14, tableW, 24, "F");
    }
    doc.setTextColor(...ink);
    doc.text(doc.splitTextToSize(it.name, 260)[0], tableX + 12, y);
    doc.setTextColor(...sub);
    doc.setFontSize(9);
    doc.text("8518", colHsn, y);
    doc.text(String(it.qty), colQty, y, { align: "right" });
    doc.text(inr(unit), colUnit, y, { align: "right" });
    doc.setTextColor(...ink);
    doc.setFontSize(10);
    doc.text(inr(amt), colAmt - 12, y, { align: "right" });
    y += 24;
  });

  // hairline under last row
  doc.setDrawColor(...hair);
  doc.setLineWidth(0.5);
  doc.line(tableX, y - 8, tableX + tableW, y - 8);

  // ── TOTALS ───────────────────────────────────────────────
  y += 14;
  const labelX = W - M - 200;
  const valueX = W - M;

  const row = (label: string, value: string, opts: { bold?: boolean; rule?: boolean } = {}) => {
    if (opts.rule) {
      doc.setDrawColor(...ink);
      doc.setLineWidth(0.8);
      doc.line(labelX, y - 10, valueX, y - 10);
    }
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(opts.bold ? 12 : 10);
    doc.setTextColor(...(opts.bold ? ink : sub));
    doc.text(label, labelX, y);
    doc.setTextColor(...ink);
    doc.text(value, valueX, y, { align: "right" });
    y += opts.bold ? 22 : 16;
  };

  row("Subtotal", inr(subtotal));
  row("CGST (9%)", inr(cgst));
  row("SGST (9%)", inr(sgst));
  row("Shipping", shipFee === 0 ? "FREE" : inr(shipFee));
  row("Total (INR)", inr(data.total), { bold: true, rule: true });

  // Amount in words (professional touch, mandatory on Indian invoices)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text("AMOUNT IN WORDS", M, y);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  const words = numberToWords(data.total);
  const wrapped = doc.splitTextToSize(words, W - 2 * M - 8);
  doc.text(wrapped, M, y + 14);
  y += 14 + wrapped.length * 12 + 8;

  // PAID stamp (rotated) if the order is paid
  const isPaid = (data.status || "").toLowerCase() !== "unpaid" && (data.paymentMethod || "prepaid").toLowerCase() !== "cod";
  if (isPaid) {
    doc.saveGraphicsState();
    doc.setTextColor(...paidGreen);
    doc.setDrawColor(...paidGreen);
    doc.setLineWidth(2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    const stampX = W - M - 210;
    const stampY = y - 50;
    doc.roundedRect(stampX, stampY, 150, 46, 6, 6, "S");
    doc.text("PAID", stampX + 75, stampY + 24, { align: "center", angle: -8 });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(`${new Date(created).toLocaleDateString("en-IN")}  ·  PULSE`, stampX + 75, stampY + 38, { align: "center", angle: -8 });
    doc.restoreGraphicsState();
  }


  // ── PAYMENT SUMMARY ──────────────────────────────────────
  y += 12;
  doc.setFillColor(...tint);
  doc.rect(M, y, W - 2 * M, 64, "F");
  doc.setDrawColor(...hair);
  doc.rect(M, y, W - 2 * M, 64, "S");

  const blockW = (W - 2 * M) / 4;
  const blocks: [string, string][] = [
    ["ORDER ID", `#${shortId}`],
    ["STATUS", (data.status || "confirmed").replace(/_/g, " ").toUpperCase()],
    ["PAYMENT", (data.paymentMethod || "Prepaid").toUpperCase()],
    ["AMOUNT PAID", inr(data.total)],
  ];
  blocks.forEach(([k, v], i) => {
    const bx = M + i * blockW + 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text(k, bx, y + 22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...ink);
    doc.text(v, bx, y + 44);
  });

  // Accent strip
  doc.setFillColor(...accent);
  doc.rect(M, y + 60, W - 2 * M, 4, "F");

  // ── TERMS & SIGNATURE ────────────────────────────────────
  y += 92;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...ink);
  doc.text("TERMS & CONDITIONS", M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...sub);
  const terms = [
    "1. Returns accepted within 30 days of delivery in original condition.",
    "2. Warranty: 2 years on all PULSE audio products against manufacturing defects.",
    "3. Goods once sold will not be taken back except as per return policy.",
    "4. Subject to Bengaluru jurisdiction. E. & O. E.",
  ];
  terms.forEach((t, i) => doc.text(t, M, y + 14 + i * 12));

  // Signature box
  const sigX = W - M - 160;
  const sigY = y + 8;
  doc.setDrawColor(...hair);
  doc.setLineWidth(0.5);
  doc.line(sigX, sigY + 44, W - M, sigY + 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text("Authorised Signatory", sigX + 80, sigY + 58, { align: "center" });
  doc.setFont("helvetica", "italic");
  doc.setFontSize(14);
  doc.setTextColor(...accent);
  doc.text("PULSE", sigX + 80, sigY + 38, { align: "center" });

  // ── FOOTER ───────────────────────────────────────────────
  doc.setDrawColor(...hair);
  doc.line(M, H - 50, W - M, H - 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text("Thank you for shopping with PULSE.", M, H - 34);
  doc.text(
    "This is a system-generated invoice and does not require a physical signature.",
    M,
    H - 22,
  );
  doc.setTextColor(...accent);
  doc.text("www.pulse.audio", W - M, H - 22, { align: "right" });

  doc.save(`PULSE-Invoice-${shortId}.pdf`);
}
