import React from "react";
import DeleteSVG from "../layout/images/DeleteSVG";

import { INewPreset } from "../../../../new-client/src/frontend-types/INewPreset";
import AddSVG from "../../../../new-client/src/components/layout/images/AddSVG";

interface DeleteButtonProps {
  name: string;
  onDelete: () => void;
  onHover: () => void;
  stopHover: () => void;
  localpreset: INewPreset;
  DelbtnColor: boolean;
}

const DeleteButton = ({
  name,
  onDelete,
  onHover,
  stopHover,
  localpreset,
  DelbtnColor,
}: DeleteButtonProps) => {
  return (
    <button
      className="btn text-primary modal-csvpresets__deletebtnadjust"
      value="delbtn"
      name={name}
      onMouseEnter={onHover}
      onMouseLeave={stopHover}
      onClick={onDelete}
      data-testid="deleteCsvPresetBtn"
    >
      {localpreset.markdelete === true ? (
        DelbtnColor === true ? (
          <AddSVG color="var(--success-color)" />
        ) : (
          <AddSVG color="var(--primary-color)" />
        )
      ) : DelbtnColor === true ? (
        <DeleteSVG fill="var(--danger-color)" />
      ) : (
        <DeleteSVG fill="var(--primary-color)" />
      )}
    </button>
  );
};
export default DeleteButton;
