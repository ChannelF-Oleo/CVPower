import { FormData } from '@/types';

// Business WhatsApp number
const BUSINESS_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

export const generateWhatsAppURL = (formData: FormData): string => {
  const message = generateWhatsAppMessage(formData);
  const encodedMessage = encodeURIComponent(message);
  
  // Detect if mobile device
  const isMobile = typeof window !== 'undefined' && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    return `whatsapp://send?phone=${BUSINESS_WHATSAPP}&text=${encodedMessage}`;
  } else {
    return `https://web.whatsapp.com/send?phone=${BUSINESS_WHATSAPP}&text=${encodedMessage}`;
  }
};

export const generateWhatsAppMessage = (formData: FormData): string => {
  const packageName = getPackageName(formData.plan);
  
  return `Hola Abdia, quiero el ${packageName}. Mi nombre es ${formData.nombre}. ${formData.notas ? `Notas adicionales: ${formData.notas}. ` : ''}Aquí adjunto mi comprobante de pago.`;
};

const getPackageName = (planId: string): string => {
  const packageNames: Record<string, string> = {
    'basic': 'Paquete Básico',
    'standard': 'Paquete Estándar', 
    'premium': 'Paquete Premium'
  };
  
  return packageNames[planId] || planId;
};

export const openWhatsApp = (formData: FormData): void => {
  const url = generateWhatsAppURL(formData);
  window.open(url, '_blank');
};