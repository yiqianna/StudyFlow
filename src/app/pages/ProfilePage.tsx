import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  Moon,
  ChevronRight,
  LogOut,
  ExternalLink,
  CalendarDays,
  HelpCircle,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Switch } from "../components/ui/switch";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [canvasLinked, setCanvasLinked] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-4 pt-5 pb-3" style={{ background: "transparent" }}>

      {/* ── Profile header ── */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <div
          className="flex h-[80px] w-[80px] items-center justify-center rounded-[28px] text-4xl mb-4"
          style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.9)", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
        >
          🧑‍🎓
        </div>
        <p className="text-[20px] font-bold text-[#0f172a] leading-tight">Alex Johnson</p>
        <p className="text-[13px] text-[#64748b] mt-1">alex@uw.edu</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "rgba(255,255,255,0.7)", color: "#64748b" }}>
            University of Washington
          </span>
          <span className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: "rgba(255,255,255,0.7)", color: "#64748b" }}>
            Informatics
          </span>
        </div>
      </div>

      {/* ── Canvas LMS ── */}
      <div
        className="rounded-[22px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.82)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          border: "1px solid rgba(255,255,255,0.9)",
        }}
      >
        <div className="px-5 pt-4 pb-3 flex items-center gap-2">
          <span className="text-base">🎨</span>
          <p className="text-[14px] font-bold text-[#0f172a]">Canvas LMS</p>
          {canvasLinked && (
            <span
              className="ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
              style={{ background: "#dcfce7", color: "#16a34a" }}
            >
              <CheckCircle2 size={10} /> Active
            </span>
          )}
        </div>

        {/* Status row */}
        <div
          className="mx-4 rounded-[16px] p-4"
          style={{
            background: canvasLinked ? "#f0fdfa" : "#f8fafc",
            border: `1.5px solid ${canvasLinked ? "#a7f3d0" : "#e2e8f0"}`,
          }}
        >
          <p className="text-[12px] leading-relaxed" style={{ color: canvasLinked ? "#0d9488" : "#94a3b8" }}>
            {canvasLinked
              ? "Auto-sync courses & assignments enabled. Your Canvas data is up to date."
              : "Connect Canvas to automatically import your courses, assignments, and deadlines."}
          </p>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setCanvasLinked((v) => !v)}
            className="flex-1 rounded-[14px] py-2.5 text-[13px] font-bold transition-all active:scale-95"
            style={
              canvasLinked
                ? { background: "#fee2e2", color: "#dc2626" }
                : { background: "linear-gradient(135deg, #0d9488, #0f766e)", color: "#ffffff" }
            }
          >
            {canvasLinked ? "Disconnect" : "Connect Canvas"}
          </button>
          {canvasLinked && (
            <a
              href="https://canvas.uw.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[14px] px-4 py-2.5 text-[13px] font-bold"
              style={{ background: "#e6faf8", color: "#0d9488" }}
            >
              <ExternalLink size={13} />
              Open
            </a>
          )}
        </div>
      </div>

      {/* ── Quick links ── */}
      <div
        className="rounded-[22px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.82)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          border: "1px solid rgba(255,255,255,0.9)",
        }}
      >
        <div className="px-5 pt-4 pb-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8]">Academics</p>
        </div>

        {[
          { icon: CalendarDays, label: "Course Schedule", sub: "View weekly class times", to: "/schedule", iconBg: "#e6faf8", iconColor: "#0d9488" },
          { icon: BookOpen, label: "All Tasks", sub: "Tasks across all courses", to: "/tasks", iconBg: "#fef3c7", iconColor: "#f59e0b" },
        ].map(({ icon: Icon, label, sub, to, iconBg, iconColor }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="w-full flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.03] active:bg-black/[0.05]"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px]"
              style={{ background: iconBg }}
            >
              <Icon size={16} style={{ color: iconColor }} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[14px] font-semibold text-[#0f172a]">{label}</p>
              <p className="text-[11px] text-[#94a3b8]">{sub}</p>
            </div>
            <ChevronRight size={15} className="text-[#cbd5e1]" />
          </button>
        ))}
      </div>

      {/* ── Preferences ── */}
      <div
        className="rounded-[22px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.82)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          border: "1px solid rgba(255,255,255,0.9)",
        }}
      >
        <div className="px-5 pt-4 pb-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8]">Preferences</p>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px]" style={{ background: "#fef3c7" }}>
              <Bell size={16} style={{ color: "#f59e0b" }} />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#0f172a]">Notifications</p>
              <p className="text-[11px] text-[#94a3b8]">Task reminders & updates</p>
            </div>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} aria-label="Toggle notifications" />
        </div>

        <div className="mx-5 h-px" style={{ background: "#f1f5f9" }} />

        <div className="flex items-center justify-between gap-3 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px]" style={{ background: "#ede9fe" }}>
              <Moon size={16} style={{ color: "#7c3aed" }} />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#0f172a]">Dark Mode</p>
              <p className="text-[11px] text-[#94a3b8]">Easy on the eyes</p>
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Toggle dark mode" />
        </div>

        <div className="mx-5 h-px" style={{ background: "#f1f5f9" }} />

        <button className="w-full flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.03] active:bg-black/[0.05]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px]" style={{ background: "#f1f5f9" }}>
            <HelpCircle size={16} className="text-[#64748b]" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-semibold text-[#0f172a]">Help & Feedback</p>
            <p className="text-[11px] text-[#94a3b8]">Report issues or suggestions</p>
          </div>
          <ChevronRight size={15} className="text-[#cbd5e1]" />
        </button>
      </div>

      {/* ── Sign out ── */}
      <button
        onClick={() => navigate("/")}
        className="w-full flex items-center justify-center gap-2 rounded-[18px] px-6 py-4 text-[14px] font-bold transition-all active:scale-[0.98] hover:opacity-90"
        style={{
          background: "rgba(255,255,255,0.82)",
          border: "1.5px solid #fecaca",
          color: "#ef4444",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <LogOut size={16} />
        Sign Out
      </button>

      <p className="text-center text-[11px] text-[#cbd5e1] pb-1">StudyFlow v1.0 </p>
    </div>
  );
}
