import React from 'react';
import { motion } from 'motion/react';
import { whyChooseList } from '../data/siteData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column (Content & Pillars) */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3">
              <span>ABOUT US</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.2] mb-3 sm:mb-6">
              Who We Are & Why Choose Vici Studio
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-10 font-normal">
              Vici Studio is your professional web partner, dedicated to transforming your digital presence into a powerful business asset. We believe in a results-driven approach that combines aesthetic excellence with technical precision.
            </p>

            {/* 2x2 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-x-8 sm:gap-y-6">
              {whyChooseList.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  id={`why-choose-item-${idx}`} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-1 bg-white/80 p-3.5 sm:p-4 rounded-xl border border-gray-100 hover:border-purple-100 transition-colors"
                >
                  <h3 className="font-bold text-[#0F172A] text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column (100% Commitment Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 36 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="lg:col-span-5"
          >
            <div
              id="about-commitment-card"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-xl hover:border-purple-200 transition-all duration-300 min-h-[220px] sm:min-h-[280px] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent pointer-events-none" />
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight"
              >
                100%
              </motion.div>
              <p className="text-gray-800 font-semibold text-sm sm:text-lg mb-1.5 sm:mb-2">
                Commitment to Your Success
              </p>
              <p className="text-gray-500 text-xs sm:text-sm max-w-xs leading-relaxed">
                Direct engineer communication, rapid delivery turnaround, and dedicated post-launch support.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
