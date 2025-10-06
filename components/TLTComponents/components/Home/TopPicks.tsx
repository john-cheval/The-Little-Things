import { Box } from '@mui/material';
import { TopPickSwiper } from '../Swiper/TopPicksSwiper';

export function TopPicks({ content, productList }) {
  return (
    <>
      <Box component='section'
        className='container-wrapper'
        sx={{
          marginTop: { xs: '20px', md: '30px', lg: '50px' },
        }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
      <Box sx={{
        marginTop: { xs: '20px', md: '50px' },
        paddingLeft: { xs: '18px', md: '25px', lg: '55px' },
      }}>
        <TopPickSwiper productList={productList} />
      </Box>
    </>
  )
}