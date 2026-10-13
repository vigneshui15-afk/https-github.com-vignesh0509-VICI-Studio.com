import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, MessageCircle, Layers, FolderGit2, Compass, Star, Info } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (defaultPackage?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services', id: 'services', icon: <Layers className="w-4 h-4" /> },
    { label: 'Work', href: '#work', id: 'work', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Process', href: '#process', id: 'process', icon: <Compass className="w-4 h-4" /> },
    { label: 'Reviews', href: '#testimonials', id: 'testimonials', icon: <Star className="w-4 h-4" /> },
    { label: 'About', href: '#about', id: 'about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 py-3'
          : 'bg-white/80 backdrop-blur-xs py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            id="brand-logo-link"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <div className="w-4 h-4 border-2 border-white/90 transform rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gradient-to-tr from-purple-400 to-pink-400"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0F172A] leading-tight">
                Vici Studio
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-purple-600 sm:hidden">
                Web Agency
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  id={`nav-link-${item.id}`}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#7C3AED] font-semibold'
                      : 'text-gray-600 hover:text-[#0F172A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7C3AED] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-cta-btn"
              onClick={() => onOpenContact()}
              className="cursor-pointer relative group overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-white shadow-xs hover:shadow-md transition-all duration-300 bg-[#7C3AED] hover:bg-[#6D28D9] shadow-purple-500/20 hover:opacity-95 active:scale-98"
              title="Inquire via WhatsApp: 8825910051"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Inquire on WhatsApp</span>
              </span>
            </button>
          </div>

          {/* Mobile Right Controls: Quick CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenContact()}
              className="cursor-pointer px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-2xs hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-[#0F172A] hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-900" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="md:hidden pt-3 pb-4 px-1 space-y-1.5 border-t border-gray-100 mt-2.5 animate-in fade-in slide-in-from-top-3 duration-200"
          >
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-purple-50 text-[#7C3AED] border border-purple-100 font-bold shadow-2xs'
                        : 'bg-gray-50/70 text-gray-700 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    <span className={isActive ? 'text-purple-600' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xs active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Start Enquiry on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
