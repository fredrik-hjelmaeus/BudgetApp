import React from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

// Note: This is not linked directly to library. Will break on update.
// This is just the required css i grabbed from node_modules
import '../../Swiper-bundle.css';

import Savings from '../presets/Savings';
import YearBalance from '../presets/YearBalance';
import Expense from '../presets/Expense';
import Income from '../presets/Income';

const YearSwiper = ({ guide, yearsummary, setYearSummary }) => {
  const swipeRef = React.useRef(null);

  // Updates tab when swiping
  const onSwipe = (index) => {
    switch (index) {
      case 0:
        setYearSummary('balance');
        break;
      case 1:
        setYearSummary('expense');
        break;
      case 2:
        setYearSummary('income');
        break;
      case 3:
        setYearSummary('savings');
        break;
      default:
    }
  };
  // used in the guide to swipe when mobile
  React.useEffect(() => {
    if (guide) {
      yearsummary === 'balance' && swipeRef.current.swiper.slideTo(0);
      yearsummary === 'expense' && swipeRef.current.swiper.slideTo(1);
      yearsummary === 'income' && swipeRef.current.swiper.slideTo(2);
      yearsummary === 'savings' && swipeRef.current.swiper.slideTo(3);
    }
  }, [yearsummary, guide]);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      ref={swipeRef}
      spaceBetween={100}
      slidesPerView={1}
      //navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={(swiper) => onSwipe(swiper.activeIndex)}
      className='yearswiper year-bg'
    >
      <SwiperSlide>{yearsummary === 'balance' && <YearBalance />}</SwiperSlide>
      <SwiperSlide>{yearsummary === 'expense' && <Expense />}</SwiperSlide>
      <SwiperSlide>{yearsummary === 'income' && <Income />}</SwiperSlide>
      <SwiperSlide>{yearsummary === 'savings' && <Savings />}</SwiperSlide>
    </Swiper>
  );
};

export default YearSwiper;
