import React, { useContext } from 'react';
import DonutChart from '../layout/DonutChart';
import PresetContext from '../../context/preset/presetContext';
import GuideContext from '../../context/guide/guideContext';
import CssContext from '../../context/css/cssContext';
import Scroll from 'react-scroll';

const Expense = () => {
  const presetContext = useContext(PresetContext);
  const { categorysumonlyposnumbyyear, categorynameonlyposnumbyyear } = presetContext;
  const { dimensions } = useContext(CssContext);
  const YearExpense = categorysumonlyposnumbyyear.reduce((a, b) => a + b, 0);
  const yearmonthavg = parseInt(parseFloat(YearExpense / 12));
  //colors set here so expense and income can have different colors in their chart
  const colors = [
    '#8a0d2d',
    '#c81d49',
    '#fe352e',
    '#fa5326',
    '#f9621b',
    '#fd8209',
    '#eebb6c',
    '#dc67ab',
    '#dc6788',
    '#ec5362',
    '#ef4141',
    '#ef6a41',
    '#ef8741',
    '#f2ae4e',
    '#f6e365',
    '#abd951',
    '#9ded76',
    '#9ded77',
    '#76ed98',
    '#76edc2',
    '#67cec3',
    '#6ec5d2',
  ];

  // Scroll for guide
  const { guide } = useContext(GuideContext);
  const scroller = Scroll.scroller;
  const Element = Scroll.Element;

  const scrollToElement = () => {
    scroller.scrollTo('myScrollToElement', {
      duration: 1500,
      delay: 100,
      smooth: true,
    });
  };

  React.useEffect(
    () => {
      if (guide === '15' && dimensions.width > 800) {
        scrollToElement();
      }
    }, // eslint-disable-next-line
    [guide, dimensions]
  );

  return (
    <div>
      <div className={guide === '15' ? 'expense__card bold guide__expense__card' : 'expense__card bold'}>
        <div style={{ margin: '0 0 1rem 0' }}>
          <DonutChart sums={categorysumonlyposnumbyyear} names={categorynameonlyposnumbyyear} colors={colors} />
        </div>
        <div className='donuttitle'>Income</div>
        <div className='flexrow'>
          <div className='flexcolumn'>
            <div className='flexrow'>
              <div>Year Income: </div>
              <div className={'text-success px'}>{YearExpense}</div>
            </div>
            <div className='flexrow'>
              <div>Monthly Average: </div>
              <Element name='myScrollToElement'></Element>
              <div className={'text-success px'}>{yearmonthavg}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Expense;
