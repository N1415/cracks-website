import { Download, FileText, PieChart, Users2, BookOpen } from 'lucide-react';

const phases = [
  {
    number: "01",
    title: "Revenue — We Drive Demand",
    subtitle: "We don’t just decorate. We build venues that pull people in",
    description: "Our concepts become the reason guests visit — turning restaurants into destinations, and traffic into profit."
  },
  {
    number: "02",
    title: "Cost — We help you avoid expensive mistakes",
    subtitle: "We’ve made the mistakes, so you don’t have to.",
    description: "Our experience means less guesswork, fewer delays, and a smoother path to sustainable success."
  },
  {
    number: "03",
    title: "Time — We launch faster",
    subtitle: "Less delay. Earlier launch. Quicker revenue flow.",
    description: "The faster you open, the faster you earn. We simplify complexity, align stakeholders, and accelerate openings with precision."
  },
  {
  number: "04",
    title: "Quality — We know what excellence feels like",
    subtitle: "It’s not just about how it looks — it’s how it works.",
    description: "We focus on thoughtful, functional design that enhances both guest experience and operational flow."
    }
];

const AboutSection = () => {
  // Function to handle PDF download
 

  return (
    <section id="about" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Framework Introduction */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">OUR FRAMEWORK, YOUR LONG TERM SUCCESS</h2>
          <div className="w-16 h-px bg-white mx-auto my-8"></div>
        </div>
        
       {/* Phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {phases.map((phase) => (
            <div 
              key={phase.number} 
              className="bg-gray-900/50 border border-white/10 p-8 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              
              <h3 className="font-playfair text-xl mb-4">{phase.title}</h3>
              <h4 className="font-playfair text-s mb-4">{phase.subtitle}</h4>
              <p className="font-lato font-thin text-gray-300">{phase.description}</p>
        </div>    
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;