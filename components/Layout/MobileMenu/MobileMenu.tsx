'use client'

import {
  useCartEnabled,
  useCartQuery,
  useCartShouldLoginToContinue,
} from '@graphcommerce/magento-cart'
import { CartFabDocument } from '@graphcommerce/magento-cart/components/CartFab/CartFab.gql'
import { Badge, Box, styled, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
// import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaWhatsapp, FaUserLarge } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'
import { IoMenuSharp } from 'react-icons/io5'
import { MdOutlineInterests } from 'react-icons/md'
import MenuDrawer from './MenuDrawer'
import { useCustomerQuery, UseCustomerValidateTokenDocument } from '@graphcommerce/magento-customer'

// import ShopMenuDrawer from './ShopMenuDrawer'

const moreMenu = [
  { id: 1, title: 'Cakes', link: '/cakes' },
  { id: 2, title: "Chef's Special", link: '/chef-s-special' },
  { id: 3, title: 'Corporate Events', link: '/events' },
  { id: 4, title: 'Baking Classes', link: '/courses' },
  { id: 5, title: 'Login/Signup', link: '/account/signin' },
  { id: 6, title: 'Orders', link: '/account/orders' },
  { id: 7, title: 'About', link: '/about' },
  { id: 8, title: 'Events', link: '/events' },
  { id: 9, title: 'Account', link: '/account' },
  { id: 10, title: 'Contact Us', link: '/contact-us' },
]

function MobileMenu({ ShopCategories }) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const customerEmailQuery = useCustomerQuery(UseCustomerValidateTokenDocument)
  const { email } = customerEmailQuery.data?.customer ?? {}
  //  const [openshopMenu, setOpenShopMenu] = useState(false)
  const router = useRouter()
  const currentPath = router?.pathname


  const handleMoreMenuOpen = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleCloseAllOtherPopups = () => {
    setOpenDrawer(false)
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

      <Link href='/shop' onClick={handleCloseAllOtherPopups}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '6px',
            alignItems: 'center',
            cursor: 'pointer',
            color: router?.asPath === '/shop' ? '#D90F13' : '#1C1B1F',
          }}
        >
          <MdOutlineInterests size={20} />
          <Typography sx={{ fontSize: { xs: '15px', md: '16px' } }}>Shop</Typography>
        </Box>
      </Link>

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
          <FaUserLarge size={20} />
          <Typography sx={{ fontSize: { xs: '15px', md: '16px' } }}>My Account</Typography>
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

      {/* moreMenu */}
      <AnimatePresence>
        {openDrawer && <MenuDrawer isOpen={openDrawer} setIsOpen={setOpenDrawer} more={moreMenu} />}
      </AnimatePresence>

      {/* Shop Menu 
      <AnimatePresence>
        {openshopMenu && (
          <ShopMenuDrawer
            isOpen={openshopMenu}
            setIsOpen={setOpenShopMenu}
            shopMenu={ShopCategories}
          />
        )}
      </AnimatePresence>*/}
    </>
  )
}

export default MobileMenu
