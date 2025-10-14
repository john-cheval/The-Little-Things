import { Box, Link, Typography } from '@mui/material'
import { Image } from '@graphcommerce/image'
import gpay from '../../TLTComponents/assets/chekout/gpay.png'

export function TopBannerMesasge() {
  return (
    <Box>
      <Box

      >
        <Link href='/account/signin?tab=signin'
          sx={{
            color: '#fff',
            fontSize: { xs: '18px', md: '18px' },
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: '120%',
            textTransform: 'uppercase',
            marginInline: 'auto',
            textDecoration: 'none',
            display: 'block',
            background: 'linear-gradient(90deg, #6B000F 0%, #D0011F 100%)',
            paddingBlock: { xs: '20px', md: '20px' },
            width: '100%',
            borderRadius: '3px',
          }}
        >
          Login/signup
        </Link>
        <Link href='#' sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '3px',
          border: theme => `1px solid ${theme.palette.custom.tltBorder2}`,
          background: theme => theme.palette.custom.tltContrastText,
          paddingBlock: { xs: '6px', md: '6px' },
          paddingInline: { xs: '10px', md: '25px' },
          textDecoration: 'none',
          marginTop: { xs: '10px', md: '16px' },

        }}>
          <Typography
            sx={{
              color: '#000',
              fontSize: { xs: '16px', md: '18px' },
              lineHeight: '120%',
            }}>
            Express Checkout
          </Typography>

          <Image
            src={gpay}
            alt='gPay'
            sx={{
              // width: '100%',
              // height: 'auto',
              // objectFit: 'cover',
              // maxWidth: '60px',
              marginTop: { xs: '10px', md: '10px' },
              width: 'revert-layer',
            }} />
        </Link>
      </Box>


    </Box>

  )
}

