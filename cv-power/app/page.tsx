import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PackagesSection from '@/components/PackagesSection';
import Footer from '@/components/Footer';
import About from '@/components/About';
import ContactForm from  '@/components/ContactForm';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        <PackagesSection />

        <About />
        <ContactForm />
        
      </main>
      <Footer />
    </div>
  );
}
