import { createContext } from "react";
import { alertObject, IAlertContext } from "../../frontend-types/IAlertContext";

const alertContext = createContext<IAlertContext>({
  alerts: [] as alertObject[],
  setAlert: () => {},
});

export default alertContext;
