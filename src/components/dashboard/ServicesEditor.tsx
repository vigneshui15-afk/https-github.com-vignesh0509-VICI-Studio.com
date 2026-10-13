import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Layout, 
  CreditCard, 
  ShoppingCart, 
  Database, 
  Wand2, 
  Search, 
  X,
  ArrowRight,
  ArrowLeft,
  FileText,
  IndianRupee,
  ListPlus
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ServiceItem } from '../../types';

export const ServicesEditor: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [iconName, setIconName] = useState('layout');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('₹24,999');
  const [features, setFeatures] = useState('');

  const getIcon = (name: string) => {
    switch (name) {
      case 'layout': return <Layout className="w-4 h-4" />;
      case 'creditCard': return <CreditCard className="w-4 h-4" />;
      case 'shoppingCart': return <ShoppingCart className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'wand': return <Wand2 className="w-4 h-4" />;
      case 'search': return <Search className="w-4 h-4" />;
      default: return <Layout className="w-4 h-4" />;
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setTitle('');
    setDescription('');
    setIconName('layout');
    setStartingPrice('₹24,999');
    setFeatures('Responsive Design, Fast Performance, Mobile First');
    setIsModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingService(s);
    setTitle(s.title);
    setDescription(s.description);
    setIconName(s.iconName);
    setStartingPrice(s.startingPrice || '₹24,999');
    setFeatures(s.features?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const parsedFeatures = features.split(',').map(f => f.trim()).filter(Boolean);

    const payload: Partial<ServiceItem> = {
      title,
      description,
      iconName,
      startingPrice,
      features: parsedFeatures.length > 0 ? parsedFeatures : ['Custom UI/UX', 'Performance Optimized'],
      badgeBg: 'bg-purple-50 text-purple-600'
    };

    if (editingService) {
      updateService(editingService.id, payload);
    } else {
      addService(payload as Omit<ServiceItem, 'id'>);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">Services & Capabilities Management</h3>
          <p className="text-xs text-gray-500">Edit and publish client offerings displayed in the public expertise section</p>
        </div>

        <button
          onClick={openAddModal}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  {getIcon(svc.iconName)}
                </div>
                {svc.startingPrice && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    From {svc.startingPrice}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-gray-900 text-base mb-1.5">{svc.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{svc.description}</p>

              {svc.features && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {svc.features.map((feat, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-purple-600" />
                      {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-[11px] font-mono text-gray-400">{svc.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(svc)}
                  className="cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete service "${svc.title}"?`)) {
                      deleteService(svc.id);
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

      {/* Simple Add / Edit Service Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure details for this offering
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

            {/* Simple Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="p-6 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="e.g. Custom Web App Development"
                  />
                </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Icon</label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 bg-white text-xs text-gray-900"
                  >
                    <option value="layout">Layout / Web</option>
                    <option value="creditCard">Credit Card / Fintech</option>
                    <option value="shoppingCart">E-Commerce</option>
                    <option value="database">Database / Backend</option>
                    <option value="wand">AI Integration</option>
                    <option value="search">SEO & Performance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="₹24,999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900 resize-none"
                  placeholder="Brief overview of what clients receive..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Key Deliverables (comma separated)</label>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                  placeholder="Next.js 15, Responsive UI, Fast Load"
                />
              </div>
            </div>

            {/* Controls */}
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
                  <span>{editingService ? 'Save Changes' : 'Create Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
