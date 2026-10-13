import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  BarChart3, 
  Users, 
  Mail, 
  FolderGit2, 
  Star, 
  Briefcase, 
  Layers, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { AnalyticsOverview } from './AnalyticsOverview';
import { ClientsManager } from './ClientsManager';
import { EnquiriesManager } from './EnquiriesManager';
import { ProjectPipelineManager } from './ProjectPipelineManager';
import { ReviewsEditor } from './ReviewsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { ServicesEditor } from './ServicesEditor';
import { useData } from '../../context/DataContext';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'analytics' | 'clients' | 'enquiries' | 'pipeline' | 'reviews' | 'projects' | 'services';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('vici_admin_auth') === 'true';
  });
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const { enquiries, managedProjects } = useData();

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('vici_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isOpen) return null;

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'analytics', label: 'Overall Review', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'clients', label: 'Clients Details', icon: <Users className="w-4 h-4" /> },
    { id: 'enquiries', label: 'Enquiry Details', icon: <Mail className="w-4 h-4" />, badge: newEnquiriesCount },
    { id: 'pipeline', label: 'Project Management', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'reviews', label: 'Edit Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'projects', label: 'Edit Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'services', label: 'Edit Services', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 w-full h-full min-h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
      {/* Top App Bar (Full Width) */}
      <header className="bg-[#090D16] text-white px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between border-b border-gray-800/80 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            id="admin-top-back-btn"
            className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all hover:-translate-x-0.5"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </button>

          <div className="h-5 w-px bg-gray-800 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#D946EF] flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Vici Studio Admin & CMS
                </h1>
                <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Full Page Mode
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
              title="Sign out of admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="cursor-pointer w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
            title="Exit Full Screen Dashboard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Auth Gate vs Authenticated Dashboard Content (100% Viewport Height) */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#FAFAFC] overflow-y-auto relative">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
          <AdminLogin
            onLoginSuccess={() => setIsAuthenticated(true)}
            onClose={onClose}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200/80 p-3 sm:p-4 flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto md:overflow-y-auto shadow-xs">
            <div className="flex flex-row md:flex-col gap-1 w-full">
              <div className="hidden md:block px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Operations & CRM
              </div>

              {tabs.slice(0, 4).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-purple-50 text-[#7C3AED] shadow-2xs font-bold border border-purple-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-[#7C3AED]' : 'text-gray-400'}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </div>

                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="ml-2 text-[10px] font-black px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="hidden md:block px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Live Site CMS Editor
              </div>

              {tabs.slice(4).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-purple-50 text-[#7C3AED] shadow-2xs font-bold border border-purple-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-[#7C3AED]' : 'text-gray-400'}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Return to Public Website */}
            <div className="hidden md:block pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-gray-700 hover:text-purple-700 bg-gray-50 hover:bg-purple-50 transition-colors border border-gray-200/80 hover:border-purple-200 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit to Public Website</span>
              </button>
            </div>
          </aside>

          {/* Main Workspace Area (Full Width & Height) */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'analytics' && <AnalyticsOverview />}
                  {activeTab === 'clients' && <ClientsManager />}
                  {activeTab === 'enquiries' && <EnquiriesManager />}
                  {activeTab === 'pipeline' && <ProjectPipelineManager />}
                  {activeTab === 'reviews' && <ReviewsEditor />}
                  {activeTab === 'projects' && <ProjectsEditor />}
                  {activeTab === 'services' && <ServicesEditor />}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};
