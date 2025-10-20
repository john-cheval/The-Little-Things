import { Box } from '@mui/material';
import { TopPickSwiper } from '../Swiper/TopPicksSwiper';
import parse from 'html-react-parser';
import type { SectionProps } from './MostRecentlyView';


export function TopPicks({ content, productList }: SectionProps) {
  return (
    <>
      <Box component='section'
        className='container-wrapper top_Picks'
        sx={{
          marginTop: { xs: '20px', md: '30px', lg: '50px' },
        }}>
        {parse(content)}
      </Box>
      <Box sx={{
        marginTop: { md: '20px', lg: '50px' },
        paddingLeft: { xs: '18px', md: '25px', lg: '55px' },
      }}>
        <TopPickSwiper productList={productList} />
      </Box>
    </>
  )
}