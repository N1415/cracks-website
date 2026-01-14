import { API_CONFIG } from '@/config/constants';

// Contact form data matching the centralized SMTP service API
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  subject: string;
  message: string;
  company?: string;
  source: string;
}

// Quotation request data
export interface QuotationData {
  package: string;
  email: string;
  region: string;
  city: string;
  squareMeters: string;
  timeline: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  detail?: string;
}

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
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

  private static sanitizeInput(data: Record<string, unknown>): Record<string, unknown> {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    return Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      if (typeof value === 'string') {
        acc[key] = value
          .trim()
          .slice(0, 1000)
          .replace(/[<>]/g, '');
      } else if (typeof value === 'number') {
        acc[key] = Number.isFinite(value) ? value : 0;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, unknown>);
  }

  private static async retryRequest(
    requestFn: () => Promise<Response>,
    maxRetries = API_CONFIG.retries
  ): Promise<Response> {
    let lastError: Error = new Error('Request failed');

    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        if (i === maxRetries) break;

        const delay = Math.min(1000 * Math.pow(2, i), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  static async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    const sanitizedData = this.sanitizeInput(data as unknown as Record<string, unknown>);

    try {
      const response = await this.retryRequest(() =>
        this.fetchWithTimeout(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.contact}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedData),
        })
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = typeof errorData.detail === 'string'
          ? errorData.detail
          : `Request failed with status ${response.status}`;
        throw new ApiError(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Contact form submission error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to submit contact form. Please try again later.');
    }
  }

  static async submitQuotationRequest(data: QuotationData): Promise<ApiResponse> {
    const packageNames: Record<string, string> = {
      bronze: 'BLUEPRINT',
      silver: 'FRAMEWORK',
      gold: 'LAUNCH'
    };

    const messageLines = [
      `Package: ${packageNames[data.package] || data.package.toUpperCase()}`,
      `Region: ${data.region}`,
      `City/Country: ${data.city || 'Not specified'}`,
      `Square Meters: ${data.squareMeters || 'Not specified'}`,
      `Estimated Timeline: ${data.timeline}`
    ];

    const contactData: ContactFormData = {
      firstName: 'Quotation',
      lastName: 'Request',
      email: data.email,
      telephone: '',
      subject: 'Quotation',
      message: messageLines.join('\n'),
      source: 'studio'
    };

    return this.submitContactForm(contactData);
  }
}
