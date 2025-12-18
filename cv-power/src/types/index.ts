// Package interface for service packages
export interface Package {
  id: string;
  title: string;
  price: number;
  features: string[];
  isPopular: boolean;
  cta: string;
}

// Form data interface for contact form
export interface FormData {
  nombre: string;
  whatsapp: string;
  plan: string;
  notas?: string;
}

// API response interface for Google Apps Script
export interface APIResponse {
  result: 'success' | 'error';
  row?: number;
  error?: string;
}

// Form validation errors
export interface FormErrors {
  nombre?: string;
  whatsapp?: string;
  plan?: string;
  notas?: string;
}