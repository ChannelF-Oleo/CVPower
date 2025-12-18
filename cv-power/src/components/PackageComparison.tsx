'use client';

import { motion } from 'framer-motion';
import { packages } from '@/data/packages';
import { formatPrice } from '@/utils/packages';
import styles from './PackageComparison.module.css';

interface PackageComparisonProps {
  onSelectPackage?: (packageId: string) => void;
}

export default function PackageComparison({ onSelectPackage }: PackageComparisonProps) {
  const allFeatures = [
    'Curriculum Profesional ATS',
    'Redacción de Correo de Solicitud',
    'Edición de Foto CV en HD',
    'Creación de QR para certificados',
    'Optimización Perfil LinkedIn (Foto+Banner)',
    'Trucos y Tips para Entrevistas',
    'Estructura de perfil ganadora',
    'Búsqueda activa de vacantes',
    'Garantía de entrevistas (48h - 1 semana)',
    'Asesoría personalizada'
  ];

  const hasFeature = (packageId: string, feature: string): boolean => {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return false;
    
    // Lógica para determinar si el paquete tiene el feature.
    // Mantenemos la lógica de negocio original.
    return pkg.features.some(f => 
      f === feature || 
      (f.includes('Todo lo del') && packageId !== 'basic')
    );
  };

  const handleSelect = (packageId: string) => {
    if (onSelectPackage) {
      onSelectPackage(packageId);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h3 className={styles.title}>
          Comparación de Paquetes
        </h3>
        <p className={styles.subtitle}>
          Encuentra el paquete perfecto para tus necesidades
        </p>
      </div>

      {/* Table Container */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.featureHeader}>
                Características
              </th>
              {packages.map((pkg) => (
                <th key={pkg.id} className={styles.packageHeaderCell}>
                  <div className={`${styles.packageHeaderCard} ${pkg.isPopular ? styles.popularHeaderCard : ''}`}>
                    
                    {/* Contenido Superior */}
                    <div>
                      {pkg.isPopular && (
                        <div className={styles.popularBadge}>
                          ⭐ Más Popular
                        </div>
                      )}
                      <div className={styles.packageTitle}>
                        {pkg.title}
                      </div>
                      <div className={styles.packagePrice}>
                        {formatPrice(pkg.price)}
                      </div>
                    </div>

                    {/* Botón */}
                    <motion.button
                      onClick={() => handleSelect(pkg.id)}
                      className={`${styles.selectButton} ${pkg.isPopular ? styles.btnAccent : styles.btnDark}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pkg.cta || "Seleccionar"}
                    </motion.button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {allFeatures.map((feature, index) => (
              <motion.tr
                key={feature}
                className={styles.tableRow}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <td className={styles.featureName}>
                  {feature}
                </td>
                {packages.map((pkg) => (
                  <td key={pkg.id} className={styles.featureStatus}>
                    {hasFeature(pkg.id, feature) ? (
                      <div className={styles.checkIcon}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className={styles.emptyIcon}></div>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className={styles.footerSection}>
        <div className="text-center">
          <p className={styles.footerText}>
            ¿Necesitas ayuda para decidir? Nuestro equipo te asesora sin costo.
          </p>
          <motion.button
            onClick={() => handleSelect('consultation')}
            className={styles.consultationButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Consulta Gratuita
          </motion.button>
        </div>
      </div>
    </div>
  );
}
