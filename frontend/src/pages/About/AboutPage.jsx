import React from 'react';
import { FaUsers, FaLaptop, FaTools, FaStar } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen text-white pt-20">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('../../../public/backgrounds/h1.jpg')",
            filter: "blur(2px)"
          }}
        ></div>
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">About Us</h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Your trusted partner in technology solutions for over 7 years
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 ">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
            <p className="text-lg text-gray-300 mb-8">
              Welcome to Meta Computers (Pvt) Ltd, your trusted partner in technology solutions for over 7 years. 
              Established with a passion for excellence, we are proud to serve a growing customer base of over 4,000 
              satisfied clients. Whether you're an avid gamer, a busy professional, or a creative content creator, 
              we have the perfect tech solutions tailored just for you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-700/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaLaptop className="mr-2 text-purple-400" />
                  Our Products
                </h3>
                <p className="text-gray-300">
                  Our comprehensive offerings include top-tier office laptops, gaming laptops, high-performance 
                  gaming PCs, office PCs, and editing PCs. We also provide a wide range of laptop spare parts, 
                  desktop components, and accessories to meet all your tech needs.
                </p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaTools className="mr-2 text-purple-400" />
                  Our Services
                </h3>
                <p className="text-gray-300">
                  At Meta Computers, we go beyond just sales. Our expert technicians specialize in fast, reliable 
                  repairs for laptops and PCs, ensuring minimal downtime and maximum efficiency. Our commitment 
                  to customer satisfaction drives us to deliver exceptional service, every time.
                </p>
              </div>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaUsers className="mr-2 text-purple-400" />
                Our Commitment
              </h3>
              <p className="text-gray-300">
                Experience cutting-edge technology, personalized support, and unwavering reliability with Meta Computers. 
                Let us power your digital journey with trust and innovation!
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-600/20 p-6 rounded-xl text-center">
                <h4 className="text-3xl font-bold mb-2">7+</h4>
                <p className="text-gray-300">Years of Experience</p>
              </div>
              <div className="bg-purple-600/20 p-6 rounded-xl text-center">
                <h4 className="text-3xl font-bold mb-2">4000+</h4>
                <p className="text-gray-300">Satisfied Clients</p>
              </div>
              <div className="bg-purple-600/20 p-6 rounded-xl text-center">
                <h4 className="text-3xl font-bold mb-2">24/7</h4>
                <p className="text-gray-300">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 