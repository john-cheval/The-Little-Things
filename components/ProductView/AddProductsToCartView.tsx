
import { useCartEnabled } from '@graphcommerce/magento-cart'
import {
  AddProductsToCartError,
  AddProductsToCartQuantity,
  type AddToCartItemSelector,
  ProductListPrice,
  ProductPageAddToCartQuantityRow,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import {
  ConfigurableProductOptions,
  useConfigurableOptionsSelection,
} from '@graphcommerce/magento-product-configurable'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { GroupedProducts } from '@graphcommerce/magento-product-grouped'
import { isTypename } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import { useWatch } from 'react-hook-form'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { fontSize } from '../theme'
import { IoShareSocialOutline } from 'react-icons/io5'



export type AddProductsToCartViewProps = AddToCartItemSelector & {
  product: NonNullable<NonNullable<NonNullable<ProductPage2Query['products']>['items']>[number]>
  openForm?: any
}

export function AddProductsToCartView(props: AddProductsToCartViewProps) {

  const { product, index = 0 } = props
  const cartEnabled = useCartEnabled()
  const { configured } = useConfigurableOptionsSelection({ url_key: product?.url_key, index })

  const { control } = useFormAddProductsToCart()
  const currentQuantity = useWatch({
    control,
    name: `cartItems.${index}.quantity`,
    defaultValue: 1,
  })

  const productConfiguredPrice =
    configured && 'configurable_product_options_selection' in configured
      ? (configured as { configurable_product_options_selection?: { variant?: any } })
        .configurable_product_options_selection?.variant
      : undefined

  const productPrice = productConfiguredPrice ? productConfiguredPrice : product

  const unitPrice = productPrice.price_range.minimum_price.final_price.value || 0
  const totalPrice = unitPrice * (currentQuantity || 1)

  // Create a modified price object for display
  const displayPrice = {
    ...productPrice.price_range.minimum_price,
    final_price: {
      ...productPrice.price_range.minimum_price.final_price,
      value: totalPrice,
    },
    regular_price: productPrice.price_range.minimum_price.regular_price
      ? {
        ...productPrice.price_range.minimum_price.regular_price,
        value:
          (productPrice.price_range.minimum_price.regular_price.value || 0) *
          (currentQuantity || 1),
      }
      : undefined,
  }

  // const customizableProduct = product?.categories && product?.categories?.length > 0 && product?.categories?.some((item) => item?.id === 11)

  return (
    <>
      {isTypename(product, ['ConfigurableProduct']) && (
        <ConfigurableProductOptions product={product} />
      )}
      {isTypename(product, ['BundleProduct']) && (
        <BundleProductOptions product={product} layout='stack' />
      )}
      {isTypename(product, ['DownloadableProduct']) && (
        <DownloadableProductOptions product={product} />
      )}
      {isTypename(product, ['GroupedProduct']) && <GroupedProducts product={product} />}

      {!isTypename(product, ['GroupedProduct']) && (
        <>
          {/* <Divider />*/}
          <ProductPageAddToCartQuantityRow
            product={product}
            sx={{
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <AddProductsToCartError>
              <Typography component='div' variant='h3' lineHeight='1'>
                <ProductListPrice
                  {...displayPrice}
                  detailedPage={true}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: { xs: '10px', md: '15px' },
                    '& .ProductListPrice-discountPrice span': {
                      color: '#C5C5C5',
                      fontSize: { xs: '16px', md: '18px' },
                      fontWeight: 600,
                      lineHeight: 'normal',
                    },

                    '& .ProductListPrice-finalPrice span span:first-child': {
                      backgroundSize: { xs: '25px auto', md: '27px auto' },
                      backgroundPosition: { xs: '-2px center', md: '-2px 14px' },
                      width: { xs: '25px', md: '30px' },
                    },

                    '& .ProductListPrice-finalPrice .MuiBox-root:not(:nth-child(1))': {
                      ...fontSize(25, 40),
                    },

                    '& .mui-style-e8n57i': {
                      gap: { xs: '10px', md: '15px' },
                    },
                    '& .discount-per': {
                      '& svg': {
                        display: 'none',
                      },
                    },

                  }}
                />
              </Typography>
            </AddProductsToCartError>

            <Box sx={{
              marginTop: { xs: '20px', md: '25px', lg: '30px' },
              width: '100%',
            }}>
              {cartEnabled && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    rowGap: { xs: 0, md: '0' },
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      columnGap: { xs: '12px', md: '15px' },
                      alignItems: 'center',
                    }}>
                    <Typography
                      component='p'
                      sx={{
                        color: '#000',
                        fontSize: { xs: '15px', md: '18px' },
                        fontWeight: 700,
                      }}
                    >
                      Quantity
                    </Typography>
                    <AddProductsToCartQuantity
                      sx={{
                        flexShrink: '0',
                        '& .MuiOutlinedInput-root': {
                          color: (theme) => theme.palette.custom.dark,
                          borderRadius: '3px',
                          padding: '4px',
                          '& svg': {
                            fontSize: '19px',
                            stroke: (theme) => theme.palette.custom.tltSecondary,
                            strokeWidth: '1.5px',
                          },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.custom.tltBorder4,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.custom.tltBorder4,
                        },
                        '& .mui-style-srbfbn-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: (theme) => theme.palette.custom.tltBorder4,
                          borderWidth: '1px',
                        },
                        '& .mui-style-1c59ycn-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: '1px',
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '3px',
                      border: (theme: any) => `1px solid ${theme.palette.custom.tltBorder4}`,
                      display: 'flex',
                      alignItems: 'center',
                      padding: { xs: '8px 15px', md: '12px 15px' },
                    }}>
                    <Typography sx={{
                      color: (theme: any) => theme.palette.custom.tltSecondary,
                      fontSize: { xs: '16px', md: '18px' },
                      fontWeight: 500,
                      lineHeight: '120%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: '5px', md: '8px' },
                    }}>
                      Share <IoShareSocialOutline />
                    </Typography>
                  </Box>

                </Box>
              )}
            </Box>
          </ProductPageAddToCartQuantityRow>
          {/* <Box
            sx={{
              marginTop: { xs: '10px', md: '25px' },
              display: 'flex',
              flexDirection: 'column',
              rowGap: {
                xs: '8px',
                md: '12px',
              },
              '& .SectionHeader-root .SectionHeader-left': {
                color: '#2A110A ',
                fontSize: { xs: '15px', md: '16px' },
                textTransform: 'capitalize',
                fontWeight: 500,
              },
              '& .MuiFormControl-root .mui-style-1d3z3hw-MuiOutlinedInput-notchedOutline, .mui-style-9425fu-MuiOutlinedInput-notchedOutline':
              {
                borderColor: (theme: any) => `${theme.palette.custom.border} !important`,
              },
              '& .MuiInputBase-root': {
                color: (theme: any) => theme.palette.custom.main,
              },
              '& .MuiFormHelperText-root': {
                marginLeft: '0',
                color: (theme: any) => theme.palette.custom.tertiary,
              },
              '& .mui-style-brh10v:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme: any) => `${theme.palette.custom.border} !important`,
              },
            }}
          >
            <ProductCustomizable product={product} />
          </Box> */}
          {/*  <ProductPagePriceTiers product={product} /> */}
          {/* cartEnabled && <ProductSidebarDelivery product={product} /> */}
        </>
      )}


    </>
  )
}
