import React from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { DISPLAY_MOBILE, createWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const defaultMessage = "Hi Vici Studio team! I'm interested in discussing a website project for my business.";

  const handleOpenWhatsApp = () => {
    const url = createWhatsAppUrl(defaultMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="whatsapp-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="whatsapp-modal-dialog"
        className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-2xs">
          <MessageCircle className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-2">
          Chat on WhatsApp
        </h3>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          Connect directly with our team on WhatsApp (<span className="font-semibold text-gray-900">+91 {DISPLAY_MOBILE}</span>). All project enquiries, discussions, and updates are handled in real-time.
        </p>

        <div className="bg-gray-50 p-3.5 rounded-xl text-xs text-gray-600 text-left mb-6 border border-gray-100 font-mono">
          "Hi Vici Studio team! I'm interested in discussing a website project for my business."
        </div>

        <div className="space-y-2.5">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full cursor-pointer inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};
