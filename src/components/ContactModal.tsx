import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  MessageCircle,
  ExternalLink,
  User,
  Phone,
  Layers,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { 
  buildEnquiryWhatsAppMessage, 
  openWhatsAppDirect, 
  DISPLAY_MOBILE,
  createWhatsAppUrl 
} from '../utils/whatsapp';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  defaultService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultPackage,
  defaultService,
}) => {
  const { services, addEnquiry } = useData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService || (services[0]?.title || 'Custom Web Development'));
  const [timeline, setTimeline] = useState('Within 2-4 Weeks');
  const [brief, setBrief] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappSentUrl, setWhatsappSentUrl] = useState<string>('');

  useEffect(() => {
    if (defaultService) setService(defaultService);
  }, [defaultService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    const whatsappMessage = buildEnquiryWhatsAppMessage({
      name,
      phone,
      service,
      packageTier: defaultPackage,
      timeline,
      brief,
    });

    const url = createWhatsAppUrl(whatsappMessage);
    setWhatsappSentUrl(url);

    // Save lead to local context CRM
    addEnquiry({
      name,
      email: 'via WhatsApp',
      service,
      budget: timeline,
      message: `[WhatsApp: ${phone}] ${brief || 'Client requested project consultation via WhatsApp.'}`,
      status: 'New',
    });

    // Launch WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 300);
  };

  const handleQuickChat = () => {
    openWhatsAppDirect("Hi Vici Studio! I'm interested in starting a website project for my business.");
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setBrief('');
    onClose();
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="contact-modal-dialog"
        className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1.5">
              Enquiry Prepared for WhatsApp
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-5 leading-relaxed">
              Thank you, <span className="font-semibold text-gray-900">{name}</span>. Your brief has been formatted and directed to our official WhatsApp line (<span className="font-semibold text-gray-900">+91 {DISPLAY_MOBILE}</span>).
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={whatsappSentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-sm shadow-purple-500/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open in WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-5 pr-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Start Your Project
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Direct communication & project consultation via WhatsApp (+91 {DISPLAY_MOBILE})
              </p>
            </div>

            {/* Quick Chat Strip */}
            <div className="mb-5 p-3 sm:p-3.5 rounded-xl bg-purple-50/80 border border-purple-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-purple-950 font-medium">Have a quick question?</span>
              </div>
              <button
                type="button"
                onClick={handleQuickChat}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-2xs active:scale-98 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Quick Chat</span>
              </button>
            </div>

            {/* Structured 2-Column Responsive Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & WhatsApp Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400 pointer-events-none">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 pl-0.5 border-r border-gray-200 pr-1.5">+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="88259 10051"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 pl-20 pr-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Service Required & Target Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Service Required
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full h-11 pl-10 pr-9 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 appearance-none focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all cursor-pointer truncate"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Full Website Design">Full Website Design</option>
                      <option value="Consulting & Audit">Consulting & Audit</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Target Timeline
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full h-11 pl-10 pr-9 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 appearance-none focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all cursor-pointer truncate"
                    >
                      <option value="Within 1-2 Weeks (Urgent)">Within 1-2 Weeks (Urgent)</option>
                      <option value="Within 2-4 Weeks">Within 2-4 Weeks</option>
                      <option value="1-2 Months">1-2 Months</option>
                      <option value="Flexible / Planning Stage">Flexible / Planning Stage</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Project Details / Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Project Details / Message <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about your goals, features, or website requirements..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer h-11 px-5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer h-11 inline-flex items-center justify-center gap-2 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] shadow-md shadow-purple-500/25 active:scale-98 transition-all disabled:opacity-50"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>{isSubmitting ? 'Opening WhatsApp...' : 'Send on WhatsApp'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
