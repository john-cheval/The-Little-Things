
import {
  ProductFiltersProSortSection,
  ProductListCount,
} from '@graphcommerce/magento-product'
import { Box, Link, SxProps, Theme, Typography } from '@mui/material'

import {
  iconArrowDropDown,
  iconArrowDropDownUp,
} from '../../../../plugins/icons'
import { ProductListLayoutProps } from '../../../ProductListLayout'
import { useRouter } from 'next/router'

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
    responsiveTitle,
    sx,
    isFilters = false,
    menu,
    params,
    products,
    filterTypes,
    category,
  } = props

  const isSubCategory = category?.children?.length > 0

  const currentPath = router.asPath?.split('/')?.filter(Boolean)[1]
  return (
    <Box component='section' className='container-wrapper'>
      <Box
        sx={[
          (theme) => ({
            paddingBlock: { xs: '10px', lg: '15px' },

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
          <Box component='div' sx={{
            display: 'flex',
            columnGap: '16px',
          }}>
            {category?.children?.map((item: any, index) => {
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
                    padding: '25px 30px',
                    minWidth: { xs: '150px', md: '215px' },
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

                  }}>{item?.name}</Link>
              )
            })}
          </Box>
        )}


        {isFilter && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'unset', md: 'space-between' },
              alignItems: 'center',
              marginTop: { xs: '20px', md: '25px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: { xs: '20px', sm: '30px', md: '40px' },
                justifyContent: { xs: 'space-between', md: 'start' },
                width: { xs: '100%', md: 'fit-content' },
              }}
            >
              <Typography
                component='h2'
                className='main-heading'
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Typography>

              <ProductListCount
                total_count={count}
                sx={{
                  gridArea: 'count',
                  width: '100%',
                  my: 0,
                  height: '1em-',
                  '& p': {
                    textAlign: { xs: 'right', md: 'left' },
                    color: '#747474',
                    fontSize: { xs: '16px', md: '18px' },
                    lineHeight: '120%',
                    fontWeight: 400,
                  },

                }}
              />
            </Box>


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

          </Box>
        )}

        {responsiveTitle && (
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
        )}
      </Box>
    </Box>
  )
}
