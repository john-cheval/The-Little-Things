import { Logo as LogoBase } from '@graphcommerce/next-ui'
// import footerLogo from './footer_logo.svg'
import svgLogo from './Logo.svg'

interface LogoProps {
  isHome?: boolean
}

export function Logo({ isHome }: LogoProps) {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          maxWidth: { xs: '125px', sm: '150px', md: 'auto' },
          // height: { xs: '16px', md: 'auto' },
        },
      }}
      image={{
        alt: 'The Little Things',
        src: isHome ? svgLogo : svgLogo,
        unoptimized: true,
      }}
    />
  )
}
