import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Server, 
  ShieldCheck, 
  TrendingUp, 
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  Database,
  ArrowRight,
  Zap,
  CheckCircle2,
  Lock,
  Activity,
  Code2,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { experienceList } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'impact'>('overview');
  const [activeNode, setActiveNode] = useState<number>(0);
  const [liveReqCount, setLiveReqCount] = useState(1284);

  // Simulate real-time live telemetry counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveReqCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const architectureNodes = [
    {
      id: "client",
      title: "React.js Client Interface",
      tech: "React 18 • Responsive UI • JWT Client State",
      description: "Interactive single-page application with role-based navigation and sub-100ms API response handlers.",
      icon: Layers,
      color: "from-cyan-500 to-blue-600",
      accent: "text-cyan-400",
      border: "border-cyan-500/40",
      bg: "bg-cyan-950/30",
      metric: "Sub-100ms Latency"
    },
    {
      id: "gateway",
      title: "API Gateway & Auth Layer",
      tech: "Node.js • Express.js • JWT Security",
      description: "Secure RESTful routing middleware verifying tokens, validating payload schemas, and protecting private endpoints.",
      icon: ShieldCheck,
      color: "from-indigo-500 to-purple-600",
      accent: "text-indigo-400",
      border: "border-indigo-500/40",
      bg: "bg-indigo-950/30",
      metric: "Role-Based Access Control"
    },
    {
      id: "engine",
      title: "Core Service Modules",
      tech: "Express Routing • Async I/O • Business Logic",
      description: "3 production-ready modules managing transaction workflows, data aggregation, and background jobs.",
      icon: Cpu,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-950/30",
      metric: "1,000+ Daily Transactions"
    },
    {
      id: "database",
      title: "MongoDB Persistence Tier",
      tech: "MongoDB • Mongoose ODM • Optimized Indexing",
      description: "Scalable document database hosting 5,000+ user records with fast schema indexing and high read throughput.",
      icon: Database,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-950/30",
      metric: "5,000+ User Records"
    }
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 relative bg-[#080b12] border-t border-slate-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Subtle geometric background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 text-xs font-mono mb-3 shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work History & Engineering Impact</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>Professional Experience</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse hidden sm:inline-block" />
              </h2>
              <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
                Hands-on full-stack development experience designing production-grade MERN architectures, securing REST endpoints, and optimizing throughput.
              </p>
            </div>

            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold">MERN Microservices</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1 text-cyan-300">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>{liveReqCount.toLocaleString()} req/day</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Cards Stack */}
        <div className="space-y-8">
          {experienceList.map((exp) => (
            <motion.div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative rounded-2xl bg-[#0b0f19] border border-slate-800/90 hover:border-indigo-500/50 transition-all duration-300 shadow-2xl overflow-hidden"
            >
              {/* Glowing animated accent banner line */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

              <div className="p-6 sm:p-8 lg:p-10">
                {/* Header Row: Role, Company, and Duration */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 p-[1px] shrink-0 shadow-lg shadow-indigo-500/20"
                    >
                      <div className="w-full h-full bg-[#0d1220] rounded-[15px] flex items-center justify-center">
                        <Briefcase className="w-7 h-7 text-cyan-400" />
                      </div>
                    </motion.div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <span className="text-slate-500 font-light text-lg hidden sm:inline">|</span>
                        <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300">
                          {exp.company}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs font-mono text-slate-400">
                        {exp.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                        {exp.employmentType && (
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                            {exp.employmentType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 w-fit lg:self-start shadow-sm">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold">{exp.duration}</span>
                  </div>
                </div>

                {/* Interactive Mode Switcher Tabs */}
                <div className="flex items-center gap-2 mt-6 p-1 bg-slate-900/80 rounded-xl border border-slate-800 w-fit font-mono text-xs">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'overview'
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Overview & Metrics</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'architecture'
                        ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    <span>System Architecture Graphic</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('impact')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'impact'
                        ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Impact & Milestones</span>
                  </button>
                </div>

                {/* TAB 1: Overview & High-Impact Metric Cards */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 mt-6"
                  >
                    {/* Key Metrics Highlight Grid with Animated Glow */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Metric 1 */}
                      <motion.div 
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="relative bg-gradient-to-b from-[#0f172a] to-[#0b0f19] border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg overflow-hidden group/card"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover/card:bg-emerald-500/20 transition-all pointer-events-none" />
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center shadow-inner">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                          </div>
                          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                            PROD WORKLOAD
                          </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-tight">
                          1,000+
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-1">
                          Daily Transactions Processed
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>99.9% Pipeline Reliability</span>
                        </div>
                      </motion.div>

                      {/* Metric 2 */}
                      <motion.div 
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="relative bg-gradient-to-b from-[#0f172a] to-[#0b0f19] border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg overflow-hidden group/card"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover/card:bg-cyan-500/20 transition-all pointer-events-none" />
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center shadow-inner">
                            <Server className="w-5 h-5 text-cyan-400" />
                          </div>
                          <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                            DATABASE SCALE
                          </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-tight">
                          5,000+
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-1">
                          User Records & RBAC Auth
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <Lock className="w-3 h-3 text-cyan-400" />
                          <span>JWT Access Control</span>
                        </div>
                      </motion.div>

                      {/* Metric 3 */}
                      <motion.div 
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="relative bg-gradient-to-b from-[#0f172a] to-[#0b0f19] border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-lg overflow-hidden group/card"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover/card:bg-indigo-500/20 transition-all pointer-events-none" />
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center shadow-inner">
                            <ShieldCheck className="w-5 h-5 text-indigo-400" />
                          </div>
                          <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                            CODE QUALITY
                          </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-tight">
                          -40%
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-1">
                          Defect Reduction via Reviews
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                          <Zap className="w-3 h-3 text-indigo-400" />
                          <span>Optimized Refactoring</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bullet Points with Interactive Hover */}
                    <div className="space-y-3.5">
                      {exp.description.map((point, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 6 }}
                          className="flex items-start gap-3.5 text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all shadow-sm"
                        >
                          <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-slate-200">{point}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: Interactive System Architecture Flow Diagram */}
                {activeTab === 'architecture' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-6"
                  >
                    <div className="p-5 sm:p-6 bg-[#080d1a] border border-slate-800 rounded-2xl">
                      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Workflow className="w-4 h-4 text-cyan-400" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            MERN Production Telemetry & Data Flow
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40 animate-pulse">
                          LIVE ACTIVE PIPELINE
                        </span>
                      </div>

                      {/* Interactive Architecture Nodes Flow */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
                        {architectureNodes.map((node, i) => {
                          const IconComp = node.icon;
                          const isSelected = activeNode === i;
                          return (
                            <motion.button
                              key={node.id}
                              onClick={() => setActiveNode(i)}
                              whileHover={{ y: -3 }}
                              className={`text-left p-4 rounded-xl border transition-all relative ${
                                isSelected 
                                  ? `${node.bg} ${node.border} ring-1 ring-cyan-400/50 shadow-lg` 
                                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {/* Step Badge */}
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-[10px] font-bold text-slate-400">
                                  TIER 0{i + 1}
                                </span>
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${node.bg} ${node.accent} border ${node.border}`}>
                                  <IconComp className="w-4 h-4" />
                                </div>
                              </div>

                              <h4 className="text-sm font-bold text-white mb-1">
                                {node.title}
                              </h4>
                              <p className="text-[11px] font-mono text-slate-400 line-clamp-1 mb-2">
                                {node.tech}
                              </p>

                              <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit ${node.bg} ${node.accent} border ${node.border}`}>
                                {node.metric}
                              </div>

                              {/* Selected Pointer Indicator */}
                              {isSelected && (
                                <motion.div 
                                  layoutId="node-arrow"
                                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#080d1a] border-b border-r border-cyan-400 rotate-45"
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Selected Node Deep Dive Details */}
                      <motion.div 
                        key={activeNode}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {architectureNodes[activeNode].title}
                            </span>
                            <span className="text-cyan-400">({architectureNodes[activeNode].tech})</span>
                          </div>
                          <p className="text-slate-300 text-xs font-sans">
                            {architectureNodes[activeNode].description}
                          </p>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-bold shrink-0">
                          {architectureNodes[activeNode].metric}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: Technical Impact & Code Quality Milestones */}
                {activeTab === 'impact' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-800/40 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Role-Based Authentication Engine</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          Architected stateless JSON Web Token (JWT) authorization flows with token refresh mechanisms, encrypting private user routes and safeguarding 5,000+ production records.
                        </p>
                        <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-indigo-300">
                          <span className="px-2 py-0.5 rounded bg-indigo-900/60 border border-indigo-700/50">HMAC-SHA256</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-900/60 border border-indigo-700/50">Zero-Trust RBAC</span>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/40 space-y-2">
                        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                          <Zap className="w-4 h-4" />
                          <span>Code Review & Defect Reduction</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          Spearheaded structured peer code reviews, standardized async error handling wrappers, and eliminated redundant queries, cutting overall defect frequency by 40%.
                        </p>
                        <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-cyan-300">
                          <span className="px-2 py-0.5 rounded bg-cyan-900/60 border border-cyan-700/50">-40% Bugs</span>
                          <span className="px-2 py-0.5 rounded bg-cyan-900/60 border border-cyan-700/50">Refactored Clean Code</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tech Stack Pills */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Technologies Deployed:</span>
                  </span>
                  {exp.skills.map((tech, idx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-slate-800 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
