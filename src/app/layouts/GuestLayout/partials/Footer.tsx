import logo from '@/app/assets/LogoFlowPilot2.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PATH } from '@/app/routes/path'

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <footer className='w-full bg-white border-t border-gray-200 pt-10 pb-4 px-4 sm:px-6 md:px-8 lg:px-0'>
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8'>
        {/* Logo & Social */}
        <div className='flex flex-col items-start gap-6 min-w-[180px] sm:min-w-[200px] md:min-w-[240px]'>
          <div className='flex items-center gap-2'>
            <img src={logo} alt='FlowPilot logo' className='h-16 w-auto' />
            <span className='text-3xl font-semibold text-gray-900'>FLOWPILOT</span>
          </div>
          <div className='text-gray-700 text-base mt-2'>
            Nền tảng quản lý hiệu suất
            <br />
            nhân sự từ xa
          </div>
          <div className='flex gap-4 mt-4'>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110'
              aria-label='Instagram'
            >
              <i className='fa-brands fa-instagram text-2xl'></i>
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110'
              aria-label='Facebook'
            >
              <i className='fa-brands fa-facebook text-2xl'></i>
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110'
              aria-label='X (Twitter)'
            >
              <i className='fa-brands fa-x-twitter text-2xl'></i>
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110'
              aria-label='YouTube'
            >
              <i className='fa-brands fa-youtube text-2xl'></i>
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110'
              aria-label='LinkedIn'
            >
              <i className='fa-brands fa-linkedin text-2xl'></i>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-8 flex-1'>
          <div>
            <h4 className='font-semibold text-gray-900 mb-3'>FLOWPILOT</h4>
            <ul className='space-y-2 text-gray-700 text-sm'>
              <li>
                <Link to={PATH.HOME} className='hover:underline transition-all duration-200 hover:text-gray-900'>
                  Trang chủ
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (location.pathname === PATH.LANDING_PAGE) {
                      // Nếu đang ở trang home, scroll đến about section
                      const aboutSection = document.getElementById('about')
                      aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    } else {
                      // Nếu ở trang khác, navigate về home với hash
                      navigate(PATH.LANDING_PAGE + '#about')
                      // Sau khi navigate, scroll đến about
                      setTimeout(() => {
                        const aboutSection = document.getElementById('about')
                        aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }, 100)
                    }
                  }}
                  className='hover:underline transition-all duration-200 hover:text-gray-900'
                >
                  Giới thiệu
                </button>
              </li>
              <li>
                <Link
                  to={PATH.PRICING_PAGE}
                  className='hover:underline transition-all duration-200 hover:text-gray-900'
                >
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link
                  to={PATH.CONTACT_PAGE}
                  className='hover:underline transition-all duration-200 hover:text-gray-900'
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold text-gray-900 mb-3'>Tài nguyên</h4>
            <ul className='space-y-2 text-gray-700 text-sm'>
              <li>
                <a href='#' className='hover:underline transition-all duration-200 hover:text-gray-900'>
                  Blog
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline transition-all duration-200 hover:text-gray-900'>
                  Hướng dẫn
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline transition-all duration-200 hover:text-gray-900'>
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-semibold text-gray-900 mb-3'>Hỗ trợ</h4>
            <ul className='space-y-2 text-gray-700 text-sm'>
              <li>
                <a href='#' className='hover:underline transition-all duration-200 hover:text-gray-900'>
                  Trung tâm hỗ trợ
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline transition-all duration-200 hover:text-gray-900'>
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline transition-all duration-200 hover:text-gray-900'>
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-8 border-t border-gray-200 pt-4 gap-4 px-2 sm:px-0'>
        <div className='text-xs text-gray-500 text-center sm:text-left'>
          © 2025 FLOWPILOT. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  )
}

export default Footer
