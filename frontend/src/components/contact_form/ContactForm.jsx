import { Button, Grid, MenuItem, Stack, TextField, Link, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const projectTypes = [
  'Landing Page',
  'Web App',
  'E-commerce',
  'Otro',
];

// Esquema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().min(10, 'Ingresa un número de celular válido'),
  projectType: z.string().min(1, 'Selecciona un tipo de proyecto'),
  message: z.string().min(10, 'Cuéntanos un poco más sobre tu proyecto'),
  _hp: z.string().optional(), // Honeypot para anti-bots
});

export const ContactForm = () => {
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

  const onSubmit = async (data) => {
    // Anti-bot: si _hp tiene contenido, no hacer nada
    if (data._hp) {
      return;
    }

    console.log('Form submitted:', data);

    // Simular envío (aquí iría tu lógica de API)
    await new Promise((resolve) => setTimeout(resolve, 500));

    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Honeypot field (oculto) */}
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

        {/* Nombre / Email */}
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

          {/* Celular (segunda fila pero dentro del mismo Grid) */}
          <Grid size={{ xs: 12, sm: 12 }}>
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
          disabled={isSubmitting}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </Stack>
    </form>
  );
};
