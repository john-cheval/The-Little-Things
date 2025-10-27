import { Box, Select, Typography, type SxProps, type Theme, MenuItem } from '@mui/material';
import { type FieldValues, type Control, type RegisterOptions, Controller } from 'react-hook-form';


interface customSelectFielldProps {
  label: string;
  control: Control<FieldValues, any>;
  rules?: RegisterOptions;
  labelText?: string
  isLabel?: boolean
  sx?: SxProps<Theme>;
  options?: any;
  name: string;

}

export function CustomSelectField({
  label,
  control,
  rules,
  isLabel = true,
  sx,
  options,
  labelText,
  name,
}: customSelectFielldProps) {


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

            <Select
              {...field}
              label={labelText}
              variant='filled'
              sx={{
                ...sx,
                '& .MuiSelect-select.MuiSelect-filled.MuiInputBase-input': {
                  paddingBlock: '17px !important',
                },
                '& .MuiSelect-select.MuiSelect-filled.MuiInputBase-input:focus': {
                  backgroundColor: '#fff !important',
                },
                '& svg': {
                  color: '#000',
                  fontSize: { xs: '20px', md: '25px' },
                },
              }}
              fullWidth
              error={!!fieldState.error}
            >

              {options?.map((item, index) => (
                <MenuItem key={`index-${index + 1}`} value={item}>{item}</MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <Typography variant='caption' color='error'>
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  )
}