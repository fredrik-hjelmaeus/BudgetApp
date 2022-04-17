import { createContext } from "react";
import { ICssContext } from "../../frontend-types/ICssContext";

const cssContext = createContext<ICssContext | null>(null);

export default cssContext;
