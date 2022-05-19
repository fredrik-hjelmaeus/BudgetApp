import React from "react";
import TrashiconSVG from "../layout/images/TrashiconSVG";

interface TrashDeleteButtonProps {
  onDelete: () => void;
  onTrashHover: () => void;
  stopTrashHover: () => void;
  TrashHover: boolean;
}

const TrashDeleteButton = ({
  onDelete,
  onTrashHover,
  stopTrashHover,
  TrashHover,
}: TrashDeleteButtonProps) => {
  return (
    <button
      className="btn-trashicon"
      onClick={onDelete}
      onMouseEnter={onTrashHover}
      onMouseLeave={stopTrashHover}
      value="trashicon"
      name="trashicon"
      data-testid="purchase_item_delete_button"
    >
      {TrashHover === true ? (
        <TrashiconSVG fill="red" />
      ) : (
        <TrashiconSVG fill="var(--gray-color)" />
      )}
    </button>
  );
};
export default TrashDeleteButton;
