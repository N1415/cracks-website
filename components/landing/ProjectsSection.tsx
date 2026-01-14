'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/config/constants';

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-foreground">PROJECTS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden group cursor-pointer rounded-lg"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.url)}
            >
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-8 transition-opacity duration-300">
                <div
                  className={`transform transition-transform duration-500 ${
                    hoveredProject === project.id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-80'
                  }`}
                >
                  <span className="text-sm font-sans font-light tracking-wider text-gray-300">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl mt-2 mb-3">
                    {project.title}
                  </h3>
                  <p
                    className={`font-sans font-light text-sm md:text-base text-gray-200 transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
