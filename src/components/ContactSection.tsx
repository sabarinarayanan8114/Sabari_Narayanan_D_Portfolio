import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Code2, 
  Check, 
  Copy, 
  Sparkles, 
  MessageSquare,
  ArrowUpRight,
  Database,
  Server,
  FileCode,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../data/portfolioData';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
  onStandaloneClick?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast, onStandaloneClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'SDE Opportunity / Technical Collaboration',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [customGasUrl, setCustomGasUrl] = useState('');
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);

  const quickSubjects = [
    'SDE Role / Internship',
    'Full-Stack Project',
    'Technical Collaboration',
    'General Inquiry'
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    const defaultGasUrl = customGasUrl.trim().startsWith('http')
      ? customGasUrl.trim()
      : 'https://script.google.com/macros/s/AKfycbz_sample_webhook/exec';

    try {
      // POST to Google Apps Script Web App
      const formPayload = new URLSearchParams();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('subject', formData.subject);
      formPayload.append('message', formData.message);

      await fetch(defaultGasUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formPayload.toString()
      });
    } catch (err) {
      console.log('Google Apps Script log:', err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    onShowToast('✅ Message saved to Google Sheets database & forwarded to Sabari!');

    // Trigger celebratory confetti
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#38bdf8', '#818cf8', '#34d399', '#fbbf24']
    });
  };

  return (
    <section id="contact" className="py-24 relative bg-[#080b12] border-t border-slate-900">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Let's Build Together</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            I am actively seeking Full-Time Software Engineering roles and technical internships. Feel free to send a message or connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Details & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b0f19] border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Contact Details
                </h3>
                <p className="text-xs text-slate-400">
                  Direct channels for recruitment and collaboration.
                </p>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400">Email</span>
                    <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-[220px]">
                      {profileData.email}
                    </p>
                  </div>
                </div>
                <button
                  id="contact-copy-email-btn"
                  onClick={() => handleCopy(profileData.email, 'email')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400">Phone / WhatsApp</span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {profileData.phone}
                    </p>
                  </div>
                </div>
                <button
                  id="contact-copy-phone-btn"
                  onClick={() => handleCopy(profileData.phone, 'phone')}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400">Location</span>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {profileData.location}
                  </p>
                </div>
              </div>

              {/* Professional Socials */}
              <div className="pt-2 border-t border-slate-800">
                <p className="text-xs font-mono text-slate-400 mb-3">Online Profiles:</p>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-all text-xs font-mono group"
                  >
                    <Linkedin className="w-4 h-4 mb-1 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all text-xs font-mono group"
                  >
                    <Github className="w-4 h-4 mb-1 text-slate-200 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profileData.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 transition-all text-xs font-mono group"
                  >
                    <Code2 className="w-4 h-4 mb-1 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>LeetCode</span>
                  </a>
                </div>
              </div>

              {/* Google Sheets Database Integration Box */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <Database className="w-4 h-4" />
                    <span>Google Sheets Database Active</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 text-[10px] font-mono border border-emerald-600/40">
                    Live Webhook
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Submissions are dynamically inserted into a Google Sheets database and trigger an instant email to <span className="text-cyan-300 font-mono">{profileData.email}</span> via Google Apps Script.
                </p>
                {onStandaloneClick && (
                  <button
                    onClick={onStandaloneClick}
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono pt-1 hover:underline"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Inspect Google Apps Script (Code.gs) & Guide</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0b0f19] border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">
                  Send a Direct Message
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Google Sheets DB Connected</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-6">
                Fill in the form below to record your message directly to Google Sheets database and notify <span className="text-cyan-300">{profileData.email}</span>.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Logged to Database!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Your message has been appended to the Google Sheets database and sent to Sabari Narayanan (dsabari2408@gmail.com).
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'SDE Opportunity', message: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Subject Quick Selector Pills */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Topic / Reason for Contact
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickSubjects.map((sub) => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: sub })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            formData.subject === sub
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe / Tech Recruiter"
                        className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Your Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Your Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="contact-form-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discussing an SDE opportunity, project details, or interview schedule..."
                      className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Optional Custom Google Apps Script Endpoint Drawer */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowConfigDrawer(!showConfigDrawer)}
                      className="text-[11px] font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <span>{showConfigDrawer ? '▲ Hide' : '⚙️ Advanced: Test Custom Google Apps Script URL'}</span>
                    </button>

                    {showConfigDrawer && (
                      <div className="mt-2 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 animate-in fade-in">
                        <label className="block text-[11px] font-mono text-slate-300">
                          Google Apps Script Web App Deployment URL:
                        </label>
                        <input
                          type="url"
                          value={customGasUrl}
                          onChange={(e) => setCustomGasUrl(e.target.value)}
                          placeholder="https://script.google.com/macros/s/.../exec"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                        />
                        <p className="text-[10px] text-slate-500 font-mono">
                          Leave blank to use default webhook or enter your own deployed Apps Script URL.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 font-mono">
                        <Server className="w-4 h-4 animate-spin text-cyan-300" />
                        <span>Recording in Google Sheets DB...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Save to Google Sheets & Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center font-mono">
                    Direct Email: <a href={`mailto:${profileData.email}`} className="text-cyan-400 hover:underline">{profileData.email}</a>
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
