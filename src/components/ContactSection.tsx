import { Mail, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 font-medium">Contact Us</h2>
          <div className="w-16 h-0.5 bg-white mx-auto my-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Ready to elevate your restaurant concept? Get in touch with our team to discuss how 
            we can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg">
            <div className="mb-4 text-gray-300">
              <MapPin size={32} />
            </div>
            <h4 className="font-medium text-lg mb-2">Our Location</h4>
            <p className="text-gray-300">
              Bangkok, 10110<br />
              Thailand
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg">
            <div className="mb-4 text-gray-300">
              <Phone size={32} />
            </div>
            <h4 className="font-medium text-lg mb-2">Call Us</h4>
            <a 
              href="tel:+66800743811" 
              className="text-gray-300 hover:text-white underline transition-colors"
            >
              +66 80 074 3811
            </a>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg">
            <div className="mb-4 text-gray-300">
              <Mail size={32} />
            </div>
            <h4 className="font-medium text-lg mb-2">Email Us</h4>
            <a 
              href="mailto:nacho@cracks-studio.com" 
              className="text-gray-300 hover:text-white underline transition-colors"
            >
              nacho@cracks-studio.com
            </a>
          </div>
        </div>
        
        <div className="mt-16 text-center max-w-2xl mx-auto pt-8 border-t border-gray-800">
          <h4 className="text-xl mb-4 font-medium">Business Hours</h4>
          <div className="text-gray-300">
            <p className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;