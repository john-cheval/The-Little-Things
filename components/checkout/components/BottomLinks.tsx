import { Box, Modal, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';


const linksData = ['Refund policy', 'Shipping', 'Privacy Policy', 'Terms of Service']

type Props = {
  shippingContent: string
  refundPolicyContent: string
  privacyPolicyContent: string
  termsServiceContent: string

}

export function BottomLinks({ shippingContent, refundPolicyContent, privacyPolicyContent, termsServiceContent }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContentKey, setActiveContentKey] = useState('');


  const handleOpen = (key: string) => {
    setIsOpen(true);
    setActiveContentKey(key);
  };
  const handleClose = () => {
    setIsOpen(false);
    setActiveContentKey('');
  };


  const sanitizedContent = useMemo(() => ({
    'Refund policy': DOMPurify.sanitize(refundPolicyContent),
    'Shipping': DOMPurify.sanitize(shippingContent),
    'Privacy Policy': DOMPurify.sanitize(privacyPolicyContent),
    'Terms of Service': DOMPurify.sanitize(termsServiceContent),
  }), [shippingContent, refundPolicyContent, privacyPolicyContent, termsServiceContent]);

  const contentToDisplay = sanitizedContent[activeContentKey as keyof typeof sanitizedContent] || '';

  // const modalTitle = activeContentKey;
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: { xs: '10px', md: '20px' },
        gap: '10px',

      }}>

        {linksData?.map((item, index) => (
          <Box key={item} sx={{
            color: theme => theme.palette.custom.textDarkAlter2,
            fontSize: { xs: '16px', md: '18px' },
            fontWeight: 400,
            lineHeight: '120%',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',


          }}>
            <Typography
              onClick={() => handleOpen(item)}
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: 'all 0.4s ease-in-out',
                '&:hover': {
                  color: theme => theme.palette.custom.tltSecondary,
                },
              }} component='span'>{item} </Typography>{index !== linksData.length - 1 && <span>|</span>}
          </Box>
        ))
        }

      </Box >
      <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(6.400000095367432px)',
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '400px', md: '650px' },
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            borderRadius: '3px',

          }}>
          <Box sx={{
            position: 'relative',
            marginTop: { xs: '20px', md: '35px', lg: '40px' },
            marginBottom: { xs: '30px', md: '40px', lg: '60px' },
            marginInline: { xs: '20px', md: '30px', lg: '40px' },

          }}>

            <Box>
              {parse(contentToDisplay)}
            </Box>


            <Box
              sx={{
                position: 'absolute',
                top: { xs: '30px', md: '35px' },
                right: { xs: '10px', md: '0px' },
                cursor: 'pointer',
              }}
              onClick={handleClose}
            >
              <IoMdClose />

            </Box>
          </Box>


        </Box>
      </Modal >
    </>
  )
}