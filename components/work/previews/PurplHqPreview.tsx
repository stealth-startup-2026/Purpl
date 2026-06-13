import base from "./preview-base.module.css";

/**
 * Preview tile for purpl hq (in-house, coming soon).
 * Minimal dark wordmark in the desktop-app family aesthetic (off-white "purpl h",
 * purple "q"). Swap in a real storefront screenshot once hq.purpl.solutions ships.
 */
export function PurplHqPreview() {
  return (
    <div className={base.tile} aria-hidden="true" style={{ background: "#0f0e0e" }}>
      <span
        className="absolute inset-0 z-0 flex items-center justify-center font-light tracking-[-0.04em]"
        style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif" }}
      >
        <span className="text-[clamp(26px,7vw,54px)]">
          <span style={{ color: "#f0ede8" }}>purpl h</span>
          <span style={{ color: "#7c4dff" }}>q</span>
        </span>
      </span>
    </div>
  );
}
