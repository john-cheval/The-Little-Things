import { Box, Link, Typography } from '@mui/material';
import { Image } from '@graphcommerce/image'
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import crownImage from '../../assets/Home/crown.svg'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
// import Image from 'next/image';


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
          overflowY: { xs: 'hidden', md: 'visible' },
          // overflowX: 'hidden',
        },
      }}
    >
      <Box
        className={`top-picks-arrows ${prevButtonClass} `}
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{
          display: 'none',
          left: '-25px',
          top: '50%',
          '&.swiper-button-disabled': {
            opacity: 0.3,
            pointerEvents: 'none',
          },
        }}
      >
        <MdKeyboardArrowLeft />
      </Box>

      <Box
        className={`top-picks-arrows ${nextButtonClass}`}
        onClick={() => swiperRef.current?.slideNext()}
        sx={{
          right: '20px',
          top: '50%',
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
            slidesPerView: 2.2,
            spaceBetween: 7,
          },
          // 0: {
          //   slidesPerView: 2.2,
          //   spaceBetween: 7,
          // },
          768: {
            slidesPerView: 3.2,
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
              // overflowY: 'visible',
            }}>
              <Link href={`/${item?.url_key}`} sx={{
                position: 'relative',
                cursor: 'pointer',
                textDecoration: 'none',

              }}>
                <Box component='div' className='top-picks gradient-border' sx={{
                  marginTop: { xs: '40px', lg: '50px' },
                  backdropFilter: { xs: 'blur(3.75px)', md: 'none' },
                  position: 'realtive',
                }} >
                  <Image src={item?.small_image?.url} alt={item?.name} width={250} height={150}
                  // style={{
                  //   width: '100%',
                  //   height: 'auto',
                  //   objectFit: 'cover',
                  // }} 
                  />

                  <Typography
                    sx={{
                      width: { xs: '25px', sm: '30px' },
                      height: { xs: '25px', sm: '30px' },
                      borderRadius: '50%',
                      border: '1px solid #D0011F',
                      color: '#FFF',
                      fontWeight: 700,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      backgroundColor: '#D0011FB8',
                      fontFamily: "'Inter', sans-serif",
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      zIndex: 1000,
                      display: { xs: 'flex', md: 'none' },
                    }}>
                    {index + 1}
                  </Typography>
                </Box>
                <Typography component='p' sx={{
                  color: '#070707',
                  textAlign: 'left',
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: { xs: 500, md: 500 },
                  lineHeight: '140%',
                  overflow: 'hidden',
                  marginTop: '15px',
                  maxWidth: { xs: '80%', md: '100%' },
                }}>
                  {item?.name}
                </Typography>
                <Box sx={{
                  position: 'absolute',
                  top: { xs: '-50px', md: firsttThreeCards ? '0px' : '20px', lg: firsttThreeCards ? '0px' : '20px' },
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: { xs: 'none', md: 'block' },
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
                    fontSize: { xs: '20px', lg: '25px' },
                    fontWeight: 700,
                    lineHeight: 'normal',
                    backgroundColor: '#FF7300',
                    width: { xs: '30px', lg: '50px' },
                    height: { xs: '30px', lg: '50px' },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #D90F13',

                  }}>{index + 1}</Typography>
                </Box>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box >
  )
}