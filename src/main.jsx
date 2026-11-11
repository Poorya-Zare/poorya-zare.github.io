import React from "react";
import { createRoot } from "react-dom/client";
import {
  Github,
  Linkedin,
  GraduationCap,
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
import { portfolio as defaults } from "./siteData.js";
import cmsContent from "../content/site.yml?raw";
import { parse as parseYaml } from "yaml";

const cms = parseYaml(cmsContent) || {};

function cleanList(items, itemKey) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) =>
      typeof item === "string"
        ? item
        : item && typeof item === "object"
          ? item[itemKey]
          : "",
    )
    .filter(Boolean);
}

const domainIcons = {
  brain: BrainCircuit,
  shield: Shield,
  cpu: Cpu,
};

const defaultDomains = [
  {
    title: "ADVERSARIAL AI",
    description:
      "Studying model behavior and robustness under adversarial conditions.",
    icon: "brain",
  },
  {
    title: "CYBERSECURITY",
    description: "Understanding and mitigating threats to intelligent systems.",
    icon: "shield",
  },
  {
    title: "AUTONOMOUS SYSTEMS",
    description: "Evaluating safety and reliability of AI-powered navigation.",
    icon: "cpu",
  },
];

const publications = Array.isArray(cms.research_publications)
  ? cms.research_publications.filter((item) => item && item.title)
  : [];

const portfolio = {
  ...defaults,
  fullName: cms.full_name || "Poorya Zare Janakbari",
  roles:
    typeof cms.professional_title === "string"
      ? cms.professional_title
          .split("|")
          .map((role) => role.trim())
          .filter(Boolean)
      : defaults.roles,
  heroDescription: cms.profile?.hero_description ?? defaults.heroDescription,
  availability: cms.profile?.availability ?? defaults.availability,
  photo: cms.profile?.photo || "/profile.jpg",
  about: cms.about ?? defaults.about,
  email: cms.contact?.email ?? defaults.email,
  github: cms.contact?.github ?? defaults.github,
  linkedin: cms.contact?.linkedin ?? defaults.linkedin,
  huggingface: safeLink(cms.contact?.huggingface || "https://huggingface.co/Poorya-Zare"),
  scholar: safeLink(cms.contact?.scholar || "https://scholar.google.com/citations?user=6Z2FJHwAAAAJ"),
  contactDescription: cms.contact?.description ?? defaults.contactDescription,
  skills: Array.isArray(cms.skills)
    ? cleanList(cms.skills, "skill")
    : defaults.skills,
  domains: Array.isArray(cms.research_domains)
    ? cms.research_domains
    : defaultDomains,
  publications,
  education: Array.isArray(cms.education) ? cms.education.filter((item) => item && item.degree && item.institution) : [],
  honors: Array.isArray(cms.honors) ? cms.honors.filter((item) => item && item.title).map((item) => ({ ...item, image: safeLink(item.image), evidenceUrl: safeLink(item.evidence_url) })) : [],
  projects: Array.isArray(cms.projects)
    ? cms.projects.map((project, index) => ({
        num: String(index + 1).padStart(2, "0"),
        tag:
          project.category ||
          defaults.projects.find((p) => p.title === project.title)?.tag ||
          "RESEARCH / PROJECT",
        title: project.title || "Untitled Project",
        desc: project.description || "",
        tech: cleanList(project.technologies, "technology"),
        cover: safeLink(project.cover),
        githubUrl: safeLink(project.github_url),
        paperUrl: safeLink(project.paper_url),
        demoUrl: safeLink(project.demo_url),
        pdf: safeLink(project.pdf),
        status: project.status || "",
      }))
    : defaults.projects,
};

function safeLink(value) {
  if (typeof value !== "string") return "";
  if (/^https:\/\//i.test(value)) return value;
  if (value.startsWith("/uploads/")) return value;
  return "";
}

function Publications() {
  return (
    <section className="section wrap" id="publications">
      <div className="section-head">
        <span className="section-index">03 / PUBLICATIONS</span>
        <h2>
          SELECTED <em>PUBLICATIONS.</em>
        </h2>
      </div>

      {portfolio.publications.length === 0 ? (
        <p style={{ color: "#9b98b0" }}>Published papers will appear here.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 19,
          }}
        >
          {portfolio.publications.map((paper, index) => {
            const paperUrl = safeLink(paper.paper_url);
            const pdfUrl = safeLink(paper.pdf);
            const githubUrl = safeLink(paper.github_url);

            return (
              <article
                className="project"
                key={`${paper.title}-${index}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div className="project-top">
                  <span>
                    {String(index + 1).padStart(2, "0")} / {({published_paper:"PUBLISHED PAPER",bachelors_thesis:"BACHELOR'S THESIS",masters_thesis:"MASTER'S THESIS",research_manuscript:"RESEARCH MANUSCRIPT",research_project:"RESEARCH PROJECT"})[paper.type] || "RESEARCH WORK"}
                  </span>
                  <FileText size={20} />
                </div>

                <h3 style={{ margin: "4px 0" }}>{paper.title}</h3>

<div className="project-tag" style={{ textAlign: "left", alignSelf: "flex-start", width: "100%" }}>
                  {paper.year || "YEAR N/A"} / {({published:"PUBLISHED",accepted:"ACCEPTED",under_review:"UNDER REVIEW",submitted:"SUBMITTED",draft:"DRAFT",in_progress:"IN PROGRESS",completed:"COMPLETED"})[paper.status] || "STATUS NOT SPECIFIED"}
                </div>

                                {paper.publication_venue && (<p style={{ minHeight: 0, margin: 0 }}>Conference / Journal: {paper.publication_venue}</p>)}
                {paper.publisher && (<p style={{ minHeight: 0, margin: 0 }}>Publisher: {paper.publisher}</p>)}

{paper.authors && (
                  <p style={{ minHeight: 0, margin: 0 }}>{paper.authors}</p>
                )}

                {paper.description && (
                  <p style={{ minHeight: 0, margin: 0 }}>{paper.description}</p>
                )}

                {Array.isArray(paper.keywords) && (
                  <div className="chips" style={{ marginTop: 0 }}>
                    {cleanList(paper.keywords, "keyword").map((keyword, i) => (
                      <span key={`${keyword}-${i}`}>{keyword}</span>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    marginTop: "auto",
                    paddingTop: 14,
                  }}
                >
                  {paperUrl && (
                    <a
                      className="secondary"
                      href={paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW PAPER
                      <ArrowUpRight size={16} />
                    </a>
                  )}

                  {pdfUrl && (
                    <a
                      className="secondary"
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PDF
                      <FileText size={16} />
                    </a>
                  )}

                  {githubUrl && (
                    <a
                      className="secondary"
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GITHUB
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function App() {
  const [open, setOpen] = React.useState(false);

  const names = portfolio.fullName.trim().split(/\s+/);
  const firstName = names[0] || "";
  const secondName = names[1] || "";
  const lastName = names.slice(2).join(" ");

  const navItems = [
    ["About", "#about"],
    ["Research", "#research"],
    ["Publications", "#publications"],
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
          </span>{" "}
          <span>
            POORYA<span className="brand-accent">/DEV</span>
          </span>
        </a>

        <nav className={open ? "nav active" : "nav"}>
          {navItems.map(([title, href]) => (
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
          LET'S CONNECT <ArrowUpRight size={15} />
        </a>
      </header>

      <main>
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
              <span className="line" />{" "}
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

              <a className="secondary" href="#publications">
                VIEW PUBLICATIONS
                <FileText size={17} />
              </a>
            </div>

            <div className="hero-social">
              <span>FIND ME ONLINE</span>

              {portfolio.github && (
                <a
                  href={portfolio.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={19} />
                </a>
              )}

              {portfolio.linkedin && (
                <a
                  href={portfolio.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={19} />
                </a>
              )}

              {portfolio.huggingface && (
                <a href={portfolio.huggingface} target="_blank" rel="noopener noreferrer" aria-label="Hugging Face" title="Hugging Face">
                  <span style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "-1px", fontFamily: "monospace" }}>HF</span>
                </a>
              )}
              {portfolio.scholar && (
                <a href={portfolio.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" title="Google Scholar">
                  <GraduationCap size={19} />
                </a>
              )}

              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`} aria-label="Email">
                  <Mail size={19} />
                </a>
              )}
            </div>
          </div>

          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-grid" />

            <div className="photo-frame">
              <img
                src={portfolio.photo}
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
                <span className="live-dot" /> ONLINE
              </strong>
            </div>

            <div className="art-caption">FIG 01. // HUMAN × MACHINE</div>
          </div>
        </section>

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
                <br />↳ Finland<span className="blink">_</span>
              </code>
            </div>
          </div>
        </section>

        {portfolio.education.length > 0 && (
          <section className="section wrap" id="education">
            <div className="section-head">
              <span className="section-index">ACADEMIC BACKGROUND</span>
              <h2>EDUCATION<em>.</em></h2>
            </div>
            <div className="education-list">
              {portfolio.education.map((item, index) => (
                <article className="education-item" key={`${item.degree}-${index}`}>
                  <div className="education-period">{item.period}</div>
                  <div className="education-details">
                    <h3>{item.degree}</h3>
                    <p className="education-institution">{item.institution}</p>
                    {item.location && <p className="education-meta">{item.location}</p>}
                    {item.gpa && <p className="education-meta">{item.gpa}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section wrap" id="research">
          <div className="section-head">
            <span className="section-index">02 / RESEARCH</span>
            <h2>
              RESEARCH <em>DOMAINS.</em>
            </h2>
          </div>

          <div className="domain-grid">
            {portfolio.domains.map((domain, index) => {
              const DomainIcon = domainIcons[domain.icon] || BrainCircuit;

              return (
                <article key={`${domain.title}-${index}`}>
                  <DomainIcon />
                  <h3>{domain.title}</h3>
                  <p>{domain.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <Publications />

        <section className="section wrap" id="projects">
          <div className="section-head">
            <span className="section-index">04 / SELECTED WORK</span>
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
                  {project.cover ? (
                    <img src={project.cover} alt={project.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                  ) : (
                    <>
                      <div className="visual-core">
                        <span>{project.num}</span>
                      </div>
                      <div className="visual-cross cross-a">+</div>
                      <div className="visual-cross cross-b">+</div>
                    </>
                  )}
                </div>

                <div className="project-tag" style={{ textAlign: "left", alignSelf: "flex-start", width: "100%" }}>{project.tag}</div>

                <h3>{project.title}</h3>
                <p>{project.desc}</p>

                <div className="chips">
                  {project.tech.map((tech, index) => (
                    <span key={`${tech}-${index}`}>{tech}</span>
                  ))}
                </div>
                {project.status && (
                  <div className="project-tag" style={{ marginTop: "12px" }}>
                    {({completed:"COMPLETED",in_progress:"IN PROGRESS",planned:"PLANNED"})[project.status] || project.status.toUpperCase()}
                  </div>
                )}
                {(project.githubUrl || project.paperUrl || project.pdf || project.demoUrl) && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "16px" }}>
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Open Live Demo">LIVE DEMO ↗</a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>}
                    {project.paperUrl && <a href={project.paperUrl} target="_blank" rel="noopener noreferrer">PAPER / REPORT ↗</a>}
                    {project.pdf && <a href={project.pdf} target="_blank" rel="noopener noreferrer">PDF ↗</a>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {portfolio.honors.length > 0 && (
          <section className="section wrap" id="honors">
            <div className="section-head">
              <span className="section-index">AWARDS / RECOGNITION</span>
              <h2>HONORS &amp; <em>ACHIEVEMENTS.</em></h2>
            </div>
            <div className="project-grid">
              {portfolio.honors.map((honor, index) => (
                <article className="project" key={`${honor.title}-${index}`}>
                  {honor.image && (
                    <img src={honor.image} alt={honor.title} loading="lazy" style={{ width: "100%", height: "190px", objectFit: "cover", marginBottom: "18px" }} />
                  )}
                  <div className="project-tag">INTERNATIONAL ACHIEVEMENT</div>
                  <h3>{honor.title}</h3>
                  {honor.programme && <p style={{ minHeight: "auto" }}>{honor.programme}</p>}
                  {honor.organization && <div className="project-tag">{honor.organization}</div>}
                  {(honor.date || honor.location) && <p style={{ minHeight: "auto" }}>{[honor.date, honor.location].filter(Boolean).join(" | ")}</p>}
                  {honor.description && <p>{honor.description}</p>}
                  {honor.evidenceUrl && <a href={honor.evidenceUrl} target="_blank" rel="noopener noreferrer" aria-label="View award evidence">VIEW EVIDENCE ↗</a>}
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="section wrap" id="skills">
          <div className="section-head">
            <span className="section-index">05 / TOOLKIT</span>
            <h2>
              TECH <em>STACK.</em>
            </h2>
          </div>

          <div className="skills">
            {portfolio.skills.map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="contact section wrap" id="contact">
          <span className="section-index">06 / CONTACT</span>

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
