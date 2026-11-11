import React from "react";
import { createRoot } from "react-dom/client";

import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Terminal,
  Shield,
  BrainCircuit,
  Cpu,
  FileText,
  Menu,
  X,
} from "lucide-react";

import "./style.css";

import { portfolio as defaultPortfolio } from "./siteData.js";
import cmsContent from "../content/site.yml?raw";
import { parse as parseYaml } from "yaml";

// Load the content managed by Decap CMS.
const cms = parseYaml(cmsContent) || {};

// Convert CMS technology fields to plain strings.
function normalizeTechnologies(technologies) {
  if (!Array.isArray(technologies)) {
    return [];
  }

  return technologies
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (item && typeof item === "object") {
        return item.technology || "";
      }

      return "";
    })
    .filter(Boolean);
}

// Convert CMS projects to the existing website structure.
function normalizeProjects(projects) {
  if (!Array.isArray(projects)) {
    return defaultPortfolio.projects;
  }

  return projects.map((project, index) => {
    const original = defaultPortfolio.projects.find(
      (item) => item.title === project.title,
    );

    return {
      num: String(index + 1).padStart(2, "0"),
      tag: original?.tag || "RESEARCH / PROJECT",
      title: project.title || "Untitled Project",
      desc: project.description || "",
      tech: normalizeTechnologies(project.technologies),
    };
  });
}

// Merge editable CMS content with existing website settings.
const portfolio = {
  ...defaultPortfolio,

  fullName: cms.full_name || "Poorya Zare Janakbari",

  roles:
    typeof cms.professional_title === "string"
      ? cms.professional_title
          .split("|")
          .map((role) => role.trim())
          .filter(Boolean)
      : defaultPortfolio.roles,

  about: cms.about ?? defaultPortfolio.about,

  projects: normalizeProjects(cms.projects),
};

function App() {
  const [open, setOpen] = React.useState(false);

  const nameParts = portfolio.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const secondName = nameParts[1] || "";
  const lastName = nameParts.slice(2).join(" ");

  const navigation = [
    ["About", "#about"],
    ["Research", "#research"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
  ];

  return (
    <>
      <div className="ambient a" />
      <div className="ambient b" />

      <header className="header wrap">
        <a className="brand" href="#home">
          <span className="brand-mark">
            P<span>.</span>
          </span>

          <span>
            POORYA
            <span className="brand-accent">/DEV</span>
          </span>
        </a>

        <nav className={open ? "nav active" : "nav"}>
          {navigation.map(([title, href]) => (
            <a key={title} href={href} onClick={() => setOpen(false)}>
              {title}
            </a>
          ))}
        </nav>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <a className="header-contact" href={`mailto:${portfolio.email}`}>
          LET'S CONNECT
          <ArrowUpRight size={15} />
        </a>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" />
              {portfolio.availability}
            </div>

            <div className="small-title">HELLO WORLD, I'M</div>

            <h1>
              {firstName.toUpperCase()}
              <br />
              <span>{secondName.toUpperCase()}</span>
              <br />
              {lastName.toUpperCase()}
              <span className="cursor">_</span>
            </h1>

            <div className="hero-role">
              <span className="line" />

              {portfolio.roles.map((role, index) => (
                <React.Fragment key={`${role}-${index}`}>
                  {index > 0 && <span className="sep"> / </span>}
                  {role}
                </React.Fragment>
              ))}
            </div>

            <p className="hero-desc">{portfolio.heroDescription}</p>

            <div className="actions">
              <a className="primary" href="#projects">
                EXPLORE PROJECTS
                <ArrowUpRight size={18} />
              </a>

              <a className="secondary" href="#research">
                VIEW RESEARCH
                <FileText size={17} />
              </a>
            </div>

            <div className="hero-social">
              <span>FIND ME ONLINE</span>

              <a
                href={portfolio.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={19} />
              </a>

              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={19} />
              </a>

              <a href={`mailto:${portfolio.email}`} aria-label="Email">
                <Mail size={19} />
              </a>
            </div>
          </div>

          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-grid" />

            <div className="photo-frame">
              <img
                src="/profile.jpg"
                alt={`Portrait of ${portfolio.fullName}`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="float-card top">
              <span>IDENTITY // VERIFIED</span>
              <strong>AI × SECURITY</strong>
            </div>

            <div className="float-card bottom">
              <span>SYSTEM STATUS</span>
              <strong>
                <span className="live-dot" />
                ONLINE
              </strong>
            </div>

            <div className="art-caption">FIG 01. // HUMAN × MACHINE</div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats wrap">
          <div>
            <strong>
              AI <span>×</span> CYBER
            </strong>
            <small>RESEARCH FOCUS</small>
          </div>

          <div>
            <strong>UEF</strong>
            <small>MASTER'S STUDIES</small>
          </div>

          <div>
            <strong>FINLAND</strong>
            <small>BASED IN EUROPE</small>
          </div>

          <div>
            <strong>∞</strong>
            <small>CURIOSITY DRIVEN</small>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section wrap" id="about">
          <div className="section-head">
            <span className="section-index">01 / ABOUT</span>

            <h2>
              BEYOND THE <em>CODE.</em>
            </h2>
          </div>

          <div className="about-grid">
            <p>{portfolio.about}</p>

            <div className="terminal-card">
              <div className="terminal-top">
                <Terminal size={16} />
                researcher_profile.sh
                <span>● ● ●</span>
              </div>

              <code>
                <span>$</span> focus --list
                <br />
                ↳ Artificial Intelligence
                <br />
                ↳ Cybersecurity
                <br />
                ↳ Autonomous Systems
                <br />
                <span>$</span> location
                <br />↳ Finland
                <span className="blink">_</span>
              </code>
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section className="section wrap" id="research">
          <div className="section-head">
            <span className="section-index">02 / RESEARCH</span>

            <h2>
              RESEARCH <em>DOMAINS.</em>
            </h2>
          </div>

          <div className="domain-grid">
            <article>
              <BrainCircuit />
              <h3>ADVERSARIAL AI</h3>
              <p>
                Studying model behavior and robustness under adversarial
                conditions.
              </p>
            </article>

            <article>
              <Shield />
              <h3>CYBERSECURITY</h3>
              <p>
                Understanding and mitigating threats to intelligent systems.
              </p>
            </article>

            <article>
              <Cpu />
              <h3>AUTONOMOUS SYSTEMS</h3>
              <p>Evaluating safety and reliability of AI-powered navigation.</p>
            </article>
          </div>
        </section>

        {/* PROJECTS - MANAGED BY DECAP CMS */}
        <section className="section wrap" id="projects">
          <div className="section-head">
            <span className="section-index">03 / SELECTED WORK</span>

            <h2>
              FEATURED <em>PROJECTS.</em>
            </h2>
          </div>

          <div className="project-grid">
            {portfolio.projects.map((project) => (
              <article className="project" key={project.num}>
                <div className="project-top">
                  <span>{project.num} / PROJECT</span>
                  <ArrowUpRight size={20} />
                </div>

                <div className="project-visual">
                  <div className="visual-core">
                    <span>{project.num}</span>
                  </div>

                  <div className="visual-cross cross-a">+</div>

                  <div className="visual-cross cross-b">+</div>
                </div>

                <div className="project-tag">{project.tag}</div>

                <h3>{project.title}</h3>
                <p>{project.desc}</p>

                <div className="chips">
                  {project.tech.map((technology, index) => (
                    <span key={`${technology}-${index}`}>{technology}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="section wrap" id="skills">
          <div className="section-head">
            <span className="section-index">04 / TOOLKIT</span>

            <h2>
              TECH <em>STACK.</em>
            </h2>
          </div>

          <div className="skills">
            {portfolio.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section wrap" id="contact">
          <span className="section-index">05 / CONTACT</span>

          <h2>
            LET'S BUILD
            <br />
            <em>WHAT'S NEXT.</em>
          </h2>

          <p>{portfolio.contactDescription}</p>

          <a className="primary" href={`mailto:${portfolio.email}`}>
            GET IN TOUCH
            <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="wrap footer">
        <span>
          © {new Date().getFullYear()} {portfolio.fullName.toUpperCase()}
        </span>

        <span>DESIGNED AT THE INTERSECTION OF AI & SECURITY</span>

        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
