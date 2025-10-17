import { Box, Typography } from '@mui/material';

export function InfiniteMarquee({ text }) {
  const repetitions = Array.from({ length: 20 });
  return (
    <Box
      sx={{

        backgroundColor: (theme: any) => theme.palette.custom.tltMain,
        paddingBlock: { xs: '12px' },
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        boxSizing: 'border-box',
        display: { xs: 'none', md: 'block' },
      }}
    >


      <div className="wrapper">
        <div className="marquee-text">
          <div className="marquee-text-track">
            {repetitions?.map((_, index) => (
              <Typography key={`index-${index + 1}`}>
                {text}
              </Typography>
            ))}
            {/* <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p>
            <p aria-hidden="true">{text}</p> */}
          </div>
        </div>
      </div>
    </Box>
  )
}