import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Palette, 
  Megaphone, 
  Binary, 
  Code2, 
  Layers, 
  MessageSquare, 
  Image as ImageIcon, 
  Share2, 
  Flame, 
  Zap, 
  Eye, 
  Radio, 
  Check, 
  Monitor, 
  Brush, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { educationList, volunteeringList } from '../data/portfolioData';

export const EducationTimeline: React.FC = () => {
  // Interactive state for Leadership & Volunteering section
  const [selectedRole, setSelectedRole] = useState<string>('comm-club');
  const [activeInteractiveMode, setActiveInteractiveMode] = useState<'details' | 'simulation' | 'gallery'>('details');
  const [simulatedAudience, setSimulatedAudience] = useState<number>(180);
  const [activeDesignFilter, setActiveDesignFilter] = useState<'all' | 'posters' | 'ui' | 'branding'>('all');
  const [likedAsset, setLikedAsset] = useState<Record<string, boolean>>({});

  const toggleAssetLike = (id: string) => {
    setLikedAsset(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock Digital Creative Assets showcase for Digital Team role
  const digitalAssets = [
    {
      id: "symposium-2025",
      title: "TECH-FUSION '25 Symposium Poster",
      category: "posters",
      type: "Event Poster & Keynote Deck",
      gradient: "from-cyan-600 to-blue-800",
      accent: "text-cyan-400",
      badge: "Institutional Fest",
      reach: "3,200+ Impressions",
      highlights: "High-contrast geometric cyber grid, typography pairing, schedule QR routing."
    },
    {
      id: "hackathon-poster",
      title: "SIH Internal Hackathon Promo Kit",
      category: "branding",
      type: "Social Media Banner & Teaser",
      gradient: "from-indigo-600 to-purple-800",
      accent: "text-indigo-400",
      badge: "Hackathon Branding",
      reach: "1,800+ Views",
      highlights: "Neon circuit glow accents, rulebook infographics, multi-platform banner pack."
    },
    {
      id: "comm-club-flyer",
      title: "Coding Circle & DSA Bootcamps",
      category: "ui",
      type: "Digital Workshop Template",
      gradient: "from-emerald-600 to-teal-800",
      accent: "text-emerald-400",
      badge: "Workshop Series",
      reach: "150+ Attendees",
      highlights: "Live session agenda breakdown, speaker spotlights, clean vector aesthetic."
    }
  ];

  const filteredAssets = activeDesignFilter === 'all' 
    ? digitalAssets 
    : digitalAssets.filter(a => a.category === activeDesignFilter);

  return (
    <section id="timeline" className="py-24 sm:py-32 relative bg-[#080b12] border-t border-slate-900 overflow-hidden">
      
      {/* Background ambient radial glow effects */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Milestones & Campus Leadership</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span>Education & Community Leadership</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Rigorous Computer Science engineering foundation at VSB College paired with proactive communication leadership, coding club mentoring, and creative digital media direction.
          </p>
        </motion.div>

        {/* Two-Column Master Grid: Academic Background (Left) & Leadership & Volunteering (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* ================= LEFT COLUMN: ACADEMIC BACKGROUND ================= */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    Academic Background
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">Degree & Secondary Education</p>
                </div>
              </div>

              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                2 Institutions
              </span>
            </div>

            {/* Glowing Timeline Stream */}
            <div className="relative border-l-2 border-slate-800/90 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
              {educationList.map((edu, idx) => (
                <motion.div 
                  key={edu.id} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline node dot with pulsing halo */}
                  <div className="absolute -left-[33px] sm:-left-[41px] top-4 w-5 h-5 rounded-full bg-[#080b12] border-2 border-cyan-400 group-hover:border-emerald-400 transition-colors flex items-center justify-center shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-emerald-400 group-hover:scale-125 transition-all"></span>
                  </div>

                  <div className="bg-[#0b0f19] border border-slate-800/90 hover:border-cyan-500/50 p-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-cyan-950/20 group/edu relative overflow-hidden">
                    
                    {/* Background subtle watermark icon */}
                    <div className="absolute -right-4 -bottom-4 text-slate-800/20 group-hover/edu:text-cyan-500/10 transition-colors pointer-events-none">
                      <GraduationCap className="w-32 h-32" />
                    </div>

                    {/* Top Row: Year and Score Graphic Gauge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900/90 text-cyan-300 border border-slate-800 flex items-center gap-1.5 shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{edu.duration}</span>
                      </span>

                      {/* CGPA / Score Radial Graphic Badge */}
                      <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono font-bold shadow-sm">
                        <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{edu.score}</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight group-hover/edu:text-cyan-300 transition-colors">
                      {edu.degree}
                    </h4>
                    
                    <p className="text-sm font-semibold text-slate-300 mt-1">
                      {edu.institution}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{edu.location}</span>
                    </div>

                    {/* Visual Score Graphic Progress Bar */}
                    {edu.id === 'vsb-be-cse' ? (
                      <div className="mt-5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Cumulative GPA (CGPA)</span>
                          </span>
                          <span className="text-emerald-400 font-bold">8.02 / 10.0</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '80.2%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-blue-400" />
                            <span>Higher Secondary Score</span>
                          </span>
                          <span className="text-blue-400 font-bold">80.0% Distinction</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '80%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Coursework list */}
                    <div className="mt-5 pt-4 border-t border-slate-800/80">
                      <p className="text-xs font-mono text-slate-400 mb-2.5 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Core Engineering Coursework:</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((course) => (
                          <span
                            key={course}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 font-mono hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>


          {/* ================= RIGHT COLUMN: LEADERSHIP & VOLUNTEERING (ENRICHED ANIMATIONS & GRAPHICS) ================= */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/20"
                >
                  <div className="w-full h-full bg-[#0d1220] rounded-[11px] flex items-center justify-center text-indigo-400">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                    <span>Leadership & Volunteering</span>
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping hidden sm:inline-block" />
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">Community Coordination & Digital Media</p>
                </div>
              </div>

              {/* Interactive Role Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 font-mono text-xs">
                <button
                  onClick={() => { setSelectedRole('comm-club'); setActiveInteractiveMode('details'); }}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    selectedRole === 'comm-club'
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Megaphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Communication Club</span>
                  <span className="sm:hidden">Coordinator</span>
                </button>
                <button
                  onClick={() => { setSelectedRole('digital-team'); setActiveInteractiveMode('details'); }}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    selectedRole === 'digital-team'
                      ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Digital Media Team</span>
                  <span className="sm:hidden">Digital</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Showcase Card */}
            <AnimatePresence mode="wait">
              {selectedRole === 'comm-club' ? (
                /* ----------------- ROLE 1: COMMUNICATION CLUB COORDINATOR ----------------- */
                <motion.div
                  key="comm-club-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-[#0b0f19] border border-indigo-900/60 hover:border-indigo-500/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl shadow-indigo-950/30 relative overflow-hidden"
                >
                  {/* Glowing dynamic top accent banner */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" />
                  
                  {/* Animated Background Audio Waves Graphic */}
                  <div className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10 pointer-events-none text-indigo-400">
                    <Megaphone className="w-full h-full" />
                  </div>

                  {/* Header Row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-800/80">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                        <Megaphone className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                            STUDENT LEADERSHIP
                          </span>
                          <span className="text-xs text-slate-500 font-mono">2024 – Present</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                          Communication Club Coordinator
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium">
                          V.S.B College of Engineering Technical Campus
                        </p>
                      </div>
                    </div>

                    {/* Quick Mode Toggle */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px]">
                      <button
                        onClick={() => setActiveInteractiveMode('details')}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          activeInteractiveMode === 'details' 
                            ? 'bg-indigo-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Highlights
                      </button>
                      <button
                        onClick={() => setActiveInteractiveMode('simulation')}
                        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                          activeInteractiveMode === 'simulation' 
                            ? 'bg-emerald-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                        <span>Interactive Pulse</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: Highlights & Core Action Bullets */}
                  {activeInteractiveMode === 'details' ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6 mt-6"
                    >
                      {/* Interactive Metrics Graphic Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <motion.div 
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-slate-900/90 border border-indigo-800/40 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">STUDENTS REACHED</span>
                            <Users className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                          <div className="text-2xl font-mono font-extrabold text-white">150+</div>
                          <p className="text-[11px] text-slate-400">Technical workshop attendees</p>
                        </motion.div>

                        <motion.div 
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-slate-900/90 border border-emerald-800/40 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">HACKATHON SURGE</span>
                            <Flame className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <div className="text-2xl font-mono font-extrabold text-emerald-300">+40%</div>
                          <p className="text-[11px] text-slate-400">Boost in team participation</p>
                        </motion.div>

                        <motion.div 
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-950/50 to-slate-900/90 border border-sky-800/40 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-sky-400 uppercase">MENTORING SESSIONS</span>
                            <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                          </div>
                          <div className="text-2xl font-mono font-extrabold text-white">12+</div>
                          <p className="text-[11px] text-slate-400">DSA & Git version control</p>
                        </motion.div>
                      </div>

                      {/* Bullet points with animated hover */}
                      <div className="space-y-3">
                        {volunteeringList[0].description.map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ x: 6 }}
                            className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-all"
                          >
                            <div className="w-5 h-5 rounded-lg bg-indigo-950/90 border border-indigo-800/60 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Impact Banner */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-800/60 flex items-center justify-between gap-3 text-xs font-mono text-indigo-200 shadow-inner">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="font-semibold text-slate-200">{volunteeringList[0].impact}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded bg-indigo-900/80 border border-indigo-700/60 text-[10px] text-indigo-300 shrink-0">
                          Active Leadership
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* Mode 2: Interactive Campus Workshop Pulse Simulator */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-5 rounded-2xl bg-[#090e1c] border border-indigo-800/50 space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                          <Radio className="w-4 h-4 animate-pulse" />
                          <span className="font-bold">COLLABORATIVE CODING CIRCLE SIMULATOR</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">Interactive Model</span>
                      </div>

                      {/* Live Workshop Interactive Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-300">Active Student Engagement Target:</span>
                          <span className="text-indigo-400 font-bold">{simulatedAudience} Students</span>
                        </div>
                        <input 
                          type="range" 
                          min="50" 
                          max="300" 
                          step="10"
                          value={simulatedAudience}
                          onChange={(e) => setSimulatedAudience(Number(e.target.value))}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>50 Classmates</span>
                          <span>150 Typical Workshop</span>
                          <span>300 College-Wide Fest</span>
                        </div>
                      </div>

                      {/* Simulated Output Metrics */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                          <span className="text-[10px] font-mono text-slate-400">ESTIMATED TEAMS FORMED</span>
                          <div className="text-xl font-mono font-extrabold text-cyan-300 mt-0.5">
                            {Math.round(simulatedAudience / 4)} Hackathon Squads
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                          <span className="text-[10px] font-mono text-slate-400">DSA CODING CHALLENGES SOLVED</span>
                          <div className="text-xl font-mono font-extrabold text-emerald-300 mt-0.5">
                            {Math.round(simulatedAudience * 3.5)} Problems Solved
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Skills Gained Pills */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-indigo-400" />
                      <span>Competencies:</span>
                    </span>
                    {volunteeringList[0].skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-indigo-200 border border-slate-800 font-mono hover:border-indigo-500/50 hover:bg-slate-800 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* ----------------- ROLE 2: DIGITAL TEAM MEMBER – COLLEGE EVENTS & CULTURES ----------------- */
                <motion.div
                  key="digital-team-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-[#0b0f19] border border-purple-900/60 hover:border-purple-500/60 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl shadow-purple-950/30 relative overflow-hidden"
                >
                  {/* Glowing top accent banner */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400" />

                  {/* Background Watermark */}
                  <div className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10 pointer-events-none text-purple-400">
                    <Palette className="w-full h-full" />
                  </div>

                  {/* Header Row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-800/80">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-700/60 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
                        <Palette className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                            CREATIVE & BRANDING
                          </span>
                          <span className="text-xs text-slate-500 font-mono">2023 – Present</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                          Digital Team Member — College Events & Cultures
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium">
                          V.S.B College Cultural & Technical Committees
                        </p>
                      </div>
                    </div>

                    {/* Quick Mode Toggle */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px]">
                      <button
                        onClick={() => setActiveInteractiveMode('details')}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          activeInteractiveMode === 'details' 
                            ? 'bg-purple-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveInteractiveMode('gallery')}
                        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                          activeInteractiveMode === 'gallery' 
                            ? 'bg-pink-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3 text-pink-300" />
                        <span>Media Showcase ({filteredAssets.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: Details & Metrics */}
                  {activeInteractiveMode === 'details' ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6 mt-6"
                    >
                      {/* Metric cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <motion.div 
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-950/50 to-slate-900/90 border border-purple-800/40 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">OFFICIAL ASSETS</span>
                            <Brush className="w-3.5 h-3.5 text-purple-400" />
                          </div>
                          <div className="text-2xl font-mono font-extrabold text-white">30+</div>
                          <p className="text-[11px] text-slate-400">Posters, banners & templates</p>
                        </motion.div>

                        <motion.div 
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-950/50 to-slate-900/90 border border-pink-800/40 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-pink-400 uppercase">CAMPAIGN REACH</span>
                            <Eye className="w-3.5 h-3.5 text-pink-400" />
                          </div>
                          <div className="text-2xl font-mono font-extrabold text-pink-300">5,000+</div>
                          <p className="text-[11px] text-slate-400">Digital media impressions</p>
                        </motion.div>

                        <motion.div 
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/50 to-slate-900/90 border border-cyan-800/40 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">COMMITTEES</span>
                            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <div className="text-2xl font-mono font-extrabold text-white">Cross-Dept</div>
                          <p className="text-[11px] text-slate-400">Cultural & technical fests</p>
                        </motion.div>
                      </div>

                      {/* Bullet descriptions */}
                      <div className="space-y-3">
                        {volunteeringList[1].description.map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ x: 6 }}
                            className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/80 hover:border-purple-500/40 transition-all"
                          >
                            <div className="w-5 h-5 rounded-lg bg-purple-950/90 border border-purple-800/60 flex items-center justify-center shrink-0 mt-0.5 text-purple-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Impact Banner */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-pink-950/60 to-slate-900 border border-purple-800/60 flex items-center justify-between gap-3 text-xs font-mono text-purple-200 shadow-inner">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="font-semibold text-slate-200">{volunteeringList[1].impact}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded bg-purple-900/80 border border-purple-700/60 text-[10px] text-purple-300 shrink-0">
                          Creative Asset Suite
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* Mode 2: Creative Design Showcase & Asset Gallery */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 space-y-4"
                    >
                      {/* Filter chips */}
                      <div className="flex items-center gap-2">
                        {(['all', 'posters', 'branding', 'ui'] as const).map(cat => (
                          <button
                            key={cat}
                            onClick={() => setActiveDesignFilter(cat)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                              activeDesignFilter === cat
                                ? 'bg-purple-600 text-white font-bold'
                                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Showcase cards grid */}
                      <div className="space-y-3">
                        {filteredAssets.map((asset) => (
                          <motion.div
                            key={asset.id}
                            whileHover={{ y: -2 }}
                            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group/asset"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/60">
                                  {asset.badge}
                                </span>
                                <span className="text-[11px] font-mono text-slate-400">
                                  {asset.type}
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-white group-hover/asset:text-purple-300 transition-colors">
                                {asset.title}
                              </h5>
                              <p className="text-xs text-slate-300 font-sans">
                                {asset.highlights}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center font-mono text-xs">
                              <span className="text-slate-400 text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                                {asset.reach}
                              </span>
                              <button
                                onClick={() => toggleAssetLike(asset.id)}
                                className={`p-2 rounded-xl border transition-all ${
                                  likedAsset[asset.id]
                                    ? 'bg-pink-950/80 border-pink-700/80 text-pink-400'
                                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                                }`}
                                title="Applaud creative campaign"
                              >
                                <Flame className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Skills Gained Pills */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-purple-400" />
                      <span>Creative Tooling:</span>
                    </span>
                    {volunteeringList[1].skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 text-purple-200 border border-slate-800 font-mono hover:border-purple-500/50 hover:bg-slate-800 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
