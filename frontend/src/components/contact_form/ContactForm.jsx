import { useState } from 'react';
import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Link,
  Typography,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { z } from 'zod';
import { contactConfig } from '../../config/data';
import { sendContactForm } from '../../utils/sendContactForm';

const projectTypes = ['Landing Page', 'Web App', 'E-commerce', 'Otro'];

const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().min(10, 'Ingresa un número de celular válido'),
  projectType: z.string().min(1, 'Selecciona un tipo de proyecto'),
  message: z.string().min(10, 'Cuéntanos un poco más sobre tu proyecto'),
  _hp: z.string().optional(), // Honeypot
});

export const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const endpointURL = contactConfig.API_URL;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'info' | 'warning'
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
      _hp: '',
    },
  });

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const onSubmit = async (data) => {
    if (data._hp) return; // Bot detectado

    try {
      const result = await sendContactForm({
        formData: data,
        executeRecaptcha,
        endpointURL,
      });

      if (result.ok) {
        setSnackbar({
          open: true,
          message: '¡Gracias por tu mensaje! Te contactaré pronto.',
          severity: 'success',
        });
        reset();
      } else {
        setSnackbar({
          open: true,
          message: 'Error al enviar el formulario. Intenta de nuevo más tarde.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSnackbar({
        open: true,
        message: 'Ocurrió un error inesperado. Intenta de nuevo más tarde.',
        severity: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Línea de carga mientras se envía */}
        {isSubmitting && <LinearProgress />}

        {/* Honeypot oculto */}
        <Controller
          name="_hp"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              sx={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
          )}
        />

        {/* Nombre / Email / Celular */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  label="Nombre"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  label="Número de celular"
                  type="tel"
                  placeholder="Ej: +52 33 1234 5678"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Tipo de proyecto */}
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              select
              fullWidth
              label="Tipo de proyecto"
              error={!!errors.projectType}
              helperText={errors.projectType?.message}
            >
              {projectTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Mensaje */}
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              fullWidth
              label="Mensaje"
              multiline
              rows={4}
              placeholder="Cuéntanos sobre tu proyecto..."
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          )}
        />

        {/* Aviso reCAPTCHA */}
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

        {/* Botón de envío */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </Stack>

      {/* Snackbar de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
