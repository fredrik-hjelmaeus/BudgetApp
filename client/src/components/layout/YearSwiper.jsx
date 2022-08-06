import React from "react";
import Savings from "../presets/Savings";
import YearBalance from "../presets/YearBalance";
import Expense from "../presets/Expense";
import Income from "../presets/Income";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
import "swiper/css";

const YearSwiper = ({
  // guide,
  yearsummary,
  setYearSummary,
}) => {
  // const swipeRef = React.useRef<Swiper>();

  // Updates tab when swiping
  const onSwipe = (index) => {
    switch (index) {
      case 0:
        setYearSummary("balance");
        break;
      case 1:
        setYearSummary("expense");
        break;
      case 2:
        setYearSummary("income");
        break;
      case 3:
        setYearSummary("savings");
        break;
      default:
    }
  };
  // used in the guide to swipe when mobile
  /* React.useEffect(() => {
    if (guide) {
      yearsummary === 'balance' && swipeRef?.current?.swiper.slideTo(0);
      yearsummary === 'expense' && swipeRef.current.swiper.slideTo(1);
      yearsummary === 'income' && swipeRef.current.swiper.slideTo(2);
      yearsummary === 'savings' && swipeRef.current.swiper.slideTo(3);
    }
  }, [yearsummary, guide]);  */

  return (
    <>
      <Swiper
        className="yearswiper year-bg"
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={({ snapIndex }) => onSwipe(snapIndex)}
      >
        <SwiperSlide>
          <YearBalance />
        </SwiperSlide>
        <SwiperSlide>{yearsummary === "expense" && <Expense />}</SwiperSlide>
        <SwiperSlide>{yearsummary === "income" && <Income />}</SwiperSlide>
        <SwiperSlide>{yearsummary === "savings" && <Savings />}</SwiperSlide>
      </Swiper>
    </>
  );
};

export default YearSwiper;
