import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  IndianRupee, 
  Mail, 
  Layers, 
  CheckCircle2, 
  Activity,
  Globe,
  Smartphone,
  Laptop,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AnalyticsOverview: React.FC = () => {
  const { analytics, enquiries, projects, clients, managedProjects } = useData();

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const activePipelineCount = managedProjects.filter(p => p.phase !== 'Launched').length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#312E81] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              Website Health: Exceptional (99/100)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Studio & Website Executive Overview
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-normal mt-1 max-w-xl">
              Real-time telemetry on agency client inquiries, live conversions, project milestones, and revenue pipeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center">
              <span className="text-[11px] text-gray-300 block font-medium">Core Web Vitals</span>
              <span className="text-lg font-black text-emerald-400">99 / 100</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center">
              <span className="text-[11px] text-gray-300 block font-medium">Avg Page Load</span>
              <span className="text-lg font-black text-purple-300">0.72s</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Visitors */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Monthly Traffic</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{analytics.totalVisitors}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{analytics.visitorGrowth}</span>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{analytics.conversionRate}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{analytics.conversionGrowth}</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{analytics.totalRevenue}</div>
            <div className="text-xs text-gray-500 font-medium mt-1">
              From {clients.length} active client accounts
            </div>
          </div>
        </div>

        {/* Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Live Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{enquiries.length}</div>
            <div className="text-xs text-orange-600 font-semibold mt-1">
              {newEnquiriesCount} new leads requiring follow-up
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Traffic Referrers */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Traffic Channels & Attribution</h3>
              <p className="text-xs text-gray-500">Where high-intent client visitors originate</p>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
              Organic + Direct: 68%
            </span>
          </div>

          <div className="space-y-4">
            {analytics.topReferrers.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-700">{item.source}</span>
                  <span className="text-gray-900 font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Device Breakdown</h3>
                <p className="text-xs text-gray-500">Optimized responsive engagement</p>
              </div>
              <Globe className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3">
              {analytics.deviceSplit.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                  <div className="flex items-center gap-2 font-medium text-gray-800">
                    {i === 0 ? <Laptop className="w-4 h-4 text-purple-600" /> : <Smartphone className="w-4 h-4 text-emerald-600" />}
                    <span>{d.device}</span>
                  </div>
                  <span className="font-bold text-gray-900">{d.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Active Pipeline summary */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">Active Production Projects:</span>
            <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              {activePipelineCount} projects in flight
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
