import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Code2, 
  FileText, 
  Send, 
  Github, 
  Linkedin, 
  Terminal,
  ExternalLink,
  Database,
  FileSpreadsheet
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface NavbarProps {
  onResumeClick: () => void;
  onTerminalToggle: () => void;
  onStandaloneClick?: () => void;
  onGoogleSheetsClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onResumeClick, 
  onTerminalToggle,
  onStandaloneClick,
  onGoogleSheetsClick 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['about', 'experience', 'projects', 'skills', 'timeline', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#timeline' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#080b12]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          id="navbar-brand-logo"
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#0b0f19] rounded-xl flex items-center justify-center">
              <span className="font-mono font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                SN
              </span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#090d16] rounded-full animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                Sabari Narayanan
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                Open for SDE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              Full-Stack & Systems Engineer
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                id={`nav-link-${sectionId}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'text-cyan-300 bg-cyan-500/10 shadow-sm border border-cyan-500/20 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA / Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onGoogleSheetsClick && (
            <button
              id="navbar-sheets-db-btn"
              onClick={onGoogleSheetsClick}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/60 rounded-lg transition-all shadow-sm"
              title="Inspect Live Google Sheets Database"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">Sheets DB</span>
            </button>
          )}

          {onStandaloneClick && (
            <button
              id="navbar-standalone-btn"
              onClick={onStandaloneClick}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-sky-300 hover:text-sky-200 bg-sky-950/40 hover:bg-sky-900/60 border border-sky-700/60 rounded-lg transition-all"
              title="View HTML, CSS, JS + Google Apps Script Backend"
            >
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden xl:inline">HTML/CSS/JS</span>
            </button>
          )}

          <button
            id="terminal-toggle-btn"
            onClick={onTerminalToggle}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 rounded-lg transition-all"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xl:inline">CLI</span>
          </button>

          <button
            id="navbar-resume-btn"
            onClick={onResumeClick}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-lg transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Resume</span>
          </button>

          <a
            id="navbar-hire-me-btn"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-lg shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile menu hamburger button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-resume-trigger"
            onClick={onResumeClick}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg text-xs"
            aria-label="Resume"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-[#090d16]/95 border-b border-slate-800 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-800/80 flex flex-col gap-2">
            {onGoogleSheetsClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoogleSheetsClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-600/60 rounded-lg"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Google Sheets DB Inspector</span>
              </button>
            )}
            {onStandaloneClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStandaloneClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-mono text-sky-300 bg-sky-950/40 border border-sky-700/60 rounded-lg"
              >
                <Database className="w-4 h-4 text-sky-400" />
                <span>HTML/CSS/JS + Sheets DB</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onResumeClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>View Full Resume</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTerminalToggle();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-lg"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Open Interactive CLI</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
