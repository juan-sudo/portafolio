import React from 'react';
import logo from './assets/logop.png';
import mio from './assets/mio.jpg'
const Header = () => (
  <nav className="bg-white fixed top-0 left-0 w-full z-50">
    <div className="container mx-auto px-4 py-4 md:flex md:items-center">
    <div className='flex align-top'>
  <img src={mio} alt="Descripción de la imagen" className="object-contain h-16 border-radius-custom flex-shrink-0" />

  </div>
      <div className="flex md:hidden items-center ml-auto"></div>
      <div className="hidden md:flex md:items-center space-x-4 ml-auto" id="mobile-menu">
      <a href="#" className="text-black hover:text-white px-3 py-2 rounded-md text-lg font-bold">Home</a>
    <a href="#" className="text-black hover:text-white px-3 py-2 rounded-md text-lg font-bold">About</a>
    <a href="#" className="text-black hover:text-white px-3 py-2 rounded-md text-lg font-bold">Portafolio</a>
    <a href="#" className="text-black hover:text-white px-3 py-2 rounded-md text-lg font-bold">Blog</a>
    <a href="#" className="text-black hover:text-white px-3 py-2 rounded-md text-lg font-bold">Contacto</a>

      </div>
    </div>
  </nav>
);

export default Header;
