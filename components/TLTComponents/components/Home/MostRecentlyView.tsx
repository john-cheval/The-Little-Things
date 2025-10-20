import { Box, Link } from '@mui/material';
import gradientOne from '../../assets/gradients/gradient1.svg'
import { Image } from '@graphcommerce/image';
import parse from 'html-react-parser';
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef } from 'react';

type Props = {
  content: string
  productList: any
}


export function MostRecentlyView({ content, productList }: Props) {
  const swiperRef = useRef<SwiperCore | null>(null)
  return (
    <Box component='section'
      sx={{
        marginTop: { xs: '25px', md: '30px', xls: '40px', xl: '45px' },
        borderBottom: '1px solid #c2c2c2',
        paddingBottom: { xs: '25px', sm: '30px', md: '40px', lg: '85px' },
      }}>

      {parse(content)}

      <Box sx={{
        marginTop: { xs: '20px', md: '40px' },
        // display: 'grid',
        // gridTemplateColumns: { xs: 'repeat(1,1fr)', md: 'repeat(5,1fr)' },
        // columnGap: { xs: '20px', md: '30px' },
      }}

      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={25}
          slidesPerView={5}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 11,
            },
            550: {
              slidesPerView: 2.4,
              spaceBetween: 11,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
          }}
        >
          {productList?.map((item, index) => (
            <SwiperSlide key={`index-${index + 1}`}>
              <Box
                component='div'
                sx={{
                  position: 'relative',
                  background: `url(${gradientOne.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% auto',
                  backgroundPosition: 'center 50px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Image src={item?.small_image?.url} alt={item?.name} width={250} height={330} />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '-15px', md: '-15px' },
                    left: '50%',
                    transform: 'translate(-50%,0)',
                  }}>
                  <Link href='/shop'
                    component='a'
                    className='linkButton'
                    sx={{
                      marginTop: { xs: '0px', md: '15px' },

                    }}><span>Shop Now</span></Link>
                </Box>
              </Box>
            </SwiperSlide>
          ))}

        </Swiper>
      </Box>
    </Box>
  )
}