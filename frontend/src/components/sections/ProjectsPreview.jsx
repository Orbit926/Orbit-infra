import { Container, Typography, Card, CardContent, Box, Stack, Chip, Grid } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

const projects = [
  {
    name: 'Devaltra Logistics',
    type: 'Landing Page',
    description: 'Plataforma moderna para empresa de logística internacional con sistema de cotización en tiempo real.',
    tech: ['React', 'MUI', 'Vercel', 'API Integration'],
    gradient: 'linear-gradient(135deg, rgba(125,63,185,0.2) 0%, rgba(93,95,233,0.1) 100%)',
  },
  {
    name: 'MOVE Travel Planner',
    type: 'Web App',
    description: 'Aplicación web para planificación de viajes con mapas interactivos, itinerarios y gestión de presupuesto.',
    tech: ['React', 'MUI', 'AWS', 'Maps API'],
    gradient: 'linear-gradient(135deg, rgba(93,95,233,0.2) 0%, rgba(125,63,185,0.1) 100%)',
  },
  {
    name: 'Greenpaw Pets',
    type: 'E-commerce',
    description: 'Tienda online de productos para mascotas con carrito de compras, pasarela de pago y panel admin.',
    tech: ['React', 'MUI', 'Stripe', 'Vercel'],
    gradient: 'linear-gradient(135deg, rgba(125,185,63,0.2) 0%, rgba(93,233,95,0.1) 100%)',
  },
];

const ProjectsPreview = () => {
  return (
    <Box id="projects" sx={{ py: 10, background: (theme) => theme.palette.background.default }}>
      <Container>
        <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center'}}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Proyectos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Algunos de nuestros trabajos recientes
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  background: (theme) => theme.custom.cardGradient,
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-8px)',
                    '& .project-icon': {
                      opacity: 1,
                      transform: 'translate(0, 0)',
                    },
                  },
                }}
              >
                {/* Gradient decoration */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 120,
                    background: project.gradient,
                    zIndex: 0,
                  }}
                />

                {/* Hover icon */}
                <Box
                  className="project-icon"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transform: 'translate(10px, -10px)',
                    transition: 'all 0.3s ease',
                    zIndex: 2,
                  }}
                >
                  <OpenInNew sx={{ fontSize: 20, color: 'primary.light' }} />
                </Box>

                <CardContent sx={{ pt: 10, pb: 3, px: 3, position: 'relative', zIndex: 1 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Chip
                        label={project.type}
                        size="small"
                        sx={{
                          background: 'rgba(125, 63, 185, 0.2)',
                          color: 'primary.light',
                          fontWeight: 600,
                          mb: 2,
                        }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {project.description}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {project.tech.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'divider',
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectsPreview;
