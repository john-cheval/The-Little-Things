import { Box } from '@mui/material';
import { HomeProductSwiper } from '../Swiper/HomeProductSwiper';

export function RecentlyAdded({ content, productList }) {
  return (
    <Box component='section'
      className='container-wrapper'
      sx={{
        marginTop: { xs: '20px', md: '65px' },
      }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <HomeProductSwiper products={productList} />
    </Box>
  )
}