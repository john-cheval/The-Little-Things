import { Box, Link, Typography } from '@mui/material';

export function PickupLocations() {
  return (
    <Box sx={{
      marginTop: { xs: '15px', sm: '20px', md: '25px' },
    }}>

      <Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}>
          <Box>
            <Typography
              component='h6'
              sx={{
                fontSize: { xs: '16px', md: '18px' },
                color: theme => theme.palette.custom.textDarkAlter2,
                fontWeight: 700,
                lineHeight: '159%',
              }}>
              Pickup locations
            </Typography>
            <Typography
              component='p'
              sx={{
                fontSize: { xs: '15px', md: '16px' },
                color: theme => theme.palette.custom.textDarkAlter2,
                fontWeight: 400,
                lineHeight: '120%',
                marginTop: '5px',
              }}
            >
              There is 1 location with stock close to you
            </Typography>
          </Box>

          <Link href="/our-locations" sx={{
            color: '#000',
            fontSize: { xs: '14px', sm: '15px' },
            lineHeight: 'normal',
            textDecoration: 'underline',
            padding: '3px 5px',
            backgroundColor: '#f5f5f5',
            borderRadius: '3px',
            textAlign: 'center',
            height: 'fit-content',
          }}>
            Change Location
          </Link>

        </Box>

        {/* location Details */}
        <Box sx={{
          marginTop: { xs: '15px', md: '30px' },
          border: '1px solid #6B000F',
          borderRadius: '3px',
          padding: { xs: '15px', md: '20px 22px' },
          backgroundColor: '#FFD4DA52',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}>
          <Box>
            <Typography
              component='h6'
              sx={{
                fontSize: { xs: '16px', sm: '16px', md: '18px' },
                color: theme => theme.palette.custom.textDarkAlter2,
                fontWeight: 500,
                lineHeight: '120%',
              }}
            >
              The Little Things - Mall of the Emirates (11 km)
            </Typography>
            <Typography
              component='p'
              sx={{
                fontSize: { xs: '16px', sm: '16px', md: '18px' },
                color: theme => theme.palette.custom.textDarkAlter2,
                fontWeight: 400,
                lineHeight: '120%',
                marginTop: '5px',
              }}
            >
              Mall of the Emirates, Dubai Dubai
            </Typography>
          </Box>

          <Box>
            <Typography
              component='h6'
              sx={{
                fontSize: { xs: '16px', sm: '16px', md: '18px' },
                color: theme => theme.palette.custom.textDarkAlter2,
                fontWeight: 700,
                lineHeight: '120%',
                textAlign: 'right',
              }}
            >
              Free
            </Typography>
            <Typography
              component='p'
              sx={{
                fontSize: { xs: '16px', sm: '16px', md: '18px' },
                color: theme => theme.palette.custom.textDarkAlter2,
                fontWeight: 400,
                lineHeight: '120%',
                marginTop: '5px',
                textAlign: 'right',
              }}
            >
              Usually ready in 2-4 days
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}