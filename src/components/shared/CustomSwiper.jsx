import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { slidesArrayGenerator } from '../../services/slidesArrayGenerator'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperNavBtn from './SwiperNavBtn';
import Img from './Img';

export default function CustomSwiper({selectImgHandler}) {
    
  const slidesArray= slidesArrayGenerator(151,50)

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#000000',
          '--swiper-pagination-color': '#000000',
        }}

        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        keyboard={{
          enabled: true,
        }}

        modules={[Keyboard, Pagination, Navigation]}
        className="h-95 max-sm:h-70"
        onSlideChange={(swiper)=>{
          selectImgHandler(swiper.activeIndex + 151 )}}
        onSwiper={(swiper) => {
          swiper.update}}

      >  
        {slidesArray.map(imageId=>
        <SwiperSlide key={imageId}>
          <Img imageId={imageId}/>
        </SwiperSlide>)}
        <SwiperNavBtn/>
      </Swiper>
      
    </>
  );
}
