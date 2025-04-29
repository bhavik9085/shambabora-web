import { Element } from "react-scroll"

const About = () => {
  return (
    <Element name="about" className="element">
    <div className='container mx-auto mt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 px-1 lg:px-5'>
        <div className='col-span-1'>
          <h2 className='font-bold text-xl text-center lg:text-2xl text-green-800 dark:text-green-300 '>ABOUT SHAMBA BORA</h2>
        </div>
        <div className='col-span-2'>
          <p className='text-justify text-base text-pretty leading-8 lg:leading-9'>
            We are an all-inclusive digital platform designed to assist farmers
            through their cooperative unions (with their AMCOSes, and AMCOS
            groups). With SHAMBA BORA platform farmers will be able to acquire
            knowledge related to markets, advisory services, understanding
            patterns and trends. Also farmers can collect their crops at their
            collection centres, sell their crops and make purchases for
            agricultural inputs such as seeds, fertilizer, tools and the like on
            credit. The platform combines a carefully formulated support of all
            key stakeholders in different crop value chains such as various
            Government officials, extension officers and other key members.
          </p>
        </div>
      </div>
    </div>
    </Element>
  )
}

export default About
