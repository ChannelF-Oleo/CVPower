'use client';

import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'WhatsApp', href: '#contacto', icon: '📱' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Email', href: 'mailto:info@cvpower.com', icon: '✉️' }
  ];

  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Paquetes', href: '#paquetes' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const services = [
    'CV Profesional ATS',
    'Optimización LinkedIn',
    'Búsqueda de Empleo',
    'Asesoría Personalizada'
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Main Grid */}
        <div className={styles.mainGrid}>
          
          {/* Columna 1: Marca e Intro */}
          <motion.div 
            className={styles.brandSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.logoGroup}>
              <div className={styles.logoIcon}>CV</div>
              <div>
                <h3 className={styles.brandName}>CV Power</h3>
                <p className={styles.brandSlogan}>Expertos en Currículum y LinkedIn</p>
              </div>
            </div>
            
            <p className={styles.brandDescription}>
              Profesionaliza tu imagen, alcanza tus metas. Servicios especializados 
              en optimización de CV y perfiles profesionales para maximizar tus 
              oportunidades laborales.
            </p>

            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={styles.socialIcon}
                  title={link.name}
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Columna 2: Enlaces Rápidos */}
          <motion.div 
            className={styles.linksColumn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className={styles.columnTitle}>Enlaces Rápidos</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Servicios */}
          <motion.div 
            className={styles.linksColumn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className={styles.columnTitle}>Servicios</h4>
            <ul className={styles.linkList}>
              {services.map((service) => (
                <li key={service}>
                  <span className={styles.footerLink} style={{ cursor: 'default' }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright y Legal */}
        <motion.div 
          className={styles.bottomBar}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className={styles.copyright}>
            © {currentYear} CV Power. Todos los derechos reservados.
          </p>
          <p className={styles.copyright}>
             © {currentYear} Diseño y Desarrollo por{' '}
               <a 
                 href="https://fireforgerd.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ textDecoration: 'none', color: 'inherit' }} 
                >
                   FireforgeRD
               </a>
         </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Política de Privacidad</a>
            <a href="#" className={styles.legalLink}>Términos de Servicio</a>
          </div>
        </motion.div>

        {/* Trust Signals (Iconos inferiores) */}
        <motion.div 
          className={styles.trustBar}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { icon: '🔒', text: 'Datos Seguros' },
            { icon: '⚡', text: 'Entrega Rápida' },
            { icon: '✨', text: 'Calidad Garantizada' },
            { icon: '🎯', text: 'Resultados Comprobados' }
          ].map((item, index) => (
            <div key={index} className={styles.trustItem}>
              <span className={styles.trustIcon}>{item.icon}</span>
              <span className={styles.trustText}>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}