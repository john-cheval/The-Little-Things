import { Box } from '@mui/material';
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { homeSctionThree } from '../../../../constants/Home';
import Image from 'next/image';


export function TLTHomeSectionThree() {
  const swiperRef = useRef<SwiperCore | null>(null)
  return (
    <Box
      component='section'
      sx={{
        marginTop: { xs: '10px', sm: '15px', md: '25px', lg: '35px' },
      }}
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}>

      <Swiper
        onSwiper={(swiper) => {
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
            slidesPerView: 2,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
        grabCursor
      >

        {homeSctionThree?.map((item, index) => (
          <SwiperSlide key={`index-${index + 1}`}>
            <Box className="offer-container">
              <p>{item?.title}</p>
              {/* <img src="{{media u rl=.renditions/catalog/category/Pages/Home/popmart.png}}" alt="image1" /> */}
              <Image src={item?.image} alt={item?.title} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}