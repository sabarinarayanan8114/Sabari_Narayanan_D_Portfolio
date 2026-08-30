import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Calendar,
  Layers,
  ChevronRight,
  Flame,
  Zap,
  CheckCircle2,
  BookmarkCheck,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { certificationsList, achievementsList, profileData } from '../data/portfolioData';

interface CertificationsAchievementsProps {
  onShowToast: (msg: string) => void;
}

type TabType = 'all' | 'certifications' | 'hackathons';

export const CertificationsAchievements: React.FC<CertificationsAchievementsProps> = ({ onShowToast }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCopyCredential = (id: string, name: string, e?: React.MouseEvent) => {
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { x, y },
        colors: ['#06b6d4', '#10b981', '#f59e0b', '#3b82f6'],
        disableForReducedMotion: true,
        ticks: 200,
        scalar: 0.8
      });
    }

    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
    onShowToast(`Credential ID for ${name} copied to clipboard!`);
  };

  const getCertAccentColor = (id: string) => {
    switch (id) {
      case 'hackerrank-java':
        return {
          border: 'group-hover:border-amber-500/50',
          glow: 'group-hover:shadow-amber-500/10',
          iconBg: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
          badge: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
          accent: 'from-amber-500 to-orange-500'
        };
      case 'nptel-big-data':
        return {
          border: 'group-hover:border-cyan-500/50',
          glow: 'group-hover:shadow-cyan-500/10',
          iconBg: 'bg-cyan-950/40 text-cyan-400 border-cyan-800/60',
          badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/40',
          accent: 'from-cyan-500 to-blue-500'
        };
      case 'nptel-cloud':
        return {
          border: 'group-hover:border-sky-500/50',
          glow: 'group-hover:shadow-sky-500/10',
          iconBg: 'bg-sky-950/40 text-sky-400 border-sky-800/60',
          badge: 'bg-sky-950/60 text-sky-300 border-sky-800/40',
          accent: 'from-sky-500 to-indigo-500'
        };
      case 'nasscom-cloud':
      default:
        return {
          border: 'group-hover:border-indigo-500/50',
          glow: 'group-hover:shadow-indigo-500/10',
          iconBg: 'bg-indigo-950/40 text-indigo-400 border-indigo-800/60',
          badge: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/40',
          accent: 'from-indigo-500 to-purple-500'
        };
    }
  };

  return (
    <section id="certifications" className="py-24 relative bg-[#090d16] border-t border-slate-900 overflow-hidden">
      
      {/* Animated Glow Backdrops */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.09, 0.04]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 0.95, 1.1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Stagger Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono shadow-sm">
            <Award className="w-3.5 h-3.5 animate-pulse" />
            <span>Accredited Credentials & Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Hackathon Honors
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified technical credentials issued by NPTEL, HackerRank, and NASSCOM along with national hackathon accomplishments.
          </p>

          {/* Metric Badges Quick Bar */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-2 shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span><strong>4</strong> Official Certifications</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-2 shadow-inner"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span><strong>Top 10 / 50</strong> SIH 2025 Finalist</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-2 shadow-inner"
            >
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>150+</strong> LeetCode Solved (85%+)</span>
            </motion.div>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="pt-6 flex justify-center">
            <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800/90 text-xs font-mono">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all relative ${
                  activeTab === 'all' 
                    ? 'text-white bg-slate-800 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Honors ({certificationsList.length + achievementsList.length})
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all relative ${
                  activeTab === 'certifications' 
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Certifications ({certificationsList.length})
              </button>
              <button
                onClick={() => setActiveTab('hackathons')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all relative ${
                  activeTab === 'hackathons' 
                    ? 'text-amber-300 bg-amber-950/60 border border-amber-800/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hackathons & Code ({achievementsList.length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Section 1: Official Certifications */}
        {(activeTab === 'all' || activeTab === 'certifications') && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/40 text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    Official Certifications
                    <span className="text-xs font-mono font-normal text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40">
                      {certificationsList.length} Verified
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificationsList.map((cert, index) => {
                const isCopied = copiedId === cert.credentialId;
                const styling = getCertAccentColor(cert.id);
                const isHovered = hoveredCard === cert.id;

                return (
                  <motion.div
                    key={cert.id}
                    id={`cert-card-${cert.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    onMouseEnter={() => setHoveredCard(cert.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`relative bg-[#0b0f19] border border-slate-800/80 ${styling.border} ${styling.glow} p-6 rounded-2xl transition-all duration-300 shadow-lg flex flex-col justify-between group overflow-hidden`}
                  >
                    {/* Shimmer Light Sweep on Hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

                    {/* Ambient Glow in Corner */}
                    <div className={`absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br ${styling.accent} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none`} />

                    <div className="space-y-4 relative z-10">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            animate={{ rotate: isHovered ? [0, -6, 6, 0] : 0 }}
                            transition={{ duration: 0.5 }}
                            className={`w-11 h-11 rounded-xl border flex items-center justify-center ${styling.iconBg} shadow-inner shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <Award className="w-5 h-5" />
                          </motion.div>
                          <div>
                            <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                              <span>{cert.title}</span>
                              <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h4>
                            <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                              <span>{cert.issuer}</span>
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-400 border border-slate-800/90 shrink-0 shadow-sm">
                          {cert.issueDate}
                        </span>
                      </div>

                      {/* Skill Tag Pills with Hover micro-lift */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cert.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ scale: 1.05, y: -1 }}
                            className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-mono transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Credential ID Verification Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 relative z-10">
                      {cert.credentialId ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-500">ID:</span>
                          <code className="text-xs font-mono text-cyan-300 bg-slate-900/90 px-2 py-1 rounded border border-slate-800 select-all group-hover:border-cyan-800/50 transition-colors">
                            {cert.credentialId}
                          </code>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleCopyCredential(cert.credentialId!, cert.title, e)}
                            className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700 relative"
                            title="Copy Credential ID"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </motion.button>
                        </div>
                      ) : (
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Industry Standard Accredited</span>
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-semibold tracking-wider">
                          Verified
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Hackathons & Competitive Coding Highlights */}
        {(activeTab === 'all' || activeTab === 'hackathons') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-amber-950/70 border border-amber-800/40 text-amber-400">
                  <Trophy className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    Hackathons & Competitive Honors
                    <span className="text-xs font-mono font-normal text-amber-400 px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/40">
                      National & Collegiate
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievementsList.map((ach, index) => (
                <motion.div
                  key={ach.id}
                  id={`achievement-card-${ach.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className="relative bg-gradient-to-b from-[#0e1424] to-[#0b0f19] border border-slate-800/80 hover:border-amber-500/40 p-6 rounded-2xl transition-all duration-300 shadow-xl flex flex-col justify-between group overflow-hidden"
                >
                  {/* Subtle golden top accent strip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-amber-400/[0.05] to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

                  <div className="space-y-3.5 relative z-10">
                    <div className="flex items-center justify-between">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-700/60 font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>{ach.highlightText}</span>
                      </motion.span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{ach.date}</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {ach.title}
                      </h4>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        {ach.event}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {ach.description}
                    </p>

                    {/* Specialized Animated Visual Stats Bar */}
                    {ach.id === 'leetcode-achievement' && (
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Code2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>DSA Practice Consistency</span>
                          </span>
                          <span className="text-amber-300 font-bold">85%+ Submission Accuracy</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '85%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-sm"
                          />
                        </div>
                      </div>
                    )}

                    {ach.id === 'sih-hackathon-2025' && (
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-cyan-400" />
                            <span>College Level Standings</span>
                          </span>
                          <span className="text-cyan-300 font-bold">Top 10 of 50 Teams</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '80%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {ach.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {ach.id === 'leetcode-achievement' ? (
                      <motion.a
                        whileHover={{ scale: 1.05, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                        href={profileData.leetcode}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-amber-400 hover:text-amber-300 font-mono font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-800/40 hover:bg-amber-950/70 transition-colors"
                      >
                        <span>View LeetCode Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    ) : (
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Institutional Honor</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

