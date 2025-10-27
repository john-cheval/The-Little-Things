import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { type FieldValues, type Control, type RegisterOptions, Controller, type Path } from 'react-hook-form';

interface CustomCheckboxfieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues, any>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  name: Path<TFieldValues>;
  labelText?: string
  isLabel?: boolean
  options?: string[];
  // name: string;
}

export function CustomCheckBox<TFieldValues extends FieldValues>(
  {
    control,
    rules,
    isLabel = true,
    options,
    labelText,
    name,
  }: CustomCheckboxfieldsProps<TFieldValues>) {
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
          const selectedValues = Array.isArray(field.value) ? (field.value as unknown as string[]) : [];

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