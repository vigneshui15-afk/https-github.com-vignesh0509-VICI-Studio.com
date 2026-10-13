import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ServiceItem, 
  ProjectItem, 
  TestimonialItem, 
  ClientItem, 
  EnquiryItem, 
  ManagedProject, 
  WebsiteAnalytics 
} from '../types';
import { 
  servicesData as defaultServices, 
  projectsData as defaultProjects, 
  testimonialsData as defaultTestimonials, 
  initialClients as defaultClients, 
  initialEnquiries as defaultEnquiries, 
  initialManagedProjects as defaultManagedProjects, 
  initialAnalytics as defaultAnalytics 
} from '../data/siteData';

interface DataContextType {
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  clients: ClientItem[];
  enquiries: EnquiryItem[];
  managedProjects: ManagedProject[];
  analytics: WebsiteAnalytics;
  // Services operations
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  // Projects operations
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  // Testimonials operations
  addTestimonial: (testimonial: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  // Clients operations
  addClient: (client: Omit<ClientItem, 'id'>) => void;
  updateClient: (id: string, updated: Partial<ClientItem>) => void;
  deleteClient: (id: string) => void;
  // Enquiries operations
  addEnquiry: (enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: EnquiryItem['status'], notes?: string) => void;
  deleteEnquiry: (id: string) => void;
  // Managed projects operations
  addManagedProject: (project: Omit<ManagedProject, 'id'>) => void;
  updateManagedProject: (id: string, updated: Partial<ManagedProject>) => void;
  deleteManagedProject: (id: string) => void;
  // Reset all to defaults
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'vici_services_data_inr_v1',
  PROJECTS: 'vici_projects_data_inr_v1',
  TESTIMONIALS: 'vici_testimonials_data_inr_v1',
  CLIENTS: 'vici_clients_data_inr_v1',
  ENQUIRIES: 'vici_enquiries_data_inr_v1',
  MANAGED_PROJECTS: 'vici_managed_projects_data_inr_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to defaults (with automatic migration to INR)
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If any service still has $, invalidate and use default INR services
        const hasDollar = parsed.some((s: ServiceItem) => s.startingPrice?.includes('$'));
        if (!hasDollar) return parsed;
      } catch {
        // fallback
      }
    }
    return defaultServices;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  const [clients, setClients] = useState<ClientItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.some((c: ClientItem) => c.totalSpend?.includes('$'))) return parsed;
      } catch {
        // fallback
      }
    }
    return defaultClients;
  });

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.some((e: EnquiryItem) => e.budget?.includes('$'))) return parsed;
      } catch {
        // fallback
      }
    }
    return defaultEnquiries;
  });

  const [managedProjects, setManagedProjects] = useState<ManagedProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MANAGED_PROJECTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.some((m: ManagedProject) => m.budget?.includes('$'))) return parsed;
      } catch {
        // fallback
      }
    }
    return defaultManagedProjects;
  });

  const [analytics] = useState<WebsiteAnalytics>(defaultAnalytics);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MANAGED_PROJECTS, JSON.stringify(managedProjects));
  }, [managedProjects]);

  // Service mutations
  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const item: ServiceItem = {
      ...newService,
      id: `service-${Date.now()}`
    };
    setServices((prev) => [item, ...prev]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Project mutations
  const addProject = (newProject: Omit<ProjectItem, 'id'>) => {
    const item: ProjectItem = {
      ...newProject,
      id: `proj-${Date.now()}`
    };
    setProjects((prev) => [item, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Testimonial mutations
  const addTestimonial = (newTestimonial: Omit<TestimonialItem, 'id'>) => {
    const item: TestimonialItem = {
      ...newTestimonial,
      id: `test-${Date.now()}`
    };
    setTestimonials((prev) => [item, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Client mutations
  const addClient = (newClient: Omit<ClientItem, 'id'>) => {
    const item: ClientItem = {
      ...newClient,
      id: `client-${Date.now()}`
    };
    setClients((prev) => [item, ...prev]);
  };

  const updateClient = (id: string, updated: Partial<ClientItem>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  // Enquiry mutations
  const addEnquiry = (enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const item: EnquiryItem = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: 'Just now',
      status: 'New'
    };
    setEnquiries((prev) => [item, ...prev]);
  };

  const updateEnquiryStatus = (id: string, status: EnquiryItem['status'], notes?: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, ...(notes !== undefined ? { notes } : {}) } : e))
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // Managed Project mutations
  const addManagedProject = (project: Omit<ManagedProject, 'id'>) => {
    const item: ManagedProject = {
      ...project,
      id: `mp-${Date.now()}`
    };
    setManagedProjects((prev) => [item, ...prev]);
  };

  const updateManagedProject = (id: string, updated: Partial<ManagedProject>) => {
    setManagedProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteManagedProject = (id: string) => {
    setManagedProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    setServices(defaultServices);
    setProjects(defaultProjects);
    setTestimonials(defaultTestimonials);
    setClients(defaultClients);
    setEnquiries(defaultEnquiries);
    setManagedProjects(defaultManagedProjects);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.MANAGED_PROJECTS);
  };

  return (
    <DataContext.Provider
      value={{
        services,
        projects,
        testimonials,
        clients,
        enquiries,
        managedProjects,
        analytics,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addClient,
        updateClient,
        deleteClient,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        addManagedProject,
        updateManagedProject,
        deleteManagedProject,
        resetToDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
