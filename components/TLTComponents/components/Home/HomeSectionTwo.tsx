
import { Box } from '@mui/material'
import { HomeHeroSwiper } from '../Swiper/HomeHeroSwiper'



export function HomeSectionTwo({ content }) {
  return (
    <Box sx={{
      paddingTop: { xs: '10px', sm: '15px', md: '35px' },
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      columnGap: { xs: '10px', md: '16px' },
    }}>
      <Box sx={{
        gridColumn: { xs: 'span 12', lg: 'span 7' },
      }}>
        <HomeHeroSwiper />
      </Box>

      <Box sx={{
        gridColumn: { xs: 'span 12', lg: 'span 5' },
        width: '100%',
        marginTop: { xs: '16px', lg: 0 },
      }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
    </Box>
  )
}