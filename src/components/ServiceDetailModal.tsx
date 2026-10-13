import React from 'react';
import { X, ArrowRight, CheckCircle2, Layout, CreditCard, ShoppingCart, Database, Wand2, Search } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onStartWithService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onStartWithService,
}) => {
  if (!service) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return <Layout className="w-6 h-6" />;
      case 'creditCard':
        return <CreditCard className="w-6 h-6" />;
      case 'shoppingCart':
        return <ShoppingCart className="w-6 h-6" />;
      case 'database':
        return <Database className="w-6 h-6" />;
      case 'wand':
        return <Wand2 className="w-6 h-6" />;
      case 'search':
        return <Search className="w-6 h-6" />;
      default:
        return <Layout className="w-6 h-6" />;
    }
  };

  return (
    <div
      id="service-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="service-modal-dialog"
        className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 relative overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${service.badgeBg}`}>
          {getIcon(service.iconName)}
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2 pr-8">
          {service.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-5 font-normal">
          {service.description}
        </p>

        {service.features && (
          <div className="bg-gray-50/90 rounded-2xl p-4 sm:p-5 border border-gray-100 mb-6">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              What's Included in This Scope:
            </h4>
            <ul className="space-y-2">
              {service.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="cursor-pointer h-11 px-5 rounded-full text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartWithService(service.id);
            }}
            className="cursor-pointer h-11 inline-flex items-center justify-center gap-2 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] shadow-xs hover:opacity-95 active:scale-98 transition-all"
          >
            <span>Request This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
