import { jsPDF } from "jspdf";
import { getProduct } from "@/data/products";

export type ReportOrder = {
  id: string;
  total: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  status: string;
  created_at: string;
  items: { id?: string; name: string; qty: number; price?: number }[];
};

export type ReportReturn = {
  id: string;
  status: string;
  reason: string;
  created_at: string;
  items?: unknown;
};

export type Granularity = "day" | "week" | "month" | "quarter" | "year";

export type ReportSummary = {
  label: string;
  rangeLabel: string;
  from: Date;
  to: Date;
  totalRevenue: number;
  totalOrders: number;
  totalUnits: number;
  avgOrder: number;
  returnCount: number;
  returnRate: number;
  refundEstimate: number;
  series: { label: string; revenue: number; orders: number }[];
  byCategory: { name: string; revenue: number; units: number }[];
  topProducts: { name: string; units: number; revenue: number }[];
  returnReasons: { reason: string; count: number }[];
};

const inr = (n: number) => "Rs. " + Math.round(n).toLocaleString("en-IN");
const inrK = (n: number) => {
  if (n >= 10000000) return "Rs. " + (n / 10000000).toFixed(1) + "Cr";
  if (n >= 100000) return "Rs. " + (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return "Rs. " + (n / 1000).toFixed(1) + "k";
  return "Rs. " + Math.round(n);
};

const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const inRange = (iso: string, from: Date, to: Date) => {
  const t = new Date(iso).getTime();
  return t >= from.getTime() && t <= to.getTime();
};

export function buildSummary(
  orders: ReportOrder[],
  returns: ReportReturn[],
  from: Date,
  to: Date,
  granularity: Granularity,
  label: string,
): ReportSummary {
  const inWindow = orders.filter((o) => inRange(o.created_at, from, to));
  const retWindow = returns.filter((r) => inRange(r.created_at, from, to));

  const totalRevenue = inWindow.reduce((s, o) => s + Number(o.total || 0), 0);
  const totalOrders = inWindow.length;
  const totalUnits = inWindow.reduce(
    (s, o) => s + o.items.reduce((a, b) => a + b.qty, 0),
    0,
  );
  const avgOrder = totalOrders ? totalRevenue / totalOrders : 0;
  const returnCount = retWindow.length;
  const returnRate = totalOrders ? (returnCount / totalOrders) * 100 : 0;
  const refundEstimate = totalOrders
    ? (totalRevenue / totalOrders) * returnCount
    : 0;

  const buckets = new Map<string, { revenue: number; orders: number; sort: number }>();
  const keyOf = (d: Date) => {
    if (granularity === "day") return d.toISOString().slice(0, 10);
    if (granularity === "week") {
      const monday = new Date(d);
      const day = (monday.getDay() + 6) % 7;
      monday.setDate(monday.getDate() - day);
      return monday.toISOString().slice(0, 10);
    }
    if (granularity === "month")
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (granularity === "quarter")
      return `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`;
    return String(d.getFullYear());
  };
  const labelOf = (key: string) => {
    if (granularity === "day")
      return new Date(key).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    if (granularity === "week")
      return "Wk " + new Date(key).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    if (granularity === "month") {
      const [y, m] = key.split("-").map(Number);
      return new Date(y, m - 1, 1).toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
    }
    return key;
  };
  const sortOf = (key: string) => {
    if (granularity === "quarter") {
      const [y, q] = key.split("-Q").map(Number);
      return y * 10 + q;
    }
    if (granularity === "year") return Number(key);
    return new Date(key).getTime();
  };

  inWindow.forEach((o) => {
    const k = keyOf(new Date(o.created_at));
    const cur = buckets.get(k) ?? { revenue: 0, orders: 0, sort: sortOf(k) };
    cur.revenue += Number(o.total);
    cur.orders += 1;
    buckets.set(k, cur);
  });

  const series = Array.from(buckets.entries())
    .sort(([, a], [, b]) => a.sort - b.sort)
    .map(([k, v]) => ({ label: labelOf(k), revenue: v.revenue, orders: v.orders }));

  const catMap = new Map<string, { revenue: number; units: number }>();
  const prodMap = new Map<string, { units: number; revenue: number }>();
  inWindow.forEach((o) => {
    o.items.forEach((it) => {
      const p = it.id ? getProduct(it.id) : null;
      const cat = p?.category ? p.category : "other";
      const rev = (it.price ?? 0) * it.qty;
      const c = catMap.get(cat) ?? { revenue: 0, units: 0 };
      c.revenue += rev;
      c.units += it.qty;
      catMap.set(cat, c);
      const pr = prodMap.get(it.name) ?? { units: 0, revenue: 0 };
      pr.units += it.qty;
      pr.revenue += rev;
      prodMap.set(it.name, pr);
    });
  });

  const byCategory = Array.from(catMap.entries())
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.revenue - a.revenue);

  const topProducts = Array.from(prodMap.entries())
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.units - a.units)
    .slice(0, 8);

  const reasonMap = new Map<string, number>();
  retWindow.forEach((r) => {
    reasonMap.set(r.reason, (reasonMap.get(r.reason) ?? 0) + 1);
  });
  const returnReasons = Array.from(reasonMap.entries())
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count);

  return {
    label,
    rangeLabel: `${fmt(from)} — ${fmt(to)}`,
    from,
    to,
    totalRevenue,
    totalOrders,
    totalUnits,
    avgOrder,
    returnCount,
    returnRate,
    refundEstimate,
    series,
    byCategory,
    topProducts,
    returnReasons,
  };
}

// ─────────────────────────────────────────────────────────────
// PDF
// ─────────────────────────────────────────────────────────────
const ink: [number, number, number] = [12, 12, 14];
const sub: [number, number, number] = [88, 88, 96];
const muted: [number, number, number] = [140, 140, 148];
const hair: [number, number, number] = [230, 230, 234];
const accent: [number, number, number] = [225, 29, 47];
const tint: [number, number, number] = [250, 250, 252];
const soft: [number, number, number] = [246, 246, 248];
const good: [number, number, number] = [22, 133, 87];

const catPalette: [number, number, number][] = [
  [225, 29, 47],
  [17, 17, 19],
  [22, 133, 87],
  [201, 128, 26],
  [45, 96, 179],
  [126, 34, 206],
];

export function downloadReportPDF(s: ReportSummary, customerName?: string) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 44;

  // ── MASTHEAD (editorial, light) ──────────────────────────
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
  doc.text("ANALYTICS", M + 32, 34);

  // Right — doc type
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...ink);
  doc.text("Report", W - M, 40, { align: "right" });

  doc.setDrawColor(...hair);
  doc.setLineWidth(0.5);
  doc.line(M, 54, W - M, 54);

  // Report title block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...accent);
  doc.text(s.label.toUpperCase() + "  ·  PERFORMANCE OVERVIEW", M, 78);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...ink);
  doc.text(s.rangeLabel, M, 106);

  // Right meta strip
  const metaTop = 74;
  const metaGap = 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(...muted);
  doc.text("GENERATED", W - M, metaTop, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  doc.text(fmt(new Date()), W - M, metaTop + metaGap, { align: "right" });
  if (customerName) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...muted);
    doc.text("ACCOUNT", W - M, metaTop + 34, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...ink);
    doc.text(customerName, W - M, metaTop + 50, { align: "right" });
  }


  // ── EXECUTIVE SUMMARY ────────────────────────────────────
  let y = 154;
  const halfIdx = Math.max(1, Math.floor(s.series.length / 2));
  const firstHalf = s.series.slice(0, halfIdx).reduce((a, b) => a + b.revenue, 0);
  const secondHalf = s.series.slice(halfIdx).reduce((a, b) => a + b.revenue, 0);
  const delta = firstHalf ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;
  const trending = delta >= 0;

  doc.setFillColor(...soft);
  doc.roundedRect(M, y, W - 2 * M, 54, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text("EXECUTIVE SUMMARY", M + 16, y + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  const bestCat = s.byCategory[0]?.name ?? "—";
  const bestProd = s.topProducts[0]?.name ?? "—";
  const summaryLine =
    s.totalOrders === 0
      ? "No sales recorded in this period. Try widening the range or promoting fresh drops."
      : `Recorded ${s.totalOrders} orders totalling ${inr(s.totalRevenue)} across ${s.totalUnits} units. ` +
        `Leading category: ${bestCat.toUpperCase()}. Bestseller: ${bestProd}. ` +
        `Momentum ${trending ? "up" : "down"} ${Math.abs(delta).toFixed(1)}% vs. earlier half.`;
  doc.splitTextToSize(summaryLine, W - 2 * M - 32).forEach((l: string, i: number) =>
    doc.text(l, M + 16, y + 34 + i * 12),
  );

  // ── KPI CARDS ────────────────────────────────────────────
  y += 68;
  const cardW = (W - 2 * M - 24) / 4;
  const cards: { k: string; v: string; sub: string; tone?: [number, number, number] }[] = [
    { k: "REVENUE", v: inr(s.totalRevenue), sub: `${s.totalOrders} orders`, tone: accent },
    { k: "AVG ORDER", v: inr(s.avgOrder), sub: `${s.totalUnits} units sold` },
    { k: "RETURNS", v: String(s.returnCount), sub: `${s.returnRate.toFixed(1)}% rate` },
    { k: "REFUND EST.", v: inr(s.refundEstimate), sub: `${s.returnCount} returns` },
  ];
  cards.forEach((c, i) => {
    const x = M + i * (cardW + 8);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...hair);
    doc.roundedRect(x, y, cardW, 84, 4, 4, "FD");
    if (c.tone) {
      doc.setFillColor(...c.tone);
      doc.rect(x, y, 3, 84, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text(c.k, x + 14, y + 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...ink);
    doc.text(c.v, x + 14, y + 48);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...sub);
    doc.text(c.sub, x + 14, y + 68);
  });

  // ── TREND CHART (line + area) ────────────────────────────
  y += 104;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...ink);
  doc.text("Revenue Trend", M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...muted);
  doc.text(`${s.series.length} periods  ·  ${trending ? "▲" : "▼"} ${Math.abs(delta).toFixed(1)}%`, W - M, y, {
    align: "right",
  });

  y += 12;
  const chartH = 150;
  const chartW = W - 2 * M;
  const padL = 44;
  const padR = 12;
  const padT = 16;
  const padB = 24;
  const plotX = M + padL;
  const plotY = y + padT;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  doc.setFillColor(...tint);
  doc.roundedRect(M, y, chartW, chartH, 4, 4, "F");

  if (s.series.length > 0) {
    const maxRev = Math.max(...s.series.map((d) => d.revenue), 1);
    // Grid + Y labels (4 lines)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    for (let i = 0; i <= 4; i++) {
      const gy = plotY + plotH - (plotH * i) / 4;
      doc.setDrawColor(230, 230, 234);
      doc.setLineWidth(0.4);
      doc.line(plotX, gy, plotX + plotW, gy);
      doc.text(inrK((maxRev * i) / 4), plotX - 6, gy + 3, { align: "right" });
    }

    const n = s.series.length;
    const step = n > 1 ? plotW / (n - 1) : 0;
    const pts = s.series.map((d, i) => ({
      x: n === 1 ? plotX + plotW / 2 : plotX + i * step,
      yv: plotY + plotH - (d.revenue / maxRev) * plotH,
      d,
    }));

    // Area fill
    if (n > 1) {
      doc.setFillColor(...accent);
      doc.setGState(new (doc as unknown as { GState: new (o: object) => object }).GState({ opacity: 0.12 }));
      const path: [number, number][] = [
        [pts[0].x, plotY + plotH],
        ...pts.map((p): [number, number] => [p.x, p.yv]),
        [pts[n - 1].x, plotY + plotH],
      ];
      doc.lines(
        path.slice(1).map(([px, py], i) => [px - path[i][0], py - path[i][1]]),
        path[0][0],
        path[0][1],
        [1, 1],
        "F",
        true,
      );
      doc.setGState(new (doc as unknown as { GState: new (o: object) => object }).GState({ opacity: 1 }));
    }

    // Line
    doc.setDrawColor(...accent);
    doc.setLineWidth(1.6);
    for (let i = 0; i < pts.length - 1; i++) {
      doc.line(pts[i].x, pts[i].yv, pts[i + 1].x, pts[i + 1].yv);
    }

    // Dots + X labels
    const labelStride = Math.max(1, Math.ceil(n / 10));
    pts.forEach((p, i) => {
      doc.setFillColor(...accent);
      doc.circle(p.x, p.yv, 2.4, "F");
      doc.setFillColor(255, 255, 255);
      doc.circle(p.x, p.yv, 1.2, "F");
      if (i % labelStride === 0 || i === n - 1) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...muted);
        doc.text(p.d.label, p.x, plotY + plotH + 12, { align: "center" });
      }
    });
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text("No orders in this period.", W / 2, y + chartH / 2, { align: "center" });
  }

  // ── CATEGORY SPLIT (donut-style + table) ─────────────────
  y += chartH + 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...ink);
  doc.text("Category Mix", M, y);
  y += 10;

  const catBoxH = 150;
  const donutCx = M + 78;
  const donutCy = y + catBoxH / 2;
  const donutR = 54;

  doc.setFillColor(...tint);
  doc.roundedRect(M, y, chartW, catBoxH, 4, 4, "F");

  const cats = s.byCategory.slice(0, 6);
  const catTotal = cats.reduce((a, b) => a + b.revenue, 0) || 1;

  if (cats.length > 0) {
    // Draw donut as segmented wedges via triangle fan
    let a0 = -Math.PI / 2;
    cats.forEach((c, i) => {
      const frac = c.revenue / catTotal;
      const a1 = a0 + frac * Math.PI * 2;
      const color = catPalette[i % catPalette.length];
      doc.setFillColor(...color);
      // Fan of triangles
      const steps = Math.max(6, Math.ceil(frac * 60));
      for (let k = 0; k < steps; k++) {
        const t0 = a0 + ((a1 - a0) * k) / steps;
        const t1 = a0 + ((a1 - a0) * (k + 1)) / steps;
        doc.triangle(
          donutCx,
          donutCy,
          donutCx + Math.cos(t0) * donutR,
          donutCy + Math.sin(t0) * donutR,
          donutCx + Math.cos(t1) * donutR,
          donutCy + Math.sin(t1) * donutR,
          "F",
        );
      }
      a0 = a1;
    });
    // Inner hole
    doc.setFillColor(...tint);
    doc.circle(donutCx, donutCy, donutR * 0.55, "F");
    // Center label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...ink);
    doc.text(String(cats.length), donutCx, donutCy - 2, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text("categories", donutCx, donutCy + 10, { align: "center" });

    // Legend / list
    const listX = donutCx + donutR + 40;
    const listW = W - M - listX - 12;
    cats.forEach((c, i) => {
      const ly = y + 20 + i * 20;
      const color = catPalette[i % catPalette.length];
      doc.setFillColor(...color);
      doc.rect(listX, ly - 8, 8, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...ink);
      doc.text(c.name.toUpperCase(), listX + 14, ly);
      const pct = ((c.revenue / catTotal) * 100).toFixed(1) + "%";
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...muted);
      doc.text(`${c.units} units`, listX + 14, ly + 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...ink);
      doc.text(inr(c.revenue), listX + listW, ly, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...accent);
      doc.text(pct, listX + listW, ly + 10, { align: "right" });
    });
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text("No category data.", W / 2, y + catBoxH / 2, { align: "center" });
  }

  y += catBoxH + 24;

  // Page 2 if needed
  const ensure = (needed: number) => {
    if (y + needed > H - 60) {
      doc.addPage();
      y = M + 20;
    }
  };

  // ── TOP PRODUCTS ─────────────────────────────────────────
  ensure(220);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...ink);
  doc.text("Top Products", M, y);
  y += 12;
  doc.setFillColor(...ink);
  doc.roundedRect(M, y, chartW, 22, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("#  PRODUCT", M + 12, y + 14);
  doc.text("UNITS", M + chartW - 200, y + 14, { align: "right" });
  doc.text("SHARE", M + chartW - 90, y + 14, { align: "right" });
  doc.text("REVENUE", M + chartW - 12, y + 14, { align: "right" });
  y += 30;

  if (s.topProducts.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text("No products sold.", M + 12, y);
    y += 20;
  } else {
    const maxProdUnits = Math.max(...s.topProducts.map((p) => p.units), 1);
    s.topProducts.forEach((p, i) => {
      ensure(24);
      if (i % 2 === 1) {
        doc.setFillColor(...tint);
        doc.rect(M, y - 12, chartW, 22, "F");
      }
      const barMaxW = 90;
      const barW = (p.units / maxProdUnits) * barMaxW;
      doc.setFillColor(...accent);
      doc.rect(M + chartW - 300, y - 6, Math.max(1, barW), 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...accent);
      doc.text("#" + String(i + 1).padStart(2, "0"), M + 12, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...ink);
      doc.text(doc.splitTextToSize(p.name, 220)[0], M + 42, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(String(p.units), M + chartW - 200, y, { align: "right" });
      doc.setTextColor(...muted);
      doc.text(((p.revenue / (s.totalRevenue || 1)) * 100).toFixed(1) + "%", M + chartW - 90, y, {
        align: "right",
      });
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...ink);
      doc.text(inr(p.revenue), M + chartW - 12, y, { align: "right" });
      y += 22;
    });
  }

  // ── RETURNS ──────────────────────────────────────────────
  y += 16;
  ensure(140);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...ink);
  doc.text("Returns Analysis", M, y);
  y += 12;
  doc.setFillColor(...ink);
  doc.roundedRect(M, y, chartW, 22, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("REASON", M + 12, y + 14);
  doc.text("COUNT", M + chartW - 90, y + 14, { align: "right" });
  doc.text("SHARE", M + chartW - 12, y + 14, { align: "right" });
  y += 30;

  if (s.returnReasons.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...good);
    doc.text("No returns in this period — great job!", M + 12, y);
    y += 20;
  } else {
    const maxCount = Math.max(...s.returnReasons.map((r) => r.count), 1);
    const total = s.returnReasons.reduce((a, b) => a + b.count, 0) || 1;
    s.returnReasons.forEach((r, i) => {
      ensure(24);
      if (i % 2 === 1) {
        doc.setFillColor(...tint);
        doc.rect(M, y - 12, chartW, 22, "F");
      }
      const barMaxW = chartW - 280;
      const barW = (r.count / maxCount) * barMaxW;
      doc.setFillColor(...accent);
      doc.rect(M + 160, y - 6, Math.max(1, barW), 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...ink);
      doc.text(r.reason, M + 12, y);
      doc.setFont("helvetica", "bold");
      doc.text(String(r.count), M + chartW - 90, y, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...muted);
      doc.text(((r.count / total) * 100).toFixed(1) + "%", M + chartW - 12, y, { align: "right" });
      y += 22;
    });
  }

  // ── FOOTERS (editorial) ──────────────────────────────────
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setDrawColor(...hair);
    doc.setLineWidth(0.5);
    doc.line(M, H - 44, W - M, H - 44);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text(`PULSE Analytics  ·  Generated ${fmt(new Date())}  ·  www.pulse.audio`, M, H - 28);
    doc.text(`Page ${p} of ${total}`, W - M, H - 28, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...muted);
    doc.text(`${s.label.toUpperCase()}  ·  ${s.rangeLabel}`, W - M, H - 16, { align: "right" });
  }

  doc.save(`PULSE-Report-${s.label.replace(/\s+/g, "-")}-${s.from.toISOString().slice(0, 10)}.pdf`);
}
