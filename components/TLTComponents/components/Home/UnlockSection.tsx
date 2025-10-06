import { Box } from '@mui/material';
import { UnlockSwiper } from '../Swiper/UnlockSwiper';

export function UnlockSection({ content, productList }) {
  return (
    <Box component='section'
      className='container-wrapper'
      sx={{
        marginBlock: { xs: '20px', md: '65px' },
      }}>
      <Box
        sx={{
          borderBottom: '1px solid #C2C2C2',
          paddingBottom: { xs: '20px', md: '65px' },
        }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <UnlockSwiper swiperData={productList} />
      </Box>
    </Box>
  )
}