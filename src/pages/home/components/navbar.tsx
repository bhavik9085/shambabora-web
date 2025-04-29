import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //@ts-ignore
  const [active, setActive] = useState('about');
  const navigate =  useNavigate();


  const handleSetActive = (to: string) => {
    setActive(to)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className='border-b-[0.3px]  border-green-500 bg-white dark:bg-[#1c1917]'>
      <div className='container mx-auto flex flex-wrap items-center justify-between p-4'>
        <a href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img
            src='/images/shambabora.svg'
            className='h-10'
            alt='Flowbite Logo'
          />
          <span className='self-center whitespace-nowrap text-2xl font-semibold text-green-600 dark:text-white'>
            Shamba Bora
          </span>
        </a>

        <button
          onClick={toggleMenu}
          type='button'
          className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-700 dark:focus:ring-green-600 md:hidden'
          aria-controls='navbar-default'
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <span className='sr-only'>Open main menu</span>
          {/* Hamburger Icon */}
          <svg
            className='h-5 w-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>

        {/* Collapsible Menu */}
        <div
          className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          id='navbar-default'
        >
          <ul className='mt-4 flex flex-col items-center rounded-lg border bg-green-50 p-4 font-medium dark:border-gray-700 dark:bg-[#1c1917]/10 md:mt-0 md:flex-row  md:space-x-8 md:border-0 md:dark:bg-[#1c1917]'>
            <li>
              <Link
                activeClass='active'
                to={'about'}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onSetActive={handleSetActive}
              >
                <a
                  href='#'
                  className='block rounded px-3 hover:px-3  py-2 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:text-green-500'
                >
                  About
                </a>
              </Link>
            </li>
            <li>
            <Link
                activeClass='active'
                to={'features'}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onSetActive={handleSetActive}
              >
              <a
                href='#'
                className='block rounded px-3 hover:px-3  py-2 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:text-green-500'
              >
                Features
              </a>
              </Link>
            </li>
            <li>
            <Link
                activeClass='active'
                to={'partners'}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onSetActive={handleSetActive}
              >
              <a
                href='#'
                className='block rounded px-3 hover:px-3 py-2 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:text-green-500'
              >
                Partners
              </a>
              </Link>
            </li>
            <li>
            <Link
                activeClass='active'
                to={'contact'}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                onSetActive={handleSetActive}
              >
              <a
                href='#'
                className='block rounded px-3 hover:px-3  py-2 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:text-green-500'
              >
                Contact Us
              </a>
              </Link>
            </li>
            <li>
              <div className='hidden md:flex md:items-center'
              onClick={() => {navigate('/sign-in')}}
              >
                <a
                  href='#'
                  // onClick={() => {navigate('/sign-in')}}
                  className='ml-4 rounded-sm border-[1px]  border-green-500  px-4 py-2  text-green-500 transition-colors hover:bg-green-700 hover:text-white'
                >
                  Login
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Login Button for Mobile (Visible when menu is open) */}
      {isOpen && (
        <div className='px-4 pb-4 md:hidden'>
          <a
            href='#'
            className='block w-full rounded-lg bg-green-600 px-4 py-2 text-center text-white transition-colors hover:bg-green-700'
          >
            Login
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
