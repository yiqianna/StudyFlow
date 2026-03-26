export type StepStatus = "completed" | "current" | "upcoming";

export interface Step {
  id: string;
  title: string;
  duration: string;
  status: StepStatus;
}

export interface CourseTask {
  courseId: string;
  courseCode: string;
  courseName: string;
  professor: string;
  accentColor: string;
  accentLight: string;
  taskTitle: string;
  dueLabel: string;
  totalMinutes: number;
  steps: Step[];
}

export const courseTasks: Record<string, CourseTask> = {
  info360: {
    courseId: "info360",
    courseCode: "INFO 360",
    courseName: "Design Methods",
    professor: "Prof. Kim",
    accentColor: "#0d9488",
    accentLight: "#f0fdfa",
    taskTitle: "Design Home Screen",
    dueLabel: "Due Mar 10",
    totalMinutes: 90,
    steps: [
      { id: "1", title: "Review user feedback notes", duration: "15 min", status: "completed" },
      { id: "2", title: "Design Home screen layout", duration: "25 min", status: "current" },
      { id: "3", title: "Create high-fidelity prototype", duration: "20 min", status: "upcoming" },
      { id: "4", title: "Conduct usability testing", duration: "20 min", status: "upcoming" },
      { id: "5", title: "Prepare final presentation", duration: "10 min", status: "upcoming" },
    ],
  },
  math125: {
    courseId: "math125",
    courseCode: "MATH 125",
    courseName: "Calculus I",
    professor: "Prof. Chen",
    accentColor: "#f59e0b",
    accentLight: "#fffbeb",
    taskTitle: "Limits & Derivatives",
    dueLabel: "Due Mar 12",
    totalMinutes: 75,
    steps: [
      { id: "1", title: "Review ε-δ definition of limits", duration: "20 min", status: "completed" },
      { id: "2", title: "Practice limit problems (Ch. 2.3)", duration: "20 min", status: "current" },
      { id: "3", title: "Study derivative rules", duration: "15 min", status: "upcoming" },
      { id: "4", title: "Complete problem set 4", duration: "20 min", status: "upcoming" },
    ],
  },
  cse123: {
    courseId: "cse123",
    courseCode: "CSE 123",
    courseName: "Data Structures",
    professor: "Prof. Rao",
    accentColor: "#6366f1",
    accentLight: "#eef2ff",
    taskTitle: "Sorting Algorithms",
    dueLabel: "Due Mar 14",
    totalMinutes: 60,
    steps: [
      { id: "1", title: "Read Chapter 5: Sorting overview", duration: "15 min", status: "completed" },
      { id: "2", title: "Implement merge sort in Python", duration: "20 min", status: "current" },
      { id: "3", title: "Analyze time complexity", duration: "15 min", status: "upcoming" },
      { id: "4", title: "Submit coding assignment", duration: "10 min", status: "upcoming" },
    ],
  },
};

export type TaskStatusSummary = "next" | "later" | "done";

export interface HomeTask {
  courseId: string;
  courseCode: string;
  taskTitle: string;
  dueLabel: string;
  status: TaskStatusSummary;
  accentColor: string;
  accentLight: string;
}

export const homeTasks: HomeTask[] = [
  {
    courseId: "info360",
    courseCode: "INFO 360",
    taskTitle: "Design Home Screen",
    dueLabel: "Due Mar 10",
    status: "next",
    accentColor: "#0d9488",
    accentLight: "#f0fdfa",
  },
  {
    courseId: "math125",
    courseCode: "MATH 125",
    taskTitle: "Limits & Derivatives",
    dueLabel: "Due Mar 12",
    status: "next",
    accentColor: "#f59e0b",
    accentLight: "#fffbeb",
  },
  {
    courseId: "cse123",
    courseCode: "CSE 123",
    taskTitle: "Sorting Algorithms",
    dueLabel: "Due Mar 14",
    status: "later",
    accentColor: "#6366f1",
    accentLight: "#eef2ff",
  },
];
