import { Box } from '@mui/material';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { contactConfig } from './config/data';
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
    <GoogleReCaptchaProvider reCaptchaKey={contactConfig.recaptcha.siteKey}>
      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Header />
        <Hero />
        <Box component="section" id="about">
          <About />
        </Box>
        <Box component="section" id="projects">
          <ProjectsPreview />
          <Testimonials />
        </Box>
        <Box component="section" id="services">
          <Services />
          <Process />
          <TechStack />
          <Pricing />
        </Box>
        <Box component="section" id="contact">
          <ContactCTA />
        </Box>
        <Box component="footer">
          <Footer />
        </Box>
        <FloatingWhatsApp />
      </Box>
    </GoogleReCaptchaProvider>
  );
}
