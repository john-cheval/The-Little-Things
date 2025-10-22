import { Box, Typography } from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import dhirams from '../../Assets/aed.svg'
import Image from 'next/image';
import { CartTotals, EmptyCart } from '@graphcommerce/magento-cart';
import { CartItems } from './Cart/CartItems';
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon';
import { FormActions, OverlayStickyBottom } from '@graphcommerce/next-ui';
import { ComposedForm, ComposedSubmit } from '@graphcommerce/react-hook-form';
import { useRouter } from 'next/router'
import { ComposedSubmitButton } from '@graphcommerce/ecommerce-ui';
import { Trans } from '@lingui/react'
import { useState } from 'react';

type Props = {
  cartItems?: any
}
export function ResponsiveOrderSummary({ cartItems }: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  if (!cartItems) return null
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <Box sx={{
      display: { xs: 'block', lg: 'none' },
      backgroundColor: theme => theme.palette.custom.tltlGray2,
      borderRadius: '3px',
      paddingBlock: '17px',
      paddingInline: '14px',
      marginBottom: { xs: '16px', sm: '20px', md: '25px' },
    }}>

      <Box>
        <Box
          onClick={toggleOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            borderBottom: theme => `1px solid ${theme.palette.custom.tltBorder5}`,
            paddingBottom: '10px',
            cursor: 'pointer',
          }}>
          <Typography sx={(theme) => ({
            color: theme.palette.custom.textDarkAlter2,
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '120%',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            '& span': {
              color: '#D0011F',
              marginTop: '3px',
            },
          })}>
            Order Summary  <span> {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          </Typography>

          {!isOpen && (
            <Typography sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: theme => theme.palette.custom.textDarkAlter2,
              fontSize: '16px',
              fontWeight: 700,
              textAlign: 'right',
              lineHeight: '159%',
              '& img': {
                maxWidth: '20px',
              },
            }}>
              <Image src={dhirams} alt='dhirams' />
              {Number(cartItems?.cart?.prices?.grand_total?.value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          )}

        </Box>

        {/* Cart Items  */}
        {cartItems?.cart?.items?.length > 0 ? (
          <Box sx={{
            marginTop: isOpen ? { xs: '15px', md: '20px' } : '0',
            maxHeight: isOpen ? 'fit-content' : '0px',
            overflow: 'hidden',
            transition: 'all 0.5s ease-in-out',
          }}>
            {cartItems?.cart?.items?.map((item, index) => (
              <CartItems items={item} key={`index ${index + 1}`} length={cartItems?.cart?.items?.length} index={index} />
            ))}
            <Box
              sx={{
                '& .MuiBox-root': {
                  marginTop: { xs: '10px', md: '20px' },
                  '& .MuiInputBase-input': {
                    padding: { xs: ' 15px', md: '15px 20px' },
                  },
                  '& form': {
                    gridTemplateColumns: { xs: '9fr 3fr', sm: '8fr 4fr', md: '9fr 3fr' },
                  },
                },
              }}
            >
              <CouponAccordion key='couponform' />
            </Box>
            <OverlayStickyBottom
              sx={{
                py: 0.1,
                zIndex: 9999,
                bottom: 'unset !important',
                '& .CartTotals-root ': {
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                  padding: 0,
                  marginTop: { xs: '20px', sm: '25px', md: '30px' },
                },
                flexShrink: 0,
                mt: 'auto',
              }}
            >
              <CartTotals isCheckout />

              <ComposedForm>
                <Box>
                  <ComposedSubmit
                    onSubmitSuccessful={() => router.push('/checkout/payment')}
                    render={(renderProps) => (
                      <>
                        <FormActions
                          sx={{
                            paddingTop: { xs: '15px', sm: '20px', md: '25px' },
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
                              paddingBlock: { xs: '12px', sm: '15px' },
                              textTransform: 'uppercase',
                              fontWeight: 700,
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
                        {/* <ApolloCartErrorSnackbar
                          error={
                            renderProps.buttonState.isSubmitting ? undefined : renderProps.error
                          }
                        /> */}
                      </>
                    )}
                  />
                </Box>
              </ComposedForm>
            </OverlayStickyBottom>
          </Box>
        ) : (
          <EmptyCart
            sx={{
              margin: 'auto',
              display: 'flex',
              '& .FullPageMessage-subject': {
                marginTop: '20px',
                '& .MuiTypography-h3': {
                  color: (theme) => theme.palette.custom.tltMain,
                  marginBottom: 0,
                },
                '& .MuiBox-root': {
                  color: (theme) => theme.palette.custom.textDarkAlter,
                },
              },
              '&  .FullPageMessage-button .MuiButtonBase-root': {
                backgroundColor: (theme: any) => theme.palette.custom.tltSecondary,
                borderRadius: '3px',
                color: (theme: any) => theme.palette.custom.tltContrastText,
                boxShadow: 'none !important',
                border: (theme) => `1px solid ${theme.palette.custom.tltSecondary}`,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: (theme) => theme.palette.custom.tltSecondary,
                },
              },
              '& svg': {
                fontSize: '40px',
                stroke: 'unset !important',
              },
              '& .FullPageMessage-iconWrapper': {
                position: 'relative',
                top: { xs: '24px' },
                right: { xs: '9px' },
              },
            }}
            disableMargin
          >
            {/* {error && <ApolloCartErrorAlert error={error} />} */}
          </EmptyCart>
        )}


      </Box>

    </Box>
  )
}