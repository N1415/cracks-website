import { useState } from 'react';

const projects = [
  //{
  //  id: 1,
  //  title: 'CENTO',
  //  category: 'Italian Eatery',
  //  image: 'https://banpdomqwvebesayycpm.supabase.co/storage/v1/object/public/image_metadata/permanent/Cracks%20website/Cento-Header-Home-2400x932-1.jpg',
  //  description: 'Cento, translating to ‘hundred’ in Italian, embraces a ‘one hundred years’ mentality across all aspects of its operations. It symbolises a commitment to enduring excellence, inviting guests to indulge in an unforgettable dining experience rooted in the beauty of uncomplicated simplicity',
  //  url: 'https://centobangkok.com/' // Redirect to CENTO Bangkok website
  //},
  {
    id: 2,
    title: 'FRASERS SUITES',
    category: 'Coming Soon to One Bangkok:',
    image: 'https://banpdomqwvebesayycpm.supabase.co/storage/v1/object/public/image_metadata/permanent/Cracks%20website/one_bangkok.jpg',
    description: `A bold new destination is taking shape in the heart of One Bangkok—900 square meters of seamless hospitality innovation under one roof. This dynamic tri-concept hub is designed to evolve from sun-up to late-night, delivering three distinct yet harmonized guest experiences. Each space is crafted with precision to offer its own atmosphere, pace, and point of view.<br /><br />From early-morning rituals to midnight revelations, this upcoming project demonstrates how thoughtful space planning and immersive storytelling can unlock all-day value for landlords and unforgettable moments for guests.<br /><br />Opening soon. Concepts and details launching shortly—stay tuned.`,
    address: 'One Bangkok, Wireless Road, Lumphini, Patumwan, Bangkok 10330 Thailand',
    url: 'https://www.frasershospitality.com/en/thailand/bangkok/fraser-suites-bangkok/' // Redirect to CENTO Bangkok website
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
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">UPCOMING PROJECTS</h2>
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
                  <p 
                    className={`font-lato font-thin text-sm md:text-base text-white-200 transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
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