import { useState } from 'react';
import { Download } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Concept Development',
    description: 'We craft unique restaurant concepts tailored to your vision and market positioning, considering location, target demographic, and emerging trends.',
    
  },
  {
    id: 2,
    title: 'Menu Engineering',
    description: 'Our team develops innovative menus that balance creativity, profitability, and operational efficiency while maintaining your brand identity.',
    
  },
  {
    id: 3,
    title: 'Operational Strategy',
    description: 'We establish effective systems and workflows to ensure smooth operations, optimize resource allocation, and enhance guest experiences.',
    
  },
  {
    id: 4,
    title: 'Staff Training',
    description: 'Comprehensive training programs for front and back-of-house staff to deliver exceptional service aligned with your restaurant\'s standards.',
    
  },
  {
    id: 5,
    title: 'Business Planning',
    description: 'Detailed financial modeling and business planning to secure investments, forecast performance, and establish a sustainable business model.',
    
  },
  {
    id: 6,
    title: 'Growth Strategy',
    description: 'Strategic plans for existing restaurants to increase revenue, optimize costs, and prepare for potential expansion or franchising.',
    
  }
];

const deliverables = [
  {
    
    title: "Concept Creation",
    items: ["Brand story", "Design direction", "Naming + visuals", "F&B positioning"],
    description: "We craft the creative foundation that defines your venue and makes it stand out."
  },
  {
    
    title: "Financial Planning",
    items: ["3 budget scenarios", "8-year financial model", "ROI & CAPEX guidance"],
    description: "Real numbers, realistic paths — so you can invest smart and plan ahead."
  },
  {
    
    title: "Partner Introductions",
    items: [
      "Designers, kitchen consultants, full contractors suit",
      "People who've delivered top restaurants before",
      "Teams we trust — and you can rely on"
    ],
    description: "We bring the A-team. You get peace of mind."
  },
  {
    
    title: "Operational Handbooks",
    items: [
      "Pre-opening checklists",
      "Training plans & service standards",
      "F&B bibles & daily systems"
    ],
    description: "Everything your team needs to operate at a high standard from day one."
  }
];


const ServicesSection = () => {
  const [, setActiveService] = useState<number | null>(null);
 const handleDownloadPDF = () => {
    // PDF URL
    const pdfUrl = "https://banpdomqwvebesayycpm.supabase.co/storage/v1/object/public/pdf/Cracks%20Pitchs/Restaurant-Development-Services.pdf";
    
    // Open PDF in a new tab
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <section id="services" className="py-24 bg-white">

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl text-black mb-4">OUR SERVICES</h2>
          <div className="w-16 h-px bg-black mx-auto my-6"></div>
          <h3 className="font-playfair text-xl md:text-xl text-black mb-4 text-center mb-16">Comprehensive restaurant consulting services tailored for high-end establishments, 
            from concept development to operational excellence.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              
              <h3 className="font-playfair text-xl text-black mb-4">{service.title}</h3>
              <p className="font-lato font-thin text-black"style={{ fontWeight: '300' }}>{service.description}</p>
            </div>
          ))}
        </div>
      
            <div>
        {/* Deliverables */}
        <div className="mb-20">
          <h2 className="font-playfair mt-10 text-3xl text-center mb-12">Comprehensive deliverables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliverables.map((deliverable, index) => (
              <div 
                key={index} 
                className="bg-white-900/50 border border-black/10 p-8 hover:border-white/30 transition-all duration-300 backdrop-blur-sm group"
              >
                
                <h3 className="font-playfair text-xl mb-4">{deliverable.title}</h3>
                <ul className="font-lato font-thin text-black-300 mb-6 space-y-2">
                  {deliverable.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-black/60">•</span>
                      <span style={{ fontWeight: '300' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-lato font-thin text-black text-sm italic"style={{ fontWeight: '300' }}>{deliverable.description}</p>
              </div>
            ))}
          </div>
        </div>
</div>
        {/* Download Button */}
        <div className="text-center">
          <button 
            className="bg-black border-black text-white font-lato font-light py-4 px-8 flex items-center justify-center mx-auto hover:bg-gray-200 transition-colors group cursor-pointer"
            onClick={handleDownloadPDF}
          >
            <Download size={20} className="mr-2 group-hover:transform group-hover:-translate-y-1 transition-transform" />
            DOWNLOAD FULL DEVELOPMENT SERVICES PITCH
          </button>
        </div>
        </div>
    </section>
  );
};

export default ServicesSection;