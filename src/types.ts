export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'layout' | 'creditCard' | 'shoppingCart' | 'database' | 'wand' | 'search' | 'smartphone' | 'code' | 'zap' | string;
  badgeBg: string;
  badgeText?: string;
  features?: string[];
  startingPrice?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline?: string;
  image: string;
  imageUrl?: string; // Alias support
  liveUrl?: string;
  category?: string;
  client?: string;
  summary?: string;
  problem: string;
  solution: string;
  approach?: string;
  userNeeds?: string;
  result: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  techStack?: string[];
  previewUrl?: string;
  year?: string;
  fullCaseStudy?: {
    client: string;
    timeline: string;
    impactDescription: string;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  isPopular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant: 'outline' | 'gradient';
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'compass' | 'penTool' | 'code' | 'shieldCheck' | 'rocket' | string;
  userStory: {
    asA: string;
    iWant: string;
    soThat: string;
  };
  deliverables: string[];
}

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  avatarBg: string;
  content: string;
  rating: number;
  projectType: string;
  category: 'all' | 'ecommerce' | 'saas' | 'redesign' | 'business' | string;
  metricHighlight?: {
    label: string;
    value: string;
  };
  verified?: boolean;
}

export interface ClientItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  avatar: string;
  status: 'Active' | 'Onboarding' | 'Completed' | 'Lead';
  totalSpend: string;
  assignedProject: string;
  startDate: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Closed';
  notes?: string;
}

export type ProjectPhase = 'Discovery' | 'Design' | 'Development' | 'QA & Testing' | 'Launched';

export interface ManagedProject {
  id: string;
  title: string;
  clientName: string;
  clientCompany?: string;
  phase: ProjectPhase;
  progress: number; // 0 - 100
  budget: string;
  startDate?: string;
  dueDate: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  teamLead?: string;
  tasksCompleted: number;
  tasksTotal?: number;
  totalTasks: number;
}

export interface WebsiteAnalytics {
  totalVisitors: string;
  visitorGrowth: string;
  conversionRate: string;
  conversionGrowth: string;
  activeEnquiries: number;
  activeProjectsCount: number;
  avgLighthouseScore: number;
  totalRevenue: string;
  topReferrers: { source: string; percentage: number }[];
  deviceSplit: { device: string; percentage: number }[];
}
