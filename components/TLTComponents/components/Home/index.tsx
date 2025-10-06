import { Box } from '@mui/material'
import { CategorySwiper } from '../Swiper/CategorySwiper'
import { HomeSectionTwo } from './HomeSectionTwo'
import { MostRecentlyView } from './MostRecentlyView'
import { TopPicks } from './TopPicks'
import { ArrivingSoon } from './ArrivingSoon'
import { UnlockSection } from './UnlockSection'
import { RecentlyAdded } from './RecentlyAdded'

export function HomePage({
  categoryData,
  sectionOneContent,
  sectionTwoconent,
  sectionThreeContent,
  sectionProductList,
  sectionFourContent,
  topPicksProductList,
  arrivingSoonContent,
  arrivingSoonProduct,
  unlockSectionContent,
  unlockSectionProducts,
  recentlyAddedContent,
  recentlyAddedProduct,
  homeCtadataContent,

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
      <ArrivingSoon content={arrivingSoonContent} productList={arrivingSoonProduct} />
      <UnlockSection content={unlockSectionContent} productList={unlockSectionProducts} />
      <RecentlyAdded content={recentlyAddedContent} productList={recentlyAddedProduct} />
      <div dangerouslySetInnerHTML={{ __html: homeCtadataContent }} />
    </>
  )
}
