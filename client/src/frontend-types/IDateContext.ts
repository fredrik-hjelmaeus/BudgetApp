export interface IDateState {
  dateList: Array<string | number>;
}
export interface IDateContext extends IDateState {
  setDate: (dateListArray: Array<string | number>) => void;
}
