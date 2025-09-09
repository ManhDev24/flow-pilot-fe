const PricingSection = () => {
  return (
    <div
      className='bg-no-repeat bg-cover bg-center px-4 py-10 sm:p-[50px]'
      style={{ backgroundImage: 'url("https://bordio.com/wp-content/themes/understrap/images/foooter-form-bg.png")' }}
    >
      <div className='pricing-wrap container mx-auto text-center flex flex-col justify-center items-center gap-4 sm:gap-6'>
        <p className="text-white text-2xl sm:text-3xl font-bold">Transform the way your team works</p>
        <p className="text-white text-base sm:text-lg">Start managing your team instead of managing tools. Your team will thank you!</p>
        <button className='text-base sm:text-[20px] font-bold px-6 sm:px-[35px] py-3 sm:py-[20px] mb-2 bg-[#0094FF] text-white border-[#0094FF] rounded-md hover:bg-[#07c]'>
          Try FlowPilot for free
        </button>
      </div>
    </div>
  )
}

export default PricingSection
