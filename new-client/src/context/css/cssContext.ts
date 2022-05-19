import { createContext } from "react";
import { ICssContext } from "../../frontend-types/ICssContext";
import { IPreset } from "../../frontend-types/IPreset";

const cssContext = createContext<ICssContext>({
  navbar: true,
  modal: "string",
  modalprops: null,
  yearsummary: "string",
  dimensions: {
    height: 0,
    width: 0,
  },
  toggleNavbar: (navbar: boolean) => {},
  toggleModal: (modal: string) => {},
  setYearSummary: (yearsummary: string) => {},
  setModalprops: (props: IPreset | null) => {},
  setDimensions: () => {},
});

export default cssContext;
