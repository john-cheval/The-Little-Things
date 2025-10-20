import { Box } from '@mui/material'
import { CategorySwiper } from '../Swiper/CategorySwiper'
import { HomeSectionTwo } from './HomeSectionTwo'
import DOMPurify from 'isomorphic-dompurify';
// import parse from 'html-react-parser';
import { TLTHomeSectionThree } from './HomeSectionThree';
import { MostRecentlyView } from './MostRecentlyView'
import { TopPicks } from './TopPicks'
// import { ArrivingSoon } from './ArrivingSoon'
// import { UnlockSection } from './UnlockSection'
// import { RecentlyAdded } from './RecentlyAdded'

type Props = {
  categoryData: any
  sectionOneContent: string
  // sectionTwoconent: string
  sectionThreeContent: string
  sectionProductList: any
  sectionFourContent: string
  topPicksProductList: any
}

export function HomePage({
  categoryData,
  sectionOneContent,
  // sectionTwoconent,
  sectionThreeContent,
  sectionProductList,
  sectionFourContent,
  topPicksProductList,
  // arrivingSoonContent,
  // arrivingSoonProduct,
  // unlockSectionContent,
  // unlockSectionProducts,
  // recentlyAddedContent,
  // recentlyAddedProduct,
  // homeCtadataContent,

}: Props) {

  const cleanedSectionOneContent = DOMPurify.sanitize(sectionOneContent)
  const cleanedSectionThreeContent = DOMPurify.sanitize(sectionThreeContent)
  const cleanedSectionFourContent = DOMPurify.sanitize(sectionFourContent)

  return (
    <>
      <Box component='div' className='container-wrapper'>
        <CategorySwiper swiperData={categoryData} />
        <HomeSectionTwo content={cleanedSectionOneContent} />
        <TLTHomeSectionThree />
        <MostRecentlyView content={cleanedSectionThreeContent} productList={sectionProductList} />
      </Box >
      <TopPicks content={cleanedSectionFourContent} productList={topPicksProductList} />
      {/*    <ArrivingSoon content={arrivingSoonContent} productList={arrivingSoonProduct} />
      <UnlockSection content={unlockSectionContent} productList={unlockSectionProducts} />
      <RecentlyAdded content={recentlyAddedContent} productList={recentlyAddedProduct} />
      <div dangerouslySetInnerHTML={{ __html: homeCtadataContent }} /> */}
      <p> this si the HomePage</p>
    </>
  )
}
