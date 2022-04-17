export interface IAuthContext {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: object | null;
  errors: Array<string>;
  alerts: Array<string>;
  mailsentmsg: string | null;
  register(token: string, user: object): void;
  login(token: string, user: object): void;
  logout(): void;
  clearErrors(): void;
  loadUser(): void;
  forgotPassword(email: string): void;
  resetPassword(token: string, password: string): void;
  updateDetails(details: object): void;
  updatePassword(password: string): void;
  clearAlerts(): void;
}
