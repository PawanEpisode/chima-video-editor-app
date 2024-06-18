import React from 'react'

import chimalogo from '../../assets/chima-logo.png'
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to={'/'}>
              <span className="sr-only">Workflow</span>
              <img className="h-8 w-auto sm:h-10" src={chimalogo} alt="Logo" />
            </Link>
            <div className='w-full flex justify-start gap-10 ml-10 items-center'>
            <Link to={'/trimVideo'} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Trim Video
            </Link>
            <Link to={'/splitVideo'} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Split Video
            </Link>
            <Link to={'/backgroundRemoval'} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Background Removal
            </Link>
            </div>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link to={'/features'} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Features
            </Link>
            <Link to={'/pricing'} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Pricing
            </Link>
            <Link to={'/contact'} className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;