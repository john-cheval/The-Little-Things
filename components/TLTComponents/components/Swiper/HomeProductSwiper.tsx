import { Box, Typography } from '@mui/material';
import 'swiper/css'
import { Image } from '@graphcommerce/image'
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import 'swiper/css/effect-fade'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import crownImage from '../../assets/Home/crown.svg'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AddProductsToCartForm } from '@graphcommerce/magento-product';
import { RenderType } from '@graphcommerce/next-ui';
import { productListRenderer } from '../../../ProductListItems';

export function HomeProductSwiper({ products }) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const clonedData = [...products, ...products]


  return (
    <Box component='div'
      sx={{
        marginTop: { xs: '20px', md: '30px' },
      }}
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}>
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
              spaceBetween: 7,
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