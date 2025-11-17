import { Container, Typography, Card, CardContent, Box, Stack, Chip, Grid } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'Devaltra Logistics',
    type: 'Landing Page',
    description: 'Plataforma moderna para empresa de logística internacional con sistema de cotización en tiempo real.',
    tech: ['React', 'MUI', 'Vercel', 'API Integration'],
    gradient: 'linear-gradient(135deg, rgba(125,63,185,0.2) 0%, rgba(93,95,233,0.1) 100%)',
    image: '/img/projects/devaltra-preview-gray.webp',
    link: 'https://www.devaltra.com',
  },
  {
    name: 'Invitación de Boda',
    type: 'Invitación Digital',
    description: 'Invitación de boda digital personalizada con diseño elegante, animaciones suaves y experiencia totalmente responsiva desarrollada para el enlace de mi tía.',
    tech: ['React', 'MUI', 'AWS', 'API Integration', 'GoogleApp Script'],
    gradient: 'linear-gradient(135deg, rgba(200,200,200,0.25) 0%, rgba(180,180,180,0.15) 100%)',
    image: '/img/projects/invitacion-boda-preview.webp',
    link: 'https://invitacion-boda-murex.vercel.app',
  },
  {
    name: 'Greenpaw',
    type: 'E-commerce',
    description: 'Tienda online de productos para mascotas con carrito de compras, pasarela de pago y panel admin.',
    tech: ['React', 'MUI', 'Shopify',],
    gradient: 'linear-gradient(135deg, rgba(125,185,63,0.2) 0%, rgba(93,233,95,0.1) 100%)',
    image: '/img/projects/greenpaw-preview.webp',
    link: 'https://www.greenpaw.mx',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const ProjectsPreview = () => {
  return (
    <Box sx={{ py: 10, background: (theme) => theme.palette.background.default }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center'}}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Proyectos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Algunos de nuestros trabajos recientes
            </Typography>
          </Stack>
        </motion.div>

        <Grid
          container
          spacing={4}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
        {projects.map((project, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 4 }}
            component={motion.div}
            variants={itemVariants}
          >
            <Card
              sx={{
                height: '100%',
                background: (theme) => theme.custom.cardGradient,
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
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
              {/* Hacer TODA la tarjeta clickeable */}
              <Box
                component="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ir al proyecto ${project.name}`}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 3,
                  textDecoration: 'none',
                }}
              />

              {/* Imagen de fondo */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  height: 120,
                  overflow: 'hidden',
                  zIndex: 0,
                }}
              >
                <Box
                  component="img"
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.05)',
                  }}
                />
              </Box>

              {/* Icono hover — necesita stopPropagation */}
              <Box
                component="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Abrir proyecto ${project.name}`}
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
                  zIndex: 4, // encima del overlay
                  cursor: 'pointer',
                  textDecoration: 'none',
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
