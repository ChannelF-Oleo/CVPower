import { render, screen, fireEvent } from '@testing-library/react';
import PackageCard from '../components/PackageCard';
import PackagesSection from '../components/PackagesSection';
import { packages } from '../data/packages';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: any) => <div className={className} onClick={onClick}>{children}</div>,
    h2: ({ children, className, ...props }: any) => <h2 className={className}>{children}</h2>,
    h3: ({ children, className, ...props }: any) => <h3 className={className}>{children}</h3>,
    p: ({ children, className, ...props }: any) => <p className={className}>{children}</p>,
    button: ({ children, className, onClick, ...props }: any) => <button className={className} onClick={onClick}>{children}</button>,
    li: ({ children, className, ...props }: any) => <li className={className}>{children}</li>,
    a: ({ children, className, href, ...props }: any) => <a className={className} href={href}>{children}</a>,
    section: ({ children, className, ...props }: any) => <section className={className}>{children}</section>,
    blockquote: ({ children, className, ...props }: any) => <blockquote className={className}>{children}</blockquote>,
  },
}));

// Mock window.scrollIntoView
Object.defineProperty(window, 'scrollIntoView', {
  value: jest.fn(),
  writable: true
});

describe('PackageCard Component', () => {
  const mockPackage = packages[0]; // Basic package
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders package information correctly', () => {
    render(<PackageCard package={mockPackage} onSelect={mockOnSelect} />);
    
    expect(screen.getByText(mockPackage.title)).toBeInTheDocument();
    expect(screen.getByText(mockPackage.cta)).toBeInTheDocument();
    
    // Check that all features are rendered
    mockPackage.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('displays popular badge when isPopular is true', () => {
    render(<PackageCard package={mockPackage} onSelect={mockOnSelect} isPopular={true} />);
    
    expect(screen.getByText('⭐ MÁS POPULAR')).toBeInTheDocument();
  });

  test('does not display popular badge when isPopular is false', () => {
    render(<PackageCard package={mockPackage} onSelect={mockOnSelect} isPopular={false} />);
    
    expect(screen.queryByText('⭐ MÁS POPULAR')).not.toBeInTheDocument();
  });

  test('calls onSelect with correct package ID when CTA button is clicked', () => {
    render(<PackageCard package={mockPackage} onSelect={mockOnSelect} />);
    
    const ctaButton = screen.getByText(mockPackage.cta);
    fireEvent.click(ctaButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockPackage.id);
  });

  test('highlights hierarchical features correctly', () => {
    const standardPackage = packages.find(pkg => pkg.id === 'standard');
    if (standardPackage) {
      render(<PackageCard package={standardPackage} onSelect={mockOnSelect} />);
      
      // The "Todo lo del Básico" feature should be highlighted
      const hierarchicalFeature = screen.getByText('Todo lo del Básico');
      expect(hierarchicalFeature).toHaveClass('font-semibold', 'text-brand-accent');
    }
  });
});

describe('PackagesSection Component', () => {
  const mockOnPackageSelect = jest.fn();

  beforeEach(() => {
    mockOnPackageSelect.mockClear();
  });

  test('renders section header correctly', () => {
    render(<PackagesSection />);
    
    expect(screen.getByText(/Elige tu/)).toBeInTheDocument();
    expect(screen.getByText(/Paquete Ideal/)).toBeInTheDocument();
    expect(screen.getByText(/Servicios profesionales diseñados/)).toBeInTheDocument();
  });

  test('renders all three packages', () => {
    render(<PackagesSection />);
    
    packages.forEach(pkg => {
      expect(screen.getByText(pkg.title)).toBeInTheDocument();
      expect(screen.getByText(pkg.cta)).toBeInTheDocument();
    });
  });

  test('renders trust indicators', () => {
    render(<PackagesSection />);
    
    expect(screen.getByText('Optimizado para ATS')).toBeInTheDocument();
    expect(screen.getByText('Entrega Garantizada')).toBeInTheDocument();
    expect(screen.getByText('Soporte Personalizado')).toBeInTheDocument();
  });

  test('renders bottom CTA section', () => {
    render(<PackagesSection />);
    
    expect(screen.getByText('¿No estás seguro cuál elegir?')).toBeInTheDocument();
    expect(screen.getByText('Consulta Gratuita')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp directo')).toBeInTheDocument();
  });

  test('renders testimonial section', () => {
    render(<PackagesSection />);
    
    expect(screen.getByText(/Gracias a CV Power conseguí/)).toBeInTheDocument();
    expect(screen.getByText('— María González, Marketing Manager')).toBeInTheDocument();
  });

  test('calls onPackageSelect when package is selected', () => {
    render(<PackagesSection onPackageSelect={mockOnPackageSelect} />);
    
    const basicPackageCTA = screen.getByText(packages[0].cta);
    fireEvent.click(basicPackageCTA);
    
    expect(mockOnPackageSelect).toHaveBeenCalledWith(packages[0].id);
  });

  test('calls onPackageSelect for consultation button', () => {
    render(<PackagesSection onPackageSelect={mockOnPackageSelect} />);
    
    const consultationButton = screen.getByText('Consulta Gratuita');
    fireEvent.click(consultationButton);
    
    expect(mockOnPackageSelect).toHaveBeenCalledWith('consultation');
  });

  test('WhatsApp link has correct href', () => {
    render(<PackagesSection />);
    
    const whatsappLink = screen.getByText('WhatsApp directo').closest('a');
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me'));
    // Note: target attribute might not be preserved in the mock, but href is the important part
  });
});