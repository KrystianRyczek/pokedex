import { useSwiper } from "swiper/react"

export default function SwiperNavBtn(){
    const swiper = useSwiper()
    const swipperBoxStyle="w-full flex absolute top-50 right-0 z-999 justify-between"
    const buttonStyle ="bg-stone-200 rounded-full"
    const iconStyle="w-16 max-sm:w-12 h-16 max-sm:h-12 p-3 flex"
    const pathStyle="scale-120 max-sm:scale-70 rounded-full"

    return(
        <div className={swipperBoxStyle}>
          <button 
            className={buttonStyle} 
            type='button' 
            onClick={()=>swiper.slidePrev()}
          >
            <svg className={iconStyle}>
                <path 
                  className={pathStyle} 
                  d="M6.746 17.5l11.393 11.392-2.139 2.108-15-15 15-15 2.139 2.108-11.393 11.392h24.254v3h-24.254z"
                />
            </svg>
          </button>
          <button 
            className={buttonStyle} 
            type='button' 
            onClick={()=>swiper.slideNext()}
          >
            <svg className={iconStyle}>
                <path 
                  className={pathStyle} 
                  d="M25.254 14.5l-11.393-11.393 2.138-2.107 15 15-15 15-2.139-2.108 11.392-11.392h-24.254v-3h24.254z"
                />
            </svg>
          </button>
        </div>
    )
}