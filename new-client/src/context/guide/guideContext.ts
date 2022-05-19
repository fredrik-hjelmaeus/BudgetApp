import { createContext } from "react";
import { IGuideContext } from "../../frontend-types/IGuideContext";

const guideContext = createContext<IGuideContext>({
  guide: null,
  exitedguide: true,
  setGuide: () => {},
  setUserExited: () => {},
});

export default guideContext;
