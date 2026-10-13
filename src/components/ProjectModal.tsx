import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ExternalLink, 
  Laptop, 
  Smartphone, 
  Tablet, 
  Globe, 
  Copy, 
  CheckCheck,
  Building2,
  Calendar,
  Layers,
  AlertCircle,
  Lightbulb,
  Compass
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartSimilar: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartSimilar,
}) => {
  const [activeTab, setActiveTab] = useState<'live-preview' | 'case-study'>('live-preview');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!project) return null;

  const liveUrl = project.liveUrl || `https://${project.id}.vicistudio.com`;
  const clientName = project.client || project.fullCaseStudy?.client || 'Enterprise Client';
  const timeline = project.fullCaseStudy?.timeline || project.year || '4-6 Weeks';
  const projectSummary = project.summary || project.tagline || 'High-performance digital experience engineered for measurable business impact.';
  const approachText = project.approach || 'Agile discovery sprint followed by modular component engineering, performance benchmarking, and iterative user testing.';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-modal-dialog"
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-gray-100 shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="shrink-0 bg-white/95 backdrop-blur-md z-30 px-5 sm:px-8 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              {project.category || 'Featured Work'}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Deployment Active
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Live Site Button */}
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-800 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>Visit Live Website</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="cursor-pointer p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Project Title and Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-gray-500">
                {clientName}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-semibold text-purple-600">
                {project.category || 'Web Application'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-1.5">
              {project.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-normal">
              {project.tagline}
            </p>
          </div>

          {/* View Mode Toggle Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-2.5 gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('live-preview')}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'live-preview'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                🌐 Interactive Live Preview
              </button>
              <button
                onClick={() => setActiveTab('case-study')}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'case-study'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                📑 Deep-Dive Case Study
              </button>
            </div>

            {/* Device Switcher for Live Preview Tab */}
            {activeTab === 'live-preview' && (
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                    deviceView === 'desktop' ? 'bg-white text-purple-600 shadow-2xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Desktop View"
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceView('tablet')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                    deviceView === 'tablet' ? 'bg-white text-purple-600 shadow-2xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                    deviceView === 'mobile' ? 'bg-white text-purple-600 shadow-2xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* TAB 1: 🌐 INTERACTIVE LIVE PREVIEW */}
          {/* In this section: ONLY show website image, link, and basic details about project */}
          {activeTab === 'live-preview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 1. Website Image Preview in Interactive Device Window */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                {/* Simulated Browser Top Bar with Link */}
                <div className="bg-gray-950 px-4 py-3 border-b border-gray-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  
                  {/* Clickable URL address pill in browser frame */}
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800/90 hover:bg-gray-800 px-4 py-1.5 rounded-full text-gray-300 hover:text-white font-mono text-[11px] max-w-sm sm:max-w-md w-full justify-center transition-colors group/url"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{liveUrl}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover/url:text-white shrink-0" />
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    title="Copy URL"
                  >
                    {copiedLink ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Simulated Screen with Responsive Sizing */}
                <div className="p-3 sm:p-6 bg-gray-950 flex justify-center items-center min-h-[300px] sm:min-h-[380px]">
                  <div 
                    className={`transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 ${
                      deviceView === 'desktop' 
                        ? 'w-full max-w-3xl' 
                        : deviceView === 'tablet' 
                        ? 'w-[520px] max-w-full' 
                        : 'w-[320px]'
                    }`}
                  >
                    <div className="relative group">
                      <img
                        src={project.image || project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover max-h-[420px]"
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-bold text-xs shadow-lg hover:scale-105 transition-transform"
                        >
                          <Globe className="w-4 h-4 text-purple-600" />
                          <span>Open Live Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Direct Website Link Section */}
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white p-4 sm:p-5 rounded-2xl border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Live Production Link
                    </h4>
                    <p className="text-xs font-mono text-purple-700 truncate max-w-xs sm:max-w-md">
                      {liveUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyLink}
                    className="cursor-pointer flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {copiedLink ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 3. Basic Details About Project */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Basic Project Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Client / Organization</p>
                      <p className="text-xs font-bold text-gray-900">{clientName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Industry & Category</p>
                      <p className="text-xs font-bold text-gray-900">{project.category || 'Web Application'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Timeline / Release</p>
                      <p className="text-xs font-bold text-gray-900">{timeline}</p>
                    </div>
                  </div>
                </div>

                {/* Project Summary */}
                <div>
                  <h4 className="text-xs font-bold text-gray-700 mb-1">Project Overview</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {projectSummary}
                  </p>
                </div>

                {/* Tech Stack & Tags */}
                {(project.techStack || project.tags) && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-2">Technologies & Architecture</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.techStack || project.tags).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 📑 DEEP-DIVE CASE STUDY */}
          {/* Strictly show Problem, Solution, and Approach ONLY */}
          {activeTab === 'case-study' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex items-center justify-between bg-purple-50/70 p-3.5 sm:p-4 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Case Study Breakdown
                    </h3>
                    <p className="text-xs text-gray-500">
                      Problem, Solution & Approach
                    </p>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-200/70 text-purple-700 text-[11px] font-semibold shadow-2xs">
                  <span>Architecture & Strategy</span>
                </div>
              </div>

              {/* Card 1: The Problem */}
              <div className="bg-rose-50/30 p-5 rounded-2xl border border-rose-100/70 hover:border-rose-200 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                    01
                  </span>
                  <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>The Problem</span>
                  </h4>
                </div>
                <p className="text-gray-800 text-xs sm:text-sm leading-relaxed font-normal">
                  {project.problem}
                </p>
              </div>

              {/* Card 2: The Solution */}
              <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100/70 hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    02
                  </span>
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                    <span>The Solution</span>
                  </h4>
                </div>
                <p className="text-gray-800 text-xs sm:text-sm leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>

              {/* Card 3: The Approach */}
              <div className="bg-purple-50/30 p-5 rounded-2xl border border-purple-100/70 hover:border-purple-200 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                    03
                  </span>
                  <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-purple-600" />
                    <span>The Approach</span>
                  </h4>
                </div>
                <p className="text-gray-800 text-xs sm:text-sm leading-relaxed font-normal">
                  {approachText}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Action Buttons */}
        <div className="shrink-0 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Launch Live Project in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartSimilar(project.title);
              }}
              className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] shadow-xs hover:opacity-95 active:scale-98 transition-all"
            >
              <span>Start Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
