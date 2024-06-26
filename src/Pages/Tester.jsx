
import hero from "./images/hero_content_shape.png"
import greenshield from "./images/ShieldCheck.svg"
import thumbnaill from "./images/platform_thumb_1.png"
import envolope from "./images/EnvelopeOpen.svg"
import phonee from "./images/Phone.svg"
import Sponsorslider from "./Sponsorslider"
import Scrollable from "./Scrollable"
import Navbar from "./Navbar"
import Educate from "./Educate"
import Testonomial from "./Testonomial"
import Footer from "./Footer"
import sectionimg from "./images/section_title_shape.png"
import dollar from "./images/CurrencyDollar.svg"
import jeep from "./images/Jeep.svg"
import call from "./images/PhoneCall.svg"
import medal from "./images/Medal.svg"
import { useState } from "react"
import axios from "axios"
import { notification } from 'antd';
import { useNavigate,Link } from "react-router-dom"
function Tester (){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const handleButtonClick = async () => {
    // Check if any input field is empty
    if (!name || !email || !phone) {
      openerrorNotificationWithIcon('error');
      return;
    }
    setLoading(false);
    const formData = {
      data: [
        {
          Name: name,
          Email: email,
          Phone: phone,
        },
      ],
    };

    try {
      // Call the Google Apps Script API to append data to the Google Sheet
      await axios.post(
        'https://script.google.com/macros/s/AKfycbxmu6FJDDLYx18wTFBopr_OQrMmIvU7yXBQh7ENg0mlLgx_5QIFN9m_6Yb1srDu1LH57g/exec?action=addData',
        {
          Name: name,
          Email: email,
          Phone: phone,
        },
        {
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
            "User-Agent":"insomnia/8.4.5"
          }
        }
      );
  
      // Call the second API to send an email
      await axios.post(
        'https://serverforstripe.vercel.app/api/sendemail',
        {
          Name: name,
          Email: email,
          Phone: phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Show success notification
      openNotificationWithIcon('success', formData);
  
      // Reset form data after successful submission
      setName('');
      setEmail('');
      setPhone('');
      navigate("/quote")
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }finally {
      setLoading(true);
    }
  };
  const openNotificationWithIcon = (type, formData) => {
    notification[type]({
      message: 'Thank you for registering',
      description: `${formData.data[0].Name}, Thank you for providing your contact information!`,
    });
  };
  
  const openerrorNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Missing Field',
      description:"Please Fill All Of The Fields",
    });
  };

    return(
      
        <>
 <Navbar/>
  {/* =================== HERO AREA START ===================== */}
  <section
    className="hero__area"
  
  >
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-6">
          <div
            className="hero__content"
            data-aos="fade-up"
            data-aos-delay={50}
            data-aos-duration={1000}
          >
            <div className="hero__btn none__phone">
              <a href="#">Complete protection</a>
              <a href="#">24 hour assistance</a>
            </div>
            <h1>The easiest way to buy and manage trucking insurance</h1>
            <p className="none__phone">
              Talk to our experts and get all your questions answered and get a
              no-obligation quote
            </p>
            <div className="hero_content_shape none__phone">
              <img src={hero} alt="" />
            </div>
            <div className="hero__counter__content none__phone">
              <div className="row g-4">
                <div className="col-md-4 col-sm-6">
                  <div className="hero__single__counter__content">
                    <h4>
                      <span>
                        <i className="fas fa-plus" />
                      </span>{" "}
                      100
                    </h4>
                    <p>Partner insurance companies</p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="hero__single__counter__content">
                    <h4>
                      <span>
                        <i className="fas fa-plus" />
                      </span>{" "}
                      200
                    </h4>
                    <p>Satisfied customers</p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="hero__single__counter__content">
                    <h4>
                      <span>
                        <i className="fas fa-plus" />
                      </span>{" "}
                      500
                    </h4>
                    <p>Positive reviews on Facebook</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="hero__form__wrapper">
            <form
              action="#"
              data-aos="zoom-in"
              data-aos-delay={50}
              data-aos-duration={1000}
            >
              <div className="hero__form__blk">
                <div className="hero__form__title">
                  <h4>Get a quote right now</h4>
                  <p>
                    Sign up and our team will contact you to provide your quote
                  </p>
                </div>
                <div className="hero__form__step">
                  <div >
                    <input className="hero__single__form__step" type="text" placeholder="Your Name" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div >
                    <input className="hero__single__form__step" type="email" placeholder="E-mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div >
                    <input className="hero__single__form__step" type="text" placeholder="Phone number"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="form__btn">
                    <button onClick={handleButtonClick} type="button">
                    {
                      loading ?(
                        <>
                        I want to be a customer
                        </>
                        ):(
                          <div className="text-align-center justify-content-center">
                          <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
                          <span className="mx-2"> Loading.....</span>
                          </div>
                         )
                    }
                  </button>
                    <p>
                      By submitting your data, you authorize us to contact you,
                      To find out more, see our <a href="#">Privacy policy</a>
                    </p>
                  </div>
                  <div className="hero__data__safe">
                    <p>
                      <span>
                        <img src={greenshield} alt="" />
                      </span>{" "}
                      Your data is safe with us
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== HERO AREA END ===================== */}
  {/* =================== BRAND AREA START ===================== */}
 <Sponsorslider/>
  {/* =================== BRAND AREA END ===================== */}
  {/* =================== QUOTES AREA START ===================== */}
<Scrollable/>
  {/* =================== QUOTS AREA END ===================== */}
  {/* =================== TRUCKING AREA START ===================== */}
  <section
    className="trucking__area"
   
  >
    <div className="container">
      <div className="row g-4">
        <div className="col-xl-4 smallbger" >

        </div>
        <div className="col-xl-8 truckingnature">
          <div
            className="trucking__inner__blk"
            data-aos="zoom-in"
            data-aos-delay={50}
            data-aos-duration={1000}
          >
            <div className="section__title text-start ms-0">
              <h3 className="white mb-20">
                Talk to a trucking insurance specialist
              </h3>
              <p>
                Our in-house team includes former truckers who understand the
                challenges of the industry. Reach out today for dedicated
                support from an agent who specializes in truck insurance.
              </p>
            </div>
            <div className="trucking__card__wrapper">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="trucking__card">
                    <a href="tel:+13015916550">
                      <span>
                        <img src={phonee} alt="" />
                      </span>
                      <small>Talk to us by Phone</small>
                      <h4>(301) 591 - 6550</h4>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="trucking__card">
                    <a href="mailto:Operations@bceins.com">
                      <span>
                        <img src={envolope} alt="" />
                      </span>
                      <small>Contact us by Email</small>
                      <h4>operations@bceins.com</h4>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="medal__content">
              <h4>
                <span>
                  <img src={medal} alt="" />
                </span>{" "}
                <small>
                  Have the best insurance in your hands right now,{" "}
                  <Link to="/quote">
                    Get your quote <i style={{fontWeight:"bold"}} class="fa-solid fa-arrow-right-long"></i>
                  </Link>
                </small>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== TRUCKING AREA END ===================== */}
  {/* =================== PLATFORM AREA START ===================== */}
  <section className="platform__area">
    <div className="container">
      <div className="video_main_div g-4">
        <div className="Video_left">
          <div
            className="section__title text-start title_video_section"
            data-aos="fade-up"
            data-aos-delay={50}
            data-aos-duration={1000}
          >
            <span>The best insurance companies are with us</span>
            <h3>How our platform works</h3>
            <div className="section__title__shape">
              <img src={sectionimg} alt="" />
            </div>
            <p className="video_title">
              Watch the video and understand why thousands of people are already
              using our services and are protected
            </p>
          </div>
          <div
            className="platform__content"
            data-aos="fade-up"
            data-aos-delay={50}
            data-aos-duration={1000}
          >
            <div className="single__platform__step">
              <a href="#">
                <span>
                  <img src={call} alt="" />
                </span>{" "}
                Connect with a live agent
              </a>
            </div>
            <div className="single__platform__step">
              <a href="#">
                <span>
                  <img src={jeep} alt="" />
                </span>{" "}
                Trucking industry especialists
              </a>
            </div>
            <div className="single__platform__step">
              <a href="#">
                <span>
                  <img src={dollar}alt="" />
                </span>{" "}
                Competitive rates
              </a>
            </div>
          </div>
        </div>
       
        <div className="Video_right">
          <div
            className="platform__thumb"
           
          >
            <img src={thumbnaill} alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* =================== PLATFORM AREA END ===================== */}
  {/* =================== MANAGE AREA START ===================== */}
 <Educate/>
  {/* =================== MANAGE AREA END ===================== */}
  {/* =================== TESTIMONIAL AREA START ===================== */}
<Testonomial/>
  {/* =================== TESTIMONIAL AREA END ===================== */}
  {/* =================== FOOTER AREA START ===================== */}
<Footer/>
  {/* =================== FOOTER AREA END ===================== */}
</>

        
     
    )
}
export default Tester
