import QRCode from "qrcode";
import type { jsPDF } from "jspdf";

/**
 * Draws the PULSE brand sigil — a dual-ring orbit wrapping a five-bar
 * equalizer with a live pulse dot at the ring break — matching the on-site
 * SVG logo. Shared by the invoice and report PDFs so both look identical.
 */
export function drawPulseMark(
  doc: jsPDF,
  x: number,
  y: number,
  size: number,
  onDark = false,
) {
  const s = size;
  const cx = x + s / 2;
  const cy = y + s / 2;
  const line: [number, number, number] = onDark ? [255, 255, 255] : [225, 29, 47];
  const fill: [number, number, number] = onDark ? [255, 255, 255] : [225, 29, 47];

  // Outer ring
  doc.setDrawColor(line[0], line[1], line[2]);
  doc.setLineWidth(Math.max(0.7, s * 0.045));
  doc.circle(cx, cy, s * 0.46, "S");

  // Inner ring (lighter)
  const soft: [number, number, number] = onDark
    ? [180, 180, 188]
    : [244, 168, 176];
  doc.setDrawColor(soft[0], soft[1], soft[2]);
  doc.setLineWidth(Math.max(0.4, s * 0.022));
  doc.circle(cx, cy, s * 0.34, "S");

  // Equalizer bars
  doc.setFillColor(fill[0], fill[1], fill[2]);
  const heights = [0.22, 0.38, 0.52, 0.34, 0.18];
  const bw = s * 0.065;
  const gap = s * 0.055;
  const totalW = heights.length * bw + (heights.length - 1) * gap;
  heights.forEach((h, i) => {
    const bh = s * h;
    const bx = cx - totalW / 2 + i * (bw + gap);
    doc.roundedRect(bx, cy - bh / 2, bw, bh, bw / 2, bw / 2, "F");
  });

  // Live pulse dot on the orbit
  doc.circle(cx + s * 0.46 * 0.72, cy + s * 0.46 * 0.66, Math.max(0.9, s * 0.055), "F");
}

/** Mark + "PULSE." wordmark with a caption line beneath. */
export function drawPulseLockup(
  doc: jsPDF,
  x: number,
  y: number,
  caption: string,
  markSize = 34,
) {
  drawPulseMark(doc, x, y, markSize);
  const baseline = y + markSize * 0.62;
  doc.setTextColor(17, 17, 19);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("PULSE", x + markSize + 10, baseline);
  doc.setTextColor(225, 29, 47);
  doc.text(".", x + markSize + 10 + doc.getTextWidth("PULSE"), baseline);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 128);
  doc.text(caption, x + markSize + 10, baseline + 14);
}

/** Public site origin used for QR deep links inside generated PDFs. */
export function siteOrigin() {
  try {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }
  } catch {
    /* ignore */
  }
  return "https://pulse.audio";
}

/** Deep link to the order tracking timeline for a given order id. */
export function trackingUrl(orderId?: string) {
  const base = `${siteOrigin()}/track-order`;
  return orderId ? `${base}?id=${encodeURIComponent(orderId)}` : base;
}

/**
 * Draws a QR code as vector squares (no canvas / raster needed, so it stays
 * crisp at any zoom and works in every runtime). Returns the drawn size.
 */
export function drawQrCode(
  doc: jsPDF,
  x: number,
  y: number,
  size: number,
  text: string,
) {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const count = qr.modules.size;
  const data = qr.modules.data;
  const quiet = size * 0.08;
  const inner = size - quiet * 2;
  const cell = inner / count;

  // white plate so the code stays scannable on tinted backgrounds
  doc.setFillColor(255, 255, 255);
  doc.rect(x, y, size, size, "F");
  doc.setFillColor(17, 17, 19);
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (data[r * count + c]) {
        doc.rect(x + quiet + c * cell, y + quiet + r * cell, cell + 0.15, cell + 0.15, "F");
      }
    }
  }
  return size;
}

/** QR code inside a bordered card with a heading + caption. */
export function drawQrPanel(
  doc: jsPDF,
  x: number,
  y: number,
  url: string,
  heading = "SCAN TO TRACK",
  caption = "Live order timeline",
  qrSize = 72,
) {
  const padX = 10;
  const w = qrSize + padX * 2 + 96;
  const h = qrSize + 20;
  doc.setFillColor(250, 250, 252);
  doc.roundedRect(x, y, w, h, 6, 6, "F");
  doc.setDrawColor(225, 225, 230);
  doc.setLineWidth(0.6);
  doc.roundedRect(x, y, w, h, 6, 6, "S");
  drawQrCode(doc, x + padX, y + 10, qrSize, url);

  const tx = x + padX + qrSize + 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(225, 29, 47);
  doc.text(heading, tx, y + 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 68);
  const lines = doc.splitTextToSize(caption, w - (tx - x) - padX) as string[];
  lines.slice(0, 3).forEach((ln, i) => doc.text(ln, tx, y + 38 + i * 10));
  doc.setFontSize(6.5);
  doc.setTextColor(120, 120, 128);
  doc.text("Point your camera at the code", tx, y + h - 12);
  return { w, h };
}
