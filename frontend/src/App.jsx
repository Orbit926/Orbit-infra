import { Box } from '@mui/material';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import ProjectsPreview from './components/sections/ProjectsPreview';
import TechStack from './components/sections/TechStack';
import ContactCTA from './components/sections/ContactCTA';
import Footer from './components/sections/Footer';

export const App = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Hero />
      <Services />
      <Process />
      <ProjectsPreview />
      <TechStack />
      <ContactCTA />
      <Footer />
    </Box>
  );
}
