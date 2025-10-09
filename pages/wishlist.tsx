import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { useRemoveProductsFromWishlist, useWishlistItems, WishlistItemActionCard } from '@graphcommerce/magento-wishlist'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  Button,
  FullPageMessage,
  iconHeart,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material'
import type { LayoutOverlayProps } from '../components'
import { LayoutOverlay } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function WishlistPage() {
  const wishlistItems = useWishlistItems()
  const remove = useRemoveProductsFromWishlist()

  const wishlistCount = wishlistItems?.items?.length ?? 0

  const handleRemoveAllItems = () => {
    if (wishlistItems?.items?.length) {

      remove(wishlistItems.items.map(item => item.id))
        .catch((error) => {
          console.error('Error during wishlist removal:', error)
        });
    }
  };

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Wishlist')} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={{
          '& .MuiButtonBase-root svg': {
            color: (theme: any) => theme.palette.custom.textDarkAlter,
            fontSize: { xs: '25px', lg: '28px' },
          },
          '& .LayoutHeaderContent-content': {
            paddingInline: { xs: '20px' },
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
              color: (theme) => theme.palette.custom.main,
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
          <Typography component='h2' className='main-heading'>
            Wishlist
          </Typography>
          {wishlistCount > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '5px',
              }}>
              <Typography
                component='p'
                sx={{
                  backgroundColor: (theme: any) => theme.palette.custom.tltGray2,
                  borderRadius: '3px',
                  color: (theme: any) => theme.palette.custom.tltGray1,
                  textAlign: 'center',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 'normal',
                  padding: '3px 9px',
                }}>{wishlistCount} {wishlistCount === 1 ? 'Product' : 'Products'}</Typography>

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
                onClick={handleRemoveAllItems}
              >Clear</Typography>
            </Box>
          )}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={[wishlistItems]}
        fallback={
          <FullPageMessage title={<Trans id='Loading' />} icon={<CircularProgress />}>
            <Trans id='We are fetching your favorite products, one moment please!' />
          </FullPageMessage>
        }
      >
        <Container
          maxWidth='md'
          className='sidebar-wrapper'
          sx={{

            '& .AddProductsToCartForm': {
              '& .ActionCard-image img': {
                borderRadius: '3px',
                marginRight: '10px',
                // objectFit: 'cover',
                width: '100%',
                height: { xs: 'auto', md: 'auto' },
                border: theme => `1px solid ${theme.palette.custom.tltBorder3}`,
              },
              '& .ActionCard-title': {
                '& .MuiFormControl-root .MuiInputBase-root': {
                  marginTop: '10px',
                  border: theme => `1px solid ${theme.palette.custom.tltBorder4}`,
                  padding: '5px',
                  borderRadius: '3px',
                  color: theme => theme.palette.custom.textDarkAlter2,
                  fontsize: { xs: '15px', lg: '16px' },
                  fontWeight: 500,
                  lineHeight: '120%',
                  textAlign: 'center',
                  '& button': {
                    boxShadow: 'none',

                    '& svg': {
                      fontSize: { xs: '18px' },
                      stroke: theme => theme.palette.custom.tltSecondary,
                      strokeWidth: 1.5,
                    },
                  },
                },
              },
              // '& .ActionCard-secondaryAction': {
              //   '& .MuiBox-root': {
              //     alignItems: 'center',
              //     columnGap: '10px',

              //     '&:nth-child(2)': {
              //       marginTop: { xs: '5px', md: '10px' },
              //       display: { xs: 'inline-flex', md: 'none' },
              //     },
              //   },

              // },
              // '& .ActionCard-end .ActionCard-action .MuiButtonBase-root': {
              //   '&:hover': {
              //     backgroundColor: 'transparent',
              //   },
              //   '&:active': {
              //     backgroundColor: 'transparent',
              //   },

              //   '&.Mui-focusVisible': {
              //     backgroundColor: 'transparent',
              //   },

              //   '&:focus': {
              //     backgroundColor: 'transparent',
              //     outline: 'none',
              //   },
              // },
              // '& .ActionCard-secondaryAction [aria-label="Add to Cart"] svg ': {
              //   fontSize: { xs: '26px', md: '30px' },
              //   top: '3px',
              //   right: '8px',
              // },
              '& .ActionCard-title.sizeResponsive': {
                fontSize: { xs: '15px', md: '18px', lg: '20px' },
                fontWeight: 400,
                color: '#000',
                lineHeight: '127%',
              },
              // '& .ActionCard-secondaryAction a': {
              //   color: (theme) => theme.palette.custom.main,
              //   backgroundColor: 'transparent',
              //   marginBlock: 0,
              //   paddingBlock: 0,
              //   transition: 'all 0.4s ease-in-out',

              //   '&:hover span svg': {
              //     transform: 'translateX(5px)',
              //   },
              // },
              '& .ActionCard-title a': {
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                },
              },
              '& .ActionCard-end ': {
                flexDirection: 'row',
                '& .ActionCard-action': {
                  marginBottom: '0px',
                },
              },
              // '& .ActionCard-end .ActionCard-action .MuiButtonBase-root svg': {
              //   color: '#9d9d9d',
              // },
            },
          }}
        >
          {wishlistItems.items.length === 0 ? (
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
                      stroke: (theme) => theme.palette.custom.activeColor,
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
              title={<Trans id='Your wishlist is empty' />}
              icon={<IconSvg src={iconHeart} size='xxl' />}
              button={
                <Button href='/' variant='pill' color='primary' size='large'>
                  <Trans id='Continue shopping' />
                </Button>
              }
            >
              <Trans id='Discover our collection and add items to your wishlist!' />
            </FullPageMessage>
          ) : (
            <>
              {wishlistItems.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.custom.tltBorder2}`,
                  }}
                >
                  <WishlistItemActionCard item={item} isIcon />
                </Box>
              ))}
            </>
          )}
        </Container>
      </WaitForQueries >
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'bottom',
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
          paddingTop: { xs: 'calc(46px * 2)', md: 0 },
        },
        // paddingTop: { xs: 'calc(200px * 0.3) !important', md: 0 },
        position: 'relative',
        '& .LayoutOverlayBase-background': {
          paddingTop: { xs: '20px', md: '30px', lg: '60px' },
        },
      },
      '& .LayoutOverlayBase-beforeOverlay': {
        backdropFilter: 'blur(10px)',
      },
    },
  },
}
WishlistPage.pageOptions = pageOptions

export default WishlistPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
