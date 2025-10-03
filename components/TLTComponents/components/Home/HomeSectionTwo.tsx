
import { Box } from '@mui/material'
import { HomeHeroSwiper } from '../Swiper/HomeHeroSwiper'



export function HomeSectionTwo({ content }) {
  return (
    <Box sx={{
      paddingTop: { xs: '20px', md: '35px' },
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      columnGap: { xs: '10px', md: '16px' },
    }}>
      <Box sx={{
        gridColumn: { xs: 'span 12', md: 'span 7' },
      }}>
        <HomeHeroSwiper />
      </Box>

      <Box sx={{
        gridColumn: { xs: 'span 12', md: 'span 5' },
        width: '100%',
      }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    </Box>
  )
}