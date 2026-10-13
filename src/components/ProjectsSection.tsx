import React from 'react';
import { ArrowRight, TrendingUp, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { projects } = useData();

  return (
    <section id="work" className="py-14 sm:py-20 md:py-28 relative bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-[40px] font-extrabold text-[#0F172A] tracking-tight mb-2 sm:mb-4">
            Recent Client Projects
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto font-normal">
            Explore our latest high-performance websites, portals, and web apps engineered for measurable growth.
          </p>
        </motion.div>

        {/* 2 Column Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ 
                duration: 0.6, 
                delay: (idx % 2) * 0.15,
                ease: [0.22, 1, 0.36, 1] 
              }}
              whileHover={{ 
                y: -6,
                boxShadow: '0 25px 30px -12px rgba(124, 58, 237, 0.12)',
                transition: { duration: 0.3 }
              }}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100/90 shadow-2xs hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Project Image Header */}
                <div 
                  className="relative h-48 sm:h-64 overflow-hidden bg-gray-900 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <motion.img
                    src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/25 to-transparent" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 z-10 max-w-[65%]">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] font-semibold text-white bg-black/60 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20 shadow-xs truncate"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Floating Live Badge */}
                  {project.liveUrl && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-300 bg-emerald-950/85 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Web App</span>
                      </span>
                    </div>
                  )}

                  {/* Title overlay on image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10">
                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-xs group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-normal line-clamp-1 mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Structured Case Study Highlights */}
                <div className="p-4 sm:p-6 sm:p-7 space-y-3 sm:space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    <div className="bg-purple-50/40 p-3 sm:p-3.5 rounded-xl border border-purple-100/60 group-hover:border-purple-200 transition-colors">
                      <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-purple-700 mb-1">
                        The Challenge
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
                        {project.problem}
                      </p>
                    </div>

                    <div className="bg-emerald-50/40 p-3 sm:p-3.5 rounded-xl border border-emerald-100/60 group-hover:border-emerald-200 transition-colors">
                      <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                        The Solution
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer action link */}
              <div className="px-4 sm:px-7 pb-4 sm:pb-6 pt-2 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <button
                  id={`view-details-${project.id}-btn`}
                  onClick={() => onSelectProject(project)}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] group/btn transition-colors"
                >
                  <span>View Case Study & Live Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1.5" />
                </button>

                {project.metrics && project.metrics[0] && (
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start sm:self-auto">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>{project.metrics[0].label}: <strong>{project.metrics[0].value}</strong></span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

