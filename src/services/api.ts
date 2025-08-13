import { API_CONFIG } from '../config/constants';

export interface ContactFormData {
  fullName: string;
  company: string;
  telephone: string;
  email: string;
  subject: string;
  message: string;
}

export interface QuotationData {
  package: string;
  squareMeters: number;
  country: string;
  city: string;
  currency: string;
  email: string;
  calculatedPrice: {
    thb: number;
    selected: number;
    currency: string;
  };
  discountApplied: number;
  travelSupplement: number;
  timeline: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class SecurityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SecurityError';
  }
}

export class ApiService {
  private static async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout = API_CONFIG.timeout
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private static sanitizeInput(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    return Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      if (typeof value === 'string') {
        // Sanitize string inputs
        acc[key] = value
          .trim()
          .slice(0, 1000) // Limit length
          .replace(/[<>]/g, ''); // Remove potential XSS characters
      } else if (typeof value === 'number') {
        // Validate numbers
        acc[key] = Number.isFinite(value) ? value : 0;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as any);
  }

  private static async retryRequest(
    requestFn: () => Promise<Response>,
    maxRetries = API_CONFIG.retries
  ): Promise<Response> {
    let lastError: Error;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        if (i === maxRetries) break;
        
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, i), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }

  static async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    const sanitizedData = this.sanitizeInput(data);
    
    try {
      const response = await this.retryRequest(() =>
        this.fetchWithTimeout(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contact}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(sanitizedData),
        })
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return { success: true, message: 'Form submitted successfully' };
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw new SecurityError('Failed to submit contact form. Please try again later.');
    }
  }

  static async submitQuotationRequest(data: QuotationData): Promise<ApiResponse> {
    const sanitizedData = this.sanitizeInput(data);
    
    try {
      const response = await this.retryRequest(() =>
        this.fetchWithTimeout(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.quotation}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(sanitizedData),
        })
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return { success: true, message: 'Quotation request submitted successfully' };
    } catch (error) {
      console.error('Quotation request error:', error);
      throw new SecurityError('Failed to submit quotation request. Please try again later.');
    }
  }
}
