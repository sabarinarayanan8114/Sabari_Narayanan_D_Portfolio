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
  FileText,
  ChevronDown
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

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
LinkedIn: linkedin.com/in/sabari-narayanan-d-8114sj | GitHub: github.com/sabarinarayanan8114 | LeetCode: leetcode.com/SabariNarayanan2004

PROFESSIONAL SUMMARY
Final-year B.E. CSE student skilled in Java, Python, and full-stack development. Built an Expense Tracker (JavaFX, Spring Boot, MySQL) and Med Health, a hospital management website (React.js, Node.js, Express.js, MongoDB). Certified in SQL, Java, Big Data, and Cloud Computing. Participated in Smart India Hackathon 2025.

EDUCATION
V.S.B College of Engineering Technical Campus – Coimbatore, India                  2023 – 2027
B.E. in Computer Science and Engineering — CGPA: 8.02/10

Sri Lathangi Vidhya Mandir Higher Secondary School – Pollachi, India               2021 – 2023
H.S.C (Higher Secondary Education: 80%)

TECHNICAL SKILLS
Languages: Java
Backend & Frameworks: Spring Boot, JavaFX, Express.js, REST API Design
Web Technologies: React.js, Node.js, HTML, CSS, JavaScript
Databases & Tools: MySQL, Git, GitHub, VS Code, MongoDB
Core CS: DSA, OOP, DBMS, Big Data, Cloud Computing
Soft Skills: Teamwork, Quick Learner, Adaptability, Decision-Making

PROFESSIONAL EXPERIENCE
Full Stack Developer (MERN) | VIRUZVERSE Solutions                                 December 2025
• Built 3 full-stack production modules handling 1,000+ daily transactions using MongoDB, Express.js, React.js, and Node.js.
• Implemented JWT-based authentication and RESTful APIs supporting 5,000+ user records with role-based access control.
• Reduced application defects by 40% through structured code reviews, refactoring, and performance optimization.

PROJECTS
Expense Tracker — Java, JavaFX, Spring Boot, MySQL
• Built a full-stack expense tracking app with JavaFX UI and Spring Boot REST APIs for managing, tracking, and analyzing expenses.
• Implemented MySQL for persistent data storage with OOP-based modular architecture for scalability and maintainability.
• Enabled category-wise expense breakdowns and summary views for efficient financial tracking.

Med Health — React.js, Node.js, Express.js, MongoDB
• Designed and developed RESTful APIs using Node.js and Express.js to handle core hospital operations including patient registration, appointment booking, and admin dashboard management.
• Integrated MongoDB as the primary database for persistent, scalable storage of patient records and appointment data.
• Built a responsive React.js front-end that communicates with backend APIs, delivering an intuitive interface for hospital staff and patients.

CERTIFICATIONS
• Hacker Rank Certified – Java (Basic) — July 2025
  Credential ID: 000EA037EB1A
• Big Data Computing – NPTEL Elite Certification — November 2025
  Credential ID: NPTEL25CS131S1266300568
• Cloud Computing – NPTEL Elite Certification — April 2026
  Credential ID: NPTEL26CS55S1063300735
• Introduction to Cloud Computing – NASSCOM — June 2026

ACHIEVEMENTS AND HACKATHONS
• SIH 2025 Internal Hackathon — Ranked top 5 out of 15 teams for the SAFETY VOYAGE Smart Travel Project System in College level.
• LeetCode — Solved 150+ problems across Arrays, Strings, Recursion, and Dynamic Programming with 85%+ submission consistency.

VOLUNTEERING
Communication Club Coordinator
• Coordinated coding events and technical programs, encouraging student participation and collaborative learning.
Digital Team Member — College Events & Cultures
• Actively contributed to the college's digital team by designing creative posters and templates for college events, fests, and cultural programs.
• Collaborated with the team to maintain visual consistency and promote events across digital platforms.

DECLARATION
I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.

Place: Coimbatore
Date: ________________                                                Sabari Narayanan D
    `.trim();
  };

  const handleCopyText = () => {
    const plainResume = getPlainResumeText();
    navigator.clipboard.writeText(plainResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast('Full resume text copied to clipboard!');
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
            body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.35; color: #000; padding: 20px; }
            h1 { font-size: 19pt; margin: 0 0 4pt 0; text-align: center; text-transform: uppercase; color: #1e3a8a; font-weight: bold; }
            .header-info { text-align: center; font-size: 10pt; color: #222; margin-bottom: 12pt; }
            h2 { font-size: 11.5pt; border-bottom: 1.5pt solid #1e3a8a; padding-bottom: 1.5pt; margin-top: 10pt; margin-bottom: 4pt; text-transform: uppercase; font-weight: bold; color: #1e3a8a; }
            p { margin: 2pt 0; font-size: 10.5pt; }
            ul { margin: 2pt 0 4pt 18pt; padding: 0; }
            li { margin-bottom: 2pt; font-size: 10.5pt; }
            .flex-row { display: flex; justify-content: space-between; font-weight: bold; }
            .table-skills { width: 100%; border-collapse: collapse; margin-top: 2pt; }
            .table-skills td { padding: 1.5pt 0; vertical-align: top; font-size: 10.5pt; }
            .skill-label { font-weight: bold; width: 190px; color: #111; }
          </style>
        </head>
        <body>
          <h1>SABARI NARAYANAN D</h1>
          <div class="header-info">
            Coimbatore, Tamil Nadu | ${profileData.phone} | ${profileData.email}<br/>
            LinkedIn: ${profileData.linkedin} | GitHub: ${profileData.github} | LeetCode: ${profileData.leetcode}
          </div>
          
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>Final-year B.E. CSE student skilled in Java, Python, and full-stack development. Built an Expense Tracker (JavaFX, Spring Boot, MySQL) and Med Health, a hospital management website (React.js, Node.js, Express.js, MongoDB). Certified in SQL, Java, Big Data, and Cloud Computing. Participated in Smart India Hackathon 2025.</p>

          <h2>EDUCATION</h2>
          <table style="width:100%;">
            <tr>
              <td><strong>V.S.B College of Engineering Technical Campus – Coimbatore, India</strong></td>
              <td style="text-align:right;"><strong>2023 – 2027</strong></td>
            </tr>
            <tr>
              <td colspan="2">B.E. in Computer Science and Engineering — CGPA: 8.02/10</td>
            </tr>
            <tr><td colspan="2" style="height:4pt;"></td></tr>
            <tr>
              <td><strong>Sri Lathangi Vidhya Mandir Higher Secondary School – Pollachi, India</strong></td>
              <td style="text-align:right;"><strong>2021 – 2023</strong></td>
            </tr>
            <tr>
              <td colspan="2">H.S.C (Higher Secondary Education: 80%)</td>
            </tr>
          </table>

          <h2>TECHNICAL SKILLS</h2>
          <table class="table-skills">
            <tr><td class="skill-label">Languages:</td><td>Java</td></tr>
            <tr><td class="skill-label">Backend & Frameworks:</td><td>Spring Boot, JavaFX, Express.js, REST API Design</td></tr>
            <tr><td class="skill-label">Web Technologies:</td><td>React.js, Node.js, HTML, CSS, JavaScript</td></tr>
            <tr><td class="skill-label">Databases & Tools:</td><td>MySQL, Git, GitHub, VS Code, MongoDB</td></tr>
            <tr><td class="skill-label">Core CS:</td><td>DSA, OOP, DBMS, Big Data, Cloud Computing</td></tr>
            <tr><td class="skill-label">Soft Skills:</td><td>Teamwork, Quick Learner, Adaptability, Decision-Making</td></tr>
          </table>

          <h2>PROFESSIONAL EXPERIENCE</h2>
          <table style="width:100%;">
            <tr>
              <td><strong>Full Stack Developer (MERN) | VIRUZVERSE Solutions</strong></td>
              <td style="text-align:right;"><strong>December 2025</strong></td>
            </tr>
          </table>
          <ul>
            <li>Built 3 full-stack production modules handling 1,000+ daily transactions using MongoDB, Express.js, React.js, and Node.js.</li>
            <li>Implemented JWT-based authentication and RESTful APIs supporting 5,000+ user records with role-based access control.</li>
            <li>Reduced application defects by 40% through structured code reviews, refactoring, and performance optimization.</li>
          </ul>

          <h2>PROJECTS</h2>
          <p><strong>Expense Tracker</strong> — <em>Java, JavaFX, Spring Boot, MySQL</em></p>
          <ul>
            <li>Built a full-stack expense tracking app with JavaFX UI and Spring Boot REST APIs for managing, tracking, and analyzing expenses.</li>
            <li>Implemented MySQL for persistent data storage with OOP-based modular architecture for scalability and maintainability.</li>
            <li>Enabled category-wise expense breakdowns and summary views for efficient financial tracking.</li>
          </ul>

          <p><strong>Med Health</strong> — <em>React.js, Node.js, Express.js, MongoDB</em></p>
          <ul>
            <li>Designed and developed RESTful APIs using Node.js and Express.js to handle core hospital operations including patient registration, appointment booking, and admin dashboard management.</li>
            <li>Integrated MongoDB as the primary database for persistent, scalable storage of patient records and appointment data.</li>
            <li>Built a responsive React.js front-end that communicates with backend APIs, delivering an intuitive interface for hospital staff and patients.</li>
          </ul>

          <h2>CERTIFICATIONS</h2>
          <ul>
            <li><strong>Hacker Rank Certified – Java (Basic)</strong> — July 2025<br/>Credential ID: 000EA037EB1A</li>
            <li><strong>Big Data Computing – NPTEL Elite Certification</strong> — November 2025<br/>Credential ID: NPTEL25CS131S1266300568</li>
            <li><strong>Cloud Computing – NPTEL Elite Certification</strong> — April 2026<br/>Credential ID: NPTEL26CS55S1063300735</li>
            <li><strong>Introduction to Cloud Computing – NASSCOM</strong> — June 2026</li>
          </ul>

          <h2>ACHIEVEMENTS AND HACKATHONS</h2>
          <ul>
            <li><strong>SIH 2025 Internal Hackathon</strong> — Ranked top 5 out of 15 teams for the SAFETY VOYAGE Smart Travel Project System in College level.</li>
            <li><strong>LeetCode</strong> — Solved 150+ problems across Arrays, Strings, Recursion, and Dynamic Programming with 85%+ submission consistency.</li>
          </ul>

          <h2>VOLUNTEERING</h2>
          <p><strong>Communication Club Coordinator</strong></p>
          <ul>
            <li>Coordinated coding events and technical programs, encouraging student participation and collaborative learning.</li>
          </ul>
          <p><strong>Digital Team Member — College Events & Cultures</strong></p>
          <ul>
            <li>Actively contributed to the college's digital team by designing creative posters and templates for college events, fests, and cultural programs.</li>
            <li>Collaborated with the team to maintain visual consistency and promote events across digital platforms.</li>
          </ul>

          <h2>DECLARATION</h2>
          <p>I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.</p>
          <br/>
          <table style="width:100%; margin-top:10pt;">
            <tr>
              <td>Place: Coimbatore<br/>Date: ________________</td>
              <td style="text-align:right; vertical-align:bottom;"><strong>Sabari Narayanan D</strong></td>
            </tr>
          </table>
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
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume-paper, #printable-resume-paper * {
            visibility: visible;
          }
          #printable-resume-paper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="w-full max-w-4xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Top Controls Bar */}
        <div className="bg-[#121826] px-5 py-3.5 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
              LIGHT MODE RESUME
            </span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline font-mono">
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

            {/* Download Resume Button with Dropdown */}
            <div className="relative">
              <button
                id="resume-download-btn"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-200 hover:text-white bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-700/80 rounded-lg transition-all shadow-sm"
                title="Download formatted resume file"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>Download</span>
                <ChevronDown className="w-3 h-3 text-indigo-300" />
              </button>

              {/* Format selection popover */}
              {showDownloadMenu && (
                <div className="absolute right-0 mt-1.5 w-48 bg-[#0d1322] border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs font-mono">
                  <button
                    onClick={() => handleDownloadFile('txt')}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>Plain Text (.txt)</span>
                    <FileText className="w-3 h-3 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => handleDownloadFile('doc')}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                  >
                    <span>Word Document (.doc)</span>
                    <FileText className="w-3 h-3 text-indigo-400" />
                  </button>
                  <button
                    onClick={() => { setShowDownloadMenu(false); handlePrint(); }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between border-t border-slate-800 mt-1 pt-1.5"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors shadow-sm"
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

        {/* Scrollable Printable Light-Mode Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-8 bg-slate-950/70">
          
          <div 
            id="printable-resume-paper"
            ref={resumePrintRef}
            className="max-w-3xl mx-auto bg-white text-slate-900 border border-slate-300 shadow-2xl p-6 sm:p-12 rounded-sm space-y-5 text-sm font-serif leading-normal selection:bg-blue-100 selection:text-blue-900"
          >
            {/* Header: Centered Classic Name & Contact Info */}
            <div className="text-center space-y-1.5 pb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] tracking-tight uppercase font-sans">
                SABARI NARAYANAN D
              </h1>
              
              <p className="text-xs sm:text-[13px] text-slate-700 font-sans">
                <span>Coimbatore, Tamil Nadu</span>
                <span className="mx-2 text-slate-400">|</span>
                <span>{profileData.phone}</span>
                <span className="mx-2 text-slate-400">|</span>
                <a href={`mailto:${profileData.email}`} className="text-blue-700 hover:underline">
                  {profileData.email}
                </a>
              </p>

              <p className="text-xs sm:text-[12px] text-slate-700 font-sans">
                <span>LinkedIn: <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">linkedin.com/in/sabari-narayanan-d-8114sj</a></span>
                <span className="mx-1.5 text-slate-400">|</span>
                <span>GitHub: <a href={profileData.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">github.com/sabarinarayanan8114</a></span>
                <span className="mx-1.5 text-slate-400">|</span>
                <span>LeetCode: <a href={profileData.leetcode} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">leetcode.com/SabariNarayanan2004</a></span>
              </p>
            </div>

            {/* 1. Professional Summary */}
            <div className="space-y-1.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-800 text-justify leading-relaxed">
                Final-year B.E. CSE student skilled in Java, Python, and full-stack development. Built an Expense Tracker (JavaFX, Spring Boot, MySQL) and Med Health, a hospital management website (React.js, Node.js, Express.js, MongoDB). Certified in SQL, Java, Big Data, and Cloud Computing. Participated in Smart India Hackathon 2025.
              </p>
            </div>

            {/* 2. Education */}
            <div className="space-y-2">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                EDUCATION
              </h2>
              
              <div className="space-y-2 text-xs sm:text-[13px]">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>V.S.B College of Engineering Technical Campus – Coimbatore, India</span>
                    <span className="font-sans font-semibold text-slate-800 shrink-0">2023 – 2027</span>
                  </div>
                  <p className="text-slate-800">
                    B.E. in Computer Science and Engineering — CGPA: 8.02/10
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>Sri Lathangi Vidhya Mandir Higher Secondary School – Pollachi, India</span>
                    <span className="font-sans font-semibold text-slate-800 shrink-0">2021 – 2023</span>
                  </div>
                  <p className="text-slate-800">
                    H.S.C (Higher Secondary Education: 80%)
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Technical Skills */}
            <div className="space-y-1.5">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                TECHNICAL SKILLS
              </h2>
              
              <div className="text-xs sm:text-[13px] text-slate-800 space-y-1">
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-2">
                  <span className="font-bold text-slate-900">Languages:</span>
                  <span>Java</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-2">
                  <span className="font-bold text-slate-900">Backend & Frameworks:</span>
                  <span>Spring Boot, JavaFX, Express.js, REST API Design</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-2">
                  <span className="font-bold text-slate-900">Web Technologies:</span>
                  <span>React.js, Node.js, HTML, CSS, JavaScript</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-2">
                  <span className="font-bold text-slate-900">Databases & Tools:</span>
                  <span>MySQL, Git, GitHub, VS Code, MongoDB</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-2">
                  <span className="font-bold text-slate-900">Core CS:</span>
                  <span>DSA, OOP, DBMS, Big Data, Cloud Computing</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-2">
                  <span className="font-bold text-slate-900">Soft Skills:</span>
                  <span>Teamwork, Quick Learner, Adaptability, Decision-Making</span>
                </div>
              </div>
            </div>

            {/* 4. Professional Experience */}
            <div className="space-y-2">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                PROFESSIONAL EXPERIENCE
              </h2>
              
              <div className="space-y-1.5 text-xs sm:text-[13px]">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>Full Stack Developer (MERN) | VIRUZVERSE Solutions</span>
                  <span className="font-sans font-semibold text-slate-800 shrink-0">December 2025</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-slate-800 leading-snug">
                  <li>Built 3 full-stack production modules handling 1,000+ daily transactions using MongoDB, Express.js, React.js, and Node.js.</li>
                  <li>Implemented JWT-based authentication and RESTful APIs supporting 5,000+ user records with role-based access control.</li>
                  <li>Reduced application defects by 40% through structured code reviews, refactoring, and performance optimization.</li>
                </ul>
              </div>
            </div>

            {/* 5. Projects */}
            <div className="space-y-3">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                PROJECTS
              </h2>
              
              <div className="space-y-3 text-xs sm:text-[13px]">
                {/* Project 1 */}
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">
                    Expense Tracker — <span className="font-normal italic">Java, JavaFX, Spring Boot, MySQL</span>
                  </p>
                  <ul className="list-disc ml-5 space-y-1 text-slate-800 leading-snug">
                    <li>Built a full-stack expense tracking app with JavaFX UI and Spring Boot REST APIs for managing, tracking, and analyzing expenses.</li>
                    <li>Implemented MySQL for persistent data storage with OOP-based modular architecture for scalability and maintainability.</li>
                    <li>Enabled category-wise expense breakdowns and summary views for efficient financial tracking.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">
                    Med Health — <span className="font-normal italic">React.js, Node.js, Express.js, MongoDB</span>
                  </p>
                  <ul className="list-disc ml-5 space-y-1 text-slate-800 leading-snug">
                    <li>Designed and developed RESTful APIs using Node.js and Express.js to handle core hospital operations including patient registration, appointment booking, and admin dashboard management.</li>
                    <li>Integrated MongoDB as the primary database for persistent, scalable storage of patient records and appointment data.</li>
                    <li>Built a responsive React.js front-end that communicates with backend APIs, delivering an intuitive interface for hospital staff and patients.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Page Break Indicator for Multi-page Resume Feel */}
            <div className="py-2 border-b border-dashed border-slate-300 relative text-center no-print">
              <span className="bg-white px-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest relative -top-2">
                Page 2
              </span>
            </div>

            {/* 6. Certifications */}
            <div className="space-y-2">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                CERTIFICATIONS
              </h2>
              
              <ul className="list-disc ml-5 space-y-1.5 text-xs sm:text-[13px] text-slate-800">
                <li>
                  <span className="font-bold text-slate-900">Hacker Rank Certified – Java (Basic)</span> — July 2025
                  <div className="text-[11px] text-slate-600 font-mono">Credential ID: 000EA037EB1A</div>
                </li>
                <li>
                  <span className="font-bold text-slate-900">Big Data Computing – NPTEL Elite Certification</span> — November 2025
                  <div className="text-[11px] text-slate-600 font-mono">Credential ID: NPTEL25CS131S1266300568</div>
                </li>
                <li>
                  <span className="font-bold text-slate-900">Cloud Computing – NPTEL Elite Certification</span> — April 2026
                  <div className="text-[11px] text-slate-600 font-mono">Credential ID: NPTEL26CS55S1063300735</div>
                </li>
                <li>
                  <span className="font-bold text-slate-900">Introduction to Cloud Computing – NASSCOM</span> — June 2026
                </li>
              </ul>
            </div>

            {/* 7. Achievements and Hackathons */}
            <div className="space-y-2">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                ACHIEVEMENTS AND HACKATHONS
              </h2>
              
              <ul className="list-disc ml-5 space-y-1.5 text-xs sm:text-[13px] text-slate-800 leading-snug">
                <li>
                  <span className="font-bold text-slate-900">SIH 2025 Internal Hackathon</span> — Ranked top 5 out of 15 teams for the SAFETY VOYAGE Smart Travel Project System in College level.
                </li>
                <li>
                  <span className="font-bold text-slate-900">LeetCode</span> — Solved 150+ problems across Arrays, Strings, Recursion, and Dynamic Programming with 85%+ submission consistency.
                </li>
              </ul>
            </div>

            {/* 8. Volunteering */}
            <div className="space-y-2">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                VOLUNTEERING
              </h2>
              
              <div className="space-y-2 text-xs sm:text-[13px] text-slate-800">
                <div>
                  <p className="font-bold text-slate-900">Communication Club Coordinator</p>
                  <ul className="list-disc ml-5 space-y-0.5 mt-0.5">
                    <li>Coordinated coding events and technical programs, encouraging student participation and collaborative learning.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900">Digital Team Member — College Events & Cultures</p>
                  <ul className="list-disc ml-5 space-y-0.5 mt-0.5">
                    <li>Actively contributed to the college's digital team by designing creative posters and templates for college events, fests, and cultural programs.</li>
                    <li>Collaborated with the team to maintain visual consistency and promote events across digital platforms.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 9. Declaration */}
            <div className="space-y-3 pt-2">
              <h2 className="text-[13px] font-bold text-[#1e3a8a] uppercase tracking-wide border-b-[1.5px] border-[#1e3a8a] pb-0.5 font-sans">
                DECLARATION
              </h2>
              
              <p className="text-xs sm:text-[13px] text-slate-800">
                I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.
              </p>

              <div className="flex justify-between items-end pt-4 text-xs sm:text-[13px] font-sans">
                <div className="space-y-1">
                  <p><span className="font-semibold text-slate-900">Place:</span> Coimbatore</p>
                  <p><span className="font-semibold text-slate-900">Date:</span> ________________</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-sm font-serif">Sabari Narayanan D</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
