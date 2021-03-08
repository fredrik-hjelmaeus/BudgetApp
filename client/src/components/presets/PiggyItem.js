import React from 'react';
import TrashiconSVG from '../layout/images/TrashiconSVG';

const PiggyItem = ({ piggyItem, onPiggyItemDelete }) => {
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
    <div className='card-piggy card-piggyItem'>
      <div className='no-wrap card-piggyItem__month'>{piggyItem.month}</div>
      <div className='flexrow-piggycard'>
        <div className='px text-gray'>{piggyItem.year}</div>
        <div className='text-primary px'>{piggyItem.savedAmount}</div>
        <button value='delbtn' onMouseEnter={onHover} onMouseLeave={stopHover} onClick={() => onPiggyItemDelete(piggyItem._id)}>
          <TrashiconSVG name={piggyItem.month} fill={trashIconIsHover ? 'blue' : 'gray'} />
        </button>
      </div>
    </div>
  );
};
export default PiggyItem;
