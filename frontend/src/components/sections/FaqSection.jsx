import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box,
  Stack 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: '¿Qué incluye el desarrollo de una página web?',
    answer: 'Incluye diseño personalizado, desarrollo responsive, optimización de rendimiento, SEO esencial, integración con APIs, despliegue en AWS o Vercel, y asesoría técnica durante el proceso.'
  },
  {
    question: '¿Cuánto tarda un proyecto en completarse?',
    answer: 'El tiempo depende del alcance del proyecto. Una landing page puede tomar 1–2 semanas y un sistema más completo puede tardar entre 4–8 semanas. Siempre se entrega un cronograma claro al iniciar.'
  },
  {
    question: '¿Usan tecnologías modernas y optimizadas?',
    answer: 'Sí. Trabajamos con React, Vite, Material UI, Node.js, AWS, CI/CD y las mejores prácticas de rendimiento y seguridad.'
  },
  {
    question: '¿Ofrecen mantenimiento o soporte después del desarrollo?',
    answer: 'Sí. Podemos ofrecer mantenimiento mensual, actualización de contenido, monitoreo, optimización continua, o soporte por evento según el proyecto.'
  },
  {
    question: '¿Cómo funcionan los pagos?',
    answer: 'Normalmente se divide 50% al inicio y 50% al finalizar. Para proyectos grandes se distribuye en hitos.'
  },
  {
    question: '¿Pueden trabajar con AWS o infraestructura escalable?',
    answer: 'Sí. Somos especialistas en AWS, incluyendo S3, CloudFront, Lambda, API Gateway, SES, Cognito, EC2, RDS y arquitectura serverless o contenedores con Docker.'
  },
  {
    question: '¿Tendré acceso a mis cuentas (AWS, Vercel, dominios, correos)?',
    answer: 'Sí. Todas las cuentas pertenecen al cliente. Nosotros configuramos la infraestructura, entregamos accesos y no retenemos nada.'
  },
  {
    question: '¿Puedo migrar mi sitio actual a una mejor tecnología o a AWS?',
    answer: 'Sí. Podemos tomar tu sitio actual, optimizarlo, rediseñarlo o migrarlo a una infraestructura más moderna, rápida y segura.'
  }
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function FaqSection() {
  return (
    <>
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.4rem' },
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                Preguntas frecuentes
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Resolvemos las dudas más comunes sobre cómo trabajamos en Orbit y nuestros servicios de desarrollo web y AWS.
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            <Stack spacing={2}>
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <Accordion
                    disableGutters
                    sx={{
                        borderRadius: 2,
                        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.06)',
                        backgroundColor: (theme) => theme.palette.background.paper,
                        '&:before': { display: 'none' },
                        '&.Mui-expanded': {
                        boxShadow: '0 4px 18px rgba(15, 23, 42, 0.08)',
                        },
                        transition: 'box-shadow 0.2s ease',
                    }}
                    >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="primary" />}
                        sx={{
                        px: 2.5,
                        py: 1.5,
                        '& .MuiAccordionSummary-content': {
                            my: 0,
                        },
                        }}
                    >
                        <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '0.98rem', md: '1.05rem' }
                        }}
                        >
                        {faq.question}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                        sx={{
                        px: 2.5,
                        pb: 2,
                        pt: 0,
                        }}
                    >
                        <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                        >
                        {faq.answer}
                        </Typography>
                    </AccordionDetails>
                    </Accordion>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* JSON-LD para SEO */}
      <Box
        component="script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
