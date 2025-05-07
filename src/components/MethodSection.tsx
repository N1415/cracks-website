import { Users, Heart, Settings, Globe } from 'lucide-react';

const methods = [
  {
    title: "Guest-Centric & Revenue-Minded",
    description: "We believe the best atmosphere is a full, happy dining room. Our work is designed to drive repeat visits — aligning pricing, experience, and team culture to what guests truly value."
  },
  {
    title: "Authentic & Story-Led",
    description: "Every concept we build has a clear identity and cultural soul — brought to life through design, food, and storytelling that feel honest and relevant."
  },
  {
    title: "Operationally Built-In",
    description: "We make every decision with execution in mind. From day one, we ensure your teams can deliver experiences that are profitable, practical, and consistent."
  },
  {
    title: "Global Perspective, Local Understanding",
    description: "Our concepts are globally aware but never out of place. We root each project in local insight — because context isn't just important, it's everything."
  }
];

const MethodSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl text-black mb-4 font-playfair font-medium tracking-wide">OUR METHOD</h2>
          <p className="text-xl font-playfair text-gray-600">Clear, Grounded, Built to Last</p>
          <div className="w-16 h-0.5 bg-black mx-auto my-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {methods.map((method, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="text-gray-600 mb-6 group-hover:text-black transition-colors">
                {method.icon}
              </div>
              
              <h3 className="text-xl font-playfair text-black mb-4 font-medium">
                {method.title}
              </h3>
              
              <div className="w-12 h-0.5 bg-gray-200 mb-6"></div>
              
              <p className="text-black font-lato font-thin leading-relaxed" 
                style={{ fontWeight: '300' }}>
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;