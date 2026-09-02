import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Sparkles,
  Code2,
  ExternalLink,
  Move,
  RotateCcw,
  Shuffle,
  Flame
} from 'lucide-react';
import { motion } from 'motion/react';
import { profileData } from '../data/portfolioData';

export interface CircularSkill {
  id: string;
  name: string;
  categoryTag: string;
  filterCategory: 'all' | 'languages' | 'backend' | 'frontend' | 'database' | 'cloud' | 'core' | 'tools';
  color: string;
  secondaryColor: string;
  radius: number;
  level: number;
  experience: string;
  projectsCount: number;
  description: string;
  initialXRatio: number;
  initialYRatio: number;
}

export const circularSkillsData: CircularSkill[] = [
  // Row 1 - Core Languages & Backend Frameworks
  {
    id: "java",
    name: "Java (Core & OOP)",
    categoryTag: "LANGUAGE",
    filterCategory: "languages",
    color: "#f97316",
    secondaryColor: "#ea580c",
    radius: 86,
    level: 92,
    experience: "3+ Years",
    projectsCount: 5,
    description: "HackerRank certified. OOP principles, Collections Framework, Multithreading & Exception handling.",
    initialXRatio: 0.14,
    initialYRatio: 0.22
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    categoryTag: "BACKEND",
    filterCategory: "backend",
    color: "#22c55e",
    secondaryColor: "#16a34a",
    radius: 84,
    level: 88,
    experience: "2+ Years",
    projectsCount: 3,
    description: "RESTful micro-endpoints, dependency injection, service layers & MySQL ORM integration.",
    initialXRatio: 0.32,
    initialYRatio: 0.22
  },
  {
    id: "react",
    name: "React.js",
    categoryTag: "FRONTEND",
    filterCategory: "frontend",
    color: "#06b6d4",
    secondaryColor: "#0891b2",
    radius: 86,
    level: 90,
    experience: "2+ Years",
    projectsCount: 4,
    description: "Responsive component architecture, state hooks, interactive SPAs & dynamic dashboards.",
    initialXRatio: 0.52,
    initialYRatio: 0.22
  },
  {
    id: "nodejs",
    name: "Node.js & Express",
    categoryTag: "BACKEND",
    filterCategory: "backend",
    color: "#10b981",
    secondaryColor: "#059669",
    radius: 84,
    level: 88,
    experience: "2+ Years",
    projectsCount: 4,
    description: "Asynchronous I/O, Express routing, JWT authentication pipelines & full-stack MERN services.",
    initialXRatio: 0.72,
    initialYRatio: 0.22
  },
  {
    id: "mysql",
    name: "MySQL (Relational)",
    categoryTag: "DATABASE",
    filterCategory: "database",
    color: "#3b82f6",
    secondaryColor: "#1d4ed8",
    radius: 82,
    level: 90,
    experience: "3+ Years",
    projectsCount: 4,
    description: "Relational schema modeling, indexing, complex JOIN queries, ACID compliance & transactions.",
    initialXRatio: 0.90,
    initialYRatio: 0.22
  },

  // Row 2 - Databases, Web Tech & Systems
  {
    id: "mongodb",
    name: "MongoDB (NoSQL)",
    categoryTag: "DATABASE",
    filterCategory: "database",
    color: "#4ade80",
    secondaryColor: "#22c55e",
    radius: 82,
    level: 88,
    experience: "2+ Years",
    projectsCount: 4,
    description: "Document collections, aggregation pipelines & high-throughput persistence in MERN apps.",
    initialXRatio: 0.10,
    initialYRatio: 0.52
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    categoryTag: "LANGUAGE",
    filterCategory: "languages",
    color: "#fbbf24",
    secondaryColor: "#d97706",
    radius: 84,
    level: 90,
    experience: "3+ Years",
    projectsCount: 5,
    description: "Modern ES6+ syntax, asynchronous promises, DOM manipulation & client-server communication.",
    initialXRatio: 0.26,
    initialYRatio: 0.52
  },
  {
    id: "rest-apis",
    name: "REST API Design",
    categoryTag: "BACKEND",
    filterCategory: "backend",
    color: "#0ea5e9",
    secondaryColor: "#0284c7",
    radius: 84,
    level: 92,
    experience: "2+ Years",
    projectsCount: 5,
    description: "RESTful architecture, status codes, JWT token security, role access control & error handling.",
    initialXRatio: 0.43,
    initialYRatio: 0.52
  },
  {
    id: "javafx",
    name: "JavaFX Desktop",
    categoryTag: "BACKEND",
    filterCategory: "backend",
    color: "#e11d48",
    secondaryColor: "#be123c",
    radius: 78,
    level: 85,
    experience: "2+ Years",
    projectsCount: 2,
    description: "Modular desktop GUI engineering, event handlers & MVC architecture in Expense Tracker.",
    initialXRatio: 0.60,
    initialYRatio: 0.52
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing",
    categoryTag: "CLOUD",
    filterCategory: "cloud",
    color: "#818cf8",
    secondaryColor: "#4f46e5",
    radius: 82,
    level: 88,
    experience: "NPTEL Elite",
    projectsCount: 3,
    description: "NPTEL & NASSCOM certified. Virtualization, distributed architecture & cloud deployment.",
    initialXRatio: 0.77,
    initialYRatio: 0.52
  },
  {
    id: "big-data",
    name: "Big Data Computing",
    categoryTag: "CLOUD",
    filterCategory: "cloud",
    color: "#c084fc",
    secondaryColor: "#9333ea",
    radius: 80,
    level: 85,
    experience: "NPTEL Elite",
    projectsCount: 2,
    description: "NPTEL Elite certified. Distributed storage, MapReduce principles & Hadoop ecosystem concepts.",
    initialXRatio: 0.93,
    initialYRatio: 0.52
  },

  // Row 3 - Core CS Foundations, Styling & Developer Tools
  {
    id: "dsa",
    name: "DSA & Problem Solving",
    categoryTag: "CORE CS",
    filterCategory: "core",
    color: "#f59e0b",
    secondaryColor: "#d97706",
    radius: 86,
    level: 90,
    experience: "150+ Solved",
    projectsCount: 150,
    description: "LeetCode 150+ solved with 85%+ consistency. Arrays, Two Pointers, Trees, Recursion & DP.",
    initialXRatio: 0.16,
    initialYRatio: 0.82
  },
  {
    id: "html-css",
    name: "HTML5 & Tailwind CSS",
    categoryTag: "FRONTEND",
    filterCategory: "frontend",
    color: "#06b6d4",
    secondaryColor: "#0284c7",
    radius: 84,
    level: 94,
    experience: "3+ Years",
    projectsCount: 6,
    description: "Semantic web structure, Tailwind CSS utility design, responsive layouts & typography.",
    initialXRatio: 0.35,
    initialYRatio: 0.82
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    categoryTag: "TOOLS",
    filterCategory: "tools",
    color: "#f43f5e",
    secondaryColor: "#e11d48",
    radius: 82,
    level: 92,
    experience: "3+ Years",
    projectsCount: 6,
    description: "Version control, commit hygiene, branch workflows, collaborative merging & project hosting.",
    initialXRatio: 0.54,
    initialYRatio: 0.82
  },
  {
    id: "oop-dbms",
    name: "OOP & DBMS Concepts",
    categoryTag: "CORE CS",
    filterCategory: "core",
    color: "#a855f7",
    secondaryColor: "#7e22ce",
    radius: 84,
    level: 92,
    experience: "Academic Merit",
    projectsCount: 5,
    description: "SOLID principles, modularity, normalization, relational database management & query optimization.",
    initialXRatio: 0.72,
    initialYRatio: 0.82
  },
  {
    id: "postman-vscode",
    name: "VS Code & Postman",
    categoryTag: "TOOLS",
    filterCategory: "tools",
    color: "#fb923c",
    secondaryColor: "#ea580c",
    radius: 80,
    level: 94,
    experience: "3+ Years",
    projectsCount: 6,
    description: "API testing, endpoint debugging, Postman collections, environment management & IDE workflows.",
    initialXRatio: 0.89,
    initialYRatio: 0.82
  }
];

interface PhysicsNode {
  data: CircularSkill;
  x: number;
  y: number;
  radius: number;
  isDragging: boolean;
  baseX: number;
  baseY: number;
}

export const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<CircularSkill | null>(circularSkillsData[0]); // Default Java
  const [activeFilter, setActiveFilter] = useState<'all' | 'languages' | 'backend' | 'frontend' | 'database' | 'cloud' | 'core' | 'tools'>('all');
  const [dimensions, setDimensions] = useState({ width: 1000, height: 520 });
  const [nodes, setNodes] = useState<PhysicsNode[]>([]);
  
  const nodesRef = useRef<PhysicsNode[]>([]);
  const dragInfoRef = useRef<{
    activeNodeId: string | null;
    startX: number;
    startY: number;
    nodeStartX: number;
    nodeStartY: number;
  }>({
    activeNodeId: null,
    startX: 0,
    startY: 0,
    nodeStartX: 0,
    nodeStartY: 0
  });

  // Multi-pass circle non-penetration solver
  const resolveCollisions = (
    nodeList: PhysicsNode[], 
    draggedId: string | null, 
    w: number, 
    h: number, 
    iterations = 16
  ) => {
    const padding = 6;

    for (let iter = 0; iter < iterations; iter++) {
      // 1. Pairwise circle-to-circle non-penetration constraint
      for (let i = 0; i < nodeList.length; i++) {
        for (let j = i + 1; j < nodeList.length; j++) {
          const n1 = nodeList[i];
          const n2 = nodeList[j];

          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = n1.radius + n2.radius + 1; // Exactly touching at tangent + 1px gap

          if (dist < minDist) {
            // Overlapping! Calculate non-penetration separation vector
            const overlap = minDist - dist;
            // Handle edge case of exact same point
            const nx = dist > 0.0001 ? dx / dist : Math.cos((i + j) * 1.5);
            const ny = dist > 0.0001 ? dy / dist : Math.sin((i + j) * 1.5);

            if (n1.data.id === draggedId) {
              // n1 is being dragged by user: push n2 out completely
              n2.x += nx * overlap;
              n2.y += ny * overlap;
            } else if (n2.data.id === draggedId) {
              // n2 is being dragged by user: push n1 out completely
              n1.x -= nx * overlap;
              n1.y -= ny * overlap;
            } else {
              // Neither is dragged: split the separation equally
              const half = overlap * 0.5;
              n1.x -= nx * half;
              n1.y -= ny * half;
              n2.x += nx * half;
              n2.y += ny * half;
            }
          }
        }
      }

      // 2. Boundary wall containment
      for (let i = 0; i < nodeList.length; i++) {
        const n = nodeList[i];
        if (n.x - n.radius < padding) {
          n.x = n.radius + padding;
        } else if (n.x + n.radius > w - padding) {
          n.x = w - padding - n.radius;
        }

        if (n.y - n.radius < padding) {
          n.y = n.radius + padding;
        } else if (n.y + n.radius > h - padding) {
          n.y = h - padding - n.radius;
        }
      }
    }
  };

  // Generate randomized non-overlapping positions
  const generateRandomPositions = (w: number, h: number) => {
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;
    const radiusMultiplier = isMobile ? 0.72 : isTablet ? 0.88 : 1;

    // Place randomly within padded center area
    const generated: PhysicsNode[] = circularSkillsData.map((skill, index) => {
      const r = Math.round(skill.radius * radiusMultiplier);
      
      // Calculate randomized jittered cluster coordinates across the container
      const cols = isMobile ? 3 : isTablet ? 4 : 6;
      const rows = Math.ceil(circularSkillsData.length / cols);
      const col = index % cols;
      const row = Math.floor(index / cols);

      const cellW = (w - 40) / cols;
      const cellH = (h - 40) / rows;

      const jitterX = (Math.random() - 0.5) * (cellW * 0.5);
      const jitterY = (Math.random() - 0.5) * (cellH * 0.5);

      const posX = Math.max(r + 10, Math.min(w - r - 10, 20 + (col + 0.5) * cellW + jitterX));
      const posY = Math.max(r + 10, Math.min(h - r - 10, 20 + (row + 0.5) * cellH + jitterY));

      return {
        data: skill,
        x: posX,
        y: posY,
        radius: r,
        isDragging: false,
        baseX: posX,
        baseY: posY
      };
    });

    // Run 35 relaxation passes so initial random distribution is completely free of any overlap
    resolveCollisions(generated, null, w, h, 35);

    return generated;
  };

  // Initialize or re-position nodes when dimensions change
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = Math.max(320, rect.width || 1000);
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;
    const h = isMobile ? 740 : isTablet ? 650 : 600;
    
    setDimensions({ width: w, height: h });
    const initialNodes = generateRandomPositions(w, h);
    nodesRef.current = initialNodes;
    setNodes(initialNodes);
  }, []);

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = Math.max(320, rect.width || 1000);
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;
      const h = isMobile ? 740 : isTablet ? 650 : 600;
      
      setDimensions({ width: w, height: h });
      const updatedNodes = generateRandomPositions(w, h);
      nodesRef.current = updatedNodes;
      setNodes(updatedNodes);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Global window pointer listeners for drag tracking with real-time non-collision physics
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const { activeNodeId, startX, startY, nodeStartX, nodeStartY } = dragInfoRef.current;
      if (!activeNodeId) return;

      const currentNodes = nodesRef.current;
      const draggedNode = currentNodes.find(n => n.data.id === activeNodeId);
      if (!draggedNode) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Desired position of dragged bubble
      draggedNode.x = nodeStartX + deltaX;
      draggedNode.y = nodeStartY + deltaY;

      // Solve collision constraints so dragged node cannot penetrate other bubbles and pushes them
      resolveCollisions(currentNodes, activeNodeId, dimensions.width, dimensions.height, 16);

      setNodes([...currentNodes]);
    };

    const handleGlobalPointerUp = () => {
      const { activeNodeId } = dragInfoRef.current;
      if (!activeNodeId) return;

      const currentNodes = nodesRef.current;
      const node = currentNodes.find(n => n.data.id === activeNodeId);
      if (node) {
        node.isDragging = false;
      }

      // Final settling pass to ensure zero overlaps after release
      resolveCollisions(currentNodes, null, dimensions.width, dimensions.height, 20);

      dragInfoRef.current.activeNodeId = null;
      setNodes([...currentNodes]);
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [dimensions]);

  // Pointer Drag Handlers on Node
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();

    const node = nodesRef.current.find(n => n.data.id === id);
    if (!node) return;

    node.isDragging = true;

    dragInfoRef.current = {
      activeNodeId: id,
      startX: e.clientX,
      startY: e.clientY,
      nodeStartX: node.x,
      nodeStartY: node.y
    };

    setSelectedSkill(node.data);
    setNodes([...nodesRef.current]);
  };

  // Re-randomize / Scatter layout
  const handleRandomizeLayout = () => {
    const { width, height } = dimensions;
    const freshNodes = generateRandomPositions(width, height);
    nodesRef.current = freshNodes;
    setNodes(freshNodes);
  };

  const filterTabs = [
    { id: 'all', label: 'All Technical Stack' },
    { id: 'languages', label: 'Languages' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'database', label: 'Databases (SQL/NoSQL)' },
    { id: 'cloud', label: 'Cloud & Big Data' },
    { id: 'core', label: 'Core CS & DSA' },
    { id: 'tools', label: 'Tools & DevOps' }
  ] as const;

  return (
    <section id="skills" className="py-20 sm:py-24 relative bg-[#070a12] border-t border-slate-900 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono">
              <Cpu className="w-3.5 h-3.5" />
              <span>Zero-Penetration Interactive Bubbles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Skills & Technical Stack</span>
              <Sparkles className="w-6 h-6 text-cyan-400 hidden sm:inline" />
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Arranged in an organic random distribution. Touch and drag any bubble to move it — bubbles can touch borders and push adjacent nodes without penetrating or entering one another.
            </p>
          </div>

          {/* Interactive Action Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleRandomizeLayout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all backdrop-blur-md shadow-sm active:scale-95"
              title="Shuffle Random Arrangement"
            >
              <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Shuffle Layout</span>
            </button>

            <button
              onClick={handleRandomizeLayout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all backdrop-blur-md shadow-sm active:scale-95"
              title="Reset Alignment"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Badges Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800/80 rounded-2xl backdrop-blur-md">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium font-mono transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CIRCULAR SHAPE PHYSICS CANVAS (MATCHING USER SCREENSHOT AESTHETIC EXACTLY) */}
        {/* ========================================================================= */}
        <div 
          ref={containerRef}
          className="relative w-full rounded-3xl bg-[#090d18] border border-slate-800/90 shadow-2xl overflow-hidden select-none touch-none transition-all"
          style={{ height: `${dimensions.height}px` }}
        >
          {/* Subtle Ambient Background Grid & Stars */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          
          {/* Soft background glow highlights */}
          <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Circular Nodes */}
          {nodes.map((node) => {
            const isMatchFilter = activeFilter === 'all' || node.data.filterCategory === activeFilter;
            const isSelected = selectedSkill?.id === node.data.id;
            const diameter = node.radius * 2;

            return (
              <div
                key={node.data.id}
                onPointerDown={(e) => handlePointerDown(node.data.id, e)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${diameter}px`,
                  height: `${diameter}px`,
                  transform: 'translate(-50%, -50%)',
                  opacity: isMatchFilter ? 1 : 0.25,
                  zIndex: node.isDragging ? 50 : isSelected ? 40 : 10,
                  cursor: node.isDragging ? 'grabbing' : 'grab'
                }}
                className="group select-none"
              >
                {/* Perfect Circular Bubble matching Screenshot */}
                <div 
                  className={`w-full h-full rounded-full flex flex-col items-center justify-center text-center p-3 transition-transform duration-100 ${
                    node.isDragging ? 'scale-110 shadow-2xl' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: '#0a0f1d',
                    border: isSelected 
                      ? `2px solid ${node.data.color}` 
                      : `1.2px solid rgba(71, 85, 105, 0.45)`,
                    boxShadow: isSelected 
                      ? `0 0 30px ${node.data.color}40, inset 0 0 15px ${node.data.color}20` 
                      : node.isDragging 
                        ? `0 15px 35px rgba(0,0,0,0.6), 0 0 20px ${node.data.color}30` 
                        : `0 4px 20px rgba(0,0,0,0.4)`
                  }}
                >
                  {/* Skill Title in distinctive bold color */}
                  <span 
                    className="font-extrabold tracking-tight leading-tight transition-colors line-clamp-2 px-2"
                    style={{ 
                      color: node.data.color,
                      fontSize: node.radius > 75 ? '15.5px' : node.radius > 65 ? '13.5px' : '12px'
                    }}
                  >
                    {node.data.name}
                  </span>

                  {/* Category / Tag in uppercase tracking */}
                  <span 
                    className="font-mono font-medium uppercase tracking-wider text-slate-400 mt-1.5 opacity-90"
                    style={{ 
                      fontSize: node.radius > 75 ? '11px' : node.radius > 65 ? '9.5px' : '8.5px',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {node.data.categoryTag}
                  </span>

                  {/* Level Pill */}
                  <div className="mt-2 flex items-center gap-1">
                    <span 
                      className="font-mono px-2.5 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: `${node.data.color}15`,
                        color: node.data.color,
                        border: `0.8px solid ${node.data.color}40`,
                        fontSize: node.radius > 75 ? '11px' : node.radius > 65 ? '9.5px' : '8.5px'
                      }}
                    >
                      {node.data.level}%
                    </span>
                  </div>
                </div>

                {/* Exterior Halo Ring on hover/drag */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping pointer-events-none opacity-20"
                    style={{ border: `2px solid ${node.data.color}` }}
                  />
                )}
              </div>
            );
          })}

          {/* Interactive floating indicator */}
          <div className="absolute bottom-3 right-4 pointer-events-none text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
            <Move className="w-3 h-3 text-cyan-400 animate-bounce" />
            <span>Click & Drag Bubbles to Move</span>
          </div>
        </div>

        {/* Selected Skill Deep Inspection Bar */}
        {selectedSkill && (
          <motion.div
            key={selectedSkill.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-5 rounded-2xl bg-[#0b101e] border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden"
          >
            <div 
              className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{ backgroundColor: selectedSkill.color }}
            />

            <div className="flex items-center gap-4 pl-2">
              <div 
                className="w-13 h-13 rounded-full flex items-center justify-center font-mono font-black text-sm shrink-0 border"
                style={{ 
                  backgroundColor: `${selectedSkill.color}15`, 
                  borderColor: `${selectedSkill.color}50`,
                  color: selectedSkill.color
                }}
              >
                {selectedSkill.level}%
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">{selectedSkill.name}</h3>
                  <span 
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border"
                    style={{
                      backgroundColor: `${selectedSkill.color}15`,
                      color: selectedSkill.color,
                      borderColor: `${selectedSkill.color}40`
                    }}
                  >
                    {selectedSkill.categoryTag}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {selectedSkill.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-slate-400 shrink-0 self-end sm:self-center">
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[9px]">EXPERIENCE</span>
                <span className="text-white font-bold">{selectedSkill.experience}</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[9px]">PROJECTS</span>
                <span className="font-bold" style={{ color: selectedSkill.color }}>{selectedSkill.projectsCount}+ Systems</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* LeetCode & Problem Solving Highlight Card */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#0d1424] via-[#10182c] to-[#0d1424] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono shadow-sm">
                <Code2 className="w-3.5 h-3.5" />
                <span>Algorithmic Mastery & Foundations</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>LeetCode & Data Structures Engineering</span>
                <Flame className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Consistently practicing algorithmic problem solving on LeetCode with <span className="text-amber-400 font-semibold">150+ problems solved</span> and an <span className="text-emerald-400 font-semibold">85%+ submission acceptance rate</span>. Mastery in Arrays, Two Pointers, Trees, Graphs, Recursion, and Dynamic Programming.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors">Arrays & Hash Maps</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors">Two Pointers</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors">Recursion & Trees</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors">Dynamic Programming</span>
                <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-amber-500/40 transition-colors">OOP & System Design</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-900/70 border border-slate-800 rounded-2xl text-center space-y-3 backdrop-blur-md shadow-inner">
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 font-mono tracking-tight">
                150+
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Algorithmic DSA Problems Solved
              </p>
              <a
                href={profileData.leetcode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-mono font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
