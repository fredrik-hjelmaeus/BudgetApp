export interface IGuideState {
  guide: null | string;
  exitedguide: boolean | null;
}

export interface IGuideContext extends IGuideState {
  setGuide: (guide: string | null) => void;
  setUserExited: (exited: boolean) => void;
}
