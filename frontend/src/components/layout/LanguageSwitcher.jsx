// LanguageSwitcher.jsx
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Language } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Icono base */}
      <Language
        sx={{
          fontSize: 22,
          color: 'text.secondary',
          cursor: 'pointer',
          display: { xs: 'none', sm: 'block' },
          transition: 'color 0.25s ease',
          '&:hover': { color: 'primary.light' },
        }}
      />

      {/* Animación de botones ES/EN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              marginLeft: 8,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ToggleButtonGroup
              value={currentLanguage}
              exclusive
              onChange={handleLanguageChange}
              aria-label="Selector de idioma"
              size="small"
              sx={{
                background: 'rgba(125, 63, 185, 0.08)',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',

                '& .MuiToggleButtonGroup-grouped': {
                  border: 0,
                  borderRadius: 999,
                  px: { xs: 1.2, sm: 1.4 },
                  py: 0.4,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  transition: 'all 0.25s ease',

                  '&:hover': {
                    background: 'rgba(125,63,185,0.15)',
                    color: 'primary.light',
                  },

                  '&.Mui-selected': {
                    background:
                      'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                    color: '#fff',
                    fontWeight: 700,
                  },
                },
              }}
            >
              <ToggleButton value="es">ES</ToggleButton>
              <ToggleButton value="en">EN</ToggleButton>
            </ToggleButtonGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default LanguageSwitcher;
