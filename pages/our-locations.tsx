import { PageMeta, type GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, type LayoutNavigationProps } from '../components'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { cacheFirst } from '@graphcommerce/graphql'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { decodeHtmlEntities } from '../utils/htmlUtils'


type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any }

function OurLocationsPage(props: CmsBlocksProps) {
  const { cmsBlocks } = props
  const ourLocationContent = cmsBlocks.find((block) => block.identifier === 'our-locations')
  const decodedourLocationContentt = decodeHtmlEntities(ourLocationContent?.content)
  return (
    <>
      <PageMeta
        title='Our Locations | The Little Things - Haven For Anime & Cartoon Figurine Collectibles'
        metaDescription="Unlock Worlds You've Never Seen! | The Little Things Trading LLC is a unique retail experience - with the flagship store situated in one of the biggest shopping mall in the world, The Dubai Mall - that carries a wide selection of collectible anime figurines, Manga, comics, video-gaming related products, and more!"
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/our-locations'
      />

      {decodedourLocationContentt && (
        <div dangerouslySetInnerHTML={{ __html: decodedourLocationContentt }} />
      )}

    </>
  )

}

OurLocationsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default OurLocationsPage


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
      blockIdentifiers: ['our-locations'],
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