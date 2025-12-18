import { Package } from '@/types';

export const packages: Package[] = [
  {
    id: 'basic',
    title: "Paquete Básico",
    price: 600,
    features: [
      "Curriculum Profesional ATS",
      "Redacción de Correo de Solicitud",
      "Edición de Foto CV en HD",
      "Creación de QR para certificados"
    ],
    isPopular: false,
    cta: "Iniciar Básico"
  },
  {
    id: 'standard',
    title: "Paquete Estándar",
    price: 900,
    features: [
      "Todo lo del Básico",
      "Optimización Perfil LinkedIn (Foto+Banner)",
      "Trucos y Tips para Entrevistas",
      "Estructura de perfil ganadora"
    ],
    isPopular: true, // Este llevará el borde dorado/mostaza
    cta: "Iniciar Estándar"
  },
  {
    id: 'premium',
    title: "Paquete Premium",
    price: 2100,
    features: [
      "Todo lo del Estándar",
      "Búsqueda activa de vacantes",
      "Garantía de entrevistas (48h - 1 semana)",
      "Asesoría personalizada"
    ],
    isPopular: false,
    cta: "Iniciar Premium"
  }
];