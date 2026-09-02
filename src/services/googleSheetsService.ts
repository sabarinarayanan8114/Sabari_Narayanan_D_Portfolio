/**
 * Google Sheets Database Service for Sabari Narayanan Portfolio
 * 
 * Provides full CRUD operations on Google Sheets using Google Sheets API v4
 * and Google Drive API v3 via client-side OAuth access tokens.
 */

export interface ContactSubmission {
  id?: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'NEW' | 'RESPONDED' | 'ARCHIVED';
  rowIndex?: number;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  sheetName: string;
  accessToken: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
}

const LOCAL_STORAGE_KEY = 'portfolio_google_sheets_config';
const LOCAL_SUBMISSIONS_KEY = 'portfolio_local_submissions_backup';

const DEFAULT_HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Subject',
  'Message',
  'Status'
];

export class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private config: GoogleSheetsConfig = {
    spreadsheetId: null,
    spreadsheetUrl: null,
    sheetName: 'Submissions',
    accessToken: null,
    userEmail: null,
    isAuthenticated: false
  };

  private tokenClient: any = null;

  private constructor() {
    this.loadStoredConfig();
  }

  public static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  private loadStoredConfig(): void {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.config = {
          ...this.config,
          ...parsed,
          isAuthenticated: Boolean(parsed.accessToken)
        };
      }
    } catch (e) {
      console.warn('Failed to load Google Sheets config from storage', e);
    }
  }

  private saveConfig(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        spreadsheetId: this.config.spreadsheetId,
        spreadsheetUrl: this.config.spreadsheetUrl,
        sheetName: this.config.sheetName,
        accessToken: this.config.accessToken,
        userEmail: this.config.userEmail
      }));
    } catch (e) {
      console.warn('Failed to save Google Sheets config', e);
    }
  }

  public getConfig(): GoogleSheetsConfig {
    return { ...this.config };
  }

  public setAccessToken(token: string, email?: string): void {
    this.config.accessToken = token;
    this.config.isAuthenticated = Boolean(token);
    if (email) this.config.userEmail = email;
    this.saveConfig();
  }

  public setSpreadsheetId(id: string): void {
    this.config.spreadsheetId = id;
    this.config.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${id}/edit`;
    this.saveConfig();
  }

  public disconnect(): void {
    this.config.accessToken = null;
    this.config.isAuthenticated = false;
    this.saveConfig();
  }

  /**
   * Initialize GSI Token Client if Google Identity Services is available
   */
  public initOAuth(clientId: string, onTokenReceived: (token: string) => void): boolean {
    if (typeof window === 'undefined' || !(window as any).google?.accounts?.oauth2) {
      return false;
    }

    try {
      this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            this.setAccessToken(tokenResponse.access_token);
            onTokenReceived(tokenResponse.access_token);
          }
        },
      });
      return true;
    } catch (err) {
      console.error('Error initializing Google OAuth token client:', err);
      return false;
    }
  }

  public requestToken(): void {
    if (this.tokenClient) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    }
  }

  /**
   * Create a new Google Spreadsheet in Google Drive formatted as database
   */
  public async createDatabaseSpreadsheet(): Promise<{ id: string; url: string }> {
    if (!this.config.accessToken) {
      throw new Error('Please connect your Google Account first.');
    }

    const title = `Sabari Narayanan - Portfolio Contact Database (${new Date().getFullYear()})`;

    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          title
        },
        sheets: [
          {
            properties: {
              title: this.config.sheetName,
              gridProperties: {
                frozenRowCount: 1
              }
            },
            data: [
              {
                startRow: 0,
                startColumn: 0,
                rowData: [
                  {
                    values: DEFAULT_HEADERS.map(header => ({
                      userEnteredValue: { stringValue: header },
                      userEnteredFormat: {
                        textFormat: { bold: true, foregroundColor: { red: 0.22, green: 0.74, blue: 0.97 } }, // Cyan #38bdf8
                        backgroundColor: { red: 0.04, green: 0.07, blue: 0.12 } // Deep slate #090d16
                      }
                    }))
                  }
                ]
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create Google Spreadsheet: ${errorText}`);
    }

    const data = await response.json();
    const spreadsheetId = data.spreadsheetId;
    const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    this.setSpreadsheetId(spreadsheetId);
    return { id: spreadsheetId, url: spreadsheetUrl };
  }

  /**
   * Append a contact submission row directly to the Google Sheet
   */
  public async appendSubmission(submission: Omit<ContactSubmission, 'status'> & { status?: 'NEW' | 'RESPONDED' | 'ARCHIVED' }): Promise<void> {
    const formattedTimestamp = submission.timestamp || new Date().toLocaleString();
    const status = submission.status || 'NEW';

    const rowValues = [
      formattedTimestamp,
      submission.name,
      submission.email,
      submission.subject,
      submission.message,
      status
    ];

    // Also store in local backup queue
    this.saveToLocalBackup({
      timestamp: formattedTimestamp,
      name: submission.name,
      email: submission.email,
      subject: submission.subject,
      message: submission.message,
      status
    });

    // If connected with Google Sheets API token and sheet ID
    if (this.config.accessToken && this.config.spreadsheetId) {
      try {
        const range = `${this.config.sheetName}!A:F`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            values: [rowValues]
          })
        });

        if (!response.ok) {
          console.warn('Direct Google Sheets append returned non-200, row saved to local backup');
        }
      } catch (err) {
        console.warn('Network error appending to Google Sheet, row backed up locally:', err);
      }
    }
  }

  /**
   * Fetch all submission rows from Google Sheets
   */
  public async fetchSubmissions(): Promise<ContactSubmission[]> {
    if (!this.config.accessToken || !this.config.spreadsheetId) {
      return this.getLocalBackupSubmissions();
    }

    try {
      const range = `${this.config.sheetName}!A2:F`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${encodeURIComponent(range)}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`
        }
      });

      if (!response.ok) {
        console.warn('Could not read from Google Sheet, loading local database records');
        return this.getLocalBackupSubmissions();
      }

      const data = await response.json();
      const rows = data.values || [];

      const parsedSubmissions: ContactSubmission[] = rows.map((row: string[], idx: number) => ({
        id: `sheet-row-${idx + 2}`,
        rowIndex: idx + 2,
        timestamp: row[0] || 'Recent',
        name: row[1] || 'Anonymous',
        email: row[2] || 'No Email',
        subject: row[3] || 'General Inquiry',
        message: row[4] || '',
        status: (row[5] as 'NEW' | 'RESPONDED' | 'ARCHIVED') || 'NEW'
      }));

      // Combine with local backup if any
      const local = this.getLocalBackupSubmissions();
      const mergedMap = new Map<string, ContactSubmission>();
      
      local.forEach(item => mergedMap.set(`${item.timestamp}-${item.email}`, item));
      parsedSubmissions.forEach(item => mergedMap.set(`${item.timestamp}-${item.email}`, item));

      return Array.from(mergedMap.values()).reverse();
    } catch (err) {
      console.warn('Error fetching submissions from Google Sheet:', err);
      return this.getLocalBackupSubmissions();
    }
  }

  /**
   * Update status of a submission in Google Sheet
   */
  public async updateSubmissionStatus(rowIndex: number, status: 'NEW' | 'RESPONDED' | 'ARCHIVED'): Promise<void> {
    if (!this.config.accessToken || !this.config.spreadsheetId) return;

    try {
      const range = `${this.config.sheetName}!F${rowIndex}`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [[status]]
        })
      });
    } catch (e) {
      console.error('Failed to update row status in Google Sheet:', e);
    }
  }

  private saveToLocalBackup(submission: ContactSubmission): void {
    try {
      const existing = this.getLocalBackupSubmissions();
      existing.unshift(submission);
      localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {
      console.warn('Local backup save failed', e);
    }
  }

  public getLocalBackupSubmissions(): ContactSubmission[] {
    try {
      const raw = localStorage.getItem(LOCAL_SUBMISSIONS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Failed to read local backup submissions', e);
    }

    // Default sample entries if brand new
    return [
      {
        id: 'seed-1',
        timestamp: '2026-08-29 14:22:00',
        name: 'Technical Recruiter',
        email: 'recruiter@techventures.io',
        subject: 'SDE Role / Internship',
        message: 'Hi Sabari, reviewed your SIH 2025 Ocean Sentinel and Java Spring Boot projects. Would love to schedule a technical interview!',
        status: 'NEW'
      },
      {
        id: 'seed-2',
        timestamp: '2026-08-27 10:15:30',
        name: 'Engineering Director',
        email: 'lead@cloudscale.dev',
        subject: 'Full-Stack Project',
        message: 'Impressive LeetCode consistency and MySQL schema design. Reaching out regarding our backend engineering team opportunities.',
        status: 'RESPONDED'
      }
    ];
  }
}

export const googleSheetsDb = GoogleSheetsService.getInstance();
