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
            elevation={0}
            sx={{
              position: 'relative',
              mx: 'auto',
              px: { xs: 1.6, sm: 3.5, md: 4 },
              py: { xs: 0.7, sm: 0.95, md: 1.1 },
              borderRadius: 999,
              maxWidth: { xs: '100%', sm: 760, md: 900 },
              width: { xs: '100%', sm: 'auto' },

              // 💧 Liquid glass core
              background:
                'radial-gradient(circle at 0% 0%, rgba(125,63,185,0.35), transparent 55%) , radial-gradient(circle at 100% 100%, rgba(93,95,233,0.3), transparent 55%) , rgba(8, 10, 24, 0.72)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',

              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow:
                '0 18px 45px rgba(0,0,0,0.65), 0 0 0 1px rgba(125,63,185,0.35)',

              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1.1, sm: 2.2, md: 2.8 },

              // Pseudo para brillo líquido
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(120deg, rgba(255,255,255,0.18), transparent 30%, transparent 70%, rgba(255,255,255,0.12))',
                opacity: 0.22,
                mixBlendMode: 'soft-light',
                pointerEvents: 'none',
              },
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src="/img/logos/orbit-color.png"
              alt="Orbit"
              sx={{
                width: 80,
                height: 'auto',
              }}
            />
            {/* Navegación desktop/tablet */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: { xs: 'none', sm: 'flex' },
                flexGrow: 1,
                gap: { sm: 1.2, md: 2 },
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
                      bottom: -2,
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
                position: 'relative',
                zIndex: 1,
                display: { xs: 'none', sm: 'inline-flex' },
                fontSize: '0.9rem',
                textTransform: 'none',
                ml: { sm: 1 },
                borderRadius: 999,
              }}
            >
              Agenda una llamada
            </Button>

            {/* Botón menú móvil */}
            <IconButton
              color="inherit"
              sx={{
                position: 'relative',
                zIndex: 1,
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
            borderRadius: 3,
            minWidth: 210,
            background:
              'radial-gradient(circle at 0% 0%, rgba(125,63,185,0.35), transparent 55%) , radial-gradient(circle at 100% 100%, rgba(93,95,233,0.3), transparent 55%) , rgba(8, 10, 24, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow:
              '0 20px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(125,63,185,0.4)',
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
        <Divider sx={{ my: 0.5, borderColor: 'rgba(255,255,255,0.15)' }} />
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
