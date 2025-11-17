import { Container, Typography, Box, Stack, Paper, Avatar, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const highlights = [
  'Frontend React + MUI',
  'APIs y pequeños backends',
  'Deploy profesional AWS',
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const About = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.palette.background.paper,
        position: 'relative',
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Column - Text Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Sobre mí
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      fontWeight: 500,
                      color: 'primary.light',
                      lineHeight: 1.5,
                    }}
                  >
                    Construyo experiencias digitales rápidas, modernas y enfocadas en performance.
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Con años de experiencia en desarrollo web, me especializo en crear soluciones
                    que no solo se ven bien, sino que funcionan excepcionalmente. Desde landing
                    pages de alto impacto hasta aplicaciones web complejas, cada proyecto es una
                    oportunidad para combinar código limpio con diseño inteligente.
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Mi enfoque está en la experiencia del usuario, la performance y la escalabilidad.
                    Trabajo con tecnologías modernas como React, Material UI y Node.js, siempre
                    buscando las mejores prácticas y arquitecturas que garanticen código mantenible
                    y productos de calidad.
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Más allá del desarrollo, me apasiona el deploy profesional en AWS y la
                    optimización de aplicaciones para que sean rápidas, seguras y confiables.
                    Creo en la transparencia, la comunicación constante y en entregar resultados
                    que superen expectativas.
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right Column - Card with Photo & Highlights */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: 'rgba(8, 10, 24, 0.6)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 32px rgba(125, 63, 185, 0.2)',
                    transform: 'translateY(-4px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(125,63,185,0.15), transparent 60%)',
                    opacity: 0.8,
                    pointerEvents: 'none',
                  },
                }}
              >
                <Stack spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                  {/* Avatar / Photo */}
                  <Box
                    sx={{
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                        opacity: 0.3,
                        zIndex: -1,
                      },
                    }}
                  >
                    <Avatar
                      src="https://i.pravatar.cc/150?img=32"
                      alt="Profile"
                      sx={{
                        width: { xs: 140, md: 160 },
                        height: { xs: 140, md: 160 },
                        border: '3px solid',
                        borderColor: 'primary.main',
                        boxShadow: '0 8px 24px rgba(125, 63, 185, 0.3)',
                      }}
                    />
                  </Box>

                  {/* Highlights Section */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2.5,
                        textAlign: 'center',
                        fontSize: '1.1rem',
                      }}
                    >
                      Highlights
                    </Typography>

                    <Stack
                      spacing={2}
                      component={motion.div}
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      {highlights.map((highlight, index) => (
                        <Box
                          key={index}
                          component={motion.div}
                          variants={itemVariants}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: 2,
                            background: 'rgba(125, 63, 185, 0.08)',
                            border: '1px solid rgba(125, 63, 185, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'rgba(125, 63, 185, 0.15)',
                              borderColor: 'primary.main',
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          <CheckCircle
                            sx={{
                              fontSize: 22,
                              color: 'primary.light',
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.95rem',
                            }}
                          >
                            {highlight}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
