# 🚀 Sabari Narayanan D — Developer Portfolio & Full-Stack Platform

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Google Sheets DB](https://img.shields.io/badge/Database-Google%20Sheets%20API%20v4-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)

<p align="center">
  <b>A high-performance, dark-themed developer portfolio and interactive software engineering showcase built for Sabari Narayanan D.</b>
  <br />
  Featuring an interactive terminal, live Google Sheets real-time database integration, comprehensive project case studies, downloadable resume modal, and standalone exportable packages.
</p>

[**🌐 View Live Portfolio**](https://ais-pre-wc2dgeiczeybbdcn2utktr-378888008933.asia-southeast1.run.app) • [**💼 Connect on LinkedIn**](https://linkedin.com/in/sabari-narayanan-d-8114sj) • [**⚡ Solve with me on LeetCode**](https://leetcode.com/SabariNarayanan2004)

</div>

---

## 👨‍💻 About Sabari Narayanan D

- 🎓 **Education**: B.E. in Computer Science and Engineering (2023 – 2027) at **V.S.B College of Engineering Technical Campus** (CGPA: **8.02 / 10**)
- 📍 **Location**: Coimbatore, Tamil Nadu, India
- 💡 **Specialization**: Full-Stack Web Development, Java & Spring Boot Systems, REST API Design, Relational & NoSQL Database Optimization
- 🏆 **Smart India Hackathon**: Participant in **SIH 2025** (*Safety Voyage: Smart Travel & Passenger Safety System*)
- 🧠 **Problem Solving**: **150+ LeetCode problems solved** with 85%+ submission consistency

---

## ✨ Key Portfolio Features

### 1. 📊 Live Google Sheets Database & Notification Webhook
- **Zero-Maintenance Relational Database**: Contact inquiries, recruiter messages, and collaboration requests are dynamically appended as structured rows into a live **Google Sheets** spreadsheet (`[ Timestamp, Name, Email, Subject, Message, Status ]`).
- **Instant Email Alerts**: Powered by an integrated **Google Apps Script Webhook** that dispatches instant email notifications directly to `dsabari2408@gmail.com` on every submission.
- **In-App Database Inspector**: An interactive **"Sheets DB"** modal built into the UI allowing real-time searching, status updates (`NEW` → `RESPONDED` → `ARCHIVED`), and CSV exports.

### 2. 💻 Interactive Developer Terminal
- Full Linux/Unix terminal simulation accessible via hotkey (`Ctrl + ~` / `` ` ``) or navbar toggle.
- Supports commands: `help`, `about`, `skills`, `projects`, `stats`, `experience`, `education`, `certs`, `contact`, `hire`, `cat resume.txt`, `theme`, `clear`, and `exit`.

### 3. 📂 Detailed Project Case Studies & Modals
- Rich project view modals highlighting architecture decisions, metrics, technical challenges, and live production links.
- Interactive category filtering (Full-Stack, Web Applications, Java & Systems, Hackathons).

### 4. 📄 In-App Resume & PDF Viewer
- Modal with instant tab toggling between formatted digital resume and direct PDF download/print options.

### 5. 📦 Exportable Standalone HTML/CSS/JS Package
- Complete standalone vanilla code bundle (`index.html`, `style.css`, `script.js`, `Code.gs`) that can be hosted on GitHub Pages, Netlify, or Vercel with zero Node dependencies.

---

## 🛠️ Tech Stack & Skills Matrix

| Category | Technologies & Tools |
| :--- | :--- |
| **Languages** | Java (Core, OOP, Collections), Python, JavaScript (ES6+), SQL, HTML5/CSS3 |
| **Frontend** | React 18, Tailwind CSS, Lucide Icons, Canvas Confetti, Responsive Design |
| **Backend & APIs** | Node.js, Express.js, Spring Boot, RESTful APIs, Google Apps Script |
| **Databases** | Google Sheets API v4, MongoDB, MySQL, Firestore |
| **Tools & Platforms** | Git, GitHub, Maven, Postman, Linux, Vercel, Render, Cloud Run |

---

## 🚀 Featured Projects

### 🏥 1. [Med Health — Hospital Management Platform](https://med-health-three.vercel.app)
- **Role**: Full-Stack Developer
- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, REST APIs, Tailwind CSS
- **Repo**: [github.com/sabarinarayanan8114/med-health](https://github.com/sabarinarayanan8114/med-health)
- **Highlights**: Role-based access control for doctors and patients, real-time appointment booking, sub-100ms API response time, and comprehensive administrative analytics dashboard.

### 💰 2. [Expense Tracker — Financial Analytics Suite](https://expense-tracker-project-virid.vercel.app/)
- **Role**: Backend & Systems Architect
- **Tech Stack**: Java, Spring Boot, JavaFX, MySQL, REST APIs, Maven
- **Repo**: [github.com/sabarinarayanan8114/Expense-Tracker](https://github.com/sabarinarayanan8114/Expense-Tracker)
- **Highlights**: High-throughput Spring Boot REST micro-endpoints, relational MySQL persistence with complex query indexing, and budget ceiling alert automation.

### 🎓 3. [Alumni Referral Hub — Mentorship & Job Network](https://alumni-referral-hub.onrender.com)
- **Role**: Full-Stack Lead
- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, Cloud Services, REST APIs
- **Repo**: [github.com/sabarinarayanan8114/alumni-referral-hub](https://github.com/sabarinarayanan8114/alumni-referral-hub)
- **Highlights**: Bridge platform connecting engineering undergraduates with verified alumni across top tier tech companies for direct referrals and mock interview mentorship.

### 🛡️ 4. Safety Voyage — SIH 2025 Smart Travel System
- **Role**: Lead Systems & Python Engineer
- **Tech Stack**: Python, IoT Telemetry, Cloud Computing, Geofencing, REST APIs
- **Highlights**: Smart India Hackathon (SIH 2025) participant project featuring real-time passenger safety monitoring, transit geofencing alerts, and automated SOS escalation.

---

## 📂 Project Structure

```text
├── public/
│   ├── standalone/               # Ready-to-deploy vanilla HTML/CSS/JS + Apps Script
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── Code.gs
│   └── passport_photo.jpeg
├── src/
│   ├── assets/                   # High-res banners & portraits
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky navigation bar with DB & terminal buttons
│   │   ├── Hero.tsx              # Hero profile intro with quick stats
│   │   ├── AboutSection.tsx      # Engineering background & bio
│   │   ├── SkillsSection.tsx     # Animated skills grid & proficiency bars
│   │   ├── ProjectsSection.tsx   # Project catalog with category filters
│   │   ├── ProjectModal.tsx      # In-depth architectural case study modal
│   │   ├── ExperienceSection.tsx # Hackathon & developer experience
│   │   ├── EducationTimeline.tsx # Academic journey at VSB College of Engg
│   │   ├── CertificationsAchievements.tsx # NPTEL, HackerRank, NASSCOM
│   │   ├── ContactSection.tsx    # Live contact form connected to Sheets DB
│   │   ├── GoogleSheetsModal.tsx # Interactive Google Sheets Database Inspector
│   │   ├── InteractiveTerminal.tsx # Draggable interactive CLI terminal
│   │   ├── ResumeModal.tsx       # Interactive resume modal & PDF viewer
│   │   ├── StandaloneExportModal.tsx # Standalone code exporter
│   │   └── Footer.tsx            # Footer & social links
│   ├── data/
│   │   └── portfolioData.ts      # Centralized profile & project data store
│   ├── services/
│   │   └── googleSheetsService.ts # Google Sheets REST API & Local cache service
│   ├── types.ts                  # TypeScript definitions
│   ├── App.tsx                   # Main application layout
│   └── main.tsx                  # React entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sabarinarayanan8114/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port specified in your terminal).

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📊 Google Sheets Database Configuration

The contact form is connected to a dedicated **Google Apps Script Webhook** that automatically appends all messages to your Google Sheet and sends an email alert.

### Webhook Endpoint:
```
https://script.google.com/macros/s/AKfycbxbFC34GBOlaujqXLBulcMHoLTwKBxYpYP5CbNl1GG3v6UnFkKeayv45Y7Va-7ATDeLRg/exec
```

### Quick Setup for Your Own Sheet:
1. Create a new Google Sheet at [sheets.new](https://sheets.new).
2. Navigate to **Extensions** &rarr; **Apps Script**.
3. Paste the contents of [`public/standalone/Code.gs`](public/standalone/Code.gs).
4. Click **Deploy** &rarr; **New deployment** &rarr; select **Web app** (`Execute as: Me`, `Who has access: Anyone`).
5. Copy the generated Web App URL and paste it into the contact section's custom webhook URL!

---

## 📬 Contact & Social Links

- **Email**: [dsabari2408@gmail.com](mailto:dsabari2408@gmail.com)
- **Phone**: [+91-9952887360](tel:+919952887360)
- **LinkedIn**: [linkedin.com/in/sabari-narayanan-d-8114sj](https://linkedin.com/in/sabari-narayanan-d-8114sj)
- **GitHub**: [github.com/sabarinarayanan8114](https://github.com/sabarinarayanan8114)
- **LeetCode**: [leetcode.com/SabariNarayanan2004](https://leetcode.com/SabariNarayanan2004)

---

<div align="center">
  <sub>Crafted with ❤️ by Sabari Narayanan D • © 2026 All Rights Reserved</sub>
</div>
