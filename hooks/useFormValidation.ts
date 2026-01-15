'use client';

import { useState, useCallback } from 'react';
import { ValidationRules, ValidationErrors, validateForm } from '@/lib/validation';

interface UseFormValidationOptions {
  initialData: Record<string, unknown>;
  validationRules: ValidationRules;
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
}

interface UseFormValidationReturn {
  data: Record<string, unknown>;
  errors: ValidationErrors;
  isSubmitting: boolean;
  submitError: string | null;
  isValid: boolean;
  handleChange: (name: string, value: unknown) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  setError: (field: string, message: string) => void;
  clearErrors: () => void;
}

export const useFormValidation = ({
  initialData,
  validationRules,
  onSubmit
}: UseFormValidationOptions): UseFormValidationReturn => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = useCallback((name: string, value: unknown) => {
    setData(prev => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }
  }, [errors, submitError]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate form
    const validationErrors = validateForm(data, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!onSubmit) return;

    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [data, validationRules, onSubmit]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setIsSubmitting(false);
    setSubmitError(null);
  }, [initialData]);

  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const isValid = Object.keys(validateForm(data, validationRules)).length === 0;

  return {
    data,
    errors,
    isSubmitting,
    submitError,
    isValid,
    handleChange,
    handleSubmit,
    reset,
    setError,
    clearErrors
  };
};
