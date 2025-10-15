import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../components'
import { InnerTop } from '../components/shared/Inner/Innertop'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../utils/htmlUtils'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any }

function TermsConditionPage(props: CmsBlocksProps) {
  const { cmsBlocks } = props
  const termsConditionsContent = cmsBlocks.find((block) => block.identifier === 'terms-conditions')
  const decodedTermsConditionsContent = decodeHtmlEntities(termsConditionsContent?.content)

  return (
    <>
      <PageMeta
        title='Terms Conditions | The Little Things - Haven For Anime & Cartoon Figurine Collectibles'
        metaDescription="Unlock Worlds You've Never Seen! | The Little Things Trading LLC is a unique retail experience - with the flagship store situated in one of the biggest shopping mall in the world, The Dubai Mall - that carries a wide selection of collectible anime figurines, Manga, comics, video-gaming related products, and more!"
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/terms-conditions'
      />
      <InnerTop title={'Terms Conditions'} isFilter={false} />
      {decodedTermsConditionsContent && (
        <div dangerouslySetInnerHTML={{ __html: decodedTermsConditionsContent }} />
      )}
    </>
  )
}
TermsConditionPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default TermsConditionPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
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
      blockIdentifiers: ['terms-conditions'],
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
