// LanguageSwitcher.jsx
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Language } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
    }
  };

  // En móvil siempre mostramos los botones (no hay hover real)
  const shouldShowButtons = isMobile || open;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
      onMouseEnter={() => {
        if (!isMobile) setOpen(true);
      }}
      onMouseLeave={() => {
        if (!isMobile) setOpen(false);
      }}
    >
      {/* Ícono base */}
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

      {/* Contenedor que anima el ancho, para que el navbar se expanda suave */}
      <Box
        sx={{
          overflow: 'hidden',
          ml: 1,
          display: 'flex',
          alignItems: 'center',
          // El truco: animar width
          width: shouldShowButtons ? 90 : 0, // ajusta 90 según lo ancho que necesites
          transition: 'width 0.25s ease',
        }}
      >
        <motion.div
          animate={{
            opacity: shouldShowButtons ? 1 : 0,
            x: shouldShowButtons ? 0 : -6,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', width: '100%' }}
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
              width: 'auto',
              p: 0, // ❗️ Quita padding interno del grupo
              overflow: 'hidden', // ❗️ Previene gaps entre botones

              '& .MuiToggleButtonGroup-grouped': {
                border: 0,
                borderRadius: 999,
                px: { xs: 0.9, sm: 1.05 }, // ❗️ Ajuste fino para quitar espacio sobrante
                py: 0.35,
                minWidth: 'unset', // ❗️ Previene que reserve ancho extra
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
      </Box>
    </Box>
  );
};

export default LanguageSwitcher;
