// Hero.jsx
import { Container, Typography, Button, Box, Stack, Grid } from '@mui/material';
import { Code, RocketLaunch, Speed } from '@mui/icons-material';
import Orb from '../Orb/Orb';
import { useTheme } from '@mui/material/styles';

const Hero = () => {
  const theme = useTheme();
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
        justifyContent: 'center',  // <-- centra todo horizontal
        overflow: 'hidden',
        textAlign: 'center',       // <-- centra texto
        background: theme.palette.background.default,
        px: 2,
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

      {/* Orb como fondo centrado */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: {md: 900},
            aspectRatio: '1',
            opacity: 0.85,
            filter: 'drop-shadow(0 0 40px rgba(164,107,227,0.6))',
          }}
        >
          <Orb hue={15} hoverIntensity={0.25} rotateOnHover={true} />
        </Box>
      </Box>

      {/* CONTENIDO CENTRADO */}
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container justifyContent="center">
          <Grid size={{ xs: 12, md: 10, lg: 8 }}>
            <Stack spacing={1.5} alignItems="center">
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.4rem' },
                  fontWeight: 200,
                  letterSpacing: '-0.03em',
                  maxWidth: 900,
                }}
              >
                Orbit Web Studio
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.0rem', md: '2.8rem', lg: '3.2rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  maxWidth: 900,
                }}
              >
                Ponemos tu marca <br /> en orbita
              </Typography>

              {/* Bullets */}
              <Stack spacing={2} sx={{ pt: 2, display: { xs: 'none', sm: 'flex' } }} alignItems="center">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Code color="primary" />
                  <Typography variant="body1">Desarrollo frontend React + MUI</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <RocketLaunch color="secondary" />
                  <Typography variant="body1">Integraciones y pequeños backends</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Speed sx={{ color: '#a46be3' }} />
                  <Typography variant="body1">Deploy profesional y performance</Typography>
                </Stack>
              </Stack>

              {/* Botones centrados */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ pt: 4, flexWrap: 'wrap' }}
                justifyContent="center"
              >
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
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
