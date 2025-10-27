import { Controller, type Control, type FieldValues, type RegisterOptions } from 'react-hook-form';
import { TextField, Typography, Box, type SxProps, type Theme } from '@mui/material';



interface CustomTextFieldProps {
  name: string;
  label: string;
  control: Control<FieldValues, any>;
  rules?: RegisterOptions;
  labelText?: string
  multiline?: boolean;
  rows?: number;
  isLabel?: boolean
  sx?: SxProps<Theme>;
}

// Reusable CustomTextField Component
export function CustomTextField({
  name,
  label,
  control,
  rules,
  multiline = false,
  rows = 1,
  isLabel = true,
  labelText,
  sx,
}: CustomTextFieldProps) {


  return (
    <Box>
      {isLabel && (
        <Typography className='label'>
          {label}
        </Typography>
      )}


      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <TextField
              {...field}
              fullWidth
              label={labelText}
              variant="filled"
              multiline={multiline}
              rows={rows}
              sx={sx}
              onChange={(e) => {
                if (name === 'ordernumber') {
                  field.onChange(e.target.value.replace(/\D/g, ''));
                } else {
                  field.onChange(e.target.value);
                }
              }}
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Typography variant='caption' color='error'>
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
}