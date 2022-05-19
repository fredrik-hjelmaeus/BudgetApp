export interface alertObject {
  msg: string;
  type: string;
  id: string;
}

export interface IAlertState {
  alerts: alertObject[];
}
export interface IAlertContext extends IAlertState {
  setAlert(msg: string, type: string, timeout?: number): void;
}
