import { Skeleton } from '@/app/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { CalendarDays, Folder, ListTodo, StickyNote } from 'lucide-react'
import { useState } from 'react'

import ProjectsImage from '@/app/assets/all-projects-xl-1x.webp'
import CalendarPlanerImage from '@/app/assets/bordio-calendar-xl-1x.webp'
import KanBanImage from '@/app/assets/kanban-xl-1x.webp'
import NotesImage from '@/app/assets/notes-xl-1x.webp'
import TaskListImage from '@/app/assets/table-view-xl-1x.webp'

const HeroSection = () => {
  const [loading, setLoading] = useState({
    calendar: true,
    task: true,
    kanban: true,
    projects: true,
    notes: true
  })
  const handleImageLoad = (tab: string) => {
    setLoading((prev) => ({ ...prev, [tab]: false }))
  }
  return (
    <div
      className='pt-4 sm:pt-[30px] bg-no-repeat bg-cover bg-center mb-8 sm:mb-[48px] px-2 sm:px-4'
      style={{
        backgroundImage: "url('https://bordio.com/wp-content/themes/understrap/images/header-bg.jpg')"
      }}
    >
      <div className='HeroSection-wrapper container mx-auto flex flex-col items-center justify-center gap-6 sm:gap-8'>
        <div className='text-center'>
          <p className='text-2xl sm:text-[64px] font-extrabold leading-7 sm:leading-[74px] max-w-full sm:max-w-[911px] text-[#222]'>
            Work management platform for result-driven teams
          </p>
          <p className='text-sm sm:text-[19px] font-normal leading-5 sm:leading-[32px] max-w-full sm:max-w-[911px] text-[#222] mt-3 sm:mt-6 mx-auto'>
            FlowPilot helps teams to plan the work, track the progress and get sh*t done.
          </p>
        </div>
        <div className='text-center'>
          <button className='text-sm sm:text-[20px] font-bold px-4 sm:px-[35px] py-2 sm:py-[20px] mb-2 bg-[#0094FF] text-white border-[#0094FF] rounded-md hover:bg-[#07c]'>
            Try FlowPilot for free
          </button>
          <p className='text-xs sm:text-[14px] text-[#8C939F]'>No credit card required.</p>
        </div>
        <div className='tab-content flex flex-col items-center w-full'>
          <Tabs defaultValue='calendar' className='w-full flex flex-col items-center'>
            <div className='w-full flex justify-center items-center my-4'>
              <TabsList className='flex gap-4'>
                <TabsTrigger
                  value='calendar'
                  className='w-[56px] h-[56px] rounded-xl flex items-center justify-center bg-[#f3f5f7] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-none transition-all duration-150'
                >
                  <CalendarDays className='w-6 h-6 mx-auto data-[state=active]:text-[#0094FF] text-[#8C939F]' />
                </TabsTrigger>
                <TabsTrigger
                  value='task'
                  className='w-[56px] h-[56px] rounded-xl flex items-center justify-center bg-[#f3f5f7] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-none transition-all duration-150'
                >
                  <ListTodo className='w-6 h-6 mx-auto data-[state=active]:text-[#0094FF] text-[#8C939F]' />
                </TabsTrigger>
                <TabsTrigger
                  value='kanban'
                  className='w-[56px] h-[56px] rounded-xl flex items-center justify-center bg-[#f3f5f7] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-none transition-all duration-150'
                >
                  <ListTodo className='w-6 h-6 mx-auto data-[state=active]:text-[#0094FF] text-[#8C939F]' />
                </TabsTrigger>
                <TabsTrigger
                  value='projects'
                  className='w-[56px] h-[56px] rounded-xl flex items-center justify-center bg-[#f3f5f7] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-none transition-all duration-150'
                >
                  <Folder className='w-6 h-6 mx-auto data-[state=active]:text-[#0094FF] text-[#8C939F]' />
                </TabsTrigger>
                <TabsTrigger
                  value='notes'
                  className='w-[56px] h-[56px] rounded-xl flex items-center justify-center bg-[#f3f5f7] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border-none transition-all duration-150'
                >
                  <StickyNote className='w-6 h-6 mx-auto data-[state=active]:text-[#0094FF] text-[#8C939F]' />
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value='calendar'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 160 }}
            >
              <div className='calendar-image flex justify-center'>
                {loading.calendar && (
                  <Skeleton className='w-full sm:w-4/5 h-[120px] sm:h-[260px] mx-auto mt-4 sm:mt-10' />
                )}
                <img
                  src={CalendarPlanerImage}
                  alt='calendar-planner'
                  className={`w-full sm:w-4/5 mx-auto mt-4 sm:mt-10 ${loading.calendar ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('calendar')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='task'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 160 }}
            >
              <div className='tasklist-image flex justify-center'>
                {loading.task && <Skeleton className='w-full sm:w-4/5 h-[120px] sm:h-[260px] mx-auto mt-4 sm:mt-10' />}
                <img
                  src={TaskListImage}
                  alt='task-list'
                  className={`w-full sm:w-4/5 mx-auto mt-4 sm:mt-10 ${loading.task ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('task')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='kanban'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 160 }}
            >
              <div className='kanban-image flex justify-center'>
                {loading.kanban && (
                  <Skeleton className='w-full sm:w-4/5 h-[120px] sm:h-[260px] mx-auto mt-4 sm:mt-10' />
                )}
                <img
                  src={KanBanImage}
                  alt='kanban'
                  className={`w-full sm:w-4/5 mx-auto mt-4 sm:mt-10 ${loading.kanban ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('kanban')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='projects'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 160 }}
            >
              <div className='projects-image flex justify-center'>
                {loading.projects && (
                  <Skeleton className='w-full sm:w-4/5 h-[120px] sm:h-[260px] mx-auto mt-4 sm:mt-10' />
                )}
                <img
                  src={ProjectsImage}
                  alt='projects'
                  className={`w-full sm:w-4/5 mx-auto mt-4 sm:mt-10 ${loading.projects ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('projects')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='notes'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 160 }}
            >
              <div className='notes-image flex justify-center'>
                {loading.notes && <Skeleton className='w-full sm:w-4/5 h-[120px] sm:h-[260px] mx-auto mt-4 sm:mt-10' />}
                <img
                  src={NotesImage}
                  alt='notes'
                  className={`w-full sm:w-4/5 mx-auto mt-4 sm:mt-10 ${loading.notes ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('notes')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className='front-rating flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-8 text-[#222]'>
            <div>
              <p className='text-base sm:text-2xl font-medium'>Rating 4.7</p>
            </div>
            <div>
              <img
                src='https://bordio.com/wp-content/themes/understrap/images/rating.svg'
                alt='rating'
                className='h-4 sm:h-auto'
              />
            </div>
            <div>
              <p className='text-xs sm:text-sm'>Based on 300+ reviews</p>
            </div>
          </div>
          <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-2 sm:mt-4'>
            <div>
              <img
                src='https://bordio.com/wp-content/themes/understrap/images/rating-logo_1.svg'
                alt='image1'
                className='h-4 sm:h-auto'
              />
            </div>
            <div>
              <img
                src='https://bordio.com/wp-content/themes/understrap/images/rating-logo_2.svg'
                alt='image2'
                className='h-4 sm:h-auto'
              />
            </div>
            <div>
              <img
                src='https://bordio.com/wp-content/themes/understrap/images/rating-logo_3.svg'
                alt='image3'
                className='h-4 sm:h-auto'
              />
            </div>
            <div>
              <img
                src='https://bordio.com/wp-content/themes/understrap/images/rating-logo_4.svg'
                alt='image4'
                className='h-4 sm:h-auto'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
