import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Server, 
  ShieldCheck, 
  TrendingUp, 
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';
import { experienceList } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative bg-[#080b12] border-t border-slate-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work History & Industry Impact</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>Professional Experience</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse hidden sm:inline-block" />
              </h2>
              <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
                Hands-on software engineering experience building scalable full-stack modules, securing enterprise endpoints, and driving code quality.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Production MERN Stack Experience</span>
            </div>
          </div>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-8">
          {experienceList.map((exp) => (
            <div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              className="group relative rounded-2xl bg-[#0b0f19] border border-slate-800/90 hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-950/20 overflow-hidden"
            >
              {/* Subtle top glowing highlight line */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-sky-500" />

              <div className="p-6 sm:p-8 lg:p-10">
                {/* Header Row: Role, Company, and Duration */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 p-[1px] shrink-0 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-[#0d1220] rounded-[11px] flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <span className="text-slate-500 font-light text-lg hidden sm:inline">|</span>
                        <span className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300">
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
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                            {exp.employmentType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs font-mono text-cyan-300 w-fit lg:self-start">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold">{exp.duration}</span>
                  </div>
                </div>

                {/* Key Metrics Highlight Grid */}
                {exp.stats && exp.stats.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                    {exp.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0e1424]/80 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center shrink-0">
                          {idx === 0 ? (
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                          ) : idx === 1 ? (
                            <Server className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <ShieldCheck className="w-4 h-4 text-indigo-400" />
                          )}
                        </div>
                        <div>
                          <span className="block text-base font-mono font-bold text-white tracking-tight">
                            {stat.value}
                          </span>
                          <span className="block text-[11px] text-slate-400 font-medium">
                            {stat.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                <div className="space-y-3.5 my-6">
                  {exp.description.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60 hover:border-slate-700/80 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Technologies:</span>
                  </span>
                  {exp.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
