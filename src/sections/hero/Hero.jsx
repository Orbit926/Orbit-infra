// src/sections/Hero/Hero.jsx
import React from 'react';
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import Orb from './Orb';

export const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Orb de fondo */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover
          hue={0}
          forceHoverState={false}
        />
      </Box>

      {/* Overlay suave para contraste */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(1200px 600px at 20% 20%, rgba(10,11,20,0.15), rgba(10,11,20,0.75) 60%, rgba(10,11,20,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Contenido */}
      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{ px: { xs: 2, md: 6 } }}
        >
          {/* Texto */}
          <Grid item size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Chip
                label="orbit — agencia de desarrollo web"
                color="secondary"
                variant="outlined"
                sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 44, md: 68 },
                  lineHeight: 1.05,
                  fontWeight: 800,
                }}
              >
                Lanzamos tu presencia digital
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    background:
                      'linear-gradient(90deg, #a78bfa 0%, #5b21b6 40%, #4338ca 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 0 18px rgba(167,139,250,0.25))',
                  }}
                >
                  en órbita
                </Box>
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 680 }}
              >
                Sitios y landings con rendimiento, accesibilidad y diseño sólido
                en <strong>React + MUI</strong>. SEO técnico, animaciones
                sutiles y despliegues en la nube listos para escalar.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ pt: 1, flexWrap: 'wrap' }}>
                <Button variant="contained">Empezar proyecto</Button>
                <Button variant="outlined">Ver portafolio</Button>
              </Stack>

              <Stack direction="row" spacing={3} sx={{ pt: 3, opacity: 0.9 }}>
                <Typography variant="body2">
                  Lighthouse 95+ • SEO listo • Responsive
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Panel derecho */}
          <Grid item size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: 360,
                borderRadius: 4,
                border: '1px solid rgba(167,139,250,0.25)',
                background:
                  'linear-gradient(180deg, rgba(67,56,202,0.15), rgba(10,11,20,0.4))',
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
