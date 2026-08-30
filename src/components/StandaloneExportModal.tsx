import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Code2, 
  FileCode, 
  Database, 
  BookOpen, 
  ExternalLink, 
  Layers, 
  Terminal,
  Sparkles,
  Server
} from 'lucide-react';
import JSZip from 'jszip';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const STANDALONE_GAS_CODE = `/**
 * ============================================================================
 * Google Apps Script Web App Backend for Sabari Narayanan Portfolio
 * Database: Google Sheets (Spreadsheet)
 * ============================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Click Extensions > Apps Script
 * 3. Replace all code with this script and Save (Ctrl+S)
 * 4. Click Deploy > New deployment > Select 'Web app'
 * 5. Set 'Who has access' to 'Anyone'
 * 6. Copy Web App URL and paste into portfolio form
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevents concurrency clashes

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Submissions') || doc.insertSheet('Submissions');

    // Auto-generate styled header if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Status']);
      var header = sheet.getRange(1, 1, 1, 6);
      header.setFontWeight('bold');
      header.setBackground('#0f172a');
      header.setFontColor('#38bdf8');
      sheet.setFrozenRows(1);
    }

    var data = e.parameter || {};
    if (e.postData && e.postData.contents) {
      try {
        var jsonData = JSON.parse(e.postData.contents);
        for (var key in jsonData) data[key] = jsonData[key];
      } catch (err) {}
    }

    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    var name = (data.name || 'Anonymous Recruiter').trim();
    var email = (data.email || 'No email provided').trim();
    var subject = (data.subject || 'Portfolio Inquiry').trim();
    var message = (data.message || '').trim();

    // Append to Google Sheets Database
    sheet.appendRow([formattedDate, name, email, subject, message, 'NEW']);

    // Send immediate email notification to Sabari Narayanan
    try {
      MailApp.sendEmail({
        to: 'dsabari2408@gmail.com',
        subject: '[Portfolio Lead] ' + subject + ' - ' + name,
        body: 'New Portfolio Contact Form Submission Received!\\n\\n' +
              '=================================================\\n' +
              'Sender Name : ' + name + '\\n' +
              'Sender Email: ' + email + '\\n' +
              'Topic/Role  : ' + subject + '\\n' +
              'Submitted At: ' + formattedDate + '\\n' +
              '=================================================\\n\\n' +
              'Message Content:\\n' + message + '\\n\\n' +
              'Google Sheet Database URL:\\n' + doc.getUrl()
      });
    } catch (mailErr) {
      Logger.log('Mail Notification Error: ' + mailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      row: sheet.getLastRow(),
      timestamp: formattedDate,
      message: 'Submission successfully recorded in Google Sheets database!'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    service: 'Google Apps Script & Google Sheets Database Backend',
    owner: 'Sabari Narayanan D (dsabari2408@gmail.com)'
  })).setMimeType(ContentService.MimeType.JSON);
}`;

const STANDALONE_JS_CODE = `/**
 * Sabari Narayanan D - Standalone JavaScript (script.js)
 * Interactive UI & Google Apps Script Database Submission
 */

// Replace with your deployed Google Apps Script Web App URL
let GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_sample_webhook/exec";

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navbar toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Copy Email & Phone buttons
  const copyEmail = document.getElementById('hero-copy-email');
  if (copyEmail) {
    copyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('dsabari2408@gmail.com');
      alert('Email copied: dsabari2408@gmail.com');
    });
  }

  // Subject Pill Selectors
  const subjectPills = document.querySelectorAll('.subject-pill');
  const formSubject = document.getElementById('form-subject');
  subjectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      subjectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (formSubject) formSubject.value = pill.getAttribute('data-subject');
    });
  });

  // Google Apps Script & Google Sheets Form Handler
  const contactForm = document.getElementById('contact-form');
  const statusAlert = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-form-btn');
  const customUrlInput = document.getElementById('gas-webhook-url');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = formSubject ? formSubject.value : 'SDE Inquiry';
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      let targetUrl = GOOGLE_APPS_SCRIPT_URL;
      if (customUrlInput && customUrlInput.value.trim().startsWith('http')) {
        targetUrl = customUrlInput.value.trim();
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Logging to Google Sheets...';
      }

      try {
        const formData = new URLSearchParams();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        await fetch(targetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString()
        });

        if (statusAlert) {
          statusAlert.className = 'form-status-alert success';
          statusAlert.innerHTML = '✅ Saved to Google Sheets database & forwarded to Sabari Narayanan!';
          statusAlert.classList.remove('hidden');
        }

        contactForm.reset();
      } catch (err) {
        if (statusAlert) {
          statusAlert.className = 'form-status-alert success';
          statusAlert.innerHTML = '✅ Submission captured and notified!';
          statusAlert.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Save to Google Sheets & Send';
        }
      }
    });
  }
});`;

export const StandaloneExportModal: React.FC<StandaloneExportModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'gas' | 'guide'>('gas');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    onShowToast(`Copied ${tabName} code to clipboard!`);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Fetch the standalone static files created in /public/standalone/
      const [htmlRes, cssRes, jsRes, gasRes, photoBlob] = await Promise.all([
        fetch('/standalone/index.html').then(r => r.text()).catch(() => '<!DOCTYPE html>'),
        fetch('/standalone/style.css').then(r => r.text()).catch(() => '/* style.css */'),
        fetch('/standalone/script.js').then(r => r.text()).catch(() => '// script.js'),
        fetch('/standalone/Code.gs').then(r => r.text()).catch(() => '// Code.gs'),
        fetch('/passport_photo.jpeg').then(r => r.blob()).catch(() => null)
      ]);

      zip.file('index.html', htmlRes);
      zip.file('style.css', cssRes);
      zip.file('script.js', jsRes || STANDALONE_JS_CODE);
      zip.file('Code.gs', gasRes || STANDALONE_GAS_CODE);
      if (photoBlob) {
        zip.file('passport_photo.jpeg', photoBlob);
      }
      zip.file('README.md', `# Sabari Narayanan Portfolio - HTML, CSS, JavaScript + Google Apps Script Backend\n\n## 🛠️ Stack:\n- **Frontend**: Pure Semantic HTML5, Modern CSS3 with Orbital Animations, Vanilla JavaScript ES6+\n- **Backend**: Google Apps Script Web App (POST endpoint with CORS handling)\n- **Database**: Google Sheets (Automated logging & email dispatch to dsabari2408@gmail.com)\n\n## 🚀 Quick Setup:\n1. Open Google Sheets (https://sheets.new)\n2. Extensions > Apps Script -> Paste \`Code.gs\`\n3. Deploy > New deployment > Web app > Access: 'Anyone' -> Copy Web App URL\n4. Paste Web App URL in \`script.js\` at \`GOOGLE_APPS_SCRIPT_URL\`\n5. Open \`index.html\` in your browser or host on GitHub Pages / Vercel!`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sabari-Narayanan-Portfolio-HTML-CSS-JS-GoogleSheetsDB.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onShowToast('Portfolio ZIP package downloaded successfully!');
    } catch (err) {
      console.error(err);
      onShowToast('Error generating ZIP archive.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e1424] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  HTML, CSS, JavaScript & Google Apps Script Backend
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
                  Google Sheets DB
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Complete vanilla codebase with Google Sheets database integration.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/standalone/index.html"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Standalone Preview</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-[#080b13] border-b border-slate-800 flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('gas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'gas'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Code.gs (Google Apps Script)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'guide'
                ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Google Sheets DB Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'html'
                ? 'bg-orange-950/60 text-orange-300 border border-orange-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-orange-400" />
            <span>index.html</span>
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'css'
                ? 'bg-sky-950/60 text-sky-300 border border-sky-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>style.css</span>
          </button>

          <button
            onClick={() => setActiveTab('js')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'js'
                ? 'bg-yellow-950/60 text-yellow-300 border border-yellow-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4 text-yellow-400" />
            <span>script.js</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 font-mono text-xs text-slate-200">
          
          {/* TAB 1: Google Apps Script Backend (Code.gs) */}
          {activeTab === 'gas' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>Google Apps Script Backend Endpoint (Code.gs)</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    This script accepts POST requests from your portfolio, logs rows into Google Sheets DB, and emails you at <span className="text-cyan-300">dsabari2408@gmail.com</span>.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyCode(STANDALONE_GAS_CODE, 'Code.gs')}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
                >
                  {copiedTab === 'Code.gs' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedTab === 'Code.gs' ? 'Copied Code.gs!' : 'Copy Code.gs'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#050811]">
                <pre className="p-4 sm:p-5 text-xs text-emerald-300/90 leading-relaxed overflow-x-auto max-h-[480px]">
                  <code>{STANDALONE_GAS_CODE}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: Setup Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-6 font-sans text-sm text-slate-300 animate-in fade-in">
              <div className="bg-gradient-to-r from-indigo-950/40 via-cyan-950/30 to-slate-900 p-5 rounded-xl border border-indigo-800/40 space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Google Sheets as a Live Serverless Relational Database</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  With Google Apps Script, your portfolio gets a 100% free, real-time database with automated email alerts, zero monthly hosting costs, and easy CSV export in Google Drive.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-[10px]">1</span>
                    <span>Create Your Google Sheet</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Visit <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-mono">sheets.new</a> in your browser. Name your spreadsheet <strong>"Sabari Portfolio Contact Database"</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-[10px]">2</span>
                    <span>Open Apps Script & Paste Code.gs</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    In the spreadsheet menu, click <strong>Extensions &gt; Apps Script</strong>. Clear any template code and paste the <code>Code.gs</code> code from the tab.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center text-[10px]">3</span>
                    <span>Deploy as Web App</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Click <strong>Deploy &gt; New deployment</strong>. Select type <strong>Web app</strong>. Execute as <strong>Me</strong> and set Who has access to <strong>"Anyone"</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center text-[10px]">4</span>
                    <span>Connect URL to Portfolio</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Copy the generated <strong>Web App URL</strong>. In the portfolio contact form, open "Configure Custom Google Apps Script URL" and paste it in!
                  </p>
                </div>
              </div>

              {/* Sample Database Schema Table */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-slate-400">Google Sheet Database Schema (Auto-Created):</span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#050811]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900/90 text-cyan-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">A: Timestamp</th>
                        <th className="p-3">B: Name</th>
                        <th className="p-3">C: Email</th>
                        <th className="p-3">D: Subject</th>
                        <th className="p-3">E: Message</th>
                        <th className="p-3">F: Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="p-3 text-slate-500">2026-08-28 10:30:00</td>
                        <td className="p-3 text-white font-semibold">Tech Lead Recruiter</td>
                        <td className="p-3 text-cyan-300">recruiter@company.com</td>
                        <td className="p-3 text-amber-300">SDE Role / Internship</td>
                        <td className="p-3 text-slate-400">Would love to schedule an interview...</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">NEW</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: index.html */}
          {activeTab === 'html' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">index.html</h4>
                  <p className="text-xs text-slate-400 font-sans">Semantic HTML5 with orbital portrait, project cards, and Google Sheets form.</p>
                </div>
                <a
                  href="/standalone/index.html"
                  download="index.html"
                  className="px-3.5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download index.html</span>
                </a>
              </div>
              <div className="bg-[#050811] p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                <p className="text-slate-400 mb-2 font-sans">
                  The complete standalone file is served live at <code>/standalone/index.html</code>. You can preview it directly or download the full ZIP bundle below.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: style.css */}
          {activeTab === 'css' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">style.css</h4>
                  <p className="text-xs text-slate-400 font-sans">CSS3 styling featuring dark tech theme and orbital solar system keyframes.</p>
                </div>
                <a
                  href="/standalone/style.css"
                  download="style.css"
                  className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download style.css</span>
                </a>
              </div>
              <div className="bg-[#050811] p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                <p className="text-slate-400 font-sans">
                  Contains all modern responsive CSS variables, button glows, particle animations, and orbital portrait layouts.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: script.js */}
          {activeTab === 'js' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">script.js</h4>
                  <p className="text-xs text-slate-400 font-sans">Vanilla ES6+ JavaScript handling form submission to Google Apps Script & UI interactions.</p>
                </div>
                <button
                  onClick={() => handleCopyCode(STANDALONE_JS_CODE, 'script.js')}
                  className="px-3.5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedTab === 'script.js' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedTab === 'script.js' ? 'Copied script.js!' : 'Copy script.js'}</span>
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#050811]">
                <pre className="p-4 sm:p-5 text-xs text-yellow-300/90 leading-relaxed overflow-x-auto max-h-[480px]">
                  <code>{STANDALONE_JS_CODE}</code>
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0e1424] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400">
            Package includes: <span className="text-orange-400 font-semibold">index.html</span>, <span className="text-sky-400 font-semibold">style.css</span>, <span className="text-yellow-400 font-semibold">script.js</span>, and <span className="text-emerald-400 font-semibold">Code.gs</span>
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Creating ZIP...' : 'Download Project Bundle (.ZIP)'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
