import { Image } from '@graphcommerce/image'
import {
  ProductFiltersPro,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProCategorySection,
  ProductFiltersProClearAll,
  ProductFiltersProNoResults,
  ProductFiltersProSortSection,
  productListApplyCategoryDefaults,
  ProductListDocument,
  ProductListFiltersContainer,
  // ProductFiltersProAggregations,
  // productFiltersProSectionRenderer,
} from '@graphcommerce/magento-product'
import { Container, MediaQuery, memoDeep, StickyBelowHeader } from '@graphcommerce/next-ui'
import { useApolloClient } from '@apollo/client'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { iconArrowDropDown, iconArrowDropDownUp, iconFilterProduct } from '../../plugins/icons'
import mix from '../Assets/mix.svg'
import { ProductListItems } from '../ProductListItems'
import Loading from '../shared/Loading'
import type { ProductListLayoutProps } from './types'
import { useLayoutConfiguration } from './types'

export const ProductListLayoutSidebar = memoDeep((props: ProductListLayoutProps) => {
  const {
    filters,
    filterTypes,
    params,
    products,
    handleSubmit,
    category,
    title,
    menuList,
    conf,
    isSearch = false,
    isShopPage = false,
  } = props

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields } = products

  const configuration = useLayoutConfiguration(true)

  const [scroll, setScroll] = useState<boolean>(false)
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
  }, [])

  // Scroll Pagination
  // const [allPageItems, setAllPageItems] = useState<any[]>([])
  const [allPageItemsData, setAllPageItemsData] = useState<{ [page: number]: any[] }>({})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const client = useApolloClient()

  const fetchProducts = async (pageNumber) => {
    setIsLoading(true)

    const pageProducts = await client.query({
      query: ProductListDocument,
      variables: await productListApplyCategoryDefaults(
        {
          ...params,
          sort:
            !params?.sort || Object.keys(params.sort).length === 0
              ? { name: 'ASC' }
              : { ...params?.sort },
          currentPage: pageNumber,
        },
        conf,
        category,
      ),
    })

    // setAllPageItems((prev) => [
    //   ...prev,
    //   ...(pageProducts.data.products?.items ?? []),
    // ])
    setAllPageItemsData((prev: any) => ({
      ...prev,
      [pageNumber]: pageProducts.data.products?.items,
    }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (products?.items) {
      if (products?.page_info?.current_page === 1) {
        // setAllPageItems(products.items)
        setAllPageItemsData({ [products?.page_info?.current_page]: products.items })
      }
      setCurrentPage(products?.page_info?.current_page || 1)
      setTotalPage(products?.page_info?.total_pages || 1)
      setIsLoading(false)
    }
  }, [products?.items, products?.page_info?.current_page])

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && currentPage < totalPage && !isLoading) {
        setCurrentPage((prev) => prev + 1)
        await fetchProducts(currentPage + 1)
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [loaderRef.current, currentPage, totalPage, isLoading])

  const curentPath = params?.url?.split('/').filter(Boolean)

  const [expanded, setExpanded] = useState<string | false>(curentPath[0] || false)
  const handleAccordionChange = (categoryName: string) => {
    setExpanded(expanded === categoryName ? false : categoryName)
  }

  const productLength = total_count ?? 0
  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
      handleSubmit={handleSubmit}
    >
      <Container
        className='container-wrapper'
        maxWidth={false}
        sx={(theme) => ({
          [theme.breakpoints.up('xs')]: {
            gridTemplateColumns: '1fr',
          },
          '@media (max-width: 1199px) and (min-width: 769px)': {
            gridTemplateColumns: '250px 1fr',
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'minmax(280px, 350px) 1fr',
          },
          display: isSearch ? 'block' : 'grid',
          alignItems: 'start',
          rowGap: isShopPage ? '0' : { xs: 0, md: theme.spacings.md },
          columnGap: isShopPage ? '0' : { xs: '30px', md: '50px', lg: '60px' },
          mb: theme.spacings.xl,
          gridTemplateAreas: {
            xs: isShopPage ? 'items' : "'sidebar' 'horizontalFilters' 'items'",
            md: isShopPage ? 'items' : "'sidebar items'",
          },
        })}
      >
        {productLength > 0 ? (
          <Box
            sx={{
              gridArea: 'items',
              marginTop: {
                xs: isSearch ? '30px' : 0,
                md: isSearch ? '50px' : 0,
                lg: isSearch ? '60px' : 0,
              },
              '& .ProductListItemsBase-root': {
                gap: { xs: '15px', md: '20px' },
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: isSearch ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                  md: isSearch ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                  lg: isSearch ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
                  xl: isSearch ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)',
                },
              },
            }}
          >
            {products.items.length <= 0 ? (
              <ProductFiltersProNoResults search={params.search} />
            ) : (
              <>
                {Object.entries(allPageItemsData)?.map(([page, items]) => (
                  <ProductListItems
                    key={page}
                    {...products}
                    items={items}
                    loadingEager={6}
                    title={(params.search ? `Search ${params.search}` : title) ?? ''}
                    columns={configuration.columns}
                  />
                ))}
              </>
            )}
            <Box
              ref={loaderRef}
              component='div'
            >
              {isLoading && <Loading />}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: { xs: '15px', lg: '20px' },
                color: (theme) => theme.palette.custom.tltMain,
              }}
            >
              No Products Found For this Category
            </Typography>
          </Box>
        )}
        <MediaQuery
          query={(theme) => theme.breakpoints.up('md')}
          display='block'
          sx={{
            gridArea: 'sidebar',
            position: 'sticky',
            top: '100px',
            mt: { xs: '30px' },
            height: 'calc(100vh - 100px)',
          }}
        >
          <Box
            sx={{
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              pr: 1,
              pl: 1,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '& .mui-style-h8pyxy-MuiPaper-root-MuiAccordion-root': {
                '& .MuiCollapse-vertical': {
                  position: 'relative',
                  top: '-5px',
                },
              },
            }}
          >
            {!isSearch && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.custom.tltBorder1}`,
                    paddingBottom: '15px',
                    '& .MuiButtonBase-root': {
                      fontSize: { xs: '15px', md: '16px' },
                      lineHeight: 'normal',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',

                      '& picture': {
                        width: '30px',
                        height: '30px',
                      },
                    }}
                  >
                    <Image src={mix} alt='mix_alter' sx={{ width: '30px', height: '30px' }} />{' '}
                    <Typography
                      sx={{
                        fontSize: { xs: '15px', sm: '16px', md: '25px' },
                        fontWeight: 700,
                        lineHeight: '128%',
                        color: (theme: any) => theme.palette.custom.textDarkAlter2,
                      }}
                    >
                      Filter
                    </Typography>
                  </Box>

                  <ProductFiltersProClearAll
                    sx={{
                      alignSelf: 'center',
                      background: '#ffe7e7',
                      border: '1px solid #ffe7e7',
                      padding: '2px 13px',
                      borderRadius: '8px',
                      color: (theme: any) => theme.palette.custom.tltMain,
                      width: 'fit-content',
                      minWidth: 'unset',
                      fontSize: '15px',
                      '&:hover:not(.Mui-disabled)': {
                        backgroundColor: 'transparent',

                      },
                    }}
                    title='Clear'
                    menuList={menuList}
                  />
                </Box>
                {/* <ProductFiltersProAggregations renderer={productFiltersProSectionRenderer} /> */}
                <Typography
                  sx={{
                    fontSize: { xs: '15px', sm: '16px', md: '22px' },
                    fontWeight: 500,
                    lineHeight: '128%',
                    color: (theme: any) => theme.palette.custom.textDarkAlter2,
                    paddingTop: isSearch ? '0px' : '20px',
                    paddingBottom: '15px',
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.custom.tltBorder1}`,
                  }}
                >
                  Categories
                </Typography>
                {menuList
                  ?.filter((menu) => menu?.uid !== 'MTM=' && menu?.uid !== 'NDc=')
                  .map((menu, index) =>
                    menu?.children?.length > 0 ? (
                      <Box key={index}>
                        <ProductFiltersProCategorySection
                          filterIcons={iconFilterProduct}
                          category={menu}
                          params={params}
                          hideBreadcrumbs
                          urlPath={menu?.url_path}
                          categoryTitle={menu?.name}
                          expanded={expanded === menu?.name}
                          handleChange={() => handleAccordionChange(menu?.name)}
                        />
                      </Box>
                    ) : (
                      <Link href={`/${menu?.url_path}`} legacyBehavior passHref>
                        <Typography
                          sx={{
                            fontSize: { xs: '15px', sm: '16px', md: '20px' },
                            fontWeight: 400,
                            lineHeight: '120%',
                            color: (theme: any) => theme.palette.custom.dark,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            paddingBlock: '15px',
                            cursor: 'pointer',
                            borderBottom: (theme: any) =>
                              `1px solid ${theme.palette.custom.borderSecondary}`,
                          }}
                        >
                          {menu?.name}
                        </Typography>
                      </Link>
                    ),
                  )}
              </>
            )}
          </Box>
        </MediaQuery>

      </Container>
    </ProductFiltersPro >
  )
})
