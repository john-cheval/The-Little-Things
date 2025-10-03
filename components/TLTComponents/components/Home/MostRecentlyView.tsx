import { Box, Link } from '@mui/material';
import gradientOne from '../../assets/gradients/gradient1.svg'
import { Image } from '@graphcommerce/image';

export function MostRecentlyView({ content, productList }) {
  return (
    <Box component='section'
      sx={{
        marginTop: { xs: '20px', md: '45px' },
        borderBottom: '1px solid #c2c2c2',
        paddingBottom: { xs: '30px', md: '40px', lg: '85px' },

      }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />

      <Box sx={{
        marginTop: { xs: '20px', md: '40px' },
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1,1fr)', md: 'repeat(5,1fr)' },
        columnGap: { xs: '20px', md: '30px' },
      }}>
        {productList?.map((item, index) => (
          <Box
            key={`index-${index + 1}`}
            component='div'
            sx={{
              position: 'relative',
              background: `url(${gradientOne.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
              backgroundPosition: 'center 50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image src={item?.small_image?.url} alt={item?.name} width={250} height={330} />
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '-15px', md: '-15px' },
                left: '50%',
                transform: 'translate(-50%,0)',
              }}>
              <Link href='/shop' component='a' className='linkButton' sx={{
                marginTop: { xs: '20px', md: '15px' },

              }}><span>Shop Now</span></Link>
            </Box>
          </Box>
        ))}

      </Box>
    </Box>
  )
}