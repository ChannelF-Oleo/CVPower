import { Package } from '@/types';
import { packages } from '@/data/packages';

/**
 * Get package by ID
 */
export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
};

/**
 * Get the popular package (should be exactly one)
 */
export const getPopularPackage = (): Package | undefined => {
  return packages.find(pkg => pkg.isPopular);
};

/**
 * Get all package IDs
 */
export const getPackageIds = (): string[] => {
  return packages.map(pkg => pkg.id);
};

/**
 * Validate package data structure
 */
export const validatePackageData = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check if we have exactly 3 packages
  if (packages.length !== 3) {
    errors.push(`Expected 3 packages, found ${packages.length}`);
  }
  
  // Check if exactly one package is popular
  const popularPackages = packages.filter(pkg => pkg.isPopular);
  if (popularPackages.length !== 1) {
    errors.push(`Expected exactly 1 popular package, found ${popularPackages.length}`);
  }
  
  // Validate each package structure
  packages.forEach((pkg, index) => {
    if (!pkg.id) errors.push(`Package ${index}: missing id`);
    if (!pkg.title) errors.push(`Package ${index}: missing title`);
    if (typeof pkg.price !== 'number' || pkg.price <= 0) {
      errors.push(`Package ${index}: invalid price`);
    }
    if (!Array.isArray(pkg.features) || pkg.features.length === 0) {
      errors.push(`Package ${index}: invalid features array`);
    }
    if (typeof pkg.isPopular !== 'boolean') {
      errors.push(`Package ${index}: isPopular must be boolean`);
    }
    if (!pkg.cta) errors.push(`Package ${index}: missing cta`);
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Check if a package includes services from lower tiers
 */
export const hasHierarchicalFeatures = (pkg: Package): boolean => {
  return pkg.features.some(feature => 
    feature.toLowerCase().includes('todo lo del') || 
    feature.toLowerCase().includes('incluye')
  );
};