import { createContext } from "react";
import { IGuideContext } from "../../frontend-types/IGuideContext";

const guideContext = createContext<IGuideContext | null>(null);

export default guideContext;
