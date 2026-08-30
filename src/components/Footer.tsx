import React from 'react';
import { ArrowUp, Github, Linkedin, Code2, Mail, Heart, Terminal, Database } from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface FooterProps {
  onResumeClick: () => void;
  onTerminalOpen: () => void;
  onStandaloneClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onResumeClick, 
  onTerminalOpen,
  onStandaloneClick 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080e] border-t border-slate-900 py-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand & Tag */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-wide">
                {profileData.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                Software Engineer
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Computer Science & Engineering &bull; V.S.B College of Engineering Technical Campus
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileData.leetcode}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 transition-all"
              aria-label="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {onStandaloneClick && (
              <button
                onClick={onStandaloneClick}
                className="p-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-700/60 text-emerald-400 transition-all"
                title="View HTML, CSS, JS + Google Apps Script Code"
              >
                <Database className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onTerminalOpen}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 transition-all"
              title="Open CLI Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <p>
            &copy; {new Date().getFullYear()} Sabari Narayanan D. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {onStandaloneClick && (
              <>
                <button onClick={onStandaloneClick} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  HTML/CSS/JS + Sheets DB
                </button>
                <span>&bull;</span>
              </>
            )}
            <button onClick={onResumeClick} className="hover:text-cyan-400 transition-colors">
              View Resume
            </button>
            <span>&bull;</span>
            <a href={`mailto:${profileData.email}`} className="hover:text-cyan-400 transition-colors">
              {profileData.email}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
