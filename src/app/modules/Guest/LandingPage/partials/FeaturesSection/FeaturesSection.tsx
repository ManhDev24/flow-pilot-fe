import FeatureImage3 from '@/app/assets/ai-analysis.png'
import FeatureImage2 from '@/app/assets/employee-report.png'
import FeatureImage4 from '@/app/assets/file-upload.png'
import FeatureImage1 from '@/app/assets/focus-mode.png'
import FeatureImage6 from '@/app/assets/project-dashboard.png'
import FeatureImage5 from '@/app/assets/team-management.png'
const FeaturesSection = () => {
  return (
    <div className='pb-8 pt-6 sm:pb-[70px] sm:pt-[48px]'>
      <div className='FeaturesSection-wrapper container mx-auto flex flex-col justify-center items-center px-2 sm:px-4'>
        {/* Feature 1 */}
        <div className='mb-8 sm:mb-[60px] flex flex-col lg:flex-row lg:items-center gap-4'>
          <div className='feature-item w-3/4 mb-4 lg:mb-0 lg:ms-[10px] flex justify-center order-1 lg:order-none'>
            <img src={FeatureImage1} alt='Feature 1' className='w-full max-w-[320px] lg:max-w-none' />
          </div>
          <div className='feature-item p-2 lg:p-4 flex flex-col justify-center items-start text-start order-2 lg:order-none'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Stay focused with distraction-free Focus Mode
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Eliminate distractions and boost productivity with Flow Pilot's Focus Mode. Hide unnecessary elements and
              concentrate on what matters most - your current tasks. Switch between normal and focused views seamlessly
              to maintain peak concentration throughout your workday.
            </p>
          </div>
        </div>
        {/* Feature 2 */}
        <div className='mb-8 sm:mb-[60px] flex flex-col lg:flex-row-reverse lg:items-center gap-4'>
          <div className='feature-item mb-4 lg:mb-0 lg: flex justify-center items-center order-1 lg:order-none '>
            <img src={FeatureImage2} alt='Feature 2' className='w-full max-w-[600px] lg:max-w-[700px]' />
          </div>
          <div className='feature-item p-2 lg:p-4 flex flex-col justify-center items-start text-start order-2 lg:order-none'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Track team performance with comprehensive reports
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Get detailed insights into your team's productivity with Flow Pilot's advanced reporting system. Monitor
              task completion rates, time tracking, and individual performance metrics to make data-driven decisions and
              optimize your team's workflow for maximum efficiency.
            </p>
          </div>
        </div>
        {/* Feature 3 */}
        <div className='mb-8 sm:mb-[60px] flex flex-col lg:flex-row lg:items-center gap-4'>
          <div className='feature-item mb-4 w-3/4 lg:mb-0 lg:ms-[10px] flex justify-center order-1 lg:order-none'>
            <img src={FeatureImage3} alt='Feature 3' className='w-full max-w-[320px] lg:max-w-none' />
          </div>
          <div className='feature-item p-2 lg:p-4 flex flex-col justify-center items-start text-start order-2 lg:order-none'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              AI-powered performance analysis and insights
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Leverage artificial intelligence to analyze your team's performance patterns and identify optimization
              opportunities. Flow Pilot's AI engine provides personalized recommendations, predicts bottlenecks, and
              suggests workflow improvements to maximize your team's productivity and efficiency.
            </p>
          </div>
        </div>
        {/* Feature 4 */}
        <div className='mb-8 sm:mb-[60px] flex flex-col lg:flex-row-reverse lg:items-center gap-4'>
          <div className='feature-item mb-4 w-3/4 lg:mb-0 lg: flex justify-center order-1 lg:order-none'>
            <img src={FeatureImage4} alt='Feature 4' className='w-full max-w-[320px] lg:max-w-none' />
          </div>
          <div className='feature-item p-2 lg:p-4 flex flex-col justify-center items-start text-start order-2 lg:order-none'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Seamless file sharing and document management
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Upload and share files directly within your tasks and projects. Flow Pilot supports multiple file formats
              and provides secure cloud storage, making it easy to collaborate on documents, images, and other assets
              without switching between different platforms.
            </p>
          </div>
        </div>
        {/* Feature 5 */}
        <div className='mb-8 sm:mb-[60px] flex flex-col lg:flex-row lg:items-center gap-4'>
          <div className='feature-item mb-4 w-3/4 lg:mb-0 lg:ms-[10px] flex justify-center order-1 lg:order-none'>
            <img src={FeatureImage5} alt='Feature 5' className='w-full max-w-[320px] lg:max-w-none' />
          </div>
          <div className='feature-item p-2 lg:p-4 flex flex-col justify-center items-start text-start order-2 lg:order-none'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Comprehensive team management and collaboration
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Organize and manage your team members efficiently with Flow Pilot's advanced team management features.
              Assign roles and permissions, track individual contributions, manage team hierarchies, and foster better
              collaboration across all your projects and departments.
            </p>
          </div>
        </div>
        {/* Feature 6 */}
        {/* Feature 6 */}
        <div className='mb-8 sm:mb-[60px] flex flex-col lg:flex-row-reverse lg:items-center gap-4'>
          <div className='feature-item mb-4 w-3/4 lg:mb-0 lg: flex justify-center order-1 lg:order-none'>
            <img src={FeatureImage6} alt='Feature 6' className='w-full max-w-[320px] lg:max-w-none' />
          </div>
          <div className='feature-item p-2 lg:p-4 flex flex-col justify-center items-start text-start order-2 lg:order-none'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Real-time project progress tracking and reporting
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Stay on top of your project milestones with Flow Pilot's comprehensive progress tracking dashboard.
              Monitor task completion, timeline adherence, budget utilization, and team velocity with visual charts and
              automated progress reports to ensure successful project delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
