// app/components/Portfolio.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Portfolio } from '../../types/portfolio';
import { getAllPortfolio, getPortfolio } from '@/lib/posts';

export default function PortfolioIndex() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try{
        const data = await getAllPortfolio();
        setProjects(data);
      }catch(error) {
        console.error("error Get Portfolio:", error)
      }finally{
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Portfolio</h2>
          <div className="text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Portfolio</h2>
          <div className="text-red-400">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Portfolio
        </h2>
        
        {projects.length === 0 ? (
          <p className="text-gray-400 text-center">
            Belum ada project yang ditambahkan. Silakan tambahkan data di Firestore.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Portfolio) => (
              <div 
                key={project.id} 
                className="bg-slate-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Link href={`public/portfolio/${project.id}`}>
                {project.image && (
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech: string, index: number) => (
                        <span 
                          key={index} 
                          className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <FaGithub size={24} />
                      </a>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <FaExternalLinkAlt size={20} />
                      </a>
                    )}
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}