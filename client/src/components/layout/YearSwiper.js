import React from 'react';
import Savings from '../presets/Savings';
import YearBalance from '../presets/YearBalance';
import Expense from '../presets/Expense';
import Income from '../presets/Income';
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
//import { SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
//###### Swiper 6
// swiper bundle styles
//import 'swiper/swiper-bundle.min.css';

// swiper core styles
//import 'swiper/swiper.min.css';

// modules styles
//import 'swiper/components/navigation/navigation.min.css';
//import 'swiper/components/pagination/pagination.min.css';
//Swiper.use([Navigation, Pagination, Scrollbar, A11y]);
// ##########

// Note: This is not linked directly to library. Will break on update.
// This is just the required css i grabbed from node_modules
//import '../../Swiper-bundle.css';
//import 'swiper/css';
//import 'swiper/swiper.scss';
//import 'swiper/swiper.min.css';
//import 'swiper/modules/navigation/navigation.css'; // Navigation module
//import 'swiper/modules/pagination/pagination.css'; // Pagination module

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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
      // scrollbar={{ draggable: true }}
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
