import { useEffect, useRef } from "react";

/**
 * AdBanner Component
 * 
 * Pre-configured container for Google AdSense with layout-shift (CLS) protection.
 * Follows Google AdSense placement guidelines and policy-compliant labeling.
 *
 * @param {string} slotId - Google AdSense ad unit slot ID
 * @param {string} client - Google AdSense publisher ID (defaults to env or placeholder)
 * @param {string} format - 'auto' | 'horizontal' | 'rectangle'
 * @param {boolean} responsive - 'true' | 'false'
 * @param {string} className - Additional CSS classes
 */
export const AdBanner = ({
  slotId = "8127573814",
  client = import.meta.env.VITE_ADSENSE_CLIENT_ID || "ca-pub-4478220415036057",
  format = "auto",
  responsive = "true",
  className = "",
}) => {
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only attempt to push ad once per container when client ID and slot are present
    if (client && slotId && typeof window !== "undefined" && !pushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.warn("Google AdSense push error:", err);
      }
    }
  }, [client, slotId]);

  return (
    <aside
      aria-label="Advertisement"
      className={`container mx-auto px-6 my-12 relative z-10 ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Policy-compliant Ad Label */}
        <div className="flex items-center justify-between mb-1.5 px-2">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/60">
            Advertisement
          </span>
          <span className="text-[10px] text-muted-foreground/40 font-mono">
            Google Ads Space
          </span>
        </div>

        {/* Ad Container with CLS (Cumulative Layout Shift) Guard */}
        <div className="glass rounded-2xl border border-dashed border-border/60 overflow-hidden min-h-[100px] md:min-h-[120px] flex items-center justify-center bg-surface/30 backdrop-blur-sm transition-all">
          {client && slotId ? (
            <ins
              ref={adRef}
              className="adsbygoogle block w-full"
              style={{ display: "block" }}
              data-ad-client={client}
              data-ad-slot={slotId}
              data-ad-format={format}
              data-full-width-responsive={responsive}
            />
          ) : (
            /* Development & Pre-approval Placeholder */
            <div className="py-6 px-4 text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Reserved Google Ad Slot
              </div>
              <p className="text-xs text-muted-foreground max-w-md mx-auto pt-1">
                Optimized ad placement container (CLS-safe). Ready for your Google AdSense Publisher ID.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
