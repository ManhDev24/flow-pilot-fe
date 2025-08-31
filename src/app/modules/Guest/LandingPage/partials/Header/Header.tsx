import logoFlowpilot from '@/app/assets/LogoFlowPilot2.png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu'

import { Video, Menu, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mainMenu = (
    <ul className='flex flex-col md:flex-row list-none text-black gap-2 md:gap-5'>
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-1 text-base font-normal rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100 hover:bg-gray-100 px-[12px] py-[10px]'>
            Use cases <ChevronDown className='h-4 w-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[180px]'>
            <div className='flex flex-col'>
              <div className='text-base font-normal text-left px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
                Project Management
              </div>
              <div className='text-base font-normal text-left px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
                Task Management
              </div>
              <div className='text-base font-normal text-left px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
                Time Management
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <li>
        <button className='flex items-center gap-1 text-base font-normal rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100 hover:bg-gray-100 px-[12px] py-[10px]'>
          Solutions
        </button>
      </li>
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-1 text-base font-normal rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100 hover:bg-gray-100 px-[12px] py-[10px]'>
            Resources <ChevronDown className='h-4 w-4' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-[220px]'>
            <div className='flex flex-col'>
              <div className='text-base font-normal text-left px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
                Project Management
              </div>
              <div className='text-base font-normal text-left px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
                Task Management
              </div>
              <div className='text-base font-normal text-left px-4 py-2 rounded hover:bg-gray-100 cursor-pointer'>
                Time Management
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <li>
        <button className='flex items-center gap-1 text-base font-normal rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100 hover:bg-gray-100 px-[12px] py-[10px]'>
          Pricing
        </button>
      </li>
      <li>
        <button className='flex items-center gap-1 text-base font-normal rounded-xl transition-all duration-200 border border-transparent hover:border-gray-100 hover:bg-gray-100 px-[12px] py-[10px]'>
          Contact
        </button>
      </li>
    </ul>
  )

  return (
    <div className='wrapper-Header w-full bg-no-repeat bg-cover bg-center px-2 sm:px-4'>
      <div className='navbar flex flex-col sm:flex-row justify-between items-center w-full mx-auto py-2 sm:py-0'>
        <div className='Navbar-logo group cursor-pointer mb-2 sm:mb-0'>
          <div className='flex items-center'>
            <img
              className='max-w-[100px] sm:max-w-[142px] max-h-[60px] sm:max-h-[112px] lg:max-w-[200px] transition duration-200 group-hover:brightness-90'
              src={logoFlowpilot}
              alt='flow-pillot-logo'
            />
            <p className='text-base sm:text-xl font-bold uppercase text-black transition duration-200 group-hover:text-gray-600 group-hover:brightness-90 ml-2'>
              Flowpilot
            </p>
          </div>
        </div>
  <div className='Navbar-main-menu hidden xl:block'>{mainMenu}</div>
  <div className='Navbar-account-menu flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0'>
          <button className='flex items-center gap-2 py-2 px-3 text-black text-sm sm:text-base font-normal transition-all duration-300 hover:text-gray-600'>
            <Video className='h-7 w-7' />
            Book a Demo
          </button>
          <Link to='/auth/login'>
            <button className='text-base sm:text-lg font-normal px-4 sm:px-[30px] py-2 sm:py-[8px] bg-[#0094FF] text-white border-[#0094FF] rounded-md hover:bg-[#07c]'>
              Log In
            </button>
          </Link>

          <button
            className='xl:hidden flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gray-100 hover:bg-gray-200 transition ml-2'
            aria-label='Open menu'
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <Menu className='w-6 h-6 sm:w-7 sm:h-7' />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className='xl:hidden absolute left-0 right-0 z-50 bg-white border-t border-gray-100 animate-fade-in-down'>
          <div className='w-full py-4 px-2'>{mainMenu}</div>
        </div>
      )}
    </div>
  )
}

export default Header
