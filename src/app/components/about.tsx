// app/components/About.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { 
  SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, 
  SiTailwindcss, SiFirebase, SiMongodb, SiDocker, SiGit, 
  SiPostgresql, SiLaravel, SiPhp, SiMysql
} from 'react-icons/si';
import { FaRocket, FaLightbulb, FaBullseye } from 'react-icons/fa';

interface Tech {
  icon: React.ReactNode;
  name: string;
  color: string;
  level: string; // Tooltip info
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const technologies: Tech[] = [
    { icon: <SiJavascript size={40} />, name: 'JavaScript', color: 'text-yellow-400', level: 'Advanced' },
    { icon: <SiTypescript size={40} />, name: 'TypeScript', color: 'text-blue-400', level: 'Intermediate' },
    { icon: <SiReact size={40} />, name: 'React', color: 'text-cyan-400', level: 'Advanced' },
    { icon: <SiNextdotjs size={40} />, name: 'Next.js', color: 'text-white', level: 'Advanced' },
    { icon: <SiNodedotjs size={40} />, name: 'Node.js', color: 'text-green-400', level: 'Advanced' },
    { icon: <SiTailwindcss size={40} />, name: 'Tailwind CSS', color: 'text-teal-400', level: 'Advanced' },
    { icon: <SiFirebase size={40} />, name: 'Firebase', color: 'text-orange-400', level: 'Intermediate' },
    { icon: <SiMongodb size={40} />, name: 'MongoDB', color: 'text-green-500', level: 'Intermediate' },
    { icon: <SiPhp size={40} />, name: 'PHP', color: 'text-purple-500', level: 'Advanced' },
    { icon: <SiLaravel size={40} />, name: 'Laravel', color: 'text-red-500', level: 'Advanced' },
    { icon: <SiMysql size={40} />, name: 'MySQL', color: 'text-blue-600', level: 'Advanced' },
    { icon: <SiDocker size={40} />, name: 'Docker', color: 'text-blue-500', level: 'Beginner' },
    { icon: <SiGit size={40} />, name: 'Git', color: 'text-red-500', level: 'Advanced' },
    { icon: <SiPostgresql size={40} />, name: 'PostgreSQL', color: 'text-blue-400', level: 'Intermediate' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setIsVisible(entry.isIntersecting)),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 md:px-12 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800"
    >
      {/* background dekorasi */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 to-transparent pointer-events-none"></div>

      <div
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Bagian Kiri - Tentang Saya */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tentang{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Saya
            </span>
          </h2>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
            Full Stack Developer
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Saya adalah seorang developer yang berfokus pada pengembangan aplikasi web
            modern menggunakan teknologi terkini. Tujuan saya adalah menciptakan sistem
            yang cepat, elegan, dan mudah dikembangkan.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Saya percaya bahwa setiap baris kode memiliki makna, dan pengalaman pengguna
            adalah prioritas utama dalam membangun solusi digital.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="flex gap-2 items-center px-4 py-2 bg-slate-800 rounded-full text-sm border border-cyan-500/30 hover:border-cyan-500/60 transition">
              <FaRocket className="text-cyan-400" /> Fast Learner
            </span>
            <span className="flex gap-2 items-center px-4 py-2 bg-slate-800 rounded-full text-sm border border-cyan-500/30 hover:border-cyan-500/60 transition">
              <FaLightbulb className="text-yellow-400" /> Problem Solver
            </span>
            <span className="flex gap-2 items-center px-4 py-2 bg-slate-800 rounded-full text-sm border border-cyan-500/30 hover:border-cyan-500/60 transition">
              <FaBullseye className="text-pink-400" /> Detail Oriented
            </span>
          </div>
        </div>

        {/* Bagian Kanan - Technologies */}
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Technologies I Work With
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 place-items-center">
            {technologies.map((tech, index) => (
              <div key={index} className="relative group">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 flex flex-col items-center justify-center">
                  <div className={`${tech.color} text-4xl mb-1`}>{tech.icon}</div>
                  <p className="text-gray-300 text-xs font-medium text-center">
                    {tech.name}
                  </p>
                </div>

                {/* Tooltip */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition bg-slate-900 text-gray-200 text-xs px-3 py-1 rounded-md border border-cyan-500/30 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  {tech.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
