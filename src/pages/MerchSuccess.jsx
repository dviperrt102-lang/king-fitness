import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, Loader2, AlertTriangle, Package } from "lucide-react";

export default function MerchSuccess() {
  const [state, setState] = useState("loading");
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setState("error");
      setMessage("We couldn't find a checkout for this page.");
      return;
    }
    (async () => {
      try {
        const res = await base44.functions.invoke("getMerchOrder", { session_id: sessionId });
        const data = res.data || {};
        if (data.product_name) {
          setOrder(data);
          setState("confirmed");
        } else {
          setState("error");
          setMessage(data.error || "We couldn't find that order.");
        }
      } catch (err) {
        setState("error");
        setMessage(err?.response?.data?.error || "We couldn't find that order.");
      }
    })();
  }, []);

  const total = order ? (order.amount_total || 0) / 100 : 0;

  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center border border-white/20 rounded-lg p-8 md:p-12 bg-white/5">
        {state === "loading" && (
          <>
            <Loader2 className="w-10 h-10 text-white mx-auto mb-6 animate-spin" />
            <h1 className="text-3xl md:text-4xl text-white mb-4">CONFIRMING YOUR ORDER</h1>
            <p className="text-white/60 leading-relaxed">Hold tight — we're pulling up your order.</p>
          </>
        )}

        {state === "confirmed" && order && (
          <>
            <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl text-white mb-4">ORDER CONFIRMED</h1>
            <p className="text-white/70 leading-relaxed mb-8">
              Thank you, brother. Your order is in and will be printed and shipped by Printful.
              {order.email ? ` A receipt is on its way to ${order.email}.` : ""}
            </p>

            <div className="border border-white/20 rounded-lg p-6 text-left space-y-3">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-white mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading text-sm uppercase tracking-widest text-white/50 mb-1">
                    Item
                  </p>
                  <p className="text-white leading-relaxed">{order.product_name}</p>
                  <p className="text-white/60 text-sm mt-1">
                    {[order.color, order.size].filter(Boolean).join(" / ") || "One size"}
                  </p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <span className="font-heading text-sm uppercase tracking-widest text-white/50">
                  Total paid
                </span>
                <span className="font-display text-2xl text-white">${total.toFixed(2)}</span>
              </div>
              {order.printful_order_id && (
                <p className="font-heading text-xs uppercase tracking-widest text-white/40">
                  Fulfillment #{order.printful_order_id}
                </p>
              )}
            </div>

            <p className="font-heading text-xs uppercase tracking-widest text-white/40 mt-6">
              Printed on demand — please allow a few business days for production plus shipping.
            </p>
          </>
        )}

        {state === "error" && (
          <>
            <AlertTriangle className="w-10 h-10 text-white mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl text-white mb-4">SOMETHING WENT WRONG</h1>
            <p className="text-white/60 leading-relaxed">{message}</p>
          </>
        )}

        <div className="mt-10">
          <Link
            to="/Merch"
            className="font-heading text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            Back to Merch
          </Link>
        </div>
      </div>
    </div>
  );
}