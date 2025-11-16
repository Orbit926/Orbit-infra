import { Container, Typography, Button, Box, Stack, TextField, MenuItem, Paper, Grid } from '@mui/material';
import { Email, CalendarMonth } from '@mui/icons-material';
import { useState } from 'react';

const projectTypes = [
  'Landing Page',
  'Web App',
  'E-commerce',
  'Otro',
];

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 10,
        background: (theme) => theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: (theme) => theme.custom.heroGradient,
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            ¿Listo para lanzar tu próximo proyecto?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Cuéntanos sobre tu idea y te ayudaremos a hacerla realidad
          </Typography>
        </Stack>

        <Grid container spacing={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
          {/* CTA Buttons */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Paper
                sx={{
                  p: 3,
                  background: (theme) => theme.custom.cardGradient,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(125,63,185,0.3) 0%, rgba(93,95,233,0.3) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CalendarMonth sx={{ fontSize: 28, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Agenda una llamada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conversemos sobre tu proyecto en una videollamada de 30 minutos
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href="https://calendly.com"
                    target="_blank"
                  >
                    Agendar
                  </Button>
                </Stack>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  background: (theme) => theme.custom.cardGradient,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(93,95,233,0.3) 0%, rgba(125,63,185,0.3) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Email sx={{ fontSize: 28, color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Escríbenos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Envíanos un correo y te responderemos en menos de 24 horas
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    href="mailto:hola@orbitweb.studio"
                  >
                    Enviar correo
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: 4,
                background: (theme) => theme.custom.cardGradient,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Déjanos un mensaje
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                          variant='standard'
                        fullWidth
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        variant='standard'
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    variant='standard'
                    select
                    fullWidth
                    label="Tipo de proyecto"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    {projectTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    variant='standard'
                    fullWidth
                    label="Mensaje"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Enviar mensaje
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 10, pt: 6, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Orbit Web Studio. Creando experiencias web excepcionales.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactCTA;
