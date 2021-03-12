import React from 'react';
import TrashiconSVG from '../layout/images/TrashiconSVG';
import PresetContext from '../../context/preset/presetContext';

const CapitalItem = ({ capitalItem }) => {
  const { deletePreset, presets, calcCapital } = React.useContext(PresetContext);
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
    deletePreset(capitalItem._id);
  };
  React.useEffect(() => {
    presets && calcCapital();
  }, [presets]);
  return (
    <div className='card-piggy'>
      <div className='no-wrap' style={{ overflow: 'hidden' }}>
        {capitalItem.name}
      </div>

      <div className='flexrow-piggycard'>
        <div className='px text-gray'>{capitalItem.year}</div>
        <div className='px text-gray'>{capitalItem.month}</div>
        <div className='px text-gray'>{capitalItem.category}</div>
        <div className='text-primary px'>{capitalItem.number}</div>
        <button value='delbtn' onMouseEnter={onHover} onMouseLeave={stopHover} onClick={onDelete}>
          <TrashiconSVG name={capitalItem.name} fill={trashIconIsHover ? 'blue' : 'gray'} />
        </button>
      </div>
    </div>
  );
};
export default CapitalItem;
