import { Box } from '@mui/material';
import { UnlockSwiper } from '../Swiper/UnlockSwiper';
import type { SectionProps } from './MostRecentlyView';
import parse from 'html-react-parser';

export function UnlockSection({ content, productList }: SectionProps) {
  return (
    <Box component='section'
      className='container-wrapper'
      sx={{
        marginBlock: { xs: '20px', sm: '30px', md: '35px', lg: '50px', xl: '55px' },
      }}>
      <Box
        sx={{
          borderBottom: '1px solid #C2C2C2',
          paddingBottom: { xs: '20px', md: '35px', lg: '40px', xl: '50px' },
          '& .main-heading': {
            maxWidth: { xs: '80%', md: '100%' },
          },
        }}>
        {parse(content)}
        <UnlockSwiper swiperData={productList} />
      </Box>
    </Box>
  )
}