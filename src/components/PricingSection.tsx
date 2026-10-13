import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { pricingData } from '../data/siteData';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-14 sm:py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3">
            <span>PRICING IN INR (₹)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-[40px] font-extrabold text-[#0F172A] tracking-tight">
            Transparent Pricing
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto font-normal mt-2 sm:mt-3">
            Predictable scope, clear timelines, and no surprise charges. All plans priced in Indian Rupees (₹).
          </p>
        </motion.div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {pricingData.map((plan, idx) => {
            const isPopular = plan.isPopular;

            return (
              <motion.div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ 
                  duration: 0.55, 
                  delay: idx * 0.12, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                whileHover={{ 
                  y: isPopular ? -10 : -5,
                  boxShadow: isPopular 
                    ? '0 25px 30px -5px rgba(124, 58, 237, 0.15), 0 10px 10px -5px rgba(124, 58, 237, 0.04)' 
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                  transition: { duration: 0.25 }
                }}
                className={`relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 flex flex-col justify-between transition-colors duration-300 ${
                  isPopular
                    ? 'border-2 border-[#7C3AED] shadow-lg shadow-purple-500/5 md:-translate-y-2'
                    : 'border border-gray-100/90 shadow-xs hover:border-purple-200'
                }`}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-0.5 sm:px-4 sm:py-1 rounded-full shadow-md">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-normal">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 sm:mb-8">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                      {plan.price}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-700">
                        <Check className="w-4 h-4 text-[#7C3AED] shrink-0 stroke-[2.5]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <motion.button
                    id={`pricing-btn-${plan.id}`}
                    onClick={() => onSelectPlan(plan.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full min-h-[44px] py-2.5 sm:py-3 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-center ${
                      plan.buttonVariant === 'gradient'
                        ? 'text-white bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] shadow-xs hover:shadow-md hover:opacity-95'
                        : 'text-[#7C3AED] bg-white border border-purple-200 hover:border-purple-300 hover:bg-purple-50/40'
                    }`}
                  >
                    {plan.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
