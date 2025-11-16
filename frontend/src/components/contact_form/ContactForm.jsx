import { Button, Grid, MenuItem, Stack, TextField, Link, Typography } from '@mui/material';
import { useState } from 'react';

const projectTypes = [
  'Landing Page',
  'Web App',
  'E-commerce',
  'Otro',
];

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    _hp: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData._hp) return;
    console.log('Form submitted:', formData);

    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {/* Nombre / Email */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              variant="standard"
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
              variant="standard"
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Celular (segunda fila pero dentro del mismo Grid) */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField
              variant="standard"
              fullWidth
              label="Número de celular"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Ej: +52 33 1234 5678"
            />
          </Grid>
        </Grid>

        {/* Tipo de proyecto */}
        <TextField
          variant="standard"
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

        {/* Mensaje */}
        <TextField
          variant="standard"
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

        {/* Aviso de protección reCAPTCHA */}
        <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1 }}
        aria-label="Aviso de protección reCAPTCHA de Google"
        >
        Este sitio está protegido por reCAPTCHA y aplican la{' '}
        <Link
            href="https://policies.google.com/privacy?hl=es"
            target="_blank"
            rel="noopener noreferrer"
        >
            Política de Privacidad
        </Link>{' '}
        y los{' '}
        <Link
            href="https://policies.google.com/terms?hl=es"
            target="_blank"
            rel="noopener noreferrer"
        >
            Términos del Servicio
        </Link>{' '}
        de Google.
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
        >
          Enviar mensaje
        </Button>
      </Stack>
    </form>
  );
};
