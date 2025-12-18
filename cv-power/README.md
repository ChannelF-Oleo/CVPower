# CV Power - Landing Page

Proyecto de landing page profesional para servicios de optimización de CV y LinkedIn.

## 🚀 Tecnologías

- **Next.js 16** - Framework React con SSR/SSG
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios con tema personalizado "Executive Gold"
- **Framer Motion** - Animaciones suaves
- **Jest + React Testing Library** - Testing unitario
- **fast-check** - Property-based testing

## 🎨 Diseño

### Paleta de Colores "Executive Gold"
- **Crema Suave** (`#F9F7F2`) - Fondos generales
- **Azul Medianoche** (`#101929`) - Textos principales
- **Mostaza Antiguo** (`#CCA43B`) - Botones y acentos
- **Gris Cálido** (`#E5E0D8`) - Fondos de tarjetas

### Tipografía
- **Playfair Display** - Títulos (serif, lujo)
- **Inter** - Textos largos (sans-serif, legibilidad)

## 📦 Paquetes de Servicios

1. **Paquete Básico** - $600
2. **Paquete Estándar** - $900 (Popular)
3. **Paquete Premium** - $2,100

## 🛠️ Comandos

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage de tests
npm run test:coverage

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes React
├── data/          # Datos estáticos (paquetes)
├── types/         # Interfaces TypeScript
├── utils/         # Utilidades (validación, API, WhatsApp)
└── __tests__/     # Tests unitarios
```

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Google Apps Script

El backend utiliza Google Sheets + Google Apps Script para almacenar leads.

### Integración WhatsApp

Redirección automática a WhatsApp con mensaje pre-llenado después del envío del formulario.

## 🧪 Testing

- **Tests unitarios** con Jest y React Testing Library
- **Property-based testing** con fast-check
- **Configuración automática** de Next.js para testing

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints** optimizados para móvil, tablet y desktop
- **Touch-friendly** buttons y navegación

## 🚀 Despliegue

Optimizado para despliegue en **Vercel** con configuración automática de dominio y SSL.

---

Desarrollado siguiendo metodología de **Spec-Driven Development** con requisitos formales y propiedades de corrección.