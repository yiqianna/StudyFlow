import { RouterProvider } from "react-router";
import { router } from "./routes";
import { PhoneFrame } from "./components/PhoneFrame";
import { StudyProvider } from "./context/StudyContext";

export default function App() {
  return (
    <StudyProvider>
      <PhoneFrame>
        <RouterProvider router={router} />
      </PhoneFrame>
    </StudyProvider>
  );
}