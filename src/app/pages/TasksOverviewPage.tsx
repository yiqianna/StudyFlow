import { Link } from "react-router";
import { ChevronRight, Clock, CheckCircle2, Circle } from "lucide-react";
import { courseTasks } from "../data/courseTasksData";
import { useStudy } from "../context/StudyContext";

export default function TasksOverviewPage() {
  const { stepsByCourse, isCourseAllDone } = useStudy();
  const courses = Object.values(courseTasks);

  return (
    <div className="flex flex-col gap-4 px-4 pt-5 pb-3" style={{ background: "transparent" }}>
      {/* Header */}
      <header className="pt-1">
        <h1
          className="text-[24px] text-[#0f172a] leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          My Tasks
        </h1>
        <p className="text-[11px] text-[#94a3b8] mt-0.5 font-medium">All courses · Spring 2026</p>
      </header>

      {/* Course task cards */}
      <section aria-label="Course task list">
        <ul className="flex flex-col gap-3" role="list">
          {courses.map((course) => {
            // Use live steps from context so progress persists across navigation
            const liveSteps = stepsByCourse[course.courseId] ?? course.steps;
            const allDone = isCourseAllDone(course.courseId);
            const completedSteps = liveSteps.filter((s) => s.status === "completed").length;
            const totalSteps = liveSteps.length;
            const progressPct = Math.round((completedSteps / totalSteps) * 100);
            const currentStep = liveSteps.find((s) => s.status === "current");

            return (
              <li key={course.courseId}>
                <Link
                  to={`/tasks/${course.courseId}`}
                  className="block rounded-[22px] p-5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={
                    {
                      background: allDone ? course.accentLight : "#ffffff",
                      border: allDone
                        ? `1.5px solid ${course.accentColor}55`
                        : `1.5px solid ${course.accentColor}25`,
                      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                      "--tw-ring-color": course.accentColor,
                    } as React.CSSProperties
                  }
                  aria-label={`${course.courseCode}: ${course.taskTitle}`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Course badge */}
                      <div
                        className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[16px] text-white leading-tight"
                        style={{
                          background: `linear-gradient(135deg, ${course.accentColor} 0%, ${course.accentColor}cc 100%)`,
                          boxShadow: `0 4px 14px ${course.accentColor}40`,
                        }}
                        aria-hidden="true"
                      >
                        <span className="text-[11px] font-bold">
                          {course.courseCode.split(" ")[0]}
                        </span>
                        <span className="text-[9px] opacity-80">
                          {course.courseCode.split(" ")[1]}
                        </span>
                      </div>
                      <div>
                        <p
                          className="text-[14px] font-bold text-[#0f172a]"
                        >
                          {course.taskTitle}
                        </p>
                        <p className="text-[11px] text-[#94a3b8] mt-0.5">
                          {course.courseName} · {course.professor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    {allDone && (
                      <span
                        className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold"
                        style={{ background: course.accentColor, color: "#ffffff" }}
                      >
                        <CheckCircle2 size={10} aria-hidden="true" />
                        Done
                      </span>
                    )}
                    <ChevronRight size={16} className="text-gray-300" aria-hidden="true" />
                  </div>
                  </div>

                  {/* Current step preview */}
                  {currentStep && (
                    <div
                      className="flex items-center gap-2 rounded-[12px] px-3 py-2 mb-3"
                      style={{
                        background: `${course.accentLight}`,
                        border: `1.5px solid ${course.accentColor}22`,
                      }}
                    >
                      <Circle
                        size={13}
                        style={{ color: course.accentColor }}
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <p className="text-[11px] font-semibold" style={{ color: course.accentColor }}>
                        Up next: {currentStep.title}
                      </p>
                      <span className="ml-auto flex items-center gap-1 text-[10px] text-gray-400">
                        <Clock size={10} aria-hidden="true" />
                        {currentStep.duration}
                      </span>
                    </div>
                  )}

                  {/* Step previews */}
                  <div className="flex flex-col gap-1 mb-3">
                    {liveSteps.slice(0, 3).map((step) => (
                      <div key={step.id} className="flex items-center gap-2">
                        {step.status === "completed" ? (
                          <CheckCircle2
                            size={13}
                            className="shrink-0"
                            style={{ color: course.accentColor }}
                            aria-hidden="true"
                          />
                        ) : step.status === "current" ? (
                          <Circle
                            size={13}
                            className="shrink-0"
                            style={{ color: course.accentColor }}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        ) : (
                          <div
                            className="h-3 w-3 shrink-0 rounded-full border-2 border-gray-200"
                            aria-hidden="true"
                          />
                        )}
                        <p
                          className={`text-[11px] truncate ${
                            step.status === "completed"
                              ? "line-through text-[#cbd5e1]"
                              : step.status === "current"
                              ? "font-bold text-[#334155]"
                              : "text-[#94a3b8]"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                    ))}
                    {liveSteps.length > 3 && (
                      <p className="text-[10px] text-[#94a3b8] pl-5">
                        +{liveSteps.length - 3} more steps
                      </p>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-[#94a3b8] font-medium">
                        {completedSteps} of {totalSteps} steps done
                      </span>
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: course.accentColor }}
                      >
                        {progressPct}%
                      </span>
                    </div>
                    <div
                      className="h-2 overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.55)" }}
                      role="progressbar"
                      aria-valuenow={progressPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${course.courseCode} progress: ${progressPct}%`}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPct}%`,
                          background: `linear-gradient(90deg, ${course.accentColor} 0%, ${course.accentColor}aa 100%)`,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
