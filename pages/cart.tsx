import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCartErrorAlert,
  CartTotals,
  getCartDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { CartCrosssellsScroller, CartItemsActionCards } from '@graphcommerce/magento-cart-items'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  Button,
  FullPageMessage,
  LayoutOverlayHeader,
  LayoutTitle,
  OverlayStickyBottom,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, Divider, Link, Typography, useMediaQuery } from '@mui/material'
import type { LayoutOverlayProps } from '../components'
import { LayoutOverlay, productListRenderer } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'
import { iconDelete } from '../plugins/icons'
import { useClearCart } from '../hooks/useClearCart'
import { IoBagHandleOutline } from 'react-icons/io5'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function CartPage() {
  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const { error, data } = cart
  // const hasError = Boolean(error)
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'

  const cartQuantity = data?.cart?.total_quantity ?? 0
  const {
    submit: handleClearCart,
    // formState,
    // error: clearCartError
  } = useClearCart();

  const isSmallScreen = useMediaQuery('(max-width:450px)')

  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'Cart ({0})', { 0: data?.cart?.total_quantity ?? 0 })}
        metaRobots={['noindex']}
      />
      <LayoutOverlayHeader
        sx={{

          '& .MuiButtonBase-root svg': {
            color: (theme: any) => theme.palette.custom.textDarkAlter,
            fontSize: { xs: '25px', lg: '28px' },
          },
          '& .LayoutHeaderContent-center': {
            opacity: '1 !important',
            justifySelf: 'flex-start',
            px: 2,
          },
          '& .LayoutHeaderContent-right': {
            position: 'absolute',
            top: '-50px',
            right: '20px',
            '.MuiButtonBase-root': {
              background: 'transparent',
              boxShadow: 'none',
              color: (theme) => theme.palette.custom.textDarkAlter,
              '&:hover': {
                background: 'transparent',
                boxShadow: 'none',
              },
              '&:active': {
                background: 'transparent',
                boxShadow: 'none',
              },
              '&:focus': {
                background: 'transparent',
                boxShadow: 'none',
              },
            },
          },
        }}
        divider={
          <Container>
            <Divider
              sx={{
                background: (theme) => theme.palette.custom.tltBorder2,
                borderColor: (theme) => `1px solid ${theme.palette.custom.tltBorder2}`,
              }} />
          </Container>
        }
      >
        <LayoutTitle size='small' component='span'
          sx={{
            '& span': {
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              justifyContent: 'space-between',
              width: '100%',
            },
          }}>
          <Typography component='span' className='main-heading-2'>
            Cart
          </Typography>

          {cartQuantity > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '5px',
              }}>
              <Typography
                component='p'
                sx={{
                  backgroundColor: (theme: any) => theme.palette.custom.tltlGray2,
                  borderRadius: '3px',
                  color: (theme: any) => theme.palette.custom.tltGray1,
                  textAlign: 'center',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 'normal',
                  padding: '3px 9px',
                }}>{cartQuantity} {cartQuantity === 1 ? 'Product' : 'Products'}</Typography>

              <Typography
                component='p'

                sx={{
                  backgroundColor: '#FFF0F3',
                  borderRadius: '3px',
                  color: '#D0011F',
                  textAlign: 'center',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 'normal',
                  padding: '3px 12px',
                  cursor: 'pointer',

                }}
                // onClick={() => {
                //   console.log('==> clicked')
                //   handleClearCart
                // }}
                onClick={handleClearCart}
              >Clear</Typography>
            </Box>
          )}
        </LayoutTitle>
      </LayoutOverlayHeader >

      <WaitForQueries
        waitFor={cart}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {hasItems ? (
          <>
            <Container
              // maxWidth='md'
              sx={{
                flexGrow: 1,
                minHeight: 'calc(100vh - 360px)',

                overflowY: 'scroll',
                // overflowX: 'hidden',
                pr: { xs: '15px', sm: '20px' },
                paddingBottom: '50px',
                pl: { xs: '15px', sm: '20px', lg: '30px' },

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
              <CartItemsActionCards
                removeIcon={iconDelete}
                cart={data.cart}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  '& .ActionCard-image': {
                    '& picture': {
                      width: { xs: '120px', sm: '140px', md: '160px' },
                    },
                    '& img': {
                      borderRadius: '3px',
                      marginRight: '10px',
                      width: '100%',
                      height: 'auto',
                      border: theme => `1px solid ${theme.palette.custom.tltBorder3}`,
                    },
                  },
                  '& .ActionCard-title a': {
                    color: (theme: any) => theme.palette.custom.dark,
                    fontSize: { xs: '16px', md: '18px', lg: '20px' },
                    fontWeight: 400,
                    lineHeight: '127%',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  },

                  '& .ActionCard-secondaryAction': {
                    marginTop: 'auto',
                    '&  .MuiBox-root .MuiBox-root': {
                      display: { xs: 'inline-flex', md: 'none' },
                    },
                  },
                }}
              />
              <CouponAccordion key='couponform' sx={{
                '& .MuiInputBase-input': {
                  padding: { xs: '15px', md: '20px 24px' },
                },
              }} />

              <ApolloCartErrorAlert error={error} />
            </Container>
            <CartCrosssellsScroller
              renderer={productListRenderer}
              sx={(theme) => ({ mt: theme.spacings.md })}
            />
            <OverlayStickyBottom
              sx={{
                pt: 0.1,
                pb: { xs: '10px', md: '20px', lg: '30px' },
                px: { xs: '15px', sm: '20px', lg: '30px' },
                bottom: 0,
                backgroundColor: (theme: any) => theme.palette.custom.tltContrastText,
                width: '100%',

                '& .CartTotals-root ': {
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                  paddingInline: 0,
                },
                flexShrink: 0,
                mt: 'auto',
              }}
            >
              <CartTotals
                // containerMargin
                sx={{
                  typography: 'body1',

                }}
              />

              <Box sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: { xs: '8px', md: '10px' },
                width: '100%',
              }}>
                <Link href='/' className='cart_buttons'
                  sx={{
                    backgroundColor: theme => theme.palette.custom.tltMain,
                    color: theme => theme.palette.custom.tltContrastText,
                    border: theme => `1px solid ${theme.palette.custom.tltMain}`,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: (theme: any) => theme.palette.custom.tltMain,
                    },

                  }}
                >
                  <Trans id='Continue shopping' />
                </Link>
                <Link href='/checkout' className='cart_buttons'
                  sx={{
                    backgroundColor: theme => theme.palette.custom.tltSecondary,
                    color: theme => theme.palette.custom.tltContrastText,
                    border: theme => `1px solid ${theme.palette.custom.tltSecondary}`,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: (theme: any) => theme.palette.custom.tltSecondary,
                    },

                  }}

                >
                  <Trans id='Proceed to Buy' />
                </Link>
              </Box>

            </OverlayStickyBottom>
          </>
        ) : (
          <FullPageMessage
            sx={{
              '& .MuiContainer-root': {
                // height: '100%',

                '& .FullPageMessage-iconWrapper ': {
                  position: 'relative',
                  top: '15px',
                  '& svg': {
                    color: (theme) => theme.palette.custom.tltSecondary,
                    fontSize: { xs: '24px', md: '30px' },
                    stroke: (theme) => theme.palette.custom.tltSecondary,
                  },
                },
                '& .FullPageMessage-subject': {
                  '& .MuiTypography-h3': {
                    color: (theme) => theme.palette.custom.tltMain,
                  },
                  '& .MuiBox-root': {
                    color: (theme) => theme.palette.custom.textDarkAlter,
                  },
                },
                '& .FullPageMessage-button ': {
                  '& .MuiButtonBase-root': {
                    boxShadow: 'none',
                    borderRadius: '3px',
                    backgroundColor: (theme) => theme.palette.custom.tltSecondary,
                    color: '#fff',
                    border: (theme) => `1px solid ${theme.palette.custom.tltSecondary}`,
                    transition: 'all 0.4s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: (theme) => theme.palette.custom.tltSecondary,
                    },
                  },
                },
              },
            }}
            title={<Trans id='Your Cart is empty' />}
            icon={<IoBagHandleOutline color='#FF7300' size='30px' />}
            button={
              <Button href='/' variant='pill' color='primary' size='large'>
                <Trans id='Continue shopping' />
              </Button>
            }
          >
            <Trans id='Discover our collection and add items to your wishlist!' />
          </FullPageMessage >
        )
        }
      </WaitForQueries >
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'cart',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    variantSm: 'bottom',
    widthMd: '750px',
    sizeMd: 'floating',
    sizeSm: 'full',
    justifyMd: 'start',
    sx: {
      '& .LayoutOverlayBase-overlay': {
        padding: '0 !important',
      },
      '& .LayoutOverlayBase-overlayPane': {
        borderRadius: '0 !important',
        height: '100%',
        minHeight: '100vh',
        '&.variantSmBottom': {
          // paddingTop: { xs: 'calc(46px * 2)', md: 0 },
        },
        position: 'relative',
        '& .LayoutOverlayBase-background': {
          paddingTop: '60px',
          borderTopLeftRadius: { xs: '30px', md: 0 },
          borderTopRightRadius: { xs: '30px', md: 0 },
        },
      },
      '& .LayoutOverlayBase-beforeOverlay': {
        backdropFilter: 'blur(10px)',
      },
      '& .LayoutHeaderContent-left .MuiButtonBase-root .MuiButton-icon  svg': {
        display: 'none',
      },
      '& .LayoutHeader-root': {
        pointerEvents: 'auto',
      },
    },
  },
}
CartPage.pageOptions = pageOptions

export default CartPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCartDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
