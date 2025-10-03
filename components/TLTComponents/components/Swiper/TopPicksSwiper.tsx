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


const prevButtonClass = 'swiper-top-pick-prev';
const nextButtonClass = 'swiper-top-pick-next';

export function TopPickSwiper({ productList }) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const clonedData = [...productList, ...productList]

  return (
    <Box
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      sx={{
        position: 'relative',
        '& .swiper': {
          overflow: 'visible',
        },
      }}
    >
      <Box
        className={prevButtonClass}
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{
          left: '-25px',
          '&.swiper-button-disabled': {
            opacity: 0.3,
            pointerEvents: 'none',
          },
        }}
      >
        <MdKeyboardArrowLeft />
      </Box>

      <Box
        className={nextButtonClass}
        onClick={() => swiperRef.current?.slideNext()}
        sx={{
          right: '20px',
          '&.swiper-button-disabled': {
            opacity: 0.3,
            pointerEvents: 'none',
          },
        }}
      >
        <MdKeyboardArrowRight />
      </Box>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Navigation]}
        loop
        grabCursor
        spaceBetween={21}
        navigation={{
          prevEl: `.${prevButtonClass}`,
          nextEl: `.${nextButtonClass}`,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2.5,
            spaceBetween: 7,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 4.5,
          },
          1500: {
            slidesPerView: 5.2,
          },
        }}
      >

        {clonedData?.map((item, index) => {
          const firsttThreeCards = index === 0 || index === 1 || index === 2
          return (
            <SwiperSlide key={`index-${index + 1}`} style={{
              position: 'relative',
            }}>
              <Box >
                <Box component='div' className='gradient-border' >
                  <Image src={item?.small_image?.url} alt={item?.name} width={250} height={150} />
                </Box>
                <Typography component='p' sx={{
                  color: '#070707',
                  textAlign: 'left',
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 500,
                  lineHeight: '140%',
                  overflow: 'hidden',
                  marginTop: '15px',
                }}>
                  {item?.name}
                </Typography>
                <Box sx={{
                  position: 'absolute',
                  top: { xs: '-50px', md: firsttThreeCards ? '-55px' : '-30px' },
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}>
                  {firsttThreeCards && (
                    <Image src={crownImage} alt='crownImage' width={24} height={24} sx={{
                      marginBottom: '0px',
                      maxWidth: '24px',
                      height: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                    }} />
                  )}
                  <Typography component='span' sx={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: { xs: '20px', md: '25px' },
                    fontWeight: 700,
                    lineHeight: 'normal',
                    backgroundColor: '#FF7300',
                    width: { xs: '30px', md: '50px' },
                    height: { xs: '30px', md: '50px' },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #D90F13',
                  }}>{index + 1}</Typography>
                </Box>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box >
  )
}