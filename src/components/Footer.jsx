import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pink-100 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-2">About</h3>
          <p className="text-sm text-gray-600">
            BabyNames helps you discover the perfect name for your little one
            with modern, classic, and unique options.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-pink-600" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-600" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-pink-600" />
          </div>
        </div>
      </div>
      <div className="bg-pink-200 py-3 text-center text-sm text-gray-700">
        © {new Date().getFullYear()} BabyNames. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
