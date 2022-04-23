import { createContext } from "react";
import { IPresetContext } from "../../frontend-types/IPresetContext";

const presetContext = createContext<IPresetContext | null>(null);

export default presetContext;
