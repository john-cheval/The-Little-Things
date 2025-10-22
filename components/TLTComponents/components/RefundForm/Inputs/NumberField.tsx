
import { type Control, FieldValues, RegisterOptions, UseFormSetValue } from 'react-hook-form';

import { TextField, Typography, Box, type SxProps, type Theme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { countriesList } from '../../../../../constants/countriesList';
import { CustomTextField } from './Textfield';


type CountryOption = {
  code: string;
  label: string;
  phone: string;
}

interface CustomNumberFieldProps {
  name: string;
  countryCodeName: string;
  label: string;
  control: Control<FieldValues, any>;
  rules?: RegisterOptions;
  sx?: SxProps<Theme>;
  setValue: UseFormSetValue<FieldValues>;
}

const inputFieldSx: SxProps<Theme> = {
  borderRadius: '3px',
  overflow: 'hidden',
  // minWidth: { xs: '300px', md: '500px', lg: '550px' },
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

export function CustomNumberField(
  {
    label,
    control,
    countryCodeName,
    setValue,
  }: CustomNumberFieldProps) {

  const defaultCountry: CountryOption = countriesList.find(c => c.code === 'AE') || {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  };
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(defaultCountry);
  // const [value, setValue] = useState<{ code: string; label: string; phone: string } | null>(null);
  const [open, setOpen] = useState(false);

  // const { setValue } = control._formValues;
  const handleCountryChange = (newValue: CountryOption | null) => {
    setSelectedCountry(newValue);

    // 4. Update the country code field in react-hook-form state
    setValue(countryCodeName, newValue ? `+${newValue.phone}` : '', { shouldValidate: true, shouldDirty: true });
  };
  return (
    <Box>
      <Typography className='label'>
        {label}
      </Typography>


      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12,1fr)',
          gap: '16px',
          minWidth: { xs: '300px', md: '500px', lg: '550px' },
          '& .MuiAutocomplete-root': {
            gridColumn: 'span 3',
            '& .MuiAutocomplete-endAdornment': {
              display: 'none',
            },
          },
          '& .MuiBox-root': {
            gridColumn: 'span 9',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme => `${theme.palette.custom.tltBorder2} !important`,
            borderWidth: '1px !important',
          },

        }}>
        <Autocomplete
          id="country-select-demo"
          value={selectedCountry}
          options={countriesList}
          autoHighlight
          onChange={(event, newValue) => handleCountryChange(newValue)}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
                value: '',
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: selectedCountry ? (
                  <InputAdornment position="start" onClick={() => setOpen(true)} sx={{ mr: 0, cursor: 'pointer' }}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                  </InputAdornment>
                ) : null,
              }}

              sx={{
                // 1. Style to make the select menu fit its content
                width: '100px',
                minWidth: '70px',
                // Keep the input text hidden
                '& .MuiInputBase-input': {
                  display: 'none',
                },
              }}
            />
          )}
        />

        <CustomTextField
          name='phone'
          label='Phone'
          isLabel={false}
          control={control}
          rules={{
            required: 'Phone Number is Required',
            pattern: {
              value: /^[0-9]*$/,
              message: 'Only numbers are allowed',
            },
            minLength: {
              value: 7,
              message: 'Phone number is too short',
            },
            maxLength: {
              value: 15,
              message: 'Phone number is too long',
            },
          }}
          sx={inputFieldSx}
          labelText='Phone'
        />
      </Box>
    </Box>
  )
}