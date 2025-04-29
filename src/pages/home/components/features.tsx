import React from 'react'
import * as Icons from '@radix-ui/react-icons'
import { Element } from "react-scroll"

interface Feature {
  icon: keyof typeof Icons
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: 'MobileIcon',
    title: 'Low-cost solution',
    description:
      'Although there is a fully featured mobile app for people with smartphones and reliable network coverage, the platform also employs the use of USSD service to ensure affordability and mobility.',
  },
  {
    icon: 'UpdateIcon',
    title: 'Real-time information',
    description:
      'Our data collection tools ensure that data is delivered immediately after collection. There is no delay in the timeliness of the information provided. All information is instantly saved and synchronized to both Web portal and USSD service.',
  },
  {
    icon: 'ActivityLogIcon',
    title: 'Traceability',
    description:
      'Our crop traceability ensures transparency and accountability from farm to fork. It involves tracking the journey of food products through all stages of production, storage, processing, and distribution.',
  },
  {
    icon: 'BarChartIcon',
    title: 'Elegant analytics and reports',
    description:
      'SHAMBA BORA portal assists in decision-making since it categorizes, analyzes, and provides reports about relevant farmer information.',
  },
  {
    icon: 'PersonIcon',
    title: 'Multi-User Platform',
    description:
      'The multiple users feature allows different types of users to efficiently access the platform with different privileges.',
  },
  {
    icon: 'AccessibilityIcon',
    title: 'Direct B2C Payments',
    description:
      "Farmers' payments can be disbursed directly from the B2C wallet to individual farmer mobile money and banking accounts.",
  },
]

interface FeatureProps {
  icon: keyof typeof Icons
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  const IconComponent = Icons[icon]

  return (
    <div className='flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md dark:bg-[#1c1917]'>
     <div className='h-16 w-16 rounded-full bg-green-800 flex justify-center items-center'>
     <IconComponent className=' h-5 w-5 text-white font-bold' />
     </div>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mt-2'>
        {title}
      </h3>
      <p className='mt-2 text-gray-600 dark:text-gray-300 text-pretty text-sm leading-7'>{description}</p>
    </div>
  )
}

const Features = () => {
  return (
    <Element name="features" className="element">
    <div className='mx-auto mt-10 container'>
      <div className='p-3'>
        <h1 className='text-center text-2xl font-bold'>Unique Shamba Bora Features</h1>
        <div>
          <div className='grid grid-cols-1 gap-6 p-1 lg:p-6 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </Element>
  )
}

export default Features
