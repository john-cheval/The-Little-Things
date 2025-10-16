import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  cacheFirst,
  mergeDeep,
  PrivateQueryMaskProvider,
  useApolloClient,
  usePrivateQuery,
} from '@graphcommerce/graphql'
import { CartStartCheckout, useCartQuery } from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import type { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import {
  AddProductsToCartButton,
  AddProductsToCartForm,
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductListDocument,
  ProductListPrice,
  ProductPageAddToCartActionsRow,
  ProductPageBreadcrumbs,
  productPageCategory,
  ProductPageGallery,
  ProductPageJsonLd,
  ProductPageMeta,
  ProductPageName,
  ProductShortDescription,
} from '@graphcommerce/magento-product'
import { defaultConfigurableOptionsSelection } from '@graphcommerce/magento-product-configurable'
import { jsonLdProductReview } from '@graphcommerce/magento-review'
import { redirectOrNotFound, StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistIconButton } from '@graphcommerce/magento-wishlist'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { OverlayStickyBottom } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, Button, Link, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { GetStaticPaths } from 'next'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutNavigation } from '../../components'
import { AddProductsToCartView } from '../../components/ProductView/AddProductsToCartView'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { linkStyle } from '../../components/shared/swiper/ProductSwiper'
import RelativeProductListMobile from '../../components/shared/swiper/RelatedProdcutSwiperMobile'
import { RelativeProductSwiper } from '../../components/shared/swiper/RelativeproductSwiper'
import { fontSize } from '../../components/theme'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { ProductPage2Document } from '../../graphql/ProductPage2.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'
import { AnimatePresence } from 'framer-motion'
import CustomisedCakeForm from '../../components/Form/CustomisedCakeForm'
import { IoMdArrowForward, IoMdStar } from 'react-icons/io'
import { MdLocalFireDepartment } from 'react-icons/md';
import tabbyImage from './assets/tabby.png'
import tamaraImage from './assets/tamara.png'
import Image from 'next/image'
import { IoBagHandleOutline } from 'react-icons/io5'
// import { Image } from '@graphcommerce/image'



export type CmsBlocksProps = { cmsBlocks?: any }

export type Props = ProductPage2Query &
  CmsBlocksProps &
  Pick<AddProductsToCartFormProps, 'defaultValues'> & { urlKey: string }

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductPage(props: Props) {
  const { defaultValues, urlKey, cmsBlocks } = props
  const weOfferContent = cmsBlocks?.find((block) => block.identifier === 'detail-page-we-offer')
  const paymentMethodContent = cmsBlocks?.find((block) => block.identifier === 'product-detail-payment-method')


  const decodedWeOfferContent = decodeHtmlEntities(weOfferContent?.content)
  const decodedpaymentMethodContent = decodeHtmlEntities(paymentMethodContent?.content)

  // const [openContactForm, setOpenContactheme.palette.custom.tltBorder4tForm] = useState(false)

  const scopedQuery = usePrivateQuery(
    ProductPage2Document,
    { variables: { urlKey, useCustomAttributes: import.meta.graphCommerce.magentoVersion >= 247 } },
    props,
  )
  const { products, relatedUpsells } = scopedQuery.data
  // const client = useApolloClient()
  // const [isLoading, setIsLoading] = useState(false)
  // const [relatedProducts, setRelatedProducts] = useState<any>([])
  const [isBuyNow, setIsBuyNow] = useState<boolean>(false)

  const product = mergeDeep(
    products?.items?.[0],
    relatedUpsells?.items?.find((item) => item?.uid === products?.items?.[0]?.uid),
  )
  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const { data } = cart
  // const hasError = Boolean(error)
  const cartItems = data?.cart?.items
  // const hasItems =
  //   (data?.cart?.total_quantity ?? 0) > 0 &&
  //   typeof data?.cart?.prices?.grand_total?.value !== 'undefined'
  const isLargeScreen = useMediaQuery('(max-width:1250px)')



  if (!product?.sku || !product.url_key) return null



  // const fetchProducts = async (categoryId) => {
  //   setIsLoading(true)

  //   const pageProducts = await client.query({
  //     query: ProductListDocument,
  //     variables: {
  //       pageSize: 10,
  //       currentPage: 1,
  //       filters: {
  //         category_id: { eq: categoryId },
  //       },
  //     },
  //   })
  //   setRelatedProducts([...(pageProducts.data.products?.items ?? [])])
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   if (product?.categories && product.categories.length > 0) {
  //     const categoryId = product.categories[0]?.id
  //     if (categoryId) {
  //       fetchProducts(String(categoryId))
  //     }
  //   }
  // }, [])

  const matchedCartItem = cartItems?.find((cart) => cart?.product?.sku === product?.sku)

  // console.log(product, '==>this is the product')

  return (
    <>
      <PrivateQueryMaskProvider mask={scopedQuery.mask}>
        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            flexDirection: 'column',
            paddingInline: { xs: '18px', md: '25px' },
            marginBottom: { xs: '15px', md: '30px' },

          }}
        >
          <Typography
            variant='h3'
            component='div'
            gutterBottom
            sx={{
              color: (theme: any) => theme.palette.custom.dark,
              fontWeight: 400,
              lineHeight: '120%',
              margin: 0,
            }}
          >
            <ProductPageName product={product} />
          </Typography>
          <ProductListPrice
            {...product.price_range.minimum_price}
            sx={{
              borderBottom: '1px solid rgba(199, 202, 205, 0.42)',
              paddingBottom: { xs: '0', md: '5px' },

              '& .ProductListPrice-finalPrice .MuiBox-root:nth-child(1)': {
                marginRight: '2px',
              },
              '& .ProductListPrice-finalPrice .MuiBox-root:not(:nth-child(1))': {
                ...fontSize(25, 40),
              },
            }}
          />
        </Box>
        <AddProductsToCartForm
          key={product.uid}
          defaultValues={defaultValues}
          sx={{
            marginTop: { xs: '30px', md: '60px' },
            '& .SidebarGallery-row': {
              marginBottom: {
                xs: product?.related_products?.length === 0 ? '30px' : 0,
                md: product?.related_products?.length === 0 ? '50px' : 0,
              },
            },
            '& .SidebarGallery-scrollerContainer': {
              // overflow: 'hidden',
              // height: 'unset',
              '& .Scroller-root .MotionImageAspect picture': {
                aspectRatio: 'unset !important',
                overflow: 'hidden',
                borderRadius: '3px',
                // top: 0,
                // transform: 'translate(-50%, 0%)',
                border: theme => `1px solid ${theme.palette.custom.tltBorder4}`,
                '& img': {
                  transform: 'none !important',
                  borderRadius: '0',
                  // width: 'unset',
                  // height: 'unset',
                  margin: '0 auto',
                },
              },
              '& .SidebarGallery-bottomCenter': {
                bottom: { xs: '20px', md: '30px', lg: isLargeScreen ? '100px' : '50px', xl: '-100px' },

                '& .ScrollerThumbnail-thumbnail  img': {
                  minHeight: { xs: '50px', lg: '70px' },
                },
              },
            },
            '& .SidebarGallery-sidebarWrapper ': {
              alignContent: 'unset',
              height: '100%',
            },
            '& .SidebarGallery-sidebarWrapper .SidebarGallery-sidebar': {
              padding: 0,
              '& .ActionCardLayout-root': {
                display: 'flex',
                flexWrap: 'wrap',
                '& .ActionCard-root': {
                  padding: '15px 20px ',

                  '& .ActionCard-rootInner': {
                    '& .ActionCard-image ': {
                      paddingRight: '8px',
                      '& img': {
                        minWidth: '12px',
                        width: '100%',
                        height: '100%',
                        borderRadius: 0,
                      },
                    },
                    '& .ActionCard-title': {
                      color: (theme) => theme.palette.custom.smallHeading,
                      fontSize: { xs: '15px', md: '16px' },
                      // fontWeight: 600,
                    },
                  },
                },
              },
              '& .mui-style-1v4a0za': {
                flexDirection: { xs: 'row', lg: 'column' },
                alignItems: { xs: 'center', lg: 'flex-start' },
                columnGap: { xs: '10px', lg: '0px' },
                rowGap: { xs: '0px', lg: '10px' },
                '& svg': {
                  fontSize: '20px',
                },
              },
            },
            '& .SidebarGallery-row.breakoutLeft': {
              paddingLeft: { xs: '18px', md: '25px', lg: '55px' },

              '& .SidebarGallery-root': {
                display: { xs: 'block', lg: 'grid' },
                columnGap: { xs: 0, md: '20px', lg: '30px', xl: '50px' },
              },
            },
          }}
          isBuyNow={isBuyNow}
        >
          <ProductPageJsonLd
            product={product}
            render={(p) => ({
              '@context': 'https://schema.org',
              ...jsonLdProduct(p),
              ...jsonLdProductOffer(p),
              ...jsonLdProductReview(p),
            })}
          />

          <ProductPageMeta product={product} />

          <ProductPageBreadcrumbs
            className='container-wrapper'
            product={product}
            isProduct
            sx={{
              color: '#747474',
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: 400,
              lineHeight: '120%',
              marginBottom: { xs: '10px', md: '15px' },
              '& li': {
                overflow: 'hidden',
              },

            }}

          />

          <ProductPageGallery
            product={product}
            sx={{
              '& .SidebarGallery-sidebar': {
                display: 'grid',
              },
            }}
            disableSticky
            wishlistButton={
              <Box
                sx={{
                  position: 'absolute',
                  right: { xs: '20px', sm: '15px', lg: '40px' },
                  top: { xs: '20px', sm: '15px', lg: '40px' },
                  zIndex: 1000,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  display: { xs: 'flex', lg: 'flex' },
                }}
              >
                <ProductWishlistIconButton
                  {...product}
                  sx={{
                    height: '40px',
                    width: '40px',
                  }}
                />
              </Box>
            }
          >
            <Box
              sx={{
                flexGrow: 1,
                overflowY: 'scroll',
                overflowX: 'hidden',
                paddingBottom: { xs: '15px', md: '30px', lg: '35px' },

                '&::-webkit-scrollbar': {
                  display: 'none',
                  width: 0,
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-track': {
                  display: 'none',
                },
                '&::-webkit-scrollbar-thumb': {
                  display: 'none',
                },

                // --- Hide scrollbar for Firefox ---
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', lg: 'flex' },
                  flexDirection: 'column',
                  // rowGap: '3px',
                  marginTop: { xs: '10px', md: '20px' },
                }}
              >
                {product?.categories && product?.categories?.length > 0 && (
                  <Typography
                    sx={(theme) => ({
                      color: theme.palette.custom.tltSecondary,
                      fontSize: '16px',
                      fontWeight: 500,
                      lineHeight: '120%',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                    })}>
                    {product?.categories?.[0]?.name}
                  </Typography>
                )}

                <Typography
                  component='h1'
                  sx={(theme) => ({
                    color: theme.palette.custom.dark,
                    fontSize: { xs: '20px', md: '25px', lg: '30px', xl: '35px' },
                    fontWeight: 700,
                    lineHeight: '128%',
                    marginTop: { xs: '10px', md: '15px' },
                  })}
                >
                  <ProductPageName product={product} />
                </Typography>

                {product?.sku && (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: { xs: '10px', md: '15px', lg: '20px' },
                  }}>
                    <Typography
                      component='h1'
                      sx={(theme) => ({
                        color: theme.palette.custom.dark,
                        fontSize: { xs: '15px', md: '16px' },
                        lineHeight: '128%',

                        backgroundColor: theme.palette.custom.tltlGray2,
                        borderRadius: '3px',
                        padding: '5px 10px',
                      })}
                    >
                      sku: {product?.sku}
                    </Typography>

                    {/* {product?.rating_summary > 0 && ( */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}>
                      <IoMdStar color='#D90F13' size={20} />
                      <Typography
                        component='p'
                        sx={(theme) => ({
                          color: theme.palette.custom.dark,
                          fontSize: { xs: '15px', md: '16px' },
                          display: 'flex',
                          gap: '3px',
                        })}
                      >
                        <span>{Number(product?.rating_summary || 4.0).toFixed(1)}</span>
                        <span>({product?.rating_summary || 17}  Reviews)</span>
                      </Typography>
                    </Box>
                    {/* )} */}
                  </Box>
                )}

                {/* {product?.only_x_left_in_stock && product?.only_x_left_in_stock >= 3 && ( */}
                <Box
                  sx={{
                    background: 'linear-gradient(90deg, #B4001A 0%, #D90F13 100%)',
                    borderRadius: '3px',
                    padding: { xs: '5px 10px', md: '10px 15px' },
                    marginTop: { xs: '20px', md: '30px' },
                  }}>
                  <Typography sx={{
                    color: '#fff',
                    display: 'flex',
                    alingItens: 'center',
                    gap: '5px',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '120%',
                  }}>
                    <MdLocalFireDepartment
                      color='#FFFFFF'
                      size={20} />
                    Grab it before its gone!{product?.only_x_left_in_stock || 3} units left in stock!</Typography>

                </Box>
                {/* )} */}

                <Box
                  sx={{
                    marginTop: { xs: '20px', md: '25px', lg: '30px' },
                    paddingBottom: { xs: '20px', md: '25px', lg: '30px' },
                    borderBottom: '1px solid rgba(199, 202, 205, 0.42)',

                  }}
                >
                  <AddProductsToCartView product={product} />
                </Box>
              </Box>

              {/* Static Content (need to integare API) */}
              <Box sx={{
                marginTop: { xs: '15px', md: '25px' },
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: '5px', md: '10px' },
                  }}>
                  <Typography
                    sx={{
                      border: (theme) => `1px solid ${theme.palette.custom.tltBorder4}`,
                      borderRadius: '3px',
                      padding: { xs: '10px', md: '13px' },
                      color: (theme) => theme.palette.custom.dark,
                      fontSize: { xs: '16px', md: '18px' },
                      lineHeight: '127%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: '10px', md: '20px' },

                    }}>
                    <Image src={tabbyImage} alt='tabbyImage' />
                    Split your purchase into monthly payments. Learn more
                  </Typography>
                  <Typography
                    sx={{
                      border: (theme) => `1px solid ${theme.palette.custom.tltBorder4}`,
                      borderRadius: '3px',
                      padding: { xs: '10px', md: '13px' },
                      color: (theme) => theme.palette.custom.dark,
                      fontSize: { xs: '16px', md: '18px' },
                      lineHeight: '127%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: '10px', md: '20px' },

                    }}>
                    <Image src={tamaraImage} alt='tamaraImage' />
                    Or split in 4 payments of AED 249.75 No late fees, Sharia compliant! Learn more
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: (theme) => theme.palette.custom.dark,
                    fontSize: { xs: '16px', md: '18px' },
                    fontWeight: 500,
                    lineHeight: '127%',
                    marginTop: { xs: '10px', md: '20px' },
                  }}>
                  Tax included. <Link href='/checkout' sx={{
                    color: (theme) => theme.palette.custom.dark,
                  }}>Shipping</Link> calculated at checkout.
                </Typography>
              </Box>
            </Box>

            <OverlayStickyBottom
              sx={{
                py: 0.1,
                backgroundColor: '#fff',
                zIndex: 99999,
                position: 'static',
                // bottom: 'unset !important',
                '& .CartTotals-root ': {
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                },
                flexShrink: 0,
                // mt: 'auto',
              }}
            >
              <ProductPageAddToCartActionsRow
                product={product}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: 'row' },
                  columnGap: { xs: '10px', sm: '10px', md: '15px' },
                  alignItems: { xs: 'center', lg: 'end' },
                  rowGap: { xs: '10px', md: 0 },
                  width: '100%',
                  '& .MuiBox-root': {
                    width: { xs: '100%', sm: '100%' },
                    paddingRight: 0,
                  },
                  '& .MuiBox-root .MuiButtonBase-root': {
                    width: '100%',
                  },
                  '& .CartStartCheckout-checkoutButtonContainer': {
                    marginBlock: 0,
                  },
                  '& form': {
                    width: '100% !important',
                  },
                }}
              >

                <AddProductsToCartButton
                  onClick={() => setIsBuyNow(false)}
                  product={product}
                  sx={{
                    width: '100%',
                    justifyContent: 'start',
                    borderRadius: '3px',
                    boxShadow: 'none !important',
                    padding: '8px',
                    backgroundColor: theme => theme.palette.custom.tltMain,
                    '& span': {
                      color: theme => theme.palette.custom.tltMain,
                      backgroundColor: theme => theme.palette.custom.tltContrastText,
                      padding: '10px',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: theme => `1px solid ${theme.palette.custom.tltContrastText}`,
                      transition: 'all 0.4s ease-in-out',
                    },
                    '& .MuiTypography-body1': {
                      color: theme => theme.palette.custom.tltContrastText,
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: 700,
                      lineHeight: '120%',
                      textTransform: 'uppercase',
                      width: '100%',
                      transition: 'all 0.4s ease-in-out',
                    },
                    '&:hover span': {
                      border: theme => `1px solid ${theme.palette.custom.tltMain}`,
                    },
                    '&:hover .MuiTypography-body1': {
                      color: theme => theme.palette.custom.tltMain,
                    },
                  }}
                >
                  <span>
                    <IoBagHandleOutline />
                  </span>

                  <Typography>
                    Add to Cart
                  </Typography>
                </AddProductsToCartButton>

                <Box
                  sx={(theme) => ({
                    width: '100% !important',
                    '& button': {
                      backgroundColor: theme.palette.custom.tltSecondary,
                      borderRadius: '3px',
                      boxShadow: 'none !important',
                      width: '100%',
                      height: '100%',
                      flexGrow: 1,
                      padding: '8px',
                      justifyContent: 'start',
                      '& span': {
                        color: theme.palette.custom.tltSecondary,
                        backgroundColor: theme.palette.custom.tltContrastText,
                        padding: '10px',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${theme.palette.custom.tltContrastText}`,
                        transition: 'all 0.4s ease-in-out',
                      },
                      '& .MuiTypography-body1': {
                        color: theme.palette.custom.tltContrastText,
                        textAlign: 'center',
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '120%',
                        textTransform: 'uppercase',
                        width: '100%',
                        transition: 'all 0.4s ease-in-out',
                      },
                      '&:hover span': {
                        border: `1px solid ${theme.palette.custom.tltSecondary}`,
                      },
                      '&:hover .MuiTypography-body1': {
                        color: theme.palette.custom.tltSecondary,
                      },
                    },
                  })}
                >
                  {matchedCartItem ? (
                    <Link href='/checkout'>
                      <Button>
                        <span>
                          <IoMdArrowForward />
                        </span>
                        <Typography>
                          Proceed to Buy
                        </Typography>
                      </Button>
                    </Link>
                  ) : (
                    <AddProductsToCartButton
                      product={product}
                      onClick={() => setIsBuyNow(true)}
                    >
                      <span>
                        <IoMdArrowForward />
                      </span>
                      <Typography>
                        Proceed to Buy
                      </Typography>
                    </AddProductsToCartButton>
                  )}
                </Box>
              </ProductPageAddToCartActionsRow>
            </OverlayStickyBottom>

            {/* Static Content */}
            <Box sx={{
              marginTop: { xs: '10px', md: '20px', lg: '25px' },
            }}>
              <div dangerouslySetInnerHTML={{ __html: decodedWeOfferContent }} />
              <Box
                component='div'
                className='product_payments'
                sx={{
                  borderTop: theme => `1px solid ${theme.palette.custom.tltBorder2}`,
                  paddingTop: { xs: '10px', md: '20px', lg: '25px' },
                  marginTop: { xs: '10px', md: '20px', lg: '25px' },
                  '& p': {
                    color: theme => theme.palette.custom.textDarkAlter2,
                    fontSize: { xs: '17px', md: '18px' },
                    fontWeight: 500,
                    lineHeight: '120%',
                    margin: 0,
                    marginBottom: { xs: '10px', md: '15px', lg: '15px' },
                  },
                  '& div.card-wrappers': {
                    display: 'flex',
                    gap: { xs: '5px', md: '10px' },

                    '& img': {
                      maxWidth: '65px',
                      height: 'auto',
                      border: theme => `1px solid ${theme.palette.custom.tltBorder4}`,
                      borderRadius: '3px',
                    },
                  },
                }}>

                <div dangerouslySetInnerHTML={{ __html: decodedpaymentMethodContent }} />
              </Box>
            </Box>
          </ProductPageGallery>
        </AddProductsToCartForm>

        {/* Relative Products */}
        {/* {relatedProducts && relatedProducts?.length > 0 && (
          <Box
            sx={{
              paddingInline: { xs: '18px', md: '25px', lg: '55px' },
              paddingTop: { xs: '30px' },
              paddingBottom: { xs: '30px', md: '45px', lg: '50px' },
            }}
            component='section'
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'space-between' },
                alignItems: 'center',
                //  marginBottom: { xs: '10px', md: '20px' },
                paddingBottom: { xs: '20px', md: '20px', lg: '30px' },
              }}
            >
              {decodedRelativeProductsTitle && (
                <div dangerouslySetInnerHTML={{ __html: decodedRelativeProductsTitle }} />
              )}

              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Link href={`/${relatedProducts[0]?.categories[0]?.url_key}`} css={linkStyle}>
                  View All
                </Link>
              </Box>
            </Box>

            <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
              <RelativeProductSwiper productList={relatedProducts} />
            </Box>

            <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
              <RelativeProductListMobile count={4} productList={relatedProducts ?? []} />
            </Box>
          </Box>
        )} */}
      </PrivateQueryMaskProvider>
      {/* <AnimatePresence>
        {openContactForm && <CustomisedCakeForm key="custom-cake-form" setIsOpen={setOpenContactForm} product={product?.sku} uid={product?.uid} />}
      </AnimatePresence> */}
    </>
  )
}

ProductPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getProductStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { locale, params } = context
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPage2Document,
    variables: { urlKey, useCustomAttributes: import.meta.graphCommerce.magentoVersion >= 247 },
  })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const product = productPage.then((pp) =>
    pp.data.products?.items?.find((p) => p?.url_key === urlKey),
  )

  if (!(await product)) return redirectOrNotFound(staticClient, conf, params, locale)

  const category = productPageCategory(await product)
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: '/', title: i18n._(/* i18n */ 'Home') }

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: [
        // 'relative-products',
        'detail-page-we-offer',
        'product-detail-payment-method',
      ],
    },
  })

  const cmsBlocks = (await cmsPageBlocksQuery)?.data?.cmsBlocks?.items

  return {
    props: {
      urlKey,
      cmsBlocks,
      ...defaultConfigurableOptionsSelection(urlKey, client, (await productPage).data),
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
