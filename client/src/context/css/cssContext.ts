import { createContext } from "react";
import { ICssContext } from "../../types/ICssContext";

const cssContext = createContext<ICssContext | null>(null);

export default cssContext;
