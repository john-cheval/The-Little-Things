import { Box } from '@mui/material';
import { HomeProductSwiper } from '../Swiper/HomeProductSwiper';
import type { SectionProps } from './MostRecentlyView';
import parse from 'html-react-parser';

export function RecentlyAdded({ content, productList }: SectionProps) {
  return (
    <Box component='section'
      className='container-wrapper'
      sx={{
        marginTop: { xs: '30px', md: '45px', lg: '50px', xl: '55px' },
      }}>
      {parse(content)}
      <HomeProductSwiper products={productList} />
    </Box>
  )
}