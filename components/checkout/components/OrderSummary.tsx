
import {
  ApolloCartErrorAlert,
  CartTotals,
  EmptyCart,
} from '@graphcommerce/magento-cart'
import { CartPageQuery } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { OverlayStickyBottom } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import { CartItems } from './Cart/CartItems'
import { useMemo, useState } from 'react'

export type OrderSummaryPropsType = {
  orderData?: CartPageQuery
  error?: any
  IsItems?: boolean
}

export function OrderSummary({ orderData, error, IsItems }: OrderSummaryPropsType) {
  const cartItems = orderData?.cart?.items
  const INITIAL_DISPLAY_COUNT = 2;
  const [showAll, setShowAll] = useState(false);


  const itemsToDisplay = useMemo(() => {
    if (showAll) {
      return cartItems;
    }
    return cartItems?.slice(0, INITIAL_DISPLAY_COUNT);
  }, [cartItems, showAll]);
  const hasMoreItems = (cartItems?.length ?? 0) > INITIAL_DISPLAY_COUNT;

  const handleViewToggle = () => {
    setShowAll((prev) => !prev);
  };
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          borderRadius: '3px',
          backgroundColor: (theme: any) => theme.palette.custom.tltlGray2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: { xs: '20px 20px' },
        }}
      >
        <Typography component='p'
          sx={{
            color: theme => theme.palette.custom.textDarkAlter2,
            fontSize: { xs: '16px', md: '18px', lg: '25px' },
            fontWeight: 500,
            borderBottom: theme => `1px solid ${theme.palette.custom.tltBorder5}`,
            paddingBottom: { xs: '10px', md: '15px' },
          }}>
          Order Summary
        </Typography>
        {IsItems ? (
          <>
            <Box
              sx={{
                flexGrow: 1,
                ...(showAll && {
                  height: '500px',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  pr: { xs: '5px', md: '10px' },
                  '&::-webkit-scrollbar': {
                    width: '6px',
                    borderRadius: 0,
                    backgroundColor: '#ebebeb',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#ebebeb',
                    borderRadius: '0px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (theme) => theme.palette.custom.tltSecondary,
                    borderRadius: '0px',
                  },
                }),
                paddingBottom: '50px',
                minHeight: showAll ? '300px' : 'auto',
              }}
            >
              <Box
              >
                {itemsToDisplay?.map((item, index) => (
                  <CartItems items={item} key={index + 1} length={itemsToDisplay?.length} />
                ))}

                {hasMoreItems && (
                  <Typography
                    onClick={handleViewToggle}
                    sx={{
                      color: theme => theme.palette.custom?.tltMain,
                      fontSize: { xs: '16px', md: '18px', lg: '20px' },
                      fontWeight: 400,
                      lineHeight: '127%',
                      marginTop: { xs: '10px', md: '15px' },
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}>
                    {showAll ? 'View Less' : 'View All'}
                  </Typography>
                )}

              </Box>

              <Box
                sx={{
                  '& .MuiBox-root': {
                    marginTop: { xs: '10px', md: '20px' },
                    '& .MuiInputBase-input': {
                      padding: { xs: '10px 15px', md: '13px 20px' },
                    },
                    '& form': {
                      gridTemplateColumns: '8fr 4fr',
                    },
                  },
                }}
              >
                <CouponAccordion key='couponform' />
              </Box>
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
                },
                flexShrink: 0,
                mt: 'auto',
              }}
            >
              <CartTotals isCheckout />
            </OverlayStickyBottom>
          </>
        ) : (
          <EmptyCart
            sx={{
              minHeight: '100vh',
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
            {error && <ApolloCartErrorAlert error={error} />}
          </EmptyCart>
        )}
      </Box>
    </Box>
  )
}

