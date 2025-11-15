// app/components/Hero.tsx
'use client';
import { FaHandPeace, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row justify-center items-center pb-20 px-4 md:px-8 lg:px-16 gap-8 md:gap-12 lg:gap-20 pt-20">
      {/* Text Content */}
      <div 
        className={`text-center md:text-left max-w-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <div className="mb-4">
          <span className="flex items-center gap-2 text-cyan-400 font-semibold text-lg animate-pulse">
            <FaHandPeace className='text-cyan-300'/> 
            Welcome to my portfolio
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Hi, Saya <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient">
            Ilham
          </span>
        </h1>
        
        <div className="space-y-2 mb-8">
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            Full Stack Developer
          </p>
          <p className="text-lg text-gray-400">
            Web Enthusiast | Problem Solver
          </p>
        </div>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          Saya membuat aplikasi web modern dan responsif menggunakan teknologi terkini.
          Passionate dalam menciptakan pengalaman digital yang luar biasa.
        </p>
        
        <div className="flex justify-center md:justify-start gap-4 mb-8">
          <a 
            href="https://github.com/Fanadillah" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-cyan-400 transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            aria-label="GitHub"
          >
            <FaGithub size={32} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-400 transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={32} />
          </a>
          <a 
            href="mailto:ilhampranataadi@gmail.com"
            className="text-white hover:text-cyan-400 transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            aria-label="Email"
          >
            <FaEnvelope size={32} />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <a 
            href="#portfolio" 
            className="group relative bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-all overflow-hidden"
          >
            <span className="relative z-10">Lihat Portfolio</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
          <a 
            href="#contact"
            className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Hubungi Saya
          </a>
        </div>
      </div>

      {/* Image Content */}
      <div 
        className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        <div className="relative">
          {/* Animated background circles */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-10 animate-pulse delay-700"></div>
          
          {/* Image container */}
          <div className="relative">
            <Image
              src="/me-poto.png"
              alt="Profile Picture"
              width={400}
              height={400}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover rounded-full border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-float"
              priority
            />
            
            {/* Decorative elements */}
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="absolute -top-2 -left-2 w-16 h-16 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}