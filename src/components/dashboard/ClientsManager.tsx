import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  IndianRupee, 
  FolderGit2, 
  Calendar,
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ClientItem } from '../../types';

export const ClientsManager: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);

  // Step state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  // Step 1: Contact Identity
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  
  // Step 2: Communication & Contact
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 3: Account & Project Scope
  const [status, setStatus] = useState<ClientItem['status']>('Active');
  const [totalSpend, setTotalSpend] = useState('₹12,00,000');
  const [assignedProject, setAssignedProject] = useState('');

  const openAddModal = () => {
    setEditingClient(null);
    setCurrentStep(1);
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setStatus('Active');
    setTotalSpend('₹10,00,000');
    setAssignedProject('FinTech Intelligence Portal');
    setIsModalOpen(true);
  };

  const openEditModal = (client: ClientItem) => {
    setEditingClient(client);
    setCurrentStep(1);
    setName(client.name);
    setCompany(client.company);
    setEmail(client.email);
    setPhone(client.phone || '');
    setStatus(client.status);
    setTotalSpend(client.totalSpend);
    setAssignedProject(client.assignedProject);
    setIsModalOpen(true);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!name.trim() || !company.trim()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!email.trim()) return;
      setCurrentStep(3);
    } else {
      handleFinalSave();
    }
  };

  const handleFinalSave = () => {
    if (!name || !email || !company) return;

    const payload: Partial<ClientItem> = {
      name,
      company,
      email,
      phone: phone || undefined,
      status,
      totalSpend: totalSpend || '₹0',
      assignedProject: assignedProject || 'General Web Development',
    };

    if (editingClient) {
      updateClient(editingClient.id, payload);
    } else {
      addClient({
        ...payload,
        startDate: 'Aug 2026'
      } as Omit<ClientItem, 'id'>);
    }

    setIsModalOpen(false);
  };

  const getStatusBadge = (st: ClientItem['status']) => {
    switch (st) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Onboarding':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Lead':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const stepList = [
    { num: 1, title: 'Identity', icon: <User className="w-3.5 h-3.5" /> },
    { num: 2, title: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
    { num: 3, title: 'Account', icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">Client Accounts & CRM Database</h3>
          <p className="text-xs text-gray-500">Manage client directory, contract statuses, and assigned digital projects</p>
        </div>

        <button
          onClick={openAddModal}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Structured Table Format for Clients */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Client & Company</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Assigned Project</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Total Spend</th>
                <th className="py-3.5 px-4">Start Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0">
                        {c.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block">{c.name}</span>
                        <span className="text-gray-500 text-[11px]">{c.company}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span>{c.email}</span>
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{c.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                      <FolderGit2 className="w-3 h-3 text-purple-600" />
                      {c.assignedProject}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-gray-900">
                    {c.totalSpend}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                    {c.startDate || 'Aug 2026'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(c)}
                        className="cursor-pointer p-1.5 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                        title="Edit client"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove client ${c.name}?`)) {
                            deleteClient(c.id);
                          }
                        }}
                        className="cursor-pointer p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete client"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step Add / Edit Client Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                  CLIENT CRM
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {editingClient ? 'Edit Client Record' : 'Add New Client Account'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleNext} className="flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="p-6">

            {/* Step Progress Indicator */}
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2 mb-2">
                {stepList.map((st) => {
                  const isCurrent = currentStep === st.num;
                  const isPast = currentStep > st.num;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => {
                        if (st.num < currentStep) setCurrentStep(st.num as 1 | 2 | 3);
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                        isCurrent
                          ? 'bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-100'
                          : isPast
                          ? 'bg-gray-50 border-gray-200 text-emerald-600 cursor-pointer'
                          : 'bg-gray-50/50 border-gray-100 text-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                        isCurrent ? 'bg-purple-600 text-white' : isPast ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isPast ? <Check className="w-3 h-3" /> : st.num}
                      </div>
                      <span className="hidden sm:inline">{st.title}</span>
                    </button>
                  );
                })}
              </div>
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Fields Step Area */}
            <div className="space-y-4 text-xs">
              {/* STEP 1: Identity */}
              {currentStep === 1 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Step 1: Contact Identity</span>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      placeholder="e.g. Marcus Vance"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Company / Brand *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      placeholder="e.g. Aura Capital Management"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Contact Details */}
              {currentStep === 2 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Step 2: Contact Channels</span>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      placeholder="m.vance@auracapital.com"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      placeholder="+1 (555) 345-6789"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Account & Project */}
              {currentStep === 3 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Step 3: Account Status & Project</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Account Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ClientItem['status'])}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-white text-xs"
                      >
                        <option value="Active">Active</option>
                        <option value="Onboarding">Onboarding</option>
                        <option value="Completed">Completed</option>
                        <option value="Lead">Lead</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Total Contract Spend</label>
                      <input
                        type="text"
                        value={totalSpend}
                        onChange={(e) => setTotalSpend(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                        placeholder="₹15,00,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Assigned Project</label>
                    <input
                      type="text"
                      value={assignedProject}
                      onChange={(e) => setAssignedProject(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      placeholder="e.g. FinTech Intelligence Hub"
                    />
                  </div>
                </div>
              )}

              </div>
            </div>

            {/* Navigation Controls */}
              <div className="shrink-0 p-4 sm:px-6 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between">
                <div>
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                      className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {currentStep < 3 ? (
                    <button
                      type="submit"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-all"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{editingClient ? 'Save Client Changes' : 'Create Client'}</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
