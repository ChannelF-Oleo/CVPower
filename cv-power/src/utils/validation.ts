import { FormData, FormErrors } from '@/types';

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate nombre
  if (!data.nombre.trim()) {
    errors.nombre = 'El nombre es requerido';
  } else if (data.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.nombre.trim())) {
    errors.nombre = 'El nombre solo puede contener letras y espacios';
  }

  // Validate WhatsApp
  if (!data.whatsapp.trim()) {
    errors.whatsapp = 'El número de WhatsApp es requerido';
  } else {
    const cleanPhone = data.whatsapp.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errors.whatsapp = 'El número debe tener al menos 10 dígitos';
    }
  }

  // Validate plan
  if (!data.plan) {
    errors.plan = 'Debe seleccionar un paquete';
  }

  // Validate notas (optional but with length limit)
  if (data.notas && data.notas.length > 500) {
    errors.notas = 'Las notas no pueden exceder 500 caracteres';
  }

  return errors;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as text to preserve leading zeros
  return `'${cleaned}`;
};

export const isValidForm = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
};