import React from "react";
import TrashiconSVG from "../layout/images/TrashiconSVG";
import PresetContext from "../../context/preset/presetContext";
import { IPreset } from "../../frontend-types/IPreset";

interface SavingsItemProps {
  savingsItem: IPreset;
}

const SavingsItem = ({ savingsItem }: SavingsItemProps) => {
  const { deletePreset, presets, calcSavings } = React.useContext(PresetContext);
  const [trashIconIsHover, setTrashIconIsHover] = React.useState(false);
  //on delete button hover
  const onHover = () => {
    setTrashIconIsHover(true);
  };
  //on delete button stop hover
  const stopHover = () => {
    setTrashIconIsHover(false);
  };
  const onDelete = () => {
    // TODO: if id is missing show error. Or should id be required?
    savingsItem._id && deletePreset(savingsItem._id);
  };
  React.useEffect(() => {
    presets && calcSavings();
  }, [presets]);

  return (
    <div className="card-piggy">
      <div className="no-wrap" style={{ overflow: "hidden" }}>
        {savingsItem.name}
      </div>

      <div className="flexrow-piggycard">
        <div className="px text-gray">{savingsItem.month}</div>
        <div className="px text-gray">{savingsItem.category}</div>
        <div className="text-primary px">{savingsItem.number}</div>
        <button
          className="card-piggyItem__btn"
          value="delbtn"
          onMouseEnter={onHover}
          onMouseLeave={stopHover}
          onClick={onDelete}
        >
          <TrashiconSVG fill={trashIconIsHover ? "#ec5a23" : "gray"} />
        </button>
      </div>
    </div>
  );
};
export default SavingsItem;
