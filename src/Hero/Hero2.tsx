import React from 'react';
import { motion } from 'framer-motion';

const Hero2: React.FC = () => {
  return (
    <section className="w-screen min-h-screen bg-rose-50 text-gray-800 px-6 py-20 overflow-x-hidden">
      {/* Heading */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-4"
      >
        Why Choose Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto mb-8"
      >
        Discover the features that make Golden Home Hotels the top choice for your next stay.
      </motion.p>

      <hr className="border-rose-300 w-24 mx-auto mb-10" />

      {/* Why Choose Us Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {[
          {
            title: 'Top Rated Hotels',
            text: 'We list only the best hotels across Kenya with trusted reviews and exceptional service.',
          },
          {
            title: 'Secure Payments',
            text: 'Our payment system is secure and seamless, powered by Stripe.',
          },
          {
            title: '24/7 Support',
            text: 'Our customer care team is always available to help you anytime, anywhere.',
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-rose-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-rose-600 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* What People Say About Us Section */}
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-3xl font-bold text-center text-rose-500 mb-4"
      >
        What People Say About Us
      </motion.h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Real stories from real guests—see what makes our service stand out.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            name: 'Jane Mwangi',
            quote:
              'Golden Home Hotels gave us the perfect family getaway! The booking process was smooth and the staff were very friendly.',
          },
          {
            name: 'Samuel Otieno',
            quote:
              'Booking with them was a breeze. The hotel we stayed in exceeded our expectations. Highly recommend!',
          },
          {
            name: 'Winnie Njeri',
            quote:
              'I appreciated the quick response time and the professional service. Will definitely book again!',
          },
        ].map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-rose-300 cursor-pointer"
          >
            <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
            <p className="text-rose-600 font-semibold text-right">— {testimonial.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero2;
