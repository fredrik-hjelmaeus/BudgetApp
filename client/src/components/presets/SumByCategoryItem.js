import React, { useContext } from 'react';
import PresetContext from '../../context/preset/presetContext';

const SumByCategoryItem = ({ catsumitem }) => {
  const presetContext = useContext(PresetContext);

  return (
    <div className='card bg-light'>
      <h4 className={catsumitem.SumOfCat > 0 ? 'text-primary' : 'text-danger'}>
        {catsumitem.cat}:{'    '}
        {catsumitem.SumOfCat}
        <br />
        {presetContext.year && 'Montly Avg: '}
        {presetContext.year && parseInt(parseFloat(catsumitem.SumOfCat / 12))}
      </h4>
    </div>
  );
};

export default SumByCategoryItem;
