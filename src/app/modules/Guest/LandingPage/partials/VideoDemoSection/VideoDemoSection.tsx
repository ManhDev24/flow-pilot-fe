
const VideoDemoSection = () => {
  return (
    <div
      className='bg-no-repeat bg-cover bg-center mb-[40px] max-w-full'
      style={{
        backgroundImage: "url('https://bordio.com/wp-content/themes/understrap/images/how-bg.png')"
      }}
    >
      <div className="Video-wrapper container mx-auto py-10 sm:py-16 px-2 sm:px-4 text-center">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">How it works</p>
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">FlowPilot explained in just 2 minutes</p>
        <div className="video-container w-full sm:w-[90%] md:w-[80%] flex justify-center items-center mx-auto mt-6 sm:mt-8">
          <div className="relative w-full" style={{paddingTop: '56.25%'}}>
            <iframe
              src="https://www.youtube.com/embed/LNcqRRMcMbQ"
              title="Video Demo"
              className="absolute top-0 left-0 w-full h-full rounded-lg min-h-[220px] sm:min-h-[350px] md:min-h-[500px] lg:min-h-[700px]"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDemoSection