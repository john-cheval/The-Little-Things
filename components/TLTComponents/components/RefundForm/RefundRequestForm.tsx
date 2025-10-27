import { Box, type SxProps, type Theme, Button, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomTextField } from './Inputs/Textfield';
import { CustomNumberField } from './Inputs/NumberField';
import { CustomDateField } from './Inputs/CustomDateField';
import { CustomSelectField } from './Inputs/CustomSelectField';
import { purchasePlatforms, refundOptions, refundType, returnMethodOptions } from '../../../../constants/refunFormOptions';
import { CustomCheckBox } from './Inputs/CustomCheckBox';
import { CustomFileUpload } from './Inputs/CustomUploadField';
import ReCaptcha from '../../../../utils/ReCaptcha';

interface RecaptchaRefType {
  resetCaptcha: () => void
}


const inputFieldSx: SxProps<Theme> = {
  borderRadius: '3px',
  overflow: 'hidden',
  minWidth: { sm: '550px', md: '500px', lg: '550px' },
  backgroundColor: 'transparent',
  '&::after,&::before': {
    display: 'none',
  },
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

  const [state, setState] = useState({
    confirm: false,
    refundPolicy: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { confirm, refundPolicy } = state;
  const error = [confirm, refundPolicy].filter((v) => v).length !== 2;

  const { control, handleSubmit /* , reset*/, setValue } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      ordernumber: '',
      purchaseDay: '',
      purchaseMonth: '',
      purchaseYear: '',
      purchasePlatform: '',
      others: '',
      refundType: '',
      returnMethod: '',
      othersRefundMethod: '',
      comments: '',

      refundReasons: [],
      othersfiles: null,
    },

  })

  const onSubmit = /* async */ (values) => {

    if (!token) {
      console.error('Please verify the captcha')
      return
    }

    const dateOfPurchase = `${values.purchaseYear}-${values.purchaseMonth}-${values.purchaseDay}`;

    const files = values.othersfiles;
    const fileNames = files instanceof FileList ? Array.from(files).map(f => f.name) : 'No files attached';


    const submissionData = {
      // Basic fields
      name: values.name,
      email: values.email,
      phone: values.phone,
      countryCode: values.countryCode,
      ordernumber: values.ordernumber,

      dateOfPurchase,
      purchasePlatform: values.purchasePlatform,
      refundReasons: values.refundReasons, // Array of strings

      // Other fields
      others: values.others,
      refundType: values.refundType,
      returnMethod: values.returnMethod,
      othersRefundMethod: values.othersRefundMethod,
      comments: values.comments,

      // Files (only names for console log)
      attachmentFileNames: fileNames,
    };
    console.log('--- FORM SUBMISSION DATA ---');
    console.log(submissionData);
    console.log('----------------------------');
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
        rowGap: { xs: '15px', lg: '20px' },
        maxWidth: { xs: '100%', md: '500px', lg: '550px' },
        alignItems: 'center',
        margin: { xs: 'none', md: '0 auto' },
        '& .label': {
          color: theme => theme.palette.custom.dark,
          fontSize: { xs: '16px', md: '18px' },
          fontWeight: 400,
          lineHeight: '120%',
          marginBottom: { xs: '8px', md: '13px' },
          paddingLeft: { xs: '0px', md: '25px' },
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
        setValue={setValue as any}
      />

      <CustomTextField
        name='ordernumber'
        label='Order Number'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Enter order number'
        sx={inputFieldSx}
      />

      <CustomDateField
        label='Date Of Purchase'
        dayName='purchaseDay'
        monthName='purchaseMonth'
        yearName='purchaseYear'
        control={control}
        rules={{ required: 'Date of Purchase is Required' }}
        sx={inputFieldSx}
      />

      <CustomSelectField
        name='purchasePlatform'
        label='Purchase Platform'
        control={control}
        rules={{ required: 'Purchase Platform is Required' }}
        labelText='Purchase Platform'
        options={purchasePlatforms}
        sx={inputFieldSx}
      />


      <CustomCheckBox
        name='refundReasons'
        labelText='Refund Type (Select the applicable refund reason)'
        control={control}
        rules={{
          required: 'Please select at least one reason',
        }}
        options={refundOptions}
      />

      <CustomTextField
        name='others'
        label='Other'
        control={control}
        rules={{ required: 'Order Number is Required' }}
        labelText='Other (Please specify )'
        sx={inputFieldSx}
      />


      <CustomFileUpload
        name='othersfiles'
        label='Other'
        control={control}
        rules={{
          validate: (value) => (value && value.length > 0) || 'Please upload at least one file.',
        }}
      />

      <CustomSelectField
        name='refundType'
        label='Refund Type'
        control={control}
        rules={{ required: 'Refund Type is Required' }}
        labelText='Refund Type'
        options={refundType}
        sx={inputFieldSx}
      />

      <CustomSelectField
        name='returnMethod'
        label='Return Method'
        control={control}
        rules={{ required: 'Return Method is Required' }}
        labelText='Return Method'
        options={returnMethodOptions}
        sx={inputFieldSx}
      />

      <CustomTextField
        name='othersRefundMethod'
        label='Other'
        control={control}
        rules={{ required: 'others is Required' }}
        labelText='Other (please specify)'
        sx={inputFieldSx}
      />

      <CustomTextField
        name='comments'
        label='Comments'
        control={control}
        rules={{ required: 'comments is Required' }}
        labelText='Optional Comments'
        sx={inputFieldSx}
        rows={5}
        multiline
      />


      <Box sx={{ marginTop: '10px' }}>
        <ReCaptcha
          siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          callback={handleToken}
          ref={recaptchaRef}
        />
      </Box>

      <Box sx={{
        alignSelf: 'start',
        '& .MuiTypography-root': {
          fontSize: { xs: '16px', md: '18px' },
          color: '#2d2d2d',
          // lineHeight: '120%',
          fontWeight: 400,
        },
        '& label': {
          alignItems: 'start',

        },
        '& .mui-style-1vh3k4s-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
          color: '#000',
        },
      }}>
        <Typography sx={{
          marginBottom: { xs: '10px', md: '15px' },
          marginTop: { xs: '10px', md: '20px' },
        }}>
          Terms & Conditions
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="confirm" />
            }
            label="I confirm that all the information provided is accurate and truthful to the best of my knowledge"
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} name="refundPolicy" />
            }
            label="Refunds are subject to our Refund Policy.  By submitting this form, you agree that request will be reviewed and processed in accordance with our policy."
          />
        </FormGroup>
      </Box>
      <Box sx={{
        marginTop: { xs: '10px', md: '20px' },
        width: '100%',
      }}>
        <Button
          disabled={error}
          sx={(theme) => ({
            backgroundColor: theme.palette.custom.tltSecondary,
            color: theme.palette.custom.tltContrastText,
            width: '100%',
            borderRadius: '3px',
            fontSize: { xs: '16px', md: '18px' },
            textAlign: 'center',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: '120%',
            paddingBlock: '18px',
            border: `1px solid ${theme.palette.custom.tltSecondary}`,
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.palette.custom.tltSecondary,
            },
          })}>Submit</Button>
      </Box>
    </Box>
  )
}