const MobileSection = () => {
  return (
    <section className='bg-[#f5f8fa] py-10 sm:py-16 md:py-20'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-center md:space-x-20 px-2 sm:px-4'>
        {/* Mobile Image */}
        <div className='flex-shrink-0 mb-8 md:mb-0 -mt-10 md:-mt-20'>
          <img
            src='https://bordio.com/wp-content/themes/understrap/images/front-app-1x.png'
            alt='Mobile App'
            className='w-[200px] sm:w-[260px] md:w-[320px] lg:w-[370px] mx-auto drop-shadow-xl'
          />
        </div>
        {/* Text Content */}
        <div className='max-w-full sm:max-w-lg text-center md:text-left'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight'>
            Stay in control of your <br className='hidden md:block' /> work wherever you go
          </h2>
          <p className='text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8'>
            You don’t have to give up control over your work when leaving the office. With the Bordio mobile app, you
            can quickly check the plan for today, add a new task, or reply to a message. Be on the same page with your
            team, even when you’re halfway across the world.
          </p>
          <div className='flex justify-center md:justify-start items-center gap-3 sm:gap-4'>
            <a href='#' aria-label='App Store'>
              <img
                src='https://bordio.com/wp-content/themes/understrap/images/appstore-lg-1x.png'
                alt='App Store'
                className='h-10 sm:h-12 w-auto'
              />
            </a>
            <a href='#' aria-label='Google Play'>
              <img
                src='https://bordio.com/wp-content/themes/understrap/images/google-lg-1x.png'
                alt='Google Play'
                className='h-10 sm:h-12 w-auto'
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileSection
