import { packages } from '../data/packages';

describe('Project Setup', () => {
  test('packages data is properly configured', () => {
    expect(packages).toBeDefined();
    expect(packages).toHaveLength(3);
    
    // Verify package structure
    packages.forEach(pkg => {
      expect(pkg).toHaveProperty('id');
      expect(pkg).toHaveProperty('title');
      expect(pkg).toHaveProperty('price');
      expect(pkg).toHaveProperty('features');
      expect(pkg).toHaveProperty('isPopular');
      expect(pkg).toHaveProperty('cta');
    });
    
    // Verify exactly one package is popular (Paquete Estándar)
    const popularPackages = packages.filter(pkg => pkg.isPopular);
    expect(popularPackages).toHaveLength(1);
    expect(popularPackages[0].id).toBe('standard');
  });

  test('package prices are correctly set', () => {
    const basicPackage = packages.find(pkg => pkg.id === 'basic');
    const standardPackage = packages.find(pkg => pkg.id === 'standard');
    const premiumPackage = packages.find(pkg => pkg.id === 'premium');
    
    expect(basicPackage?.price).toBe(600);
    expect(standardPackage?.price).toBe(900);
    expect(premiumPackage?.price).toBe(2100);
  });
});