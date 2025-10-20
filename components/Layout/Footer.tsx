import Image from 'next/image'
import logo from '../Assets/footer/footer_logo.png';
import checkright from '../Assets/footer/arrow_circle_right.png'
import instagram from '../Assets/footer/insta.png'
import facebook from '../Assets/footer/facebook.png'
import tiktok from '../Assets/footer/twitter.png'
import cards from '../Assets/footer/cards.png'
import call from '../Assets/footer/call.png'
import mail from '../Assets/footer/mail.png'
import key from '../Assets/footer/key.png'
import facebookMob from '../Assets/footer/facebook_mob.png'
import instagramMob from '../Assets/footer/instagram_mob.png'
import linkedinMob from '../Assets/footer/linkedin_mob.png'

import { useRouter } from 'next/router';
import { useEffect } from 'react';





export function Footer() {
  // console.log(footerContent)
  const router = useRouter()

  useEffect(() => {
    const summaries = document.querySelectorAll<HTMLDivElement>('.footer_accordion-summary');
    const allDetails = document.querySelectorAll<HTMLDivElement>('.footer_accordion_details');

    const closeAllItems = () => {
      summaries.forEach(s => s.classList.remove('is-expanded'));
      allDetails.forEach(d => d.classList.remove('is-expanded'));
    };

    const handlers: Array<() => void> = []

    summaries.forEach((summary) => {
      const handler = () => {
        const item = summary.closest('.footer_mobile_accordion-item')
        const details = item?.querySelector<HTMLElement>('.footer_accordion_details')

        const isCurrentlyExpanded = summary.classList.contains('is-expanded');

        closeAllItems();

        if (!isCurrentlyExpanded) {
          summary.classList.toggle('is-expanded')
          details?.classList.toggle('is-expanded')
        }

      }

      summary.addEventListener('click', handler)
      handlers.push(() => summary.removeEventListener('click', handler))
    })

    return () => {
      handlers.forEach((remove) => remove());
    }
  }, [router])

  const handleBacktoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <footer className='footer-wrapper '>
      <div className='footer-top-container container-wrapper'>
        <div className="footer-top-col-left">
          <Image src={logo} alt='footer_logo' className='logo' />

          <div className='descktopLocations footer-headings'>
            <h6>Locations</h6>
            <ul>
              <li>
                <a href='https://maps.google.com?daddr=The Little Things - Financial Center Road - Dubai - United Arab Emirates' target='_blank' rel="noreferrer">TLT | The Dubai Mall - Level 2
                  <Image src={checkright} alt='footer_logo' />
                </a>
              </li>
              <li>
                <a href='https://maps.google.com?daddr=Bluewaters Island - Dubai' target='_blank' rel="noreferrer">The Little Things - Bluewaters
                  <Image src={checkright} alt='footer_logo' />
                </a>
              </li>
              <li>
                <a href='https://maps.google.com?daddr=The Little Things - Mall of the Emirates - Sheikh Zayed Rd - Al Barsha - Al Barsha 1 - Dubai' target='_blank' rel="noreferrer">TLT | Mall of the Emirates - Level 1
                  <Image src={checkright} alt='footer_logo' />
                </a>
              </li>

            </ul>
          </div>
        </div>
        <div className="footer-top-col-right ">
          <div className='desktop-links-container desktop-links'>
            <div className='footer-headings'>
              <h6>Quick Links</h6>
              <ul>
                <li>
                  <a href='/about-us'>About</a>
                </li>
                <li>
                  <a href='/our-locations'>Our Locations</a>
                </li>
                <li>
                  <a href='/refund-form'>Refund Request Form</a>
                </li>
                <li>
                  <a href='/keypers-loyalty-program-membership'>Keypers Loyalty  Program Membership</a>
                </li>
                <li>
                  <a href='/careers'>Careers</a>
                </li>
              </ul>
            </div>

            <div className='footer-headings'>
              <h6>Terms</h6>
              <ul>
                <li>
                  <a href='/shop'>Shop Now, Pay Laterbout</a>
                </li>
                <li>
                  <a href='/terms-conditions'>Terms & Conditions</a>
                </li>
                <li>
                  <a href='/privacy-policy'>Privacy Policy</a>
                </li>
                <li>
                  <a href='/shipping-policy'>Shipping Policy</a>
                </li>
                <li>
                  <a href='/pre-order-policy'>Pre-Order Policy</a>
                </li>
                <li>
                  <a href='/carCancellation-policyeers'>Cancellation Policy</a>
                </li>
                <li>
                  <a href='/refunds'>Returns / Refunds / Exchange Policy</a>
                </li>
              </ul>
            </div>

            <div className='footer-headings'>
              <h6>FAQs</h6>
              <ul>
                <li>
                  <a href='/faq'>Where do you ship to?</a>
                </li>
                <li>
                  <a href='/faq'>Can i return and exchange products?</a>
                </li>
                <li>
                  <a href='/faq'>Privacy Policy</a>
                </li>
                <li>
                  <a href='/faq'>Can i cancel my order?</a>
                </li>
                <li>
                  <a href='/faq'>How do i pre-order?</a>
                </li>
                <li>
                  <a href='/faq'>View All</a>
                </li>
              </ul>
            </div>
          </div>

          <div className='footer_contact-desktop'>
            <div className='footer-headings follow-desk'>
              <h6>Follow us</h6>

              <ul>
                <li>
                  <a href='https://www.facebook.com/thelittlethingsmee' target='_blank'
                    title="The Little Things on Facebook"
                    rel="noreferrer">
                    <Image src={facebook} alt='facebook'
                    />
                  </a>
                </li>
                <li>
                  <a href='https://instagram.com/thelittlethingsme'
                    title="The Little Things on Instagram"
                    target='_blank' rel="noreferrer"><Image src={instagram} alt='instagram'
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@thelittlethingsme"
                    title="The Little Things on TikTok"
                    target='_blank'
                    rel="noreferrer">
                    <Image src={tiktok} alt='tiktok'
                    />
                  </a>
                </li>
              </ul>
              <Image src={cards} alt='cards' />
            </div>
            <div className='footer-headings contact'>
              <h6>Contact</h6>
              <div className='desktop-contact-wrapper'>
                <div>
                  <a href='tel:+971 4 880 0565'><Image src={call} alt='phone' />+971 4 880 0565</a>
                  <a href='tel:+971 58 515 5005'><Image src={call} alt='phone' />+971 58 515 5005</a>
                </div>
                <div>
                  <a href='tel:+971 50 964 0483'><Image src={call} alt='phone' />+971 50 964 0483</a>
                  <a href='mailto:keysan@littlethingsme.com'><Image src={mail} alt='mail' />keysan@littlethingsme.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='footer-sperator' />

      {/* marquwee */}
      <div className='footer-marquee-wrapper'>
        <div className='mq-text-wrapper'>
          <div className='mq-text'>
            <div className='mq-text-tracks'>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
              <p>The Little Things<Image src={key} alt='key' /></p>
            </div>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className='footer-copyright container-wrapper'>
        <p>Designed & Developed by <a href='https://chevalme.ae/' rel="noreferrer" target='_blank'>Cheval</a></p>
        <p>The Little Things All Rights Reserved</p>
        <p onClick={handleBacktoTop} className='backToTop'>Back to Top</p>
      </div>


      {/* Mobile Menu */}
      <div className='footer_mobile_container container-wrapper'>
        <div className='footer_mobile_accordion'>
          <div className='footer_mobile_accordion-container'>

            <div className='footer_mobile_accordion-item first'>
              <div className="footer_accordion-summary">
                <h2 className="footer_accordion-title">Quick Links</h2>
                <span className="footer_accordion-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </span>
              </div>
              <ul className="footer_accordion_details">
                <li>
                  <a href='/about-us'>About</a>
                </li>
                <li>
                  <a href='/our-locations'>Our Locations</a>
                </li>
                <li>
                  <a href='/refund-form'>Refund Request Form</a>
                </li>
                <li>
                  <a href='/keypers-loyalty-program-membership'>Keypers Loyalty  Program Membership</a>
                </li>
                <li>
                  <a href='/careers'>Careers</a>
                </li>
              </ul>
            </div>

            <div className='footer_mobile_accordion-item'>
              <div className="footer_accordion-summary">
                <h2 className="footer_accordion-title">Terms</h2>
                <span className="footer_accordion-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </span>
              </div>
              <ul className="footer_accordion_details">
                <li>
                  <a href='/shop'>Shop Now, Pay Laterbout</a>
                </li>
                <li>
                  <a href='/terms-conditions'>Terms & Conditions</a>
                </li>
                <li>
                  <a href='/privacy-policy'>Privacy Policy</a>
                </li>
                <li>
                  <a href='/shipping-policy'>Shipping Policy</a>
                </li>
                <li>
                  <a href='/pre-order-policy'>Pre-Order Policy</a>
                </li>
                <li>
                  <a href='/carCancellation-policyeers'>Cancellation Policy</a>
                </li>
                <li>
                  <a href='/refunds'>Returns / Refunds / Exchange Policy</a>
                </li>
              </ul>
            </div>

            <div className='footer_mobile_accordion-item'>
              <div className="footer_accordion-summary">
                <h2 className="footer_accordion-title">FAQs</h2>
                <span className="footer_accordion-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </span>
              </div>
              <ul className="footer_accordion_details">
                <li>
                  <a href='/faq'>Where do you ship to?</a>
                </li>
                <li>
                  <a href='/faq'>Can i return and exchange products?</a>
                </li>
                <li>
                  <a href='/faq'>Privacy Policy</a>
                </li>
                <li>
                  <a href='/faq'>Can i cancel my order?</a>
                </li>
                <li>
                  <a href='/faq'>How do i pre-order?</a>
                </li>
                <li>
                  <a href='/faq'>View All</a>
                </li>
              </ul>
            </div>
          </div>
        </div>


        {/* Footer Copyright */}
        <div className='footer_mobile-copyright'>
          <div className='footer_mobile-follow'>
            <p>Follow Us</p>
            <div>
              <a href='https://www.facebook.com/thelittlethingsmee' target='_blank'
                title="The Little Things on Facebook" rel="noreferrer"> <Image src={facebookMob} alt='facebookMob' /></a>
              <a href='https://instagram.com/thelittlethingsme'
                title="The Little Things on Instagram"
                target='_blank' rel="noreferrer"> <Image src={instagramMob} alt='instagramMob' /></a>

              <a href='https://instagram.com/thelittlethingsme'
                title="The Little Things on Instagram"
                target='_blank' rel="noreferrer">
                <Image src={linkedinMob} alt='linkedinMob' />
              </a>
            </div>
          </div>
          <Image src={cards} alt='cards' />
          <p className='mobile-copy'>&copy;  Littile Things 2025. Designed & Developed by <a href='https://chevalme.ae/' rel="noreferrer" target='_blank'>Cheval</a> </p>
        </div>
      </div>
    </footer>

  )
}
