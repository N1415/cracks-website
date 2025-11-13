import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import React from 'react';
import { ApiService, ContactFormData } from '../services/api';
import { useFormValidation } from '../hooks/useFormValidation';
import { useRateLimit } from '../hooks/useRateLimit';
import { VALIDATION_RULES } from '../utils/validation';
import { SITE_CONFIG } from '../config/constants';
import LoadingSpinner from './common/LoadingSpinner';

const ContactSection = () => {
  const { checkRateLimit, remainingAttempts } = useRateLimit({ limit: 3, windowMs: 300000 }); // 5 minutes
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const {
    data: formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    reset
  } = useFormValidation({
    initialData: {
      fullName: '',
      company: '',
      telephone: '',
      email: '',
      subject: 'Quotation',
      message: ''
    },
    validationRules: {
      fullName: VALIDATION_RULES.name,
      company: VALIDATION_RULES.company,
      telephone: VALIDATION_RULES.phone,
      email: VALIDATION_RULES.email,
      message: VALIDATION_RULES.message
    },
    onSubmit: async (data) => {
      if (!checkRateLimit()) {
        throw new Error('Too many attempts. Please wait before trying again.');
      }
      
      await ApiService.submitContactForm(data as ContactFormData);
      setSubmitSuccess(true);
      reset();
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };



  return (
    <section id="contact" className="py-24 bg-black text-white" role="region" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="font-playfair text-3xl md:text-4xl mb-4 font-medium">Contact Us</h2>
          <div className="w-16 h-0.5 bg-white mx-auto my-6" aria-hidden="true"></div>
          <p className="max-w-2xl mx-auto text-gray-300 font-lato font-light">
            Ready to elevate your restaurant concept? Get in touch with our team to discuss how 
            we can help bring your vision to life.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-16 max-w-xl mx-auto">
          {submitSuccess ? (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-6 text-center" role="alert">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" aria-hidden="true" />
              <h3 className="text-xl font-medium text-white mb-2">Thank You!</h3>
              <p className="text-gray-300 text-sm mb-2">
                Your message has been received and we will get back to you within 24-48 hours.
              </p>
              <p className="text-gray-400 text-xs">
                A confirmation email has been sent to your inbox.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 text-green-400 hover:text-green-300 text-sm underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block mb-1 text-xs font-medium">
                    Full Name <span className="text-red-400" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    aria-invalid={!!errors.fullName}
                    className={`w-full bg-black border rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-gray-700 focus:border-white'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.fullName && (
                    <div id="fullName-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.fullName}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="company" className="block mb-1 text-xs font-medium">
                    Company <span className="text-red-400" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.company ? "company-error" : undefined}
                    aria-invalid={!!errors.company}
                    className={`w-full bg-black border rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors ${
                      errors.company ? 'border-red-500' : 'border-gray-700 focus:border-white'
                    }`}
                    placeholder="Your company"
                  />
                  {errors.company && (
                    <div id="company-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.company}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telephone" className="block mb-1 text-xs font-medium">
                    Telephone Number <span className="text-red-400" aria-label="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.telephone ? "telephone-error" : undefined}
                    aria-invalid={!!errors.telephone}
                    className={`w-full bg-black border rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors ${
                      errors.telephone ? 'border-red-500' : 'border-gray-700 focus:border-white'
                    }`}
                    placeholder="Your phone number"
                  />
                  {errors.telephone && (
                    <div id="telephone-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.telephone}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 text-xs font-medium">
                    Email <span className="text-red-400" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    className={`w-full bg-black border rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-700 focus:border-white'
                    }`}
                    placeholder="Your email"
                  />
                  {errors.email && (
                    <div id="email-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-1 text-xs font-medium">
                  Subject <span className="text-red-400" aria-label="required">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors"
                >
                  <option value="Quotation">Quotation</option>
                  <option value="New Restaurant Concept Creation">New Restaurant Concept Creation</option>
                  <option value="Partnership / Collaboration Opportunity">Partnership / Collaboration</option>
                  <option value="Something Else / General Enquiry">General Enquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-1 text-xs font-medium">
                  Message <span className="text-red-400" aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                  rows={3}
                  className={`w-full bg-black border rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors resize-vertical ${
                    errors.message ? 'border-red-500' : 'border-gray-700 focus:border-white'
                  }`}
                  placeholder="Your message (minimum 10 characters)"
                ></textarea>
                {errors.message && (
                  <div id="message-error" role="alert" className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.message}
                  </div>
                )}
              </div>
              
              {submitError && (
                <div className="bg-red-900/30 border border-red-700 rounded p-3 text-red-200 text-sm" role="alert">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} aria-hidden="true" />
                    <span>{submitError}</span>
                  </div>
                </div>
              )}
              
              {remainingAttempts < 3 && remainingAttempts > 0 && (
                <div className="bg-yellow-900/30 border border-yellow-700 rounded p-3 text-yellow-200 text-sm" role="status">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} aria-hidden="true" />
                    <span>You have {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining.</span>
                  </div>
                </div>
              )}
              
              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting || remainingAttempts === 0}
                  className={`inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                    isSubmitting || remainingAttempts === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-200 hover:scale-105'
                  }`}
                  aria-label={isSubmitting ? 'Submitting form' : 'Submit contact form'}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto" role="list" aria-label="Contact information">
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg group" role="listitem">
            <div className="mb-4 text-gray-300 group-hover:text-white transition-colors">
              <MapPin size={32} aria-hidden="true" />
            </div>
            <h4 className="font-playfair text-lg mb-2 font-medium">Our Location</h4>
            <address className="text-gray-300 not-italic">
              {SITE_CONFIG.contact.location.city}, {SITE_CONFIG.contact.location.postalCode}<br />
              {SITE_CONFIG.contact.location.country}
            </address>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg group" role="listitem">
            <div className="mb-4 text-gray-300 group-hover:text-white transition-colors">
              <Phone size={32} aria-hidden="true" />
            </div>
            <h4 className="font-playfair text-lg mb-2 font-medium">Call Us</h4>
            <a 
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
              className="text-gray-300 hover:text-white underline transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label={`Call us at ${SITE_CONFIG.contact.phone}`}
            >
              {SITE_CONFIG.contact.phone}
            </a>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg group" role="listitem">
            <div className="mb-4 text-gray-300 group-hover:text-white transition-colors">
              <Mail size={32} aria-hidden="true" />
            </div>
            <h4 className="font-playfair text-lg mb-2 font-medium">Email Us</h4>
            <a 
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="text-gray-300 hover:text-white underline transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded break-all"
              aria-label={`Send email to ${SITE_CONFIG.contact.email}`}
            >
              {SITE_CONFIG.contact.email}
            </a>
          </div>
        
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-900 transition-colors rounded-lg group" role="listitem">
            <div className="mb-4 text-gray-300 group-hover:text-white transition-colors">
              <div className="w-8 h-8 bg-gray-300 group-hover:bg-white transition-colors rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-current rounded-full" aria-hidden="true" />
              </div>
            </div>
            <h4 className="font-playfair text-lg mb-4 font-medium">Business Hours</h4>
            <div className="text-gray-300 space-y-1">
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 8:00 PM</p>
              <p className="text-sm text-gray-400 mt-2">(Thailand Time - ICT)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;