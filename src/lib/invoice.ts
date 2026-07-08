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

// Refined monochrome palette with a single strong accent
const ink: [number, number, number] = [12, 12, 14];
const graphite: [number, number, number] = [42, 42, 48];
const sub: [number, number, number] = [88, 88, 96];
const muted: [number, number, number] = [140, 140, 148];
const hair: [number, number, number] = [230, 230, 234];
const accent: [number, number, number] = [225, 29, 47];
const paper: [number, number, number] = [252, 252, 253];
const soft: [number, number, number] = [246, 246, 248];
const success: [number, number, number] = [22, 133, 87];

// ── Number to words (Indian system) ──────────────────────────
const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const twoDigits = (n: number): string =>
  n < 20 ? ones[n] : tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
const threeDigits = (n: number): string => {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return (h ? ones[h] + " Hundred" + (r ? " and " : "") : "") + (r ? twoDigits(r) : "");
};
function numToWordsInr(num: number): string {
  const n = Math.floor(num);
  if (n === 0) return "Zero Rupees Only";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  const paise = Math.round((num - n) * 100);
  let out = "";
  if (crore) out += twoDigits(crore) + " Crore ";
  if (lakh) out += twoDigits(lakh) + " Lakh ";
  if (thousand) out += twoDigits(thousand) + " Thousand ";
  if (rest) out += threeDigits(rest);
  out = out.trim() + " Rupees";
  if (paise) out += " and " + twoDigits(paise) + " Paise";
  return out + " Only";
}

export function downloadInvoice(data: InvoiceData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;

  const shortId = data.id.slice(0, 8).toUpperCase();
  const created = new Date(data.createdAt);
  const due = new Date(created.getTime() + 7 * 86400000);
  const dateFmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const isPaid = /paid|confirmed|packed|shipped|delivered|out_for_delivery/i.test(
    data.status || "confirmed",
  );

  // Page background
  doc.setFillColor(...paper);
  doc.rect(0, 0, W, H, "F");

  // ── MASTHEAD ─────────────────────────────────────────────
  // Slim accent bar
  doc.setFillColor(...accent);
  doc.rect(0, 0, W, 4, "F");

  // Wordmark
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ink);
  doc.text("PULSE", M, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text("AUDIO  LABS", M + 32, 34);

  // Right — document type
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...ink);
  doc.text("Invoice", W - M, 40, { align: "right" });

  // Divider
  doc.setDrawColor(...hair);
  doc.setLineWidth(0.5);
  doc.line(M, 54, W - M, 54);

  // ── META STRIP (4 columns) ───────────────────────────────
  const metaY = 72;
  const metaCols: [string, string][] = [
    ["INVOICE NO.", `INV-${shortId}`],
    ["ISSUE DATE", dateFmt(created)],
    ["DUE DATE", dateFmt(due)],
    ["STATUS", isPaid ? "PAID" : "DUE"],
  ];
  const metaW = (W - 2 * M) / 4;
  metaCols.forEach(([k, v], i) => {
    const x = M + i * metaW;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...muted);
    doc.text(k, x, metaY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    if (k === "STATUS") {
      doc.setTextColor(...(isPaid ? success : accent));
    } else {
      doc.setTextColor(...ink);
    }
    doc.text(v, x, metaY + 16);
  });

  // ── PARTIES ──────────────────────────────────────────────
  let y = 120;
  const colW = (W - 2 * M - 40) / 2;

  const label = (t: string, x: number, yy: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...muted);
    doc.text(t, x, yy);
  };

  label("FROM", M, y);
  label("BILLED TO", M + colW + 40, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...ink);
  doc.text("PULSE Audio Pvt. Ltd.", M, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...sub);
  ["12, Innovation Park, Koramangala", "Bengaluru, Karnataka 560001", "GSTIN 29ABCDE1234F1Z5", "support@pulse.audio"].forEach(
    (l, i) => doc.text(l, M, y + 32 + i * 12),
  );

  const addr = (data.shippingAddress || {}) as Record<string, string>;
  const customerName = data.customer?.name || (addr.name as string) || "Valued Customer";
  const customerEmail = data.customer?.email || "";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...ink);
  doc.text(customerName, M + colW + 40, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...sub);
  const billLines = [
    addr.line1 as string,
    [addr.city, addr.state, addr.pincode].filter(Boolean).join(", "),
    customerEmail,
    addr.phone ? `Tel: ${addr.phone}` : "",
  ].filter(Boolean) as string[];
  billLines.forEach((l, i) => doc.text(l, M + colW + 40, y + 32 + i * 12));

  // ── ITEMS TABLE ──────────────────────────────────────────
  y = 220;
  const tableX = M;
  const tableW = W - 2 * M;
  const colDesc = tableX + 14;
  const colHsn = tableX + tableW * 0.55;
  const colQty = tableX + tableW * 0.68;
  const colUnit = tableX + tableW * 0.83;
  const colAmt = tableX + tableW - 14;

  // Header row — no fill, just rules — editorial feel
  doc.setDrawColor(...ink);
  doc.setLineWidth(1);
  doc.line(tableX, y, tableX + tableW, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...ink);
  doc.text("DESCRIPTION", colDesc, y + 14);
  doc.text("HSN", colHsn, y + 14);
  doc.text("QTY", colQty, y + 14, { align: "right" });
  doc.text("UNIT PRICE", colUnit, y + 14, { align: "right" });
  doc.text("AMOUNT", colAmt, y + 14, { align: "right" });
  doc.setDrawColor(...hair);
  doc.setLineWidth(0.5);
  doc.line(tableX, y + 22, tableX + tableW, y + 22);

  y += 38;

  const explicitSubtotal = data.subtotal && data.subtotal > 0 ? data.subtotal : 0;
  const itemsTotal = data.items.reduce((s, it) => s + (it.price ?? 0) * it.qty, 0);
  const subtotal = explicitSubtotal || itemsTotal || data.total / 1.18;
  const tax = data.tax ?? Math.max(0, data.total - subtotal - (data.shipping ?? 0));
  const cgst = tax / 2;
  const sgst = tax / 2;
  const shipFee = data.shipping ?? 0;
  const totalQty = data.items.reduce((a, b) => a + b.qty, 0);

  const pageBottomLimit = H - 240; // reserve space for totals + footer

  const drawPageChrome = (pageNum: number, pageTotal: number) => {
    // Footer
    doc.setDrawColor(...hair);
    doc.setLineWidth(0.5);
    doc.line(M, H - 44, W - M, H - 44);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text("PULSE Audio Pvt. Ltd.  ·  support@pulse.audio  ·  www.pulse.audio", M, H - 28);
    doc.text(`Page ${pageNum} of ${pageTotal}`, W - M, H - 28, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...muted);
    doc.text(`INV-${shortId}`, W - M, H - 16, { align: "right" });
  };

  data.items.forEach((it, idx) => {
    const unit = it.price ?? subtotal / Math.max(1, totalQty);
    const amt = unit * it.qty;
    const nameLines = doc.splitTextToSize(it.name, (colHsn - colDesc) - 20) as string[];
    const rowH = Math.max(28, 14 + nameLines.length * 12);

    if (y + rowH > pageBottomLimit) {
      drawPageChrome(doc.getNumberOfPages(), 0); // will fix totals later
      doc.addPage();
      doc.setFillColor(...paper);
      doc.rect(0, 0, W, H, "F");
      doc.setFillColor(...accent);
      doc.rect(0, 0, W, 4, "F");
      y = 60;
      // Re-draw table header
      doc.setDrawColor(...ink);
      doc.setLineWidth(1);
      doc.line(tableX, y, tableX + tableW, y);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...ink);
      doc.text("DESCRIPTION", colDesc, y + 14);
      doc.text("HSN", colHsn, y + 14);
      doc.text("QTY", colQty, y + 14, { align: "right" });
      doc.text("UNIT PRICE", colUnit, y + 14, { align: "right" });
      doc.text("AMOUNT", colAmt, y + 14, { align: "right" });
      doc.setDrawColor(...hair);
      doc.setLineWidth(0.5);
      doc.line(tableX, y + 22, tableX + tableW, y + 22);
      y += 38;
    }

    doc.setTextColor(...ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(nameLines[0], colDesc, y);
    if (nameLines.length > 1) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...sub);
      nameLines.slice(1).forEach((ln, i) => doc.text(ln, colDesc, y + 12 + i * 11));
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...muted);
    doc.text("SKU · " + (String(idx + 1).padStart(3, "0")), colDesc, y + 12 + Math.max(0, nameLines.length - 1) * 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...graphite);
    doc.text("8518", colHsn, y);
    doc.text(String(it.qty), colQty, y, { align: "right" });
    doc.text(inr(unit), colUnit, y, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...ink);
    doc.text(inr(amt), colAmt, y, { align: "right" });

    // Row separator
    doc.setDrawColor(...hair);
    doc.setLineWidth(0.4);
    doc.line(tableX, y + rowH - 8, tableX + tableW, y + rowH - 8);

    y += rowH;
  });

  // ── TOTALS ───────────────────────────────────────────────
  y += 12;
  const totalsW = 260;
  const totalsX = W - M - totalsW;

  // Left — amount in words + notes
  const leftW = W - 2 * M - totalsW - 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...muted);
  doc.text("AMOUNT IN WORDS", M, y + 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...ink);
  const words = doc.splitTextToSize(numToWordsInr(data.total), leftW) as string[];
  words.slice(0, 3).forEach((w, i) => doc.text(w, M, y + 26 + i * 13));

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...muted);
  doc.text("NOTES", M, y + 82);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...sub);
  doc.text(
    `${totalQty} item${totalQty !== 1 ? "s" : ""}  ·  Payment via ${(data.paymentMethod || "Prepaid").toUpperCase()}  ·  Thank you for choosing PULSE.`,
    M,
    y + 96,
  );

  // Right — totals column
  let ty = y + 10;
  const line = (l: string, v: string, opts: { bold?: boolean; big?: boolean; rule?: boolean } = {}) => {
    if (opts.rule) {
      doc.setDrawColor(...ink);
      doc.setLineWidth(0.8);
      doc.line(totalsX, ty - 6, W - M, ty - 6);
      ty += 6;
    }
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(opts.big ? 14 : 9.5);
    doc.setTextColor(...(opts.bold ? ink : sub));
    doc.text(l, totalsX, ty);
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setTextColor(...ink);
    doc.text(v, W - M, ty, { align: "right" });
    ty += opts.big ? 22 : 16;
  };
  line("Subtotal", inr(subtotal));
  line("CGST (9%)", inr(cgst));
  line("SGST (9%)", inr(sgst));
  line("Shipping", shipFee === 0 ? "Free" : inr(shipFee));
  line("Total", inr(data.total), { bold: true, big: true, rule: true });

  // Amount due block (large)
  ty += 6;
  doc.setFillColor(...ink);
  doc.roundedRect(totalsX, ty, totalsW, 56, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 190);
  doc.text(isPaid ? "AMOUNT PAID" : "AMOUNT DUE", totalsX + 16, ty + 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text(isPaid ? inr(0) : inr(data.total), W - M - 16, ty + 34, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 190);
  doc.text(isPaid ? `Received ${dateFmt(created)}` : `Due by ${dateFmt(due)}`, W - M - 16, ty + 48, {
    align: "right",
  });

  y = Math.max(y + 120, ty + 76);

  // ── TERMS + SIGNATURE ────────────────────────────────────
  y += 8;
  doc.setDrawColor(...hair);
  doc.setLineWidth(0.5);
  doc.line(M, y, W - M, y);
  y += 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...muted);
  doc.text("TERMS", M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...sub);
  const terms = [
    "Returns accepted within 30 days of delivery in original, unopened condition.",
    "Warranty: 2 years on all PULSE audio products against manufacturing defects.",
    "Subject to Bengaluru jurisdiction. E. & O. E.",
  ];
  terms.forEach((t, i) => doc.text("·  " + t, M, y + 14 + i * 11));

  // Signature (right)
  const sigX = W - M - 180;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(18);
  doc.setTextColor(...ink);
  doc.text("Pulse", sigX + 90, y + 20, { align: "center" });
  doc.setDrawColor(...ink);
  doc.setLineWidth(0.6);
  doc.line(sigX, y + 32, W - M, y + 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text("Authorised Signatory  ·  PULSE Audio Pvt. Ltd.", sigX + 90, y + 44, { align: "center" });

  // ── Draw footer + PAID watermark on every page ───────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    // Watermark
    if (isPaid) {
      const g = doc as unknown as { GState: new (o: object) => object; setGState: (s: object) => void };
      doc.setTextColor(...success);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(120);
      g.setGState(new g.GState({ opacity: 0.06 }));
      // Rotated text
      doc.text("PAID", W / 2, H / 2 + 40, { align: "center", angle: 20 });
      g.setGState(new g.GState({ opacity: 1 }));
    }
    // Footer
    doc.setDrawColor(...hair);
    doc.setLineWidth(0.5);
    doc.line(M, H - 44, W - M, H - 44);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text("PULSE Audio Pvt. Ltd.  ·  support@pulse.audio  ·  www.pulse.audio", M, H - 28);
    doc.text(`Page ${p} of ${totalPages}`, W - M, H - 28, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...muted);
    doc.text(`INV-${shortId}`, W - M, H - 16, { align: "right" });
  }

  doc.save(`PULSE-Invoice-${shortId}.pdf`);
}
