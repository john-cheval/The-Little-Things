import {
  ComposedForm,
  ComposedSubmit,
  ComposedSubmitButton,
  WaitForQueries,
} from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  ApolloCartErrorFullPage,
  ApolloCartErrorSnackbar,
  CartTotals,
  EmptyCart,
  getCheckoutIsDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument, ShippingPageDocument } from '@graphcommerce/magento-cart-checkout'

import {
  CustomerAddressForm,
  ShippingAddressForm,
} from '@graphcommerce/magento-cart-shipping-address'
import {
  CustomerDocument,
  useCustomerQuery,
  useCustomerSession,
} from '@graphcommerce/magento-customer'
// import { PaymentMethodContextProvider } from '@graphcommerce/magento-payment-included/plugins/AddIncludedMethods'
// import { ProductListDocument } from '@graphcommerce/magento-product'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FormActions,
  FullPageMessage,

  OverlayStickyBottom,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Chip, CircularProgress, Divider, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import type { LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutNavigation } from '../../components'
import PickupStoreForm from '../../components/checkout/components/PickUpStore/PickupstoreForm'
import { a11yProps, TabPanel } from '../../components/checkout/TabPanel'
import { AdsOnProductsDocument, AdsOnProductsQuery } from '../../graphql/AdsOnProduct.gql'
import {
  // GetTimeSlotsByZipcodeDocument,
  GetTimeSlotsByZipcodeQuery,
} from '../../graphql/GetDeliverySlotData.gql'
import { GetStorePickupDocument, GetStorePickupQuery } from '../../graphql/StorePickup.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { TopBannerMesasge } from '../../components/checkout/components/TopBannerMesasge'
import { TopContactDetails } from '../../components/checkout/components/TopContactDetails'
import truck from '../../components/TLTComponents/assets/chekout/truck.svg'
import activeTruck from '../../components/TLTComponents/assets/chekout/active_truck.svg'
import picked from '../../components/TLTComponents/assets/chekout/package.svg'
import activePacked from '../../components/TLTComponents/assets/chekout/activePack.svg'
import { Image } from '@graphcommerce/image'
import { OrderSummary } from '../../components/checkout/components/OrderSummary'
import { CartItems } from '../../components/checkout/components/Cart/CartItems'
import { BottomLinks } from '../../components/checkout/components/BottomLinks'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

export type adsOnProps = {
  addonProductsData?: AdsOnProductsQuery[]
  prickupstoreData?: GetStorePickupQuery[]
  slotData?: GetTimeSlotsByZipcodeQuery
}
export type CmsBlocksProps = { cmsBlocks?: any; }
type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

export type ShippingPageProps = GetPageStaticProps & adsOnProps & CmsBlocksProps

function ShippingPage(props: ShippingPageProps) {
  const { prickupstoreData, cmsBlocks } = props
  const router = useRouter()
  const session = useCustomerSession()
  const shippingPage = useCartQuery(ShippingPageDocument, { fetchPolicy: 'cache-and-network' })

  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const customerAddresses = useCustomerQuery(CustomerDocument, { fetchPolicy: 'cache-and-network' })

  const cartExists =
    typeof shippingPage.data?.cart !== 'undefined' &&
    (shippingPage.data.cart?.items?.length ?? 0) > 0

  const { error, data: cartData } = cart
  const hasItems =
    (cartData?.cart?.total_quantity ?? 0) > 0 &&
    typeof cartData?.cart?.prices?.grand_total?.value !== 'undefined'
  const cartItems = cartData?.cart?.items

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const selectedMethod = shippingPage?.data?.cart?.shipping_addresses?.[0]?.selected_shipping_method

  const shippingData = cmsBlocks.find((block) => block.identifier === 'checkout-shipping')
  const refundPolicyData = cmsBlocks.find((block) => block.identifier === 'checkout-refund-policy')
  const privacyPolicyData = cmsBlocks.find((block) => block.identifier === 'checkout-privacy-policy')
  const termsServiceData = cmsBlocks.find((block) => block.identifier ===
    'checkout-terms-service')



  const decodedShippingData = decodeHtmlEntities(shippingData?.content)
  const decodedRefundPolicyData = decodeHtmlEntities(refundPolicyData?.content)
  const decodedPrivacyPolicyData = decodeHtmlEntities(privacyPolicyData?.content)
  const decodedTermsServiceData = decodeHtmlEntities(termsServiceData?.content)
  return (
    <Box sx={{ backgroundColor: '' }}>
      <PageMeta title={i18n._(/* i18n */ 'Shipping')} metaRobots={['noindex']} />
      <WaitForQueries
        waitFor={[shippingPage, customerAddresses]}
        fallback={
          <FullPageMessage
            sx={{ backgroundColor: '#fff' }}
            icon={<CircularProgress />}
            title={<Trans id='Loading' />}
          >
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >

        <Box
          component='section'
          className='container-wrapper'
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
            gridTemplateRows: { xs: 'auto', md: 'auto' },
            gap: { xs: '20px', lg: '30px' },
            position: 'relative',
            zIndex: 100,
            paddingTop: { xs: '15px', md: '20px', lg: '30px', xl: '45px' },
            paddingBottom: { xs: '19px', md: '30px', lg: '45px' },
            maxWidth: '85%',
            margin: '0 auto',
          }}
        >
          <Box
            component='article'
            sx={{ gridColumn: { xs: 'span 12', lg: 'span 7', xl: 'span 7' } }}
          >
            {!session.loggedIn && <TopBannerMesasge />}

            <Divider sx={{
              marginTop: { xs: '15px', md: '25px' },
              '&::before, &::after': {
                borderColor: theme => theme.palette.custom.tltBorder2,
              },
              '& .MuiChip-root': {
                backgroundColor: 'transparent',
                color: theme => theme.palette.custom.textDarkAlter2,
                fontSize: { xs: '16px', md: '18px' },
                textAlign: 'center',
              },
            }}>
              <Chip label="OR" size="small" />
            </Divider>

            <TopContactDetails />



            {/* Cart Items for small screens */}
            <Box
              sx={{ display: { xs: 'block', lg: 'none' }, marginTop: { xs: '20px', md: '25px' } }}
            >
              <Typography
                sx={{
                  color: (theme: any) => theme.palette.custom.dark,
                  fontSize: { xs: '16px', md: '18px', lg: '20px' },
                  lineHeight: '120%',
                  marginBottom: { xs: '10px', md: '14px' },
                }}
              >
                Your Order
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  backgroundColor: (theme: any) => theme.palette.primary.contrastText,
                  padding: { xs: '10px', md: '24px 20px' },
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {hasItems ? (
                  <Box>
                    {cartItems?.map((item, index) => (
                      <CartItems
                        items={item}
                        key={`index-${index + 1}`}
                        length={cartItems?.length}
                        index={index}
                      />
                    ))}
                  </Box>
                ) : (
                  <EmptyCart
                    sx={{
                      // minHeight: '100vh',
                      margin: 'auto',
                      display: 'flex',
                      '&  .FullPageMessage-button .MuiButtonBase-root': {
                        backgroundColor: (theme: any) => theme.palette.custom.heading,
                        borderRadius: '8px',
                        color: 'white',
                        boxShadow: 'none !important',
                      },
                      '& svg': {
                        fontSize: '40px',
                        stroke: 'unset !important',
                      },
                      '& .FullPageMessage-iconWrapper': {
                        position: 'relative',
                        top: { xs: '24px' },
                        right: { xs: '-7px' },
                      },
                    }}
                    disableMargin
                  >
                    {error && <ApolloCartErrorAlert error={error} />}
                  </EmptyCart>
                )}
              </Box>
            </Box>



            {!hasItems && (
              <>
                {/* Shiping */}
                <Box
                  sx={{

                    marginTop: { xs: '18px', md: '27px', xl: '35px' },
                    paddingBottom: { xs: '20px', md: '25px' },
                    borderBottom: theme => `1px solid ${theme.palette.custom.tltBorder2}`,
                  }}
                >
                  {' '}
                  <Typography
                    component='p'
                    className='checkout-headings'

                  >
                    Delivery
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      marginTop: { xs: '15px', md: '20px' },
                    }}
                  >
                    <Tabs
                      sx={{
                        justifyContent: 'unset',
                        columnGap: '10px',
                        '& .MuiTabs-flexContainer': {
                          gap: '11px',
                        },

                        '& .MuiTab-root': {
                          // width: '50%',
                          flexGrow: 1,
                          maxWidth: 'unset',
                          color: (theme) => theme.palette.custom.textDarkAlter2,
                          fontSize: { xs: '15px', md: '16px', lg: '18px' },
                          lineHeight: '120%',
                          borderRadius: '3px',
                          fontWeight: 500,
                          minHeight: { xs: '40px', md: '48px' },
                          padding: { xs: '10px 14x', md: '12px 16px 6px' },
                          border: (theme) => `1px solid ${theme.palette.custom.tltBorder2}`,
                          textTransform: 'capitalize',
                          transition:
                            'background-color 0.3s ease, border 0.3s ease, color 0.3s ease',
                          '&.Mui-selected': {
                            backgroundColor: '#FFD4DA52',
                            color: '#6B000F',
                            border: '1px solid #6B000F',
                          },
                        },
                        '& .MuiTabs-indicator': {
                          display: 'none',
                        },
                        '& button': {
                          display: 'inline-block',
                        },
                        '& picture': {
                          display: 'inline-block',
                          verticalAlign: 'top',
                          marginRight: '5px',
                        },
                      }}
                      value={value}
                      onChange={handleChange}
                      centered
                    >
                      <Tab label='Ship' icon={<Image src={value === 0 ? activeTruck : truck} alt='truck' />} {...a11yProps(0)} />
                      <Tab label='Pickup' icon={<Image src={value === 1 ? activePacked : picked} alt='package' />} />
                    </Tabs>
                    <TabPanel
                      sx={{
                        '&.MuiBox-root.mui-style-19kzrtu': {
                          padding: { xs: '15px 0', md: '25px 0', lg: '30px 0' },

                          '& .MuiTypography-h4': {},
                        },
                      }}
                      value={value}
                      index={0}
                    >
                      <ComposedForm>
                        {(customerAddresses.data?.customer?.addresses?.length ?? 0) >= 1 ? (
                          <CustomerAddressForm
                            step={2}
                            sx={(theme) => ({ mt: theme.spacings.lg })}
                          >
                            <ShippingAddressForm step={3} isPickup={value === 1} />
                          </CustomerAddressForm>
                        ) : (
                          <>

                            <ShippingAddressForm
                              sx={{
                                paddingTop: '0',
                                '& .MuiInputLabel-formControl': {
                                  color: (theme) => theme.palette.custom.textDarkAlter2,
                                  fontSize: { xs: '15px', md: '18px' },
                                  lineHeight: '120%',
                                  fontWeight: 400,

                                  '&.Mui-focused': {
                                    color: (theme) => theme.palette.custom.textDarkAlter2,
                                  },
                                  '& .MuiFormLabel-asterisk': {
                                    display: 'none',
                                  },
                                  '&.MuiInputLabel-animated': {
                                    backgroundColor: '#fff',
                                    padding: '0 6px',
                                  },
                                },

                                '& .MuiOutlinedInput-root': {
                                  border: (theme) => `1px solid ${theme.palette.custom.tltBorder2}`,
                                  borderRadius: '3px',
                                  paddingRight: '0',

                                  '& .InputCheckmark': {
                                    display: 'none',
                                  },

                                  '&:hover': {
                                    border: (theme) => `1px solid ${theme.palette.custom.tltBorder2}`,
                                  },
                                  '&.Mui-focused': {
                                    border: (theme) => `1px solid ${theme.palette.custom.tltBorder2}`,
                                    '& .MuiOutlinedInput-input': {
                                      color: (theme) => theme.palette.custom.textDarkAlter2,
                                      // caretColor: (theme) => theme.palette.custom.main,
                                    },
                                  },

                                  '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                  },
                                },
                              }}
                              step={3}
                              isPickup={value === 1}
                            />

                            <Box
                              sx={{
                                borderTop: theme => `1px solid ${theme.palette.custom.tltBorder2}`,
                                paddingTop: { xs: '20px', md: '30px' },
                                marginTop: { xs: '20px', md: '30px' },
                              }}>
                              <Typography
                                component='p'
                                className='checkout-headings'


                              >
                                Shipping Method
                              </Typography>
                            </Box>
                          </>
                        )}
                      </ComposedForm>
                    </TabPanel>

                    <TabPanel
                      value={value}
                      index={1}
                      sx={{
                        '& > .MuiBox-root': {
                          padding: { xs: '15px 0', md: '25px 0', lg: '30px 0' },
                        },
                      }}
                    >
                      <ComposedForm>
                        {(customerAddresses.data?.customer?.addresses?.length ?? 0) >= 1 ? (
                          <CustomerAddressForm
                            step={2}
                            sx={(theme) => ({ mt: theme.spacings.lg })}
                          >
                            <ShippingAddressForm step={3} isPickup={value === 1} />
                          </CustomerAddressForm>
                        ) : (

                          <ShippingAddressForm
                            isPickup={value === 1}
                            sx={{
                              paddingTop: 0,
                              '& .MuiInputLabel-formControl': {
                                color: (theme) => theme.palette.custom.main,
                                fontSize: { xs: '15px', md: '16px' },
                                lineHeight: '158%',
                                fontWeight: 400,

                                '&.Mui-focused': {
                                  color: (theme) => theme.palette.custom.main,
                                },
                                '& .MuiFormLabel-asterisk': {
                                  display: 'none',
                                },
                                '&.MuiInputLabel-animated': {
                                  padding: '0 6px',
                                },
                              },

                              '& .MuiOutlinedInput-root': {
                                border: (theme) => `1px solid ${theme.palette.custom.border}`,
                                borderRadius: '4px',
                                paddingRight: '0',

                                '& .InputCheckmark': {
                                  display: 'none',
                                },

                                '&:hover': {
                                  border: (theme) => `1px solid ${theme.palette.custom.border}`,
                                },
                                '&.Mui-focused': {
                                  border: (theme) => `1px solid ${theme.palette.custom.border}`,
                                },

                                '& .MuiOutlinedInput-notchedOutline': {
                                  border: 'none',
                                },
                              },
                            }}
                            step={3}
                          />

                        )}
                      </ComposedForm>
                      <PickupStoreForm storeData={prickupstoreData} />
                    </TabPanel>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: { xs: 'none', lg: 'block' },
                  }}
                >
                  {/* Shipping Method */}
                  {!shippingPage.error && !cartExists && (
                    <ComposedForm>
                      <Box>
                        <>
                          {/* {!shippingPage.data?.cart?.is_virtual && (
                            <ShippingMethodForm
                              step={4}
                              sx={(theme) => ({ mt: theme.spacings.lg })}
                              isPickup={value === 1}
                            />
                          )} */}

                          <ComposedSubmit
                            onSubmitSuccessful={() => router.push('/checkout/payment')}
                            render={(renderProps) => (
                              <>
                                <FormActions
                                  sx={{
                                    paddingTop: { xs: '10px', md: '15px', lg: '25px' },
                                    paddingBottom: 0,
                                    justifyContent: 'unset',
                                    '& .mui-style-dhqdz6-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root:not(.Mui-disabled):not(.MuiButton-disableElevation) ':
                                    {
                                      boxShadow: 'none',
                                    },
                                    '& .MuiButtonBase-root': {
                                      fontSize: { xs: '15px', md: '16px' },
                                      backgroundColor: (theme) => theme.palette.custom.tltSecondary,
                                      borderColor: (theme) => theme.palette.custom.tltSecondary,
                                      borderRadius: '3px',
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      '& span': {
                                        display: 'none',
                                      },
                                    },
                                  }}
                                >
                                  <ComposedSubmitButton
                                    {...renderProps}
                                    // disabled={!selectedMethod?.carrier_code}
                                    size='large'
                                    id='next'
                                  >
                                    <Trans id='Pay Now' />
                                  </ComposedSubmitButton>
                                </FormActions>
                                <ApolloCartErrorSnackbar
                                  error={
                                    renderProps.buttonState.isSubmitting
                                      ? undefined
                                      : renderProps.error
                                  }
                                />

                                <BottomLinks
                                  shippingContent={decodedShippingData}
                                  refundPolicyContent={decodedRefundPolicyData}
                                  privacyPolicyContent={decodedPrivacyPolicyData}
                                  termsServiceContent={decodedTermsServiceData}
                                />

                              </>
                            )}
                          />
                        </>
                      </Box>
                    </ComposedForm>
                  )}
                </Box>
              </>
            )}
          </Box>

          {/*  Order Summary  For Large Screens */}
          <Box
            component='article'
            sx={{
              gridColumn: { xs: 'span 12', lg: 'span 5', xl: 'span 5' },
              display: { xs: 'none', lg: 'block' },
              position: { xs: 'static', lg: 'sticky' },
              top: { xs: 'auto', lg: '100px' },
              alignSelf: { xs: 'unset', lg: 'start' },
            }}
          >
            <OrderSummary orderData={cartData} error={error} IsItems={hasItems} />
          </Box>
        </Box>

        {shippingPage.error && <ApolloCartErrorFullPage error={shippingPage.error} />}

        {/* Overlay sticky bottom for small screens */}
        {
          hasItems && (
            <Box
              sx={{
                paddingInline: { xs: '18px', md: '25px', lg: '55px' },
                display: { xs: 'block', lg: 'none' },
                paddingBottom: '20px',
              }}
            >
              <OverlayStickyBottom
                sx={{
                  padding: { xs: '15px 10px 20px', md: '24px 20px' },
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  bottom: 'unset !important',
                  '& .CartTotals-root ': {
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                  },
                  flexShrink: 0,
                  mt: 'auto',
                }}
              >
                <CartTotals
                  //  containerMargin
                  sx={{
                    typography: 'body1',
                    '& .CartTotals-costsRow': {
                      color: (theme) => theme.palette.custom.smallHeading,
                    },
                    '& .CartTotals-costsRow:nth-child(2)': {
                      color: (theme) => theme.palette.custom.smallHeading,
                      fontWeight: '600 !important',
                      fontSize: '16px !important',
                    },
                  }}
                />
                {!shippingPage.error && cartExists && (
                  <ComposedForm>
                    <Box>
                      <>
                        {/* {!shippingPage.data?.cart?.is_virtual && (
                        <ShippingMethodForm
                          step={4}
                          sx={(theme) => ({ mt: theme.spacings.lg })}
                          isPickup={value === 1}
                        />
                      )} */}

                        <ComposedSubmit
                          onSubmitSuccessful={() => router.push('/checkout/payment')}
                          render={(renderProps) => (
                            <>
                              <FormActions
                                sx={{
                                  paddingTop: { xs: '10px', md: '15px', lg: '25px' },
                                  paddingBottom: 0,
                                  justifyContent: 'unset',
                                  '& .mui-style-dhqdz6-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root:not(.Mui-disabled):not(.MuiButton-disableElevation) ':
                                  {
                                    boxShadow: 'none',
                                  },
                                  '& .MuiButtonBase-root': {
                                    fontSize: { xs: '15px', md: '16px' },
                                    backgroundColor: (theme) => theme.palette.custom.heading,
                                    borderColor: (theme) => theme.palette.custom.heading,
                                    borderRadius: '4px',
                                    '& span': {
                                      display: 'none',
                                    },
                                  },
                                }}
                              >
                                <ComposedSubmitButton
                                  {...renderProps}
                                  disabled={!selectedMethod?.carrier_code}
                                  size='large'
                                  id='next'
                                >
                                  <Trans id='Proceed To Pay' />
                                </ComposedSubmitButton>
                              </FormActions>
                              <ApolloCartErrorSnackbar
                                error={
                                  renderProps.buttonState.isSubmitting ? undefined : renderProps.error
                                }
                              />
                            </>
                          )}
                        />
                      </>
                    </Box>
                  </ComposedForm>
                )}
              </OverlayStickyBottom>
            </Box>
          )
        }
      </WaitForQueries >
    </Box >
  )
}

ShippingPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCheckoutIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const addonProducts = client.query({
    query: AdsOnProductsDocument,
    variables: {
      categoryId: '13',
    },
  })

  const getPickupstore = staticClient.query({
    query: GetStorePickupDocument,
  })

  // const GetDeliverySlotData = staticClient.query({
  //   query: GetTimeSlotsByZipcodeDocument,
  //   variables: {
  //     zipcode: 12345,
  //   },
  // }) 

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: [
        'checkout-shipping',
        'checkout-refund-policy',
        'checkout-privacy-policy',
        'checkout-terms-service',

      ],
    },
  })
  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items
  return {
    props: {
      ...(await layout).data,
      cmsBlocks,
      up: { href: '/cart', title: i18n._(/* i18n */ 'Cart') },
      // slotData: (await GetDeliverySlotData).data.getTimeSlots?.slotData,
      addonProductsData: (await addonProducts).data?.products?.items || [],
      prickupstoreData: (await getPickupstore).data.pickupLocations?.items || [],
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
