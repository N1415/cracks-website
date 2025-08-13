import React from 'react';

const services = [
  {
    id: 1,
    title: 'Concept Development and Launch',
    description: `Our concept development packages—Blueprint, Framework, and Launch—are designed to meet you where you are.<br />Whether you need help validating an idea, developing a full concept, or going all the way for opening, each package offers a tailored set of services to match your needs.<br />From strategy and branding to operational systems and launch execution, we provide the structure, expertise, and support to bring your vision to life.`,
    },
  {
    id: 2,
    title: 'Management Services',
    description: `Our Management package provides continued operational support after your successful opening.<br />We work alongside your team to optimize performance, implement systems, and drive sustainable growth through data-driven strategies and operational excellence`,
  },
  {
    id: 3,
    title: 'Partner Services',
    description: 'Cracks Hospitality Studio works with a network of vetted specialist partners who can provide complementary services not included in our core packages.<br />We can coordinate and oversee these partnerships to ensure seamless integration with our consulting work',
    
  },
  {
    id: 4,
    title: 'Additional Services',
    description: 'To help you get your restaurant up and running.<br />Feasibility study, concept review, menu development, and operational audits.',
  }
];
const phases = [
  {
    number: "01",
    title: "Smart Start — Capital Efficiency from Day Zero",
    description: "With over 50 openings across 3 continents, we help you avoid costly mistakes and make high-impact decisions early. From location choice to layout and budgeting, we protect your investment before the first guest walks in."
  },
  {
    number: "02",
    title: "Revenue Activation — Maximising the Top Line",
    description: "We engineer multiple revenue streams, from brand partnerships to service design. Our strategies are built into your operations, marketing, and menu — ensuring momentum from opening day."
  },
  {
    number: "03",
    title: "Sustained Profitability — Long-Term Performance",
    description: "We stay involved beyond the launch. From systems to leadership tools, we ensure your business is resilient, scalable, and tuned for consistent financial performance."
  }
];


const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-white" role="region" aria-labelledby="services-heading">

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="font-playfair text-3xl md:text-4xl text-black mb-4">SERVICES</h2>
          <div className="w-16 h-px bg-black mx-auto my-6" aria-hidden="true"></div>
          <h3 className="font-playfair text-xl md:text-2xl text-black mb-4">STEP BY STEP</h3>
          {/* Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {phases.map((phase) => (
            <div 
              key={phase.number}
              className="bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="font-playfair text-4xl text-black p-8 mb-6 group-hover:text-gray-700 transition-colors">{phase.number}</div>
              <div className="w-12 h-px bg-black/30 mb-6" aria-hidden="true"></div>
              <h4 className="font-playfair text-xl mb-4">{phase.title}</h4>
              <p className="font-lato font-light text-black">{phase.description}</p>
            </div>
          ))}
        </div>
        
          <h3 className="font-playfair text-xl md:text-2xl text-black mb-4">SCOPE OF SERVICES</h3>
          <div className="w-16 h-px bg-black mx-auto my-6" aria-hidden="true"></div>  
          <p className="font-lato font-light text-lg text-black text-center mb-6">
            Comprehensive restaurant consulting services tailored for high-end establishments, 
            from concept development to operational excellence.
          </p>
            
            
        <div className="grid grid-cols-1 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg hover:border-gray-300 group"
            >
              <h4 className="font-playfair text-xl text-black mb-4 group-hover:text-gray-700 transition-colors">
                {service.title}
              </h4>
              <div 
                className="font-lato font-light text-black leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          ))}
        </div>
            
        {/* Deliverables 
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
        
*/}
</div>
        </div>
    </section>
  );
};

export default ServicesSection;