import 'swiper/css'
import { Image } from '@graphcommerce/image'
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Box, Link } from '@mui/material'

type SwiperProps = {
  swiperData: any
}
export function CategorySwiper({ swiperData }: SwiperProps) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const clonedData = [...swiperData, ...swiperData]
  return <Box component='div'
    sx={{
      marginTop: { xs: '30px' },
    }}
    onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
    onMouseLeave={() => swiperRef.current?.autoplay?.start()}>
    <Swiper onSwiper={(swiper) => {
      swiperRef.current = swiper
    }}
      modules={[Autoplay]}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      spaceBetween={16}
      breakpoints={{
        0: {
          slidesPerView: 5.5,
          spaceBetween: 7,
        },
        768: {
          slidesPerView: 6.5,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 7.5,
        },
        1500: {
          slidesPerView: 9.5,
        },
      }}
      grabCursor
    >
      {clonedData?.map((item, index) => (
        item?.image && (
          <SwiperSlide key={item?.uid || index + 1}>
            <Link href={`/${item?.url_path}`}>
              <Image src={item?.image} alt={item?.name} width={135} height={120} sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                maxWidth: '130px',
              }} />
            </Link>
          </SwiperSlide>
        )
      ))}

    </Swiper>
  </Box>
}