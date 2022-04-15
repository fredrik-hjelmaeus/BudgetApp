import { createContext } from "react";

// Blueprint for the data we want to store in the context
export type CssContextType = {
  navbar: boolean;
  modal: string;
  modalprops: null;
  yearsummary: string;
  dimensions: {
    height: number;
    width: number;
  };
  toggleNavbar: (navbar: boolean) => void;
  toggleModal: (modal: string, modalprops: object) => void;
};

// Create the context and provide the default values
const cssContext = createContext<CssContextType>({
  navbar: false,
  modal: "",
  modalprops: null,
  yearsummary: "",
  dimensions: {
    height: 0,
    width: 0,
  },
  toggleNavbar: () => {},
  toggleModal: () => {},
});

export default cssContext;
