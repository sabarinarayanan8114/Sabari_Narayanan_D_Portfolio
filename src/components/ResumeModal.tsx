import React, { useRef, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  ExternalLink, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Code2, 
  Sparkles,
  FileText,
  ChevronDown
} from 'lucide-react';
import { profileData, experienceList, educationList, certificationsList, achievementsList, volunteeringList, projects } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const resumePrintRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getPlainResumeText = () => {
    return `
SABARI NARAYANAN D
Coimbatore, Tamil Nadu | ${profileData.phone} | ${profileData.email}
LinkedIn: ${profileData.linkedin} | GitHub: ${profileData.github} | LeetCode: ${profileData.leetcode}

PROFESSIONAL SUMMARY
${profileData.bio}

PROFESSIONAL EXPERIENCE
Full Stack Developer (MERN) | VIRUZVERSE Solutions — December 2025
• Built 3 full-stack production modules handling 1,000+ daily transactions using MongoDB, Express.js, React.js, and Node.js.
• Implemented JWT-based authentication and RESTful APIs supporting 5,000+ user records with role-based access control.
• Reduced application defects by 40% through structured code reviews, refactoring, and performance optimization.

EDUCATION
V.S.B College of Engineering Technical Campus – Coimbatore, India (2023 – 2027)
B.E. in Computer Science and Engineering — CGPA: 8.02/10

Sri Lathangi Vidhya Mandir Higher Secondary School – Pollachi, India (2021 – 2023)
H.S.C (Higher Secondary Education: 80%)

TECHNICAL SKILLS
Languages: Java, Python, JavaScript, TypeScript, SQL, HTML5, CSS3
Backend & Frameworks: Spring Boot, JavaFX, Express.js, Node.js, REST API Design
Web Technologies: React.js, Tailwind CSS, Responsive Web Design
Databases & Tools: MySQL, MongoDB, Git, GitHub, VS Code, Postman
Core CS: Data Structures & Algorithms (DSA), OOP, DBMS, Big Data, Cloud Computing
Soft Skills: Teamwork, Quick Learner, Adaptability, Decision-Making

PROJECTS
• Expense Tracker — Java, JavaFX, Spring Boot, MySQL (https://expense-tracker-project-virid.vercel.app/)
  - Built a full-stack expense tracking app with JavaFX UI and Spring Boot REST APIs for managing, tracking, and analyzing expenses.
  - Implemented MySQL for persistent data storage with OOP-based modular architecture for scalability and maintainability.
  - Enabled category-wise expense breakdowns and summary views for efficient financial tracking.

• Med Health — React.js, Node.js, Express.js, MongoDB (https://med-health-three.vercel.app)
  - Designed and developed RESTful APIs using Node.js and Express.js to handle core hospital operations including patient registration, appointment booking, and admin dashboard management.
  - Integrated MongoDB as the primary database for persistent, scalable storage of patient records and appointment data.
  - Built a responsive React.js front-end that communicates with backend APIs, delivering an intuitive interface for hospital staff and patients.

• Alumni Referral Hub — React.js, Node.js, Express.js, MongoDB (https://alumni-referral-hub.onrender.com)
  - Centralized referral bridge connecting students with verified company alumni for job referrals and mentorship.

CERTIFICATIONS
• Hacker Rank Certified – Java (Basic) — July 2025 (ID: 000EA037EB1A)
• Big Data Computing – NPTEL Elite Certification — November 2025 (ID: NPTEL25CS131S1266300568)
• Cloud Computing – NPTEL Elite Certification — April 2026 (ID: NPTEL26CS55S1063300735)
• Introduction to Cloud Computing – NASSCOM — June 2026

ACHIEVEMENTS AND HACKATHONS
• SIH 2025 Internal Hackathon — Active participant in the college-level Smart India Hackathon for the SAFETY VOYAGE Smart Travel Project System.
• LeetCode — Solved 150+ problems across Arrays, Strings, Recursion, and Dynamic Programming with 85%+ submission consistency.

VOLUNTEERING
• Communication Club Coordinator — V.S.B College of Engineering (Coordinated coding events & technical programs)
• Digital Team Member — College Events & Cultures (Designed promotional posters and digital brand collateral)
    `.trim();
  };

  const handleCopyText = () => {
    const plainResume = getPlainResumeText();
    navigator.clipboard.writeText(plainResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast('Full plain-text resume copied to clipboard!');
  };

  const handleDownloadFile = (type: 'txt' | 'doc' = 'txt') => {
    setShowDownloadMenu(false);
    const plainText = getPlainResumeText();
    let content = plainText;
    let mimeType = 'text/plain;charset=utf-8';
    let filename = 'Sabari_Narayanan_D_Resume.txt';

    if (type === 'doc') {
      mimeType = 'application/msword;charset=utf-8';
      filename = 'Sabari_Narayanan_D_Resume.doc';
      content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Sabari Narayanan D - Resume</title>
          <style>
            body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #111; }
            h1 { font-size: 18pt; margin: 0 0 4pt 0; text-transform: uppercase; }
            h2 { font-size: 12pt; border-bottom: 1.5pt solid #000; padding-bottom: 2pt; margin-top: 12pt; margin-bottom: 4pt; text-transform: uppercase; font-weight: bold; }
            p { margin: 2pt 0; }
            ul { margin: 2pt 0 6pt 18pt; padding: 0; }
            li { margin-bottom: 2pt; }
            .meta { font-size: 10pt; color: #333; }
            .role-header { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>SABARI NARAYANAN D</h1>
          <p class="meta">Coimbatore, Tamil Nadu | ${profileData.phone} | ${profileData.email}</p>
          <p class="meta">LinkedIn: ${profileData.linkedin} | GitHub: ${profileData.github} | LeetCode: ${profileData.leetcode}</p>
          
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>${profileData.bio}</p>

          <h2>EDUCATION</h2>
          <p><strong>V.S.B College of Engineering Technical Campus - Coimbatore, India</strong> (2023 - 2027)<br/>B.E. in Computer Science and Engineering | CGPA: 8.02/10</p>
          <p><strong>Sri Lathangi Vidhya Mandir Higher Secondary School - Pollachi, India</strong> (2021 - 2023)<br/>H.S.C (Higher Secondary Education: 80%)</p>

          <h2>TECHNICAL SKILLS</h2>
          <p><strong>Languages:</strong> Java, Python, JavaScript, TypeScript, SQL, HTML5, CSS3<br/>
          <strong>Backend & Frameworks:</strong> Spring Boot, JavaFX, Express.js, Node.js, REST API Design<br/>
          <strong>Web Technologies:</strong> React.js, Tailwind CSS, Responsive Web Design<br/>
          <strong>Databases & Tools:</strong> MySQL, MongoDB, Git, GitHub, VS Code, Postman<br/>
          <strong>Core CS:</strong> DSA, OOP, DBMS, Big Data, Cloud Computing<br/>
          <strong>Soft Skills:</strong> Teamwork, Quick Learner, Adaptability, Decision-Making</p>

          <h2>PROFESSIONAL EXPERIENCE</h2>
          <p><strong>Full Stack Developer (MERN) | VIRUZVERSE Solutions</strong> (December 2025)</p>
          <ul>
            <li>Built 3 full-stack production modules handling 1,000+ daily transactions using MongoDB, Express.js, React.js, and Node.js.</li>
            <li>Implemented JWT-based authentication and RESTful APIs supporting 5,000+ user records with role-based access control.</li>
            <li>Reduced application defects by 40% through structured code reviews, refactoring, and performance optimization.</li>
          </ul>

          <h2>PROJECTS</h2>
          <p><strong>Expense Tracker</strong> (Java, JavaFX, Spring Boot, MySQL)</p>
          <ul>
            <li>Built a full-stack expense tracking app with JavaFX UI and Spring Boot REST APIs for managing, tracking, and analyzing expenses.</li>
            <li>Implemented MySQL for persistent data storage with OOP-based modular architecture for scalability and maintainability.</li>
            <li>Enabled category-wise expense breakdowns and summary views for efficient financial tracking.</li>
          </ul>
          <p><strong>Med Health</strong> (React.js, Node.js, Express.js, MongoDB)</p>
          <ul>
            <li>Designed and developed RESTful APIs using Node.js and Express.js to handle core hospital operations including patient registration, appointment booking, and admin dashboard management.</li>
            <li>Integrated MongoDB as the primary database for persistent, scalable storage of patient records and appointment data.</li>
            <li>Built a responsive React.js front-end that communicates with backend APIs, delivering an intuitive interface for hospital staff and patients.</li>
          </ul>

          <h2>CERTIFICATIONS</h2>
          <ul>
            <li>Hacker Rank Certified - Java (Basic) - July 2025 (Credential ID: 000EA037EB1A)</li>
            <li>Big Data Computing - NPTEL Elite Certification - November 2025 (Credential ID: NPTEL25CS131S1266300568)</li>
            <li>Cloud Computing - NPTEL Elite Certification - April 2026 (Credential ID: NPTEL26CS55S1063300735)</li>
            <li>Introduction to Cloud Computing - NASSCOM - June 2026</li>
          </ul>

          <h2>ACHIEVEMENTS AND HACKATHONS</h2>
          <ul>
            <li>SIH 2025 Smart India Hackathon - Ranked in top 10 out of 50 teams at college-level for SAFETY VOYAGE system.</li>
            <li>LeetCode - Solved 150+ problems with 85%+ consistency across Arrays, Strings, Recursion, and DP.</li>
          </ul>

          <h2>VOLUNTEERING</h2>
          <ul>
            <li>Communication Club Coordinator - V.S.B College of Engineering</li>
            <li>Digital Team Member - College Events & Cultures</li>
          </ul>
        </body>
        </html>
      `;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(`Resume downloaded as ${filename}`);
  };

  return (
    <div 
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Top Controls Bar */}
        <div className="bg-[#121826] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
              RESUME DOCUMENT
            </span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline">
              Sabari_Narayanan_D_Resume.pdf
            </span>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* Copy Text Button */}
            <button
              id="resume-copy-text-btn"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg transition-colors hover:border-slate-600"
              title="Copy plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            {/* Download Resume Option Button with Quick Dropdown */}
            <div className="relative">
              <button
                id="resume-download-btn"
                onClick={() => handleDownloadFile('txt')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-200 hover:text-white bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-700/80 rounded-lg transition-all shadow-sm"
                title="Download formatted resume file"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>Download Resume</span>
              </button>

              <button
                id="resume-download-menu-toggle"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="p-1.5 text-slate-400 hover:text-white bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-700/80 border-l-0 rounded-r-lg transition-colors -ml-1 hidden"
                title="Download formats"
              >
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Format selection popover */}
              {showDownloadMenu && (
                <div className="absolute right-0 mt-1.5 w-44 bg-[#0d1322] border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs font-mono">
                  <button
                    onClick={() => handleDownloadFile('txt')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>Plain Text (.txt)</span>
                    <FileText className="w-3 h-3 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => handleDownloadFile('doc')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>Word Document (.doc)</span>
                    <FileText className="w-3 h-3 text-indigo-400" />
                  </button>
                  <button
                    onClick={() => { setShowDownloadMenu(false); handlePrint(); }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between border-t border-slate-800 mt-1 pt-1.5"
                  >
                    <span>PDF / Print</span>
                    <Printer className="w-3 h-3 text-emerald-400" />
                  </button>
                </div>
              )}
            </div>

            {/* Print / PDF Button */}
            <button
              id="resume-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors shadow-sm"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950/50">
          <div 
            ref={resumePrintRef}
            className="max-w-3xl mx-auto bg-[#0f1422] text-slate-200 border border-slate-800 p-6 sm:p-10 rounded-xl shadow-xl space-y-6 text-sm leading-relaxed"
          >
            {/* Resume Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-slate-700/80">
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profileData.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {profileData.location} <span className="text-slate-500">|</span> {profileData.phone} <span className="text-slate-500">|</span> <a href={`mailto:${profileData.email}`} className="text-cyan-300 hover:text-cyan-200 underline font-semibold transition-colors">{profileData.email}</a>
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs font-mono text-slate-400 pt-1">
                  <span>LinkedIn: <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">linkedin.com/in/sabari-narayanan-d-8114sj</a></span>
                  <span className="hidden sm:inline text-slate-600">|</span>
                  <span>GitHub: <a href={profileData.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">github.com/sabarinarayanan8114</a></span>
                  <span className="hidden sm:inline text-slate-600">|</span>
                  <span>LeetCode: <a href={profileData.leetcode} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">leetcode.com/SabariNarayanan2004</a></span>
                </div>
              </div>

              {profileData.avatar && (
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl border border-slate-700 p-1 bg-slate-900 shrink-0 shadow-md">
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.name} 
                    className="w-full h-full object-cover object-top rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {profileData.bio}
              </p>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4 text-xs sm:text-sm">
                {experienceList.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap justify-between font-semibold text-white">
                      <span>
                        <span className="font-bold text-cyan-300">{exp.role}</span> | {exp.company}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{exp.duration}</span>
                    </div>
                    <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-300 text-xs">
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                EDUCATION
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between font-semibold text-white">
                    <span>V.S.B College of Engineering Technical Campus – Coimbatore, India</span>
                    <span className="font-mono text-xs text-slate-400">2023 – 2027</span>
                  </div>
                  <p className="text-slate-300">B.E. in Computer Science and Engineering — <span className="text-emerald-400 font-bold">CGPA: 8.02 / 10</span></p>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-white">
                    <span>Sri Lathangi Vidhya Mandir Higher Secondary School – Pollachi, India</span>
                    <span className="font-mono text-xs text-slate-400">2021 – 2023</span>
                  </div>
                  <p className="text-slate-300">H.S.C (Higher Secondary Education: <span className="text-emerald-400 font-bold">80% Distinction</span>)</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div><span className="font-semibold text-white">Languages:</span> <span className="text-slate-300">Java, Python, JavaScript, TypeScript, SQL, HTML, CSS</span></div>
                <div><span className="font-semibold text-white">Backend & Frameworks:</span> <span className="text-slate-300">Spring Boot, JavaFX, Express.js, Node.js, REST API Design</span></div>
                <div><span className="font-semibold text-white">Web Technologies:</span> <span className="text-slate-300">React.js, Node.js, HTML, CSS, JavaScript, Tailwind CSS</span></div>
                <div><span className="font-semibold text-white">Databases & Tools:</span> <span className="text-slate-300">MySQL, Git, GitHub, VS Code, MongoDB, Postman</span></div>
                <div><span className="font-semibold text-white">Core CS:</span> <span className="text-slate-300">DSA, OOP, DBMS, Big Data, Cloud Computing</span></div>
                <div><span className="font-semibold text-white">Soft Skills:</span> <span className="text-slate-300">Teamwork, Quick Learner, Adaptability, Decision-Making</span></div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                PROJECTS
              </h2>
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className="flex flex-wrap justify-between font-semibold text-white">
                    <span className="font-bold text-cyan-300">Expense Tracker</span>
                    <span className="font-mono text-xs text-slate-400">Java, JavaFX, Spring Boot, MySQL</span>
                  </div>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300 text-xs">
                    <li>Built a full-stack expense tracking app with JavaFX UI and Spring Boot REST APIs for managing, tracking, and analyzing expenses.</li>
                    <li>Implemented MySQL for persistent data storage with OOP-based modular architecture for scalability and maintainability.</li>
                    <li>Enabled category-wise expense breakdowns and summary views for efficient financial tracking.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap justify-between font-semibold text-white">
                    <span className="font-bold text-cyan-300">Med Health</span>
                    <span className="font-mono text-xs text-slate-400">React.js, Node.js, Express.js, MongoDB</span>
                  </div>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300 text-xs">
                    <li>Designed and developed RESTful APIs using Node.js and Express.js to handle core hospital operations including patient registration, appointment booking, and admin dashboard management.</li>
                    <li>Integrated MongoDB as the primary database for persistent, scalable storage of patient records and appointment data.</li>
                    <li>Built a responsive React.js front-end that communicates with backend APIs, delivering an intuitive interface for hospital staff and patients.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap justify-between font-semibold text-white">
                    <span className="font-bold text-cyan-300">Alumni Referral Hub</span>
                    <span className="font-mono text-xs text-slate-400">React.js, Node.js, Express.js, MongoDB</span>
                  </div>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300 text-xs">
                    <li>Engineered campus-to-industry network facilitating verified job referrals, resume review pipelines, and career mentorship for students.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                CERTIFICATIONS
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><span className="font-semibold text-white">&bull; Hacker Rank Certified – Java (Basic)</span> — July 2025 <span className="font-mono text-cyan-400">(ID: 000EA037EB1A)</span></li>
                <li><span className="font-semibold text-white">&bull; Big Data Computing – NPTEL Elite Certification</span> — November 2025 <span className="font-mono text-cyan-400">(ID: NPTEL25CS131S1266300568)</span></li>
                <li><span className="font-semibold text-white">&bull; Cloud Computing – NPTEL Elite Certification</span> — April 2026 <span className="font-mono text-cyan-400">(ID: NPTEL26CS55S1063300735)</span></li>
                <li><span className="font-semibold text-white">&bull; Introduction to Cloud Computing – NASSCOM</span> — June 2026</li>
              </ul>
            </div>

            {/* Achievements and Hackathons */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                ACHIEVEMENTS AND HACKATHONS
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><span className="font-semibold text-white">&bull; SIH 2025 Internal Hackathon:</span> Active participant in the college-level Smart India Hackathon for the SAFETY VOYAGE Smart Travel Project System.</li>
                <li><span className="font-semibold text-white">&bull; LeetCode:</span> Solved 150+ problems across Arrays, Strings, Recursion, and Dynamic Programming with 85%+ submission consistency.</li>
              </ul>
            </div>

            {/* Volunteering */}
            <div>
              <h2 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold mb-2 pb-1 border-b border-slate-800">
                VOLUNTEERING & LEADERSHIP
              </h2>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <p className="font-semibold text-white">Communication Club Coordinator</p>
                  <p className="text-slate-400">Coordinated coding events and technical programs, encouraging student participation and collaborative learning.</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Digital Team Member — College Events & Cultures</p>
                  <p className="text-slate-400">Actively contributed to the college's digital team by designing creative posters and templates for college events, fests, and cultural programs.</p>
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <p className="font-semibold text-slate-300">DECLARATION</p>
              <p>I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.</p>
              <div className="flex justify-between items-end pt-4">
                <span>Place: Coimbatore</span>
                <span className="font-semibold text-white">Sabari Narayanan D</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
