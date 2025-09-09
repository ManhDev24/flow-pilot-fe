const VideoDemoSection = () => {
  return (
    <div
      className='bg-no-repeat bg-cover bg-center mb-[40px] max-w-full overflow-hidden'
      style={{
        backgroundImage: "url('https://bordio.com/wp-content/themes/understrap/images/how-bg.png')"
      }}
    >
      <div className='Video-wrapper container mx-auto py-10 sm:py-16 px-2 sm:px-4 text-center'>
        <p className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4'>How it works</p>
        <p className='text-lg sm:text-2xl font-bold mb-2 sm:mb-4'>FlowPilot explained in just 2 minutes</p>
        <div className='video-container w-full max-w-full mx-auto flex justify-center items-center mt-6 sm:mt-8'>
          <div className='relative w-[80%]' style={{ paddingTop: '56.25%' }}>
            <iframe
              src='https://www.youtube.com/embed/LNcqRRMcMbQ'
              title='Video Demo'
              className='absolute top-0 left-0 w-full h-full rounded-lg min-h-[180px] sm:min-h-[220px] md:min-h-[350px] lg:min-h-[500px] xl:min-h-[00px]'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDemoSection
