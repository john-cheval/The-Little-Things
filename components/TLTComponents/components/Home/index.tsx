import { Box } from '@mui/material'
import { CategorySwiper } from '../Swiper/CategorySwiper'
import { HomeSectionTwo } from './HomeSectionTwo'
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import { TLTHomeSectionThree } from './HomeSectionThree';
import { MostRecentlyView } from './MostRecentlyView'
import { TopPicks } from './TopPicks'
import { ArrivingSoon } from './ArrivingSoon'
import { UnlockSection } from './UnlockSection'
import { RecentlyAdded } from './RecentlyAdded'

type Props = {
  categoryData: any
  sectionOneContent: string
  // sectionTwoconent: string
  sectionThreeContent: string
  sectionProductList: any
  sectionFourContent: string
  topPicksProductList: any
  arrivingSoonContent: string
  arrivingSoonProduct: any
  unlockSectionContent: string
  unlockSectionProducts: any
  recentlyAddedContent: string
  recentlyAddedProduct: any
  homeCtadataContent: string
}

export function HomePage({
  categoryData,
  sectionOneContent,
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

}: Props) {

  const cleanedSectionOneContent = DOMPurify.sanitize(sectionOneContent)
  const cleanedSectionThreeContent = DOMPurify.sanitize(sectionThreeContent)
  const cleanedSectionFourContent = DOMPurify.sanitize(sectionFourContent)
  const cleanedArrivingSoonContent = DOMPurify.sanitize(arrivingSoonContent)
  const cleanedUnlockSectionContent = DOMPurify.sanitize(unlockSectionContent)
  const cleanedRecentlyAddedContent = DOMPurify.sanitize(recentlyAddedContent)
  const cleanedHomeCtadataContent = DOMPurify.sanitize(homeCtadataContent)

  return (
    <>
      <Box component='div' className='container-wrapper'>
        <CategorySwiper swiperData={categoryData} />
        <HomeSectionTwo content={cleanedSectionOneContent} />
        <TLTHomeSectionThree />
        <MostRecentlyView content={cleanedSectionThreeContent} productList={sectionProductList} />
      </Box >
      <TopPicks content={cleanedSectionFourContent} productList={topPicksProductList} />
      <ArrivingSoon content={cleanedArrivingSoonContent} productList={arrivingSoonProduct} />
      <UnlockSection content={cleanedUnlockSectionContent} productList={unlockSectionProducts} />
      <RecentlyAdded content={cleanedRecentlyAddedContent} productList={recentlyAddedProduct} />
      {parse(cleanedHomeCtadataContent)}
    </>
  )
}

