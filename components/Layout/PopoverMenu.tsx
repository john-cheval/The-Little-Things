
import { m } from 'framer-motion';
import { Box, useTheme, Link, styled } from '@mui/material';
import { megaMenuVariations, menuItemVariantons } from '../../constants/animationVariation';


const MotionDiv = styled(m.div)({})

export function PopoverMenu({ item, isActive, isMegaMenu, menuPosition, onLinkClick }) {
  const theme = useTheme();

  const menuStyles = {
    minWidth: '250px',
    // maxWidth: '350px',
    backgroundColor: '#fff',
    borderRadius: '3px',
    boxShadow: '0 4px 6.8px 0 rgba(0, 1, 6, 0.07)',
    p: 2,
    left: menuPosition !== 'center' ? `${menuPosition}px` : '50%',
    transform: menuPosition !== 'center' ? 'translateX(-50%) !important' : 'none',
  }
  if (!item || !item.subMenu || item.subMenu === false || !isActive) {
    return null;
  }
  const subMenuData = item.subMenu;

  return (
    <MotionDiv
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      variants={megaMenuVariations}
      sx={{
        position: 'absolute',
        top: '100%',
        zIndex: theme.zIndex.appBar - 1,
        ...menuStyles,
      }}
    >
      {!isMegaMenu && (
        <Box>
          {subMenuData.map((item) => (

            <MotionDiv variants={menuItemVariantons} key={item.uid}>
              <Link
                onClick={onLinkClick}
                href={`/${item.url_path}`}
                sx={{
                  display: 'block',
                  py: 0.5,
                  color: theme.palette.custom.dark,
                  fontSize: { xs: '16px', md: '18px' },
                  fontWeight: 400,
                  lineHeight: '120%',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease-in-out',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.custom.tltSecondary,
                    textDecoration: 'underline',
                  },
                }}>
                {item.name}
              </Link>
            </MotionDiv>

          ))}
        </Box>
      )}
    </MotionDiv>
  )
}