import { createContext } from "react";
import { IDateContext } from "../../frontend-types/IDateContext";

const dataContext = createContext<IDateContext | null>(null);

export default dataContext;
