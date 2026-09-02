import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Filter, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Mail, 
  FileSpreadsheet, 
  Download, 
  Sparkles,
  ShieldCheck,
  LogIn,
  LogOut,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { googleSheetsDb, ContactSubmission, GoogleSheetsConfig } from '../services/googleSheetsService';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [config, setConfig] = useState<GoogleSheetsConfig>(googleSheetsDb.getConfig());
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEW' | 'RESPONDED' | 'ARCHIVED'>('ALL');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [customSheetIdInput, setCustomSheetIdInput] = useState('');
  const [showManualIdInput, setShowManualIdInput] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await googleSheetsDb.fetchSubmissions();
      setSubmissions(data);
      if (data.length > 0 && !selectedSubmission) {
        setSelectedSubmission(data[0]);
      }
    } catch (e) {
      console.error(e);
      onShowToast('Loaded local database cache.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setConfig(googleSheetsDb.getConfig());
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnectGoogle = () => {
    // Try to trigger GSI token client or prompt
    const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';
    
    const initialized = googleSheetsDb.initOAuth(clientId, (token) => {
      setConfig(googleSheetsDb.getConfig());
      onShowToast('Connected to Google Account successfully!');
      loadData();
    });

    if (initialized) {
      googleSheetsDb.requestToken();
    } else {
      // Fallback: prompt for manual OAuth access token or Google Sheet ID
      const userToken = prompt(
        'Enter Google OAuth Access Token (or Sheet ID) to link your Google Drive directly:',
        config.accessToken || ''
      );
      if (userToken && userToken.trim()) {
        if (userToken.startsWith('ya29.')) {
          googleSheetsDb.setAccessToken(userToken.trim(), 'dsabari2408@gmail.com');
          setConfig(googleSheetsDb.getConfig());
          onShowToast('Google Access Token saved! Syncing spreadsheet database...');
          loadData();
        } else {
          // If it looks like a spreadsheet ID (e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms)
          googleSheetsDb.setSpreadsheetId(userToken.trim());
          setConfig(googleSheetsDb.getConfig());
          onShowToast('Spreadsheet ID linked successfully!');
          loadData();
        }
      }
    }
  };

  const handleCreateNewSheet = async () => {
    if (!config.accessToken) {
      handleConnectGoogle();
      return;
    }

    setIsCreatingSheet(true);
    try {
      const { id, url } = await googleSheetsDb.createDatabaseSpreadsheet();
      setConfig(googleSheetsDb.getConfig());
      onShowToast('New "Portfolio Contact Database" spreadsheet created in Google Drive!');
      await loadData();
    } catch (err: any) {
      console.error(err);
      onShowToast(`Could not create sheet: ${err.message || 'Check OAuth permissions'}`);
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleSaveCustomSheetId = () => {
    if (!customSheetIdInput.trim()) return;
    let cleanId = customSheetIdInput.trim();
    // Extract ID from URL if full URL is pasted
    const match = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      cleanId = match[1];
    }
    googleSheetsDb.setSpreadsheetId(cleanId);
    setConfig(googleSheetsDb.getConfig());
    setShowManualIdInput(false);
    onShowToast('Linked to spreadsheet: ' + cleanId);
    loadData();
  };

  const handleStatusChange = async (submission: ContactSubmission, newStatus: 'NEW' | 'RESPONDED' | 'ARCHIVED') => {
    if (submission.rowIndex) {
      await googleSheetsDb.updateSubmissionStatus(submission.rowIndex, newStatus);
    }
    setSubmissions(prev => prev.map(s => s.id === submission.id ? { ...s, status: newStatus } : s));
    if (selectedSubmission?.id === submission.id) {
      setSelectedSubmission({ ...selectedSubmission, status: newStatus });
    }
    onShowToast(`Marked submission as ${newStatus}`);
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      onShowToast('No data to export.');
      return;
    }

    const headers = ['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Status'];
    const csvRows = [
      headers.join(','),
      ...submissions.map(s => 
        [
          `"${s.timestamp}"`,
          `"${s.name.replace(/"/g, '""')}"`,
          `"${s.email.replace(/"/g, '""')}"`,
          `"${s.subject.replace(/"/g, '""')}"`,
          `"${s.message.replace(/"/g, '""')}"`,
          `"${s.status}"`
        ].join(',')
      )
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sabari_Portfolio_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('Exported database rows to CSV file.');
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#090d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#0d1322] border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/90 border border-emerald-600/60 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Google Sheets Relational Database Inspector</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
                  Live DB v4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct Google Sheets spreadsheet database storing incoming contact leads, recruiter inquiries, and project requests.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {config.spreadsheetUrl ? (
              <a
                href={config.spreadsheetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-mono transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Sheet</span>
              </a>
            ) : null}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Status & Control Bar */}
        <div className="px-6 py-3 bg-[#070a11] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Database Engine:</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <Database className="w-3.5 h-3.5" />
                Google Sheets Spreadsheet (REST API)
              </span>
            </div>

            <div className="hidden sm:block h-4 w-px bg-slate-800" />

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Connected Sheet:</span>
              {config.spreadsheetId ? (
                <span className="text-cyan-300 truncate max-w-[200px]" title={config.spreadsheetId}>
                  {config.spreadsheetId.slice(0, 16)}...
                </span>
              ) : (
                <span className="text-amber-400">Default Portfolio Sheet / Local Queue</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowManualIdInput(!showManualIdInput)}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] transition-colors"
            >
              {showManualIdInput ? 'Hide Custom ID' : 'Link Custom Sheet ID'}
            </button>

            {config.isAuthenticated ? (
              <button
                onClick={handleCreateNewSheet}
                disabled={isCreatingSheet}
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[11px] transition-colors"
              >
                <PlusCircle className="w-3 h-3" />
                <span>{isCreatingSheet ? 'Creating Sheet...' : 'Create New Sheet in Drive'}</span>
              </button>
            ) : (
              <button
                onClick={handleConnectGoogle}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors shadow-sm"
              >
                <LogIn className="w-3 h-3" />
                <span>Authorize Google Sheets</span>
              </button>
            )}

            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-900 border border-slate-800 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Custom Sheet ID Input Drawer */}
        {showManualIdInput && (
          <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center gap-3 animate-in fade-in">
            <label className="text-xs font-mono text-slate-300 shrink-0">
              Spreadsheet URL / ID:
            </label>
            <input
              type="text"
              value={customSheetIdInput}
              onChange={(e) => setCustomSheetIdInput(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/... or ID"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSaveCustomSheetId}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-semibold"
            >
              Link
            </button>
          </div>
        )}

        {/* Main Content Area (Split Table + Detail View) */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Records Table & Filters */}
          <div className="w-full md:w-3/5 border-r border-slate-800 flex flex-col bg-[#070a11]">
            
            {/* Search & Filter Bar */}
            <div className="p-3 border-b border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, topic, keywords..."
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                {(['ALL', 'NEW', 'RESPONDED', 'ARCHIVED'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-2 py-1 rounded-md transition-all ${
                      statusFilter === tab 
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={handleExportCSV}
                className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-900 border border-slate-800 text-xs font-mono flex items-center gap-1"
                title="Export to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>

            {/* Submissions List Table */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
              {filteredSubmissions.length === 0 ? (
                <div className="p-12 text-center text-slate-500 font-mono text-xs space-y-2">
                  <Database className="w-8 h-8 mx-auto text-slate-600" />
                  <p>No spreadsheet rows matching criteria.</p>
                  <p className="text-[11px] text-slate-600">Submit a contact message from the portfolio form to see it appear here in real-time!</p>
                </div>
              ) : (
                filteredSubmissions.map((sub, i) => {
                  const isSelected = selectedSubmission?.id === sub.id || (!selectedSubmission && i === 0);
                  return (
                    <div
                      key={sub.id || i}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`p-3.5 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected 
                          ? 'bg-cyan-950/30 border-l-2 border-cyan-400' 
                          : 'hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-xs text-white truncate">
                            {sub.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            {sub.timestamp.split(' ')[0]}
                          </span>
                        </div>

                        <p className="text-xs text-cyan-400 font-mono truncate">
                          {sub.subject}
                        </p>

                        <p className="text-[11px] text-slate-400 truncate">
                          {sub.message || '(No text content)'}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                          sub.status === 'NEW'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : sub.status === 'RESPONDED'
                            ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          {sub.status}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Table Footer Count */}
            <div className="p-2.5 bg-[#050811] border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>{filteredSubmissions.length} record(s) loaded</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Google Sheets Auto-Sync
              </span>
            </div>

          </div>

          {/* Right Column: Record Detail View & Action Controls */}
          <div className="w-full md:w-2/5 p-6 bg-[#0b0f19] flex flex-col justify-between overflow-y-auto space-y-6">
            {selectedSubmission ? (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Selected Database Row
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {selectedSubmission.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {(['NEW', 'RESPONDED', 'ARCHIVED'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedSubmission, status)}
                        className={`px-2 py-1 rounded text-[10px] font-mono font-semibold transition-all ${
                          selectedSubmission.status === status
                            ? 'bg-cyan-500 text-black shadow-md'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500">Email Address</span>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300 font-semibold">{selectedSubmission.email}</span>
                      <a
                        href={`mailto:${selectedSubmission.email}?subject=Re: ${encodeURIComponent(selectedSubmission.subject)}`}
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
                      >
                        <Mail className="w-3 h-3" />
                        Reply Directly
                      </a>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500">Subject / Category</span>
                    <p className="text-slate-200 font-medium">{selectedSubmission.subject}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500">Logged Timestamp</span>
                    <p className="text-slate-400">{selectedSubmission.timestamp}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500">Message Content</span>
                    <p className="text-slate-200 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 font-mono text-xs">
                Select a message row to view full details.
              </div>
            )}

            {/* Quick Helper Note */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-[11px] text-slate-400 space-y-1 font-sans">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Google Drive / Spreadsheet Persistence</span>
              </div>
              <p>
                Every submission directly appends a structured record into your Google Sheets spreadsheet table and notifies Sabari Narayanan (dsabari2408@gmail.com).
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
