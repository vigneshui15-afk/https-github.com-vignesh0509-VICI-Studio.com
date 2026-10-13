import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CtaBannerProps {
  onStartProject: () => void;
  onWhatsApp: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onStartProject, onWhatsApp }) => {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          id="cta-box"
          initial={{ opacity: 0, scale: 0.95, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 border border-gray-100/90 shadow-xl shadow-purple-500/5 text-center relative overflow-hidden"
        >
          {/* Subtle Ambient Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-100/50 via-pink-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-100/40 via-amber-100/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3 sm:mb-5"
            >
              Ready to Build Your Website?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-sm sm:text-lg mb-6 sm:mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              All project enquiries and communications are handled directly via WhatsApp (+91 8825910051). Let's discuss your vision and get you an instant quote.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <motion.button
                id="cta-start-project-btn"
                onClick={onStartProject}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto min-h-[44px] cursor-pointer inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-purple-600 to-[#9333EA] shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:opacity-95 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Inquire via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                id="cta-whatsapp-btn"
                onClick={onWhatsApp}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto min-h-[44px] cursor-pointer inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-gray-700 bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
                <span>Instant WhatsApp Chat</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
