import React from "react";
import { IPiggybank } from "../../frontend-types/IPiggybank";
import TrashiconSVG from "../layout/images/TrashiconSVG";

interface PiggyItemProps {
  piggyItem: IPiggybank;
  onPiggyItemDelete: (piggyItemId: string | undefined) => void;
}

const PiggyItem = ({ piggyItem, onPiggyItemDelete }: PiggyItemProps) => {
  const [trashIconIsHover, setTrashIconIsHover] = React.useState(false);
  //on delete button hover
  const onHover = () => {
    setTrashIconIsHover(true);
  };
  //on delete button stop hover
  const stopHover = () => {
    setTrashIconIsHover(false);
  };

  return (
    <div className="card-piggy card-piggyItem">
      <div className="no-wrap card-piggyItem__month">{piggyItem.month}</div>
      <div className="flexrow-piggycard">
        <div className="px text-gray">{piggyItem.year}</div>
        <div className="text-primary px">{piggyItem.savedAmount}</div>
        <button
          className="card-piggyItem__btn"
          value="delbtn"
          onMouseEnter={onHover}
          onMouseLeave={stopHover}
          onClick={() => onPiggyItemDelete(piggyItem.id)}
        >
          <TrashiconSVG fill={trashIconIsHover ? "#ec5a23" : "gray"} />
        </button>
      </div>
    </div>
  );
};
export default PiggyItem;
