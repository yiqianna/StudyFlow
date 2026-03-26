import { createHashRouter as createBrowserRouter } from "react-router";
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TasksOverviewPage from "./pages/TasksOverviewPage";
import TasksPage from "./pages/TasksPage";
import ProgressPage from "./pages/ProgressPage";
import AssistantPage from "./pages/AssistantPage";
import ProfilePage from "./pages/ProfilePage";
import CoursePage from "./pages/CoursePage";
import SchedulePage from "./pages/SchedulePage";

export const router = createBrowserRouter([
  { path: "/", Component: WelcomePage },
  { path: "/signin", Component: SignInPage },
  { path: "/course/:id", Component: CoursePage },
  {
    Component: Layout,
    children: [
      { path: "/home", Component: HomePage },
      { path: "/tasks", Component: TasksOverviewPage },
      { path: "/tasks/:courseId", Component: TasksPage },
      { path: "/schedule", Component: SchedulePage },
      { path: "/progress", Component: ProgressPage },
      { path: "/assistant", Component: AssistantPage },
      { path: "/profile", Component: ProfilePage },
    ],
  },
]);
