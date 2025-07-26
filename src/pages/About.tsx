import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <section className="w-screen min-h-screen bg-pink-50 text-gray-800 px-6 py-20 overflow-x-hidden">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-500 mb-4">
          About Golden Home Hotels
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Your cozy escape in Kenya—where hospitality meets heritage.
        </p>

        <hr className="border-pink-300 w-24 mx-auto mb-10" />

        {/* Card 1 */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:ring-2 hover:ring-pink-400/50 mb-12 max-w-6xl mx-auto overflow-hidden">
          <div className="md:w-1/2 p-6 md:p-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 tracking-wide">
              ✨ Welcome to <span className="text-gray-700">Golden Home Hotels</span> ✨
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Whether you're craving a serene coastal sunrise or the charm of Kenya’s highlands, our platform lets you search for the hotel of your choice, view available rooms, and book your perfect escape—all in one place.
            </p>
          </div>
          <img
            src="https://imgs.search.brave.com/HImo8GiA84e7UCYEw19p0AfiruY1qA8VTAMC4PVMXSE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg3/MDE4MjgyL3Bob3Rv/L2Fib3V0LXVzLXRl/eHQtb24td29vZGVu/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1lb096dDA1aTIx/NEEwb3VLeUUzcUp4/NXdZcll1NmZTZUpy/TEtJMmVwcHlVPQ"
            alt="Kenyan hospitality"
            className="md:w-1/2 h-64 md:h-full object-cover"
          />
        </div>

        {/* Card 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center bg-white rounded-xl shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:ring-2 hover:ring-pink-400/50 mb-12 max-w-6xl mx-auto overflow-hidden">
          <div className="md:w-1/2 p-6 md:p-10 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To offer a seamless hotel booking experience that celebrates Kenyan culture, comfort, and connection. We aim to empower travelers with choice, clarity, and a touch of elegance in every stay.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Kenyan highlands"
            className="md:w-1/2 h-64 md:h-full object-cover"
          />
        </div>

        {/* Card 3 */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:ring-2 hover:ring-pink-400/50 mb-12 max-w-6xl mx-auto overflow-hidden">
          <div className="md:w-1/2 p-6 md:p-10 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become Kenya’s most trusted hotel discovery platform—where every booking feels like a warm welcome, and every hotel reflects the heart of our heritage.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Coastal sunrise"
            className="md:w-1/2 h-64 md:h-full object-cover"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
