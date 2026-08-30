import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Terminal, 
  Code2, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles,
  Award,
  GraduationCap,
  Trophy,
  ChevronDown,
  Layers,
  Coffee,
  Server,
  Leaf,
  Database,
  Cloud,
  Cpu,
  Boxes
} from 'lucide-react';
import { profileData, quickStats } from '../data/portfolioData';

interface HeroProps {
  onResumeClick: () => void;
  onTerminalOpen: () => void;
  onShowToast: (msg: string) => void;
  onStandaloneClick?: () => void;
}

const rotatingRoles = [
  "Full-Stack Software Developer",
  "Java & Spring Boot Engineer",
  "React.js & Node.js Developer",
  "MERN Stack Specialist",
  "Cloud & Systems Architect",
  "SIH 2025 Participant"
];

const orbitingSkills = [
  { name: 'Java (Core & OOP)', short: 'Java', icon: Coffee, color: 'text-orange-400', glow: 'hover:shadow-orange-500/30', border: 'hover:border-orange-500/60', bg: 'bg-orange-950/40' },
  { name: 'Spring Boot', short: 'Spring', icon: Leaf, color: 'text-emerald-400', glow: 'hover:shadow-emerald-500/30', border: 'hover:border-emerald-500/60', bg: 'bg-emerald-950/40' },
  { name: 'React.js', short: 'React', icon: Layers, color: 'text-cyan-400', glow: 'hover:shadow-cyan-500/30', border: 'hover:border-cyan-500/60', bg: 'bg-cyan-950/40' },
  { name: 'Python', short: 'Python', icon: Terminal, color: 'text-sky-400', glow: 'hover:shadow-sky-500/30', border: 'hover:border-sky-500/60', bg: 'bg-sky-950/40' },
  { name: 'Node.js & Express', short: 'Node.js', icon: Server, color: 'text-green-400', glow: 'hover:shadow-green-500/30', border: 'hover:border-green-500/60', bg: 'bg-green-950/40' },
  { name: 'MySQL / SQL', short: 'MySQL', icon: Database, color: 'text-blue-400', glow: 'hover:shadow-blue-500/30', border: 'hover:border-blue-500/60', bg: 'bg-blue-950/40' },
  { name: 'Cloud Computing', short: 'Cloud', icon: Cloud, color: 'text-amber-400', glow: 'hover:shadow-amber-500/30', border: 'hover:border-amber-500/60', bg: 'bg-amber-950/40' },
  { name: 'GitHub & CI/CD', short: 'GitHub', icon: Github, color: 'text-slate-200', glow: 'hover:shadow-slate-300/20', border: 'hover:border-slate-400/60', bg: 'bg-slate-900/60' },
  { name: 'LeetCode 150+', short: 'DSA', icon: Code2, color: 'text-yellow-400', glow: 'hover:shadow-yellow-500/30', border: 'hover:border-yellow-500/60', bg: 'bg-yellow-950/40' },
  { name: 'Distributed Systems', short: 'Arch', icon: Cpu, color: 'text-purple-400', glow: 'hover:shadow-purple-500/30', border: 'hover:border-purple-500/60', bg: 'bg-purple-950/40' },
];

export const Hero: React.FC<HeroProps> = ({ 
  onResumeClick, 
  onTerminalOpen,
  onShowToast,
  onStandaloneClick
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Dynamic Typewriter Effect for animated role under name
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const currentRole = rotatingRoles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(80);

        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(40);

        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      onShowToast('Email copied to clipboard!');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      onShowToast('Phone number copied to clipboard!');
    }
  };

  return (
    <section 
      id="about" 
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Core Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                {profileData.availability}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h2 className="text-sm uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                Hi, I'm
              </h2>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Sabari <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  Narayanan D
                </span>
              </h1>

              {/* Glowing Cyber Accent Line under name */}
              <div className="relative w-full max-w-sm h-1 bg-slate-800/80 rounded-full overflow-hidden my-2">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
              </div>

              {/* Dynamic Typewriter Animated Subtitle Under Name */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-cyan-500/40 shadow-lg shadow-cyan-950/40">
                  <span className="text-cyan-400 font-mono text-sm font-bold">&gt;</span>
                  <span className="text-sm sm:text-base font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
                    {displayedText}
                  </span>
                  <span className="w-2 h-4 sm:h-5 bg-cyan-400 inline-block animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>SIH 2025</span>
                </span>
              </div>

              <p className="text-lg sm:text-xl font-medium text-slate-300 leading-relaxed max-w-2xl pt-1">
                Final-Year B.E. Computer Science student at <span className="text-white font-semibold">V.S.B College of Engineering</span> (CGPA: 8.02/10).
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Specialized in building full-stack applications and scalable backend systems with <span className="text-cyan-300 font-medium">Java, Spring Boot, React.js, Node.js, Express, MySQL</span> and <span className="text-indigo-300 font-medium">Cloud Computing</span>. Creator of Med Health, Expense Tracker, and <span className="text-sky-300 font-medium">SIH 2025 Participant</span>.
            </p>

            {/* Quick Meta Location & Direct Contacts */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{profileData.location}</span>
              </div>
              
              <button 
                id="hero-copy-email-btn"
                onClick={() => handleCopy(profileData.email, 'email')}
                className="flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-slate-700 text-slate-300 transition-all"
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profileData.email}</span>
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" /> : <Copy className="w-3 h-3 text-slate-500 ml-1" />}
              </button>

              <button 
                id="hero-copy-phone-btn"
                onClick={() => handleCopy(profileData.phone, 'phone')}
                className="flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-slate-700 text-slate-300 transition-all"
                title="Click to copy phone"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>{profileData.phone}</span>
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" /> : <Copy className="w-3 h-3 text-slate-500 ml-1" />}
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                id="hero-view-projects-btn"
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-view-resume-btn"
                onClick={onResumeClick}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Resume</span>
              </button>

              <button
                id="hero-cli-trigger-btn"
                onClick={onTerminalOpen}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-mono text-slate-300 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition-all"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">CLI Mode</span>
              </button>

              {onStandaloneClick && (
                <button
                  id="hero-standalone-btn"
                  onClick={onStandaloneClick}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-mono text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-700/50 rounded-xl transition-all shadow-sm"
                  title="Export Pure HTML/CSS/JS + Google Apps Script Backend"
                >
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">HTML/CSS/JS + Sheets DB</span>
                  <span className="sm:hidden">Export</span>
                </button>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Connect:
              </span>
              
              <a
                id="hero-linkedin-link"
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all shadow-sm group"
                aria-label="LinkedIn Profile"
                title="LinkedIn: /in/sabari-narayanan-d-8114sj"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                id="hero-github-link"
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white transition-all shadow-sm group"
                aria-label="GitHub Profile"
                title="GitHub: /sabarinarayanan8114"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                id="hero-leetcode-link"
                href={profileData.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 transition-all shadow-sm group"
                aria-label="LeetCode Profile"
                title="LeetCode: /SabariNarayanan2004"
              >
                <Code2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                id="hero-mailto-link"
                href={`mailto:${profileData.email}`}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all shadow-sm group"
                aria-label="Direct Email"
                title={`Email: ${profileData.email}`}
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>

          </div>

          {/* Right Column: Circular Portrait with Orbiting Tech Stack Badges (matching reference) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6">
            {/* Outer ambient radiant glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-indigo-600/20 to-sky-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Interactive Orbital Solar System Stage */}
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] flex items-center justify-center">
              
              {/* Concentric orbital rings */}
              <div className="absolute inset-0 rounded-full border border-slate-700/50 border-dashed animate-[spin_120s_linear_infinite]" />
              <div className="absolute inset-6 sm:inset-8 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-12 sm:inset-16 rounded-full border border-indigo-500/20 border-dotted" />

              {/* Top Alignment Pointer Marker (just like in reference image) */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              </div>

              {/* Orbiting Tech Skill Badges */}
              {orbitingSkills.map((skill, idx) => {
                const Icon = skill.icon;
                const angle = (idx * (360 / orbitingSkills.length) - 90) * (Math.PI / 180);
                const radiusPercent = 47.5; // percentage from center
                const left = 50 + radiusPercent * Math.cos(angle);
                const top = 50 + radiusPercent * Math.sin(angle);
                const isHovered = activeSkill === skill.name;

                return (
                  <div
                    key={skill.name}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-20"
                    onMouseEnter={() => setActiveSkill(skill.name)}
                    onMouseLeave={() => setActiveSkill(null)}
                  >
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl sm:rounded-2xl ${skill.bg} bg-[#0b0f1a]/95 border border-slate-700/80 ${skill.border} shadow-lg ${skill.glow} transition-all duration-300 hover:scale-125 cursor-pointer backdrop-blur-md group`}
                      title={skill.name}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${skill.color} group-hover:scale-110 transition-transform`} />
                      
                      {/* Tooltip Badge on hover */}
                      <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono whitespace-nowrap text-slate-200 pointer-events-none shadow-xl transition-all duration-200 z-30 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <span className={skill.color}>{skill.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Central Portrait Circle Frame */}
              <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-1.5 sm:p-2 bg-gradient-to-b from-cyan-400 via-sky-500 to-indigo-600 shadow-[0_0_50px_rgba(6,182,212,0.35)] group">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0e1a] relative">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.name} 
                      className="w-full h-full object-cover object-[center_15%] scale-105 group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono font-bold text-4xl text-cyan-400">
                      SN
                    </div>
                  )}
                </div>

                {/* Online indicator dot on the circular rim */}
                <span className="absolute bottom-3 right-3 w-5 h-5 bg-emerald-500 border-2 border-[#090d16] rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                </span>
              </div>

            </div>

            {/* Quick Skill Indicator / Terminal Trigger Banner below portrait */}
            <div className="mt-6 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>SIH 2025 Participant &bull; CGPA {profileData.cgpa}</span>
              </div>
              <button
                onClick={onTerminalOpen}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/60 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-all shadow-sm"
              >
                <Terminal className="w-3 h-3" />
                <span>CLI Mode</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          {quickStats.map((stat, idx) => {
            const Icon = 
              stat.icon === 'Code2' ? Code2 :
              stat.icon === 'GraduationCap' ? GraduationCap :
              stat.icon === 'Award' ? Award : Trophy;

            return (
              <div 
                key={idx}
                className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 p-4 rounded-xl transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
