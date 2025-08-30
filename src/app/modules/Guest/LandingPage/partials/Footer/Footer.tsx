import logo from '@/app/assets/LogoFlowPilot2.png'

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-10 pb-4 px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
        <div className="flex flex-col items-start gap-6 min-w-[180px] sm:min-w-[200px] md:min-w-[220px]">
          <div className="flex items-center gap-2">
            <img src={logo} alt="bordio logo" className="h-16 w-auto" />
            <span className="text-3xl font-semibold text-gray-900">FlowPilot</span>
          </div>
          <div className="text-gray-700 text-base mt-2">Work management platform<br />for result-driven teams</div>
          <div className="mt-2">
            <button className="flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              English
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fa-brands fa-instagram text-2xl"></i></a>
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fa-brands fa-facebook text-2xl"></i></a>
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fa-solid fa-xmark text-2xl"></i></a>
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fa-brands fa-youtube text-2xl"></i></a>
            <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fa-brands fa-linkedin text-2xl"></i></a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Bordio</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#" className="hover:underline">Book a Demo</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Product Roadmap</a></li>
              <li><a href="#" className="hover:underline">Printable Calendars</a></li>
              <li><a href="#" className="hover:underline">Printable Templates</a></li>
              <li><a href="#" className="hover:underline">Useful Tools &amp; Software</a></li>
              <li><a href="#" className="hover:underline">Service Providers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Use cases</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#" className="hover:underline">Task Management</a></li>
              <li><a href="#" className="hover:underline">Project Management</a></li>
              <li><a href="#" className="hover:underline">Time Management</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Solutions</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#" className="hover:underline">Project organizer</a></li>
              <li><a href="#" className="hover:underline">Online project board</a></li>
              <li><a href="#" className="hover:underline">Task board</a></li>
              <li><a href="#" className="hover:underline">Work organizer</a></li>
              <li><a href="#" className="hover:underline">Day organizer</a></li>
              <li><a href="#" className="hover:underline">Online task manager</a></li>
              <li><a href="#" className="hover:underline">Work board</a></li>
              <li><a href="#" className="hover:underline font-medium flex items-center">See all solutions <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-8 border-t border-gray-200 pt-4 gap-4 px-2 sm:px-0">
        <div className="text-xs text-gray-500 text-center sm:text-left">Bordio SIA, Katlakalna 9A, Riga, Latvia © All rights reserved. <a href="#" className="underline">Terms &amp; Privacy</a></div>
        <div className="flex gap-2 justify-center sm:justify-end w-full sm:w-auto">
          <a href="#" className="inline-block"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" /></a>
          <a href="#" className="inline-block"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
