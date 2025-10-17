import { Box } from '@mui/material';
import { RefundrequestForm } from './RefundRequestForm';

export function RefundFormPage({ content }) {
  return (
    <Box
      component='section'
      className='container-wrapper'
      sx={{
        marginTop: { xs: '20px', md: '40px', lg: '50px', xl: '63px' },
        marginBottom: { xs: '40px', md: '60px', lg: '80px', xl: '100px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& h1': {
          margin: 0,
          marginBottom: { xs: '10px', md: '8px', lg: '10px' },
        },
        '& .refundForm_container p': {
          color: theme => theme.palette.custom.dark,
          fontSize: { xs: '16px', md: '18px' },
          textAlign: 'center',
          fontWeight: 400,
          lineHeight: 'normal',
          maxWidth: '80%',
          margin: '0 auto',
        },
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />

      <RefundrequestForm />
    </Box>
  )
}