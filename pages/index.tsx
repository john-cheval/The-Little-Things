import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
// import { ProductListDocument } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { PageMeta } from '@graphcommerce/next-ui'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
// import { HomePage } from '../components/Home'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { HomePage } from '../components/TLTComponents/components/Home'
import { decodeHtmlEntities } from '../utils/htmlUtils'
// 
export type CmsBlocksProps = { layoutData?: any; cmsBlocks?: any; }

// export type StoryProductsProps = {
//   justInProducts?: any[]
//   statementCakesProducts: any[]
// }

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

export type CmsPageRouteProps = LayoutNavigationProps & CmsBlocksProps
function CmsPage(props: CmsPageRouteProps) {
  const { layoutData, cmsBlocks } = props


  const homesHeroData = cmsBlocks.find((block) => block.identifier === 'home-section-one')
  const HomeSectionTwo = cmsBlocks.find((block) => block.identifier === 'home-section-two')
  // const homeStoryData = cmsBlocks.find((block) => block.identifier === 'home-story-title')
  // const homeOccasionsData = cmsBlocks.find((block) => block.identifier === 'home-occasion-title')
  // const homeMinibytsData = cmsBlocks.find((block) => block.identifier === 'home-mini-bytes')
  // const homeCollectionsData = cmsBlocks.find((block) => block.identifier === 'home-collections')
  // const homeCtaData = cmsBlocks.find((block) => block.identifier === 'home-cta')
  // const homeCeleberationsData = cmsBlocks.find((block) => block.identifier === 'home-celeberation')
  // const homeImaginationData = cmsBlocks.find((block) => block.identifier === 'home-imagination')

  const decodedHomeHero = decodeHtmlEntities(homesHeroData?.content)
  const decodedHomeHomeSectionTwo = decodeHtmlEntities(HomeSectionTwo?.content)
  // const decodedHomeStory = decodeHtmlEntities(homeStoryData?.content)
  // const decodedHomeOccasions = decodeHtmlEntities(homeOccasionsData?.content)
  // const decodedHomeMinibyts = decodeHtmlEntities(homeMinibytsData?.content)
  // const decodedHomeCollections = decodeHtmlEntities(homeCollectionsData?.content)
  // const decodedHomeCta = decodeHtmlEntities(homeCtaData?.content)
  // const decodedHomeCeleberations = decodeHtmlEntities(homeCeleberationsData?.content)
  // const decodedHomeImagination = decodeHtmlEntities(homeImaginationData?.content)

  const filteredCategory = layoutData?.menu?.items?.[0]?.children
    ?.filter((item) => item?.include_in_menu === 0);

  return (
    <>
      <PageMeta
        title='The Little Things - Haven For Anime & Cartoon Figurine Collectibles'
        metaDescription="Unlock Worlds You've Never Seen! | The Little Things Trading LLC is a unique retail experience - with the flagship store situated in one of the biggest shopping mall in the world, The Dubai Mall - that carries a wide selection of collectible anime figurines, Manga, comics, video-gaming related products, and more!"
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/'
      />

      {/* <HomePage
        Categories={menu?.items[0]?.children}
        justInProductList={justInProducts}
        justinHeading={decodedHomeHeroJustIn}
        statementProducts={statementCakesProducts}
        storyTitle={decodedHomeStory}
        occasionTitle={decodedHomeOccasions}
        miniBytesTitle={decodedHomeMinibyts}
        CollectionSectionData={decodedHomeCollections}
        homeCta={decodedHomeCta}
        homeCeleberate={decodedHomeCeleberations}
        homeImagination={decodedHomeImagination}
        homeHeroData={decodedHomeHero}
      /> */}
      <HomePage
        categoryData={filteredCategory}
        sectionOneContent={decodedHomeHero}
        sectionTwoconent={decodedHomeHomeSectionTwo}
      />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  // const url = (await conf).data.storeConfig?.cms_home_page ?? 'home'

  // const cmsPageQuery = staticClient.query({
  //   query: cmsPageDocument,
  //   variables: {
  //     urlKey: url,
  //   },
  // })

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: [
        'home-section-one',
        'home-section-two',
      ],
    },
  })

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  // const JustInQuery = await staticClient.query({
  //   query: ProductListDocument,
  //   variables: {
  //     pageSize: 10,
  //     currentPage: 1,
  //     filters: {
  //       category_id: { eq: '3' },
  //     },
  //   },
  // })

  // const statementCakesQuery = await staticClient.query({
  //   query: ProductListDocument,
  //   variables: {
  //     pageSize: 10,
  //     currentPage: 1,
  //     filters: {
  //       category_id: { eq: '22' },
  //     },
  //   },
  // })

  // const result = await cmsPageQuery
  // const cmsPage = result.data.cmsPage
  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items
  // const justInProducts = (await JustInQuery).data?.products?.items
  // const statementCakesProducts = (await statementCakesQuery).data.products?.items
  const layoutData = (await layout)?.data

  return {
    props: {
      // cmsPage: cmsPage,
      cmsBlocks,
      // justInProducts,
      // statementCakesProducts,
      ...(await layout).data,
      layoutData,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
