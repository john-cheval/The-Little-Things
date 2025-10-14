import { productEditLink, RemoveItemFromCart } from '@graphcommerce/magento-cart-items'
import { Box, Button } from '@mui/material'
import { iconDelete } from '../../../../plugins/icons'

export function CartActions({ product, size = 'responsive' }) {

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: { xs: '5px', md: '5px' },
      }}
    >

      <Button
        variant='inline'
        sx={{
          color: theme => theme.palette.custom.tltGray1,
          paddingTop: 0,
          paddingLeft: 0,
          minWidth: 0,
          background: theme => theme.palette.custom.tltContrastText,
          borderRadius: '3px',
          fontSize: { xs: '14px', md: '16px' },
          textAlign: 'center',
          fontWeight: 400,
          lineHeight: 'normal',
          margin: 0,
          padding: { xs: '3px 10px', md: '2px 15px' },
          '&:hover': {
            backgroundColor: theme => theme.palette.custom.tltContrastText,
          },
        }}
        href={`${productEditLink(product)}?cartItemId=${product?.uid}`}
      >
        Edit
      </Button>
      {/*  )} */}

      <RemoveItemFromCart
        sx={{
          '& button': {
            background: theme => theme.palette.custom.tltContrastText,
            color: theme => theme.palette.custom.tltGray1,
            fontSize: { xs: '14px', md: '16px' },
            height: 'unset',
            padding: { xs: '3px 10px', md: '2px 15px' },
            '&:hover': {
              backgroundColor: theme => theme.palette.custom.tltContrastText,
            },
          },
        }}
        isCart
        removeIcon={iconDelete}
        {...product}
        buttonProps={{ size: size === 'responsive' ? 'large' : size }}
      />
    </Box>
  )
}


