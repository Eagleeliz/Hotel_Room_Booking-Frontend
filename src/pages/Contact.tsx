import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster, toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <section className="w-screen min-h-screen bg-pink-50 text-gray-800 px-6 py-20 overflow-x-hidden">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-500 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto mb-8">
          We’d love to hear from you—reach out and let’s help you find your perfect staycation spot.
        </p>
        <hr className="border-pink-300 w-24 mx-auto mb-10" />

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-pink-300 hover:scale-105 transition-all duration-300">
            <h2 className="text-pink-500 font-semibold text-xl mb-2">📍 Location</h2>
            <p className="text-gray-700">Ground Floor, Westlands One, Waiyaki Way, Nairobi</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-pink-300 hover:scale-105 transition-all duration-300">
            <h2 className="text-pink-500 font-semibold text-xl mb-2">📞 Phone</h2>
            <p className="text-gray-700">+254 712 345 678</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-pink-300 hover:scale-105 transition-all duration-300">
            <h2 className="text-pink-500 font-semibold text-xl mb-2">📧 Email</h2>
            <p className="text-gray-700">contact@goldenhomehotels.co.ke</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold px-5 py-2 rounded-full hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
