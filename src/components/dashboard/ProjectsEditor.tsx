import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Edit3, 
  Trash2, 
  Globe, 
  ExternalLink, 
  X, 
  Image as ImageIcon,
  Tag,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ProjectItem } from '../../types';

export const ProjectsEditor: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [client, setClient] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [tags, setTags] = useState('');
  const [metricLabel, setMetricLabel] = useState('Conversion Lift');
  const [metricValue, setMetricValue] = useState('+45%');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [approach, setApproach] = useState('');

  const sampleImagePresets = [
    { label: 'Fintech Analytics', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
    { label: 'E-Commerce Platform', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
    { label: 'HealthTech Portal', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80' },
  ];

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Web Development');
    setClient('Apex Global Markets');
    setSummary('Next-generation financial analytics interface.');
    setImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80');
    setLiveUrl('https://example.com/demo');
    setMetricLabel('Conversion Lift');
    setMetricValue('+42%');
    setTags('React, TypeScript, Tailwind, Node.js');
    setProblem('Legacy architecture bottleneck causing high user friction and poor mobile retention.');
    setSolution('Modern decoupled full-stack architecture with instantaneous page loads.');
    setApproach('Sprint-based architectural discovery, modular design tokens, and rapid iterative deployment.');
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject(p);
    setTitle(p.title);
    setCategory(p.category || 'Web Development');
    setClient(p.client || p.fullCaseStudy?.client || 'Client Partner');
    setSummary(p.summary || p.tagline || '');
    setImage(p.image || p.imageUrl || '');
    setLiveUrl(p.liveUrl || '');
    const firstMetric = p.metrics?.[0];
    setMetricLabel(firstMetric?.label || 'Outcome');
    setMetricValue(firstMetric?.value || '+50%');
    setTags(p.tags?.join(', ') || '');
    setProblem(p.problem || '');
    setSolution(p.solution || '');
    setApproach(p.approach || 'Sprint-based architectural discovery, modular design tokens, and rapid iterative deployment.');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);

    const payload: Partial<ProjectItem> = {
      title,
      tagline: summary,
      category,
      client,
      summary,
      image: image || sampleImagePresets[0].url,
      imageUrl: image || sampleImagePresets[0].url,
      liveUrl: liveUrl || 'https://example.com',
      metrics: [{ label: metricLabel || 'Outcome', value: metricValue || '100%' }],
      tags: parsedTags.length > 0 ? parsedTags : ['React', 'Tailwind'],
      problem: problem || 'Legacy architecture bottleneck',
      solution: solution || 'Modern decoupled full-stack application',
      approach: approach || 'Sprint-based architectural discovery, modular design tokens, and rapid iterative deployment.',
      result: editingProject?.result || 'Dramatic improvement in core web vitals and engagement'
    };

    if (editingProject) {
      updateProject(editingProject.id, payload);
    } else {
      addProject({
        ...payload,
        year: '2026'
      } as Omit<ProjectItem, 'id'>);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">Portfolio & Case Studies Management</h3>
          <p className="text-xs text-gray-500">Edit, add, or update portfolio projects, card images, and live interactive URLs</p>
        </div>

        <button
          onClick={openAddModal}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Project Image Preview */}
              <div className="relative h-44 bg-gray-900 overflow-hidden group">
                <img
                  src={proj.image || proj.imageUrl || sampleImagePresets[0].url}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-black/20" />

                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-gray-900 shadow-xs">
                    {proj.category || 'Portfolio'}
                  </span>
                </div>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-medium text-purple-300 block">{proj.client}</span>
                  <h4 className="font-bold text-base text-white truncate">{proj.title}</h4>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {proj.summary || proj.tagline}
                </p>

                {/* Tags */}
                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Case Study Summary Preview */}
                <div className="pt-2.5 border-t border-gray-100 space-y-1.5 text-[11px] bg-gray-50/70 p-2.5 rounded-xl">
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-rose-600 shrink-0">Problem:</span>
                    <span className="line-clamp-1 text-gray-600 font-normal">{proj.problem}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-emerald-600 shrink-0">Solution:</span>
                    <span className="line-clamp-1 text-gray-600 font-normal">{proj.solution}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-purple-600 shrink-0">Approach:</span>
                    <span className="line-clamp-1 text-gray-600 font-normal">{proj.approach || 'Agile discovery & modular architecture'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
              <span className="text-[11px] font-mono text-gray-400">ID: {proj.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(proj)}
                  className="cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Project & Case Study</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                      deleteProject(proj.id);
                    }
                  }}
                  className="cursor-pointer p-1.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Add / Edit Project Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Set project showcase, live link, and case study details
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="p-6 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="e.g. Apex Financial Analytics Platform"
                  />
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 bg-white text-xs text-gray-900"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX & Interactive Design">UI/UX & Interactive Design</option>
                    <option value="E-Commerce Architecture">E-Commerce Architecture</option>
                    <option value="SaaS & Cloud Applications">SaaS & Cloud Applications</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="e.g. Apex Global Markets"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project Summary / Tagline *</label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900 resize-none"
                  placeholder="High-performance responsive platform built for scale..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Preview Image URL</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Live URL / Demo Link</label>
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Key Metric Label</label>
                  <input
                    type="text"
                    value={metricLabel}
                    onChange={(e) => setMetricLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="Conversion Lift"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Metric Value</label>
                  <input
                    type="text"
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="+45%"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tech Stack Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                  placeholder="React, TypeScript, Tailwind CSS, Node.js"
                />
              </div>

              {/* Deep-Dive Case Study Fields */}
              <div className="pt-2 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 text-purple-700">
                  <span>Deep-Dive Case Study Details</span>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">The Problem *</label>
                  <textarea
                    rows={2}
                    required
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900 resize-none"
                    placeholder="Core client problem or hurdle..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">The Solution *</label>
                  <textarea
                    rows={2}
                    required
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900 resize-none"
                    placeholder="Engineering solution designed..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">The Approach *</label>
                  <textarea
                    rows={2}
                    required
                    value={approach}
                    onChange={(e) => setApproach(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900 resize-none"
                    placeholder="Strategic and technical approach taken..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
              <div className="shrink-0 p-4 sm:px-6 border-t border-gray-100 bg-gray-50/70 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingProject ? 'Save Changes' : 'Publish Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
