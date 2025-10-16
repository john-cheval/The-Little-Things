import { m } from 'framer-motion';
import { Box, useTheme, Link, styled } from '@mui/material';
import Image from 'next/image';
import image1 from './megamenu.png'

export const variants = {
  hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const MotionDiv = styled(m.div)({})
export function MegaMenu({ item, isActive, isMegaMenu, onLinkClick }) {
  const theme = useTheme();

  if (!item || !item.subMenu || item.subMenu === false || !isActive) {
    return null;
  }

  const subMenuData = item.subMenu;
  const collectionData = item.collections && item.collections !== false ? item.collections : [];

  const menuStyles = isMegaMenu ?
    {
      left: 0,
      right: 0,
      width: '100%',
      backgroundColor: '#fff',
    } : null

  return (
    <MotionDiv
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      variants={variants}
      sx={{
        position: 'absolute',
        top: '100%',
        zIndex: theme.zIndex.appBar - 1,
        ...menuStyles,
      }}>
      {isMegaMenu && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12,1fr)',
          background: '#fff',
          boxShadow: '0 4px 6.8px 0 rgba(0, 1, 6, 0.07)',
        }}>
          <Box
            sx={{
              gridColumn: { xs: 'span 6', md: 'span 6', lg: 'span 8', xl: 'span 9' },

            }}>
            {collectionData?.length > 0 && (
              <Box
                sx={{
                  paddingInline: { xs: '20px', md: '30px', lg: '40px', xl: '50px' },
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: { xs: '10px', md: '15px', lg: '20px' },
                  marginBlock: { xs: '20px', md: '25px', lg: '30px' },

                }}>
                {collectionData?.map((item) => (
                  <Link
                    onClick={onLinkClick}
                    key={item.uid}
                    href={`/${item.url_path}`}
                    sx={{
                      borderRadius: '3px',
                      color: theme.palette.custom.tltSecondary,
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: { xs: '16px', md: '16px' },
                      textTransform: 'uppercase',
                      backgroundColor: '#f5f5f5',
                      lineHeight: '120%',
                      paddingBlock: { xs: '15px', md: '18px ' },
                      textDecoration: 'none',
                      border: '1px solid #f5f5f5',
                      transition: 'all 0.4s ease-in-out',
                      '&:hover': {
                        borderColor: theme.palette.custom.tltSecondary,
                        color: theme.palette.custom.tltMain,
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Box>
            )}
            <Box
              sx={{
                borderTop: '1px solid #EAEAEA',
              }}>
              <Box
                sx={{
                  paddingInline: { xs: '20px', md: '30px', lg: '40px', xl: '50px' },
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  gap: { xs: '50px', md: '100px', lg: '100px' },

                }}>
                {subMenuData?.length > 0 && subMenuData?.map((section, index) => (
                  <Box key={section.uid}
                    sx={{
                      borderRight: index !== (subMenuData?.length - 1)
                        ? '1px solid #eaeaea'
                        : undefined,
                      paddingTop: { xs: '10px', md: '15px', lg: '20px' },
                      paddingBottom: { xs: '20px', md: '30px', lg: '40px', xl: '50px' },
                      // marginInline: index !== 0
                      //   ? 'auto'
                      //   : undefined,
                    }}>
                    <Link
                      onClick={onLinkClick}
                      href={`/${section.url_path}`}
                      sx={{
                        color: theme.palette.custom.tltSecondary,
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        fontSize: { xs: '16px', md: '18px', lg: '20px' },
                        textDecoration: 'none',
                        lineHeight: '120%',
                        transition: 'all 0.4s ease-in-out',
                        '&:hover': {
                          color: theme.palette.custom.tltMain,
                        },
                      }}>
                      {section.name}
                    </Link>

                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: { xs: '10px', md: '15px' },
                      marginTop: { xs: '10px', md: '15px' },
                    }}>
                      {section?.children && section?.children?.map((link) => (
                        <Link
                          onClick={onLinkClick}
                          key={link.uid}
                          sx={{
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
                          }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </Box>
                  </Box>
                ))}

              </Box>
            </Box>
          </Box>
          <Box sx={{
            gridColumn: { xs: 'span 6', md: 'span 6', lg: 'span 4', xl: 'span 3' },
            '& img': {
              width: '100%',
              height: '100%',
            },
          }}>
            <Image src={image1} alt='image1' />
          </Box>
        </Box>
      )
      }
    </MotionDiv >
  )
}