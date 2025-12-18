'use client';

import { motion } from 'framer-motion';
import { Package } from '@/types';
import { formatPrice } from '@/utils/packages';
import styles from './PackageCard.module.css';

interface PackageCardProps {
  package: Package;
  onSelect: (packageId: string) => void;
  isPopular?: boolean;
}

export default function PackageCard({ package: pkg, onSelect, isPopular }: PackageCardProps) {
  
  // Función auxiliar para detectar si una característica es inclusiva (ej: "Todo lo del...")
  const isInclusiveFeature = (text: string) => {
    return text.toLowerCase().includes('todo lo del') || text.toLowerCase().includes('todo el paquete');
  };

  return (
    <motion.div
      className={`${styles.card} ${isPopular ? styles.popularCard : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: isPopular ? -5 : -5 }} // Efecto hover sutil
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          className={styles.popularBadgeWrapper}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
        >
          <div className={styles.popularBadge}>
            <span>★</span> MÁS VENDIDO
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{pkg.title}</h3>
        
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            {formatPrice(pkg.price)}
          </span>
          <span className={styles.currency}>RD$</span>
        </div>
        
        <span className={styles.deliveryInfo}>
          Entrega en 24 - 48h
        </span>
      </div>

      {/* Features List */}
      <ul className={styles.featuresList}>
        {pkg.features.map((feature, index) => (
          <motion.li
            key={index}
            className={styles.featureItem}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.checkIcon}>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className={`${styles.featureText} ${isInclusiveFeature(feature) ? styles.highlightFeature : ''}`}>
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        onClick={() => onSelect(pkg.id)}
        className={`${styles.ctaButton} ${isPopular ? styles.btnPopular : styles.btnStandard}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {pkg.cta || "Seleccionar Plan"}
      </motion.button>
    </motion.div>
  );
}