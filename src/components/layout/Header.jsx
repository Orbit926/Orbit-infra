// Header.jsx
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const sections = [
  { id: 'services', label: 'Servicios' },
  { id: 'process',  label: 'Proceso' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'stack',    label: 'Stack' },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (id) => {
    handleCloseMenu();
    scrollTo(id);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'transparent',
          mt: 2,
          px: { xs: 1, sm: 0 },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'center',
          }}
        >
          <Box
            component={Paper}
            elevation={6}
            sx={{
              mx: 'auto',
              px: { xs: 1.5, sm: 3.5, md: 4 },
              py: { xs: 0.6, sm: 0.9, md: 1.1 },
              borderRadius: 999,
              background: 'rgba(20, 25, 45, 0.75)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1.2, sm: 2.5, md: 3 },
              maxWidth: { xs: '100%', sm: 760, md: 900 },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            {/* Logo */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mr: { xs: 0.5, sm: 1.5 },
              }}
            >
              Orbit
            </Typography>

            {/* Navegación desktop/tablet */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexGrow: 1,
                gap: { sm: 1.5, md: 2 },
                justifyContent: 'center',
              }}
            >
              {sections.map((sec) => (
                <Button
                  key={sec.id}
                  color="inherit"
                  onClick={() => scrollTo(sec.id)}
                  sx={{
                    fontSize: '0.9rem',
                    px: { sm: 1.5, md: 2 },
                    textTransform: 'none',
                    position: 'relative',
                    '&:hover::after': {
                      width: '100%',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: 2,
                      width: 0,
                      background:
                        'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                      transition: 'width 0.25s ease',
                    },
                  }}
                >
                  {sec.label}
                </Button>
              ))}
            </Box>

            {/* CTA desktop/tablet */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => scrollTo('contact')}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                fontSize: '0.9rem',
                textTransform: 'none',
                ml: { sm: 1 },
              }}
            >
              Agenda una llamada
            </Button>

            {/* Botón menú móvil */}
            <IconButton
              color="inherit"
              sx={{
                display: { xs: 'inline-flex', sm: 'none' },
                ml: 'auto',
              }}
              onClick={handleOpenMenu}
              aria-controls={menuOpen ? 'orbit-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menú popover móvil */}
      <Menu
        id="orbit-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 200,
            backgroundColor: 'rgba(15, 20, 40, 0.95)',
            backdropFilter: 'blur(18px)',
          },
        }}
      >
        {sections.map((sec) => (
          <MenuItem
            key={sec.id}
            onClick={() => handleMenuClick(sec.id)}
            sx={{ fontSize: '0.9rem' }}
          >
            {sec.label}
          </MenuItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleMenuClick('contact')}>
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              py: 0.5,
              borderRadius: 999,
              background:
                'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Agenda una llamada
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
