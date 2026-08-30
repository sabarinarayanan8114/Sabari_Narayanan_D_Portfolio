import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { profileData, projects, skillCategories, certificationsList, achievementsList, experienceList } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (sectionId: string) => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ 
  isOpen, 
  onClose,
  onNavigateTo 
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">⚡ Sabari Narayanan's Portfolio Interactive Terminal v1.0</p>
          <p className="text-slate-400 text-xs">Type <span className="text-amber-400 font-mono">help</span> to view available commands or try <span className="text-emerald-400 font-mono">projects</span>, <span className="text-emerald-400 font-mono">skills</span>, <span className="text-emerald-400 font-mono">about</span>, <span className="text-emerald-400 font-mono">contact</span>.</p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const parts = trimmed.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-slate-400">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2 font-mono">
              <div><span className="text-cyan-400">about</span> - Brief bio & contact info</div>
              <div><span className="text-cyan-400">experience</span> - Professional work history</div>
              <div><span className="text-cyan-400">projects</span> - List all featured projects</div>
              <div><span className="text-cyan-400">open &lt;project&gt;</span> - Open live project link</div>
              <div><span className="text-cyan-400">skills</span> - View technical skill stack</div>
              <div><span className="text-cyan-400">certs</span> - View certifications & IDs</div>
              <div><span className="text-cyan-400">education</span> - University & scores</div>
              <div><span className="text-cyan-400">goto &lt;section&gt;</span> - Jump to section</div>
              <div><span className="text-cyan-400">contact</span> - Show email, phone & socials</div>
              <div><span className="text-cyan-400">clear</span> - Clear terminal logs</div>
              <div><span className="text-cyan-400">exit</span> - Close terminal window</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-semibold">{profileData.name} — {profileData.title}</p>
            <p className="text-slate-300">{profileData.bio}</p>
            <p className="text-slate-400 mt-1">📍 {profileData.location} | 🎓 {profileData.cgpa} CGPA | 💻 150+ LeetCode Solved</p>
          </div>
        );
        break;

      case 'experience':
      case 'work':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-slate-300 font-semibold text-cyan-300">Professional Work Experience:</p>
            {experienceList.map(exp => (
              <div key={exp.id} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{exp.role} <span className="text-indigo-400 font-normal">| {exp.company}</span></span>
                  <span className="text-[11px] font-mono text-cyan-400">{exp.duration}</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 pt-1">
                  {exp.skills.map(s => (
                    <span key={s} className="text-[10px] px-1 bg-slate-800 text-slate-300 rounded font-mono">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-slate-300 font-medium">Showcasing {projects.length} key projects:</p>
            {projects.map((p, idx) => (
              <div key={p.id} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400">{idx + 1}. {p.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">{p.category}</span>
                </div>
                <p className="text-slate-400 mt-0.5">{p.subtitle}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {p.techStack.map(t => (
                    <span key={t} className="text-[10px] px-1 bg-slate-800 text-indigo-300 rounded font-mono">{t}</span>
                  ))}
                </div>
                {p.liveUrl && (
                  <p className="text-emerald-400 text-[11px] mt-1 underline">
                    Live: {p.liveUrl}
                  </p>
                )}
              </div>
            ))}
            <p className="text-slate-400 text-[11px]">Type <span className="text-cyan-300">open med-health</span> or <span className="text-cyan-300">open expense-tracker</span> to launch directly!</p>
          </div>
        );
        break;

      case 'open':
        if (!arg) {
          outputNode = <p className="text-amber-400 text-xs">Please specify project: open med-health, open expense-tracker, or open alumni-referral-hub</p>;
        } else {
          const match = projects.find(p => p.id.includes(arg) || p.title.toLowerCase().includes(arg));
          if (match && match.liveUrl) {
            window.open(match.liveUrl, '_blank');
            outputNode = <p className="text-emerald-400 text-xs">🚀 Opening {match.title} in new tab: {match.liveUrl}</p>;
          } else {
            outputNode = <p className="text-rose-400 text-xs">Project '{arg}' not found or has no direct live link.</p>;
          }
        }
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            {skillCategories.map(cat => (
              <div key={cat.title}>
                <span className="text-indigo-400 font-semibold">{cat.title}:</span>{' '}
                <span className="text-slate-300 font-mono">
                  {cat.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            {certificationsList.map(c => (
              <div key={c.id} className="border-l-2 border-cyan-500 pl-2">
                <p className="text-white font-medium">{c.title} — <span className="text-slate-400">{c.issuer}</span></p>
                {c.credentialId && <p className="text-cyan-300 font-mono text-[11px]">ID: {c.credentialId}</p>}
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-white font-semibold">V.S.B College of Engineering Technical Campus</p>
            <p className="text-slate-300">B.E. in Computer Science and Engineering (2023 - 2027) — <span className="text-emerald-400 font-bold">CGPA: 8.02/10</span></p>
            <p className="text-white font-semibold mt-2">Sri Lathangi Vidhya Mandir Higher Secondary School</p>
            <p className="text-slate-300">Higher Secondary Education (2021 - 2023) — <span className="text-emerald-400 font-bold">80% Distinction</span></p>
          </div>
        );
        break;

      case 'goto':
        if (!arg) {
          outputNode = <p className="text-amber-400 text-xs">Specify target: goto projects, goto skills, goto timeline, goto contact</p>;
        } else {
          onNavigateTo(arg);
          outputNode = <p className="text-cyan-400 text-xs">Navigating to #{arg}...</p>;
        }
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-slate-300">📧 Email: <a href={`mailto:${profileData.email}`} className="text-cyan-400 underline">{profileData.email}</a></p>
            <p className="text-slate-300">📞 Phone: <a href={`tel:${profileData.phone}`} className="text-cyan-400">{profileData.phone}</a></p>
            <p className="text-slate-300">💼 LinkedIn: <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/sabari-narayanan-d-8114sj</a></p>
            <p className="text-slate-300">🐙 GitHub: <a href={profileData.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/sabarinarayanan8114</a></p>
            <p className="text-slate-300">🧩 LeetCode: <a href={profileData.leetcode} target="_blank" rel="noreferrer" className="text-cyan-400 underline">leetcode.com/SabariNarayanan2004</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInputVal('');
        return;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs">
            Command not recognized: <span className="font-mono text-white">'{trimmed}'</span>. Type <span className="text-cyan-300 font-mono underline">help</span> for a list of commands.
          </p>
        );
    }

    setHistory(prev => [
      ...prev,
      {
        command: trimmed,
        output: outputNode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputVal('');
  };

  return (
    <div 
      id="interactive-terminal-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        className={`w-full bg-[#0b0f19] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isMaximized ? 'h-[90vh] max-w-5xl' : 'max-w-2xl h-[520px]'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="bg-[#121826] border-b border-slate-800 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={onClose} 
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors focus:outline-none" 
                title="Close"
              />
              <button 
                onClick={() => setIsMaximized(!isMaximized)} 
                className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors focus:outline-none" 
                title="Resize"
              />
              <button 
                onClick={() => setHistory([])} 
                className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors focus:outline-none" 
                title="Clear"
              />
            </div>
            <div className="flex items-center gap-1.5 ml-3 text-xs font-mono text-slate-400">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>sabari@portfolio-dev: ~/workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMaximized(!isMaximized)} 
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 font-mono overflow-y-auto space-y-3 text-sm text-slate-200">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">sabari@portfolio</span>
                <span className="text-slate-500">:</span>
                <span className="text-cyan-400">~</span>
                <span className="text-slate-500">$</span>
                <span className="text-white font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 text-xs">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form 
          onSubmit={handleExecute} 
          className="bg-[#0e1422] border-t border-slate-800 px-4 py-2.5 flex items-center gap-2 font-mono text-xs"
        >
          <span className="text-emerald-400 font-bold hidden sm:inline">sabari@portfolio:~$</span>
          <span className="text-emerald-400 font-bold sm:hidden">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'projects', 'skills', 'contact'..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
          />
          <button 
            type="submit" 
            className="text-slate-400 hover:text-cyan-400 p-1 transition-colors"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
