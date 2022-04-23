import { createContext } from "react";
import { IAlertContext } from "../../frontend-types/IAlertContext";

const alertContext = createContext<IAlertContext | null>(null);

export default alertContext;
