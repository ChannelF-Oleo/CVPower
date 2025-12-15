'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="sobre-mi" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Columna Imagen */}
          <motion.div 
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.imageFrame}></div>
            <div className={styles.imageContainer}>
              {/* Aquí irá la foto real de Abdia */}
              <img 
                src="/images/abdia-profile.jpg" 
                alt="Abdia Jiménez - CEO CV Power" 
                className={styles.image} 
              />
            </div>
          </motion.div>

          {/* Columna Texto */}
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className={styles.label}>Sobre la Experta</span>
            <h2 className={styles.title}>
              Transformo trayectorias profesionales
            </h2>
            
            <p className={styles.description}>
              Soy <strong>Abdia Jiménez</strong>, especialista en Recursos Humanos y Diseño de Perfil Profesional. 
              Mi misión no es solo entregarte un documento, sino brindarte una herramienta estratégica 
              diseñada para burlar los filtros ATS y captar la atención de los reclutadores en segundos.
            </p>
            
            <p className={styles.description}>
              Con años de experiencia en selección de personal, sé exactamente qué buscan las empresas 
              líderes y cómo traducir tu experiencia en una propuesta de valor irresistible.
            </p>

            <div className={styles.highlightBox}>
              <p className={styles.highlightText}>
                "Tu CV no es un historial del pasado, es tu pasaporte hacia el futuro que mereces."
              </p>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>+500</span>
                <span className={styles.statLabel}>CVs Optimizados</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Tasa de Entrevistas</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}