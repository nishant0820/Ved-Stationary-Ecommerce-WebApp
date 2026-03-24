import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.jpeg" alt="StarScrib" className="h-10 w-10 rounded-full object-cover bg-white border border-stone-800 shadow-sm shadow-stone-900" />
              <span className="font-bold text-xl text-stone-100">StarScrib</span>
            </div>
            <p className="text-stone-400 mb-4">Your one-stop shop for all stationary and graphic design needs.</p>
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
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
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
              <li>
                <Link to="/products?category=papers" className="text-gray-400 hover:text-white transition-colors">Papers</Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-lg block mb-4">Contact Us</span>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">F-61/2A Subhash Vihar</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">+91 9899459288</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">gupta.nishant08042004@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-500">
          <p>&copy; {currentYear} StarScrib. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
