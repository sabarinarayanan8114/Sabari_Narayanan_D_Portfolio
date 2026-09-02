import { 
  ProfileData, 
  Project, 
  SkillCategory, 
  ExperienceItem,
  EducationItem, 
  CertificationItem, 
  AchievementItem, 
  VolunteeringItem 
} from '../types';
import sabariHeroPortrait from '../assets/images/passport_photo.jpeg';
import medHealthBanner from '../assets/images/med_health_banner_1787985786334.jpg';
import expenseTrackerBanner from '../assets/images/expense_tracker_banner_1787985799033.jpg';
import alumniHubBanner from '../assets/images/alumni_hub_banner_1787985817862.jpg';
import safetyVoyageBanner from '../assets/images/safety_voyage_banner_1787985833120.jpg';

export const profileData: ProfileData = {
  name: "Sabari Narayanan D",
  title: "Full-Stack Developer & Computer Science Engineer",
  tagline: "Building scalable web platforms, resilient distributed systems, and intelligent digital products.",
  bio: "Final-year B.E. CSE student skilled in Java, Python, and full-stack development. Built an Expense Tracker (JavaFX, Spring Boot, MySQL) and Med Health, a hospital management website (React.js, Node.js, Express.js, MongoDB). Certified in SQL, Java, Big Data, and Cloud Computing. Participated in Smart India Hackathon 2025.",
  avatar: sabariHeroPortrait,
  location: "Coimbatore, Tamil Nadu, India",
  phone: "+91-9952887360",
  email: "dsabari2408@gmail.com",
  linkedin: "https://linkedin.com/in/sabari-narayanan-d-8114sj",
  github: "https://github.com/sabarinarayanan8114",
  leetcode: "https://leetcode.com/SabariNarayanan2004",
  availability: "Available for SDE Roles & Internships",
  yearsOfStudy: "2023 – 2027",
  cgpa: "8.02 / 10",
  leetcodeSolved: 150,
};

export const quickStats = [
  { label: "LeetCode Solved", value: "150+", subtext: "85%+ Submission Consistency", icon: "Code2" },
  { label: "Engineering CGPA", value: "8.02", subtext: "V.S.B College of Engineering", icon: "GraduationCap" },
  { label: "Certifications", value: "4+", subtext: "NPTEL Elite, HackerRank, NASSCOM", icon: "Award" },
  { label: "Smart India Hackathon", value: "SIH 2025", subtext: "Active Participant", icon: "Trophy" },
];

export const projectCategories = [
  { id: 'all', label: 'All Projects', count: 4 },
  { id: 'fullstack', label: 'Full-Stack', count: 3 },
  { id: 'web', label: 'Web Applications', count: 2 },
  { id: 'backend-systems', label: 'Java & Systems', count: 1 },
  { id: 'hackathon', label: 'Hackathons', count: 1 },
];

export const projects: Project[] = [
  {
    id: "med-health",
    title: "Med Health",
    subtitle: "Enterprise Hospital & Appointment Management Platform",
    category: "web",
    featured: true,
    description: "A comprehensive hospital management ecosystem facilitating seamless patient onboarding, real-time doctor appointment booking, and role-based administrative workflows.",
    longDescription: "Med Health was engineered to digitize and optimize hospital clinic operations. The platform offers multi-tier role access for patients, doctors, and clinic admins. It includes full appointment scheduling workflows, health history archival, automated availability slots, and an analytical dashboard for clinic administrators.",
    keyFeatures: [
      "RESTful API suite built with Express.js handling authentication, appointments, and doctor schedules.",
      "MongoDB database integration with optimized indexing for rapid retrieval of medical records.",
      "Dynamic interactive React frontend with responsive appointment booking and instant status confirmations.",
      "Administrative overview panel with real-time statistics on daily patient footfall and practitioner workload."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Tailwind CSS"],
    liveUrl: "https://med-health-three.vercel.app",
    githubUrl: "https://github.com/sabarinarayanan8114/med-health",
    badge: "Live Production",
    metrics: "Sub-100ms API response time",
    role: "Full-Stack Developer",
    imageColor: "from-cyan-900/40 via-sky-950/60 to-slate-900",
    gradient: "from-cyan-500 to-blue-600",
    imageUrl: medHealthBanner
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    subtitle: "Enterprise Financial Tracker & Analytics Engine",
    category: "backend-systems",
    featured: true,
    description: "A full-stack financial tracking suite pairing a JavaFX interface with robust Spring Boot REST APIs and relational MySQL database for granular expense monitoring.",
    longDescription: "Engineered with strict Object-Oriented Principles (OOP) to guarantee long-term modularity and scalability. Users can log daily transactions, categorize discretionary and non-discretionary expenses, configure automated monthly budget ceilings, and generate visual analytic breakdowns.",
    keyFeatures: [
      "High-throughput Spring Boot REST micro-endpoints handling transaction recording and analytics.",
      "Relational MySQL persistence with optimized queries for multi-category and time-range filtering.",
      "Interactive JavaFX & modern web dashboard with category-wise visual breakdowns and monthly summaries.",
      "OOP-based modular architecture adhering to SOLID design principles for high maintainability."
    ],
    techStack: ["Java", "Spring Boot", "JavaFX", "MySQL", "REST API Design", "Maven"],
    liveUrl: "https://expense-tracker-project-virid.vercel.app/",
    githubUrl: "https://github.com/sabarinarayanan8114/Expense-Tracker",
    badge: "Live System",
    metrics: "100% Reliable Persistence & Analytics",
    role: "Backend & Systems Architect",
    imageColor: "from-emerald-950/50 via-teal-950/60 to-slate-900",
    gradient: "from-emerald-500 to-teal-600",
    imageUrl: expenseTrackerBanner
  },
  {
    id: "alumni-referral-hub",
    title: "Alumni Referral Hub",
    subtitle: "Campus-to-Industry Career & Mentorship Network",
    category: "fullstack",
    featured: true,
    description: "A centralized platform bridging the gap between university students and working alumni to facilitate verified job referrals, portfolio reviews, and mentorship.",
    longDescription: "Alumni Referral Hub enables college students to directly connect with verified alumni working across top product companies. It streamlines the referral lifecycle, allowing candidates to submit resumes and track application progress while empowering alumni to vet applicants.",
    keyFeatures: [
      "Role-based authentication dividing student applicants, working alumni referrers, and administrators.",
      "Referral pipeline board enabling alumni to review resumes and submit internal company referrals.",
      "Direct messaging channel for career mentorship, mock interview prep, and technical guidance.",
      "Cloud-hosted resilient backend with automated email notifications on referral status updates."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloud Services", "REST APIs"],
    liveUrl: "https://alumni-referral-hub.onrender.com",
    githubUrl: "https://github.com/sabarinarayanan8114/alumni-referral-hub",
    badge: "Deployed on Render",
    metrics: "Active Multi-User Referral Portal",
    role: "Full-Stack Lead",
    imageColor: "from-indigo-950/50 via-violet-950/60 to-slate-900",
    gradient: "from-indigo-500 to-purple-600",
    imageUrl: alumniHubBanner
  },
  {
    id: "safety-voyage",
    title: "Safety Voyage",
    subtitle: "Smart Travel & Passenger Safety System (SIH 2025)",
    category: "hackathon",
    featured: false,
    description: "An intelligent travel safety architecture developed for the Smart India Hackathon (SIH 2025), focusing on passenger transit protection and rapid emergency escalation.",
    longDescription: "Created to enhance passenger safety and transit monitoring across intra-city journeys. The system captures live transit telemetrics, generates geofence alert triggers, and provides immediate emergency SOS escalation dispatch for passengers in transit.",
    keyFeatures: [
      "Real-time GPS telemetric tracking with automated emergency alert triggers.",
      "Python-driven backend handling telemetry ingestion and geofence boundary checks.",
      "Emergency SOS dispatch pipeline integrating SMS gateway and live hospital locator.",
      "Active participant in Smart India Hackathon (SIH 2025) college-level hackathon."
    ],
    techStack: ["Python", "Cloud Computing", "REST APIs", "IoT Telemetry", "Geofencing"],
    githubUrl: "https://github.com/sabarinarayanan8114",
    badge: "SIH 2025 Participant",
    metrics: "SIH 2025 Hackathon Project",
    role: "Lead Systems & Python Engineer",
    imageColor: "from-amber-950/40 via-orange-950/60 to-slate-900",
    gradient: "from-amber-500 to-orange-600",
    imageUrl: safetyVoyageBanner
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    description: "Core programming languages for application and backend engineering",
    skills: [
      { name: "Java", level: 92, iconName: "Coffee", category: "Languages", highlight: true },
      { name: "JavaScript (ES6+)", level: 88, iconName: "Code", category: "Languages", highlight: true },
      { name: "SQL", level: 90, iconName: "Database", category: "Languages", highlight: true },
      { name: "HTML5 / CSS3", level: 95, iconName: "Layout", category: "Languages" }
    ]
  },
  {
    title: "Backend & Frameworks",
    description: "Architectural frameworks for high-concurrency APIs & microservices",
    skills: [
      { name: "Spring Boot", level: 86, iconName: "Zap", category: "Backend", highlight: true },
      { name: "Node.js", level: 88, iconName: "Server", category: "Backend", highlight: true },
      { name: "Express.js", level: 90, iconName: "Cpu", category: "Backend" },
      { name: "JavaFX", level: 85, iconName: "AppWindow", category: "Backend" },
      { name: "RESTful API Design", level: 92, iconName: "Network", category: "Backend", highlight: true }
    ]
  },
  {
    title: "Frontend & Web",
    description: "Client-side libraries and responsive interface tools",
    skills: [
      { name: "React.js", level: 90, iconName: "Atom", category: "Frontend", highlight: true },
      { name: "Tailwind CSS", level: 92, iconName: "Palette", category: "Frontend" },
      { name: "Responsive UI/UX", level: 90, iconName: "Smartphone", category: "Frontend" },
      { name: "State Management", level: 85, iconName: "Layers", category: "Frontend" },
      { name: "Vite & Tooling", level: 88, iconName: "Wrench", category: "Frontend" }
    ]
  },
  {
    title: "Databases & Cloud",
    description: "Persistent storage, database optimization, and cloud services",
    skills: [
      { name: "MySQL", level: 90, iconName: "Database", category: "Databases", highlight: true },
      { name: "MongoDB", level: 88, iconName: "Boxes", category: "Databases", highlight: true },
      { name: "Cloud Computing", level: 85, iconName: "Cloud", category: "Cloud", highlight: true },
      { name: "Big Data Principles", level: 80, iconName: "HardDrive", category: "Cloud" },
      { name: "Git & GitHub", level: 92, iconName: "GitBranch", category: "Tools" },
      { name: "VS Code & Postman", level: 94, iconName: "Terminal", category: "Tools" }
    ]
  },
  {
    title: "Core CS & Soft Skills",
    description: "Computer science foundational theory and interpersonal competencies",
    skills: [
      { name: "Data Structures & Algorithms (DSA)", level: 88, iconName: "Boxes", category: "Core CS", highlight: true },
      { name: "Object-Oriented Programming (OOP)", level: 94, iconName: "Shield", category: "Core CS", highlight: true },
      { name: "Database Management Systems (DBMS)", level: 90, iconName: "TableProperties", category: "Core CS" },
      { name: "Problem Solving & Analytical Thinking", level: 92, iconName: "BrainCircuit", category: "Core CS" },
      { name: "Team Leadership & Coordination", level: 90, iconName: "Users", category: "Soft Skills" },
      { name: "Fast Learner & Adaptive Mindset", level: 95, iconName: "Sparkles", category: "Soft Skills" }
    ]
  }
];

export const experienceList: ExperienceItem[] = [
  {
    id: "viruzverse-fullstack",
    role: "Full Stack Developer (MERN)",
    company: "VIRUZVERSE Solutions",
    employmentType: "Internship / Full Stack Role",
    duration: "December 2025",
    location: "Coimbatore, India",
    description: [
      "Built 3 full-stack production modules handling 1,000+ daily transactions using MongoDB, Express.js, React.js, and Node.js.",
      "Implemented JWT-based authentication and RESTful APIs supporting 5,000+ user records with role-based access control.",
      "Reduced application defects by 40% through structured code reviews, refactoring, and performance optimization."
    ],
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Authentication", "RESTful APIs", "MERN Stack"],
    stats: [
      { label: "Daily Transactions", value: "1,000+" },
      { label: "User Records Managed", value: "5,000+" },
      { label: "Defect Reduction", value: "40%" }
    ]
  }
];

export const educationList: EducationItem[] = [
  {
    id: "vsb-be-cse",
    institution: "V.S.B College of Engineering Technical Campus",
    degree: "B.E. in Computer Science and Engineering",
    score: "CGPA: 8.02 / 10",
    duration: "2023 – 2027",
    location: "Coimbatore, Tamil Nadu, India",
    courses: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java/C++)",
      "Database Management Systems (DBMS)",
      "Cloud Computing & Distributed Systems",
      "Operating Systems & Computer Networks",
      "Web Technologies & REST API Design"
    ],
    highlights: [
      "Consistent academic performance maintaining an 8.02 CGPA across rigorous engineering coursework.",
      "Active participant and coordinator in college technical symposiums and coding competitions.",
      "Active participant in the college-level Smart India Hackathon (SIH 2025)."
    ]
  },
  {
    id: "slv-hsc",
    institution: "Sri Lathangi Vidhya Mandir Higher Secondary School",
    degree: "Higher Secondary Certificate (H.S.C - 12th Grade)",
    score: "80% Distinction",
    duration: "2021 – 2023",
    location: "Pollachi, Tamil Nadu, India",
    courses: [
      "Computer Science",
      "Mathematics",
      "Physics",
      "Chemistry"
    ],
    highlights: [
      "Built early foundational programming skills in C++ and Python during senior secondary school.",
      "Graduated with 80% marks with high standing in Mathematics and Science."
    ]
  }
];

export const certificationsList: CertificationItem[] = [
  {
    id: "nptel-cloud",
    title: "Cloud Computing – Elite Certification",
    issuer: "NPTEL (National Programme on Technology Enhanced Learning)",
    issueDate: "April 2026",
    credentialId: "NPTEL26CS55S1063300735",
    skills: ["Cloud Architecture", "Virtualization", "Resource Provisioning", "Distributed Computing"],
    badgeColor: "border-sky-500/30 text-sky-400 bg-sky-950/40"
  },
  {
    id: "nptel-bigdata",
    title: "Big Data Computing – Elite Certification",
    issuer: "NPTEL Elite Certification",
    issueDate: "November 2025",
    credentialId: "NPTEL25CS131S1266300568",
    skills: ["Hadoop Ecosystem", "MapReduce", "Big Data Analytics", "Distributed Storage"],
    badgeColor: "border-indigo-500/30 text-indigo-400 bg-indigo-950/40"
  },
  {
    id: "hackerrank-java",
    title: "Java (Basic) Skills Certification",
    issuer: "HackerRank",
    issueDate: "July 2025",
    credentialId: "000EA037EB1A",
    skills: ["Core Java", "OOP Principles", "Exception Handling", "Collections Framework"],
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-950/40"
  },
  {
    id: "nasscom-cloud",
    title: "Introduction to Cloud Computing",
    issuer: "NASSCOM FutureSkills",
    issueDate: "June 2026",
    skills: ["IaaS/PaaS/SaaS Models", "Cloud Security", "Scalability", "DevOps Fundamentals"],
    badgeColor: "border-purple-500/30 text-purple-400 bg-purple-950/40"
  }
];

export const achievementsList: AchievementItem[] = [
  {
    id: "sih-2025",
    title: "SIH 2025 Internal Hackathon",
    event: "SIH Internal College Hackathon",
    rank: "Ranked Top 5 / 15 Teams",
    description: "Ranked top 5 out of 15 teams for the SAFETY VOYAGE Smart Travel Project System in College level.",
    date: "2025",
    highlightText: "Top 5 of 15 Teams",
    stats: "Smart India Hackathon",
    tags: ["Hackathon", "IoT & Python", "Rapid Prototyping", "Team Presentation"]
  },
  {
    id: "leetcode-achievement",
    title: "150+ LeetCode DSA Problems Solved",
    event: "LeetCode Competitive Programming",
    rank: "85%+ Consistency",
    description: "Maintained an active problem-solving streak on LeetCode covering key algorithmic paradigms including Arrays, Two Pointers, Strings, Recursion, Trees, and Dynamic Programming.",
    date: "Continuous",
    highlightText: "150+ Solved",
    stats: "85%+ Acceptance",
    tags: ["Algorithms", "Data Structures", "Dynamic Programming", "Java Solutions"]
  }
];

export const volunteeringList: VolunteeringItem[] = [
  {
    id: "comm-club",
    role: "Communication Club Coordinator",
    organization: "V.S.B College of Engineering Technical Campus",
    duration: "2024 – Present",
    description: [
      "Coordinated college-wide coding events, technical hack-nights, and peer learning sessions.",
      "Mentored junior engineering students in problem solving, Git version control, and web fundamentals.",
      "Facilitated collaborative learning circles that boosted student hackathon participation by 40%."
    ],
    impact: "Impacted 150+ students across technical workshops",
    skillsGained: ["Team Leadership", "Event Coordination", "Technical Mentorship", "Public Speaking"]
  },
  {
    id: "digital-team",
    role: "Digital Team Member – College Events & Cultures",
    organization: "V.S.B College Cultural & Technical Committees",
    duration: "2023 – Present",
    description: [
      "Designed creative digital posters, UI graphics, and marketing assets for major college events and symposiums.",
      "Collaborated with cross-functional committees to ensure brand consistency across all online channels.",
      "Spearheaded social media visual campaigns reaching thousands of prospective attendees."
    ],
    impact: "Designed 30+ official promotional assets for institutional fests",
    skillsGained: ["Graphic Design", "Brand Consistency", "Cross-functional Collaboration", "Digital Marketing"]
  }
];
