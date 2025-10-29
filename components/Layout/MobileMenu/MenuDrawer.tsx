
import { Box, styled, Typography } from '@mui/material'
import { m } from 'framer-motion'
import { drawerVariants } from '../../../constants/animationVariation'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io';
import { SearchField } from '@graphcommerce/magento-search'
import { productListRenderer } from '../../ProductListItems';
import { MobileMenuLink } from './MobileMenuLink';
import ordersIcon from './icons/order.svg'
import nameIcon from './icons/name.svg'
import mailIcon from './icons/mail.svg'
import { moreMenu } from './moreMenu';


const MotionDiv = styled(m.div)({})

export function MenuDrawer({ setIsOpen }) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
    setIsOpen(false)
  }
  return (
    <MotionDiv
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: '80px',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 99999,
        padding: '24px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '30px',
        overflowY: 'auto',
      }}
    >
      <Box sx={{
        marginTop: '20px',

      }}>
        <Box
          // className='container-wrapper'
          onClick={handleBack}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            paddingBottom: '15px',
          }}>
          <IoIosArrowBack size={20} />
          <Typography
            sx={{
              background: 'linear-gradient(90deg, #2D2D2D 0%, #B4001A 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              width: 'fit-content',
              fontSize: '20px !important',
              fontWeight: 700,
              lineHeight: '120%',
            }}>
            Profile
          </Typography>
        </Box>
        <Box>
          <SearchField
            visible
            isNav
            formControl={{
              sx: {
                width: '100%',
                color: (theme: any) => theme.palette.custom.textDarkAlter2,
                '& .MuiOutlinedInput-root': {
                  color: (theme: any) => theme.palette.custom.textDarkAlter2,
                  fontSize: '14px',
                  borderRadius: '3px',
                  background: 'transparent',
                  paddingRight: '0px',
                  width: '100%',
                  '& input': {
                    padding: '15px 12px',
                  },
                  '& .MuiOutlinedInput-input, & .MuiOutlinedInput-input::placeholder': {
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '158%',
                    color: (theme: any) => theme.palette.custom.textDarkAlter2,
                    opacity: 1,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme: any) => theme.palette.custom.tltBorder4,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme: any) => theme.palette.custom.tltBorder4,
                  },

                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme: any) => theme.palette.custom.tltBorder4,
                  },

                },
              },
            }}
            searchField={{ productListRenderer }}

          />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: { xs: '25px', md: '30px' },
          borderTop: '1px solid #C8C8C8',
          paddingTop: '20px',
          overflowY: 'scroll',
        }}>

          <MobileMenuLink icon={ordersIcon} link='/account/orders' title='Orders' subTitle='6 days ago' subTitleTwo='6 days ago' />
          <MobileMenuLink icon={nameIcon} link='/account/name' title='Name' subTitle='John Doe' />
          <MobileMenuLink icon={mailIcon} link='/account/contact' title='Contact' subTitle='Johndoe@example.com' />

          {/* Animated Links */}
          {moreMenu?.map((item, i) => (
            <MotionDiv
              key={item.id}
              custom={i}
              initial='hidden'
              animate='visible'
              exit='hidden'
              onClick={() => setIsOpen(false)}
              variants={drawerVariants}
            >
              <MobileMenuLink icon={item?.icon} link={item?.link} title={item?.title} subTitle={item?.subTitle} />
            </MotionDiv>
          ))}
        </Box>
      </Box>
    </MotionDiv>
  )
}


