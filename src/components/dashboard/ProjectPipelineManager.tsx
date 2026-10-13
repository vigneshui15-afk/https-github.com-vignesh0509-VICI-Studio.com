import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  IndianRupee, 
  AlertCircle,
  X,
  Sparkles,
  Check,
  Briefcase,
  Layers,
  ListTodo
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ManagedProject } from '../../types';

export const ProjectPipelineManager: React.FC = () => {
  const { managedProjects, addManagedProject, updateManagedProject, deleteManagedProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ManagedProject | null>(null);

  // Step state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states
  // Step 1: Project Identity & Client
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [budget, setBudget] = useState('₹1,50,000');

  // Step 2: Phase, Priority & Timeline
  const [phase, setPhase] = useState<ManagedProject['phase']>('Discovery');
  const [priority, setPriority] = useState<ManagedProject['priority']>('High');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Step 3: Progress & Task Sprints
  const [progress, setProgress] = useState(25);
  const [tasksCompleted, setTasksCompleted] = useState(3);
  const [totalTasks, setTotalTasks] = useState(12);

  const phases: ManagedProject['phase'][] = [
    'Discovery',
    'Design',
    'Development',
    'QA & Testing',
    'Launched'
  ];

  const getPhaseColor = (p: ManagedProject['phase']) => {
    switch (p) {
      case 'Discovery':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Design':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Development':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'QA & Testing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Launched':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityBadge = (p: ManagedProject['priority']) => {
    switch (p) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Low':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setCurrentStep(1);
    setTitle('');
    setClientName('');
    setPhase('Discovery');
    setProgress(15);
    setTasksCompleted(2);
    setTotalTasks(10);
    setDueDate('2026-09-30');
    setStartDate('2026-08-20');
    setBudget('₹1,50,000');
    setPriority('High');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ManagedProject) => {
    setEditingProject(proj);
    setCurrentStep(1);
    setTitle(proj.title);
    setClientName(proj.clientName);
    setPhase(proj.phase);
    setProgress(proj.progress);
    setTasksCompleted(proj.tasksCompleted);
    setTotalTasks(proj.totalTasks || proj.tasksTotal || 10);
    setDueDate(proj.dueDate || '2026-09-30');
    setStartDate(proj.startDate || '2026-08-01');
    setBudget(proj.budget || '₹1,25,000');
    setPriority(proj.priority || 'Medium');
    setIsModalOpen(true);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!title.trim() || !clientName.trim()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      handleFinalSave();
    }
  };

  const handleFinalSave = () => {
    if (!title || !clientName) return;

    const payload: Partial<ManagedProject> = {
      title,
      clientName,
      phase,
      progress,
      tasksCompleted,
      totalTasks,
      tasksTotal: totalTasks,
      dueDate,
      startDate,
      budget,
      priority
    };

    if (editingProject) {
      updateManagedProject(editingProject.id, payload);
    } else {
      addManagedProject({
        ...payload,
        id: `mp-${Date.now()}`
      } as ManagedProject);
    }
    setIsModalOpen(false);
  };

  const handleAdvancePhase = (p: ManagedProject) => {
    const currentIndex = phases.indexOf(p.phase);
    if (currentIndex < phases.length - 1) {
      const nextPhase = phases[currentIndex + 1];
      const newProgress = Math.min(100, Math.round(((currentIndex + 2) / phases.length) * 100));
      const totTasks = p.totalTasks || p.tasksTotal || 10;
      updateManagedProject(p.id, {
        phase: nextPhase,
        progress: newProgress,
        tasksCompleted: Math.min(totTasks, p.tasksCompleted + 2)
      });
    }
  };

  const stepList = [
    { num: 1, title: 'Project Info', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { num: 2, title: 'Phase & Dates', icon: <Layers className="w-3.5 h-3.5" /> },
    { num: 3, title: 'Tasks & Progress', icon: <ListTodo className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">Project Operations Pipeline</h3>
          <p className="text-xs text-gray-500">Track client project stages from Discovery through Final Launch in real time</p>
        </div>

        <button
          onClick={openAddModal}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* 5-Phase Pipeline Stage Overview Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {phases.map((stageName, idx) => {
          const count = managedProjects.filter(p => p.phase === stageName).length;
          return (
            <div key={stageName} className="bg-white p-3 rounded-xl border border-gray-100 shadow-2xs text-center">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Phase {idx + 1}</span>
              <span className="text-xs font-bold text-gray-800 block truncate">{stageName}</span>
              <span className="text-sm font-black text-purple-700 mt-1 inline-block">{count} Active</span>
            </div>
          );
        })}
      </div>

      {/* Projects Table Format */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Project & Client</th>
                <th className="py-3.5 px-4">Current Stage</th>
                <th className="py-3.5 px-4">Progress</th>
                <th className="py-3.5 px-4">Sprint Tasks</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Budget</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {managedProjects.map((proj) => {
                const tot = proj.totalTasks || proj.tasksTotal || 10;
                return (
                  <tr key={proj.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-bold text-gray-900 block text-xs">{proj.title}</span>
                        <span className="text-gray-500 text-[11px]">Client: {proj.clientName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getPhaseColor(proj.phase)}`}>
                        {proj.phase}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-gray-700">
                          <span>{proj.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-700">
                        {proj.tasksCompleted} / {tot} Done
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${getPriorityBadge(proj.priority)}`}>
                        {proj.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-gray-900">
                      {proj.budget}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                      {proj.dueDate || 'Sep 2026'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {proj.phase !== 'Launched' && (
                          <button
                            onClick={() => handleAdvancePhase(proj)}
                            className="cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-colors inline-flex items-center gap-1"
                            title="Advance to next phase"
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          onClick={() => openEditModal(proj)}
                          className="cursor-pointer p-1.5 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                          title="Edit details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              deleteManagedProject(proj.id);
                            }
                          }}
                          className="cursor-pointer p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step Add / Edit Managed Project Modal */}
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
                  PROJECT OPERATIONS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {editingProject ? 'Edit Managed Project' : 'Create Managed Project'}
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
              {/* STEP 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Step 1: Project Identity & Client</span>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      placeholder="e.g. NextGen Mobile Banking Experience"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Client Name *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                        placeholder="e.g. Elena Rostova"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Project Budget</label>
                      <input
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                        placeholder="₹1,50,000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Phase & Timeline */}
              {currentStep === 2 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Step 2: Phase, Priority & Timeline</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Current Pipeline Phase</label>
                      <select
                        value={phase}
                        onChange={(e) => setPhase(e.target.value as ManagedProject['phase'])}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-white text-xs"
                      >
                        {phases.map(ph => <option key={ph} value={ph}>{ph}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Priority Level</label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as ManagedProject['priority'])}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none bg-white text-xs"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Project Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Target Due Date</label>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Tasks & Completion */}
              {currentStep === 3 && (
                <div className="space-y-3.5 animate-in fade-in duration-150">
                  <div className="border-b border-gray-100 pb-1.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Step 3: Progress & Task Sprints</span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block font-bold text-gray-700">Progress Completion</label>
                      <span className="font-bold text-purple-700 text-xs">{progress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Completed Sprint Tasks</label>
                      <input
                        type="number"
                        min="0"
                        value={tasksCompleted}
                        onChange={(e) => setTasksCompleted(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Total Sprint Tasks</label>
                      <input
                        type="number"
                        min="1"
                        value={totalTasks}
                        onChange={(e) => setTotalTasks(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:border-purple-500 outline-none text-xs"
                      />
                    </div>
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
                      <span>{editingProject ? 'Save Project Changes' : 'Create Project'}</span>
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
