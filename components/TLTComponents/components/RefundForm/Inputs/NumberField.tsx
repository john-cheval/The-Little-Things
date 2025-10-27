
import type { Control, FieldValues, Path, RegisterOptions, UseFormSetValue } from 'react-hook-form';
import { TextField, Typography, Box, type SxProps, type Theme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { countriesList } from '../../../../../constants/countriesList';
import { CustomTextField } from './Textfield';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';


type CountryOption = {
  code: string;
  label: string;
  phone: string;
}

interface CustomNumberFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  countryCodeName: string;
  label: string;
  control: Control<TFieldValues, any>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
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

export function CustomNumberField<TFieldValues extends FieldValues>(
  {
    label,
    control,
    countryCodeName,
    setValue,
  }: CustomNumberFieldProps<TFieldValues>) {

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

  const handleInputClick = () => {
    setOpen((prev) => !prev)
  }
  return (
    <Box sx={{
      width: '100%',
    }}>
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
            '& .MuiInputBase-root': {
              borderRadius: '3px',
              paddingRight: '0px !important',
              justifyContent: 'space-around',
            },

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
          slotProps={{
            paper: {
              sx: {
                background: '#fff',
                position: 'absolute',
                zIndex: '9999999',
                minWidth: { xs: '300px', md: '400px' },
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              },
            },
          }}

          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{
                '& ul': {
                  color: 'green',
                },
                '&  img': {
                  mr: 2,
                  flexShrink: 0,
                  width: { xs: '30px', height: '100%' },
                  objectFit: 'cover',
                  paddingBlock: { xs: '15px' },
                },
              }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt="country"
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
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1, cursor: 'pointer' }}>
                    {open ? <IoMdArrowDropup color='#000' size={20} /> : <IoMdArrowDropdown color='#000' size={20} />}
                  </InputAdornment>
                ),
                startAdornment: selectedCountry ? (
                  <InputAdornment
                    position="start"
                    onClick={handleInputClick}
                    sx={{
                      mr: 0, cursor: 'pointer',
                      paddingBlock: '8px',
                      height: '100%',
                      maxHeight: '100%',
                      paddingInline: '8px',
                      '& img': {
                        width: '30px',
                        height: '100%',
                      },
                    }}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                      alt="country"
                    />
                  </InputAdornment>
                ) : null,
              }}

              sx={{
                // 1. Style to make the select menu fit its content
                // width: '100px',x
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
          name={'phone' as Path<TFieldValues>}
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