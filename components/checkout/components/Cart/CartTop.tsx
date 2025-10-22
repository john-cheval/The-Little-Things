import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { truncateByChars } from '../../../../utils/truncate'
import { CartPriceAndQuantity } from './CartPriceAndQuantity'
import { CartActions } from './CartActions'

export function CartTop({ item }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <Link href={`/p/${item?.product?.url_key}`} passHref legacyBehavior>
          <Typography
            sx={{
              color: '#000',
              fontSize: { xs: '15px', md: '18px', lg: '20px' },
              fontWeight: 400,
              lineHeight: '120%',
              cursor: 'pointer',
            }}
          >
            {truncateByChars(item?.product?.name, 30)}
          </Typography>
        </Link>
      </Box>


      <Box sx={{
        display: 'flex',
        justifyContent: { xs: 'flex-start', lg: 'space-between' },
        alignItems: { xs: 'flex-start', lg: 'flex-end' },
        marginTop: { xs: '10px', lg: 'auto' },
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: '8px', lg: 0 },

      }}>

        <CartPriceAndQuantity product={item} />
        <CartActions product={item} />
      </Box>
    </Box>
  )
}

