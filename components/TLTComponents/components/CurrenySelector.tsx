import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
// import France from '../../../constants/images/flags/france.png'
// import Allemagne from '../../../constants/images/flags/germany.png';
import Suisse from '../../../constants/images/flags/switzerland.png';
import unitedStates from '../../../constants/images/flags/united-states.png';
import argentina from '../../../constants/images/flags/ar.svg';
import unitedArabEmirates from '../../../constants/images/flags/ae.svg';
import india from '../../../constants/images/flags/in.svg';






type CountryOption = {
  label: string;
  src: StaticImageData;
  link: string;
  value: string;
}

const countries: CountryOption[] = [
  {
    label: 'ae',
    src: unitedArabEmirates,
    link: '" "',
    value: 'AED',
  },
  {
    label: 'inr',
    src: india,
    link: '" "',
    value: 'INR',
  },
  {
    label: 'argentina',
    src: argentina,
    link: '" "',
    value: 'ARS',
  },

  {
    label: 'Suisse',
    src: Suisse,
    link: ' ',
    value: 'CHF',
  },
  {
    label: 'unitedStates',
    src: unitedStates,
    link: ' ',
    value: 'USD',
  },
];



const StyledFormControl = styled(FormControl)(({ theme }) => ({

  backgroundColor: 'transparent',
}));

const StyledSelect = styled(Select)(() => ({
  textAlign: 'center',
  textDecoration: 'none',
}));



export function CurrecySelctor() {
  const [countryValue, setCountryValue] = useState(countries[0].value);
  const [open, setOpen] = useState(false);

  const selectedCountry = countries.find(c => c.value === countryValue);


  const handleChange = (event: { target: { value: unknown } }) => {
    setCountryValue(event.target.value as string);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box component='form' sx={{
      '& .MuiSelect-select': {
        padding: 0,
      },
      '& fieldset': {
        border: 'none',
        padding: 0,
      },
      '& svg': {
        color: '#2d2d2d',
        fontSize: '17px',

      },
    }} autoComplete="off">
      <StyledFormControl >
        <InputLabel htmlFor="open-select" />
        <StyledSelect
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={countryValue}
          name="country"
          onChange={handleChange}
          inputProps={{
            id: 'open-select',
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  justifyContent: 'center',
                },

              },
            },
          }}
          renderValue={() => (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0, lg: 1 },
              '& span': {
                color: '#000',
                fontWeight: '600',
                fontSize: { xs: '14px' },
              },
              '& img': {
                display: { xs: 'none', lg: 'block' },
              },
            }}>
              {/* Display the Flag Image */}
              <Image
                src={selectedCountry?.src as StaticImageData}
                alt={selectedCountry?.label || 'Flag'}
                width={24}
                height={24}
              />
              {/* Display the Country Label */}
              <span>{selectedCountry?.value}</span>
            </Box>
          )}
        >
          {countries.map((option) => (
            <MenuItem
              value={option.value}
              key={option.value}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0, lg: 1 },
                '& img': {
                  display: { xs: 'none', lg: 'block' },
                },
              }}>
                <Image
                  src={option.src}
                  alt={option.label}
                  width={24}
                  height={24}
                />
                {option.value}
              </Box>
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </Box>
  )
}