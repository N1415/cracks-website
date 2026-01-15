'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiService, ContactFormData } from '@/lib/api';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useRateLimit } from '@/hooks/useRateLimit';
import { VALIDATION_RULES } from '@/lib/validation';
import { SITE_CONFIG, COUNTRY_CODES } from '@/config/constants';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');
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
      className="pb-6 pt-24 bg-background text-foreground"
      role="region"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl font-bold mb-4 text-foreground font-serif tracking-wide"
            style={{ fontVariant: 'small-caps' }}
          >
            {t('title')}
          </h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto my-6" aria-hidden="true" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-muted/30 rounded-2xl p-8 lg:p-10 border border-border">
          {submitSuccess ? (
            <div
              className="text-center py-8"
              role="alert"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-serif tracking-wide"
                style={{ fontVariant: 'small-caps' }}
              >
                {t('success.title')}
              </h3>
              <div className="w-12 h-0.5 bg-secondary mx-auto mb-6" />
              <p className="text-muted-foreground mb-2">
                {t('success.message')}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {t('success.confirmation')}
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="text-secondary hover:text-secondary/80 text-sm font-medium transition-colors focus:outline-none focus:underline"
              >
                {t('success.sendAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-1 text-xs font-medium">
                    {t('form.firstName')} <span className="text-red-400">*</span>
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
                    placeholder={t('form.firstName')}
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
                    {t('form.lastName')} <span className="text-red-400">*</span>
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
                    placeholder={t('form.lastName')}
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
                    {t('form.telephone')} <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="countryCode"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-card border border-border rounded px-2 py-2 text-foreground text-sm focus:border-foreground focus:outline-none transition-colors w-28"
                      aria-label="Country code"
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
                    {t('form.email')} <span className="text-red-400">*</span>
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
                    placeholder={t('form.email')}
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
                  {t('form.company')} <span className="text-muted-foreground">({t('form.optional')})</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company as string}
                  onChange={handleInputChange}
                  className="w-full bg-card border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground transition-colors"
                  placeholder={t('form.company')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-1 text-xs font-medium">
                  {t('form.subject')} <span className="text-red-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject as string}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-card border border-border rounded px-3 py-2 text-foreground text-sm focus:border-foreground focus:outline-none transition-colors"
                >
                  <option value="Quotation">{t('subjects.quotation')}</option>
                  <option value="New Restaurant Concept Creation">
                    {t('subjects.newConcept')}
                  </option>
                  <option value="Partnership / Collaboration Opportunity">
                    {t('subjects.partnership')}
                  </option>
                  <option value="Something Else / General Enquiry">
                    {t('subjects.general')}
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 text-xs font-medium">
                  {t('form.message')} <span className="text-red-400">*</span>
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

              <div className="mt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-foreground text-background hover:bg-foreground/80 font-bold tracking-wide"
                  disabled={isSubmitting || remainingAttempts === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      {t('form.sendMessage')}
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
