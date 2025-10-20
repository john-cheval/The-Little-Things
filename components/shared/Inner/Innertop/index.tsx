
import {
  ProductFiltersProSortSection,
  ProductListCount,
} from '@graphcommerce/magento-product'
import { Box, Link, type SxProps, type Theme, Typography } from '@mui/material'

import {
  iconArrowDropDown,
  iconArrowDropDownUp,
} from '../../../../plugins/icons'
import type { ProductListLayoutProps } from '../../../ProductListLayout'
import { useRouter } from 'next/router'
import { Image } from '@graphcommerce/image'

type InnerTopBaseProps = {
  count?: number | null
  title?: string | null
  mainTitle?: string | null
  sx?: SxProps<Theme>
  responsiveTitle?: string
  isShopPage?: boolean
  isFilters?: boolean
  menu?: any
  params?: any
  products?: any
  filterTypes?: any
  category?: any
}
type InnerTopWithFiltersProps = InnerTopBaseProps &
  ProductListLayoutProps & {
    isFilter: true
  }
type InnerTopWithoutFiltersProps = InnerTopBaseProps & {
  isFilter?: false
}
export type InnerTopProps = InnerTopWithFiltersProps | InnerTopWithoutFiltersProps

export function InnerTop(props: InnerTopProps) {
  const router = useRouter()
  const {
    count,
    title,
    isFilter,
    mainTitle,
    // responsiveTitle,
    sx,
    isFilters = false,
    menu,
    params,
    products,
    filterTypes,
    category,
  } = props



  const isSubCategory = category?.children && category?.children?.length > 0

  const currentPath = router.asPath?.split('/')?.filter(Boolean)[1]

  const isSamePath = category?.children?.filter((item) => `/${item?.url_path}` === router?.asPath)

  const isLast = isSamePath?.length > 0
  return (
    <Box component='section' className='container-wrapper'>
      <Box
        sx={[
          (theme) => ({
            paddingBlock: { xs: '0px', sm: '15px' },

            ...((isFilter || mainTitle || isFilters) && {
              borderBottom: {
                xs:
                  mainTitle || isFilters
                    ? `1px solid ${theme.palette.custom.tltBorder1}`
                    : 0,
              },
              [theme.breakpoints.up('md')]: {
                borderBottom: `1px solid ${theme.palette.custom.tltBorder1}`,
              },
            }),
          }),

          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {/* SubCategory Section */}
        {isSubCategory && (
          <>
            <Box component='div'
              sx={{
                display: 'flex',
                columnGap: { xs: '8px', md: '12px', lg: '16px' },
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                paddingBottom: '4px',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}>

              {/* Button Type Level 3 */}
              {category?.children?.filter((items) => items?.level === 3)?.map((item, index) => {
                const splittedUrl = item?.url_path?.split('/').filter(Boolean)?.[1]
                const activeButton = currentPath === splittedUrl
                return (
                  <Link href={item?.url_path} key={`index-${index + 1}`}
                    sx={{
                      background: theme => activeButton ? theme.palette.custom.tltMain : theme.palette.custom.tltSecondary,
                      color: theme => theme.palette.custom.tltContrastText,
                      borderRadius: '3px',
                      textAlign: 'center',
                      fontsize: { xs: '16px', md: '20px', lg: '25px' },
                      fontWeight: 700,
                      lineHeight: '120%',
                      // padding: '25px 30px',
                      padding: { xs: '10px 12px', md: '15px 12px', lg: '20px 12px', xl: '25px 12px' },
                      minWidth: { xs: '150px', md: '215px' },
                      width: 'fit-content',
                      textDecoration: 'none',
                      transition: 'all 0.4s ease-in-out',
                      borderColor: theme => activeButton ? theme.palette.custom.tltMain : theme.palette.custom.tltSecondary,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      '&:hover': {
                        background: 'transparent',
                        borderColor: theme => activeButton ? theme.palette.custom.tltMain : theme.palette.custom.tltSecondary,
                        color: theme => activeButton ? theme.palette.custom.tltMain : theme.palette.custom.tltSecondary,
                      },

                    }}>
                    {item?.name}
                  </Link>
                )
              })}
            </Box>

            {!isLast && (
              <Box
                component='div'
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(3,1fr)', sm: 'repeat(4,1fr)', md: 'repeat(5,1fr)', xl: 'repeat(6,1fr)' },
                  columnGap: { xs: '10px', md: '18px' },
                  rowGap: { xs: '10px', md: '20px', lg: '30px' },
                }}
              >
                {category?.children?.filter((items) => items?.level === 4)?.map((item, index) => {
                  const splittedUrl = item?.url_path?.split('/').filter(Boolean)?.[2]
                  // const activeButton = currentPath === splittedUrl

                  // console.log(splittedUrl, '==> splittedUrl')
                  return (
                    <Link
                      key={`index-${index + 1}`}
                      href={`/${item?.url_path}`}
                      sx={{
                        position: 'relative',
                        height: 'fit-content',
                        transition: 'all 0.4s ease-in-out',
                        '& p': {
                          bottom: 0,
                        },
                        '&:hover': {
                          transform: 'translateY(-10px)',
                        },
                      }}
                    >
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        width={230}
                        height={315}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          // maxWidth: '130px',
                        }}
                      />
                      <Typography className='unlock-title' >{item?.name}</Typography>
                    </Link>
                  )
                })}
              </Box>
            )}

          </>
        )}


        {isFilter && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'unset', md: 'space-between' },
              alignItems: 'center',
              marginTop: { xs: '15px', sm: '20px', md: '25px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: { xs: '20px', sm: '30px', md: '40px' },
                justifyContent: { xs: 'flex-start', sm: 'space-between', md: 'start' },
                width: { xs: '100%', md: 'fit-content' },
                // marginBottom: { xs: '15px', sm: 0 },
              }}
            >
              <Typography
                component='h2'
                className='main-heading'
                sx={{
                  whiteSpace: 'nowrap',
                  // display: { xs: 'none', sm: 'block' },
                }}
              >
                {title}
              </Typography>
              {count && (
                <ProductListCount
                  total_count={count}
                  sx={{
                    gridArea: 'count',
                    width: '100%',
                    my: 0,
                    '& p': {
                      textAlign: { xs: 'left', sm: 'right', md: 'left' },
                      color: '#747474',
                      fontSize: { xs: '16px', md: '18px' },
                      lineHeight: '120%',
                      fontWeight: 400,
                    },

                  }}
                />
              )}
            </Box>


            {/* {count && count > 0 && (
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {params && products?.items && filterTypes && (
                  <ProductFiltersProSortSection
                    menu={menu}
                    sort_fields={products?.sort_fields}
                    total_count={products?.total_count}
                    category={category}
                    openAccordionIcon={iconArrowDropDown}
                    closeAccordionIcon={iconArrowDropDownUp}
                    sx={{
                      borderBottom: 'none !important',
                      '& .MuiAccordionSummary-content .MuiTypography-body1': {
                        color: (theme: any) => theme.palette.custom.dark,
                        fontSize: { xs: '15px', md: '18px' },
                        marginBottom: '0 !important',
                        position: 'relative',
                      },
                      '& .MuiAccordionDetails-root > div': {
                        position: 'absolute',
                        backgroundColor: '#fff',
                        width: '100%',
                        borderRadius: '4px',
                        zIndex: 1000,
                        minWidth: '200px',
                        border: (theme) => `1px solid ${theme.palette.custom.tltSecondary}`,
                        '& .ActionCard-root': {
                          borderRadius: '0',
                        },
                        '& .ActionCardLayout-root ': {
                          border: (theme) => theme.palette.custom.border,
                          borderRadius: '3px',
                          '& .MuiButtonBase-root': {
                            '&:not(:last-child)': {
                              borderBottom: (theme) => `1px solid ${theme.palette.custom.tltSecondary}`,
                            },
                            '& .ActionCard-title': {
                              fontSize: { xs: '15px', md: '16px' },
                              fontWeight: 400,
                            },
                            '& .ActionCard-end': {
                              display: 'none',
                            },
                          },
                        },
                        '& .ActionCard-root.selected': {
                          backgroundColor: (theme) => theme.palette.custom.border,
                        },
                      },
                      '& .ActionCardLayout-root ': {
                        backgroundColor: 'white',
                      },
                      '& .ActionCard-root.selected': {
                        backgroundColor: (theme) => theme.palette.custom.border,
                      },
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        position: 'relative',
                        top: '8px',
                        marginLeft: '5px',
                      },
                    }}

                  />

                )}
              </Box>
            )} */}


          </Box>
        )}

        {/* {responsiveTitle && (
          <Typography
            component='h2'
            variant='h2'
            sx={{
              display: { xs: 'block', lg: 'none' },
              borderBottom: {
                xs: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
                lg: 'none',
              },
              marginBottom: { xs: '0', md: '15px', lg: '0' },
              paddingBottom: { xs: '0', md: '15px', lg: '0' },
            }}
          >
            {responsiveTitle}
          </Typography>
        )} */}
      </Box>
    </Box>
  )
}
