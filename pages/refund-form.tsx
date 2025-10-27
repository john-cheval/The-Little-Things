import { PageMeta, type GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, type LayoutNavigationProps } from '../components'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { cacheFirst } from '@graphcommerce/graphql'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { RefundFormPage } from '../components/TLTComponents/components/RefundForm/RefundFormPage'
import { decodeHtmlEntities } from '../utils/htmlUtils'


type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any }

export function RefundRequestformPage(props: CmsBlocksProps) {
  const { cmsBlocks } = props
  const formContent = cmsBlocks.find((block) => block.identifier === 'refund-request-form')
  const decodedFormContent = decodeHtmlEntities(formContent?.content)
  return (
    <>
      <PageMeta
        title='Refund Request Form | The Little Thzings - Haven For Anime & Cartoon Figurine Collectibles'
        metaDescription="Unlock Worlds You've Never Seen! | The Little Things Trading LLC is a unique retail experience - with the flagship store situated in one of the biggest shopping mall in the world, The Dubai Mall - that carries a wide selection of collectible anime figurines, Manga, comics, video-gaming related products, and more!"
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/refund-form'
      />

      <RefundFormPage content={decodedFormContent} />
    </>
  )
}

RefundRequestformPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default RefundRequestformPage


export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: ['refund-request-form'],
    },
  })

  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items

  return {
    props: {
      ...(await layout).data,
      cmsBlocks,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}