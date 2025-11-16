import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { useState } from 'react'

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
  )
}
