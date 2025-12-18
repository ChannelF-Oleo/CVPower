# CV Power Landing Page - Design Document

## Overview

CV Power is a single-page application (SPA) that serves as a professional service landing page for CV optimization and LinkedIn enhancement services. The system follows a "Silent Luxury" design philosophy with corporate authority and success accents, implemented using React/Next.js with Tailwind CSS for styling and Framer Motion for subtle animations.

The application integrates with Google Sheets as a backend database through Google Apps Script and provides seamless WhatsApp integration for customer communication. The design emphasizes trust, professionalism, and conversion optimization while maintaining excellent user experience across all devices.

## Architecture

### Frontend Architecture
- **Framework**: Next.js (recommended for SEO benefits) or React with Vite
- **Styling**: Tailwind CSS with custom brand configuration
- **Animations**: Framer Motion for scroll-triggered animations
- **State Management**: React hooks for form state and UI interactions
- **Routing**: Single-page application with smooth scrolling navigation

### Backend Integration
- **Data Storage**: Google Sheets as database
- **API Layer**: Google Apps Script deployed as web app
- **Communication**: RESTful JSON API between frontend and Google Apps Script
- **External Integration**: WhatsApp Web/App via URL scheme

### Hosting & Deployment
- **Frontend**: Vercel for optimal Next.js deployment
- **Backend**: Google Cloud (implicit through Google Apps Script)
- **Domain**: Custom domain pointing to Vercel deployment
- **SSL**: Automatic HTTPS through Vercel

## Components and Interfaces

### Core Components

#### 1. Header Component
- Navigation with smooth scroll to sections
- Brand logo and tagline
- Responsive hamburger menu for mobile
- Sticky navigation with background opacity on scroll

#### 2. Hero Section Component
- Main headline: "Profesionaliza tu imagen, alcanza tus metas"
- Compelling subheadline explaining value proposition
- Primary CTA button leading to packages section
- Background with subtle gradient using brand colors

#### 3. Packages Section Component
- Three service package cards in responsive grid
- Package data imported from `src/data/packages.js`
- Popular package highlighted with accent border
- Feature lists with checkmark icons
- Individual CTA buttons for each package

#### 4. Contact Form Component
- Controlled form inputs with validation
- Package selection (pre-filled if coming from package CTA)
- Real-time validation feedback
- Loading states during submission
- Success/error message handling

#### 5. Footer Component
- Business contact information
- Social media links
- Copyright and legal information
- Additional trust signals

### Data Interfaces

#### Package Interface
```typescript
interface Package {
  id: string;
  title: string;
  price: number;
  features: string[];
  isPopular: boolean;
  cta: string;
}
```

#### Form Data Interface
```typescript
interface FormData {
  nombre: string;
  whatsapp: string;
  plan: string;
  notas?: string;
}
```

#### API Response Interface
```typescript
interface APIResponse {
  result: 'success' | 'error';
  row?: number;
  error?: string;
}
```

## Data Models

### Package Data Structure
Centralized in `src/data/packages.js` for easy price and feature updates:

```javascript
export const packages = [
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
  // ... additional packages
];
```

### Google Sheets Schema
Columns in order: Fecha | Estado | Nombre | WhatsApp | Plan | Notas

- **Fecha**: Timestamp of submission (Date)
- **Estado**: Lead status, initially "Recibido" (String)
- **Nombre**: Customer name (String)
- **WhatsApp**: Phone number formatted as text (String)
- **Plan**: Selected package ID (String)
- **Notas**: Optional customer notes (String)

### Form Validation Rules
- **Nombre**: Required, minimum 2 characters, letters and spaces only
- **WhatsApp**: Required, valid phone number format, 10+ digits
- **Plan**: Required, must match existing package ID
- **Notas**: Optional, maximum 500 characters

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:
- Form validation properties combined into comprehensive validation testing
- WhatsApp integration properties merged into single URL generation property  
- Google Sheets integration properties consolidated into data storage property
- Typography and color scheme properties combined for consistency
- Responsive design properties unified into layout adaptation property

### Core Properties

**Property 1: Package Display Completeness**
*For any* packages data array, the rendered page should display exactly three packages with all required fields (title, price, features, CTA) and highlight exactly one as popular
**Validates: Requirements 1.1, 1.2, 1.3, 1.5**

**Property 2: Package Hierarchy Display**
*For any* higher-tier package, the feature list should clearly indicate inclusion of lower-tier services (e.g., "Todo lo del Básico")
**Validates: Requirements 1.4**

**Property 3: Form Validation Completeness**
*For any* invalid form input (empty required fields, invalid phone format), form submission should be prevented and appropriate validation messages should be displayed
**Validates: Requirements 2.2, 7.4**

**Property 4: Form Pre-population**
*For any* selected package, the contact form should pre-populate the plan field with the correct package ID
**Validates: Requirements 2.1**

**Property 5: Google Sheets Data Storage**
*For any* valid form submission, the data should be stored in Google Sheets with timestamp, "Recibido" status, and all user-provided information in the correct column order
**Validates: Requirements 2.4, 3.2, 3.3, 3.4**

**Property 6: API Integration**
*For any* form submission, the system should send properly formatted JSON to the Google Apps Script endpoint and handle both success and error responses appropriately
**Validates: Requirements 2.3, 3.1, 3.5**

**Property 7: WhatsApp Integration**
*For any* successful form submission, the system should generate a WhatsApp URL with pre-filled message containing user name, selected package, payment instructions, and correct business phone number
**Validates: Requirements 2.5, 4.1, 4.2, 4.4, 4.5**

**Property 8: Device-Specific WhatsApp Redirect**
*For any* device type (mobile/desktop), the WhatsApp redirect should use the appropriate URL scheme (app vs web)
**Validates: Requirements 4.3**

**Property 9: Brand Color Consistency**
*For any* page element, the applied colors should match the Executive Gold color scheme (crema suave backgrounds, azul medianoche text, mostaza antiguo accents)
**Validates: Requirements 5.1, 5.4**

**Property 10: Typography Consistency**
*For any* text element, headings should use Playfair Display serif font and body text should use Inter sans-serif font
**Validates: Requirements 5.2, 5.3**

**Property 11: Responsive Layout Adaptation**
*For any* screen size, the layout should adapt appropriately (single-column on mobile, optimized tablet layout, multi-column on desktop)
**Validates: Requirements 7.1, 7.2, 7.3**

**Property 12: SEO Metadata Completeness**
*For any* page load, the HTML head should contain proper meta title, description, and semantic HTML structure
**Validates: Requirements 6.1, 6.3, 6.5**

**Property 13: Accessibility Standards**
*For any* interactive element, it should meet minimum touch target sizes and include proper accessibility attributes
**Validates: Requirements 7.5**
## Error Handling

### Form Validation Errors
- **Empty Required Fields**: Display field-specific error messages below inputs
- **Invalid Phone Format**: Show format example and validation feedback
- **Network Errors**: Display retry option with clear error explanation
- **Submission Timeout**: Provide fallback contact information

### API Integration Errors
- **Google Sheets Unavailable**: Graceful degradation with email fallback
- **Malformed Responses**: Log errors and show user-friendly messages
- **Rate Limiting**: Implement exponential backoff with user notification
- **Authentication Failures**: Automatic retry with admin notification

### WhatsApp Integration Errors
- **Invalid Phone Numbers**: Validate business number configuration
- **URL Generation Failures**: Provide manual WhatsApp contact option
- **Device Detection Issues**: Default to WhatsApp Web with app option

### Performance Errors
- **Slow Loading**: Progressive loading with skeleton screens
- **Image Load Failures**: Fallback to placeholder images
- **Font Loading Issues**: System font fallbacks defined in CSS
- **Animation Performance**: Reduce motion for users with accessibility preferences

## Testing Strategy

### Dual Testing Approach

The CV Power landing page will implement both unit testing and property-based testing to ensure comprehensive coverage and correctness validation.

#### Unit Testing
- **Framework**: Jest with React Testing Library for component testing
- **Coverage Areas**:
  - Component rendering with various props
  - User interaction handling (clicks, form submissions)
  - Error boundary behavior
  - Integration points between components
- **Specific Examples**:
  - Form submission with valid data
  - Package selection and form pre-population
  - Error message display for invalid inputs
  - WhatsApp URL generation with sample data

#### Property-Based Testing
- **Framework**: fast-check for JavaScript property-based testing
- **Configuration**: Minimum 100 iterations per property test
- **Test Tagging**: Each property-based test must include a comment with format: `**Feature: cv-power-landing, Property {number}: {property_text}**`
- **Coverage Areas**:
  - Form validation across all possible invalid inputs
  - Package data rendering with various configurations
  - WhatsApp URL generation with different user data combinations
  - Responsive layout behavior across screen size ranges
  - Color and typography consistency across all components

#### Integration Testing
- **API Testing**: Mock Google Apps Script responses for various scenarios
- **End-to-End**: Cypress tests for complete user journeys
- **Performance Testing**: Lighthouse CI for performance regression detection
- **Accessibility Testing**: axe-core integration for WCAG compliance

#### Testing Requirements
- Each correctness property must be implemented by a single property-based test
- Property-based tests should run a minimum of 100 iterations
- Unit tests and property tests are complementary and both must be included
- All tests must reference their corresponding design document properties

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to eliminate redundancy:
- Form validation properties combined into comprehensive validation testing
- WhatsApp integration properties merged into single URL generation property  
- Google Sheets integration properties consolidated into data storage property
- Typography and color scheme properties combined for consistency
- Responsive design properties unified into layout adaptation property

### Core Properties

**Property 1: Package Display Completeness**
*For any* packages data array, the rendered page should display exactly three packages with all required fields (title, price, features, CTA) and highlight exactly one as popular
**Validates: Requirements 1.1, 1.2, 1.3, 1.5**

**Property 2: Package Hierarchy Display**
*For any* higher-tier package, the feature list should clearly indicate inclusion of lower-tier services (e.g., "Todo lo del Básico")
**Validates: Requirements 1.4**

**Property 3: Form Validation Completeness**
*For any* invalid form input (empty required fields, invalid phone format), form submission should be prevented and appropriate validation messages should be displayed
**Validates: Requirements 2.2, 7.4**

**Property 4: Form Pre-population**
*For any* selected package, the contact form should pre-populate the plan field with the correct package ID
**Validates: Requirements 2.1**

**Property 5: Google Sheets Data Storage**
*For any* valid form submission, the data should be stored in Google Sheets with timestamp, "Recibido" status, and all user-provided information in the correct column order
**Validates: Requirements 2.4, 3.2, 3.3, 3.4**

**Property 6: API Integration**
*For any* form submission, the system should send properly formatted JSON to the Google Apps Script endpoint and handle both success and error responses appropriately
**Validates: Requirements 2.3, 3.1, 3.5**

**Property 7: WhatsApp Integration**
*For any* successful form submission, the system should generate a WhatsApp URL with pre-filled message containing user name, selected package, payment instructions, and correct business phone number
**Validates: Requirements 2.5, 4.1, 4.2, 4.4, 4.5**

**Property 8: Device-Specific WhatsApp Redirect**
*For any* device type (mobile/desktop), the WhatsApp redirect should use the appropriate URL scheme (app vs web)
**Validates: Requirements 4.3**

**Property 9: Brand Color Consistency**
*For any* page element, the applied colors should match the Executive Gold color scheme (crema suave backgrounds, azul medianoche text, mostaza antiguo accents)
**Validates: Requirements 5.1, 5.4**

**Property 10: Typography Consistency**
*For any* text element, headings should use Playfair Display serif font and body text should use Inter sans-serif font
**Validates: Requirements 5.2, 5.3**

**Property 11: Responsive Layout Adaptation**
*For any* screen size, the layout should adapt appropriately (single-column on mobile, optimized tablet layout, multi-column on desktop)
**Validates: Requirements 7.1, 7.2, 7.3**

**Property 12: SEO Metadata Completeness**
*For any* page load, the HTML head should contain proper meta title, description, and semantic HTML structure
**Validates: Requirements 6.1, 6.3, 6.5**

**Property 13: Accessibility Standards**
*For any* interactive element, it should meet minimum touch target sizes and include proper accessibility attributes
**Validates: Requirements 7.5**

### Continuous Integration
- **Pre-commit Hooks**: Run linting, type checking, and fast unit tests
- **Pull Request Checks**: Full test suite including property-based tests
- **Deployment Pipeline**: Automated testing before production deployment
- **Monitoring**: Real-time error tracking and performance monitoring

## Implementation Considerations

### Performance Optimization
- **Code Splitting**: Lazy load non-critical components
- **Image Optimization**: Next.js Image component with WebP support
- **Font Loading**: Preload critical fonts with font-display: swap
- **Bundle Analysis**: Regular bundle size monitoring and optimization

### Security Considerations
- **Input Sanitization**: Validate and sanitize all form inputs
- **CORS Configuration**: Proper CORS setup for Google Apps Script
- **Rate Limiting**: Client-side rate limiting for form submissions
- **Data Privacy**: Minimal data collection with clear privacy policy

### Scalability Considerations
- **Google Sheets Limits**: Monitor row count and implement archiving strategy
- **API Rate Limits**: Implement proper error handling and retry logic
- **CDN Integration**: Use Vercel's edge network for global performance
- **Monitoring**: Set up alerts for high traffic and error rates

### Maintenance Considerations
- **Package Data Updates**: Centralized configuration for easy price changes
- **Content Management**: Structured content for easy updates
- **Analytics Integration**: Google Analytics for conversion tracking
- **A/B Testing**: Framework for testing different layouts and copy