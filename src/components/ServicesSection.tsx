import React from 'react';
import { 
  Layout, 
  CreditCard, 
  ShoppingCart, 
  Database, 
  Wand2, 
  Search,
  Check,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { services } = useData();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return <Layout className="w-5 h-5" />;
      case 'creditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'shoppingCart':
        return <ShoppingCart className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
      case 'wand':
        return <Wand2 className="w-5 h-5" />;
      case 'search':
        return <Search className="w-5 h-5" />;
      default:
        return <Layout className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 md:py-28 relative bg-white overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with scroll trigger */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3">
            <span>OUR EXPERTISE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-[40px] font-extrabold text-[#0F172A] tracking-tight">
            What We Build
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto font-normal mt-2 sm:mt-3">
            Custom engineered digital solutions tailored for startups, high-growth brands, and modern enterprises.
          </p>
        </motion.div>

        {/* 3x2 / Responsive Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ 
                duration: 0.55, 
                delay: (idx % 3) * 0.1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              whileHover={{ 
                y: -6, 
                boxShadow: '0 20px 25px -5px rgba(124, 58, 237, 0.08), 0 8px 10px -6px rgba(124, 58, 237, 0.04)',
                transition: { duration: 0.25 }
              }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectService(service)}
              className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-gray-100/90 shadow-xs hover:border-purple-200 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
            >
              <div>
                {/* Icon badge & starting price */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-transform duration-300 ${service.badgeBg || 'bg-purple-50 text-purple-600'}`}
                  >
                    {getIcon(service.iconName)}
                  </motion.div>

                  {service.startingPrice && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      From {service.startingPrice}
                    </span>
                  )}
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2 sm:mb-3 group-hover:text-[#7C3AED] transition-colors">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Service Features Tag Pills */}
                {service.features && (
                  <div className="pt-3.5 sm:pt-4 border-t border-gray-50 flex flex-wrap gap-1.5 mb-3.5 sm:mb-4">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-gray-500 bg-gray-50 px-2 sm:px-2.5 py-1 rounded-md group-hover:bg-purple-50/60 group-hover:text-purple-700 transition-colors"
                      >
                        <Check className="w-3 h-3 text-[#7C3AED] shrink-0" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 text-xs font-bold text-[#7C3AED] group-hover:translate-x-1.5 transition-transform duration-200">
                  <span>Inquire about service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
