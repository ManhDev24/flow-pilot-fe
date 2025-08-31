const AboutSection = () => {
  return (
    <div className='pt-4 mb-8 sm:pt-[30px] sm:mb-[48px]'>
      <div className='aboutSection-wrapper container mx-auto text-center px-2 sm:px-4'>
        <p className='text-lg sm:text-2xl md:text-4xl font-bold mb-6 sm:mb-[32px] sm:leading-[36px] md:mb-[48px] md:leading-[49px]'>
          Designed to suit every team's needs
        </p>
        <div className='flex flex-col justify-center items-center gap-2 w-full flex-wrap'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full'>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px] lg:h-[180px] lg:w-[180px] xl:h-[200px] xl:w-[200px] rounded-[12px] sm:rounded-[18px] md:rounded-[20px] border border-[#D7D7D7] mx-auto transition-all duration-200 bg-white'>
              <div className='mb-2 sm:mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/marketing-analysis-marketing-research-svgrepo-com-1.svg'
                  alt='Marketing'
                  className='w-6 h-6 sm:w-auto sm:h-auto'
                />
              </div>
              <p className='text-[10px] sm:text-xs md:text-base lg:text-[18px]'>Marketing</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/design-skills-svgrepo-com-1.svg' alt='Design' className='w-6 h-6 sm:w-auto sm:h-auto' />
              </div>
              <p className='text-[10px] sm:text-[18px]'>Design</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/megaphone-advertising-svgrepo-com-1.svg'
                  alt='PR'
                  className='w-6 h-6 sm:w-auto sm:h-auto'
                />
              </div>
              <p className='text-[10px] sm:text-[18px]'>PR</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/code-svgrepo-com-1.svg' alt='Development' className='w-6 h-6 sm:w-auto sm:h-auto' />
              </div>
              <p className='text-[10px] sm:text-[18px]'>Development</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/idea-svgrepo-com-1.svg' alt='Agencies' className='w-6 h-6 sm:w-auto sm:h-auto' />
              </div>
              <p className='text-[10px] sm:text-[18px]'>Agencies</p>
            </div>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 w-full mt-2 sm:mt-4'>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px] lg:h-[180px] lg:w-[180px] xl:h-[200px] xl:w-[200px] rounded-[12px] sm:rounded-[18px] md:rounded-[20px] border border-[#D7D7D7] mx-auto transition-all duration-200 bg-white'>
              <div className='mb-2 sm:mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/it-infrastructure-software-svgrepo-com-1.svg'
                  alt='IT'
                  className='w-6 h-6 sm:w-auto sm:h-auto'
                />
              </div>
              <p className='text-[10px] sm:text-xs md:text-base lg:text-[18px]'>IT</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/business-information-reporting-svgrepo-com-1.svg'
                  alt='Business Operations'
                  className='w-6 h-6 sm:w-auto sm:h-auto'
                />
              </div>
              <p className='text-[10px] sm:text-[18px]'>Business Operations</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/manager-profile-svgrepo-com-1.svg' alt='HR' className='w-6 h-6 sm:w-auto sm:h-auto' />
              </div>
              <p className='text-[10px] sm:text-[18px]'>HR</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/contract-with-pen-svgrepo-com-1.svg'
                  alt='Legal'
                  className='w-6 h-6 sm:w-auto sm:h-auto'
                />
              </div>
              <p className='text-[10px] sm:text-[18px]'>Legal</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] sm:h-[200px] sm:w-[200px] rounded-[12px] sm:rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-2 sm:mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/hot-sales-discount-svgrepo-com-1.svg'
                  alt='Sales'
                  className='w-6 h-6 sm:w-auto sm:h-auto'
                />
              </div>
              <p className='text-[10px] sm:text-[18px]'>Sales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
