"use client";

import { motion } from "framer-motion";
import { packages } from "@/data/packages";
import PackageCard from "./PackageCard";
import styles from "./PackagesSection.module.css";

interface PackagesSectionProps {
  onPackageSelect?: (packageId: string) => void;
}

export default function PackagesSection({
  onPackageSelect,
}: PackagesSectionProps) {
  const handlePackageSelect = (packageId: string) => {
    if (onPackageSelect) {
      onPackageSelect(packageId);
    } else {
      // Default behavior: scroll to contact section
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Variantes de animación reutilizables
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="paquetes" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={styles.title}
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elige tu <span className={styles.highlight}>Paquete Ideal</span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Servicios profesionales diseñados para maximizar tus oportunidades
            laborales. Desde CV básico hasta búsqueda activa de empleo con
            garantía de resultados.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            className={styles.trustIndicators}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              "Optimizado para ATS",
              "Entrega Garantizada",
              "Soporte Personalizado",
            ].map((text, i) => (
              <div key={i} className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span>
                <span className={styles.trustText}>{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Packages Grid */}
        <div className={styles.gridContainer}>
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{ display: "flex" }} // Asegura que las tarjetas tengan la misma altura
            >
              <PackageCard
                package={pkg}
                onSelect={handlePackageSelect}
                isPopular={pkg.isPopular}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className={styles.bottomCta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h3 className={styles.ctaTitle} variants={fadeInUp}>
            ¿No estás seguro cuál elegir?
          </motion.h3>
          <motion.p className={styles.ctaText} variants={fadeInUp}>
            Nuestro equipo de expertos te ayudará a seleccionar el paquete
            perfecto para tus objetivos profesionales y presupuesto.
          </motion.p>

          <div className={styles.actionButtons}>
            <motion.button
              onClick={() => handlePackageSelect("consultation")}
              className={styles.primaryButton}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consulta Gratuita
            </motion.button>

            <motion.a
              href="https://wa.me/18496281404?text=Hola, me gustaría información sobre los paquetes de CV Power"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
            >
              <span style={{ fontSize: "1.25rem" }}>📱</span>
              <span>WhatsApp directo</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Testimonial Preview */}
        <motion.div
          className={styles.testimonialCard}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
          <blockquote className={styles.quote}>
            "Gracias a CV Power conseguí 3 entrevistas en la primera semana. El
            CV optimizado realmente marca la diferencia."
          </blockquote>
          <cite className={styles.author}>
            — María González, Marketing Manager
          </cite>
        </motion.div>
      </div>
    </section>
  );
}
