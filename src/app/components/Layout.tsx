import { Outlet, NavLink, useLocation } from "react-router";
import { Home, CalendarDays, BarChart2, User, Sparkles } from "lucide-react";
import { useIsFramed } from "../context/FrameContext";
import { useEffect, useRef, useMemo } from "react";

const navItems = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/schedule", icon: CalendarDays, label: "Schedule" },
  { to: "/assistant", icon: Sparkles, label: "AI" },
  { to: "/progress", icon: BarChart2, label: "Progress" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function Layout() {
  const isFramed = useIsFramed();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isEmbedded = useMemo(
    () =>
      new URLSearchParams(window.location.search).get("embed") === "1" ||
      window.self !== window.top,
    []
  );

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  // Measure main's content-box height and expose as --page-height CSS variable.
  // AssistantPage uses this to get a definite height so flex-1 works for the chat layout.
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const update = () => {
      const style = window.getComputedStyle(el);
      const pt = parseFloat(style.paddingTop) || 0;
      const pb = parseFloat(style.paddingBottom) || 0;
      el.style.setProperty("--page-height", `${el.clientHeight - pt - pb}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="relative h-full flex flex-col"
      style={{ background: "transparent", overflow: "hidden" }}
    >
      <main
        id="main-content"
        ref={mainRef}
        className="overflow-y-auto"
        style={{
          flex: 1,
          minHeight: 0,
          paddingTop: isFramed ? "52px" : "0px",
          paddingBottom: isFramed
            ? "88px"
            : isEmbedded
            ? "88px"
            : "calc(80px + env(safe-area-inset-bottom, 0px))",
        }}
        tabIndex={-1}
      >
        <div style={{
          minHeight: "100%",
          background: "linear-gradient(170deg, #dce3f7 0%, #ede9f8 45%, #f5f3e6 100%)",
        }}>
          <Outlet />
        </div>
      </main>

      {/* Bottom navigation */}
      <nav
        aria-label="Main navigation"
        className="absolute bottom-0 left-0 right-0 z-40 px-4 pt-2"
        style={{
          paddingBottom: isFramed
            ? "12px"
            : "max(12px, env(safe-area-inset-bottom, 12px))",
          background: "transparent",
        }}
      >
        <div
          className="flex rounded-[26px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 -1px 0 rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid rgba(255,255,255,0.9)",
          }}
        >
          <ul className="flex w-full h-[60px]" role="list">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to} className="flex flex-1">
                <NavLink
                  to={to}
                  end
                  aria-label={label}
                  className="flex flex-1 flex-col items-center justify-center gap-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0d9488]"
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className="flex items-center justify-center rounded-[14px] transition-all duration-200"
                        style={{
                          background: isActive ? "#0d9488" : "transparent",
                          padding: isActive ? "6px 14px" : "6px 10px",
                        }}
                      >
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.5 : 1.8}
                          style={{ color: isActive ? "#ffffff" : "#94a3b8" }}
                          aria-hidden="true"
                        />
                      </div>
                      <span
                        className="text-[9px] tracking-wide uppercase transition-colors"
                        style={{
                          color: isActive ? "#0d9488" : "#94a3b8",
                          fontWeight: isActive ? 700 : 500,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
