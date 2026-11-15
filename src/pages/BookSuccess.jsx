import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, Download, Loader2, AlertTriangle } from "lucide-react";

export default function BookSuccess() {
  const [state, setState] = useState("loading");
  const [downloadUrl, setDownloadUrl] = useState("");
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
        const res = await base44.functions.invoke("getPdfDownload", { session_id: sessionId });
        const data = res.data || {};
        if (data.status === "paid" && data.download_url) {
          setDownloadUrl(data.download_url);
          setState("paid");
        } else if (data.status === "unpaid") {
          setState("pending");
        } else {
          setState("error");
          setMessage(data.error || "We could not confirm that payment.");
        }
      } catch (err) {
        setState("error");
        setMessage(err?.response?.data?.error || "We could not confirm that payment.");
      }
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center border border-white/20 rounded-lg p-8 md:p-12 bg-white/5">
        {state === "loading" && (
          <>
            <Loader2 className="w-10 h-10 text-white mx-auto mb-6 animate-spin" />
            <h1 className="text-3xl md:text-4xl text-white mb-4">CONFIRMING YOUR ORDER</h1>
            <p className="text-white/60 leading-relaxed">
              Hold tight — we're verifying your payment with Stripe.
            </p>
          </>
        )}

        {state === "paid" && (
          <>
            <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl text-white mb-4">PAYMENT CONFIRMED</h1>
            <p className="text-white/70 leading-relaxed mb-8">
              Thank you, brother. Your 30-Day Devotional PDF is ready. The download link below stays
              active for one hour.
            </p>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="font-heading bg-white text-black h-12 px-8 text-xl uppercase tracking-widest font-bold hover:bg-white/90"
              >
                <Download className="w-5 h-5 mr-2" />
                Download the PDF
              </Button>
            </a>
            <p className="font-heading text-xs uppercase tracking-widest text-white/40 mt-4">
              Keep this file — it's yours to read again and again.
            </p>
          </>
        )}

        {state === "pending" && (
          <>
            <AlertTriangle className="w-10 h-10 text-white mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl text-white mb-4">PAYMENT NOT CONFIRMED YET</h1>
            <p className="text-white/60 leading-relaxed">
              Stripe hasn't confirmed this payment yet. If you were just charged, refresh this page
              in a moment — otherwise return to the book page and try again.
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
            to="/Book"
            className="font-heading text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            Back to the Book
          </Link>
        </div>
      </div>
    </div>
  );
}