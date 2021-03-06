import React from 'react';
import TrashiconSVG from '../layout/images/TrashiconSVG';
import PresetContext from '../../context/preset/presetContext';

const SavingsItem = ({ savingsItem }) => {
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
    deletePreset(savingsItem._id);
  };
  React.useEffect(() => {
    presets && calcSavings();
  }, [presets]);
  return (
    <div className='card-piggy'>
      <div className='no-wrap' style={{ overflow: 'hidden' }}>
        {savingsItem.name}
      </div>{' '}
      <div className='flexrow-piggycard'>
        <div className='px text-gray'>{savingsItem.category}</div>

        <div className='text-primary px'>{savingsItem.number}</div>
        <button value='delbtn' onMouseEnter={onHover} onMouseLeave={stopHover} onClick={onDelete}>
          <TrashiconSVG name={savingsItem.name} fill={trashIconIsHover ? 'blue' : 'gray'} />
        </button>
      </div>
    </div>
  );
};
export default SavingsItem;
