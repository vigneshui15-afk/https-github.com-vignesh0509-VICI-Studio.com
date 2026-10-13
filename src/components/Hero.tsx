import React from 'react';
import { ArrowRight, CheckCircle2, Smartphone, Search, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onViewWork }) => {
  const highlights = [
    { icon: CheckCircle2, label: 'Affordable Rates', color: 'text-purple-600' },
    { icon: Smartphone, label: 'Mobile First', color: 'text-purple-600' },
    { icon: Search, label: 'SEO Ready', color: 'text-purple-600' },
    { icon: MessageCircle, label: 'WhatsApp Support', color: 'text-emerald-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="home" className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Subtle Gradient Blobs with floating animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.4, 0.7, 0.4], 
          scale: [0.95, 1.05, 0.95] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[280px] sm:h-[380px] bg-gradient-to-tr from-purple-200/50 via-pink-100/40 to-orange-100/40 blur-3xl -z-10 pointer-events-none rounded-full"
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100/80 text-purple-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="truncate">High-Performance Web Engineering</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-[#0F172A] tracking-tight leading-[1.18] sm:leading-[1.15] mb-4 sm:mb-6"
          >
            Build a Website That Works <br className="hidden sm:inline" />
            <span className="text-[#8B5CF6]">For Your </span>
            <span className="bg-gradient-to-r from-[#F97316] to-[#EF4444] bg-clip-text text-transparent">
              Business.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal px-1 sm:px-0"
          >
            We design and develop premium, high-converting websites that build credibility and drive growth for modern enterprises.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 max-w-sm sm:max-w-none mx-auto"
          >
            <motion.button
              id="hero-start-project-btn"
              onClick={onStartProject}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto min-h-[48px] cursor-pointer inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-purple-600 to-[#9333EA] shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:opacity-95 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
              <span>Inquire on WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <motion.button
              id="hero-view-work-btn"
              onClick={onViewWork}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto min-h-[48px] cursor-pointer inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-[#8B5CF6] bg-white border border-purple-200 hover:border-purple-300 hover:bg-purple-50/50 shadow-2xs transition-all duration-200"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
            </motion.button>
          </motion.div>

          {/* Badges / Value Props: Clean 2x2 on mobile, flex row on tablet/desktop */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm font-medium text-gray-700 max-w-md sm:max-w-none mx-auto"
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  id={`hero-badge-${idx}`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-gray-700 bg-white/90 backdrop-blur-xs px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl sm:rounded-full border border-gray-100/90 shadow-2xs cursor-default text-center sm:text-left"
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.color} shrink-0`} />
                  <span className="text-[11px] sm:text-xs font-semibold">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
