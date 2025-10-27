import { Controller, type Control, type FieldValues, type RegisterOptions, type Path } from 'react-hook-form';
import { TextField, Typography, Box, type SxProps, type Theme } from '@mui/material';



interface CustomTextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues, any>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  labelText?: string
  multiline?: boolean;
  rows?: number;
  isLabel?: boolean
  sx?: SxProps<Theme>;
}

// Reusable CustomTextField Component
export function CustomTextField<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  rules,
  multiline = false,
  rows = 1,
  isLabel = true,
  labelText,
  sx,
}: CustomTextFieldProps<TFieldValues>) {


  return (
    <Box sx={{
      width: '100%',
    }}>
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