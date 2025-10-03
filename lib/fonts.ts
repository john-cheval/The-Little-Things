import localFont from 'next/font/local'

export const dubaiFont = localFont({
  src: [
    {
      path: '../public/fonts/Dubai-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Dubai-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Dubai-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Dubai-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Dubai-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Dubai-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Dubai-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Dubai-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-dubai',
})
