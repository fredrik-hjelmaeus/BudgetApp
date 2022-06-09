import { IPreset } from "./IPreset";

// Blueprint for the data we want to store in the context
export interface ICssContext {
  navbar: boolean;
  modal: string;
  modalprops: IPreset | null;
  yearsummary: string;
  dimensions: {
    height: number;
    width: number;
  };
  setNavbar: (navbar: boolean) => void;
  toggleModal: (modal: string) => void;
  setYearSummary: (yearsummary: string) => void;
  setModalprops: (props: IPreset | null) => void;
  setDimensions: () => void;
}
