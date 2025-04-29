import { Element } from 'react-scroll'

const Partners = () => {
  return (
    <Element name="partners" className="element">
    <div className='mx-auto mt-10 container '>
        <div className='py-14'>
      <h1 className='text-center text-2xl font-bold text-white'>Our Partners</h1>
       <div className='mt-10 flex flex-wrap items-center justify-center gap-5 lg:gap-16'>
        <div className='flex flex-col items-center'>
            <img src="/images/nembo.png" alt="data" className='h-32 w-32'/>
            <p className='font-bold italic text-xl mt-1  text-white'>Wizara ya Kilimo</p>
        </div>
        <div className='flex flex-col items-center'>
            <img src="/images/nembo.png" alt="data" className='h-32 w-32'/>
            <p className='font-bold italic text-xl mt-1 text-white'>Wizara ya Mifugo na Uvuvi</p>
        </div>
        <div className='flex flex-col items-center'>
            <img src="/images/shambabora.svg" alt="data" className='h-32 w-32 bg-white rounded-lg border-blue-950 border-[1px]'/>
            <p className='font-bold italic text-xl mt-1 text-white'>Shamba Bora</p>
        </div>
       </div>
        </div>
    </div>
    </Element>
  )
}

export default Partners