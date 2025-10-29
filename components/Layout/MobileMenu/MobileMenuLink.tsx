import { Box, Typography } from '@mui/material';
import rightArrow from './icons/arrow_forward_ios.svg'
import Link from 'next/link';
import Image from 'next/image';

type MobilemenuProps = {
  icon: string;
  link: string;
  title: string;
  subTitle?: string;
  subTitleTwo?: string;
}

export function MobileMenuLink({ icon, link, title, subTitle, subTitleTwo }: MobilemenuProps) {
  return (
    <Link
      href={link || '#'}
      passHref
      legacyBehavior
      style={{
        textDecoration: 'none',
      }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottom: '1px solid #C8C8C8',
        paddingBottom: '20px',

      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          '& img': {
            marginTop: { xs: '7px' },
            minWidth: { xs: '15px', md: '18px' },
            height: 'auto',
          },
        }}>
          <Image src={icon} alt={title} />
          <Box>
            <Typography component='p' className='mobile_menu_title'>
              {title}
            </Typography>
            {(subTitleTwo || subTitle) && (
              <Typography component='p'>
                {subTitle && <span className='mobile_menu_subTitle'>{subTitle}</span>}
                {subTitleTwo && <span className='mobile_menu_subTitleTwo'>{subTitleTwo}</span>}
              </Typography>
            )}

          </Box>
        </Box>
        <Image src={rightArrow} alt='rightArrow' style={{
          marginTop: '8px',
          width: '15px',
          height: 'auto',
        }} />
      </Box>
    </Link>
  )
}