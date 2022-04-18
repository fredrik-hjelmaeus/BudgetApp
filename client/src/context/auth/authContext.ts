import { createContext } from "react";
import { IAuthContext } from "../../frontend-types/IAuthContext";
import { IRegisterFormData } from "../../frontend-types/IRegisterFormData";

const authContext = createContext<IAuthContext | null>({
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  errors: [],
  alerts: [],
  mailsentmsg: null,
  register: (formData: IRegisterFormData) => Promise.resolve(),
  login: () => {},
  logout: () => {},
  clearErrors: () => {},
  loadUser: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
  updateDetails: () => {},
  updatePassword: () => {},
  clearAlerts: () => {},
});

export default authContext;
