import { Fab, Tooltip } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { contactConfig } from '../../config/data';

export const FloatingWhatsApp = () => {
  const defaultMessage = 'Hola, me gustaría agendar una llamada';
  
  const message = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${contactConfig.whatsapp.number}?text=${message}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <Tooltip title="Contactar" placement="left" arrow>
        <Fab
          aria-label="WhatsApp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #7D3FB9 0%, #5D5FE9 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5D5FE9 0%, #7D3FB9 100%)',
              transform: 'scale(1.08)',
            },
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 24px rgba(125, 63, 185, 0.45)',
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 32, color: 'white' }} />
        </Fab>
      </Tooltip>
    </motion.div>
  );
};

export default FloatingWhatsApp;
