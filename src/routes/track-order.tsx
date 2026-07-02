import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Copy,
  Download,
  MapPin,
  Package,
  PlayCircle,
  RefreshCw,
  Search,
  Sparkles,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { OrderTracking } from "@/components/site/OrderTracking";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { inr } from "@/lib/format";
import { downloadInvoice } from "@/lib/invoice";
import { LogoMark } from "@/components/site/Logo";
import { buildTracking } from "@/lib/delivery";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track your order — PULSE" },
      {
        name: "description",
        content:
          "Look up any PULSE order with its order ID and email to see live shipment status and ETA.",
      },
      { property: "og:title", content: "Track your order — PULSE" },
    ],
  }),
  component: TrackOrderPage,
});

type Order = {
  id: string;
  total: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  status: string;
  created_at: string;
  items: { id?: string; name: string; qty: number; price?: number }[];
  shipping_address: { name?: string; pincode?: string; city?: string; state?: string } | null;
  payment_method?: string;
};

const FLOW = ["confirmed", "packed", "shipped", "out_for_delivery", "delivered"] as const;
const nextStatus = (s: string) => {
  const i = FLOW.indexOf(s as typeof FLOW[number]);
  return i >= 0 && i < FLOW.length - 1 ? FLOW[i + 1] : null;
};

function TrackOrderPage() {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const { data: myOrders } = useQuery({
    queryKey: ["my-orders-track", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,total,status,created_at,items,shipping_address,payment_method,subtotal,tax,shipping")
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data as unknown as Order[];
    },
  });

  const pickOrder = (o: Order) => {
    setOrder(o);
    setOrderId(o.id.slice(0, 8).toUpperCase());
    setError(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      const id = orderId.trim().toLowerCase();
      const em = email.trim();
      const { data, error } = await supabase.rpc("lookup_order", {
        _order_id_prefix: id,
        _email: em,
      });
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      if (!row) {
        setError(
          "We couldn't find that order. Double-check the order ID and the email used at checkout.",
        );
      } else {
        const o = row as unknown as Order;
        setOrder(o);
        toast.success("Order found", { description: `#${o.id.slice(0, 8).toUpperCase()}` });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  const simulate = async () => {
    if (!order) return;
    const next = nextStatus(order.status);
    if (!next) return;
    setSimulating(true);
    try {
      const { data, error } = await supabase.rpc("advance_order_status", {
        _order_id: order.id,
        _email: email.trim(),
        _next_status: next,
      });
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      if (!row) throw new Error("Couldn't advance status — email must match the order.");
      setOrder(row as unknown as Order);
      toast.success(`Status → ${next.replace(/_/g, " ")}`, {
        description: "Timeline updated in real time.",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't advance status");
    } finally {
      setSimulating(false);
    }
  };

  const next = order ? nextStatus(order.status) : null;

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(900px 460px at 50% 0%, oklch(0.65 0.24 25 / 0.15), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-4 pb-12 pt-20 sm:px-6 sm:pt-28">
          <div className="flex items-center gap-3">
            <LogoMark size={32} animated />
            <div className="mono text-accent">— Track</div>
          </div>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
            Where's my <span className="shimmer-text">order</span>?
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Enter your order ID and the email used at checkout. Live shipment status updates the
            moment your courier scans the package.
          </p>

          <form
            onSubmit={lookup}
            className="mt-10 grid gap-3 rounded-3xl border border-border/60 bg-card p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
          >
            <label className="block">
              <div className="mono mb-1.5 text-[10px] text-muted-foreground">Order ID</div>
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                placeholder="e.g. A1B2C3D4"
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <div className="mono mb-1.5 text-[10px] text-muted-foreground">Email</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="btn-magnetic inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground disabled:opacity-60"
            >
              <Search className="h-4 w-4" /> {loading ? "Looking…" : "Track"}
            </button>
          </form>

          {error && (
            <div className="mt-6 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Signed-in user's recent orders — one-tap tracking */}
      {user && myOrders && myOrders.length > 0 && !order && (
        <section className="mx-auto max-w-4xl px-4 pb-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="mono text-accent">— Your recent orders</div>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Tap to track instantly
              </h2>
            </div>
            <Link to="/orders" className="text-sm font-semibold text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {myOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => pickOrder(o)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
              >
                <div className="min-w-0">
                  <div className="mono text-[10px] text-muted-foreground">
                    #{o.id.slice(0, 8).toUpperCase()} ·{" "}
                    {new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold">
                    {o.items.map((i) => i.name).join(", ")}
                  </div>
                  <div className="mono mt-1 text-[10px] text-muted-foreground">
                    {o.items.reduce((a, b) => a + b.qty, 0)} item(s) · {inr(Number(o.total))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="mono rounded-full bg-accent/10 px-2 py-0.5 text-[10px] capitalize text-accent">
                    {o.status.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Track →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}


      {/* Result */}
      {order && (
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mono text-[10px] text-muted-foreground">
                  ORDER #{order.id.slice(0, 8).toUpperCase()} ·{" "}
                  {new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="mt-1 font-display text-3xl font-bold tracking-tight">
                  {inr(Number(order.total))}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {order.items.map((i) => `${i.name} × ${i.qty}`).join(" · ")}
                </div>
                {order.shipping_address?.city && (
                  <div className="mono mt-3 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {order.shipping_address.city},{" "}
                    {order.shipping_address.state} {order.shipping_address.pincode}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="mono rounded-full bg-accent/10 px-3 py-1 text-xs capitalize text-accent">
                  {order.status.replace(/_/g, " ")}
                </span>
                {next ? (
                  <button
                    onClick={simulate}
                    disabled={simulating}
                    className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
                    title={`Advance to ${next.replace(/_/g, " ")}`}
                  >
                    <PlayCircle className="h-3 w-3" />
                    {simulating ? "Advancing…" : `Simulate → ${next.replace(/_/g, " ")}`}
                  </button>
                ) : (
                  <span className="mono rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[10px] text-accent">
                    DELIVERED
                  </span>
                )}
                <button
                  onClick={() => {
                    downloadInvoice({
                      id: order.id,
                      createdAt: order.created_at,
                      total: Number(order.total),
                      subtotal: order.subtotal,
                      tax: order.tax,
                      shipping: order.shipping,
                      status: order.status,
                      paymentMethod: order.payment_method,
                      items: order.items,
                      customer: { email },
                      shippingAddress: order.shipping_address as Record<string, unknown> | null,
                    });
                    toast.success("Invoice downloaded", {
                      description: `PULSE-${order.id.slice(0, 8).toUpperCase()}.pdf`,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Download className="h-3 w-3" /> Invoice PDF
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-border/60 pt-8">
              <OrderTracking
                createdAt={order.created_at}
                status={order.status}
                pincode={order.shipping_address?.pincode}
              />
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      {!order && !error && (
        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="mono text-accent">— How tracking works</div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Four stages, zero guessing.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              [Sparkles, "Confirmed", "Payment captured, order in queue."],
              [Package, "Packed", "Picked, packed, sealed in our warehouse."],
              [Truck, "Shipped", "On the road with live courier updates."],
              [MapPin, "Delivered", "Out for delivery → at your door."],
            ].map(([Ico, t, d], i) => {
              const Icon = Ico as typeof Sparkles;
              return (
                <div
                  key={t as string}
                  className="rounded-2xl border border-border/60 bg-card p-5"
                >
                  <div className="mono text-[10px] text-muted-foreground">STAGE 0{i + 1}</div>
                  <Icon className="mt-3 h-5 w-5 text-accent" />
                  <div className="mt-3 font-display text-lg font-bold">{t as string}</div>
                  <div className="text-sm text-muted-foreground">{d as string}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-surface-2 p-5">
              <div className="text-sm font-semibold">Already signed in?</div>
              <p className="mt-1 text-sm text-muted-foreground">
                See every order on one screen — with download invoices, return shortcuts, and live tracking.
              </p>
              <Link to="/orders" className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline">
                Go to My Orders →
              </Link>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
              <div className="text-sm font-semibold">Need analytics?</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Daily, monthly, quarterly and yearly reports of your PULSE orders — exportable to PDF.
              </p>
              <Link to="/reports" className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline">
                Open Reports →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
