import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  MessageSquare, 
  Send, 
  Tag, 
  User, 
  Calendar,
  Sparkles,
  Edit2,
  Eye,
  X,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EnquiryItem } from '../../types';

export const EnquiriesManager: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useData();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [replySentMessage, setReplySentMessage] = useState(false);

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusPill = (status: EnquiryItem['status']) => {
    switch (status) {
      case 'New':
        return 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse';
      case 'Contacted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Proposal Sent':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Closed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleOpenDetail = (enquiry: EnquiryItem) => {
    setSelectedEnquiry(enquiry);
    setInternalNote(enquiry.notes || '');
    setReplyText(`Hi ${enquiry.name},\n\nThank you for reaching out to Vici Studio regarding your ${enquiry.service} project.\n\nWe reviewed your requirements and would love to schedule a 15-minute discovery call this week to outline the scope and next steps.\n\nBest regards,\nVici Studio Lead Team`);
    setReplySentMessage(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    updateEnquiryStatus(selectedEnquiry.id, 'Contacted', internalNote);
    setReplySentMessage(true);
    setTimeout(() => {
      setReplySentMessage(false);
    }, 2500);
  };

  const handleStatusChange = (enquiryId: string, newStatus: EnquiryItem['status']) => {
    updateEnquiryStatus(enquiryId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Status Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-gray-900">Website Enquiries & Leads CRM</h3>
            <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full">
              {enquiries.length} Inquiries
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Incoming client inquiries submitted through the 3-step project builder form
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Status Filter Chips */}
          <div className="flex flex-wrap items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            {['all', 'New', 'Contacted', 'Proposal Sent', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`cursor-pointer px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterStatus === status
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-hidden bg-white"
            />
          </div>
        </div>
      </div>

      {/* Structured Enquiries Table Format */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                <th className="py-3.5 px-4 sm:px-6">Lead & Contact</th>
                <th className="py-3.5 px-4">Service Requested</th>
                <th className="py-3.5 px-4">Timeline / Budget</th>
                <th className="py-3.5 px-4">Lead Status</th>
                <th className="py-3.5 px-4">Brief / Project Scope</th>
                <th className="py-3.5 px-4">Date Logged</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No enquiries match the selected search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr 
                    key={enquiry.id}
                    className="hover:bg-purple-50/30 transition-colors group cursor-pointer"
                    onClick={() => handleOpenDetail(enquiry)}
                  >
                    {/* Lead & Contact */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {enquiry.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block text-xs sm:text-sm">{enquiry.name}</span>
                          <span className="text-[11px] text-gray-500 font-medium">{enquiry.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100/80 inline-block text-[11px] truncate max-w-[180px]">
                        {enquiry.service}
                      </span>
                    </td>

                    {/* Budget */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-800 bg-gray-50 px-2 py-0.5 rounded border border-gray-200/80 text-[11px]">
                        {enquiry.budget}
                      </span>
                    </td>

                    {/* Status with Quick Select */}
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value as EnquiryItem['status'])}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full border cursor-pointer outline-hidden ${getStatusPill(enquiry.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    {/* Brief Preview */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-[11px] text-gray-600 truncate">
                        {enquiry.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-gray-400 text-[11px] whitespace-nowrap">
                      {enquiry.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(enquiry)}
                          className="cursor-pointer p-1.5 rounded-lg text-gray-500 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                          title="Open Lead Discovery & Reply"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete enquiry from "${enquiry.name}"?`)) {
                              deleteEnquiry(enquiry.id);
                            }
                          }}
                          className="cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="bg-gray-50/80 px-5 py-3 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {filteredEnquiries.length} of {enquiries.length} customer enquiries</span>
          <span className="font-semibold text-purple-700">All leads saved in persistent local state</span>
        </div>
      </div>

      {/* Detailed Lead & Quick Email/CRM Dispatch Modal */}
      {selectedEnquiry && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                  {selectedEnquiry.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900">{selectedEnquiry.name}</h3>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-xs text-purple-600 hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusPill(selectedEnquiry.status)}`}>
                  {selectedEnquiry.status}
                </span>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="cursor-pointer text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSendReply} className="flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200/80 text-xs">
                  <div>
                    <span className="text-gray-400 block font-bold">Requested Service:</span>
                    <span className="font-bold text-gray-800">{selectedEnquiry.service}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-bold">Budget & Date:</span>
                    <span className="font-bold text-gray-800">{selectedEnquiry.budget} &bull; {selectedEnquiry.createdAt}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Client Project Requirements & Message:
                  </label>
                  <div className="bg-purple-50/50 p-4 rounded-xl text-xs text-gray-800 border border-purple-100 leading-relaxed">
                    {selectedEnquiry.message}
                  </div>
                </div>

                {/* Quick Email Response */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Quick Reply / Email Draft
                    </label>
                    {replySentMessage && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sent & Status marked Contacted!
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-hidden font-sans resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 p-4 sm:px-6 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 cursor-pointer shadow-xs transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response & Mark Contacted</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
