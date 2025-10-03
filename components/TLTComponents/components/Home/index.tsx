import { Box } from '@mui/material'
import { CategorySwiper } from '../Swiper/CategorySwiper'
import { HomeSectionTwo } from './HomeSectionTwo'
import { MostRecentlyView } from './MostRecentlyView'
import { TopPicks } from './TopPicks'



export function HomePage({
  categoryData,
  sectionOneContent,
  sectionTwoconent,
  sectionThreeContent,
  sectionProductList,
  sectionFourContent,
  topPicksProductList,
}) {
  return (
    <>
      <Box component='div' className='container-wrapper'>
        <CategorySwiper swiperData={categoryData} />
        <HomeSectionTwo content={sectionOneContent} />
        <div dangerouslySetInnerHTML={{ __html: sectionTwoconent }} />
        <MostRecentlyView content={sectionThreeContent} productList={sectionProductList} />
      </Box >
      <TopPicks content={sectionFourContent} productList={topPicksProductList} />
    </>
  )
}
