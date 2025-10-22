import { Image } from '@graphcommerce/image'
import { actionCardImageSizes } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { CartTop } from './CartTop'

export type CartItemsProps = {
  items?: any
  size?: string
  length?: number | undefined
  index?: number
}

export function CartItems({ items, size = 'responsive', length, index }: CartItemsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: { xs: '10px', md: '15px' },
        borderBottom: (theme) => ({
          xs:

            index !== (length ?? 0) - 1
              ? `1px solid ${theme.palette.custom.tltBorder5}`
              : 'none',
          lg: `1px solid ${theme.palette.custom.tltBorder5}`,
        }),
        paddingBlock: { xs: '10px', sm: '15px', md: '18px' },
        width: '100%',
      }}
    >
      <Box sx={{ flexShrink: 0, width: 'fit-content' }}>
        <Image
          layout='fill'
          src={items?.product?.thumbnail?.url}
          sx={{
            display: 'block',
            borderRadius: '3px',
            objectFit: 'cover',
            minWidth: '100px',
            maxWidth: '150px',
            border: theme => `1px solid ${theme.palette.custom.tltBorder3}`,
          }}
          sizes={actionCardImageSizes[size]}
        />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0, marginLeft: '10px' }}>
        <CartTop item={items} />
      </Box>
    </Box>
  )
}

