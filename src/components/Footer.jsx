import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <line x1="10" y1="9" x2="8" y2="9"/>
              </svg>
              <span className="font-bold text-xl">Ved Stationary</span>
            </div>
            <p className="text-gray-400 mb-4">Your one-stop shop for all stationary and graphic design needs.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg block mb-4">Quick Links</span>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-lg block mb-4">Categories</span>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=notebooks" className="text-gray-400 hover:text-white transition-colors">Notebooks</Link>
              </li>
              <li>
                <Link to="/products?category=pens" className="text-gray-400 hover:text-white transition-colors">Pens & Pencils</Link>
              </li>
              <li>
                <Link to="/products?category=art" className="text-gray-400 hover:text-white transition-colors">Art Supplies</Link>
              </li>
              <li>
                <Link to="/products?category=office" className="text-gray-400 hover:text-white transition-colors">Office Supplies</Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-lg block mb-4">Contact Us</span>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">123 Stationary Street, Paper City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">info@vedstationary.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Ved Stationary and Graphics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;