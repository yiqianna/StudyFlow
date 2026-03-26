import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Play, Pause, RotateCcw, Check, ArrowLeft, Pencil, Lightbulb, CheckCircle2 } from "lucide-react";
import { courseTasks, type Step } from "../data/courseTasksData";
import { useStudy } from "../context/StudyContext";

// Parse "25 min" → 25
function parseDurationMinutes(duration: string): number {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 25;
}

const PRESET_MINUTES = [5, 10, 15, 25, 45, 60];

export default function TasksPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { stepsByCourse, updateSteps, isCourseAllDone } = useStudy();

  const courseData = courseId ? courseTasks[courseId] : null;

  // Read steps from shared context (preserves progress across navigation)
  const steps: Step[] = (courseId && stepsByCourse[courseId]) ?? courseData?.steps ?? [];
  const setSteps = (updater: (prev: Step[]) => Step[]) => {
    if (!courseId) return;
    updateSteps(courseId, updater(steps));
  };

  const allDone = courseId ? isCourseAllDone(courseId) : false;

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer customisation
  const currentStep = steps.find((s) => s.status === "current");
  const suggestedMinutes = currentStep
    ? parseDurationMinutes(currentStep.duration)
    : 25;

  const [selectedMinutes, setSelectedMinutes] = useState(suggestedMinutes);
  const [timeLeft, setTimeLeft] = useState(suggestedMinutes * 60);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputVal, setCustomInputVal] = useState("");

  // Reset timer when course changes (but NOT steps — they live in context)
  useEffect(() => {
    setIsRunning(false);
  }, [courseId]);

  // When steps change (e.g. step completed), update suggested time
  useEffect(() => {
    const newCurrent = steps.find((s) => s.status === "current");
    const newSuggested = newCurrent ? parseDurationMinutes(newCurrent.duration) : 25;
    setSelectedMinutes(newSuggested);
    setTimeLeft(newSuggested * 60);
    setIsRunning(false);
  }, [steps.map((s) => s.status).join(",")]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => Math.max(0, t - 1));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
        <p className="text-gray-500 text-sm">Course not found.</p>
        <button
          onClick={() => navigate("/tasks")}
          className="text-sm font-semibold text-[#0d9488] underline"
        >
          Go back to Tasks
        </button>
      </div>
    );
  }

  const currentIdx = steps.findIndex((s) => s.status === "current");
  const completedCount = steps.filter((s) => s.status === "completed").length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  const totalSeconds = selectedMinutes * 60;
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const timerProgress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  const { accentColor, accentLight } = courseData;

  const applyMinutes = (mins: number) => {
    if (isRunning) return; // don't change while running
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    setShowCustomInput(false);
  };

  const handleCustomConfirm = () => {
    const val = parseInt(customInputVal, 10);
    if (!isNaN(val) && val > 0 && val <= 180) {
      applyMinutes(val);
      setCustomInputVal("");
    }
  };

  const handleReset = () => {
    setTimeLeft(selectedMinutes * 60);
    setIsRunning(false);
  };

  const toggleStep = (id: string) => {
    setSteps((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const updated = [...prev];
      const step = updated[idx];

      if (step.status === "completed") {
        // Un-complete: mark as current, clear any subsequent "current" back to upcoming
        updated[idx] = { ...step, status: "current" };
        for (let i = idx + 1; i < updated.length; i++) {
          if (updated[i].status === "current") {
            updated[i] = { ...updated[i], status: "upcoming" };
            break;
          }
        }
      } else if (step.status === "current") {
        updated[idx] = { ...step, status: "completed" };
        const nextUpcoming = updated.findIndex(
          (s, i) => i > idx && s.status === "upcoming"
        );
        if (nextUpcoming >= 0) {
          updated[nextUpcoming] = { ...updated[nextUpcoming], status: "current" };
        }
      }
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-6 pb-3">
      {/* Back + course tag */}
      <header>
        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] rounded-lg mb-3"
          aria-label="Back to all tasks"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All Tasks
        </button>

        <div className="flex items-center gap-3">
          {/* Course badge */}
          <div
            className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-[16px] text-white leading-tight"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
              boxShadow: `0 4px 16px ${accentColor}40`,
            }}
            aria-hidden="true"
          >
            <span className="text-[11px] font-bold">
              {courseData.courseCode.split(" ")[0]}
            </span>
            <span className="text-[9px] opacity-80">
              {courseData.courseCode.split(" ")[1]}
            </span>
          </div>
          <div>
            <div
              className="inline-flex items-center rounded-full px-3 py-1 mb-1"
              style={{ background: accentLight }}
            >
              <span
                className="text-[10px] font-semibold"
                style={{ color: accentColor }}
              >
                {courseData.courseCode} · {courseData.courseName}
              </span>
            </div>
            <h1
              className="text-[20px] text-gray-900 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {courseData.taskTitle}
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {courseData.dueLabel} · {courseData.professor}
            </p>
          </div>
        </div>
      </header>

      {/* All-done celebration banner */}
      {allDone && (
        <div
          className="rounded-[20px] px-5 py-4 flex items-center gap-4"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
            boxShadow: `0 8px 28px ${accentColor}35`,
          }}
          role="status"
          aria-live="polite"
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px]"
            style={{ background: "rgba(255,255,255,0.18)" }}
            aria-hidden="true"
          >
            <CheckCircle2 size={26} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-white leading-tight">
              All tasks complete! 🎉
            </p>
            <p className="text-[11px] text-white/65 mt-0.5">
              {courseData.courseCode} marked as Done
            </p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div
        className="rounded-[18px] p-4"
        style={{
          background: "#ffffff",
          border: allDone ? `1.5px solid ${accentColor}40` : "1.5px solid #f1f5f9",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-bold text-[#0f172a]">
            Task Steps
          </span>
          <span className="text-[11px] font-medium text-[#94a3b8]">
            {allDone
              ? `All ${steps.length} done ✓`
              : `Step ${Math.min(currentIdx + 1, steps.length)} of ${steps.length}`}
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.55)" }}
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Task progress: ${progressPct}%`}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}aa 100%)`,
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <section aria-label="Task steps">
        <ul className="flex flex-col gap-2" role="list">
          {steps.map((step) => {
            const isCurrent = step.status === "current";
            const isCompleted = step.status === "completed";
            const isUpcoming = step.status === "upcoming";

            return (
              <li
                key={step.id}
                className={`rounded-[18px] transition-all ${
                  isCurrent ? "border-2" : "border border-transparent"
                }`}
                style={{
                  background: isUpcoming
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(255,255,255,0.88)",
                  borderColor: isCurrent ? `${accentColor}80` : undefined,
                  boxShadow: isCurrent
                    ? `0 6px 24px ${accentColor}18`
                    : "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <button
                  onClick={() => (!isUpcoming ? toggleStep(step.id) : undefined)}
                  disabled={isUpcoming}
                  className={`flex w-full items-center gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset rounded-[18px] ${
                    isUpcoming ? "cursor-default" : "cursor-pointer"
                  }`}
                  style={
                    { "--tw-ring-color": accentColor } as React.CSSProperties
                  }
                  aria-label={`${step.title} – ${step.status}`}
                  aria-disabled={isUpcoming}
                >
                  {/* Status icon */}
                  <span className="shrink-0" aria-hidden="true">
                    {isCompleted ? (
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                        }}
                      >
                        <Check size={15} className="text-white" strokeWidth={2.5} />
                      </div>
                    ) : isCurrent ? (
                      <div
                        className="h-8 w-8 rounded-xl border-2 bg-white"
                        style={{ borderColor: `${accentColor}99` }}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-xl border-2 border-gray-200 bg-gray-50" />
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isCompleted
                          ? "line-through text-gray-300"
                          : isUpcoming
                          ? "text-gray-400"
                          : "text-gray-800"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-[10px] mt-0.5 font-medium ${
                        isCompleted
                          ? "text-gray-300"
                          : isCurrent
                          ? ""
                          : "text-gray-400"
                      }`}
                      style={isCurrent ? { color: accentColor } : undefined}
                    >
                      {isCompleted
                        ? "Completed ✓"
                        : isCurrent
                        ? `Current · ${step.duration}`
                        : step.duration}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Focus Session Timer */}
      <section
        aria-labelledby="focus-session-heading"
        className="rounded-[22px] p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(234,243,237,0.7) 100%)",
          border: `1px solid ${accentColor}18`,
          boxShadow: `0 8px 28px ${accentColor}12`,
        }}
      >
        <p
          id="focus-session-heading"
          className="mb-3 text-center text-[9px] font-semibold tracking-widest text-gray-400 uppercase"
        >
          Focus Session
        </p>

        {/* ── Duration Picker ── */}
        <div className="mb-4">
          {/* Suggested hint */}
          {currentStep && (
            <div
              className="flex items-center gap-1.5 rounded-[10px] px-3 py-2 mb-2.5"
              style={{ background: accentLight }}
            >
              <Lightbulb size={11} style={{ color: accentColor }} aria-hidden="true" />
              <p className="text-[10px]" style={{ color: accentColor }}>
                <span className="font-semibold">Suggested:</span>{" "}
                {currentStep.duration} for "{currentStep.title}"
              </p>
            </div>
          )}

          {/* Preset chips */}
          <div
            className="flex flex-wrap gap-1.5"
            role="group"
            aria-label="Select focus duration"
          >
            {PRESET_MINUTES.map((mins) => {
              const isSuggested = mins === suggestedMinutes;
              const isSelected = mins === selectedMinutes && !showCustomInput;
              return (
                <button
                  key={mins}
                  type="button"
                  onClick={() => applyMinutes(mins)}
                  disabled={isRunning}
                  aria-pressed={isSelected}
                  aria-label={`${mins} minutes${isSuggested ? " (suggested)" : ""}`}
                  className="relative flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isSelected
                      ? accentColor
                      : "rgba(255,255,255,0.8)",
                    color: isSelected ? "#fff" : "#6b7280",
                    border: isSelected
                      ? `1.5px solid ${accentColor}`
                      : isSuggested
                      ? `1.5px dashed ${accentColor}88`
                      : "1.5px solid #e5e7eb",
                    boxShadow: isSelected
                      ? `0 3px 10px ${accentColor}30`
                      : "none",
                  }}
                >
                  {mins} min
                  {isSuggested && (
                    <span
                      className="ml-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold leading-none"
                      style={{
                        background: isSelected ? "rgba(255,255,255,0.25)" : accentLight,
                        color: isSelected ? "#fff" : accentColor,
                      }}
                    >
                      ✦
                    </span>
                  )}
                </button>
              );
            })}

            {/* Custom button */}
            <button
              type="button"
              onClick={() => {
                if (isRunning) return;
                setShowCustomInput((v) => !v);
              }}
              disabled={isRunning}
              aria-pressed={showCustomInput}
              aria-label="Set custom duration"
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: showCustomInput ? accentColor : "rgba(255,255,255,0.8)",
                color: showCustomInput ? "#fff" : "#6b7280",
                border: showCustomInput
                  ? `1.5px solid ${accentColor}`
                  : "1.5px solid #e5e7eb",
                boxShadow: showCustomInput ? `0 3px 10px ${accentColor}30` : "none",
              }}
            >
              <Pencil size={10} aria-hidden="true" />
              Custom
            </button>
          </div>

          {/* Custom input row */}
          {showCustomInput && (
            <div className="flex items-center gap-2 mt-2.5">
              <input
                type="number"
                min={1}
                max={180}
                value={customInputVal}
                onChange={(e) => setCustomInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomConfirm()}
                placeholder="e.g. 35"
                aria-label="Enter custom minutes"
                className="w-24 rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
              />
              <span className="text-[11px] text-gray-400">min</span>
              <button
                type="button"
                onClick={handleCustomConfirm}
                className="rounded-[10px] px-4 py-2 text-[12px] font-semibold text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
                style={{
                  background: accentColor,
                  "--tw-ring-color": accentColor,
                } as React.CSSProperties}
              >
                Set
              </button>
            </div>
          )}
        </div>

        {/* Circular timer */}
        <div className="flex justify-center my-1">
          <div className="relative flex items-center justify-center">
            <svg width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
              <circle
                cx="65" cy="65" r="58"
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="8"
              />
              <circle
                cx="65" cy="65" r="58"
                fill="none"
                stroke={accentColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 58}`}
                strokeDashoffset={`${2 * Math.PI * 58 * (1 - timerProgress / 100)}`}
                transform="rotate(-90 65 65)"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute text-center">
              <p
                className="text-[32px] font-bold tabular-nums leading-none"
                style={{ color: accentColor, fontFamily: "var(--font-display)" }}
                aria-live="polite"
                aria-atomic="true"
                aria-label={`${mm} minutes and ${ss} seconds remaining`}
              >
                {mm}:{ss}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                {selectedMinutes} min session
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-400 mb-4">
          {isRunning ? "Stay focused — you've got this 💪" : "Select a duration and start your session"}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset timer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-all hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
          >
            <RotateCcw size={15} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setIsRunning((v) => !v)}
            aria-label={isRunning ? "Pause focus session" : "Start focus session"}
            aria-pressed={isRunning}
            className="flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: isRunning
                ? "linear-gradient(135deg, #d98a63 0%, #c4713a 100%)"
                : `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
              boxShadow: isRunning
                ? "0 4px 16px rgba(217,138,99,0.35)"
                : `0 4px 16px ${accentColor}40`,
            }}
          >
            {isRunning ? (
              <>
                <Pause size={13} aria-hidden="true" /> Pause
              </>
            ) : (
              <>
                <Play size={13} aria-hidden="true" fill="currentColor" /> Start Session
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}