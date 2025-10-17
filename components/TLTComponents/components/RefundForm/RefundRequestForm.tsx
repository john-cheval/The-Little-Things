import { Box, type SxProps, TextField, Typography, type Theme } from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomTextField } from './Inputs/Textfield';
import { CustomNumberField } from './Inputs/NumberField';

interface RecaptchaRefType {
  resetCaptcha: () => void
}


const inputFieldSx: SxProps<Theme> = {
  borderRadius: '3px',
  overflow: 'hidden',
  minWidth: { xs: '300px', md: '500px', lg: '550px' },
  border: theme => `1px solid ${theme.palette.custom.tltBorder2}`,
  '& .MuiFormLabel-root': {
    color: theme => theme.palette.custom.dark,
    fontSize: { xs: '16px', md: '18px' },
    fontWeight: 400,
    lineHeight: '120%',
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'transparent',
    '&::before, &::after': {
      display: 'none',
    },
    '& .MuiInputBase-input': {
      color: theme => theme.palette.custom.dark,
      fontSize: { xs: '16px', md: '18px' },
      fontWeight: 400,
      lineHeight: '120%',
    },
  },
}


export function RefundrequestForm() {
  const recaptchaRef = useRef<RecaptchaRefType>(null)
  const [token, setToken] = useState('')

  const { control, handleSubmit, reset } = useForm({
    // defaultValues: getDefaultValues(),
  })

  const onSubmit = /* async */ (values) => {

    if (!token) {
      console.error('Please verify the captcha')
      return
    }
    console.log(values, '==> this vale')
  }

  const handleToken = (recaptchaToken: string | null) => {
    if (recaptchaToken) {
      setToken(recaptchaToken)
    } else {
      setToken('')
    }
  }
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: { xs: '20px', md: '25px', lg: '35px' },
        rowGap: { xs: '10px', md: '15px', lg: '20px' },
        maxWidth: { xs: '300px', md: '500px', lg: '550px' },
        alignItems: 'center',
        margin: '0 auto',
        '& .label': {
          color: theme => theme.palette.custom.dark,
          fontSize: { xs: '16px', md: '18px' },
          fontWeight: 400,
          lineHeight: '120%',
          marginBottom: { xs: '8px', md: '13px' },
          paddingLeft: { xs: '15px', md: '25px' },
        },
      }}>

      <CustomTextField
        name='name'
        label='Name'
        control={control}
        rules={{ required: 'Name is Required' }}
        labelText='Enter your name'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='email'
        label='Email'
        control={control}
        rules={{
          required: 'Email is Required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        }}
        labelText='Enter your email'
        sx={inputFieldSx}
      />

      <CustomNumberField
        name='phone'
        label='Phone'
        control={control}
        countryCodeName='+971'
      />

      <CustomTextField
        name='ordernumber'
        label='Order Number'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Enter order number'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Order Number'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Date of Purchase'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Purchase Platform'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Enter here'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Other'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Other (Please specify )'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Other'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Add file'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Refund Type'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText=''
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Refund Method'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText=''
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Other'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Other (please specify)'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='ordernumber'
        label='Comments'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Optional Comments'
        sx={inputFieldSx}
      />

      <Box sx={{

      }}>
        <Typography>
          Terms & Conditions
        </Typography>
      </Box>
    </Box>
  )
}