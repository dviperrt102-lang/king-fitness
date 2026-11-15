import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openPortal = async () => {
    setError("");
    const isFramed = window.self !== window.top;
    const portalTab = isFramed ? window.open("", "_blank") : null;
    if (isFramed && !portalTab) {
      setError("Allow popups for this site to open subscription settings.");
      return;
    }
    if (portalTab) portalTab.opener = null;

    setLoading(true);
    try {
      const res = await base44.functions.invoke("createMacroPortalSession", {});
      const url = res.data?.url;
      if (!url) throw new Error(res.data?.error || "Subscription settings are unavailable right now.");
      if (portalTab) {
        portalTab.location.replace(url);
      } else {
        window.location.assign(url);
      }
    } catch (err) {
      portalTab?.close();
      setError(
        err?.response?.data?.error ||
          err.message ||
          "Subscription settings are unavailable right now."
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={openPortal}
        disabled={loading}
        variant="outline"
        className="font-heading uppercase tracking-widest border-white/30 text-white hover:bg-white hover:text-black rounded-none h-11 px-6"
      >
        <Settings className="w-4 h-4" />
        {loading ? "Opening…" : "Manage subscription"}
      </Button>
      {error && <p className="text-white/60 text-sm mt-2">{error}</p>}
    </div>
  );
}