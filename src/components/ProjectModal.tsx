import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Award, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-[#0d121f] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between bg-[#111827]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                {project.category.toUpperCase()}
              </span>
              {project.badge && (
                <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold">
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-all"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Project Graphic Visual Preview */}
          {project.imageUrl && (
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-lg h-44 sm:h-56 bg-slate-950">
              <img 
                src={project.imageUrl} 
                alt={`${project.title} Interface Graphic`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-transparent to-black/30 pointer-events-none" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                  Architectural Graphic Preview
                </span>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold mb-2">
              System Overview & Problem Statement
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Architectural Features */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold mb-3">
              Key Engineering Highlights
            </h4>
            <div className="space-y-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-slate-200 text-xs sm:text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Breakdown */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-800 text-indigo-300 border border-slate-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono">My Role</span>
              <p className="text-sm font-semibold text-white mt-0.5">{project.role || 'Lead Software Developer'}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono">Performance & Impact</span>
              <p className="text-sm font-semibold text-cyan-400 mt-0.5">{project.metrics || 'Production Standard'}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#111827] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            {project.liveUrl ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Deployment Active</span>
              </span>
            ) : (
              <span>Hackathon Prototype</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-lg shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Launch Live App</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
