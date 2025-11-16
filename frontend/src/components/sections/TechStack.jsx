import { Container, Typography, Box, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vite', category: 'Build Tool' },
  { name: 'Material UI', category: 'UI Framework' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Vercel', category: 'Deploy' },
  { name: 'Netlify', category: 'Deploy' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Stripe', category: 'Payment' },
  { name: 'REST APIs', category: 'Integration' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const TechStack = () => {
  return (
    <Box id="stack" sx={{ py: 10, background: (theme) => theme.palette.background.paper }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              Tech Stack
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Tecnologías modernas y probadas para resultados excepcionales
            </Typography>
          </Stack>
        </motion.div>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          {technologies.map((tech, index) => (
            <Chip
              component={motion.div}
              variants={chipVariants}
              key={index}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {tech.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {tech.category}
                  </Typography>
                </Stack>
              }
              sx={{
                py: 2.5,
                px: 2,
                background: (theme) => theme.custom.cardGradient,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  background: 'linear-gradient(135deg, rgba(125,63,185,0.15) 0%, rgba(93,95,233,0.1) 100%)',
                  transform: 'translateY(-2px)',
                },
              }}
            />
          ))}
        </Box>

        {/* Additional info */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{
            mt: 8,
            p: 4,
            background: (theme) => theme.custom.cardGradient,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            ¿Necesitas otra tecnología?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
            Nos adaptamos a tus necesidades. Si tu proyecto requiere una tecnología específica, 
            trabajamos contigo para integrarla en la solución.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TechStack;
