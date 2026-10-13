import React, { useState } from 'react';
import { 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Quote, 
  X, 
  Sparkles,
  TrendingUp,
  Check
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { TestimonialItem } from '../../types';

export const ReviewsEditor: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<TestimonialItem | null>(null);

  // Form State
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [projectType, setProjectType] = useState('Full Web Experience');
  const [metricLabel, setMetricLabel] = useState('Conversion Boost');
  const [metricValue, setMetricValue] = useState('+45%');
  const [verified, setVerified] = useState(true);

  const openAddModal = () => {
    setEditingReview(null);
    setAuthor('');
    setRole('');
    setCompany('');
    setContent('');
    setRating(5);
    setProjectType('Full Web Redesign');
    setMetricLabel('Conversion Boost');
    setMetricValue('+50%');
    setVerified(true);
    setIsModalOpen(true);
  };

  const openEditModal = (review: TestimonialItem) => {
    setEditingReview(review);
    setAuthor(review.author);
    setRole(review.role);
    setCompany(review.company);
    setContent(review.content);
    setRating(review.rating || 5);
    setProjectType(review.projectType || 'Web App');
    setMetricLabel(review.metricHighlight?.label || 'Growth');
    setMetricValue(review.metricHighlight?.value || '+40%');
    setVerified(review.verified ?? true);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !company.trim() || !content.trim()) return;

    const payload: Partial<TestimonialItem> = {
      author,
      role: role || 'Founder & CEO',
      company,
      content,
      rating,
      projectType,
      verified,
      metricHighlight: metricValue ? { label: metricLabel || 'Growth', value: metricValue } : undefined,
    };

    if (editingReview) {
      updateTestimonial(editingReview.id, payload);
    } else {
      addTestimonial({
        ...payload,
        avatarText: author.substring(0, 2).toUpperCase(),
        avatarBg: 'from-purple-600 to-indigo-600',
        category: 'saas'
      } as Omit<TestimonialItem, 'id'>);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">Reviews & Testimonials Management</h3>
          <p className="text-xs text-gray-500">Edit, add, or update client testimonials displayed in the home page slider</p>
        </div>

        <button
          onClick={openAddModal}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top rating & project type */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-1">5.0</span>
                </div>

                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                  {rev.projectType}
                </span>
              </div>

              {/* Quote */}
              <p className="text-xs text-gray-700 italic leading-relaxed mb-4 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                "{rev.content}"
              </p>

              {rev.metricHighlight && (
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-3">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <span>{rev.metricHighlight.label}: <strong>{rev.metricHighlight.value}</strong></span>
                </div>
              )}
            </div>

            {/* Author Meta & Action Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  {rev.avatarText || rev.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1">
                    {rev.author}
                    {rev.verified && <CheckCircle2 className="w-3 h-3 text-purple-600" />}
                  </h4>
                  <p className="text-[11px] text-gray-500">{rev.role}, {rev.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(rev)}
                  className="cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete testimonial from ${rev.author}?`)) {
                      deleteTestimonial(rev.id);
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

      {/* Simple Add / Edit Review Modal */}
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
                  {editingReview ? 'Edit Client Review' : 'Add New Client Review'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Client feedback and testimonial quote
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

            {/* Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="p-6 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Client Name *</label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                      placeholder="e.g. Sarah Jenkins"
                    />
                  </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company / Brand *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="e.g. Luminar Health"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="e.g. Chief Product Officer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Type Tag</label>
                  <input
                    type="text"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="e.g. Full Web Experience"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="cursor-pointer p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs text-gray-500 ml-1 font-medium">{rating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Review Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900 resize-none"
                  placeholder="Share the client's direct feedback and experience working with Vici Studio..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Metric Stat / Value (Optional)</label>
                  <input
                    type="text"
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-xs text-gray-900"
                    placeholder="e.g. +65% Conversion"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verified}
                      onChange={(e) => setVerified(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="text-xs font-semibold text-gray-700">Display Verified Client Badge</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Controls */}
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
                  <span>{editingReview ? 'Save Changes' : 'Publish Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
