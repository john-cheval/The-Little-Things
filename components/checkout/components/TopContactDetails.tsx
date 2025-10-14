import { Box, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';

export function TopContactDetails() {
  return (
    <Box
      sx={{
        marginTop: { xs: '20px', md: '25px' },
        paddingBottom: { xs: '20px', md: '25px' },
        borderBottom: theme => `1px solid ${theme.palette.custom.tltBorder2}`,
      }}>
      <Typography
        component='p'
        className='checkout-headings'

      >Contact
      </Typography>

      <Box component='form'
        sx={{
          marginTop: { xs: '10px', md: '15px' },
          '& .MuiFormLabel-root': {
            color: '#000',
            fontSize: { xs: '16px', md: '18px' },
            lineHeight: '120%',
          },
          '& .MuiInputBase-root': {
            borderRadius: '3px',
          },
          '& fieldset': {
            borderColor: theme => `${theme.palette.custom.tltBorder2} !important`,
            borderWidth: '1px !important',

          },
          '& .mui-style-1h3u5ym-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme => theme.palette.custom.tltBorder2,
          },
        }}>
        <TextField fullWidth label="Email" variant="outlined" type='email' />
        <FormGroup
          sx={{
            marginTop: { xs: '10px', md: '15px' },
            '& .MuiFormControlLabel-root': {
              '& .MuiCheckbox-root': {
                padding: '0px 7px',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '& svg': {
                  fill: '#000',
                  fontSize: '22px',
                },
              },
              '& .MuiTypography-root': {
                color: theme => theme.palette.custom.textDarkAlter2,
                fontSize: { xs: '16px', md: '18px' },
                fontWeight: 400,
              },
            },
          }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Email me with news and offers" />
        </FormGroup>
      </Box>
    </Box>
  )
}