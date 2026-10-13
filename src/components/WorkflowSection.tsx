import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  PenTool, 
  Code, 
  ShieldCheck, 
  Rocket, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: {
    bg: string;
    text: string;
    border: string;
  };
}

const steps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'Aligning on your brand goals, target audience, and roadmap.',
    icon: <Compass className="w-5 h-5" />,
    accent: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
    }
  },
  {
    step: '02',
    title: 'UI/UX Design',
    desc: 'Crafting intuitive user journeys and interactive Figma prototypes.',
    icon: <PenTool className="w-5 h-5" />,
    accent: {
      bg: 'bg-pink-50',
      text: 'text-pink-600',
      border: 'border-pink-100',
    }
  },
  {
    step: '03',
    title: 'Development',
    desc: 'Building high-performance, responsive code with modern tech stacks.',
    icon: <Code className="w-5 h-5" />,
    accent: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
    }
  },
  {
    step: '04',
    title: 'Testing & QA',
    desc: 'Rigorous speed audits, cross-device testing, and SEO checks.',
    icon: <ShieldCheck className="w-5 h-5" />,
    accent: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
    }
  },
  {
    step: '05',
    title: 'Launch',
    desc: 'Deploying to live domain with analytics setup and support.',
    icon: <Rocket className="w-5 h-5" />,
    accent: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
    }
  }
];

export const WorkflowSection: React.FC = () => {
  return (
    <section id="process" className="py-14 sm:py-20 md:py-24 relative bg-[#F8FAFC] border-y border-gray-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl -z-10 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[#7C3AED] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR PROCESS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-2 sm:mb-3">
            How We Work
          </h2>
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            A simple, transparent 5-step process from concept to live deployment.
          </p>
        </motion.div>

        {/* 5 Simple & Neat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              id={`process-card-${item.step}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-4.5 sm:p-6 border border-gray-200/80 shadow-xs hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/5 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Step Number */}
                <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.accent.bg} ${item.accent.text} border ${item.accent.border} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    Step {item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-[#0F172A] text-sm sm:text-base mb-1.5 sm:mb-2">
                  {item.title}
                </h3>

                {/* Short, clean description */}
                <p className="text-gray-600 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Subtle Step Progress Indicator */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-gray-400">
                <span>Phase {item.step} of 05</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
