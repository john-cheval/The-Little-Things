import 'swiper/css'
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Box, Link, Typography } from '@mui/material'
import gradient from '../../assets/gradients/gradient2.svg'
import { Image } from '@graphcommerce/image';


type SwiperProps = {
  swiperData: any
}
export function UnlockSwiper({ swiperData }: SwiperProps) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const clonedData = [...swiperData, ...swiperData]
  return <Box component='div'
    sx={{
      marginTop: { xs: '30px' },
      '& .swiper-wrapper': {
        alignItems: 'flex-end',
      },
      '& .swiper': {
        overflowY: 'visible',
      },
      '& .swiper-slide': {
        paddingBottom: '25px',
      },
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
          slidesPerView: 3,
          spaceBetween: 7,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 6,
        },
        1500: {
          slidesPerView: 8,
        },
      }}
      grabCursor
    >
      {clonedData?.map((item, index) => (
        <SwiperSlide key={item?.uid || index + 1}>
          <Link href={`/${item?.url_key}`}>
            <Box sx={{
              position: 'relative',
              background: `url(${gradient.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
              // backgroundPosition: 'center 50px',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Image src={item?.small_image?.url} alt={item?.name} width={135} height={120} sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                // maxWidth: '130px',
              }} />
              <Typography className='unlock-title' >{item?.name}</Typography>
            </Box>

          </Link>
        </SwiperSlide>

      ))}

    </Swiper>
  </Box >
}