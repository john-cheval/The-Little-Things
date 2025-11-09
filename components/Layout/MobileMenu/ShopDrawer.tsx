
import { Accordion, AccordionDetails, AccordionSummary, Box, Link, styled, Typography } from '@mui/material'
import { m } from 'framer-motion'
import { drawerVariants } from '../../../constants/animationVariation'
import { useRouter } from 'next/router'
import { IoIosArrowBack, IoMdArrowForward } from 'react-icons/io';
import { SearchField } from '@graphcommerce/magento-search'
import { productListRenderer } from '../../ProductListItems';
import { MobileMenuLink } from './MobileMenuLink';
import ordersIcon from './icons/order.svg'
import nameIcon from './icons/name.svg'
import mailIcon from './icons/mail.svg'
import { moreMenu } from './moreMenu';
import { megaMenu } from '../../../constants/Navbar';
import { useState } from 'react';
import { FiPlus, FiMinus } from "react-icons/fi";


const MotionDiv = styled(m.div)({})

type ShopDrawerTypes = {
  closeAllPopups: any
  // isMoreMenu: boolean
}


function AccordionIcon({ expanded }: { expanded: boolean }) {
  return expanded ? <FiMinus color='#B4001A' /> : <FiPlus color='#B4001A' />;
}

export function ShopDrawer({ closeAllPopups /* , isMoreMenu */ }: ShopDrawerTypes) {
  const router = useRouter()
  const [isSelectedItm, setIsSelectedItem] = useState(megaMenu[0])


  const handleBack = () => {
    router.back()
    closeAllPopups()
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
            Shop
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
          // paddingTop: '20px',
          // overflowY: 'scroll',
        }}>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            // gap: { xs: '10px', md: '15px' },

          }}>

            <Box sx={{
              gridColumn: { xs: 'span 5', sm: 'span 4' },
              borderRight: '1px solid #E0E0E0',
              paddingTop: { xs: '20px', md: '30px' },
            }}>

              {megaMenu?.map((menuItem, menuIndex) => {
                const isLastItem = moreMenu.length - 1 === menuIndex
                const selected = isSelectedItm?.name === menuItem?.name
                return (
                  <Box
                    key={`menuIndex-${menuIndex + 1}`}
                    sx={{
                      borderBottom: isLastItem ? 'none' : '1px solid #C8C8C8',
                      // paddingBottom: isLastItem ? '0px' : '15px',
                      marginBottom: '20px',
                    }}
                  >
                    <Box
                      key={`menuIndex-${menuIndex + 1}`}
                      onClick={() => setIsSelectedItem(menuItem)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItemslignItems: 'center',
                        cursor: 'pointer',
                        paddingBottom: '15px',

                        paddingLeft: { xs: '30px', sm: '40px' },
                        paddingRight: { xs: '15px', sm: '20px' },
                      }}>
                      <Typography sx={{
                        color: selected ? '#D90F13' : '#2d2d2d',
                        fontWeight: selected ? 700 : 500,
                        fontSize: { xs: '16px', sm: '18px' },
                        lineHeight: '120%',
                        transition: 'all 0.4 s ease-in-out',

                      }}>{menuItem?.name}</Typography>
                      {selected && (
                        <IoMdArrowForward color='#B4001A' />
                      )}
                    </Box>
                    {/* {selected && ( */}
                    <Box
                      className='selected-indicator'
                      sx={{
                        display: 'block',
                        width: selected ? '100%' : '0%',
                        background: 'linear-gradient(90deg, #B4001A 0%, #D0011F 100%)',
                        height: '10px',
                        position: 'relative',
                        border: '1px solid #fff',
                      }} />
                    {/* )} */}
                  </Box>

                )
              })}
            </Box>



            <Box sx={{
              gridColumn: { xs: 'span 7', sm: 'span 8' },
              paddingLeft: { xs: '15px', sm: '25px' },
              paddingTop: { xs: '20px', md: '30px' },
            }}>

              <Typography
                component='h3'

                sx={{
                  color: '#D90F13',
                  fontSize: { xs: '20px', sm: '25px' },
                  fontWeight: 500,
                  lineHeight: '128%',
                  borderBottom: '1px solid #C8C8C8',
                  paddingBottom: '15px',
                }}
              >{isSelectedItm?.name}</Typography>

              {isSelectedItm?.collections && (
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',

                }}>
                  {isSelectedItm?.collections?.map((collectionItem, collectionIndex) =>
                  (
                    <Link
                      onClick={closeAllPopups}
                      sx={{
                        textDecoration: 'none',
                        borderBottom: '1px solid #C8C8C8',
                        paddingBlock: { xs: '10px', sm: '15px' },
                        textTransform: 'capitalize',
                        color: '#2D2D2D',
                        fontSize: { xs: '14px', sm: '16px' },
                        fontWeight: 500,
                        lineHeight: '160%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      key={`collectionIndex-${collectionIndex + 1}`}
                      href={collectionItem?.url_path}
                    >
                      <span>{collectionItem?.name}</span>  <IoMdArrowForward color='#B4001A' size={16} />
                    </Link>
                  ),
                  )}
                </Box>
              )}

              {isSelectedItm?.subMenu && (
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  '& .mui-style-qmquhz-MuiPaper-root-MuiAccordion-root.Mui-expanded': {
                    margin: 0,
                  },
                  '& .mui-style-eqpfi5-MuiAccordionSummary-content.Mui-expanded': {
                    margin: 0,
                  },
                }}>

                  {isSelectedItm?.subMenu?.map((subMenuItem, subMenuIndex) => (
                    <Accordion
                      sx={{
                        boxShadow: 'none !important',
                        borderBottom: '1px solid #C8C8C8',
                        '& .MuiAccordionSummary-root': {
                          paddingInline: '0',
                          '&.Mui-expanded': {
                            margin: 0,
                          },
                        },
                        '& .MuiAccordionSummary-content': {
                          paddingBlock: { xs: '10px', sm: '15px' },
                          margin: 0,
                        },

                      }}>
                      <AccordionSummary expandIcon={<AccordionIcon color='#B4001A' />}
                        aria-controls={`panel${subMenuIndex + 1}-content`}
                        id={`panel${subMenuIndex + 1}-header`}>
                        <Typography sx={{
                          color: '#2D2D2D',
                          fontSize: { xs: '14px', sm: '16px' },
                          fontWeight: 500,
                          lineHeight: '160%',
                          textTransform: 'capitalize',
                          textDecoration: 'none',
                        }}>{subMenuItem?.name}</Typography>
                      </AccordionSummary>
                      {subMenuItem?.children && subMenuItem?.children?.map((childItem, childIndex) => (
                        <AccordionDetails key={`childIndex-${childIndex + 1}`} sx={{
                          padding: '0px 0px 10px 10px',
                        }}>
                          <Link href={childItem?.url_path}
                            onClick={closeAllPopups}
                            sx={{
                              textDecoration: 'none',
                              textTransform: 'capitalize',
                              color: '#2D2D2D',
                              fontSize: { xs: '14px', sm: '16px' },
                              fontWeight: 400,
                              lineHeight: '160%',
                              display: 'block',
                            }}>
                            {childItem?.name}
                          </Link>
                        </AccordionDetails>
                      ))}
                    </Accordion>
                  ))}

                </Box>
              )}

            </Box>

          </Box>
        </Box>
      </Box>
    </MotionDiv>
  )
}


