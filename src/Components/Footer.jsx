import React from 'react';
import logo from '/src/assets/logo.png';
import { ArrowRight, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black backdrop-blur-md py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Logo + Title Centered */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <img src={logo} alt="PortView Logo" className="h-26 w-26" />
            <h3 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              PortView
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Track, analyze, and grow your investments with confidence. PortView helps you manage your portfolio with real-time insights and smart analytics.
            </p>
          </div>
        </div>

        {/* Footer Grid (3 Columns) */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Investments
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Privacy & Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex justify-center md:justify-start items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-center md:justify-start items-start">
                <Globe className="mr-2 h-5 w-5 mt-0.5 text-blue-400" />
                <span>401 FinTech Tower, Haldwani, Uttarakhand</span>
              </li>
              <li className="flex justify-center md:justify-start items-center">
                <span className="mr-2 text-blue-400">📧</span>
                support@portview.com
              </li>
              <li className="flex justify-center md:justify-start items-center">
                <span className="mr-2 text-blue-400">📞</span>
                +91 98765 43210
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&#169; 2025 PortView. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Investment Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

