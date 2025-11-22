import { Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { contactConfig } from './config/data';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';

// Carga diferida (lazy)
const About = lazy(() => import('./components/sections/About'));
const Services = lazy(() => import('./components/sections/Services'));
const Process = lazy(() => import('./components/sections/Process'));
const ProjectsPreview = lazy(() => import('./components/sections/ProjectsPreview'));
const TechStack = lazy(() => import('./components/sections/TechStack'));
const ContactCTA = lazy(() => import('./components/sections/ContactCTA'));
const Footer = lazy(() => import('./components/sections/Footer'));
const Pricing = lazy(() => import('./components/sections/Pricing'));
const FloatingWhatsApp = lazy(() => import('./components/layout/FloatingWhatsApp'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const FaqSection = lazy(() => import('./components/sections/FaqSection'));

export const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={contactConfig.recaptcha.siteKey}>
      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Header />
        <Hero />
        {/* Todo lo demás se carga en segundo plano */}
        <Suspense fallback={null}>
          <Box component="section" id="about">
            <About />
            <ProjectsPreview />
          </Box>
          <Box component="section" id="services">
            {/* <Services /> */}
            <Pricing />
            <Testimonials />
            <Process />
            <TechStack />
            <FaqSection />
          </Box>
          <Box component="section" id="contact">
            <ContactCTA />
          </Box>
          <Box component="footer">
            <Footer />
          </Box>
          <FloatingWhatsApp />
        </Suspense>
      </Box>
    </GoogleReCaptchaProvider>
  );
};
