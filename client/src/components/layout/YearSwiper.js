import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Savings from '../presets/Savings';
import YearBalance from '../presets/YearBalance';
import Expense from '../presets/Expense';
import Income from '../presets/Income';
const YearSwiper = ({ yearsummary }) => {
  return (
    <Swiper
      spaceBetween={100}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      classsName='yearswiper year-bg'
    >
      <SwiperSlide classsName='yearswiper__slide'>{yearsummary === 'balance' && <YearBalance />}</SwiperSlide>
      <SwiperSlide classsName='yearswiper__slide'>{yearsummary === 'expense' && <Expense />}</SwiperSlide>
      <SwiperSlide classsName='yearswiper__slide'>{yearsummary === 'income' && <Income />}</SwiperSlide>
      <SwiperSlide classNsame='yearswiper__slide'>{yearsummary === 'savings' && <Savings />}</SwiperSlide>
    </Swiper>
  );
};

export default YearSwiper;
