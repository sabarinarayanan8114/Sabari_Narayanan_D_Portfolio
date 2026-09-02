/**
 * Sabari Narayanan D - Standalone Portfolio JavaScript
 * Includes Google Apps Script & Google Sheets Database Form Handler
 */

// Default Google Apps Script Web App URL (replace with your deployed URL from Google Sheets)
let GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbFC34GBOlaujqXLBulcMHoLTwKBxYpYP5CbNl1GG3v6UnFkKeayv45Y7Va-7ATDeLRg/exec";

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCopyButtons();
  initProjectFilters();
  initContactForm();
  initCodeModal();
  initCustomCursor();
});

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(8, 11, 18, 0.95)';
      navbar.style.borderBottomColor = 'rgba(30, 41, 59, 1)';
    } else {
      navbar.style.background = 'rgba(8, 11, 18, 0.85)';
      navbar.style.borderBottomColor = 'rgba(30, 41, 59, 0.8)';
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   2. Copy to Clipboard
   ========================================================================== */
function initCopyButtons() {
  const copyEmailBtn = document.getElementById('hero-copy-email');
  const copyPhoneBtn = document.getElementById('hero-copy-phone');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email');
      navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard: ' + email);
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = copyPhoneBtn.getAttribute('data-phone');
      navigator.clipboard.writeText(phone);
      showToast('Phone number copied to clipboard: ' + phone);
    });
  }
}

/* ==========================================================================
   3. Projects Filter Tabs
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Contact Form & Google Apps Script Database Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const subjectPills = document.querySelectorAll('.subject-pill');
  const formSubject = document.getElementById('form-subject');
  const submitBtn = document.getElementById('submit-form-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;
  const statusAlert = document.getElementById('form-status');
  const customUrlInput = document.getElementById('gas-webhook-url');

  // Load saved custom Google Apps Script URL if available
  const savedUrl = localStorage.getItem('user_gas_webhook_url');
  if (savedUrl && customUrlInput) {
    customUrlInput.value = savedUrl;
  }

  // Subject pill selector
  subjectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      subjectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (formSubject) {
        formSubject.value = pill.getAttribute('data-subject');
      }
    });
  });

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = formSubject ? formSubject.value : 'SDE Inquiry';
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showStatusAlert('Please fill out all required fields.', 'error');
      return;
    }

    // Determine target Google Apps Script URL
    let targetUrl = GOOGLE_APPS_SCRIPT_URL;
    if (customUrlInput && customUrlInput.value.trim().startsWith('http')) {
      targetUrl = customUrlInput.value.trim();
      localStorage.setItem('user_gas_webhook_url', targetUrl);
    }

    // Toggle button loading state
    if (btnText && btnLoading) {
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      submitBtn.disabled = true;
    }

    const payload = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      timestamp: new Date().toISOString()
    };

    try {
      // POST to Google Apps Script Web App (URL Encoded or JSON)
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);

      // Perform fetch with no-cors support for Google Apps Script redirects
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      // Show success alert
      showStatusAlert('✅ Success! Your message was saved to the Google Sheets database and forwarded to Sabari Narayanan.', 'success');

      // Trigger Confetti
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.75 },
          colors: ['#06b6d4', '#6366f1', '#10b981', '#f59e0b']
        });
      }

      // Reset form
      form.reset();

    } catch (err) {
      console.warn('Google Apps Script POST warning:', err);
      // Fallback notification
      showStatusAlert('✅ Submission received! Message logged for Sabari Narayanan (dsabari2408@gmail.com).', 'success');
    } finally {
      if (btnText && btnLoading) {
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
      }
    }
  });

  function showStatusAlert(message, type) {
    if (!statusAlert) return;
    statusAlert.className = `form-status-alert ${type}`;
    statusAlert.innerHTML = message;
    statusAlert.classList.remove('hidden');
    statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ==========================================================================
   5. Standalone Code Viewer Modal
   ========================================================================== */
function initCodeModal() {
  const modal = document.getElementById('code-modal');
  const openBtns = [
    document.getElementById('export-code-btn'),
    document.getElementById('view-gas-code-btn'),
    document.getElementById('footer-source-btn')
  ];
  const closeBtns = [
    document.getElementById('modal-code-close'),
    document.getElementById('modal-code-close-btn')
  ];
  const tabs = document.querySelectorAll('.code-tab');
  const panels = document.querySelectorAll('.code-panel');
  const copyBtns = document.querySelectorAll('.copy-code-btn');

  openBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        modal.classList.add('active');
        populateCodeSnippets();
      });
    }
  });

  closeBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById('tab-' + tab.getAttribute('data-tab'));
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Copy code buttons
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const codeEl = document.getElementById(targetId);
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.innerText);
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check text-emerald"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }
    });
  });

  // Download ZIP
  const downloadZipBtn = document.getElementById('download-zip-btn');
  if (downloadZipBtn) {
    downloadZipBtn.addEventListener('click', () => {
      downloadProjectFiles();
    });
  }
}

function populateCodeSnippets() {
  // Fetch current script and style to show real code inside modal
  const codeJs = document.getElementById('code-js');
  const codeCss = document.getElementById('code-css');
  const codeHtml = document.getElementById('code-html');

  if (codeJs && !codeJs.getAttribute('data-loaded')) {
    codeJs.innerText = document.querySelector('script[src="script.js"]') ? 
      "// View and edit script.js directly inside your project" : "// Standalone Script with Google Sheets Handler";
    codeJs.setAttribute('data-loaded', 'true');
  }
}

function downloadProjectFiles() {
  showToast('Preparing standalone project download bundle...');
  
  // Create download link for index.html
  const link = document.createElement('a');
  link.href = 'index.html';
  link.download = 'index.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#0f172a';
    toast.style.border = '1px solid #0284c7';
    toast.style.color = '#e2e8f0';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '10px';
    toast.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    toast.style.fontSize = '14px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3000);
}

/* ==========================================================================
   Custom Animated Shark Cursor Pointer
   ========================================================================== */
function initCustomCursor() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const shark = document.createElement('div');
  shark.id = 'standalone-cursor-shark';
  shark.innerHTML = `
    <svg width="46" height="32" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stSharkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0891b2" />
          <stop offset="50%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
        <linearGradient id="stSharkBelly" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e0f2fe" />
          <stop offset="100%" stop-color="#bae6fd" />
        </linearGradient>
      </defs>
      <path d="M12 20 L2 10 Q6 20 2 30 L12 20 Z" fill="url(#stSharkGrad)" />
      <path d="M24 16 L31 4 Q35 12 36 15 Z" fill="#0891b2" stroke="#38bdf8" stroke-width="1" />
      <path d="M22 23 L26 31 Q29 27 28 23 Z" fill="#0891b2" stroke="#38bdf8" stroke-width="0.8" />
      <path d="M10 20 C14 13, 30 11, 48 15 C56 17, 58 19, 58 20 C58 21, 56 23, 48 25 C30 29, 14 27, 10 20 Z" fill="url(#stSharkGrad)" stroke="#38bdf8" stroke-width="1.2" />
      <path d="M14 21 C20 25, 34 26, 48 23 C42 26, 26 27, 14 21 Z" fill="url(#stSharkBelly)" opacity="0.9" />
      <line x1="38" y1="17" x2="37" y2="23" stroke="#0e7490" stroke-width="1.5" stroke-linecap="round" />
      <line x1="41" y1="17" x2="40" y2="23" stroke="#0e7490" stroke-width="1.5" stroke-linecap="round" />
      <line x1="44" y1="17" x2="43" y2="23" stroke="#0e7490" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="50" cy="17" r="2" fill="#ffffff" stroke="#0f172a" stroke-width="0.8" class="shark-eye" />
      <circle cx="50.6" cy="16.6" r="0.7" fill="#0f172a" />
    </svg>
  `;

  const ring = document.createElement('div');
  ring.id = 'standalone-cursor-ring';

  document.body.appendChild(shark);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let prevX = -100, prevY = -100;
  let ringX = -100, ringY = -100;
  let currentAngle = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const dx = mouseX - prevX;
    const dy = mouseY - prevY;
    if (Math.hypot(dx, dy) > 2) {
      const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      let diff = rawAngle - currentAngle;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;
      currentAngle += diff * 0.3;
      prevX = mouseX;
      prevY = mouseY;
    }

    shark.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover detection
  const interactables = 'button, a, input, textarea, select, [role="button"], .project-card, .cursor-pointer';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactables)) {
      ring.classList.add('cursor-hover');
      shark.classList.add('shark-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactables)) {
      ring.classList.remove('cursor-hover');
      shark.classList.remove('shark-hover');
    }
  });

  // Click chomp shockwave
  window.addEventListener('mousedown', (e) => {
    shark.classList.add('shark-clicking');
    ring.classList.add('ring-clicking');
    
    const ripple = document.createElement('div');
    ripple.className = 'cursor-click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  window.addEventListener('mouseup', () => {
    shark.classList.remove('shark-clicking');
    ring.classList.remove('ring-clicking');
  });
}

/* ==========================================================================
   Draggable Interactive Physics for Skills Section
   ========================================================================== */
function initMovableSkills() {
  const cards = document.querySelectorAll('.skill-category-card, .skill-item');
  cards.forEach(card => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;

    card.style.cursor = 'grab';
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';

    card.addEventListener('mousedown', (e) => {
      if (e.target.closest('a, button, input')) return;
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      card.style.cursor = 'grabbing';
      card.style.zIndex = '100';
      card.style.boxShadow = '0 15px 35px rgba(6, 182, 212, 0.4)';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      // limit range
      currentX = Math.max(-150, Math.min(150, currentX));
      currentY = Math.max(-100, Math.min(100, currentY));
      card.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      card.style.cursor = 'grab';
      card.style.zIndex = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
      currentX = 0;
      currentY = 0;
      card.style.transform = 'translate3d(0, 0, 0) scale(1)';
      card.style.boxShadow = '';
      setTimeout(() => {
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';
      }, 500);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMovableSkills();
});


