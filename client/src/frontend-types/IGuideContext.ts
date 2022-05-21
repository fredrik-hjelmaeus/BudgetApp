export interface IGuideState {
  guide: null | string;
  exitedguide: boolean | null; // TODO: change to user id when true and null when false. Or it wont work same cpu but diff. users.
}

export interface IGuideContext extends IGuideState {
  setGuide: (guide: string | null) => void;
  setUserExited: (exited: boolean) => void;
}
