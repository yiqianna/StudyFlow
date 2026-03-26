import { Link } from "react-router";
import { ArrowRight, Zap, Shield, Brain } from "lucide-react";

const features = [
  {
    icon: "📚",
    title: "Smart Course Sync",
    desc: "Connect Canvas to auto-import courses and deadlines.",
    color: "#ccfbf1",
    iconBg: "#0d9488",
  },
  {
    icon: "🎯",
    title: "Daily Learning Goals",
    desc: "We build your personal plan based on what you want to achieve.",
    color: "#fef3c7",
    iconBg: "#f59e0b",
  },
  {
    icon: "🤖",
    title: "AI Study Assistant",
    desc: "Get instant explanations and practice problems anytime.",
    color: "#ede9fe",
    iconBg: "#7c3aed",
  },
];

export default function WelcomePage() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: "linear-gradient(170deg, #dce3f7 0%, #ede9f8 45%, #f5f3e6 100%)" }}>
      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center px-6 pt-14 pb-10 text-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0f766e 0%, #0d9488 55%, #14b8a6 100%)",
          borderRadius: "0 0 32px 32px",
        }}
      >
        {/* Decorative circles */}
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", filter: "blur(1px)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 top-8 h-56 w-56 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
          aria-hidden="true"
        />
        {/* App name + logo */}
        <div
          className="relative mb-4 flex h-[80px] w-[80px] items-center justify-center rounded-[24px]"
          style={{
            background: "rgba(255,255,255,0.14)",
            border: "2px solid rgba(255,255,255,0.22)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
          }}
          role="img"
          aria-label="StudyFlow logo"
        >
          <span className="text-4xl" aria-hidden="true">🎓</span>
        </div>

        <p className="text-[12px] font-bold tracking-[0.2em] text-white/50 uppercase mb-2">
          StudyFlow
        </p>

        <h1
          className="text-[28px] leading-tight tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          Step Into a<br />World of Learning
        </h1>
        <p className="mt-2.5 text-[13px] leading-relaxed text-white/70 max-w-[240px]">
          Personalized study plans designed to match your unique learning journey.
        </p>
      </div>

      {/* Feature cards */}
      <div className="px-4 py-5">
        <p className="mb-3 text-center text-[11px] font-semibold tracking-widest text-[#64748b] uppercase">
          Everything you need
        </p>

        <div className="flex flex-col gap-3">
          {features.map(({ icon, title, desc, color, iconBg }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-[20px] px-4 py-4"
              style={{
                background: "#ffffff",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                border: "1px solid #f1f5f9",
              }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] text-xl"
                style={{ background: color }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <div className="min-w-0 pt-0.5">
                <h2 className="text-[14px] font-bold text-[#0f172a]">{title}</h2>
                <p className="mt-0.5 text-[12px] leading-relaxed text-[#64748b]">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/signin"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[18px] px-6 py-4 text-[15px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
            boxShadow: "0 8px 28px rgba(13,148,136,0.35)",
          }}
        >
          Get Started Free
          <ArrowRight size={17} aria-hidden="true" />
        </Link>

        <p className="mt-3 text-center text-[12px] text-[#94a3b8]">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-bold text-[#0d9488] underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>

        {/* Trust row */}
        <div className="mt-6 flex justify-center gap-6 border-t border-[#e2e8f0] pt-5">
          <span className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
            <Shield size={12} className="text-[#0d9488]" aria-hidden="true" />
            Private &amp; secure
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
            <Zap size={12} className="text-[#f59e0b]" aria-hidden="true" />
            Free to start
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
            <Brain size={12} className="text-[#7c3aed]" aria-hidden="true" />
            AI-powered
          </span>
        </div>
      </div>
    </div>
  );
}
