import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { useState } from 'react';

type CountryOption = {
  label: string;
  link: string;
  value: string;
}

const languages: CountryOption[] = [
  {
    label: 'English',
    link: '" "',
    value: 'En',
  },
  {
    label: ' Spanish',
    link: ' ',
    value: 'sp',
  },

];

const StyledFormControl = styled(FormControl)(({ theme }) => ({

  backgroundColor: 'transparent',
}));

const StyledSelect = styled(Select)(() => ({
  textAlign: 'center',
  textDecoration: 'none',
}));



export function LangauageSelctor() {
  const [languageValue, setLanguageValue] = useState(languages[0].value);
  const [open, setOpen] = useState(false);

  const selectedLanguage = languages.find(c => c.value === languageValue);


  const handleChange = (event: { target: { value: unknown } }) => {
    setLanguageValue(event.target.value as string);
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
          value={languageValue}
          name="language"
          onChange={handleChange}
          inputProps={{
            id: 'open-select',
          }}

          renderValue={() => (
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 1, '& span': {
                color: '#000',
                fontWeight: '600',
                fontSize: { xs: '14px' },
              },
            }}>
              <span>{selectedLanguage?.value}</span>
            </Box>
          )}
        >
          {languages.map((option) => (
            <MenuItem
              value={option.value}
              key={option.value}
              sx={{
                background: 'red',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {option.value}
              </Box>
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </Box >
  )
}