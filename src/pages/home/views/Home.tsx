import Navbar from '../components/navbar'
import About from '../components/about'
import Features from '../components/features'
import Partners from '../components/partners'
import ContactSection from '../components/get-intouch'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

function Home() {
  const [showTopIcon, setShowTopIcon] = useState(false);
  // const [scrollDistance, setscrollDistance] = useState(window.scrollY);
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleScroll() {
    if (window.scrollY > 100) {
      setShowTopIcon(true);
    } else {
      setShowTopIcon(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=''>
      <Navbar />
      <div className='relative'>
        <img
          src='/images/ew_slide.681a05d3.jpg'
          alt='Hero image'
          className='h-[60vh] w-full sm:h-[60vh] md:h-[60vh] lg:h-[100vh] xl:h-[74vh] '
        />

        <div className='absolute inset-0 bg-gradient-to-b from-slate-100/10 to-green-100/45 dark:from-gray-900/30 dark:to-gray-800/70'></div>

        <div className='absolute top-[30%] w-full px-4  sm:top-[30%] lg:top-[40%]'>
          <div className='mx-auto flex flex-col items-center justify-center text-center lg:w-[45rem]'>
            <p className='text-xl font-bold  text-white drop-shadow-lg dark:text-green-200 lg:text-3xl'>
              Creating Sustainable Farming Ecosystem
            </p>
            <p className='mt-4 text-base font-semibold text-gray-100 dark:text-gray-300 text-pretty'>
              Connecting all stakeholders in the agricultural value chains
              through ICT access to Knowledge, Agricultural Inputs, Finance, and
              Markets via a commercially self-sustainable Digital
              Agri-ecosystem.
            </p>
          </div>
        </div>
      </div>
      <About/>
      <Features/>
      <div className='bg-green-700 dark:bg-green-900'>
       <Partners/>
      </div>
      <ContactSection/>

      {showTopIcon && (
      <div
        className="fixed bottom-0 right-8 bg-white text-green-800 p-3 rounded-full cursor-pointer animate-bounce"
        onClick={scrollToTop}
      >
        &#8593;
      </div>
    )}
    </div>
  )
}

export default Home
