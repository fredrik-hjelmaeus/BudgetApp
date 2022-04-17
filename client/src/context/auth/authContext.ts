import { createContext } from "react";
import { IAuthContext } from "../../types/IAuthContext";

const authContext = createContext<IAuthContext | null>({
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  errors: [],
  alerts: [],
  mailsentmsg: null,
  register: () => {},
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
