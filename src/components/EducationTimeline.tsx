import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  HeartHandshake, 
  Users, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { educationList, volunteeringList } from '../data/portfolioData';

export const EducationTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 relative bg-[#080b12] border-t border-slate-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Community Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Leadership
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Academic milestones in Computer Science Engineering alongside active leadership and technical community volunteering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Education Path */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white tracking-wide">
                Academic Background
              </h3>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 space-y-10 pl-6">
              {educationList.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline node dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#080b12] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />

                  <div className="bg-[#0b0f19] border border-slate-800/80 hover:border-slate-700 p-6 rounded-2xl transition-all shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.duration}</span>
                      </span>
                      <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                        {edu.score}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mt-2">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-medium text-slate-300 mt-0.5">
                      {edu.institution}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{edu.location}</span>
                    </div>

                    {/* Coursework list */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <p className="text-xs font-mono text-slate-400 mb-2">Key Coursework:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((course) => (
                          <span
                            key={course}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    {edu.highlights && (
                      <div className="mt-4 space-y-1.5">
                        {edu.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Volunteering & Leadership Experience */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
              <HeartHandshake className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xl font-bold text-white tracking-wide">
                Leadership & Volunteering
              </h3>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 space-y-10 pl-6">
              {volunteeringList.map((vol) => (
                <div key={vol.id} className="relative group">
                  {/* Timeline node dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#080b12] border-2 border-indigo-400 group-hover:bg-indigo-400 transition-colors" />

                  <div className="bg-[#0b0f19] border border-slate-800/80 hover:border-slate-700 p-6 rounded-2xl transition-all shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-indigo-400 border border-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{vol.duration}</span>
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                        Campus Leadership
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mt-2">
                      {vol.role}
                    </h4>
                    <p className="text-sm font-medium text-slate-300 mt-0.5">
                      {vol.organization}
                    </p>

                    {/* Bullet descriptions */}
                    <div className="mt-4 space-y-2">
                      {vol.description.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                          <span className="text-indigo-400 font-bold mt-0.5">&bull;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Impact banner */}
                    <div className="mt-4 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 font-medium">
                      🚀 {vol.impact}
                    </div>

                    {/* Skills gained */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1.5">
                        {vol.skillsGained.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-indigo-300 border border-slate-800 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
