import { Box } from '@mui/material';
import { HomeProductSwiper } from '../Swiper/HomeProductSwiper';

export function ArrivingSoon({ content, productList }) {
  return (
    <Box component='section'
      className='container-wrapper'
      sx={{
        marginTop: { xs: '20px', md: '65px' },
      }}>
      <Box
        sx={{
          borderBlock: '1px solid #C2C2C2',
          paddingTop: { xs: '30px', md: '50px' },
          paddingBottom: { xs: '20px', md: '65px' },
        }}>

        <div dangerouslySetInnerHTML={{ __html: content }} />
        <HomeProductSwiper products={productList} />
      </Box>
    </Box>
  )
}