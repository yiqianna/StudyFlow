import { createContext, useContext } from "react";

/** True when the app is rendered inside the desktop phone-frame mockup */
export const FrameContext = createContext<boolean>(true);
export const useIsFramed = () => useContext(FrameContext);
