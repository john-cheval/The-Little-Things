import { Box } from '@mui/material'
import { CategorySwiper } from '../Swiper/CategorySwiper'
import { HomeSectionTwo } from './HomeSectionTwo'


type Props = {
  categoryData: any
  sectionOneContent: any
  sectionTwoconent: any
}
export function HomePage({ categoryData, sectionOneContent, sectionTwoconent }: Props) {
  return (
    <Box component='div' className='container-wrapper'>
      <CategorySwiper swiperData={categoryData} />
      <HomeSectionTwo content={sectionOneContent} />
      <div dangerouslySetInnerHTML={{ __html: sectionTwoconent }} />
    </Box >
  )
}
