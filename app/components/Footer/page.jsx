import Link from "next/link";
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left" id="footer">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold">RentWheels</h2>
          <p className="text-gray-400 text-sm mt-2">
            Your trusted partner for hassle-free vehicle rentals.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-gray-400">About Us</Link></li>
            <li><Link href="/services" className="hover:text-gray-400">Our Services</Link></li>
            <li><Link href="/faq" className="hover:text-gray-400">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-gray-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/book" className="hover:text-gray-400">Book a Ride</Link></li>
            <li><Link href="/pricing" className="hover:text-gray-400">Pricing</Link></li>
            <li><Link href="/terms" className="hover:text-gray-400">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex justify-center md:justify-start items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+91 2563256325</span>
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>rentwheels.com</span>
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>123 RentRide Street,Banglore</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="#" className="hover:text-gray-400">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-gray-400">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} RentWheels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
