import { createContext } from "react";
import { IAuthContext } from "../../frontend-types/IAuthContext";
import { ILoginFormData } from "../../frontend-types/ILoginFormData";
import { IRegisterFormData } from "../../frontend-types/IRegisterFormData";

const authContext = createContext<IAuthContext>({
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  errors: [],
  alerts: [],
  mailsentmsg: null,
  register: (formData: IRegisterFormData) => Promise.resolve(),
  login: (formData: ILoginFormData) => Promise.resolve(),
  logout: () => {},
  clearErrors: () => {},
  loadUser: () => {},
  forgotPassword: (formData: { email: string }) => Promise.resolve(),
  resetPassword: (formData: { token: string; password: string }) => Promise.resolve(),
  updateDetails: (formData: { name: string; email: string }) => Promise.resolve(),
  updatePassword: (formData: { currentPassword: string; password: string }) => Promise.resolve(),
  clearAlerts: () => {},
  sendEmailVerification: (formData: { email: string }) => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
});

export default authContext;
