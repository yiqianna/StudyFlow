import React, { useState, useEffect } from "react";
import { FrameContext } from "../context/FrameContext";

interface PhoneFrameProps {
  children: React.ReactNode;
}

/** Breakpoint below which we switch to full-screen native mode */
const MOBILE_BP = 768;

function StatusBar() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    };
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const c = "#ffffff";

  return (
    <div
      className="absolute top-0 left-0 right-0 z-50 select-none pointer-events-none"
      style={{ height: 52 }}
    >
      {/* mix-blend-mode: difference — white over light bg becomes dark, white over dark bg stays white */}
      <div
        className="absolute inset-0 flex items-center justify-between"
        style={{
          paddingLeft: 26,
          paddingRight: 22,
          paddingTop: 14,
          mixBlendMode: "difference",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, color: c, letterSpacing: "-0.3px", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
          {time}
        </span>
        <div className="flex items-center gap-[6px]">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="8" width="3" height="4" rx="0.8" fill={c} />
            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" fill={c} />
            <rect x="9" y="3" width="3" height="9" rx="0.8" fill={c} />
            <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill={c} />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill={c} />
            <path d="M3.5 6.5C4.8 5.2 6.3 4.5 8 4.5s3.2.7 4.5 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M1 3.5C3 1.5 5.4.5 8 .5s5 1 7 3" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
          <div className="flex items-center gap-[2px]">
            <div style={{ width: 25, height: 12, borderRadius: 3.5, border: `1.5px solid ${c}`, padding: "1.5px", display: "flex" }}>
              <div style={{ width: "78%", height: "100%", background: c, borderRadius: 2 }} />
            </div>
            <div style={{ width: 2, height: 5, background: c, borderRadius: 1, opacity: 0.55 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const PHONE_W = 393;
  const PHONE_H = 852;

  const isEmbedded =
    typeof window !== "undefined" &&
    (new URLSearchParams(window.location.search).get("embed") === "1" ||
      window.self !== window.top);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BP : false
  );
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < MOBILE_BP;
      setIsMobile(mobile);
      if (!mobile) {
        const availH = window.innerHeight - 48;
        const availW = window.innerWidth - 48;
        const s = Math.min(1, availH / PHONE_H, availW / (PHONE_W + 32));
        setScale(parseFloat(s.toFixed(4)));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Mobile: full-screen native mode ───────────────────────────────── */
  if (isMobile) {
    if (isEmbedded) {
      // Portfolio embed: flex column so StatusBar takes real space (52px),
      // remaining height goes to children — gives Layout a precise pixel height.
      return (
        <FrameContext.Provider value={false}>
          <div
            style={{
              width: "100%",
              // In portfolio iframe embeds, 100dvh can resolve shorter than expected.
              // Use 100% so the app always fills the iframe's explicit height.
              height: "100%",
              overflow: "hidden",
              background: "linear-gradient(170deg, #dce3f7 0%, #ede9f8 45%, #f5f3e6 100%)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Placeholder that physically occupies the status bar height */}
            <div style={{ height: 52, flexShrink: 0 }} aria-hidden="true" />
            {/* StatusBar overlays the placeholder */}
            <StatusBar />
            {/* Children (Layout) get the remaining exact height */}
            <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
              {children}
            </div>
          </div>
        </FrameContext.Provider>
      );
    }

    // Real mobile device: full-screen with safe area insets
    return (
      <FrameContext.Provider value={false}>
        <div
          style={{
            width: "100%",
            height: "100dvh",
            overflow: "hidden",
            background: "linear-gradient(170deg, #dce3f7 0%, #ede9f8 45%, #f5f3e6 100%)",
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingLeft: "env(safe-area-inset-left, 0px)",
            paddingRight: "env(safe-area-inset-right, 0px)",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </FrameContext.Provider>
    );
  }

  /* ── Desktop: phone-frame mockup ────────────────────────────────────── */
  return (
    <FrameContext.Provider value={true}>
      <div
        className="w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(170deg, #dce3f7 0%, #ede9f8 45%, #f5f3e6 100%)" }}
      >
        {/* Phone wrapper */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            width: PHONE_W,
            height: PHONE_H,
            flexShrink: 0,
            position: "relative",
          }}
        >
          {/* Side buttons */}
          <div aria-hidden="true" style={{ position: "absolute", left: -3, top: 112, width: 3, height: 32, borderRadius: "3px 0 0 3px", background: "#b2b0aa", boxShadow: "-1px 0 2px rgba(0,0,0,0.15)" }} />
          <div aria-hidden="true" style={{ position: "absolute", left: -3, top: 166, width: 3, height: 60, borderRadius: "3px 0 0 3px", background: "#b2b0aa", boxShadow: "-1px 0 2px rgba(0,0,0,0.15)" }} />
          <div aria-hidden="true" style={{ position: "absolute", left: -3, top: 238, width: 3, height: 60, borderRadius: "3px 0 0 3px", background: "#b2b0aa", boxShadow: "-1px 0 2px rgba(0,0,0,0.15)" }} />
          <div aria-hidden="true" style={{ position: "absolute", right: -3, top: 182, width: 3, height: 80, borderRadius: "0 3px 3px 0", background: "#b2b0aa", boxShadow: "1px 0 2px rgba(0,0,0,0.15)" }} />

          {/* Phone body */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              borderRadius: 55,
              background: "linear-gradient(145deg, #d0cec8 0%, #bfbdb8 50%, #aeaca6 100%)",
              boxShadow: [
                "0 0 0 1px rgba(255,255,255,0.4)",
                "0 0 0 2px rgba(0,0,0,0.10)",
                "0 28px 70px rgba(0,0,0,0.20)",
                "0 8px 20px rgba(0,0,0,0.12)",
                "inset 0 1px 2px rgba(255,255,255,0.55)",
              ].join(", "),
            }}
          />

          {/* Screen */}
          <div
            style={{
              position: "absolute",
              top: 6, left: 6, right: 6, bottom: 6,
              borderRadius: 50,
              overflow: "hidden",
              background: "linear-gradient(170deg, #dce3f7 0%, #ede9f8 45%, #f5f3e6 100%)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                {children}
              </div>
              <StatusBar />
              {/* Dynamic Island */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute", top: 10, left: "50%",
                  transform: "translateX(-50%)",
                  width: 120, height: 34,
                  borderRadius: 18,
                  background: "#000",
                  zIndex: 60,
                }}
              />
              {/* Home indicator */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute", bottom: 8,
                  left: "50%", transform: "translateX(-50%)",
                  width: 134, height: 5,
                  borderRadius: 3,
                  background: "rgba(0,0,0,0.18)",
                  zIndex: 60,
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Glass glare */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 6, left: 6, right: 6,
              height: "28%",
              borderRadius: "50px 50px 80% 80%",
              background: "linear-gradient(170deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 80,
            }}
          />
        </div>
      </div>
    </FrameContext.Provider>
  );
}
