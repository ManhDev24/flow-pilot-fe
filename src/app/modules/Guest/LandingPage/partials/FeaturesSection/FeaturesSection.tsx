import FeatureImage1 from '@/app/assets/front-1-1x.png'
import FeatureImage2 from '@/app/assets/front-2-1x.png'
import FeatureImage3 from '@/app/assets/front-3-1x.png'
import FeatureImage4 from '@/app/assets/front-4-1x.png'
import FeatureImage5 from '@/app/assets/front-5-1x.png'
import FeatureImage6 from '@/app/assets/front-6-1x.png'
import FeatureImage7 from '@/app/assets/front-7-1x.png'
import FeatureImage8 from '@/app/assets/front-8-1x.png'
const FeaturesSection = () => {
  return (
    <div className='pb-8 pt-6 sm:pb-[70px] sm:pt-[48px]'>
      <div className='FeaturesSection-wrapper container mx-auto flex flex-col justify-center items-center px-2 sm:px-4'>
        {/* Feature 1 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item mb-4 sm:mb-0 sm:ms-[10px] flex justify-center'>
            <img src={FeatureImage1} alt='Feature 1' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>Create projects and share them with your teammates</p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              In Flow Pilot you can create as many projects as you need, organize them into folders, and add your
              teammates to collaborate. Additionally, you can invite guests, such as clients or freelancers, to join
              specific projects at no extra cost.
            </p>
          </div>
        </div>
        {/* Feature 2 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Schedule your team’s tasks and events on specific days
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Say goodbye to overwhelming to-do lists with hundreds of tasks. In Bordio, you can schedule tasks and
              meetings on specific days, creating a short, actionable plan for each day. This allows your team to focus
              solely on today’s tasks and get maximum out of every single day.
            </p>
          </div>
          <div className='feature-item mb-4 sm:mb-0 sm:me-[122px] flex justify-center'>
            <img src={FeatureImage2} alt='Feature 2' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
        </div>
        {/* Feature 3 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item mb-4 sm:mb-0 sm:ms-[10px] flex justify-center'>
            <img src={FeatureImage3} alt='Feature 3' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Use waiting list as a backlog for future tasks and ideas
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Every team has tasks that are important but not immediately urgent, requiring the team’s attention in the
              future. Bordio’s waiting list is a dedicated space for such tasks. Instead of scheduling them on a
              specific date, put them on the waiting list and come back later.
            </p>
          </div>
        </div>
        {/* Feature 4 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>Customize your workflow with custom task statuses</p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Need a workflow more advanced than just “new → in progress → done”? With FlowPilot, you can create
              unlimited custom task stages—like testing, review, or approval—and arrange them in any order to perfectly
              match your team’s process.
            </p>
          </div>
          <div className='feature-item mb-4 sm:mb-0 sm:me-[122px] flex justify-center'>
            <img src={FeatureImage4} alt='Feature 4' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
        </div>
        {/* Feature 5 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item mb-4 sm:mb-0 sm:ms-[10px] flex justify-center'>
            <img src={FeatureImage5} alt='Feature 5' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Schedule new meetings without switching to another tool
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Have you noticed that in addition to any task management tool you were still using a separate Calendar app
              to manage events? Well, this problem is finally solved. You can create new meetings right in Bordio, set a
              reminder, and invite participants by email (they will receive ics invite on their emails)
            </p>
          </div>
        </div>
        {/* Feature 6 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>
              Connect your Google Calendar to manage all events in Flow Pilot
            </p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Most likely you already have many scheduled events in Google Calendar that you don’t want to lose. We get
              it. But you can easily connect your Google account to Bordio and sync all your existing events in seconds.
              Why juggle multiple tools when you can manage everything in Bordio?
            </p>
          </div>
          <div className='feature-item mb-4 sm:mb-0 sm:me-[122px] flex justify-center'>
            <img src={FeatureImage6} alt='Feature 6' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
        </div>
        {/* Feature 7 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item mb-4 sm:mb-0 sm:ms-[10px] flex justify-center'>
            <img src={FeatureImage7} alt='Feature 7' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>Manage your teams workload with time estimates</p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Many task management tools calculate users’ workload based only on tasks, which can lead to inaccurate
              data. Remember, your teammates spend significant time in meetings as well, don’t they? Bordio solves it by
              calculating everyone’s workload based on all their scheduled activities, including both tasks and events.
            </p>
          </div>
        </div>
        {/* Feature 8 */}
  <div className='mb-8 sm:mb-[60px] grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='feature-item p-2 sm:p-4 flex flex-col justify-center items-start text-start'>
            <p className='font-bold mb-4 sm:mb-6 text-xl sm:text-4xl max-w-full sm:max-w-[600px]'>Set recurring tasks and events to save time</p>
            <p className='text-base sm:text-xl max-w-full sm:max-w-[600px]'>
              Every team has regular activities such as weekly team meeting or making a monthly report. Instead of
              creating them every single time, you can set repeats and they will appear in your team’s calendar only on
              chosen days. Less manual work, more productivity!
            </p>
          </div>
          <div className='feature-item mb-4 sm:mb-0 sm:me-[122px] flex justify-center'>
            <img src={FeatureImage8} alt='Feature 8' className='w-full max-w-[320px] sm:max-w-none' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
