import { Box, Button, styled, Typography } from '@mui/material';
import { type FieldValues, type Control, type RegisterOptions, Controller } from 'react-hook-form';


interface customFileUploadProps {
  name: string;
  label: string;
  control: Control<FieldValues, any>;
  rules?: RegisterOptions;
  isLabel?: boolean
}


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function CustomFileUpload({
  name,
  label,
  control,
  rules,
  isLabel = true,
}: customFileUploadProps) {
  return (
    <Box sx={{
      alignSelf: 'flex-start',
      width: '100%',
    }}>
      {isLabel && (
        <Typography className='label'>
          {label}
        </Typography>
      )}

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #A8A8A8',
        width: '100%',
        paddingBlock: { xs: '30px', md: '40px' },
        borderRadius: '3px',

      }}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { value, onChange }, fieldState }) => {
            const isFileList = typeof window !== 'undefined' && value instanceof FileList;
            return (
              <>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  color={fieldState.error ? 'error' : 'primary'}
                  sx={{
                    background: '#f3f3f3',
                    borderRadius: '3px',
                    padding: '10px 12px',
                    '&:hover': {
                      background: '#f3f3f3',
                    },
                    color: '#000',
                    fontSize: { xs: '16px', md: '18px' },
                    fontWeight: 400,
                    lineHeight: '120%',
                  }}
                >
                  {isFileList && value.length > 0 ? `${value.length} File(s) Selected` : 'Add File'}

                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      onChange(event.target.files);
                    }}
                    multiple
                  />
                </Button>

                {isFileList && value.length > 0 && (
                  <Box sx={{ mt: 1, p: 1, border: '1px solid #ccc', borderRadius: '4px' }}>
                    {Array.from(value).map((file, index) => (
                      <Typography key={`index-${index + 1}`} variant="body2" component="p">
                        - {file.name}
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Display error message */}
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


    </Box>
  )
}