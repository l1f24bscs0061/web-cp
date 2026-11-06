# Cyberpunk & Developer Terminal Portfolio ⚡

A high-performance, responsive personal portfolio website with an **Interactive Developer Terminal / Cyberpunk** theme. Handcrafted with **semantic HTML5**, **modern CSS3 (Variables, Flexbox & Grid)**, and **pure Vanilla JavaScript (ES6+)** with zero external runtime dependencies.

---

## 🌟 Key Features & Highlights

1. **Cyberpunk & Terminal Aesthetics**:
   - Neon glow accents (Cyan `#00f0ff`, Green `#00ff88`, Pink `#ff007f`) on a deep dark palette.
   - Interactive scanline CRT overlay toggle.
   - Dynamic Matrix digital rain background rendered on an HTML5 `<canvas>` (toggleable for battery/performance).
   - Monospace & modern typography using Google Fonts (*JetBrains Mono* & *Space Grotesk*).

2. **Hero Section with Dual Terminal Widgets**:
   - Dynamic typewriter effect cycling through professional titles.
   - Live system status telemetry bar with real-time local clock and toggles.
   - Built-in mini-terminal with `neofetch` system diagnostics display and quick command prompt.

3. **About Me (`cat about_me.json`)**:
   - Structured JSON-style dossier displaying bio, focus areas, and developer mission.
   - Animated statistics cards (Completed Projects, Performance score, Commits, Responsive UI).
   - Core architecture principles.

4. **Interactive Skills Matrix (`ls -la /skills/capabilities`)**:
   - Interactive category filtering tabs: `ALL_MODULES`, `FRONTEND`, `BACKEND & DB`, `TOOLS & PROTOCOLS`.
   - Glowing percentage meters with subtle CSS animations.

5. **Project Showcase Dossier (`find ./projects`)**:
   - Cyberpunk dossier cards with deployment badges (`● DEPLOYED`, `● ACTIVE DEV`).
   - Project summaries, code snippets, tech tags, GitHub repository links, and live preview links.

6. **Fully Functional Interactive CLI Terminal (`interactive_shell.sh`)**:
   - Real terminal behavior with command history navigation using **Up** and **Down** arrow keys.
   - Supports commands: `help`, `about`, `skills`, `projects`, `contact`, `matrix`, `crt`, `date`, `whoami`, `sudo`, `echo`, and `clear`.
   - One-click quick-run command pills for instant testing.

7. **Encrypted Transmission Contact Form (`transmit_message.sh`)**:
   - Cyber-themed form fields with glowing focus states.
   - Animated 3-step simulated terminal transmission log upon dispatch (Encryption -> Handshake -> ACK delivery confirmation).

8. **Fully Responsive & Accessible**:
   - Mobile-first responsive layout with collapsible hamburger navigation.
   - High color contrast ratios and semantic HTML tags (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).

---

## 📂 Project Structure

```text
developer-portfolio/
│
├── index.html          # Semantic HTML5 markup and layout
├── README.md           # Documentation and assignment guide
│
├── css/
│   └── style.css       # Custom variables, cyberpunk glow effects, responsive grid/flexbox
│
└── js/
    └── main.js         # Matrix rain, typewriter, CLI engine, and interactive forms
```

---

## 🚀 How to Run & Preview

Because this project uses pure HTML5, CSS3, and Vanilla JavaScript, **no build step, npm install, or bundler is needed**!

### Option 1: Direct Browser Launch
1. Open File Explorer to:
   `C:\Users\Furqan Ahmad\.gemini\antigravity\scratch\developer-portfolio`
2. Double-click `index.html` (it will open in Chrome, Edge, Firefox, or any modern browser).

### Option 2: VS Code Live Server (Optional)
1. Open the `developer-portfolio` folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## ✏️ How to Customize Your Details

- **Name & Roles**: Edit lines in `index.html` (`<h1>`, title tags) and in `js/main.js` under `initTypewriter()`.
- **Bio & JSON Dossier**: Update the `<pre class="code-content">` inside `index.html`.
- **Skills**: Add or adjust skill percentages and tags inside `<div class="skills-grid">`.
- **Projects**: Replace the sample titles, descriptions, and links inside `<div class="projects-grid">` with your actual assignment projects.
- **Contact Details**: Update the email, GitHub, and LinkedIn links in the `#contact` section.

---

## 🎓 Tips for Scoring High on Your Web Assignment

- **Clean Structure**: The HTML is strictly organized with semantic tags (`<header>`, `<section>`, `<article>`, `<footer>`).
- **Separation of Concerns**: Markup (`index.html`), styles (`css/style.css`), and functionality (`js/main.js`) are completely decoupled into their respective files.
- **Performance**: Zero bulky external UI libraries; lightweight CSS animations and throttled canvas rendering for 60 FPS performance.
- **Interactive Demonstrations**: Professors can type directly into the terminal or click the command pills to see your JavaScript DOM manipulation skills in action.
