import { useDisplayInclTax } from '@graphcommerce/magento-cart'
import { UpdateItemQuantity } from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

export function CartPriceAndQuantity({ product }) {
  const inclTaxes = useDisplayInclTax()
  const [currentQuantity, setCurrentQuantity] = useState(product?.quantity)
  useEffect(() => {
    setCurrentQuantity(product?.quantity)
  }, [product?.quantity])

  let unitPrice: number | null | undefined

  if (inclTaxes) {
    if (product?.prices?.price_including_tax) {
      unitPrice = product?.prices.price_including_tax.value
    } else {
      const rowTotalIncludingTax = product?.prices?.row_total_including_tax?.value ?? 0
      unitPrice = rowTotalIncludingTax / product?.quantity
    }
  } else {
    unitPrice = product?.prices?.price.value
  }

  const totalPrice = (unitPrice || 0) * currentQuantity
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        component='div'
        className='orderProduct'
        sx={{
          '& span': {
            fontSize: { xs: '15px', md: '16px', lg: '20px' },
            lineHeight: '24px',
            fontWeight: '700',
            color: '#000000',
            fontFamily: "'Inter', sans-serif",
            '&:first-child': {
              paddingRight: '6px',
            },
          },
        }}
      >
        <Money value={totalPrice} currency={product?.prices?.price.currency} />
      </Box>
      <Box sx={{ marginTop: { xs: '0', md: '8px' } }}>
        <UpdateItemQuantity
          sx={{
            flexShrink: '0',
            '& .MuiOutlinedInput-root': {
              color: theme => theme.palette.custom.textDarkAlter2,
              borderRadius: '3px',
              background: theme => theme.palette.custom.tltContrastText,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => theme.palette.custom.tltBorder4,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => theme.palette.custom.tltBorder4,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme => theme.palette.custom.tltBorder4,
            },
            '& .MuiButtonBase-root': {
              color: 'red',
              fontsize: { xs: '15px', lg: '18px' },
              fontWeight: 500,
            },
            '& .MuiInputBase-input': {
              color: theme => theme.palette.custom.textDarkAlter2,
              fontWeight: 400,
              fontsize: { xs: '15px', lg: '16px' },
            },
            '& .MuiButtonBase-root svg': {
              fontSize: { xs: '15px', md: '18px' },
              stroke: theme => theme.palette.custom.textPopmart,
              strokeWidth: '1.7px',
            },
          }}
          uid={product?.uid}
          quantity={product?.quantity}
          key={product?.quantity}
        />
      </Box>
    </Box>
  )
}


