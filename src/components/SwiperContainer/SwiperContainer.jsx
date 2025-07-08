import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import PropTypes from 'prop-types';
import Card from '../Card/Card.jsx'; 
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperContainer.css';

function SwiperSlider({ title, items, type }) {
  return (
    <section className="slider-section">
      <h2 className="slider-title">{title}</h2>
      <Swiper 
      className='swiper-slider'
      spaceBetween={20} 
      slidesPerView={2}
      grabCursor={true}
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
      }}>
        {items.map(item => (
          <SwiperSlide key={item.id}>
            <Card item={item} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

SwiperSlider.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['movie', 'tv']).isRequired
};

export default SwiperSlider;
