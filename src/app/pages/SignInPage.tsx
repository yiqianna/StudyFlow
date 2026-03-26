import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Key, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="flex h-full flex-col" style={{ background: "linear-gradient(170deg, #dce3f7 0%, #ede9f8 45%, #f5f3e6 100%)" }}>
      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center px-6 pb-14 pt-14 text-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0f766e 0%, #0d9488 55%, #14b8a6 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 top-20 h-48 w-48 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
          aria-hidden="true"
        />

        <div
          className="relative mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-[28px]"
          style={{
            background: "rgba(255,255,255,0.14)",
            border: "2px solid rgba(255,255,255,0.22)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
          }}
          role="img"
          aria-label="StudyFlow logo"
        >
          <span className="text-4xl" aria-hidden="true">🎓</span>
        </div>
        <h1
          className="text-[28px] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          Welcome back
        </h1>
        <p className="mt-2 text-[13px] text-white/65 leading-relaxed">
          Sign in to continue your learning journey
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <form onSubmit={handleSubmit} noValidate aria-label="Sign in form">
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[11px] font-bold tracking-widest text-[#64748b] uppercase"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full rounded-[14px] px-4 py-3.5 text-[14px] text-[#0f172a] placeholder-[#cbd5e1] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]/50"
                style={{
                  background: "#ffffff",
                  border: "1.5px solid #e2e8f0",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  fontFamily: "var(--font-sans)",
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[11px] font-bold tracking-widest text-[#64748b] uppercase"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-[14px] px-4 py-3.5 pr-14 text-[14px] text-[#0f172a] placeholder-[#cbd5e1] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]/50"
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #e2e8f0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    fontFamily: "var(--font-sans)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#cbd5e1] hover:text-[#94a3b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
                >
                  {showPassword ? (
                    <EyeOff size={15} aria-hidden="true" />
                  ) : (
                    <Eye size={15} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="text-right -mt-1">
              <Link
                to="#"
                className="text-[12px] font-bold text-[#0d9488] underline underline-offset-2"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-[16px] py-4 text-[15px] font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                boxShadow: "0 8px 28px rgba(13,148,136,0.32)",
              }}
            >
              Sign In
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e2e8f0]" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-widest text-[#94a3b8] uppercase">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-[#e2e8f0]" aria-hidden="true" />
        </div>

        {/* Social buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3.5 text-[13px] font-semibold text-[#334155] transition-all hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              style={{
                background: "#ffffff",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span className="flex h-4 w-4 items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="size-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </span>
              Google
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3.5 text-[13px] font-semibold text-[#334155] transition-all hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              style={{
                background: "#ffffff",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span className="text-base" aria-hidden="true"></span>
              Apple
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] py-3.5 text-[13px] font-semibold text-[#0d9488] transition-all hover:bg-[#f0fdfa] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
            style={{
              background: "#ffffff",
              border: "1.5px solid #ccfbf1",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <Key size={14} aria-hidden="true" />
            Continue with Canvas (SSO)
          </button>
        </div>

        <p className="mt-5 text-center text-[12px] text-[#94a3b8]">
          Don't have an account?{" "}
          <Link to="/" className="font-bold text-[#0d9488] underline underline-offset-2">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
