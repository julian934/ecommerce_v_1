import React from 'react'

const NavTest = () => {
  return (
    <nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between h-16">
      
      {/* <!-- Logo --> */}
      <div className="flex-shrink-0 flex items-center">
        <a href="#" className="text-white font-bold text-lg">Logo</a>
      </div>

      
      {/* <!-- Hamburger menu button -->*/}
      <div className="flex md:hidden items-center">
        <button id="mobile-menu-toggle" className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      
      {/* <!-- Desktop navigation links -->*/}
      <div className="hidden md:flex md:items-center">
        <ul className="flex space-x-4 text-white">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">About</a></li>
          <li><a href="#" className="hover:text-gray-300">Services</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>

  
  {/*<!-- Mobile menu --> */}
  <div id="mobile-menu" className=" md:hidden">
    <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <li><a href="#" className="block text-white hover:text-gray-300">Home</a></li>
      <li><a href="#" className="block text-white hover:text-gray-300">About</a></li>
      <li><a href="#" className="block text-white hover:text-gray-300">Services</a></li>
      <li><a href="#" className="block text-white hover:text-gray-300">Contact</a></li>
    </ul>
  </div>
</nav>
  )
}

export default NavTest