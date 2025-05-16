import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    telephone: '',
    email: '',
    subject: 'Quotation',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Send data to n8n webhook
      const response = await axios.post(
        'https://n8n-cracks-u43278.vm.elestio.app/webhook/c3d103a5-6075-42e7-9b45-2b2a4e0ccca9',
        formData
      );
      
      if (response.status === 200) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          company: '',
          telephone: '',
          email: '',
          subject: 'Quotation',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Contact Form */}
        <div className="mb-16 max-w-xl mx-auto">
          {submitSuccess ? (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-6 text-center">
              <h3 className="text-xl font-medium text-white mb-2">Thank You!</h3>
              <p className="text-gray-300 text-sm">
                Your application has been received and we will be contacting you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block mb-1 text-xs font-medium">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block mb-1 text-xs font-medium">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors"
                    placeholder="Your company"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telephone" className="block mb-1 text-xs font-medium">Telephone Number</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 text-xs font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-1 text-xs font-medium">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors"
                >
                  <option value="Quotation">Quotation</option>
                  <option value="New Restaurant Concept Creation">New Restaurant Concept Creation</option>
                  <option value="Partnership / Collaboration Opportunity">Partnership / Collaboration</option>
                  <option value="Something Else / General Enquiry">General Enquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-1 text-xs font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              {submitError && (
                <div className="bg-red-900/30 border border-red-700 rounded p-2 text-red-200 text-sm">
                  {submitError}
                </div>
              )}
              
              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-1 bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : (
                    <>
                      <Send size={14} />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
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
            <div className="mb-4 text-white-300">
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
        
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg">
          <h4 className="text-xl mb-4 font-medium">Business Hours</h4>
          <div className="text-gray-300">
            <p className="mb-2">Monday - Friday: 9:00 AM - 8:00 PM</p>
            <p>Saturday: 10:00 AM - 8:00 PM</p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;