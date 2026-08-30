import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  FolderGit2,
  Code,
  Eye,
  Activity,
  Terminal,
  Zap,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projects, projectCategories } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

const getProjectFileName = (id: string) => {
  switch (id) {
    case 'med-health': return 'MedHealthApp.tsx';
    case 'expense-tracker': return 'ExpenseTracker.java';
    case 'alumni-referral-hub': return 'AlumniReferralHub.jsx';
    case 'safety-voyage': return 'SafetyVoyageSIH.py';
    default: return 'ProjectSource.ts';
  }
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category match
      const categoryMatch = 
        activeCategory === 'all' 
          ? true 
          : activeCategory === 'fullstack'
            ? project.category === 'fullstack' || project.category === 'web' || project.category === 'backend-systems'
            : project.category === activeCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      if (!query) return categoryMatch;

      const titleMatch = project.title.toLowerCase().includes(query);
      const subtitleMatch = project.subtitle.toLowerCase().includes(query);
      const descMatch = project.description.toLowerCase().includes(query);
      const techMatch = project.techStack.some(t => t.toLowerCase().includes(query));

      return categoryMatch && (titleMatch || subtitleMatch || descMatch || techMatch);
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative bg-[#080b12] border-t border-slate-900 overflow-hidden">
      
      {/* Background animated ambient lighting */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.06, 0.14, 0.06]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with entrance motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono mb-3 shadow-sm">
              <FolderGit2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Engineered Systems & Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Software Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              End-to-end architectures encompassing real-time healthcare systems, enterprise financial analytics, and distributed cloud applications.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all focus:ring-1 focus:ring-cyan-500/30"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Dynamic Category Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none"
        >
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800/80 rounded-xl backdrop-blur-md">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  id={`filter-tab-${cat.id}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id as ProjectCategory)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap relative ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800"
          >
            <p className="text-slate-400 text-sm">No projects matching your search criteria "{searchQuery}".</p>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-cyan-400 hover:underline font-mono"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-950/40"
                >
                  {/* Subtle Light-Sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                  {/* Code Window / Terminal Style Header */}
                  <div className="bg-[#090d16] px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block group-hover:brightness-125 transition-all"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block group-hover:brightness-125 transition-all"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block group-hover:brightness-125 transition-all"></span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 ml-2 font-medium flex items-center gap-1.5">
                        <Code className="w-3 h-3 text-cyan-400" />
                        <span className="group-hover:text-slate-200 transition-colors">{getProjectFileName(project.id)}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/40 font-semibold flex items-center gap-1">
                          <Activity className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                          <span>{project.badge}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Top preview visual banner with project graphic and gradient overlay */}
                  <div 
                    onClick={() => onSelectProject(project)}
                    className={`h-48 sm:h-52 bg-gradient-to-br ${project.imageColor || 'from-slate-900 to-slate-950'} relative flex flex-col justify-between border-b border-slate-800/60 overflow-hidden cursor-pointer`}
                  >
                    {/* Project Graphic Image with Zoom Animation */}
                    {project.imageUrl && (
                      <motion.img 
                        src={project.imageUrl} 
                        alt={`${project.title} Interface Graphic`}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-105" 
                      />
                    )}

                    {/* Gradient vignettes to ensure high contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-black/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                    {/* Top Bar: Category & Performance Pill */}
                    <div className="p-4 relative z-10 flex items-center justify-between">
                      <span className="text-[11px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-black/70 text-cyan-300 border border-cyan-500/30 backdrop-blur-md font-semibold shadow-sm group-hover:border-cyan-400/60 transition-colors">
                        {project.category}
                      </span>
                      {project.metrics && (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1 shadow-sm">
                          <Zap className="w-3 h-3 text-emerald-400" />
                          <span>{project.metrics}</span>
                        </span>
                      )}
                    </div>

                    {/* Bottom Bar: Project Title & Quick Preview Pill */}
                    <div className="p-4 relative z-10">
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-md flex items-center gap-2">
                            <span>{project.title}</span>
                            <Sparkles className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </h3>
                          <p className="text-xs text-slate-300 font-mono mt-0.5 line-clamp-1 drop-shadow">
                            {project.subtitle}
                          </p>
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 backdrop-blur-sm shadow-md"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5 relative z-10">
                    <div className="space-y-4">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Architectural Feature Bullets */}
                      <div className="space-y-2 pt-1">
                        {project.keyFeatures.slice(0, 2).map((feat, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ x: 2 }}
                            className="flex items-start gap-2 text-xs text-slate-400 bg-slate-900/40 hover:bg-slate-900/70 p-2 rounded-lg border border-slate-800/60 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{feat}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack badges */}
                    <div className="space-y-4 pt-2 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.06, y: -1 }}
                            className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-cyan-800/60 hover:text-white transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Actions Row */}
                      <div className="flex items-center justify-between pt-2">
                        <motion.button
                          whileHover={{ scale: 1.03, x: 2 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>System Details</span>
                        </motion.button>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-mono shadow-sm"
                              title="GitHub Source"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Code</span>
                            </motion.a>
                          )}

                          {project.liveUrl && (
                            <motion.a
                              whileHover={{ scale: 1.05, y: -1 }}
                              whileTap={{ scale: 0.95 }}
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
                              title={`Launch ${project.title}`}
                            >
                              <span>Live Demo</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};

