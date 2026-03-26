import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Flame, BarChart3, BookOpen } from "lucide-react";

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const dayActivity: ("completed" | "missed" | "none")[] = [
  "completed",
  "completed",
  "completed",
  "none",
  "missed",
  "none",
  "none",
];
const fullDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const focusHours = [3.5, 2.8, 4.0, 0, 1.2, 0, 0];
const maxHours = Math.max(...focusHours, 1);

const stats = [
  { value: "14", label: "Steps done", color: "#0d9488", bg: "#f0fdfa", border: "#99f6e4" },
  { value: "3.8h", label: "Focus time", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
  { value: "4", label: "Active days", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe" },
  { value: "72%", label: "On track", color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0" },
];

const courses = [
  { name: "INFO 360", label: "Design Method", pct: 38, color: "#0d9488", bg: "#f0fdfa" },
  { name: "MATH 125", label: "Calculus I", pct: 67, color: "#f59e0b", bg: "#fffbeb" },
  { name: "CSE 123", label: "Data Structures", pct: 21, color: "#6366f1", bg: "#eef2ff" },
];

const timeline = [
  { time: "9:00–10:30", title: "Math Tutorials", subtitle: "Interactive calculus lessons", color: "#fef3c7", text: "#d97706", dot: "#f59e0b" },
  { time: "11:00–12:00", title: "INFO 360 Design", subtitle: "Prototype & wireframes", color: "#ccfbf1", text: "#0d9488", dot: "#0d9488" },
  { time: "2:00–3:30", title: "CSE 123 Lab", subtitle: "Binary trees & recursion", color: "#ede9fe", text: "#7c3aed", dot: "#7c3aed" },
];

const TABS = ["Week", "Courses", "Timeline"] as const;
type Tab = (typeof TABS)[number];

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Week");

  return (
    <div className="flex flex-col gap-4 px-4 pt-5 pb-3" style={{ background: "transparent" }}>
      {/* Header */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <h1
            className="text-[24px] text-[#0f172a]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Your Progress
          </h1>
          <p className="text-[11px] text-[#94a3b8] mt-0.5 font-medium">Week of Mar 2 – Mar 8</p>
        </div>
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold"
          style={{ background: "#fff7ed", color: "#ea580c" }}
        >
          <Flame size={11} aria-hidden="true" />
          4-day streak
        </span>
      </header>

      {/* Today's activity card */}
      <section
        aria-label="Today's activity"
        className="rounded-[22px] p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
          boxShadow: "0 8px 28px rgba(13,148,136,0.25)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase mb-1">
              Today's Activity
            </p>
            <p
              className="text-[44px] font-bold text-white leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              73%
            </p>
            <p className="text-[12px] text-white/60 mt-1">Daily goal completion</p>
          </div>
          <div
            className="flex h-16 w-16 items-center justify-center rounded-[20px]"
            style={{ background: "rgba(255,255,255,0.14)" }}
          >
            <BarChart3 size={28} className="text-white" aria-hidden="true" />
          </div>
        </div>
        {/* Mini progress bar */}
        <div
          className="mt-4 h-1.5 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.2)" }}
          role="progressbar"
          aria-valuenow={73}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full"
            style={{ width: "73%", background: "rgba(255,255,255,0.85)" }}
          />
        </div>
      </section>

      {/* Tabs */}
      <div
        className="flex rounded-[16px] p-1 gap-1"
        style={{ background: "#ffffff", border: "1.5px solid #e2e8f0" }}
        role="tablist"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 rounded-[12px] py-2 text-[12px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
            style={
              activeTab === tab
                ? { background: "#0d9488", color: "#ffffff" }
                : { color: "#94a3b8" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Week" && (
        <>
          {/* Weekly calendar */}
          <section aria-label="This week's activity">
            <div className="flex justify-between gap-1">
              {weekDays.map((day, i) => {
                const act = dayActivity[i];
                const bgMap = { completed: "#0d9488", missed: "#f43f5e", none: "#e2e8f0" };
                const textMap = { completed: "#ffffff", missed: "#ffffff", none: "#94a3b8" };
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-[14px] text-[12px] font-bold"
                      style={{ background: bgMap[act], color: textMap[act] }}
                      aria-label={`${fullDayNames[i]}: ${act}`}
                      role="img"
                    >
                      {day}
                    </div>
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          act === "completed" ? "#0d9488"
                          : act === "missed" ? "#f43f5e"
                          : "#e2e8f0",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Focus hours bar chart */}
          <section
            aria-label="Daily focus hours"
            className="rounded-[22px] p-5"
            style={{
              background: "#ffffff",
              border: "1.5px solid #f1f5f9",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[14px] font-bold text-[#0f172a]">Focus Hours</p>
              <p className="text-[11px] text-[#94a3b8] font-medium">This week · avg 2.1h/day</p>
            </div>
            <div className="flex items-end justify-between gap-2 h-[80px]">
              {weekDays.map((day, i) => {
                const h = focusHours[i];
                const heightPct = (h / maxHours) * 100;
                const act = dayActivity[i];
                const barColor = act === "completed" ? "#0d9488" : act === "missed" ? "#f43f5e" : "#e2e8f0";
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="flex w-full flex-col items-center justify-end" style={{ height: 64 }}>
                      <div
                        className="w-full rounded-[8px] transition-all"
                        style={{
                          height: h > 0 ? `${heightPct}%` : "8px",
                          background: barColor,
                          minHeight: 8,
                        }}
                        aria-label={`${fullDayNames[i]}: ${h}h`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: "#94a3b8" }}>{day}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Stats grid */}
          <section aria-label="Weekly statistics">
            <div className="grid grid-cols-2 gap-2.5">
              {stats.map(({ value, label, color, bg, border }) => (
                <div
                  key={label}
                  className="rounded-[20px] p-4"
                  style={{ background: bg, border: `1.5px solid ${border}` }}
                >
                  <p
                    className="text-[28px] font-bold leading-none"
                    style={{ color, fontFamily: "var(--font-display)" }}
                  >
                    {value}
                  </p>
                  <p className="text-[11px] text-[#64748b] mt-1.5 font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === "Courses" && (
        <section
          aria-labelledby="by-course-heading"
          className="rounded-[22px] p-5"
          style={{
            background: "#ffffff",
            border: "1.5px solid #f1f5f9",
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            id="by-course-heading"
            className="mb-5 text-[16px] font-bold text-[#0f172a]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Progress by Course
          </h2>
          <ul className="flex flex-col gap-5" role="list">
            {courses.map(({ name, label, pct, color, bg }) => (
              <li key={name}>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-[10px]"
                    style={{ background: bg }}
                    aria-hidden="true"
                  >
                    <BookOpen size={14} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#0f172a]">{name}</span>
                      <span className="text-[12px] font-bold" style={{ color }}>{pct}%</span>
                    </div>
                    <p className="text-[11px] text-[#94a3b8]">{label}</p>
                  </div>
                </div>
                <div
                  className="h-2.5 overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.55)" }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === "Timeline" && (
        <section aria-label="Today's learning timeline">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[14px] font-bold text-[#0f172a]">Today's Schedule</p>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold text-[#0d9488]"
              style={{ background: "#f0fdfa" }}
            >
              3 sessions
            </span>
          </div>
          <ul className="flex flex-col gap-3" role="list">
            {timeline.map(({ time, title, subtitle, color, text, dot }) => (
              <li
                key={title}
                className="flex gap-3"
              >
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: dot }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 w-px" style={{ background: "#e2e8f0", minHeight: 32 }} aria-hidden="true" />
                </div>
                <div
                  className="flex-1 rounded-[18px] p-4 mb-1"
                  style={{ background: color, border: `1.5px solid ${dot}22` }}
                >
                  <p className="text-[10px] font-bold tracking-wide mb-1" style={{ color: `${text}99` }}>
                    {time}
                  </p>
                  <p className="text-[14px] font-bold" style={{ color: text }}>{title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: `${text}99` }}>{subtitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Course detail link */}
      <Link
        to="/course/info360"
        className="flex items-center justify-between rounded-[18px] px-4 py-3.5 transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
        style={{
          background: "#ffffff",
          border: "1.5px solid #e2e8f0",
          boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        }}
      >
        <span className="text-[13px] font-bold text-[#0d9488]">View INFO360 milestones</span>
        <ChevronRight size={15} className="text-[#0d9488]" aria-hidden="true" />
      </Link>
    </div>
  );
}
