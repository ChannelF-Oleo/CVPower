'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

interface HeroProps {
  onCTAClick?: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      const packagesSection = document.getElementById('paquetes');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Variantes de animación para código más limpio
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="inicio" className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.contentWrapper}
        >
          
          {/* Headline Principal */}
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.headline}
          >
            Profesionaliza tu imagen,{' '}
            <span className={styles.highlight}>alcanza tus metas</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={styles.subheadline}
          >
            Aumenta tus entrevistas laborales con un CV optimizado para ATS. 
            Servicios profesionales de redacción de perfil y búsqueda de empleo.
          </motion.p>

          {/* Grid de Beneficios */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={styles.benefitsGrid}
          >
            {['CV Optimizado ATS', 'Perfil LinkedIn Pro', 'Garantía de Resultados'].map((item, index) => (
              <div key={index} className={styles.benefitItem}>
                <div className={styles.iconCircle}>
                  <span>✓</span>
                </div>
                <span className={styles.benefitText}>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Botón CTA */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.button
              onClick={handleCTAClick}
              className={styles.ctaButton}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(204, 164, 59, 0.3)" // Sombra dorada
              }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Paquetes de Servicios
            </motion.button>
          </motion.div>

          {/* Indicadores de Confianza */}
          <motion.div
            className={styles.trustSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className={styles.trustLabel}>
              Confiado por profesionales de:
            </p>
            <div className={styles.trustTags}>
              {['Tecnología', 'Finanzas', 'Marketing', 'Consultoría', 'Ventas'].map((tag) => (
                <span key={tag} className={styles.trustTag}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>


     
    </section>
  );
}