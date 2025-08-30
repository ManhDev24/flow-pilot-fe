const AboutSection = () => {
  return (
    <div className='pt-[30px] mb-[48px]'>
      <div className='aboutSection-wrapper container mx-auto text-center px-2 sm:px-4'>
        <p className='text-2xl sm:text-3xl md:text-4xl font-bold mb-[32px] sm:mb-[48px] leading-[36px] sm:leading-[49px]'>
          Designed to suit every team's needs
        </p>
        <div className='flex flex-col justify-center items-center gap-4 w-full flex-wrap'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 w-full'>
            <div className='flex flex-col justify-center items-center h-[80px] w-[80px] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px] lg:h-[180px] lg:w-[180px] xl:h-[200px] xl:w-[200px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] border border-[#D7D7D7] mx-auto transition-all duration-200 bg-white'>
              <div className='mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/marketing-analysis-marketing-research-svgrepo-com-1.svg'
                  alt='Marketing'
                />
              </div>
              <p className='text-xs sm:text-sm md:text-base lg:text-[18px]'>Marketing</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/design-skills-svgrepo-com-1.svg' alt='Design' />
              </div>
              <p className='text-[18px]'>Design</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/megaphone-advertising-svgrepo-com-1.svg'
                  alt='PR'
                />
              </div>
              <p className='text-[18px]'>PR</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/code-svgrepo-com-1.svg' alt='Development' />
              </div>
              <p className='text-[18px]'>Development</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/idea-svgrepo-com-1.svg' alt='Agencies' />
              </div>
              <p className='text-[18px]'>Agencies</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 w-full'>
            <div className='flex flex-col justify-center items-center h-[80px] w-[80px] sm:h-[110px] sm:w-[110px] md:h-[140px] md:w-[140px] lg:h-[180px] lg:w-[180px] xl:h-[200px] xl:w-[200px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] border border-[#D7D7D7] mx-auto transition-all duration-200 bg-white'>
              <div className='mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/it-infrastructure-software-svgrepo-com-1.svg'
                  alt='IT'
                />
              </div>
              <p className='text-xs sm:text-sm md:text-base lg:text-[18px]'>IT</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/business-information-reporting-svgrepo-com-1.svg'
                  alt='Business Operations'
                />
              </div>
              <p className='text-[18px]'>Business Operations</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img src='https://bordio.com/wp-content/uploads/2024/06/manager-profile-svgrepo-com-1.svg' alt='HR' />
              </div>
              <p className='text-[18px]'>HR</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/contract-with-pen-svgrepo-com-1.svg'
                  alt='Legal'
                />
              </div>
              <p className='text-[18px]'>Legal</p>
            </div>
            <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[20px] border border-[#D7D7D7]'>
              <div className='mb-[16px]'>
                <img
                  src='https://bordio.com/wp-content/uploads/2024/06/hot-sales-discount-svgrepo-com-1.svg'
                  alt='Sales'
                />
              </div>
              <p className='text-[18px]'>Sales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
