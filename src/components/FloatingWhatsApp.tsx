import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { openWhatsAppDirect, DISPLAY_MOBILE } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    openWhatsAppDirect("Hi Vici Studio! I'm interested in discussing a website project for my business.");
  };

  return (
    <motion.aside
      aria-label="WhatsApp quick chat"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex items-center"
    >
      {/* Subtle outer pulse aura to draw visitor attention */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] -z-10 pointer-events-none"
        animate={{
          scale: [1, 1.14, 1.28],
          opacity: [0.45, 0.2, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />

      <motion.button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          boxShadow: [
            '0 10px 20px -3px rgba(37, 211, 102, 0.35), 0 4px 6px -2px rgba(37, 211, 102, 0.2)',
            '0 16px 32px -2px rgba(37, 211, 102, 0.55), 0 0 0 5px rgba(37, 211, 102, 0.16)',
            '0 10px 20px -3px rgba(37, 211, 102, 0.35), 0 4px 6px -2px rgba(37, 211, 102, 0.2)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="relative group cursor-pointer flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full border border-white/25 transition-colors duration-200"
        title={`Chat on WhatsApp: ${DISPLAY_MOBILE}`}
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white" />
        </div>
        
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold leading-none tracking-tight">Chat on WhatsApp</span>
          <span className="text-[10px] text-emerald-100 font-medium leading-tight mt-0.5">Quick Response</span>
        </div>
      </motion.button>
    </motion.aside>
  );
};
