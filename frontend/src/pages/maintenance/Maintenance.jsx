import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTools, FaHeadset, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Maintenance = () => {
    const navigate = useNavigate();
    const services = [
        {
            title: "Device Repair Services",
            icon: <FaTools className="text-4xl text-purple-400" />,
            description: "Professional repair services for all your devices",
            features: [
                "Hardware repairs and replacements",
                "Software troubleshooting",
                "Virus removal and system optimization",
                "Data recovery services",
                "Screen and battery replacements"
            ],
            buttonText: "Request Repair",
            link: "/maintenance/repair"
        },
        {
            title: "Technical Consultations",
            icon: <FaHeadset className="text-4xl text-purple-400" />,
            description: "Expert advice for your technical needs",
            features: [
                "System upgrade recommendations",
                "Software selection guidance",
                "Network setup assistance",
                "Security best practices",
                "Performance optimization tips"
            ],
            buttonText: "Book Consultation",
            link: "/maintenance/consult"
        }
    ];

    const testimonials = [
        {
            name: "Rushan Fernando",
            rating: 5,
            comment: "Excellent service! They fixed my laptop's screen issue within a day. Very professional and affordable.",
            service: "Device Repair"
        },
        {
            name: "Hashan Perera",
            rating: 5,
            comment: "The technical consultation helped me choose the right components for my PC upgrade. Great expertise!",
            service: "Technical Consultation"
        },
        {
            name: "Pasindu Akalanka",
            rating: 5,
            comment: "Quick response and thorough virus removal service. My computer is running faster than ever!",
            service: "Device Repair"
        }
    ];

    const handleServiceClick = (e, serviceType) => {
        e.preventDefault();
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            toast.error('Please create an account or login to continue', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#1F2937',
                    color: '#fff',
                    border: '1px solid #4B5563',
                },
            });
        } else {
            navigate(serviceType === 'repair' ? '/maintenance/repair' : '/maintenance/consult');
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Maintenance Services
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Professional device repair and technical consultation services to keep your technology running smoothly
                    </p>
                </div>

                {/* Testimonials Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white text-center mb-8">
                        What Our Customers Say
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    <FaQuoteLeft className="text-purple-400 text-xl mr-2" />
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="text-sm text-purple-400">{testimonial.service}</span>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                                <p className="text-white font-medium">- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2">
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    {service.icon}
                                    <h3 className="text-2xl font-bold text-white">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-gray-300 mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-300">
                                            <span className="text-purple-400">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={(e) => handleServiceClick(e, service.link.includes('repair') ? 'repair' : 'consult')}
                                    className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200"
                                >
                                    {service.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Maintenance;