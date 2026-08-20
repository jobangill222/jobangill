import { ThemeToggle } from "./ThemeToggle";

const skills = [
  {
    number: "01",
    title: "Backend",
    items: "Node.js, TypeScript, Express.js, PHP, Laravel, REST APIs, JWT, Sanctum, Sequelize, Mongoose",
  },
  {
    number: "02",
    title: "Frontend",
    items: "React, Next.js, Vue.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, Ant Design",
  },
  {
    number: "03",
    title: "Data & cloud",
    items: "MongoDB, PostgreSQL, MySQL, Redis, AWS S3, Google Cloud Storage",
  },
  {
    number: "04",
    title: "AI & integrations",
    items: "OpenAI, ElevenLabs, HeyGen, Sync.so, Rask.ai, Twilio, Pusher, FFmpeg",
  },
  {
    number: "05",
    title: "Payments",
    items: "Stripe, Paystack, Flutterwave, Razorpay",
  },
  {
    number: "06",
    title: "Creative tooling",
    items: "Fabric.js, WaveSurfer, FFmpeg WASM, real-time media workflows",
  },
];

const projects = [
  {
    number: "01",
    title: "Fameplay",
    category: "AI video dubbing & localization",
    description:
      "An enterprise SaaS platform for video translation, AI voice generation, dubbing and lip-synced video production.",
    impact: [
      "Built AI translation and dubbing workflows with human proofreading stages.",
      "Integrated voice cloning, video generation and lip-sync providers.",
      "Developed a browser-based video and audio editor with timeline tooling.",
      "Implemented multi-tenant RBAC, consumption tracking and asynchronous jobs.",
    ],
    stack: "Node.js · TypeScript · MongoDB · Next.js · React · AWS S3 · OpenAI · FFmpeg",
    accent: "blue",
  },
  {
    number: "02",
    title: "Fanup",
    category: "Sports gaming & betting",
    description:
      "A high-volume sports platform supporting contests, entries, leaderboards, brackets, prizes and giveaways.",
    impact: [
      "Developed contest, entry, ranking, prize and giveaway functionality.",
      "Built multi-round brackets, matchup progression and result calculations.",
      "Optimized queries and workflows for high-volume participant data.",
    ],
    stack: "Node.js · PostgreSQL · Sequelize · REST APIs · React",
    accent: "orange",
  },
  {
    number: "03",
    title: "Vidente",
    category: "Consultation marketplace",
    description:
      "A multi-role marketplace connecting clients with advisors through appointments, chat, calls, payments and wallets.",
    impact: [
      "Built scheduling, real-time chat and Twilio voice/video consultations.",
      "Implemented Stripe payments, wallets, withdrawals, disputes and coupons.",
      "Localized admin and advisor portals across more than 25 languages.",
    ],
    stack: "Laravel · PHP · Vue · MySQL · Redis · Twilio · Stripe",
    accent: "green",
  },
];

const experience = [
  {
    company: "Seraphic Infosolutions",
    role: "Full Stack Developer",
    period: "Jan 2022 — Present",
    copy: "Building production applications across AI media, sports gaming, payments, real-time communication and enterprise SaaS. I own features end-to-end—from databases and APIs to interfaces, integrations and background jobs.",
  },
  {
    company: "Deftsoft Informatics",
    role: "Web Developer",
    period: "Mar 2020 — Jan 2022",
    copy: "Developed web and mobile products for gaming, food ordering and online consultation, including APIs, authentication, payment workflows and responsive user experiences.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jobanpreet Singh, home">
          <span>JS</span>
          <strong>Jobanpreet Singh</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-contact" href="mailto:jobangill222@gmail.com">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">
          <span className="status-dot" aria-hidden="true" />
          Full Stack Developer · Ludhiana, India
        </div>
        <h1>
          I build digital products that <em>work beautifully.</em>
        </h1>
        <div className="hero-bottom">
          <p>
            From AI-powered media platforms to real-time marketplaces, I turn complex ideas into scalable, production-ready software.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="button button-ghost" href="/Jobanpreet_Singh_Resume.pdf" download>Download résumé</a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-code">&lt;/&gt;</span>
          <span className="orbit-label">BUILD · SHIP · SCALE ·</span>
        </div>
      </section>

      <section className="signal-strip" aria-label="Career highlights">
        <div><strong>6+</strong><span>Years building<br />for the web</span></div>
        <div><strong>3</strong><span>Complex products<br />featured below</span></div>
        <div><strong>25+</strong><span>Languages shipped<br />in one platform</span></div>
        <div><strong>∞</strong><span>Curiosity for<br />what&apos;s next</span></div>
      </section>

      <section className="section intro" id="about">
        <p className="eyebrow">What I do</p>
        <div className="intro-grid">
          <h2>Engineering from the first sketch to the final deploy.</h2>
          <p>
            I&apos;m a full stack developer focused on production web applications and SaaS platforms. My sweet spot is where dependable backend systems meet thoughtful, fast interfaces—especially when AI, media, payments or real-time communication are involved.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.title}>
              <span>{skill.number}</span>
              <h3>{skill.title}</h3>
              <p>{skill.items}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected projects</p>
            <h2>Work with real-world weight.</h2>
          </div>
          <p>Three platforms. Different industries. The same focus on durable systems, clean experiences and meaningful outcomes.</p>
        </div>
        <div className="projects-list">
          {projects.map((project) => (
            <article className={`project project-${project.accent}`} key={project.title}>
              <div className="project-aside">
                <span>{project.number}</span>
                <div className="project-mark" aria-hidden="true">{project.title.slice(0, 1)}</div>
              </div>
              <div className="project-body">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul>
                  {project.impact.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="project-stack">{project.stack}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">Experience</p>
            <h2>A steady path of building and learning.</h2>
          </div>
        </div>
        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item" key={item.company}>
              <span className="timeline-number">0{index + 1}</span>
              <div>
                <h3>{item.company}</h3>
                <p className="timeline-role">{item.role}</p>
              </div>
              <p className="timeline-copy">{item.copy}</p>
              <p className="timeline-period">{item.period}</p>
            </article>
          ))}
        </div>
        <div className="education">
          <p className="eyebrow">Education & languages</p>
          <div>
            <h3>Bachelor of Computer Science & Engineering</h3>
            <p>Chandigarh University · 2016 — 2020</p>
          </div>
          <p className="languages">English · Hindi · Punjabi</p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">Have a project in mind?</p>
        <h2>Let&apos;s build something <em>remarkable.</em></h2>
        <a className="contact-email" href="mailto:jobangill222@gmail.com">
          jobangill222@gmail.com <span aria-hidden="true">↗</span>
        </a>
        <div className="contact-details">
          <span>Ludhiana, Punjab, India</span>
          <a href="tel:+918146994995">+91 81469 94995</a>
          <a href="https://www.linkedin.com/in/joban-gill-b3778b1aa" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span>JS</span><strong>Jobanpreet Singh</strong></a>
        <p>Full Stack Developer · Crafted with care.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
