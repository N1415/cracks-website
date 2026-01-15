import { Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: "Manuel Palacio",
    title: "Serial Founder & Hospitality Visionary",
    bio: "A hospitality innovator who combines operational excellence with brand magic to create successful restaurant concepts across Asia.",
    section: `Manuel is a hospitality innovator who combines operational excellence with brand magic to create some of Asia's most successful restaurant concepts. 
    
    \n\nAs Co-founder of Pirata Group, he built Hong Kong's leading restaurant portfolio, scaling to 27 venues across 13 brands including PICI, The Pizza Project, TMK, TokyoLima, Pirata, and more, while driving a culture-first team model with industry-leading retention rates and multi-million dollar EBITDA growth. 
    
    \n\nToday, he serves as Chairman of Pirata Group, leads Cento — a modern Italian eatery redefining luxury casual dining in Bangkok — and runs Cracks Hospitality Studio, helping visionary operators across Asia develop next-generation F&B concepts that balance authenticity with scalability. 
    
    \n\nHis approach, centered on Soul & Scale, operational excellence, guest obsession, and distinctive brand storytelling, continues to shape the future of hospitality across the region.
    
    `,
    image: "https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/manu.jpg",
    objectPosition: "100% 0%",
    linkedin: "https://www.linkedin.com/in/manuel-palacio/",
    imageHeight: "h-64", // Full height
  },
  {
    name: "Nacho López",
    title: "F&B Strategist & Concept Builder",
    bio: "A seasoned hospitality professional with 15+ years of experience, transforming raw spaces into high-revenue destinations by combining European roots with Asian agility.",
    section: `Nacho is a seasoned hospitality professional with over 15 years of experience transforming raw spaces into high-revenue destinations by blending European roots with Asian agility. 
      
    \n\nHe has built and led high-performing teams across Spain, Hong Kong, and Thailand, scaling operations while maintaining brand integrity and mentoring talent to create sustainable management structures. 
    
    \n\nAs Operations Manager of Pici Hong Kong, he helped elevate one of the region's most celebrated pasta concepts, while earlier directing large-scale beach operations at Cala Bassa Beach Club in Ibiza and founding MamaQuilla in Madrid, a vibrant Latin dinner show experience. \n\nToday, he leads Cracks Hospitality Studio, shaping next-generation restaurant concepts with purpose and performance, while also consulting for hotels and operators to create high-yield venues. 
    
    \n\nHis approach, known as The Nacho Method, focuses on building people-first cultures, engineering concepts for operational success, and designing guest-centric experiences that consistently drive revenue and loyalty.`,
    image: "https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/nacho.jpg",
    objectPosition: "40% 20%",
    linkedin: "https://www.linkedin.com/in/nacho-lopez-diaz-29586450",
    imageHeight: "h-40", // 80% of original height
  }
];

const TeamSection = () => {
  const formatParagraphs = (text: string) => {
    // Split the text by double line breaks (which indicate paragraphs)
    return text.split('\n\n').map((paragraph: string, index: number) => (
      <p key={index} className="font-lato text-sm text-black leading-relaxed mb-4"style={{ fontWeight: '300' }}>
        {paragraph.trim()}
      </p>
    ));
  };
  return (
    <section id="team" className="py-24 bg-white text-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">THE TEAM</h2>
          <div className="w-16 h-0.5 bg-black mx-auto my-8"></div>
          <p className="font-lato text-lg text-black-700 max-w-3xl mx-auto"style={{ fontWeight: '300' }}>
          We are hospitality experts with proven track record of creating and scaling restaurants across multiple regions with over 40 years of experience combined.
          </p>
        </div>
        
        {/* Team Members Grid - With Fixed Width */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} 
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden w-full" 
              style={{ maxWidth: '500px' }}>
              {/* Profile Banner with Name/Title */}
              <div className="relative h-64 p-8 flex items-end">
                <div 
                  className="absolute inset-0 opacity-80 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${member.image})`,
                    backgroundPosition: member.name === "Nacho López" ? "0% 15%" : "center"
                  }}
                ></div>
                <div className="relative z-10 text-white">
                  <h3 className="font-playfair text-3xl mb-1">{member.name}</h3>
                  <p className="font-lato text-sm text-gray-200">{member.title}</p>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-8">
                {/* Summary */}
                <div className="h-24 flex items-center justify-center mb-6">
                  <p className="font-lato text-lg font-light text-center">
                    {member.bio}
                  </p>
                </div>
                
                {/* Detailed Bio - With 600px min height */}
                <div className="bg-white p-6 rounded shadow-sm mb-6" style={{ minHeight: '600px' }}>
                  {formatParagraphs(member.section)}
                </div>
                
                {/* LinkedIn Link */}
                <div className="flex justify-center">
                  <a 
                    href={member.linkedin}
                    className="inline-flex items-center text-gray-600 hover:text-amber-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={18} className="mr-2" />
                    <span className="font-lato text-sm">Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;