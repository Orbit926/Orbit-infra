import { Container, Typography, Box, Stack, Paper, Grid } from '@mui/material';
import { Search, Draw, Code, Rocket } from '@mui/icons-material';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Descubrimiento',
    description: 'Entendemos tu visión, objetivos y requerimientos técnicos del proyecto.',
  },
  {
    icon: Draw,
    number: '02',
    title: 'Wireframe & diseño',
    description: 'Creamos prototipos y diseños que combinan estética con funcionalidad.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Desarrollo',
    description: 'Implementamos con código limpio, buenas prácticas y arquitectura escalable.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Deploy & handoff',
    description: 'Desplegamos en producción y te entregamos accesos y documentación completa.',
  },
];

const Process = () => {
  return (
    <Box id="process" sx={{ py: 10, background: (theme) => theme.palette.background.paper }}>
      <Container>
        <Stack spacing={2} sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Proceso
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Un flujo de trabajo transparente de principio a fin
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    background: (theme) => theme.custom.cardGradient,
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {/* Number background */}
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      fontSize: '5rem',
                      fontWeight: 800,
                      color: 'rgba(125, 63, 185, 0.1)',
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </Typography>

                  <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(125,63,185,0.3) 0%, rgba(93,95,233,0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 24, color: 'secondary.main' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Process;
