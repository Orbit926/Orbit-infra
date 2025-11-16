import { Container, Typography, Card, CardContent, Box, Stack, Grid } from '@mui/material';
import { Code, Web, ShoppingCart, Speed } from '@mui/icons-material';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Code,
    title: 'Landing pages de alto impacto',
    description: 'Diseños modernos y optimizados para conversión, con animaciones fluidas y experiencia de usuario excepcional.',
  },
  {
    icon: Web,
    title: 'Web apps a medida',
    description: 'Aplicaciones web personalizadas con React, integración de APIs y arquitectura escalable.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce compacto',
    description: 'Tiendas online completas con pasarelas de pago, gestión de inventario y panel de administración.',
  },
  {
    icon: Speed,
    title: 'Deploy & performance',
    description: 'Despliegue profesional en AWS, Vercel o Netlify con optimización de rendimiento y monitoreo.',
  },
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
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Services = () => {
  return (
    <Box id="services" sx={{ py: 10, background: (theme) => theme.palette.background.default }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Servicios
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
              Soluciones web completas desde el diseño hasta el deploy
            </Typography>
          </Stack>
        </motion.div>

        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }} component={motion.div} variants={itemVariants}>
                <Card
                  sx={{
                    height: '100%',
                    background: (theme) => theme.custom.cardGradient,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 24px rgba(125, 63, 185, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, rgba(125,63,185,0.2) 0%, rgba(93,95,233,0.2) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: 'primary.main' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
