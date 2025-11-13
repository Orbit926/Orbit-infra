import { Container, Typography, Button, Box, Stack, Grid } from '@mui/material';
import { Code, RocketLaunch, Speed } from '@mui/icons-material';
import Orb from '../Orb/Orb';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: (theme) => theme.palette.background.default,
      }}
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) => theme.custom.heroGradient,
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left column - Text content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  mb: 2,
                }}
              >
                Orbit Web Studio
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                Landing pages y web apps a nivel producción, listas para escalar en AWS o Vercel.
              </Typography>

              <Stack spacing={2} sx={{ pt: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Code color="primary" />
                  <Typography variant="body1">
                    Desarrollo frontend React + MUI
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <RocketLaunch color="secondary" />
                  <Typography variant="body1">
                    Integraciones y pequeños backends
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Speed sx={{ color: '#a46be3' }} />
                  <Typography variant="body1">
                    Deploy profesional y performance
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ pt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => scrollToSection('services')}
                >
                  Ver servicios
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={() => scrollToSection('projects')}
                >
                  Proyectos
                </Button>
              </Stack>
            </Stack>
          </Grid>

          {/* Right column - Orb */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                maxWidth: 600,
                mx: 'auto',
                background: 'radial-gradient(circle, rgba(125,63,185,0.1) 0%, rgba(93,95,233,0.05) 50%, transparent 70%)',
                borderRadius: '50%',
              }}
            >
              <Orb />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
