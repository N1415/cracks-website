'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ApiService, ContactFormData } from '@/lib/api';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useRateLimit } from '@/hooks/useRateLimit';
import { VALIDATION_RULES } from '@/lib/validation';
import { SITE_CONFIG, COUNTRY_CODES } from '@/config/constants';

export default function ContactSection() {
  const { checkRateLimit, remainingAttempts } = useRateLimit({
    limit: 3,
    windowMs: 300000,
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('+66');

  const {
    data: formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    reset,
  } = useFormValidation({
    initialData: {
      firstName: '',
      lastName: '',
      company: '',
      telephone: '',
      email: '',
      subject: 'Quotation',
      message: '',
    },
    validationRules: {
      firstName: VALIDATION_RULES.name,
      lastName: VALIDATION_RULES.name,
      telephone: VALIDATION_RULES.phone,
      email: VALIDATION_RULES.email,
      message: VALIDATION_RULES.message,
    },
    onSubmit: async (data) => {
      if (!checkRateLimit()) {
        throw new Error('Too many attempts. Please wait before trying again.');
      }

      const submitData = {
        ...data,
        telephone: `${countryCode} ${data.telephone}`,
        source: 'studio',
      } as ContactFormData;

      await ApiService.submitContactForm(submitData);
      setSubmitSuccess(true);
      reset();
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-background text-foreground"
      role="region"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="contact-heading"
            className="font-serif text-3xl md:text-4xl mb-4 font-medium text-foreground"
          >
            Contact Us
          </h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto my-6" aria-hidden="true" />
          <p className="max-w-2xl mx-auto text-muted-foreground font-sans font-light">
            Ready to elevate your restaurant concept? Get in touch with our team
            to discuss how we can help bring your vision to life.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-16 max-w-xl mx-auto">
          {submitSuccess ? (
            <div
              className="bg-green-900/30 border border-green-700 rounded-lg p-6 text-center"
              role="alert"
            >
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-medium text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground text-sm mb-2">
                Your message has been received and we will get back to you
                within 24-48 hours.
              </p>
              <p className="text-muted-foreground text-xs">
                A confirmation email has been sent to your inbox.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 text-green-400 hover:text-green-300 text-sm underline focus:outline-none"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-1 text-xs font-medium">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName as string}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-card border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-colors ${
                      errors.firstName
                        ? 'border-red-500'
                        : 'border-border focus:border-foreground'
                    }`}
                    placeholder="First name"
                  />
                  {errors.firstName && (
                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} />
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block mb-1 text-xs font-medium">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName as string}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-card border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-colors ${
                      errors.lastName
                        ? 'border-red-500'
                        : 'border-border focus:border-foreground'
                    }`}
                    placeholder="Last name"
                  />
                  {errors.lastName && (
                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} />
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telephone" className="block mb-1 text-xs font-medium">
                    Telephone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="countryCode"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-card border border-border rounded px-2 py-2 text-foreground text-sm focus:border-foreground focus:outline-none transition-colors w-28"
                    >
                      {COUNTRY_CODES.map(({ code, flag }) => (
                        <option key={code} value={code}>
                          {flag} {code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone as string}
                      onChange={handleInputChange}
                      required
                      className={`flex-1 bg-card border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-colors ${
                        errors.telephone
                          ? 'border-red-500'
                          : 'border-border focus:border-foreground'
                      }`}
                      placeholder="Phone number"
                    />
                  </div>
                  {errors.telephone && (
                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} />
                      {errors.telephone}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 text-xs font-medium">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email as string}
                    onChange={handleInputChange}
                    required
                    className={`w-full bg-card border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-colors ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-border focus:border-foreground'
                    }`}
                    placeholder="Your email"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                      <AlertCircle size={12} />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block mb-1 text-xs font-medium">
                  Company <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company as string}
                  onChange={handleInputChange}
                  className="w-full bg-card border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground transition-colors"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-1 text-xs font-medium">
                  Subject <span className="text-red-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject as string}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-card border border-border rounded px-3 py-2 text-foreground text-sm focus:border-foreground focus:outline-none transition-colors"
                >
                  <option value="Quotation">Quotation</option>
                  <option value="New Restaurant Concept Creation">
                    New Restaurant Concept Creation
                  </option>
                  <option value="Partnership / Collaboration Opportunity">
                    Partnership / Collaboration
                  </option>
                  <option value="Something Else / General Enquiry">
                    General Enquiry
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 text-xs font-medium">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message as string}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full bg-card border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-colors resize-vertical ${
                    errors.message
                      ? 'border-red-500'
                      : 'border-border focus:border-foreground'
                  }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <AlertCircle size={12} />
                    {errors.message}
                  </div>
                )}
              </div>

              {submitError && (
                <div className="bg-red-900/30 border border-red-700 rounded p-3 text-red-200 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </div>
                </div>
              )}

              {remainingAttempts < 3 && remainingAttempts > 0 && (
                <div className="bg-yellow-900/30 border border-yellow-700 rounded p-3 text-yellow-200 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>
                      You have {remainingAttempts} attempt
                      {remainingAttempts !== 1 ? 's' : ''} remaining.
                    </span>
                  </div>
                </div>
              )}

              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting || remainingAttempts === 0}
                  className={`inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded text-sm font-medium transition-all duration-200 ${
                    isSubmitting || remainingAttempts === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-80 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 hover:bg-muted transition-colors rounded-lg group">
            <div className="mb-4 text-muted-foreground group-hover:text-foreground transition-colors">
              <MapPin size={32} />
            </div>
            <h4 className="font-serif text-lg mb-2 font-medium text-foreground">Our Location</h4>
            <address className="text-muted-foreground not-italic">
              {SITE_CONFIG.contact.location.city},{' '}
              {SITE_CONFIG.contact.location.postalCode}
              <br />
              {SITE_CONFIG.contact.location.country}
            </address>
          </div>

          <div className="flex flex-col items-center text-center p-6 hover:bg-muted transition-colors rounded-lg group">
            <div className="mb-4 text-muted-foreground group-hover:text-foreground transition-colors">
              <Phone size={32} />
            </div>
            <h4 className="font-serif text-lg mb-2 font-medium text-foreground">Call Us</h4>
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
              className="text-muted-foreground hover:text-foreground underline transition-colors"
            >
              {SITE_CONFIG.contact.phone}
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-6 hover:bg-muted transition-colors rounded-lg group">
            <div className="mb-4 text-muted-foreground group-hover:text-foreground transition-colors">
              <Mail size={32} />
            </div>
            <h4 className="font-serif text-lg mb-2 font-medium text-foreground">Email Us</h4>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="text-muted-foreground hover:text-foreground underline transition-colors break-all"
            >
              {SITE_CONFIG.contact.email}
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-6 hover:bg-muted transition-colors rounded-lg group">
            <div className="mb-4 text-muted-foreground group-hover:text-foreground transition-colors">
              <div className="w-8 h-8 bg-muted-foreground group-hover:bg-foreground transition-colors rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-current rounded-full" />
              </div>
            </div>
            <h4 className="font-serif text-lg mb-4 font-medium text-foreground">Business Hours</h4>
            <div className="text-muted-foreground space-y-1">
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 8:00 PM</p>
              <p className="text-sm text-muted-foreground mt-2">(Thailand Time - ICT)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
