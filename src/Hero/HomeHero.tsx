import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1', // Elegant hotel room
    'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1', // Cozy bed setup
  'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
  // Stylish hotel lounge
];
const HomeHero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
     <section className="relative w-screen h-[65vh] overflow-hidden flex items-center justify-center bg-black">
      <AnimatePresence>
        <motion.img
          key={current}
          src={images[current]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Heading */}
      <h1 className="relative z-20 text-center text-yellow-200 text-2xl md:text-5xl font-bold px-10 drop-shadow-lg">
        Ready to Book a StayCation of your dreams?
      </h1>

      {/* Dots */}
      <div className="absolute bottom-14 z-20 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-yellow-300 scale-125' : 'bg-gray-400'
            } transition-all duration-300`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 z-20 flex justify-center w-full">
        <div className="animate-bounce text-yellow-300 text-3xl">
          ↓
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
