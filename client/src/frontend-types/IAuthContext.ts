import { ILoginFormData } from "./ILoginFormData";
import { IRegisterFormData } from "./IRegisterFormData";

export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  errors: any[];
  alerts: Array<string>;
  mailsentmsg: string | null;
}

export interface IAuthContext extends IAuthState {
  register(formData: IRegisterFormData): Promise<void>;
  login(formData: ILoginFormData): Promise<void>;
  logout(): void;
  clearErrors(): void;
  loadUser(): void;
  forgotPassword(formData: { email: string }): Promise<void>;
  resetPassword(formData: { token: string; password: string }): Promise<void>;
  updateDetails(details: object): void;
  updatePassword(formData: { currentPassword: string; password: string }): Promise<void>;
  clearAlerts(): void;
}
