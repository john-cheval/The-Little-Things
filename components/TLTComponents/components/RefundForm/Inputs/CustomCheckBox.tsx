import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { type FieldValues, type Control, type RegisterOptions, Controller } from 'react-hook-form';

interface CustomCheckboxfieldsProps {
  control: Control<FieldValues, any>;
  rules?: RegisterOptions;
  labelText?: string
  isLabel?: boolean
  options?: string[];
  name: string;
}

export function CustomCheckBox(
  {
    control,
    rules,
    isLabel = true,
    options,
    labelText,
    name,
  }: CustomCheckboxfieldsProps) {
  return (
    <Box
      sx={{
        alignSelf: 'flex-start',
      }}>
      {isLabel && (
        <Typography className='label'
          sx={{
            paddingLeft: '0 !important',
            marginBottom: { xs: '5px !important', md: '8px !important' },
          }}>
          {labelText}
        </Typography>
      )}


      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const selectedValues = Array.isArray(field.value) ? field.value : [];

          const handleToggle = (itemValue: string, checked: boolean) => {
            const newArray = checked
              ? [...selectedValues, itemValue] // Add item if checked
              : selectedValues.filter(value => value !== itemValue); // Remove item if unchecked

            field.onChange(newArray); // Update RHF state
          };

          return (
            <>
              <FormGroup sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTypography-root': {
                  color: theme => theme.palette.custom.dark,
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 400,
                  lineHeight: '120%',
                },
              }}>
                {options?.map((item, index) => (
                  <FormControlLabel
                    key={`index-${index + 1}`}
                    control={
                      <Checkbox
                        checked={selectedValues.includes(item)}
                        onChange={(e) => handleToggle(item, e.target.checked)}
                        value={item}
                        name={item} />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
              {fieldState.error && (
                <Typography variant='caption' color='error'>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )
        }}
      />
    </Box>
  )
}