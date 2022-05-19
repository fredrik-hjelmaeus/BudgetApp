import { createContext } from "react";
import { IDateContext } from "../../frontend-types/IDateContext";

const dataContext = createContext<IDateContext>({
  dateList: [],
  setDate: (dateList) => {},
});

export default dataContext;
