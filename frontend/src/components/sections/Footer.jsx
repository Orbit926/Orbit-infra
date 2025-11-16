import { Box, Container, Grid, Stack, Typography, IconButton, Link as MuiLink } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const navigationLinks = [
  { id: 'services', label: 'Servicios' },
  { id: 'process', label: 'Proceso' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'stack', label: 'Stack' },
];

const socialLinks = [
  { icon: GitHub, href: '#', label: 'GitHub' },
  { icon: LinkedIn, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: { xs: 6, md: 8 },
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        background: (theme) => theme.palette.background.paper,
        borderTop: '1px solid',
        borderTopColor: 'divider',
      }}
    >
      {/* Glassmorphism overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(125,63,185,0.08), transparent 50%), radial-gradient(circle at 80% 50%, rgba(93,95,233,0.08), transparent 50%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand / Intro */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Box
                component="img"
                src="/img/logos/orbit-color.png"
                alt="Orbit"
                sx={{
                  width: 100,
                  height: 'auto',
                  mb: 1,
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: 280,
                  lineHeight: 1.7,
                }}
              >
                Desarrollo web enfocado en performance, diseño y deploy en la nube.
              </Typography>
            </Stack>
          </Grid>

          {/* Navigation */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  mb: 1,
                }}
              >
                Navegación
              </Typography>
              <Stack spacing={1.5}>
                {navigationLinks.map((link) => (
                  <MuiLink
                    key={link.id}
                    component="button"
                    onClick={() => scrollTo(link.id)}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Contact & Social */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Stack spacing={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    mb: 1,
                  }}
                >
                  Contacto
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, maxWidth: 280 }}
                >
                  ¿Tienes un proyecto en mente? Escríbeme y lo platicamos.
                </Typography>
                <Box>
                  <MuiLink
                    href="mailto:hola@orbitweb.studio"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(125,63,185,0.15) 0%, rgba(93,95,233,0.1) 100%)',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      color: 'primary.light',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(125,63,185,0.25) 0%, rgba(93,95,233,0.2) 100%)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Email sx={{ fontSize: 18 }} />
                    Enviar correo
                  </MuiLink>
                </Box>
              </Stack>

              {/* Social Links */}
              <Stack spacing={1.5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.875rem', fontWeight: 600 }}
                >
                  Síguenos
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <IconButton
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        sx={{
                          width: 40,
                          height: 40,
                          border: '1px solid',
                          borderColor: 'divider',
                          background: 'rgba(125,63,185,0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            background: 'rgba(125,63,185,0.15)',
                            transform: 'translateY(-3px)',
                          },
                        }}
                      >
                        <Icon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      </IconButton>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 4,
            borderTop: '1px solid',
            borderTopColor: 'divider',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.875rem' }}
            >
              © {currentYear} Orbit. Todos los derechos reservados.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              Hecho con React, MUI y mucho café ☕
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
