'use client'

import {
  useCartEnabled,
  useCartQuery,
  useCartShouldLoginToContinue,
} from '@graphcommerce/magento-cart'
import { CartFabDocument } from '@graphcommerce/magento-cart/components/CartFab/CartFab.gql'
import { Badge, Box, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
// import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaUserLarge } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'
import { IoMenuSharp } from 'react-icons/io5'
import { MdOutlineInterests } from 'react-icons/md'
import { useCustomerQuery, UseCustomerValidateTokenDocument } from '@graphcommerce/magento-customer'
import { MenuDrawer } from './MenuDrawer'
import ShopMenuDrawer from './ShopMenuDrawer'
import { ShopDrawer } from './ShopDrawer'


export function MobileMenu() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openShopDrawer, setOpenShopDrawer] = useState(false)

  const customerEmailQuery = useCustomerQuery(UseCustomerValidateTokenDocument)
  const { email } = customerEmailQuery.data?.customer ?? {}
  const router = useRouter()
  const currentPath = router?.pathname


  const handleMoreMenuOpen = () => {
    setOpenDrawer(!openDrawer)
    setOpenShopDrawer(false)
  }

  const handleShopMenuOpen = () => {
    setOpenShopDrawer(!openShopDrawer)
    setOpenDrawer(false)
  }

  const handleCloseAllOtherPopups = () => {
    setOpenDrawer(false)
    setOpenShopDrawer(false)
  }



  const cartEnabled = useCartEnabled()
  const shouldLoginToContinue = useCartShouldLoginToContinue()
  const cartQuery = useCartQuery(CartFabDocument, {
    skip: shouldLoginToContinue,
  })
  if (!cartEnabled) return null

  const totalQuantity = cartQuery.data?.cart?.total_quantity ?? 0

  return (
    <>
      <Box
        sx={{
          paddingInline: { xs: '25px', md: '30px' },
          background: 'rgba(255, 255, 255, 0.91)',
          backdropFilter: 'blur(8.75px)',
          display: { xs: 'flex', lg: 'none' },
          paddingBlock: { xs: '16px', md: '20px' },
          color: (theme: any) => theme.palette.custom.main,
          justifyContent: 'space-between',
          columnGap: '20px',
          position: 'fixed',
          bottom: '-1px',
          left: 0,
          zIndex: '999999',
          alignItems: 'center',
          height: '100px',
          width: '100%',
        }}>

        <Link href='/' onClick={handleCloseAllOtherPopups}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '6px',
              alignItems: 'center',
              cursor: 'pointer',
              color: currentPath === '/' ? '#D90F13' : '#1C1B1F',
            }}
          >
            <GoHomeFill size={20} />
            <Typography sx={{ fontSize: { xs: '15px', md: '16px' } }}>Home</Typography>
          </Box>
        </Link>


        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '6px',
            alignItems: 'center',
            cursor: 'pointer',
            // color: router?.asPath === '/shop' ? '#D90F13' : '#1C1B1F',
          }}
          onClick={handleShopMenuOpen}
        >
          <MdOutlineInterests size={20} />
          <Typography sx={{ fontSize: { xs: '15px', md: '16px' } }}>Shop</Typography>
        </Box>


        <Link href='/cart' onClick={handleCloseAllOtherPopups}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '6px',
                alignItems: 'center',
                cursor: 'pointer',
                color: router.asPath === '/cart' ? '#D90F13' : '#1C1B1F',
                '& .MuiBadge-badge': {
                  backgroundColor: '#FF0000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: '9px',
                  minWidth: '16px',
                  height: '16px',
                  right: '16px',
                  top: '1px',
                  left: '2px',
                },
              }}
            >
              <Badge badgeContent={totalQuantity}>
                <AiOutlineShopping size={20} />
              </Badge>

              <Typography sx={{ fontSize: { xs: '15px', md: '16px' } }}>Cart</Typography>
            </Box>
          </Box>
        </Link>


        <Link href={email ? '/account/addresses' : '/account/signin'} onClick={handleCloseAllOtherPopups}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '6px',
              alignItems: 'center',
              cursor: 'pointer',
              color: router?.asPath.includes('account') ? '#D90F13' : '#1C1B1F',
            }}
          >
            <FaUserLarge size={16} />
            <Typography sx={{ fontSize: { xs: '15px', md: '16px', textAlign: 'center' } }}>My Account</Typography>
          </Box>
        </Link>

        <Box onClick={handleMoreMenuOpen}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '6px',
              alignItems: 'center',
              cursor: 'pointer',
              //  color: isMatch ? '#D90F13' : '#441E14',
            }}
          >
            <IoMenuSharp size={20} />
            <Typography sx={{ fontSize: { xs: '15px', md: '16px' } }}>More</Typography>
          </Box>
        </Box>
      </Box>

      {/* moreMenu */}
      <AnimatePresence>
        {openDrawer && <MenuDrawer
          closeAllPopups={handleCloseAllOtherPopups}
        // isMoreMenu
        />}
      </AnimatePresence>

      {/* Shop Menu */}
      <AnimatePresence>
        {openShopDrawer && <ShopDrawer
          closeAllPopups={handleCloseAllOtherPopups}
        />}
      </AnimatePresence>
    </>
  )
}


