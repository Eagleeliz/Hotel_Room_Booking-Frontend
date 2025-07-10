// components/Footer.tsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-200 text-gray-900 px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-semibold text-orange-600">Golden Home Hotels</h3>
          <p className="mt-2">
            Your cozy escape in Kenya—where hospitality meets heritage.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/rooms" className="hover:text-orange-500">View Hotels</a></li>
            <li><a href="/booking" className="hover:text-orange-500">About us</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
            <li><a href="/gallery" className="hover:text-orange-500"></a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Contact</h4>
          <p>Email: goldenhomehotels.co.ke</p>
          <p>Phone: +254 700 123 456</p>
          <p>Location: Nanyuki, Laikipia County</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" className="text-gray-600 hover:text-orange-500">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" className="text-gray-600 hover:text-orange-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" className="text-gray-600 hover:text-orange-500">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-orange-500">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 border-t pt-4 text-sm text-gray-600">
       Copyright &copy;  {new Date().getFullYear()} -All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
