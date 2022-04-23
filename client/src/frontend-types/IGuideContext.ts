export interface IGuideState {
  guide: null | string;
  exitedguide: boolean;
}

export interface IGuideContext extends IGuideState {
  setGuide: (guide: string) => void;
  setUserExited: (exited: boolean) => void;
}
