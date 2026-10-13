import { 
  ServiceItem, 
  ProjectItem, 
  PricingPlan, 
  WorkflowStep, 
  WhyChooseItem, 
  TestimonialItem,
  ClientItem,
  EnquiryItem,
  ManagedProject,
  WebsiteAnalytics
} from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'business-websites',
    title: 'Business Websites',
    description: 'We build responsive, multi-page sites that establish authority and convert visitors into loyal customers.',
    iconName: 'layout',
    badgeBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    badgeText: 'text-indigo-600',
    features: ['Custom Brand Architecture', 'Multi-device Responsiveness', 'Lead Generation Funnels', 'High-Speed Page Load'],
    startingPrice: '₹24,999'
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'High-converting single-page designs optimized for specific marketing campaigns and product launches.',
    iconName: 'creditCard',
    badgeBg: 'bg-rose-50 text-rose-500 border border-rose-100',
    badgeText: 'text-rose-500',
    features: ['High-Velocity A/B Testing', 'Conversion Copy Alignment', 'Interactive Micro-animations', 'Seamless Analytics Tracking'],
    startingPrice: '₹14,999'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Robust online stores with secure checkout and seamless UX to drive sales and manage inventory effortlessly.',
    iconName: 'shoppingCart',
    badgeBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    badgeText: 'text-blue-600',
    features: ['Frictionless 1-Click Checkout', 'Inventory & ERP Sync', 'Payment Gateway Integration', 'Cart Abandonment Recovery'],
    startingPrice: '₹44,999'
  },
  {
    id: 'dynamic-websites',
    title: 'Dynamic Web Apps',
    description: 'Custom web applications with complex functionality tailored to your specific business logic and user needs.',
    iconName: 'database',
    badgeBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    badgeText: 'text-purple-600',
    features: ['Client Portals & Dashboards', 'REST/GraphQL API Connectors', 'Real-time WebSocket Data', 'Role-Based Access Control'],
    startingPrice: '₹69,999'
  },
  {
    id: 'redesign',
    title: 'Modern Redesign',
    description: 'Modernize your existing site with a fresh look and improved performance to stay ahead of the competition.',
    iconName: 'wand',
    badgeBg: 'bg-pink-50 text-pink-500 border border-pink-100',
    badgeText: 'text-pink-500',
    features: ['UX/UI Heuristic Audit', 'Modern Design Systems', 'Core Web Vitals Boost', 'Content Migration & SEO Safety'],
    startingPrice: '₹21,999'
  },
  {
    id: 'seo-optimization',
    title: 'SEO & Speed Boost',
    description: 'Strategic optimization to improve your search rankings and drive organic traffic to your digital doorstep.',
    iconName: 'search',
    badgeBg: 'bg-sky-50 text-sky-600 border border-sky-100',
    badgeText: 'text-sky-600',
    features: ['Schema Structured Markup', 'Keyword & Semantic Architecture', 'Technical Core Web Vitals', 'Local & Global Search Dominance'],
    startingPrice: '₹9,999'
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'fintech-dashboard',
    title: 'FinTech Intelligence Hub',
    tagline: 'Enterprise Multi-Asset Investment & Real-Time Portfolio Platform',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://demo-fintech.vicistudio.com',
    category: 'Web Application',
    problem: 'Legacy banking portal suffered high abandonment, clunky 7-step transaction hurdles, and slow data refresh rates.',
    solution: 'Engineered a modern, responsive React/Node financial dashboard with live charts, instant trade execution, and 2-click portfolio rebalancing.',
    approach: 'Conducted user shadowing sessions with 30+ portfolio managers to map cognitive friction. Designed high-density financial component architecture with sub-second WebSocket updates and zero-clutter typography.',
    userNeeds: 'Real-time telemetry, bank-grade encryption, and seamless mobile portfolio monitoring.',
    result: '40% boost in 90-day retention and 52% reduction in client support tickets.',
    tags: ['FinTech App', 'Real-Time Analytics', 'Design System'],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Recharts', 'WebSockets', 'Node.js'],
    metrics: [
      { label: 'User Retention', value: '+40%' },
      { label: 'Task Completion Speed', value: '2.5x Faster' },
      { label: 'Lighthouse Score', value: '99/100' }
    ],
    fullCaseStudy: {
      client: 'Aura Capital Global',
      timeline: '6 Weeks',
      impactDescription: 'Redesigned the multi-asset investment portfolio view from the ground up, reducing daily transaction steps from 7 to 2 while introducing live interactive charts.',
      testimonial: {
        quote: 'Vici Studio turned our complex financial data pipelines into a sleek, intuitive experience our high-net-worth clients actually love using every day.',
        author: 'Marcus Vance',
        role: 'Chief Product Officer, Aura Capital'
      }
    }
  },
  {
    id: 'ecommerce-rebrand',
    title: 'Velour Living D2C Luxury',
    tagline: 'High-Converting Minimalist Lifestyle & Furniture Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://velour-living.vicistudio.com',
    category: 'E-Commerce',
    problem: 'Mobile checkout drop-off reached 68% due to sluggish 3.4-second load times and complex multi-screen guest checkouts.',
    solution: 'Designed a mobile-first headless storefront with 0.8s load times, Apple Pay/Google Pay 1-touch checkout, and interactive 3D room lookbooks.',
    approach: 'Audited Core Web Vitals to eliminate render-blocking assets. Implemented edge-cached headless Shopify architecture paired with gesture-based swipe drawers and 1-tap payment rails.',
    userNeeds: 'Editorial typography, fluid mobile swipe galleries, and effortless order tracking.',
    result: '25% increase in mobile sales and 4.8% overall conversion rate within 30 days.',
    tags: ['D2C Luxury', 'Headless Commerce', 'Mobile-First'],
    techStack: ['React', 'Next.js', 'Shopify Storefront API', 'Stripe', 'Tailwind CSS'],
    metrics: [
      { label: 'Mobile Revenue', value: '+25%' },
      { label: 'Page Load Speed', value: '0.8s' },
      { label: 'Cart Conversion', value: '4.8%' }
    ],
    fullCaseStudy: {
      client: 'Velour Living Inc.',
      timeline: '4 Weeks',
      impactDescription: 'Engineered a modern, lightning-fast mobile shopping journey featuring micro-interactions, gesture swipe galleries, and Apple Pay/Google Pay instant checkout integration.',
      testimonial: {
        quote: 'Our mobile conversion spiked 25% in the first 30 days after launch. Vici Studio delivered precisely what modern shoppers demand: instant speed and refined elegance.',
        author: 'Elena Rostova',
        role: 'Founder & Creative Director'
      }
    }
  },
  {
    id: 'syncpulse-saas',
    title: 'SyncPulse Cloud Platform',
    tagline: 'Next-Gen Workflow Automation & Team Collaboration Suite',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://syncpulse.vicistudio.com',
    category: 'SaaS Platform',
    problem: 'SaaS onboarding required 45 minutes of manual team training, causing 35% trial-to-paid churn.',
    solution: 'Rebuilt self-serve onboarding, contextual tooltips, role-based visual permission matrices, and dark/light adaptive theming.',
    approach: 'Streamlined multi-step onboarding into an interactive sandbox tutorial. Developed component-driven design tokens ensuring instant dark/light mode parity and responsive layout velocity.',
    userNeeds: 'Zero-friction workspace invitations, drag-and-drop workflow builders, and Slack/Teams integrations.',
    result: '3.4x faster onboarding velocity and 31pt increase in Net Promoter Score.',
    tags: ['SaaS UX', 'Workflow Builder', 'Enterprise'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Motion'],
    metrics: [
      { label: 'Onboarding Speed', value: '3.4x Faster' },
      { label: 'Trial Conversion', value: '+38%' },
      { label: 'NPS Score', value: '82 (+31)' }
    ],
    fullCaseStudy: {
      client: 'SyncPulse Systems',
      timeline: '5 Weeks',
      impactDescription: 'Delivered an interactive component library and zero-latency drag-and-drop pipeline editor that streamlined team collaboration.',
      testimonial: {
        quote: 'The custom interactive dashboard they engineered has completely eliminated our onboarding bottlenecks. Clear milestone updates, zero bloat, and pristine execution.',
        author: 'David Chen',
        role: 'Co-Founder & VP Growth'
      }
    }
  },
  {
    id: 'monolith-architects',
    title: 'Monolith Architectural Studio',
    tagline: 'Award-Winning Spatial Design & Interactive Portfolio Archive',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://monolith-arch.vicistudio.com',
    category: 'Brand & Portfolio',
    problem: 'High-resolution project renderings slowed client presentations and failed to showcase structural materiality.',
    solution: 'Engineered an ultra-fast architectural archive featuring progressive image decoding, blueprint overlays, and full-screen project films.',
    approach: 'Crafted a bespoke editorial layout emphasizing architectural rhythm, progressive WebP image streaming, and buttery smooth WebGL transitions without compromising load performance.',
    userNeeds: 'Bespoke editorial typography, instant high-res imagery, and awards pedigree showcase.',
    result: '180% surge in enterprise RFP inquiries and a perfect 100/100 Core Web Vitals rating.',
    tags: ['Architecture', 'Editorial UX', 'Speed 100'],
    techStack: ['React', 'Tailwind CSS', 'WebGL Canvas', 'Motion', 'Vite'],
    metrics: [
      { label: 'RFP Inquiries', value: '+180%' },
      { label: 'Core Web Vitals', value: '100/100' },
      { label: 'Avg Session Time', value: '4m 12s' }
    ],
    fullCaseStudy: {
      client: 'Monolith Design Labs',
      timeline: '3.5 Weeks',
      impactDescription: 'Created a visually commanding editorial aesthetic with smooth scroll choreography and interactive architectural case breakdowns.',
      testimonial: {
        quote: 'As designers ourselves, we had very exacting standards for typography, spacing, and rhythm. Vici Studio exceeded our expectations with crisp motion design and a fast tech stack.',
        author: 'Rachel Alpert',
        role: 'Principal Architect'
      }
    }
  }
];

export const pricingData: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses and founders launching fast.',
    price: '₹24,999',
    features: [
      'Up to 5 High-Impact Pages',
      'Mobile-First Responsive Design',
      'Technical SEO Foundation',
      'Contact & WhatsApp Lead Capture',
      '2 Weeks Delivery Time'
    ],
    buttonText: 'Choose Starter',
    buttonVariant: 'outline'
  },
  {
    id: 'business',
    name: 'Business Growth',
    description: 'For scaling companies needing maximum conversion & authority.',
    price: '₹49,999',
    isPopular: true,
    features: [
      'Up to 12 Custom Pages / Views',
      'Bespoke Interactive Design System',
      'Advanced On-Page & Schema SEO',
      'CMS & Blog Architecture',
      'Analytics & Speed Optimization (95+)',
      '30-Day Post-Launch Support'
    ],
    buttonText: 'Choose Business',
    buttonVariant: 'gradient'
  },
  {
    id: 'custom',
    name: 'Enterprise / Custom App',
    description: 'Tailored full-stack platforms, portals, and e-commerce.',
    price: 'Custom Quote',
    features: [
      'Unlimited Pages & Custom Logic',
      'Full-Stack App / Portal / Store',
      'API & Database Integrations',
      'Role-Based Auth & Admin Studio',
      'Dedicated WhatsApp & Call Channel',
      'SLA & Priority Iteration Guarantee'
    ],
    buttonText: 'Discuss Enterprise',
    buttonVariant: 'outline'
  }
];

export const workflowSteps: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Strategy',
    subtitle: 'Clarifying Core Objectives',
    description: 'We audit your market landscape, competitive moat, and customer personas to define measurable project KPIs.',
    iconName: 'compass',
    userStory: {
      asA: 'Business Stakeholder',
      iWant: 'a clear strategic roadmap and defined KPIs before code is written',
      soThat: 'every rupee invested directly drives conversions and user retention.'
    },
    deliverables: ['KPI & Scope Blueprint', 'Competitive Benchmark', 'Site Architecture Map']
  },
  {
    stepNumber: '02',
    title: 'UX Flow & Wireframing',
    subtitle: 'Architecting Frictionless Journeys',
    description: 'We construct low-fidelity wireframes and click-through prototypes to test conversion funnels and eliminate drop-offs.',
    iconName: 'penTool',
    userStory: {
      asA: 'First-Time Visitor',
      iWant: 'an intuitive layout that lets me understand the offering in 5 seconds',
      soThat: 'I can complete my goal without confusion or unnecessary steps.'
    },
    deliverables: ['Clickable Wireframe Prototype', 'User Journey Flowchart', 'Copywriting & Content Outline']
  },
  {
    stepNumber: '03',
    title: 'High-Fidelity UI & Motion',
    subtitle: 'Crafting Brand Distinction',
    description: 'We design bespoke typography, sleek dark/light color schemes, responsive layouts, and fluid micro-interactions.',
    iconName: 'code',
    userStory: {
      asA: 'High-Value Customer',
      iWant: 'a modern, visually polished interface with responsive micro-feedback',
      soThat: 'I feel immediate trust in the brand’s professional credibility.'
    },
    deliverables: ['Full Design System & Tokens', 'Interactive Figma/Code Prototypes', 'Responsive Layout Mockups']
  },
  {
    stepNumber: '04',
    title: 'Modern Full-Stack Build',
    subtitle: 'Writing Clean, Resilient Code',
    description: 'We build with TypeScript, modern React, Tailwind CSS, and optimized backend APIs for sub-second responsiveness.',
    iconName: 'shieldCheck',
    userStory: {
      asA: 'Mobile User on 4G',
      iWant: 'pages to render instantly with zero layout shifts or lag',
      soThat: 'I can browse and buy seamlessly even on unstable connections.'
    },
    deliverables: ['Production TypeScript Codebase', 'Accessibility (WCAG AA) Compliance', 'Core Web Vitals 95+ Guarantee']
  },
  {
    stepNumber: '05',
    title: 'Launch, SEO & Handover',
    subtitle: 'Driving Immediate ROI',
    description: 'We deploy to global CDNs, configure domain routing, verify Google search indexing, and train your team on admin controls.',
    iconName: 'rocket',
    userStory: {
      asA: 'Marketing Manager',
      iWant: 'built-in analytics, dynamic SEO metadata, and easy content controls',
      soThat: 'our team can scale campaigns and track ROI from day one.'
    },
    deliverables: ['Production CDN Deployment', 'Google Search Console & Analytics', '30-Day Launch Warranty']
  }
];

export const whyChooseList: WhyChooseItem[] = [
  {
    title: 'Mobile First Precision',
    description: 'Engineered for touch targets, gesture navigation, and fast mobile rendering.'
  },
  {
    title: 'SEO & Speed Optimized',
    description: 'Semantic markup, Schema tags, and Core Web Vitals scores in the top 5%.'
  },
  {
    title: 'Direct Senior Collaboration',
    description: 'No account managers or middle layers. You collaborate directly with lead engineers.'
  },
  {
    title: 'Transparent Flat Pricing',
    description: 'Fixed scopes, clear deliverables, and no hidden maintenance surprises.'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'Marcus Vance',
    role: 'Chief Product Officer',
    company: 'Aura Capital',
    avatarText: 'MV',
    avatarBg: 'from-indigo-600 to-purple-600',
    content: 'Vici Studio turned our complex financial data pipelines into a sleek, intuitive experience our high-net-worth clients actually love using every day. The turnaround time and code quality were exceptional.',
    rating: 5,
    projectType: 'FinTech Portfolio Portal',
    category: 'saas',
    metricHighlight: {
      label: 'Client Retention',
      value: '+40%'
    },
    verified: true
  },
  {
    id: 'test-2',
    author: 'Elena Rostova',
    role: 'Founder & Creative Director',
    company: 'Velour Living',
    avatarText: 'ER',
    avatarBg: 'from-pink-500 to-rose-600',
    content: 'Our mobile conversion spiked 25% in the first 30 days after launch. Vici Studio delivered precisely what modern shoppers demand: sub-second page loads, micro-interactions, and refined visual elegance.',
    rating: 5,
    projectType: 'D2C Luxury E-Commerce',
    category: 'ecommerce',
    metricHighlight: {
      label: 'Mobile Sales',
      value: '+25%'
    },
    verified: true
  },
  {
    id: 'test-3',
    author: 'David Chen',
    role: 'Co-Founder & VP Growth',
    company: 'SyncPulse Systems',
    avatarText: 'DC',
    avatarBg: 'from-blue-600 to-cyan-500',
    content: 'The custom interactive dashboard they engineered has completely eliminated our onboarding bottlenecks. Working with the team felt effortless—clear milestone updates, zero bloat, and pristine execution.',
    rating: 5,
    projectType: 'B2B SaaS Web Application',
    category: 'saas',
    metricHighlight: {
      label: 'Onboarding Velocity',
      value: '3.4x Faster'
    },
    verified: true
  },
  {
    id: 'test-4',
    author: 'Sarah Jenkins',
    role: 'Managing Partner',
    company: 'AeroLine Logistics',
    avatarText: 'SJ',
    avatarBg: 'from-amber-500 to-orange-600',
    content: 'Our old website was holding our enterprise sales conversations back. Vici Studio redesigned everything from the ground up, giving us the corporate credibility we needed to close 7-figure RFPs.',
    rating: 5,
    projectType: 'Corporate Website & Lead Funnel',
    category: 'business',
    metricHighlight: {
      label: 'Enterprise Inquiries',
      value: '+180%'
    },
    verified: true
  },
  {
    id: 'test-5',
    author: 'Liam Gallagher',
    role: 'Head of Brand Marketing',
    company: 'Oasis Wellness Club',
    avatarText: 'LG',
    avatarBg: 'from-emerald-500 to-teal-600',
    content: 'From mobile responsiveness to SEO optimization, every detail was thought through. We rank on page one for our target keywords now and direct membership signups have doubled.',
    rating: 5,
    projectType: 'Membership & Booking Site',
    category: 'redesign',
    metricHighlight: {
      label: 'Direct Signups',
      value: '2x Growth'
    },
    verified: true
  },
  {
    id: 'test-6',
    author: 'Rachel Alpert',
    role: 'Principal Architect',
    company: 'Monolith Design Labs',
    avatarText: 'RA',
    avatarBg: 'from-violet-600 to-indigo-700',
    content: 'As designers ourselves, we had very exacting standards for typography, spacing, and rhythm. Vici Studio exceeded our expectations with crisp motion design and a fast, accessible tech stack.',
    rating: 5,
    projectType: 'Architectural Portfolio',
    category: 'business',
    metricHighlight: {
      label: 'Page Speed Score',
      value: '99/100'
    },
    verified: true
  }
];

export const initialClients: ClientItem[] = [
  {
    id: 'client-1',
    name: 'Marcus Vance',
    company: 'Aura Capital Global',
    email: 'm.vance@auracapital.com',
    phone: '+1 (415) 882-9012',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    totalSpend: '₹14,50,000',
    assignedProject: 'FinTech Intelligence Hub',
    startDate: 'Jan 15, 2026'
  },
  {
    id: 'client-2',
    name: 'Elena Rostova',
    company: 'Velour Living',
    email: 'elena@velourliving.com',
    phone: '+1 (212) 490-3321',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    totalSpend: '₹9,80,000',
    assignedProject: 'Velour Living D2C Luxury',
    startDate: 'Feb 02, 2026'
  },
  {
    id: 'client-3',
    name: 'David Chen',
    company: 'SyncPulse Systems',
    email: 'david@syncpulse.io',
    phone: '+1 (650) 773-1990',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    totalSpend: '₹18,50,000',
    assignedProject: 'SyncPulse Cloud Platform',
    startDate: 'Mar 10, 2026'
  },
  {
    id: 'client-4',
    name: 'Sarah Jenkins',
    company: 'AeroLine Logistics',
    email: 's.jenkins@aeroline.com',
    phone: '+1 (312) 991-4402',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    status: 'Completed',
    totalSpend: '₹11,20,000',
    assignedProject: 'Enterprise Logistics Rebrand',
    startDate: 'Nov 18, 2025'
  },
  {
    id: 'client-5',
    name: 'Rachel Alpert',
    company: 'Monolith Design Labs',
    email: 'rachel@monolithlabs.com',
    phone: '+1 (503) 618-2234',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    totalSpend: '₹12,00,000',
    assignedProject: 'Monolith Architectural Studio',
    startDate: 'Apr 04, 2026'
  }
];

export const initialEnquiries: EnquiryItem[] = [
  {
    id: 'enq-101',
    name: 'Alexandra Wright',
    email: 'alex@luminahealth.com',
    service: 'Business Websites',
    budget: '₹50,000 - ₹1,00,000',
    message: 'We are launching a private health & wellness clinic in Seattle and need an executive 8-page website with direct patient booking integration.',
    createdAt: 'Today at 10:14 AM',
    status: 'New',
    notes: 'High intent lead. Wants launch within 4 weeks.'
  },
  {
    id: 'enq-102',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@zenithtrading.ae',
    service: 'Dynamic Web Apps',
    budget: '₹1,00,000+',
    message: 'Need a real-time commodities dashboard for regional clients with custom chart filters, PDF export, and Arabic/English language toggle.',
    createdAt: 'Yesterday at 3:45 PM',
    status: 'Proposal Sent',
    notes: 'Sent initial wireframe estimation. Follow-up scheduled for Friday.'
  },
  {
    id: 'enq-103',
    name: 'Claire Beauchamp',
    email: 'c.beauchamp@maisonclaire.fr',
    service: 'E-commerce',
    budget: '₹50,000 - ₹1,00,000',
    message: 'Looking to migrate our luxury perfume boutique from WooCommerce to a high-speed custom Shopify storefront.',
    createdAt: '2 days ago',
    status: 'Contacted',
    notes: 'Requested inventory catalog export.'
  },
  {
    id: 'enq-104',
    name: 'Jordan Miller',
    email: 'jordan@hypergrid.tech',
    service: 'Landing Pages',
    budget: '₹25,000 - ₹50,000',
    message: 'We are raising our Seed round in 3 weeks and need a high-converting waitlist page for our AI developer tool.',
    createdAt: '3 days ago',
    status: 'In Progress' as any,
    notes: 'Drafting initial copy structure.'
  }
];

export const initialManagedProjects: ManagedProject[] = [
  {
    id: 'mp-1',
    title: 'FinTech Intelligence Hub (v2)',
    clientName: 'Marcus Vance',
    clientCompany: 'Aura Capital Global',
    phase: 'Development',
    progress: 72,
    budget: '₹1,85,000',
    dueDate: 'Sep 15, 2026',
    priority: 'High',
    teamLead: 'Alex Rivera',
    tasksCompleted: 18,
    totalTasks: 25
  },
  {
    id: 'mp-2',
    title: 'Velour Living Autumn Storefront',
    clientName: 'Elena Rostova',
    clientCompany: 'Velour Living',
    phase: 'QA & Testing',
    progress: 90,
    budget: '₹1,24,000',
    dueDate: 'Sep 02, 2026',
    priority: 'High',
    teamLead: 'Sarah Chen',
    tasksCompleted: 27,
    totalTasks: 30
  },
  {
    id: 'mp-3',
    title: 'Lumina Health Booking Portal',
    clientName: 'Alexandra Wright',
    clientCompany: 'Lumina Clinic',
    phase: 'Design',
    progress: 45,
    budget: '₹98,000',
    dueDate: 'Oct 01, 2026',
    priority: 'Medium',
    teamLead: 'Maya Patel',
    tasksCompleted: 9,
    totalTasks: 20
  },
  {
    id: 'mp-4',
    title: 'SyncPulse Enterprise SSO Connector',
    clientName: 'David Chen',
    clientCompany: 'SyncPulse Systems',
    phase: 'Discovery',
    progress: 20,
    budget: '₹1,40,000',
    dueDate: 'Oct 20, 2026',
    priority: 'Medium',
    teamLead: 'Alex Rivera',
    tasksCompleted: 4,
    totalTasks: 18
  },
  {
    id: 'mp-5',
    title: 'Monolith Architectural VR Showcase',
    clientName: 'Rachel Alpert',
    clientCompany: 'Monolith Design Labs',
    phase: 'Launched',
    progress: 100,
    budget: '₹1,51,000',
    dueDate: 'Aug 10, 2026',
    priority: 'Low',
    teamLead: 'Sarah Chen',
    tasksCompleted: 24,
    totalTasks: 24
  }
];

export const initialAnalytics: WebsiteAnalytics = {
  totalVisitors: '48,240',
  visitorGrowth: '+28.4% vs last mo',
  conversionRate: '4.82%',
  conversionGrowth: '+1.2% this month',
  activeEnquiries: 14,
  activeProjectsCount: 5,
  avgLighthouseScore: 99,
  totalRevenue: '₹66,00,000',
  topReferrers: [
    { source: 'Google Organic Search', percentage: 42 },
    { source: 'Direct / Word of Mouth', percentage: 26 },
    { source: 'LinkedIn & Social', percentage: 18 },
    { source: 'Design Directories (Awwwards/Dribbble)', percentage: 14 }
  ],
  deviceSplit: [
    { device: 'Desktop (1440px+)', percentage: 56 },
    { device: 'Mobile iOS / Android', percentage: 38 },
    { device: 'Tablet / iPad', percentage: 6 }
  ]
};

