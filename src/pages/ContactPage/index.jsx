import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactPage = () => {
  const contactFormRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_EMAIL_PROVIDER_SERVICE_ID, 
        process.env.REACT_APP_EMAILJS_EMAIL_PROVIDER_TEMPLATE_ID, 
        contactFormRef.current, 
        process.env.REACT_APP_EMAILJS_EMAIL_PROVIDER_PUBLICKEY_ID,  
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full bg-gray-100 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Send us a message!</p>
      </header>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <form ref={contactFormRef} onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          {isSent && <p className="text-green-500 mb-4">Your message has been sent successfully!</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Send
          </button>
        </form>
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">You Can Check My Profiles</h2>
          <div className="flex gap-6">
            <a href="https://github.com/PawanEpisode/" target='_blank' className="text-black-700 text-3xl hover:text-black-800"><FaGithub /></a>
            <a href="https://x.com/PawanKu90986512/" target='_blank' className="text-blue-400 text-3xl hover:text-blue-500"><FaTwitter /></a>
            <a href="https://www.instagram.com/_cool_breeze_12/" target='_blank' className="text-pink-500 text-3xl hover:text-pink-600"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/pawankumar1201/" target='_blank' className="text-blue-500 text-3xl hover:text-blue-600"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage