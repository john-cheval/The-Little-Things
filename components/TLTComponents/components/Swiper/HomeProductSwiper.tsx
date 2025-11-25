import { Box } from '@mui/material';
import 'swiper/css'
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AddProductsToCartForm } from '@graphcommerce/magento-product';
import { RenderType } from '@graphcommerce/next-ui';
import { productListRenderer } from '../../../ProductListItems';

const prevButtonClass = 'swiper-top-pick-prev';
const nextButtonClass = 'swiper-top-pick-next';

export function HomeProductSwiper({ products }) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const clonedData = [...products, ...products]


  return (
    <Box component='div'
      sx={{
        marginTop: { xs: '20px', md: '30px' },
        position: 'relative',
      }}
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}>
      <Box
        className={` ${prevButtonClass} `}
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{
          // display: 'none',
          left: { xs: '-20px', lg: '-25px' },
          top: '30%',
          '&.swiper-button-disabled': {
            opacity: 0.3,
            pointerEvents: 'none',
          },
        }}
      >
        <MdKeyboardArrowLeft />
      </Box>

      <Box
        className={`${nextButtonClass}`}
        onClick={() => swiperRef.current?.slideNext()}
        sx={{
          right: { xs: '-20px', lg: '-25px' },
          top: '30%',
          '&.swiper-button-disabled': {
            opacity: 0.3,
            pointerEvents: 'none',
          },
        }}
      >
        <MdKeyboardArrowRight />
      </Box>
      <AddProductsToCartForm>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          modules={[Navigation]}
          loop
          grabCursor
          spaceBetween={14}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 4,
            },
            1500: {
              slidesPerView: 5,
            },
          }}
        >
          {clonedData?.map((item, index) => (
            <SwiperSlide key={item?.uid || `index-${index + 1}`}>
              <Box
                sx={{
                  position: 'relative',

                }}>
                <RenderType renderer={productListRenderer} {...item} productItem={item} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </AddProductsToCartForm>
    </Box>
  )
}