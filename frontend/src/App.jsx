import { Box } from '@mui/material';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import ProjectsPreview from './components/sections/ProjectsPreview';
import TechStack from './components/sections/TechStack';
import ContactCTA from './components/sections/ContactCTA';
import Footer from './components/sections/Footer';
import About from './components/sections/About';
import Pricing from './components/sections/Pricing';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Testimonials from './components/sections/Testimonials';

export const App = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Hero />
      <About />
      <Services />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <TechStack />
      <Pricing />
      <ContactCTA />
      <Footer />
      <FloatingWhatsApp />
    </Box>
  );
}
