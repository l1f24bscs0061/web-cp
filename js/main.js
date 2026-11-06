/**
 * ============================================================================
 * CYBERPUNK & DEVELOPER TERMINAL PORTFOLIO - JAVASCRIPT ENGINE
 * Pure Vanilla JavaScript (ES6+) - Fast, Modular, and Zero Dependencies
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initSystemClock();
  initMatrixRain();
  initCrtToggle();
  initTypewriter();
  initNav();
  initSkillsFilter();
  initHeroMiniTerminal();
  initFullCli();
  initContactForm();
});

/* ----------------------------------------------------------------------------
   1. SYSTEM CLOCK
   ---------------------------------------------------------------------------- */
function initSystemClock() {
  const clockEl = document.getElementById('sysClock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds} LOC`;

    // Also update any terminal timestamp elements
    document.querySelectorAll('.t-time').forEach(el => {
      el.textContent = `${hours}:${minutes}:${seconds}`;
    });
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ----------------------------------------------------------------------------
   2. MATRIX DIGITAL RAIN (CANVAS)
   ---------------------------------------------------------------------------- */
let matrixRainActive = true;
let matrixAnimId = null;

function initMatrixRain() {
  const canvas = document.getElementById('matrixCanvas');
  const toggleBtn = document.getElementById('toggleRainBtn');
  const rainStatusText = document.getElementById('rainStatusText');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Matrix characters: Binary, hex, and cyber runes
  const chars = '010101010101ABCDEF0123456789<>/*+-~$#_';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    if (!matrixRainActive) return;

    // Semi-transparent fade to create stream trails
    ctx.fillStyle = 'rgba(6, 7, 10, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    matrixAnimId = requestAnimationFrame(draw);
  }

  matrixAnimId = requestAnimationFrame(draw);

  // Toggle Matrix button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      matrixRainActive = !matrixRainActive;
      if (matrixRainActive) {
        canvas.classList.remove('disabled');
        rainStatusText.textContent = 'ON';
        matrixAnimId = requestAnimationFrame(draw);
      } else {
        canvas.classList.add('disabled');
        rainStatusText.textContent = 'OFF';
        cancelAnimationFrame(matrixAnimId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   3. CRT SCANLINE EFFECT TOGGLE
   ---------------------------------------------------------------------------- */
function initCrtToggle() {
  const toggleBtn = document.getElementById('toggleCrtBtn');
  const crtOverlay = document.querySelector('.crt-overlay');
  const crtStatusText = document.getElementById('crtStatusText');
  if (!toggleBtn || !crtOverlay) return;

  let crtActive = true;
  toggleBtn.addEventListener('click', () => {
    crtActive = !crtActive;
    if (crtActive) {
      crtOverlay.classList.remove('disabled');
      crtStatusText.textContent = 'ON';
    } else {
      crtOverlay.classList.add('disabled');
      crtStatusText.textContent = 'OFF';
    }
  });
}

/* ----------------------------------------------------------------------------
   4. TYPEWRITER EFFECT IN HERO
   ---------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  const roles = [
    'Full-Stack Web Developer',
    'JavaScript & UI Engineer',
    'Modern Web Standards Craftsman',
    'Systems & Cyberpunk Aesthetics Fan'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 1600;

  function type() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
    } else {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const delay = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(type, delay);
  }

  type();
}

/* ----------------------------------------------------------------------------
   5. NAVIGATION (Scrollspy & Mobile Hamburger)
   ---------------------------------------------------------------------------- */
function initNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ScrollSpy to highlight active navigation link
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ----------------------------------------------------------------------------
   6. SKILLS MATRIX FILTERING
   ---------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ----------------------------------------------------------------------------
   7. HERO MINI-TERMINAL WIDGET
   ---------------------------------------------------------------------------- */
function initHeroMiniTerminal() {
  const heroInput = document.getElementById('heroCliInput');
  const heroOutput = document.getElementById('heroCliOutput');
  if (!heroInput || !heroOutput) return;

  heroInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = heroInput.value.trim();
      if (!rawCmd) return;

      const cmd = rawCmd.toLowerCase();
      heroInput.value = '';

      let reply = '';
      switch (cmd) {
        case 'help':
          reply = `<span class="highlight-cyan">Commands:</span> bio, skills, projects, contact, clear`;
          break;
        case 'bio':
        case 'about':
          reply = `Furqan Ahmad — Full-Stack Developer specializing in modern HTML, CSS, JavaScript & resilient web architectures.`;
          break;
        case 'skills':
          reply = `Stack: JavaScript (ES6+), HTML5, CSS3, Node.js, REST APIs, Git, SQL, Linux.`;
          break;
        case 'projects':
          reply = `Projects: CyberSentinel, Nexus Storefront, DevLog KB, WeatherMatrix. Scroll to #projects!`;
          break;
        case 'contact':
          reply = `Dispatch inquiry via #contact section or email: furqan.dev@example.com`;
          break;
        case 'clear':
          heroOutput.innerHTML = '';
          return;
        default:
          reply = `Command not recognized: '<span style="color:#ff5f56">${escapeHtml(cmd)}</span>'. Type 'help'.`;
      }

      const row = document.createElement('div');
      row.className = 't-line';
      row.innerHTML = `<span class="prompt-user">&gt;</span> <span class="cmd-text">${escapeHtml(rawCmd)}</span><br><span style="color:var(--text-muted)">${reply}</span>`;
      heroOutput.appendChild(row);

      // Scroll mini-terminal to bottom
      const body = document.getElementById('heroTerminalBody');
      if (body) body.scrollTop = body.scrollHeight;
    }
  });
}

/* ----------------------------------------------------------------------------
   8. FULL INTERACTIVE CLI SHELL (SECTION 05)
   ---------------------------------------------------------------------------- */
function initFullCli() {
  const cliForm = document.getElementById('cliForm');
  const cliInput = document.getElementById('mainCliInput');
  const cliHistory = document.getElementById('cliHistory');
  const cliBody = document.getElementById('mainCliBody');
  const cliPills = document.querySelectorAll('.cli-pill');

  if (!cliForm || !cliInput || !cliHistory) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Click on quick command pills
  cliPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  // History navigation with Arrow Up / Arrow Down
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        cliInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        cliInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        cliInput.value = '';
      }
    }
  });

  cliForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const command = cliInput.value.trim();
    if (!command) return;

    commandHistory.push(command);
    historyIndex = -1;
    executeCommand(command);
    cliInput.value = '';
  });

  function executeCommand(cmdStr) {
    const raw = cmdStr.trim();
    const args = raw.split(' ');
    const cmd = args[0].toLowerCase();

    let outputHtml = '';

    switch (cmd) {
      case 'help':
        outputHtml = `
Available commands:
  <span class="highlight-cyan">about</span>       - Print bio and developer dossier
  <span class="highlight-cyan">skills</span>      - List technical competencies and modules
  <span class="highlight-cyan">projects</span>    - Display showcase projects
  <span class="highlight-cyan">contact</span>     - View transmission coordinates
  <span class="highlight-cyan">matrix</span>      - Toggle background digital rain
  <span class="highlight-cyan">crt</span>         - Toggle CRT scanline overlay
  <span class="highlight-cyan">date</span>        - Display current system timestamp
  <span class="highlight-cyan">echo [msg]</span>  - Echoes argument back to terminal
  <span class="highlight-cyan">whoami</span>      - Display current authenticated identity
  <span class="highlight-cyan">sudo</span>        - Request elevated administrative access
  <span class="highlight-cyan">clear</span>       - Clear terminal history buffer
        `.trim();
        break;

      case 'about':
      case 'bio':
        outputHtml = `
[SYSTEM DOSSIER: FURQAN AHMAD]
Title:       Full-Stack Web Developer & UI Engineer
Focus:       High-performance frontend systems, semantic HTML5, modern CSS3 & JS
Education:   Computer Science / Web Engineering Assignment
Philosophy:  "Writing clean, accessible, zero-bloat code that solves real problems."
        `.trim();
        break;

      case 'skills':
        outputHtml = `
[REGISTERED CAPABILITIES]
- Frontend:   HTML5 Semantic Markup (95%), CSS3 Grid/Flexbox (92%), JavaScript ES6+ (88%)
- Backend:    Node.js, Express, RESTful APIs, JSON protocols
- Databases:  SQL (PostgreSQL, MySQL), LocalStorage / IndexedDB
- Dev Tools:  Git, GitHub, Linux / Bash, Chrome DevTools, Lighthouse
        `.trim();
        break;

      case 'projects':
        outputHtml = `
[ACTIVE SHOWCASE PROJECTS]
1. CyberSentinel    :: Real-time Network Telemetry & Diagnostics
2. Nexus Storefront :: Responsive E-Commerce interface with LocalStorage Cart
3. DevLog KB        :: Browser-based Markdown knowledge base engine
4. WeatherMatrix    :: Live forecast radar utilizing async REST APIs
(Tip: Scroll up to section 04 for interactive demo links)
        `.trim();
        break;

      case 'contact':
        outputHtml = `
[COMMUNICATION CHANNELS]
Email:       furqan.dev@example.com
GitHub:      https://github.com/furqan-ahmad
LinkedIn:    https://linkedin.com/in/furqan-ahmad
GPG Key:     4A28 920E 88B1 F942
Form:        Available in Section 06 // transmit_message.sh
        `.trim();
        break;

      case 'matrix':
        const rainBtn = document.getElementById('toggleRainBtn');
        if (rainBtn) rainBtn.click();
        outputHtml = `Matrix background rain toggled: ${matrixRainActive ? 'ACTIVATED' : 'DEACTIVATED'}`;
        break;

      case 'crt':
        const crtBtn = document.getElementById('toggleCrtBtn');
        if (crtBtn) crtBtn.click();
        outputHtml = `CRT scanline overlay toggled.`;
        break;

      case 'date':
        outputHtml = `System Timestamp: ${new Date().toString()}`;
        break;

      case 'whoami':
        outputHtml = `visitor@furqan-portfolio [Clearance: GUEST | Protocol: HTTP/2]`;
        break;

      case 'sudo':
        outputHtml = `<span style="color:#ff5f56">guest is not in the sudoers file. This incident will be reported to the cyber sentinel!</span>`;
        break;

      case 'echo':
        const echoMsg = args.slice(1).join(' ');
        outputHtml = escapeHtml(echoMsg || 'Usage: echo <text>');
        break;

      case 'clear':
        cliHistory.innerHTML = '';
        return;

      default:
        outputHtml = `<span style="color:#ff5f56">zsh: command not found: ${escapeHtml(cmd)}</span>. Type <span class="highlight-cyan">'help'</span> for a list of valid commands.`;
        break;
    }

    // Append to CLI output
    const entry = document.createElement('div');
    entry.className = 'cli-history-entry';
    entry.innerHTML = `
      <div class="cmd-run"><span class="prompt-user">visitor@furqan</span>:<span class="prompt-path">~/portfolio</span>$ ${escapeHtml(raw)}</div>
      <div class="cmd-output">${outputHtml}</div>
    `;
    cliHistory.appendChild(entry);

    if (cliBody) {
      cliBody.scrollTop = cliBody.scrollHeight;
    }
  }
}

/* ----------------------------------------------------------------------------
   9. CONTACT FORM INTERACTIVE TRANSMISSION
   ---------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const consoleLog = document.getElementById('transmissionConsole');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !consoleLog || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please complete all transmission payload fields.');
      return;
    }

    // Lock button while transmission simulation runs
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = '> TRANSMITTING...';

    // Step 1: Encrypting
    consoleLog.innerHTML = `<div class="console-line working">&gt; [01/03] Encrypting packet payload (AES-256-GCM) with public key 4A28...</div>`;

    setTimeout(() => {
      // Step 2: Routing
      consoleLog.innerHTML += `<div class="console-line working">&gt; [02/03] Transmitting across secure socket handshake to furqan.dev...</div>`;
      
      setTimeout(() => {
        // Step 3: Delivered
        consoleLog.innerHTML += `<div class="console-line success">&gt; [03/03] ACK_RECEIVED: Transmission delivered! Thank you ${escapeHtml(name)}, I will reply to ${escapeHtml(email)} shortly.</div>`;

        // Reset button and form
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = '> TRANSMIT_PAYLOAD()';
        form.reset();
      }, 1000);
    }, 800);
  });
}

/* ----------------------------------------------------------------------------
   HELPERS
   ---------------------------------------------------------------------------- */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
