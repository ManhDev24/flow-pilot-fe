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
      className='pt-[30px] bg-no-repeat bg-cover bg-center mb-[48px]'
      style={{
        backgroundImage: "url('https://bordio.com/wp-content/themes/understrap/images/header-bg.jpg')"
      }}
    >
      <div className='HeroSection-wrapper container mx-auto flex flex-col items-center justify-center gap-8 px-4'>
        <div className='text-center'>
          <p className='text-[64px] font-extrabold leading-[74px] max-w-[911px] text-[#222]'>
            Work management platform for result-driven teams
          </p>
          <p className='text-[19px] font-normal leading-[32px] max-w-[911px] text-[#222] mt-6 mx-auto'>
            FlowPilot helps teams to plan the work, track the progress and get sh*t done.
          </p>
        </div>
        <div className='text-center '>
          <button className='text-[20px] font-bold px-[35px] py-[20px] mb-2 bg-[#0094FF] text-white border-[#0094FF] rounded-md hover:bg-[#07c]'>
            Try FlowPilot for free
          </button>
          <p className='text-[14px] text-[#8C939F]'>No credit card required.</p>
        </div>
        <div className='tab-content flex flex-col items-center'>
          <Tabs defaultValue='calendar' className='w-full flex flex-col items-center'>
            <TabsList
              className='flex rounded-xl px-6 py-7 gap-3 w-full min-w-[540px] max-w-[1000px] justify-center mx-auto'
              style={{ backgroundColor: 'rgba(230, 234, 239, 0.95)' }}
            >
              <TabsTrigger
                value='calendar'
                className='flex items-center gap-4 px-8 py-6 rounded-lg text-[18px] font-semibold text-[#222] data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold data-[state=active]:text-black transition'
              >
                <CalendarDays className='w-9 h-9' />
                Calendar planner
              </TabsTrigger>
              <TabsTrigger
                value='task'
                className='flex items-center gap-4 px-8 py-6 rounded-lg text-[18px] font-semibold text-[#222] data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold data-[state=active]:text-black transition'
              >
                <ListTodo className='w-9 h-9' />
                Task list
              </TabsTrigger>
              <TabsTrigger
                value='kanban'
                className='flex items-center gap-4 px-8 py-6 rounded-lg text-[18px] font-semibold text-[#222] data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold data-[state=active]:text-black transition'
              >
                <ListTodo className='w-9 h-9' />
                Kanban board
              </TabsTrigger>
              <TabsTrigger
                value='projects'
                className='flex items-center gap-4 px-8 py-6 rounded-lg text-[18px] font-semibold text-[#222] data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold data-[state=active]:text-black transition'
              >
                <Folder className='w-9 h-9' />
                Projects
              </TabsTrigger>
              <TabsTrigger
                value='notes'
                className='flex items-center gap-4 px-8 py-6 rounded-lg text-[18px] font-semibold text-[#222] data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:font-bold data-[state=active]:text-black transition'
              >
                <StickyNote className='w-9 h-9' />
                Notes
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value='calendar'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 320 }}
            >
              <div className='calendar-image flex justify-center'>
                {loading.calendar && <Skeleton className='w-4/5 h-[260px] mx-auto mt-10' />}
                <img
                  src={CalendarPlanerImage}
                  alt='calendar-planner'
                  className={`w-4/5 mx-auto mt-10 ${loading.calendar ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('calendar')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='task'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 320 }}
            >
              <div className='tasklist-image flex justify-center'>
                {loading.task && <Skeleton className='w-4/5 h-[260px] mx-auto mt-10' />}
                <img
                  src={TaskListImage}
                  alt='task-list'
                  className={`w-4/5 mx-auto mt-10 ${loading.task ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('task')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='kanban'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 320 }}
            >
              <div className='kanban-image flex justify-center'>
                {loading.kanban && <Skeleton className='w-4/5 h-[260px] mx-auto mt-10' />}
                <img
                  src={KanBanImage}
                  alt='kanban'
                  className={`w-4/5 mx-auto mt-10 ${loading.kanban ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('kanban')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='projects'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 320 }}
            >
              <div className='projects-image flex justify-center'>
                {loading.projects && <Skeleton className='w-4/5 h-[260px] mx-auto mt-10' />}
                <img
                  src={ProjectsImage}
                  alt='projects'
                  className={`w-4/5 mx-auto mt-10 ${loading.projects ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('projects')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
            <TabsContent
              value='notes'
              className='transition-opacity duration-300 ease-in-out'
              style={{ minHeight: 320 }}
            >
              <div className='notes-image flex justify-center'>
                {loading.notes && <Skeleton className='w-4/5 h-[260px] mx-auto mt-10' />}
                <img
                  src={NotesImage}
                  alt='notes'
                  className={`w-4/5 mx-auto mt-10 ${loading.notes ? 'hidden' : 'block'}`}
                  onLoad={() => handleImageLoad('notes')}
                  style={{ transition: 'opacity 0.3s' }}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className='front-rating flex justify-center items-center gap-4 mt-8 text-[#222]'>
            <div>
              <p className='text-2xl font-medium'>Rating 4.7</p>
            </div>
            <div>
              <img src='https://bordio.com/wp-content/themes/understrap/images/rating.svg' alt='rating' />
            </div>
            <div>
              <p className='text-sm'>Based on 300+ reviews</p>
            </div>
            
          </div>
          <div className='flex justify-center items-center gap-3 mt-4'>
              <div>
                  <img src="https://bordio.com/wp-content/themes/understrap/images/rating-logo_1.svg" alt="image1" />
              </div>
              <div>
                  <img src="https://bordio.com/wp-content/themes/understrap/images/rating-logo_2.svg" alt="image2" />
              </div>
              <div>
                  <img src="https://bordio.com/wp-content/themes/understrap/images/rating-logo_3.svg" alt="image3" />
              </div>
              <div>
                  <img src="https://bordio.com/wp-content/themes/understrap/images/rating-logo_4.svg" alt="image4" />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
