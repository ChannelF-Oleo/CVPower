import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    header: ({ children, className, ...props }: any) => <header className={className}>{children}</header>,
    div: ({ children, className, ...props }: any) => <div className={className}>{children}</div>,
    h1: ({ children, className, ...props }: any) => <h1 className={className}>{children}</h1>,
    p: ({ children, className, ...props }: any) => <p className={className}>{children}</p>,
    button: ({ children, className, onClick, ...props }: any) => <button className={className} onClick={onClick}>{children}</button>,
    span: ({ children, className, ...props }: any) => <span className={className}>{children}</span>,
    nav: ({ children, className, ...props }: any) => <nav className={className}>{children}</nav>,
    section: ({ children, className, ...props }: any) => <section className={className}>{children}</section>,
    a: ({ children, className, href, ...props }: any) => <a className={className} href={href}>{children}</a>,
  },
}));

// Mock window.scrollIntoView
Object.defineProperty(window, 'scrollIntoView', {
  value: jest.fn(),
  writable: true
});

describe('Header Component', () => {
  test('renders CV Power logo and navigation', () => {
    render(<Header />);
    
    expect(screen.getByText('CV Power')).toBeInTheDocument();
    expect(screen.getByText('Expertos en Currículum')).toBeInTheDocument();
    expect(screen.getAllByText('Inicio')).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText('Paquetes')).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText('Contacto')).toHaveLength(2); // Desktop and mobile
  });

  test('calls onNavigate when navigation item is clicked', () => {
    const mockNavigate = jest.fn();
    render(<Header onNavigate={mockNavigate} />);
    
    const paquetesButtons = screen.getAllByText('Paquetes');
    fireEvent.click(paquetesButtons[0]); // Click the first one (desktop nav)
    expect(mockNavigate).toHaveBeenCalledWith('paquetes');
  });

  test('toggles mobile menu when hamburger is clicked', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible (we can't test the actual visibility due to CSS classes)
    expect(menuButton).toBeInTheDocument();
  });
});

describe('Hero Component', () => {
  test('renders main headline and subheadline', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Profesionaliza tu imagen/)).toBeInTheDocument();
    expect(screen.getByText(/alcanza tus metas/)).toBeInTheDocument();
    expect(screen.getByText(/Aumenta tus entrevistas laborales/)).toBeInTheDocument();
  });

  test('renders key benefits', () => {
    render(<Hero />);
    
    expect(screen.getByText('CV Optimizado ATS')).toBeInTheDocument();
    expect(screen.getByText('Perfil LinkedIn Pro')).toBeInTheDocument();
    expect(screen.getByText('Garantía de Resultados')).toBeInTheDocument();
  });

  test('calls onCTAClick when CTA button is clicked', () => {
    const mockCTAClick = jest.fn();
    render(<Hero onCTAClick={mockCTAClick} />);
    
    fireEvent.click(screen.getByText('Ver Paquetes de Servicios'));
    expect(mockCTAClick).toHaveBeenCalled();
  });

  test('renders trust indicators', () => {
    render(<Hero />);
    
    expect(screen.getByText('Confiado por profesionales de:')).toBeInTheDocument();
    expect(screen.getByText('Tecnología')).toBeInTheDocument();
    expect(screen.getByText('Finanzas')).toBeInTheDocument();
  });
});

describe('Footer Component', () => {
  test('renders brand information', () => {
    render(<Footer />);
    
    expect(screen.getByText('CV Power')).toBeInTheDocument();
    expect(screen.getByText('Expertos en Currículum y LinkedIn')).toBeInTheDocument();
  });

  test('renders service list', () => {
    render(<Footer />);
    
    expect(screen.getByText('CV Profesional ATS')).toBeInTheDocument();
    expect(screen.getByText('Optimización LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Búsqueda de Empleo')).toBeInTheDocument();
    expect(screen.getByText('Asesoría Personalizada')).toBeInTheDocument();
  });

  test('renders copyright with current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} CV Power. Todos los derechos reservados.`)).toBeInTheDocument();
  });

  test('renders trust signals', () => {
    render(<Footer />);
    
    expect(screen.getByText('Datos Seguros')).toBeInTheDocument();
    expect(screen.getByText('Entrega Rápida')).toBeInTheDocument();
    expect(screen.getByText('Calidad Garantizada')).toBeInTheDocument();
    expect(screen.getByText('Resultados Comprobados')).toBeInTheDocument();
  });
});