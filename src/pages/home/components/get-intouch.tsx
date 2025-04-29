import React from 'react'
import { EnvelopeClosedIcon, HomeIcon, PersonIcon, MobileIcon } from '@radix-ui/react-icons'
import { Element } from 'react-scroll'

const ContactSection: React.FC = () => {
  return (
    <Element name="contact" className="element">
    <div className='mx-auto mt-10 container  p-6 transition-colors duration-300'>
      <h2 className='mb-4 text-center text-3xl font-bold dark:text-white'>
        Get in touch
      </h2>
      <p className='mb-8 text-center text-gray-600 dark:text-gray-300'>
        Contact us to find out more about Shamba Bora platform.
      </p>
      <hr />

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 mt-10'>
        <div className='space-y-6 col-span-1'>
          <div className='flex items-start space-x-4'>
            <HomeIcon className='h-6 w-6 text-green-600 dark:text-green-400 mt-2' />
            <div>
              <h4 className='text-lg font-semibold dark:text-white'>
                ADDRESS:
              </h4>
              <p className='text-gray-600 dark:text-gray-300'>
                Shamba Bora, <br />
                55 Ally Sykes Road, <br />
                Kawe Beach, Kinondoni, <br />
                P.O Box 6408, Dar es Salaam.
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <PersonIcon className='h-6 w-6 text-green-600 dark:text-green-400 mt-2' />
            <div>
              <h4 className='text-lg font-semibold dark:text-white'>TEL:</h4>
              <p className='text-gray-600 dark:text-gray-300'>
                +255 652 633 433 <br />
                +255 688 133 433
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <EnvelopeClosedIcon className='h-6 w-6 text-green-600 dark:text-green-400 mt-2' />
            <div>
              <h4 className='text-lg font-semibold dark:text-white'>EMAIL:</h4>
              <p className='text-gray-600 dark:text-gray-300'>
                info@shambabora.co.tz
              </p>
            </div>
          </div>
        </div>

        <form className='space-y-6 rounded-sm bg-gray-100 p-6  dark:bg-[#1c1917] col-span-2'>
          <div className='relative'>
            <label htmlFor='' className='sr-only'>
            Full name
            </label>
            <input
              type='tel'
              id=''
              placeholder='Enter full name'
              className='w-full rounded-sm border p-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-200 dark:bg-black'
            />
            <div className='bg-gray-100 dark:bg-black absolute right-0 top-0 py-[1.2rem] rounded-r-sm px-3 border'>
            <PersonIcon className='  ' />
            </div>
          </div>
          <div className='relative'>
            <label htmlFor='phone' className='sr-only'>
              Email address
            </label>
            <input
              type='tel'
              id='phone'
              placeholder='Enter email address'
              className='w-full rounded-md border p-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-200 dark:bg-black'
            />
           <div className='bg-gray-100 dark:bg-black absolute right-0 top-0 py-[1.2rem] rounded-r-sm px-3 border'>
            <EnvelopeClosedIcon className='  ' />
            </div>
          </div>
          <div className='relative'>
            <label htmlFor='phone' className='sr-only'>
              Phone number
            </label>
            <input
              type='tel'
              id='phone'
              placeholder='Enter phone number'
              className='w-full rounded-md border p-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-200 dark:bg-black'
            />
            <div className='bg-gray-100 dark:bg-black absolute right-0 top-0 py-[1.2rem] rounded-r-sm px-3 border'>
            <MobileIcon className='  ' />
            </div>
          </div>
     
          <textarea
            placeholder='Message'
            className='w-full rounded-sm p-2 focus:ring-1 focus:ring-green-200 dark:bg-black'
            rows={5}
          ></textarea>
          <button
            type='submit'
            className='px-3 rounded-sm bg-green-600 py-2 text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
          >
            Send message
          </button>
        </form>
      </div>

      <div className='mt-12 text-center text-gray-600 dark:text-gray-400'>
        © {new Date().getFullYear()} - Shamba Bora
      </div>
    </div>
    </Element>
  )
}

export default ContactSection
