import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainContainer = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-between bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-xl mb-8">Discover our features and services designed just for you.</p>
          <Link to={'/trimVideo'} className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl flex flex-col mx-auto px-4 items-center gap-6">
          <h2 className="text-3xl font-bold mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Video Editing 🎬</h3>
              <p className="text-gray-600">Edit your videos with our easy-to-use tools. Cut, trim, and merge videos effortlessly.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Background Removal 🖼️</h3>
              <p className="text-gray-600">Remove backgrounds from your videos with our advanced AI-powered tool</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Slow Motion 🐢</h3>
              <p className="text-gray-600">Apply stunning slow-motion effects to your videos with just a few clicks.</p>
            </div>
          </div>
          <Link to={'/features'} className="bg-white w-[200px] text-center text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
            See More
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Join us today and experience the best services tailored for you.</p>
          <Link to={'/contact'} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
            Contact US
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; 2024 Our Website. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/PawanEpisode/" target='_blank' className="text-2xl hover:text-blue-500"><FaFacebook /></a>
            <a href="https://x.com/PawanKu90986512/" target='_blank' className="text-2xl hover:text-blue-400"><FaTwitter /></a>
            <a href="https://www.instagram.com/_cool_breeze_12/" target='_blank' className="text-2xl hover:text-pink-500"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/pawankumar1201/" target='_blank' className="text-2xl hover:text-blue-600"><FaLinkedin /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default MainContainer;
