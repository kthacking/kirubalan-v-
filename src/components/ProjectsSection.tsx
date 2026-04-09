import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    name: "QuickEdi",
    product: "QuickEdit: Nexus Builder",
    type: "Visual No-Code Site Builder",
    repo: "https://github.com/kthacking/QuickEdi",
    live: "https://kthacking.github.io/QuickEdi/",
    stars: 1,
    commits: 27,
    languages: "JavaScript 62.2% · HTML 21.4% · CSS 16.4%",
    techStack: "Vanilla HTML5, CSS3, JavaScript — ZERO framework dependencies",
    story: "I couldn't afford Canva's premium features, so instead of paying, I built my own version. What started as a mini Canva to pick pre-built components or generate them via text evolved into a full professional visual site builder with 20+ theme presets, complete animation systems, a real export engine, and an AI command bar (Beta).",
    solves: "The gap between designers and developers. Non-technical users can build websites visually. Developers can prototype instantly without writing boilerplate.",
    features: [
      "Drag & Drop from 'The Depot' component library onto a live canvas",
      "Smart Selection — click to select, resize with handles, move freely",
      "20+ Theme Presets (Glassmorphism, Sunset, Cyberpunk, and more)",
      "Responsive Viewport Controls: Desktop, Tablet, Mobile",
      "Inspector Panel with typography suite, layout controls, appearance theming",
      "Animation system: Fade, Slide, Zoom, Bounce + Hover effects",
      "Preview Mode — toggle Edit Mode ↔ View Only",
      "Export to Code — generates clean HTML, auto-copies to clipboard",
      "Auto-Save — entire canvas state persisted to LocalStorage",
      "AI Command Bar (Beta) — floating quick-action command bar",
      "Component Library: Text Blocks, Buttons, Images, Inputs, Containers, Hero Sections, Navbars, Cards",
      "Templates: Admin Dashboard, Auth Page, Landing Page, Portfolio Grid, Pricing Table",
    ],
    proves: "Most complex and feature-rich project. Demonstrates advanced JavaScript state management, drag-and-drop API mastery, real-time CSS manipulation engine, 20+ theme system architecture, clean HTML export engine, and the ability to build a complete SaaS-level tool with zero dependencies.",
    flagship: true,
  },
  {
    name: "Doorstep",
    type: "Service Booking Web Application",
    repo: "https://github.com/kthacking/Doorstep",
    stars: 0,
    languages: "HTML, CSS, JavaScript",
    techStack: "HTML, CSS, JavaScript",
    story: "In India, updating Aadhaar card or PAN card details requires visiting a government service center — extremely difficult for elderly people or busy professionals. Doorstep eliminates this friction: a service agent visits your home, collects documents, processes the update, and delivers them back.",
    solves: "Real-world bureaucratic friction in India's document service system. A hyperlocal doorstep delivery platform for government document services.",
    features: [
      "Service selection interface",
      "Booking form with complete input validation",
      "Responsive UI optimized for mobile and desktop",
      "Error handling and form submission flow",
      "Agent dispatch request system",
      "Use case: User selects service → fills booking → agent dispatched → documents collected → processed → delivered back",
    ],
    proves: "Real-world problem identification and empathy-driven design. User-centered thinking, form UX best practices, responsive layout, and practical application of web skills for genuine social impact.",
    socialImpact: true,
  },
  {
    name: "ZIPStruct",
    type: "Developer Scaffolding Tool — Browser-Based",
    repo: "https://github.com/kthacking/ZIPStruct",
    live: "https://kthacking.github.io/ZIPStruct/",
    stars: 0,
    commits: 8,
    languages: "JavaScript 48.8% · CSS 32.4% · HTML 18.8%",
    techStack: "HTML5, CSS3, Vanilla JS (ES6+), JSZip, FontAwesome",
    story: "Every time I started a new project, I found myself wasting time manually creating folders and files. I built ZIPStruct to eliminate all that friction — it lets you visualize and create the full file structure, edit it, zip it, and start coding without any manual setup.",
    solves: "Developer setup time and project scaffolding friction. Paste an ASCII tree or build visually, hit export, get your ZIP, start coding immediately.",
    features: [
      "Visual Structure Builder — interactively add folders and files",
      "ASCII to ZIP Mode — paste tree structure, parse instantly, export as ZIP",
      "Quick Start Templates: React (Vite), Node.js (Express), HTML5 Boilerplate",
      "Include .gitkeep in empty folders option",
      "Auto-generate README.md option",
      "Instant client-side ZIP Export (no server needed)",
      "'Technical Grid' aesthetic",
    ],
    proves: "Client-side file generation without any server, JSZip library mastery, creative developer tooling, deep UX thinking for developer workflows.",
    ecosystem: "DThub",
  },
  {
    name: "web_edit_Extensions",
    type: "Chrome Browser Extension",
    repo: "https://github.com/kthacking/web_edit_Extensions",
    stars: 0,
    commits: 8,
    languages: "JavaScript 57.4% · CSS 28.1% · HTML 14.5%",
    techStack: "Vanilla JavaScript, Chrome Extension API (Manifest V3)",
    story: "I use Chrome DevTools every single day to inspect and learn from other websites. I took that one step further with web_edit_Extensions — instead of just reading styles, you can drag, resize, and redesign any element on any live webpage in real time, bringing Figma-level control directly into the browser.",
    solves: "Live web editing without opening a design tool. Useful for developers testing UI changes, designers reviewing layouts on live sites.",
    features: [
      "Move any DOM element anywhere on the page by dragging",
      "Resize any element with visual resize handles",
      "Multi-select multiple elements simultaneously",
      "Full style control panel (colors, fonts, spacing, borders)",
      "Works on ANY website — injected via content script",
      "Figma-inspired interaction model in the browser",
      "MV3 Architecture: manifest.json + background service worker + content scripts + popup UI",
    ],
    proves: "Deep knowledge of Chrome Extension architecture (MV3), content script injection, DOM API manipulation at a deep level, browser event handling, UI overlay system design.",
  },
  {
    name: "byteshop",
    type: "E-Commerce Web Application",
    repo: "https://github.com/kthacking/byteshop",
    stars: 1,
    languages: "PHP (primary)",
    techStack: "PHP, MySQL, HTML, CSS, Bootstrap",
    story: "Full PHP-based e-commerce platform built completely from scratch as a college project.",
    solves: "Complete product catalog, shopping cart, user authentication, and order management.",
    features: [
      "Product listing and catalog display",
      "Shopping cart with add/remove/update",
      "User authentication — registration and login",
      "Session management for cart persistence",
      "Order management and confirmation",
      "MySQL database integration with PDO",
      "Bootstrap-based responsive UI",
    ],
    proves: "Full-stack PHP/MySQL development, backend logic architecture, database design, session management, user authentication systems.",
  },
  {
    name: "dev_web",
    type: "Developer Utility Hub",
    repo: "https://github.com/kthacking/dev_web",
    stars: 1,
    languages: "HTML, CSS, JavaScript",
    techStack: "HTML, CSS, JavaScript",
    story: "A hub of web developer helping tools — a curated utility belt built for and by web developers. Part of the DThub open-source ecosystem.",
    solves: "A single destination for small, useful web developer tools — color pickers, CSS helpers, code snippets, and utilities.",
    features: ["Community-first, open-source initiative", "Curated utility belt for web developers", "Part of DThub ecosystem"],
    proves: "Open-source mindset, community-driven development.",
    ecosystem: "DThub",
  },
  {
    name: "channel-hub",
    type: "YouTube Channel Resource Hub",
    repo: "https://github.com/kthacking/channel-hub",
    stars: 1,
    languages: "HTML",
    techStack: "HTML, CSS, JavaScript",
    story: "Central landing hub and web home for the KT Hacking YouTube channel. Resources, video links, and community assets for the developer and hacking education community.",
    solves: "Because every hacker needs a broadcast station.",
    features: ["Landing hub for KT Hacking channel", "Video links and resources", "Community assets"],
    proves: "Content platform creation and community building through web.",
  },
];

const ProjectsSection = () => (
  <section className="py-32 section-padding" style={{ backgroundColor: "#ffffffff"}}>
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionLabel number="07" label="Projects" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="heading-lg mb-4" style={{color: "#f8df00ff"}} >
          Things I've <span className="text-gradient">built</span>.
        </h2>
        <p className="body-text max-w-2xl mb-16">
          7 projects. Each one started with a real problem. Each one solves it.
        </p>
      </ScrollReveal>

      <div className="columns-1 md:columns-2 gap-6 [column-fill:_balance]" style={{ columnGap: '1.5rem' }}>
        {projects.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.08} className="mb-6 break-inside-avoid">
            <ProjectCard project={p} index={i} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
