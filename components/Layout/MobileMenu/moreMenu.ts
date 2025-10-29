import formIcon from './icons/article.svg'
import locationIcon from './icons/distance.svg'
import newsLetterIcon from './icons/eject.svg'
import faqIcon from './icons/faq.svg'
import termsIcon from './icons/gavel.svg'
import addressIcon from './icons/home_pin.svg'
import aboutIcon from './icons/info.svg'
import lockIcon from './icons/lock.svg'

export const moreMenu = [
  {
    id: 1,
    title: 'Authentication',
    link: '/account/authentication',
    icon: lockIcon,
    subTitle: 'Password',
  },
  {
    id: 2,
    title: 'Address',
    link: '/account/addresses',
    icon: addressIcon,
    subTitle: 'Lorem ipsum is a dummy or placeholder ...',
  },
  {
    id: 3,
    title: 'Newsletter',
    link: '#',
    icon: newsLetterIcon,
    subTitle: 'Be the first to know about everything new!',
  },
  { id: 4, title: 'FAQs', link: '/faq', icon: faqIcon },
  { id: 5, title: 'Terms', link: '/terms-conditions', icon: termsIcon },
  { id: 6, title: 'About', link: '/about-us', icon: aboutIcon },
  { id: 7, title: 'Our Locations', link: '/our-locations', icon: locationIcon },
  { id: 8, title: 'Refund Request Form', link: '/refund-form', icon: formIcon },
]
