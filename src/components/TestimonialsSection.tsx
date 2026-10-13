import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  // Autoplay for slider
  useEffect(() => {
    if (!isAutoplay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentItem = testimonials[currentIndex] || testimonials[0];

  if (!currentItem) return null;

  return (
    <section id="testimonials" className="py-14 sm:py-20 md:py-28 relative overflow-hidden bg-white">
      {/* Subtle Background visual accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLIENT REVIEWS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-tight mb-2 sm:mb-4">
            Trusted by Growing Brands
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto font-normal">
            Real feedback and verified outcomes from founders and product teams who built with Vici Studio.
          </p>
        </motion.div>

        {/* Pure Slider Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-gray-100/90 shadow-lg shadow-purple-500/5 relative flex flex-col justify-between"
                >
                  {/* Top Meta: Stars, Project Type Badge, Metric */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {[...Array(currentItem.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-gray-900 bg-amber-50 px-2 py-0.5 rounded text-amber-700">
                        {currentItem.rating ? `${currentItem.rating}.0` : '5.0'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-purple-100">
                        {currentItem.projectType || 'Verified Client'}
                      </span>
                      {currentItem.metricHighlight && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span>{currentItem.metricHighlight.label}: <strong>{currentItem.metricHighlight.value}</strong></span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quote Content */}
                  <div className="relative mb-5 sm:mb-8">
                    <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-purple-100 absolute -top-3 -left-1 sm:-top-5 sm:-left-2 -z-0 opacity-80" />
                    <p className="text-gray-800 text-sm sm:text-lg md:text-xl font-normal leading-relaxed relative z-10 italic">
                      "{currentItem.content}"
                    </p>
                  </div>

                  {/* Author Footer */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr ${currentItem.avatarBg || 'from-indigo-600 to-purple-600'} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-xs shrink-0`}
                      >
                        {currentItem.avatarText || currentItem.author.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                            {currentItem.author}
                          </h3>
                          {currentItem.verified !== false && (
                            <CheckCircle2
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7C3AED]"
                              title="Verified Client"
                            />
                          )}
                        </div>
                        <p className="text-gray-500 text-[11px] sm:text-sm font-medium">
                          {currentItem.role} &middot; <span className="text-gray-800 font-semibold">{currentItem.company}</span>
                        </p>
                      </div>
                    </div>

                    {currentItem.metricHighlight && (
                      <div className="sm:hidden text-right">
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          {currentItem.metricHighlight.value}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slider Navigation & Pagination */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 px-1 sm:px-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  id={`testimonial-dot-${idx}`}
                  onClick={() => {
                    setIsAutoplay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-7 sm:w-8 bg-[#7C3AED]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                id="testimonial-prev-btn"
                onClick={handlePrev}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#7C3AED] hover:border-purple-300 shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                id="testimonial-next-btn"
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#7C3AED] hover:border-purple-300 shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
