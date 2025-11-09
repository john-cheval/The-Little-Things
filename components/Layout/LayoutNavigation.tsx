import { CartFab } from '@graphcommerce/magento-cart'
import { CustomerFab } from '@graphcommerce/magento-customer'
import { SearchField } from '@graphcommerce/magento-search'
import { WishlistFab } from '@graphcommerce/magento-wishlist'
import type { LayoutDefaultProps } from '@graphcommerce/next-ui'
import {
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  iconHeart,
  IconSvg,
  LayoutDefault,
} from '@graphcommerce/next-ui'
import { Box, Link, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
// import { decodeHtmlEntities } from '../../utils/htmlUtils'
import { productListRenderer } from '../ProductListItems/productListRenderer'
import { Footer } from './Footer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'
import { InfiniteMarquee } from '../TLTComponents/Shared/InfiniteMarquee'
import { CurrecySelctor } from '../TLTComponents/components/CurrenySelector'
import { LangauageSelctor } from '../TLTComponents/components/LanguageSelector'
// import popmartImage from '../Assets/popmart.png'
// import Image from 'next/image'
import { megaMenu } from '../../constants/Navbar'
import { MegaMenu } from './MegaMenu'
import { PopoverMenu } from './PopoverMenu'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'
import { MobileMenu } from './MobileMenu/MobileMenu'
// import { Image } from '@graphcommerce/image'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, ...uiProps } = props

  const router = useRouter()
  const isHome = router?.pathname === '/'
  const ischeckout = router?.pathname === '/checkout'
  // console.log(ischeckout, router?.pathname, '==>tuter')

  // const footerCmsData = props?.footer?.items?.[0]
  // const menuItemsCmsData = props?.menu?.items?.[0]?.children
  // const decodedFooterData = decodeHtmlEntities(footerCmsData?.content)
  const [scroll, setScroll] = useState<boolean>(false)
  const [subMenuItem, setSubMenuItem] = useState<any>()
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [isMegaMenu, setIsMegaMenu] = useState<any>(false);
  const [menuPosition, setMenuPosition] = useState<number | 'center' | any>('center')


  const handleMouseOver = (item, event) => {
    setSubMenuItem(item)
    const hasSubContent = (item?.subMenu && item.subMenu !== false);
    if (hasSubContent) {
      setMenuActive(true)
      const isFull = item.collections && item.collections !== false;
      setIsMegaMenu(isFull);

      if (!isFull && event && event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        setMenuPosition(rect.left + rect.width / 2);
      } else {
        setMenuPosition('center');
      }
    } else {
      setMenuActive(false)
      setIsMegaMenu(false);
      setMenuPosition('center');
    }

  }

  const handleMouseLeaveNav = () => {
    setTimeout(() => {
      setMenuActive(false);
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    // return window.removeEventListener('scroll', handleScroll)
  }, [])

  const staticPageLinks = [
    {
      name: 'Our Locations',
      path: '/our-locations',
    },
    {
      name: 'Who We Are',
      path: '/about-us',
    },
    {
      name: 'Refund Request Form',
      path: '/refund-form',
    },
    {
      name: 'FAQs',
      path: '/faq',
    },
    {
      name: 'Terms & Conditions',
      path: '/terms-conditions',
    },
  ]

  const isSmallScreen = useMediaQuery('(max-width:768px)')

  const isStaticPage = staticPageLinks?.filter((item) => item?.path === router?.pathname)
  const isPaddingTop = isStaticPage && isSmallScreen;


  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <InfiniteMarquee text='We do international shipping' />
      <LayoutDefault
        sx={{
          position: 'sticky',
          top: '0',
          left: '0',
          width: '100%',

          '& .LayoutDefault-header': {
            // height: { xs: '65px', md: 'fit-content', lg: 'fit-content' },
            height: 'fit-content',
            paddingInline: { xs: '13px', sm: '18px', md: '25px', lg: '40px', xl: '55px' },
            // boxShadow: { xs: '0px -9px 24px #00000026', md: 'none' },
            display: { xs: 'block' },
            boxShadow: { xs: 'none', md: '0 4px 6.8px 0 rgba(0, 1, 6, 0.07)' },

            ...(scroll ? { boxShadow: '0 4px 6.8px 0 rgba(0, 1, 6, 0.07)' } : {}),
          },
        }}
        {...uiProps}
        header={
          <Box
            sx={{
              display: { xs: ischeckout ? 'none' : 'flex', md: 'flex' },
              flexDirection: 'column',
              paddingTop: { xs: isPaddingTop ? '15px' : '0', md: 0 },
              paddingBottom: { xs: isPaddingTop ? '20px' : '0', md: 0 },
              // paddingBlock: { xs: !isPaddingTop ? '20px' : 0, md: 0 },
            }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingBlock: { xs: '0px', md: '5px', lg: scroll ? '10px' : '23px' },
              // borderBottom: theme => `1px solid ${theme.palette.custom.tltBorder1}`,
              borderBottom: { xs: 0, lg: theme => `1px solid ${theme.palette.custom.tltBorder1}` },
              transition: 'all 0.4s ease-in-out',
              paddingBottom: { xs: '10px', md: 0 },
            }}>
              {(isStaticPage && isStaticPage?.length > 0 && isSmallScreen) ? (
                <Box
                  // className='container-wrapper'
                  onClick={handleBack}
                  sx={{
                    // paddingTop: { xs: '30px', sm: '35px' },
                    display: { xs: 'flex', md: 'none' },
                    alignItems: 'center',
                    gap: '5px',
                    paddingBottom: '5px',
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
                    {isStaticPage?.[0]?.name}
                  </Typography>
                </Box>
              ) : (

                <Logo isHome />
              )}
              <DesktopNavActions
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  marginInline: 'auto',
                  justifyContent: 'center',
                  display: { xs: 'none', md: 'flex' },

                }}>
                <SearchField
                  visible
                  isNav
                  formControl={{
                    sx: {
                      width: { xs: 'fit-content', sm: '300px', md: '400px', lg: '350px', xls: '450px', xl: '500px' },
                      color: (theme: any) => theme.palette.custom.textDarkAlter,
                      '& .MuiOutlinedInput-root': {
                        color: (theme: any) => theme.palette.custom.textDarkAlter,
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        borderRadius: '3px',
                        background: 'rgba(239, 242, 245, 0.86)',
                        paddingRight: '0px',
                        width: '100%',
                        '& input': {
                          padding: {
                            xs: '8px 12px',
                            sm: '10px 12px',
                            lg: '10px 14px',
                            xl: '10px 0px 10px 10px',
                          },
                        },
                        '& .MuiOutlinedInput-input, & .MuiOutlinedInput-input::placeholder': {
                          fontSize: { xs: '12px', sm: '14px', md: '16px' },
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '158%',
                          color: '#2d2d2d',
                          opacity: 1,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'transparent',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'transparent',
                        },

                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'transparent',
                        },

                      },
                    },
                  }}
                  searchField={{ productListRenderer }}

                />
              </DesktopNavActions>

              <DesktopNavActions
                sx={{
                  '& .MuiformControl': {
                    border: 'none',
                  },
                }}
              >

                <CurrecySelctor />
                <LangauageSelctor />
                <WishlistFab
                  sx={{
                    width: { xs: '36px' },
                    height: { xs: '30px', md: '36px' },
                    color: (theme) => theme.palette.custom.main,
                    '&  svg': {
                      fontSize: { xs: '20px' },
                      strokeWidth: '1.5',
                    },
                    ' &:focus ': {
                      backgroundColor: 'transparent',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  icon={
                    <IconSvg
                      src={iconHeart}
                      size='medium'
                      sx={{ stroke: (theme) => theme.palette.custom.main }}
                    />
                  }
                />

                <CartFab
                  sx={{
                    display: { xs: 'none', lg: 'inline-flex' },
                    color: (theme) => theme.palette.custom.textDarkAlter2,
                    width: { md: 'fit-content' },

                    transition: 'all 0.4s ease-in-out',
                    '&:focus': {
                      backgroundColor: 'transparent',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '& .MuiBadge-root': {
                      left: '5px',
                      top: '3px',

                      '& .MuiBadge-badge': {
                        top: '5px',
                        right: '11px',
                      },
                    },
                    '& svg': {
                      fontSize: { md: '30px' },
                      stroke: 'unset !important',
                    },
                    '& .MuiButtonBase-root': {
                      height: 'unset !important',
                      width: 'unset !important',
                      boxShadow: 'none',
                      backgroundColor: 'transparent !important',
                    },
                    '& .mui-style-1jnnhmg-MuiButtonBase-root-MuiFab-root': {
                      minHeight: 'unset',
                      boxShadow: 'none',
                      backgroundcolor: 'transparent',
                      transition: 'unset',
                    },
                  }}
                />
                <CustomerFab
                  sx={{
                    width: { md: '36px' },
                    height: { md: '35px' },
                    display: { xs: 'none', lg: 'inline-flex' },
                    color: (theme) => theme.palette.custom.textDarkAlter2,

                    '&  svg': {
                      // width: '1em',
                      fontSize: { md: '25px' },
                      stroke: 'unset !important',
                    },
                    '&:focus': {
                      backgroundColor: 'transparent',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '& .MuiBadge-root': {
                      left: '0px',
                      top: '3px',
                      '& .MuiBadge-dot': {
                        display: 'none',
                      },
                    },
                  }}
                  guestHref='/account/signin'
                  authHref='/account'
                />

                <Link
                  href='/popmart'
                  sx={{
                    display: { xs: 'none', lg: 'flex' },
                    // overflow: 'hidden',
                    transition: 'all 0.4s ease-in-out',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    backgroundColor: (theme) => theme.palette.custom.textPopmart,
                    color: (theme) => theme.palette.custom.tltContrastText,
                    fontSize: '20px',
                    borderRadius: '3px',
                    fontWeight: 700,
                    padding: '8px 10px',
                    // display:'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '130px',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: '#000000',
                      // width
                    },


                  }}>
                  {/* <Image src={popmartImage} alt='popmartImage' /> */}
                  Pop mart
                </Link>
              </DesktopNavActions>

            </Box>

            {/* Search field for small Screens */}

            <DesktopNavActions
              sx={{
                width: '100%',
                display: { xs: 'flex', md: 'none' },

              }}>
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
            </DesktopNavActions>


            {/* Small screen International shipping Banner */}
            {isHome && (
              <Box sx={(theme) => ({
                borderRadius: '3px',
                backgroundColor: theme.palette.custom.tltMain,
                color: theme.palette.custom.tltContrastText,
                fontFamily: "'Inter', sans-serif",
                textAlign: 'center',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1.68px',
                fontSize: { xs: '12px', sm: '14px' },
                marginTop: '10px',
                padding: '10px',
                marginLeft: '5px',
                display: { xs: 'block', md: 'none' },
              })}>
                we do international shipping
              </Box>
            )}



            {/* Menu Items */}
            <Box
              onMouseLeave={handleMouseLeaveNav}
              sx={{
                display: { xs: 'none', lg: 'block' },
                paddingBlock: { xs: '20px', lg: scroll ? '15px' : '20px' },
                '& span': {
                  justifyContent: 'space-between',
                },
                '& .MuiTypography-h6.MuiLink-root': {
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 600,
                  lineHeight: '120%',
                  textTransform: 'uppercase',
                  transition: 'all 0.4s ease',
                  padding: '0',
                  position: 'relative',
                  '&:hover': {
                    color: theme => theme.palette.custom.activeColor,
                  },

                },
              }}>

              <DesktopNavBar>
                {/* {menu?.items?.[0]?.children
                  ?.filter((item) => item?.include_in_menu === 1)
                  ?.map((menus) => (
                    <DesktopNavItem
                      key={menus?.uid}
                      href={`/${menus?.url_path}`}
                      itemId={menus?.uid}
                    >
                      {menus?.name}
                    </DesktopNavItem>
                  ))} */}

                {megaMenu?.map((menus) => (
                  <DesktopNavItem
                    key={menus?.uid}
                    href={`${menus?.url_path}`}
                    itemId={menus?.uid}
                    onMouseEnter={(e) => {
                      handleMouseOver(menus, e)
                    }}
                    onClick={handleMouseLeaveNav}
                  >
                    {menus?.name}

                  </DesktopNavItem>
                ))}
              </DesktopNavBar>

              <PopoverMenu
                item={subMenuItem}
                isActive={menuActive}
                isMegaMenu={isMegaMenu}
                menuPosition={menuPosition}
                onLinkClick={handleMouseLeaveNav} />
              <MegaMenu
                item={subMenuItem}
                isActive={menuActive}
                isMegaMenu={isMegaMenu}
                onLinkClick={handleMouseLeaveNav}
              />
            </Box>
          </Box >
        }
        footer={<Footer />}
      >
        {children}
      </LayoutDefault >

      <Box
      >
        <MobileMenu />
      </Box>
    </>
  )
}
