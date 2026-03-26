import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { courseTasks, type Step } from "../data/courseTasksData";

interface StudyContextValue {
  /** Current steps state for each course */
  stepsByCourse: Record<string, Step[]>;
  /** Update steps for a course (called from TasksPage) */
  updateSteps: (courseId: string, steps: Step[]) => void;
  /** True when every step in that course is "completed" */
  isCourseAllDone: (courseId: string) => boolean;
  /** Progress 0-100 for a course */
  courseProgress: (courseId: string) => number;
}

const StudyContext = createContext<StudyContextValue | null>(null);

function initSteps(): Record<string, Step[]> {
  const result: Record<string, Step[]> = {};
  for (const [id, course] of Object.entries(courseTasks)) {
    result[id] = course.steps.map((s) => ({ ...s }));
  }
  return result;
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [stepsByCourse, setStepsByCourse] = useState<Record<string, Step[]>>(initSteps);

  const updateSteps = useCallback((courseId: string, steps: Step[]) => {
    setStepsByCourse((prev) => ({ ...prev, [courseId]: steps }));
  }, []);

  const isCourseAllDone = useCallback(
    (courseId: string) => {
      const steps = stepsByCourse[courseId];
      return !!steps && steps.length > 0 && steps.every((s) => s.status === "completed");
    },
    [stepsByCourse]
  );

  const courseProgress = useCallback(
    (courseId: string) => {
      const steps = stepsByCourse[courseId];
      if (!steps || steps.length === 0) return 0;
      return Math.round((steps.filter((s) => s.status === "completed").length / steps.length) * 100);
    },
    [stepsByCourse]
  );

  return (
    <StudyContext.Provider value={{ stepsByCourse, updateSteps, isCourseAllDone, courseProgress }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be used inside <StudyProvider>");
  return ctx;
}
