import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';

export function ProductDetails() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  return (
    <Box>
      <Box sx={{
        marginTop: { xs: '20px', md: '40px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '20px', md: '25px' },
      }}>
        <Box>
          <Typography component='h6' className='about-product-title'>
            About the product
          </Typography>
          <Typography component='p' className='about-product-content' >
            Iron Studio is joining the Fantastic Four on their next adventure and this time, it's time to flame on! The Human Torch is making his debut in a brand new 1/10 scale statue! Based on this appearance in The Fantastic Four: First Steps film, this statue will be a perfect centerpiece for any fan! Order yours today!
          </Typography>
        </Box>

        {/* Product Features */}
        <Box>
          <Typography component='h6' className='about-product-title'>
            Product Features
          </Typography>
          <ul className='about-product-content' >
            <li>Approx. 10 inches (25.4cm)</li>
            <li>1/10 Scale</li>
            <li> Made of polystone and other materials</li>
            <li>Based on The Fantastic Four: First Steps film</li>
            <li>Highly detailed sculpt</li>
            <li>Hand - painted</li>
          </ul>
        </Box>

        <Box>
          <Typography component='h6' className='about-product-title'>
            Product Features
          </Typography>
          <ul className='about-product-content' >
            <li>The Human Torch statue</li>
          </ul>
        </Box>


        <Box>
          <Typography component='h6' className='about-product-title'>
            Additional Details
          </Typography>

          <Box sx={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: { xs: '10px', md: '15px' } }}>
            <Typography component='p' className='about-product-content' >Marvel</Typography>

            <Typography component='p' className='about-product-content' >
              Founded by Martin Goodman and later launched as Marvel in 1961, Marvel has become an iconic comic book publisher that has expanded to other media like films and video games with a great amount of success. Marvel is home to iconic superheroes like Spider-man, Iron Man, Hulk, Captain America, and many more. Marvel has seen another level of success and popularization with the launch of the brand's Marvel cinematic universe beginning in the late 2000's.
            </Typography>

            <Typography component='p' className='about-product-content' >
              Listed Price INCLUDES Tariff Surcharge (Subject to Change Based on Final Tariff Rates (See Below))
              The price listed above includes a tariff surcharge based on the known tariff rate at the time the listing was published. Please note that the final price may change if the tariff rates are adjusted. While we are hopeful that tariffs may be reduced—allowing us to lower the price—they could also increase, which would raise the final price.
            </Typography>

            <Typography component='p' className='about-product-content' >As always, our Customer Service team is here to assist with any questions or concerns, and we’ll remain flexible given the circumstances</Typography>
          </Box>

        </Box>
      </Box>

      {/* Review and Ratings Accordion */}
      <Box id='reviews' sx={{
        marginTop: { xs: '20px', md: '25px' },
        scrollMarginTop: '200px',
      }}>
        <Accordion expanded={expanded} onChange={handleChange} sx={{
          borderTop: '1px solid #C7C7C7',
          paddingTop: '10px',
          '& .mui-style-13616kx-MuiPaper-root-MuiAccordion-root:last-of-type ': {
            borderRadius: 0,
          },
        }}>
          <AccordionSummary
            expandIcon={expanded ? <FiMinus /> : <GoPlus />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography sx={{
              color: '#2d2d2d',
              fontSize: { xs: '16px', md: '18px' },
              fontWeight: 500,
              lineHeight: '120%'
            }} component="span">Review & Rating</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Box>
  )
}




