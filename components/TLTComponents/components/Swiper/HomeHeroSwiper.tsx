import { Box, Link, Typography } from '@mui/material';
import 'swiper/css'
import { Image } from '@graphcommerce/image'
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import image1 from '../../assets/Home/1.png'
import image2 from '../../assets/Home/2.png'



export function HomeHeroSwiper() {
  const swiperRef = useRef<SwiperCore | null>(null)
  const swiperData = [image1, image2]
  return (
    <Box sx={{
      height: '100%',
      '& .swiper': {
        height: '100%',
      },
    }}
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Autoplay, EffectFade]}
        effect='fade'
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        grabCursor
      >
        {swiperData?.map((item, index) => (
          <SwiperSlide key={`index-${index + 1}`}>
            <Box sx={{
              position: 'relative',
              height: '100%',
              '& img': {
                borderRadius: '3px',
                height: '100%',
              },
            }}>
              <Image src={item} alt={`image-${index + 1}`} width={900} height={500} />
              <Box sx={{
                position: 'absolute',
                top: { xs: '20px', md: index === 0 ? '35%' : '50%' },
                left: { xs: '30%', md: index === 0 ? '61%' : '50%' },
                transform: {
                  xs: 'translate(0,0)', md: index === 0 ? '' : 'translate(-50%,-50%)',
                },
              }
              } >
                {index === 0 ? (
                  <Box>
                    <Typography sx={{
                      fontSize: { xs: '20px', md: '30px', lg: '40px' },
                      color: '#fff',
                      fontWeight: 700,
                      lineHeight: '120%',
                      textTransform: 'uppercase',
                    }}>
                      Explore Banpresto
                      Collections
                    </Typography>
                    <Link href='/shop' component='a' className='linkButton' sx={{
                      marginTop: { xs: '20px', md: '15px' },

                    }}><span>Shop Now</span></Link>
                  </Box>
                ) : (
                  <Link href='/shop' component='a' className='linkButton'>Shop Now</Link>
                )}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box >
  )
}