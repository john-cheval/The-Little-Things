import { Box, TextField, Typography, type SxProps, type Theme } from '@mui/material';
import { type FieldValues, type Control, type RegisterOptions, Controller, type Path } from 'react-hook-form';


interface CustomDateFieldProps<TFieldValues extends FieldValues> {
  label: string;
  control: Control<TFieldValues, any>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  labelText?: string
  multiline?: boolean;
  rows?: number;
  isLabel?: boolean
  sx?: SxProps<Theme>;
  dayName: Path<TFieldValues>;
  monthName: Path<TFieldValues>;
  yearName: Path<TFieldValues>;
}
export function CustomDateField<TFieldValues extends FieldValues>({
  label,
  control,
  rules,
  isLabel = true,
  dayName,
  monthName,
  yearName,
  sx,
}: CustomDateFieldProps<TFieldValues>) {

  const dateInputSx: SxProps<Theme> = {
    ...sx,
    minWidth: 'fit-content !important',
    '& ..MuiFilledInput-root :': {
      padding: 0,
    },
  }

  const combinedRules = rules || {
    required: 'Date is required',
    maxLength: { value: 4, message: 'Invalid length' },
  };
  return (
    <Box sx={{
      width: '100%',
    }}>
      {isLabel && (
        <Typography className='label'>
          {label}
        </Typography>
      )}

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: { xs: '10px', md: '16px' },
        minWidth: { xs: '300px', md: '500px', lg: '550px' },

      }}>

        {/* Date */}
        <Controller
          name={dayName}
          control={control}
          rules={combinedRules}
          render={({ field, fieldState }) => (
            <>
              <TextField
                {...field}
                fullWidth
                label='DD'
                variant="filled"
                sx={dateInputSx}
                type='number'
                inputProps={{
                  min: 1,
                  max: 31,
                  maxLength: 2,
                }}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(31, parseInt(e.target.value, 10) || 1));
                  field.onChange(value > 0 ? value : '');
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

        {/* month */}
        <Controller
          name={monthName}
          control={control}
          rules={combinedRules}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label='MM'
              variant="filled"
              type='number'
              inputProps={{ min: 1, max: 12, maxLength: 2 }}
              onChange={(e) => {
                const value = Math.max(1, Math.min(12, parseInt(e.target.value, 10) || 1));
                field.onChange(value > 0 ? value : '');
              }}
              error={!!fieldState.error}
              sx={dateInputSx}
            />
          )}
        />

        {/* Year */}
        <Controller
          name={yearName}
          control={control}
          rules={combinedRules}
          render={({ field, fieldState }) => (
            <>
              <TextField
                {...field}
                label='YYYY'
                variant="filled"
                type='number'
                inputProps={{ min: 1900, max: 2100, maxLength: 4 }}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 4);
                  field.onChange(value.replace(/\D/g, ''));
                }}
                error={!!fieldState.error}
                sx={dateInputSx}
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
    </Box>
  )
}