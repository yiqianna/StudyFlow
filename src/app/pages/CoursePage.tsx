import { useNavigate, Link } from "react-router";
import { ArrowLeft, CheckCircle2, Lock, ChevronRight, Sparkles, Play, Video } from "lucide-react";

type MilestoneStatus = "completed" | "inprogress" | "locked";

interface Milestone {
  id: string;
  num: number;
  title: string;
  status: MilestoneStatus;
  detail: string;
  tag?: string;
  cta?: string;
}

const milestones: Milestone[] = [
  {
    id: "m1",
    num: 1,
    title: "User Research",
    status: "completed",
    detail: "3 steps completed · Mar 1",
    tag: "Free",
  },
  {
    id: "m2",
    num: 2,
    title: "Prototype & Wireframes",
    status: "inprogress",
    detail: "Step 2 of 5 · In progress",
    tag: "Free",
    cta: "Continue",
  },
  {
    id: "m3",
    num: 3,
    title: "Usability Testing",
    status: "locked",
    detail: "5 steps · Unlocks Mar 10",
  },
  {
    id: "m4",
    num: 4,
    title: "Final Presentation",
    status: "locked",
    detail: "3 steps · Due Mar 14",
  },
];

const courseStats = [
  { value: "15h 30m", label: "Duration", icon: "⏱" },
  { value: "30", label: "Lessons", icon: "📚" },
  { value: "3", label: "Free Videos", icon: "🎬" },
];

export default function CoursePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col" style={{ background: "transparent", minHeight: "100%" }}>
      {/* Hero */}
      <div
        className="relative px-5 pb-8 pt-8 text-white overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0f766e 0%, #0d9488 55%, #14b8a6 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-60 w-60 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-8 bottom-0 h-40 w-40 rounded-full"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-hidden="true"
        />

        <div className="flex items-center justify-between mb-6 relative">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[13px] font-bold text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg px-2 py-1"
            aria-label="Go back"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold text-white"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            Spring 2026
          </span>
        </div>

        {/* Category tag */}
        <div className="flex items-center gap-2 mb-2 relative">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white/70"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            Design
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white/70"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            UX Research
          </span>
        </div>

        <h1
          className="text-[34px] tracking-tight relative"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          INFO360
        </h1>
        <p className="mt-0.5 text-[13px] text-white/60 font-medium">Design Method · Prof. Kim</p>

        {/* Stats row */}
        <div
          className="mt-5 flex items-center gap-4 relative"
          role="group"
          aria-label="Course stats"
        >
          {courseStats.map(({ value, label, icon }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-base" aria-hidden="true">{icon}</span>
              <div>
                <p className="text-[13px] font-bold text-white">{value}</p>
                <p className="text-[10px] text-white/50">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-5 relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-white/55 font-medium">Course completion</span>
            <span className="text-[11px] font-bold text-white">40%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
            role="progressbar"
            aria-valuenow={40}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full w-[40%] rounded-full"
              style={{ background: "rgba(255,255,255,0.88)" }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Course Preview section */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold text-[#0f172a]">Course Preview</h2>
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-[#f59e0b]"
            style={{ background: "#fef3c7" }}
          >
            <Video size={10} aria-hidden="true" />
            3 Free Videos
          </span>
        </div>

        <ul
          className="flex flex-col gap-2.5"
          role="list"
          aria-label="Learning milestones"
        >
          {milestones.map((m) => {
            const isCompleted = m.status === "completed";
            const isInProgress = m.status === "inprogress";
            const isLocked = m.status === "locked";

            return (
              <li
                key={m.id}
                className={`rounded-[20px] transition-all ${isLocked ? "opacity-50" : ""}`}
                style={{
                  background: "#ffffff",
                  border: isInProgress ? "2px solid #0d9488" : "1.5px solid #f1f5f9",
                  boxShadow: isInProgress
                    ? "0 6px 24px rgba(13,148,136,0.14)"
                    : "0 1px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-3 px-4 py-4">
                  {/* Status icon */}
                  <div aria-hidden="true" className="shrink-0">
                    {isCompleted ? (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                        style={{ background: "#0d9488" }}
                      >
                        <CheckCircle2 size={18} className="text-white" strokeWidth={2.5} />
                      </div>
                    ) : isInProgress ? (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[14px] text-white text-[14px] font-bold"
                        style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}
                      >
                        {m.num}
                      </div>
                    ) : (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-[14px]"
                        style={{ background: "rgba(255,255,255,0.6)" }}
                      >
                        <Lock size={15} className="text-[#cbd5e1]" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-[13px] font-bold ${isLocked ? "text-[#94a3b8]" : "text-[#0f172a]"}`}
                      >
                        {m.title}
                      </p>
                      {m.tag && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[9px] font-bold text-[#f59e0b]"
                          style={{ background: "#fef3c7" }}
                        >
                          {m.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] mt-0.5 font-medium ${
                        isInProgress ? "text-[#0d9488]" : "text-[#94a3b8]"
                      }`}
                    >
                      {m.detail}
                    </p>
                  </div>

                  {/* CTA or action */}
                  {m.cta ? (
                    <Link
                      to="/tasks"
                      className="shrink-0 flex items-center gap-1.5 rounded-[10px] px-3.5 py-1.5 text-[11px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
                      style={{
                        background: "#0d9488",
                        boxShadow: "0 3px 12px rgba(13,148,136,0.28)",
                      }}
                    >
                      <Play size={9} fill="white" aria-hidden="true" />
                      {m.cta}
                    </Link>
                  ) : isCompleted ? (
                    <ChevronRight size={15} aria-hidden="true" className="shrink-0 text-[#cbd5e1]" />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Unlock CTA */}
        <div
          className="mt-4 rounded-[20px] p-4"
          style={{
            background: "#ffffff",
            border: "1.5px solid #f1f5f9",
            boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-[#0f172a]">Unlock Full Course</p>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">Get access to all 30 lessons</p>
            </div>
            <button
              type="button"
              className="rounded-[12px] px-4 py-2.5 text-[12px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                boxShadow: "0 4px 14px rgba(13,148,136,0.3)",
              }}
            >
              $150
            </button>
          </div>
        </div>

        {/* Ask AI */}
        <Link
          to="/assistant"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[18px] py-4 text-[13px] font-bold transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2"
          style={{
            background: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
            border: "1.5px solid #c4b5fd",
            color: "#7c3aed",
          }}
        >
          <Sparkles size={15} aria-hidden="true" />
          Ask AI about this course
        </Link>
      </div>
    </div>
  );
}
