import { Box } from '@mui/material'
import { CategorySwiper } from '../TLTComponents/components/Swiper/CategorySwiper'
import { HomeSectionTwo } from '../TLTComponents/components/Home/HomeSectionTwo'



type Props = {
  categoryData: any
  sectionOneContent: any
}
export function HomePage({ categoryData, sectionOneContent }: Props) {
  return (
    <Box component='div' className='container-wrapper'>
      <CategorySwiper swiperData={categoryData} />
      <HomeSectionTwo content={sectionOneContent} />
      <p>hhhh</p>
    </Box>
  )
}
