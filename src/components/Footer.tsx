import React from 'react';
import { motion } from 'motion/react';
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Dribbble, 
  Instagram,
  Mail,
  Phone,
  MessageCircle,
  LayoutDashboard
} from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenDashboard }) => {
  const socialLinks = [
    { name: 'Twitter / X', icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com', id: 'footer-social-twitter' },
    { name: 'GitHub', icon: <Github className="w-4 h-4" />, href: 'https://github.com', id: 'footer-social-github' },
    { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com', id: 'footer-social-linkedin' },
    { name: 'Dribbble', icon: <Dribbble className="w-4 h-4" />, href: 'https://dribbble.com', id: 'footer-social-dribbble' },
    { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com', id: 'footer-social-instagram' },
  ];

  return (
    <footer id="main-footer" className="bg-[#090D16] text-white pt-14 pb-10 border-t border-gray-800/80 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-pink-600/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-gray-800/80">
          {/* 1. Logo, Text & Social Media Icons */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" id="footer-logo-link" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#D946EF] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-4 h-4 border-2 border-white/90 transform rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white"></div>
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Vici Studio
              </span>
            </a>

            <p className="text-gray-400 text-sm font-normal max-w-sm leading-relaxed">
              We design and engineer high-performance websites, portals, and web apps that build credibility and accelerate business growth.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    id={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-600/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={item.name}
                    title={item.name}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Contact Details (Mobile and Email only) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4 flex items-center gap-1.5">
              <span>CONTACT DETAILS</span>
            </h4>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block font-medium">Email</span>
                  <a 
                    href="mailto:freelearner505@gmail.com" 
                    className="text-white hover:text-purple-400 font-semibold transition-colors"
                  >
                    freelearner505@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block font-medium">WhatsApp / Mobile</span>
                  <a 
                    href="https://wa.me/918825910051?text=Hi%20Vici%20Studio!%20I'm%20interested%20in%20discussing%20a%20website%20project." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>8825910051</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-normal">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3. STUDIO PORTAL (Dashboard only) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-4 flex items-center gap-1.5">
              <span>STUDIO PORTAL</span>
            </h4>

            <div>
              <button
                id="footer-dashboard-btn"
                onClick={onOpenDashboard}
                className="cursor-pointer text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors flex items-center gap-2 group"
              >
                <LayoutDashboard className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 Vici Studio. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDashboard}
              className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer text-xs font-medium"
            >
              Studio Portal Access
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
