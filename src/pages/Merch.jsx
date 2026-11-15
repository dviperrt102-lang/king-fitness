import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { MERCH_PRODUCTS } from "@/components/merch/products";
import MerchProductCard from "@/components/merch/MerchProductCard";
import ShippingDialog from "@/components/merch/ShippingDialog";
import { Truck } from "lucide-react";

export default function Merch() {
  const [selection, setSelection] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = (product, choice) => {
    setSelection({ product, color: choice.color, size: choice.size });
    setError("");
    setDialogOpen(true);
  };

  const handleCheckout = async (recipient) => {
    if (!selection) return;
    setError("");

    const isFramed = window.self !== window.top;
    // Open the tab synchronously inside the submit so popup blockers keep the user activation.
    const checkoutTab = isFramed ? window.open("", "_blank") : null;
    if (isFramed && !checkoutTab) {
      setError("Allow popups for this site to continue to checkout.");
      return;
    }
    if (checkoutTab) checkoutTab.opener = null;

    setSubmitting(true);
    try {
      const res = await base44.functions.invoke("createMerchCheckout", {
        product_key: selection.product.key,
        color: selection.color,
        size: selection.size,
        quantity: 1,
        recipient,
      });
      const url = res.data?.url;
      if (!url) throw new Error(res.data?.error || "Checkout is unavailable right now.");
      if (checkoutTab) {
        checkoutTab.location.replace(url);
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      checkoutTab?.close();
      setError(
        err?.response?.data?.error || err.message || "Checkout is unavailable right now."
      );
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-sm uppercase tracking-[0.4em] text-white/50 mb-4">
            King Fitness
          </p>
          <h1 className="text-5xl md:text-8xl text-white mb-4">MERCH</h1>
          <p className="font-heading text-xl md:text-3xl uppercase tracking-widest text-white/70">
            Wear the mission. Made to order and shipped to your door.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MERCH_PRODUCTS.map((product) => (
              <MerchProductCard key={product.key} product={product} onBuy={handleBuy} />
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto flex items-start gap-3 border border-white/20 rounded-lg bg-white/5 p-5">
            <Truck className="w-5 h-5 text-white mt-0.5 shrink-0" />
            <p className="text-white/60 leading-relaxed">
              Printed on demand and shipped to your door. Please allow a few business days for
              production plus shipping.
            </p>
          </div>
        </div>
      </section>

      <ShippingDialog
        open={dialogOpen}
        onOpenChange={(next) => {
          if (!submitting) setDialogOpen(next);
        }}
        selection={selection}
        submitting={submitting}
        error={error}
        onSubmit={handleCheckout}
      />
    </div>
  );
}