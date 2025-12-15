'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Optimización: Event listener para scroll
  useEffect(() => {
    const handleScroll = () => {
      // Usamos 20px para que el cambio sea más rápido al iniciar el scroll
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setIsMobileMenuOpen(false);
    
    if (onNavigate) {
      onNavigate(section);
    } else {
      const element = document.getElementById(section);
      if (element) {
        // Offset de 80px para compensar el header fijo
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'paquetes', label: 'Paquetes' },
    { id: 'sobre-mi', label: 'Nosotros' },
  ];

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.container}>
        <div className={styles.navBar}>
          
          {/* Logo Brand */}
          <motion.div 
            className={styles.logoGroup}
            onClick={() => handleNavClick('inicio')}
            whileHover={{ scale: 1.02 }}
          >
            <div className={styles.logoCircle}>
              <span>CV</span>
            </div>
            <div className={styles.logoTextContainer}>
              <h1 className={styles.logoTitle}>CV Power</h1>
              <p className={styles.logoSubtitle}>Expertos en Currículum</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={styles.navLink}
              >
                {item.label}
                <span className={styles.linkUnderline} />
              </button>
            ))}
            
            <motion.button
              onClick={() => handleNavClick('contacto')}
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Comenzar
            </motion.button>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú principal"
            aria-expanded={isMobileMenuOpen}
          >
            {/* Animación de hamburguesa a X */}
            <motion.span 
              className={styles.bar}
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
            />
            <motion.span 
              className={styles.bar}
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            />
            <motion.span 
              className={styles.bar}
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className={styles.mobileMenuWrapper}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.mobileMenuContainer}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={styles.mobileLink}
                  >
                    {item.label}
                  </button>
                ))}
                <div className={styles.mobileCtaContainer}>
                  <button
                    onClick={() => handleNavClick('contacto')}
                    className={styles.mobileCtaButton}
                  >
                    Comenzar Ahora
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
