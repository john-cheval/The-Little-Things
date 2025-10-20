import { Box } from '@mui/material';
import { HomeProductSwiper } from '../Swiper/HomeProductSwiper';
import type { SectionProps } from './MostRecentlyView';
import parse from 'html-react-parser';

export function ArrivingSoon({ content, productList }: SectionProps) {
  return (
    <Box component='section'
      className='container-wrapper '
      sx={{
        marginTop: { xs: '30px', md: '45px', lg: '50px', xl: '65px' },
      }}>
      <Box
        sx={{
          borderBlock: '1px solid #C2C2C2',
          paddingTop: { xs: '25px', md: '30px', lg: '40px', xls: '50px' },
          paddingBottom: { xs: '25px', md: '45px', lg: '50px', xls: '60px' },
        }}>
        {parse(content)}
        <HomeProductSwiper products={productList} />
      </Box>
    </Box>
  )
}