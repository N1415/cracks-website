import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'CENTO',
    category: 'Italian Eatery',
    image: 'https://banpdomqwvebesayycpm.supabase.co/storage/v1/object/public/image_metadata/permanent/Cracks%20website/Cento-Header-Home-2400x932-1.jpg',
    description: 'Cento, translating to ‘hundred’ in Italian, embraces a ‘one hundred years’ mentality across all aspects of its operations. It symbolises a commitment to enduring excellence, inviting guests to indulge in an unforgettable dining experience rooted in the beauty of uncomplicated simplicity',
    url: 'https://centobangkok.com/' // Redirect to CENTO Bangkok website
  },
  // Add URLs to other projects as needed
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // Function to handle redirect
  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">OUR PROOF OF CONCEPT</h2>
        </div>
        <div className="flex justify-center">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="relative overflow-hidden group cursor-pointer max-w-4xl w-full"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.url)}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className={`absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-8 transition-opacity duration-300`}>
                <div 
                  className={`transform transition-transform duration-500 ${
                    hoveredProject === project.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'
                  }`}
                >
                  <span className="text-sm font-lato font-thin tracking-wider text-white-300">{project.category}</span>
                  <h3 className="font-playfair text-xl md:text-2xl mt-2 mb-3">{project.title}</h3>
                  <p className={`font-lato font-thin text-sm md:text-base text-white-200 transition-opacity duration-500 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
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
};

export default ProjectsSection;