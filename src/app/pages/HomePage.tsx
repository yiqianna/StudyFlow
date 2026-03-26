import { useState } from "react";
import { Link } from "react-router";
import { Clock, ChevronRight, Flame, Star, Sparkles, ArrowRight, Bell, CalendarDays, ClipboardList } from "lucide-react";
import { homeTasks } from "../data/courseTasksData";
import { useStudy } from "../context/StudyContext";

const categories = [
  { label: "All", active: true },
  { label: "Science", color: "#dbeafe", text: "#2563eb" },
  { label: "Math", color: "#fef3c7", text: "#d97706" },
  { label: "Engineer", color: "#dcfce7", text: "#16a34a" },
  { label: "CS", color: "#ede9fe", text: "#7c3aed" },
];

const statusConfig: Record<
  "next" | "later" | "done",
  { label: string; labelColor: string; labelBg: string }
> = {
  next: {
    label: "Up next",
    labelColor: "#ea580c",
    labelBg: "#fff7ed",
  },
  done: {
    label: "Done",
    labelColor: "#0d9488",
    labelBg: "#f0fdfa",
  },
  later: {
    label: "Later",
    labelColor: "#64748b",
    labelBg: "#f1f5f9",
  },
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { isCourseAllDone } = useStudy();

  // Override status to "done" when all steps are completed in context
  const tasks = homeTasks.map((t) =>
    isCourseAllDone(t.courseId) ? { ...t, status: "done" as const } : t
  );

  const nextTask = tasks.find((t) => t.status === "next");

  return (
    <div className="flex flex-col gap-4 px-4 pt-5 pb-3" style={{ background: "transparent" }}>
      {/* Header */}
      <header className="flex items-center gap-3 pt-1">
        <div
          className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[18px] text-2xl"
          style={{
            background: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
            border: "1.5px solid #99f6e4",
          }}
          aria-hidden="true"
        >
          🧑‍💻
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-[#94a3b8] font-medium tracking-wide">Good morning 👋</p>
          <h1
            className="text-[22px] text-[#0f172a] leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Let's Learn, Alex!
          </h1>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-[14px] transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
          style={{ background: "#ffffff", border: "1.5px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
        >
          <Bell size={17} className="text-[#64748b]" aria-hidden="true" />
        </button>
      </header>

      {/* Streak + Stars row */}
      <div className="flex items-center gap-2">
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold"
          style={{ background: "#fff7ed", color: "#ea580c" }}
        >
          <Flame size={11} aria-hidden="true" />
          4-day streak
        </span>
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold"
          style={{ background: "#fefce8", color: "#ca8a04" }}
        >
          <Star size={11} aria-hidden="true" />
          14 Stars
        </span>
        <div className="flex-1" />
        <Link to="/tasks" className="text-[11px] font-bold text-[#0d9488]">
          See all →
        </Link>
      </div>

      {/* Category chips */}
      <div
        className="flex gap-2 -mx-4 px-4 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
        role="group"
        aria-label="Course categories"
      >
        {categories.map(({ label, color, text, active }) => {
          const isActive = activeCategory === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveCategory(label)}
              className="shrink-0 rounded-full px-4 py-1.5 text-[12px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              style={
                isActive
                  ? { background: "#0d9488", color: "#ffffff" }
                  : { background: color ?? "rgba(255,255,255,0.6)", color: text ?? "#64748b" }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Today's Focus card */}
      {nextTask && (
        <section
          aria-labelledby="focus-heading"
          className="rounded-[24px] p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
            boxShadow: "0 8px 32px rgba(13,148,136,0.28)",
          }}
        >
          {/* Decorative circle */}
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}
            aria-hidden="true"
          />

          <div className="flex items-center justify-between mb-3">
            <p
              id="focus-heading"
              className="text-[10px] font-bold tracking-widest text-white/60 uppercase"
            >
              Today's Focus
            </p>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              40%
            </span>
          </div>

          <p
            className="text-[20px] font-bold text-white leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {nextTask.taskTitle}
          </p>
          <p className="mt-1 text-[11px] text-white/60">
            {nextTask.courseCode} · {nextTask.dueLabel}
          </p>

          <div className="mt-3 mb-1.5 flex items-center gap-1 text-[11px] text-white/55">
            <Clock size={11} aria-hidden="true" />
            <span>Step 2 of 5 · 25 min left</span>
          </div>
          <div
            className="mb-5 h-1.5 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.2)" }}
            role="progressbar"
            aria-valuenow={40}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full w-[40%] rounded-full"
              style={{ background: "rgba(255,255,255,0.85)" }}
            />
          </div>

          <Link
            to={`/tasks/${nextTask.courseId}`}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] py-3 text-[13px] font-bold text-[#0d9488] transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ background: "rgba(255,255,255,0.95)" }}
          >
            Continue Session
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </section>
      )}

      {/* Active Courses */}
      <section aria-labelledby="tasks-heading">
        <div className="flex items-center justify-between mb-3">
          <h2
            id="tasks-heading"
            className="text-[15px] font-bold text-[#0f172a]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Active Courses
          </h2>
        </div>

        <ul className="flex flex-col gap-2.5" role="list">
          {tasks.map((task) => {
            const { label, labelColor, labelBg } = statusConfig[task.status];
            return (
              <li key={task.courseId}>
                <Link
                  to={`/tasks/${task.courseId}`}
                  className="flex items-center gap-3 rounded-[20px] px-4 py-3.5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
                  style={{
                    background: "#ffffff",
                    boxShadow: task.status === "next"
                      ? "0 4px 20px rgba(13,148,136,0.12)"
                      : "0 1px 8px rgba(0,0,0,0.04)",
                    border: task.status === "next"
                      ? "1.5px solid #99f6e4"
                      : "1.5px solid #f1f5f9",
                  }}
                  aria-label={`${task.courseCode}: ${task.taskTitle}`}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[16px] text-[10px] font-bold text-white leading-tight text-center"
                    style={{
                      background: `linear-gradient(135deg, ${task.accentColor} 0%, ${task.accentColor}cc 100%)`,
                      boxShadow: `0 4px 12px ${task.accentColor}40`,
                    }}
                    aria-hidden="true"
                  >
                    {task.courseCode.split(" ")[0]}
                    <br />
                    <span style={{ fontSize: "8px", opacity: 0.85 }}>
                      {task.courseCode.split(" ")[1]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#0f172a] truncate">
                      {task.taskTitle}
                    </p>
                    <p className="text-[11px] text-[#94a3b8] mt-0.5">{task.dueLabel}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold"
                      style={{ background: labelBg, color: labelColor }}
                    >
                      {label}
                    </span>
                    <ChevronRight size={14} className="text-[#cbd5e1]" aria-hidden="true" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Quick action row */}
      <div className="grid grid-cols-2 gap-2.5">
        <Link
          to="/schedule"
          className="flex items-center gap-2.5 rounded-[18px] px-3.5 py-3 transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
          style={{
            background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
            border: "1.5px solid #c7d2fe",
          }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[11px] shrink-0"
            style={{ background: "#6366f1" }}
          >
            <CalendarDays size={14} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#3730a3]">Schedule</p>
            <p className="text-[10px] text-[#6366f1]/60">View classes</p>
          </div>
        </Link>

        <Link
          to="/tasks"
          className="flex items-center gap-2.5 rounded-[18px] px-3.5 py-3 transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
          style={{
            background: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
            border: "1.5px solid #99f6e4",
          }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[11px] shrink-0"
            style={{ background: "#0d9488" }}
          >
            <ClipboardList size={14} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#0f766e]">All Tasks</p>
            <p className="text-[10px] text-[#0d9488]/60">3 courses</p>
          </div>
        </Link>
      </div>

      {/* AI quick link */}
      <Link
        to="/assistant"
        className="flex items-center justify-between rounded-[20px] px-4 py-4 transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
        style={{
          background: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
          border: "1.5px solid #c4b5fd",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[12px]"
            style={{ background: "#7c3aed" }}
          >
            <Sparkles size={15} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#4c1d95]">Ask AI Assistant</p>
            <p className="text-[11px] text-[#7c3aed]/70">Get instant help with any topic</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-[#7c3aed]" aria-hidden="true" />
      </Link>
    </div>
  );
}
