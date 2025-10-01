import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">👶</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                BabyNames
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Discover the perfect name for your little one with our comprehensive database of beautiful baby names from around the world.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/names" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  Browse Names
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/names?gender=boy" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  Boy Names
                </Link>
              </li>
              <li>
                <Link to="/names?gender=girl" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  Girl Names
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  Popular Names
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                  Unique Names
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600 text-sm">
                <Mail className="w-4 h-4 mr-2 text-pink-500" />
                hello@babynames.com
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <Phone className="w-4 h-4 mr-2 text-pink-500" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-pink-500 mt-0.5" />
                <span>123 Baby Street<br />Name City, NC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-600 text-sm">
                © {currentYear} BabyNames. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link to="/privacy" className="text-gray-500 hover:text-pink-600 transition-colors text-xs">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-pink-600 transition-colors text-xs">
                  Terms of Service
                </Link>
                <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors text-xs">
                  Cookies
                </a>
              </div>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-pink-500 fill-current" />
              <span>for parents worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
