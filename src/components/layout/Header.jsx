// Header.jsx
import { AppBar, Toolbar, Typography, Button, Box, Paper } from '@mui/material';

const Header = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AppBar position="fixed" elevation={0} sx={{ background: 'transparent', mt: 2 }}>
      <Box
        component={Paper}
        elevation={6}
        sx={{
          mx: 'auto',
          px: 4,
          py: 1,
          borderRadius: 8,
          background: 'rgba(20, 25, 45, 0.65)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            mr: 1,
            background: 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Orbit
        </Typography>

        {[ 'services', 'process', 'projects', 'stack' ].map((sec) => (
          <Button key={sec} color="inherit" onClick={() => scrollTo(sec)}>
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </Button>
        ))}

        <Button variant="contained" color="primary" onClick={() => scrollTo('contact')}>
          Contacto
        </Button>
      </Box>
    </AppBar>
  );
};

export default Header;
