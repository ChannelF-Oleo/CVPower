import { 
  getPackageById, 
  getPopularPackage, 
  getPackageIds, 
  validatePackageData,
  formatPrice,
  hasHierarchicalFeatures
} from '../utils/packages';
import { packages } from '../data/packages';

describe('Package Utilities', () => {
  test('getPackageById returns correct package', () => {
    const basicPackage = getPackageById('basic');
    expect(basicPackage).toBeDefined();
    expect(basicPackage?.title).toBe('Paquete Básico');
    
    const nonExistent = getPackageById('nonexistent');
    expect(nonExistent).toBeUndefined();
  });

  test('getPopularPackage returns the standard package', () => {
    const popularPackage = getPopularPackage();
    expect(popularPackage).toBeDefined();
    expect(popularPackage?.id).toBe('standard');
    expect(popularPackage?.isPopular).toBe(true);
  });

  test('getPackageIds returns all package IDs', () => {
    const ids = getPackageIds();
    expect(ids).toEqual(['basic', 'standard', 'premium']);
  });

  test('validatePackageData validates structure correctly', () => {
    const validation = validatePackageData();
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  test('formatPrice formats currency correctly', () => {
    expect(formatPrice(600)).toMatch(/\$600/);
    expect(formatPrice(900)).toMatch(/\$900/);
    expect(formatPrice(2100)).toMatch(/\$2,100/);
  });

  test('hasHierarchicalFeatures detects package hierarchy', () => {
    const basicPackage = packages.find(p => p.id === 'basic');
    const standardPackage = packages.find(p => p.id === 'standard');
    const premiumPackage = packages.find(p => p.id === 'premium');
    
    expect(hasHierarchicalFeatures(basicPackage!)).toBe(false);
    expect(hasHierarchicalFeatures(standardPackage!)).toBe(true);
    expect(hasHierarchicalFeatures(premiumPackage!)).toBe(true);
  });
});