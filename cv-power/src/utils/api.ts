import { FormData, APIResponse } from '@/types';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export const submitToGoogleSheets = async (formData: FormData): Promise<APIResponse> => {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('Google Script URL not configured');
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        whatsapp: formData.whatsapp,
        plan: formData.plan,
        notas: formData.notas || ''
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: APIResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return {
      result: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const submitFormWithRetry = async (
  formData: FormData, 
  maxRetries: number = 3
): Promise<APIResponse> => {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await submitToGoogleSheets(formData);
      
      if (result.result === 'success') {
        return result;
      }
      
      // If it's an error response, don't retry
      if (result.result === 'error') {
        return result;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  
  return {
    result: 'error',
    error: lastError?.message || 'Failed after multiple attempts'
  };
};