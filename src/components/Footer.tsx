import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <h3 className="font-playfair text-2xl mb-4">CRACKS STUDIO</h3>
            <p className="font-lato font-thin text-white max-w-md">
              Elevating restaurant concepts with end-to-end development and operational consulting services
              tailored for high-end establishments in Bangkok.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-lato font-thin font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 font-lato font-thin text-white">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-lato font-semibold text-lg mb-4"style={{ fontWeight: '300' }}>Services</h4>
              <ul className="space-y-2 font-lato font-thin text-white">
                <li><a href="#" className="hover:text-white transition-colors">Concept Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Menu Engineering</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Operational Strategy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Staff Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Planning</a></li>
              </ul>
            </div>
           
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="font-lato text-white text-sm mb-4 md:mb-0"style={{ fontWeight: '300' }}>
            © {currentYear} Cracks Hospitality Studio. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;