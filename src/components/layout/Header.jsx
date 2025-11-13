import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const Header = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(11, 16, 32, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container>
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mr: 4,
            }}
          >
            Orbit
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button color="inherit" onClick={() => scrollToSection('services')}>
              Servicios
            </Button>
            <Button color="inherit" onClick={() => scrollToSection('process')}>
              Proceso
            </Button>
            <Button color="inherit" onClick={() => scrollToSection('projects')}>
              Proyectos
            </Button>
            <Button color="inherit" onClick={() => scrollToSection('stack')}>
              Stack
            </Button>
            <Button color="inherit" onClick={() => scrollToSection('contact')}>
              Contacto
            </Button>
          </Box>

          <Button 
            variant="contained" 
            color="primary"
            onClick={() => scrollToSection('contact')}
            sx={{ ml: 'auto' }}
          >
            Agenda una llamada
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
