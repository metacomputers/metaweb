import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "META Computing Solutions",
      subtitle: "Powerful hardware for modern demands",
      description: "Discover our range of high-performance computers and components designed for professionals and gamers alike.",
      image: "../../../public/backgrounds/h1.jpg",
      cta: "Shop Now",
      link: "/products"
    },
    {
      title: "Gaming Like Never Before",
      subtitle: "Elevate your gaming experience",
      description: "From powerful gaming rigs to precision peripherals, we have everything you need to dominate the competition.",
      image: "../../../public/backgrounds/h2.jpg",
      cta: "View Gaming Products",
      link: "/products"
    },
    {
      title: "Feel the power of future",
      subtitle: "Elevate your gaming experience",
      description: "From powerful gaming rigs to precision peripherals, we have everything you need to dominate the competition.",
      image: "../../../public/backgrounds/h3.jpg",
      cta: "View Gaming Products",
      link: "/products"
    }
  ];
  
  // Add automatic slide transition
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    
    // Clean up interval on component unmount
    return () => {
      clearInterval(slideInterval);
    };
  }, [heroSlides.length]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Carousel Slides */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: currentSlide === index ? "scale(1.05)" : "scale(1)",
                  transition: "transform 10s ease-out"
                }}
              ></div>
              
              {/* Content */}
              <div className="relative z-20 container mx-auto h-full flex items-center px-4">
                <div className={`max-w-2xl transition-all duration-1000 transform ${
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}>
                  <h3 className="text-purple-400 text-xl mb-2 font-semibold">
                    {slide.subtitle}
                  </h3>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 text-lg mb-8">
                    {slide.description}
                  </p>
                  <a 
                    href="/products"
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:translate-y-px hover:shadow-lg"
                  >
                    {slide.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? "bg-purple-500 w-8" 
                  : "bg-gray-400 bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 right-8 z-20 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Section Preview */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Browse By Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of products across different categories to find exactly what you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "laptops",
                name: "Laptops",
                description: "High-performance laptops for work and play",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                id: "components",
                name: "Components",
                description: "Build your perfect PC with premium parts",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              {
                id: "accessories",
                name: "Accessories",
                description: "Enhance your setup with premium peripherals",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                id: "networking",
                name: "Networking",
                description: "Stay connected with reliable network solutions",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                )
              }
            ].map((category) => (
              <div 
                key={category.id}
                className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 border border-gray-700 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="h-40 bg-gradient-to-r from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                  <div className="bg-gray-800 p-4 rounded-full">
                    {category.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{category.name}</h3>
                  <p className="text-gray-400 mb-4">{category.description}</p>
                  <a 
                    href="/products"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Browse Products
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Sections Row */}
<section className="py-16 bg-gray-900 relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/10 rounded-full filter blur-3xl"></div>
  <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-700/10 rounded-full filter blur-3xl"></div>
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* First CTA Card */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-800/80 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to upgrade your tech?</h2>
            <p className="text-gray-300 mb-6">
              Whether you're looking for a custom PC build, tech repair, we're here to help you find the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/products"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:translate-y-px text-center"
              >
                Shop Now
              </a>
              <a 
                href="/products"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:translate-y-px text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="relative h-52 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl transform -rotate-3"></div>
            <div className="relative flex items-center justify-center p-6 h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second CTA Card */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-800/80 rounded-2xl p-8 md:p-10 shadow-xl border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">Need Consultation?</h2>
            <p className="text-gray-300 mb-6">
              Our tech experts are always here to help you and guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/maintenance"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:translate-y-px text-center"
              >
                Make an Appointment
              </a>
            </div>
          </div>
          <div className="relative h-52 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl transform -rotate-3"></div>
            <div className="relative flex items-center justify-center p-6 h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 
    </div>

    
  );
};

export default HomePage;