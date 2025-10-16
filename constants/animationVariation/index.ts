export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}
export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeInOut', duration: 0.4 } },
}

export const drawerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
}

export const megaMenuVariations = {
  hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const menuItemVariantons = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}
